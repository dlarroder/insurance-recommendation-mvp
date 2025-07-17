# Insurance Recommendation Engine

A full-stack prototype demonstrating a life insurance recommendation system built with modern web technologies.

## Overview

This application provides personalized life insurance recommendations based on user profile data including age, income, dependents, and risk tolerance. It features a clean, responsive interface and a rules-based recommendation engine.

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend

- **Next.js API Routes** - Server-side API endpoints
- **PostgreSQL** - Primary database
- **Drizzle ORM** - Type-safe database ORM
- **Better Auth** - Authentication and user management
- **Zod** - Server-side validation

### Infrastructure

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **AWS Ready** - Health checks and production configuration

## Features

### 🎯 Core Functionality

- **User Authentication** - Sign up, sign in, and user management
- **User Profile Form** - Collect age, income, dependents, risk tolerance
- **Recommendation Engine** - Rules-based logic for insurance recommendations
- **Results Display** - Personalized recommendations with explanations
- **Data Persistence** - Store user submissions for future ML training

### 🔧 Technical Features

- **Responsive Design** - Works on desktop and mobile
- **Form Validation** - Client and server-side validation
- **Error Handling** - Comprehensive error states
- **Health Checks** - AWS-ready endpoints
- **Type Safety** - End-to-end TypeScript
- **Database Migrations** - Automated schema management

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (via Docker)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd insurance-reco-mvp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your database URL and auth secrets
   ```

   Required environment variables:

   - `DATABASE_URL` - PostgreSQL connection string
   - `BETTER_AUTH_SECRET` - Secret key for authentication
   - `NEXT_PUBLIC_APP_URL` - Your application URL
   - OAuth provider credentials (optional)

4. **Start the database**

   ```bash
   docker-compose up postgres -d
   ```

5. **Generate and run migrations**

   ```bash
   npm run db:generate
   npm run db:setup
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:setup` - Run migrations and seed data

### Database Schema

The application uses the following main tables:

#### Authentication Tables

- `user` - User account information

#### Application Tables

#### `user_submissions`

- `id` - UUID primary key
- `age` - User's age
- `income` - Annual income
- `dependents` - Number of dependents
- `risk_tolerance` - Risk preference (low/medium/high)
- `created_at` - Timestamp
- `recommendation_id` - Link to recommendation
- `user_id` - Link to authenticated user

#### `recommendations`

- `id` - UUID primary key
- `product_type` - Insurance product type
- `coverage_amount` - Coverage amount
- `term_years` - Term length (if applicable)
- `monthly_premium` - Calculated premium
- `explanation` - Recommendation explanation
- `created_at` - Timestamp

#### `insurance_products`

- `id` - UUID primary key
- `type` - Product type (term/whole/universal)
- `name` - Product name
- `base_rate` - Base premium rate
- `max_coverage` - Maximum coverage
- `min_age` / `max_age` - Age restrictions
- `term_options` - Available terms
- `is_active` - Active status

## Recommendation Logic

The current system uses a rules-based approach:

### Rules

1. **Age < 40 + High Risk** → Term Life (20 years)
2. **Age ≥ 40 + Low Risk** → Whole Life
3. **Age 30-50 + Dependents** → Term Life (30 years)
4. **Medium Risk** → Universal Life
5. **Default** → Term Life (20 years)

### Coverage Calculation

- Base: 5-10x annual income (based on dependents)
- Additional: $50k per dependent
- Maximum: $2M (for demo)

### Premium Calculation

- Age-adjusted rates
- Product-specific multipliers
- Term length adjustments

## API Endpoints

### Authentication

- `POST /api/auth/sign-in` - Sign in with email/password
- `POST /api/auth/sign-up` - Create new account
- `POST /api/auth/sign-out` - Sign out current user
- `GET /api/auth/session` - Get current session

### Application

### `POST /api/recommendation`

Generate a personalized recommendation.

**Request Body:**

```json
{
  "age": 35,
  "income": 75000,
  "dependents": 2,
  "riskTolerance": "medium"
}
```

**Response:**

```json
{
  "success": true,
  "recommendation": {
    "id": "uuid",
    "productType": "Universal Life",
    "coverageAmount": "$600,000",
    "termYears": null,
    "monthlyPremium": "$145.25",
    "explanation": "..."
  }
}
```

### `GET /api/health`

Health check endpoint for monitoring.

### `GET /api/ready`

Readiness check for database and tables.

## Docker Deployment

### Build and Run

```bash
# Build the application
docker build -t insurance-reco-mvp .

# Run with Docker Compose
docker-compose up -d
```

### Production Deployment

The application is configured for production deployment with:

- Multi-stage Docker builds
- Non-root user execution
- Health checks
- Standalone Next.js output

## AWS Readiness

The application includes:

- **Health Check Endpoint** - `/api/health`
- **Readiness Check** - `/api/ready`
- **Dockerfile** - Production-ready containerization
- **Environment Variables** - External configuration
- **Logging** - Structured error logging

## Future Enhancements

### ML Integration

The current rules-based system is designed for easy ML integration:

- User submission data is stored for training
- Recommendation engine is modular and extensible

### Potential ML Features

- **Personalized Pricing** - ML-based premium calculation
- **Risk Assessment** - Advanced risk profiling
- **Product Recommendation** - ML-powered product selection

## Security Considerations

- Input validation on client and server
- SQL injection prevention via ORM
- Environment variable configuration
- Non-root Docker execution
- No sensitive data in logs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for demonstration purposes only.
