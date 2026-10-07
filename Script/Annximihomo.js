/*
 * mihomo 配置覆写脚本
 */

const iconBaseUrl = 'https://fastly.jsdelivr.net/gh/AIsouler/MyClash@main/Icons/svg/';
const ruleSetBaseUrl = 'https://fastly.jsdelivr.net/gh/appshubcc/bett-rules@meta/geo/';

const Compatible_With_Bettbox = {
  ruleOptionsEnable: true,
};

// 全局排除节点正则
const excludeFilter = /群|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|电报|无法|说明|使用|提示|访问|支持|教程|关注|更新|作者|加入|超时|收藏|优惠|福利|邀请|好友|失联|选择|剩余|公益|发布|DIZTNA|通路|登录|禁止|定时|渠道|牢记|永久|余额|阁下|本站|刷新|导航|建议|重置|以下|过滤|⚠️|@|t\.me\/\+|\bexpire\b|\bhttps?:\/\/|\.com|\btraffic\b/i;
const excludeFilterMihomo = `(?i)${excludeFilter.source}`;

// 功能与分流策略控制开关
const ruleOptionsEnable = {
  手动选择: true,
  自动选择: true,
  负载均衡: false,

  FCM: true,
  YouTube: true,
  Google: true,
  AI: true,
  Telegram: true,
  TikTok: true,
  Twitter: true,
  Instagram: true,
  EHentai: true,
  AdBlock: true,

  生成地区自动选择组: true,
  隐藏地区手动选择组: false,
  分流组添加所有节点: false,
  过滤非地区节点: true,
  屏蔽国外QUIC: true,
  代理IPV4优先: false,
  代理IPV6优先: false,
};

const activeExcludeFilter = ruleOptionsEnable.过滤非地区节点 ? excludeFilterMihomo : undefined;

// 国外 QUIC 屏蔽规则
const blockForeignQuic = [
  'AND,((NETWORK,UDP),(DST-PORT,443),(NOT,((OR,((RULE-SET,cn_additional),(RULE-SET,cn_ip,no-resolve)))))),REJECT',
];

// 内置直连策略节点
const directProxies = [
  { name: '🇨🇳 直连 | 双栈', type: 'direct' },
  { name: '🇨🇳 直连 | IPv4优先', type: 'direct', 'ip-version': 'ipv4-prefer' },
  { name: '🇨🇳 直连 | IPv6优先', type: 'direct', 'ip-version': 'ipv6-prefer' },
  { name: '🇨🇳 直连 | 仅IPv4', type: 'direct', 'ip-version': 'ipv4' },
  { name: '🇨🇳 直连 | 仅IPv6', type: 'direct', 'ip-version': 'ipv6' },
];

// 地区正则定义
const regionDefinitions = [
  {
    name: '香港',
    filter: '(?i)(🇭🇰|香港|(?<![A-Za-z])HKG?(?![A-Za-z])|hong\\s*kong)',
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
    filter: '(?i)(🇺🇸|美国|纽约|洛杉矶|旧金山|芝加哥|休斯顿|迈阿密|西雅图|波士顿|华盛顿|拉斯维加斯|圣何塞|圣地亚哥|(?<![A-Za-z])USA?(?![A-Za-z])|america|united\\s*states)',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/United_States.png',
  },
];

const otherFilter = `(?i)(${regionDefinitions.map((region) => region.filter.replace(/^\(\?i\)/, '')).join('|')})`;

// 策略组通用模板
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
  icon: `${iconBaseUrl}Auto.svg`,
  hidden: true,
};

// Rule Provider 模板
const ruleProviderCommonDomain = {
  type: 'http',
  interval: 86400,
  behavior: 'domain',
  format: 'mrs',
};

const ruleProviderCommonIpcidr = {
  type: 'http',
  interval: 86400,
  behavior: 'ipcidr',
  format: 'mrs',
};

