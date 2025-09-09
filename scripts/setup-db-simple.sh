#!/bin/bash

# Simple MnemoPhi Database Setup Script

set -e

echo "🗄️  Setting up MnemoPhi Database..."

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running. Please start it first:"
    echo "   sudo systemctl start postgresql"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Try different connection methods
echo "🔍 Testing database connection..."

# Method 1: Try with your current user
if psql -h localhost -p 5432 -d postgres -c "SELECT 1;" > /dev/null 2>&1; then
    echo "✅ Connected as current user"
    DB_USER=$(whoami)
    DB_PASSWORD=""
    CONNECTION_STRING="psql -h localhost -p 5432 -d postgres"
elif psql -h localhost -p 5432 -U postgres -d postgres -c "SELECT 1;" > /dev/null 2>&1; then
    echo "✅ Connected as postgres user"
    DB_USER="postgres"
    DB_PASSWORD=""
    CONNECTION_STRING="psql -h localhost -p 5432 -U postgres -d postgres"
else
    echo "❌ Cannot connect to PostgreSQL. Please check your setup."
    echo ""
    echo "Common solutions:"
    echo "1. Make sure PostgreSQL is running: sudo systemctl start postgresql"
    echo "2. Check if you need a password: sudo -u postgres psql"
    echo "3. Or try: psql -U postgres -h localhost"
    exit 1
fi

echo "📊 Creating MnemoPhi database and user..."

# Create database and user
$CONNECTION_STRING << EOF
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
psql -h localhost -p 5432 -U mnemophi -d mnemophi < backend/scripts/init-db.sql

echo "✅ Database schema initialized!"

# Ask if user wants to seed with sample data
read -p "Do you want to seed the database with sample data? (y/n): " SEED_DATA
if [[ $SEED_DATA =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database with sample data..."
    
    # Create seed data SQL
    cat > /tmp/seed-data.sql << 'EOF'
-- MnemoPhi Database Seed Data

-- Insert consent categories
INSERT INTO consent_categories (id, name, description, created_at) VALUES
('cat_001', 'marketing', 'Marketing communications and promotional content', NOW()),
('cat_002', 'analytics', 'Website analytics and usage tracking', NOW()),
('cat_003', 'personalization', 'Content personalization and recommendations', NOW()),
('cat_004', 'cookies', 'Cookie usage and tracking', NOW()),
('cat_005', 'newsletters', 'Email newsletters and updates', NOW()),
('cat_006', 'third_party', 'Third-party data sharing', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample clients
INSERT INTO clients (id, name, email, api_key, created_at) VALUES
('client_001', 'Acme Corporation', 'contact@acme.com', 'ak_1234567890abcdef', NOW()),
('client_002', 'TechStart Inc', 'privacy@techstart.com', 'ak_abcdef1234567890', NOW()),
('client_003', 'Global Retail Co', 'data@globalretail.com', 'ak_9876543210fedcba', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample users
INSERT INTO users (id, email, metadata, created_at) VALUES
('user_001', 'john.doe@example.com', '{"name": "John Doe", "age": 28, "location": "US"}', NOW()),
('user_002', 'jane.smith@example.com', '{"name": "Jane Smith", "age": 32, "location": "EU"}', NOW()),
('user_003', 'mike.wilson@example.com', '{"name": "Mike Wilson", "age": 25, "location": "CA"}', NOW()),
('user_004', 'sarah.jones@example.com', '{"name": "Sarah Jones", "age": 30, "location": "AU"}', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample consents
INSERT INTO consents (id, user_id, client_id, category, status, timestamp, created_at) VALUES
('consent_001', 'user_001', 'client_001', 'marketing', 'granted', NOW() - INTERVAL '1 day', NOW()),
('consent_002', 'user_001', 'client_001', 'analytics', 'granted', NOW() - INTERVAL '1 day', NOW()),
('consent_003', 'user_001', 'client_002', 'marketing', 'revoked', NOW() - INTERVAL '2 hours', NOW()),
('consent_004', 'user_002', 'client_001', 'marketing', 'granted', NOW() - INTERVAL '3 days', NOW()),
('consent_005', 'user_002', 'client_001', 'personalization', 'granted', NOW() - INTERVAL '3 days', NOW()),
('consent_006', 'user_002', 'client_003', 'cookies', 'granted', NOW() - INTERVAL '1 week', NOW()),
('consent_007', 'user_003', 'client_002', 'analytics', 'granted', NOW() - INTERVAL '5 days', NOW()),
('consent_008', 'user_004', 'client_003', 'newsletters', 'granted', NOW() - INTERVAL '2 days', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert compliance jurisdictions
INSERT INTO jurisdictions (id, name, code, description, created_at) VALUES
('jur_001', 'European Union', 'EU', 'GDPR - General Data Protection Regulation', NOW()),
('jur_002', 'United States - California', 'US-CA', 'CCPA/CPRA - California Consumer Privacy Act', NOW()),
('jur_003', 'Canada', 'CA', 'PIPEDA - Personal Information Protection and Electronic Documents Act', NOW()),
('jur_004', 'Brazil', 'BR', 'LGPD - Lei Geral de Proteção de Dados', NOW()),
('jur_005', 'United Kingdom', 'UK', 'UK GDPR - UK General Data Protection Regulation', NOW()),
('jur_006', 'Australia', 'AU', 'Privacy Act 1988', NOW()),
('jur_007', 'Singapore', 'SG', 'PDPA - Personal Data Protection Act', NOW()),
('jur_008', 'Japan', 'JP', 'APPI - Act on the Protection of Personal Information', NOW())
ON CONFLICT (id) DO NOTHING;

COMMIT;
EOF

    # Execute seed data
    psql -h localhost -p 5432 -U mnemophi -d mnemophi < /tmp/seed-data.sql
    rm /tmp/seed-data.sql
    echo "✅ Database seeded successfully!"
fi

echo ""
echo "✅ MnemoPhi database setup complete!"
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