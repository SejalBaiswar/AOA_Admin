import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { UsersService } from "./users/users.service";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Enable CORS for frontends (admin + others)
    app.enableCors({
      origin: [
        "http://localhost:5173", // original frontend
        "http://localhost:5175", // admin frontend
      ],
      credentials: true,
    });

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    const usersService = app.get(UsersService);
    await seedAdmin(usersService);

    await app.listen(5000);
    console.log("Application is running on: http://localhost:5000");
  } catch (error) {
    console.error("Error starting the application:", error);
    if (error.message?.includes("ECONNREFUSED")) {
      console.error(
        "\n❌ Database connection failed. Please check:",
        "\n   1. PostgreSQL is running",
        "\n   2. Database 'aoapro' exists",
        "\n   3. Connection credentials in .env are correct",
      );
    } else if (error.message?.includes("password authentication")) {
      console.error(
        "\n❌ Authentication failed. Please check your PostgreSQL username and password in .env",
      );
    } else if (error.message?.includes("does not exist")) {
      console.error(
        "\n❌ Database does not exist. Please create it:",
        "\n   CREATE DATABASE aoapro;",
      );
    }
    process.exit(1);
  }
}

async function seedAdmin(usersService: UsersService) {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn("⚠️ Admin credentials not found in env");
    return;
  }

  const existingAdmin = await usersService.findByEmail(email);

  if (existingAdmin) {
    console.log(" Admin already exists");
    return;
  }

  await usersService.createAdmin(email, password);
  console.log(" Admin user created successfully");
}
bootstrap();
