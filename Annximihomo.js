/**
 * mihomo配置覆写脚本

// --- 静态配置区域 ---

// 适配 Bettbox 自定义配置参数
const Compatible_With_Bettbox = { ruleOptionsEnable: true };

/**
 * 自定义配置选项
 * true = 启用
 * false = 禁用
 */
const ruleOptionsEnable = {
  // 基础策略组
  手动选择: true,
  自动选择: false,
  负载均衡: false,

  // 分流策略配置
  FCM: true,
  YouTube: true,
  Google: true,
  AI: true,
  Telegram: true,
  TikTok: true,
  Twitter: true,
  Meta: true,
  EHentai: true,
  Emby: true,
  AdBlock: true,

  // 非分流策略配置
  极简模式: false,
  生成地区自动选择组: false,
  隐藏地区手动选择组: false,
  生成倍率组: false,
  生成家宽节点组: false,
  分流组添加所有节点: false,
  过滤低倍率节点: false,
  过滤高倍率节点: false,
  过滤非地区节点: true,
  屏蔽国外QUIC: false,
  代理IPV4优先: false,
  代理IPV6优先: false,
};

// 定义前置规则
const prefixRules = [
  'DOMAIN-SUFFIX,ctaiot.com,直连',
  'DOMAIN,cdn.jsdmirror.com,直连',
  'RULE-SET,private,直连',
  'RULE-SET,geolocation-cn,直连',
];

// 自定义节点列表（留空则不生成自建节点策略组）
const customizeProxies = [];

// 定义全局排除节点的正则表达式，用于排除非地区节点
const excludeFilter =
  /群|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|电报|无法|说明|使用|提示|访问|支持|教程|关注|更新|作者|加入|超时|收藏|优惠|福利|邀请|好友|失联|选择|剩余|公益|发布|DIZTNA|通路|登录|禁止|定时|渠道|牢记|永久|余额|阁下|本站|刷新|导航|建议|重置|以下|过滤|⚠️|@|t\.me\/\+|\bexpire\b|\bhttps?:\/\/|\.com|\btraffic\b/iu;

// 屏蔽国外QUIC规则
const blockForeignQuic = [
  'AND,((NETWORK,UDP),(DST-PORT,443),(NOT,((OR,((RULE-SET,cn),(RULE-SET,cn_ip,no-resolve)))))),REJECT',
];

// 直连节点定义
const directProxies = [
  { name: '🇨🇳 直连 | 双栈', type: 'direct' },
  { name: '🇨🇳 直连 | IPv4优先', type: 'direct', 'ip-version': 'ipv4-prefer' },
  { name: '🇨🇳 直连 | IPv6优先', type: 'direct', 'ip-version': 'ipv6-prefer' },
  { name: '🇨🇳 直连 | 仅IPv4', type: 'direct', 'ip-version': 'ipv4' },
  { name: '🇨🇳 直连 | 仅IPv6', type: 'direct', 'ip-version': 'ipv6' },
];

// 图标 URL 公共前缀
const iconBaseUrl = 'https://cdn.jsdmirror.com/gh/AIsouler/MyClash@main/Icons/svg/';

// 规则集 URL 公共前缀
const ruleSetBaseUrl = 'https://cdn.jsdmirror.com/gh/appshubcc/bett-rules@meta/geo/';

// 定义地区策略组
const regionDefinitions = [
  {
    name: '香港',
    flag: '🇭🇰',
    regex: /🇭🇰|香港|(?<![A-Za-z])HKG?(?![A-Za-z])|hong\s*kong/i,
    icon: `${iconBaseUrl}HongKong.svg`,
  },
  {
    name: '日本',
    flag: '🇯🇵',
    regex: /🇯🇵|日本|东京|大阪|京都|(?<![A-Za-z])JPN?(?![A-Za-z])|japan/i,
    icon: `${iconBaseUrl}Japan.svg`,
  },
  {
    name: '台湾',
    flag: '🇹🇼',
    regex: /🇹🇼|台湾|台北|高雄|(?<![A-Za-z])TWN?(?![A-Za-z])|taiwan/i,
    icon: `${iconBaseUrl}Taiwan.svg`,
  },
  {
    name: '新加坡',
    flag: '🇸🇬',
    regex: /🇸🇬|新加坡|狮城|(?<![A-Za-z])SGP?(?![A-Za-z])|singapore/i,
    icon: `${iconBaseUrl}Singapore.svg`,
  },
  {
    name: '美国',
    flag: '🇺🇸',
    regex:
      /🇺🇸|美国|纽约|洛杉矶|旧金山|芝加哥|休斯顿|迈阿密|西雅图|波士顿|华盛顿|拉斯维加斯|圣何塞|(?<![A-Za-z])USA?(?![A-Za-z])|america|united\s*states/i,
    icon: `${iconBaseUrl}America.svg`,
  },
];

// 倍率策略组定义
const lowRateRegionName = '低倍率节点';
const highRateRegionName = '高倍率节点';
const rateRegionDefinitions = [
  {
    name: lowRateRegionName,
    regex:
      /^(?!.*(?:剩|期)).*(?:(?<![\d.])0(\.[0-5]|[*×✕✖⨯⨉x倍]))|(?:[*×✕✖⨯⨉x]0)|^(?!.*(?:客户端|软件)).*下载|低倍|免费|(?<![A-Za-z])free(?![A-Za-z])/i,
    icon: `${iconBaseUrl}Available.svg`,
  },
  {
    name: highRateRegionName,
    regex:
      /(?:[*×✕✖⨯⨉x](?:[2-9]\d*|[1-9]\d+)(?:\.\d+)?)|(?:(?<![\d.])(?:[2-9]\d*|[1-9]\d+)(?:\.\d+)?(?:倍|[*×✕✖⨯⨉x]))/i,
    icon: `${iconBaseUrl}Airport.svg`,
  },
];

