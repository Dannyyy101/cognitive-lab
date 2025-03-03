import {NextRequest, NextResponse} from "next/server";
import {supabase} from "@/lib/supabase/client";
import {sanitizeFileName} from "@/utils/sanatizeFilename";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        console.log(file)
        if (!file) {
            return NextResponse.json({error: "No file uploaded"}, {status: 400});
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        console.log(encodeURI(file.name))
        const {data, error} = await supabase.storage
            .from("docs")
            .upload(sanitizeFileName(file.name), buffer);


        if (error) {
            return NextResponse.json({error: error.message}, {status: 500});
        }

        return NextResponse.json({data}, {status: 200});

    } catch (error) {
        return NextResponse.json({error: "Internal Server Error" + error}, {status: 500});
    }
}
