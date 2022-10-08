import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../basic/base-service';
import { TaskEntity } from '../entity/task';

/**
 * 授权
 */
@Provide()
export class TaskService extends BaseService<TaskEntity> {
  @InjectEntityModel(TaskEntity)
  repository: Repository<TaskEntity>;

  getRepository() {
    return this.repository;
  }
}
