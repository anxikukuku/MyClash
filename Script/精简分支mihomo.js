/*
 * mihomo 配置覆写脚本（精简版）
 */

const iconBaseUrl = 'https://fastly.jsdelivr.net/gh/AIsouler/MyClash@main/Icons/svg/';
const ruleSetBaseUrl = 'https://fastly.jsdelivr.net/gh/appshubcc/bett-rules@meta/geo/';

// 适配 Bettbox 自定义规则开关界面
const Compatible_With_Bettbox = { ruleOptionsEnable: true };

// 定义全局排除节点的正则表达式，用于排除非地区节点
const excludeFilter =
  /群|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|电报|无法|说明|使用|提示|访问|支持|教程|关注|更新|作者|加入|超时|收藏|优惠|福利|邀请|好友|失联|选择|剩余|公益|发布|DIZTNA|通路|登录|禁止|定时|渠道|牢记|永久|余额|阁下|本站|刷新|导航|建议|重置|以下|过滤|⚠️|@|t\.me\/\+|\bexpire\b|\bhttps?:\/\/|\.com|\btraffic\b/i;

// Mihomo 的 exclude-filter 字段必须是字符串
const excludeFilterMihomo = `(?i)${excludeFilter.source}`;

/**
 * 自定义规则开关
 * true = 启用，false = 禁用
 */
const ruleOptionsEnable = {
  // 基础策略组
  手动选择: true,
  自动选择: true,
  负载均衡: false,

  // 分流策略
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

  // 其他功能开关
  生成地区自动选择组: false,
  隐藏地区手动选择组: false,
  分流组添加所有节点: false,
  过滤非地区节点: true,
  屏蔽国外QUIC: true,
  代理IPV4优先: false,
  代理IPV6优先: false,
};

const activeExcludeFilter = ruleOptionsEnable.过滤非地区节点
  ? excludeFilterMihomo
  : undefined;

// 屏蔽国外 QUIC
const blockForeignQuic = [
  'AND,((NETWORK,UDP),(DST-PORT,443),(NOT,((OR,((RULE-SET,cn_additional),(RULE-SET,cn_ip,no-resolve)))))),REJECT',
];

// 直连节点
const directProxies = [
  { name: '🇨🇳 直连 | 双栈', type: 'direct' },
  { name: '🇨🇳 直连 | IPv4优先', type: 'direct', 'ip-version': 'ipv4-prefer' },
  { name: '🇨🇳 直连 | IPv6优先', type: 'direct', 'ip-version': 'ipv6-prefer' },
  { name: '🇨🇳 直连 | 仅IPv4', type: 'direct', 'ip-version': 'ipv4' },
  { name: '🇨🇳 直连 | 仅IPv6', type: 'direct', 'ip-version': 'ipv6' },
];

// 地区定义
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

// 其它地区排除规则：自动从地区定义生成
const otherFilter = `(?i)(${regionDefinitions
  .map((region) => region.filter.replace(/^\(\?i\)/, ''))
  .join('|')})`;

// 普通手动选择组
const groupCommonSelect = {
  type: 'select',
  interval: 600,
  timeout: 3000,
  'max-failed-times': 3,
  'empty-fallback': 'REJECT',
  url: 'https://www.apple.com/library/test/success.html',
  lazy: true,
};

// 自动选择组
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

