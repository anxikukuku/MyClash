/**
 * mihomo配置覆写脚本
 */

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
  手动选择: true, // 是否启用手动选择策略组
  自动选择: true, // 是否启用自动选择策略组
  自动回退: true, // 是否启用全局自动回退策略组
  负载均衡: true, // 是否启用负载均衡策略组

  // 以下为分流策略配置
  FCM: true, // GoogleFCM服务
  YouTube: true, // YouTube视频平台
  AI: true, // 国外AI服务
  Google: true, // Google服务
  Telegram: true, // Telegram通讯软件
  Twitter: true, // Twitter社交平台
  TikTok: true, // TikTok视频平台
  Meta: true, // Meta服务
  Emby: true, // Emby媒体服务
  EHentai: true, // E-Hentai网站
  AdBlock: true, // 广告拦截

  // 以下为非分流策略配置
  极简国内外分流模式: false, // 是否启用极简国内外分流模式
  生成地区自动选择组: false, // 是否为每个地区生成嵌套的自动测速组
  生成地区自动回退组: true, // 是否为每个地区生成嵌套的自动回退组
  生成地区负载均衡组: true, // 是否为每个地区生成嵌套的负载均衡组
  隐藏地区手动选择组: false, // 是否隐藏地区手动选择策略组
  分流组添加所有节点: false, // 是否为分流策略组添加所有节点
  生成高低倍率组: false, // 是否单独生成低倍率与高倍率节点策略组
  过滤低倍率节点: false, // 是否过滤低倍率节点
  过滤高倍率节点: false, // 是否过滤高倍率节点
  过滤非地区节点: true, // 是否过滤非地区节点
  屏蔽代理QUIC流量: false, // 是否屏蔽非国内目标的 QUIC 流量
  优先国内DNS加速: true, // 是否优先使用国内DNS解析默认未命中规则域名
  代理IPV4优先: false, // 是否将订阅节点统一为 IPv4 优先（与“代理IPV6优先”同时开启时不生效）
  代理IPV6优先: false, // 是否将订阅节点统一为 IPv6 优先（与“代理IPV4优先”同时开启时不生效）
};

// 定义前置规则
const prefixRules = [
  // 私有网络直连
  'RULE-SET,private,直连',
];

// 国内大厂与常用服务精细直连规则
const directRules = [
  'RULE-SET,geolocation-cn,直连',
  'RULE-SET,games_cn,直连',
  'RULE-SET,nvidia_cn,直连',
  'RULE-SET,apple_cn,直连',
  'RULE-SET,adobe_cn,直连',
  'RULE-SET,microsoft_cn,直连',
  'DOMAIN-SUFFIX,ctaiot.com,直连',
];

// 自定义节点定义
const customizeProxies = [];

// 定义全局排除节点的正则表达式，用于排除非地区节点
const excludeFilter =
  /群|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|电报|无法|说明|提示|访问|支持|教程|关注|更新|作者|加入|超时|收藏|优惠|福利|邀请|好友|失联|选择|剩余|公益|发布|DIZTNA|通路|登录|禁止|定时|渠道|牢记|永久|余额|阁下|本站|刷新|导航|建议|重置|以下|过滤|⚠️|@|t\.me\/\+|\bexpire\b|\bhttps?:\/\/|\.com|\btraffic\b/iu;

// 屏蔽代理QUIC流量
const blockForeignQuic = [
  'AND,((NETWORK,UDP),(DST-PORT,443),(NOT,((OR,((RULE-SET,cn),(RULE-SET,cn_ip,no-resolve)))))),REJECT',
];

// 直连节点
const directProxies = [
  {
    name: '🇨🇳 直连 | 双栈',
    type: 'direct',
  },
  {
    name: '🇨🇳 直连 | IPv4优先',
    type: 'direct',
    'ip-version': 'ipv4-prefer',
  },
  {
    name: '🇨🇳 直连 | IPv6优先',
    type: 'direct',
    'ip-version': 'ipv6-prefer',
  },
  {
    name: '🇨🇳 直连 | 仅IPv4',
    type: 'direct',
    'ip-version': 'ipv4',
  },
  {
    name: '🇨🇳 直连 | 仅IPv6',
    type: 'direct',
    'ip-version': 'ipv6',
  },
];

// 图标 URL 公共前缀
const iconBaseUrl = 'https://fastly.jsdelivr.net/gh/AIsouler/MyClash@main/Icons/svg/';
// 自动回退图标 URL
const fallbackIconUrl = 'https://raw.githubusercontent.com/aaANDkk/Qure_Style_SVG/main/icon/svg/common/Commerzbank.svg';

// 规则集 URL 公共前缀
const ruleSetBaseUrl = 'https://fastly.jsdelivr.net/gh/appshubcc/bett-rules@meta/geo/';

