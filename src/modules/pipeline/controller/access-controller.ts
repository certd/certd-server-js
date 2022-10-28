import {
  ALL,
  Body,
  Controller,
  Inject,
  Post,
  Provide,
  Query,
} from '@midwayjs/decorator';
import { CrudController } from '../../../basic/crud-controller';
import { AccessService } from '../service/access-service';
import { AccessProviderService } from '../../certd/core/service/access-provider-service';
import * as _ from 'lodash';
import { AccessTypeEnum } from '../enums/access-type-enum';
import { DnsProviderTypeEnum } from '../../certd/enums/dns-provider-type-enum';
/**
 * 授权
 */
@Provide()
@Controller('/api/certd/access')
export class AccessController extends CrudController {
  @Inject()
  service: AccessService;

  @Inject()
  accessProviderService: AccessProviderService;

  getService() {
    return this.service;
  }

  @Post('/page')
  async page(@Body(ALL) body) {
    body.query = body.query ?? {};
    body.query.userId = this.ctx.user.id;
    return super.page(body);
  }

  @Post('/list')
  async list(@Body(ALL) body) {
    body.userId = this.ctx.user.id;
    return super.list(body);
  }

  @Post('/add')
  async add(@Body(ALL) bean) {
    bean.userId = this.ctx.user.id;
    return super.add(bean);
  }

  @Post('/update')
  async update(@Body(ALL) bean) {
    await this.service.checkUserId(bean.id, this.ctx.user.id);
    return super.update(bean);
  }
  @Post('/info')
  async info(@Query('id') id) {
    await this.service.checkUserId(id, this.ctx.user.id);
    return super.info(id);
  }

  @Post('/delete')
  async delete(@Query('id') id) {
    await this.service.checkUserId(id, this.ctx.user.id);
    return super.delete(id);
  }
  @Post('/providers')
  async providers() {
    const providers = this.accessProviderService.getAccessProviders();
    const list = [];
    _.forEach(providers, item => {
      list.push(item.define);
    });
    return this.ok(list);
  }

  @Post('/define')
  async define(@Query('type') type) {
    const provider = this.accessProviderService.getByType(type);
    return this.ok(provider.define());
  }

  @Post('/dnsProviderTypeDict')
  async getDnsProviderTypeDict() {
    return this.ok(DnsProviderTypeEnum.names());
  }

  @Post('/accessTypeDict')
  async getAccessTypeDict() {
    return this.ok(AccessTypeEnum.names());
  }
}
