# AOA Admin Portal Backend

NestJS backend for the AOA Admin Portal.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory with your PostgreSQL database configuration:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=aoapro
NODE_ENV=development
```

3. Make sure your PostgreSQL database `aoapro` exists and the `user` table is created (or let TypeORM create it with synchronize: true in development).

4. Run the application:
```bash
npm run start:dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Practices (Members)
- `POST /members` - Create a practice
- `GET /members` - Get all practices
- `GET /members/:id` - Get a practice by ID
- `PATCH /members/:id` - Update a practice
- `DELETE /members/:id` - Delete a practice

### Partners
- `POST /partners` - Create a partner
- `GET /partners` - Get all partners
- `GET /partners/:id` - Get a partner by ID
- `PATCH /partners/:id` - Update a partner
- `DELETE /partners/:id` - Delete a partner

## Database Schema

The `user` table contains:
- `id` (Primary Key)
- `firstName` (nullable)
- `middleName` (nullable)
- `lastName` (nullable)
- `email` (unique, required)
- `phoneNumber` (nullable)
- `gender` (nullable)
- `specialization` (nullable)
- `practitionerType` (nullable)
- `status` (enum: 'active' | 'inactive', default: 'active')
- `createdAt` (timestamp)
- `updatedAt` (timestamp)
