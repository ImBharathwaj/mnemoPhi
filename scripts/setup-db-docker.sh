#!/bin/bash

# MnemoPhi Docker Database Setup Script

set -e

echo "🗄️  Setting up MnemoPhi Docker Database..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install docker-compose first."
    exit 1
fi

# Start PostgreSQL and Redis containers
echo "🐳 Starting PostgreSQL and Redis containers..."
cd ../docker
docker-compose up -d postgres redis

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 10

# Check if PostgreSQL is ready
if ! pg_isready -h localhost -p 5433 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not ready. Please check the logs:"
    echo "   docker-compose logs postgres"
    exit 1
fi

echo "✅ PostgreSQL is ready!"

# The database and user are already created by the init script
echo "✅ Database 'mnemophi' and user 'mnemophi' are already created!"

# Ask if user wants to seed with sample data
read -p "Do you want to seed the database with sample data? (y/n): " SEED_DATA
if [[ $SEED_DATA =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database with sample data..."
    cd ..
    ./scripts/seed-db.sh
fi

echo ""
echo "✅ MnemoPhi Docker database setup complete!"
echo ""
echo "📋 Database Information:"
echo "   Host: localhost"
echo "   Port: 5433"
echo "   Database: mnemophi"
echo "   Username: mnemophi"
echo "   Password: mnemophi_dev"
echo ""
echo "🔧 Environment Variables for Backend:"
echo "   DB_HOST=postgres"
echo "   DB_PORT=5432"
echo "   DB_NAME=mnemophi"
echo "   DB_USER=mnemophi"
echo "   DB_PASSWORD=mnemophi_dev"
echo ""
echo "🚀 You can now start all MnemoPhi services with: ./scripts/start-all.sh"