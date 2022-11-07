import { Provide } from '@midwayjs/decorator';
import { dnsProviderRegistry } from '@certd/pipeline';
@Provide()
export class DnsProviderService {
  getList() {
    return dnsProviderRegistry.getDefineList();
  }
}