// 基础规则集
const baseRuleProviders = {
  private: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/private.mrs`,
    path: './ruleset/private.mrs',
    'path-in-bundle': 'geo/geosite/private.mrs',
  },

  private_ip: {
    ...ruleProviderCommonIpcidr,
    url: `${ruleSetBaseUrl}geoip/private.mrs`,
    path: './ruleset/private_ip.mrs',
    'path-in-bundle': 'geo/geoip/private.mrs',
  },

  'geolocation-cn': {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/geolocation-cn.mrs`,
    path: './ruleset/geolocation-cn.mrs',
    'path-in-bundle': 'geo/geosite/geolocation-cn.mrs',
  },

  cn: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/cn.mrs`,
    path: './ruleset/cn.mrs',
    'path-in-bundle': 'geo/geosite/cn.mrs',
  },

  cn_additional: {
    ...ruleProviderCommonDomain,
    url: 'https://static-file-global.353355.xyz/rules/cn-additional-list.mrs',
    path: './ruleset/cn-additional-list.mrs',
    'path-in-bundle': 'geo/geosite/cn.mrs',
  },

  cn_ip: {
    ...ruleProviderCommonIpcidr,
    url: `${ruleSetBaseUrl}geoip/cn.mrs`,
    path: './ruleset/cn_ip.mrs',
    'path-in-bundle': 'geo/geoip/cn.mrs',
  },

  'geolocation-!cn': {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/geolocation-!cn.mrs`,
    path: './ruleset/geolocation-!cn.mrs',
    'path-in-bundle': 'geo/geosite/geolocation-!cn.mrs',
  },

  fakeip_filter: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/fakeip-filter.mrs`,
    path: './ruleset/fakeip-filter.mrs',
    'path-in-bundle': 'geo/geosite/fakeip-filter.mrs',
  },
};

// 基础策略组
// 这里只保留 name，icon 在实际策略组生成时单独配置。
// 同时供 Bettbox 自定义策略组开关使用。
const baseGroups = [
  { name: '手动选择' },
  { name: '自动选择' },
  { name: '负载均衡' },
];

// 分流服务配置
const serviceConfigs = [
  {
    name: 'Google',
    defaultSelected: '日本',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Google_Suite/Google.png',
    providers: {
      google: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/google.mrs`,
        path: './ruleset/google.mrs',
        'path-in-bundle': 'geo/geosite/google.mrs',
      },

      google_ip: {
        ...ruleProviderCommonIpcidr,
        url: `${ruleSetBaseUrl}geoip/google.mrs`,
        path: './ruleset/google.mrs',
        'path-in-bundle': 'geo/geoip/google.mrs',
      },
    },
  },

  {
    name: 'Twitter',
    defaultSelected: '日本',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Twitter.png',
    providers: {
      twitter: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/twitter.mrs`,
        path: './ruleset/twitter.mrs',
        'path-in-bundle': 'geo/geosite/twitter.mrs',
      },

      twitter_ip: {
        ...ruleProviderCommonIpcidr,
        url: `${ruleSetBaseUrl}geoip/twitter.mrs`,
        path: './ruleset/twitter.mrs',
        'path-in-bundle': 'geo/geoip/twitter.mrs',
      },
    },
  },

  {
    name: 'Telegram',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Telegram.png',
    providers: {
      telegram: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/telegram.mrs`,
        path: './ruleset/telegram.mrs',
        'path-in-bundle': 'geo/geosite/telegram.mrs',
      },

      telegram_ip: {
        ...ruleProviderCommonIpcidr,
        url: `${ruleSetBaseUrl}geoip/telegram.mrs`,
        path: './ruleset/telegram.mrs',
        'path-in-bundle': 'geo/geoip/telegram.mrs',
      },
    },
  },

  {
    name: 'Instagram',
    defaultSelected: '日本',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Instagram.png',
    providers: {
      meta: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/meta.mrs`,
        path: './ruleset/meta.mrs',
        'path-in-bundle': 'geo/geosite/meta.mrs',
      },
    },
  },

  {
    name: 'YouTube',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/YouTube.png',
    providers: {
      youtube: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/youtube.mrs`,
        path: './ruleset/youtube.mrs',
        'path-in-bundle': 'geo/geosite/youtube.mrs',
      },
    },
  },

  {
    name: 'TikTok',
    defaultSelected: '日本',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/TikTok.png',
    providers: {
      tiktok: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/tiktok.mrs`,
        path: './ruleset/tiktok.mrs',
        'path-in-bundle': 'geo/geosite/tiktok.mrs',
      },

      tiktok_ip: {
        ...ruleProviderCommonIpcidr,
        url: `${ruleSetBaseUrl}geoip/tiktok.mrs`,
        path: './ruleset/tiktok.mrs',
        'path-in-bundle': 'geo/geoip/tiktok.mrs',
      },
    },
  },

  {
    name: 'AI',
    defaultSelected: '美国',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Air_Bnb.png',
    providers: {
      ai: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/category-ai-!cn.mrs`,
        path: './ruleset/ai.mrs',
        'path-in-bundle': 'geo/geosite/category-ai-!cn.mrs',
      },
    },
  },

  {
    name: 'EHentai',
    defaultSelected: '美国',
    icon: `${iconBaseUrl}EHentai.svg`,
    providers: {
      ehentai: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/ehentai.mrs`,
        path: './ruleset/ehentai.mrs',
        'path-in-bundle': 'geo/geosite/ehentai.mrs',
      },
    },
  },

  {
    name: 'FCM',
    proxies: ['直连'],
    icon: `${iconBaseUrl}Fcm.svg`,
    providers: {
      fcm: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/googlefcm.mrs`,
        path: './ruleset/googlefcm.mrs',
        'path-in-bundle': 'geo/geosite/googlefcm.mrs',
      },
    },
  },

  {
    name: 'AdBlock',
    reject: true,
    icon: `${iconBaseUrl}AdBlock.svg`,
    providers: {
      adblockmihomolite: {
        ...ruleProviderCommonDomain,
        url: 'https://fastly.jsdelivr.net/gh/217heidai/adblockfilters@main/rules/adblockmihomolite.mrs',
        path: './ruleset/adblockmihomolite.mrs',
        'path-in-bundle': 'geo/geosite/category-ads-all.mrs',
      },
    },
  },
];