// 基础规则集定义（不包含任何 path-in-bundle，脱离 Geo 机制）
const baseRuleProviders = {
  private: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/private.mrs`,
    path: './ruleset/private.mrs',
  },
  private_ip: {
    ...ruleProviderCommonIpcidr,
    url: `${ruleSetBaseUrl}geoip/private.mrs`,
    path: './ruleset/private_ip.mrs',
  },
  'geolocation-cn': {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/geolocation-cn.mrs`,
    path: './ruleset/geolocation-cn.mrs',
  },
  cn: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/cn.mrs`,
    path: './ruleset/cn.mrs',
  },
  cn_additional: {
    ...ruleProviderCommonDomain,
    url: 'https://static-file-global.353355.xyz/rules/cn-additional-list.mrs',
    path: './ruleset/cn-additional-list.mrs',
  },
  cn_ip: {
    ...ruleProviderCommonIpcidr,
    url: `${ruleSetBaseUrl}geoip/cn.mrs`,
    path: './ruleset/cn_ip.mrs',
  },
  'geolocation-!cn': {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/geolocation-!cn.mrs`,
    path: './ruleset/geolocation-!cn.mrs',
  },
  fakeip_filter: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/fakeip-filter.mrs`,
    path: './ruleset/fakeip-filter.mrs',
  },
};

const baseGroups = [
  { name: '手动选择', icon: `${iconBaseUrl}Static.svg` },
  { name: '自动选择', icon: `${iconBaseUrl}Auto.svg` },
  { name: '负载均衡', icon: `${iconBaseUrl}RoundRobin.svg` },
];

// 服务分流定义
const serviceConfigs = [
  ...baseGroups,
  {
    name: 'Google',
    defaultSelected: '日本',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Google_Suite/Google.png',
    providers: {
      google: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/google.mrs`, path: './ruleset/google.mrs' },
      google_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/google.mrs`, path: './ruleset/google_ip.mrs' },
    },
  },
  {
    name: 'Twitter',
    defaultSelected: '日本',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Twitter.png',
    providers: {
      twitter: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/twitter.mrs`, path: './ruleset/twitter.mrs' },
      twitter_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/twitter.mrs`, path: './ruleset/twitter_ip.mrs' },
    },
  },
  {
    name: 'Telegram',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Telegram.png',
    providers: {
      telegram: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/telegram.mrs`, path: './ruleset/telegram.mrs' },
      telegram_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/telegram.mrs`, path: './ruleset/telegram_ip.mrs' },
    },
  },
  {
    name: 'Instagram',
    defaultSelected: '日本',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Instagram.png',
    providers: {
      meta: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/meta.mrs`, path: './ruleset/meta.mrs' },
    },
  },
  {
    name: 'YouTube',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/YouTube.png',
    providers: {
      youtube: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/youtube.mrs`, path: './ruleset/youtube.mrs' },
    },
  },
  {
    name: 'TikTok',
    defaultSelected: '日本',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/TikTok.png',
    providers: {
      tiktok: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/tiktok.mrs`, path: './ruleset/tiktok.mrs' },
      tiktok_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/tiktok.mrs`, path: './ruleset/tiktok_ip.mrs' },
    },
  },
  {
    name: 'AI',
    defaultSelected: '美国',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Air_Bnb.png',
    providers: {
      ai: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/category-ai-!cn.mrs`, path: './ruleset/ai.mrs' },
    },
  },
  {
    name: 'EHentai',
    defaultSelected: '美国',
    icon: `${iconBaseUrl}EHentai.svg`,
    providers: {
      ehentai: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/ehentai.mrs`, path: './ruleset/ehentai.mrs' },
    },
  },
  {
    name: 'FCM',
    proxies: ['直连', '默认代理'],
    icon: `${iconBaseUrl}Fcm.svg`,
    providers: {
      googlefcm: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/googlefcm.mrs`, path: './ruleset/googlefcm.mrs' },
    },
  },
  {
    name: 'AdBlock',
    reject: true,
    icon: `${iconBaseUrl}AdBlock.svg`,
    providers: {
      adblockmihomolite: { ...ruleProviderCommonDomain, url: 'https://fastly.jsdelivr.net/gh/217heidai/adblockfilters@main/rules/adblockmihomolite.mrs', path: './ruleset/adblockmihomolite.mrs' },
    },
  },
];

Compatible_With_Bettbox.policyGroupOptions = serviceConfigs.map((svc) => svc.name);