// 家宽节点策略组定义
const homeRegionName = '家宽节点';
const homeRegionDefinitions = [
  {
    name: homeRegionName,
    regex: /家宽|住宅|原生\s*IP|家庭宽带|\bISP\b|\bRES\b|residential/i,
    icon: `${iconBaseUrl}Home.svg`,
  },
];

// 全部地区及分类定义汇总
const allRegionDefinitions = [...regionDefinitions, ...rateRegionDefinitions, ...homeRegionDefinitions];

// Rule Providers 通用配置
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

// 定义基础 Rule Providers
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
    'path-in-bundle': 'geo/geoip/private_ip.mrs',
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
  cn_ip: {
    ...ruleProviderCommonIpcidr,
    url: `${ruleSetBaseUrl}geoip/cn.mrs`,
    path: './ruleset/cn_ip.mrs',
    'path-in-bundle': 'geo/geoip/cn_ip.mrs',
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
  douyin: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/douyin.mrs`,
    path: './ruleset/douyin.mrs',
    'path-in-bundle': 'geo/geosite/douyin.mrs',
  },
};

// 策略组公共基础配置
const groupBaseOption = {
  interval: 600,
  timeout: 3000,
  url: 'https://www.apple.com/library/test/success.html',
  lazy: true,
  'max-failed-times': 3,
  'empty-fallback': 'REJECT',
};

// select 策略组通用配置
const selectBaseOption = {
  ...groupBaseOption,
  type: 'select',
};

// url-test 策略组通用配置
const urlTestBaseOption = {
  ...groupBaseOption,
  type: 'url-test',
  tolerance: 50,
  'exclude-type': 'DIRECT',
  icon: `${iconBaseUrl}Auto.svg`,
  hidden: true,
};

// load-balance 策略组通用配置
const loadBalanceBaseOption = {
  ...groupBaseOption,
  type: 'load-balance',
  strategy: 'sticky-sessions',
  'exclude-type': 'DIRECT',
  icon: `${iconBaseUrl}RoundRobin.svg`,
  hidden: true,
};

// 定义基础策略组
const baseGroups = [
  {
    name: '手动选择',
    baseOption: selectBaseOption,
    includeAll: true,
    icon: `${iconBaseUrl}Static.svg`,
  },
  {
    name: '自动选择',
    baseOption: urlTestBaseOption,
    includeAll: true,
    icon: `${iconBaseUrl}Auto.svg`,
  },
  {
    name: '负载均衡',
    baseOption: loadBalanceBaseOption,
    includeAll: true,
    icon: `${iconBaseUrl}RoundRobin.svg`,
  },
];

// 定义分流策略组配置 (保持 Annximihomo.js 原有条目与规则)
const serviceConfigs = [
  ...baseGroups,
  {
    name: 'FCM',
    baseOption: selectBaseOption,
    direct: true,
    providers: {
      googlefcm: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/googlefcm.mrs`,
        path: './ruleset/googlefcm.mrs',
        'path-in-bundle': 'geo/geosite/googlefcm.mrs',
      },
    },
    icon: `${iconBaseUrl}Fcm.svg`,
    rules: ['RULE-SET,googlefcm,FCM'],
  },
  {
    name: 'YouTube',
    baseOption: selectBaseOption,
    providers: {
      youtube: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/youtube.mrs`,
        path: './ruleset/youtube.mrs',
        'path-in-bundle': 'geo/geosite/youtube.mrs',
      },
    },
    icon: `${iconBaseUrl}YouTube.svg`,
    rules: ['RULE-SET,youtube,YouTube'],
  },
  {
    name: 'AI',
    baseOption: selectBaseOption,
    defaultSelected: '美国',
    providers: {
      ai: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/category-ai-!cn.mrs`,
        path: './ruleset/ai.mrs',
        'path-in-bundle': 'geo/geosite/category-ai-!cn.mrs',
      },
    },
    icon: `${iconBaseUrl}OpenAI.svg`,
    rules: [
      'RULE-SET,ai,AI',
      'DOMAIN,cdn.usefathom.com,AI',
      'DOMAIN-SUFFIX,intercom.io,AI',
      'DOMAIN-SUFFIX,intercomcdn.com,AI',
    ],
  },
  {
    name: 'Google',
    baseOption: selectBaseOption,
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
        path: './ruleset/google_ip.mrs',
        'path-in-bundle': 'geo/geoip/google.mrs',
      },
    },
    icon: `${iconBaseUrl}Google.svg`,
    rules: ['RULE-SET,google,Google'],
    ipRules: ['RULE-SET,google_ip,Google'],
  },
  {
    name: 'Twitter',
    baseOption: selectBaseOption,
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
        path: './ruleset/twitter_ip.mrs',
        'path-in-bundle': 'geo/geoip/twitter.mrs',
      },
    },
    icon: `${iconBaseUrl}Twitter.svg`,
    rules: ['RULE-SET,twitter,Twitter'],
    ipRules: ['RULE-SET,twitter_ip,Twitter'],
  },
  {
    name: 'Telegram',
    baseOption: selectBaseOption,
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
        path: './ruleset/telegram_ip.mrs',
        'path-in-bundle': 'geo/geoip/telegram.mrs',
      },
    },
    icon: `${iconBaseUrl}Telegram.svg`,
    rules: ['RULE-SET,telegram,Telegram'],
    ipRules: ['RULE-SET,telegram_ip,Telegram'],
  },
  {
    name: 'Meta',
    baseOption: selectBaseOption,
    providers: {
      meta: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/meta.mrs`,
        path: './ruleset/meta.mrs',
        'path-in-bundle': 'geo/geosite/meta.mrs',
      },
      instagram: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/instagram.mrs`,
        path: './ruleset/instagram.mrs',
        'path-in-bundle': 'geo/geosite/instagram.mrs',
      },
    },
    icon: `${iconBaseUrl}Meta.svg`,
    rules: ['RULE-SET,meta,Meta', 'RULE-SET,instagram,Meta'],
  },
  {
    name: 'TikTok',
    baseOption: selectBaseOption,
    defaultSelected: '日本',
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
        path: './ruleset/tiktok_ip.mrs',
        'path-in-bundle': 'geo/geoip/tiktok.mrs',
      },
    },
    icon: `${iconBaseUrl}TikTok.svg`,
    rules: ['RULE-SET,tiktok,TikTok'],
    ipRules: ['RULE-SET,tiktok_ip,TikTok'],
  },
  {
    name: 'Emby',
    baseOption: selectBaseOption,
    providers: {
      emby: {
        ...ruleProviderCommonDomain,
        url: 'https://cdn.jsdmirror.com/gh/666OS/rules@release/mihomo/domain/Emby.mrs',
        path: './ruleset/emby.mrs',
        'path-in-bundle': 'geo/geosite/category-emby.mrs',
      },
      emos: {
        ...ruleProviderCommonDomain,
        url: 'https://cdn.jsdmirror.com/gh/binaryu/emos-proxy-rule@main/rules/emos-mihomo.mrs',
        path: './ruleset/emos.mrs',
        'path-in-bundle': 'geo/geosite/category-emby.mrs',
      },
    },
    icon: `${iconBaseUrl}Emby.svg`,
    rules: [>
      'RULE-SET,emby,Emby',
      'RULE-SET,emos,Emby',
      'DOMAIN-SUFFIX,mb3admin.com,Emby',
      'DOMAIN-SUFFIX,nubebelle.com,Emby',
      'DOMAIN-KEYWORD,emby,Emby',
      'PROCESS-NAME,com.mb.android,Emby',
      'PROCESS-NAME,tv.emby.embyatv,Emby',
      'PROCESS-NAME,com.hush.yamby,Emby',
      'PROCESS-NAME,com.jellycine.app,Emby',
      'PROCESS-NAME,com.mountains.hills,Emby',
      'PROCESS-NAME,RodelPlayer.App.exe,Emby',
      'PROCESS-NAME,com.feifeiduck.capyplayer,Emby',
    ],
  },
  {
    name: 'EHentai',
    baseOption: selectBaseOption,
    defaultSelected: '美国',
    providers: {
      ehentai: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/ehentai.mrs`,
        path: './ruleset/ehentai.mrs',
        'path-in-bundle': 'geo/geosite/ehentai.mrs',
      },
    },
    icon: `${iconBaseUrl}EHentai.svg`,
    rules: ['RULE-SET,ehentai,EHentai'],
  },
  {
    name: 'AdBlock',
    baseOption: selectBaseOption,
    reject: true,
    providers: {
      'category-ads': {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/category-ads.mrs`,
        path: './ruleset/category-ads.mrs',
        'path-in-bundle': 'geo/geosite/category-ads.mrs',
      },
    },
    icon: `${iconBaseUrl}AdBlock.svg`,
    rules: ['RULE-SET,category-ads,AdBlock'],
  },
];

