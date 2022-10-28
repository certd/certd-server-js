import {
  ALL,
  Controller,
  Inject,
  Post,
  Provide,
  Query,
} from '@midwayjs/decorator';
import { BaseController } from '../../../basic/base-controller';
import { DnsProviderService } from '../service/dns-provider-service';

/**
 * 插件
 */
@Provide()
@Controller('/api/pi/dnsProvider')
export class DnsProviderController extends BaseController {
  @Inject()
  service: DnsProviderService;

  @Post('/list')
  async list(@Query(ALL) query) {
    query.userId = this.ctx.user.id;
    const list = this.service.getList();
    return this.ok(list);
  }
}