// 定义默认地区策略组
const regionDefinitions = [
  {
    name: '香港',
    flag: '🇭🇰',
    regex: /🇭🇰|香港|(?<![A-Za-z])HKG?(?![A-Za-z])|hong\s*kong/i,
    icon: `${iconBaseUrl}HongKong.svg`,
    default: true,
  },
  {
    name: '台湾',
    flag: '🇹🇼',
    regex: /🇹🇼|台湾|台北|高雄|(?<![A-Za-z])TWN?(?![A-Za-z])|taiwan/i,
    icon: `${iconBaseUrl}Taiwan.svg`,
    default: true,
  },
  {
    name: '日本',
    flag: '🇯🇵',
    regex: /🇯🇵|日本|东京|大阪|京都|(?<![A-Za-z])JPN?(?![A-Za-z])|japan/i,
    icon: `${iconBaseUrl}Japan.svg`,
    default: true,
  },
  {
    name: '新加坡',
    flag: '🇸🇬',
    regex: /🇸🇬|新加坡|狮城|(?<![A-Za-z])SGP?(?![A-Za-z])|singapore/i,
    icon: `${iconBaseUrl}Singapore.svg`,
    default: true,
  },
  {
    name: '美国',
    flag: '🇺🇸',
    regex:
      /🇺🇸|美国|纽约|洛杉矶|旧金山|芝加哥|休斯顿|迈阿密|西雅图|波士顿|华盛顿|拉斯维加斯|圣何塞|(?<![A-Za-z])USA?(?![A-Za-z])|america|united\s*states/i,
    icon: `${iconBaseUrl}America.svg`,
    default: true,
  },
  {
    name: '韩国',
    flag: '🇰🇷',
    regex:
      /🇰🇷|(?<!北)(?:韩国|南韩)|首尔|汉城|仁川|春川|釜山|大邱|大田|光州|济州|(?<![A-Za-z])(?:KR|KOR|ICN|(?<!North\s*)(?<!NORTH\s*)(?:[Kk]orea|KOREA)(?:n|N)?|[Ss]eoul|SEOUL|[Ii]ncheon|INCHEON|[Cc]huncheon|CHUNCHEON|[Bb]usan|BUSAN|[Pp]usan|PUSAN|[Jj]eju|JEJU)(?![A-Za-z])/,
    icon: `${iconBaseUrl}SouthKorea.svg`,
    default: false,
  },
];

// 解析 Bettbox 自定义扩展地区
const customRegionDefinitions =
  typeof bettboxCustomRegions !== 'undefined' && Array.isArray(bettboxCustomRegions)
    ? bettboxCustomRegions
        .filter((r) => r && typeof r.name === 'string' && typeof r.regex === 'string')
        .map((r) => {
          let reg;
          try {
            const match = r.regex.match(/^\/(.+)\/([a-z]*)$/i);
            if (match) {
              const flags = match[2].includes('i') ? match[2] : `${match[2]}i`;
              reg = new RegExp(match[1], flags);
            } else {
              reg = new RegExp(r.regex, 'i');
            }
          } catch {
            reg = new RegExp(r.name, 'i');
          }
          return {
            name: r.name,
            regex: reg,
            icon: typeof r.icon === 'string' && r.icon ? r.icon : `${iconBaseUrl}WorldMap.svg`,
          };
        })
    : [];

const allAvailableRegions = [...regionDefinitions, ...customRegionDefinitions];

const enabledRegionNames =
  typeof bettboxRegions !== 'undefined' && Array.isArray(bettboxRegions) ? new Set(bettboxRegions) : null;
const activeRegionDefinitions = allAvailableRegions.filter((region) =>
  enabledRegionNames ? enabledRegionNames.has(region.name) : region.default !== false,
);

// 高低倍率策略组定义
const lowRateRegionName = '低倍率节点';
const highRateRegionName = '高倍率节点';

const rateRegionDefinitions = [
  {
    name: lowRateRegionName,
    regex:
      /^(?!.*(?:剩|期)).*(?:(?<![\d.])0(\.[0-5]|[*×✕✖⨯⨉x倍]))|(?:[*×✕✖⨯⨉x]0)|^(?!.*(?:客户端|软件)).*下载|低倍|免费|(?<![A-Za-z])free(?![A-Za-z])/i,
    icon: `${iconBaseUrl}Auto.svg`,
  },
  {
    name: highRateRegionName,
    regex:
      /(?:[*×✕✖⨯⨉x](?:[2-9]\d*|[1-9]\d+)(?:\.\d+)?)|(?:(?<![\d.])(?:[2-9]\d*|[1-9]\d+)(?:\.\d+)?(?:倍|[*×✕✖⨯⨉x]))/i,
    icon: `${iconBaseUrl}Static.svg`,
  },
];

const allRegionDefinitions = [...activeRegionDefinitions, ...rateRegionDefinitions];

// Rule Providers 通用配置
const ruleProviderCommonDomain = {
  type: 'http',
  format: 'mrs',
  interval: 86400,
  behavior: 'domain',
};
const ruleProviderCommonIpcidr = {
  type: 'http',
  format: 'mrs',
  interval: 86400,
  behavior: 'ipcidr',
};

