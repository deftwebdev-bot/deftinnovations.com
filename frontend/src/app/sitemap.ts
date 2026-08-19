import { MetadataRoute } from "next";
import { getProjects, getArticles, getCareerJobs } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://deftinnovations.com";

  const staticPages: MetadataRoute.Sitemap = ["", "/about", "/services", "/portfolio", "/blog", "/careers", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    })
  );

  const [projects, articles, jobs] = await Promise.all([
    getProjects(),
    getArticles(),
    getCareerJobs(),
  ]);

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const jobPages: MetadataRoute.Sitemap = jobs.map((j) => ({
    url: `${baseUrl}/careers/${j.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages, ...articlePages, ...jobPages];
}
