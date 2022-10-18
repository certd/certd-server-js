import { Provide } from '@midwayjs/decorator';
import { accessProviderRegistry } from '@certd/api';
@Provide()
export class AccessProviderService {
  getAccessProviders() {
    return accessProviderRegistry.collection;
  }

  getByType(type) {
    return accessProviderRegistry.get(type);
  }
}
