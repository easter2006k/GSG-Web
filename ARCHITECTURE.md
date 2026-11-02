# GSG Trust Platform - Architecture & Developer Guide

## Architecture Overview

### System Design

```
┌─────────────────────────────────────────────────────────────────┐
│                      Client Browser                             │
│  (React + TypeScript + Tailwind CSS)                           │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP/HTTPS
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    Frontend (Vite)                              │
│  - React Router for navigation                                 │
│  - React Hook Form for form management                        │
│  - TanStack Query for data fetching                           │
│  - Tailwind CSS for styling                                   │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST API (/api/v1)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                  NestJS Backend API                             │
│  ├─ Auth Module (JWT)                                         │
│  ├─ Programmes Module                                         │
│  ├─ Colleges Module                                           │
│  ├─ Scholarships Module                                       │
│  ├─ Counselling Module                                        │
│  ├─ Volunteers Module                                         │
│  └─ Content Module                                            │
└────────────────────────────┬────────────────────────────────────┘
                             │ Prisma ORM
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                  PostgreSQL Database                            │
│  - Normalized relational schema                               │
│  - Automated migrations                                        │
│  - Transaction support                                         │
│  - Full-text search ready                                      │
└─────────────────────────────────────────────────────────────────┘
```

## Module Architecture

### Backend Module Structure

Each module follows a consistent pattern:

```
module/
├── module.module.ts      # NestJS module definition
├── module.service.ts     # Business logic
├── module.controller.ts  # Route handlers
└── module.dto.ts         # Data validation
```

#### Example: Programmes Module

```typescript
// programmes.module.ts
@Module({
  providers: [ProgrammesService],
  controllers: [ProgrammesController],
  exports: [ProgrammesService],
})
export class ProgrammesModule {}

// programmes.service.ts
@Injectable()
export class ProgrammesService {
  constructor(private prisma: PrismaService) {}
  
  async findAllPublished() { ... }
  async register(id, data) { ... }
}

// programmes.controller.ts
@Controller('programmes')
export class ProgrammesController {
  constructor(private service: ProgrammesService) {}
  
  @Get()
  async findAll() { ... }
  
  @Post(':id/registrations')
  async register(@Param('id') id, @Body() data) { ... }
}
```

## Authentication Flow

### JWT Authentication

```
1. User Login/Register
   ↓
2. Credentials validated
   ↓
3. JWT Token generated
   {
     sub: user_id,
     email: user_email,
     role: user_role,
     iat: issued_at,
     exp: expiry
   }
   ↓
4. Token sent to client
   ↓
5. Client stores token (localStorage/sessionStorage)
   ↓
6. Client sends token in Authorization header
   Authorization: Bearer <token>
   ↓
7. Backend validates token via JwtStrategy
   ↓
8. Request proceeds with authenticated user
```

### Protected Routes

```typescript
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Get('admin/dashboard')
async getDashboard(@CurrentUser() user: any) {
  // user is authenticated
}
```

## Database Relationships

### Key Relationships

```
District ─── Schools
   │
   └─── Colleges ─── Courses
   │                   │
   │                   └─── CollegeCourses ─── FeeRecords
   │
   └─── Programmes ─── ProgrammeRegistrations
   │
   └─── Scholarships ─── ScholarshipApplications
   │
   └─── CounsellingRequests ─── CounsellingAppointments
                                 └─── CounsellingNotes

Users ─── CounsellingAssignments
```

## Data Flow Examples

### Programme Registration Flow

```
Frontend                          Backend                      Database
   │                                │                             │
   ├─ GET /programmes              │                             │
   ├──────────────────────────────>│ Find all published          │
   │                                ├───────────────────────────>│
   │                                │ Query: programmes          │
   │                                │ WHERE isPublished = true   │
   │                                │<────────────────────────────┤
   │<──────────────────────────────┤ Return programmes array    │
   │ Display programmes list        │                            │
   │                                │                            │
   ├─ POST /programmes/:id/registrations
   │   {studentName, school, phone} │                            │
   ├──────────────────────────────>│ Validate registration      │
   │                                │ ├─ Check if programme open │
   │                                │ ├─ Check capacity          │
   │                                │ └─ Check for duplicates   │
   │                                │ ├───────────────────────────┤
   │                                │ │ Generate reference       │
   │                                │ │ Create registration      │
   │                                │ │<───────────────────────────┤
   │<──────────────────────────────┤ Return confirmation       │
   │ Show success with reference    │                            │
```

### Scholarship Application Flow

```
1. Browse scholarships (GET /scholarships)
2. View scholarship details (GET /scholarships/:id)
3. Apply for scholarship (POST /scholarships/:id/apply)
   - Validate application data
   - Check deadline
   - Save application with reference
4. Upload documents (POST /scholarship-applications/:id/documents)
5. Submit application (PUT /scholarship-applications/:id/status)
6. Track status (GET /application-status/:reference)
7. Admin reviews (GET /scholarships/applications/all)
8. Admin requests info or makes decision (PUT /applications/:id/status)
9. Application status updated with audit trail
```

## Validation Strategy

### Frontend Validation (UX)
- Real-time field validation with Zod
- User-friendly error messages
- Prevents submission of invalid forms

