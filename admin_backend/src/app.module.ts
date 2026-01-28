import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",

        host: configService.get<string>("DB_HOST"),
        port: Number(configService.get<number>("DB_PORT")),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),

        entities: [__dirname + "/**/*.entity{.ts,.js}"],

        // ✅ AUTO CREATE TABLES
        synchronize: true,

        logging: true,

        // ✅ REQUIRED FOR AWS RDS
        ssl: {
          rejectUnauthorized: false,
        },

        extra: {
          max: 10,
        },
      }),
    }),

    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
