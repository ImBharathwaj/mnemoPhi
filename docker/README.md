# MnemoPhi Docker Environment

This directory contains Docker configuration files for the MnemoPhi development environment.

## 🐳 Services

### Core Services
- **Backend API** (port 8080) - Scala/Play Framework API
- **Frontend Dashboard** (port 3000) - Business dashboard
- **Frontend UserPage** (port 3001) - User consent interface

### Database Services (Docker)
- **PostgreSQL** (port 5433) - Primary database (Docker container)
- **Redis** (port 6380) - Caching and session storage (Docker container)

### Optional Services
- **Nginx** (port 80/443) - Reverse proxy (production profile)

## 🚀 Quick Start

### Prerequisites
Make sure Docker and docker-compose are installed and running.

### 1. Setup Docker Database
```bash
# From project root
./scripts/setup-db-docker.sh
```

### 2. Start All Services
```bash
# From project root
./scripts/start-all.sh
```

### 3. Manual Start
```bash
cd docker
docker-compose up --build -d
```

### 4. Seed Database (if not done during setup)
```bash
./scripts/seed-db.sh
```

## 🌐 Access Points

- **Dashboard**: http://dashboard.mnemophi.local (or http://localhost:3000)
- **User Page**: http://user.mnemophi.local (or http://localhost:3001)
- **API**: http://api.mnemophi.local (or http://localhost:8080)
- **Database**: localhost:5433
- **Redis**: localhost:6380

## 📋 Useful Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend-dashboard
```

### Stop Services
```bash
docker-compose down
```

### Restart Service
```bash
docker-compose restart backend
```

### Shell Access
```bash
# Backend container
docker-compose exec backend /bin/bash

# Database container
docker-compose exec postgres psql -U mnemophi -d mnemophi
```

### Clean Up
```bash
# Remove containers and volumes
docker-compose down -v

# Remove images
docker-compose down --rmi all
```

## 🔧 Development

### Hot Reload
- **Backend**: Source code is mounted, SBT will auto-reload
- **Frontend**: Node.js dev servers with hot reload enabled

### Environment Variables
All environment variables are configured in `docker-compose.yml`:
- Database connection settings
- Redis connection settings
- API URLs for frontend services

### Volumes
- Source code is mounted for development
- Database data is persisted in named volumes
- Node modules are cached in separate volumes

## 🏗️ Production

### Enable Nginx Proxy
```bash
docker-compose --profile production up -d
```

### SSL Configuration
Place SSL certificates in `docker/ssl/` directory:
- `cert.pem` - Certificate file
- `key.pem` - Private key file

## 🐛 Troubleshooting

### Port Conflicts
If ports are already in use, modify the port mappings in `docker-compose.yml`:
```yaml
ports:
  - "8081:8080"  # Change 8080 to 8081
```

### Database Connection Issues
```bash
# Check if PostgreSQL is ready
docker-compose exec postgres pg_isready -U mnemophi

# Reset database
docker-compose down -v
docker-compose up -d postgres
```

### Frontend Build Issues
```bash
# Rebuild frontend containers
docker-compose build --no-cache frontend-dashboard frontend-userpage
```

### Memory Issues
Increase Docker memory allocation in Docker Desktop settings (recommended: 4GB+)

## 📁 File Structure

```
docker/
├── backend.Dockerfile      # Scala backend container
├── frontend.Dockerfile     # React/Next.js frontend container
├── docker-compose.yml      # Service orchestration
├── nginx.conf             # Nginx reverse proxy config
└── README.md              # This file
```