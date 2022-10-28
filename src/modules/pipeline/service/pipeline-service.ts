import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../basic/base-service';
import { PipelineEntity } from '../entity/pipeline';
import { PipelineDetail } from '../entity/vo/pipeline-detail';
import { Executor, RunHistory } from '@certd/pipeline/src';
import { AccessService } from './access-service';
import { DbStorage } from './db-storage';
import { StorageService } from './storage-service';
import { Cron } from '../../../plugins/cron/cron';
import { HistoryService } from './history-service';
import { HistoryEntity } from '../entity/history';

/**
 * 证书申请
 */
@Provide()
export class PipelineService extends BaseService<PipelineEntity> {
  @InjectEntityModel(PipelineEntity)
  repository: Repository<PipelineEntity>;

  @Inject()
  accessService: AccessService;
  @Inject()
  storageService: StorageService;
  @Inject()
  historyService: HistoryService;

  @Inject()
  cron: Cron;

  getRepository() {
    return this.repository;
  }

  /**
   * 获取详情
   * @param id
   */
  async detail(id) {
    const pipeline = await this.info(id);
    return new PipelineDetail(pipeline);
  }

  async save(bean: PipelineEntity) {
    const pipeline = JSON.parse(bean.content);
    bean.title = pipeline.title;
    await this.addOrUpdate(bean);
  }

  async trigger(id) {
    this.cron.register({
      name: `pipeline.${id}.trigger.once`,
      cron: null,
      job: async () => {
        await this.run(id);
      },
    });
  }

  async run(id) {
    const entity: PipelineEntity = await this.info(id);
    const pipeline = JSON.parse(entity.content);
    const onChanged = async (history: RunHistory) => {
      //保存执行历史
      await this.saveHistory(history);
    };

    const userId = entity.userId;
    const historyId = await this.historyService.start(entity);

    const executor = new Executor({
      userId,
      pipeline,
      onChanged,
      accessService: this.accessService,
      storage: new DbStorage(userId, this.storageService),
    });

    await executor.run(historyId);
  }

  private async saveHistory(history: RunHistory) {
    const entity: HistoryEntity = new HistoryEntity();
    entity.id = history.id;
    const results = {};
    const logs = {};
    for (const id in history.status) {
      results[id] = history.status[id].result;
      logs[id] = history.status[id].logs;
    }
    entity.results = JSON.stringify(results);
    entity.logs = JSON.stringify(logs);
    await this.historyService.save(entity);
  }
}
