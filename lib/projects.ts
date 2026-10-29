import demo from "@/data/demo/projects.json";
import production from "@/data/production/projects.json";
import { isDemo } from "@/lib/mode";

export type ProjectRecord = {
  id: string;
  slug: string;
  title: string;
  industry: string;
  city: string;
  completedOn: string;
  scope: string[];
  equipment: string[];
  outcome: string;
  relatedServices: string[];
};

type FileShape = { projects: ProjectRecord[] };

export function projects(): ProjectRecord[] {
  const list = isDemo() ? (demo as FileShape).projects : (production as FileShape).projects;
  return list || [];
}

export function projectBySlug(slug: string): ProjectRecord | undefined {
  return projects().find((p) => p.slug === slug);
}

export function hasPublicProjects(): boolean {
  return projects().length > 0;
}

export function projectsAreDemo(): boolean {
  return isDemo() && (demo as FileShape).projects.length > 0;
}
