-- MnemoPhi Database Initialization Script

-- Note: Database and user are created by Docker environment
-- This script assumes we're already connected to the mnemophi database

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients (Business accounts) table
CREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    api_key VARCHAR(255) UNIQUE NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consent categories table
CREATE TABLE IF NOT EXISTS consent_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consents table
CREATE TABLE IF NOT EXISTS consents (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    client_id VARCHAR(50) NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('granted', 'revoked', 'pending')),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, client_id, category)
);

-- Jurisdictions table (for global compliance)
CREATE TABLE IF NOT EXISTS jurisdictions (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jurisdiction-specific requirements
CREATE TABLE IF NOT EXISTS jurisdiction_requirements (
    id VARCHAR(50) PRIMARY KEY,
    jurisdiction_id VARCHAR(50) NOT NULL REFERENCES jurisdictions(id) ON DELETE CASCADE,
    category_id VARCHAR(50) NOT NULL REFERENCES consent_categories(id) ON DELETE CASCADE,
    consent_type VARCHAR(20) NOT NULL CHECK (consent_type IN ('explicit', 'opt_out', 'opt_in')),
    age_requirement INTEGER DEFAULT 16,
    additional_requirements JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(jurisdiction_id, category_id)
);

-- Audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    old_values JSONB,
    new_values JSONB,
    user_id VARCHAR(50),
    client_id VARCHAR(50),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_consents_user_id ON consents(user_id);
CREATE INDEX IF NOT EXISTS idx_consents_client_id ON consents(client_id);
CREATE INDEX IF NOT EXISTS idx_consents_category ON consents(category);
CREATE INDEX IF NOT EXISTS idx_consents_status ON consents(status);
CREATE INDEX IF NOT EXISTS idx_consents_timestamp ON consents(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

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

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (entity_type, entity_id, action, old_values)
        VALUES (TG_TABLE_NAME, OLD.id, TG_OP, row_to_json(OLD));
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (entity_type, entity_id, action, old_values, new_values)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (entity_type, entity_id, action, new_values)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(NEW));
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create audit triggers
CREATE TRIGGER audit_users_trigger AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_clients_trigger AFTER INSERT OR UPDATE OR DELETE ON clients
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_consents_trigger AFTER INSERT OR UPDATE OR DELETE ON consents
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO mnemophi;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO mnemophi;