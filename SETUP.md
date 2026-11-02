# GSG Trust Platform - Setup & Installation Guide

## System Requirements

- **Node.js**: 18.0.0 or higher
- **PostgreSQL**: 14.0 or higher
- **npm**: 9.0.0 or higher
- **RAM**: Minimum 2GB
- **Disk Space**: Minimum 5GB

## Local Development Setup

### Step 1: Clone or Extract Project

```bash
cd /Users/admin/Pictures/GSG\ Web
```

### Step 2: Backend Setup

#### 2.1 Install Dependencies
```bash
cd backend
npm install
```

#### 2.2 Configure Database

Create a PostgreSQL database:
```sql
CREATE DATABASE gsg_trust;
CREATE USER gsg_dev WITH PASSWORD 'your_secure_password';
ALTER ROLE gsg_dev WITH CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE gsg_trust TO gsg_dev;
```

#### 2.3 Environment Configuration

Copy and edit `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://gsg_dev:your_secure_password@localhost:5432/gsg_trust"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
```

#### 2.4 Database Migrations

```bash
# Run migrations
npm run prisma:migrate dev

# Generate Prisma client
npm run prisma:generate

# View database (optional)
npm run prisma:studio
```

#### 2.5 Start Backend

```bash
npm run start:dev
```

Backend will start on `http://localhost:3001`
Swagger docs available at `http://localhost:3001/api/docs`

### Step 3: Frontend Setup

#### 3.1 Install Dependencies
```bash
cd ../frontend
npm install
```

#### 3.2 Environment Configuration (Optional)

The frontend is pre-configured to connect to `http://localhost:3001`

#### 3.3 Start Frontend

```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

## Verification

### Backend Health Check

```bash
curl http://localhost:3001/api/docs
```

Should return Swagger UI documentation.

### Frontend Access

Open browser and visit `http://localhost:5173`

You should see:
- GSG Trust logo and header
- Hero section
- Four service cards
- Navigation menu

### API Testing

Test programme listing:
```bash
curl http://localhost:3001/api/v1/programmes
```

Should return:
```json
[]
```

## Database Seeding (Optional)

Create sample data for testing:

```bash
cd backend

# Create a seed file
cat > prisma/seed.ts << 'EOF'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample district
  const district = await prisma.district.create({
    data: {
      name: 'Coimbatore',
      stateCode: 'TN',
    },
  })

  // Create sample college
  const college = await prisma.college.create({
    data: {
      name: 'PSG College of Technology',
      slug: 'psg-tech',
      districtId: district.id,
      institutionType: 'Private',
      isPublished: true,
    },
  })

  console.log('Seed data created successfully')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
EOF

npx ts-node prisma/seed.ts
```

## Development Workflow

### Making API Changes

1. **Update Prisma Schema** (`backend/prisma/schema.prisma`)
2. **Create Migration**:
   ```bash
   cd backend
   npm run prisma:migrate dev -- --name descriptive_name
   ```
3. **Implement API Endpoints** (in respective module)
4. **Test API** using Swagger docs or curl
5. **Update Frontend** to use new endpoints

### Making Frontend Changes

1. **Create/Update Component** (in `frontend/src/components/`)
2. **Create/Update Page** (in `frontend/src/pages/`)
3. **Add Route** (in `frontend/src/App.tsx`)
4. **Test in Browser** at `http://localhost:5173`

### Adding New Page

1. Create new file: `frontend/src/pages/NewPage.tsx`
2. Add route in `App.tsx`:
   ```tsx
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Add navigation link in `Header.tsx`

## Common Issues & Solutions

### Issue: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**: PostgreSQL is not running
```bash
# macOS with Homebrew
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
# Start PostgreSQL from Services
```

### Issue: `Database does not exist`

**Solution**: Run migrations
```bash
cd backend
npm run prisma:migrate deploy
```

### Issue: Port 3001 already in use

**Solution**: Change port in `backend/.env`
```env
PORT=3002
```

And update frontend API URL in `frontend/src/lib/api.ts`:
```ts
const API_BASE = '/api/v1'; // If using proxy
// OR
const API_BASE = 'http://localhost:3002/api/v1'; // If direct
```

### Issue: CORS errors in browser console

**Solution**: Ensure backend CORS is configured correctly:
```ts
// In backend/src/main.ts
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

### Issue: Port 5173 already in use

**Solution**: Change port in `frontend/vite.config.ts`:
```ts
server: {
  port: 5174,
  // ...
}
```

## Production Deployment

### Backend Deployment (Example: Heroku)

```bash
cd backend

# Create Procfile
echo "web: npm run start:prod" > Procfile

# Set environment variables
heroku config:set DATABASE_URL="postgresql://..."
heroku config:set JWT_SECRET="your-secret"
heroku config:set NODE_ENV="production"
heroku config:set FRONTEND_URL="https://your-domain.com"

# Deploy
git push heroku main
```

### Frontend Deployment (Example: Vercel)

```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Update API base URL for production
# Edit src/lib/api.ts to use production API URL
```

### Database Backup

```bash
# Backup PostgreSQL database
pg_dump gsg_trust > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
psql gsg_trust < backup_file.sql
```

## Testing

### Backend Unit Tests

```bash
cd backend
npm run test
```

### Backend E2E Tests

```bash
cd backend
npm run test:e2e
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## Monitoring

### Backend Logs

```bash
# Development (auto-reload)
cd backend
npm run start:dev

# Production
npm run start:prod
```

### Database Queries

```bash
# View real-time queries
cd backend
npm run prisma:studio

# Opens http://localhost:5555 with database explorer
```

## Performance Optimization

### Frontend
- Images: Use next-gen formats (WebP)
- Code splitting: Already configured with Vite
- Bundle analysis: `npm run build -- --analyze`

### Backend
- Database indexing: Already optimized in schema
- Query optimization: Use Prisma select/include carefully
- Caching: Redis ready (configure as needed)

## Security Checklist

- [ ] Change all default passwords
- [ ] Set strong JWT_SECRET
- [ ] Enable HTTPS in production
- [ ] Configure CORS correctly
- [ ] Set up rate limiting
- [ ] Enable audit logging
- [ ] Regular database backups
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Implement CSRF protection

## Useful Commands

```bash
# Backend
npm run start:dev          # Start dev server with hot reload
npm run build              # Build for production
npm run start:prod         # Start production server
npm run prisma:migrate     # Run migrations
npm run prisma:studio      # Open Prisma Studio
npm run prisma:generate    # Regenerate Prisma client

# Frontend
npm run dev                # Start dev server
npm run build              # Build for production
npm run preview            # Preview production build
npm run test               # Run tests
```

## Support

For issues or questions:
1. Check this guide
2. Check API documentation at `/api/docs`
3. Review backend logs
4. Check browser console for frontend errors
5. Contact GSG Trust team

---

**Last Updated**: October 2026