/**
 * 适配 Bettbox 策略组开关
 * 声明哪些开关属于策略组：基础策略组 + 全部分流策略组。
 */
Compatible_With_Bettbox.policyGroupOptions = serviceConfigs.map((svc) => svc.name);

// --- 节点过滤、重命名及验证 ---

/**
 * 零宽/不可见字符清洗机制
 */
const invisibleCharsRegex = /[\u00AD\u180E\u200B\u200E\u200F\u202A-\u202E\u2060-\u206F\uFEFF\u115F\u1160\u3164\uFFA0]/g;

function toMatchableName(name) {
  return typeof name === 'string' ? name.replace(invisibleCharsRegex, '') : name;
}

const regionMatchCache = new Map();
function getMatchedRegions(proxyName) {
  if (regionMatchCache.has(proxyName)) {
    return regionMatchCache.get(proxyName);
  }

  const matchableName = toMatchableName(proxyName);
  const regions = allRegionDefinitions.filter((region) => region.regex.test(matchableName));
  regionMatchCache.set(proxyName, regions);

  return regions;
}

const flagRegex = /[\u{1F1E6}-\u{1F1FF}]{2}/u;
function normalizeProxyName(proxy) {
  const originalName = proxy.name;
  const flag = originalName.match(flagRegex)?.[0];
  const nameWithoutFlag = (flag ? originalName.replace(flag, '') : originalName).replace(/\s+/g, ' ').trim();
  const matchedRegions = getMatchedRegions(originalName);
  const regionFlag = flag || matchedRegions.find((region) => region.flag)?.flag;
  const normalizedName = regionFlag ? `${regionFlag} ${nameWithoutFlag}` : nameWithoutFlag;

  if (normalizedName !== originalName) {
    regionMatchCache.set(normalizedName, matchedRegions);
  }

  return normalizedName === originalName ? proxy : { ...proxy, name: normalizedName };
}

function getIpVersionPreference() {
  const ipv4PreferEnabled = ruleOptionsEnable.代理IPV4优先;
  const ipv6PreferEnabled = ruleOptionsEnable.代理IPV6优先;

  if (ipv4PreferEnabled && !ipv6PreferEnabled) return 'ipv4-prefer';
  if (ipv6PreferEnabled && !ipv4PreferEnabled) return 'ipv6-prefer';
  return null;
}

