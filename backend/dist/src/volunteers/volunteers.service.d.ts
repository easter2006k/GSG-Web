import { PrismaService } from '../prisma/prisma.service';
export declare class VolunteersService {
    private prisma;
    constructor(prisma: PrismaService);
    apply(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.VolunteerStatus;
        districtId: string | null;
        email: string;
        phone: string;
        userId: string | null;
        fullName: string;
        dateOfBirth: Date | null;
        city: string | null;
        skills: string[];
        interests: string[];
        availability: string | null;
        experience: string | null;
        message: string | null;
    }>;
    findAll(filters?: {
        status?: string;
    }): Promise<({
        district: {
            id: string;
            name: string;
            stateCode: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.VolunteerStatus;
        districtId: string | null;
        email: string;
        phone: string;
        userId: string | null;
        fullName: string;
        dateOfBirth: Date | null;
        city: string | null;
        skills: string[];
        interests: string[];
        availability: string | null;
        experience: string | null;
        message: string | null;
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.VolunteerStatus;
        districtId: string | null;
        email: string;
        phone: string;
        userId: string | null;
        fullName: string;
        dateOfBirth: Date | null;
        city: string | null;
        skills: string[];
        interests: string[];
        availability: string | null;
        experience: string | null;
        message: string | null;
    }>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.VolunteerStatus;
        districtId: string | null;
        email: string;
        phone: string;
        userId: string | null;
        fullName: string;
        dateOfBirth: Date | null;
        city: string | null;
        skills: string[];
        interests: string[];
        availability: string | null;
        experience: string | null;
        message: string | null;
    }>;
}
