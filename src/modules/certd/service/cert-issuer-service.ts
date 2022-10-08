import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../basic/base-service';
import { CertIssuerEntity } from '../entity/cert-issuer';

/**
 * cert provider
 */
@Provide()
export class CertIssuerService extends BaseService<CertIssuerEntity> {
  @InjectEntityModel(CertIssuerEntity)
  repository: Repository<CertIssuerEntity>;

  getRepository() {
    return this.repository;
  }
}
