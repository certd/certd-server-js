import { Provide } from '@midwayjs/decorator';
import { dnsProviderRegistry } from '@certd/pipeline/src';
@Provide()
export class DnsProviderService {
  getList() {
    return dnsProviderRegistry.getDefineList();
  }
}
