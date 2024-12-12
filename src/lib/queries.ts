import { defineQuery } from "next-sanity"

export const STARTUP_QUERY = defineQuery(
    `*[ _type == "startup" && defined(slug.current)] | order(_createdAt desc) {
        _id,
        author -> {
            name, image, bio, _id
        },
        title, slug, _createdAt, image, views, category, description, _updatedAt
    }`
)