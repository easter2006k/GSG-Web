export type TeamDepartment =
  | 'EXECUTIVE_LEADERSHIP'
  | 'BOARD_OF_TRUSTEES'
  | 'ADVISORY_COMMITTEE'
  | 'TRAINERS_AND_FACULTY';

export interface MemberSocials {
  email?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  phone?: string;
}

export interface TeamMember {
  id: string;
  fullName: string;
  name?: string; // backward compat
  slug: string;
  designation: string;
  role?: string; // backward compat
  department: TeamDepartment;
  badge?: string;
  biography?: string;
  expertise?: string;
  responsibilities?: string;
  photoUrl: string;
  image?: string; // backward compat
  email?: string;
  socialLinks?: MemberSocials;
  socials?: MemberSocials; // backward compat
  displayOrder: number;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
}

// Backward compatibility interfaces
export interface BoardMember {
  name: string;
  role: string;
  image: string;
  socials?: MemberSocials;
}

export interface AdvisoryMember {
  name: string;
  role: string;
  image: string;
}

export interface TrainerMember {
  name: string;
  role: string;
  image: string;
}

// ── Verified Leadership Records ───────────────────────────────────────────
export const allTeamMembers: TeamMember[] = [
  // ── Executive Leadership ──
  {
    id: 'exec-vinodkumar',
    fullName: 'Vinodkumar Ravichandran',
    name: 'Vinodkumar Ravichandran',
    slug: 'vinodkumar-ravichandran',
    designation: 'Founder-Chairman & Manager Trustee — GSG Trust',
    role: 'Founder-Chairman & Manager Trustee — GSG Trust',
    department: 'EXECUTIVE_LEADERSHIP',
    badge: 'Founder-Chairman',
    biography:
      "Visionary founder and manager trustee steering GSG Trust since 2013 across Tamil Nadu. Pioneered free ICC aptitude testing, 100% higher education grants, Agni Thaaragai women empowerment, and government school youth transformation.",
    expertise: 'Youth Mentorship, Higher Education Governance, Public Welfare, Educational Equity',
    responsibilities: 'Strategic Vision, Statewide Operations, Foundation Governance, Community Partnerships',
    photoUrl: '/images/team/vinodkumar_ravichandran_square.jpg',
    image: '/images/team/vinodkumar_ravichandran_square.jpg',
    email: 'info@gsggroups.org',
    socialLinks: {
      email: 'info@gsggroups.org',
      linkedin: 'https://www.linkedin.com/in/vinodkumar-ravichandran',
    },
    socials: {
      email: 'info@gsggroups.org',
      linkedin: 'https://www.linkedin.com/in/vinodkumar-ravichandran',
    },
    displayOrder: 1,
    status: 'PUBLISHED',
  },

  // ── Board of Trustees & Executive Team (Seniority Order) ──
  {
    id: 'trustee-sunilkumar',
    fullName: 'Sunil Kumar (Sunilkumar Ravichandran)',
    name: 'Sunil Kumar (Sunilkumar Ravichandran)',
    slug: 'sunil-kumar',
    designation: 'Trustee — GSG Trust',
    role: 'Trustee — GSG Trust',
    department: 'BOARD_OF_TRUSTEES',
    badge: 'Trustee',
    biography:
      'Co-trustee ensuring organizational compliance, administrative integrity, and strategic expansion across district chapters in Tamil Nadu.',
    expertise: 'Institutional Governance, Strategic Expansion, Resource Allocation',
    responsibilities: 'Trustee Oversight, Administrative Approvals, Strategic Projects',
    photoUrl: '/images/team/sunil_kumar.jpg',
    image: '/images/team/sunil_kumar.jpg',
    displayOrder: 2,
    status: 'PUBLISHED',
  },
  {
    id: 'president-sindhumallesh',
    fullName: 'Sindhu Mallesh',
    name: 'Sindhu Mallesh',
    slug: 'sindhu-mallesh',
    designation: 'President — GSG Trust',
    role: 'President — GSG Trust',
    department: 'BOARD_OF_TRUSTEES',
    badge: 'President',
    biography:
      'President of GSG Trust spearheading executive decision-making, educational outreach, and team coordination. Leads state-wide drives to connect meritorious students with premier learning opportunities.',
    expertise: 'Executive Leadership, Team Management, Student Development, Public Coordination',
    responsibilities: 'Operational Leadership, Program Quality Assurance, Regional Chapter Coordination',
    photoUrl: '/images/team/sindhu_mallesh.jpg?v=4',
    image: '/images/team/sindhu_mallesh.jpg?v=4',
    displayOrder: 3,
    status: 'PUBLISHED',
  },
  {
    id: 'treasurer-thenmozhi',
    fullName: 'Thenmozhi',
    name: 'Thenmozhi',
    slug: 'thenmozhi',
    designation: 'Treasurer — GSG Trust',
    role: 'Treasurer — GSG Trust',
    department: 'BOARD_OF_TRUSTEES',
    badge: 'Treasurer',
    biography:
      'Custodian of financial transparency, scholarship disbursements, and philanthropic audit compliance for all GSG Trust student initiatives.',
    expertise: 'Financial Governance, Grant Disbursement Auditing, Scholarship Verification',
    responsibilities: 'Trust Accounts Management, Student Grant Sanctions, Annual Compliance',
    photoUrl: '/images/team/thenmozhi.jpg',
    image: '/images/team/thenmozhi.jpg',
    displayOrder: 4,
    status: 'PUBLISHED',
  },
  {
    id: 'sec-sathya',
    fullName: 'Sathya',
    name: 'Sathya',
    slug: 'sathya',
    designation: 'Secretary — GSG Trust',
    role: 'Secretary — GSG Trust',
    department: 'BOARD_OF_TRUSTEES',
    badge: 'Secretary',
    biography:
      'General secretary directing school-level coordination, volunteer deployments, and community programs throughout Western Tamil Nadu.',
    expertise: 'Field Operations, School Program Coordination, Community Welfare',
    responsibilities: 'School Liasoning, Volunteer Logistics, Student Camps',
    photoUrl: '/images/team/sathya.jpg',
    image: '/images/team/sathya.jpg',
    displayOrder: 5,
    status: 'PUBLISHED',
  },
  {
    id: 'sec-boppalan',
    fullName: 'Boppalan',
    name: 'Boppalan',
    slug: 'boppalan',
    designation: 'Secretary — GSG Trust',
    role: 'Secretary — GSG Trust',
    department: 'BOARD_OF_TRUSTEES',
    badge: 'Secretary',
    biography:
      'Secretary driving technical education programs, student talent acquisition, and youth innovation initiatives across Coimbatore & Tiruppur.',
    expertise: 'Technical Skill Programs, Student Talent Acquisition, Digital Media',
    responsibilities: 'Technical Workshops, Corporate Partnerships, Regional Drives',
    photoUrl: '/images/team/boppalan.jpg',
    image: '/images/team/boppalan.jpg',
    displayOrder: 6,
    status: 'PUBLISHED',
  },
  {
    id: 'sec-easter-raj',
    fullName: 'Easter Raj',
    name: 'Easter Raj',
    slug: 'easter-raj',
    designation: 'Secretary — GSG Trust',
    role: 'Secretary — GSG Trust',
    department: 'BOARD_OF_TRUSTEES',
    badge: 'Secretary',
    biography:
      'Executive secretary and student welfare advocate actively managing student communications, digital platforms, and student mentorship initiatives across Tamil Nadu.',
    expertise: 'Student Mentorship, Digital Communication, Higher Education Guidance, Youth Outreach',
    responsibilities: 'Student Admissions Desk, Digital Outreach, Career Communication',
    photoUrl: '/images/team/easter.jpg?v=4',
    image: '/images/team/easter.jpg?v=4',
    email: 'easter.gsggroups@gmail.com',
    socialLinks: {
      email: 'easter.gsggroups@gmail.com',
      instagram: 'https://www.instagram.com/easter2006k?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==',
      linkedin: 'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bw7X7NW9yQ4uEBCCkxef7Ag%3D%3D',
    },
    socials: {
      email: 'easter.gsggroups@gmail.com',
      instagram: 'https://www.instagram.com/easter2006k?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==',
      linkedin: 'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bw7X7NW9yQ4uEBCCkxef7Ag%3D%3D',
    },
    displayOrder: 7,
    status: 'PUBLISHED',
  },
  {
    id: 'sec-praveen',
    fullName: 'Praveen',
    name: 'Praveen',
    slug: 'praveen',
    designation: 'Secretary — GSG Trust',
    role: 'Secretary — GSG Trust',
    department: 'BOARD_OF_TRUSTEES',
    badge: 'Secretary',
    biography:
      'Secretary overseeing student career development workshops, psychometric profiling camps, and rural outreach drives.',
    expertise: 'Career Development, Psychometric Assessments, Rural Outreach',
    responsibilities: 'Aptitude Test Logistics, School Camps, Career Roadmaps',
    photoUrl: '/images/team/praveen.jpg',
    image: '/images/team/praveen.jpg',
    displayOrder: 8,
    status: 'PUBLISHED',
  },
  {
    id: 'csr-ganapathy',
    fullName: 'Ganapathy',
    name: 'Ganapathy',
    slug: 'ganapathy',
    designation: 'CSR Head — GSG Trust',
    role: 'CSR Head — GSG Trust',
    department: 'BOARD_OF_TRUSTEES',
    badge: 'CSR Head',
    biography:
      'Head of Corporate Social Responsibility mobilizing industry sponsorships, education endowments, and industrial visits for government school children.',
    expertise: 'Corporate Partnerships, CSR Grant Mobilization, Industry Mentorship',
    responsibilities: 'CSR Corporate Relations, Donor Audits, Project Sponsorships',
    photoUrl: '/images/team/ganapathy.jpg',
    image: '/images/team/ganapathy.jpg',
    displayOrder: 9,
    status: 'PUBLISHED',
  },
  {
    id: 'csr-lakshmi',
    fullName: 'Lakshmi',
    name: 'Lakshmi',
    slug: 'lakshmi',
    designation: 'CSR Coordinator — GSG Trust',
    role: 'CSR Coordinator — GSG Trust',
    department: 'BOARD_OF_TRUSTEES',
    badge: 'CSR Coordinator',
    biography:
      'Coordinates grassroots scholarship verification, family need assessment, and community grant allocations across Corporation school drives.',
    expertise: 'Family Need Assessment, Scholarship Documentation, Community Outreach',
    responsibilities: 'Student Documentation, School Outreach Verification, Aid Allocation',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    displayOrder: 10,
    status: 'PUBLISHED',
  },
  {
    id: 'admin-bala',
    fullName: 'Bala',
    name: 'Bala',
    slug: 'bala',
    designation: 'Admin Accounts — GSG Trust',
    role: 'Admin Accounts — GSG Trust',
    department: 'BOARD_OF_TRUSTEES',
    badge: 'Admin Accounts',
    biography:
      'Oversees trust administrative records, day-to-day office operations, fee waiver documentations, and student admissions paperwork.',
    expertise: 'Office Administration, Fee Waiver Verification, Records Management',
    responsibilities: 'Central Office Desk, Admissions Documentation, Audit Records',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    displayOrder: 11,
    status: 'PUBLISHED',
  },

  // ── Advisory Committee ──
  {
    id: 'adv-krishnamoorthy',
    fullName: 'Krishna Moorthy',
    name: 'Krishna Moorthy',
    slug: 'krishna-moorthy',
    designation: 'Advisory Committee Member',
    role: 'Advisory Committee Member',
    department: 'ADVISORY_COMMITTEE',
    biography:
      'Senior advisor providing strategic educational counsel, institutional growth strategies, and state policy alignment.',
    expertise: 'Institutional Governance, Academic Policy, Community Leadership',
    responsibilities: 'Trust Strategic Advisory, Policy Formulation',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    displayOrder: 12,
    status: 'PUBLISHED',
  },
  {
    id: 'adv-adhavraj',
    fullName: 'Adhav Raj',
    name: 'Adhav Raj',
    slug: 'adhav-raj',
    designation: 'Advisory Committee Member',
    role: 'Advisory Committee Member',
    department: 'ADVISORY_COMMITTEE',
    biography: 'Advises on youth empowerment, digital training programs, and collegiate transitions.',
    expertise: 'Youth Leadership, Digital Media, Career Transition',
    responsibilities: 'Youth Advisory, Skills Development Programs',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
    displayOrder: 13,
    status: 'PUBLISHED',
  },
  {
    id: 'adv-senthil',
    fullName: 'Advocate Senthil',
    name: 'Advocate Senthil',
    slug: 'advocate-senthil',
    designation: 'Legal Advisor / Advisory Committee',
    role: 'Legal Advisor / Advisory Committee',
    department: 'ADVISORY_COMMITTEE',
    biography:
      'Legal counsel overseeing statutory trust registrations, public trust regulations, donor rights, and educational legal safeguards.',
    expertise: 'Trust Law, Legal Compliance, Non-Profit Governance, Statutory Audits',
    responsibilities: 'Legal Advisory, Statutory Certifications, Legal Protection',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    displayOrder: 14,
    status: 'PUBLISHED',
  },
  {
    id: 'adv-ravikumar',
    fullName: 'Ravi Kumar',
    name: 'Ravi Kumar',
    slug: 'ravi-kumar',
    designation: 'Advisory Committee Member',
    role: 'Advisory Committee Member',
    department: 'ADVISORY_COMMITTEE',
    biography:
      'Guides school outreach initiatives, parent counseling forums, and district school collaborations.',
    expertise: 'School Outreach, Parent Counseling, Community Mobilization',
    responsibilities: 'School Outreach Advisory, Rural Chapter Expansion',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    displayOrder: 15,
    status: 'PUBLISHED',
  },
  {
    id: 'adv-jaianandh',
    fullName: 'Jai Anandh',
    name: 'Jai Anandh',
    slug: 'jai-anandh',
    designation: 'Advisory Committee Member',
    role: 'Advisory Committee Member',
    department: 'ADVISORY_COMMITTEE',
    biography: 'Mentors entrepreneurial initiatives, student technical projects, and career roadmaps.',
    expertise: 'Student Innovation, Entrepreneurship, Career Roadmaps',
    responsibilities: 'Innovation Mentorship, Career Path Design',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    displayOrder: 16,
    status: 'PUBLISHED',
  },
  {
    id: 'adv-rajeshwari',
    fullName: 'Rajeshwari',
    name: 'Rajeshwari',
    slug: 'rajeshwari',
    designation: 'Advisory Committee Member',
    role: 'Advisory Committee Member',
    department: 'ADVISORY_COMMITTEE',
    biography:
      'Champion of girl child higher education, women leadership camps, and vocational career preparation.',
    expertise: 'Girl Child Education, Women Leadership, Life Skills Guidance',
    responsibilities: 'Women Empowerment Advisory, Agni Thaaragai Program Oversight',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    displayOrder: 17,
    status: 'PUBLISHED',
  },
  {
    id: 'adv-akbar',
    fullName: 'Akbar',
    name: 'Akbar',
    slug: 'akbar',
    designation: 'Advisory Committee Member',
    role: 'Advisory Committee Member',
    department: 'ADVISORY_COMMITTEE',
    biography:
      'Advisor for social harmony, youth sports camps, and inter-community welfare initiatives.',
    expertise: 'Community Harmony, Sports & Youth Activities, Disaster Relief',
    responsibilities: 'Community Welfare Advisory, Youth Camp Support',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop',
    displayOrder: 18,
    status: 'PUBLISHED',
  },

  // ── Trainers & Faculty ──
  {
    id: 'trainer-gayathri',
    fullName: 'Gayathri',
    name: 'Gayathri',
    slug: 'gayathri',
    designation: 'Trainer — GSG Trust',
    role: 'Trainer — GSG Trust',
    department: 'TRAINERS_AND_FACULTY',
    biography:
      'Senior faculty specializing in soft skills, English communication, and corporate interview readiness for college aspirants.',
    expertise: 'Soft Skills, Public Speaking, English Fluency, Interview Grooming',
    responsibilities: 'Communication Modules, Mock Interview Sessions',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
    displayOrder: 19,
    status: 'PUBLISHED',
  },
  {
    id: 'trainer-angel',
    fullName: 'Angel',
    name: 'Angel',
    slug: 'angel',
    designation: 'Trainer — GSG Trust',
    role: 'Trainer — GSG Trust',
    department: 'TRAINERS_AND_FACULTY',
    biography:
      'Specialist trainer conducting psychometric evaluations, interest mapping, and student life guidance sessions.',
    expertise: 'Psychometric Analysis, Career Mapping, Personality Development',
    responsibilities: 'ICC Test Administration, Student Psychological Support',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    displayOrder: 20,
    status: 'PUBLISHED',
  },
  {
    id: 'trainer-nehashree',
    fullName: 'Neha Shree',
    name: 'Neha Shree',
    slug: 'neha-shree',
    designation: 'Trainer — GSG Trust',
    role: 'Trainer — GSG Trust',
    department: 'TRAINERS_AND_FACULTY',
    biography:
      'Trainer facilitating STEM aptitude, computer literacy basics, and academic goal-setting workshops.',
    expertise: 'STEM Aptitude, Digital Tools, Academic Goal Setting',
    responsibilities: 'School Workshop Facilitation, Tech Skills Demos',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    displayOrder: 21,
    status: 'PUBLISHED',
  },
  {
    id: 'trainer-vijaystanly',
    fullName: 'Vijay Stanly',
    name: 'Vijay Stanly',
    slug: 'vijay-stanly',
    designation: 'Trainer — GSG Trust',
    role: 'Trainer — GSG Trust',
    department: 'TRAINERS_AND_FACULTY',
    biography:
      'Master instructor for Agni Thaaragai self-defense, martial discipline, and student physical health empowerment.',
    expertise: 'Self-Defense Tactics, Physical Fitness, Mental Discipline, Youth Empowerment',
    responsibilities: 'Agni Thaaragai Practical Camps, Student Physical Wellness',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
    displayOrder: 22,
    status: 'PUBLISHED',
  },
];

