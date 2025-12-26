import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanity/image";
import { getAllPosts } from "@/app/lib/sanity/api";

export default async function GetPage() {
  const posts = await getAllPosts();

  return (
    <section className="container mx-auto p-4">
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link
              href={`/get/${post.slug.current}`}
              className="flex items-center gap-4"
            >
              {post.image ? (
                <Image
                  src={urlFor(post.image)?.width(200).height(200).url() ?? ""}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded-md"
                  width={64}
                  height={64}
                />
              ) : null}
              <div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
