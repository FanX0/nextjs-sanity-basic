import Link from "next/link";
import Image from "next/image";
import { client } from "@/app/lib/sanity/client";
import { urlFor } from "@/app/lib/sanity/image";
import { type Post } from "@/app/types/sanity";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image}`;

const options = { next: { revalidate: 30 } };

const Text = async () => {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options);
  return (
    <div>
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
                <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Text;
