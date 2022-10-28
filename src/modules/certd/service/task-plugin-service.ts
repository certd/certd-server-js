import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../basic/base-service';
import { AccessEntity } from '../../pipeline/entity/access';

/**
 * 授权
 */
@Provide()
export class TaskPluginService extends BaseService<AccessEntity> {
  @InjectEntityModel(AccessEntity)
  repository: Repository<AccessEntity>;

  getRepository() {
    return this.repository;
  }
}
