import { ApiHandler } from '../../shared/api.interfaces';
import { ConfigService } from './../services/config/config.service';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

const configService: ConfigService = new ConfigService(process.env);
const service: HealthService = new HealthService(configService);
const controller: HealthController = new HealthController(service);

export const getHealthCheck: ApiHandler = controller.getHealthCheck;
export const getHealthCheckDetailed: ApiHandler = controller.getHealthCheckDetailed;
