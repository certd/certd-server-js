import { Provide } from '@midwayjs/decorator';
import { pluginRegistry } from '@certd/pipeline';
@Provide()
export class PluginService {
  getList() {
    const collection = pluginRegistry.storage;
    const list = [];
    for (const key in collection) {
      const PluginClass = collection[key];
      // @ts-ignore
      const plugin = new PluginClass();
      list.push({ ...plugin.define, key });
    }
    return list;
  }
}
