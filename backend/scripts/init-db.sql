-- mnemoPhi Database Schema
-- PostgreSQL 15+ required

-- Create database (run as superuser)
-- CREATE DATABASE mnemophi;
-- CREATE USER mnemophi WITH PASSWORD 'mnemophi_password';
-- GRANT ALL PRIVILEGES ON DATABASE mnemophi TO mnemophi;

-- Connect to mnemophi database
\c mnemophi;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Clients Table
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Consent Categories Table
CREATE TABLE consent_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Consents Table
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

-- 5. Dashboard Users Table (for admin access)
CREATE TABLE dashboard_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance indexes
CREATE INDEX idx_consents_user_id ON consents(user_id);
CREATE INDEX idx_consents_client_id ON consents(client_id);
CREATE INDEX idx_consents_category ON consents(category);
CREATE INDEX idx_consents_status ON consents(status);
CREATE INDEX idx_consents_timestamp ON consents(timestamp);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_clients_api_key ON clients(api_key);

-- Insert default consent categories
INSERT INTO consent_categories (category) VALUES 
    ('marketing'),
    ('analytics'),
    ('personalization'),
    ('cookies');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consents_updated_at BEFORE UPDATE ON consents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboard_users_updated_at BEFORE UPDATE ON dashboard_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions to mnemophi user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO mnemophi;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO mnemophi;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO mnemophi;