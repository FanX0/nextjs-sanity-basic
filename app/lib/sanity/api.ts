import { client } from "@/app/lib/sanity/client";
import {
  POST_QUERY,
  POSTS_SLUG_QUERY,
  POSTS_QUERY,
} from "@/app/lib/sanity/queries";
import { type Post } from "@/app/types/sanity";

const options = { next: { revalidate: 30 } };

export async function getAllPostsSlugs() {
  return await client.fetch<{ slug: string }[]>(POSTS_SLUG_QUERY);
}

export async function getPostBySlug(slug: string) {
  return await client.fetch<Post>(POST_QUERY, { slug }, options);
}

export async function getAllPosts() {
  return await client.fetch<Post[]>(POSTS_QUERY, {}, options);
}
