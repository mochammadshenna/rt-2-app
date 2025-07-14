# RT (Rukun Tetangga) Progressive Web App - Technical Design Document

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [MVP Feature Breakdown](#2-mvp-feature-breakdown)
3. [Authentication Hierarchy](#3-authentication-hierarchy)
4. [Architecture Overview](#4-architecture-overview)
5. [Database Schema](#5-database-schema)
6. [API Endpoints Structure](#6-api-endpoints-structure)
7. [User Stories](#7-user-stories)
8. [Implementation Phases](#8-implementation-phases)
9. [UI/UX Design Principles](#9-uiux-design-principles)
10. [Security Considerations](#10-security-considerations)
11. [Technical Specifications](#11-technical-specifications)

---

## 1. Project Overview

### 1.1 Purpose
The RT Progressive Web App is a community management platform designed to facilitate communication, event coordination, and administrative tasks within Indonesian neighborhood communities (Rukun Tetangga).

### 1.2 Goals
- Streamline RT administrative processes
- Improve community communication
- Digitize attendance and contribution tracking
- Provide transparent governance tools

### 1.3 Target Users
- **RT Administrators**: Managing community affairs
- **RT Residents**: Participating in community activities
- **Guests**: Limited access for visitors

---

## 2. MVP Feature Breakdown

### 2.1 Core Features with Tasks

#### Authentication System
- [ ] **Task 1**: Implement user registration with phone number
- [ ] **Task 2**: Create OTP verification system
- [ ] **Task 3**: Build login/logout functionality
- [ ] **Task 4**: Set up role-based access control (Admin/Resident/Guest)
- [ ] **Task 5**: Password reset functionality

#### Community Announcements
- [ ] **Task 6**: Create announcement posting interface (Admin only)
- [ ] **Task 7**: Build announcement feed for all users
- [ ] **Task 8**: Implement announcement categories
- [ ] **Task 9**: Add image upload for announcements
- [ ] **Task 10**: Push notification system for new announcements

#### Event Management
- [ ] **Task 11**: Event creation form (Admin)
- [ ] **Task 12**: Event listing and details view
- [ ] **Task 13**: RSVP functionality for residents
- [ ] **Task 14**: Event attendance tracking
- [ ] **Task 15**: Event calendar view

#### Resident Directory
- [ ] **Task 16**: Resident profile management
- [ ] **Task 17**: Household information system
- [ ] **Task 18**: Contact directory with search
- [ ] **Task 19**: Family member registration
- [ ] **Task 20**: Privacy settings for profile visibility

#### Contribution Tracking
- [ ] **Task 21**: Monthly dues recording system
- [ ] **Task 22**: Payment status tracking
- [ ] **Task 23**: Contribution history view
- [ ] **Task 24**: Payment reminders
- [ ] **Task 25**: Financial reporting (Admin)

---

## 3. Authentication Hierarchy

graph TD
    A[Landing Page] --> B{User Status}
    B --> C[Guest Access]
    B --> D[Login Required]
    
    D --> E{Authentication}
    E --> F[Phone Number Input]
    F --> G[OTP Verification]
    G --> H{Role Check}
    
    H --> I[Admin Dashboard]
    H --> J[Resident Dashboard]
    
    C --> K[Limited Public Content]
    K --> L[Announcements View Only]
    K --> M[Contact Info]
    K --> N[Join Request Form]
    
    I --> O[Full Admin Features]
    O --> P[User Management]
    O --> Q[Content Management]
    O --> R[Analytics]
    
    J --> S[Resident Features]
    S --> T[Profile Management]
    S --> U[Event Participation]
    S --> V[Community Feed]
---

## 4. Architecture Overview

### 4.1 System Architecture

graph TB
    A[Client - PWA] --> B[API Gateway]
    B --> C[Authentication Service]
    B --> D[User Service]
    B --> E[Event Service]
    B --> F[Announcement Service]
    B --> G[Payment Service]
    
    C --> H[Database - PostgreSQL]
    D --> H
    E --> H
    F --> H
    G --> H
    
    I[File Storage - S3] --> A
    J[Push Notification Service] --> A
    K[SMS Service] --> C
    L[CDN] --> A
### 4.2 App Navigation Flow

graph LR
    A[Splash Screen] --> B[Authentication Check]
    B --> C{Authenticated?}
    
    C -->|Yes| D{User Role?}
    C -->|No| E[Login/Register]
    
    D -->|Admin| F[Admin Dashboard]
    D -->|Resident| G[Resident Dashboard]
    D -->|Guest| H[Guest View]
    
    F --> I[Admin Features]
    I --> J[User Management]
    I --> K[Content Management]
    I --> L[Analytics]
    I --> M[Settings]
    
    G --> N[Resident Features]
    N --> O[Community Feed]
    N --> P[Events]
    N --> Q[Directory]
    N --> R[Profile]
    N --> S[Payments]
    
    H --> T[Limited Access]
    T --> U[Public Announcements]
    T --> V[Contact Info]
    T --> W[Join Request]
---

## 5. Database Schema

erDiagram
    USERS {
        uuid id PK
        string phone_number UK
        string name
        string email
        enum role
        timestamp created_at
        timestamp updated_at
        boolean is_active
    }
    
    HOUSEHOLDS {
        uuid id PK
        string address
        string rt_number
        string rw_number
        uuid head_of_household FK
        timestamp created_at
        timestamp updated_at
    }
    
    RESIDENTS {
        uuid id PK
        uuid user_id FK
        uuid household_id FK
        string relationship_to_head
        date date_of_birth
        string occupation
        timestamp move_in_date
        boolean is_active
    }
    
    ANNOUNCEMENTS {
        uuid id PK
        uuid author_id FK
        string title
        text content
        string category
        string priority
        json attachments
        timestamp created_at
        timestamp updated_at
        boolean is_active
    }
    
    EVENTS {
        uuid id PK
        uuid creator_id FK
        string title
        text description
        datetime event_date
        string location
        integer max_participants
        json metadata
        timestamp created_at
        timestamp updated_at
        boolean is_active
    }
    
    EVENT_PARTICIPANTS {
        uuid id PK
        uuid event_id FK
        uuid user_id FK
        enum status
        timestamp registered_at
        timestamp attended_at
    }
    
    CONTRIBUTIONS {
        uuid id PK
        uuid user_id FK
        decimal amount
        string type
        string description
        date due_date
        date paid_date
        enum status
        timestamp created_at
        timestamp updated_at
    }
    
    USERS ||--|| RESIDENTS : "has profile"
    USERS ||--o{ ANNOUNCEMENTS : "creates"
    USERS ||--o{ EVENTS : "creates"
    USERS ||--o{ EVENT_PARTICIPANTS : "participates"
    USERS ||--o{ CONTRIBUTIONS : "has contributions"
    HOUSEHOLDS ||--o{ RESIDENTS : "contains"
    EVENTS ||--o{ EVENT_PARTICIPANTS : "has participants"
---

## 6. API Endpoints Structure

### 6.1 Authentication Endpoints
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify-otp
POST /api/auth/refresh-token
POST /api/auth/logout
POST /api/auth/forgot-password
### 6.2 User Management Endpoints
GET /api/users/profile
PUT /api/users/profile
GET /api/users/residents (Admin only)
POST /api/users/residents (Admin only)
PUT /api/users/residents/:id (Admin only)
DELETE /api/users/residents/:id (Admin only)
### 6.3 Announcement Endpoints
GET /api/announcements
POST /api/announcements (Admin only)
PUT /api/announcements/:id (Admin only)
DELETE /api/announcements/:id (Admin only)
GET /api/announcements/categories
### 6.4 Event Endpoints
GET /api/events
POST /api/events (Admin only)
PUT /api/events/:id (Admin only)
DELETE /api/events/:id (Admin only)
POST /api/events/:id/rsvp
GET /api/events/:id/participants (Admin only)
### 6.5 Contribution Endpoints
GET /api/contributions/my-contributions
GET /api/contributions/all (Admin only)
POST /api/contributions (Admin only)
PUT /api/contributions/:id/payment
GET /api/contributions/reports (Admin only)
---

## 7. User Stories

### 7.1 Admin User Stories
As an RT Administrator, I want to:
- Create and manage announcements so that I can keep residents informed
- Manage resident profiles so that I can maintain accurate community records
- Track contribution payments so that I can manage community finances
- Organize events so that I can build community engagement
- View analytics so that I can understand community participation
### 7.2 Resident User Stories
As an RT Resident, I want to:
- View community announcements so that I stay informed about RT affairs
- RSVP to events so that I can participate in community activities
- Update my profile information so that my details are current
- View my contribution history so that I can track my payments
- Contact other residents so that I can build community relationships
### 7.3 Guest User Stories
As a Guest, I want to:
- View public announcements so that I can learn about the community
- See contact information so that I can reach out to RT administration
- Request to join the community so that I can become a resident
---

## 8. Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
gantt
    title Phase 1 Implementation
    dateFormat  YYYY-MM-DD
    section Authentication
    User Registration    :active, a1, 2024-01-01, 3d
    OTP Verification     :a2, after a1, 2d
    Login System         :a3, after a2, 2d
    Role Management      :a4, after a3, 2d
    
    section Basic UI
    Landing Page         :b1, 2024-01-01, 2d
    Dashboard Layout     :b2, after b1, 3d
    Navigation Setup     :b3, after b2, 2d
### Phase 2: Core Features (Weeks 3-4)
gantt
    title Phase 2 Implementation
    dateFormat  YYYY-MM-DD
    section Announcements
    Create Announcement  :c1, 2024-01-15, 3d
    Announcement Feed    :c2, after c1, 2d
    Image Upload         :c3, after c2, 2d
    
    section Residents
    Profile Management   :d1, 2024-01-15, 3d
    Resident Directory   :d2, after d1, 3d
    Search Functionality :d3, after d2, 2d
### Phase 3: Advanced Features (Weeks 5-6)
gantt
    title Phase 3 Implementation
    dateFormat  YYYY-MM-DD
    section Events
    Event Creation       :e1, 2024-01-29, 3d
    RSVP System          :e2, after e1, 2d
    Event Calendar       :e3, after e2, 3d
    
    section Contributions
    Payment Tracking     :f1, 2024-01-29, 4d
    Payment History      :f2, after f1, 2d
    Reports              :f3, after f2, 2d
---

## 9. UI/UX Design Principles

### 9.1 Design System
- **Primary Colors**: Indonesian flag colors (Red #DC2626, White #FFFFFF)
- **Secondary Colors**: Blue #3B82F6, Green #10B981
- **Typography**: Inter font family for clarity
- **Spacing**: 8px grid system
- **Responsive Design**: Mobile-first approach

### 9.2 User Experience Guidelines
1. Accessibility First
   - High contrast ratios
   - Screen reader compatibility
   - Touch-friendly interface

2. Performance Optimization
   - Lazy loading images
   - Progressive enhancement
   - Offline capability

3. Indonesian Localization
   - Bahasa Indonesia as primary language
   - Cultural context in UI elements
   - Local date/time formatting
### 9.3 Component Hierarchy
graph TD
    A[App Shell] --> B[Header]
    A --> C[Navigation]
    A --> D[Main Content]
    A --> E[Footer]
    
    B --> F[Logo]
    B --> G[User Menu]
    B --> H[Notifications]
    
    C --> I[Primary Navigation]
    C --> J[Secondary Actions]
    
    D --> K[Page Layouts]
    K --> L[Card Components]
    K --> M[Form Components]
    K --> N[List Components]
---

## 10. Security Considerations

### 10.1 Authentication Security
- JWT token with short expiration (15 minutes)
- Refresh token rotation
- OTP verification for sensitive actions
- Rate limiting on authentication endpoints
- Account lockout after failed attempts
### 10.2 Data Protection
- Personal data encryption at rest
- HTTPS only communication
- Input validation and sanitization
- SQL injection prevention
- XSS protection headers
### 10.3 Authorization Matrix
graph TD
    A[Permission Matrix] --> B[Admin Permissions]
    A --> C[Resident Permissions]
    A --> D[Guest Permissions]
    
    B --> E[Full CRUD on all resources]
    B --> F[User management access]
    B --> G[Financial data access]
    B --> H[Analytics access]
    
    C --> I[Read announcements]
    C --> J[Manage own profile]
    C --> K[RSVP to events]
    C --> L[View own contributions]
    
    D --> M[Read public announcements]
    D --> N[View contact info]
    D --> O[Submit join request]
---

## 11. Technical Specifications

### 11.1 Technology Stack
Frontend:
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- ShadCN UI Components
- PWA Service Worker

Backend:
- Node.js with Express
- PostgreSQL Database
- Prisma ORM
- Redis for caching
- JWT Authentication

Infrastructure:
- Vercel for deployment
- Supabase for database
- Cloudinary for image storage
- OneSignal for push notifications
### 11.2 Performance Requirements
- First Contentful Paint: < 1.5s
- Lighthouse Score: > 90
- Bundle Size: < 250KB
- Offline Functionality: Essential features available
- Cross-browser support: Chrome, Firefox, Safari, Edge
### 11.3 Monitoring and Analytics
- Error tracking with Sentry
- Performance monitoring with Web Vitals
- User analytics with privacy compliance
- Uptime monitoring
- Database performance metrics
---

## Conclusion

This technical design document provides a comprehensive roadmap for developing the RT Progressive Web App. The modular approach allows for iterative development while ensuring scalability and maintainability. Each phase builds upon the previous one, enabling continuous delivery of value to the RT community.

The implementation should prioritize user experience, security, and performance while maintaining flexibility for future enhancements based on community feedback and evolving requirements.