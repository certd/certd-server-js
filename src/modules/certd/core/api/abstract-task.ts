import fs from 'fs';
import logger from '../utils/util.log.js';
import dayjs from 'dayjs';
import Sleep from '../utils/util.sleep.js';
export class AbstractPlugin {
  logger;
  accessService;
  constructor(options) {
    if (options == null) {
      throw new Error('插件安装失败：参数不允许为空');
    }
    const { logger, accessService } = options;
    this.logger = logger;
    this.accessService = accessService;
  }

  appendTimeSuffix(name) {
    if (name == null) {
      name = 'certd';
    }
    return name + '-' + dayjs().format('YYYYMMDD-HHmmss');
  }

  async executeFromContextFile(options: any = {}) {
    const { contextPath } = options;
    const contextJson = fs.readFileSync(contextPath);
    const context = JSON.parse(contextJson);
    options.context = context;
    await this.doExecute(options);
    fs.writeFileSync(JSON.stringify(context));
  }

  async doExecute(options) {
    try {
      return await this.execute(options);
    } catch (e) {
      logger.error('插件执行出错：', e);
      throw e;
    }
  }

  /**
   * 执行
   * @param options
   * @returns {Promise<void>}
   */
  async execute(options) {
    console.error('请实现此方法,context:', options.context);
  }

  async doRollback(options) {
    try {
      return await this.rollback(options);
    } catch (e) {
      logger.error('插件rollback出错：', e);
      throw e;
    }
  }

  /**
   * 回退，用于单元测试
   * @param options
   */
  async rollback(options) {
    console.error('请实现此方法,rollback:', options.context);
  }

  async getAccess(accessId) {
    const record = await this.accessService.getById(accessId);
    return JSON.parse(record.setting);
  }

  async sleep(time) {
    await Sleep(time);
  }
}
