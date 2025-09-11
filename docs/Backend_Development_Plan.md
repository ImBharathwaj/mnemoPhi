# mnemoPhi Backend Development Plan

## Overview
This document outlines the development plan for the mnemoPhi backend using Scala and PostgreSQL, based on the API endpoints specification.

## Technology Stack
- **Language:** Scala 3.x
- **Framework:** Akka HTTP or ZIO HTTP
- **Database:** PostgreSQL 15+
- **ORM/Query Builder:** Slick or Quill
- **Authentication:** JWT for dashboard users, API keys for business clients
- **Build Tool:** sbt
- **Testing:** ScalaTest + TestContainers for integration tests

## Database Schema Design

### Core Tables

#### 1. Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. Clients Table
```sql
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. Consent Categories Table
```sql
CREATE TABLE consent_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 4. Consents Table
```sql
CREATE TABLE consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('granted', 'revoked')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, client_id, category)
);
```

#### 5. Dashboard Users Table (for admin access)
```sql
CREATE TABLE dashboard_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Indexes
```sql
-- Performance indexes
CREATE INDEX idx_consents_user_id ON consents(user_id);
CREATE INDEX idx_consents_client_id ON consents(client_id);
CREATE INDEX idx_consents_category ON consents(category);
CREATE INDEX idx_consents_status ON consents(status);
CREATE INDEX idx_consents_timestamp ON consents(timestamp);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_clients_api_key ON clients(api_key);
```

## Development Phases

### Phase 1: Core Infrastructure (Week 1-2)
- [ ] **Project Setup**
  - [ ] Initialize sbt project with Scala 3
  - [ ] Configure build.sbt with dependencies
  - [ ] Set up project structure following modules pattern
  - [ ] Configure logging (logback)
  - [ ] Set up Docker development environment

- [ ] **Database Setup**
  - [ ] Create PostgreSQL Docker container
  - [ ] Design and implement database schema
  - [ ] Create database migration scripts
  - [ ] Set up connection pooling (HikariCP)
  - [ ] Configure database configuration management

- [ ] **Basic HTTP Server**
  - [ ] Set up HTTP server framework (Akka HTTP or ZIO HTTP)
  - [ ] Configure CORS, security headers
  - [ ] Implement basic health check endpoint
  - [ ] Set up request/response logging
  - [ ] Configure error handling middleware

### Phase 2: Authentication & Authorization (Week 3)
- [ ] **API Key Authentication**
  - [ ] Implement API key validation middleware
  - [ ] Create API key generation utilities
  - [ ] Set up client authentication flow
  - [ ] Implement rate limiting per API key

- [ ] **JWT Authentication**
  - [ ] Implement JWT token generation/validation
  - [ ] Create dashboard user authentication endpoints
  - [ ] Set up password hashing (bcrypt)
  - [ ] Implement refresh token mechanism
  - [ ] Create protected route middleware

### Phase 3: Core Domain Models (Week 4)
- [ ] **Data Models**
  - [ ] Create case classes for all entities
  - [ ] Implement JSON serialization/deserialization
  - [ ] Create database mapping layer (Slick/Quill)
  - [ ] Implement repository pattern
  - [ ] Add validation using refined types

- [ ] **Business Logic**
  - [ ] Implement user management logic
  - [ ] Create consent management business rules
  - [ ] Implement client management logic
  - [ ] Add audit logging for consent changes

### Phase 4: API Endpoints Implementation (Week 5-6)

#### 4.1 User Endpoints
- [ ] **POST /users**
  - [ ] Validate email format and uniqueness
  - [ ] Store user metadata as JSONB
  - [ ] Return user ID and creation timestamp
  - [ ] Add input validation and error handling

- [ ] **GET /users/{userId}**
  - [ ] Validate user ID format
  - [ ] Retrieve user with metadata
  - [ ] Handle user not found scenarios
  - [ ] Implement proper HTTP status codes

#### 4.2 Consent Endpoints
- [ ] **POST /users/{userId}/consents**
  - [ ] Validate user and client existence
  - [ ] Check consent category validity
  - [ ] Handle consent updates vs new grants
  - [ ] Implement consent history tracking

- [ ] **PUT /users/{userId}/consents/{consentId}**
  - [ ] Validate consent ownership
  - [ ] Update consent status
  - [ ] Maintain audit trail
  - [ ] Handle revocation logic

- [ ] **GET /users/{userId}/consents**
  - [ ] Retrieve all user consents
  - [ ] Support filtering by client/category
  - [ ] Implement pagination
  - [ ] Add consent status filtering

#### 4.3 Client Endpoints
- [ ] **POST /clients**
  - [ ] Generate secure API keys
  - [ ] Validate business information
  - [ ] Store client metadata
  - [ ] Return client ID and API key

- [ ] **GET /clients/{clientId}**
  - [ ] Retrieve client information
  - [ ] Hide sensitive data (API keys)
  - [ ] Implement client authentication

- [ ] **GET /clients/{clientId}/users**
  - [ ] List users with consent to client
  - [ ] Include consent status and categories
  - [ ] Implement pagination
  - [ ] Add filtering options

- [ ] **GET /clients/{clientId}/consents/export**
  - [ ] Export consent data in CSV/JSON
  - [ ] Implement data filtering
  - [ ] Add export format options
  - [ ] Handle large dataset exports

#### 4.4 Admin Endpoints
- [ ] **GET /categories**
  - [ ] Retrieve all consent categories
  - [ ] Support category filtering
  - [ ] Return category metadata

- [ ] **POST /categories**
  - [ ] Validate admin permissions
  - [ ] Create new consent categories
  - [ ] Validate category uniqueness
  - [ ] Add category validation rules

### Phase 5: Advanced Features (Week 7-8)
- [ ] **Data Export & Reporting**
  - [ ] Implement CSV export functionality
  - [ ] Add JSON export with filtering
  - [ ] Create consent analytics queries
  - [ ] Implement data retention policies

- [ ] **Performance Optimization**
  - [ ] Add database query optimization
  - [ ] Implement caching layer (Redis)
  - [ ] Add connection pooling tuning
  - [ ] Implement async processing for exports

- [ ] **Monitoring & Observability**
  - [ ] Add application metrics (Prometheus)
  - [ ] Implement structured logging
  - [ ] Add health check endpoints
  - [ ] Set up error tracking

### Phase 6: Testing & Quality Assurance (Week 9-10)
- [ ] **Unit Testing**
  - [ ] Test all business logic functions
  - [ ] Mock external dependencies
  - [ ] Achieve >90% code coverage
  - [ ] Test error scenarios

- [ ] **Integration Testing**
  - [ ] Test API endpoints with TestContainers
  - [ ] Test database operations
  - [ ] Test authentication flows
  - [ ] Test data export functionality

- [ ] **Performance Testing**
  - [ ] Load test API endpoints
  - [ ] Test database performance
  - [ ] Validate response times
  - [ ] Test concurrent user scenarios

### Phase 7: Security & Compliance (Week 11)
- [ ] **Security Hardening**
  - [ ] Implement input sanitization
  - [ ] Add SQL injection prevention
  - [ ] Implement rate limiting
  - [ ] Add security headers

- [ ] **Data Protection**
  - [ ] Implement data encryption at rest
  - [ ] Add audit logging
  - [ ] Implement data anonymization
  - [ ] Add GDPR compliance features

### Phase 8: Deployment & DevOps (Week 12)
- [ ] **Containerization**
  - [ ] Create optimized Docker image
  - [ ] Set up multi-stage builds
  - [ ] Configure environment variables
  - [ ] Add health checks

- [ ] **CI/CD Pipeline**
  - [ ] Set up automated testing
  - [ ] Configure deployment pipeline
  - [ ] Add database migration automation
  - [ ] Implement rollback procedures

## Module Structure

```
backend/
├── modules/
│   ├── common/           # Shared utilities, types, configurations
│   ├── user/            # User management domain
│   ├── consent/         # Consent management domain
│   ├── client/          # Client management domain
│   └── admin/           # Admin functionality
├── main/                # Application entry point
├── resources/           # Configuration files
└── tests/              # Integration tests
```

## Configuration Management

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `API_RATE_LIMIT` - Rate limiting configuration
- `LOG_LEVEL` - Logging level
- `PORT` - HTTP server port

### Application Configuration
- Database connection pooling settings
- JWT token expiration times
- API rate limiting rules
- CORS configuration
- Security headers configuration

## API Documentation

### OpenAPI/Swagger
- [ ] Generate OpenAPI specification
- [ ] Set up Swagger UI
- [ ] Document all endpoints with examples
- [ ] Add authentication documentation
- [ ] Include error response documentation

## Monitoring & Alerting

### Metrics to Track
- API request rates and response times
- Database query performance
- Authentication success/failure rates
- Consent grant/revoke rates
- Error rates by endpoint

### Alerts
- High error rates
- Slow database queries
- Authentication failures
- API rate limit breaches
- System resource usage

## Security Considerations

### Data Protection
- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Implement proper access controls
- Regular security audits
- Data retention policies

### API Security
- Input validation and sanitization
- Rate limiting per API key
- CORS configuration
- Security headers (HSTS, CSP, etc.)
- SQL injection prevention

## Performance Targets

### Response Times
- User endpoints: < 100ms
- Consent endpoints: < 150ms
- Client endpoints: < 200ms
- Export endpoints: < 5s for 10k records

### Throughput
- Support 1000+ concurrent users
- Handle 10k+ consent operations per minute
- Process large data exports efficiently

## Risk Mitigation

### Technical Risks
- Database performance bottlenecks
- Memory leaks in long-running processes
- API rate limiting bypass
- Data consistency issues

### Mitigation Strategies
- Comprehensive testing strategy
- Performance monitoring
- Database query optimization
- Proper error handling and logging
- Regular security updates

## Success Criteria

### Functional Requirements
- [ ] All API endpoints implemented and tested
- [ ] Authentication and authorization working
- [ ] Data export functionality operational
- [ ] Admin panel integration complete

### Non-Functional Requirements
- [ ] Response times meet performance targets
- [ ] System handles expected load
- [ ] Security requirements satisfied
- [ ] Code coverage > 90%
- [ ] Documentation complete

## Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| 1-2   | 2 weeks  | Infrastructure, Database, Basic Server |
| 3     | 1 week   | Authentication & Authorization |
| 4     | 1 week   | Domain Models & Business Logic |
| 5-6   | 2 weeks  | API Endpoints Implementation |
| 7-8   | 2 weeks  | Advanced Features & Optimization |
| 9-10  | 2 weeks  | Testing & Quality Assurance |
| 11    | 1 week   | Security & Compliance |
| 12    | 1 week   | Deployment & DevOps |

**Total Duration: 12 weeks**

## Next Steps

1. **Immediate Actions:**
   - Set up development environment
   - Initialize sbt project structure
   - Create database schema
   - Set up basic HTTP server

2. **Week 1 Priorities:**
   - Complete project setup
   - Implement database layer
   - Create basic authentication
   - Start with user endpoints

3. **Regular Reviews:**
   - Weekly progress reviews
   - Code quality assessments
   - Performance testing checkpoints
   - Security audit milestones

This plan provides a comprehensive roadmap for developing the mnemoPhi backend with clear milestones, deliverables, and success criteria.