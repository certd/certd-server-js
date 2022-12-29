import { Provide, Scope, ScopeEnum } from "@midwayjs/decorator";
import { dnsProviderRegistry } from '@certd/pipeline';
@Provide()
@Scope(ScopeEnum.Singleton)
export class DnsProviderService {
  getList() {
    return dnsProviderRegistry.getDefineList();
  }
}
