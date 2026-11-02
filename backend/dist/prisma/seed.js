"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Starting database seeding...');
    const districtNames = [
        'Coimbatore',
        'Chennai',
        'Madurai',
        'Salem',
        'Trichy',
        'Tirunelveli',
        'Vellore',
        'Erode',
        'Tiruppur',
        'Thanjavur',
    ];
    const districts = [];
    for (const name of districtNames) {
        const district = await prisma.district.upsert({
            where: { name },
            update: {},
            create: { name, stateCode: 'TN', isActive: true },
        });
        districts.push(district);
    }
    console.log(`Seeded ${districts.length} districts.`);
    const scholarshipData = [
        {
            title: 'GSG Arts & Science Higher Education Scholarship',
            slug: 'gsg-arts-science-scholarship',
            providerName: 'GSG Trust',
            description: 'Support for meritorious students pursuing Arts & Science undergraduate degrees.',
            eligibilityCriteria: 'Minimum 75% in Higher Secondary (Class 12). Family annual income below ₹2 Lakhs.',
            benefitAmount: 5000,
            academicYear: '2025-2026',
            status: client_1.PublicationStatus.PUBLISHED,
            isPublished: true,
            verificationStatus: client_1.VerificationStatus.VERIFIED,
            districtId: districts[0].id,
        },
        {
            title: 'GSG Allied & Health Science Scholarship',
            slug: 'gsg-allied-health-scholarship',
            providerName: 'GSG Trust',
            description: 'Financial assistance for students entering Allied Health Sciences and nursing programs.',
            eligibilityCriteria: 'Passed Class 12 with Science stream. Dedicated commitment to community healthcare.',
            benefitAmount: 5000,
            academicYear: '2025-2026',
            status: client_1.PublicationStatus.PUBLISHED,
            isPublished: true,
            verificationStatus: client_1.VerificationStatus.VERIFIED,
            districtId: districts[0].id,
        },
        {
            title: 'GSG Engineering Excellence Scholarship',
            slug: 'gsg-engineering-scholarship',
            providerName: 'GSG Trust',
            description: 'Merit-cum-means scholarship for aspiring engineering students across Tamil Nadu.',
            eligibilityCriteria: 'Cut-off above 175/200 in academic subjects or top 5% in entrance counselling.',
            benefitAmount: 10000,
            academicYear: '2025-2026',
            status: client_1.PublicationStatus.PUBLISHED,
            isPublished: true,
            verificationStatus: client_1.VerificationStatus.VERIFIED,
            districtId: districts[0].id,
        },
    ];
    for (const s of scholarshipData) {
        await prisma.scholarship.upsert({
            where: { slug: s.slug },
            update: {},
            create: s,
        });
    }
    console.log('Seeded scholarships.');
    const programmeData = [
        {
            title: 'Higher Education Career Guidance Workshop 2026',
            slug: 'higher-education-career-guidance-2026',
            description: 'Comprehensive career counselling and guidance session for Class 11 and 12 students.',
            venue: 'GSG Community Hall, Coimbatore',
            startsAt: new Date('2026-06-15T09:00:00Z'),
            endsAt: new Date('2026-06-15T16:00:00Z'),
            capacity: 200,
            status: client_1.PublicationStatus.PUBLISHED,
            isPublished: true,
            districtId: districts[0].id,
        },
        {
            title: 'Engineering & Technology Admission Awareness Seminar',
            slug: 'engineering-admission-seminar-2026',
            description: 'Expert guidance on TNEA counselling, engineering specializations, and career pathways.',
            venue: 'Online & District Centers across Tamil Nadu',
            startsAt: new Date('2026-06-20T10:00:00Z'),
            endsAt: new Date('2026-06-20T13:00:00Z'),
            capacity: 500,
            status: client_1.PublicationStatus.PUBLISHED,
            isPublished: true,
            districtId: districts[1].id,
        },
    ];
    for (const p of programmeData) {
        await prisma.programme.upsert({
            where: { slug: p.slug },
            update: {},
            create: p,
        });
    }
    console.log('Seeded programmes.');
    const college = await prisma.college.upsert({
        where: { slug: 'sample-government-arts-college-cbe' },
        update: {},
        create: {
            name: 'Government Arts College, Coimbatore',
            slug: 'sample-government-arts-college-cbe',
            districtId: districts[0].id,
            address: 'State Bank Road, Coimbatore, Tamil Nadu 641018',
            institutionType: 'Government',
            officialWebsite: 'https://gaccbe.ac.in',
            verificationStatus: client_1.VerificationStatus.VERIFIED,
            isPublished: true,
        },
    });
    const course = await prisma.course.upsert({
        where: { slug: 'bsc-computer-science' },
        update: {},
        create: {
            name: 'B.Sc. Computer Science',
            slug: 'bsc-computer-science',
            category: 'Arts and Science',
            qualificationRequired: 'Class 12 with Mathematics',
            durationMonths: 36,
            description: 'Undergraduate degree in Computer Science and Applications.',
            isPublished: true,
        },
    });
    await prisma.collegeCourse.upsert({
        where: {
            collegeId_courseId_academicYear: {
                collegeId: college.id,
                courseId: course.id,
                academicYear: '2025-2026',
            },
        },
        update: {},
        create: {
            collegeId: college.id,
            courseId: course.id,
            academicYear: '2025-2026',
            eligibilityNotes: 'Minimum 60% aggregate in Higher Secondary.',
            verificationStatus: client_1.VerificationStatus.VERIFIED,
        },
    });
    console.log('Seeded sample college and course.');
    console.log('Database seeding completed successfully.');
}
main()
    .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map