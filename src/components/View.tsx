import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"
import Ping from "./Ping"
import { sanityFetch, SanityLive } from "@/sanity/lib/live"

async function View({ id }: {id: string}) {
    const { data } = await sanityFetch({ query: STARTUP_VIEWS_QUERY, params: { id } });
    const totalViews = data.views;

  return (
    <div className="view-container">
        <div className="absolute -top-2 -right-2">
            <Ping/>
        </div>

        <p className="view-text">
            {
                totalViews < 2?
                <span className="font-black">{totalViews} view</span> :
                <span className="font-black">{totalViews} views</span>
            }
        </p>
        <SanityLive/>
    </div>
  )
}

export default View