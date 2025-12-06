# PostgreSQL Database Connection Info

## Connection Details

**From Host Machine (Your Mac):**
- **Host/Endpoint:** `localhost` (or `192.168.107.2`)
- **Port:** `40316`
- **Database:** `abed_db`
- **Username:** `abed_user`
- **Password:** `abed_password`

**From Inside Docker Network:**
- **Host/Endpoint:** `postgres` (service name) or `192.168.107.2` (container IP)
- **Port:** `5432`
- **Database:** `abed_db`
- **Username:** `abed_user`
- **Password:** `abed_password`

## Connection String Format

```
postgres://[username]:[password]@[host]:[port]/[database]
```

**Example for your setup:**
```
postgres://abed_user:abed_password@localhost:40316/abed_db
```

## GUI Tool Settings

When adding connection in TablePlus, pgAdmin, DBeaver, etc.:

| Field | Value |
|-------|-------|
| **Connection Type** | PostgreSQL |
| **Host/Server** | `localhost` |
| **Port** | `40316` |
| **Database** | `abed_db` |
| **Username** | `abed_user` |
| **Password** | `abed_password` |
| **SSL Mode** | `disable` (for local development) |

## Command Line Connection

```bash
# Using psql
psql postgres://abed_user:abed_password@localhost:40316/abed_db

# Or with separate flags
psql -h localhost -p 40316 -U abed_user -d abed_db
```

## Quick Test

Test if you can connect:
```bash
psql postgres://abed_user:abed_password@localhost:40316/abed_db -c "SELECT version();"
```

