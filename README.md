# GSG Trust - Complete Website & Education Portal

A comprehensive full-stack web application for GSG Trust (Get Set Go Trust), an NGO dedicated to empowering students through education, career guidance, scholarships, and community service.

## 🎯 Project Overview

This is a complete production-ready platform consisting of:

- **Public NGO Website** - Information about GSG Trust, programs, impact
- **Student Services Portal** - Career guidance registration, college search, scholarships, counselling
- **Administrative Dashboard** - Content management, application review, reporting
- **Secure Backend API** - REST API with authentication, authorization, and data validation

## 📋 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- React Router (Navigation)
- React Hook Form + Zod (Form validation)
- TanStack Query (Data fetching)
- Recharts (Analytics)
- shadcn/ui Components

### Backend
- NestJS (Framework)
- TypeScript
- PostgreSQL (Database)
- Prisma ORM
- JWT Authentication
- Helmet (Security)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure DATABASE_URL in .env
# Example: postgresql://postgres:password@localhost:5432/gsg_trust

# Run migrations
npm run prisma:migrate

# Start development server
npm run start:dev
```

Backend runs on `http://localhost:3001`
API docs available at `http://localhost:3001/api/docs`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📁 Project Structure

```
GSG Web/
├── backend/
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   ├── programmes/        # Programme management
│   │   ├── colleges/          # College & course management
│   │   ├── scholarships/      # Scholarship system
│   │   ├── counselling/       # Counselling module
│   │   ├── volunteers/        # Volunteer management
│   │   ├── news/              # Content management
│   │   ├── prisma/            # Database layer
│   │   └── main.ts            # Application entry
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ui/            # Reusable UI components
    │   │   └── layout/        # Header, Footer
    │   ├── pages/             # Route pages
    │   │   └── admin/         # Admin pages
    │   ├── lib/               # Utilities & API client
    │   ├── hooks/             # Custom hooks
    │   ├── App.tsx            # Main app
    │   └── index.css          # Styles
    ├── index.html
    └── package.json
```

## 🔑 Key Features

### Public Website
- ✅ Home page with hero section
- ✅ About GSG Trust with mission, vision, leadership
- ✅ Programme showcase
- ✅ Impact metrics and statistics
- ✅ News and announcements
- ✅ Student testimonials
- ✅ Contact information
- ✅ Volunteer and donation sections

### Student Services
- ✅ Career guidance programme registration
- ✅ College and course discovery
- ✅ Fee information lookup
- ✅ Scholarship directory and applications
- ✅ Individual counselling requests
- ✅ Application status tracking
- ✅ Secure reference tracking

### Administration
- ✅ Role-based access control
- ✅ Programme management
- ✅ College and course management
- ✅ Scholarship application review
- ✅ Counselling assignment and scheduling
- ✅ Volunteer application management
- ✅ Content management system
- ✅ Dashboard with analytics
- ✅ Audit logging

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- CSRF protection support
- Input validation and sanitization
- SQL injection prevention via ORM
- Rate limiting ready
- Secure session management
- Role-based authorization
- Audit logging for all actions

## 📊 Database Schema

### Core Entities
- **Users** - Staff and admin accounts
- **Districts** - Geographic coverage areas
- **Schools** - School information
- **Programmes** - Career guidance and educational programmes
- **ProgrammeRegistrations** - Student registrations
- **Colleges** - Higher education institutions
- **Courses** - Course offerings
- **CollegeCourses** - College-course relationships
- **FeeRecords** - Academic year-specific fees
- **Scholarships** - Scholarship opportunities
- **ScholarshipApplications** - Student applications
- **CounsellingRequests** - Counselling service requests
- **CounsellingAppointments** - Appointment scheduling
- **VolunteerApplications** - Volunteer registrations
- **NewsArticles** - Blog posts and announcements
- **AuditLogs** - Administrative action tracking

## 🔌 API Endpoints