// 适配 Bettbox 策略组开关
Compatible_With_Bettbox.policyGroupOptions = [
  ...baseGroups.map((group) => group.name),
  ...serviceConfigs.map((service) => service.name),
];

function buildRegionGroups() {
  const groups = [];

  for (const region of regionDefinitions) {
    // 地区手动选择组
    if (ruleOptionsEnable.手动选择) {
      groups.push({
        ...groupCommonSelect,
        name: region.name,
        filter: region.filter,

        // 地区手动组不使用全局 exclude-filter，
        // 避免把其它策略组名称过滤掉。
        'include-all': true,
        'exclude-type': 'direct',

        icon: region.icon,

        // 可选隐藏地区手动组
        ...(ruleOptionsEnable.隐藏地区手动选择组
          ? { hidden: true }
          : {}),
      });
    }
  }

  // 其它地区手动选择组
  if (ruleOptionsEnable.手动选择) {
    groups.push({
      ...groupCommonSelect,
      name: '其它地区',

      // 排除所有已定义地区
      // 同时应用全局节点排除
      'exclude-filter': activeExcludeFilter
        ? `${otherFilter}|${activeExcludeFilter.replace(/^\(\?i\)/, '')}`
        : otherFilter,

      'include-all': true,
      'exclude-type': 'direct',

      icon: 'https://fastly.jsdelivr.net/gh/AIsouler/MyClash@main/Icons/svg/WorldMap.svg',

      // 与其它地区保持和其它地区手动组一致
      ...(ruleOptionsEnable.隐藏地区手动选择组
        ? { hidden: true }
        : {}),
    });
  }

  return groups;
}

