'use server'

import { generateExercises } from "@/utils/generateExercises";

export const getData = async () => {
    try {
        const result = await fetch("https://home101.me/api/python");
        console.log(result)
        if (!result.ok) {
          throw new Error('Failed to fetch data');
        }
        const text = await result.text();
        return text;
      } catch (error) {
        console.error('Fetch error:', error);
        return null;
      }
}


export const getAllExercises = async () => {
  try {
    const result = await fetch("https://home101.me/api/exercises");
    if (!result.ok) {
      throw new Error('Failed to fetch data');
    }
    const text = await result.json()
    const exercieses = await generateExercises(text)
    return exercieses;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}