// 节点规范化与去重处理
function processAndCleanProxies(rawProxies) {
  if (!Array.isArray(rawProxies) || rawProxies.length === 0) {
    throw new Error('配置文件中未找到任何代理节点，请使用有效的订阅进行覆写');
  }

  let proxies = rawProxies.filter((proxy) => {
    if (!proxy || !proxy.name || !proxy.type) return false;
    const type = String(proxy.type).toLowerCase();
    return type !== 'direct' && type !== 'reject' && type !== 'rematch';
  });

  const rawNameToFinalName = new Map();
  const nameCounter = new Map();

  proxies = proxies.map((proxy) => {
    const rawName = proxy.name;
    let cleanName = String(rawName)
      .replace(/[\r\n\t]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const count = (nameCounter.get(cleanName) || 0) + 1;
    nameCounter.set(cleanName, count);

    let finalName = cleanName;
    if (count > 1) {
      finalName = `${cleanName} - ${count}`;
    }

    rawNameToFinalName.set(rawName, finalName);
    rawNameToFinalName.set(cleanName, finalName);

    return { ...proxy, name: finalName };
  });

  proxies = proxies.map((proxy) => {
    const targetDialer = proxy['dialer-proxy'];
    if (targetDialer && rawNameToFinalName.has(targetDialer)) {
      return {
        ...proxy,
        'dialer-proxy': rawNameToFinalName.get(targetDialer),
      };
    }
    return proxy;
  });

  return proxies;
}

// 构建地区策略组
function buildRegionGroups() {
  const groups = [];

  for (const region of regionDefinitions) {
    if (ruleOptionsEnable.手动选择) {
      groups.push({
        ...groupCommonSelect,
        name: region.name,
        filter: region.filter,
        'include-all': true,
        'exclude-type': 'direct',
        proxies: ruleOptionsEnable.自动选择 && ruleOptionsEnable.生成地区自动选择组 ? [`${region.name}-自动选择`] : undefined,
        icon: region.icon,
        ...(ruleOptionsEnable.隐藏地区手动选择组 ? { hidden: true } : {}),
      });
    }

    if (ruleOptionsEnable.自动选择 && ruleOptionsEnable.生成地区自动选择组) {
      groups.push({
        ...groupCommonAuto,
        name: `${region.name}-自动选择`,
        filter: region.filter,
        ...(activeExcludeFilter ? { 'exclude-filter': activeExcludeFilter } : {}),
      });
    }
  }

  if (ruleOptionsEnable.手动选择) {
    groups.push({
      ...groupCommonSelect,
      name: '其它地区',
      'exclude-filter': activeExcludeFilter ? `${otherFilter}|${activeExcludeFilter.replace(/^\(\?i\)/, '')}` : otherFilter,
      'include-all': true,
      'exclude-type': 'direct',
      proxies: ruleOptionsEnable.自动选择 && ruleOptionsEnable.生成地区自动选择组 ? ['其它地区-自动选择'] : undefined,
      icon: 'https://fastly.jsdelivr.net/gh/AIsouler/MyClash@main/Icons/svg/WorldMap.svg',
      ...(ruleOptionsEnable.隐藏地区手动选择组 ? { hidden: true } : {}),
    });
  }

  if (ruleOptionsEnable.自动选择 && ruleOptionsEnable.生成地区自动选择组) {
    groups.push({
      ...groupCommonAuto,
      name: '其它地区-自动选择',
      'exclude-filter': activeExcludeFilter ? `${otherFilter}|${activeExcludeFilter.replace(/^\(\?i\)/, '')}` : otherFilter,
    });
  }

  return groups;
}

// 构建功能策略组
function buildFunctionalGroups(subscriptionProxies) {
  const regionManual = ruleOptionsEnable.手动选择 ? [...regionDefinitions.map((region) => region.name), '其它地区'] : [];
  const allProxyNames = subscriptionProxies.map((proxy) => proxy.name);

  const serviceProxyNames = [
    '默认代理',
    ...(ruleOptionsEnable.自动选择 ? ['自动选择'] : []),
    ...regionManual,
    ...(ruleOptionsEnable.负载均衡 ? ['负载均衡'] : []),
    ...(ruleOptionsEnable.手动选择 ? ['手动选择'] : []),
  ];

  const groups = [
    {
      ...groupCommonSelect,
      name: '默认代理',
      proxies: [
        ...(ruleOptionsEnable.自动选择 ? ['自动选择'] : []),
        ...regionManual,
        ...(ruleOptionsEnable.负载均衡 ? ['负载均衡'] : []),
        ...(ruleOptionsEnable.手动选择 ? ['手动选择'] : []),
      ],
      icon: 'https://cdn.jsdelivr.net/gh/GitMetaio/Surfing@rm/Home/icon/All.svg',
    },
  ];

  for (const svc of serviceConfigs) {
    if (baseGroups.some((base) => base.name === svc.name)) continue;
    if (!ruleOptionsEnable[svc.name]) continue;

    let serviceProxies = svc.proxies
      ? svc.proxies
      : ruleOptionsEnable.分流组添加所有节点
      ? [...new Set([...serviceProxyNames, ...allProxyNames])]
      : serviceProxyNames;

    const group = {
      ...groupCommonSelect,
      name: svc.name,
      proxies: serviceProxies,
      ...(svc.defaultSelected ? { 'default-selected': svc.defaultSelected } : {}),
      icon: svc.icon,
    };

    if (svc.reject) {
      group.proxies = ['REJECT', 'REJECT-DROP', 'PASS'];
    }

    groups.push(group);
  }

  groups.push({
    ...groupCommonSelect,
    name: '直连',
    proxies: directProxies.map((proxy) => proxy.name),
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/China.png',
  });

  groups.push(...buildRegionGroups());

  if (ruleOptionsEnable.手动选择) {
    const baseGroup = baseGroups.find((g) => g.name === '手动选择');
    groups.push({
      ...groupCommonSelect,
      name: '手动选择',
      'include-all': true,
      ...(activeExcludeFilter ? { 'exclude-filter': activeExcludeFilter } : {}),
      'exclude-type': 'DIRECT',
      icon: baseGroup?.icon,
    });
  }

  if (ruleOptionsEnable.自动选择) {
    const baseGroup = baseGroups.find((g) => g.name === '自动选择');
    groups.push({
      ...groupCommonAuto,
      name: '自动选择',
      ...(activeExcludeFilter ? { 'exclude-filter': activeExcludeFilter } : {}),
      icon: baseGroup?.icon,
    });
  }

  if (ruleOptionsEnable.负载均衡) {
    const baseGroup = baseGroups.find((g) => g.name === '负载均衡');
    groups.push({
      type: 'load-balance',
      name: '负载均衡',
      strategy: 'consistent-hashing',
      interval: 600,
      timeout: 3000,
      'max-failed-times': 3,
      'include-all': true,
      ...(activeExcludeFilter ? { 'exclude-filter': activeExcludeFilter } : {}),
      'exclude-type': 'DIRECT',
      icon: baseGroup?.icon,
    });
  }

  return groups;
}

// 构建 Rule Providers
function buildRuleProviders() {
  const providers = { ...baseRuleProviders };

  if (!ruleOptionsEnable.屏蔽国外QUIC) {
    delete providers.cn_additional;
  }

  for (const svc of serviceConfigs) {
    if (baseGroups.some((base) => base.name === svc.name)) continue;
    if (ruleOptionsEnable[svc.name]) {
      Object.assign(providers, svc.providers || {});
    }
  }

  return providers;
}

// 主入口逻辑
function main(config) {
  if (config['proxy-providers'] && Object.keys(config['proxy-providers']).length > 0) {
    throw new Error('脚本不支持 proxy-providers，请使用包含完整节点列表的订阅进行覆写');
  }

  let proxies = processAndCleanProxies(config.proxies || []);

  if (ruleOptionsEnable.代理IPV4优先 !== ruleOptionsEnable.代理IPV6优先) {
    const ipVersion = ruleOptionsEnable.代理IPV4优先 ? 'ipv4-prefer' : 'ipv6-prefer';
    proxies = proxies.map((proxy) => ({ ...proxy, 'ip-version': ipVersion }));
  }

  const chinaDNS = ['223.5.5.5#DIRECT', '119.29.29.29#DIRECT'];
  const defaultDNS = ['114.114.114.114#DIRECT', 'tls://223.5.5.5#DIRECT', 'https://1.12.12.12/dns-query#DIRECT'];
  const proxyServerDNS = ['114.114.114.114#DIRECT', 'tls://223.5.5.5#DIRECT', 'https://doh.pub/dns-query#DIRECT'];
  const foreignDNS = ['https://cloudflare-dns.com/dns-query#默认代理', 'https://dns.google/dns-query#默认代理'];

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
    'external-ui-url': 'https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip',

    // 关键改动：关闭 GeoData 模式，禁用全局 Geo 加载
    'geodata-mode': false,

    profile: {
      'store-selected': true,
      'store-fake-ip': true,
    },

    dns: {
      enable: true,
      ipv6: true,
      'cache-algorithm': 'arc',
      'enhanced-mode': 'fake-ip',
      'use-hosts': true,
      'use-system-hosts': false,
      'fake-ip-range': '198.18.0.1/15',
      'fake-ip-range6': 'fc00::1/64',

      'fake-ip-filter': [
        'rule-set:private',
        'rule-set:fakeip_filter',
        'rule-set:cn',
        'rule-set:geolocation-cn',
        ...(ruleOptionsEnable.FCM ? ['rule-set:googlefcm'] : []),
      ],

      'default-nameserver': defaultDNS,
      'proxy-server-nameserver': proxyServerDNS,

      // 使用 rule-set 代替原本的 geosite:，彻底去除 geo 依赖
      'nameserver-policy': {
        'rule-set:private': 'system',
        'rule-set:cn,geolocation-cn': chinaDNS,
      },

      nameserver: foreignDNS,
      'direct-nameserver': chinaDNS,
      'direct-nameserver-follow-policy': true,
    },

    hosts: {
      'doh.pub': ['1.12.12.12', '120.53.53.53'],
      'dns.pub': ['1.12.12.12', '120.53.53.53'],
      'doh.360.cn': ['101.226.4.6', '218.30.118.6'],
      'cloudflare-dns.com': ['1.1.1.1', '1.0.0.1'],
      'dns.google': ['8.8.8.8', '8.8.4.4'],

      'services.googleapis.cn': 'services.googleapis.com',

      '+.mcdn.bilivideo.com': ['0.0.0.0'],
      '+.mcdn.bilivideo.cn': ['0.0.0.0'],
      '+.p2p.huya.com': ['0.0.0.0'],
    },

    ntp: {
      enable: true,
      'write-to-system': false,
      server: 'ntp.aliyun.com',
      port: 123,
      interval: 60,
    },

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
      },
      'skip-dst-address': [
        '223.5.5.5/32',
        '119.29.29.29/32',
        ...(ruleOptionsEnable.Telegram ? ['rule-set:telegram_ip'] : []),
      ],
    },

    proxies: [...proxies, ...directProxies],

    'proxy-groups': buildFunctionalGroups(proxies),

    rules: [
      'RULE-SET,private,DIRECT',
      'RULE-SET,private_ip,直连,no-resolve',

      ...(ruleOptionsEnable.屏蔽国外QUIC ? blockForeignQuic : []),

      ...(ruleOptionsEnable.AdBlock ? ['RULE-SET,adblockmihomolite,AdBlock'] : []),
      ...(ruleOptionsEnable.FCM ? ['RULE-SET,googlefcm,FCM'] : []),
      ...(ruleOptionsEnable.AI ? ['RULE-SET,ai,AI'] : []),
      ...(ruleOptionsEnable.EHentai ? ['RULE-SET,ehentai,EHentai'] : []),

      ...(ruleOptionsEnable.TikTok
        ? ['RULE-SET,tiktok,TikTok', 'RULE-SET,tiktok_ip,TikTok,no-resolve']
        : []),

      ...(ruleOptionsEnable.YouTube ? ['RULE-SET,youtube,YouTube'] : []),

      ...(ruleOptionsEnable.Telegram
        ? ['RULE-SET,telegram,Telegram', 'RULE-SET,telegram_ip,Telegram,no-resolve']
        : []),

      ...(ruleOptionsEnable.Twitter
        ? ['RULE-SET,twitter,Twitter', 'RULE-SET,twitter_ip,Twitter,no-resolve']
        : []),

      ...(ruleOptionsEnable.Instagram ? ['RULE-SET,meta,Instagram'] : []),

      ...(ruleOptionsEnable.Google
        ? ['RULE-SET,google,Google', 'RULE-SET,google_ip,Google,no-resolve']
        : []),

      'RULE-SET,cn,直连',
      'RULE-SET,geolocation-cn,直连',
      'RULE-SET,geolocation-!cn,默认代理',
      'RULE-SET,cn_ip,DIRECT',
      'MATCH,默认代理',
    ],

    'rule-providers': buildRuleProviders(),
  };
}
