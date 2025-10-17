import { Controller, Get, Req } from "@nestjs/common";
import {
	HealthCheck,
	HealthCheckService,
	HttpHealthIndicator,
} from "@nestjs/terminus";
import type { Request } from "express";

@Controller("health")
export class HealthController {
	constructor(
		private readonly health: HealthCheckService,
		private readonly http: HttpHealthIndicator,
	) {}

	@Get()
	@HealthCheck()
	check(@Req() req: Request) {
		return this.health.check([
			() =>
				this.http.pingCheck(
					"self",
					`${req.protocol}://${req.headers.host}${req.baseUrl}`,
				),
		]);
	}
}
