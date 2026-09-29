/**
 * mihomo 配置覆写脚本（精简版）
 *
 * 以目标 YAML 为唯一配置基准：
 * - 只保留目标 YAML 中实际存在的服务、规则集、策略组和功能
 * - 删除原脚本中未在目标 YAML 使用的：手动选择、负载均衡、倍率组、自建节点、链式代理、IP 优先、极简模式等
 * - 保留“机场订阅节点动态输入”的能力，策略组结构按目标 YAML 动态生成
 */

const ruleSetBaseUrl = 'https://fastly.jsdelivr.net/gh/appshubcc/bett-rules@meta/geo/';

// 定义全局排除节点的正则表达式，用于排除非地区节点
const excludeFilter =
  /群|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|电报|无法|说明|使用|提示|访问|支持|教程|关注|更新|作者|加入|超时|收藏|优惠|福利|邀请|好友|失联|选择|剩余|公益|发布|DIZTNA|通路|登录|禁止|定时|渠道|牢记|永久|余额|阁下|本站|刷新|导航|建议|重置|以下|过滤|⚠️|@|t\.me\/\+|\bexpire\b|\bhttps?:\/\/|\.com|\btraffic\b/iu;

// Mihomo 的 exclude-filter 字段必须是字符串，不能直接传 RegExp 对象。
// 保留上面的 JS RegExp，同时转换成 Mihomo 可接受的字符串形式，并保留不区分大小写。
const excludeFilterMihomo = `(?i)${excludeFilter.source}`;

// 屏蔽国外QUIC
const blockForeignQuic = [
  'AND,((NETWORK,UDP),(DST-PORT,443),(NOT,((OR,((RULE-SET,cn_additional),(RULE-SET,cn_ip,no-resolve)))))),REJECT',
];

const directProxies = [
  { name: '🇨🇳 直连 | 双栈', type: 'direct' },
  { name: '🇨🇳 直连 | IPv4优先', type: 'direct', 'ip-version': 'ipv4-prefer' },
  { name: '🇨🇳 直连 | IPv6优先', type: 'direct', 'ip-version': 'ipv6-prefer' },
  { name: '🇨🇳 直连 | 仅IPv4', type: 'direct', 'ip-version': 'ipv4' },
  { name: '🇨🇳 直连 | 仅IPv6', type: 'direct', 'ip-version': 'ipv6' },
];

const regionDefinitions = [
  {
    name: '香港',
    filter: '(?i)(🇭🇰|香港|(?<![A-Za-z])HKG?(?![A-Za-z])|hong\\\\s*kong)',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Hong_Kong.png',
  },
  {
    name: '日本',
    filter: '(?i)(🇯🇵|日本|东京|大阪|京都|(?<![A-Za-z])JPN?(?![A-Za-z])|japan)',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Japan.png',
  },
  {
    name: '台湾',
    filter: '(?i)(🇹🇼|台湾|台北|高雄|(?<![A-Za-z])TWN?(?![A-Za-z])|taiwan)',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Taiwan.png',
  },
  {
    name: '新加坡',
    filter: '(?i)(🇸🇬|新加坡|狮城|(?<![A-Za-z])SGP?(?![A-Za-z])|singapore)',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Singapore.png',
  },
  {
    name: '美国',
    filter: '(?i)(🇺🇸|美国|纽约|洛杉矶|旧金山|芝加哥|休斯顿|迈阿密|西雅图|波士顿|华盛顿|拉斯维加斯|圣何塞|圣地亚哥|(?<![A-Za-z])USA?(?![A-Za-z])|america|united\\\\s*states)',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/United_States.png',
  },
];

const otherFilter = "(?i)(🇭🇰|香港|(?<![A-Za-z])HKG?(?![A-Za-z])|hong\\s*kong|🇯🇵|日本|东京|大阪|京都|(?<![A-Za-z])JPN?(?![A-Za-z])|japan|🇺🇸|美国|纽约|洛杉矶|旧金山|芝加哥|休斯顿|迈阿密|西雅图|波士顿|华盛顿|拉斯维加斯|圣何塞|圣地亚哥|(?<![A-Za-z])USA?(?![A-Za-z])|america|united\\s*states|🇸🇬|新加坡|狮城|(?<![A-Za-z])SGP?(?![A-Za-z])|singapore|🇹🇼|台湾|台北|高雄|(?<![A-Za-z])TWN?(?![A-Za-z])|taiwan)";

const groupCommonSelect = {
  type: 'select',
  interval: 600,
  timeout: 3000,
  'max-failed-times': 3,
  'empty-fallback': 'REJECT',
  url: 'https://www.apple.com/library/test/success.html',
  lazy: true,
};

