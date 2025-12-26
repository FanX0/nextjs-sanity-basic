import { PortableText } from "next-sanity";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/app/lib/sanity/client";
import { urlFor } from "@/app/lib/sanity/image";
import { type Post } from "@/app/types/sanity";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post>(POST_QUERY, { slug }, options);

  return {
    title: post?.title,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch<Post>(POST_QUERY, { slug }, options);

  const postImageUrl = post?.image
    ? urlFor(post.image).width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/get" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post?.title ?? "Post Image"}
          className="aspect-video rounded-xl"
          width={550}
          height={310}
          priority
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post?.title}</h1>
      <div className="prose">
        <p>
          Published:{" "}
          {post?.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString()
            : ""}
        </p>
        {Array.isArray(post?.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}
