#!/bin/bash

# mnemoPhi Backend Development Startup Script

set -e

echo "🚀 Starting mnemoPhi Backend Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Start PostgreSQL and Redis containers
echo "📦 Starting PostgreSQL and Redis containers..."
cd "$(dirname "$0")/.."
docker-compose -f docker-compose.dev.yml up -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker exec mnemophi-postgres-dev pg_isready -U mnemophi -d mnemophi > /dev/null 2>&1; do
    echo "Waiting for PostgreSQL..."
    sleep 2
done

echo "✅ PostgreSQL is ready!"

# Wait for Redis to be ready
echo "⏳ Waiting for Redis to be ready..."
until docker exec mnemophi-redis-dev redis-cli ping > /dev/null 2>&1; do
    echo "Waiting for Redis..."
    sleep 2
done

echo "✅ Redis is ready!"

# Run database migrations
echo "🗄️  Running database migrations..."
docker exec mnemophi-postgres-dev psql -U mnemophi -d mnemophi -f /docker-entrypoint-initdb.d/init-db.sql

echo "🎉 Development environment is ready!"
echo ""
echo "📊 Services:"
echo "  - PostgreSQL: localhost:5433"
echo "  - Redis: localhost:6380"
echo "  - Backend: localhost:8080 (when started)"
echo ""
echo "🔧 To start the backend server:"
echo "  cd backend && sbt run"
echo ""
echo "🧪 To run tests:"
echo "  cd backend && sbt test"
echo ""
echo "🛑 To stop services:"
echo "  docker-compose -f docker-compose.dev.yml down"