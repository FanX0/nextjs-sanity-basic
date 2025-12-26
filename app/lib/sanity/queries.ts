import { groq } from "next-sanity";

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;

export const POSTS_SLUG_QUERY = groq`*[_type == "post"]{ "slug": slug.current }`;

export const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image}`;