// ── Backward-compatible Exports ──────────────────────────────────────────
export const executiveFounder = {
  name: 'Vinodkumar Ravichandran',
  roles: ['Founder-Chairman — GSG Trust', 'Manager Trustee — GSG Trust'],
  badge: 'Founder-Chairman & Manager Trustee',
  image: '/images/team/vinodkumar_ravichandran_square.jpg',
  description:
    "Leading GSG Trust's vision of empowering students through education, career guidance, skill development, college admission support, and holistic life counselling.",
};

export const boardMembers: BoardMember[] = allTeamMembers
  .filter((m) => m.department === 'BOARD_OF_TRUSTEES')
  .map((m) => ({
    name: m.fullName,
    role: m.designation,
    image: m.photoUrl,
    socials: m.socialLinks,
  }));

export const advisoryCommittee: AdvisoryMember[] = allTeamMembers
  .filter((m) => m.department === 'ADVISORY_COMMITTEE')
  .map((m) => ({
    name: m.fullName,
    role: m.designation,
    image: m.photoUrl,
  }));

export const trainersList: TrainerMember[] = allTeamMembers
  .filter((m) => m.department === 'TRAINERS_AND_FACULTY')
  .map((m) => ({
    name: m.fullName,
    role: m.designation,
    image: m.photoUrl,
  }));