### Authentication
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me
```

### Programmes
```
GET    /api/v1/programmes
GET    /api/v1/programmes/:id
POST   /api/v1/programmes/:id/registrations
```

### Colleges & Courses
```
GET    /api/v1/colleges
GET    /api/v1/colleges/:id
GET    /api/v1/colleges/:id/fees
GET    /api/v1/courses
```

### Scholarships
```
GET    /api/v1/scholarships
GET    /api/v1/scholarships/:id
POST   /api/v1/scholarships/:id/apply
GET    /api/v1/scholarships/applications/all
```

### Counselling
```
POST   /api/v1/counselling/requests
GET    /api/v1/counselling/requests
GET    /api/v1/counselling/requests/:id
```

### Volunteers
```
POST   /api/v1/volunteers/apply
GET    /api/v1/volunteers/applications
```

### Content
```
GET    /api/v1/news
GET    /api/v1/testimonials
GET    /api/v1/faqs
GET    /api/v1/impact-metrics
GET    /api/v1/districts
```

## 🎨 Brand Colors

- **Primary**: #1246A8 (Royal Blue)
- **Secondary**: #102A56 (Deep Navy)
- **Accent**: #F2C14E (Gold)
- **Success**: #21865B (Green)
- **Error**: #C0392B (Red)

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm run test
npm run test:e2e
```

### Frontend Testing
```bash
cd frontend
npm run test
```

## 📦 Deployment

### Backend (NestJS + PostgreSQL)

1. Set environment variables:
```env
DATABASE_URL=postgresql://user:password@db-host/gsg_trust
JWT_SECRET=your-secure-secret-key
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com
```

2. Run migrations:
```bash
npm run prisma:migrate deploy
```

3. Start production server:
```bash
npm run build
npm run start:prod
```

### Frontend (Vite + React)

1. Build:
```bash
npm run build
```

2. Deploy `dist/` folder to static hosting (Vercel, Netlify, etc.)

3. Update API base URL in `src/lib/api.ts` for production

## 🔄 Workflow

### Programme Registration
1. Student browses published programmes
2. Enters registration details
3. Backend validates and checks capacity
4. Registration saved with unique reference
5. Confirmation email sent (when integrated)
6. Staff can review and manage registrations

### Scholarship Application
1. Student searches available scholarships
2. Reviews eligibility criteria
3. Completes multi-step application form
4. Uploads supporting documents
5. Application tracked via unique reference
6. Staff reviews and requests information if needed
7. Final decision recorded in application history

### Counselling Request
1. Student submits counselling request
2. Coordinator receives notification
3. Counsellor assigned by coordinator
4. Appointment proposed and confirmed
5. Counsellor records session notes (internal visibility)
6. Request marked complete or requires follow-up

## 📝 Content Management

All static content is managed through the admin dashboard:
- News articles
- Testimonials
- FAQs
- Impact metrics
- Programme information
- College and course data
- Scholarship listings

No code changes required for content updates.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Ensure tests pass and code is reviewed

## 📞 Support

For technical support or questions:
- Email: info@gsgtrust.in
- Phone: +91 97893 40230
- WhatsApp: https://wa.me/919789340230

## 📄 License

This project is developed for GSG Trust (Get Set Go Trust), an NGO. Please contact GSG Trust for licensing information.

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core platform launch
- ✅ Basic features implementation
- ✅ Authentication system

### Phase 2
- 🔄 Email notifications
- 🔄 SMS/OTP integration
- 🔄 Advanced analytics
- 🔄 Payment integration for donations

### Phase 3
- 📋 Tamil language support
- 📋 Mobile app (Android/iOS)
- 📋 Advanced search and filtering
- 📋 Recommendation engine

### Phase 4
- 📋 Video integration for counselling
- 📋 Live chat support
- 📋 Document verification system
- 📋 Integration with government portals

## 🎓 Credits

Built for GSG Trust - Get Set Go Trust
An organization committed to empowering students through education and community service.

---

**Last Updated**: October 2026
**Version**: 1.0.0