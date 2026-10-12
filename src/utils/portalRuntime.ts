import type { BulletinItem, Publication, ResearchInitiativeItem } from '../types';

declare global {
  interface Window {
    TmcPortal?: {
      assetBase?: string;
      portalUrl?: string;
      projects?: ResearchInitiativeItem[];
      publications?: Publication[];
      news?: BulletinItem[];
    };
  }
}

// The WordPress template supplies published records before React mounts.
export function portalRecords<T>(key: 'projects' | 'publications' | 'news', fallback: T[]): T[] {
  const records = typeof window !== 'undefined' ? window.TmcPortal?.[key] : undefined;
  return Array.isArray(records) ? records as T[] : fallback;
}

export function portalAsset(path: string): string {
  if (!path.startsWith('/assets/') && !path.startsWith('/documents/') && !path.startsWith('/cohort/')) return path;
  const base = typeof window !== 'undefined' && window.TmcPortal?.assetBase
    ? window.TmcPortal.assetBase : import.meta.env?.BASE_URL || '/';
  const resolved = `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  const returnUrl = typeof window !== 'undefined' ? window.TmcPortal?.portalUrl : undefined;
  return path.startsWith('/cohort/') && returnUrl ? `${resolved}?return=${encodeURIComponent(returnUrl)}` : resolved;
}