const groupCommonAuto = {
  type: 'url-test',
  interval: 600,
  timeout: 3000,
  'max-failed-times': 3,
  'empty-fallback': 'REJECT',
  url: 'https://www.apple.com/library/test/success.html',
  lazy: true,
  tolerance: 50,
  'include-all': true,
  'exclude-type': 'DIRECT',
  icon: 'https://fastly.jsdelivr.net/gh/AIsouler/MyClash@main/Icons/svg/Auto.svg',
  hidden: true,
};

const ruleProviderCommonDomain = {
  type: 'http', interval: 86400, behavior: 'domain', format: 'mrs',
};
const ruleProviderCommonIpcidr = {
  type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs',
};

const baseRuleProviders = {
  private: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/private.mrs`, path: './ruleset/private.mrs', 'path-in-bundle': 'geo/geosite/private.mrs' },
  private_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/private.mrs`, path: './ruleset/private.mrs', 'path-in-bundle': 'geo/geoip/private.mrs' },
  'geolocation-cn': { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/geolocation-cn.mrs`, path: './ruleset/geolocation-cn.mrs', 'path-in-bundle': 'geo/geosite/geolocation-cn.mrs' },
  cn: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/cn.mrs`, path: './ruleset/cn.mrs', 'path-in-bundle': 'geo/geosite/cn.mrs' },
  cn_additional: { ...ruleProviderCommonDomain, url: 'https://static-file-global.353355.xyz/rules/cn-additional-list.mrs', path: './ruleset/cn-additional-list.mrs', 'path-in-bundle': 'geo/geosite/cn.mrs' },
  cn_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/cn.mrs`, path: './ruleset/cn.mrs', 'path-in-bundle': 'geo/geoip/cn.mrs' },
  'geolocation-!cn': { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/geolocation-!cn.mrs`, path: './ruleset/geolocation-!cn.mrs', 'path-in-bundle': 'geo/geosite/geolocation-!cn.mrs' },
  fakeip_filter: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/fakeip-filter.mrs`, path: './ruleset/fakeip-filter.mrs', 'path-in-bundle': 'geo/geosite/fakeip-filter.mrs' },
};

const serviceConfigs = [
{
    name: 'Google',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Google_Suite/Google.png',
    providers: {
      google: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/google.mrs`, path: './ruleset/google.mrs', 'path-in-bundle': 'geo/geosite/google.mrs' },
      google_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/google.mrs`, path: './ruleset/google.mrs', 'path-in-bundle': 'geo/geoip/google.mrs' },
    },
  },
{
    name: 'Twitter',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Twitter.png',
    providers: {
      twitter: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/twitter.mrs`, path: './ruleset/twitter.mrs', 'path-in-bundle': 'geo/geosite/twitter.mrs' },
      twitter_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/twitter.mrs`, path: './ruleset/twitter.mrs', 'path-in-bundle': 'geo/geoip/twitter.mrs' },
    },
  },
{
    name: 'Telegram',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Telegram.png',
    providers: {
      telegram: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/telegram.mrs`, path: './ruleset/telegram.mrs', 'path-in-bundle': 'geo/geosite/telegram.mrs' },
      telegram_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/telegram.mrs`, path: './ruleset/telegram.mrs', 'path-in-bundle': 'geo/geoip/telegram.mrs' },
    },
  },
{
    name: 'Instagram',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Instagram.png',
    providers: { meta: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/meta.mrs`, path: './ruleset/meta.mrs', 'path-in-bundle': 'geo/geosite/meta.mrs' } },
  },
{
    name: 'YouTube',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/YouTube.png',
    providers: { youtube: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/youtube.mrs`, path: './ruleset/youtube.mrs', 'path-in-bundle': 'geo/geosite/youtube.mrs' } },
  },
{
    name: 'TikTok', defaultSelected: '日本', icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/TikTok.png',
    providers: {
      tiktok: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/tiktok.mrs`, path: './ruleset/tiktok.mrs', 'path-in-bundle': 'geo/geosite/tiktok.mrs' },
      tiktok_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/tiktok.mrs`, path: './ruleset/tiktok.mrs', 'path-in-bundle': 'geo/geoip/tiktok.mrs' },
    },
  },
{
    name: 'AI', defaultSelected: '美国', icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Air_Bnb.png',
    providers: { ai: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/category-ai-!cn.mrs`, path: './ruleset/ai.mrs', 'path-in-bundle': 'geo/geosite/category-ai-!cn.mrs' } },
  },
{
    name: 'Ehentai', defaultSelected: '美国', icon: 'https://raw.githubusercontent.com/musiyun124/mihomo/refs/heads/main/icon2/E-hentai.png',
    providers: { ehentai: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/ehentai.mrs`, path: './ruleset/ehentai.mrs', 'path-in-bundle': 'geo/geosite/ehentai.mrs' } },
  },
{
    name: 'Fcm',
    proxies: ['直连'],
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Foursquare.png',
    providers: { fcm: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/googlefcm.mrs`, path: './ruleset/googlefcm.mrs', 'path-in-bundle': 'geo/geosite/googlefcm.mrs' } },
  },
{
    name: '广告拦截', reject: true, icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Advertising.png',
    providers: { adblockmihomolite: { ...ruleProviderCommonDomain, url: 'https://fastly.jsdelivr.net/gh/217heidai/adblockfilters@main/rules/adblockmihomolite.mrs', path: './ruleset/adblockmihomolite.mrs', 'path-in-bundle': 'geo/geosite/category-ads-all.mrs' } },
  }
];

