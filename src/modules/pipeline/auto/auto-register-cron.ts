import { Scope, ScopeEnum, Autoload, Init, Inject } from '@midwayjs/decorator';
import { PipelineService } from '../service/pipeline-service';
import { logger } from '../../../utils/logger';
import '@certd/plugin-all';
@Autoload()
@Scope(ScopeEnum.Singleton)
export class AutoRegisterCron {
  @Inject()
  pipelineService: PipelineService;
  @Init()
  async init() {
    logger.info('加载定时trigger开始');
    await this.pipelineService.onStartup();
    logger.info('加载定时trigger完成');
  }
}
