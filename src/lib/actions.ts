'use server'

import { auth } from "@/auth"
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify"

function jsonfy(someObj: Object)
{
    return JSON.parse(JSON.stringify(someObj));
}

export async function createPitch(state: any, form: FormData, pitch: string)
{
    const session = await auth();

    if (!session) {
        return jsonfy({
            error: "Not signed in", status: "ERROR"
        })
    }

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key != "pitch")
    )

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type:  slug,
                current: slug
            },
            author: {
                _type: 'reference',
                _ref: session?.id
            }
        }

        const res = await writeClient.create({
            _type: "startup", ...startup, pitch, views: 0
        })

        return jsonfy({
            ...res,
            error: '',
            status: "SUCCESS"
        })
    }
    catch(err : any) {
        console.log(err.message);
        return jsonfy({ error: err.message, status: "ERROR" })
    }
}