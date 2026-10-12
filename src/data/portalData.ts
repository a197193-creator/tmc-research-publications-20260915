import { portalRecords } from '../utils/portalRuntime';
import { BulletinItem, ParticipantMaterial, ResearchInitiativeItem } from '../types';

export const bulletinNews: BulletinItem[] = [
  {
    id: 'news-1',
    tag: 'Follow-up Screening',
    tagBg: 'bg-red-100',
    tagColor: 'text-ukm-crimson',
    date: '18 Mar 2025',
    title: 'Follow-up Screening Schedule for Klang Valley Zone Announced',
    snippet: 'Registered participants in Kuala Lumpur and Selangor can now reserve morning fasting blood appointments at UMBI Cheras.',
    body: 'Follow-up health screening is underway at the UKM Medical Molecular Biology Institute (UMBI) in Cheras. Eligible registered cohort members may receive complimentary clinical evaluations, including complete blood count, lipid profile, HbA1c, renal profile, electrocardiogram (ECG), body composition analysis, and doctor consultations. Appointments are available Mondays through Fridays from 8:00 AM.'
  },
  {
    id: 'news-2',
    tag: 'International',
    tagBg: 'bg-blue-100',
    tagColor: 'text-ukm-navy',
    date: '05 Mar 2025',
    title: 'UMBI Welcomes Global Genomic Medicine Consortium (G2MC) Delegates',
    snippet: 'High-level dialogue on multi-ethnic Asian population cohort interoperability and clinical genomics pipelines.',
    body: 'Representatives from 14 international biobanks and clinical genetics institutes convened at UMBI UKM to discuss federated data sharing, ethical standards in genomic research, and the inclusion of underrepresented Southeast Asian ancestral profiles in global clinical drug trial pipelines.'
  },
  {
    id: 'news-3',
    tag: 'Community',
    tagBg: 'bg-amber-100',
    tagColor: 'text-amber-900',
    date: '24 Feb 2025',
    title: 'Healthy Aging & Nutrition Workshop for Cohort Seniors',
    snippet: 'Interactive clinical nutritionist seminar and complimentary blood glucose checks hosted at UMBI Auditorium.',
    body: 'Over 250 senior cohort participants and their families gathered at the UMBI Auditorium for a half-day interactive seminar on managing hypertension through culturally tailored culinary choices, resistance exercises for musculoskeletal health, and free personal diet consultations with UMBI clinical dietitians.'
  }
];

// Operational recruitment/appointment bulletins are preserved for migration
// to the main TMC website, but are intentionally excluded from this platform.
// Research news remains empty until Communications/management confirms which
// records are approved for the Research & Publications website. Participant
// operational notices stay available to the retained main-site components.
export const researchBulletinNews: BulletinItem[] = portalRecords('news', []);

export const participantMaterialsList: ParticipantMaterial[] = [
  {
    id: 'mat-1',
    title: 'Follow-Up Screening Preparation Guide',
    fileType: 'PDF',
    size: '1.2MB',
    description: 'Crucial instructions for your repeat clinical screening visit. Covers mandatory 10-hour fasting rules, morning medication guidelines, attire recommendations, and parking information.',
    contentSnippet: [
      '1. Fasting Requirement: Please fast (no food or sweet drinks) for 10 to 12 hours before your morning appointment. Plain water is permitted and encouraged.',
      '2. Chronic Medications: Blood pressure medication may be taken with a sip of water. Diabetes medications should be brought along and taken ONLY after the fasting blood draw and breakfast.',
      '3. Attire: Wear loose, comfortable short-sleeved clothing to facilitate blood pressure checks, ECG electrode placement, and blood draws.',
      '4. What to bring: MyKad/IC card, appointment confirmation SMS/card, and previous medical discharge notes or prescriptions if applicable.'
    ]
  },
  {
    id: 'mat-2',
    title: 'Participant Information Update Form',
    fileType: 'PDF',
    size: '850KB',
    description: 'Official UKM form to notify the TMC data registry of updated mailing addresses, mobile phone numbers, emergency contact details, or changes in medical history.',
    contentSnippet: [
      'Use this form to ensure our research nurses can reach you for subsequent phase updates, abnormal laboratory result notifications, and repeat health screening invitations.',
      'Completed forms can be handed over directly to the UMBI screening team or submitted online via the Participant Portal.'
    ]
  },
  {
    id: 'mat-3',
    title: 'Annual TMC Impact Report 2024',
    fileType: 'PDF',
    size: '4.8MB',
    description: 'Comprehensive 64-page institutional report presenting the scientific achievements, policy contributions, participant demographics, and international publications funded by MOHE.',
    contentSnippet: [
      'Key Highlights from 2024:',
      '• Over 18 peer-reviewed publications in top-tier medical journals.',
      '• 94% retention rate across 15-year longitudinal follow-up waves.',
      '• Upgraded ISO 15189 biobanking automation facility with liquid nitrogen vapor cooling tanks.',
      '• National policy contributions to the Malaysian National Strategic Plan for Non-Communicable Diseases (NSP-NCD).'
    ]
  }
];

