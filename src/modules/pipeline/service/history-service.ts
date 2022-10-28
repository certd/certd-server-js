import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../basic/base-service';
import { HistoryEntity } from '../entity/history';
import { PipelineEntity } from '../entity/pipeline';

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

  async detail(id) {}

  async start(pipeline: PipelineEntity) {
    const bean = {
      userId: pipeline.userId,
      pipelineId: pipeline.id,
      title: pipeline.title,
      status: 'start',
    };
    await this.add(bean);
  }
}
