import { tiruppurGalleryItems } from './tiruppurGalleryData';

export interface DistrictEducationActivity {
  title: string;
  category: 'School Camp' | 'Self Defense' | 'Environment' | 'Higher Education' | 'Community Drive';
  badge: string;
  description: string;
  beneficiaries: string;
  iconName: string;
}

export interface DistrictScholarshipDetail {
  title: string;
  amount: string;
  type: string;
  eligibility: string;
  highlight: string;
}

export interface DistrictGuidanceFeature {
  title: string;
  description: string;
  tag: string;
}

export interface DistrictPhotoItem {
  id: string;
  title: string;
  schoolName: string;
  location: string;
  studentsCount: string;
  photoUrl: string;
  category: string;
  caption: string;
}

export interface DistrictEducationInfo {
  id: string;
  slug: string;
  name: string;
  tamilName: string;
  subtitle: string;
  hubLocation: string;
  bannerColor: string;
  accentColor: string;
  stats: {
    studentsMentored: string;
    schoolsCovered: string;
    scholarshipsDisbursed: string;
    volunteersCount: string;
  };
  summary: string;
  officeDetails: {
    address: string;
    phone: string;
    email: string;
    incharge: string;
  };
  activities: DistrictEducationActivity[];
  scholarships: DistrictScholarshipDetail[];
  careerGuidance: DistrictGuidanceFeature[];
  photos: DistrictPhotoItem[];
}

