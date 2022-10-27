import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../basic/base-service';
import { PipelineEntity } from '../entity/pipeline';
import { PipelineDetail } from '../entity/vo/pipeline-detail';
import { Executor, RunHistory } from '@certd/pipeline/src';
import { FileStorage } from '@certd/pipeline/src/core/storage';
import { AccessService } from '../../certd/service/access-service';

/**
 * 证书申请
 */
@Provide()
export class PipelineService extends BaseService<PipelineEntity> {
  @InjectEntityModel(PipelineEntity)
  repository: Repository<PipelineEntity>;

  @Inject()
  accessService: AccessService;

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

  async run(id) {
    const entity: PipelineEntity = await this.info(id);
    const pipeline = JSON.parse(entity.content);
    function onChanged(history: RunHistory) {
      console.log('changed:');
    }

    const executor = new Executor({
      userId: entity.userId,
      pipeline,
      onChanged,
      accessService: this.accessService,
      storage: new FileStorage(),
    });
    await executor.run();
    return executor.runtime;
  }
}
