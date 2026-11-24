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
  'RULE-SET,category-ai-cn,直连',
  'RULE-SET,games_cn,直连',
  'RULE-SET,games_download_cn,直连',
  'RULE-SET,nvidia_cn,直连',
  'RULE-SET,apple_cn,直连',
  'RULE-SET,adobe_cn,直连',
  'RULE-SET,microsoft_cn,直连',
  'DOMAIN-SUFFIX,ctaiot.com,直连',
];

// 定义全局排除节点的正则表达式，用于排除非地区节点
const excludeFilter =
  /群|返利|循环|官网|客服|网站|网址|获取|订阅|流量|到期|机场|下次|版本|官址|备用|过期|已用|联系|邮箱|工单|贩卖|通知|倒卖|防止|国内|地址|频道|电报|无法|说明|提示|访问|支持|教程|关注|更新|作者|加入|超时|收藏|优惠|福利|邀请|好友|失联|选择|剩余|公益|发布|DIZTNA|通路|登录|禁止|定时|渠道|牢记|永久|余额|阁下|本站|刷新|导航|建议|重置|以下|过滤|⚠️|@|t\.me\/\+|\bexpire\b|\bhttps?:\/\/|\.com|\btraffic\b/iu;

// 屏蔽代理QUIC流量
const blockForeignQuic = [
  'AND,((NETWORK,UDP),(DST-PORT,443),(NOT,((OR,((RULE-SET,cn),(RULE-SET,cn_ip,no-resolve)))))),REJECT',
];

// 自动补全 udp: true 的代理协议类型（确保关闭禁用 QUIC 时节点也能正常转发 UDP 流量）
const udpOptionalProxyTypes = new Set([
  'ss',
  'ssr',
  'socks5',
  'vmess',
  'vless',
  'trojan',
  'wireguard',
  'gost-relay',
  'mieru',
  'anytls',
  'masque',
  'trusttunnel',
  'tailscale',
  'zerotier',
  'easytier',
]);

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
// 直连策略组专用测速地址
const directTestUrl = 'http://dns.alidns.com';

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
    name: '欧洲',
    flag: '🇪🇺',
    regex:
      /🇪🇺|🇬🇧|🇩🇪|🇫🇷|🇳🇱|🇮🇹|🇪🇸|🇨🇭|🇸🇪|🇫🇮|🇳🇴|🇩🇰|🇵🇱|🇦🇹|🇧🇪|🇮🇪|🇵🇹|🇬🇷|🇨🇿|🇭🇺|🇷🇴|🇧🇬|🇺🇦|🇷🇺|🇹🇷|🇮🇸|🇱🇺|🇲🇹|🇨🇾|🇪🇪|🇱🇻|🇱🇹|🇸🇰|🇸🇮|🇭🇷|🇷🇸|🇧🇦|🇲🇪|🇲🇰|🇦🇱|🇲🇩|🇧🇾|🇲🇨|🇱🇮|🇦🇩|🇸🇲|🇻🇦|欧洲|欧盟|英国|英格兰|苏格兰|伦敦|曼彻斯特|德国|法兰克福|柏林|慕尼黑|法国|巴黎|马赛|荷兰|阿姆斯特丹|鹿特丹|意大利|米兰|罗马|西班牙|马德里|巴塞罗那|瑞士|苏黎世|日内瓦|瑞典|斯德哥尔摩|芬兰|赫尔辛基|挪威|奥斯陆|丹麦|哥本哈根|波兰|华沙|奥地利|维也纳|比利时|布鲁塞尔|爱尔兰|都柏林|葡萄牙|里斯本|希腊|雅典|捷克|布拉格|匈牙利|布达佩斯|罗马尼亚|布加勒斯特|保加利亚|索非亚|乌克兰|基辅|俄罗斯|莫斯科|圣彼得堡|土耳其|伊斯坦布尔|冰岛|雷克雅未克|卢森堡|马耳他|塞浦路斯|爱沙尼亚|塔林|拉脱维亚|里加|立陶宛|维尔纽斯|斯洛伐克|布拉迪斯拉发|斯洛文尼亚|卢布尔雅那|克罗地亚|萨格勒布|塞尔维亚|贝尔格莱德|摩尔多瓦|白俄罗斯|明斯克|摩纳哥|列支敦士登|安道尔|圣马力诺|梵蒂冈|(?<![A-Za-z])(?:Europe|European|Britain|United\s*Kingdom|England|Scotland|London|Manchester|Germany|Frankfurt|Berlin|Munich|France|Paris|Marseille|Netherlands|Holland|Amsterdam|Rotterdam|Italy|Milan|Rome|Spain|Madrid|Barcelona|Switzerland|Zurich|Geneva|Sweden|Stockholm|Finland|Helsinki|Norway|Oslo|Denmark|Copenhagen|Poland|Warsaw|Austria|Vienna|Belgium|Brussels|Ireland|Dublin|Portugal|Lisbon|Greece|Athens|Czech|Czechia|Prague|Hungary|Budapest|Romania|Bucharest|Bulgaria|Sofia|Ukraine|Kyiv|Kiev|Russia|Moscow|Turkey|Istanbul|Iceland|Reykjavik|Luxembourg|Malta|Cyprus|Estonia|Tallinn|Latvia|Riga|Lithuania|Vilnius|Slovakia|Bratislava|Slovenia|Ljubljana|Croatia|Zagreb|Serbia|Belgrade|Bosnia|Montenegro|Macedonia|Albania|Moldova|Belarus|Minsk|Monaco|Liechtenstein|Andorra|San\s*Marino|Vatican)(?![A-Za-z])/i,
    codeRegex:
      /(?<![A-Za-z])(?:EU|EUR|UK|GB|GBR|LHR|MAN|DE|DEU|FRA|BER|MUC|FR|PAR|MRS|NL|NLD|AMS|RTM|IT|ITA|MIL|MXP|ROM|FCO|ES|ESP|MAD|BCN|CH|CHE|ZRH|GVA|SE|SWE|ARN|FI|FIN|HEL|NO|NOR|OSL|DK|DNK|CPH|PL|POL|WAW|AT|AUT|VIE|BE|BEL|BRU|IE|IRL|DUB|PT|PRT|LIS|GR|GRC|ATH|CZ|CZE|PRG|HU|HUN|BUD|RO|ROU|OTP|BG|BGR|SOF|UA|UKR|KBP|RU|RUS|MOW|SVO|LED|TR|TUR|IST|IS|ISL|KEF|LU|LUX|MT|MLT|MLA|CY|CYP|LCA|EE|EST|TLL|LV|LVA|RIX|LT|LTU|VNO|SK|SVK|BTS|SI|SVN|LJU|HR|HRV|ZAG|RS|SRB|BEG|BA|BIH|ME|MNE|MK|MKD|AL|ALB|MD|MDA|BY|BLR|MSQ|MC|MCO|LI|LIE|AD|AND|SM|SMR|VA|VAT)(?![A-Za-z]|\.\d|&)/,
    icon: 'https://raw.githubusercontent.com/aaANDkk/Qure_Style_SVG/main/icon/svg/flag/European_Union.svg',
    default: true,
  },
];

