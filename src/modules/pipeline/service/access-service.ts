import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../basic/base-service';
import { AccessEntity } from '../entity/access';
import {
  AbstractAccess,
  accessRegistry,
  IAccessService,
} from '@certd/pipeline';

/**
 * 授权
 */
@Provide()
export class AccessService
  extends BaseService<AccessEntity>
  implements IAccessService
{
  @InjectEntityModel(AccessEntity)
  repository: Repository<AccessEntity>;

  getRepository() {
    return this.repository;
  }

  async getById(id: any): Promise<AbstractAccess> {
    const entity = await this.info(id);
    // const access = accessRegistry.get(entity.type);
    const setting = JSON.parse(entity.setting);
    return {
      id: entity.id,
      ...setting,
    } as AbstractAccess;
  }

  getDefineList() {
    return accessRegistry.getDefineList();
  }

  getDefineByType(type) {
    return accessRegistry.getDefine(type);
  }
}
