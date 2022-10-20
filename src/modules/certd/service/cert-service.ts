import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../basic/base-service';
import { CertEntity } from '../entity/cert';
import { CertDetail } from '../entity/vo/cert-detail';

/**
 * 证书申请
 */
@Provide()
export class CertService extends BaseService<CertEntity> {
  @InjectEntityModel(CertEntity)
  repository: Repository<CertEntity>;

  getRepository() {
    return this.repository;
  }

  /**
   * 获取详情
   * @param id
   */
  async detail(id) {
    const cert = await this.info(id);
    return new CertDetail(cert);
  }
}