function filterAndNormalizeProxies(config) {
  regionMatchCache.clear();

  const filterLowRateProxiesEnabled = ruleOptionsEnable.过滤低倍率节点;
  const filterHighRateProxiesEnabled = ruleOptionsEnable.过滤高倍率节点;
  const filterNonRegionProxiesEnabled = ruleOptionsEnable.过滤非地区节点;

  const lowRateRegex = filterLowRateProxiesEnabled
    ? rateRegionDefinitions.find((r) => r.name === lowRateRegionName)?.regex
    : null;
  const highRateRegex = filterHighRateProxiesEnabled
    ? rateRegionDefinitions.find((r) => r.name === highRateRegionName)?.regex
    : null;

  const originalProxies = config.proxies || [];

  const filteredRawProxies = originalProxies.filter((proxy) => {
    const type = String(proxy.type ?? '').toLowerCase();
    if (type === 'direct' || type === 'reject' || type === 'rematch') return false;

    const matchableName = toMatchableName(proxy.name);

    if (lowRateRegex?.test(matchableName) || highRateRegex?.test(matchableName)) return false;

    if (!filterNonRegionProxiesEnabled) return true;

    const isRegionProxy = getMatchedRegions(proxy.name).some((region) => regionDefinitions.includes(region));

    return isRegionProxy || !excludeFilter.test(matchableName);
  });

  const normalizedProxies = [];
  const uniqueNames = new Set();

  for (const rawProxy of filteredRawProxies) {
    const normalized = normalizeProxyName(rawProxy);
    if (!uniqueNames.has(normalized.name)) {
      uniqueNames.add(normalized.name);
      normalizedProxies.push(normalized);
    }
  }

  if (!normalizedProxies.length) {
    throw new Error('配置文件中未找到任何代理节点，请使用有效的订阅进行覆写');
  }

  const ipVersionPreference = getIpVersionPreference();
  if (ipVersionPreference) {
    return normalizedProxies.map((proxy) =>
      proxy['ip-version'] === ipVersionPreference ? proxy : { ...proxy, 'ip-version': ipVersionPreference },
    );
  }

  return normalizedProxies;
}

// --- 构建地区组和倍率组 ---

function createRegionGroup(name, icon, proxies) {
  const generateRegionAutoSelectEnabled = ruleOptionsEnable.生成地区自动选择组;
  const hideManualSelectGroupEnabled = ruleOptionsEnable.隐藏地区手动选择组;

  if (generateRegionAutoSelectEnabled) {
    const urlTestName = `${name}-自动选择`;
    return [
      {
        ...urlTestBaseOption,
        name: urlTestName,
        proxies,
      },
      {
        ...selectBaseOption,
        name,
        icon,
        proxies: [...proxies, urlTestName],
        hidden: hideManualSelectGroupEnabled,
      },
    ];
  }
  return [
    {
      ...selectBaseOption,
      name,
      icon,
      proxies,
      hidden: hideManualSelectGroupEnabled,
    },
  ];
}

function buildRegionGroups(filteredProxies, customProxies = []) {
  const generateRateGroupEnabled = ruleOptionsEnable.生成倍率组;
  const generateHomeGroupEnabled = ruleOptionsEnable.生成家宽节点组;

  const regionGroups = Object.fromEntries(allRegionDefinitions.map(({ name }) => [name, []]));
  const otherProxies = [];

  for (const proxy of [...filteredProxies, ...customProxies]) {
    const matchedRegions = getMatchedRegions(proxy.name);
    const isRegionProxy = matchedRegions.some((region) => regionDefinitions.includes(region));

    for (const region of matchedRegions) {
      regionGroups[region.name].push(proxy.name);
    }

    if (!isRegionProxy) {
      otherProxies.push(proxy.name);
    }
  }

  const generatedRegionGroups = allRegionDefinitions
    .filter(
      (r) =>
        regionGroups[r.name].length > 0 &&
        (generateRateGroupEnabled || !rateRegionDefinitions.includes(r)) &&
        (generateHomeGroupEnabled || !homeRegionDefinitions.includes(r)),
    )
    .flatMap((r) => createRegionGroup(r.name, r.icon, regionGroups[r.name]));

  if (otherProxies.length > 0) {
    generatedRegionGroups.push(...createRegionGroup('其它节点', `${iconBaseUrl}WorldMap.svg`, otherProxies));
  }

  return generatedRegionGroups;
}

// --- 构建自定义节点组 ---

function buildCustomizeGroups(filteredProxies, customizeList = customizeProxies) {
  if (!customizeList.length) {
    return { customProxies: [], customProxyNames: [], customGroup: null };
  }

  const usedNames = new Set(filteredProxies.map((p) => p.name));
  const customPrefix = '自建-';
  const customProxies = [];

  for (const proxy of customizeList) {
    const normalized = normalizeProxyName(proxy);
    let name = normalized.name;
    while (usedNames.has(name)) {
      name = normalizeProxyName({ name: `${customPrefix}${name}` }).name.replace(`${customPrefix} `, customPrefix);
    }
    usedNames.add(name);

    const customProxy = name === normalized.name ? normalized : { ...normalized, name };
    customProxies.push(customProxy);
  }

  const customProxyNames = customProxies.map((p) => p.name);
  const customGroup = {
    ...selectBaseOption,
    name: '自建节点',
    proxies: customProxyNames,
    icon: `${iconBaseUrl}Server.svg`,
  };

  return {
    customProxies,
    customProxyNames,
    customGroup,
  };
}

// --- 构建基础策略组和分流策略组 ---

