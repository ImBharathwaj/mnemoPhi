#!/bin/bash

# MnemoPhi Local Database Setup Script

set -e

echo "🗄️  Setting up MnemoPhi Local Database..."

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running on localhost:5432. Please start PostgreSQL first."
    echo "   You can start it with: sudo systemctl start postgresql"
    exit 1
fi

# Check if psql is available
if ! command -v psql &> /dev/null; then
    echo "❌ psql is not installed. Please install PostgreSQL client tools."
    exit 1
fi

# Get database credentials
read -p "Enter PostgreSQL username (default: postgres): " DB_USER
DB_USER=${DB_USER:-postgres}

read -s -p "Enter PostgreSQL password: " DB_PASSWORD
echo ""

# Test connection
echo "🔍 Testing database connection..."
if ! PGPASSWORD=$DB_PASSWORD psql -h localhost -p 5432 -U $DB_USER -d postgres -c "SELECT 1;" > /dev/null 2>&1; then
    echo "❌ Cannot connect to PostgreSQL. Please check your credentials."
    exit 1
fi

echo "✅ Database connection successful!"

# Create database and user
echo "📊 Creating database and user..."
PGPASSWORD=$DB_PASSWORD psql -h localhost -p 5432 -U $DB_USER -d postgres << EOF
-- Create database
CREATE DATABASE mnemophi;

-- Create user
CREATE USER mnemophi WITH PASSWORD 'mnemophi_dev';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE mnemophi TO mnemophi;

-- Connect to the new database and grant schema privileges
\c mnemophi;
GRANT ALL ON SCHEMA public TO mnemophi;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO mnemophi;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO mnemophi;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO mnemophi;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO mnemophi;
EOF

echo "✅ Database and user created successfully!"

# Initialize database schema
echo "🏗️  Initializing database schema..."
PGPASSWORD=mnemophi_dev psql -h localhost -p 5432 -U mnemophi -d mnemophi < backend/scripts/init-db.sql

echo "✅ Database schema initialized!"

# Ask if user wants to seed with sample data
read -p "Do you want to seed the database with sample data? (y/n): " SEED_DATA
if [[ $SEED_DATA =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database with sample data..."
    ./scripts/seed-db.sh
fi

echo ""
echo "✅ MnemoPhi local database setup complete!"
echo ""
echo "📋 Database Information:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: mnemophi"
echo "   Username: mnemophi"
echo "   Password: mnemophi_dev"
echo ""
echo "🔧 Environment Variables for Backend:"
echo "   DB_HOST=localhost"
echo "   DB_PORT=5432"
echo "   DB_NAME=mnemophi"
echo "   DB_USER=mnemophi"
echo "   DB_PASSWORD=mnemophi_dev"
echo ""
echo "🚀 You can now start the MnemoPhi services with: ./scripts/start-all.sh"