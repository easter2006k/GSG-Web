import { CollegesService } from './colleges.service';
export declare class CollegesController {
    private collegesService;
    constructor(collegesService: CollegesService);
    findAll(search?: string, districtId?: string, type?: string): Promise<({
        district: {
            id: string;
            name: string;
            stateCode: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        collegeCourses: ({
            course: {
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
    })[]>;
    findOne(id: string): Promise<{
        district: {
            id: string;
            name: string;
            stateCode: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        collegeCourses: ({
            course: {
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
            };
            feeRecords: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                academicYear: string;
                currency: string;
                verificationStatus: import(".prisma/client").$Enums.VerificationStatus;
                verifiedAt: Date | null;
                sourceUrl: string | null;
                collegeCourseId: string;
                quotaOrCategory: string | null;
                tuitionFee: import("@prisma/client/runtime/library").Decimal | null;
                otherFees: import("@prisma/client/runtime/library").Decimal | null;
                hostelFee: import("@prisma/client/runtime/library").Decimal | null;
                transportFee: import("@prisma/client/runtime/library").Decimal | null;
                notes: string | null;
            }[];
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
    }>;
    getFees(id: string, year?: string): Promise<{
        course: string;
        academicYear: {
            year: string;
            tuitionFee: import("@prisma/client/runtime/library").Decimal | null;
            otherFees: import("@prisma/client/runtime/library").Decimal | null;
            hostelFee: import("@prisma/client/runtime/library").Decimal | null;
            verificationStatus: import(".prisma/client").$Enums.VerificationStatus;
            verifiedAt: Date | null;
        }[];
    }[]>;
    findBySlug(slug: string): Promise<{
        district: {
            id: string;
            name: string;
            stateCode: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        collegeCourses: ({
            course: {
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
    }>;
    create(data: any): Promise<{
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
    }>;
    update(id: string, data: any): Promise<{
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
    }>;
    delete(id: string): Promise<{
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
    }>;
}
