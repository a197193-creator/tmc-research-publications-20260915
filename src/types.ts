export type Language = 'en' | 'bm';
export type TextScale = 'normal' | 'large' | 'xlarge';

export type PageType = 
  | 'home'
  | 'biobank'
  | 'research'
  | 'publications'
  | 'portal'
  | 'news'
  | 'research-detail'
  | 'news-detail'
  | 'document'
  | 'clinic'
  | 'legal';

export interface ResearchStory {
  id: string;
  category: string;
  subCategory: string;
  categoryBg: string;
  categoryText: string;
  title: string;
  description: string;
  metric: string;
  image: string;
  imageAlt: string;
  fullContent?: {
    background: string;
    keyFindings: string[];
    clinicalRelevance: string;
    leadInvestigator: string;
    collaboratingInstitutions: string[];
  };
}

export interface Publication {
  id: string;
  journal: string;
  year: number;
  doi: string;
  title: string;
  authors: string;
  category: string;
  plainLanguageSummary: string;
  abstract: string;
  fullPdfSize: string;
  impactFactor?: string;
}

export interface BulletinItem {
  id: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  date: string;
  title: string;
  snippet: string;
  body: string;
}

export interface ParticipantMaterial {
  id: string;
  title: string;
  fileType: string;
  size: string;
  description: string;
  contentSnippet: string[];
}

export interface ResearchSubProject {
  sourceRow: number;
  title: string;
  description?: string;
  duration?: string;
  targetedParticipants?: string;
  currentParticipants?: string;
  funding?: string;
}

export interface ResearchInitiativeItem {
  id: string;
  sourceRow: number;
  title: string;
  category:
    | 'Cohort Infrastructure'
    | 'Genomics'
    | 'Cardiometabolic'
    | 'Cancer Screening'
    | 'Infection & Microbiome'
    | 'Imaging & Biomarkers'
    | 'Lifestyle & Nutrition';
  status: 'Active' | 'Completed' | 'Follow-Up Phase';
  samplesCount: string;
  targetedParticipants: string;
  currentParticipants: string;
  duration: string;
  collaborators: string;
  description: string;
  funding: string;
  participantDataSource: string;
  referenceUrl?: string;
  subProjects?: ResearchSubProject[];
}