function buildFunctionalGroups(subscriptionProxies) {
  // 地区手动组动态生成
  const regionManual = ruleOptionsEnable.手动选择
    ? [...regionDefinitions.map((region) => region.name), '其它地区']
    : [];

  // 所有实际订阅节点名称
  const allProxyNames = subscriptionProxies.map((proxy) => proxy.name);

  // 普通服务策略组中使用的策略组列表
  const serviceProxyNames = [
    '默认',
    ...(ruleOptionsEnable.自动选择 ? ['自动选择'] : []),
    ...regionManual,
    ...(ruleOptionsEnable.负载均衡 ? ['负载均衡'] : []),
    ...(ruleOptionsEnable.手动选择 ? ['手动选择'] : []),
  ];

  const groups = [
    {
      ...groupCommonSelect,
      name: '默认',

      proxies: [
        ...(ruleOptionsEnable.自动选择 ? ['自动选择'] : []),
        ...regionManual,
        ...(ruleOptionsEnable.负载均衡 ? ['负载均衡'] : []),
        ...(ruleOptionsEnable.手动选择 ? ['手动选择'] : []),
      ],

      icon: 'https://cdn.jsdelivr.net/gh/GitMetaio/Surfing@rm/Home/icon/All.svg',
    },
  ];

  // 服务策略组
  for (const svc of serviceConfigs) {
    const enabled = ruleOptionsEnable[svc.name];

    if (!enabled) continue;

    let serviceProxies;

    if (svc.proxies) {
      // 例如 FCM 固定使用“直连”
      serviceProxies = svc.proxies;
    } else if (ruleOptionsEnable.分流组添加所有节点) {
      // 开启后，将实际订阅节点 + 策略组一起加入
      serviceProxies = [
        ...new Set([
          ...serviceProxyNames,
          ...allProxyNames,
        ]),
      ];
    } else {
      // 默认保持原来的策略组结构
      serviceProxies = serviceProxyNames;
    }

    groups.push({
      ...groupCommonSelect,
      name: svc.name,
      proxies: serviceProxies,

      ...(svc.defaultSelected
        ? { 'default-selected': svc.defaultSelected }
        : {}),

      ...(svc.reject
        ? {
            proxies: ['REJECT', 'REJECT-DROP', 'PASS'],
          }
        : {}),

      icon: svc.icon,
    });
  }

  // 直连策略组
  groups.push({
    ...groupCommonSelect,
    name: '直连',
    proxies: directProxies.map((proxy) => proxy.name),
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/China.png',
  });

  // 地区策略组
  groups.push(...buildRegionGroups());

  // 手动选择
  // 放在所有地区策略组之后
  if (ruleOptionsEnable.手动选择) {
    groups.push({
      ...groupCommonSelect,
      name: '手动选择',
      'include-all': true,

      ...(activeExcludeFilter
        ? { 'exclude-filter': activeExcludeFilter }
        : {}),

      'exclude-type': 'DIRECT',
      icon: `${iconBaseUrl}Static.svg`,
    });
  }

  // 自动选择
  if (ruleOptionsEnable.自动选择) {
    groups.push({
      ...groupCommonAuto,
      name: '自动选择',

      ...(activeExcludeFilter
        ? { 'exclude-filter': activeExcludeFilter }
        : {}),

      icon: `${iconBaseUrl}Auto.svg`,
    });
  }

  // 负载均衡
  if (ruleOptionsEnable.负载均衡) {
    groups.push({
      type: 'load-balance',
      name: '负载均衡',
      strategy: 'consistent-hashing',
      interval: 600,
      timeout: 3000,
      'max-failed-times': 3,
      'include-all': true,

      ...(activeExcludeFilter
        ? { 'exclude-filter': activeExcludeFilter }
        : {}),

      'exclude-type': 'DIRECT',
      icon: `${iconBaseUrl}RoundRobin.svg`,
    });
  }

  return groups;
}

function buildRuleProviders() {
  const providers = { ...baseRuleProviders };

  // cn_additional 只有屏蔽国外 QUIC 时才需要
  if (!ruleOptionsEnable.屏蔽国外QUIC) {
    delete providers.cn_additional;
  }

  // 根据服务开关生成对应规则集
  for (const svc of serviceConfigs) {
    const enabled = ruleOptionsEnable[svc.name];

    if (enabled) {
      Object.assign(providers, svc.providers || {});
    }
  }

  return providers;
}

function filterProxies(config) {
  const proxies = (config.proxies || []).filter((proxy) => {
    const type = String(proxy.type || '').toLowerCase();

    return (
      type !== 'direct' &&
      type !== 'reject' &&
      type !== 'rematch'
    );
  });

  if (!proxies.length) {
    throw new Error(
      '配置文件中未找到任何代理节点，请使用机场提供的配置文件进行覆写'
    );
  }

  return proxies;
}

