import { ResearchInitiativeItem } from '../types';

interface ResearchVisual {
  image: string;
  imageAlt: string;
  categoryBg: string;
  categoryText: string;
}

const biobankVisual: ResearchVisual = {
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQdiqBYSxg8rgOuIprTBGVc8Dlv24jtYki_2O6P-5bSr0UYJQ3222uwTEFBNBgXJ5uzEMOLU_DcvSFTOnMVJCXZdXQZ3pI7EiTU2g9GfBipsRalgEqz0xJVgsVmKRAEu3oRX-0cyLaradzhA8YasWNYdvZbLxr7tWTDgSM3rI3lgozfsnK1Z6rmxjGADjJWFlIs-UqOxPuuvvq6lyluneHjkF6BeF3lyx8kRplaaY9Q01Cc72rHEr6',
  imageAlt: 'Illustrative view of TMC biobank and genomic research',
  categoryBg: 'bg-ukm-navy',
  categoryText: 'text-white',
};

const clinicalVisual: ResearchVisual = {
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjqvqRLcOGs3ClYoXac94V1xX5m4FwjAd3iYfu4qzGt--qmibqzno-2yVXjL-q8D68tqtp5lY93AO_g4fPnTRRlOLIqaCKqoJoszSXdeNyxTJFYUZTgz5tUpT6SEy-lWhcB_rNEsvnMEy__71EvqKNFuJ6ptVigWUmJf2YY2_Dcj0tu9hPJ6VjuV5VSHq3eT0xzNAX2wRx2ORxXDS4pbA8Qo40YMWM2ZNLTsbSI7F3qIElhPppJgDY',
  imageAlt: 'Illustrative view of clinical research with a TMC participant',
  categoryBg: 'bg-ukm-crimson',
  categoryText: 'text-white',
};

const lifestyleVisual: ResearchVisual = {
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvslRD4iB8OjuDZAK4pYHRKet8O7v4BVDSjdm9VRUGXs1JbcF7jIzHFJK1vlNDKOkNpa6_cxXEV6-AaE5eG4-xvlIV6kBjuLVyvliryLjTMmRi-btsXKPsVpUzriVW2SRBNiNLkD8r2cL4MBgdzhmUpx6-JhqrlbgOWkHJQxkD2YHXgZ4HvLf4HU2OLgT4qz71iXPb8n1nCRiLGvWtPEmjyahzZ8Narr-GGMvTW8KdQlJNhNCffkXO',
  imageAlt: 'Illustrative view of community lifestyle and nutrition research',
  categoryBg: 'bg-ukm-gold',
  categoryText: 'text-white',
};

export const getResearchVisual = (
  category: ResearchInitiativeItem['category']
): ResearchVisual => {
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
