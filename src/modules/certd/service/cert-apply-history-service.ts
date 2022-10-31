import { Provide } from "@midwayjs/decorator";
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Repository } from "typeorm";
import { BaseService } from "../../../basic/base-service";
import { CertApplyHistoryEntity } from "../entity/cert-apply-history";

/**
 * 证书申请历史记录
 */
@Provide()
export class CertApplyHistoryService extends BaseService<CertApplyHistoryEntity> {
  @InjectEntityModel(CertApplyHistoryEntity)
  repository: Repository<CertApplyHistoryEntity>;

  getRepository() {
    return this.repository;
  }
}