// 解析 Bettbox 自定义扩展地区（剔除 g/y 状态修饰符，并安全转义回退名称）
const customRegionDefinitions =
  typeof bettboxCustomRegions !== 'undefined' && Array.isArray(bettboxCustomRegions)
    ? bettboxCustomRegions
        .filter((r) => r && typeof r.name === 'string' && typeof r.regex === 'string')
        .map((r) => {
          let reg;
          try {
            const match = r.regex.match(/^\/(.+)\/([a-z]*)$/i);
            const source = match ? match[1] : r.regex.trim();
            if (!source) throw new SyntaxError('empty pattern');
            reg = new RegExp(source, `${match ? match[2].replace(/[gyi]/gi, '') : ''}i`);
          } catch {
            const escaped =
              typeof RegExp.escape === 'function'
                ? RegExp.escape(r.name)
                : r.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            reg = new RegExp(escaped, 'i');
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

// 高低倍率策略组定义（精确边界匹配，避免 x09 / Max0 误判）
const lowRateRegionName = '低倍率节点';
const highRateRegionName = '高倍率节点';

const rateRegionDefinitions = [
  {
    name: lowRateRegionName,
    regex:
      /^(?!.*(?:剩|期)).*(?:(?<![\d.])0(?:\.[0-5]|[*×✕✖⨯⨉倍]|x(?![A-Za-z])))|(?:(?:[*×✕✖⨯⨉]|(?<![A-Za-z])x)0(?:\.[0-5]\d*)?(?![\d.]))|^(?!.*(?:客户端|软件)).*下载|低倍|免费|(?<![A-Za-z])free(?![A-Za-z])/i,
    icon: `${iconBaseUrl}Available.svg`,
  },
  {
    name: highRateRegionName,
    regex:
      /(?:(?:[*×✕✖⨯⨉]|(?<![A-Za-z])x)(?:[2-9]\d*|[1-9]\d+)(?:\.\d+)?)|(?:(?<![\d.])(?:[2-9]\d*|[1-9]\d+)(?:\.\d+)?(?:倍|[*×✕✖⨯⨉]|x(?![A-Za-z])))/i,
    icon: `${iconBaseUrl}Airport.svg`,
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
  games_download_cn: {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/category-game-platforms-download@cn.mrs`,
    path: './ruleset/category-game-platforms-download@cn.mrs',
    'path-in-bundle': 'geo/geosite/category-game-platforms-download@cn.mrs',
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
  'category-ai-cn': {
    ...ruleProviderCommonDomain,
    url: `${ruleSetBaseUrl}geosite/category-ai-cn.mrs`,
    path: './ruleset/category-ai-cn.mrs',
    'path-in-bundle': 'geo/geosite/category-ai-cn.mrs',
  },
  cn_ip: {
    ...ruleProviderCommonIpcidr,
    url: `${ruleSetBaseUrl}geoip/cn.mrs`,
    path: './ruleset/cn_ip.mrs',
    'path-in-bundle': 'geo/geoip/cn.mrs',
  },
  us_ip: {
    ...ruleProviderCommonIpcidr,
    url: `${ruleSetBaseUrl}geoip/us.mrs`,
    path: './ruleset/us_ip.mrs',
    'path-in-bundle': 'geo/geoip/us.mrs',
  },
  nl_ip: {
    ...ruleProviderCommonIpcidr,
    url: `${ruleSetBaseUrl}geoip/nl.mrs`,
    path: './ruleset/nl_ip.mrs',
    'path-in-bundle': 'geo/geoip/nl.mrs',
  },
  sg_ip: {
    ...ruleProviderCommonIpcidr,
    url: `${ruleSetBaseUrl}geoip/sg.mrs`,
    path: './ruleset/sg_ip.mrs',
    'path-in-bundle': 'geo/geoip/sg.mrs',
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
  timeout: 5000,
  url: 'https://www.apple.com/library/test/success.html',
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
  interval: 600,
  lazy: true,
  tolerance: 50,
  'exclude-type': 'DIRECT',
  icon: `${iconBaseUrl}Auto.svg`,
  hidden: true,
};

const fallbackBaseOption = {
  ...groupBaseOption,
  type: 'fallback',
  interval: 600,
  lazy: true,
  'exclude-type': 'DIRECT',
  icon: fallbackIconUrl,
  hidden: true,
};

const loadBalanceBaseOption = {
  ...groupBaseOption,
  type: 'load-balance',
  interval: 600,
  lazy: true,
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
    defaultSelected: ['美国', '台湾', '新加坡', '日本', '欧洲'],
    providers: {
      ai: {
        ...ruleProviderCommonDomain,
        url: `${ruleSetBaseUrl}geosite/category-ai-!cn.mrs`,
        path: './ruleset/ai.mrs',
        'path-in-bundle': 'geo/geosite/category-ai-!cn.mrs',
      },
      openai_ip: {
        ...ruleProviderCommonIpcidr,
        url: `${ruleSetBaseUrl}geoip/openai.mrs`,
        path: './ruleset/openai_ip.mrs',
        'path-in-bundle': 'geo/geoip/openai.mrs',
      },
    },
    icon: `${iconBaseUrl}OpenAI.svg`,
    rules: [
      'RULE-SET,ai,AI',
      'DOMAIN,cdn.usefathom.com,AI',
      'DOMAIN-SUFFIX,intercom.io,AI',
      'DOMAIN-SUFFIX,intercomcdn.com,AI',
    ],
    ipRules: ['RULE-SET,openai_ip,AI'],
  },
  {
    name: 'Google',
    baseOption: selectBaseOption,
    defaultSelected: ['美国', '台湾', '新加坡', '日本', '欧洲'],
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
    rules: ['RULE-SET,emby,Emby'],
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

// 适配 Bettbox 策略组开关与排序/自定义路由/节点地区预览
Compatible_With_Bettbox.policyGroupOptions = serviceConfigs.map((svc) => svc.name);
const customRoutes = typeof bettboxRoutes !== 'undefined' && Array.isArray(bettboxRoutes) ? bettboxRoutes : [];
const groupOrder = typeof bettboxOrder !== 'undefined' && Array.isArray(bettboxOrder) ? bettboxOrder : [];
const builtInReservedNames = [
  'GLOBAL',
  'DIRECT',
  'REJECT',
  'REJECT-DROP',
  'PASS',
  'PASS-RULE',
  'COMPATIBLE',
  '默认代理',
  '直连',
  '其他节点',
  '其他节点-自动选择',
  '其他节点-自动回退',
  '其他节点-负载均衡',
  ...serviceConfigs.map((svc) => svc.name),
  ...allRegionDefinitions.flatMap((region) => [
    region.name,
    `${region.name}-自动选择`,
    `${region.name}-自动回退`,
    `${region.name}-负载均衡`,
  ]),
  ...directProxies.map((p) => p.name),
];

// --- 节点过滤、重命名及验证 ---

/**
 * 零宽/不可见字符：清除干扰字符的同时精准白名单保留 ZWNJ/ZWJ、变体选择符与地区旗帜标签字符
 */
const invisibleCharsRegex =
  /[\p{Default_Ignorable_Code_Point}--[\u200C\u200D\uFE00-\uFE0F\u{E0020}-\u{E007F}\u{E0100}-\u{E01EF}]]/gv;

function toMatchableName(name) {
  return typeof name === 'string' ? name.replace(invisibleCharsRegex, '') : name;
}

const euFlags = new Set([
  '🇪🇺', '🇬🇧', '🇩🇪', '🇫🇷', '🇳🇱', '🇮🇹', '🇪🇸', '🇨🇭', '🇸🇪', '🇫🇮', '🇳🇴', '🇩🇰',
  '🇵🇱', '🇦🇹', '🇧🇪', '🇮🇪', '🇵🇹', '🇬🇷', '🇨🇿', '🇭🇺', '🇷🇴', '🇧🇬', '🇺🇦', '🇷🇺',
  '🇹🇷', '🇮🇸', '🇱🇺', '🇲🇹', '🇨🇾', '🇪🇪', '🇱🇻', '🇱🇹', '🇸🇰', '🇸🇮', '🇭🇷', '🇷🇸',
  '🇧🇦', '🇲🇪', '🇲🇰', '🇦🇱', '🇲🇩', '🇧🇾', '🇲🇨', '🇱🇮', '🇦🇩', '🇸🇲', '🇻🇦',
]);
const allFlagRegex = /\p{RGI_Emoji_Flag_Sequence}/gv;

const regionMatchCache = new Map();
function getMatchedRegions(proxyName) {
  if (regionMatchCache.has(proxyName)) {
    return regionMatchCache.get(proxyName);
  }

  const matchableName = toMatchableName(proxyName);
  const flagsInName = matchableName.match(allFlagRegex) || [];
  const hasNonEuFlag = flagsInName.some((flag) => !euFlags.has(flag));
  const nonEuActiveMatched =
    hasNonEuFlag ||
    activeRegionDefinitions.some((region) => region.name !== '欧洲' && region.regex.test(matchableName));

  const regions = allRegionDefinitions.filter((region) => {
    if (region.regex.test(matchableName)) return true;
    if (region.codeRegex && !nonEuActiveMatched) {
      return region.codeRegex.test(matchableName);
    }
    return false;
  });
  regionMatchCache.set(proxyName, regions);

  return regions;
}

// 暴露节点地区映射供 Bettbox 客户端 UI 提前预览分组结果
const userNodeNames =
  typeof bettboxNodeNames !== 'undefined' && Array.isArray(bettboxNodeNames)
    ? bettboxNodeNames.filter((name) => typeof name === 'string' && name)
    : [];

Compatible_With_Bettbox.nodeRegions = Object.fromEntries(
  userNodeNames.map((name) => [
    name,
    getMatchedRegions(name)
      .filter((region) => activeRegionDefinitions.includes(region))
      .map((region) => region.name),
  ]),
);

const flagRegex = /\p{RGI_Emoji_Flag_Sequence}/v;
function normalizeProxyName(proxy) {
  const originalName = proxy.name;
  const flag = originalName.match(flagRegex)?.[0];
  const nameWithoutFlag = (flag ? originalName.replace(flag, '') : originalName).replace(/\s+/g, ' ').trim();
  const matchedRegions = getMatchedRegions(originalName);
  const regionFlag = flag || matchedRegions.find((region) => region.flag)?.flag;
  const normalizedName = regionFlag
    ? nameWithoutFlag
      ? `${regionFlag} ${nameWithoutFlag}`
      : regionFlag
    : nameWithoutFlag;

  if (normalizedName !== originalName) {
    regionMatchCache.set(normalizedName, matchedRegions);
  }

  return normalizedName === originalName ? proxy : { ...proxy, name: normalizedName };
}

/**
 * 解析 dialer-proxy 目标：节点按重命名更新，只含单个成员的原策略组展开为该成员，无法确定唯一节点时返回 null
 */
function resolveDialerTarget(target, renameMap, proxyNames, groupMembers) {
  const seen = new Set();
  let current = target;
  while (!seen.has(current)) {
    seen.add(current);
    if (renameMap.has(current)) return renameMap.get(current);
    if (proxyNames.has(current)) return current;
    const members = groupMembers.get(current);
    if (members?.length !== 1) return null;
    current = members[0];
  }
  return null;
}

/**
 * 修复 dialer-proxy 引用：目标无法解析为保留下来的节点时返回 null，由调用方整条剔除该节点，避免中转失效后直连落地
 */
function fixDialerProxy(proxy, renameMap, proxyNames, groupMembers) {
  if (proxy['dialer-proxy'] == null || proxy['dialer-proxy'] === '') return proxy;
  const target = resolveDialerTarget(String(proxy['dialer-proxy']), renameMap, proxyNames, groupMembers);
  if (target === null) return null;
  return target === proxy['dialer-proxy'] ? proxy : { ...proxy, 'dialer-proxy': target };
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

  const originalProxies = (Array.isArray(config.proxies) ? config.proxies : [])
    .filter((proxy) => proxy && typeof proxy === 'object' && proxy.name != null)
    .map((proxy) => (typeof proxy.name === 'string' ? proxy : { ...proxy, name: String(proxy.name) }));

  const filteredRawProxies = originalProxies.filter((proxy) => {
    const type = String(proxy.type ?? '').toLowerCase();
    if (type === 'direct' || type === 'reject' || type === 'rematch') return false;

    const matchableName = toMatchableName(proxy.name);

    if (lowRateRegex?.test(matchableName) || highRateRegex?.test(matchableName)) return false;

    if (!filterNonRegionProxiesEnabled) return true;

    const isRegionProxy = getMatchedRegions(proxy.name).some((region) => activeRegionDefinitions.includes(region));

    return isRegionProxy || !excludeFilter.test(matchableName);
  });

  const reservedProxyNames = new Set([
    ...builtInReservedNames,
    ...customRoutes
      .filter((route) => route && typeof route.name === 'string' && Array.isArray(route.sets) && route.sets.length > 0)
      .map((route) => route.name),
  ]);
  const renameMap = new Map();
  const normalizedProxies = [];
  const rawNames = new Set();
  const proxyNames = new Set();

  for (const rawProxy of filteredRawProxies) {
    if (rawNames.has(rawProxy.name)) continue;
    rawNames.add(rawProxy.name);

    let normalized = normalizeProxyName(rawProxy);
    const baseName = normalized.name || '节点';
    let candidate = baseName;
    if (proxyNames.has(candidate) || reservedProxyNames.has(candidate)) {
      let index = 2;
      while (proxyNames.has(`${baseName} ${index}`) || reservedProxyNames.has(`${baseName} ${index}`)) index++;
      candidate = `${baseName} ${index}`;
    }
    if (candidate !== normalized.name) {
      regionMatchCache.set(candidate, getMatchedRegions(rawProxy.name));
      normalized = { ...normalized, name: candidate };
    }
    if (normalized.name !== rawProxy.name) {
      renameMap.set(rawProxy.name, normalized.name);
    }
    proxyNames.add(normalized.name);
    normalizedProxies.push(normalized);
  }

  const groupMembers = new Map(
    (Array.isArray(config['proxy-groups']) ? config['proxy-groups'] : [])
      .filter((group) => group && group.name != null && Array.isArray(group.proxies))
      .map((group) => [String(group.name), group.proxies.map(String)]),
  );

  let filteredProxies = normalizedProxies
    .map((proxy) => fixDialerProxy(proxy, renameMap, proxyNames, groupMembers))
    .filter(Boolean);

  for (;;) {
    const names = new Set(filteredProxies.map((proxy) => proxy.name));
    const next = filteredProxies.filter((proxy) => !proxy['dialer-proxy'] || names.has(proxy['dialer-proxy']));
    if (next.length === filteredProxies.length) break;
    filteredProxies = next;
  }

  if (!filteredProxies.length) {
    throw new Error('配置文件中未找到任何代理节点，请使用机场提供的配置文件进行覆写');
  }

  const ipVersionPreference = getIpVersionPreference();
  return filteredProxies.map((proxy) => {
    const type = String(proxy.type ?? '').toLowerCase();
    const needsUdp =
      proxy.udp == null &&
      (udpOptionalProxyTypes.has(type) || (type === 'snell' && Number(proxy.version) >= 3));
    const needsIpPref = ipVersionPreference && proxy['ip-version'] !== ipVersionPreference;
    if (!needsUdp && !needsIpPref) return proxy;
    return {
      ...proxy,
      ...(needsUdp && { udp: true }),
      ...(needsIpPref && { 'ip-version': ipVersionPreference }),
    };
  });
}

// --- 构建地区策略组与排序 ---

const groupOrderKeys = (() => {
  if (!groupOrder.length) return null;

  const names = serviceConfigs.map((svc) => svc.name);
  const anchorIndex = names.indexOf('AdBlock');
  names.splice(anchorIndex < 0 ? names.length : anchorIndex, 0, ...customRoutes.map((route) => route?.name));
  names.push('直连', ...allRegionDefinitions.map((region) => region.name), '其他节点');

  const rank = new Map(groupOrder.map((name, index) => [name, index]));
  const keys = new Map();
  let last = -1;
  names.forEach((name, index) => {
    const order = rank.get(name);
    if (order !== undefined) last = order;
    if (typeof name === 'string' && !keys.has(name)) keys.set(name, [order ?? last + 0.5, index]);
  });
  return keys;
})();

function sortByGroupOrder(services) {
  if (!groupOrderKeys) return services;

  const keyOf = (name) =>
    groupOrderKeys.get(name) ??
    groupOrderKeys.get(name.replace(/-(?:自动选择|自动回退|负载均衡)$/, '')) ?? [Infinity, Infinity];
  return services
    .map((svc, index) => ({ svc, index, key: keyOf(svc.name) }))
    .sort((a, b) => a.key[0] - b.key[0] || a.key[1] - b.key[1] || a.index - b.index)
    .map((entry) => entry.svc);
}

function createRegionGroup(name, icon, proxies, userNodes) {
  const generateRegionAutoSelectEnabled = ruleOptionsEnable.生成地区自动选择组 || ruleOptionsEnable.隐藏地区手动选择组;
  const generateRegionFallbackEnabled = ruleOptionsEnable.生成地区自动回退组;
  const generateRegionLoadBalanceEnabled = ruleOptionsEnable.生成地区负载均衡组;
  const hideManualSelectGroupEnabled = ruleOptionsEnable.隐藏地区手动选择组;

  const region = userNodes ? { 'x-region': name } : {};
  const regionNodes = userNodes?.length ? { 'x-region-nodes': userNodes } : {};

  const extraGroups = [];
  const selectProxies = [];

  if (generateRegionAutoSelectEnabled) {
    const urlTestName = `${name}-自动选择`;
    extraGroups.push({
      ...urlTestBaseOption,
      name: urlTestName,
      ...region,
      proxies,
    });
    selectProxies.push(urlTestName);
  }

  if (generateRegionFallbackEnabled) {
    const fallbackName = `${name}-自动回退`;
    extraGroups.push({
      ...fallbackBaseOption,
      name: fallbackName,
      ...region,
      proxies,
    });
    selectProxies.push(fallbackName);
  }

  if (generateRegionLoadBalanceEnabled) {
    const lbName = `${name}-负载均衡`;
    extraGroups.push({
      ...loadBalanceBaseOption,
      name: lbName,
      ...region,
      proxies,
    });
    selectProxies.push(lbName);
  }

  return [
    {
      ...selectBaseOption,
      name,
      icon,
      ...region,
      ...regionNodes,
      proxies: [...selectProxies, ...proxies],
      hidden: hideManualSelectGroupEnabled,
    },
    ...extraGroups,
  ];
}

function buildRegionGroups(filteredProxies) {
  const generateRateGroupEnabled = ruleOptionsEnable.生成高低倍率组;
  const regionGroups = Object.fromEntries(allRegionDefinitions.map(({ name }) => [name, []]));
  const otherProxies = [];

  for (const proxy of filteredProxies) {
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
    .flatMap((r) =>
      createRegionGroup(
        r.name,
        r.icon,
        regionGroups[r.name],
        activeRegionDefinitions.includes(r)
          ? userNodeNames.filter((name) => Compatible_With_Bettbox.nodeRegions[name].includes(r.name))
          : undefined,
      ),
    );

  if (otherProxies.length > 0) {
    generatedRegionGroups.push(...createRegionGroup('其他节点', `${iconBaseUrl}WorldMap.svg`, otherProxies));
  }

  return generatedRegionGroups;
}

// --- 构建自定义分流策略组 ---

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

function buildFunctionalGroups(filteredProxies, generatedRegionGroups) {
  const minimalModeEnabled = ruleOptionsEnable.极简国内外分流模式;
  const addAllNodesToServiceGroupsEnabled = ruleOptionsEnable.分流组添加所有节点;
  const hideManualSelectGroupEnabled = ruleOptionsEnable.隐藏地区手动选择组;

  const functionalGroups = [];
  const functionalRules = [];
  const functionalIpRules = [];
  const priorityRules = [];
  const dnsPolicyGroups = [];
  const finalRuleProviders = { ...baseRuleProviders };

  const allProxiesNames = filteredProxies.map((p) => p.name);
  const groupNamesOfSelect = generatedRegionGroups.filter((g) => g.type === 'select').map((g) => g.name);
  const baseGroupNames = baseGroups.filter((g) => ruleOptionsEnable[g.name]).map((g) => g.name);

  if (minimalModeEnabled) {
    const autoSelectGroupEnabled = ruleOptionsEnable.自动选择;
    const fallbackGroupEnabled = ruleOptionsEnable.自动回退;

    const adBlockService = ruleOptionsEnable.AdBlock ? serviceConfigs.find((svc) => svc.priority) : null;
    const adBlockGroup = adBlockService && {
      ...adBlockService.baseOption,
      name: adBlockService.name,
      icon: adBlockService.icon,
      proxies: ['REJECT', 'PASS', '直连', '默认代理'],
    };
    if (adBlockService) {
      priorityRules.push(...adBlockService.rules);
      Object.assign(finalRuleProviders, adBlockService.providers);
    }

    const defaultProxiesList = [
      ...allProxiesNames,
      ...(autoSelectGroupEnabled ? ['自动选择'] : []),
      ...(fallbackGroupEnabled ? ['自动回退'] : []),
    ];

    const defaultGroup = {
      ...selectBaseOption,
      name: '默认代理',
      proxies: defaultProxiesList.length > 0 ? defaultProxiesList : ['DIRECT'],
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
      url: directTestUrl,
      proxies: [...directProxies.map((p) => p.name)],
      icon: `${iconBaseUrl}China.svg`,
      hidden: true,
    };

    const activeFunctionalGroups = [
      defaultGroup,
      ...(autoSelectGroupEnabled ? [autoSelectGroup] : []),
      ...(fallbackGroupEnabled ? [fallbackGroup] : []),
      ...(adBlockGroup ? [adBlockGroup] : []),
      directGroup,
    ];

    const globalGroup = {
      ...selectBaseOption,
      name: 'GLOBAL',
      proxies: activeFunctionalGroups.map((g) => g.name),
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

  const standardDefaultProxies = [...groupNamesOfSelect, ...baseGroupNames];
  functionalGroups.push({
    ...selectBaseOption,
    name: '默认代理',
    proxies: standardDefaultProxies.length > 0 ? standardDefaultProxies : ['DIRECT'],
    icon: `${iconBaseUrl}Proxy.svg`,
  });

  const reservedNames = new Set([
    ...builtInReservedNames,
    ...generatedRegionGroups.map((g) => g.name),
    ...allProxiesNames,
  ]);

  const services = [...serviceConfigs];
  const anchorIndex = services.findIndex((svc) => svc.name === 'AdBlock');
  services.splice(anchorIndex < 0 ? services.length : anchorIndex, 0, ...buildCustomServices(reservedNames));

  for (const svc of sortByGroupOrder(services)) {
    if (!svc.custom && !ruleOptionsEnable[svc.name]) continue;

    (svc.priority ? priorityRules : functionalRules).push(...(svc.rules || []));
    functionalIpRules.push(...(svc.ipRules || []));
    Object.assign(finalRuleProviders, svc.providers || {});

    const groupProxies = svc.includeAll
      ? [...allProxiesNames]
      : svc.reject
        ? ['REJECT', 'PASS', '直连', '默认代理']
        : svc.onlyDefaultAndDirect
          ? ['默认代理', '直连']
          : [
              '默认代理',
              ...baseGroupNames,
              ...groupNamesOfSelect,
              ...(addAllNodesToServiceGroupsEnabled ? allProxiesNames : []),
              ...(svc.direct ? ['直连'] : []),
            ];

    const defaultCandidates = Array.isArray(svc.defaultSelected)
      ? svc.defaultSelected
      : svc.defaultSelected !== undefined
        ? [svc.defaultSelected]
        : [];
    const selected = defaultCandidates.find((name) => groupProxies.includes(name));

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
    url: directTestUrl,
    proxies: [...directProxies.map((p) => p.name)],
    icon: `${iconBaseUrl}China.svg`,
    hidden: hideManualSelectGroupEnabled,
  };

  const [defaultGroup, ...serviceGroups] = functionalGroups;
  const orderedSubGroups = [
    defaultGroup,
    ...sortByGroupOrder([...serviceGroups, directGroup, ...generatedRegionGroups]),
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

const commonDnsIps = new Set(commonDnsList.filter(isIpAddress));
const commonDnsKeywords = commonDnsList.filter((dns) => !isIpAddress(dns));

function dnsHost(dns) {
  let host = dns.replace(/^[a-z][a-z0-9+.-]*:\/\//, '').split(/[/?#]/, 1)[0];
  host = host.slice(host.lastIndexOf('@') + 1);
  const bracketed = host.match(/^\[([^\]]*)\]/);
  if (bracketed) return bracketed[1];
  return host.indexOf(':') === host.lastIndexOf(':') ? host.split(':')[0] : host;
}

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

/**
 * 构建 DNS 与 hosts：保留私有 DNS、节点域名 policy/fake-ip-filter 与命中节点域名的订阅 hosts，并按 hosts 改写节点 server
 * hosts改写条件（仅在检测到本地 listen DNS 劫持时触发，其余交由内核 use-hosts 处理以保护原始域名 SNI）：
 * 1. proxy-server-nameserver 有且仅有一个 DNS 并且该 DNS 包含非空的 listen 值
 * 2. proxy-server-nameserver 有且仅有一个 DNS 并且该 DNS 包含 127.0.0.1 并且 listen 包含 0.0.0.0
 */
function buildDnsAndHostsConfig(config, filteredProxies, dnsPolicyGroups) {
  const minimalModeEnabled = ruleOptionsEnable.极简国内外分流模式;
  const originalDnsConfig = config.dns || {};
  const listenValue = originalDnsConfig['listen'];
  const rawProxyServerNameservers = originalDnsConfig['proxy-server-nameserver'];

  const proxyServerNameservers = (
    Array.isArray(rawProxyServerNameservers)
      ? rawProxyServerNameservers
      : rawProxyServerNameservers === undefined || rawProxyServerNameservers === null
        ? []
        : [rawProxyServerNameservers]
  ).filter((dns) => String(dns ?? '').trim() !== '');

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

    const host = dnsHost(value);
    return commonDnsIps.has(host) || commonDnsKeywords.some((keyword) => host.includes(keyword));
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
      '*',
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

  // 保留订阅中命中节点域名的 hosts 映射，避免未走 local-listen 劫持的专属域名失联
  const proxyHosts = Object.fromEntries(
    Object.entries(config.hosts && typeof config.hosts === 'object' ? config.hosts : {}).filter(
      ([pattern, value]) =>
        ((typeof value === 'string' && value.length > 0) || (Array.isArray(value) && value.length > 0)) &&
        matchProxyDomain(pattern),
    ),
  );

  const hosts = {
    ...proxyHosts,

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

  const generatedRegionGroups = ruleOptionsEnable.极简国内外分流模式
    ? []
    : buildRegionGroups(filteredProxies);
  const generatedGroupNames = new Set(generatedRegionGroups.map((g) => g.name));

  const {
    globalGroup,
    orderedSubGroups,
    functionalRules,
    functionalIpRules,
    priorityRules,
    dnsPolicyGroups,
    finalRuleProviders,
  } = buildFunctionalGroups(filteredProxies, generatedRegionGroups);

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

  newConfig['sniffer'] = {
    enable: true,
    'parse-pure-ip': true,
    sniff: {
      HTTP: {
        ports: [80, '8080-8880'],
        'override-destination': true,
      },
      TLS: {
        ports: [443, 8443],
      },
      QUIC: {
        ports: [443, 8443],
      },
    },
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

  newConfig['proxies'] = [...mappedProxies, ...directProxies];
  newConfig['proxy-groups'] = [globalGroup, ...orderedSubGroups];
  newConfig['rule-providers'] = finalRuleProviders;

  newConfig['rules'] = [
    ...prefixRules,
    ...priorityRules,
    ...(ruleOptionsEnable.屏蔽代理QUIC流量 ? blockForeignQuic : []),
    ...directRules,

    // Telegram 按 DC 所在国家就近分流（DC1/3->美国, DC2/4->欧洲[荷兰], DC5->新加坡）
    ...(ruleOptionsEnable.Telegram && !ruleOptionsEnable.极简国内外分流模式
      ? [
          ...(generatedGroupNames.has('美国')
            ? ['AND,((OR,((RULE-SET,telegram),(RULE-SET,telegram_ip))),(RULE-SET,us_ip)),美国']
            : []),
          ...(generatedGroupNames.has('欧洲')
            ? ['AND,((OR,((RULE-SET,telegram),(RULE-SET,telegram_ip))),(RULE-SET,nl_ip)),欧洲']
            : []),
          ...(generatedGroupNames.has('新加坡')
            ? ['AND,((OR,((RULE-SET,telegram),(RULE-SET,telegram_ip))),(RULE-SET,sg_ip)),新加坡']
            : []),
        ]
      : []),

    ...functionalRules,
    'RULE-SET,geolocation-!cn,默认代理',
    'RULE-SET,cn_ip,直连',
    'RULE-SET,private_ip,直连',

    ...functionalIpRules,

    // 兜底规则
    'MATCH,默认代理',
  ];

  return newConfig;
}
