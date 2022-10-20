import { CertEntity } from '../cert';
import { DeployEntity } from '../deploy';
import { CertApplyHistoryEntity } from '../cert-apply-history';
import { ExecuteEntity } from '../execute';

export class CertDetail {
  constructor(cert: CertEntity) {
    this.cert = cert;
  }

  cert: CertEntity;
  deploy: DeployEntity[];
  last: CertApplyHistoryEntity;
  execute: ExecuteEntity[];
}
