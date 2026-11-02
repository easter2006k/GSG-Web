import { PrismaService } from '../prisma/prisma.service';
export declare class NewsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllPublished(): Promise<({
        author: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            phone: string | null;
            displayName: string;
            passwordHash: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            emailVerifiedAt: Date | null;
            phoneVerifiedAt: Date | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        status: import(".prisma/client").$Enums.PublicationStatus;
        imageUrl: string | null;
        summary: string | null;
        content: string;
        authorId: string | null;
        publishedAt: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        author: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            phone: string | null;
            displayName: string;
            passwordHash: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            emailVerifiedAt: Date | null;
            phoneVerifiedAt: Date | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        status: import(".prisma/client").$Enums.PublicationStatus;
        imageUrl: string | null;
        summary: string | null;
        content: string;
        authorId: string | null;
        publishedAt: Date | null;
    }>;
    findBySlug(slug: string): Promise<{
        author: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            phone: string | null;
            displayName: string;
            passwordHash: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            emailVerifiedAt: Date | null;
            phoneVerifiedAt: Date | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        status: import(".prisma/client").$Enums.PublicationStatus;
        imageUrl: string | null;
        summary: string | null;
        content: string;
        authorId: string | null;
        publishedAt: Date | null;
    }>;
    create(data: any, authorId?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        status: import(".prisma/client").$Enums.PublicationStatus;
        imageUrl: string | null;
        summary: string | null;
        content: string;
        authorId: string | null;
        publishedAt: Date | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        status: import(".prisma/client").$Enums.PublicationStatus;
        imageUrl: string | null;
        summary: string | null;
        content: string;
        authorId: string | null;
        publishedAt: Date | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        status: import(".prisma/client").$Enums.PublicationStatus;
        imageUrl: string | null;
        summary: string | null;
        content: string;
        authorId: string | null;
        publishedAt: Date | null;
    }>;
    getTestimonials(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        isPublished: boolean;
        imageUrl: string | null;
        college: string | null;
        course: string | null;
        studentName: string;
        userId: string | null;
        year: string | null;
        content: string;
        displayOrder: number;
    }[]>;
    createTestimonial(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        isPublished: boolean;
        imageUrl: string | null;
        college: string | null;
        course: string | null;
        studentName: string;
        userId: string | null;
        year: string | null;
        content: string;
        displayOrder: number;
    }>;
    getFaqs(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        category: string | null;
        displayOrder: number;
        question: string;
        answer: string;
    }[]>;
    createFaq(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        category: string | null;
        displayOrder: number;
        question: string;
        answer: string;
    }>;
    getImpactMetrics(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        displayOrder: number;
        label: string;
        value: number;
        reportingPeriod: string | null;
        source: string | null;
        isVerified: boolean;
    }[]>;
    getDistricts(): Promise<{
        id: string;
        name: string;
        stateCode: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
