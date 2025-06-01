'use server';

import { supabase } from '@/lib/supabase/client';
import { sanitizeFileName } from '@/utils/sanatizeFilename';

export const uploadFile = async (file: File): Promise<string | null> => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const filename = sanitizeFileName(file.name);
    const storage = supabase.storage.from('docs');

    const exist = await supabase.storage.from('docs').exists(filename);
    if (exist) {
        await supabase.storage.from('docs').info(filename);
        return storage.getPublicUrl(filename).data.publicUrl;
    } else {
        const { data } = await supabase.storage.from('docs').upload(filename, buffer);
        if (data) {
            return data.fullPath;
        }
    }
    return null;
};
