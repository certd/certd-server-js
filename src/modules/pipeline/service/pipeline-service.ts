import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../basic/base-service';
import { PipelineEntity } from '../entity/pipeline';
import { PipelineDetail } from '../entity/vo/pipeline-detail';

/**
 * 证书申请
 */
@Provide()
export class PipelineService extends BaseService<PipelineEntity> {
  @InjectEntityModel(PipelineEntity)
  repository: Repository<PipelineEntity>;

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
}
