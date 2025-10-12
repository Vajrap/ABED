# Database Setup and Usage

This document describes the PostgreSQL database setup for the ABED Server project using Drizzle ORM.

## Database Configuration

### Connection Details
- **Database**: PostgreSQL 15
- **Port**: 40316 (from John 3:16! 🙏)
- **Database Name**: abed_db
- **Username**: abed_user
- **Password**: abed_password

### Environment Variables
Copy `.env.example` to `.env` and configure:
```bash
DATABASE_URL=postgres://abed_user:abed_password@localhost:40316/abed_db
DB_HOST=localhost
DB_PORT=40316
DB_NAME=abed_db
DB_USER=abed_user
DB_PASSWORD=abed_password
```

## Getting Started

### 1. Start the Database
```bash
# From project root
docker-compose up postgres -d
```

### 2. Install Dependencies
```bash
# From Server directory
bun install
```

### 3. Run Migrations
```bash
# Generate migrations from schema changes
bun run db:generate

# Run migrations to create tables
bun run db:migrate:run
```

### 4. Test Database Connection
```bash
bun run db:test
```

## Database Schema

### Users Table
The primary user entity with the following structure:

```typescript
type User = {
  id: string;           // UUID primary key
  password: string;     // User password (TODO: hash with bcrypt)
  email: string;        // Unique email address
  characterId: string;  // Game character identifier
  lastNewsReceived: string; // Last news item received

  // Audit fields
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
};
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run db:generate` | Generate migrations from schema changes |
| `bun run db:migrate` | Interactive migration push (drizzle-kit) |
| `bun run db:migrate:run` | Run migrations automatically |
| `bun run db:test` | Test database connection and operations |
| `bun run db:studio` | Open Drizzle Studio for database inspection |
| `bun run db:drop` | Drop database tables (use with caution!) |

## User Service Operations

The `UserService` class provides the following operations:

### Create Operations
- `UserService.createUser(userData)` - Create a new user

### Read Operations
- `UserService.getUserById(id)` - Get user by ID
- `UserService.getUserByEmail(email)` - Get user by email
- `UserService.getUserByCharacterId(characterId)` - Get user by character ID
- `UserService.getAllUsers(limit?, offset?)` - Get all users with pagination
- `UserService.getUserCount()` - Get total user count

### Update Operations
- `UserService.updateUser(id, userData, updatedBy)` - Update user
- `UserService.updateUserPassword(id, newPassword, updatedBy)` - Update password
- `UserService.updateLastNewsReceived(id, lastNews, updatedBy)` - Update last news

### Delete Operations
- `UserService.deleteUser(id)` - Delete user by ID

### Validation Operations
- `UserService.userExistsByEmail(email)` - Check if user exists by email
- `UserService.userExistsByCharacterId(characterId)` - Check if character ID exists

## Validation Schemas

The following Zod schemas are available for request validation:

- `CreateUserSchema` - For user registration
- `UpdateUserSchema` - For user updates
- `UserLoginSchema` - For user login

## Database Structure

```
src/Database/
├── connection.ts           # Database connection and pool management
├── init.ts                 # Database initialization and shutdown
├── migrations/            # Generated migration files
├── Schema/
│   ├── index.ts           # Schema exports
│   └── user.ts           # User table schema
└── Services/
    └── userService.ts     # User CRUD operations
```

## Development Workflow

1. **Schema Changes**: Modify schema files in `src/Database/Schema/`
2. **Generate Migration**: Run `bun run db:generate`
3. **Apply Migration**: Run `bun run db:migrate:run`
4. **Test Changes**: Run `bun run db:test`

## Production Considerations

### Security
- [ ] Implement password hashing with bcrypt
- [ ] Use environment-specific database credentials
- [ ] Enable SSL for database connections
- [ ] Implement proper session management

### Performance
- [ ] Add database indexes for frequently queried fields
- [ ] Implement connection pooling optimization
- [ ] Add query performance monitoring

### Monitoring
- [ ] Set up database health checks
- [ ] Implement logging for database operations
- [ ] Add metrics collection

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Ensure PostgreSQL container is running: `docker ps`
   - Check port 40316 is not in use: `lsof -i :40316`
   - Verify environment variables are set correctly

2. **Migration Issues**
   - Ensure database is running before migrations
   - Check migration files in `src/Database/migrations/`
   - Run `bun run db:test` to verify connection

3. **Import Errors**
   - Ensure all imports use relative paths without `.js` extension
   - Check TypeScript configuration in `tsconfig.json`

### Database Access

Access the database directly using:
```bash
# Using psql
psql postgres://abed_user:abed_password@localhost:40316/abed_db

# Or using Docker
docker exec -it ABED_POSTGRES psql -U abed_user -d abed_db
```

### Drizzle Studio

Launch the database browser:
```bash
bun run db:studio
```
Then open http://localhost:4983 to inspect your database.

## Next Steps

- [ ] Implement JWT authentication
- [ ] Add password hashing/verification
- [ ] Create additional entity schemas as needed
- [ ] Set up database backups for production
- [ ] Add database seeding scripts
