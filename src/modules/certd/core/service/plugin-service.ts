import { Provide } from '@midwayjs/decorator';
import { pluginRegistry } from '@certd/api';
import _ from 'lodash';
@Provide()
export class PluginService {
  getList() {
    const collection = pluginRegistry.collection;
    const list = [];
    for (const key in collection) {
      list.push({ ...collection[key].define(), key });
    }
    return list;
  }
}
