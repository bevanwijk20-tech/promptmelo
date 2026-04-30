import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://promptmelo.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://promptmelo.com/landing", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://promptmelo.com/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}