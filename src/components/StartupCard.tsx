import { formatDate } from "@/lib/utils"
import { EyeIcon, Link2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Author, Startup } from "@/sanity/types"

export type StartupTypeCard = Omit<Startup, "author"> & { author? : Author };

function StartupCard({ post }: { post: StartupTypeCard }) {
  return (
    <li className="startup-card group">
        <div className="flex-between">
            <p className="startup_card_date">{formatDate(new Date(post._createdAt))}</p>

            <div className="flex gap-1.5">
                <EyeIcon className="size-6 text-primary" />
                <span className="text-16-medium">{post.views}</span>
            </div>
        </div>

        <div className="flex-between mt-5 gap-5">
            <div className="flex flex-col items-start">
                    <Link href={`/user/${post.author?._id}`} className="flex gap-1 items-center hover:text-blue-950">
                        <p className="text-16-medium line-clamp-1 hover:text-blue-950">{post.author?.name}</p>
                        <Link2/>
                    </Link>
                
                    <Link href={`/startup/${post._id}`} className="flex gap-1 items-center hover:text-blue-950">
                        <h3 className="text-26-semibold line-clamp-1 hover:text-blue-950">{post.title}</h3>
                        <Link2/>
                    </Link>
            </div>

            <Link href={`/user/${post.author?._id}`}>
                <img src={post?.author?.image} alt="user img" width={1000} height={1000} className="rounded-full w-[48px] h-[48px]"/>
            </Link>
        </div>

        <Link href={`/startup/${post._id}`}>
            <p className="startup-card_desc">{post.description}</p>

            <img src={post?.image} alt="img" width={500} height={500} className="startup-card_img" />
        </Link>

        <div className="flex-between gap-3 mt-5">
            <Link href={`/?query=${post?.category?.toLowerCase()}`}>
                <p className="text-16-medium">{post.category}</p>
            </Link>

            <Button className="startup-card_btn hover:bg-blue-950 transition-all">
                <Link href={`/startup/${post._id}`}>Details</Link>
            </Button>
        </div>
    </li>
  )
}

export default StartupCard