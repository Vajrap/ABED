# Port Configuration Guide

## 🌐 Port Assignments

### Backend Services

- **ABED Server**: `7890` (HTTP API)
- **PostgreSQL**: `40316` (John 3:16 reference!)
- **Loki**: `3100` (Logging)
- **Promtail**: `9080` (Log collector)
- **Grafana**: `3000` (Monitoring dashboard)

### Frontend Services

- **React Webapp**: `3016` (Development server - John 3:16!)

## 🔄 Communication Flow

```
Frontend (3016) → Backend (7890) → Database (40316)
                     ↓
                Logs (Loki 3100)
                     ↓
              Grafana Dashboard (3000)
```

## 🚀 Starting Services

### Backend Stack

```bash
cd MyProject/Server
docker-compose up postgres loki promtail grafana -d
bun run dev  # Starts on port 7890
```

### Frontend

```bash
cd MyProject/Client/webapp
bun run dev  # Starts on port 3016
```

## 🔗 Access URLs

### Development

- **Frontend**: http://localhost:3016
- **API**: http://localhost:7890
- **Database**: localhost:40316
- **Grafana**: http://localhost:3000 (monitoring dashboard)

### API Endpoints

- **Login**: POST http://localhost:7890/login
- **Register**: POST http://localhost:7890/regist
- **Health**: GET http://localhost:7890 (if implemented)

## 🛡️ CORS Configuration

Backend is configured to allow requests from:

- `http://localhost:3016` (Frontend dev server)
- `http://127.0.0.1:3016` (Alternative localhost)

### Environment Variables

```bash
CORS_ORIGINS=http://localhost:3016,http://127.0.0.1:3016
CORS_CREDENTIALS=true
CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_HEADERS=Content-Type,Authorization
```

## 🔧 Vite Proxy Configuration

Frontend proxies API calls to avoid CORS issues:

```typescript
// vite.config.ts
server: {
  port: 3016,
  proxy: {
    "/api": {
      target: "http://localhost:7890",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
}
```

Usage in frontend:

```typescript
// This request goes to http://localhost:7890/login
fetch('/api/login', { method: 'POST', ... })
```

## ⚠️ Port Conflicts

### Known Issues

1. **Port Conflicts Resolved**: Frontend now uses 3016, Grafana uses 3000
   - No conflicts between services
   - John 3:16 theme: Database (40316) + Frontend (3016)

2. **Production Deployment**: Ports may be different
   - Update CORS_ORIGINS environment variable
   - Update frontend API base URL

## 📊 Port Monitoring

Check which ports are in use:

```bash
# Check all ABED related ports
lsof -i :3016 -i :7890 -i :40316 -i :3100 -i :9080

# Check specific port
lsof -i :7890
```

## 🐳 Docker Port Mapping

```yaml
services:
  postgres:
    ports:
      - "40316:5432" # Host:Container

  loki:
    ports:
      - "3100:3100"

  grafana:
    ports:
      - "3000:3000" # Conflicts with frontend
```

## 🔒 Production Considerations

### Security

- Change default ports in production
- Use reverse proxy (nginx) for HTTPS
- Restrict CORS origins to production domains
- Use environment-specific configurations

### Scalability

- Use load balancers for multiple backend instances
- Consider port ranges for horizontal scaling
- Implement health checks on all ports

## 📝 Quick Reference

| Service  | Port  | Purpose       | Access                |
| -------- | ----- | ------------- | --------------------- |
| Frontend | 3016  | React App     | http://localhost:3016 |
| Backend  | 7890  | API Server    | http://localhost:7890 |
| Database | 40316 | PostgreSQL    | localhost:40316       |
| Loki     | 3100  | Log Storage   | http://localhost:3100 |
| Grafana  | 3000  | Monitoring    | http://localhost:3000 |
| Promtail | 9080  | Log Collector | Internal only         |

## 🎯 Testing Connectivity

```bash
# Test frontend
curl http://localhost:3016

# Test backend API
curl http://localhost:7890/login -X POST -H "Content-Type: application/json" -d '{"email":"test","password":"test"}'

# Test database
docker exec ABED_POSTGRES psql -U abed_user -d abed_db -c "SELECT 1;"

# Test Loki
curl http://localhost:3100/ready
```

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Kill process using port
lsof -ti:3016 | xargs kill -9

# Or find and kill manually
ps aux | grep node
kill <process_id>
```

### CORS Errors

1. Check backend CORS configuration
2. Verify frontend is making requests to correct port
3. Check browser developer tools for CORS errors
4. Ensure backend is running when frontend makes requests

### Database Connection Failed

1. Check if PostgreSQL container is running: `docker-compose ps`
2. Verify port 40316 is not blocked
3. Check environment variables in backend
4. Test direct database connection

Remember: Frontend (3016) → Backend (7890) → Database (40316) 🙏✨
John 3:16 theme: 40316 (DB) + 3016 (Frontend) = Divine Development! 🚀
