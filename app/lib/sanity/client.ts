import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "b1law31t",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
