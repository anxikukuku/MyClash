/*
 * mihomo 配置覆写脚本（终极修正版）
 */

const iconBaseUrl = 'https://fastly.jsdelivr.net/gh/AIsouler/MyClash@main/Icons/svg/';
const ruleSetBaseUrl = 'https://fastly.jsdelivr.net/gh/appshubcc/bett-rules@meta/geo/';

const Compatible_With_Bettbox = {
  ruleOptionsEnable: true,
};

// 全局排除节点的正则表达式
const excludeFilter = /群|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|电报|无法|说明|使用|提示|访问|支持|教程|关注|更新|作者|加入|超时|收藏|优惠|福利|邀请|好友|失联|选择|剩余|公益|发布|DIZTNA|通路|登录|禁止|定时|渠道|牢记|永久|余额|阁下|本站|刷新|导航|建议|重置|以下|过滤|⚠️|@|t\.me\/\+|\bexpire\b|\bhttps?:\/\/|\.com|\btraffic\b/iu;

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

// 地区正则与国旗定义
const regionDefinitions = [
  {
    name: '香港',
    flag: '🇭🇰',
    regex: /🇭🇰|香港|(?<![A-Za-z])HKG?(?![A-Za-z])|hong\s*kong/i,
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Hong_Kong.png',
  },
  {
    name: '日本',
    flag: '🇯🇵',
    regex: /🇯🇵|日本|东京|大阪|京都|(?<![A-Za-z])JPN?(?![A-Za-z])|japan/i,
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Japan.png',
  },
  {
    name: '台湾',
    flag: '🇹🇼',
    regex: /🇹🇼|台湾|台北|高雄|(?<![A-Za-z])TWN?(?![A-Za-z])|taiwan/i,
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Taiwan.png',
  },
  {
    name: '新加坡',
    flag: '🇸🇬',
    regex: /🇸🇬|新加坡|狮城|(?<![A-Za-z])SGP?(?![A-Za-z])|singapore/i,
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Singapore.png',
  },
  {
    name: '美国',
    flag: '🇺🇸',
    regex: /🇺🇸|美国|纽约|洛杉矶|旧金山|芝加哥|休斯顿|迈阿密|西雅图|波士顿|华盛顿|拉斯维加斯|圣何塞|圣地亚哥|(?<![A-Za-z])USA?(?![A-Za-z])|america|united\s*states/i,
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/United_States.png',
  },
];