function buildFunctionalGroups(filteredProxies, generatedRegionGroups, customizeInfo) {
  const minimalModeEnabled = ruleOptionsEnable.极简模式;
  const addAllNodesToServiceGroupsEnabled = ruleOptionsEnable.分流组添加所有节点;
  const hideManualSelectGroupEnabled = ruleOptionsEnable.隐藏地区手动选择组;

  const functionalGroups = [];
  const functionalRules = [];
  const functionalIpRules = [];
  const finalRuleProviders = { ...baseRuleProviders };

  const { customProxyNames = [], customGroup = null } = customizeInfo || {};
  const filteredProxyNames = filteredProxies.map((p) => p.name);
  const allProxiesNames = [...filteredProxyNames, ...customProxyNames];
  const groupNamesOfSelect = generatedRegionGroups.filter((g) => g.type === 'select').map((g) => g.name);
  const baseGroupNames = baseGroups.filter((g) => ruleOptionsEnable[g.name]).map((g) => g.name);
  const customGroupNames = customGroup ? [customGroup.name] : [];

  if (minimalModeEnabled) {
    const autoSelectGroupEnabled = ruleOptionsEnable.自动选择;
    const finalRuleProviders = { ...baseRuleProviders };

    const defaultGroup = {
      ...selectBaseOption,
      name: '默认代理',
      proxies: [...allProxiesNames, ...(autoSelectGroupEnabled ? ['自动选择'] : [])],
      icon: `${iconBaseUrl}Proxy.svg`,
    };

    const autoSelectGroup = {
      ...urlTestBaseOption,
      name: '自动选择',
      proxies: allProxiesNames,
      hidden: true,
    };

    const directGroup = {
      ...selectBaseOption,
      name: '直连',
      proxies: [...directProxies.map((p) => p.name)],
      icon: `${iconBaseUrl}China.svg`,
      hidden: true,
    };

    const globalGroup = {
      ...selectBaseOption,
      name: 'GLOBAL',
      proxies: [
        '默认代理',
        ...customGroupNames,
        ...(autoSelectGroupEnabled ? [autoSelectGroup.name] : []),
        '直连',
      ],
      icon: `${iconBaseUrl}Global.svg`,
    };

    return {
      globalGroup,
      functionalGroups: [defaultGroup, ...(autoSelectGroupEnabled ? [autoSelectGroup] : [])],
      functionalRules: [],
      functionalIpRules: [],
      finalRuleProviders,
      directGroup,
    };
  }

  functionalGroups.push({
    ...selectBaseOption,
    name: '默认代理',
    proxies: [...groupNamesOfSelect, ...baseGroupNames, ...customGroupNames],
    icon: `${iconBaseUrl}Proxy.svg`,
  });

  const orderedServiceConfigs = [
    ...serviceConfigs.filter((svc) => svc.name === 'AdBlock'),
    ...serviceConfigs.filter((svc) => svc.name !== 'AdBlock'),
  ];

  for (const svc of orderedServiceConfigs) {
    if (!ruleOptionsEnable[svc.name]) continue;

    functionalRules.push(...(svc.rules || []));
    functionalIpRules.push(...(svc.ipRules || []));
    Object.assign(finalRuleProviders, svc.providers || {});
  }

  for (const svc of serviceConfigs) {
    if (!ruleOptionsEnable[svc.name]) continue;

    let groupProxies = [];
    if (svc.includeAll) {
      groupProxies = [...allProxiesNames];
    } else if (svc.reject) {
      groupProxies = ['REJECT', 'REJECT-DROP', 'PASS'];
    } else {
      groupProxies = !addAllNodesToServiceGroupsEnabled
        ? ['默认代理', ...customGroupNames, ...baseGroupNames, ...groupNamesOfSelect, ...(svc.direct ? ['直连'] : [])]
        : [
            '默认代理',
            ...customGroupNames,
            ...baseGroupNames,
            ...groupNamesOfSelect,
            ...allProxiesNames,
            ...(svc.direct ? ['直连'] : []),
          ];
    }

    functionalGroups.push({
      ...svc.baseOption,
      name: svc.name,
      icon: svc.icon,
      proxies: groupProxies,
      ...(svc.defaultSelected !== undefined && {
        'default-selected': svc.defaultSelected,
      }),
    });
  }

  functionalGroups.push({
    ...selectBaseOption,
    name: '直连',
    proxies: [...directProxies.map((p) => p.name)],
    icon: `${iconBaseUrl}China.svg`,
    hidden: hideManualSelectGroupEnabled,
  });

  const globalGroup = {
    ...selectBaseOption,
    name: 'GLOBAL',
    proxies: [
      ...functionalGroups.map((g) => g.name),
      ...customGroupNames,
      '直连',
      ...generatedRegionGroups.map((g) => g.name),
    ],
    icon: `${iconBaseUrl}Global.svg`,
  };

  return {
    globalGroup,
    functionalGroups,
    functionalRules,
    functionalIpRules,
    finalRuleProviders,
    directGroup: {
      ...selectBaseOption,
      name: '直连',
      proxies: [...directProxies.map((p) => p.name)],
      icon: `${iconBaseUrl}China.svg`,
      hidden: hideManualSelectGroupEnabled,
    },
  };
}

// --- dns 和 hosts 相关处理 ---

