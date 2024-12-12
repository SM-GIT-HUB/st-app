import { defineQuery } from "next-sanity"

export const STARTUP_QUERY = defineQuery(
    `*[ _type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
        _id,
        author -> {
            name, image, bio, _id
        },
        title, slug, _createdAt, image, views, category, description
    }`
)

export const STARTUP_BY_ID_QUERY = defineQuery(
    `*[ _type == "startup" && _id == $id][0]{
        _id,
        author -> {
            name, image, bio, _id
        },
        title, slug, _createdAt, image, views, category, description, pitch
    }`
)