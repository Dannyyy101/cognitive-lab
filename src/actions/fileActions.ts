"use server";

import { supabase } from "@/lib/supabase/client";
import { sanitizeFileName } from "@/utils/sanatizeFilename";

export const uploadFile = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  console.log(encodeURI(file.name));
  const { data, error } = await supabase.storage
    .from("docs")
    .upload(sanitizeFileName(file.name), buffer);

  return { data, error };
};
