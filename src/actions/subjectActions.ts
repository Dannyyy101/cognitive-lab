'use server';

import { SubjectDTO } from '@/types/dtos/subjectDTO';
import { BACKEND_URL } from '@/utils/constants';
import { collection, doc, DocumentReference, getDoc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApp';
import { subjectWithExercisesConverter } from '@/lib/converter/subjectWithExercisesConverter';
import { subjectConverter } from '@/lib/converter/subjectConverter';
import { createNewExercises } from './exerciseActions';
import { updateDoc } from 'firebase/firestore';
import { arrayRemove } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import { ExerciseBaseDTO } from '@/types/dtos/exerciseDTO';
import { parentSubjectScheme } from '@/lib/zod/schemes/createParentSubjectScheme';
import { FormState } from '@/types/formState';
import { SubjectWithUnresolvedChildrenAndExercises } from '@/types/models/subject';

const COLLECTION = 'subjects';

export const createSubject = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    const rawData = Object.fromEntries(formData.entries());

    const result = parentSubjectScheme.safeParse({
        name: rawData.name,
        hexColor: rawData.hexColor,
        hexBgColor: rawData.hexBgColor,
    });

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }

    const subject = {
        name: result.data.name,
        color: result.data.hexColor,
        bgColor: result.data.hexBgColor,
        id: '',
        createdOn: new Date(),
        parent: null,
        exercises: [],
        lastEdited: new Date(),
        children: [],
    };

    const id = await createNewSubject(subject);

    return { result: JSON.stringify({ ...subject, id: id }), success: true };
};

export const createNewSubject = async (subject: SubjectDTO) => {
    const exercises = await createNewExercises(subject.exercises);
    const ref = doc(collection(db, COLLECTION)).withConverter(subjectConverter);
    await setDoc(ref, { ...subject, exercises: exercises } as SubjectDTO);
    return ref.id;
};

export const getAllSubjects = async () => {
    const col = collection(db, COLLECTION);
    const q = query(col, where('parent', '==', null), orderBy('color'));
    const querySnapshot = await getDocs(q);

    const postsList = querySnapshot.docs.map(async (doc) => {
        const data = doc.data();

        const exercises = await Promise.all(
            (data.exercises || []).map(async (exerciseRef: DocumentReference) => {
                const exerciseDoc = await getDoc(exerciseRef);
                return exerciseDoc.exists() ? { ...exerciseDoc.data(), id: exerciseDoc.id } : null;
            })
        );

        const children = await Promise.all(
            (data.children || []).map(async (childrenRef: DocumentReference) => {
                const childrenDoc = await getDoc(childrenRef);
                if (!childrenDoc.exists()) return null;

                const childrenDocData = childrenDoc.data();
                return {
                    id: childrenDoc.id,
                    ...childrenDocData,
                    parent: null,
                    exercises: (childrenDocData.exercises || []).map((e: ExerciseBaseDTO) => e.id),
                    children: [], // Verhindert unendliche Rekursion
                };
            })
        );

        return {
            id: doc.id,
            ...data,
            exercises: exercises.filter((exercise) => exercise !== null),
            children: children.filter((child) => child !== null),
        };
    });

    const temp = (await Promise.all(postsList)) as SubjectDTO[];

    return JSON.stringify(temp);
};

export const getSubjectById = async (subjectId: string, optional?: { resolveAll?: boolean }): Promise<string> => {
    // Can not use firebaseConverter because of the children and exercises that need to be resolved later on
    const subjectCollection = doc(db, COLLECTION, subjectId);
    const subjectSnapshot = await getDoc(subjectCollection);

    if (!subjectSnapshot.exists()) {
        throw new Error('Subject not found');
    }

    const subject = subjectSnapshot.data() as SubjectWithUnresolvedChildrenAndExercises;
    const children = await resolveChildSubjects(subject.children, !!optional?.resolveAll);
    const exercises = await resolveExercises(subject.exercises);
    console.log(subject);

    return JSON.stringify({
        id: subjectSnapshot.id,
        name: subject.name,
        color: subject.color,
        parent: null,
        lastEdited: subject.lastEdited,
        createdOn: subject.createdOn,
        bgColor: subject.bgColor,
        children: children.filter((child) => child !== null),
        exercises: exercises.filter((exercise) => exercise !== null),
    });
};

const resolveChildSubjects = async (
    children: DocumentReference[],
    resolveAll: boolean
): Promise<(SubjectDTO | null)[]> => {
    return await Promise.all(
        (children || []).map(async (childrenRef: DocumentReference) => {
            const childrenDoc = await getDoc(childrenRef);
            if (!childrenDoc.exists()) return null;

            const exerciseDocData = childrenDoc.data();
            let exercises: ExerciseBaseDTO[] = [];
            if (resolveAll) {
                exercises = (await resolveExercises(exerciseDocData.exercises)).filter((exercise) => exercise !== null);
            } else {
                (exerciseDocData.exercises || []).map((e: ExerciseBaseDTO) => e.id);
            }

            return {
                id: childrenDoc.id,
                bgColor: exerciseDocData.bgColor,
                createdOn: exerciseDocData.createdOn,
                color: exerciseDocData.color,
                lastEdited: exerciseDocData.lastEdited,
                name: exerciseDocData.name,
                parent: null,
                exercises: exercises,
                children: [],
            };
        })
    );
};

const resolveExercises = async (exercises: DocumentReference[]): Promise<(ExerciseBaseDTO | null)[]> => {
    return await Promise.all(
        exercises.map(async (exerciseRef: DocumentReference) => {
            const exerciseDoc = await getDoc(exerciseRef);
            if (!exerciseDoc.exists()) return null;
            return { ...(exerciseDoc.data() as ExerciseBaseDTO), id: exerciseRef.id };
        })
    );
};

export const updateSubjectById = async (subjectId: string, subject: SubjectDTO) => {
    const subjectCollection = doc(db, COLLECTION, subjectId).withConverter(subjectWithExercisesConverter);
    await setDoc(subjectCollection, subject, { merge: true });
};

export const addExercisesToSubject = async (subjectId: string, exerciseId: string) => {
    try {
        const result = await fetch(`${BACKEND_URL}/subjects/${subjectId}/exercises/${exerciseId}`, { method: 'POST' });
        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
};

export const removeExercisesFromSubject = async (subjectId: string, exerciseId: string) => {
    try {
        const result = await fetch(`${BACKEND_URL}/subjects/${subjectId}/exercises/${exerciseId}`, {
            method: 'DELETE',
        });
        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
};

export const removeChildFromSubject = async (parentId: string, subjectId: string) => {
    const washingtonRef = doc(db, COLLECTION, parentId);
    const docu = doc(db, COLLECTION, subjectId);
    await updateDoc(washingtonRef, { children: arrayRemove(docu) });
};

export const deleteSubjectById = async (subjectId: string) => {
    const ref = doc(db, COLLECTION, subjectId).withConverter(subjectWithExercisesConverter);
    const document = await getDoc(ref);
    if (document.exists()) {
        const data = document.data();

        if (data?.parent) {
            removeChildFromSubject(data.parent.id, subjectId);
        }
        await deleteDoc(ref);
    }
};

const doesSubjectExists = async (subjectId: string) => {
    const ref = doc(db, COLLECTION, subjectId);
    const document = await getDoc(ref);
    return document.exists();
};

export const deleteSubject = async (subjectId: string) => {
    if (await doesSubjectExists(subjectId)) {
        const ref = doc(db, COLLECTION, subjectId);
        await deleteDoc(ref);
    }
};