function buildRegionGroups() {
  const groups = [];
  for (const region of regionDefinitions) {
    groups.push({
      ...groupCommonSelect,
      name: region.name,
      filter: region.filter,
      'exclude-filter': excludeFilterMihomo,
      'include-all': true,
      'exclude-type': 'direct',
      proxies: [`${region.name}-自动选择`],
      icon: region.icon,
    });
    groups.push({
      ...groupCommonAuto,
      name: `${region.name}-自动选择`,
      filter: region.filter,
      'exclude-filter': excludeFilterMihomo,
    });
  }

  groups.push({
    ...groupCommonSelect,
    name: '其它地区',
    'exclude-filter': otherFilter,
    'include-all': true,
    'exclude-type': 'direct',
    proxies: ['其它地区-自动选择'],
    icon: 'https://fastly.jsdelivr.net/gh/AIsouler/MyClash@main/Icons/svg/WorldMap.svg',
  });
  groups.push({
    ...groupCommonAuto,
    name: '其它地区-自动选择',
    'exclude-filter': otherFilter,
  });

  return groups;
}

function buildFunctionalGroups() {
  const serviceProxyNames = ['默认', '香港', '台湾', '日本', '新加坡', '美国', '其它地区', '自动选择', '全部节点'];
  const groups = [
    {
      ...groupCommonSelect,
      name: '默认',
      proxies: ['自动选择', '香港', '台湾', '日本', '新加坡', '美国', '其它地区', '全部节点'],
      icon: 'https://cdn.jsdelivr.net/gh/GitMetaio/Surfing@rm/Home/icon/All.svg',
    },
  ];

  for (const svc of serviceConfigs) {
    groups.push({
      ...groupCommonSelect,
      name: svc.name,
      proxies: svc.proxies || serviceProxyNames,
      ...(svc.defaultSelected ? { 'default-selected': svc.defaultSelected } : {}),
      ...(svc.reject ? { proxies: ['REJECT', 'REJECT-DROP', 'PASS'] } : {}),
      icon: svc.icon,
    });
  }

  groups.push({
    ...groupCommonSelect,
    name: '直连',
    proxies: directProxies.map((p) => p.name),
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/China.png',
  });

  groups.push(...buildRegionGroups());

  groups.push({
    ...groupCommonSelect,
    name: '全部节点',
    'include-all': true,
    'exclude-type': 'direct',
    icon: 'https://raw.githubusercontent.com/GitMetaio/Surfing/refs/heads/rm/Home/icon/Globe.svg',
  });

  groups.push({
    ...groupCommonAuto,
    name: '自动选择',
    icon: 'https://cdn.jsdelivr.net/gh/GitMetaio/Surfing@rm/Home/icon/Return.svg',
  });

  return groups;
}

function buildRuleProviders() {
  const providers = { ...baseRuleProviders };
  for (const svc of serviceConfigs) Object.assign(providers, svc.providers);
  return providers;
}


function filterProxies(config) {
  const proxies = (config.proxies || []).filter((proxy) => {
    const type = String(proxy.type || '').toLowerCase();
    return type !== 'direct' && type !== 'reject' && type !== 'rematch';
  });
  if (!proxies.length) throw new Error('配置文件中未找到任何代理节点，请使用机场提供的配置文件进行覆写');
  return proxies;
}

