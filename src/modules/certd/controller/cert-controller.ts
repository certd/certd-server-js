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
    return super.page(body);
  }

  @Post('/add')
  async add(@Body(ALL) bean: CertEntity) {
    bean.userId = this.ctx.user.id;
    return super.add(bean);
  }

  @Post('/update')
  async update(@Body(ALL) bean) {
    return super.update(bean);
  }
  @Post('/delete')
  async delete(@Query('id') id) {
    const bean: CertEntity = await this.service.info(id);
    if (bean == null || bean.userId !== this.ctx.user.id) {
      return;
    }
    return super.delete(id);
  }
}
