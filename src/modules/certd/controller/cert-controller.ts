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
import { CertService } from '../service/cert-service';
import { CertEntity } from '../entity/cert';

/**
 * 证书
 */
@Provide()
@Controller('/api/certd/cert')
export class CertController extends CrudController {
  @Inject()
  service: CertService;

  getService() {
    return this.service;
  }

  @Post('/page')
  async page(@Body(ALL) body) {
    body.query.userId = this.ctx.user.id;
    return super.page(body);
  }

  @Post('/add')
  async add(@Body(ALL) bean: CertEntity) {
    bean.userId = this.ctx.user.id;
    return super.add(bean);
  }

  @Post('/update')
  async update(@Body(ALL) bean) {
    await this.service.checkUserId(bean.id, this.ctx.user.id);
    return super.update(bean);
  }
  @Post('/delete')
  async delete(@Query('id') id) {
    await this.service.checkUserId(id, this.ctx.user.id);
    return super.delete(id);
  }

  @Post('/detail')
  async info(@Query('id') id) {
    await this.service.checkUserId(id, this.ctx.user.id);
    const detail = await this.service.detail(id);
    return this.ok(detail);
  }
}
