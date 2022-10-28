import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../basic/base-service';
import { AccessEntity } from '../../pipeline/entity/access';
import { CertApplyHistoryEntity } from '../entity/cert-apply-history';

/**
 * 证书申请历史记录
 */
@Provide()
export class CertApplyHistoryService extends BaseService<CertApplyHistoryEntity> {
  @InjectEntityModel(AccessEntity)
  repository: Repository<AccessEntity>;

  getRepository() {
    return this.repository;
  }
}
