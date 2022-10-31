const PluginAliyun = require('@certd/plugin-aliyun');
const PluginTencent = require('@certd/plugin-tencent');
const PluginHost = require('@certd/plugin-host');

// 安装默认插件和授权提供者
PluginAliyun.default.install();
PluginTencent.default.install();
PluginHost.default.install();
