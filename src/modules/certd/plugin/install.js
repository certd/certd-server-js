const PluginAliyun = require('@certd/plugin-aliyun');
const PluginTencent = require('@certd/plugin-tencent');
const PluginHost = require('@certd/plugin-host');

console.log('PluginAliyun:', PluginAliyun);
// 安装默认插件和授权提供者
PluginAliyun.default.install();
PluginTencent.default.install();
PluginHost.default.install();
