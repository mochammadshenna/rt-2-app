# RT Apps Deployment Guide

A comprehensive guide for deploying RT Apps to Vercel with Golang backend integration.

## Table of Contents

1. [Prerequisites and Requirements](#prerequisites-and-requirements)
2. [Environment Setup](#environment-setup)
3. [Vercel Deployment Configuration](#vercel-deployment-configuration)
4. [Backend Integration Setup](#backend-integration-setup)
5. [Domain Configuration](#domain-configuration)
6. [SSL/HTTPS Setup](#sslhttps-setup)
7. [Performance Optimization](#performance-optimization)
8. [Monitoring and Logging](#monitoring-and-logging)
9. [Security Configurations](#security-configurations)
10. [Production Checklist](#production-checklist)
11. [Troubleshooting Guide](#troubleshooting-guide)
12. [CI/CD Pipeline](#cicd-pipeline)
13. [Database Migration Strategies](#database-migration-strategies)
14. [Backup and Disaster Recovery](#backup-and-disaster-recovery)
15. [Scaling Considerations](#scaling-considerations)

---

## Prerequisites and Requirements

### System Requirements

- Node.js 18.17.0 or higher
- Go 1.21 or higher
- Git version control
- npm or yarn package manager
- Vercel CLI
- PostgreSQL 15+ (for production database)

### Account Requirements

- Vercel account (Pro recommended for production)
- GitHub/GitLab/Bitbucket account
- Domain registrar access (for custom domains)
- Cloud database provider account (Railway, Supabase, or AWS RDS)
- Email service account (SendGrid, Mailgun, or similar)

### Development Environment

# Verify Node.js version

node --version # Should be 18.17.0+

# Verify Go version

go version # Should be 1.21+

# Install Vercel CLI

npm i -g vercel

# Install dependencies

npm install
go mod tidy
---

## Environment Setup

### Local Development Environment

1. **Clone and Setup Project**
git clone <your-repo-url>
cd rt-apps
npm install
2. **Environment Files**

Create `.env.local` for frontend:

# Frontend Environment Variables

NEXT_PUBLIC_API_URL=<http://localhost:8080>
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Database

DATABASE_URL=postgresql://username:password@localhost:5432/rtapps_dev

# Authentication

NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=<http://localhost:3000>

# External APIs

OPENAI_API_KEY=your_openai_key
SENDGRID_API_KEY=your_sendgrid_key
Create `.env` for backend:

# Backend Environment Variables

PORT=8080
ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/rtapps_dev

# JWT Configuration

JWT_SECRET=your-jwt-secret
JWT_EXPIRY=24h

# CORS Configuration

CORS_ORIGINS=<http://localhost:3000,https://your-domain.com>

# Rate Limiting

RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=3600

# External Services

REDIS_URL=redis://localhost:6379
S3_BUCKET=your-s3-bucket
AWS_REGION=us-east-1

### Production Environment Setup

1. **Database Setup**

# Using Railway (Recommended)

railway login
railway new
railway add postgresql
railway variables set DATABASE_URL="$(railway variables get DATABASE_URL)"

# Using Supabase

curl -o- <https://cli.supabase.com/install.sh> | bash
supabase projects create rt-apps-prod
2. **Redis Setup**

# Using Upstash

curl -X POST \
  <https://api.upstash.com/v2/redis/databases> \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"name": "rt-apps-redis", "region": "us-east-1"}'
---

## Vercel Deployment Configuration

### Project Configuration

1. **vercel.json**
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/v1/(.*)",
      "dest": "/api/proxy?path=$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url",
    "DATABASE_URL": "@database_url",
    "NEXTAUTH_SECRET": "@nextauth_secret"
  },
  "functions": {
    "app/**/*": {
      "maxDuration": 30
    }
  },
  "regions": ["iad1", "sfo1"],
  "framework": "nextjs"
}
2. **next.config.js**
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ],
    minimumCacheTTL: 60,
    formats: ['image/webp', 'image/avif']
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.BACKEND_URL}/api/v1/:path*`
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  compress: true,
  poweredByHeader: false
}

module.exports = nextConfig

### Vercel CLI Deployment

1. **Initial Deployment**

# Login to Vercel

vercel login

# Link project

vercel link

# Set environment variables

vercel env add NEXT_PUBLIC_API_URL production
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production

# Deploy to production

vercel --prod
2. **Environment Variables**

# Set all required environment variables

vercel env add NODE_ENV production
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add OPENAI_API_KEY production
vercel env add SENDGRID_API_KEY production
vercel env add REDIS_URL production
---

## Backend Integration Setup

### Golang Backend Deployment

1. **Railway Deployment**

Create `railway.yml`:
version: "2"
services:
  backend:
    builds:
      dockerfile: Dockerfile
    env:
      PORT: 8080
      ENV: production
    healthcheck:
      path: /health
      interval: 30
      timeout: 10
      retries: 3
    restart: always
2. **Dockerfile for Go Backend**

# Build stage

FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/server

# Production stage

FROM alpine:latest

RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=builder /app/main .
COPY --from=builder /app/migrations ./migrations

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider <http://localhost:8080/health> || exit 1

CMD ["./main"]
3. **Backend Configuration**
// config/config.go
package config

import (
    "os"
    "strconv"
)

type Config struct {
    Port         string
    DatabaseURL  string
    JWTSecret    string
    Environment  string
    CORSOrigins  []string
    RedisURL     string
    RateLimit    RateLimitConfig
}

type RateLimitConfig struct {
    Requests int
    Window   int
}

func Load() *Config {
    return &Config{
        Port:        getEnv("PORT", "8080"),
        DatabaseURL: getEnv("DATABASE_URL", ""),
        JWTSecret:   getEnv("JWT_SECRET", ""),
        Environment: getEnv("ENV", "development"),
        CORSOrigins: strings.Split(getEnv("CORS_ORIGINS", "*"), ","),
        RedisURL:    getEnv("REDIS_URL", ""),
        RateLimit: RateLimitConfig{
            Requests: getEnvAsInt("RATE_LIMIT_REQUESTS", 100),
            Window:   getEnvAsInt("RATE_LIMIT_WINDOW", 3600),
        },
    }
}

func getEnv(key, defaultVal string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return defaultVal
}

### API Integration

1. **Frontend API Client**
// lib/api-client.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios'

class APIClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || '<http://localhost:8080>',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url)
    return response.data
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data)
    return response.data
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data)
    return response.data
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url)
    return response.data
  }
}

export const apiClient = new APIClient()
---

## Domain Configuration

### Custom Domain Setup

1. **Add Domain to Vercel**

# Add domain via CLI

vercel domains add your-domain.com

# Or via dashboard

# Go to Project Settings → Domains → Add Domain

2. **DNS Configuration**

For Cloudflare DNS:

# A Record

Type: A
Name: @
Value: 76.76.19.61

# CNAME Record

Type: CNAME
Name: www
Value: cname.vercel-dns.com

# CNAME Record for API subdomain

Type: CNAME
Name: api
Value: yourdomain.railway.app
3. **Subdomain Configuration**
// vercel.json
{
  "redirects": [
    {
      "source": "/api/v1/(.*)",
      "destination": "https://api.yourdomain.com/v1/$1",
      "permanent": false
    }
  ]
}

### Domain Verification

1. **Verify Domain Ownership**

# Check DNS propagation

dig your-domain.com
nslookup your-domain.com

# Verify Vercel configuration

vercel domains ls
---

## SSL/HTTPS Setup

### Automatic SSL (Vercel)

Vercel automatically provides SSL certificates for all domains. No additional configuration required.

### Custom SSL Configuration

1. **Force HTTPS Redirect**
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http'
          }
        ],
        destination: 'https://yourdomain.com/:path*',
        permanent: true
      }
    ]
  }
}
2. **Security Headers**
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // HSTS
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )

  // CSP
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;"
  )

return response
}
---

## Performance Optimization

### Frontend Optimization

1. **Image Optimization**
// next.config.js
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  }
}
2. **Bundle Analysis**
npm install --save-dev @next/bundle-analyzer

# Analyze bundle

ANALYZE=true npm run build
3. **Code Splitting**
// Dynamic imports
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
})

### Backend Optimization

1. **Connection Pooling**
// database/postgres.go
func NewDB(databaseURL string) (*sql.DB, error) {
    db, err := sql.Open("postgres", databaseURL)
    if err != nil {
        return nil, err
    }

    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(25)
    db.SetConnMaxLifetime(5 * time.Minute)

    return db, nil
}
2. **Caching Strategy**
// cache/redis.go
func (r *RedisClient) SetWithExpiry(key string, value interface{}, expiry time.Duration) error {
    data, err := json.Marshal(value)
    if err != nil {
        return err
    }

    return r.client.Set(context.Background(), key, data, expiry).Err()
}

### CDN Configuration

1. **Vercel Edge Network**
// vercel.json
{
  "regions": ["iad1", "sfo1", "lhr1", "hnd1"],
  "functions": {
    "app/api/**": {
      "maxDuration": 30
    }
  }
}

---

## Monitoring and Logging

### Application Monitoring

1. **Sentry Integration**
npm install @sentry/nextjs
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.BrowserTracing()
  ]
})
2. **Logging Configuration**
// lib/logger.ts
import winston from 'winston'

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'rt-apps' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

export { logger }

### Vercel Analytics

1. **Enable Analytics**

# Install Vercel Analytics

npm install @vercel/analytics
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

### Health Checks

1. **Frontend Health Check**
// app/api/health/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check database connectivity
    // Check external services

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: error.message },
      { status: 503 }
    )
  }
}
2. **Backend Health Check**
// handlers/health.go
func HealthHandler(w http.ResponseWriter, r *http.Request) {
    health := map[string]interface{}{
        "status":    "healthy",
        "timestamp": time.Now(),
        "version":   os.Getenv("APP_VERSION"),
    }

    // Check database
    if err := db.Ping(); err != nil {
        health["status"] = "unhealthy"
        health["database"] = "disconnected"
        w.WriteHeader(http.StatusServiceUnavailable)
    }

    json.NewEncoder(w).Encode(health)

}
---

## Security Configurations

### Authentication & Authorization

1. **NextAuth Configuration**
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Validate credentials against backend
        const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        })

        if (response.ok) {
          const user = await response.json()
          return user
        }
        return null
      }
    })
  ],
  session: { strategy: 'jwt' },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  pages: {
    signIn: '/login',
    error: '/auth/error'
  }
})

export { handler as GET, handler as POST }

### CORS Configuration

// middleware/cors.go
func CORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", strings.Join(config.CORSOrigins, ","))
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        w.Header().Set("Access-Control-Max-Age", "86400")

        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }

        next.ServeHTTP(w, r)
    })
}

### Rate Limiting

// middleware/ratelimit.go
func RateLimit(requests int, window time.Duration) func(http.Handler) http.Handler {
    var clients = make(map[string]*rate.Limiter)
    var mu sync.RWMutex

    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            ip := getIP(r)
            
            mu.Lock()
            if _, exists := clients[ip]; !exists {
                clients[ip] = rate.NewLimiter(rate.Every(window/time.Duration(requests)), requests)
            }
            limiter := clients[ip]
            mu.Unlock()

            if !limiter.Allow() {
                http.Error(w, "Rate limit exceeded", http.StatusTooManyRequests)
                return
            }

            next.ServeHTTP(w, r)
        })
    }

}
---

## Production Checklist

### Pre-Deployment

- [ ] All environment variables configured
- [ ] Database migrations completed
- [ ] SSL certificates configured
- [ ] Domain DNS properly configured
- [ ] Security headers implemented
- [ ] Rate limiting configured
- [ ] Monitoring and logging setup
- [ ] Error tracking configured (Sentry)
- [ ] Performance monitoring setup
- [ ] Load testing completed
- [ ] Security audit completed
- [ ] Backup procedures implemented

### Post-Deployment

- [ ] Health checks passing
- [ ] SSL certificates active
- [ ] CDN caching working
- [ ] Analytics tracking
- [ ] Error notifications working
- [ ] Performance metrics baseline established
- [ ] User authentication working
- [ ] API endpoints responding
- [ ] Database connectivity verified
- [ ] Email services working
- [ ] File uploads functioning
- [ ] Search functionality operational

### Verification Tests

# Health check

curl <https://yourdomain.com/api/health>

# SSL certificate

curl -I <https://yourdomain.com>

# Security headers

curl -I <https://yourdomain.com> | grep -E "(X-Frame|X-Content|Strict-Transport)"

# API connectivity

curl <https://yourdomain.com/api/v1/status>
---

## Troubleshooting Guide

### Common Issues

1. **Build Failures**

# Check build logs

vercel logs

# Local build test

npm run build

# Clear cache

rm -rf .next node_modules
npm install
2. **Environment Variables**

# Check current variables

vercel env ls

# Pull latest variables

vercel env pull
3. **Database Connection Issues**

# Test connection locally

psql $DATABASE_URL

# Check connection in production

vercel logs --function api
4. **API Integration Issues**

# Check CORS configuration

curl -H "Origin: <https://yourdomain.com>" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     <https://api.yourdomain.com/v1/test>

### Debug Mode

1. **Enable Debug Logging**
// lib/debug.ts
export const debug = {
  enabled: process.env.NODE_ENV === 'development',
  log: (message: string, data?: any) => {
    if (debug.enabled) {
      console.log(`[DEBUG] ${message}`, data)
    }
  }
}
2. **Production Debugging**

# Enable debug mode temporarily

vercel env add DEBUG true
vercel --prod
---

## CI/CD Pipeline

### GitHub Actions Workflow

# .github/workflows/deploy.yml

name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Run linting
        run: npm run lint
      
      - name: Type check
        run: npm run type-check

  deploy-preview:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    needs: test
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project Artifacts
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}

  deploy-production:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    needs: test
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}

  backend-deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Setup Go
        uses: actions/setup-go@v4
        with:
          go-version: '1.21'
      
      - name: Build Backend
        run: |
          cd backend
          go build -o main ./cmd/server
      
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway login --token ${{ secrets.RAILWAY_TOKEN }}
          railway up

### Quality Gates

# .github/workflows/quality.yml

name: Quality Gates

on:
  pull_request:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Security Audit
        run: npm audit --audit-level=high
      
      - name: Run Snyk Security Scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  performance-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://rt-apps-preview.vercel.app
          configPath: './.lighthouserc.js'
          uploadArtifacts: true
---

## Database Migration Strategies

### Migration System

1. **Database Migrations (Go)**
// migrations/migrate.go
package migrations

import (
    "database/sql"
    "fmt"
    "io/ioutil"
    "path/filepath"
    "sort"
)

func RunMigrations(db *sql.DB) error {
    // Create migrations table
    if err := createMigrationsTable(db); err != nil {
        return err
    }

    // Get applied migrations
    applied, err := getAppliedMigrations(db)
    if err != nil {
        return err
    }

    // Get migration files
    files, err := filepath.Glob("migrations/*.sql")
    if err != nil {
        return err
    }
    sort.Strings(files)

    // Apply new migrations
    for _, file := range files {
        filename := filepath.Base(file)
        if !applied[filename] {
            if err := applyMigration(db, file, filename); err != nil {
                return err
            }
        }
    }

    return nil
}

func applyMigration(db *sql.DB, file, filename string) error {
    content, err := ioutil.ReadFile(file)
    if err != nil {
        return err
    }

    tx, err := db.Begin()
    if err != nil {
        return err
    }
    defer tx.Rollback()

    if _, err := tx.Exec(string(content)); err != nil {
        return err
    }

    if _, err := tx.Exec(
        "INSERT INTO migrations (filename, applied_at) VALUES ($1, NOW())",
        filename,
    ); err != nil {
        return err
    }

    return tx.Commit()
}
2. **Migration Files Structure**
-- migrations/001_initial_schema.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

### Zero-Downtime Migrations

1. **Migration Strategy**

# 1. Deploy backward-compatible schema changes

# 2. Deploy application code that works with both schemas

# 3. Deploy code that uses new schema

# 4. Remove old schema/columns

2. **Blue-Green Database Strategy**
// config/database.go
type DatabaseConfig struct {
    PrimaryURL   string
    SecondaryURL string
    ReadOnlyURL  string
}

func (c *DatabaseConfig) GetWriteDB() (*sql.DB, error) {
    return sql.Open("postgres", c.PrimaryURL)
}

func (c *DatabaseConfig) GetReadDB() (*sql.DB, error) {
    return sql.Open("postgres", c.ReadOnlyURL)
}
---

## Backup and Disaster Recovery

### Automated Backups

1. **Database Backup Script**

# !/bin/bash

# scripts/backup.sh

set -e

BACKUP_DIR="/backups"
DATE=$(date +%Y-%m-%d-%H%M%S)
DB_NAME="rtapps"

# Create backup

pg_dump $DATABASE_URL > $BACKUP_DIR/backup-$DB_NAME-$DATE.sql

# Compress backup

gzip $BACKUP_DIR/backup-$DB_NAME-$DATE.sql

# Upload to S3

aws s3 cp $BACKUP_DIR/backup-$DB_NAME-$DATE.sql.gz \
  s3://your-backup-bucket/database-backups/

# Cleanup local backups older than 7 days

find $BACKUP_DIR -name "backup-$DB_NAME-*.sql.gz" -mtime +7 -delete

echo "Backup completed: backup-$DB_NAME-$DATE.sql.gz"
2. **Automated Backup with GitHub Actions**

# .github/workflows/backup.yml

name: Database Backup

on:
  schedule:
    - cron: '0 2 ** *'  # Daily at 2 AM UTC

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Install PostgreSQL client
        run: |
          sudo apt-get update
          sudo apt-get install postgresql-client

      - name: Create backup
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          DATE=$(date +%Y-%m-%d-%H%M%S)
          pg_dump $DATABASE_URL > backup-$DATE.sql
          gzip backup-$DATE.sql
          
          # Upload to S3
          aws s3 cp backup-$DATE.sql.gz s3://your-backup-bucket/

### Disaster Recovery Plan

1. **Recovery Procedures**

# 1. Restore Database

# !/bin/bash

# scripts/restore.sh

BACKUP_FILE=$1
if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: $0 <backup-file>"
    exit 1
fi

# Download backup from S3

aws s3 cp s3://your-backup-bucket/$BACKUP_FILE ./

# Decompress

gunzip $BACKUP_FILE

# Restore database

psql $DATABASE_URL < ${BACKUP_FILE%.gz}

echo "Database restored from $BACKUP_FILE"
2. **Recovery Testing**

# scripts/test-recovery.sh

# !/bin/bash

# Create test environment

vercel env add DATABASE_URL_TEST $TEST_DATABASE_URL

# Run recovery procedure

./scripts/restore.sh backup-test.sql.gz

# Verify data integrity

npm run test:integration

# Cleanup

dropdb test_recovery_db

### Point-in-Time Recovery

1. **Configure WAL Archiving**
-- Enable point-in-time recovery
SET wal_level = 'replica';
SET archive_mode = 'on';
SET archive_command = 'aws s3 cp %p s3://your-wal-bucket/%f';
SET max_wal_senders = 3;
SET wal_keep_segments = 64;

---

## Scaling Considerations

### Horizontal Scaling

1. **Database Read Replicas**
// database/pool.go
type DatabasePool struct {
    primary   *sql.DB
    replicas  []*sql.DB
    replicaIdx int
    mu        sync.RWMutex
}

func (p *DatabasePool) GetReadDB()*sql.DB {
    p.mu.RLock()
    defer p.mu.RUnlock()

    if len(p.replicas) == 0 {
        return p.primary
    }
    
    idx := p.replicaIdx % len(p.replicas)
    p.replicaIdx++
    return p.replicas[idx]
}

func (p *DatabasePool) GetWriteDB()*sql.DB {
    return p.primary
}
2. **Vercel Edge Functions**
// api/edge/route.ts
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  // This runs at the edge, closer to users
  const country = request.geo?.country || 'US'
  
  return new Response(JSON.stringify({
    message: 'Hello from the edge!',
    country
  }), {
    headers: { 'content-type': 'application/json' },
  })
}

### Vertical Scaling

1. **Resource Optimization**

# Railway scaling

railway variables set \
  RAILWAY_HEALTHCHECK_PATH=/health \
  RAILWAY_HEALTHCHECK_TIMEOUT=300 \
  RAILWAY_RESTART_POLICY=always

### Caching Strategy

1. **Multi-Layer Caching**
// lib/cache.ts
class CacheManager {
  private redis: Redis
  private memory: Map<string, any>

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL!)
    this.memory = new Map()
  }

  async get(key: string): Promise<any> {
    // Try memory cache first
    if (this.memory.has(key)) {
      return this.memory.get(key)
    }

    // Try Redis cache
    const value = await this.redis.get(key)
    if (value) {
      const parsed = JSON.parse(value)
      this.memory.set(key, parsed)
      return parsed
    }

    return null
  }

  async set(key: string, value: any, ttl: number = 300): Promise<void> {
    // Set in Redis with TTL
    await this.redis.setex(key, ttl, JSON.stringify(value))

    // Set in memory cache
    this.memory.set(key, value)
    
    // Cleanup memory cache after TTL
    setTimeout(() => this.memory.delete(key), ttl * 1000)
  }
}

### Database Sharding

1. **Shard Key Strategy**
// database/sharding.go
type ShardManager struct {
    shards map[int]*sql.DB
}

func (s *ShardManager) GetShard(userID string)*sql.DB {
    // Simple hash-based sharding
    hash := fnv.New32a()
    hash.Write([]byte(userID))
    shardID := int(hash.Sum32()) % len(s.shards)
    return s.shards[shardID]
}
---

This comprehensive deployment guide covers all aspects of deploying RT Apps to production with Vercel and Golang backend integration. Follow each section carefully and adapt the configurations to your specific requirements.

For additional support or questions, refer to:

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Railway Documentation](https://docs.railway.app)
- [Go Deployment Best Practices](https://golang.org/doc/)
