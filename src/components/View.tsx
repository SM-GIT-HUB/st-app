import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"
import Ping from "./Ping"
import { writeClient } from "@/sanity/lib/write-client"
import { client } from "@/sanity/lib/client"
import { unstable_after as after } from "next/server"

async function View({ id }: {id: string}) {
    const data = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });
    const views = data?.views;
    after(async() => {
        await writeClient.patch(id).set({ views: (views || 1)  + 1 }).commit();
    })
    console.log(views);

  return (
    <div className="view-container">
        <div className="absolute -top-2 -right-2">
            <Ping/>
        </div>

        <p className="view-text">
            {
                views && views < 2?
                <span className="font-black">{views} view</span> :
                <span className="font-black">{views} views</span>
            }
        </p>
    </div>
  )
}

export default View