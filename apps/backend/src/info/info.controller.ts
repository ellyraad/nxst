import { Controller, Get } from "@nestjs/common";

@Controller("info")
export class InfoController {
	@Get()
	getInfo() {
		return {
			name: "NXST",
			description: "Ne(x|s)t project",
		};
	}
}