// 策略组通用模板
const groupCommonSelect = {
  type: 'select',
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

// Rule Provider 模板（带 path-in-bundle）[span_0](start_span)[span_0](end_span)
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

// 基础规则集定义[span_1](start_span)[span_1](end_span)
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

const baseGroups = [
  { name: '手动选择', icon: `${iconBaseUrl}Static.svg` },
  { name: '自动选择', icon: `${iconBaseUrl}Auto.svg` },
  { name: '负载均衡', icon: `${iconBaseUrl}RoundRobin.svg` },
];

// 服务分流定义[span_2](start_span)[span_2](end_span)
const serviceConfigs = [
  ...baseGroups,
  {
    name: 'Google',
    defaultSelected: '日本',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Google_Suite/Google.png',
    providers: {
      google: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/google.mrs`, path: './ruleset/google.mrs', 'path-in-bundle': 'geo/geosite/google.mrs' },
      google_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/google.mrs`, path: './ruleset/google_ip.mrs', 'path-in-bundle': 'geo/geoip/google.mrs' },
    },
    rules: ['RULE-SET,google,Google', 'RULE-SET,google_ip,Google,no-resolve'],
  },
  {
    name: 'Twitter',
    defaultSelected: '日本',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Twitter.png',
    providers: {
      twitter: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/twitter.mrs`, path: './ruleset/twitter.mrs', 'path-in-bundle': 'geo/geosite/twitter.mrs' },
      twitter_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/twitter.mrs`, path: './ruleset/twitter_ip.mrs', 'path-in-bundle': 'geo/geoip/twitter.mrs' },
    },
    rules: ['RULE-SET,twitter,Twitter', 'RULE-SET,twitter_ip,Twitter,no-resolve'],
  },
  {
    name: 'Telegram',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Telegram.png',
    providers: {
      telegram: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/telegram.mrs`, path: './ruleset/telegram.mrs', 'path-in-bundle': 'geo/geosite/telegram.mrs' },
      telegram_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/telegram.mrs`, path: './ruleset/telegram_ip.mrs', 'path-in-bundle': 'geo/geoip/telegram.mrs' },
    },
    rules: ['RULE-SET,telegram,Telegram', 'RULE-SET,telegram_ip,Telegram,no-resolve'],
  },
  {
    name: 'Instagram',
    defaultSelected: '日本',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Instagram.png',
    providers: {
      meta: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/meta.mrs`, path: './ruleset/meta.mrs', 'path-in-bundle': 'geo/geosite/meta.mrs' },
    },
    rules: ['RULE-SET,meta,Instagram'],
  },
  {
    name: 'YouTube',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/YouTube.png',
    providers: {
      youtube: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/youtube.mrs`, path: './ruleset/youtube.mrs', 'path-in-bundle': 'geo/geosite/youtube.mrs' },
    },
    rules: ['RULE-SET,youtube,YouTube'],
  },
  {
    name: 'TikTok',
    defaultSelected: '日本',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/TikTok.png',
    providers: {
      tiktok: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/tiktok.mrs`, path: './ruleset/tiktok.mrs', 'path-in-bundle': 'geo/geosite/tiktok.mrs' },
      tiktok_ip: { ...ruleProviderCommonIpcidr, url: `${ruleSetBaseUrl}geoip/tiktok.mrs`, path: './ruleset/tiktok_ip.mrs', 'path-in-bundle': 'geo/geoip/tiktok.mrs' },
    },
    rules: ['RULE-SET,tiktok,TikTok', 'RULE-SET,tiktok_ip,TikTok,no-resolve'],
  },
  {
    name: 'AI',
    defaultSelected: '美国',
    icon: 'https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Social_Media/Air_Bnb.png',
    providers: {
      ai: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/category-ai-!cn.mrs`, path: './ruleset/ai.mrs', 'path-in-bundle': 'geo/geosite/category-ai-!cn.mrs' },
    },
    rules: ['RULE-SET,ai,AI'],
  },
  {
    name: 'EHentai',
    defaultSelected: '美国',
    icon: `${iconBaseUrl}EHentai.svg`,
    providers: {
      ehentai: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/ehentai.mrs`, path: './ruleset/ehentai.mrs', 'path-in-bundle': 'geo/geosite/ehentai.mrs' },
    },
    rules: ['RULE-SET,ehentai,EHentai'],
  },
  {
    name: 'FCM',
    proxies: ['直连', '默认代理'],
    icon: `${iconBaseUrl}Fcm.svg`,
    providers: {
      googlefcm: { ...ruleProviderCommonDomain, url: `${ruleSetBaseUrl}geosite/googlefcm.mrs`, path: './ruleset/googlefcm.mrs', 'path-in-bundle': 'geo/geosite/googlefcm.mrs' },
    },
    rules: ['RULE-SET,googlefcm,FCM'],
  },
  {
    name: 'AdBlock',
    reject: true,
    icon: `${iconBaseUrl}AdBlock.svg`,
    providers: {
      adblockmihomolite: { ...ruleProviderCommonDomain, url: 'https://fastly.jsdelivr.net/gh/217heidai/adblockfilters@main/rules/adblockmihomolite.mrs', path: './ruleset/adblockmihomolite.mrs', 'path-in-bundle': 'geo/geosite/category-ads-all.mrs' },
    },
    rules: ['RULE-SET,adblockmihomolite,AdBlock'],
  },
];

Compatible_With_Bettbox.policyGroupOptions = serviceConfigs.map((svc) => svc.name);

// --- 节点匹配、国旗补全与标准化核心 ---

const regionMatchCache = new Map();
function getMatchedRegions(proxyName) {
  if (regionMatchCache.has(proxyName)) {
    return regionMatchCache.get(proxyName);
  }
  const regions = regionDefinitions.filter((region) => region.regex.test(proxyName));
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

// 节点清洗、去重与标准化（完美支持重名加序号和空节点拦截）
function filterAndNormalizeProxies(config) {
  regionMatchCache.clear();
  const filterNonRegionProxiesEnabled = ruleOptionsEnable.过滤非地区节点;
  const rawProxies = config.proxies || [];

  if (!Array.isArray(rawProxies) || rawProxies.length === 0) {
    throw new Error('配置文件中未找到任何代理节点，请使用有效的订阅进行覆写');
  }

  const filteredRawProxies = rawProxies.filter((proxy) => {
    if (!proxy || !proxy.name || !proxy.type) return false;
    const type = String(proxy.type).toLowerCase();
    if (type === 'direct' || type === 'reject' || type === 'rematch') return false;

    if (!filterNonRegionProxiesEnabled) return true;

    const isRegionProxy = getMatchedRegions(proxy.name).length > 0;
    return isRegionProxy || !excludeFilter.test(proxy.name);
  });

  const renameMap = new Map();
  const nameCounter = new Map();
  const normalizedProxies = [];

  for (const rawProxy of filteredRawProxies) {
    const normalized = normalizeProxyName(rawProxy);
    const baseName = normalized.name;
    const count = (nameCounter.get(baseName) || 0) + 1;
    nameCounter.set(baseName, count);

    let finalName = baseName;
    if (count > 1) {
      finalName = `${baseName} - ${count}`;
    }

    if (finalName !== rawProxy.name) {
      renameMap.set(rawProxy.name, finalName);
    }

    normalizedProxies.push({ ...normalized, name: finalName });
  }

  // 节点过滤后非空检查
  if (normalizedProxies.length === 0) {
    throw new Error('过滤后未找到任何可用代理节点，请检查订阅或调整过滤规则');
  }

  const normalizedProxyNames = new Set(normalizedProxies.map((p) => p.name));
  return normalizedProxies.map((proxy) => {
    const targetDialer = proxy['dialer-proxy'];
    if (!targetDialer) return proxy;
    if (renameMap.has(targetDialer)) {
      return { ...proxy, 'dialer-proxy': renameMap.get(targetDialer) };
    }
    if (normalizedProxyNames.has(targetDialer)) {
      return proxy;
    }
    const copy = { ...proxy };
    delete copy['dialer-proxy'];
    return copy;
  });
}

// 构建地区策略组及“其它节点”（修复自动选择组 include-all 冲突）
function buildRegionGroups(filteredProxies) {
  const groups = [];
  const regionNodeMap = Object.fromEntries(regionDefinitions.map((r) => [r.name, []]));
  const otherProxies = [];

  for (const proxy of filteredProxies) {
    const matchedRegions = getMatchedRegions(proxy.name);
    if (matchedRegions.length > 0) {
      for (const region of matchedRegions) {
        regionNodeMap[region.name].push(proxy.name);
      }
    } else {
      otherProxies.push(proxy.name);
    }
  }

  // 剥离 url-test 组不需要的全局属性
  const { 'include-all': _includeAll, 'exclude-type': _excludeType, ...autoOption } = groupCommonAuto;

  for (const region of regionDefinitions) {
    const proxies = regionNodeMap[region.name];
    if (proxies.length === 0) continue;

    if (ruleOptionsEnable.手动选择) {
      groups.push({
        ...groupCommonSelect,
        name: region.name,
        proxies: ruleOptionsEnable.自动选择 && ruleOptionsEnable.生成地区自动选择组 ? [...proxies, `${region.name}-自动选择`] : proxies,
        icon: region.icon,
        ...(ruleOptionsEnable.隐藏地区手动选择组 ? { hidden: true } : {}),
      });
    }

    if (ruleOptionsEnable.自动选择 && ruleOptionsEnable.生成地区自动选择组) {
      groups.push({
        ...autoOption,
        name: `${region.name}-自动选择`,
        proxies: proxies,
      });
    }
  }

  if (otherProxies.length > 0) {
    if (ruleOptionsEnable.手动选择) {
      groups.push({
        ...groupCommonSelect,
        name: '其它节点',
        proxies: ruleOptionsEnable.自动选择 && ruleOptionsEnable.生成地区自动选择组 ? [...otherProxies, '其它节点-自动选择'] : otherProxies,
        icon: `${iconBaseUrl}WorldMap.svg`,
        ...(ruleOptionsEnable.隐藏地区手动选择组 ? { hidden: true } : {}),
      });
    }
    if (ruleOptionsEnable.自动选择 && ruleOptionsEnable.生成地区自动选择组) {
      groups.push({
        ...autoOption,
        name: '其它节点-自动选择',
        proxies: otherProxies,
      });
    }
  }

  return groups;
}

// 构建功能策略组、GLOBAL 组与聚合规则（修复默认代理自引用问题）
function buildFunctionalGroups(filteredProxies, generatedRegionGroups) {
  const allProxyNames = filteredProxies.map((proxy) => proxy.name);
  const baseGroupNames = baseGroups.filter((g) => ruleOptionsEnable[g.name]).map((g) => g.name);
  const regionGroupNames = generatedRegionGroups.filter((g) => g.type === 'select').map((g) => g.name);

  // 基础代理列表（不包含“默认代理”自身，彻底消除循环依赖）
  const serviceProxyNames = [
    ...baseGroupNames,
    ...regionGroupNames,
  ];

  // 分流服务组所使用的代理列表（包含“默认代理”，供业务组引用）
  const serviceGroupProxies = [
    '默认代理',
    ...serviceProxyNames,
  ];

  const functionalGroups = [
    {
      ...groupCommonSelect,
      name: '默认代理',
      proxies: serviceProxyNames,
      icon: `${iconBaseUrl}Proxy.svg`,
    },
  ];

  const functionalRules = [];
  const finalRuleProviders = { ...baseRuleProviders };

  if (!ruleOptionsEnable.屏蔽国外QUIC) {
    delete finalRuleProviders.cn_additional;
  }

  const orderedServiceConfigs = [
    ...serviceConfigs.filter((svc) => svc.name === 'AdBlock'),
    ...serviceConfigs.filter((svc) => svc.name !== 'AdBlock'),
  ];

  for (const svc of orderedServiceConfigs) {
    if (baseGroups.some((base) => base.name === svc.name)) continue;
    if (!ruleOptionsEnable[svc.name]) continue;

    functionalRules.push(...(svc.rules || []));
    Object.assign(finalRuleProviders, svc.providers || {});

    let serviceProxies = svc.proxies
      ? svc.proxies
      : ruleOptionsEnable.分流组添加所有节点
      ? [...new Set([...serviceGroupProxies, ...allProxyNames])]
      : serviceGroupProxies;

    if (svc.reject) {
      serviceProxies = ['REJECT', 'REJECT-DROP', 'PASS'];
    }

    functionalGroups.push({
      ...groupCommonSelect,
      name: svc.name,
      proxies: serviceProxies,
      ...(svc.defaultSelected ? { 'default-selected': svc.defaultSelected } : {}),
      icon: svc.icon,
    });
  }

  const directGroup = {
    ...groupCommonSelect,
    name: '直连',
    proxies: directProxies.map((proxy) => proxy.name),
    icon: `${iconBaseUrl}China.svg`,
  };

  functionalGroups.push(directGroup);

  if (ruleOptionsEnable.手动选择) {
    const baseGroup = baseGroups.find((g) => g.name === '手动选择');
    functionalGroups.push({
      ...groupCommonSelect,
      name: '手动选择',
      'include-all': true,
      'exclude-type': 'DIRECT',
      icon: baseGroup?.icon,
    });
  }

  if (ruleOptionsEnable.自动选择) {
    const baseGroup = baseGroups.find((g) => g.name === '自动选择');
    functionalGroups.push({
      ...groupCommonAuto,
      name: '自动选择',
      icon: baseGroup?.icon,
    });
  }

  if (ruleOptionsEnable.负载均衡) {
    const baseGroup = baseGroups.find((g) => g.name === '负载均衡');
    functionalGroups.push({
      type: 'load-balance',
      name: '负载均衡',
      strategy: 'sticky-sessions',
      interval: 600,
      timeout: 3000,
      'max-failed-times': 3,
      'include-all': true,
      'exclude-type': 'DIRECT',
      icon: baseGroup?.icon,
    });
  }

  // GLOBAL 根组（利用 Set 完美去重）
  const globalGroup = {
    ...groupCommonSelect,
    name: 'GLOBAL',
    proxies: [...new Set([
      ...functionalGroups.map((g) => g.name),
      ...regionGroupNames,
    ])],
    icon: `${iconBaseUrl}Global.svg`,
  };

  return { globalGroup, functionalGroups, functionalRules, finalRuleProviders };
}

// --- dns 和 hosts 相关处理 ---

const commonDnsList = [
  '223.5.5.5', '223.6.6.6', '119.29.29.29', '1.12.12.12', '120.53.53.53',
  '114.114.114.114', '180.76.76.76', '1.2.4.8', '116.116.116.116',
  '101.226.4.6', '123.125.81.6', '180.184.1.1', '180.184.2.2',
  '2400:3200::1', '2400:3200:baba::1', '2402:4e00::', '2400:da00::6666',
  '1.1.1.1', '1.0.0.1', '8.8.8.8', '8.8.4.4', '9.9.9.9', '149.112.112.112',
  '208.67.222.222', '208.67.220.220', '94.140.14.14', '94.140.15.15',
  '2606:4700:4700::1111', '2606:4700:4700::1001', '2001:4860:4860::8888',
  '2001:4860:4860::8844', '2620:fe::fe', '2620:fe::9',
  '2620:119:35::35', '2620:119:53::53', '2a10:50c0::bad1:ff',
  'alidns', 'doh.pub', 'dot.pub', 'dns.pub', 'dnspod', 'dns.baidu',
  'dns.google', 'dns.cloudflare', 'dns.apple', 'cloudflare-dns',
  'quad9', 'opendns', 'nextdns', 'adguard', 'one.one.one.one'
];

const commonDnsRegex = new RegExp(
  commonDnsList.map((dns) => dns.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
  'i',
);

const chinaDNS = ['223.5.5.5#DIRECT', '119.29.29.29#DIRECT'];
const foreignDNS = ['https://cloudflare-dns.com/dns-query#默认代理', 'https://dns.google/dns-query#默认代理'];
const defaultDNS = ['114.114.114.114#DIRECT', 'tls://223.5.5.5#DIRECT', 'https://1.12.12.12/dns-query#DIRECT'];
const proxyServerDNS = ['114.114.114.114#DIRECT', 'tls://223.5.5.5#DIRECT', 'https://doh.pub/dns-query#DIRECT'];

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
    .filter(([, value]) => (typeof value === 'string' && value.length > 0) || (Array.isArray(value) && value.length > 0))
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
  const suffix = str.slice(hashIndex + 1).toLowerCase().trim();
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
    if (!groups.has(suffix)) groups.set(suffix, []);
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
      'rule-set:geolocation-cn',
      ...(ruleOptionsEnable.FCM ? ['rule-set:googlefcm'] : []),
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
      'rule-set:cn': chinaDNS,
    },
    'direct-nameserver': chinaDNS,
    'direct-nameserver-follow-policy': true,
  };

  const hosts = {
    'doh.pub': ['1.12.12.12', '120.53.53.53'],
    'cloudflare-dns.com': ['1.1.1.1', '1.0.0.1'],
    'dns.google': ['8.8.8.8', '8.8.4.4'],
    'services.googleapis.cn': 'services.googleapis.com',

    '+.mcdn.bilivideo.com': ['0.0.0.0'],
    '+.mcdn.bilivideo.cn': ['0.0.0.0'],
    '+.edge.mountaintoys.cn': ['0.0.0.0'],
    '+.h2.smtcdns.net': ['0.0.0.0'],
  };

  return { dns, hosts, proxies: mappedProxies };
}

// 主入口逻辑
function main(config) {
  if (config['proxy-providers'] && Object.keys(config['proxy-providers']).length > 0) {
    throw new Error('脚本不支持 proxy-providers，请使用包含完整节点列表的订阅进行覆写');
  }

  let proxies = filterAndNormalizeProxies(config);

  if (ruleOptionsEnable.代理IPV4优先 !== ruleOptionsEnable.代理IPV6优先) {
    const ipVersion = ruleOptionsEnable.代理IPV4优先 ? 'ipv4-prefer' : 'ipv6-prefer';
    proxies = proxies.map((proxy) => ({ ...proxy, 'ip-version': ipVersion }));
  }

  const generatedRegionGroups = buildRegionGroups(proxies);
  const { globalGroup, functionalGroups, functionalRules, finalRuleProviders } = buildFunctionalGroups(proxies, generatedRegionGroups);
  const { dns, hosts, proxies: mappedProxies } = buildDnsAndHostsConfig(config, proxies);

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

    'geodata-mode': false,

    profile: {
      'store-selected': true,
      'store-fake-ip': true,
    },

    dns: dns,
    hosts: hosts,

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
      'auto-route': true,
      'auto-redirect': true,
      'auto-detect-interface': true,
      'strict-route': true,
      // 统一兼容写法
      'dns-hijack': ['any:53', 'tcp://any:53'],
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
      'skip-dst-address': [
        '223.5.5.5/32',
        '119.29.29.29/32',
      ],
    },

    proxies: [...mappedProxies, ...directProxies],

    'proxy-groups': [
      globalGroup,
      ...functionalGroups,
      ...generatedRegionGroups,
    ],

    rules: [
      'RULE-SET,private,直连',
      'RULE-SET,private_ip,直连,no-resolve',

      ...(ruleOptionsEnable.屏蔽国外QUIC ? blockForeignQuic : []),
      ...functionalRules,

      'RULE-SET,geolocation-cn,直连',
      'RULE-SET,geolocation-!cn,默认代理',
      'RULE-SET,cn_ip,直连',
      'MATCH,默认代理',
    ],

    'rule-providers': finalRuleProviders,
  };
}
