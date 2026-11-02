import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TeamDepartment, PublicationStatus } from '@prisma/client';

export const INITIAL_TEAM_MEMBERS = [
  // ── Executive Leadership ──
  {
    fullName: 'Vinodkumar Ravichandran',
    slug: 'vinodkumar-ravichandran',
    designation: 'Founder-Chairman & Manager Trustee — GSG Trust',
    department: TeamDepartment.EXECUTIVE_LEADERSHIP,
    badge: 'Founder-Chairman',
    biography:
      "Visionary founder and manager trustee steering GSG Trust since 2013 across Tamil Nadu. Pioneered free ICC aptitude testing, 100% higher education grants, Agni Thaaragai women empowerment, and government school youth transformation.",
    expertise: 'Youth Mentorship, Higher Education Governance, Public Welfare, Educational Equity',
    responsibilities: 'Strategic Vision, Statewide Operations, Foundation Governance, Community Partnerships',
    photoUrl: '/images/team/vinodkumar_ravichandran_square.jpg',
    socialLinks: {
      email: 'info@gsggroups.org',
      linkedin: 'https://www.linkedin.com/in/vinodkumar-ravichandran',
    },
    displayOrder: 1,
    status: 'PUBLISHED' as const,
  },

  // ── Board of Trustees & Executive Team ──
  {
    fullName: 'Sunil Kumar (Sunilkumar Ravichandran)',
    slug: 'sunil-kumar',
    designation: 'Trustee — GSG Trust',
    department: TeamDepartment.BOARD_OF_TRUSTEES,
    badge: 'Trustee',
    biography:
      'Co-trustee ensuring organizational compliance, administrative integrity, and strategic expansion across district chapters in Tamil Nadu.',
    expertise: 'Institutional Governance, Strategic Expansion, Resource Allocation',
    responsibilities: 'Trustee Oversight, Administrative Approvals, Strategic Projects',
    photoUrl: '/images/team/sunil_kumar.jpg',
    socialLinks: {},
    displayOrder: 2,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Sindhu Mallesh',
    slug: 'sindhu-mallesh',
    designation: 'President — GSG Trust',
    department: TeamDepartment.BOARD_OF_TRUSTEES,
    badge: 'President',
    biography:
      'President of GSG Trust spearheading executive decision-making, educational outreach, and team coordination. Leads state-wide drives to connect meritorious students with premier learning opportunities.',
    expertise: 'Executive Leadership, Team Management, Student Development, Public Coordination',
    responsibilities: 'Operational Leadership, Program Quality Assurance, Regional Chapter Coordination',
    photoUrl: '/images/team/sindhu_mallesh.jpg?v=4',
    socialLinks: {},
    displayOrder: 3,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Thenmozhi',
    slug: 'thenmozhi',
    designation: 'Treasurer — GSG Trust',
    department: TeamDepartment.BOARD_OF_TRUSTEES,
    badge: 'Treasurer',
    biography:
      'Custodian of financial transparency, scholarship disbursements, and philanthropic audit compliance for all GSG Trust student initiatives.',
    expertise: 'Financial Governance, Grant Disbursement Auditing, Scholarship Verification',
    responsibilities: 'Trust Accounts Management, Student Grant Sanctions, Annual Compliance',
    photoUrl: '/images/team/thenmozhi.jpg',
    socialLinks: {},
    displayOrder: 4,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Sathya',
    slug: 'sathya',
    designation: 'Secretary — GSG Trust',
    department: TeamDepartment.BOARD_OF_TRUSTEES,
    badge: 'Secretary',
    biography:
      'General secretary directing school-level coordination, volunteer deployments, and community programs throughout Western Tamil Nadu.',
    expertise: 'Field Operations, School Program Coordination, Community Welfare',
    responsibilities: 'School Liasoning, Volunteer Logistics, Student Camps',
    photoUrl: '/images/team/sathya.jpg',
    socialLinks: {},
    displayOrder: 5,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Boppalan',
    slug: 'boppalan',
    designation: 'Secretary — GSG Trust',
    department: TeamDepartment.BOARD_OF_TRUSTEES,
    badge: 'Secretary',
    biography:
      'Secretary driving technical education programs, student talent acquisition, and youth innovation initiatives across Coimbatore & Tiruppur.',
    expertise: 'Technical Skill Programs, Student Talent Acquisition, Digital Media',
    responsibilities: 'Technical Workshops, Corporate Partnerships, Regional Drives',
    photoUrl: '/images/team/boppalan.jpg',
    socialLinks: {},
    displayOrder: 6,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Easter Raj',
    slug: 'easter-raj',
    designation: 'Secretary — GSG Trust',
    department: TeamDepartment.BOARD_OF_TRUSTEES,
    badge: 'Secretary',
    biography:
      'Executive secretary and student welfare advocate actively managing student communications, digital platforms, and student mentorship initiatives across Tamil Nadu.',
    expertise: 'Student Mentorship, Digital Communication, Higher Education Guidance, Youth Outreach',
    responsibilities: 'Student Admissions Desk, Digital Outreach, Career Communication',
    photoUrl: '/images/team/easter.jpg?v=4',
    socialLinks: {
      email: 'easter.gsggroups@gmail.com',
      instagram: 'https://www.instagram.com/easter2006k?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==',
      linkedin: 'https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bw7X7NW9yQ4uEBCCkxef7Ag%3D%3D',
    },
    displayOrder: 7,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Praveen',
    slug: 'praveen',
    designation: 'Secretary — GSG Trust',
    department: TeamDepartment.BOARD_OF_TRUSTEES,
    badge: 'Secretary',
    biography:
      'Secretary overseeing student career development workshops, psychometric profiling camps, and rural outreach drives.',
    expertise: 'Career Development, Psychometric Assessments, Rural Outreach',
    responsibilities: 'Aptitude Test Logistics, School Camps, Career Roadmaps',
    photoUrl: '/images/team/praveen.jpg',
    socialLinks: {},
    displayOrder: 8,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Ganapathy',
    slug: 'ganapathy',
    designation: 'CSR Head — GSG Trust',
    department: TeamDepartment.BOARD_OF_TRUSTEES,
    badge: 'CSR Head',
    biography:
      'Head of Corporate Social Responsibility mobilizing industry sponsorships, education endowments, and industrial visits for government school children.',
    expertise: 'Corporate Partnerships, CSR Grant Mobilization, Industry Mentorship',
    responsibilities: 'CSR Corporate Relations, Donor Audits, Project Sponsorships',
    photoUrl: '/images/team/ganapathy.jpg',
    socialLinks: {},
    displayOrder: 9,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Lakshmi',
    slug: 'lakshmi',
    designation: 'CSR Coordinator — GSG Trust',
    department: TeamDepartment.BOARD_OF_TRUSTEES,
    badge: 'CSR Coordinator',
    biography:
      'Coordinates grassroots scholarship verification, family need assessment, and community grant allocations across Corporation school drives.',
    expertise: 'Family Need Assessment, Scholarship Documentation, Community Outreach',
    responsibilities: 'Student Documentation, School Outreach Verification, Aid Allocation',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    socialLinks: {},
    displayOrder: 10,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Bala',
    slug: 'bala',
    designation: 'Admin Accounts — GSG Trust',
    department: TeamDepartment.BOARD_OF_TRUSTEES,
    badge: 'Admin Accounts',
    biography:
      'Oversees trust administrative records, day-to-day office operations, fee waiver documentations, and student admissions paperwork.',
    expertise: 'Office Administration, Fee Waiver Verification, Records Management',
    responsibilities: 'Central Office Desk, Admissions Documentation, Audit Records',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    socialLinks: {},
    displayOrder: 11,
    status: 'PUBLISHED' as const,
  },

  // ── Advisory Committee ──
  {
    fullName: 'Krishna Moorthy',
    slug: 'krishna-moorthy',
    designation: 'Advisory Committee Member',
    department: TeamDepartment.ADVISORY_COMMITTEE,
    badge: null,
    biography: 'Senior advisor providing strategic educational counsel, institutional growth strategies, and state policy alignment.',
    expertise: 'Institutional Governance, Academic Policy, Community Leadership',
    responsibilities: 'Trust Strategic Advisory, Policy Formulation',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    socialLinks: {},
    displayOrder: 12,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Adhav Raj',
    slug: 'adhav-raj',
    designation: 'Advisory Committee Member',
    department: TeamDepartment.ADVISORY_COMMITTEE,
    badge: null,
    biography: 'Advises on youth empowerment, digital training programs, and collegiate transitions.',
    expertise: 'Youth Leadership, Digital Media, Career Transition',
    responsibilities: 'Youth Advisory, Skills Development Programs',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
    socialLinks: {},
    displayOrder: 13,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Advocate Senthil',
    slug: 'advocate-senthil',
    designation: 'Legal Advisor / Advisory Committee',
    department: TeamDepartment.ADVISORY_COMMITTEE,
    badge: 'Legal Advisor',
    biography: 'Legal counsel overseeing statutory trust registrations, public trust regulations, donor rights, and educational legal safeguards.',
    expertise: 'Trust Law, Legal Compliance, Non-Profit Governance, Statutory Audits',
    responsibilities: 'Legal Advisory, Statutory Certifications, Legal Protection',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    socialLinks: {},
    displayOrder: 14,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Ravi Kumar',
    slug: 'ravi-kumar',
    designation: 'Advisory Committee Member',
    department: TeamDepartment.ADVISORY_COMMITTEE,
    badge: null,
    biography: 'Guides school outreach initiatives, parent counseling forums, and district school collaborations.',
    expertise: 'School Outreach, Parent Counseling, Community Mobilization',
    responsibilities: 'School Outreach Advisory, Rural Chapter Expansion',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    socialLinks: {},
    displayOrder: 15,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Jai Anandh',
    slug: 'jai-anandh',
    designation: 'Advisory Committee Member',
    department: TeamDepartment.ADVISORY_COMMITTEE,
    badge: null,
    biography: 'Mentors entrepreneurial initiatives, student technical projects, and career roadmaps.',
    expertise: 'Student Innovation, Entrepreneurship, Career Roadmaps',
    responsibilities: 'Innovation Mentorship, Career Path Design',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    socialLinks: {},
    displayOrder: 16,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Rajeshwari',
    slug: 'rajeshwari',
    designation: 'Advisory Committee Member',
    department: TeamDepartment.ADVISORY_COMMITTEE,
    badge: null,
    biography: 'Champion of girl child higher education, women leadership camps, and vocational career preparation.',
    expertise: 'Girl Child Education, Women Leadership, Life Skills Guidance',
    responsibilities: 'Women Empowerment Advisory, Agni Thaaragai Program Oversight',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    socialLinks: {},
    displayOrder: 17,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Akbar',
    slug: 'akbar',
    designation: 'Advisory Committee Member',
    department: TeamDepartment.ADVISORY_COMMITTEE,
    badge: null,
    biography: 'Advisor for social harmony, youth sports camps, and inter-community welfare initiatives.',
    expertise: 'Community Harmony, Sports & Youth Activities, Disaster Relief',
    responsibilities: 'Community Welfare Advisory, Youth Camp Support',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop',
    socialLinks: {},
    displayOrder: 18,
    status: 'PUBLISHED' as const,
  },

  // ── Trainers & Faculty ──
  {
    fullName: 'Gayathri',
    slug: 'gayathri',
    designation: 'Trainer — GSG Trust',
    department: TeamDepartment.TRAINERS_AND_FACULTY,
    badge: null,
    biography: 'Senior faculty specializing in soft skills, English communication, and corporate interview readiness for college aspirants.',
    expertise: 'Soft Skills, Public Speaking, English Fluency, Interview Grooming',
    responsibilities: 'Communication Modules, Mock Interview Sessions',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
    socialLinks: {},
    displayOrder: 19,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Angel',
    slug: 'angel',
    designation: 'Trainer — GSG Trust',
    department: TeamDepartment.TRAINERS_AND_FACULTY,
    badge: null,
    biography: 'Specialist trainer conducting psychometric evaluations, interest mapping, and student life guidance sessions.',
    expertise: 'Psychometric Analysis, Career Mapping, Personality Development',
    responsibilities: 'ICC Test Administration, Student Psychological Support',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    socialLinks: {},
    displayOrder: 20,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Neha Shree',
    slug: 'neha-shree',
    designation: 'Trainer — GSG Trust',
    department: TeamDepartment.TRAINERS_AND_FACULTY,
    badge: null,
    biography: 'Trainer facilitating STEM aptitude, computer literacy basics, and academic goal-setting workshops.',
    expertise: 'STEM Aptitude, Digital Tools, Academic Goal Setting',
    responsibilities: 'School Workshop Facilitation, Tech Skills Demos',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    socialLinks: {},
    displayOrder: 21,
    status: 'PUBLISHED' as const,
  },
  {
    fullName: 'Vijay Stanly',
    slug: 'vijay-stanly',
    designation: 'Trainer — GSG Trust',
    department: TeamDepartment.TRAINERS_AND_FACULTY,
    badge: 'Master Trainer',
    biography: 'Master instructor for Agni Thaaragai self-defense, martial discipline, and student physical health empowerment.',
    expertise: 'Self-Defense Tactics, Physical Fitness, Mental Discipline, Youth Empowerment',
    responsibilities: 'Agni Thaaragai Practical Camps, Student Physical Wellness',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
    socialLinks: {},
    displayOrder: 22,
    status: 'PUBLISHED' as const,
  },
];

