import { PrismaService } from '../prisma/prisma.service';
export declare class CounsellingService {
    private prisma;
    constructor(prisma: PrismaService);
    createRequest(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.CounsellingStatus;
        districtId: string | null;
        studentName: string;
        contactPhone: string;
        userId: string | null;
        studentProfileId: string | null;
        requestReference: string;
        schoolOrCollege: string | null;
        qualification: string | null;
        topic: string;
        preferredContactMethod: string | null;
        preferredFormat: string | null;
        priority: string;
    }>;
    getRequests(filters?: {
        status?: string;
        counsellorId?: string;
    }): Promise<({
        district: {
            id: string;
            name: string;
            stateCode: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        assignments: ({
            counsellor: {
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
            };
        } & {
            id: string;
            assignedBy: string | null;
            assignedAt: Date;
            endedAt: Date | null;
            counsellingRequestId: string;
            counsellorUserId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.CounsellingStatus;
        districtId: string | null;
        studentName: string;
        contactPhone: string;
        userId: string | null;
        studentProfileId: string | null;
        requestReference: string;
        schoolOrCollege: string | null;
        qualification: string | null;
        topic: string;
        preferredContactMethod: string | null;
        preferredFormat: string | null;
        priority: string;
    })[]>;
    getRequestById(id: string): Promise<{
        district: {
            id: string;
            name: string;
            stateCode: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        notes: ({
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
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            counsellingRequestId: string;
            note: string;
            visibility: string;
            authorUserId: string;
        })[];
        assignments: ({
            counsellor: {
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
            };
        } & {
            id: string;
            assignedBy: string | null;
            assignedAt: Date;
            endedAt: Date | null;
            counsellingRequestId: string;
            counsellorUserId: string;
        })[];
        appointments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.AppointmentStatus;
            startsAt: Date;
            endsAt: Date;
            format: string | null;
            counsellingRequestId: string;
            counsellorUserId: string;
            locationOrMeetingDetails: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.CounsellingStatus;
        districtId: string | null;
        studentName: string;
        contactPhone: string;
        userId: string | null;
        studentProfileId: string | null;
        requestReference: string;
        schoolOrCollege: string | null;
        qualification: string | null;
        topic: string;
        preferredContactMethod: string | null;
        preferredFormat: string | null;
        priority: string;
    }>;
    getRequestByReference(reference: string): Promise<{
        assignments: ({
            counsellor: {
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
            };
        } & {
            id: string;
            assignedBy: string | null;
            assignedAt: Date;
            endedAt: Date | null;
            counsellingRequestId: string;
            counsellorUserId: string;
        })[];
        appointments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.AppointmentStatus;
            startsAt: Date;
            endsAt: Date;
            format: string | null;
            counsellingRequestId: string;
            counsellorUserId: string;
            locationOrMeetingDetails: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.CounsellingStatus;
        districtId: string | null;
        studentName: string;
        contactPhone: string;
        userId: string | null;
        studentProfileId: string | null;
        requestReference: string;
        schoolOrCollege: string | null;
        qualification: string | null;
        topic: string;
        preferredContactMethod: string | null;
        preferredFormat: string | null;
        priority: string;
    }>;
    assignCounsellor(requestId: string, counsellorId: string, assignedBy?: string): Promise<{
        id: string;
        assignedBy: string | null;
        assignedAt: Date;
        endedAt: Date | null;
        counsellingRequestId: string;
        counsellorUserId: string;
    }>;
    createAppointment(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        startsAt: Date;
        endsAt: Date;
        format: string | null;
        counsellingRequestId: string;
        counsellorUserId: string;
        locationOrMeetingDetails: string | null;
    }>;
    addNote(requestId: string, authorId: string, note: string, visibility?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        counsellingRequestId: string;
        note: string;
        visibility: string;
        authorUserId: string;
    }>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: import(".prisma/client").$Enums.CounsellingStatus;
        districtId: string | null;
        studentName: string;
        contactPhone: string;
        userId: string | null;
        studentProfileId: string | null;
        requestReference: string;
        schoolOrCollege: string | null;
        qualification: string | null;
        topic: string;
        preferredContactMethod: string | null;
        preferredFormat: string | null;
        priority: string;
    }>;
}