function main(config) {
  if (config['proxy-providers'] && Object.keys(config['proxy-providers']).length > 0) {
    throw new Error('配置文件中包含 proxy-providers，请使用机场提供的配置文件进行覆写');
  }

  const proxies = filterProxies(config);
  const chinaDNS = ['223.5.5.5#DIRECT', '119.29.29.29#DIRECT'];
  const defaultDNS = ['114.114.114.114#DIRECT', 'tls://223.5.5.5#DIRECT', 'https://1.12.12.12/dns-query#DIRECT'];
  const proxyServerDNS = ['114.114.114.114#DIRECT', 'tls://223.5.5.5#DIRECT', 'https://doh.pub/dns-query#DIRECT'];
  const foreignDNS = ['https://cloudflare-dns.com/dns-query#默认', 'https://dns.google/dns-query#默认'];

  return {
    'mixed-port': 7890,
    'allow-lan': false,
    'bind-address': '127.0.0.1',
    ipv6: true,
    'unified-delay': true,
    'tcp-concurrent': true,
    'client-fingerprint': 'chrome',
    'find-process-mode': 'off',
    'keep-alive-idle': 600,
    'keep-alive-interval': 60,
    'external-controller': '127.0.0.1:9090',
    'external-ui': 'ui',
    'external-ui-url': 'https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip',
    profile: { 'store-selected': true, 'store-fake-ip': true },
    dns: {
      enable: true,
      ipv6: true,
      'cache-algorithm': 'arc',
      'enhanced-mode': 'fake-ip',
      'use-hosts': true,
      'use-system-hosts': false,
      'Fake-ip-range': '198.18.0.1/15',
      'fake-ip-range6': 'fc00::1/64',
      'fake-ip-filter': ['rule-set:private', 'rule-set:fakeip_filter', 'rule-set:cn', 'rule-set:geolocation-cn', 'rule-set:fcm'],
      'default-nameserver': defaultDNS,
      'proxy-server-nameserver': proxyServerDNS,
      'nameserver-policy': {
        'rule-set:private': 'system',
        'rule-set:cn,geolocation-cn': chinaDNS,
      },
      nameserver: foreignDNS,
      'direct-nameserver': chinaDNS,
      'direct-nameserver-follow-policy': true,
    },
    hosts: {
      'dns.alidns.com': ['223.5.5.5', '223.6.6.6'],
      'doh.pub': ['1.12.12.12', '120.53.53.53'],
      'dns.cloudflare.com': ['1.1.1.1', '1.0.0.1'],
      'dns.google': ['8.8.8.8', '8.8.4.4'],
      'services.googleapis.cn': 'services.googleapis.com',
    },
    ntp: { enable: true, 'write-to-system': false, server: 'ntp.aliyun.com', port: 123, interval: 60 },
    tun: {
      enable: true,
      stack: 'mips',
      mtu: 9000,
      'auto-route': true,
      'auto-redirect': true,
      'auto-detect-interface': true,
      'strict-route': true,
      'dns-hijack': ['udp://any:53', 'tcp://any:53'],
    },
    sniffer: {
      enable: true,
      'force-dns-mapping': true,
      'parse-pure-ip': true,
      'override-destination': true,
      sniff: {
        HTTP: { ports: [80, '8080-8880'] },
        TLS: { ports: [443, 8443] },
        QUIC: { ports: [443, 8443] },
      },
      'skip-domain': ['223.5.5.5/32', '119.29.29.29/32'],
      'skip-dst-address': ['rule-set:telegram_ip'],
    },
    proxies: [...proxies, ...directProxies],
    'proxy-groups': buildFunctionalGroups(),
    rules: [
      'RULE-SET,private,DIRECT',
      'RULE-SET,private_ip,直连,no-resolve',
      ...blockForeignQuic,
      'RULE-SET,adblockmihomolite,广告拦截',
      'RULE-SET,fcm,Fcm',
      'RULE-SET,ai,AI',
      'RULE-SET,ehentai,Ehentai',
      'RULE-SET,tiktok,TikTok',
      'RULE-SET,youtube,YouTube',
      'RULE-SET,telegram,Telegram',
      'RULE-SET,twitter,Twitter',
      'RULE-SET,meta,Instagram',
      'RULE-SET,google,Google',
      'RULE-SET,telegram_ip,Telegram,no-resolve',
      'RULE-SET,twitter_ip,Twitter,no-resolve',
      'RULE-SET,tiktok_ip,TikTok,no-resolve',
      'RULE-SET,google_ip,Google,no-resolve',
      'RULE-SET,cn,直连',
      'RULE-SET,geolocation-cn,直连',
      'RULE-SET,geolocation-!cn,默认',
      'RULE-SET,cn_ip,DIRECT',
      'MATCH,默认',
    ],
    'rule-providers': buildRuleProviders(),
  };
}