// 定义基础 Rule Providers
const baseRuleProviders = {
  // --- 直连规则集 ---
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
  games_cn: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/category-games@cn.mrs`,
    path: './ruleset/category-games@cn.mrs',
    'path-in-bundle': 'geo/geosite/category-games@cn.mrs',
  },
  nvidia_cn: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/nvidia@cn.mrs`,
    path: './ruleset/nvidia@cn.mrs',
    'path-in-bundle': 'geo/geosite/nvidia@cn.mrs',
  },
  apple_cn: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/apple@cn.mrs`,
    path: './ruleset/apple@cn.mrs',
    'path-in-bundle': 'geo/geosite/apple@cn.mrs',
  },
  adobe_cn: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/adobe@cn.mrs`,
    path: './ruleset/adobe@cn.mrs',
    'path-in-bundle': 'geo/geosite/adobe@cn.mrs',
  },
  microsoft_cn: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/microsoft@cn.mrs`,
    path: './ruleset/microsoft@cn.mrs',
    'path-in-bundle': 'geo/geosite/microsoft@cn.mrs',
  },
  'geolocation-cn': {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/geolocation-cn.mrs`,
    path: './ruleset/geolocation-cn.mrs',
    'path-in-bundle': 'geo/geosite/geolocation-cn.mrs',
  },
  cn_ip: {
    ...ruleProviderCommonIpcidr,
    url: `${ruleSetBaseUrl}geoip/cn.mrs`,
    path: './ruleset/cn_ip.mrs',
    'path-in-bundle': 'geo/geoip/cn.mrs',
  },

  // --- 代理规则集 ---
  'geolocation-!cn': {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/geolocation-!cn.mrs`,
    path: './ruleset/geolocation-!cn.mrs',
    'path-in-bundle': 'geo/geosite/geolocation-!cn.mrs',
  },

  // --- 其他规则集 ---
  fakeip_filter: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/fakeip-filter.mrs`,
    path: './ruleset/fakeip-filter.mrs',
    'path-in-bundle': 'geo/geosite/fakeip-filter.mrs',
  },
  connectcheck: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/connectivity-check.mrs`,
    path: './ruleset/connectivity-check.mrs',
    'path-in-bundle': 'geo/geosite/connectivity-check.mrs',
  },
  cn: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/cn.mrs`,
    path: './ruleset/cn.mrs',
    'path-in-bundle': 'geo/geosite/cn.mrs',
  },
  douyin: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/douyin.mrs`,
    path: './ruleset/douyin.mrs',
    'path-in-bundle': 'geo/geosite/douyin.mrs',
  },
};

// 策略组公共配置
const groupBaseOption = {
  interval: 600,
  timeout: 3000,
  url: 'https://www.apple.com/library/test/success.html',
  lazy: true,
  'max-failed-times': 3,
  'empty-fallback': 'REJECT',
};

const selectBaseOption = {
  ...groupBaseOption,
  type: 'select',
};

const urlTestBaseOption = {
  ...groupBaseOption,
  type: 'url-test',
  tolerance: 50,
  'exclude-type': 'DIRECT',
  icon: `${iconBaseUrl}Auto.svg`,
  hidden: true,
};

const fallbackBaseOption = {
  ...groupBaseOption,
  type: 'fallback',
  'exclude-type': 'DIRECT',
  icon: fallbackIconUrl,
  hidden: true,
};

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
    name: '自动回退',
    baseOption: fallbackBaseOption,
    includeAll: true,
    icon: fallbackIconUrl,
  },
  {
    name: '负载均衡',
    baseOption: loadBalanceBaseOption,
    includeAll: true,
    icon: `${iconBaseUrl}RoundRobin.svg`,
  },
];

// 定义分流策略组配置
const serviceConfigs = [
  ...baseGroups,
  {
    name: 'FCM',
    baseOption: selectBaseOption,
    onlyDefaultAndDirect: true,
    direct: true,
    defaultSelected: '直连',
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
    name: 'Meta',
    baseOption: selectBaseOption,
    providers: {
      meta: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/meta.mrs`,
        path: './ruleset/meta.mrs',
        'path-in-bundle': 'geo/geosite/meta.mrs',
      },
      facebook_ip: {
        ...ruleProviderCommonIpcidr,
        url: `${ruleSetBaseUrl}geoip/facebook.mrs`,
        path: './ruleset/facebook_ip.mrs',
        'path-in-bundle': 'geo/geoip/facebook.mrs',
      },
    },
    icon: `${iconBaseUrl}Meta.svg`,
    rules: ['RULE-SET,meta,Meta'],
    ipRules: ['RULE-SET,facebook_ip,Meta'],
  },
  {
    name: 'Emby',
    baseOption: selectBaseOption,
    direct: true,
    providers: {
      emby: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/category-emby.mrs`,
        path: './ruleset/emby.mrs',
        'path-in-bundle': 'geo/geosite/category-emby.mrs',
      },
    },
    icon: `${iconBaseUrl}Emby.svg`,
    rules: [
      'RULE-SET,emby,Emby',
      'DOMAIN-SUFFIX,mb3admin.com,Emby',
      'DOMAIN-SUFFIX,nubebelle.com,Emby',
      'DOMAIN-KEYWORD,emby,Emby',
    ],
  },
  {
    name: 'EHentai',
    baseOption: selectBaseOption,
    direct: true,
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
    priority: true,
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

// 适配 Bettbox 策略组开关与排序/自定义路由
Compatible_With_Bettbox.policyGroupOptions = serviceConfigs.map((svc) => svc.name);
const customRoutes = typeof bettboxRoutes !== 'undefined' && Array.isArray(bettboxRoutes) ? bettboxRoutes : [];
const groupOrder = typeof bettboxOrder !== 'undefined' && Array.isArray(bettboxOrder) ? bettboxOrder : [];

// --- 节点过滤、重命名及验证 ---

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

function fixDialerProxy(proxy, renameMap, normalizedProxyNames) {
  const target = proxy['dialer-proxy'];
  if (!target) return proxy;

  if (renameMap.has(target)) {
    return { ...proxy, 'dialer-proxy': renameMap.get(target) };
  }

  if (normalizedProxyNames.has(target)) {
    return proxy;
  }

  const copy = { ...proxy };
  delete copy['dialer-proxy'];
  return copy;
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

    const isRegionProxy = getMatchedRegions(proxy.name).some((region) => activeRegionDefinitions.includes(region));

    return isRegionProxy || !excludeFilter.test(matchableName);
  });

  const renameMap = new Map();
  const normalizedProxies = [];
  const uniqueNames = new Set();

  for (const rawProxy of filteredRawProxies) {
    const normalized = normalizeProxyName(rawProxy);
    if (normalized.name !== rawProxy.name) {
      renameMap.set(rawProxy.name, normalized.name);
    }
    if (!uniqueNames.has(normalized.name)) {
      uniqueNames.add(normalized.name);
      normalizedProxies.push(normalized);
    }
  }

  const normalizedProxyNames = new Set(normalizedProxies.map((p) => p.name));
  const filteredProxies = normalizedProxies.map((proxy) => fixDialerProxy(proxy, renameMap, normalizedProxyNames));

  const proxyProviders = config['proxy-providers'] || config.proxyProviders;
  const hasProviders = Boolean(
    proxyProviders && typeof proxyProviders === 'object' && Object.keys(proxyProviders).length > 0,
  );

  if (!filteredProxies.length && !hasProviders) {
    throw new Error('配置文件中未找到任何代理节点，请使用机场提供的配置文件进行覆写');
  }

  const ipVersionPreference = getIpVersionPreference();
  if (ipVersionPreference) {
    return filteredProxies.map((proxy) =>
      proxy['ip-version'] === ipVersionPreference ? proxy : { ...proxy, 'ip-version': ipVersionPreference },
    );
  }

  return filteredProxies;
}

// --- 构建地区策略组与排序 ---

function sortByGroupOrder(services) {
  if (!groupOrder.length) return services;

  const rank = new Map(groupOrder.map((name, index) => [name, index]));
  let last = -1;
  return services
    .map((svc, index) => {
      const order = rank.get(svc.name) ?? rank.get(svc.name.replace(/-(?:自动选择|自动回退|负载均衡)$/, ''));
      if (order !== undefined) last = order;
      return { svc, index, key: order !== undefined ? order : last + 0.5 };
    })
    .sort((a, b) => a.key - b.key || a.index - b.index)
    .map((entry) => entry.svc);
}

function createRegionGroup(name, icon, proxies) {
  const generateRegionAutoSelectEnabled = ruleOptionsEnable.生成地区自动选择组 || ruleOptionsEnable.隐藏地区手动选择组;
  const generateRegionFallbackEnabled = ruleOptionsEnable.生成地区自动回退组;
  const generateRegionLoadBalanceEnabled = ruleOptionsEnable.生成地区负载均衡组;
  const hideManualSelectGroupEnabled = ruleOptionsEnable.隐藏地区手动选择组;

  const extraGroups = [];
  const selectProxies = [];

  if (generateRegionAutoSelectEnabled) {
    const urlTestName = `${name}-自动选择`;
    extraGroups.push({
      ...urlTestBaseOption,
      name: urlTestName,
      proxies,
    });
    selectProxies.push(urlTestName);
  }

  if (generateRegionFallbackEnabled) {
    const fallbackName = `${name}-自动回退`;
    extraGroups.push({
      ...fallbackBaseOption,
      name: fallbackName,
      proxies,
    });
    selectProxies.push(fallbackName);
  }

  if (generateRegionLoadBalanceEnabled) {
    const lbName = `${name}-负载均衡`;
    extraGroups.push({
      ...loadBalanceBaseOption,
      name: lbName,
      proxies,
    });
    selectProxies.push(lbName);
  }

  return [
    ...extraGroups,
    {
      ...selectBaseOption,
      name,
      icon,
      proxies: [...selectProxies, ...proxies],
      hidden: hideManualSelectGroupEnabled,
    },
  ];
}

function buildRegionGroups(filteredProxies, customProxies) {
  const generateRateGroupEnabled = ruleOptionsEnable.生成高低倍率组;
  const regionGroups = Object.fromEntries(allRegionDefinitions.map(({ name }) => [name, []]));
  const otherProxies = [];

  for (const proxy of [...filteredProxies, ...customProxies]) {
    const matchedRegions = getMatchedRegions(proxy.name);
    const isRegionProxy = matchedRegions.some((region) => activeRegionDefinitions.includes(region));

    for (const region of matchedRegions) {
      regionGroups[region.name].push(proxy.name);
    }

    if (!isRegionProxy) {
      otherProxies.push(proxy.name);
    }
  }

  const generatedRegionGroups = sortByGroupOrder(allRegionDefinitions)
    .filter((r) => regionGroups[r.name].length > 0 && (generateRateGroupEnabled || !rateRegionDefinitions.includes(r)))
    .flatMap((r) => createRegionGroup(r.name, r.icon, regionGroups[r.name]));

  if (otherProxies.length > 0) {
    generatedRegionGroups.push(...createRegionGroup('其他节点', `${iconBaseUrl}WorldMap.svg`, otherProxies));
  }

  return generatedRegionGroups;
}

// --- 构建自定义节点与分流策略组 ---

function buildCustomizeGroups() {
  const customProxies = customizeProxies || [];
  const customProxyNames = customProxies.map((p) => p.name);
  const customGroup = null;
  return { customProxies, customProxyNames, customGroup };
}

function buildCustomServices(reservedNames) {
  const knownProviders = { ...baseRuleProviders };
  for (const svc of serviceConfigs) Object.assign(knownProviders, svc.providers || {});
  const providerByUrl = new Map(Object.entries(knownProviders).map(([name, provider]) => [provider.url, name]));
  const services = [];

  for (const route of customRoutes) {
    if (!route || typeof route.name !== 'string' || reservedNames.has(route.name) || !Array.isArray(route.sets)) continue;

    const providers = {};
    const rules = [];
    const ipRules = [];
    for (const set of route.sets) {
      if (!set || typeof set.tag !== 'string') continue;

      const ipcidr = set.type === 'geoip';
      const kind = ipcidr ? 'geoip' : 'geosite';
      const bundled = typeof set.url !== 'string';
      const url = bundled ? `${ruleSetBaseUrl}${kind}/${set.tag}.mrs` : set.url;
      const format = !bundled && ['yaml', 'text'].includes(set.format) ? set.format : 'mrs';
      const ext = format === 'text' ? 'list' : format;
      let providerName = providerByUrl.get(url);
      if (!providerName) {
        providerName = ipcidr ? `${set.tag}_ip` : set.tag;
        while (knownProviders[providerName]) providerName = `${providerName}_`;
        knownProviders[providerName] = {
          ...(ipcidr ? ruleProviderCommonIpcidr : ruleProviderCommonDomain),
          url,
          format,
          path: `./ruleset/${kind}/${set.tag}.${ext}`,
          ...(bundled && { 'path-in-bundle': `geo/${kind}/${set.tag}.mrs` }),
        };
        providerByUrl.set(url, providerName);
      }
      providers[providerName] = knownProviders[providerName];
      (ipcidr ? ipRules : rules).push(`RULE-SET,${providerName},${route.name}`);
    }
    if (!rules.length && !ipRules.length) continue;

    reservedNames.add(route.name);
    const reject = route.target === 'REJECT';
    services.push({
      name: route.name,
      baseOption: selectBaseOption,
      custom: true,
      direct: true,
      reject,
      ...(!reject && typeof route.target === 'string' && { defaultSelected: route.target }),
      ...(typeof route.icon === 'string' && route.icon && { icon: route.icon }),
      providers,
      rules,
      ipRules,
    });
  }

  return services;
}

function buildFunctionalGroups(filteredProxies, generatedRegionGroups, customizeInfo) {
  const minimalModeEnabled = ruleOptionsEnable.极简国内外分流模式;
  const addAllNodesToServiceGroupsEnabled = ruleOptionsEnable.分流组添加所有节点;
  const hideManualSelectGroupEnabled = ruleOptionsEnable.隐藏地区手动选择组;

  const functionalGroups = [];
  const functionalRules = [];
  const functionalIpRules = [];
  const priorityRules = [];
  const dnsPolicyGroups = [];
  const finalRuleProviders = { ...baseRuleProviders };

  const { customProxyNames = [], customGroup = null } = customizeInfo || {};
  const filteredProxyNames = filteredProxies.map((p) => p.name);
  const allProxiesNames = [...filteredProxyNames, ...customProxyNames];
  const groupNamesOfSelect = generatedRegionGroups.filter((g) => g.type === 'select').map((g) => g.name);
  const baseGroupNames = baseGroups.filter((g) => ruleOptionsEnable[g.name]).map((g) => g.name);
  const customGroupNames = customGroup ? [customGroup.name] : [];

  if (minimalModeEnabled) {
    const autoSelectGroupEnabled = ruleOptionsEnable.自动选择;
    const fallbackGroupEnabled = ruleOptionsEnable.自动回退;
    const adBlockService = ruleOptionsEnable.AdBlock ? serviceConfigs.find((svc) => svc.priority) : null;

    if (adBlockService) {
      priorityRules.push(...adBlockService.rules);
      Object.assign(finalRuleProviders, adBlockService.providers);
    }

    const adBlockGroup = adBlockService && {
      ...adBlockService.baseOption,
      name: adBlockService.name,
      icon: adBlockService.icon,
      proxies: ['REJECT', 'REJECT-DROP', 'PASS'],
    };

    const defaultGroup = {
      ...selectBaseOption,
      name: '默认代理',
      proxies: [
        ...allProxiesNames,
        ...(autoSelectGroupEnabled ? ['自动选择'] : []),
        ...(fallbackGroupEnabled ? ['自动回退'] : []),
      ],
      icon: `${iconBaseUrl}Proxy.svg`,
    };

    const autoSelectGroup = {
      ...urlTestBaseOption,
      name: '自动选择',
      proxies: allProxiesNames,
      hidden: true,
    };

    const fallbackGroup = {
      ...fallbackBaseOption,
      name: '自动回退',
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

    const activeFunctionalGroups = [
      defaultGroup,
      ...(autoSelectGroupEnabled ? [autoSelectGroup] : []),
      ...(fallbackGroupEnabled ? [fallbackGroup] : []),
      ...(adBlockGroup ? [adBlockGroup] : []),
    ];

    const globalGroup = {
      ...selectBaseOption,
      name: 'GLOBAL',
      proxies: [...activeFunctionalGroups.map((g) => g.name), ...customGroupNames, '直连'],
      icon: `${iconBaseUrl}Global.svg`,
    };

    return {
      globalGroup,
      orderedSubGroups: activeFunctionalGroups,
      functionalRules: [],
      functionalIpRules: [],
      priorityRules,
      dnsPolicyGroups: [],
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

  const reservedNames = new Set([
    'GLOBAL',
    'DIRECT',
    'REJECT',
    'REJECT-DROP',
    'PASS',
    'COMPATIBLE',
    '默认代理',
    '直连',
    ...serviceConfigs.map((svc) => svc.name),
    ...generatedRegionGroups.map((g) => g.name),
    ...allProxiesNames,
    ...directProxies.map((p) => p.name),
  ]);

  const services = [...serviceConfigs];
  const anchorIndex = services.findIndex((svc) => svc.name === 'AdBlock');
  services.splice(anchorIndex < 0 ? services.length : anchorIndex, 0, ...buildCustomServices(reservedNames));

  for (const svc of sortByGroupOrder(services)) {
    if (!svc.custom && !ruleOptionsEnable[svc.name]) continue;

    (svc.priority ? priorityRules : functionalRules).push(...(svc.rules || []));
    functionalIpRules.push(...(svc.ipRules || []));
    Object.assign(finalRuleProviders, svc.providers || {});

    let groupProxies = [];
    if (svc.includeAll) {
      groupProxies = [...allProxiesNames];
    } else if (svc.reject) {
      groupProxies = ['REJECT', 'REJECT-DROP', 'PASS'];
    } else if (svc.onlyDefaultAndDirect) {
      groupProxies = ['默认代理', '直连'];
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

    const selected =
      svc.defaultSelected !== undefined && groupProxies.includes(svc.defaultSelected) ? svc.defaultSelected : undefined;

    if (!svc.reject) {
      for (const rule of svc.rules || []) {
        if (rule.startsWith('RULE-SET,')) {
          dnsPolicyGroups.push([rule.split(',')[1], svc.name, selected === '直连']);
        }
      }
    }

    functionalGroups.push({
      ...svc.baseOption,
      name: svc.name,
      ...(svc.icon && { icon: svc.icon }),
      proxies: groupProxies,
      ...(selected !== undefined && { 'default-selected': selected }),
    });
  }

  const directGroup = {
    ...selectBaseOption,
    name: '直连',
    proxies: [...directProxies.map((p) => p.name)],
    icon: `${iconBaseUrl}China.svg`,
    hidden: hideManualSelectGroupEnabled,
  };

  const [defaultGroup, ...serviceGroups] = functionalGroups;
  const orderedSubGroups = [
    defaultGroup,
    ...sortByGroupOrder([...serviceGroups, ...(customGroup ? [customGroup] : []), directGroup, ...generatedRegionGroups]),
  ];

  const globalGroup = {
    ...selectBaseOption,
    name: 'GLOBAL',
    proxies: orderedSubGroups.map((g) => g.name),
    icon: `${iconBaseUrl}Global.svg`,
  };

  return {
    globalGroup,
    orderedSubGroups,
    functionalRules,
    functionalIpRules,
    priorityRules,
    dnsPolicyGroups,
    finalRuleProviders,
    directGroup,
  };
}

// --- dns和hosts相关处理 ---
// 常见的公共 DNS，用于过滤订阅中的公共 DNS
const commonDnsList = [
  // ==================== 国内 ====================

  // 阿里 AliDNS（阿里云）
  '223.5.5.5',
  '223.6.6.6',
  '2400:3200::1',
  '2400:3200:baba::1',
  'alidns',

  // 腾讯 DNSPod（腾讯云）
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

  // 114DNS（南京信风）
  '114.114.114.114',
  '114.114.115.115',
  '114.114.114.119',
  '114.114.115.119',
  '114.114.114.110',
  '114.114.115.110',

  // 百度 BaiduDNS
  '180.76.76.76',
  '2400:da00::6666',
  'dns.baidu',

  // CNNIC SDNS（中国互联网络信息中心）
  '1.2.4.8',
  '210.2.4.8',
  '2001:dc7:1000::1',
  'cnnic',

  // 360 安全 DNS
  '101.226.4.6',
  '218.30.118.6',
  '123.125.81.6',
  '140.207.198.6',
  '2400:8800:1::6',
  '2400:8800:2::6',
  'doh.360',
  'dot.360',
  'dns.360',

  // 火山引擎（字节跳动）
  '180.184.1.1',
  '180.184.2.2',

  // OneDNS（微步在线，拦截版/纯净版/家庭版）
  '117.50.11.11',
  '117.50.22.22',
  '52.80.66.66',
  '117.50.10.10',
  '52.80.52.52',
  '117.50.60.30',
  '52.80.60.30',
  'onedns.net',

  // 清华大学 TUNA
  '101.6.6.6',
  '2001:da8::666',

  // 下一代互联网国家工程中心（IPv6 公共 DNS）
  '240c::6666',
  '240c::6644',

  // 中国科学技术大学（教育网防污染）
  '202.141.162.123',
  '202.141.178.13',

  // ==================== 国外 ====================

  // Cloudflare
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

  // Google Public DNS
  '8.8.8.8',
  '8.8.4.4',
  '2001:4860:4860::8888',
  '2001:4860:4860::8844',
  'dns.google',

  // Quad9
  '9.9.9.9',
  '9.9.9.10',
  '9.9.9.11',
  '149.112.112.112',
  '149.112.112.10',
  '149.112.112.11',
  '2620:fe::fe',
  '2620:fe::9',
  'quad9',

  // Cisco OpenDNS（含 FamilyShield）
  '208.67.222.222',
  '208.67.220.220',
  '208.67.222.123',
  '208.67.220.123',
  '2620:119:35::35',
  '2620:119:53::53',
  '2620:119:35::123',
  '2620:119:53::123',
  'opendns',

  // AdGuard DNS（含家庭版）
  '94.140.14.14',
  '94.140.15.15',
  '94.140.14.15',
  '94.140.15.16',
  '2a10:50c0::ad1:ff',
  '2a10:50c0::ad2:ff',
  '2a10:50c0::bad1:ff',
  '2a10:50c0::bad2:ff',
  'adguard',

  // Control DNS
  '76.76.2.0',
  '76.76.10.0',
  '76.76.19.19',
  '76.223.122.150',

  // CleanBrowsing（含安全/家庭版）
  '185.228.168.9',
  '185.228.169.9',
  '185.228.168.10',
  '185.228.169.11',
  '185.228.168.168',
  '185.228.169.168',
  '2a0d:2a00:1::2',
  '2a0d:2a00:2::2',

  // Yandex DNS
  '77.88.8.8',
  '77.88.8.1',
  '2a02:6b8::feed:0ff',
  '2a02:6b8:0:1::feed:0ff',

  // Neustar UltraDNS
  '156.154.70.1',
  '156.154.71.1',
  '156.154.70.2',
  '156.154.71.2',
  '2610:a1:1018::1',
  '2610:a1:1019::1',

  // Mullvad DNS
  '194.242.2.2',
  '2a07:e340::2',

  // Hurricane Electric
  '74.82.42.42',
  '2001:470:20::2',

  // NextDNS
  'nextdns',

  // Apple
  'dns.apple',
];

const commonDnsRegex = new RegExp(
  commonDnsList.map((dns) => dns.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
  'i',
);

// 业务直连 DNS 绑定至「直连」策略组，继承 UI 中选择的 IPv4/IPv6 偏好
const chinaDNS = [
  'https://dns.alidns.com/dns-query#直连',
  'https://doh.pub/dns-query#直连',
  'https://doh.360.cn/dns-query#直连',
];
const douyinDNS = ['180.184.1.1#直连', '180.184.2.2#直连'];
const policyDNS = (group) => [
  `https://cloudflare-dns.com/dns-query#${group}`,
  `https://dns.google/dns-query#${group}`,
];
const foreignDNS = policyDNS('默认代理');

// 底层引导与节点域名解析保持 #DIRECT，避免依赖策略组初始化造成死锁
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

function createDomainMatcher(domains) {
  const exact = new Set();
  const suffixes = new Set();
  const properSuffixes = new Set();
  const splitDomains = [];

  for (const raw of domains) {
    const domain = raw.toLowerCase();
    if (exact.has(domain)) continue;
    exact.add(domain);
    const parts = domain.split('.');
    splitDomains.push(parts);
    suffixes.add(domain);
    for (let i = 1; i < parts.length; i++) {
      const suffix = parts.slice(i).join('.');
      suffixes.add(suffix);
      properSuffixes.add(suffix);
    }
  }

  let wildcardIndex = null;
  const candidatesOf = (key) => {
    if (!wildcardIndex) {
      wildcardIndex = new Map();
      for (const parts of splitDomains) {
        for (let i = 0; i <= parts.length; i++) {
          const indexKey = `${parts.length}:${parts.slice(i).join('.')}`;
          const list = wildcardIndex.get(indexKey);
          if (list) list.push(parts);
          else wildcardIndex.set(indexKey, [parts]);
        }
      }
    }
    return wildcardIndex.get(key) || [];
  };

  return (rawPattern) => {
    const pattern = String(rawPattern).toLowerCase();
    if (pattern.startsWith('+.')) return suffixes.has(pattern.slice(2));
    if (pattern.startsWith('.')) return properSuffixes.has(pattern.slice(1));
    if (!pattern.includes('*')) return exact.has(pattern);

    const patternParts = pattern.split('.');
    const key = `${patternParts.length}:${patternParts.slice(patternParts.lastIndexOf('*') + 1).join('.')}`;
    return candidatesOf(key).some((parts) =>
      patternParts.every((part, index) => part === '*' || part === parts[index]),
    );
  };
}

function createHostFinder(hostEntries) {
  const exact = new Map();
  const plus = new Map();
  const dot = new Map();
  const wildcards = [];

  hostEntries.forEach((entry, index) => {
    const pattern = entry[0].toLowerCase();
    const level = hostSpecificity(pattern);
    if (level === 0) {
      wildcards.push(entry);
      return;
    }
    const [map, key] =
      level === 3 ? [exact, pattern] : level === 2 ? [plus, pattern.slice(2)] : [dot, pattern.slice(1)];
    if (!map.has(key)) map.set(key, { entry, index });
  });

  const firstOf = (map, keys) => {
    let found = null;
    for (const key of keys) {
      const item = map.get(key);
      if (item && (!found || item.index < found.index)) found = item;
    }
    return found?.entry;
  };

  return (domain) => {
    const exactEntry = exact.get(domain)?.entry;
    if (exactEntry) return exactEntry;

    const parts = domain.split('.');
    const suffixes = parts.map((_, i) => parts.slice(i).join('.'));
    return (
      firstOf(plus, suffixes) ??
      firstOf(dot, suffixes.slice(1)) ??
      wildcards.find(([pattern]) => matchDomainPattern(pattern, domain))
    );
  };
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

  const findHost = createHostFinder(hostEntries);
  const resolveCache = new Map();
  const resolve = (server) => {
    const cached = resolveCache.get(server);
    if (cached !== undefined) return cached;

    const seen = new Set();
    let current = server.toLowerCase();
    let result = server;
    while (!seen.has(current)) {
      seen.add(current);
      const entry = findHost(current);
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

function buildDnsAndHostsConfig(config, filteredProxies, dnsPolicyGroups) {
  const minimalModeEnabled = ruleOptionsEnable.极简国内外分流模式;
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

  const matchProxyDomain = createDomainMatcher(proxyDomains);
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
    if (!matchProxyDomain(domain)) continue;

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
  const proxyFakeIpFilter = originalFakeIpFilter.filter((pattern) => matchProxyDomain(pattern));

  // 动态构建策略组联动 DNS Policy
  const nameserverPolicy = {
    'rule-set:private': 'system',
    'rule-set:douyin': douyinDNS,
  };
  for (const [provider, group, direct] of dnsPolicyGroups) {
    nameserverPolicy[`rule-set:${provider}`] ??= direct ? chinaDNS : policyDNS(group);
  }
  delete nameserverPolicy['rule-set:cn'];
  delete nameserverPolicy['rule-set:geolocation-!cn'];

  if (ruleOptionsEnable.优先国内DNS加速) {
    nameserverPolicy['rule-set:geolocation-!cn'] = foreignDNS;
  } else {
    nameserverPolicy['rule-set:cn'] = chinaDNS;
  }

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
      'rule-set:connectcheck',
      'rule-set:cn',
      ...(minimalModeEnabled ? [] : ruleOptionsEnable['FCM'] ? ['rule-set:googlefcm'] : []),
      ...proxyFakeIpFilter,
    ],
    'default-nameserver': defaultDNS,
    'proxy-server-nameserver': proxyServerDNS,
    ...(Object.keys(proxyServerPolicy).length > 0 && {
      'proxy-server-nameserver-policy': proxyServerPolicy,
    }),
    nameserver: ruleOptionsEnable.优先国内DNS加速 ? chinaDNS : foreignDNS,
    'nameserver-policy': nameserverPolicy,
    'direct-nameserver': chinaDNS,
    'direct-nameserver-follow-policy': true,
  };

  const hosts = {
    // 补全全部国内外 DoH 域名静态 IP 映射，消除二次引导延迟
    'dns.alidns.com': ['223.5.5.5', '223.6.6.6', '2400:3200::1', '2400:3200:baba::1'],
    'doh.pub': ['1.12.12.12', '120.53.53.53', '2402:4e00::', '2402:4e00:1::'],
    'doh.360.cn': ['101.226.4.6', '218.30.118.6', '2400:8800:1::6'],
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

function main(config) {
  const newConfig = {};

  const filteredProxies = filterAndNormalizeProxies(config);
  const { customProxies, customProxyNames, customGroup } = buildCustomizeGroups();

  const generatedRegionGroups = ruleOptionsEnable.极简国内外分流模式
    ? []
    : buildRegionGroups(filteredProxies, customProxies);

  const {
    globalGroup,
    orderedSubGroups,
    functionalRules,
    functionalIpRules,
    priorityRules,
    dnsPolicyGroups,
    finalRuleProviders,
  } = buildFunctionalGroups(filteredProxies, generatedRegionGroups, { customProxyNames, customGroup });

  const { dns, hosts, proxies: mappedProxies } = buildDnsAndHostsConfig(config, filteredProxies, dnsPolicyGroups);

  newConfig['dns'] = dns;
  newConfig['hosts'] = hosts;
  newConfig['mixed-port'] = 7890;
  newConfig['allow-lan'] = true;
  newConfig['ipv6'] = true;
  newConfig['mode'] = 'rule';
  newConfig['log-level'] = 'info';
  newConfig['bind-address'] = '*';
  newConfig['unified-delay'] = true;
  newConfig['tcp-concurrent'] = true;
  newConfig['keep-alive-interval'] = 60;
  newConfig['find-process-mode'] = 'strict';

  newConfig['external-controller'] = '127.0.0.1:9090';
  newConfig['external-ui'] = 'ui';
  newConfig['external-ui-url'] = 'https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip';

  newConfig['profile'] = {
    'store-selected': true,
    'store-fake-ip': true,
  };

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
  newConfig['proxy-groups'] = [globalGroup, ...orderedSubGroups];
  newConfig['rule-providers'] = finalRuleProviders;

  newConfig['rules'] = [
    ...prefixRules,
    ...(ruleOptionsEnable.屏蔽代理QUIC流量 ? blockForeignQuic : []),
    ...priorityRules,
    ...directRules,
    ...functionalRules,
    'RULE-SET,geolocation-!cn,默认代理',
    ...functionalIpRules,

    // 兜底规则
    'RULE-SET,cn_ip,直连',
    'RULE-SET,private_ip,直连',
    'MATCH,默认代理',
  ];

  return newConfig;
}