export const allResearchInitiatives: ResearchInitiativeItem[] = [
  {
    id: 'proj-1',
    sourceRow: 2,
    title: 'The Malaysian Cohort (TMC) – Data Collection',
    category: 'Cohort Infrastructure',
    status: 'Active',
    samplesCount: '119,598 current / 120,000 target',
    targetedParticipants: '120,000',
    currentParticipants: '119,598',
    duration: '2006 – Ongoing',
    collaborators: 'More than 60 Malaysian researchers across UM, UPM, USM, UMS, UiTM and UniSZA; IKU–MOH; ACC, P3G and IHCC; Japan’s AMED; the University of Newcastle Australia; Oxford University; Dundee University; and institutional partners in serology, microbiome, GWAS, nutrition, infectious diseases and biomarker discovery.',
    description: 'TMC baseline recruitment was conducted from 2008 to 2012, with subsequent recruitment undertaken for new research initiatives, including the CovGen project.',
    funding: 'MOSTI/KPT',
    participantDataSource: 'Recruitment'
  },
  {
    id: 'proj-2',
    sourceRow: 11,
    title: 'Immunochemical Faecal Occult Blood Test (IFOBT)',
    category: 'Cancer Screening',
    status: 'Active',
    samplesCount: '11,737 current; target listed under sub-projects',
    targetedParticipants: 'See sub-projects in the index',
    currentParticipants: '11,737',
    duration: '2016 – Ongoing',
    collaborators: 'Not listed in the project index',
    description: 'A population-friendly iFOBT initiative that integrates risk stratification, kit distribution, laboratory processing, colonoscopy follow-up, histopathology, data management and biobank linkage into a complete end-to-end colorectal cancer screening framework for early detection and prioritised diagnosis.',
    funding: 'Not listed in the project index',
    participantDataSource: 'Recruitment'
  },
  {
    id: 'proj-3',
    sourceRow: 13,
    title: 'Immunochemical Faecal Occult Blood Test (IFOBT) – Colorectal Cancer Screening Using iFOBT in a Malaysian Population Aged 40–65 Years: Community Intervention Approach',
    category: 'Cancer Screening',
    status: 'Completed',
    samplesCount: '583 current / 583 target',
    targetedParticipants: '583',
    currentParticipants: '583',
    duration: '7 Jan 2021 – 30 Jun 2024',
    collaborators: 'Faculty of Medicine UKM, HCTM, Faculty of Public Health Kuwait University, DBKL, JPNIN, and resident associations of seven PPR communities in Bandar Tun Razak.',
    description: 'A community-based colorectal cancer screening project delivering iFOBT testing, colonoscopy follow-up and colorectal cancer awareness activities across multiple PPR communities to evaluate screening uptake, cost-effectiveness and risk factors among Malaysians aged 40–65.',
    funding: 'HiCOE/KPT',
    participantDataSource: 'Recruitment'
  },
  {
    id: 'proj-4',
    sourceRow: 17,
    title: 'Life Exposures to Infections and Microbiome Profiles: Elucidating the Link and Impact on Chronic Diseases via a Population-Based Study (MySerobiome)',
    category: 'Infection & Microbiome',
    status: 'Active',
    samplesCount: 'Current count pending validation / 3,000 target',
    targetedParticipants: '3,000',
    currentParticipants: '4,008',
    duration: '12 Dec 2024 – Ongoing (30 Jun 2026 listed)',
    collaborators: 'More than 60 researchers from UKM (UMBI, FPER and FGG) and UPM across internal medicine, psychiatry, public health, paediatrics, surgery, obstetrics and gynaecology, family dentistry, craniofacial diagnostics and biosciences, and molecular biology.',
    description: 'A RM9.09 million national study investigating how life-course infection exposure and the gut microbiome shape chronic disease risk. It includes a 3,000-sample microbiome profiling initiative using shallow shotgun metagenomics and a 5,000-paired serum seroprevalence component using a 51-pathogen multiplex antibody panel co-developed with Sengenics.',
    funding: 'KPT',
    participantDataSource: 'Not listed in the project index'
  },
  {
    id: 'proj-5',
    sourceRow: 32,
    title: 'Towards Precision Health Malaysia: Whole Genome Sequencing of Healthy and Diseased Individuals (MyPrecise)',
    category: 'Genomics',
    status: 'Active',
    samplesCount: '4,000 target; current count not listed',
    targetedParticipants: '4,000',
    currentParticipants: 'Not listed in the project index',
    duration: '12 Dec 2024 – Ongoing (11 Dec 2026 listed)',
    collaborators: 'Prof. Datin Dr. Marina Mat Baki; Prof. Datin Dr. Norlinah Mohamed Ibrahim; Prof. Dr. Norlaila Mustafa; Dr. Izzatul’ Aliaa Baharuddin; Dr. Farin Masra; Assoc. Prof. Dr. Norazlin Kamal Nor; Dr. Yang Wai Wai; Assoc. Prof. Dr. Hasnah Toran; Assoc. Prof. Dr. Saharuddin Ahmad; and Dr. Nazrina Noor Azlan.',
    description: 'Whole-genome sequencing of 4,000 individuals across 22 healthy and disease clusters using biospecimens from the TMC and UMBI biobanks, complemented by new recruitment from the Octogenarian Health Cohort and Orang Asli communities.',
    funding: 'KPT',
    participantDataSource: 'Recruitment and biobank'
  },
  {
    id: 'proj-6',
    sourceRow: 57,
    title: 'Precision Medicine for Diabetic Individuals – Malaysia–UK (PRIME)',
    category: 'Cardiometabolic',
    status: 'Completed',
    samplesCount: '5,000 current / 5,000 target',
    targetedParticipants: '5,000',
    currentParticipants: '5,000',
    duration: '2019 – 2023',
    collaborators: 'A Malaysia–UK team of 10 researchers from Malaysia and six from the United Kingdom, involving UKM, IJN, KKM and the University of Dundee.',
    description: 'A Malaysia–UK precision diabetes project integrating retinal, clinical and genomic data from 5,000 participants with type 2 diabetes to improve risk prediction and personalised treatment.',
    funding: 'MRC',
    participantDataSource: 'Recruitment',
    referenceUrl: 'https://www.ukm.my/umbi/prime/'
  },
  {
    id: 'proj-7',
    sourceRow: 58,
    title: 'Obesity & Non-Communicable Disease in Malaysia: An Imaging Study of 6,000 Adults in The Malaysian Cohort Study (Oxford)',
    category: 'Imaging & Biomarkers',
    status: 'Completed',
    samplesCount: '5,498 DEXA and 105 MRI; 6,000 target',
    targetedParticipants: '6,000',
    currentParticipants: '5,498 DEXA; 105 MRI',
    duration: '2019 – 2023',
    collaborators: 'Four Malaysian researchers from UKM and four UK researchers from the University of Oxford.',
    description: 'A Malaysia–UK study integrating clinical, molecular and high-resolution imaging data (DXA and MRI) from up to 6,000 TMC adults to advance understanding of obesity and non-communicable diseases through harmonised datasets, biomarker discovery and improved risk-prediction models.',
    funding: 'MRC',
    participantDataSource: 'Recruitment'
  },
  {
    id: 'proj-8',
    sourceRow: 59,
    title: 'A COVID-19 Cohort: Genetic Variants and Host Risk Factors Associated With Severity of Infection (COVGEN)',
    category: 'Infection & Microbiome',
    status: 'Completed',
    samplesCount: '2,524 current / 2,524 target',
    targetedParticipants: '2,524',
    currentParticipants: '2,524',
    duration: 'Aug 2021 (day not listed) – 2024',
    collaborators: 'UKM collaborators from HCTM; Faculty of Medicine departments; the Faculty of Health Sciences Community Health Research Centre (ReaCH); and MOH Cheras Health Office and Cheras Health Clinic.',
    description: 'A cohort of 2,524 participants integrating biospecimen analysis, immune-genomic risk profiling, structured follow-ups and severity-variant mapping to identify determinants of COVID-19 severity and long-COVID outcomes.',
    funding: 'KPT (SUKUK)',
    participantDataSource: 'Recruitment'
  },
  {
    id: 'proj-9',
    sourceRow: 62,
    title: 'Menangani Obesiti: Intervensi dan Penggunaan Wearables ke Arah Komuniti Sihat Sejahtera dan MADANI (MOF)',
    category: 'Lifestyle & Nutrition',
    status: 'Active',
    samplesCount: '400 target; current count not listed',
    targetedParticipants: '400',
    currentParticipants: 'Not listed in the project index',
    duration: '8 Jul 2024 – Ongoing (30 Jul 2026 listed)',
    collaborators: '16 researchers from UKM (UMBI, FSK and FPER) and the University of Oxford.',
    description: 'A Komuniti@UniMADANI initiative with a listed allocation of RM135,000, integrating science- and technology-based lifestyle interventions using wearables and a mobile application to monitor health parameters.',
    funding: 'MOF',
    participantDataSource: 'Recruitment'
  },
  {
    id: 'proj-10',
    sourceRow: 65,
    title: 'Differences in Retinal Vessels Calibre Between Patients With Hypertension, Pre-Hypertension and Without Hypertension Among Adult Malaysian Population (Retina-Hypertension)',
    category: 'Imaging & Biomarkers',
    status: 'Active',
    samplesCount: '225 target; current count not listed',
    targetedParticipants: '225',
    currentParticipants: 'Not listed in the project index',
    duration: '11 Jun 2025 – Ongoing (5 Jan 2027 listed)',
    collaborators: 'Department of Ophthalmology, Faculty of Medicine, UKM.',
    description: 'TMC – Retina – Hypertension.',
    funding: 'Collaborator project',
    participantDataSource: 'Recruitment'
  },
  {
    id: 'proj-11',
    sourceRow: 66,
    title: 'Differences in Retinal Vessels Calibre Between Patients With and Without Dyslipidemia Among Adult Malaysian Population (Retina-Dyslipidemia)',
    category: 'Imaging & Biomarkers',
    status: 'Active',
    samplesCount: '126 target; current count not listed',
    targetedParticipants: '126',
    currentParticipants: 'Not listed in the project index',
    duration: '24 Apr 2025 – Ongoing (23 Dec 2026 listed)',
    collaborators: 'Department of Ophthalmology, Faculty of Medicine, UKM.',
    description: 'TMC – Retina – Dyslipidemia.',
    funding: 'Collaborator project',
    participantDataSource: 'Recruitment'
  },
  {
    id: 'proj-12',
    sourceRow: 68,
    title: 'Comparison of Retinal Vessel Caliber in Type 2 Diabetes Mellitus Patients With and Without Chronic Kidney (Retina-T2D W/CKD)',
    category: 'Imaging & Biomarkers',
    status: 'Completed',
    samplesCount: '264 current / 264 target',
    targetedParticipants: '264',
    currentParticipants: '264',
    duration: '22 Sep 2021 – 21 Jun 2023',
    collaborators: 'Department of Ophthalmology, Faculty of Medicine, UKM',
    description: 'PRIME Extension Project; TMC-Retina-T2D W/CKD.',
    funding: 'Collaborator project',
    participantDataSource: 'Recruitment'
  },
  {
    id: 'proj-13',
    sourceRow: 69,
    title: 'Cardiovascular Disease Prediction Among The Malaysian Cohort Participants Using Electrocardiogram (ECG)',
    category: 'Cardiometabolic',
    status: 'Completed',
    samplesCount: '244 current / 370 target',
    targetedParticipants: '370',
    currentParticipants: '244',
    duration: '2019 – 2021',
    collaborators: 'Faculty of Engineering, Faculty of Health Sciences, Institute Islam Hadhari and UniKL.',
    description: 'Automated ECG fiducial-point detection and machine-learning-based prediction of cardiovascular disease using 48 ECG features from TMC baseline ECG recordings.',
    funding: 'FRGS/MOE',
    participantDataSource: 'Database and biobank'
  },
  {
    id: 'proj-14',
    title: 'Development and Validation of a Semiquantitative Food Frequency Questionnaire (FFQ)',
    sourceRow: 70,
    category: 'Lifestyle & Nutrition',
    status: 'Completed',
    samplesCount: '803 current / 1,000 target',
    targetedParticipants: '1,000',
    currentParticipants: '803',
    duration: '2018 – 2021',
    collaborators: 'Faculty of Health Sciences UKM, Cyberjaya University College of Medical Sciences (CUCMS), and Universiti Sains Malaysia (USM).',
    description: 'The study developed a 203-item semiquantitative food frequency questionnaire using data from 803 TMC participants and validated it against repeated 24-hour dietary recalls among 64 participants, demonstrating moderate relative validity for most nutrients.',
    funding: 'KPT',
    participantDataSource: 'Recruitment'
  },
  {
    id: 'proj-15',
    title: 'Malaysian Genome (MyGenome)',
    sourceRow: 71,
    category: 'Genomics',
    status: 'Completed',
    samplesCount: '26 current / 26 target',
    targetedParticipants: '26',
    currentParticipants: '26',
    duration: '2011 – 2012',
    collaborators: 'Malaysian Genomics Resource Centre Berhad (MGRC) and MGI, with comparative analyses supported by the 1000 Genomes Project, Korean Open Genomes and Pan-Asian SNP panels.',
    description: 'Malaysia’s first deep whole-genome sequencing project covering 26 sub-ethnic groups to generate a national genomic reference dataset, identifying millions of genetic variants through high-depth next-generation sequencing, bioinformatics and cross-validation analyses.',
    funding: 'MOSTI',
    participantDataSource: 'Database and biobank'
  },
  {
    id: 'proj-16',
    sourceRow: 72,
    title: 'GWAS: Malaysian Multi-Ethnic Type 2 Diabetes Genetic Risk Study (GWAS)',
    category: 'Genomics',
    status: 'Completed',
    samplesCount: '4,077 current / 4,077 target',
    targetedParticipants: '4,077',
    currentParticipants: '4,077',
    duration: '2012 – 2015',
    collaborators: 'Newcastle University Australia.',
    description: 'GWAS Diabetes Study – Metabochip.',
    funding: 'Not listed in the project index',
    participantDataSource: 'Database and biobank'
  },
  {
    id: 'proj-17',
    sourceRow: 74,
    title: 'Establishment of an Immunofluorescence Assay to Detect IgM Antibodies to Nipah Virus Using HeLa Cells Expressing Recombinant Nucleoprotein',
    category: 'Infection & Microbiome',
    status: 'Completed',
    samplesCount: '90 current / 90 target',
    targetedParticipants: '90',
    currentParticipants: '90',
    duration: '2017 – 2018',
    collaborators: 'National Institute of Infectious Diseases (NIID), Japan; Australian Animal Health Laboratory, Australia; and Research Institute for Tropical Medicine (RITM), Philippines.',
    description: 'Development and validation of an immunofluorescence assay using NiV-N-expressing HeLa cells to detect early-stage IgM antibodies to Nipah virus.',
    funding: 'Not listed in the project index',
    participantDataSource: 'Database and biobank'
  },
  {
    id: 'proj-18',
    title: 'Genetics of Sudden Cardiac Death',
    sourceRow: 79,
    category: 'Genomics',
    status: 'Completed',
    samplesCount: '174 current / 174 target',
    targetedParticipants: '174',
    currentParticipants: '174',
    duration: '2017 – 2020',
    collaborators: 'UMBI–UKM and Institut Jantung Negara (IJN)',
    description: 'Analysis of 174 cardiac-related genes using next-generation sequencing on archived TMC samples, supported by UMBI and IJN, to identify genetic mutations underlying sudden cardiac death and enable early family screening.',
    funding: 'Not listed in the project index',
    participantDataSource: 'Database and biobank'
  }
];

