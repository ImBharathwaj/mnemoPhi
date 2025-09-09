#!/bin/bash

# MnemoPhi Development Environment Startup Script

set -e

echo "🚀 Starting MnemoPhi Development Environment..."

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

# Note: PostgreSQL and Redis will be started in Docker containers
echo "🐳 Using Docker containers for PostgreSQL and Redis"

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p docker/ssl
mkdir -p logs

# Set up local domain names (optional)
echo "🌐 Setting up local domain names..."
if ! grep -q "mnemophi.local" /etc/hosts; then
    echo "127.0.0.1 dashboard.mnemophi.local user.mnemophi.local api.mnemophi.local" | sudo tee -a /etc/hosts
    echo "✅ Added local domain names to /etc/hosts"
else
    echo "ℹ️  Local domain names already configured"
fi

# Build and start services
echo "🔨 Building and starting services..."
cd docker
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo "🏥 Checking service health..."
docker-compose ps

echo ""
echo "✅ MnemoPhi Development Environment is ready!"
echo ""
echo "🌐 Services available at:"
echo "   📊 Dashboard:    http://dashboard.mnemophi.local (or http://localhost:3000)"
echo "   👤 User Page:    http://user.mnemophi.local (or http://localhost:3001)"
echo "   🔌 API:          http://api.mnemophi.local (or http://localhost:8080)"
echo "   🗄️  Database:     localhost:5433 (Docker PostgreSQL)"
echo "   🔴 Redis:        localhost:6380 (Docker Redis)"
echo ""
echo "📋 Useful commands:"
echo "   View logs:       docker-compose logs -f [service-name]"
echo "   Stop services:   docker-compose down"
echo "   Restart:         docker-compose restart [service-name]"
echo "   Shell access:    docker-compose exec [service-name] /bin/bash"
echo ""