// 常见的公共 DNS，用于过滤订阅中的公共 DNS
const commonDnsList = [
  // ==================== 国内 ====================
  '223.5.5.5',
  '223.6.6.6',
  '2400:3200::1',
  '2400:3200:baba::1',
  'alidns',
  '119.29.29.29',
  '119.28.28.28',
  '182.254.116.116',
  '182.254.118.118',
  '1.12.12.12',
  '120.53.53.53',
  '2402:4e00::',
  'doh.pub',
  'dot.pub',
  'dns.pub',
  'dnspod',
  '114.114.114.114',
  '114.114.115.115',
  '114.114.114.119',
  '114.114.115.119',
  '114.114.114.110',
  '114.114.115.110',
  '180.76.76.76',
  '2400:da00::6666',
  'dns.baidu',
  '1.2.4.8',
  '210.2.4.8',
  '2001:dc7:1000::1',
  'cnnic',
  '101.226.4.6',
  '218.30.118.6',
  '123.125.81.6',
  '140.207.198.6',
  '2400:8800:1::6',
  '2400:8800:2::6',
  'doh.360',
  'dot.360',
  'dns.360',
  '180.184.1.1',
  '180.184.2.2',
  '117.50.11.11',
  '117.50.22.22',
  '52.80.66.66',
  '117.50.10.10',
  '52.80.52.52',
  '117.50.60.30',
  '52.80.60.30',
  'onedns.net',
  '101.6.6.6',
  '2001:da8::666',
  '240c::6666',
  '240c::6644',
  '202.141.162.123',
  '202.141.178.13',

  // ==================== 国外 ====================
  '1.1.1.1',
  '1.0.0.1',
  '1.1.1.2',
  '1.0.0.2',
  '1.1.1.3',
  '1.0.0.3',
  '2606:4700:4700::1111',
  '2606:4700:4700::1001',
  '2606:4700:4700::1112',
  '2606:4700:4700::1002',
  '2606:4700:4700::1113',
  '2606:4700:4700::1003',
  'dns.cloudflare',
  'cloudflare-dns',
  'one.one.one.one',
  '8.8.8.8',
  '8.8.4.4',
  '2001:4860:4860::8888',
  '2001:4860:4860::8844',
  'dns.google',
  '9.9.9.9',
  '9.9.9.10',
  '9.9.9.11',
  '149.112.112.112',
  '149.112.112.10',
  '149.112.112.11',
  '2620:fe::fe',
  '2620:fe::9',
  'quad9',
  '208.67.222.222',
  '208.67.220.220',
  '208.67.222.123',
  '208.67.220.123',
  '2620:119:35::35',
  '2620:119:53::53',
  '2620:119:35::123',
  '2620:119:53::123',
  'opendns',
  '94.140.14.14',
  '94.140.15.15',
  '94.140.14.15',
  '94.140.15.16',
  '2a10:50c0::ad1:ff',
  '2a10:50c0::ad2:ff',
  '2a10:50c0::bad1:ff',
  '2a10:50c0::bad2:ff',
  'adguard',
  '76.76.2.0',
  '76.76.10.0',
  '76.76.19.19',
  '76.223.122.150',
  '185.228.168.9',
  '185.228.169.9',
  '185.228.168.10',
  '185.228.169.11',
  '185.228.168.168',
  '185.228.169.168',
  '2a0d:2a00:1::2',
  '2a0d:2a00:2::2',
  '77.88.8.8',
  '77.88.8.1',
  '2a02:6b8::feed:0ff',
  '2a02:6b8:0:1::feed:0ff',
  '156.154.70.1',
  '156.154.71.1',
  '156.154.70.2',
  '156.154.71.2',
  '2610:a1:1018::1',
  '2610:a1:1019::1',
  '194.242.2.2',
  '2a07:e340::2',
  '74.82.42.42',
  '2001:470:20::2',
  'nextdns',
  'dns.apple',
];