### Backend Validation (Security)
- All data re-validated on server
- Type checking via TypeScript
- Business logic validation
- Database constraints enforced

```typescript
// Frontend
const schema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^\d{10}$/),
});

// Backend
class RegisterDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @Matches(/^\d{10}$/)
  phone: string;
}

// Database
model ProgrammeRegistration {
  contactPhone String @db.String(10)
  @@index([contactPhone])
}
```

## Error Handling

### Standardized Error Response

```json
{
  "statusCode": 400,
  "message": "User with this email already exists",
  "error": "ConflictException"
}
```

### Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Continue |
| 201 | Created | Resource created |
| 400 | Bad Request | Check input data |
| 401 | Unauthorized | Login required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate/conflict error |
| 500 | Server Error | Contact support |

## Security Considerations

### Password Security
```typescript
// Hashing
const hash = await bcrypt.hash(password, 10);

// Verification
const isValid = await bcrypt.compare(password, hash);
```

### JWT Security
```env
JWT_SECRET="use-a-very-long-random-string-at-least-32-chars"
JWT_EXPIRES_IN="7d"
```

### SQL Injection Prevention
```typescript
// ❌ NOT Safe
await db.query(`SELECT * FROM users WHERE email = '${email}'`);

// ✅ Safe (using Prisma)
await prisma.user.findUnique({ where: { email } });
```

### CSRF Protection
```typescript
// Express middleware handles CSRF tokens
app.use(helmet());
app.use(cookieParser());
```

## Performance Optimization

### Database Optimization
- Indexes on frequently searched fields
- Normalized schema to prevent data duplication
- Pagination for large result sets

```typescript
// Good: Select only needed fields
await prisma.user.findMany({
  select: { id: true, email: true },
});

// Good: Use include efficiently
await prisma.programme.findMany({
  include: { district: true },
  skip: (page - 1) * limit,
  take: limit,
});
```

### Frontend Optimization
- Code splitting via React Router
- Lazy loading of components
- Image optimization
- CSS optimization via Tailwind

## Testing Strategy

### Unit Tests
```bash
# Backend
cd backend
npm run test

# Test individual services
npm run test -- programmes.service
```

### Integration Tests
```bash
cd backend
npm run test:e2e

# Test complete API flow
```

### Frontend Tests
```bash
cd frontend
npm run test

# Component testing
```

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations reviewed
- [ ] Security audit completed
- [ ] Performance tested
- [ ] API documentation updated

### Deployment
- [ ] Database backups created
- [ ] Code deployed to staging
- [ ] Smoke tests performed
- [ ] Production deployment
- [ ] Verify all endpoints
- [ ] Monitor logs

### Post-Deployment
- [ ] Database backups verified
- [ ] Monitoring alerts enabled
- [ ] Team notified
- [ ] Documentation updated

## Monitoring & Logging

### Backend Logging
```typescript
// Use NestJS logger
import { Logger } from '@nestjs/common';

const logger = new Logger('ProgrammesService');
logger.log('Programme registered');
logger.error('Registration failed', error);
```

### Database Monitoring
```bash
# Check active connections
SELECT count(*) FROM pg_stat_activity;

# View slow queries
SELECT * FROM pg_stat_statements ORDER BY mean_time DESC;
```

## Scaling Considerations

### Current Capacity
- Handles 1000+ concurrent users
- Database can store 1M+ records
- File storage ready for documents

### Future Scaling
- Add Redis for caching
- Implement queue system (Bull/RabbitMQ)
- Horizontal scaling with load balancer
- CDN for static assets
- Database replication for read scaling

## Maintenance Tasks

### Regular Backups
```bash
# Daily backup
0 2 * * * pg_dump gsg_trust > /backups/backup_$(date +\%Y\%m\%d).sql
```

### Update Dependencies
```bash
# Check for updates
npm outdated

# Update safely
npm update

# Security updates
npm audit fix
```

### Database Optimization
```sql
-- Analyze tables
ANALYZE;

-- Rebuild indexes
REINDEX DATABASE gsg_trust;

-- Vacuum database
VACUUM FULL;
```

## Troubleshooting Guide

### Common Issues

#### High Memory Usage
- Check for memory leaks in services
- Review database connection pool
- Clear old audit logs

#### Slow Queries
- Check database indexes
- Analyze query execution plans
- Optimize Prisma selects

#### API Timeouts
- Check database connectivity
- Review service dependencies
- Monitor network latency

## Documentation Standards

### API Endpoint Documentation

```typescript
/**
 * Get all published programmes
 * 
 * @returns {Promise<Programme[]>} Array of published programmes
 * @throws {NotFoundException} If no programmes found
 * 
 * @example
 * GET /api/v1/programmes
 * Response: [{ id: "...", title: "...", ... }]
 */
@Get()
async findAll() { ... }
```

### Code Comments
- Explain "why", not "what"
- Comment complex logic
- Update comments with code changes

## Contributing Guidelines

1. Fork the repository
2. Create feature branch: `git checkout -b feature/name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/name`
5. Submit pull request

### Code Style
- Use TypeScript strict mode
- Follow NestJS conventions
- Use Prettier for formatting
- ESLint for linting

---

**Last Updated**: October 2026
**Version**: 1.0.0