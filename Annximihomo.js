/*
 * mihomo 配置覆写脚本
 */

const iconBaseUrl = 'https://cdn.jsdmirror.com/gh/AIsouler/MyClash@main/Icons/svg/';
const ruleSetBaseUrl = 'https://cdn.jsdmirror.com/gh/appshubcc/bett-rules@meta/geo/';

const Compatible_With_Bettbox = {
  ruleOptionsEnable: true,
};

const excludeFilter = /群|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|电报|无法|说明|使用|提示|访问|支持|教程|关注|更新|作者|加入|超时|收藏|优惠|福利|邀请|好友|失联|选择|剩余|公益|发布|DIZTNA|通路|登录|禁止|定时|渠道|牢记|永久|余额|阁下|本站|刷新|导航|建议|重置|以下|过滤|⚠️|@|t\.me\/\+|\bexpire\b|\bhttps?:\/\/|\.com|\btraffic\b/iu;

const ruleOptionsEnable = {
  手动选择: true,
  自动选择: false,
  负载均衡: false,
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
  生成地区自动选择组: false,
  隐藏地区手动选择组: false,
  分流组添加所有节点: false,
  过滤非地区节点: true,
  屏蔽国外QUIC: true,
  代理IPV4优先: false,
  代理IPV6优先: false,
};

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
    flag: '🇭🇰',
    regex: /🇭🇰|香港|(?<![A-Za-z])HKG?(?![A-Za-z])|hong\s*kong/i,
    icon: iconBaseUrl + 'HongKong.svg',
  },
  {
    name: '日本',
    flag: '🇯🇵',
    regex: /🇯🇵|日本|东京|大阪|京都|(?<![A-Za-z])JPN?(?![A-Za-z])|japan/i,
    icon: iconBaseUrl + 'Japan.svg',
  },
  {
    name: '台湾',
    flag: '🇹🇼',
    regex: /🇹🇼|台湾|台北|高雄|(?<![A-Za-z])TWN?(?![A-Za-z])|taiwan/i,
    icon: iconBaseUrl + 'Taiwan.svg',
  },
  {
    name: '新加坡',
    flag: '🇸🇬',
    regex: /🇸🇬|新加坡|狮城|(?<![A-Za-z])SGP?(?![A-Za-z])|singapore/i,
    icon: iconBaseUrl + 'Singapore.svg',
  },
  {
    name: '美国',
    flag: '🇺🇸',
    regex: /🇺🇸|美国|纽约|洛杉矶|旧金山|芝加哥|休斯顿|迈阿密|西雅图|波士顿|华盛顿|拉斯维加斯|圣何塞|(?<![A-Za-z])USA?(?![A-Za-z])|america|united\s*states/i,
    icon: iconBaseUrl + 'America.svg',
  },
];

const groupCommonSelect = {type: 'select'};

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
  icon: iconBaseUrl + 'Auto.svg',
  hidden: true,
};

const ruleProviderCommonDomain = { type: 'http', interval: 86400, behavior: 'domain', format: 'mrs' };
const ruleProviderCommonIpcidr = { type: 'http', interval: 86400, behavior: 'ipcidr', format: 'mrs' };

const baseRuleProviders = {
  private: Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/private.mrs', path: './ruleset/private.mrs', 'path-in-bundle': 'geo/geosite/private.mrs' }),
  private_ip: Object.assign({}, ruleProviderCommonIpcidr, { url: ruleSetBaseUrl + 'geoip/private.mrs', path: './ruleset/private_ip.mrs', 'path-in-bundle': 'geo/geoip/private_ip.mrs' }),
  'geolocation-cn': Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/geolocation-cn.mrs', path: './ruleset/geolocation-cn.mrs', 'path-in-bundle': 'geo/geosite/geolocation-cn.mrs' }),
  cn: Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/cn.mrs', path: './ruleset/cn.mrs', 'path-in-bundle': 'geo/geosite/cn.mrs' }),
  cn_additional: Object.assign({}, ruleProviderCommonDomain, { url: 'https://static-file-global.353355.xyz/rules/cn-additional-list.mrs', path: './ruleset/cn-additional-list.mrs', 'path-in-bundle': 'geo/geosite/cn.mrs' }),
  cn_ip: Object.assign({}, ruleProviderCommonIpcidr, { url: ruleSetBaseUrl + 'geoip/cn.mrs', path: './ruleset/cn_ip.mrs', 'path-in-bundle': 'geo/geoip/cn_ip.mrs' }),
  'geolocation-!cn': Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/geolocation-!cn.mrs', path: './ruleset/geolocation-!cn.mrs', 'path-in-bundle': 'geo/geosite/geolocation-!cn.mrs' }),
  fakeip_filter: Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/fakeip-filter.mrs', path: './ruleset/fakeip-filter.mrs', 'path-in-bundle': 'geo/geosite/fakeip-filter.mrs' }),
};

const baseGroups = [
  { name: '手动选择', icon: iconBaseUrl + 'Static.svg' },
  { name: '自动选择', icon: iconBaseUrl + 'Auto.svg' },
  { name: '负载均衡', icon: iconBaseUrl + 'RoundRobin.svg' },
];

