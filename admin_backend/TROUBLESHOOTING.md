# Troubleshooting Guide

## Common Errors and Solutions

### 1. Database Connection Error

**Error**: `connect ECONNREFUSED` or `Connection refused`

**Solutions**:
- Make sure PostgreSQL is running
- Check if the port is correct (default: 5432)
- Verify the database `aoapro` exists:
  ```sql
  CREATE DATABASE aoapro;
  ```

### 2. Authentication Failed

**Error**: `password authentication failed for user`

**Solutions**:
- Verify your PostgreSQL username and password in `.env`
- Make sure the user has permissions to access the database

### 3. Module Not Found: 'pg'

**Error**: `Cannot find module 'pg'`

**Solution**:
```bash
cd backend
npm install
```

### 4. Database Does Not Exist

**Error**: `database "aoapro" does not exist`

**Solution**:
Connect to PostgreSQL and create the database:
```sql
CREATE DATABASE aoapro;
```

### 5. Entity Loading Issues

If you see entity-related errors, make sure:
- All entity files are in the correct location
- Entity decorators are properly imported from `typeorm`

## Testing Database Connection

You can test your PostgreSQL connection using psql:
```bash
psql -h localhost -p 5432 -U postgres -d aoapro
```

## Environment Variables

Make sure your `.env` file has no leading spaces and looks like this:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=aoapro
NODE_ENV=development
```
