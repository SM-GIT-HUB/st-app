import { client } from "@/sanity/lib/client"
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"

// export const experimental_ppr = true

async function StartUp({ params } : { params: Promise<{ id: string}> }) {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id })

  if (!post) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-3xl">This is a startup: {id}</h1>
      <h1>{post.author?.name}</h1>
      <h1>{post.pitch}</h1>
    </>
  )
}

export default StartUp