export const DISTRICT_EDUCATION_DATA: Record<string, DistrictEducationInfo> = {
  coimbatore: {
    id: 'coimbatore',
    slug: 'coimbatore',
    name: 'Coimbatore',
    tamilName: 'Headquarters Hub',
    subtitle: 'Headquarters & Central Education Operations Hub',
    hubLocation: '1st Floor, Natesa Gounder St, Rathinapuri, Ganapathy, Coimbatore',
    bannerColor: 'from-[#071c35] via-[#0d2e6e] to-[#7f1026]',
    accentColor: '#7f1026',
    stats: {
      studentsMentored: '45,000+',
      schoolsCovered: '45+ Schools Documented',
      scholarshipsDisbursed: '₹7.48L+',
      volunteersCount: '500+ Active Volunteers',
    },
    summary:
      'Coimbatore serves as the founding headquarters of GSG Trust since 2013. We have documented and supported over 45 Corporation and Government Higher Secondary schools with career roadmaps, ICC aptitude tests, 100% free fee verification, and direct college placement.',
    officeDetails: {
      address: '1st Floor, Natesa Gounder St, Lakshmipuram, Rathinapuri, Ganapathy, Coimbatore, Tamil Nadu 641027',
      phone: '+91-97893 40230',
      email: 'gsgtrustcbe@gmail.com',
      incharge: 'Vinodkumar Ravichandran (Founder-Chairman)',
    },
    activities: [
      {
        title: 'Annual Corporation & Govt School Career Guidance Drives',
        category: 'School Camp',
        badge: '45+ Schools',
        description:
          'Comprehensive career exploration sessions across all 45 Coimbatore Corporation & Government schools, guiding Class 10 & 12 students on college degrees and cut-offs.',
        beneficiaries: '25,000+ Students Annually',
        iconName: 'GraduationCap',
      },
      {
        title: 'Free ICC Interest-Competency-Career Aptitude Testing',
        category: 'Higher Education',
        badge: 'Zero Charges',
        description:
          'Psychometric aptitude tests helping students identify their true strengths in Engineering, Computer Science, Commerce, and Allied Health Sciences.',
        beneficiaries: '12,500+ Assessed',
        iconName: 'Sparkles',
      },
      {
        title: 'Agni Thaaragai Self-Defense for School & College Girls',
        category: 'Self Defense',
        badge: 'Safety First',
        description:
          'Hands-on physical self-defense tactics and mental empowerment training conducted in Corporation Higher Secondary schools in urban & rural Coimbatore.',
        beneficiaries: '3,800+ Girls Trained',
        iconName: 'ShieldCheck',
      },
      {
        title: 'Thaagam Theerpom Public Welfare & Student Relief Movement',
        category: 'Community Drive',
        badge: 'Radio City Partnered',
        description:
          'Providing clean drinking water access, educational stationery kits, uniforms, and youth social service volunteering in collaboration with Radio City.',
        beneficiaries: '50,000+ Citizens & Youth Reached',
        iconName: 'HeartHandshake',
      },
    ],
    scholarships: [
      {
        title: 'GSG Trust Direct Higher Education Grant',
        amount: '₹5,000 to ₹10,000',
        type: 'Tuition Fee Assistance',
        eligibility: 'Class 12 pass-outs from Coimbatore Govt & Corporation schools with family income < ₹2 LPA',
        highlight: 'Disbursed directly toward collegiate admission fee without intermediary deductions.',
      },
      {
        title: '7.5% Government School Quota Zero-Fee Verification',
        amount: '100% Tuition & Hostel Coverage',
        type: 'State Quota Assistance',
        eligibility: 'Students who studied from 6th to 12th standard in Coimbatore Government schools',
        highlight: 'Complete online counseling form filling and certificate verification desk at Rathinapuri.',
      },
      {
        title: 'First Graduate Concession Advisory',
        amount: '₹20,000 to ₹25,000/yr',
        type: 'Government Fee Waiver Assistance',
        eligibility: 'First member in the family entering higher education',
        highlight: 'Zero-charge processing of First Graduate certificate and college fee verification.',
      },
      {
        title: 'Destitute & Single-Parent Special Educational Sponsorship',
        amount: 'Full College Semester Fees',
        type: 'Special Relief Grant',
        eligibility: 'Students who have lost one or both parents, or facing severe financial hardship',
        highlight: 'Continuous 3-year or 4-year mentorship and full sponsorship until graduation.',
      },
    ],
    careerGuidance: [
      {
        title: 'TNEA Engineering Rank & Cutoff Counselling',
        description: 'Personalized rank analysis, college priority choice-filling, and autonomous college placement guidance.',
        tag: 'Engineering 2026',
      },
      {
        title: 'Arts, Science & Commerce College Selection',
        description: 'Guidance on top-ranked institutions in Coimbatore (KGCAS, KKCAS, Rathinam, CIT, etc.) with zero donation fees.',
        tag: 'UG Admissions',
      },
      {
        title: 'Allied Health Sciences & Paramedical Help Desk',
        description: 'Advisory on B.Sc Nursing, B.Pharm, Radiology, Cardiac Care and Physiotherapy government seat quotas.',
        tag: 'Medical Quota',
      },
      {
        title: 'Walk-In Student Counselling Center',
        description: 'Direct face-to-face counselling at our Rathinapuri Centre (1st Floor, Natesa Gounder St, Ganapathy) from Monday to Saturday.',
        tag: 'Direct Walk-In',
      },
    ],
    photos: [
      {
        id: 'cbe-1',
        title: 'Career Guidance Seminar at CHSS Rathinapuri',
        schoolName: 'CHSS Rathinapuri',
        location: 'Rathinapuri, Coimbatore',
        studentsCount: '120+ Students',
        photoUrl: '/images/gallery/cards/chss-rathinapuri_photo.jpg',
        category: 'Career Guidance',
        caption: 'GSG Trust career experts guiding Class 12 students on higher secondary cut-off and college selection.',
      },
      {
        id: 'cbe-2',
        title: 'Personality & Soft Skills Camp at CHSS Selvapuram',
        schoolName: 'CHSS Selvapuram',
        location: 'Selvapuram, Coimbatore',
        studentsCount: '110+ Students',
        photoUrl: '/images/gallery/cards/chss-selvapuram_photo.jpg',
        category: 'Soft Skills',
        caption: 'Interactive delicate ability and public speaking workshop conducted by volunteer coordinators.',
      },
      {
        id: 'cbe-3',
        title: 'Engineering & Arts Cut-off Workshop at GHSS Kalapatti',
        schoolName: 'GHSS Kalapatti',
        location: 'Kalapatti, Coimbatore',
        studentsCount: '135+ Students',
        photoUrl: '/images/gallery/cards/ghss-kalapatti_photo.jpg',
        category: 'Higher Education',
        caption: 'Detailed roadmap for first-generation graduates navigating Anna University single-window counselling.',
      },
      {
        id: 'cbe-4',
        title: 'Class 12 Career Strategy at CHSS Peelamedu',
        schoolName: 'CHSS Peelamedu',
        location: 'Peelamedu, Coimbatore',
        studentsCount: '140+ Students',
        photoUrl: '/images/gallery/cards/chss-peelamedu_photo.jpg',
        category: 'Career Guidance',
        caption: 'Over 140 students attending the career aptitude test and degree pathway lecture.',
      },
      {
        id: 'cbe-5',
        title: 'Higher Secondary Motivation Drive at GHSS Madukkarai',
        schoolName: 'GHSS Madukkarai',
        location: 'Madukkarai, Coimbatore',
        studentsCount: '115+ Students',
        photoUrl: '/images/gallery/cards/ghss-madukkarai_photo.jpg',
        category: 'Higher Education',
        caption: 'Encouraging government school students to pursue engineering, commerce, and computer science.',
      },
      {
        id: 'cbe-6',
        title: 'Youth Leadership & Career Orientation at GHSS Karamadai',
        schoolName: 'GHSS Karamadai',
        location: 'Karamadai, Coimbatore',
        studentsCount: '130+ Students',
        photoUrl: '/images/gallery/cards/ghss-karamadai_photo.jpg',
        category: 'Career Guidance',
        caption: 'Northern Coimbatore cluster school session addressing exam preparation and career opportunities.',
      },
    ],
  },

  tiruppur: {
    id: 'tiruppur',
    slug: 'tiruppur',
    name: 'Tiruppur',
    tamilName: 'Corporation Hub',
    subtitle: 'Corporation School Drives & Textile Belt Student Upliftment',
    hubLocation: 'DSCET Off-Campus Admissions & Verification Centre, Tiruppur',
    bannerColor: 'from-[#071c35] via-[#123962] to-[#b77b08]',
    accentColor: '#b77b08',
    stats: {
      studentsMentored: '15,000+',
      schoolsCovered: '70+ Schools Documented',
      scholarshipsDisbursed: '₹3.20L+',
      volunteersCount: '120+ Active Volunteers',
    },
    summary:
      'In the industrial and textile hub of Tiruppur, GSG Trust actively mentors children of garment and daily-wage workers. We have documented 70 Government and Corporation Higher Secondary schools across 8 comprehensive field sheets, ensuring youth transition smoothly into technical degrees, polytechnics, and premier colleges.',
    officeDetails: {
      address: 'DSCET Admissions & Verification Hub, Avinashi Road / Corporation Cluster, Tiruppur - 641602',
      phone: '+91-97893 40230',
      email: 'gsgtrustcbe@gmail.com',
      incharge: 'Regional Coordinator - Tiruppur District Operations',
    },
    activities: [
      {
        title: 'Corporation High School Higher Education Roadmaps',
        category: 'School Camp',
        badge: '18+ Drives',
        description:
          'Special focus on Class 10 and Class 12 students from garment sector households, introducing modern diplomas, B.Sc, B.Com, and engineering courses.',
        beneficiaries: '8,000+ Students Mentored',
        iconName: 'GraduationCap',
      },
      {
        title: 'Polytechnic to B.E Lateral Entry Counselling',
        category: 'Higher Education',
        badge: 'Career Mobility',
        description:
          'Guiding diploma holders from polytechnics into direct second-year engineering admissions with fee verification and scholarship aid.',
        beneficiaries: '1,200+ Diploma Students',
        iconName: 'Award',
      },
      {
        title: 'Delicate Ability & Employability Training',
        category: 'School Camp',
        badge: 'Skill Building',
        description:
          'Workshops on communication, digital literacy, interview presence, and professional confidence for first-generation learners.',
        beneficiaries: '3,500+ Youth Equipped',
        iconName: 'Lightbulb',
      },
      {
        title: 'Tree Plantation & Environmental Eco-Drives in Schools',
        category: 'Environment',
        badge: 'Green Future',
        description:
          'Planting native saplings in Corporation schools while educating students on water sustainability and environmental conservation.',
        beneficiaries: '15+ School Campuses Greened',
        iconName: 'Sprout',
      },
    ],
    scholarships: [
      {
        title: 'Industrial Worker Children Higher Education Grant',
        amount: '₹5,000 to ₹8,000',
        type: 'Need-Based Tuition Aid',
        eligibility: 'Children of textile, garment, and informal workers enrolled in Tiruppur Govt schools',
        highlight: 'Zero documentation fees, immediate verification, and direct college fee aid.',
      },
      {
        title: 'First Graduate Full Concession Guidance',
        amount: '₹20,000 to ₹25,000/yr',
        type: 'State Fee Concession',
        eligibility: 'First person in family graduating in Tiruppur district',
        highlight: 'Complete assistance in procuring certificates and college counter verification.',
      },
      {
        title: 'Polytechnic Merit & Lateral Entry Grant',
        amount: '₹5,000 Special Grant',
        type: 'Technical Education Aid',
        eligibility: 'Diploma students transitioning to degree engineering programs',
        highlight: 'Assisting meritorious diploma holders in top technical campuses.',
      },
      {
        title: 'Girl Student Higher Education Sponsorship',
        amount: 'Full Year College Aid',
        type: 'Women Empowerment Aid',
        eligibility: 'Meritorious female students from Tiruppur Corporation schools',
        highlight: 'Promoting higher education for young women from industrial backgrounds.',
      },
    ],
    careerGuidance: [
      {
        title: 'Textile Technology to AI & Software Transition',
        description: 'Helping students explore tech degrees (B.Tech AI, Data Science, CSBS) alongside modern industrial management.',
        tag: 'Industry 4.0',
      },
      {
        title: 'Commerce, B.Com CA & Finance Career Camps',
        description: 'Exploration of accounting, banking exams, auditing, and corporate finance career paths for commerce stream students.',
        tag: 'Commerce Hub',
      },
      {
        title: 'Engineering Single-Window Choice Filling Desk',
        description: 'Offline and online verification desk assisting students through TNEA counselling choice rounds.',
        tag: 'TNEA Desk',
      },
      {
        title: 'Tiruppur District Dedicated Student Helpline',
        description: 'Direct phone & WhatsApp hotline for instant answers to college admission queries.',
        tag: 'Live Helpline',
      },
    ],
    photos: tiruppurGalleryItems.map((item) => ({
      id: item.id,
      title: `${item.name} Training & Guidance Session`,
      schoolName: item.name,
      location: item.location,
      studentsCount: item.studentsCount,
      photoUrl: item.photoUrl,
      category: item.category,
      caption: `${item.name} in ${item.location}: ${item.highlight}`,
    })),
  },

  kanchipuram: {
    id: 'kanchipuram',
    slug: 'kanchipuram',
    name: 'Kanchipuram',
    tamilName: 'University Liaison',
    subtitle: 'Northern Outreach, University Liaison & CSR Educational Desks',
    hubLocation: 'Northern Tamil Nadu Outreach Desk & Premier Collegiate Advisory Desk',
    bannerColor: 'from-[#071c35] via-[#103a8a] to-[#064de0]',
    accentColor: '#064de0',
    stats: {
      studentsMentored: '9,500+',
      schoolsCovered: '14+ School Clusters',
      scholarshipsDisbursed: '₹2.80L+',
      volunteersCount: '85+ Regional Volunteers',
    },
    summary:
      'In Kanchipuram and the Northern corridor of Tamil Nadu, GSG Trust extends premier university liaison, Anna University counseling guidance, CSR corporate scholarship processing, and comprehensive college admission paperwork help for rural students.',
    officeDetails: {
      address: 'GSG Trust Northern Outreach Desk, Near Bus Stand / Collectorate Corridor, Kanchipuram - 631501',
      phone: '+91-97893 40230',
      email: 'gsgtrustcbe@gmail.com',
      incharge: 'Northern Region Student Advisory Officer',
    },
    activities: [
      {
        title: 'Premier University & Anna University Guidance Clinics',
        category: 'Higher Education',
        badge: 'State University',
        description:
          'Special guidance on premier government and autonomous colleges, admission cut-offs, and horizontal reservation quotas.',
        beneficiaries: '5,000+ Students Guided',
        iconName: 'GraduationCap',
      },
      {
        title: 'Corporate CSR Educational Sponsorship Liaison',
        category: 'Higher Education',
        badge: 'CSR Partnered',
        description:
          'Connecting meritorious underprivileged students with corporate foundation grants for technical and collegiate education.',
        beneficiaries: '450+ Beneficiaries',
        iconName: 'Building2',
      },
      {
        title: 'First Graduate & Fee Waiver Documentation Support',
        category: 'School Camp',
        badge: 'Fee Concession',
        description:
          'Assisting rural families with First Graduate certificate paperwork, income verification, and fee structure validation.',
        beneficiaries: '2,200+ Families Helped',
        iconName: 'CheckCircle2',
      },
      {
        title: 'Youth Career Mindset & Leadership Conventions',
        category: 'School Camp',
        badge: 'Leadership',
        description:
          'Transformative lectures bringing career clarity, goal setting, and interview readiness to government school students.',
        beneficiaries: '1,800+ Students',
        iconName: 'Sparkles',
      },
    ],
    scholarships: [
      {
        title: 'Northern Region Rural Talent Scholarship',
        amount: '₹6,000 to ₹10,000',
        type: 'Merit-Cum-Need Aid',
        eligibility: 'Class 12 students from Kanchipuram rural government schools with > 75% marks',
        highlight: 'Supports collegiate entrance, application forms, and initial semester fees.',
      },
      {
        title: 'Corporate Partner Sponsored Education Grant',
        amount: 'Up to ₹25,000/yr',
        type: 'CSR Foundation Grant',
        eligibility: 'Engineering & science candidates from economically vulnerable families',
        highlight: 'Disbursed directly in collaboration with CSR partner trusts and foundations.',
      },
      {
        title: '7.5% Govt School Horizontal Quota Direct Help',
        amount: '100% Free Tuition & Hostel',
        type: 'Government Reservation Support',
        eligibility: 'Tamil Nadu Government school students from 6th to 12th standard',
        highlight: 'Zero-cost counsel from GSG coordinators through all online counselling rounds.',
      },
      {
        title: 'Special First Generation Graduate Assistance',
        amount: '₹20,000 Govt Concession Support',
        type: 'Fee Reduction',
        eligibility: 'First student in the family attending college',
        highlight: 'Ensuring institutions do not charge unauthorized additional fees.',
      },
    ],
    careerGuidance: [
      {
        title: 'Engineering, Computer Science & Tech Foundations',
        description: 'Navigating high-demand branches including AI, Cybersecurity, Robotics, and Mechanical Engineering.',
        tag: 'Tech Careers',
      },
      {
        title: 'Legal Studies, Humanities & Public Service Pathways',
        description: 'Advisory for students interested in 5-Year Integrated Law, Civil Services, and Social Sciences.',
        tag: 'Law & Civil Service',
      },
      {
        title: 'Centralized Online Application Filing Desk',
        description: 'Assisting students in filling TNEA, TNDALU, TANUVAS, and university application forms without cyber cafe errors.',
        tag: 'Form Filing Hub',
      },
      {
        title: 'Statewide Remote Career Hotline',
        description: 'Dedicated guidance by phone and video call for students across Kanchipuram and Chengalpattu.',
        tag: 'Remote Advisory',
      },
    ],
    photos: [
      {
        id: 'kpm-1',
        title: 'University Admissions & Cut-off Strategy Camp',
        schoolName: 'Govt Higher Secondary School Cluster',
        location: 'Kanchipuram Town',
        studentsCount: '130+ Students',
        photoUrl: '/images/volunteers_mentorship.jpg',
        category: 'Higher Education',
        caption: 'Educating students on Anna University rank lists, cutoff ranges, and autonomous college choices.',
      },
      {
        id: 'kpm-2',
        title: 'First Graduate Paperwork & Guidance Desk',
        schoolName: 'Rural Higher Secondary School',
        location: 'Walajabad Corridor, Kanchipuram',
        studentsCount: '100+ Students',
        photoUrl: '/images/volunteers_field_work.jpg',
        category: 'School Camp',
        caption: 'Volunteer coordinators inspecting certificates and preparing fee concession dossiers for families.',
      },
      {
        id: 'kpm-3',
        title: 'Agni Thaaragai Self Defense & Confidence Workshop',
        schoolName: 'Govt Girls High School',
        location: 'Kanchipuram District',
        studentsCount: '80+ Students',
        photoUrl: '/images/agni_thaaragai.jpg',
        category: 'Self Defense',
        caption: 'Young girls learning martial defense tactics, situational awareness, and safety drills.',
      },
    ],
  },

  nilgiris: {
    id: 'nilgiris',
    slug: 'nilgiris',
    name: 'Nilgiris',
    tamilName: 'Hill & Tribal Hub',
    subtitle: 'Tribal School Mentorship, Hill Education & Welfare Outreach',
    hubLocation: 'Nilgiris Tribal & Hill Education Outreach Desk (Anaikatti / Ooty Corridor)',
    bannerColor: 'from-[#071c35] via-[#053d3c] to-[#00817e]',
    accentColor: '#00817e',
    stats: {
      studentsMentored: '8,500+',
      schoolsCovered: '22+ Hill & Tribal Schools',
      scholarshipsDisbursed: '₹2.50L+',
      volunteersCount: '95+ Mountain Volunteers',
    },
    summary:
      'Serving the scenic yet remote hills of Nilgiris, GSG Trust bridges educational opportunities for tribal students, tea-estate workers’ children, and remote village schools (including GTRHSS Anaikatti and Ooty hill schools). We ensure remote students receive books, winter gear, career roadmaps, and free college admissions in top plains colleges.',
    officeDetails: {
      address: 'Nilgiris Hill Education Outreach Hub, Anaikatti / Ooty Road, The Nilgiris - 643001',
      phone: '+91-97893 40230',
      email: 'gsgtrustcbe@gmail.com',
      incharge: 'Hill & Tribal Education Coordinator',
    },
    activities: [
      {
        title: 'Tribal Residential School Mentorship (GTRHSS Anaikatti & Nilgiris)',
        category: 'School Camp',
        badge: 'Tribal Welfare',
        description:
          'Dedicated educational sessions at Government Tribal Residential Higher Secondary Schools, inspiring tribal youth to pursue higher education.',
        beneficiaries: '3,200+ Tribal Youth',
        iconName: 'GraduationCap',
      },
      {
        title: 'Agni Thaaragai Self-Defense for Hill District School Girls',
        category: 'Self Defense',
        badge: 'Empowerment',
        description:
          'Specialized self-defense workshops for girls walking long distances to hill schools through forest peripheries.',
        beneficiaries: '1,500+ Hill Girls Trained',
        iconName: 'ShieldCheck',
      },
      {
        title: 'Educational Kits & Winter Learning Aid Distribution',
        category: 'Community Drive',
        badge: 'Direct Relief',
        description:
          'Providing high-quality school bags, geometry toolkits, notebooks, and winter protection gear to remote school students.',
        beneficiaries: '4,000+ Kits Distributed',
        iconName: 'HeartHandshake',
      },
      {
        title: 'Free Government Hostel & Quota Registration Assistance',
        category: 'Higher Education',
        badge: 'Hostel Quota',
        description:
          'Enabling students moving to plains colleges to secure free BC/MBC/SC/ST welfare hostel accommodations.',
        beneficiaries: '850+ College Hostellers',
        iconName: 'Building2',
      },
    ],
    scholarships: [
      {
        title: 'Tribal & Hill District Direct Higher Education Grant',
        amount: '₹5,000 to ₹10,000',
        type: 'Special Hill Grant',
        eligibility: 'Tribal and plantation worker students from Nilgiris Government schools',
        highlight: 'Covers initial admission, travel expenses to college, and study materials.',
      },
      {
        title: 'Plains College Transition & Hostel Scholarship',
        amount: 'Complete Boarding & Hostel Aid',
        type: 'Welfare Support',
        eligibility: 'Meritorious Nilgiris students joining degree colleges in Coimbatore/Chennai',
        highlight: 'Ensuring zero out-of-pocket costs for boarding, meals, and college fees.',
      },
      {
        title: '7.5% Government School Special Quota Seat Verification',
        amount: '100% Free Higher Education',
        type: 'State Quota Seat',
        eligibility: 'Students studied in Nilgiris Govt schools from 6th to 12th',
        highlight: 'Guaranteed zero tuition, hostel, and examination fee in premier colleges.',
      },
      {
        title: 'Single-Parent & Destitute Hill Student Scholarship',
        amount: 'Full Year Collegiate Aid',
        type: 'Special Compassion Grant',
        eligibility: 'Children from distressed tea plantation families',
        highlight: 'Dedicated sponsor pairing and continuous quarterly academic review.',
      },
    ],
    careerGuidance: [
      {
        title: 'Agriculture, Horticulture & Environmental Sciences',
        description: 'Guiding students toward TNAU agriculture, forestry, biotechnology, and environmental science degrees.',
        tag: 'Eco & Agri',
      },
      {
        title: 'Nursing, Pharmacy & Allied Health Guidance',
        description: 'Step-by-step guidance for joining government hospital nursing and allied medical colleges in Tamil Nadu.',
        tag: 'Health Sciences',
      },
      {
        title: 'Engineering & Emerging Tech Pathways',
        description: 'Connecting students to high-placement colleges in Coimbatore with free college transport and hostel.',
        tag: 'Tech Placements',
      },
      {
        title: 'Nilgiris Remote Student Hotline & Dial-In Center',
        description: 'Special phone line for students with limited internet connectivity in remote mountain villages.',
        tag: 'Dial-In Line',
      },
    ],
    photos: [
      {
        id: 'nil-1',
        title: 'Tribal Residential School Mentorship Session',
        schoolName: 'GTRHSS Anaikatti / Nilgiris Hill School',
        location: 'Anaikatti & Nilgiris Forest Periphery',
        studentsCount: '145+ Students',
        photoUrl: '/images/gallery/cards/ghss-velliangadu_photo.jpg',
        category: 'School Camp',
        caption: 'GSG Trust volunteers conducting a career vision camp for tribal and mountain students.',
      },
      {
        id: 'nil-2',
        title: 'Self-Defense Training in Mountain School Campus',
        schoolName: 'Hill Girls Higher Secondary School',
        location: 'Ooty Periphery, Nilgiris',
        studentsCount: '110+ Students',
        photoUrl: '/images/agni_thaaragai.jpg',
        category: 'Self Defense',
        caption: 'Agni Thaaragai trainers demonstrating self-defense maneuvers to school and college girls.',
      },
      {
        id: 'nil-3',
        title: 'Educational Stationery & Notebooks Distribution',
        schoolName: 'Remote Hill High School Drive',
        location: 'Kotagiri Corridor, Nilgiris',
        studentsCount: '180+ Students',
        photoUrl: '/images/volunteers_field_work.jpg',
        category: 'Community Drive',
        caption: 'Volunteers distributing educational kits and guiding students through higher study pathways.',
      },
    ],
  },

  valparai: {
    id: 'valparai',
    slug: 'valparai',
    name: 'Valparai',
    tamilName: 'Tea-Estate Hub',
    subtitle: 'Tea-Estate Student Mentorship & Anamalai Hills Outreach',
    hubLocation: 'Valparai Tea-Estate Student Welfare & Career Guidance Desk',
    bannerColor: 'from-[#071c35] via-[#1b3e59] to-[#008b88]',
    accentColor: '#008b88',
    stats: {
      studentsMentored: '5,200+',
      schoolsCovered: '12+ Plantation Schools',
      scholarshipsDisbursed: '₹2.00L+',
      volunteersCount: '60+ Active Mentors',
    },
    summary:
      'Perched in the Anamalai Hills, Valparai is home to thousands of tea plantation families. GSG Trust organizes dedicated educational camps across Valparai, Mudis, and Sholayar, breaking geographical isolation by coaching students, securing admission in plains colleges, and funding hostel fees.',
    officeDetails: {
      address: 'Valparai Student Welfare Desk, Main Road / Sholayar Corridor, Valparai - 642127',
      phone: '+91-97893 40230',
      email: 'gsgtrustcbe@gmail.com',
      incharge: 'Valparai Regional Outreach Coordinator',
    },
    activities: [
      {
        title: 'Tea-Estate High School Career & Higher Study Camps',
        category: 'School Camp',
        badge: 'Plantation Focus',
        description:
          'Motivational and career clarity sessions conducted inside tea estate schools across Valparai, Mudis, and Waterfall.',
        beneficiaries: '2,200+ Students Mentored',
        iconName: 'GraduationCap',
      },
      {
        title: 'Plains College Placement with Free Hostel Guarantee',
        category: 'Higher Education',
        badge: '100% Free Placement',
        description:
          'Ensuring Valparai students secure admissions in top colleges in Pollachi, Coimbatore, and Chennai with verified hostel accommodation.',
        beneficiaries: '480+ Students Placed',
        iconName: 'Building2',
      },
      {
        title: 'Agni Thaaragai Self Defense in Estate Schools',
        category: 'Self Defense',
        badge: 'Girls Safety',
        description:
          'Building mental resilience and practical defensive tactics for girls navigating estate pathways and bus commutes.',
        beneficiaries: '900+ School Girls',
        iconName: 'ShieldCheck',
      },
      {
        title: 'Free Travel & Document Paperwork Assistance',
        category: 'Community Drive',
        badge: 'Doorstep Help',
        description:
          'Helping students get birth, community, and First Graduate certificates without making expensive repeated trips to plains taluk offices.',
        beneficiaries: '1,100+ Families Assisted',
        iconName: 'HeartHandshake',
      },
    ],
    scholarships: [
      {
        title: 'Tea Plantation Worker Children College Scholarship',
        amount: '₹5,000 to ₹10,000',
        type: 'Estate Student Grant',
        eligibility: 'Children of tea plantation workers in Valparai plateau studying in Govt schools',
        highlight: 'Immediate direct grant for semester admissions and textbooks.',
      },
      {
        title: 'Plains College Hostel & Living Expense Grant',
        amount: 'Full Hostel Fee Aid',
        type: 'Boarding Support',
        eligibility: 'Valparai students pursuing undergraduate degrees in plains colleges',
        highlight: 'Eliminates accommodation and food expenses for students far from home.',
      },
      {
        title: '7.5% Government Reservation 100% Free Seat Aid',
        amount: '100% Free College Education',
        type: 'Govt Horizontal Quota',
        eligibility: 'Class 6 to 12 Valparai Government school students',
        highlight: 'Complete assistance in TNEA engineering, arts, and medical quota counselling.',
      },
      {
        title: 'Valparai Destitute & First Graduate Special Aid',
        amount: 'Full Tuition Fee Coverage',
        type: 'Special Relief Grant',
        eligibility: 'First graduate or single-parent student from Valparai hills',
        highlight: 'Directly paid to partner colleges with zero out-of-pocket expenses.',
      },
    ],
    careerGuidance: [
      {
        title: 'Full Plains College Transition Mentorship',
        description: 'Comprehensive orientation helping hill students adapt confidently to city colleges and modern campus life.',
        tag: 'Campus Transition',
      },
      {
        title: 'Engineering, Computer Applications & Data Tech',
        description: 'Guidance into high-growth software and tech programs with top campus placement records.',
        tag: 'IT & Software',
      },
      {
        title: 'Commerce, Accounting & Government Job Preparation',
        description: 'Roadmaps for TNPSC, Banking, B.Com, and professional accounting careers.',
        tag: 'Govt & Banking',
      },
      {
        title: 'Valparai Direct WhatsApp & Calling Helpline',
        description: 'Direct line connecting Valparai parents and students to senior GSG Trust counselors.',
        tag: 'Estate Helpline',
      },
    ],
    photos: [
      {
        id: 'val-1',
        title: 'Tea Estate School Career Guidance Session',
        schoolName: 'Govt Higher Secondary School Valparai',
        location: 'Valparai Town, Anamalai Hills',
        studentsCount: '125+ Students',
        photoUrl: '/images/volunteers_mentorship.jpg',
        category: 'Career Guidance',
        caption: 'GSG Trust coordinators conducting career roadmap and college admission seminar for tea estate students.',
      },
      {
        id: 'val-2',
        title: 'Student Paperwork & Scholarship Counseling Session',
        schoolName: 'Mudis & Sholayar School Cluster',
        location: 'Mudis Estate, Valparai',
        studentsCount: '90+ Students',
        photoUrl: '/images/volunteers_field_work.jpg',
        category: 'Higher Education',
        caption: 'Checking scholarship documentation, First Graduate forms, and college applications.',
      },
      {
        id: 'val-3',
        title: 'Agni Thaaragai Self Defense in Estate Campus',
        schoolName: 'Estate Girls High School',
        location: 'Waterfall Estate, Valparai',
        studentsCount: '85+ Students',
        photoUrl: '/images/agni_thaaragai.jpg',
        category: 'Self Defense',
        caption: 'Equipping girls in hill schools with safety tactics, confidence, and courage.',
      },
    ],
  },
};

export const DISTRICT_LIST = [
  { id: 'coimbatore', name: 'Coimbatore', tag: 'Headquarters', color: '#7f1026' },
  { id: 'tiruppur', name: 'Tiruppur', tag: 'Corporation Hub', color: '#b77b08' },
  { id: 'kanchipuram', name: 'Kanchipuram', tag: 'University Liaison', color: '#064de0' },
  { id: 'nilgiris', name: 'Nilgiris', tag: 'Hill & Tribal', color: '#00817e' },
  { id: 'valparai', name: 'Valparai', tag: 'Tea-Estate Hub', color: '#008b88' },
];
