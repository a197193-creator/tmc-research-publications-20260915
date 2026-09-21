import { ResearchInitiativeItem } from '../types';

interface ResearchVisual {
  image: string;
  imageAlt: string;
  imageCaption?: {
    en: string;
    bm: string;
  };
  categoryBg: string;
  categoryText: string;
}

const biobankVisual: ResearchVisual = {
  image: '/assets/biobank-tank-room.jpg',
  imageAlt: 'TMC biobank cryogenic storage facility at UMBI UKM',
  categoryBg: 'bg-ukm-navy',
  categoryText: 'text-white',
};

const clinicalVisual: ResearchVisual = {
  image: '/assets/visit-fundus-photography.jpg',
  imageAlt: 'Fundus photography examination supporting TMC clinical research at UMBI UKM',
  categoryBg: 'bg-ukm-crimson',
  categoryText: 'text-white',
};

const lifestyleVisual: ResearchVisual = {
  image: '/assets/visit-biophysical-measurement.jpg',
  imageAlt: 'Biophysical assessment supporting TMC lifestyle and nutrition research at UMBI UKM',
  categoryBg: 'bg-ukm-gold',
  categoryText: 'text-white',
};

const projectVisuals: Record<string, ResearchVisual> = {
  'proj-2': {
    image: '/assets/biobank-sample-tubes.jpg',
    imageAlt: 'Barcoded biobank sample tubes supporting infection and microbiome research at UMBI UKM',
    imageCaption: {
      en: 'Biobank sample tubes supporting MySerobiome research at UMBI UKM',
      bm: 'Tiub sampel biobank yang menyokong penyelidikan MySerobiome di UMBI UKM',
    },
    categoryBg: biobankVisual.categoryBg,
    categoryText: biobankVisual.categoryText,
  },
  'proj-3': {
    image: '/assets/myprecise-sequencing-laboratory.png',
    imageAlt: 'Genome-sequencing equipment used to support the MyPrecise project at UMBI UKM',
    imageCaption: {
      en: 'Genome-sequencing laboratory supporting the MyPrecise project at UMBI UKM',
      bm: 'Makmal penjujukan genom yang menyokong projek MyPrecise di UMBI UKM',
    },
    categoryBg: biobankVisual.categoryBg,
    categoryText: biobankVisual.categoryText,
  },
  'proj-4': {
    image: '/assets/visit-fundus-photography.jpg',
    imageAlt: 'Fundus photography examination supporting retinal data collection at UMBI UKM',
    imageCaption: {
      en: 'Fundus photography supporting retinal data collection for PRIME at UMBI UKM',
      bm: 'Fotografi fundus yang menyokong pengumpulan data retina untuk PRIME di UMBI UKM',
    },
    categoryBg: clinicalVisual.categoryBg,
    categoryText: clinicalVisual.categoryText,
  },
  'proj-7': {
    image: '/assets/visit-biophysical-measurement.jpg',
    imageAlt: 'TMC participant undergoing a biophysical assessment for lifestyle research at UMBI UKM',
    imageCaption: {
      en: 'Biophysical assessment supporting TMC lifestyle and obesity research at UMBI UKM',
      bm: 'Penilaian biofizikal yang menyokong penyelidikan gaya hidup dan obesiti TMC di UMBI UKM',
    },
    categoryBg: lifestyleVisual.categoryBg,
    categoryText: lifestyleVisual.categoryText,
  },
  'proj-20': {
    image: '/assets/visit-dexa.jpg',
    imageAlt: 'DEXA assessment supporting sarcopenia and metabolic research at UMBI UKM',
    imageCaption: {
      en: 'Body-composition assessment supporting sarcopenia research at UMBI UKM',
      bm: 'Penilaian komposisi badan yang menyokong penyelidikan sarkopenia di UMBI UKM',
    },
    categoryBg: lifestyleVisual.categoryBg,
    categoryText: lifestyleVisual.categoryText,
  },
};

export const getResearchVisual = (
  category: ResearchInitiativeItem['category'],
  projectId?: ResearchInitiativeItem['id']
): ResearchVisual => {
  if (projectId && projectVisuals[projectId]) return projectVisuals[projectId];
  if (category === 'Lifestyle & Nutrition') return lifestyleVisual;
  if (
    category === 'Cardiometabolic' ||
    category === 'Cancer Screening' ||
    category === 'Imaging & Biomarkers'
  ) {
    return clinicalVisual;
  }
  return biobankVisual;
};