@Injectable()
export class TeamService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedTeamMembers();
  }

  private async seedTeamMembers() {
    try {
      const count = await this.prisma.teamMember.count();
      if (count === 0) {
        console.log('[TeamService] Seeding initial 22 verified GSG Trust members...');
        for (const member of INITIAL_TEAM_MEMBERS) {
          await this.prisma.teamMember.create({
            data: member,
          });
        }
        console.log('[TeamService] Successfully seeded all GSG Trust members.');
      }
    } catch (err) {
      console.error('[TeamService] Seeding check error:', err);
    }
  }

  async getAllPublished(department?: TeamDepartment) {
    return this.prisma.teamMember.findMany({
      where: {
        status: 'PUBLISHED',
        ...(department ? { department } : {}),
      },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async getAllAdmin(department?: TeamDepartment, status?: string) {
    return this.prisma.teamMember.findMany({
      where: {
        ...(department ? { department } : {}),
        ...(status ? { status: status as PublicationStatus } : {}),
      },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async getOne(idOrSlug: string) {
    const member = await this.prisma.teamMember.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
    });
    if (!member) throw new NotFoundException(`Team member '${idOrSlug}' not found`);
    return member;
  }

  async create(data: any) {
    return this.prisma.teamMember.create({
      data: {
        ...data,
        socialLinks: data.socialLinks || {},
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.teamMember.update({
      where: { id },
      data: {
        ...data,
        socialLinks: data.socialLinks || {},
      },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.teamMember.update({
      where: { id },
      data: { status: status as PublicationStatus },
    });
  }

  async delete(id: string) {
    return this.prisma.teamMember.delete({
      where: { id },
    });
  }
}