const serviceConfigs = baseGroups.concat([
  {
    name: 'FCM',
    proxies: ['直连', '默认代理'],
    icon: iconBaseUrl + 'Fcm.svg',
    providers: {
      googlefcm: Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/googlefcm.mrs', path: './ruleset/googlefcm.mrs', 'path-in-bundle': 'geo/geosite/googlefcm.mrs' }),
    },
    rules: ['RULE-SET,googlefcm,FCM'],
  },
  {
    name: 'YouTube',
    icon: iconBaseUrl + 'YouTube.svg',
    providers: {
      youtube: Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/youtube.mrs', path: './ruleset/youtube.mrs', 'path-in-bundle': 'geo/geosite/youtube.mrs' }),
    },
    rules: ['RULE-SET,youtube,YouTube'],
  },
  {
    name: 'Google',
    icon: iconBaseUrl + 'Google.svg',
    providers: {
      google: Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/google.mrs', path: './ruleset/google.mrs', 'path-in-bundle': 'geo/geosite/google.mrs' }),
      google_ip: Object.assign({}, ruleProviderCommonIpcidr, { url: ruleSetBaseUrl + 'geoip/google.mrs', path: './ruleset/google_ip.mrs', 'path-in-bundle': 'geo/geoip/google.mrs' }),
    },
    rules: ['RULE-SET,google,Google', 'RULE-SET,google_ip,Google,no-resolve'],
  },
  {
    name: 'AI',
    defaultSelected: '美国',
    icon: iconBaseUrl + 'OpenAI.svg',
    providers: {
      ai: Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/category-ai-!cn.mrs', path: './ruleset/ai.mrs', 'path-in-bundle': 'geo/geosite/category-ai-!cn.mrs' }),
    },
    rules: ['RULE-SET,ai,AI'],
  },
  {
    name: 'Twitter',
    icon: iconBaseUrl + 'Twitter.svg',
    providers: {
      twitter: Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/twitter.mrs', path: './ruleset/twitter.mrs', 'path-in-bundle': 'geo/geosite/twitter.mrs' }),
      twitter_ip: Object.assign({}, ruleProviderCommonIpcidr, { url: ruleSetBaseUrl + 'geoip/twitter.mrs', path: './ruleset/twitter_ip.mrs', 'path-in-bundle': 'geo/geoip/twitter.mrs' }),
    },
    rules: ['RULE-SET,twitter,Twitter', 'RULE-SET,twitter_ip,Twitter,no-resolve'],
  },
  {
    name: 'Telegram',
    icon: iconBaseUrl + 'Telegram.svg',
    providers: {
      telegram: Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/telegram.mrs', path: './ruleset/telegram.mrs', 'path-in-bundle': 'geo/geosite/telegram.mrs' }),
      telegram_ip: Object.assign({}, ruleProviderCommonIpcidr, { url: ruleSetBaseUrl + 'geoip/telegram.mrs', path: './ruleset/telegram_ip.mrs', 'path-in-bundle': 'geo/geoip/telegram.mrs' }),
    },
    rules: ['RULE-SET,telegram,Telegram', 'RULE-SET,telegram_ip,Telegram,no-resolve'],
  },
  {
    name: 'Meta',
    icon: iconBaseUrl + 'Meta.svg',
    providers: {
      meta: Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/meta.mrs', path: './ruleset/meta.mrs', 'path-in-bundle': 'geo/geosite/meta.mrs' }),
      instagram: Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/instagram.mrs', path: './ruleset/instagram.mrs', 'path-in-bundle': 'geo/geosite/instagram.mrs' }),
    },
    rules: [
      'RULE-SET,meta,Meta',
      'RULE-SET,instagram,Meta'
    ],
  },
  {
    name: 'TikTok',
    defaultSelected: '日本',
    icon: iconBaseUrl + 'TikTok.svg',
    providers: {
      tiktok: Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/tiktok.mrs', path: './ruleset/tiktok.mrs', 'path-in-bundle': 'geo/geosite/tiktok.mrs' }),
      tiktok_ip: Object.assign({}, ruleProviderCommonIpcidr, { url: ruleSetBaseUrl + 'geoip/tiktok.mrs', path: './ruleset/tiktok_ip.mrs', 'path-in-bundle': 'geo/geoip/tiktok_ip.mrs' }),
    },
    rules: ['RULE-SET,tiktok,TikTok', 'RULE-SET,tiktok_ip,TikTok,no-resolve'],
  },
  {
    name: 'Emby',
    icon: iconBaseUrl + 'Emby.svg',
    providers: {
      emby: Object.assign({}, ruleProviderCommonDomain, { url: 'https://cdn.jsdmirror.com/gh/666OS/rules@release/mihomo/domain/Emby.mrs', path: './ruleset/emby.mrs', 'path-in-bundle': 'geo/geosite/category-emby.mrs' }),
      emos: Object.assign({}, ruleProviderCommonDomain, { url: 'https://cdn.jsdmirror.com/gh/binaryu/emos-proxy-rule@main/rules/emos-mihomo.mrs', path: './ruleset/emos.mrs', 'path-in-bundle': 'geo/geosite/category-emby.mrs' }),
    },
    rules: [
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
    defaultSelected: '美国',
    icon: iconBaseUrl + 'EHentai.svg',
    providers: {
      ehentai: Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/ehentai.mrs', path: './ruleset/ehentai.mrs', 'path-in-bundle': 'geo/geosite/ehentai.mrs' }),
    },
    rules: ['RULE-SET,ehentai,EHentai'],
  },
  {
    name: 'AdBlock',
    reject: true,
    icon: iconBaseUrl + 'AdBlock.svg',
    providers: {
      'category-ads': Object.assign({}, ruleProviderCommonDomain, { url: ruleSetBaseUrl + 'geosite/category-ads.mrs', path: './ruleset/category-ads.mrs', 'path-in-bundle': 'geo/geosite/category-ads.mrs' }),
    },
    rules: ['RULE-SET,category-ads,AdBlock'],
  },
]);

const policyGroupOptions = [];
for (var i = 0; i < serviceConfigs.length; i++) {
  policyGroupOptions.push(serviceConfigs[i].name);
}
Compatible_With_Bettbox.policyGroupOptions = policyGroupOptions;

// --- 零宽/不可见字符清洗机制 ---
const invisibleCharsRegex = /[\u00AD\u180E\u200B\u200E\u200F\u202A-\u202E\u2060-\u206F\uFEFF\u115F\u1160\u3164\uFFA0]/g;
function toMatchableName(name) {
  return typeof name === 'string' ? name.replace(invisibleCharsRegex, '') : name;
}

const regionMatchCache = new Map();
function getMatchedRegions(proxyName) {
  if (regionMatchCache.has(proxyName)) return regionMatchCache.get(proxyName);
  var matchableName = toMatchableName(proxyName);
  var regions = [];
  for (var i = 0; i < regionDefinitions.length; i++) {
    if (regionDefinitions[i].regex.test(matchableName)) {
      regions.push(regionDefinitions[i]);
    }
  }
  regionMatchCache.set(proxyName, regions);
  return regions;
}

const flagRegex = /[\u{1F1E6}-\u{1F1FF}]{2}/u;
function normalizeProxyName(proxy) {
  var originalName = proxy.name;
  var flagMatch = originalName.match(flagRegex);
  var flag = flagMatch ? flagMatch[0] : null;
  var nameWithoutFlag = (flag ? originalName.replace(flag, '') : originalName).replace(/\s+/g, ' ').trim();
  var matchedRegions = getMatchedRegions(originalName);
  var regionFlag = flag;
  if (!regionFlag) {
    for (var i = 0; i < matchedRegions.length; i++) {
      if (matchedRegions[i].flag) {
        regionFlag = matchedRegions[i].flag;
        break;
      }
    }
  }
  var normalizedName = regionFlag ? (regionFlag + ' ' + nameWithoutFlag) : nameWithoutFlag;
  if (normalizedName !== originalName) regionMatchCache.set(normalizedName, matchedRegions);
  return normalizedName === originalName ? proxy : Object.assign({}, proxy, { name: normalizedName });
}

function filterAndNormalizeProxies(config) {
  regionMatchCache.clear();
  var filterNonRegionProxiesEnabled = ruleOptionsEnable.过滤非地区节点;
  var rawProxies = config.proxies || [];

  if (!Array.isArray(rawProxies) || rawProxies.length === 0) {
    throw new Error('配置文件中未找到任何代理节点，请使用有效的订阅进行覆写');
  }

  var filteredRawProxies = [];
  for (var i = 0; i < rawProxies.length; i++) {
    var proxy = rawProxies[i];
    if (!proxy || !proxy.name || !proxy.type) continue;
    var type = String(proxy.type).toLowerCase();
    if (type === 'direct' || type === 'reject' || type === 'rematch') continue;
    
    var matchableName = toMatchableName(proxy.name);
    if (!filterNonRegionProxiesEnabled) {
      filteredRawProxies.push(proxy);
      continue;
    }
    if (getMatchedRegions(proxy.name).length > 0 || !excludeFilter.test(matchableName)) {
      filteredRawProxies.push(proxy);
    }
  }

  var renameMap = new Map();
  var nameCounter = new Map();
  var normalizedProxies = [];

  for (var j = 0; j < filteredRawProxies.length; j++) {
    var rawProxy = filteredRawProxies[j];
    var normalized = normalizeProxyName(rawProxy);
    var baseName = normalized.name;
    var count = (nameCounter.get(baseName) || 0) + 1;
    nameCounter.set(baseName, count);

    var finalName = baseName;
    if (count > 1) finalName = baseName + ' - ' + count;
    if (finalName !== rawProxy.name) renameMap.set(rawProxy.name, finalName);

    normalizedProxies.push(Object.assign({}, normalized, { name: finalName }));
  }

  if (normalizedProxies.length === 0) {
    throw new Error('过滤后未找到任何可用代理节点，请检查订阅或调整过滤规则');
  }

  var normalizedProxyNames = new Set();
  for (var k = 0; k < normalizedProxies.length; k++) {
    normalizedProxyNames.add(normalizedProxies[k].name);
  }

  var resultProxies = [];
  for (var n = 0; n < normalizedProxies.length; n++) {
    var p = normalizedProxies[n];

    var targetDialer = p['dialer-proxy'];
    if (!targetDialer) {
      resultProxies.push(p);
      continue;
    }
    if (renameMap.has(targetDialer)) {
      resultProxies.push(Object.assign({}, p, { 'dialer-proxy': renameMap.get(targetDialer) }));
      continue;
    }
    if (normalizedProxyNames.has(targetDialer)) {
      resultProxies.push(p);
      continue;
    }
    var copy = Object.assign({}, p);
    delete copy['dialer-proxy'];
    resultProxies.push(copy);
  }

  return resultProxies;
}

function buildRegionGroups(filteredProxies) {
  var groups = [];
  var regionNodeMap = {};
  for (var i = 0; i < regionDefinitions.length; i++) {
    regionNodeMap[regionDefinitions[i].name] = [];
  }
  var otherProxies = [];

  for (var j = 0; j < filteredProxies.length; j++) {
    var proxy = filteredProxies[j];
    var matchedRegions = getMatchedRegions(proxy.name);
    if (matchedRegions.length > 0) {
      for (var k = 0; k < matchedRegions.length; k++) {
        regionNodeMap[matchedRegions[k].name].push(proxy.name);
      }
    } else {
      otherProxies.push(proxy.name);
    }
  }

  var autoOptionBase = Object.assign({}, groupCommonAuto);
  delete autoOptionBase['include-all'];
  delete autoOptionBase['exclude-type'];

  var enableRegionAuto = ruleOptionsEnable.生成地区自动选择组;

  for (var r = 0; r < regionDefinitions.length; r++) {
    var region = regionDefinitions[r];
    var proxies = regionNodeMap[region.name];
    if (!proxies || proxies.length === 0) continue;

    var selectGroup = Object.assign({}, groupCommonSelect, {
      name: region.name,
      proxies: enableRegionAuto ? [region.name + '-自动选择'].concat(proxies) : proxies,
      icon: region.icon
    });
    if (ruleOptionsEnable.隐藏地区手动选择组) {
      selectGroup.hidden = true;
    }
    groups.push(selectGroup);

    if (enableRegionAuto) {
      groups.push(Object.assign({}, autoOptionBase, {
        name: region.name + '-自动选择',
        proxies: proxies
      }));
    }
  }

  if (otherProxies.length > 0) {
    var otherSelect = Object.assign({}, groupCommonSelect, {
      name: '其它节点',
      proxies: enableRegionAuto ? ['其它节点-自动选择'].concat(otherProxies) : otherProxies,
      icon: iconBaseUrl + 'WorldMap.svg'
    });
    if (ruleOptionsEnable.隐藏地区手动选择组) {
      otherSelect.hidden = true;
    }
    groups.push(otherSelect);

    if (enableRegionAuto) {
      groups.push(Object.assign({}, autoOptionBase, {
        name: '其它节点-自动选择',
        proxies: otherProxies
      }));
    }
  }

  return groups;
}

function buildFunctionalGroups(filteredProxies, generatedRegionGroups) {
  var allProxyNames = [];
  for (var i = 0; i < filteredProxies.length; i++) {
    allProxyNames.push(filteredProxies[i].name);
  }

  var baseGroupNames = [];
  for (var bg = 0; bg < baseGroups.length; bg++) {
    if (ruleOptionsEnable[baseGroups[bg].name]) {
      baseGroupNames.push(baseGroups[bg].name);
    }
  }

  var regionGroupNames = [];
  for (var rg = 0; rg < generatedRegionGroups.length; rg++) {
    if (generatedRegionGroups[rg].type === 'select') {
      regionGroupNames.push(generatedRegionGroups[rg].name);
    }
  }

  var serviceProxyNames = baseGroupNames.concat(regionGroupNames);
  if (serviceProxyNames.length === 0) serviceProxyNames = [].concat(allProxyNames);

  var serviceGroupProxies = ['默认代理'].concat(serviceProxyNames);

  var functionalGroups = [
    Object.assign({}, groupCommonSelect, { name: '默认代理', proxies: serviceProxyNames, icon: iconBaseUrl + 'Proxy.svg' })
  ];

  var functionalRules = [];
  var finalRuleProviders = Object.assign({}, baseRuleProviders);

  if (!ruleOptionsEnable.屏蔽国外QUIC) delete finalRuleProviders.cn_additional;

  var normalConfigs = [];
  var adblockConfig = null;

  for (var sc = 0; sc < serviceConfigs.length; sc++) {
    if (serviceConfigs[sc].name === 'AdBlock') {
      adblockConfig = serviceConfigs[sc];
    } else {
      normalConfigs.push(serviceConfigs[sc]);
    }
  }

  var orderedServiceConfigs = normalConfigs;
  if (adblockConfig) {
    orderedServiceConfigs.push(adblockConfig);
  }

  for (var s = 0; s < orderedServiceConfigs.length; s++) {
    var svc = orderedServiceConfigs[s];
    var isBase = false;
    for (var b = 0; b < baseGroups.length; b++) {
      if (baseGroups[b].name === svc.name) { isBase = true; break; }
    }
    if (isBase) continue;
    if (!ruleOptionsEnable[svc.name]) continue;

    if (svc.rules) {
      for (var sr = 0; sr < svc.rules.length; sr++) {
        functionalRules.push(svc.rules[sr]);
      }
    }
    if (svc.providers) {
      var pKeys = Object.keys(svc.providers);
      for (var pk = 0; pk < pKeys.length; pk++) {
        finalRuleProviders[pKeys[pk]] = svc.providers[pKeys[pk]];
      }
    }

    var serviceProxies = svc.proxies
      ? svc.proxies
      : ruleOptionsEnable.分流组添加所有节点
      ? serviceGroupProxies.concat(allProxyNames).filter(function(item, idx, arr) { return arr.indexOf(item) === idx; })
      : serviceGroupProxies;

    if (svc.reject) serviceProxies = ['REJECT', 'REJECT-DROP', 'PASS'];

    var cfgObj = Object.assign({}, groupCommonSelect, {
      name: svc.name,
      proxies: serviceProxies,
      icon: svc.icon
    });
    if (svc.defaultSelected) {
      cfgObj['default-selected'] = svc.defaultSelected;
    }
    functionalGroups.push(cfgObj);
  }

  functionalGroups.push(
    Object.assign({}, groupCommonSelect, {
      name: '直连',
      proxies: directProxies.map(function(p) { return p.name; }),
      icon: iconBaseUrl + 'China.svg'
    })
  );

  var baseControlGroups = [];

  if (ruleOptionsEnable.手动选择) {
    var baseGroup1 = null;
    for (var bg1 = 0; bg1 < baseGroups.length; bg1++) {
      if (baseGroups[bg1].name === '手动选择') { baseGroup1 = baseGroups[bg1]; break; }
    }
    baseControlGroups.push(Object.assign({}, groupCommonSelect, {
      name: '手动选择',
      'include-all': true,
      'exclude-type': 'DIRECT',
      icon: baseGroup1 ? baseGroup1.icon : undefined
    }));
  }

  if (ruleOptionsEnable.自动选择) {
    var baseGroup2 = null;
    for (var bg2 = 0; bg2 < baseGroups.length; bg2++) {
      if (baseGroups[bg2].name === '自动选择') { baseGroup2 = baseGroups[bg2]; break; }
    }
    baseControlGroups.push(Object.assign({}, groupCommonAuto, {
      name: '自动选择',
      icon: baseGroup2 ? baseGroup2.icon : undefined
    }));
  }

  if (ruleOptionsEnable.负载均衡) {
    var baseGroup3 = null;
    for (var bg3 = 0; bg3 < baseGroups.length; bg3++) {
      if (baseGroups[bg3].name === '负载均衡') { baseGroup3 = baseGroups[bg3]; break; }
    }
    baseControlGroups.push(Object.assign({}, {
      type: 'load-balance',
      name: '负载均衡',
      strategy: 'sticky-sessions',
      interval: 600,
      timeout: 3000,
      'max-failed-times': 3,
      'include-all': true,
      'exclude-type': 'DIRECT',
      icon: baseGroup3 ? baseGroup3.icon : undefined
    }));
  }

  var funcGroupNames = [];
  for (var fg = 0; fg < functionalGroups.length; fg++) {
    funcGroupNames.push(functionalGroups[fg].name);
  }
  var baseControlNames = [];
  for (var bc = 0; bc < baseControlGroups.length; bc++) {
    baseControlNames.push(baseControlGroups[bc].name);
  }

  var globalProxies = funcGroupNames.concat(baseControlNames, regionGroupNames).filter(function(item, idx, arr) {
    return arr.indexOf(item) === idx;
  });

  var globalGroup = {
    name: 'GLOBAL',
    type: 'select',
    proxies: globalProxies,
    icon: iconBaseUrl + 'Global.svg',
    hidden: true
  };

  return {
    globalGroup: globalGroup,
    functionalGroups: functionalGroups,
    baseControlGroups: baseControlGroups,
    functionalRules: functionalRules,
    finalRuleProviders: finalRuleProviders
  };
}

// 完整的公共 DNS 白名单
const commonDnsList = [
  // ==================== 国内 ====================
  // 阿里 AliDNS
  '223.5.5.5', '223.6.6.6', '2400:3200::1', '2400:3200:baba::1', 'alidns',
  // 腾讯 DNSPod
  '119.29.29.29', '119.28.28.28', '182.254.116.116', '182.254.118.118', '1.12.12.12', '120.53.53.53', '2402:4e00::', 'doh.pub', 'dot.pub', 'dns.pub', 'dnspod',
  // 114DNS（含安全版、家庭版）
  '114.114.114.114', '114.114.115.115', '114.114.114.119', '114.114.115.119', '114.114.114.110', '114.114.115.110',
  // 百度 BaiduDNS
  '180.76.76.76', '2400:da00::6666', 'dns.baidu',
  // CNNIC SDNS
  '1.2.4.8', '210.2.4.8', '2001:dc7:1000::1', 'cnnic',
  // 360 安全 DNS
  '101.226.4.6', '218.30.118.6', '123.125.81.6', '140.207.198.6', '2400:8800:1::6', '2400:8800:2::6', 'doh.360', 'dot.360', 'dns.360',
  // 火山引擎（字节跳动）
  '180.184.1.1', '180.184.2.2',
  // OneDNS（微步在线，拦截版/纯净版/家庭版）
  '117.50.11.11', '117.50.22.22', '52.80.66.66', '117.50.10.10', '52.80.52.52', '117.50.60.30', '52.80.60.30', 'onedns.net',
  // 清华大学 TUNA
  '101.6.6.6', '2001:da8::666',
  // 下一代互联网国家工程中心（IPv6 公共 DNS）
  '240c::6666', '240c::6644',
  // 中国科学技术大学（教育网防污染）
  '202.141.162.123', '202.141.178.13',

  // ==================== 国外 ====================
  // Cloudflare
  '1.1.1.1', '1.0.0.1', '1.1.1.2', '1.0.0.2', '1.1.1.3', '1.0.0.3',
  '2606:4700:4700::1111', '2606:4700:4700::1001', '2606:4700:4700::1112', '2606:4700:4700::1002', '2606:4700:4700::1113', '2606:4700:4700::1003',
  'dns.cloudflare', 'cloudflare-dns', 'one.one.one.one',
  // Google Public DNS
  '8.8.8.8', '8.8.4.4', '2001:4860:4860::8888', '2001:4860:4860::8844', 'dns.google',
  // Quad9
  '9.9.9.9', '9.9.9.10', '9.9.9.11', '149.112.112.112', '149.112.112.10', '149.112.112.11', '2620:fe::fe', '2620:fe::9', 'quad9',
  // Cisco OpenDNS
  '208.67.222.222', '208.67.220.220', '208.67.222.123', '208.67.220.123',
  '2620:119:35::35', '2620:119:53::53', '2620:119:35::123', '2620:119:53::123', 'opendns',
  // AdGuard DNS
  '94.140.14.14', '94.140.15.15', '94.140.14.15', '94.140.15.16',
  '2a10:50c0::ad1:ff', '2a10:50c0::ad2:ff', '2a10:50c0::bad1:ff', '2a10:50c0::bad2:ff', 'adguard',
  // Control D
  '76.76.2.0', '76.76.10.0', '76.76.19.19', '76.223.122.150',
  // CleanBrowsing
  '185.228.168.9', '185.228.169.9', '185.228.168.10', '185.228.169.11', '185.228.168.168', '185.228.169.168', '2a0d:2a00:1::2', '2a0d:2a00:2::2',
  // Yandex DNS
  '77.88.8.8', '77.88.8.1', '2a02:6b8::feed:0ff', '2a02:6b8:0:1::feed:0ff',
  // Neustar UltraDNS
  '156.154.70.1', '156.154.71.1', '156.154.70.2', '156.154.71.2', '2610:a1:1018::1', '2610:a1:1019::1',
  // Mullvad DNS
  '194.242.2.2', '2a07:e340::2',
  // Hurricane Electric
  '74.82.42.42', '2001:470:20::2',
  // NextDNS / Apple
  'nextdns', 'dns.apple'
];

var commonDnsRegex = new RegExp(commonDnsList.map(function(dns) { return dns.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|'), 'i');

var chinaDNS = ['tls://223.5.5.5#DIRECT', 'tls://119.29.29.29#DIRECT'];
var foreignDNS = ['https://1.1.1.1/dns-query#默认代理', 'https://8.8.8.8/dns-query#默认代理'];
var defaultDNS = ['tls://223.5.5.5#DIRECT',
  'tls://119.29.29.29#DIRECT',
  'https://1.12.12.12/dns-query#DIRECT', 'https://223.5.5.5/dns-query#DIRECT',
  'https://120.53.53.53/dns-query#DIRECT'];
var proxyServerDNS = ['tls://223.5.5.5#DIRECT',
  'tls://119.29.29.29#DIRECT',
  'https://1.12.12.12/dns-query#DIRECT', 'https://223.5.5.5/dns-query#DIRECT',
  'https://120.53.53.53/dns-query#DIRECT'];

function hostSpecificity(pattern) {
  if (pattern.startsWith('+.')) return 2;
  if (pattern.startsWith('.')) return 1;
  if (pattern.indexOf('*') !== -1) return 0;
  return 3;
}

function matchDomainPattern(pattern, domains) {
  pattern = pattern.toLowerCase();
  if (pattern.indexOf('*') === -1 && !pattern.startsWith('+.') && !pattern.startsWith('.')) {
    return typeof domains === 'string' ? domains.toLowerCase() === pattern : Array.from(domains).some(function(d) { return d.toLowerCase() === pattern; });
  }
  var domainList = typeof domains === 'string' ? [domains.toLowerCase()] : Array.from(domains).map(function(d) { return d.toLowerCase(); });
  if (pattern.startsWith('+.')) {
    var suffix = pattern.slice(2);
    return domainList.some(function(domain) { return domain === suffix || domain.endsWith('.' + suffix); });
  }
  if (pattern.startsWith('.')) {
    var suffix2 = pattern.slice(1);
    return domainList.some(function(domain) { return domain !== suffix2 && domain.endsWith('.' + suffix2); });
  }
  var patternParts = pattern.split('.');
  return domainList.some(function(domain) {
    var domainParts = domain.split('.');
    return patternParts.length === domainParts.length && patternParts.every(function(part, index) { return part === '*' || part === domainParts[index]; });
  });
}

function applyHostsToProxies(proxies, hosts) {
  if (!hosts || typeof hosts !== 'object') return proxies;
  var hostEntries = Object.entries(hosts)
    .filter(function(entry) {
      var value = entry[1];
      return (typeof value === 'string' && value.length > 0) || (Array.isArray(value) && value.length > 0);
    })
    .sort(function(a, b) { return hostSpecificity(b[0]) - hostSpecificity(a[0]); });

  if (hostEntries.length === 0) return proxies;

  var targetOf = function(value) {
    if (Array.isArray(value)) {
      var found = value.find(function(v) { return typeof v === 'string' && v.length > 0; });
      value = found ? found : null;
    }
    return typeof value === 'string' && value.length > 0 ? value : null;
  };

  var resolveCache = new Map();
  var resolve = function(server) {
    var cached = resolveCache.get(server);
    if (cached !== undefined) return cached;
    var seen = new Set();
    var current = server.toLowerCase();
    var result = server;
    while (!seen.has(current)) {
      seen.add(current);
      var matchedEntry = hostEntries.find(function(entry) { return matchDomainPattern(entry[0], current); });
      var target = matchedEntry ? targetOf(matchedEntry[1]) : null;
      if (!target) break;
      result = target;
      current = target.toLowerCase();
    }
    resolveCache.set(server, result);
    return result;
  };

  var mapped = [];
  for (var i = 0; i < proxies.length; i++) {
    var proxy = proxies[i];
    if (typeof proxy.server !== 'string') {
      mapped.push(proxy);
      continue;
    }
    var server = resolve(proxy.server);
    if (server === proxy.server) {
      mapped.push(proxy);
    } else {
      mapped.push(Object.assign({}, proxy, { server: server }));
    }
  }
  return mapped;
}

function stripDnsSuffix(dns) {
  var str = String(dns);
  var hashIndex = str.indexOf('#');
  if (hashIndex === -1) return str;
  var prefix = str.slice(0, hashIndex).trim();
  var suffix = str.slice(hashIndex + 1).toLowerCase().trim();
  if (suffix.indexOf('direct') !== -1 || suffix.indexOf('直连') !== -1) return prefix + '#DIRECT';
  return prefix;
}

function isIpAddress(server) {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(server) || server.indexOf(':') !== -1;
}

function simplifyDomainPolicy(policy) {
  var groups = new Map();
  var policyKeys = Object.keys(policy);
  for (var i = 0; i < policyKeys.length; i++) {
    var domain = policyKeys[i];
    var dns = policy[domain];
    var dnsKey = JSON.stringify(Array.isArray(dns) ? Array.from(dns).sort() : dns);
    if (domain.startsWith('+.') || domain.startsWith('.') || domain.indexOf('*') !== -1) {
      groups.set('keep:' + domain, [{ domain: domain, dns: dns, dnsKey: dnsKey }]);
      continue;
    }
    var parts = domain.split('.');
    if (parts.length < 3) {
      groups.set('keep:' + domain, [{ domain: domain, dns: dns, dnsKey: dnsKey }]);
      continue;
    }
    var suffix = parts.slice(-2).join('.');
    if (!groups.has(suffix)) groups.set(suffix, []);
    groups.get(suffix).push({ domain: domain, dns: dns, dnsKey: dnsKey });
  }

  var result = {};
  var groupKeys = Array.from(groups.keys());
  for (var g = 0; g < groupKeys.length; g++) {
    var suffixGroup = groupKeys[g];
    var domains = groups.get(suffixGroup);
    if (suffixGroup.startsWith('keep:')) {
      for (var d = 0; d < domains.length; d++) {
        result[domains[d].domain] = domains[d].dns;
      }
      continue;
    }
    var firstDnsKey = domains[0].dnsKey;
    var sameDns = true;
    for (var dk = 1; dk < domains.length; dk++) {
      if (domains[dk].dnsKey !== firstDnsKey) { sameDns = false; break; }
    }
    if (domains.length >= 2 && sameDns) {
      result['+.' + suffixGroup] = domains[0].dns;
    } else {
      for (var dm = 0; dm < domains.length; dm++) {
        result[domains[dm].domain] = domains[dm].dns;
      }
    }
  }
  return result;
}

function buildDnsAndHostsConfig(config, filteredProxies) {
  var originalDnsConfig = config.dns || {};
  var proxyServerNameservers = originalDnsConfig['proxy-server-nameserver'] || [];
  var listenValue = originalDnsConfig['listen'];

  var shouldRewriteByHosts = false;
  if (proxyServerNameservers.length === 1 && typeof listenValue === 'string' && listenValue.length > 0) {
    var hasMatchListen = false;
    for (var ps = 0; ps < proxyServerNameservers.length; ps++) {
      if (String(proxyServerNameservers[ps]).toLowerCase().indexOf(listenValue.toLowerCase()) !== -1) {
        hasMatchListen = true;
        break;
      }
    }
    if (hasMatchListen || (listenValue.indexOf('0.0.0.0') !== -1)) {
      if (listenValue.indexOf('0.0.0.0') !== -1) {
        for (var ps2 = 0; ps2 < proxyServerNameservers.length; ps2++) {
          if (String(proxyServerNameservers[ps2]).toLowerCase().indexOf('127.0.0.1') !== -1) {
            shouldRewriteByHosts = true;
            break;
          }
        }
      } else {
        shouldRewriteByHosts = hasMatchListen;
      }
    }
  }

  var mappedProxies = shouldRewriteByHosts ? applyHostsToProxies(filteredProxies, config.hosts) : filteredProxies;

  var proxyDomainsSet = new Set();
  for (var mp = 0; mp < mappedProxies.length; mp++) {
    var pServ = mappedProxies[mp].server;
    if (typeof pServ === 'string' && !isIpAddress(pServ)) {
      proxyDomainsSet.add(pServ.toLowerCase());
    }
  }

  var privateProxyServerNameservers = shouldRewriteByHosts ? [] : proxyServerNameservers;
  var isCommonDns = function(dns) {
    var value = String(dns).trim().toLowerCase();
    if (value === 'system' || value === 'system://') return true;
    return commonDnsRegex.test(value);
  };

  var nsList = originalDnsConfig['nameserver'] || [];
  var combinedNs = nsList.concat(privateProxyServerNameservers);
  var cleanedNs = [];
  for (var cns = 0; cns < combinedNs.length; cns++) {
    var stripped = stripDnsSuffix(combinedNs[cns]);
    if (stripped.length > 0 && !isCommonDns(stripped)) {
      cleanedNs.push(stripped);
    }
  }
  var privateDNS = Array.from(new Set(cleanedNs));

  var matchedProxyPolicy = {};
  var nsPolicy = Object.assign({}, originalDnsConfig['nameserver-policy'], originalDnsConfig['proxy-server-nameserver-policy']);
  var nsPolicyKeys = Object.keys(nsPolicy);
  for (var i = 0; i < nsPolicyKeys.length; i++) {
    var domain = nsPolicyKeys[i];
    var dnsItem = nsPolicy[domain];
    if (!matchDomainPattern(domain, proxyDomainsSet)) continue;
    var stripedDns = Array.isArray(dnsItem) ? dnsItem.map(stripDnsSuffix).filter(function(d) { return d.length > 0; }) : stripDnsSuffix(dnsItem);
    if (Array.isArray(stripedDns) && stripedDns.length === 0) continue;
    matchedProxyPolicy[domain] = stripedDns;
  }

  if (privateDNS.length > 0 && Object.keys(matchedProxyPolicy).length === 0) {
    var pdArray = Array.from(proxyDomainsSet);
    for (var pd = 0; pd < pdArray.length; pd++) {
      matchedProxyPolicy[pdArray[pd]] = privateDNS;
    }
  }

  var matchedPolicyDomains = Object.keys(matchedProxyPolicy);
  var allDomainsMatched = true;
  if (proxyDomainsSet.size !== matchedPolicyDomains.length) {
    allDomainsMatched = false;
  }

  var proxyServerPolicy = allDomainsMatched ? simplifyDomainPolicy(matchedProxyPolicy) : matchedProxyPolicy;

  var originalFakeIpFilter = originalDnsConfig['fake-ip-filter'] || [];
  var proxyFakeIpFilter = [];
  for (var fif = 0; fif < originalFakeIpFilter.length; fif++) {
    if (matchDomainPattern(String(originalFakeIpFilter[fif]), proxyDomainsSet)) {
      proxyFakeIpFilter.push(originalFakeIpFilter[fif]);
    }
  }

  var fakeIpFilterList = [
    'rule-set:private',
    'rule-set:fakeip_filter',
    'rule-set:geolocation-cn'
  ];
  if (ruleOptionsEnable.FCM) fakeIpFilterList.push('rule-set:googlefcm');
  fakeIpFilterList = fakeIpFilterList.concat(proxyFakeIpFilter);

  var dns = {
    enable: true,
    ipv6: true,
    'use-hosts': true,
    'cache-algorithm': 'arc',
    'use-system-hosts': true,
    'enhanced-mode': 'fake-ip',
    'fake-ip-range': '198.18.0.1/15',
    'fake-ip-range6': '2001:2::1/48',
    'fake-ip-filter': fakeIpFilterList,
    'default-nameserver': defaultDNS,
    'proxy-server-nameserver': proxyServerDNS,
    nameserver: foreignDNS,
    'nameserver-policy': {
      'rule-set:private': 'system',
      'rule-set:cn': chinaDNS,
    },
    'direct-nameserver': chinaDNS,
    'direct-nameserver-follow-policy': true,
  };
  if (Object.keys(proxyServerPolicy).length > 0) {
    dns['proxy-server-nameserver-policy'] = proxyServerPolicy;
  }

  var hosts = {
    'doh.pub': ['1.12.12.12', '120.53.53.53'],
    'cloudflare-dns.com': ['1.1.1.1', '1.0.0.1'],
    'dns.google': ['8.8.8.8', '8.8.4.4'],
    'services.googleapis.cn': 'services.googleapis.com',
    '+.mcdn.bilivideo.com': ['0.0.0.0'],
    '+.mcdn.bilivideo.cn': ['0.0.0.0'],
    '+.edge.mountaintoys.cn': ['0.0.0.0'],
    '+.h2.smtcdns.net': ['0.0.0.0'],
  };

  return { dns: dns, hosts: hosts, proxies: mappedProxies };
}

function main(config) {
  if (config['proxy-providers'] && Object.keys(config['proxy-providers']).length > 0) {
    throw new Error('脚本不支持 proxy-providers，请使用包含完整节点列表的订阅进行覆写');
  }

  var proxies = filterAndNormalizeProxies(config);

  if (ruleOptionsEnable.代理IPV4优先 !== ruleOptionsEnable.代理IPV6优先) {
    var ipVersion = ruleOptionsEnable.代理IPV4优先 ? 'ipv4-prefer' : 'ipv6-prefer';
    for (var i = 0; i < proxies.length; i++) {
      proxies[i] = Object.assign({}, proxies[i], { 'ip-version': ipVersion });
    }
  }

  var generatedRegionGroups = buildRegionGroups(proxies);
  var functionalRes = buildFunctionalGroups(proxies, generatedRegionGroups);
  var globalGroup = functionalRes.globalGroup;
  var functionalGroups = functionalRes.functionalGroups;
  var baseControlGroups = functionalRes.baseControlGroups;
  var functionalRules = functionalRes.functionalRules;
  var finalRuleProviders = functionalRes.finalRuleProviders;

  var dnsHostsRes = buildDnsAndHostsConfig(config, proxies);
  var dns = dnsHostsRes.dns;
  var hosts = dnsHostsRes.hosts;
  var mappedProxies = dnsHostsRes.proxies;

  var proxyGroupsList = [globalGroup]
    .concat(functionalGroups)
    .concat(generatedRegionGroups)
    .concat(baseControlGroups);

  var rulesList = [
    'DOMAIN-SUFFIX,ctaiot.com,直连',
    'DOMAIN,cdn.jsdmirror.com,直连',
    'RULE-SET,private,直连',
    'RULE-SET,geolocation-cn,直连'
  ];
  if (ruleOptionsEnable.屏蔽国外QUIC) {
    rulesList = rulesList.concat(blockForeignQuic);
  }
  rulesList = rulesList.concat(functionalRules).concat([
    'RULE-SET,geolocation-!cn,默认代理',
    'RULE-SET,cn_ip,直连',
    'RULE-SET,private_ip,直连',
    'MATCH,默认代理'
  ]);

  var newConfig = {};

  newConfig['mixed-port'] = 7890;
  newConfig['allow-lan'] = false;
  newConfig['bind-address'] = '127.0.0.1';
  newConfig.ipv6 = true;
  newConfig['unified-delay'] = true;
  newConfig['tcp-concurrent'] = true;
  newConfig['find-process-mode'] = 'off';
  newConfig['keep-alive-idle'] = 600;
  newConfig['keep-alive-interval'] = 60;
  newConfig['external-controller'] = '127.0.0.1:9090';
  newConfig['external-ui'] = 'ui';
  newConfig['external-ui-url'] = 'https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip';
  newConfig['geodata-mode'] = false;
  newConfig.profile = {
    'store-selected': true,
    'store-fake-ip': true,
  };
  newConfig.dns = dns;
  newConfig.hosts = hosts;
  newConfig.ntp = {
    enable: true,
    'write-to-system': false,
    server: 'ntp.aliyun.com',
    port: 123,
    interval: 60,
  };
  newConfig.tun = {
    enable: true,
    stack: 'mips',
    'auto-route': true,
    'auto-redirect': true,
    'auto-detect-interface': true,
    'strict-route': true,
    'dns-hijack': ['any:53', 'tcp://any:53'],
  };
  newConfig.sniffer = {
    enable: true,
    'force-dns-mapping': true,
    'parse-pure-ip': true,
    'override-destination': true,
    sniff: {
      HTTP: { ports: [80, '8080-8880'] },
      TLS: { ports: [443, 8443] },
      QUIC: { ports: [443, 8443] },
    },
    'skip-dst-address': ['223.5.5.5/32', '119.29.29.29/32'],
  };
  newConfig.proxies = mappedProxies.concat(directProxies);
  newConfig['proxy-groups'] = proxyGroupsList;
  newConfig.rules = rulesList;
  newConfig['rule-providers'] = finalRuleProviders;

  return newConfig;
}
