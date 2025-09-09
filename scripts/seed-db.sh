#!/bin/bash

# MnemoPhi Database Seeding Script

set -e

echo "🌱 Seeding MnemoPhi Database..."

# Check if Docker PostgreSQL is running
if ! pg_isready -h localhost -p 5433 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running on localhost:5433. Please start the services first."
    echo "   Run: ./scripts/start-all.sh"
    exit 1
fi

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

-- Insert jurisdiction-specific consent requirements
INSERT INTO jurisdiction_requirements (id, jurisdiction_id, category_id, consent_type, age_requirement, created_at) VALUES
('req_001', 'jur_001', 'cat_001', 'explicit', 16, NOW()),
('req_002', 'jur_001', 'cat_002', 'explicit', 16, NOW()),
('req_003', 'jur_002', 'cat_001', 'opt_out', 16, NOW()),
('req_004', 'jur_002', 'cat_002', 'explicit', 16, NOW()),
('req_005', 'jur_003', 'cat_001', 'explicit', 18, NOW()),
('req_006', 'jur_004', 'cat_001', 'explicit', 18, NOW())
ON CONFLICT (id) DO NOTHING;

COMMIT;
EOF

# Execute seed data
echo "📊 Inserting seed data..."
psql -h localhost -p 5433 -U mnemophi -d mnemophi < /tmp/seed-data.sql

# Clean up
rm /tmp/seed-data.sql

echo "✅ Database seeded successfully!"
echo ""
echo "📋 Sample data includes:"
echo "   👥 4 sample users"
echo "   🏢 3 sample clients"
echo "   📝 8 consent records"
echo "   🌍 8 jurisdictions"
echo "   📋 6 consent categories"
echo "   ⚖️ 6 jurisdiction requirements"
echo ""
echo "🔑 Sample API Keys:"
echo "   Acme Corporation: ak_1234567890abcdef"
echo "   TechStart Inc: ak_abcdef1234567890"
echo "   Global Retail Co: ak_9876543210fedcba"