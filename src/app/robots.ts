import type { MetadataRoute } from "next";
import { isSearchIndexingBlocked } from "@/lib/settings";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const isBlocked = await isSearchIndexingBlocked();

  if (isBlocked) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
