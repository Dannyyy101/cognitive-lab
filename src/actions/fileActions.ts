'use server'
import { BACKEND_URL } from "@/utils/constants";

export const uploadFile = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const result = await fetch(`${BACKEND_URL}/images`, {
            method: "POST",
            body: formData,
        });

        if (!result.ok) {
            const errorResponse = await result.json();
            throw new Error(errorResponse.error || 'Failed to upload file');
        }

        return await result.json();

    } catch (error) {
        console.error('Upload error:', error);
        return null;
    }
};