// 预编译公共 DNS 正则
const commonDnsRegex = new RegExp(
  commonDnsList.map((dns) => dns.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
  'i',
);

// 国内外 DNS 定义 (保留 Annximihomo.js 特性配置)
const chinaDNS = [
  'https://dns.alidns.com/dns-query#DIRECT',
  'https://doh.pub/dns-query#DIRECT',
  'https://doh.360.cn/dns-query#DIRECT',
];
const foreignDNS = [
  'https://cloudflare-dns.com/dns-query#默认代理',
  'https://dns.google/dns-query#默认代理',
  'https://unfiltered.adguard-dns.com/dns-query#默认代理',
];
const defaultDNS = [
  'tls://223.5.5.5#DIRECT',
  'tls://119.29.29.29#DIRECT',
  'https://1.12.12.12/dns-query#DIRECT',
  'https://223.5.5.5/dns-query#DIRECT',
  'https://120.53.53.53/dns-query#DIRECT',
];
const proxyServerDNS = [
  'tls://223.5.5.5#DIRECT',
  'tls://119.29.29.29#DIRECT',
  'https://1.12.12.12/dns-query#DIRECT',
  'https://223.5.5.5/dns-query#DIRECT',
  'https://120.53.53.53/dns-query#DIRECT',
];

function hostSpecificity(pattern) {
  if (pattern.startsWith('+.')) return 2;
  if (pattern.startsWith('.')) return 1;
  if (pattern.includes('*')) return 0;
  return 3;
}

function matchDomainPattern(pattern, domains) {
  pattern = pattern.toLowerCase();

  if (!pattern.includes('*') && !pattern.startsWith('+.') && !pattern.startsWith('.')) {
    return typeof domains === 'string'
      ? domains.toLowerCase() === pattern
      : [...domains].some((d) => d.toLowerCase() === pattern);
  }

  const domainList = typeof domains === 'string' ? [domains.toLowerCase()] : [...domains].map((d) => d.toLowerCase());

  if (pattern.startsWith('+.')) {
    const suffix = pattern.slice(2);
    return domainList.some((domain) => domain === suffix || domain.endsWith(`.${suffix}`));
  }

  if (pattern.startsWith('.')) {
    const suffix = pattern.slice(1);
    return domainList.some((domain) => domain !== suffix && domain.endsWith(`.${suffix}`));
  }

  const patternParts = pattern.split('.');
  return domainList.some((domain) => {
    const domainParts = domain.split('.');
    return (
      patternParts.length === domainParts.length &&
      patternParts.every((part, index) => part === '*' || part === domainParts[index])
    );
  });
}

function applyHostsToProxies(proxies, hosts) {
  if (!hosts || typeof hosts !== 'object') return proxies;

  const hostEntries = Object.entries(hosts)
    .filter(
      ([, value]) => (typeof value === 'string' && value.length > 0) || (Array.isArray(value) && value.length > 0),
    )
    .sort((a, b) => hostSpecificity(b[0]) - hostSpecificity(a[0]));

  if (hostEntries.length === 0) return proxies;

  const targetOf = (value) => {
    if (Array.isArray(value)) value = value.find((v) => typeof v === 'string' && v.length > 0);
    return typeof value === 'string' && value.length > 0 ? value : null;
  };

  const resolveCache = new Map();
  const resolve = (server) => {
    const cached = resolveCache.get(server);
    if (cached !== undefined) return cached;

    const seen = new Set();
    let current = server.toLowerCase();
    let result = server;
    while (!seen.has(current)) {
      seen.add(current);
      const entry = hostEntries.find(([pattern]) => matchDomainPattern(pattern, current));
      const target = entry && targetOf(entry[1]);
      if (!target) break;
      result = target;
      current = target.toLowerCase();
    }
    resolveCache.set(server, result);
    return result;
  };

  return proxies.map((proxy) => {
    if (typeof proxy.server !== 'string') return proxy;
    const server = resolve(proxy.server);
    return server === proxy.server ? proxy : { ...proxy, server };
  });
}

function stripDnsSuffix(dns) {
  const str = String(dns);
  const hashIndex = str.indexOf('#');
  if (hashIndex === -1) return str;

  const prefix = str.slice(0, hashIndex).trim();
  const suffix = str
    .slice(hashIndex + 1)
    .toLowerCase()
    .trim();

  if (suffix.includes('direct') || suffix.includes('直连')) return prefix + '#DIRECT';

  return prefix;
}

function isIpAddress(server) {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(server) || server.includes(':');
}

function simplifyDomainPolicy(policy) {
  const groups = new Map();

  for (const [domain, dns] of Object.entries(policy)) {
    const dnsKey = JSON.stringify(Array.isArray(dns) ? [...dns].sort() : dns);

    if (domain.startsWith('+.') || domain.startsWith('.') || domain.includes('*')) {
      groups.set(`keep:${domain}`, [{ domain, dns, dnsKey }]);
      continue;
    }

    const parts = domain.split('.');

    if (parts.length < 3) {
      groups.set(`keep:${domain}`, [{ domain, dns, dnsKey }]);
      continue;
    }

    const suffix = parts.slice(-2).join('.');

    if (!groups.has(suffix)) {
      groups.set(suffix, []);
    }

    groups.get(suffix).push({ domain, dns, dnsKey });
  }

  const result = {};

  for (const [suffix, domains] of groups) {
    const firstDnsKey = domains[0].dnsKey;
    const sameDns = domains.every(({ dnsKey }) => dnsKey === firstDnsKey);

    if (domains.length >= 2 && sameDns) {
      result[`+.${suffix}`] = domains[0].dns;
    } else {
      for (const { domain, dns } of domains) {
        result[domain] = dns;
      }
    }
  }

  return result;
}

function buildDnsAndHostsConfig(config, filteredProxies) {
  const minimalModeEnabled = ruleOptionsEnable.极简模式;
  const originalDnsConfig = config.dns || {};

  const proxyServerNameservers = originalDnsConfig['proxy-server-nameserver'] || [];
  const listenValue = originalDnsConfig['listen'];

  const shouldRewriteByHosts =
    proxyServerNameservers.length === 1 &&
    typeof listenValue === 'string' &&
    listenValue.length > 0 &&
    (proxyServerNameservers.some((dns) => String(dns).toLowerCase().includes(listenValue.toLowerCase())) ||
      (listenValue.includes('0.0.0.0') &&
        proxyServerNameservers.some((dns) => String(dns).toLowerCase().includes('127.0.0.1'))));

  const mappedProxies = shouldRewriteByHosts ? applyHostsToProxies(filteredProxies, config.hosts) : filteredProxies;

  const proxyDomains = new Set(
    mappedProxies
      .filter((proxy) => typeof proxy.server === 'string')
      .map((proxy) => proxy.server.toLowerCase())
      .filter((server) => !isIpAddress(server)),
  );

  const privateProxyServerNameservers = shouldRewriteByHosts ? [] : proxyServerNameservers;

  const isCommonDns = (dns) => {
    const value = String(dns).trim().toLowerCase();
    if (value === 'system' || value === 'system://') return true;
    return commonDnsRegex.test(value);
  };

  const privateDNS = [
    ...new Set(
      [...(originalDnsConfig['nameserver'] || []), ...privateProxyServerNameservers]
        .map(stripDnsSuffix)
        .filter((dns) => dns.length > 0 && !isCommonDns(dns)),
    ),
  ];

  const matchedProxyPolicy = {};
  for (const [domain, dns] of Object.entries({
    ...originalDnsConfig['nameserver-policy'],
    ...originalDnsConfig['proxy-server-nameserver-policy'],
  })) {
    if (!matchDomainPattern(domain, proxyDomains)) continue;

    const stripedDns = Array.isArray(dns) ? dns.map(stripDnsSuffix).filter((d) => d.length > 0) : stripDnsSuffix(dns);
    if (Array.isArray(stripedDns) && stripedDns.length === 0) continue;

    matchedProxyPolicy[domain] = stripedDns;
  }

  if (privateDNS.length > 0 && Object.keys(matchedProxyPolicy).length === 0) {
    for (const domain of proxyDomains) {
      matchedProxyPolicy[domain] = privateDNS;
    }
  }

  const matchedPolicyDomains = Object.keys(matchedProxyPolicy);
  const proxyServerPolicy =
    proxyDomains.size === matchedPolicyDomains.length &&
    matchedPolicyDomains.every((domain) => proxyDomains.has(domain.toLowerCase()))
      ? simplifyDomainPolicy(matchedProxyPolicy)
      : matchedProxyPolicy;

  const originalFakeIpFilter = originalDnsConfig['fake-ip-filter'] || [];
  const proxyFakeIpFilter = originalFakeIpFilter.filter((pattern) => {
    const p = String(pattern);
    return matchDomainPattern(p, proxyDomains);
  });

  const dns = {
    enable: true,
    ipv6: true,
    'use-hosts': true,
    'cache-algorithm': 'arc',
    'use-system-hosts': true,
    'enhanced-mode': 'fake-ip',
    'fake-ip-range': '198.18.0.1/15',
    'fake-ip-range6': '2001:2::1/48',
    'fake-ip-filter': [
      'rule-set:private',
      'rule-set:fakeip_filter',
      'rule-set:cn',
      ...(minimalModeEnabled ? [] : ruleOptionsEnable['FCM'] ? ['rule-set:googlefcm'] : []),
      ...proxyFakeIpFilter,
    ],
    'default-nameserver': defaultDNS,
    'proxy-server-nameserver': proxyServerDNS,
    ...(Object.keys(proxyServerPolicy).length > 0 && {
      'proxy-server-nameserver-policy': proxyServerPolicy,
    }),
    nameserver: foreignDNS,
    'nameserver-policy': {
      'rule-set:private': 'system',
      'rule-set:douyin': ['180.184.1.1', '180.184.2.2'],
      'rule-set:cn': chinaDNS,
    },
    'direct-nameserver': chinaDNS,
    'direct-nameserver-follow-policy': true,
  };

  const hosts = {
    'doh.pub': ['1.12.12.12', '120.53.53.53'],
    'cloudflare-dns.com': ['1.1.1.1', '1.0.0.1'],
    'dns.google': ['8.8.8.8', '8.8.4.4'],

    // 解决谷歌商店无法下载的问题
    'services.googleapis.cn': 'services.googleapis.com',

    // 屏蔽哔哩哔哩PCDN，解决访问视频/直播卡顿问题
    '+.mcdn.bilivideo.com': ['0.0.0.0'],
    '+.mcdn.bilivideo.cn': ['0.0.0.0'],
    '+.edge.mountaintoys.cn': ['0.0.0.0'],
    '+.h2.smtcdns.net': ['0.0.0.0'],
  };

  return { dns, hosts, proxies: mappedProxies };
}

// --- 主入口 ---

/**
 * 主入口：覆写机场订阅配置，生成完整 mihomo 配置
 */
function main(config) {
  if (config['proxy-providers'] && Object.keys(config['proxy-providers']).length > 0) {
    throw new Error('配置文件中包含 proxy-providers，请使用机场提供的配置文件进行覆写');
  }

  const newConfig = {};

  const filteredProxies = filterAndNormalizeProxies(config);
  const { customProxies, customProxyNames, customGroup } = buildCustomizeGroups(filteredProxies);
  const generatedRegionGroups = ruleOptionsEnable.极简模式 ? [] : buildRegionGroups(filteredProxies, customProxies);

  const {
    globalGroup,
    functionalGroups,
    functionalRules,
    functionalIpRules,
    finalRuleProviders,
    directGroup,
  } = buildFunctionalGroups(filteredProxies, generatedRegionGroups, { customProxyNames, customGroup });

  const { dns, hosts, proxies: mappedProxies } = buildDnsAndHostsConfig(config, filteredProxies);

  newConfig['mixed-port'] = 7890;
  newConfig['allow-lan'] = false;
  newConfig['bind-address'] = '127.0.0.1';
  newConfig['ipv6'] = true;
  newConfig['mode'] = 'rule';
  newConfig['log-level'] = 'info';
  newConfig['unified-delay'] = true;
  newConfig['tcp-concurrent'] = true;
  newConfig['find-process-mode'] = 'off';
  newConfig['keep-alive-idle'] = 600;
  newConfig['keep-alive-interval'] = 60;
  newConfig['geodata-mode'] = false;

  newConfig['external-controller'] = '127.0.0.1:9090';
  newConfig['external-ui'] = 'ui';
  newConfig['external-ui-url'] = 'https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip';

  newConfig['profile'] = {
    'store-selected': true,
    'store-fake-ip': true,
  };

  newConfig['dns'] = dns;
  newConfig['hosts'] = hosts;

  newConfig['ntp'] = {
    enable: true,
    'write-to-system': false,
    server: 'ntp.aliyun.com',
    port: 123,
    interval: 60,
  };

  newConfig['tun'] = {
    enable: true,
    stack: 'mips',
    'auto-route': true,
    'strict-route': true,
    'auto-redirect': true,
    'auto-detect-interface': true,
    'dns-hijack': ['any:53', 'tcp://any:53'],
  };

  newConfig['proxies'] = [...mappedProxies, ...customProxies, ...directProxies];
  newConfig['proxy-groups'] = [
    globalGroup,
    ...functionalGroups,
    ...(customGroup ? [customGroup] : []),
    ...generatedRegionGroups,
  ];
  newConfig['rule-providers'] = finalRuleProviders;

  newConfig['rules'] = [
    ...prefixRules,
    ...(ruleOptionsEnable.屏蔽国外QUIC ? blockForeignQuic : []),
    ...functionalRules,
    'RULE-SET,geolocation-!cn,默认代理',
    ...functionalIpRules,

    // 兜底规则
    'RULE-SET,cn_ip,直连',
    'RULE-SET,private_ip,直连',
    `MATCH,${ruleOptionsEnable.极简模式 ? '默认代理' : '默认代理'}`,
  ];

  return newConfig;
}