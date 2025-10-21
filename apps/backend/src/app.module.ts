import KeyvRedis from "@keyv/redis";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HttpCacheInterceptor } from "./common/http-cache.interceptor";
import configuration from "./configuration";
import { HealthModule } from "./health/health.module";
import { InfoController } from "./info/info.controller";

@Module({
	imports: [
		CacheModule.registerAsync({
			useFactory: async () => {
				return {
					stores: [
						new KeyvRedis(process.env.REDIS_URL ?? "redis://127.0.0.1:6379"),
					],
				};
			},
		}),
		ConfigModule.forRoot({
			load: [configuration],
		}),
		HealthModule,
	],
	controllers: [AppController, InfoController],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: HttpCacheInterceptor,
		},
	],
})
export class AppModule {}
