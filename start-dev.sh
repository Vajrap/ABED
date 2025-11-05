#!/bin/bash

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[ABED]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}"
    echo "=================================="
    echo "      ABED Development Setup      "
    echo "=================================="
    echo -e "${NC}"
    echo "🏰 Medieval • ⚗️ Steampunk • ✨ Arcane"
    echo ""
}

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to wait for service to be ready
wait_for_service() {
    local service=$1
    local url=$2
    local max_attempts=30
    local attempt=1

    print_status "Waiting for $service to be ready..."

    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" >/dev/null 2>&1; then
            print_success "$service is ready!"
            return 0
        fi

        if [ $((attempt % 5)) -eq 0 ]; then
            print_status "Still waiting for $service... (attempt $attempt/$max_attempts)"
        fi

        sleep 2
        ((attempt++))
    done

    print_error "$service failed to start within expected time"
    return 1
}

# Main script starts here
print_header

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    print_error "Please run this script from the MyProject root directory"
    exit 1
fi

print_status "Checking port availability..."

# Check critical ports
if check_port 7890; then
    print_warning "Port 7890 (Backend) is already in use"
    read -p "Kill existing process? (y/N): " kill_backend
    if [[ $kill_backend =~ ^[Yy]$ ]]; then
        lsof -ti:7890 | xargs kill -9 2>/dev/null || true
        print_status "Killed processes on port 7890"
    fi
fi

if check_port 3016; then
    print_warning "Port 3016 (Frontend) is already in use"
    read -p "Kill existing process? (y/N): " kill_frontend
    if [[ $kill_frontend =~ ^[Yy]$ ]]; then
        lsof -ti:3016 | xargs kill -9 2>/dev/null || true
        print_status "Killed processes on port 3016"
    fi
fi

# Start backend services
print_status "Starting backend services with Docker..."
docker-compose up postgres loki promtail grafana -d

# Wait for PostgreSQL to be ready
print_status "Waiting for PostgreSQL to be ready..."
sleep 3

if ! docker exec ABED_POSTGRES pg_isready -U abed_user -d abed_db >/dev/null 2>&1; then
    print_warning "PostgreSQL is not ready yet, waiting longer..."
    sleep 5
fi

# Check database status
print_status "Checking database status..."
cd Server
if bun run db:status >/dev/null 2>&1; then
    print_success "Database is ready with tables"
else
    print_warning "Setting up database tables..."
    bun run db:setup
fi

# Start the backend server in background
print_status "Starting ABED backend server..."
bun run dev &
BACKEND_PID=$!

# Wait for backend to be ready
if wait_for_service "Backend API" "http://localhost:7890/login"; then
    print_success "Backend server is running on http://localhost:7890"
else
    print_error "Failed to start backend server"
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

# Move to frontend directory
cd ../Client/webapp

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    bun install
fi

# Start the frontend server in background
print_status "Starting frontend development server..."
bun run dev &
FRONTEND_PID=$!

# Wait for frontend to be ready
if wait_for_service "Frontend" "http://localhost:3016"; then
    print_success "Frontend server is running on http://localhost:3016"
else
    print_error "Failed to start frontend server"
    kill $FRONTEND_PID 2>/dev/null || true
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

# All services are ready
echo ""
print_success "🎉 All services are running!"
echo ""
echo -e "${GREEN}📊 Service Status:${NC}"
echo "  🎯 Frontend:  http://localhost:3016 (John 3:16!)"
echo "  🚀 Backend:   http://localhost:7890"
echo "  🗄️  Database:  localhost:40316 (John 3:16!)"
echo "  📈 Grafana:   http://localhost:3000"
echo "  📋 Loki:      http://localhost:3100"
echo ""
echo -e "${BLUE}🎮 Ready to develop ABED!${NC}"
echo "  • Login page with authentication"
echo "  • Register page with EULA"
echo "  • English/Thai localization (toggle bottom-right)"
echo "  • Music player (top-right corner)"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo "  • Watch logs: tail -f ../logs/game.log"
echo "  • Test API: curl http://localhost:7890/login"
echo "  • Database status: cd Server && bun run db:status"
echo ""
echo -e "${PURPLE}⚡ John 3:16 Theme: Database (40316) + Frontend (3016) = Divine Development!${NC}"
echo ""

# Keep script running and handle cleanup
cleanup() {
    echo ""
    print_status "Shutting down services..."
    kill $FRONTEND_PID 2>/dev/null || true
    kill $BACKEND_PID 2>/dev/null || true
    docker-compose down 2>/dev/null || true
    print_success "All services stopped"
    exit 0
}

# Trap cleanup on script exit
trap cleanup EXIT INT TERM

# Wait for user input to stop services
echo "Press Ctrl+C to stop all services..."
wait