function main(config) {
  // 不支持 proxy-providers
  if (
    config['proxy-providers'] &&
    Object.keys(config['proxy-providers']).length > 0
  ) {
    throw new Error(
      '脚本不支持 proxy-providers，请使用包含完整节点列表的订阅进行覆写'
    );
  }

  let proxies = filterProxies(config);

  // 代理 IP 优先级
  if (
    ruleOptionsEnable.代理IPV4优先 !==
    ruleOptionsEnable.代理IPV6优先
  ) {
    const ipVersion = ruleOptionsEnable.代理IPV4优先
      ? 'ipv4-prefer'
      : 'ipv6-prefer';

    proxies = proxies.map((proxy) => ({
      ...proxy,
      'ip-version': ipVersion,
    }));
  }

  // DNS
  const chinaDNS = [
    '223.5.5.5#DIRECT',
    '119.29.29.29#DIRECT',
  ];

  const defaultDNS = [
    '114.114.114.114#DIRECT',
    'tls://223.5.5.5#DIRECT',
    'https://1.12.12.12/dns-query#DIRECT',
  ];

  const proxyServerDNS = [
    '114.114.114.114#DIRECT',
    'tls://223.5.5.5#DIRECT',
    'https://doh.pub/dns-query#DIRECT',
  ];

  const foreignDNS = [
    'https://cloudflare-dns.com/dns-query#默认',
    'https://dns.google/dns-query#默认',
  ];

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
    'external-ui-url':
      'https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip',

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
        ...(ruleOptionsEnable.FCM
          ? ['rule-set:fcm']
          : []),
      ],

      'default-nameserver': defaultDNS,
      'proxy-server-nameserver': proxyServerDNS,

      'nameserver-policy': {
        'rule-set:private': 'system',
        'rule-set:cn': chinaDNS,
        'rule-set:geolocation-cn': chinaDNS,
      },

      nameserver: foreignDNS,
      'direct-nameserver': chinaDNS,
      'direct-nameserver-follow-policy': true,
    },

    hosts: {
      'doh.pub': [
        '1.12.12.12',
        '120.53.53.53',
      ],

      // 修正 Cloudflare DoH 域名
      'cloudflare-dns.com': [
        '1.1.1.1',
        '1.0.0.1',
      ],

      'dns.google': [
        '8.8.8.8',
        '8.8.4.4',
      ],

      // Google Play 下载修复
      'services.googleapis.cn': 'services.googleapis.com',
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
      'dns-hijack': [
        'udp://any:53',
        'tcp://any:53',
      ],
    },

    sniffer: {
      enable: true,
      'force-dns-mapping': true,
      'parse-pure-ip': true,
      'override-destination': true,

      sniff: {
        HTTP: {
          ports: [80, '8080-8880'],
        },

        TLS: {
          ports: [443, 8443],
        },

        QUIC: {
          ports: [443, 8443],
        },
      },

      'skip-dst-address': [
        '223.5.5.5/32',
        '119.29.29.29/32',

        ...(ruleOptionsEnable.Telegram
          ? ['rule-set:telegram_ip']
          : []),
      ],
    },

    proxies: [
      ...proxies,
      ...directProxies,
    ],

    'proxy-groups': buildFunctionalGroups(proxies),

    rules: [
      'RULE-SET,private,DIRECT',
      'RULE-SET,private_ip,直连,no-resolve',

      ...(ruleOptionsEnable.屏蔽国外QUIC
        ? blockForeignQuic
        : []),

      ...(ruleOptionsEnable.AdBlock
        ? ['RULE-SET,adblockmihomolite,AdBlock']
        : []),

      ...(ruleOptionsEnable.FCM
        ? ['RULE-SET,fcm,FCM']
        : []),

      ...(ruleOptionsEnable.AI
        ? ['RULE-SET,ai,AI']
        : []),

      ...(ruleOptionsEnable.EHentai
        ? ['RULE-SET,ehentai,EHentai']
        : []),

      ...(ruleOptionsEnable.TikTok
        ? [
            'RULE-SET,tiktok,TikTok',
            'RULE-SET,tiktok_ip,TikTok,no-resolve',
          ]
        : []),

      ...(ruleOptionsEnable.YouTube
        ? ['RULE-SET,youtube,YouTube']
        : []),

      ...(ruleOptionsEnable.Telegram
        ? [
            'RULE-SET,telegram,Telegram',
            'RULE-SET,telegram_ip,Telegram,no-resolve',
          ]
        : []),

      ...(ruleOptionsEnable.Twitter
        ? [
            'RULE-SET,twitter,Twitter',
            'RULE-SET,twitter_ip,Twitter,no-resolve',
          ]
        : []),

      ...(ruleOptionsEnable.Instagram
        ? ['RULE-SET,meta,Instagram']
        : []),

      ...(ruleOptionsEnable.Google
        ? [
            'RULE-SET,google,Google',
            'RULE-SET,google_ip,Google,no-resolve',
          ]
        : []),

      // 保留 cn 规则：
      // cn 仍然被 DNS fake-ip-filter / nameserver-policy 使用
      'RULE-SET,cn,直连',
      'RULE-SET,geolocation-cn,直连',

      'RULE-SET,geolocation-!cn,默认',
      'RULE-SET,cn_ip,DIRECT',

      'MATCH,默认',
    ],

    'rule-providers': buildRuleProviders(),
  };
}