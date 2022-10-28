import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../basic/base-service';
import { HistoryEntity } from '../entity/history';
import { PipelineEntity } from '../entity/pipeline';
import { HistoryDetail } from '../entity/vo/history-detail';

/**
 * 证书申请
 */
@Provide()
export class HistoryService extends BaseService<HistoryEntity> {
  @InjectEntityModel(HistoryEntity)
  repository: Repository<HistoryEntity>;

  getRepository() {
    return this.repository;
  }

  async save(bean: HistoryEntity) {
    if (bean.id > 0) {
      await this.update(bean);
    } else {
      await this.add(bean);
    }
  }

  async detail(historyId: string) {
    const entity = await this.info(historyId);
    return new HistoryDetail(entity);
  }

  async start(pipeline: PipelineEntity) {
    const bean = {
      userId: pipeline.userId,
      pipelineId: pipeline.id,
      title: pipeline.title,
      status: 'start',
    };
    const { id } = await this.add(bean);
    return id;
  }
}
