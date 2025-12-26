import { type SanityDocument } from "next-sanity";
import { type SanityImageSource } from "@sanity/image-url";

export interface Post extends SanityDocument {
  _type: "post";
  title: string;
  slug: { current: string };
  publishedAt: string;
  image?: SanityImageSource;
  body?: any[];
}
