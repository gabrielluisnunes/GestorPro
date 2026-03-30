import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ServicesService } from "./services.service";

@Injectable()
export class ServicesExpirationScheduler {
  private readonly logger = new Logger(ServicesExpirationScheduler.name);

  constructor(private readonly servicesService: ServicesService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async finalizeExpiredServices(): Promise<void> {
    const affected = await this.servicesService.finalizeExpiredServices();
    if (affected > 0) {
      this.logger.log(
        `Serviços finalizados automaticamente (data de término): ${affected}`,
      );
    }
  }
}