export interface DemoParticipant {
  id: string;
  mykad: string;
  name: string;
  cohortYear: number;
  phase3Status: 'Scheduled' | 'Completed' | 'Pending Invitation' | 'Action Needed';
  appointmentDate?: string;
  appointmentTime?: string;
  location: string;
  fastingRequired: boolean;
  bloodSampleCount: number;
  contactNumber: string;
  address: string;
  recentTestSummary?: {
    date: string;
    bloodPressure: string;
    fastingGlucose: string;
    totalCholesterol: string;
    bmi: string;
  };
}

export const demoParticipants: DemoParticipant[] = [
  {
    id: 'TMC-106200',
    mykad: '580314-10-5521',
    name: 'Haji Ahmad bin Sulaiman',
    cohortYear: 2007,
    phase3Status: 'Scheduled',
    appointmentDate: '2025-04-14',
    appointmentTime: '08:30 AM',
    location: 'UMBI UKM Cheras (Lobby Clinical Center)',
    fastingRequired: true,
    bloodSampleCount: 16,
    contactNumber: '+60 12-384 9912',
    address: 'No. 45, Jalan Memanda 9, Ampang Jaya, 68000 Selangor',
    recentTestSummary: {
      date: 'Phase 2 (2018)',
      bloodPressure: '128/82 mmHg',
      fastingGlucose: '5.4 mmol/L',
      totalCholesterol: '4.8 mmol/L',
      bmi: '24.2 kg/m²'
    }
  },
  {
    id: 'TMC-084920',
    mykad: '640922-14-5108',
    name: 'Tan Mei Ling',
    cohortYear: 2008,
    phase3Status: 'Pending Invitation',
    appointmentDate: 'Open for Booking',
    appointmentTime: 'Morning Session',
    location: 'UMBI UKM Cheras',
    fastingRequired: true,
    bloodSampleCount: 12,
    contactNumber: '+60 19-224 8103',
    address: 'B-12-04, Residensi Midah, Taman Midah, Cheras, 56000 Kuala Lumpur',
    recentTestSummary: {
      date: 'Phase 2 (2019)',
      bloodPressure: '118/76 mmHg',
      fastingGlucose: '5.1 mmol/L',
      totalCholesterol: '4.5 mmol/L',
      bmi: '22.6 kg/m²'
    }
  },
  {
    id: 'TMC-041832',
    mykad: '711105-08-5933',
    name: 'Suresh a/l Ramasamy',
    cohortYear: 2009,
    phase3Status: 'Action Needed',
    appointmentDate: 'Reschedule Requested',
    appointmentTime: 'Pending Confirmation',
    location: 'UMBI UKM Cheras',
    fastingRequired: true,
    bloodSampleCount: 14,
    contactNumber: '+60 17-640 1982',
    address: 'No. 12, Lorong Maarof, Bangsar, 59000 Kuala Lumpur',
    recentTestSummary: {
      date: 'Phase 2 (2017)',
      bloodPressure: '134/86 mmHg',
      fastingGlucose: '6.1 mmol/L',
      totalCholesterol: '5.2 mmol/L',
      bmi: '26.1 kg/m²'
    }
  }
];
