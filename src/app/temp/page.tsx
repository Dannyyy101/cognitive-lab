"use client";

import { useEffect, useState } from "react";
import { getAllExercises } from "../action";
import { Loading } from "../../components/Loading";
import { MultipleChoiceExercise } from "../../components/exercises/MultipleChoiceExercise";
import { NormalExercise } from "../../components/exercises/NormalExercise";

export default function Home() {
  const [data, setData] = useState<any[] | null>([]);

  useEffect(() => {
    async function fetchData() {
      const t = await getAllExercises();
      setData(t);
    }
    fetchData();
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="text-fgColor_default flex w-screen h-screen justify-center items-center flex-col">
      <section className="w-1/2">
      {data.map((value, index) => {
        switch (value.type) {
          case "normal":
            return (
              <div key={index}>
                <NormalExercise exercise={value} />
                <hr className="w-full" />
              </div>
            );
          case "multiple-choice":
            return (
              <div key={index}>
                <MultipleChoiceExercise exercise={value} />
                <hr className="w-full" />
              </div>
            );
          default:
            return <div key={index}>Default Rendering</div>;
        }
      })}
      </section>
    </div>
  );
}
