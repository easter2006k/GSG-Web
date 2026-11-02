import { CoursesService } from './courses.service';
export declare class CoursesController {
    private coursesService;
    constructor(coursesService: CoursesService);
    findAll(search?: string, category?: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        isPublished: boolean;
        category: string;
        qualificationRequired: string | null;
        durationMonths: number | null;
    }[]>;
    findOne(id: string): Promise<{
        collegeCourses: ({
            college: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
                isPublished: boolean;
                verificationStatus: import(".prisma/client").$Enums.VerificationStatus;
                verifiedAt: Date | null;
                districtId: string | null;
                address: string | null;
                institutionType: string | null;
                officialWebsite: string | null;
                contactInformation: string | null;
                affiliationInformation: string | null;
                sourceUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            academicYear: string;
            verificationStatus: import(".prisma/client").$Enums.VerificationStatus;
            verifiedAt: Date | null;
            collegeId: string;
            courseId: string;
            eligibilityNotes: string | null;
            admissionUrl: string | null;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        isPublished: boolean;
        category: string;
        qualificationRequired: string | null;
        durationMonths: number | null;
    }>;
    findBySlug(slug: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        isPublished: boolean;
        category: string;
        qualificationRequired: string | null;
        durationMonths: number | null;
    }>;
    create(data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        isPublished: boolean;
        category: string;
        qualificationRequired: string | null;
        durationMonths: number | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        isPublished: boolean;
        category: string;
        qualificationRequired: string | null;
        durationMonths: number | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        description: string | null;
        isPublished: boolean;
        category: string;
        qualificationRequired: string | null;
        durationMonths: number | null;
    }>;
}
