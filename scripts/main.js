// ==================== QPS趋势和延迟时间趋势图表 ====================
let qpsChartInstance = null;
let latencyChartInstance = null;
let currentChartType = 'send';
let currentTimeRange = '5m';

function generateTimestamps(count, intervalMinutes) {
  const timestamps = [];
  const now = Date.now();
  for (let i = count - 1; i >= 0; i--) {
    timestamps.push(new Date(now - i * intervalMinutes * 60 * 1000));
  }
  return timestamps;
}

function formatTimestamp(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function generateQPSData(count) {
  const clientData = [];
  const channelData = [];
  for (let i = 0; i < count; i++) {
    clientData.push(Math.floor(Math.random() * 5000) + 8000);
    channelData.push(Math.floor(Math.random() * 4500) + 7500);
  }
  return { client: clientData, channel: channelData };
}

function generateLatencyData(count) {
  const clientData = [];
  const channelData = [];
  for (let i = 0; i < count; i++) {
    clientData.push(Math.floor(Math.random() * 150) + 50);
    channelData.push(Math.floor(Math.random() * 200) + 80);
  }
  return { client: clientData, channel: channelData };
}

function initQPSChart() {
  const chartDom = document.getElementById('qpsChart');
  if (!chartDom) return;
  qpsChartInstance = echarts.init(chartDom);
  updateQPSChart();
}

function updateQPSChart() {
  if (!qpsChartInstance) return;
  
  let dataCount, intervalMinutes;
  switch (currentTimeRange) {
    case '5m':
      dataCount = 10;
      intervalMinutes = 0.5;
      break;
    case '1h':
      dataCount = 12;
      intervalMinutes = 5;
      break;
    case '24h':
    default:
      dataCount = 24;
      intervalMinutes = 60;
      break;
  }
  
  const timestamps = generateTimestamps(dataCount, intervalMinutes);
  const xAxisData = timestamps.map(formatTimestamp);
  const qpsData = generateQPSData(dataCount);
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15,23,42,0.9)',
      borderColor: '#3b82f6',
      textStyle: { color: 'white' }
    },
    legend: {
      data: ['客户侧', '通道侧'],
      top: 5,
      textStyle: { fontSize: 12 }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 40,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisLabel: { fontSize: 11, color: '#666' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 11, color: '#666' }
    },
    series: [
      {
        name: '客户侧',
        type: 'line',
        smooth: true,
        data: qpsData.client,
        lineStyle: { color: '#1a73e8', width: 2 },
        itemStyle: { color: '#1a73e8' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(26, 115, 232, 0.3)' },
            { offset: 1, color: 'rgba(26, 115, 232, 0.05)' }
          ])
        }
      },
      {
        name: '通道侧',
        type: 'line',
        smooth: true,
        data: qpsData.channel,
        lineStyle: { color: '#4caf50', width: 2 },
        itemStyle: { color: '#4caf50' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(76, 175, 80, 0.3)' },
            { offset: 1, color: 'rgba(76, 175, 80, 0.05)' }
          ])
        }
      }
    ]
  };
  
  qpsChartInstance.setOption(option);
}

function initLatencyChart() {
  const chartDom = document.getElementById('latencyChart');
  if (!chartDom) return;
  latencyChartInstance = echarts.init(chartDom);
  updateLatencyChart();
}

function updateLatencyChart() {
  if (!latencyChartInstance) return;
  
  let dataCount, intervalMinutes;
  switch (currentTimeRange) {
    case '5m':
      dataCount = 10;
      intervalMinutes = 0.5;
      break;
    case '1h':
      dataCount = 12;
      intervalMinutes = 5;
      break;
    case '24h':
    default:
      dataCount = 24;
      intervalMinutes = 60;
      break;
  }
  
  const timestamps = generateTimestamps(dataCount, intervalMinutes);
  const xAxisData = timestamps.map(formatTimestamp);
  const latencyData = generateLatencyData(dataCount);
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15,23,42,0.9)',
      borderColor: '#3b82f6',
      textStyle: { color: 'white' }
    },
    legend: {
      data: ['客户延迟', '通道延迟'],
      top: 5,
      textStyle: { fontSize: 12 }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 40,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisLabel: { fontSize: 11, color: '#666' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 11, color: '#666', formatter: '{value} ms' }
    },
    series: [
      {
        name: '客户延迟',
        type: 'line',
        smooth: true,
        data: latencyData.client,
        lineStyle: { color: '#1a73e8', width: 2 },
        itemStyle: { color: '#1a73e8' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(26, 115, 232, 0.3)' },
            { offset: 1, color: 'rgba(26, 115, 232, 0.05)' }
          ])
        }
      },
      {
        name: '通道延迟',
        type: 'line',
        smooth: true,
        data: latencyData.channel,
        lineStyle: { color: '#ff9800', width: 2 },
        itemStyle: { color: '#ff9800' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255, 152, 0, 0.3)' },
            { offset: 1, color: 'rgba(255, 152, 0, 0.05)' }
          ])
        }
      }
    ]
  };
  
  latencyChartInstance.setOption(option);
}

function switchChartType(type) {
  currentChartType = type;
  const sendBtn = document.querySelector('.card-header button:first-child');
  const receiptBtn = document.querySelector('.card-header button:nth-child(2)');
  
  if (sendBtn && receiptBtn) {
    sendBtn.classList.toggle('btn-primary', type === 'send');
    sendBtn.classList.toggle('btn-default', type !== 'send');
    receiptBtn.classList.toggle('btn-primary', type === 'receipt');
    receiptBtn.classList.toggle('btn-default', type !== 'receipt');
  }
  
  updateQPSChart();
}

function switchTimeRange(range) {
  currentTimeRange = range;
  updateQPSChart();
  updateLatencyChart();
}

function switchLatencyTime(range) {
  currentTimeRange = range;
  updateLatencyChart();
}

function handleChartResize() {
  if (qpsChartInstance && !qpsChartInstance.isDisposed) {
    qpsChartInstance.resize();
  }
  if (latencyChartInstance && !latencyChartInstance.isDisposed) {
    latencyChartInstance.resize();
  }
}

// ==================== 错误码分布数据 ====================
const errorDB = {
  client: {
    http: {
      "400 (错误请求)": 145,
      "401 (未授权)": 87,
      "403 (禁止)": 34,
      "404 (不存在)": 210,
      "500 (服务器错误)": 96,
      "502 (网关错误)": 43,
      "503 (服务不可用)": 22
    },
    sgip: {
      "1001 (认证失败)": 56,
      "1002 (超时)": 32,
      "1003 (重复提交)": 78,
      "1005 (黑名单)": 44,
      "1010 (未知错误)": 19,
      "1008 (限流)": 27
    },
    cmpp: {
      "3 (鉴权错误)": 120,
      "4 (版本不支持)": 88,
      "8 (流量超限)": 210,
      "10 (资源不足)": 66,
      "12 (其他错误)": 45,
      "9 (非法源地址)": 31
    }
  },
  channel: {
    sgip: {
      "2001 (连接失败)": 92,
      "2002 (鉴权失败)": 67,
      "2003 (超时)": 134,
      "2005 (黑名单)": 48,
      "2008 (网关拒绝)": 23,
      "2010 (系统异常)": 11
    },
    cmpp: {
      "1 (消息结构错)": 45,
      "5 (帐号禁用)": 132,
      "7 (费用超限)": 211,
      "9 (路由错误)": 77,
      "11 (目标拦截)": 34,
      "13 (内容敏感)": 18
    },
    smgp: {
      "1 (非法消息)": 67,
      "2 (校验失败)": 89,
      "3 (用户未注册)": 123,
      "4 (消息长度错)": 45,
      "5 (权限不足)": 23,
      "6 (超时)": 156,
      "7 (系统繁忙)": 78
    }
  }
};

let currentErrorRole = 'client';
const errorChartInstances = {};
const clientProtocols = ['http', 'sgip', 'cmpp'];
const channelProtocols = ['sgip', 'cmpp', 'smgp'];

function getProtocolList(role) {
  return role === 'client' ? clientProtocols : channelProtocols;
}

function getErrorMap(role, protocol) {
  try {
    return errorDB[role] && errorDB[role][protocol] ? { ...errorDB[role][protocol] } : {};
  } catch (e) {
    return {};
  }
}

function computeTotal(errorMap) {
  let total = 0;
  for (let v of Object.values(errorMap)) total += v;
  return total;
}

function buildSeriesData(errorMap) {
  const series = [];
  for (let [codeName, count] of Object.entries(errorMap)) {
    if (count > 0) {
      series.push({ name: codeName, value: count });
    }
  }
  if (series.length === 0) {
    series.push({ name: '暂无错误', value: 1, itemStyle: { color: '#cbd5e1' } });
  }
  return series;
}

function updateErrorStats(protocol, errorMap) {
  const total = computeTotal(errorMap);
  const totalEl = document.getElementById(`total-${protocol}`);
  const highEl = document.getElementById(`高频-${protocol}`);
  if (totalEl) totalEl.textContent = total.toLocaleString();
  if (total === 0) {
    if (highEl) highEl.textContent = '-';
    return;
  }
  let maxCode = null, maxCount = -1;
  for (let [code, cnt] of Object.entries(errorMap)) {
    if (cnt > maxCount) {
      maxCount = cnt;
      maxCode = code;
    }
  }
  const percent = ((maxCount / total) * 100).toFixed(1);
  if (highEl) highEl.textContent = `${maxCode.length > 12 ? maxCode.slice(0, 10) + '..' : maxCode} (${percent}%)`;
}

function renderErrorChart(protocol, role) {
  const chartDom = document.getElementById(`chart-${protocol}`);
  if (!chartDom) return;
  let instance = errorChartInstances[protocol];
  if (!instance) {
    instance = echarts.init(chartDom);
    errorChartInstances[protocol] = instance;
  }
  const errorMap = getErrorMap(role, protocol);
  const seriesData = buildSeriesData(errorMap);
  const protocolDisplay = protocol.toUpperCase();

  const option = {
    title: { show: false },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (params.name === '暂无错误') return '暂无错误数据';
        return `${params.name}<br/>次数: ${params.value} (${params.percent}%)`;
      },
      backgroundColor: 'rgba(15,23,42,0.9)',
      borderColor: '#3b82f6',
      borderWidth: 1,
      textStyle: { color: 'white', fontSize: 12 }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      type: 'scroll',
      pageIconColor: '#3b82f6',
      textStyle: { fontSize: 10, color: '#334155' },
      formatter: (name) => name.length > 16 ? name.slice(0, 14) + '..' : name,
      itemWidth: 14,
      itemHeight: 8
    },
    series: [{
      name: `${protocolDisplay}错误码`,
      type: 'pie',
      radius: ['35%', '60%'],
      center: ['55%', '50%'],
      data: seriesData,
      label: {
        show: true,
        formatter: (params) => {
          if (params.name === '暂无错误') return '';
          return params.percent > 8 ? `${params.percent.toFixed(1)}%` : '';
        },
        fontSize: 9,
        position: 'outside'
      },
      emphasis: {
        scale: true,
        label: { show: true, fontWeight: 'bold', fontSize: 10 }
      },
      itemStyle: {
        borderRadius: 4,
        borderColor: '#fff',
        borderWidth: 1.5,
      },
      color: ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1']
    }],
    graphic: seriesData.length === 1 && seriesData[0].name === '暂无错误' ? [
      { type: 'text', left: 'center', top: 'middle', style: { text: '无错误数据', fill: '#9ca3af', fontSize: 12 }, z: 100 }
    ] : []
  };
  instance.setOption(option, true);
  updateErrorStats(protocol, errorMap);
}

function renderAllErrorCharts(role) {
  const protocols = getProtocolList(role);
  for (let proto of protocols) {
    renderErrorChart(proto, role);
  }
}

function switchErrorRole(role) {
  if (currentErrorRole === role) return;
  currentErrorRole = role;
  const clientTab = document.getElementById('errorClientTab');
  const channelTab = document.getElementById('errorChannelTab');
  if (clientTab) clientTab.classList.toggle('active', role === 'client');
  if (channelTab) channelTab.classList.toggle('active', role === 'channel');
  
  // 切换协议卡片显示
  const errorHttp = document.getElementById('error-http');
  const errorSgip = document.getElementById('error-sgip');
  const errorCmpp = document.getElementById('error-cmpp');
  const errorSmgp = document.getElementById('error-smgp');
  
  if (role === 'client') {
    // 客户侧：HTTP、SGIP、CMPP
    if (errorHttp) errorHttp.style.display = 'block';
    if (errorSgip) errorSgip.style.display = 'block';
    if (errorCmpp) errorCmpp.style.display = 'block';
    if (errorSmgp) errorSmgp.style.display = 'none';
  } else {
    // 通道侧：SGIP、CMPP、SMGP
    if (errorHttp) errorHttp.style.display = 'none';
    if (errorSgip) errorSgip.style.display = 'block';
    if (errorCmpp) errorCmpp.style.display = 'block';
    if (errorSmgp) errorSmgp.style.display = 'block';
  }
  
  renderAllErrorCharts(currentErrorRole);
}

function handleErrorResize() {
  for (let proto in errorChartInstances) {
    const instance = errorChartInstances[proto];
    if (instance && !instance.isDisposed) {
      instance.resize();
    }
  }
}

// ==================== Tab切换逻辑 ====================
function initTabSwitch() {
  console.log('=== Initializing Tab Switch ===');

  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  console.log('Tab buttons found:', tabBtns.length);
  console.log('Tab contents found:', tabContents.length);

  // 初始化显示平台概览
  tabContents.forEach(c => c.classList.remove('show'));
  const overviewTab = document.getElementById('overview-tab');
  if (overviewTab) {
    overviewTab.classList.add('show');
    console.log('Initializing overview tab');
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      if (!tabId) return;
      console.log('Tab button clicked:', tabId);

      // 移除所有按钮的active类
      tabBtns.forEach(b => b.classList.remove('active'));
      // 隐藏所有tab内容
      tabContents.forEach(c => c.classList.remove('show'));

      // 添加当前按钮的active类
      this.classList.add('active');
      // 显示对应的tab内容
      const targetTab = document.getElementById(tabId + '-tab');
      if (targetTab) {
        targetTab.classList.add('show');
        console.log('Showing tab:', targetTab.id);
      }
    });
  });

  console.log('=== Tab switch initialized ===');
}


// ==================== 长链接监控 ====================
const customerLinksMap = {
  "cust_tech001": [
    { clientIp: "192.168.1.12", nodeIp: "node-01.nyc", linkId: "LNK-a1b2c3", concurrent: 23, status: "正常", abnormalReason: null },
    { clientIp: "192.168.1.45", nodeIp: "node-02.lon", linkId: "LNK-d4e5f6", concurrent: 87, status: "正常", abnormalReason: null },
    { clientIp: "10.2.33.21", nodeIp: "node-01.nyc", linkId: "LNK-g7h8i9", concurrent: 0, status: "异常", abnormalReason: "心跳超时30s，连接假死" }
  ],
  "cust_finance02": [
    { clientIp: "172.16.8.99", nodeIp: "node-03.fra", linkId: "LNK-j9k0l1", concurrent: 301, status: "正常", abnormalReason: null },
    { clientIp: "172.16.8.100", nodeIp: "node-03.fra", linkId: "LNK-m2n3o4", concurrent: 311, status: "异常", abnormalReason: "带宽耗尽，发送队列堆积" },
    { clientIp: "10.88.1.77", nodeIp: "node-04.sin", linkId: "LNK-p5q6r7", concurrent: 0, status: "异常", abnormalReason: "对端reset，连接已关闭" }
  ],
  "cust_game03": [
    { clientIp: "203.0.113.55", nodeIp: "node-05.tok", linkId: "LNK-s8t9u0", concurrent: 890, status: "正常", abnormalReason: null },
    { clientIp: "203.0.113.66", nodeIp: "node-05.tok", linkId: "LNK-v1w2x3", concurrent: 1012, status: "异常", abnormalReason: "CPU过载，丢包严重" },
    { clientIp: "198.51.100.22", nodeIp: "node-06.syd", linkId: "LNK-y4z5a6", concurrent: 0, status: "异常", abnormalReason: "TLS握手失败，证书过期" }
  ]
};

const channelLinksMap = {
  "ch_general_01": [
    { nodeId: "node-01.nyc", linkId: "CH-LNK-001", concurrent: 210, status: "正常", abnormalReason: null },
    { nodeId: "node-02.lon", linkId: "CH-LNK-002", concurrent: 135, status: "异常", abnormalReason: "连接数超限，拒绝服务" },
    { nodeId: "node-01.nyc", linkId: "CH-LNK-003", concurrent: 0, status: "异常", abnormalReason: "网络分区，路由不可达" }
  ],
  "ch_express_02": [
    { nodeId: "node-03.fra", linkId: "CH-LNK-004", concurrent: 201, status: "正常", abnormalReason: null },
    { nodeId: "node-04.sin", linkId: "CH-LNK-005", concurrent: 100, status: "异常", abnormalReason: "内存泄漏，链接不稳定" }
  ]
};

const customerAccounts = [
  { customer: "科技有限公司", account: "cust_tech001", protocol: "CMPP", maxConns: 5000, rateLimit: "2000/s" },
  { customer: "金融服务集团", account: "cust_finance02", protocol: "SGIP", maxConns: 2000, rateLimit: "800/s" },
  { customer: "游戏娱乐平台", account: "cust_game03", protocol: "CMPP", maxConns: 8000, rateLimit: "5000/s" }
];

const channelAccounts = [
  { channelProvider: "通用通道商", account: "ch_general_01", protocol: "WebSocket", maxConns: 3000, rateLimit: "1500/s" },
  { channelProvider: "快速通道商", account: "ch_express_02", protocol: "TCP", maxConns: 1500, rateLimit: "600/s" }
];

let currentLongLinkView = 'customer';
let currentCustomerDim = 'customer-dim';
let currentChannelDim = 'channel-dim';
let customerDrillData = null;
let channelDrillData = null;
let customerSearchKeyword = '';
let accountSearchKeyword = '';
let channelProviderKeyword = '';
let channelAccountKeyword = '';

function computeCustomerMetrics() {
  return customerAccounts.map(acc => {
    const links = customerLinksMap[acc.account] || [];
    const curConns = links.length;
    const curConcurrent = links.reduce((sum, l) => sum + (l.concurrent || 0), 0);
    return { ...acc, curConns, curConcurrent };
  });
}

function computeChannelMetrics() {
  return channelAccounts.map(ch => {
    const links = channelLinksMap[ch.account] || [];
    const curConns = links.length;
    const curConcurrent = links.reduce((s, l) => s + (l.concurrent || 0), 0);
    return { ...ch, curConns, curConcurrent };
  });
}

function buildCustomerNodeStats() {
  const nodeMap = new Map();
  for (const [account, links] of Object.entries(customerLinksMap)) {
    links.forEach(link => {
      const node = link.nodeIp;
      if (!nodeMap.has(node)) nodeMap.set(node, { totalLinks: 0, totalConcurrent: 0, details: [], abnormalCount: 0 });
      const stat = nodeMap.get(node);
      stat.totalLinks += 1;
      stat.totalConcurrent += link.concurrent;
      if (link.status === "异常") stat.abnormalCount += 1;
      stat.details.push({ account, clientIp: link.clientIp, linkId: link.linkId, concurrent: link.concurrent, status: link.status, abnormalReason: link.abnormalReason, nodeIp: link.nodeIp });
    });
  }
  return nodeMap;
}

function buildChannelNodeStats() {
  const nodeMap = new Map();
  for (const [channel, links] of Object.entries(channelLinksMap)) {
    links.forEach(link => {
      const node = link.nodeId;
      if (!nodeMap.has(node)) nodeMap.set(node, { totalLinks: 0, totalConcurrent: 0, details: [], abnormalCount: 0 });
      const stat = nodeMap.get(node);
      stat.totalLinks += 1;
      stat.totalConcurrent += link.concurrent;
      if (link.status === "异常") stat.abnormalCount += 1;
      stat.details.push({ channel, nodeId: link.nodeId, linkId: link.linkId, concurrent: link.concurrent, status: link.status, abnormalReason: link.abnormalReason });
    });
  }
  return nodeMap;
}

function switchLongLinkView(view) {
  currentLongLinkView = view;
  const customerTab = document.getElementById('longlink-customer-tab');
  const channelTab = document.getElementById('longlink-channel-tab');
  const customerDimTabs = document.getElementById('customer-dim-tabs');
  const channelDimTabs = document.getElementById('channel-dim-tabs');
  const customerSearchBar = document.getElementById('customer-search-bar');
  const channelSearchBar = document.getElementById('channel-search-bar');
  
  if (customerTab) customerTab.classList.toggle('active', view === 'customer');
  if (channelTab) channelTab.classList.toggle('active', view === 'channel');
  
  if (customerDimTabs) customerDimTabs.style.display = view === 'customer' ? 'flex' : 'none';
  if (channelDimTabs) channelDimTabs.style.display = view === 'channel' ? 'flex' : 'none';
  
  // 切换视图时，根据维度显示对应的搜索区域
  if (view === 'customer') {
    if (customerSearchBar) customerSearchBar.style.display = currentCustomerDim === 'customer-dim' ? 'flex' : 'none';
    if (channelSearchBar) channelSearchBar.style.display = 'none';
  } else {
    if (channelSearchBar) channelSearchBar.style.display = currentChannelDim === 'channel-dim' ? 'flex' : 'none';
    if (customerSearchBar) customerSearchBar.style.display = 'none';
  }
  
  renderLongLinkContent();
}

function switchCustomerDim(dim) {
  currentCustomerDim = dim;
  document.querySelectorAll('[data-sub-customer]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-sub-customer') === dim);
  });
  
  // 客户维度显示搜索，节点维度隐藏搜索
  const customerSearchBar = document.getElementById('customer-search-bar');
  if (customerSearchBar) {
    customerSearchBar.style.display = dim === 'customer-dim' ? 'flex' : 'none';
  }
  
  renderLongLinkContent();
}

function switchChannelDim(dim) {
  currentChannelDim = dim;
  document.querySelectorAll('[data-sub-channel]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-sub-channel') === dim);
  });
  
  // 通道维度显示搜索，节点维度隐藏搜索
  const channelSearchBar = document.getElementById('channel-search-bar');
  if (channelSearchBar) {
    channelSearchBar.style.display = dim === 'channel-dim' ? 'flex' : 'none';
  }
  
  renderLongLinkContent();
}

function renderLongLinkContent() {
  const container = document.getElementById('longlink-dynamic-content');
  if (!container) return;
  if (currentLongLinkView === 'customer') {
    renderCustomerLinks();
  } else {
    renderChannelLinks();
  }
}

function renderCustomerLinks() {
  const container = document.getElementById('longlink-dynamic-content');
  if (!container) return;
  const metrics = computeCustomerMetrics();
  if (currentCustomerDim === 'customer-dim') {
    let table = '<table class="data-table"><thead><tr><th>客户</th><th>账号</th><th>协议</th><th>最大链接数</th><th>限制速率</th><th>当前链接数</th><th>当前并发</th><th>操作</th></tr></thead><tbody>';
    metrics.forEach(acc => {
      table += '<tr><td><strong>' + acc.customer + '</strong></td><td>' + acc.account + '</td><td>' + acc.protocol + '</td><td>' + acc.maxConns + '</td><td>' + acc.rateLimit + '</td><td>' + acc.curConns + '</td><td>' + acc.curConcurrent + '</td><td><button class="btn-icon" onclick="drillDownCustomerAccount(\'' + acc.account + '\')"><i class="fas fa-search-plus"></i> 详情</button></td></tr>';
    });
    table += '</tbody></table>';
    if (metrics.length === 0) {
      table = '<div style="text-align: center; color: #64748b; padding: 40px;">暂无匹配数据</div>';
    }
    if (customerDrillData && customerDrillData.type === 'account') {
      table += renderCustomerAccountDrill(customerDrillData.account);
    }
    container.innerHTML = table;
  } else {
    const nodeStats = buildCustomerNodeStats();
    let table = '<table class="data-table"><thead><tr><th>链接节点IP</th><th>已建立链接数</th><th>当前节点并发</th><th>异常链接数</th><th>操作</th></tr></thead><tbody>';
    for (let [nodeIp, stat] of nodeStats.entries()) {
      table += '<tr><td><i class="fas fa-server"></i> ' + nodeIp + '</td><td>' + stat.totalLinks + '</td><td>' + stat.totalConcurrent + '</td><td><span class="badge badge-abnormal">' + stat.abnormalCount + '</span></td><td><button class="btn-icon" onclick="drillDownCustomerNode(\'' + nodeIp + '\')"><i class="fas fa-chart-line"></i> 详情</button></td></tr>';
    }
    table += '</tbody></table>';
    if (customerDrillData && customerDrillData.type === 'node') {
      table += renderCustomerNodeDrill(customerDrillData.nodeIp);
    }
    container.innerHTML = table;
  }
}

function renderChannelLinks() {
  const container = document.getElementById('longlink-dynamic-content');
  if (!container) return;
  
  if (currentChannelDim === 'channel-dim') {
    const metrics = computeChannelMetrics();
    let table = '<table class="data-table"><thead><tr><th>通道商</th><th>通道账号</th><th>协议</th><th>最大链接数</th><th>限制速率</th><th>当前链接数</th><th>当前并发</th><th>操作</th></tr></thead><tbody>';
    metrics.forEach(ch => {
      table += '<tr><td><strong>' + ch.channelProvider + '</strong></td><td>' + ch.account + '</td><td>' + ch.protocol + '</td><td>' + ch.maxConns + '</td><td>' + ch.rateLimit + '</td><td>' + ch.curConns + '</td><td>' + ch.curConcurrent + '</td><td><button class="btn-icon" onclick="drillDownChannelAccount(\'' + ch.account + '\')"><i class="fas fa-list-ul"></i> 详情</button></td></tr>';
    });
    table += '</tbody></table>';
    if (metrics.length === 0) {
      table = '<div style="text-align: center; color: #64748b; padding: 40px;">暂无匹配数据</div>';
    }
    if (channelDrillData && channelDrillData.type === 'channel') {
      table += renderChannelAccountDrill(channelDrillData.account);
    } else if (channelDrillData && channelDrillData.type === 'node') {
      table += renderChannelNodeDrill(channelDrillData.nodeId);
    }
    container.innerHTML = table;
  } else {
    const nodeStats = buildChannelNodeStats();
    let table = '<table class="data-table"><thead><tr><th>节点ID</th><th>总链接数</th><th>总并发数</th><th>异常链接数</th><th>操作</th></tr></thead><tbody>';
    nodeStats.forEach((stat, nodeId) => {
      table += '<tr><td><strong>' + nodeId + '</strong></td><td>' + stat.totalLinks + '</td><td>' + stat.totalConcurrent + '</td><td>' + stat.abnormalCount + '</td><td><button class="btn-icon" onclick="drillDownChannelNode(\'' + nodeId + '\')"><i class="fas fa-list-ul"></i> 详情</button></td></tr>';
    });
    table += '</tbody></table>';
    if (channelDrillData && channelDrillData.type === 'node') {
      table += renderChannelNodeDrill(channelDrillData.nodeId);
    }
    container.innerHTML = table;
  }
}

function renderCustomerAccountDrill(account) {
  const links = customerLinksMap[account] || [];
  if (!links.length) return '<div class="drill-detail">无链接</div>';
  let html = '<div class="drill-detail"><div class="drill-title"><span>客户 ' + account + ' 链接详情</span><button class="close-drill" onclick="closeCustomerDrill()">关闭</button></div>';
  links.forEach(link => {
    const isNormal = link.status === "正常";
    html += '<div class="link-entity"><div class="flex-between"><span><strong>链接ID:</strong> ' + link.linkId + '</span><span class="badge ' + (isNormal ? 'badge-normal' : 'badge-abnormal') + '">' + link.status + '</span></div><div class="small-text">客户IP: ' + link.clientIp + ' | 节点IP: ' + link.nodeIp + ' | 当前并发: ' + link.concurrent + '</div>';
    if (!isNormal && link.abnormalReason) {
      html += '<div class="reason-text"><i class="fas fa-exclamation-triangle"></i> 异常原因: ' + link.abnormalReason + '</div>';
    }
    html += '<div style="margin-top:8px;"><button class="btn-icon btn-danger" onclick="disconnectLinkWrapper(\'' + account + '\',\'' + link.linkId + '\')"><i class="fas fa-unlink"></i> 断开</button><button class="btn-icon btn-success" onclick="prepareReconnect(\'' + account + '\',\'' + link.linkId + '\')"><i class="fas fa-sync-alt"></i> 重连</button></div></div>';
  });
  html += '</div>';
  return html;
}

function renderCustomerNodeDrill(nodeIp) {
  const nodeStats = buildCustomerNodeStats();
  const stat = nodeStats.get(nodeIp);
  if (!stat) return '<div class="drill-detail">无节点数据</div>';
  let html = '<div class="drill-detail"><div class="drill-title"><span>节点 ' + nodeIp + ' 下客户链接</span><button class="close-drill" onclick="closeCustomerDrill()">关闭</button></div>';
  stat.details.forEach(d => {
    const isNormal = d.status === "正常";
    html += '<div class="link-entity"><div><strong>所属客户:</strong> ' + d.account + ' | <strong>链接ID:</strong> ' + d.linkId + '</div><div class="small-text">客户IP: ' + d.clientIp + ' | 并发: ' + d.concurrent + ' | 状态: <span class="badge ' + (isNormal ? 'badge-normal' : 'badge-abnormal') + '">' + d.status + '</span></div>';
    if (!isNormal && d.abnormalReason) {
      html += '<div class="reason-text"><i class="fas fa-bug"></i> 异常原因: ' + d.abnormalReason + '</div>';
    }
    html += '<div><button class="btn-icon btn-danger" onclick="disconnectLinkWrapper(\'' + nodeIp + '\',\'' + d.linkId + '\')"><i class="fas fa-unlink"></i> 断开</button><button class="btn-icon btn-success" onclick="prepareReconnect(\'' + nodeIp + '\',\'' + d.linkId + '\')"><i class="fas fa-sync-alt"></i> 重连</button></div></div>';
  });
  html += '</div>';
  return html;
}

function renderChannelAccountDrill(account) {
  const links = channelLinksMap[account] || [];
  if (!links.length) return '<div class="drill-detail">无链接</div>';
  let html = '<div class="drill-detail"><div class="drill-title"><span>通道 ' + account + ' 链接明细</span><button class="close-drill" onclick="closeChannelDrill()">关闭</button></div>';
  links.forEach(link => {
    const isNormal = link.status === "正常";
    html += '<div class="link-entity"><div><strong>链接ID:</strong> ' + link.linkId + ' | 节点ID: ' + link.nodeId + '</div><div>并发: ' + link.concurrent + ' | 状态: <span class="badge ' + (isNormal ? 'badge-normal' : 'badge-abnormal') + '">' + link.status + '</span></div>';
    if (!isNormal && link.abnormalReason) {
      html += '<div class="reason-text"><i class="fas fa-radar"></i> 异常原因: ' + link.abnormalReason + '</div>';
    }
    html += '<div><button class="btn-icon btn-danger" onclick="disconnectChannelLinkWrapper(\'' + account + '\',\'' + link.linkId + '\')"><i class="fas fa-unlink"></i> 断开</button><button class="btn-icon btn-success" onclick="prepareChannelReconnect(\'' + account + '\',\'' + link.linkId + '\')"><i class="fas fa-sync-alt"></i> 重连</button></div></div>';
  });
  html += '</div>';
  return html;
}

function renderChannelNodeDrill(nodeId) {
  const nodeStats = buildChannelNodeStats();
  const stat = nodeStats.get(nodeId);
  if (!stat) return '<div class="drill-detail">无数据</div>';
  let html = '<div class="drill-detail"><div class="drill-title"><span>节点 ' + nodeId + ' 通道链接</span><button class="close-drill" onclick="closeChannelDrill()">关闭</button></div>';
  stat.details.forEach(d => {
    const isNormal = d.status === "正常";
    html += '<div class="link-entity"><div><strong>所属通道:</strong> ' + d.channel + ' | 链接ID: ' + d.linkId + '</div><div>并发: ' + d.concurrent + ' | 状态: <span class="badge ' + (isNormal ? 'badge-normal' : 'badge-abnormal') + '">' + d.status + '</span></div>';
    if (!isNormal && d.abnormalReason) {
      html += '<div class="reason-text"><i class="fas fa-skull-crosswalk"></i> ' + d.abnormalReason + '</div>';
    }
    html += '<div><button class="btn-icon btn-danger" onclick="disconnectChannelNodeLinkWrapper(\'' + nodeId + '\',\'' + d.linkId + '\')"><i class="fas fa-unlink"></i> 断开</button><button class="btn-icon btn-success" onclick="prepareChannelNodeReconnect(\'' + nodeId + '\',\'' + d.linkId + '\')"><i class="fas fa-sync-alt"></i> 重连</button></div></div>';
  });
  html += '</div>';
  return html;
}

window.drillDownCustomerAccount = function(account) {
  const links = customerLinksMap[account] || [];
  const accInfo = customerAccounts.find(a => a.account === account);
  
  let html = `
    <div class="drill-detail">
      <div class="drill-title">
        <span><i class="fas fa-user"></i> 客户账号: ${account}</span>
      </div>
      <div style="margin-bottom: 15px; padding: 10px; background: #f1f5f9; border-radius: 8px;">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
          <div><strong>协议:</strong> ${accInfo?.protocol || '-'} </div>
          <div><strong>最大连接数:</strong> ${accInfo?.maxConns || '-'} </div>
          <div><strong>速率限制:</strong> ${accInfo?.rateLimit || '-'} </div>
        </div>
      </div>
      <h4 style="margin-bottom: 12px; font-size: 14px;">链接列表</h4>
  `;
  
  links.forEach(link => {
    html += `
      <div class="link-entity">
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; font-size: 13px;">
          <div><strong>客户端IP:</strong> ${link.clientIp}</div>
          <div><strong>节点IP:</strong> ${link.nodeIp}</div>
          <div><strong>链接ID:</strong> ${link.linkId}</div>
          <div><strong>并发数:</strong> ${link.concurrent}</div>
        </div>
        <div style="margin-top: 8px; display: flex; justify-content: space-between; align-items: center;">
          <span class="badge ${link.status === '正常' ? 'badge-normal' : 'badge-abnormal'}">${link.status}</span>
          ${link.abnormalReason ? `<div class="reason-text">${link.abnormalReason}</div>` : ''}
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  showDrillModal(html);
};

window.drillDownCustomerNode = function(nodeIp) {
  let html = `
    <div class="drill-detail">
      <div class="drill-title">
        <span><i class="fas fa-server"></i> 节点: ${nodeIp}</span>
      </div>
      <h4 style="margin-bottom: 12px; font-size: 14px;">该节点上的客户链接</h4>
  `;
  
  let found = false;
  for (const [account, links] of Object.entries(customerLinksMap)) {
    const nodeLinks = links.filter(l => l.nodeIp === nodeIp);
    if (nodeLinks.length > 0) {
      found = true;
      html += `<div style="margin-bottom: 15px;"><strong>客户: ${account}</strong></div>`;
      nodeLinks.forEach(link => {
        html += `
          <div class="link-entity">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 13px;">
              <div><strong>客户端IP:</strong> ${link.clientIp}</div>
              <div><strong>链接ID:</strong> ${link.linkId}</div>
              <div><strong>并发数:</strong> ${link.concurrent}</div>
            </div>
            <div style="margin-top: 8px;">
              <span class="badge ${link.status === '正常' ? 'badge-normal' : 'badge-abnormal'}">${link.status}</span>
              ${link.abnormalReason ? `<div class="reason-text">${link.abnormalReason}</div>` : ''}
            </div>
          </div>
        `;
      });
    }
  }
  
  if (!found) {
    html += '<div style="text-align: center; color: #64748b; padding: 20px;">该节点暂无客户链接</div>';
  }
  
  html += '</div>';
  showDrillModal(html);
};

window.drillDownChannelAccount = function(account) {
  const links = channelLinksMap[account] || [];
  const accInfo = channelAccounts.find(a => a.account === account);
  
  let html = `
    <div class="drill-detail">
      <div class="drill-title">
        <span><i class="fas fa-network-wired"></i> 通道账号: ${account}</span>
      </div>
      <div style="margin-bottom: 15px; padding: 10px; background: #f1f5f9; border-radius: 8px;">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
          <div><strong>协议:</strong> ${accInfo?.protocol || '-'} </div>
          <div><strong>最大连接数:</strong> ${accInfo?.maxConns || '-'} </div>
          <div><strong>速率限制:</strong> ${accInfo?.rateLimit || '-'} </div>
        </div>
      </div>
      <h4 style="margin-bottom: 12px; font-size: 14px;">通道链接列表</h4>
  `;
  
  links.forEach(link => {
    html += `
      <div class="link-entity">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 13px;">
          <div><strong>节点ID:</strong> ${link.nodeId}</div>
          <div><strong>链接ID:</strong> ${link.linkId}</div>
          <div><strong>并发数:</strong> ${link.concurrent}</div>
        </div>
        <div style="margin-top: 8px;">
          <span class="badge ${link.status === '正常' ? 'badge-normal' : 'badge-abnormal'}">${link.status}</span>
          ${link.abnormalReason ? `<div class="reason-text">${link.abnormalReason}</div>` : ''}
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  showDrillModal(html);
};

window.drillDownChannelNode = function(nodeId) {
  let html = `
    <div class="drill-detail">
      <div class="drill-title">
        <span><i class="fas fa-server"></i> 节点: ${nodeId}</span>
      </div>
      <h4 style="margin-bottom: 12px; font-size: 14px;">该节点上的通道链接</h4>
  `;
  
  let found = false;
  for (const [account, links] of Object.entries(channelLinksMap)) {
    const nodeLinks = links.filter(l => l.nodeId === nodeId);
    if (nodeLinks.length > 0) {
      found = true;
      html += `<div style="margin-bottom: 15px;"><strong>通道: ${account}</strong></div>`;
      nodeLinks.forEach(link => {
        html += `
          <div class="link-entity">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 13px;">
              <div><strong>链接ID:</strong> ${link.linkId}</div>
              <div><strong>并发数:</strong> ${link.concurrent}</div>
            </div>
            <div style="margin-top: 8px;">
              <span class="badge ${link.status === '正常' ? 'badge-normal' : 'badge-abnormal'}">${link.status}</span>
              ${link.abnormalReason ? `<div class="reason-text">${link.abnormalReason}</div>` : ''}
            </div>
          </div>
        `;
      });
    }
  }
  
  if (!found) {
    html += '<div style="text-align: center; color: #64748b; padding: 20px;">该节点暂无通道链接</div>';
  }
  
  html += '</div>';
  showDrillModal(html);
};

function showDrillModal(content) {
  document.getElementById('drillModalBody').innerHTML = content;
  document.getElementById('drillModal').style.display = 'flex';
}

function closeDrillModal() {
  document.getElementById('drillModal').style.display = 'none';
}

window.closeCustomerDrill = function() {
  closeDrillModal();
};

window.closeChannelDrill = function() {
  closeDrillModal();
};

function disconnectLinkWrapper(account, linkId) {
  const links = customerLinksMap[account];
  const link = links && links.find(l => l.linkId === linkId);
  if (link) {
    link.status = "异常";
    link.concurrent = 0;
    link.abnormalReason = "手动断开连接";
    alert("已断开客户 " + account + " 链接 " + linkId);
    renderLongLinkContent();
  }
}

function prepareReconnect(account, linkId) {
  const links = customerLinksMap[account];
  const link = links && links.find(l => l.linkId === linkId);
  if (link) {
    link.status = "正常";
    link.concurrent = Math.floor(Math.random() * 80) + 30;
    link.abnormalReason = null;
    alert("客户 " + account + " 链接 " + linkId + " 已重连，状态恢复正常");
    renderLongLinkContent();
  }
}

function disconnectChannelLinkWrapper(account, linkId) {
  const links = channelLinksMap[account];
  const link = links && links.find(l => l.linkId === linkId);
  if (link) {
    link.status = "异常";
    link.concurrent = 0;
    link.abnormalReason = "通道手动断开";
    alert("已断开通道 " + account + " 链接 " + linkId);
    renderLongLinkContent();
  }
}

function prepareChannelReconnect(account, linkId) {
  const links = channelLinksMap[account];
  const link = links && links.find(l => l.linkId === linkId);
  if (link) {
    link.status = "正常";
    link.concurrent = Math.floor(Math.random() * 130) + 40;
    link.abnormalReason = null;
    alert("通道 " + account + " 链接重连成功，已恢复");
    renderLongLinkContent();
  }
}

function disconnectChannelNodeLinkWrapper(nodeId, linkId) {
  for (let links of Object.values(channelLinksMap)) {
    const link = links.find(l => l.linkId === linkId);
    if (link) {
      link.status = "异常";
      link.concurrent = 0;
      link.abnormalReason = "节点运维断开";
      alert("通道节点断开 " + linkId);
      renderLongLinkContent();
      break;
    }
  }
}

function prepareChannelNodeReconnect(nodeId, linkId) {
  for (let links of Object.values(channelLinksMap)) {
    const link = links.find(l => l.linkId === linkId);
    if (link) {
      link.status = "正常";
      link.concurrent = Math.floor(Math.random() * 110) + 30;
      link.abnormalReason = null;
      alert("通道节点重连 " + linkId + " 至 " + nodeId);
      renderLongLinkContent();
      break;
    }
  }
}


// ==================== 其他切换函数 ====================
function switchChartType(type) {
  console.log('切换图表类型:', type);
}

function switchTimeRange(range) {
  console.log('切换时间范围:', range);
}

function switchLatencyTime(range) {
  console.log('切换延迟时间范围:', range);
}

// ==================== 核心指标实时更新 ====================
function initRealtimeUpdate() {
  setInterval(function() {
    const clientQps = document.getElementById('metric-send-qps-client');
    if (clientQps) {
      const current = parseInt(clientQps.textContent.replace(/,/g, ''));
      const change = Math.floor((Math.random() - 0.5) * 200);
      const newValue = Math.max(10000, current + change);
      clientQps.textContent = newValue.toLocaleString();
    }
  }, 5000);
}

// ==================== 客户分析相关变量 ====================
let accountQpsPieChart = null;
let queueBacklogBarChart = null;
let sendQpsChart = null;
let receiptQpsChart = null;
let customerErrorChartInstances = {};
let sendQpsCurrentTimeRange = '1h';
let receiptQpsCurrentTimeRange = '1h';

// 客户分析数据
const customerAnalysisData = {
  accounts: [
    { name: 'acc_001', qps: 3245, customer: '客户A' },
    { name: 'acc_002', qps: 2876, customer: '客户A' },
    { name: 'acc_003', qps: 2109, customer: '客户B' },
    { name: 'acc_004', qps: 1876, customer: '客户B' },
    { name: 'acc_005', qps: 1432, customer: '客户C' }
  ],
  queueBacklog: [
    { name: '客户A', value: 12567 },
    { name: '客户B', value: 8934 },
    { name: '客户C', value: 6789 },
    { name: '客户D', value: 4567 },
    { name: '客户E', value: 3245 },
    { name: '客户F', value: 2198 },
    { name: '客户G', value: 1876 },
    { name: '客户H', value: 1456 },
    { name: '客户I', value: 1098 },
    { name: '客户J', value: 876 },
    { name: '客户K', value: 756 },
    { name: '客户L', value: 634 },
    { name: '客户M', value: 512 },
    { name: '客户N', value: 445 },
    { name: '客户O', value: 387 },
    { name: '客户P', value: 312 },
    { name: '客户Q', value: 256 },
    { name: '客户R', value: 198 },
    { name: '客户S', value: 145 },
    { name: '客户T', value: 98 }
  ],
  customerDetails: [
    { name: '客户A', sendCount: 1234567, successRate: 99.95, sendRate: 1234, p99Latency: 45, queueBacklog: 12567 },
    { name: '客户B', sendCount: 876543, successRate: 99.88, sendRate: 876, p99Latency: 52, queueBacklog: 8934 },
    { name: '客户C', sendCount: 654321, successRate: 99.92, sendRate: 654, p99Latency: 38, queueBacklog: 6789 },
    { name: '客户D', sendCount: 432109, successRate: 99.75, sendRate: 432, p99Latency: 67, queueBacklog: 4567 }
  ]
};

// 客户分析错误码数据
const customerErrorDB = {
  http: {
    "400 (错误请求)": 145,
    "401 (未授权)": 87,
    "403 (禁止)": 34,
    "404 (不存在)": 210,
    "500 (服务器错误)": 96,
    "502 (网关错误)": 43,
    "503 (服务不可用)": 22
  },
  sgip: {
    "1001 (认证失败)": 56,
    "1002 (超时)": 32,
    "1003 (重复提交)": 78,
    "1005 (黑名单)": 44,
    "1010 (未知错误)": 19,
    "1008 (限流)": 27
  },
  cmpp: {
    "3 (鉴权错误)": 120,
    "4 (版本不支持)": 88,
    "8 (流量超限)": 210,
    "10 (资源不足)": 66,
    "12 (其他错误)": 45,
    "9 (非法源地址)": 31
  }
};

// ==================== 初始化客户分析图表 ====================
function initCustomerAnalysisCharts() {
  updateSendVolumeChart();
  initAccountQpsPieChart();
  initQueueBacklogBarChart();
  initSendQpsChart();
  initReceiptQpsChart();
  renderCustomerErrorCharts();
  renderCustomerTable();
  initCustomerRealtimeUpdate();
}

// 初始化发送账号QPS分布饼图
function initAccountQpsPieChart() {
  const chartDom = document.getElementById('accountQpsPieChart');
  if (!chartDom) return;
  
  accountQpsPieChart = echarts.init(chartDom);
  updateAccountQpsPieChart();
}

// 更新发送账号QPS分布柱状图
function updateAccountQpsPieChart() {
  if (!accountQpsPieChart) return;
  
  const data = customerAnalysisData.accounts.map(acc => ({
    name: acc.name,
    value: acc.qps
  }));
  
  const totalQps = data.reduce((sum, item) => sum + item.value, 0);
  document.getElementById('totalAccountQps').textContent = totalQps.toLocaleString();
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: '{b}: {c} QPS',
      backgroundColor: 'rgba(15,23,42,0.9)',
      borderColor: '#3b82f6',
      textStyle: { color: 'white' }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisLabel: { fontSize: 11, rotate: 30 }
    },
    yAxis: { type: 'value', name: 'QPS', nameTextStyle: { fontSize: 12 } },
    series: [{
      name: '发送账号QPS',
      type: 'bar',
      data: data.map((item, index) => ({
        value: item.value,
        itemStyle: { 
          color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index],
          borderRadius: [4, 4, 0, 0]
        }
      })),
      barWidth: '50%'
    }]
  };
  
  accountQpsPieChart.setOption(option);
}

// 下钻查看连接QPS分布
function drillDownToConnectionQps(accountName) {
  const connections = [
    { name: 'conn_001', qps: Math.floor(Math.random() * 1000) + 500 },
    { name: 'conn_002', qps: Math.floor(Math.random() * 800) + 400 },
    { name: 'conn_003', qps: Math.floor(Math.random() * 600) + 300 },
    { name: 'conn_004', qps: Math.floor(Math.random() * 400) + 200 }
  ];
  
  const html = `
    <div class="drill-detail">
      <div class="drill-title">
        <span><i class="fas fa-plug"></i> ${accountName} 连接QPS分布</span>
      </div>
      <div id="connectionQpsPieChart" style="width: 100%; height: 350px;"></div>
    </div>
  `;
  
  showDrillModal(html);
  
  setTimeout(() => {
    const chartDom = document.getElementById('connectionQpsPieChart');
    if (!chartDom) return;
    
    const chart = echarts.init(chartDom);
    const data = connections.map(conn => ({
      name: conn.name,
      value: conn.qps
    }));
    
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} QPS ({d}%)',
        backgroundColor: 'rgba(15,23,42,0.9)',
        borderColor: '#3b82f6',
        textStyle: { color: 'white' }
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'center'
      },
      series: [{
        name: '连接QPS',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        data: data,
        color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
      }]
    };
    
    chart.setOption(option);
  }, 100);
}

// 初始化客户队列积压柱状图
function initQueueBacklogBarChart() {
  const chartDom = document.getElementById('queueBacklogBarChart');
  if (!chartDom) return;
  
  queueBacklogBarChart = echarts.init(chartDom);
  updateQueueBacklogBarChart();
}

// 更新客户队列积压柱状图
function updateQueueBacklogBarChart() {
  if (!queueBacklogBarChart) return;
  
  const data = customerAnalysisData.queueBacklog;
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(15,23,42,0.9)',
      borderColor: '#3b82f6',
      textStyle: { color: 'white' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: function(value) {
          return value.toLocaleString();
        }
      }
    },
    series: [{
      name: '队列积压',
      type: 'bar',
      data: data.map(item => item.value),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#3b82f6' },
          { offset: 1, color: '#8b5cf6' }
        ]),
        borderRadius: [4, 4, 0, 0]
      },
      barWidth: '60%',
      label: {
        show: true,
        position: 'top',
        formatter: function(params) {
          return params.value.toLocaleString();
        }
      }
    }]
  };
  
  queueBacklogBarChart.setOption(option);
}

// 初始化发送QPS趋势图
function initSendQpsChart() {
  const chartDom = document.getElementById('sendQpsChart');
  if (!chartDom) return;
  
  sendQpsChart = echarts.init(chartDom);
  updateSendQpsChart();
  
  // 初始化选择框
  initSendQpsSelect();
}

// 初始化发送QPS选择框
function initSendQpsSelect() {
  const selectEl = document.getElementById('sendQpsSelect');
  if (!selectEl) return;
  
  customerAnalysisData.accounts.forEach(acc => {
    const option = document.createElement('option');
    option.value = acc.name;
    option.textContent = acc.name;
    selectEl.appendChild(option);
  });
}

// 更新发送QPS趋势图
function updateSendQpsChart() {
  if (!sendQpsChart) return;
  
  const viewType = document.getElementById('sendQpsViewType')?.value || 'top5';
  const selectContainer = document.getElementById('sendQpsSelectContainer');
  if (selectContainer) {
    selectContainer.style.display = viewType === 'select' ? 'block' : 'none';
  }
  
  let series = [];
  if (viewType === 'top5') {
    // 显示发送量前5
    const topAccounts = customerAnalysisData.accounts.slice(0, 5);
    topAccounts.forEach((acc, index) => {
      const data = generateQpsTrendData();
      series.push({
        name: acc.name,
        type: 'line',
        smooth: true,
        data: data,
        lineStyle: { width: 2 }
      });
    });
  } else {
    // 自定义选择
    const selectEl = document.getElementById('sendQpsSelect');
    if (selectEl) {
      const selectedOptions = Array.from(selectEl.selectedOptions).slice(0, 5);
      selectedOptions.forEach(opt => {
        const data = generateQpsTrendData();
        series.push({
          name: opt.value,
          type: 'line',
          smooth: true,
          data: data,
          lineStyle: { width: 2 }
        });
      });
    }
  }
  
  const timestamps = generateTimestampsForChart();
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15,23,42,0.9)',
      borderColor: '#3b82f6',
      textStyle: { color: 'white' }
    },
    legend: {
      data: series.map(s => s.name),
      top: 5
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 40,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timestamps,
      axisLabel: { fontSize: 11, color: '#666' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 11, color: '#666' }
    },
    series: series,
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
  };
  
  sendQpsChart.setOption(option);
}

// 初始化回执QPS趋势图
function initReceiptQpsChart() {
  const chartDom = document.getElementById('receiptQpsChart');
  if (!chartDom) return;
  
  receiptQpsChart = echarts.init(chartDom);
  updateReceiptQpsChart();
}

// 更新回执QPS趋势图
function updateReceiptQpsChart() {
  if (!receiptQpsChart) return;
  
  const timestamps = generateTimestampsForChart();
  
  const series = [];
  customerAnalysisData.accounts.slice(0, 3).forEach(acc => {
    const data = generateQpsTrendData(0.8);
    series.push({
      name: acc.name,
      type: 'line',
      smooth: true,
      data: data,
      lineStyle: { width: 2 }
    });
  });
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15,23,42,0.9)',
      borderColor: '#3b82f6',
      textStyle: { color: 'white' }
    },
    legend: {
      data: series.map(s => s.name),
      top: 5
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 40,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timestamps,
      axisLabel: { fontSize: 11, color: '#666' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 11, color: '#666' }
    },
    series: series,
    color: ['#10b981', '#3b82f6', '#f59e0b']
  };
  
  receiptQpsChart.setOption(option);
}

// 生成时间戳数组
function generateTimestampsForChart() {
  const count = sendQpsCurrentTimeRange === '5m' ? 10 : sendQpsCurrentTimeRange === '1h' ? 12 : 24;
  const interval = sendQpsCurrentTimeRange === '5m' ? 30 : sendQpsCurrentTimeRange === '1h' ? 5 : 60;
  const timestamps = [];
  const now = Date.now();
  
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now - i * interval * 60 * 1000);
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    timestamps.push(`${hours}:${minutes}`);
  }
  
  return timestamps;
}

// 生成QPS趋势数据
function generateQpsTrendData(multiplier = 1) {
  const count = sendQpsCurrentTimeRange === '5m' ? 10 : sendQpsCurrentTimeRange === '1h' ? 12 : 24;
  const data = [];
  let baseValue = Math.floor(Math.random() * 2000) + 1000;
  
  for (let i = 0; i < count; i++) {
    const change = Math.floor((Math.random() - 0.5) * 500);
    baseValue = Math.max(500, baseValue + change);
    data.push(Math.floor(baseValue * multiplier));
  }
  
  return data;
}

// 切换发送QPS时间范围
function switchSendQpsTimeRange(range) {
  sendQpsCurrentTimeRange = range;
  
  // 更新按钮状态
  const buttons = document.querySelectorAll('#customer-tab .card-header button');
  buttons.forEach(btn => {
    if (btn.textContent.includes(range === '5m' ? '5分钟' : range === '1h' ? '1小时' : '24小时')) {
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-default');
    } else {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-default');
    }
  });
  
  updateSendQpsChart();
}

// 切换回执QPS时间范围
function switchReceiptQpsTimeRange(range) {
  receiptQpsCurrentTimeRange = range;
  sendQpsCurrentTimeRange = range;
  
  // 更新按钮状态
  const buttons = document.querySelectorAll('#customer-tab .card-header button');
  buttons.forEach(btn => {
    if (btn.textContent.includes(range === '5m' ? '5分钟' : range === '1h' ? '1小时' : '24小时')) {
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-default');
    } else {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-default');
    }
  });
  
  updateReceiptQpsChart();
}

// 当前选中的错误码tab和时间范围
let currentCustomerErrorTab = 'http';
let currentCustomerErrorTimeRange = '1h';
let customerErrorChartInstance = null;

// 不同时间范围的错误码数据
const customerErrorDBByTime = {
  '5m': {
    http: { "400 (错误请求)": 35, "401 (未授权)": 12, "404 (不存在)": 45, "500 (服务器错误)": 18 },
    sgip: { "1001 (认证失败)": 8, "1002 (超时)": 5, "1003 (重复提交)": 12 },
    cmpp: { "3 (鉴权错误)": 25, "8 (流量超限)": 42, "10 (资源不足)": 12 }
  },
  '1h': {
    http: { "400 (错误请求)": 145, "401 (未授权)": 87, "403 (禁止)": 34, "404 (不存在)": 210, "500 (服务器错误)": 96, "502 (网关错误)": 43, "503 (服务不可用)": 22 },
    sgip: { "1001 (认证失败)": 56, "1002 (超时)": 32, "1003 (重复提交)": 78, "1005 (黑名单)": 44, "1010 (未知错误)": 19, "1008 (限流)": 27 },
    cmpp: { "3 (鉴权错误)": 120, "4 (版本不支持)": 88, "8 (流量超限)": 210, "10 (资源不足)": 66, "12 (其他错误)": 45, "9 (非法源地址)": 31 }
  },
  '24h': {
    http: { "400 (错误请求)": 2345, "401 (未授权)": 1234, "403 (禁止)": 567, "404 (不存在)": 3456, "500 (服务器错误)": 1567, "502 (网关错误)": 789, "503 (服务不可用)": 445 },
    sgip: { "1001 (认证失败)": 890, "1002 (超时)": 512, "1003 (重复提交)": 1234, "1005 (黑名单)": 723, "1010 (未知错误)": 312, "1008 (限流)": 432 },
    cmpp: { "3 (鉴权错误)": 1890, "4 (版本不支持)": 1345, "8 (流量超限)": 3456, "10 (资源不足)": 1023, "12 (其他错误)": 765, "9 (非法源地址)": 512 }
  }
};

// 渲染客户错误码图表（tab模式）
function renderCustomerErrorCharts() {
  const chartDom = document.getElementById('cust-error-chart');
  if (!chartDom) return;
  
  customerErrorChartInstance = echarts.init(chartDom);
  updateCustomerErrorChart(currentCustomerErrorTab, currentCustomerErrorTimeRange);
}

// 更新客户错误码图表
function updateCustomerErrorChart(protocol, timeRange = currentCustomerErrorTimeRange) {
  if (!customerErrorChartInstance) return;
  
  const errorMap = customerErrorDBByTime[timeRange]?.[protocol] || customerErrorDB[protocol];
  const seriesData = [];
  
  for (let [codeName, count] of Object.entries(errorMap)) {
    if (count > 0) {
      seriesData.push({ name: codeName, value: count });
    }
  }
  
  if (seriesData.length === 0) {
    seriesData.push({ name: '暂无错误', value: 1, itemStyle: { color: '#cbd5e1' } });
  }
  
  const option = {
    title: { show: false },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (params.name === '暂无错误') return '暂无错误数据';
        return `${params.name}<br/>次数: ${params.value} (${params.percent}%)`;
      },
      backgroundColor: 'rgba(15,23,42,0.9)',
      borderColor: '#3b82f6',
      borderWidth: 1,
      textStyle: { color: 'white', fontSize: 12 }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      type: 'scroll',
      pageIconColor: '#3b82f6',
      textStyle: { fontSize: 10, color: '#334155' },
      formatter: (name) => name.length > 16 ? name.slice(0, 14) + '..' : name,
      itemWidth: 14,
      itemHeight: 8
    },
    series: [{
      name: `${protocol.toUpperCase()}错误码`,
      type: 'pie',
      radius: ['35%', '60%'],
      center: ['60%', '50%'],
      data: seriesData,
      label: {
        show: true,
        formatter: (params) => {
          if (params.name === '暂无错误') return '';
          return params.percent > 8 ? `${params.percent.toFixed(1)}%` : '';
        },
        fontSize: 9,
        position: 'outside'
      },
      emphasis: {
        scale: true,
        label: { show: true, fontWeight: 'bold', fontSize: 10 }
      },
      itemStyle: {
        borderRadius: 4,
        borderColor: '#fff',
        borderWidth: 1.5,
      },
      color: ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4']
    }],
    graphic: seriesData.length === 1 && seriesData[0].name === '暂无错误' ? [
      { type: 'text', left: 'center', top: 'middle', style: { text: '无错误数据', fill: '#9ca3af', fontSize: 12 }, z: 100 }
    ] : []
  };
  
  customerErrorChartInstance.setOption(option, true);
  
  // 更新统计数据
  updateCustomerErrorStats(protocol, errorMap);
}

// 切换客户错误码tab
function switchCustomerErrorCodeTab(protocol) {
  currentCustomerErrorTab = protocol;
  
  // 更新tab按钮状态
  const tabs = document.querySelectorAll('.tab-switch .tab-btn');
  tabs.forEach(tab => {
    if (tab.textContent === protocol.toUpperCase()) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  
  // 更新图表
  updateCustomerErrorChart(protocol, currentCustomerErrorTimeRange);
}

// 切换客户错误码时间范围
function switchCustomerErrorTimeRange(timeRange) {
  currentCustomerErrorTimeRange = timeRange;
  
  // 更新时间按钮状态
  const timeBtns = document.querySelectorAll('.time-btn');
  timeBtns.forEach(btn => {
    const text = btn.textContent;
    if ((timeRange === '5m' && text.includes('5分钟')) ||
        (timeRange === '1h' && text.includes('1小时')) ||
        (timeRange === '24h' && text.includes('24小时'))) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // 更新图表
  updateCustomerErrorChart(currentCustomerErrorTab, timeRange);
}

// 更新客户错误统计数据（tab模式）
function updateCustomerErrorStats(protocol, errorMap) {
  const total = Object.values(errorMap).reduce((sum, val) => sum + val, 0);
  const totalEl = document.getElementById('cust-error-total');
  const highEl = document.getElementById('cust-error-high');
  
  if (totalEl) totalEl.textContent = total.toLocaleString();
  
  if (total === 0) {
    if (highEl) highEl.textContent = '-';
    return;
  }
  
  let maxCode = null, maxCount = -1;
  for (let [code, count] of Object.entries(errorMap)) {
    if (count > maxCount) {
      maxCount = count;
      maxCode = code;
    }
  }
  
  const percent = ((maxCount / total) * 100).toFixed(1);
  if (highEl) highEl.textContent = `${maxCode.length > 12 ? maxCode.slice(0, 10) + '..' : maxCode} (${percent}%)`;
}

// 渲染客户详细数据表格
function renderCustomerTable() {
  const tbody = document.getElementById('customerTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = customerAnalysisData.customerDetails.map(customer => `
    <tr>
      <td>${customer.name}</td>
      <td>${customer.sendCount.toLocaleString()}</td>
      <td><span class="tag ${customer.successRate >= 99.9 ? 'tag-success' : customer.successRate >= 99.5 ? 'tag-warning' : 'tag-danger'}">${customer.successRate}%</span></td>
      <td>${customer.sendRate.toLocaleString()} 条/秒</td>
      <td>${customer.p99Latency}ms</td>
      <td>${customer.queueBacklog.toLocaleString()}</td>
      <td><button class="btn btn-default">详情</button></td>
    </tr>
  `).join('');
}

// 发送业务量图表实例
let sendVolumeChartInstance = null;

// 时间范围切换
function updateSendVolumeChart() {
  const timeRange = document.getElementById('sendTimeRange').value;
  const datePickerContainer = document.getElementById('datePickerContainer');
  
  // 显示/隐藏日期选择器
  datePickerContainer.style.display = timeRange === 'custom' ? 'flex' : 'none';
  
  // 模拟生成数据
  const timeLabels = generateTimeLabels(timeRange);
  const sendData = generateSendVolumeData(timeLabels.length);
  const successData = generateSuccessVolumeData(sendData);
  
  // 计算统计数据
  const totalSend = sendData.reduce((a, b) => a + b, 0);
  const totalSuccess = successData.reduce((a, b) => a + b, 0);
  const successRate = totalSend > 0 ? ((totalSuccess / totalSend) * 100).toFixed(1) : '0';
  
  // 更新统计显示
  document.getElementById('totalSendVolume').textContent = totalSend.toLocaleString();
  document.getElementById('totalSuccessVolume').textContent = totalSuccess.toLocaleString();
  document.getElementById('successRate').textContent = successRate + '%';
  
  // 渲染图表
  renderSendVolumeChart(timeLabels, sendData, successData);
}

// 生成时间标签
function generateTimeLabels(range) {
  const labels = [];
  const now = new Date();
  
  switch(range) {
    case '1h':
      for (let i = 55; i >= 0; i -= 5) {
        const time = new Date(now.getTime() - i * 60 * 1000);
        labels.push(time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
      }
      break;
    case '6h':
      for (let i = 350; i >= 0; i -= 30) {
        const time = new Date(now.getTime() - i * 60 * 1000);
        labels.push(time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
      }
      break;
    case '24h':
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        labels.push(time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '00' }));
      }
      break;
    case 'custom':
      const datePicker = document.getElementById('sendDatePicker');
      const selectedDate = datePicker.value || now.toISOString().split('T')[0];
      for (let i = 23; i >= 0; i--) {
        labels.push(`${i.toString().padStart(2, '0')}:00`);
      }
      break;
  }
  return labels;
}

// 生成发送量数据
function generateSendVolumeData(count) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const baseValue = 5000 + Math.sin(i / 4) * 2000;
    const randomValue = Math.floor(baseValue + (Math.random() - 0.5) * 1000);
    data.push(Math.max(1000, randomValue));
  }
  return data;
}

// 生成成功量数据
function generateSuccessVolumeData(sendData) {
  return sendData.map(send => {
    const successRate = 0.92 + Math.random() * 0.06; // 92% - 98%
    return Math.floor(send * successRate);
  });
}

// 渲染发送业务量图表
function renderSendVolumeChart(labels, sendData, successData) {
  const chartDom = document.getElementById('sendVolumeChart');
  if (!chartDom) return;
  
  if (!sendVolumeChartInstance) {
    sendVolumeChartInstance = echarts.init(chartDom);
  }
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15,23,42,0.9)',
      borderColor: '#3b82f6',
      textStyle: { color: '#fff' },
      formatter: function(params) {
        let result = params[0].axisValue + '<br/>';
        params.forEach(item => {
          result += `${item.marker} ${item.seriesName}: ${item.value.toLocaleString()}<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['发送量', '成功量'],
      top: 10,
      textStyle: { color: '#64748b' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: labels,
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11,
        rotate: labels.length > 12 ? 45 : 0
      },
      axisLine: { lineStyle: { color: '#e2e8f0' } }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11
      },
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      splitLine: { lineStyle: { color: '#f1f5f9' } }
    },
    series: [
      {
        name: '发送量',
        type: 'line',
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
          ])
        },
        lineStyle: { color: '#3b82f6', width: 2 },
        data: sendData
      },
      {
        name: '成功量',
        type: 'line',
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(34, 197, 94, 0.3)' },
            { offset: 1, color: 'rgba(34, 197, 94, 0.05)' }
          ])
        },
        lineStyle: { color: '#22c55e', width: 2 },
        data: successData
      }
    ]
  };
  
  sendVolumeChartInstance.setOption(option);
}

// 筛选客户数据
function filterCustomerData() {
  console.log('筛选客户数据...');
  // 这里可以添加实际的筛选逻辑
  updateSendVolumeChart();
  updateAccountQpsPieChart();
  updateQueueBacklogBarChart();
  updateSendQpsChart();
  updateReceiptQpsChart();
  renderCustomerTable();
}

// 客户分析实时更新
function initCustomerRealtimeUpdate() {
  setInterval(function() {
    // 更新QPS饼图数据
    customerAnalysisData.accounts.forEach(acc => {
      const change = Math.floor((Math.random() - 0.5) * 200);
      acc.qps = Math.max(1000, acc.qps + change);
    });
    updateAccountQpsPieChart();
    
    // 更新队列积压数据
    customerAnalysisData.queueBacklog.forEach(item => {
      const change = Math.floor((Math.random() - 0.5) * 1000);
      item.value = Math.max(100, item.value + change);
    });
    updateQueueBacklogBarChart();
    
    // 更新QPS趋势图
    updateSendQpsChart();
    updateReceiptQpsChart();
    
    // 更新表格数据
    customerAnalysisData.customerDetails.forEach(customer => {
      const rateChange = Math.floor((Math.random() - 0.5) * 50);
      customer.sendRate = Math.max(100, customer.sendRate + rateChange);
      
      const queueChange = Math.floor((Math.random() - 0.5) * 200);
      customer.queueBacklog = Math.max(100, customer.queueBacklog + queueChange);
    });
    renderCustomerTable();
  }, 5000);
}

// 处理客户分析图表窗口大小变化
function handleCustomerChartsResize() {
  if (accountQpsPieChart && !accountQpsPieChart.isDisposed) {
    accountQpsPieChart.resize();
  }
  if (queueBacklogBarChart && !queueBacklogBarChart.isDisposed) {
    queueBacklogBarChart.resize();
  }
  if (sendQpsChart && !sendQpsChart.isDisposed) {
    sendQpsChart.resize();
  }
  if (receiptQpsChart && !receiptQpsChart.isDisposed) {
    receiptQpsChart.resize();
  }
  if (customerErrorChartInstance && !customerErrorChartInstance.isDisposed) {
    customerErrorChartInstance.resize();
  }
}

// ==================== 客户连接拓扑图 ====================
let topologyChart = null;

// 初始化客户连接拓扑图
function initTopologyChart() {
  const chartDom = document.getElementById('topologyChart');
  if (!chartDom) return;
  
  topologyChart = echarts.init(chartDom);
  updateTopologyChart();
}

// 多客户数据定义
const topologyCustomers = [
  { id: 'cust_001', name: '云通信集团', x: 80, y: 280 },
  { id: 'cust_002', name: '电商平台', x: 80, y: 280 },
  { id: 'cust_003', name: '金融服务', x: 80, y: 280 }
];

const topologySenderAccounts = {
  'cust_001': [
    { id: 'sender_sms_main', name: 'SMS主账号', customerId: 'cust_001', x: 280, y: 120 },
    { id: 'sender_sms_backup', name: 'SMS备用账号', customerId: 'cust_001', x: 280, y: 210 },
    { id: 'sender_voice', name: '语音通知账号', customerId: 'cust_001', x: 280, y: 310 },
    { id: 'sender_push', name: 'Push营销号', customerId: 'cust_001', x: 280, y: 410 }
  ],
  'cust_002': [
    { id: 'sender_ecom_sms', name: '电商短信账号', customerId: 'cust_002', x: 280, y: 160 },
    { id: 'sender_ecom_push', name: '电商推送账号', customerId: 'cust_002', x: 280, y: 280 },
    { id: 'sender_ecom_voice', name: '语音验证账号', customerId: 'cust_002', x: 280, y: 400 }
  ],
  'cust_003': [
    { id: 'sender_fin_sms', name: '金融短信账号', customerId: 'cust_003', x: 280, y: 180 },
    { id: 'sender_fin_push', name: '金融推送账号', customerId: 'cust_003', x: 280, y: 340 }
  ]
};

// 更新客户连接拓扑图
function updateTopologyChart() {
  if (!topologyChart) return;

  // 获取当前选中的客户筛选条件
  const filterSelect = document.getElementById('topologyCustomerFilter');
  const selectedCustomerId = filterSelect ? filterSelect.value : 'all';

  // 根据筛选条件获取客户数据
  let customers = [];
  let senderAccounts = [];
  
  if (selectedCustomerId === 'all') {
    // 显示所有客户
    let yOffset = 0;
    const stepY = 180;
    
    topologyCustomers.forEach((cust, idx) => {
      customers.push({ ...cust, y: 180 + idx * stepY });
      
      // 调整发送账号的Y坐标
      topologySenderAccounts[cust.id].forEach((acc, accIdx) => {
        const baseY = 80 + idx * stepY;
        senderAccounts.push({ ...acc, y: baseY + accIdx * 100 });
      });
    });
  } else {
    // 显示单个客户
    const customer = topologyCustomers.find(c => c.id === selectedCustomerId);
    if (customer) {
      customers = [customer];
      senderAccounts = topologySenderAccounts[selectedCustomerId] || [];
    }
  }
  
  const platform = { id: 'platform_gw', name: '泛消息平台', x: 520, y: 280 };
  
  const channels = [
    { id: 'ch_ali_sms', name: '国内短信通道', vendorId: 'vendor_ali', x: 800, y: 80 },
    { id: 'ch_ali_voice', name: '语音通知通道', vendorId: 'vendor_ali', x: 800, y: 160 },
    { id: 'ch_tencent_sms', name: '腾讯云短信', vendorId: 'vendor_tencent', x: 800, y: 240 },
    { id: 'ch_tencent_push', name: 'Push通道', vendorId: 'vendor_tencent', x: 800, y: 320 },
    { id: 'ch_aws_email', name: '邮件通道', vendorId: 'vendor_aws', x: 800, y: 400 },
    { id: 'ch_aws_sns', name: 'SNS通道', vendorId: 'vendor_aws', x: 800, y: 480 }
  ];
  
  const channelVendors = [
    { id: 'vendor_ali', name: '阿里云通信', x: 1080, y: 120 },
    { id: 'vendor_tencent', name: '腾讯云', x: 1080, y: 280 },
    { id: 'vendor_aws', name: 'AWS', x: 1080, y: 440 }
  ];

  const randClientIp = () => `10.${Math.floor(Math.random() * 50) + 10}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;
  const randNodeIp = () => `172.31.${Math.floor(Math.random() * 30) + 10}.${Math.floor(Math.random() * 250)}`;

  // 生成业务多链接: 发送账号 → 平台
  let accountToPlatformLinks = [];
  senderAccounts.forEach(acc => {
    const linkCount = 3;
    for (let i = 1; i <= linkCount; i++) {
      const status = Math.random() > 0.25 ? 'normal' : 'error';
      const linkId = `a2p_${acc.id}_lnk${i}`;
      const customer = customers.find(c => c.id === acc.customerId);
      accountToPlatformLinks.push({
        id: linkId,
        type: 'account2platform',
        senderAccountId: acc.id,
        senderAccountName: acc.name,
        platformId: platform.id,
        customerName: customer ? customer.name : '未知客户',
        clientIp: randClientIp(),
        linkNodeIp: randNodeIp(),
        linkId: linkId,
        currentConcurrent: Math.floor(Math.random() * 450) + 20,
        status: status,
        seq: i,
        desc: `${acc.name} → 平台第${i}条链路`
      });
    }
  });

  // 生成业务多链接: 平台 → 通道
  let platformToChannelLinks = [];
  channels.forEach(ch => {
    const linkCount = 3;
    for (let i = 1; i <= linkCount; i++) {
      const status = Math.random() > 0.2 ? 'normal' : 'error';
      const linkId = `p2c_${ch.id}_lnk${i}`;
      const vendor = channelVendors.find(v => v.id === ch.vendorId);
      platformToChannelLinks.push({
        id: linkId,
        type: 'platform2channel',
        channelId: ch.id,
        channelName: ch.name,
        vendorName: vendor ? vendor.name : '未知通道商',
        platformId: platform.id,
        channelAccount: `${ch.name}_acct_${i}`,
        linkNodeIp: randNodeIp(),
        linkId: linkId,
        currentConcurrent: Math.floor(Math.random() * 700) + 40,
        status: status,
        seq: i,
        desc: `平台 → ${ch.name} 第${i}条链路`
      });
    }
  });

  // 构建节点集
  const nodes = [];
  
  // 客户节点（支持多个客户）
  customers.forEach(customer => {
    nodes.push({
      id: customer.id,
      name: customer.name,
      category: 'customer',
      symbolSize: 54,
      x: customer.x,
      y: customer.y,
      fixed: true,
      itemStyle: { color: '#3b82f6', borderColor: '#1e40af', borderWidth: 1 },
      label: { show: true, position: 'bottom', fontSize: 12, fontWeight: '500', offset: [0, 12] }
    });
  });

  senderAccounts.forEach(acc => {
    nodes.push({
      id: acc.id,
      name: acc.name,
      category: 'sender',
      symbolSize: 46,
      x: acc.x,
      y: acc.y,
      fixed: true,
      itemStyle: { color: '#10b981', borderColor: '#047857', borderWidth: 1 },
      label: { show: true, position: 'bottom', fontSize: 11 }
    });
  });

  nodes.push({
    id: platform.id,
    name: platform.name,
    category: 'platform',
    symbolSize: 64,
    x: platform.x,
    y: platform.y,
    fixed: true,
    itemStyle: { color: '#f59e0b', borderColor: '#b45309', borderWidth: 1, shadowBlur: 8 },
    label: { show: true, position: 'bottom', fontSize: 13, fontWeight: 'bold', offset: [0, 14] }
  });

  channels.forEach(ch => {
    nodes.push({
      id: ch.id,
      name: ch.name,
      category: 'channel',
      symbolSize: 44,
      x: ch.x,
      y: ch.y,
      fixed: true,
      itemStyle: { color: '#a855f7', borderColor: '#6b21a5', borderWidth: 1 },
      label: { show: true, position: 'bottom', fontSize: 10, offset: [0, 6] }
    });
  });

  channelVendors.forEach(vendor => {
    nodes.push({
      id: vendor.id,
      name: vendor.name,
      category: 'vendor',
      symbolSize: 50,
      x: vendor.x,
      y: vendor.y,
      fixed: true,
      itemStyle: { color: '#e879f9', borderColor: '#a21caf', borderWidth: 1 },
      label: { show: true, position: 'bottom', fontSize: 11, offset: [0, 8] }
    });
  });

  // 构建边集
  let edges = [];

  // 客户 → 发送账号 (归属虚线，无箭头，不可点击)
  senderAccounts.forEach(acc => {
    edges.push({
      id: `edge_cust_to_${acc.id}`,
      source: acc.customerId,
      target: acc.id,
      lineStyle: { color: '#94a3b8', width: 2, type: 'dashed', curveness: 0.1 },
      label: { show: false },
      interactive: false,
      symbol: ['none', 'none'],
      data: null
    });
  });

  // 通道商 → 通道 (虚线归属，无箭头，不可点击)
  channels.forEach(ch => {
    const vendor = channelVendors.find(v => v.id === ch.vendorId);
    if (vendor) {
      edges.push({
        id: `edge_vendor_${vendor.id}_to_${ch.id}`,
        source: vendor.id,
        target: ch.id,
        lineStyle: { color: '#94a3b8', width: 2, type: 'dashed', curveness: 0.15 },
        label: { show: false },
        interactive: false,
        symbol: ['none', 'none'],
        data: null
      });
    }
  });

  // 发送账号 → 平台 多链接
  const accPlatMap = new Map();
  accountToPlatformLinks.forEach(link => {
    const key = `${link.senderAccountId}|${link.platformId}`;
    if (!accPlatMap.has(key)) accPlatMap.set(key, []);
    accPlatMap.get(key).push(link);
  });
  for (let [_, links] of accPlatMap.entries()) {
    const count = links.length;
    const step = count === 1 ? 0 : 0.5 / (count - 1);
    let startCurve = -0.25;
    links.forEach((link, idx) => {
      const isNormal = link.status === 'normal';
      const edgeColor = isNormal ? '#2ecc71' : '#e74c3c';
      let curve = startCurve + idx * step;
      if (count === 1) curve = 0.2;
      curve = Math.min(0.45, Math.max(-0.45, curve));
      edges.push({
        id: link.id,
        source: link.senderAccountId,
        target: link.platformId,
        lineStyle: { color: edgeColor, width: 3, curveness: curve, type: 'solid', opacity: 0.9 },
        label: { show: false },
        interactive: true,
        symbol: ['none', 'arrow'],
        data: link
      });
    });
  }

  // 平台 → 通道 多链接
  const platChanMap = new Map();
  platformToChannelLinks.forEach(link => {
    const key = `${link.platformId}|${link.channelId}`;
    if (!platChanMap.has(key)) platChanMap.set(key, []);
    platChanMap.get(key).push(link);
  });
  for (let [_, links] of platChanMap.entries()) {
    const count = links.length;
    const step = count === 1 ? 0 : 0.48 / (count - 1);
    let startCurve = -0.24;
    links.forEach((link, idx) => {
      const isNormal = link.status === 'normal';
      const edgeColor = isNormal ? '#2ecc71' : '#e74c3c';
      let curve = startCurve + idx * step;
      if (count === 1) curve = 0.2;
      curve = Math.min(0.45, Math.max(-0.45, curve));
      edges.push({
        id: link.id,
        source: link.platformId,
        target: link.channelId,
        lineStyle: { color: edgeColor, width: 3, curveness: curve, type: 'solid' },
        label: { show: false },
        interactive: true,
        symbol: ['none', 'arrow'],
        data: link
      });
    });
  }

  const categories = [
    { name: '客户', itemStyle: { color: '#3b82f6' } },
    { name: '发送账号', itemStyle: { color: '#10b981' } },
    { name: '平台', itemStyle: { color: '#f59e0b' } },
    { name: '通道', itemStyle: { color: '#a855f7' } },
    { name: '通道商', itemStyle: { color: '#e879f9' } }
  ];

  const option = {
    title: { show: false },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (params.dataType === 'edge') {
          const edgeData = params.data.data;
          if (edgeData) {
            if (edgeData.type === 'account2platform') {
              const statusText = edgeData.status === 'normal' ? '正常' : '异常';
              return `🔗 账号→平台链接 #${edgeData.seq}<br/>发送账号: ${edgeData.senderAccountName}<br/>状态: ${statusText}<br/>并发: ${edgeData.currentConcurrent}<br/>点击查看完整详情`;
            } else if (edgeData.type === 'platform2channel') {
              const statusText = edgeData.status === 'normal' ? '正常' : '异常';
              return `🔗 平台→通道链接 #${edgeData.seq}<br/>通道: ${edgeData.channelName}<br/>状态: ${statusText}<br/>并发: ${edgeData.currentConcurrent}<br/>点击查看详情`;
            }
          }
          if (params.data.lineStyle?.type === 'dashed') return '归属关系（虚线）';
          return `链接 (${params.data.lineStyle?.color === '#2ecc71' ? '正常' : '异常'})`;
        } else {
          return `节点: ${params.name}`;
        }
      },
      backgroundColor: 'rgba(15,23,42,0.85)',
      borderColor: '#334155',
      textStyle: { color: '#f1f5f9', fontSize: 12 }
    },
    series: [{
      type: 'graph',
      layout: 'none',
      roam: true,
      draggable: false,
      data: nodes,
      links: edges,
      categories: categories,
      edgeSymbol: ['none', 'arrow'],
      edgeSymbolSize: [0, 8],
      label: {
        show: true,
        position: 'bottom',
        fontSize: 10,
        offset: [0, 6],
        formatter: (params) => params.name
      },
      emphasis: {
        focus: 'adjacency',
        lineStyle: { width: 4, shadowBlur: 8 }
      },
      lineStyle: { opacity: 0.9 },
      itemStyle: { borderWidth: 1 },
      select: { disabled: false },
      roamZoom: true,
      roamPan: true
    }],
    backgroundColor: '#ffffff',
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { title: '保存拓扑图' },
        restore: { title: '重置视图' }
      },
      right: 20,
      top: 10
    }
  };

  topologyChart.setOption(option);

  // 添加点击事件处理
  const detailPanel = document.getElementById('detailPanel');
  const detailContent = document.getElementById('detailContent');
  const closeBtn = document.getElementById('closePanelBtn');
  
  function showDetail(linkData) {
    if (!linkData) return;
    let html = '';
    if (linkData.type === 'account2platform') {
      const statusText = linkData.status === 'normal' ? '正常 ✓' : '异常 ✗';
      const statusClass = linkData.status === 'normal' ? 'status-normal' : 'status-error';
      html = `
        <div class="detail-row"><div class="detail-label">客户</div><div class="detail-value">${linkData.customerName}</div></div>
        <div class="detail-row"><div class="detail-label">发送账号</div><div class="detail-value">${linkData.senderAccountName}</div></div>
        <div class="detail-row"><div class="detail-label">客户IP</div><div class="detail-value">${linkData.clientIp}</div></div>
        <div class="detail-row"><div class="detail-label">链接节点IP</div><div class="detail-value">${linkData.linkNodeIp}</div></div>
        <div class="detail-row"><div class="detail-label">链接ID</div><div class="detail-value">${linkData.linkId}</div></div>
        <div class="detail-row"><div class="detail-label">当前并发</div><div class="detail-value">${linkData.currentConcurrent}</div></div>
        <div class="detail-row"><div class="detail-label">链接状态</div><div class="detail-value"><span class="status-badge ${statusClass}">${statusText}</span></div></div>
        <div class="detail-row"><div class="detail-label">链路序号</div><div class="detail-value">第 ${linkData.seq} 条连接</div></div>
      `;
    } else if (linkData.type === 'platform2channel') {
      const statusText = linkData.status === 'normal' ? '正常 ✓' : '异常 ✗';
      const statusClass = linkData.status === 'normal' ? 'status-normal' : 'status-error';
      html = `
        <div class="detail-row"><div class="detail-label">通道商</div><div class="detail-value">${linkData.vendorName || '-'}</div></div>
        <div class="detail-row"><div class="detail-label">通道名称</div><div class="detail-value">${linkData.channelName}</div></div>
        <div class="detail-row"><div class="detail-label">通道账号</div><div class="detail-value">${linkData.channelAccount}</div></div>
        <div class="detail-row"><div class="detail-label">链接节点IP</div><div class="detail-value">${linkData.linkNodeIp}</div></div>
        <div class="detail-row"><div class="detail-label">链接ID</div><div class="detail-value">${linkData.linkId}</div></div>
        <div class="detail-row"><div class="detail-label">当前并发</div><div class="detail-value">${linkData.currentConcurrent}</div></div>
        <div class="detail-row"><div class="detail-label">链接状态</div><div class="detail-value"><span class="status-badge ${statusClass}">${statusText}</span></div></div>
        <div class="detail-row"><div class="detail-label">链路序号</div><div class="detail-value">第 ${linkData.seq} 条连接</div></div>
      `;
    } else {
      html = `<div style="padding:12px;text-align:center;">无法获取链接详情</div>`;
    }
    detailContent.innerHTML = html;
    detailPanel.classList.add('show');
  }
  
  function hideDetail() {
    detailPanel.classList.remove('show');
  }
  
  topologyChart.off('click');
  topologyChart.on('click', (params) => {
    if (params.dataType === 'edge') {
      const edgeInfo = params.data;
      if (edgeInfo && edgeInfo.data && (edgeInfo.data.type === 'account2platform' || edgeInfo.data.type === 'platform2channel')) {
        showDetail(edgeInfo.data);
      } else {
        hideDetail();
      }
    } else {
      hideDetail();
    }
  });
  
  closeBtn.removeEventListener('click', hideDetail);
  closeBtn.addEventListener('click', hideDetail);
}

// ==================== 通道分析相关代码 ====================

// 通道分析模拟数据
const channelAccountQpsData = [
  { name: '通道账号1', value: 3520 },
  { name: '通道账号2', value: 2890 },
  { name: '通道账号3', value: 2150 },
  { name: '通道账号4', value: 1870 },
  { name: '通道账号5', value: 1560 },
  { name: '其他', value: 890 }
];

const channelErrorCodeData = {
  cmpp: [
    { name: '0', value: 1520 },
    { name: '1', value: 320 },
    { name: '2', value: 280 },
    { name: '3', value: 150 },
    { name: '4', value: 90 },
    { name: '5', value: 60 }
  ],
  sgip: [
    { name: '0', value: 1890 },
    { name: '1', value: 250 },
    { name: '2', value: 180 },
    { name: '3', value: 120 },
    { name: '4', value: 80 },
    { name: '5', value: 40 }
  ],
  smgp: [
    { name: '0', value: 1650 },
    { name: '1', value: 380 },
    { name: '2', value: 220 },
    { name: '3', value: 140 },
    { name: '4', value: 70 },
    { name: '5', value: 50 }
  ]
};

const channelQueueBacklogData = (() => {
  const data = [];
  const channels = ['阿里云短信', '腾讯云短信', '移动短信', '联通短信', '电信短信', '华为云短信', '百度云短信', '京东云短信', '网易云短信', '小米云短信', '美团短信', '滴滴短信', '携程短信', '同程短信', '飞猪短信', '去哪儿短信', '饿了么短信', '口碑短信', '盒马短信', '菜鸟短信'];
  for (let i = 0; i < 20; i++) {
    data.push({
      name: channels[i],
      value: Math.floor(Math.random() * 5000) + 1000
    });
  }
  return data.sort((a, b) => b.value - a.value);
})();

const generateChannelQpsTimeData = (count = 60) => {
  const data = [];
  for (let i = count - 1; i >= 0; i--) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - i);
    data.push({
      time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
      '阿里云短信': Math.floor(Math.random() * 500) + 800,
      '腾讯云短信': Math.floor(Math.random() * 400) + 600,
      '移动短信': Math.floor(Math.random() * 300) + 400,
      '联通短信': Math.floor(Math.random() * 250) + 300,
      '电信短信': Math.floor(Math.random() * 200) + 250
    });
  }
  return data;
};

const generateChannelReceiptQpsTimeData = (count = 60) => {
  const data = [];
  for (let i = count - 1; i >= 0; i--) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - i);
    data.push({
      time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
      '阿里云短信': Math.floor(Math.random() * 450) + 700,
      '腾讯云短信': Math.floor(Math.random() * 350) + 500,
      '移动短信': Math.floor(Math.random() * 280) + 350,
      '联通短信': Math.floor(Math.random() * 220) + 260,
      '电信短信': Math.floor(Math.random() * 180) + 220
    });
  }
  return data;
};

// 通道分析图表实例
let channelAccountQpsPieChart = null;
let channelErrorChart = null;
let channelQueueBacklogBarChart = null;
let channelSendQpsChart = null;
let channelReceiptQpsChart = null;
let channelTopologyChart = null;

let currentChannelErrorTab = 'cmpp';
let currentChannelErrorTimeRange = '1h';
let currentChannelSendQpsTimeRange = '1h';
let currentChannelReceiptQpsTimeRange = '1h';

// 初始化通道分析图表
function initChannelAnalysisCharts() {
  initChannelAccountQpsPieChart();
  initChannelErrorChart();
  initChannelQueueBacklogBarChart();
  initChannelSendQpsChart();
  initChannelReceiptQpsChart();
  initChannelTopologyChart();
}

// 通道账号QPS分布柱状图
function initChannelAccountQpsPieChart() {
  const dom = document.getElementById('channelAccountQpsPieChart');
  if (!dom) return;
  channelAccountQpsPieChart = echarts.init(dom);
  
  const totalQps = channelAccountQpsData.reduce((sum, item) => sum + item.value, 0);
  document.getElementById('totalChannelAccountQps').textContent = totalQps.toLocaleString();
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: '{b}: {c}'
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: channelAccountQpsData.map(item => item.name),
      axisLabel: { fontSize: 11, rotate: 30 }
    },
    yAxis: { type: 'value', name: 'QPS', nameTextStyle: { fontSize: 12 } },
    series: [{
      type: 'bar',
      data: channelAccountQpsData.map((item, index) => ({
        value: item.value,
        itemStyle: { 
          color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#6b7280'][index],
          borderRadius: [4, 4, 0, 0]
        }
      })),
      barWidth: '50%'
    }]
  };
  
  channelAccountQpsPieChart.setOption(option);
}

// 通道错误码分布图表
function initChannelErrorChart() {
  const dom = document.getElementById('channel-error-chart');
  if (!dom) return;
  channelErrorChart = echarts.init(dom);
  updateChannelErrorChart();
}

function switchChannelErrorCodeTab(tab) {
  currentChannelErrorTab = tab;
  document.querySelectorAll('.tab-switch .tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  updateChannelErrorChart();
}

function switchChannelErrorTimeRange(range) {
  currentChannelErrorTimeRange = range;
  document.querySelectorAll('.time-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  updateChannelErrorChart();
}

function updateChannelErrorChart() {
  if (!channelErrorChart) return;
  
  const data = channelErrorCodeData[currentChannelErrorTab] || [];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  document.getElementById('channel-error-total').textContent = total.toLocaleString();
  
  const highFreq = data.length > 1 ? data[1] : null;
  document.getElementById('channel-error-high').textContent = highFreq ? `${highFreq.name}(${highFreq.value})` : '-';
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      itemGap: 8,
      textStyle: { fontSize: 12 }
    },
    series: [{
      type: 'pie',
      radius: ['45%', '75%'],
      center: ['40%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        formatter: '{b}\n{d}%',
        fontSize: 11
      },
      emphasis: {
        label: { show: true, fontSize: 13, fontWeight: 'bold' },
        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.3)' }
      },
      labelLine: { show: true, length: 15, length2: 10 },
      data: data.map((item, index) => ({
        ...item,
        itemStyle: { color: ['#22c55e', '#ef4444', '#f59e0b', '#3b82f6', '#a855f7', '#6b7280'][index] }
      }))
    }]
  };
  
  channelErrorChart.setOption(option);
}

// 通道队列积压柱状图
function initChannelQueueBacklogBarChart() {
  const dom = document.getElementById('channelQueueBacklogBarChart');
  if (!dom) return;
  channelQueueBacklogBarChart = echarts.init(dom);
  
  const option = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: {
      type: 'value',
      name: '积压数量',
      nameTextStyle: { fontSize: 12 }
    },
    yAxis: {
      type: 'category',
      data: channelQueueBacklogData.map(item => item.name),
      axisLabel: { fontSize: 11 },
      inverse: true
    },
    series: [{
      type: 'bar',
      data: channelQueueBacklogData.map(item => ({
        value: item.value,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#60a5fa' },
            { offset: 1, color: '#3b82f6' }
          ]),
          borderRadius: [0, 4, 4, 0]
        }
      })),
      barWidth: '60%'
    }]
  };
  
  channelQueueBacklogBarChart.setOption(option);
}

// 通道发送QPS趋势
function initChannelSendQpsChart() {
  const dom = document.getElementById('channelSendQpsChart');
  if (!dom) return;
  channelSendQpsChart = echarts.init(dom);
  updateChannelSendQpsChart();
}

function switchChannelSendQpsTimeRange(range) {
  currentChannelSendQpsTimeRange = range;
  document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('btn-primary'));
  event.target.classList.add('btn-primary');
  updateChannelSendQpsChart();
}

function updateChannelSendQpsChart() {
  if (!channelSendQpsChart) return;
  
  const viewType = document.getElementById('channelSendQpsViewType')?.value || 'top5';
  const container = document.getElementById('channelSendQpsSelectContainer');
  if (viewType === 'select') {
    container.style.display = 'block';
  } else {
    container.style.display = 'none';
  }
  
  const count = currentChannelSendQpsTimeRange === '5m' ? 30 : currentChannelSendQpsTimeRange === '1h' ? 60 : 24;
  const timeData = generateChannelQpsTimeData(count);
  
  const option = {
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['阿里云短信', '腾讯云短信', '移动短信', '联通短信', '电信短信'],
      bottom: 0,
      itemGap: 15,
      textStyle: { fontSize: 11 }
    },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: timeData.map(item => item.time),
      axisLabel: { fontSize: 10, rotate: 45 }
    },
    yAxis: { type: 'value', name: 'QPS', nameTextStyle: { fontSize: 12 } },
    series: [
      { name: '阿里云短信', type: 'line', data: timeData.map(item => item['阿里云短信']), smooth: true, lineStyle: { width: 2 }, itemStyle: { color: '#3b82f6' }, areaStyle: { opacity: 0.3 } },
      { name: '腾讯云短信', type: 'line', data: timeData.map(item => item['腾讯云短信']), smooth: true, lineStyle: { width: 2 }, itemStyle: { color: '#10b981' }, areaStyle: { opacity: 0.3 } },
      { name: '移动短信', type: 'line', data: timeData.map(item => item['移动短信']), smooth: true, lineStyle: { width: 2 }, itemStyle: { color: '#f59e0b' }, areaStyle: { opacity: 0.3 } },
      { name: '联通短信', type: 'line', data: timeData.map(item => item['联通短信']), smooth: true, lineStyle: { width: 2 }, itemStyle: { color: '#ef4444' }, areaStyle: { opacity: 0.3 } },
      { name: '电信短信', type: 'line', data: timeData.map(item => item['电信短信']), smooth: true, lineStyle: { width: 2 }, itemStyle: { color: '#a855f7' }, areaStyle: { opacity: 0.3 } }
    ]
  };
  
  channelSendQpsChart.setOption(option);
}

// 通道回执QPS趋势
function initChannelReceiptQpsChart() {
  const dom = document.getElementById('channelReceiptQpsChart');
  if (!dom) return;
  channelReceiptQpsChart = echarts.init(dom);
  updateChannelReceiptQpsChart();
}

function switchChannelReceiptQpsTimeRange(range) {
  currentChannelReceiptQpsTimeRange = range;
  document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('btn-primary'));
  event.target.classList.add('btn-primary');
  updateChannelReceiptQpsChart();
}

function updateChannelReceiptQpsChart() {
  if (!channelReceiptQpsChart) return;
  
  const count = currentChannelReceiptQpsTimeRange === '5m' ? 30 : currentChannelReceiptQpsTimeRange === '1h' ? 60 : 24;
  const timeData = generateChannelReceiptQpsTimeData(count);
  
  const option = {
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['阿里云短信', '腾讯云短信', '移动短信', '联通短信', '电信短信'],
      bottom: 0,
      itemGap: 15,
      textStyle: { fontSize: 11 }
    },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: timeData.map(item => item.time),
      axisLabel: { fontSize: 10, rotate: 45 }
    },
    yAxis: { type: 'value', name: 'QPS', nameTextStyle: { fontSize: 12 } },
    series: [
      { name: '阿里云短信', type: 'line', data: timeData.map(item => item['阿里云短信']), smooth: true, lineStyle: { width: 2 }, itemStyle: { color: '#3b82f6' }, areaStyle: { opacity: 0.3 } },
      { name: '腾讯云短信', type: 'line', data: timeData.map(item => item['腾讯云短信']), smooth: true, lineStyle: { width: 2 }, itemStyle: { color: '#10b981' }, areaStyle: { opacity: 0.3 } },
      { name: '移动短信', type: 'line', data: timeData.map(item => item['移动短信']), smooth: true, lineStyle: { width: 2 }, itemStyle: { color: '#f59e0b' }, areaStyle: { opacity: 0.3 } },
      { name: '联通短信', type: 'line', data: timeData.map(item => item['联通短信']), smooth: true, lineStyle: { width: 2 }, itemStyle: { color: '#ef4444' }, areaStyle: { opacity: 0.3 } },
      { name: '电信短信', type: 'line', data: timeData.map(item => item['电信短信']), smooth: true, lineStyle: { width: 2 }, itemStyle: { color: '#a855f7' }, areaStyle: { opacity: 0.3 } }
    ]
  };
  
  channelReceiptQpsChart.setOption(option);
}

// 通道连接分析拓扑图数据
const channelTopologyChannels = [
  { id: 'ch_001', name: '阿里云短信通道', x: 700, y: 250 },
  { id: 'ch_002', name: '腾讯云短信通道', x: 700, y: 250 },
  { id: 'ch_003', name: '移动短信通道', x: 700, y: 250 }
];

const channelTopologyVendors = {
  'ch_001': [{ id: 'vendor_001', name: '阿里云', x: 900, y: 250 }],
  'ch_002': [{ id: 'vendor_002', name: '腾讯云', x: 900, y: 250 }],
  'ch_003': [{ id: 'vendor_003', name: '中国移动', x: 900, y: 250 }]
};

const channelTopologySenderAccounts = {
  'ch_001': [
    { id: 'sa_001', name: '发送账号A', customerId: 'cust_001', x: 350, y: 120 },
    { id: 'sa_002', name: '发送账号B', customerId: 'cust_001', x: 350, y: 200 },
    { id: 'sa_003', name: '发送账号C', customerId: 'cust_002', x: 350, y: 280 },
    { id: 'sa_004', name: '发送账号D', customerId: 'cust_003', x: 350, y: 360 }
  ],
  'ch_002': [
    { id: 'sa_005', name: '发送账号E', customerId: 'cust_001', x: 350, y: 150 },
    { id: 'sa_006', name: '发送账号F', customerId: 'cust_002', x: 350, y: 250 },
    { id: 'sa_007', name: '发送账号G', customerId: 'cust_003', x: 350, y: 350 }
  ],
  'ch_003': [
    { id: 'sa_008', name: '发送账号H', customerId: 'cust_001', x: 350, y: 180 },
    { id: 'sa_009', name: '发送账号I', customerId: 'cust_002', x: 350, y: 280 },
    { id: 'sa_010', name: '发送账号J', customerId: 'cust_003', x: 350, y: 380 }
  ]
};

const channelTopologyCustomers = {
  'ch_001': [
    { id: 'cust_001', name: '云通信集团', x: 120, y: 160 },
    { id: 'cust_002', name: '电商平台', x: 120, y: 280 },
    { id: 'cust_003', name: '金融服务', x: 120, y: 360 }
  ],
  'ch_002': [
    { id: 'cust_001', name: '云通信集团', x: 120, y: 150 },
    { id: 'cust_002', name: '电商平台', x: 120, y: 250 },
    { id: 'cust_003', name: '金融服务', x: 120, y: 350 }
  ],
  'ch_003': [
    { id: 'cust_001', name: '云通信集团', x: 120, y: 180 },
    { id: 'cust_002', name: '电商平台', x: 120, y: 280 },
    { id: 'cust_003', name: '金融服务', x: 120, y: 380 }
  ]
};

// 初始化通道连接分析拓扑图
function initChannelTopologyChart() {
  const dom = document.getElementById('channelTopologyChart');
  if (!dom) return;
  channelTopologyChart = echarts.init(dom);
  updateChannelTopologyChart();
}

function updateChannelTopologyChart() {
  if (!channelTopologyChart) return;
  
  const selectedChannel = document.getElementById('channelTopologyFilter')?.value || 'ch_001';
  
  const customers = channelTopologyCustomers[selectedChannel] || [];
  const senderAccounts = channelTopologySenderAccounts[selectedChannel] || [];
  const channel = channelTopologyChannels.find(c => c.id === selectedChannel);
  const vendors = channelTopologyVendors[selectedChannel] || [];
  
  const platform = { id: 'platform', name: '泛消息平台', x: 520, y: 250 };
  
  // 构建节点集
  const nodes = [];
  
  // 客户节点
  customers.forEach(cust => {
    nodes.push({
      id: cust.id,
      name: cust.name,
      category: 'customer',
      symbolSize: 54,
      x: cust.x,
      y: cust.y,
      fixed: true,
      itemStyle: { color: '#3b82f6', borderColor: '#1e40af', borderWidth: 1 },
      label: { show: true, position: 'bottom', fontSize: 12, fontWeight: '500', offset: [0, 12] }
    });
  });
  
  // 发送账号节点
  senderAccounts.forEach(acc => {
    nodes.push({
      id: acc.id,
      name: acc.name,
      category: 'sender',
      symbolSize: 46,
      x: acc.x,
      y: acc.y,
      fixed: true,
      itemStyle: { color: '#10b981', borderColor: '#047857', borderWidth: 1 },
      label: { show: true, position: 'bottom', fontSize: 11 }
    });
  });
  
  // 平台节点
  nodes.push({
    id: platform.id,
    name: platform.name,
    category: 'platform',
    symbolSize: 64,
    x: platform.x,
    y: platform.y,
    fixed: true,
    itemStyle: { color: '#f59e0b', borderColor: '#b45309', borderWidth: 1, shadowBlur: 8 },
    label: { show: true, position: 'bottom', fontSize: 13, fontWeight: 'bold', offset: [0, 14] }
  });
  
  // 通道节点
  if (channel) {
    nodes.push({
      id: channel.id,
      name: channel.name,
      category: 'channel',
      symbolSize: 52,
      x: channel.x,
      y: channel.y,
      fixed: true,
      itemStyle: { color: '#a855f7', borderColor: '#7c3aed', borderWidth: 1 },
      label: { show: true, position: 'bottom', fontSize: 12, fontWeight: '500', offset: [0, 12] }
    });
  }
  
  // 通道商节点
  vendors.forEach(vendor => {
    nodes.push({
      id: vendor.id,
      name: vendor.name,
      category: 'vendor',
      symbolSize: 50,
      x: vendor.x,
      y: vendor.y,
      fixed: true,
      itemStyle: { color: '#e879f9', borderColor: '#a21caf', borderWidth: 1 },
      label: { show: true, position: 'bottom', fontSize: 11, offset: [0, 8] }
    });
  });
  
  // 构建边集
  let edges = [];
  
  // 客户 → 发送账号 (归属虚线)
  senderAccounts.forEach(acc => {
    edges.push({
      id: `edge_cust_to_${acc.id}`,
      source: acc.customerId,
      target: acc.id,
      lineStyle: { color: '#94a3b8', width: 2, type: 'dashed', curveness: 0.1 },
      label: { show: false },
      interactive: false,
      symbol: ['none', 'none'],
      data: null
    });
  });
  
  // 发送账号 → 平台 (实线，可点击)
  senderAccounts.forEach((acc, index) => {
    const status = index % 4 === 0 ? 'abnormal' : 'normal';
    edges.push({
      id: `edge_acc_to_platform_${acc.id}`,
      source: acc.id,
      target: platform.id,
      lineStyle: { 
        color: status === 'normal' ? '#2ecc71' : '#e74c3c', 
        width: 3, 
        curveness: (acc.y - platform.y) * 0.0008 
      },
      label: { show: false },
      interactive: true,
      symbol: ['none', 'arrow'],
      data: {
        type: 'account2platform',
        seq: index + 1,
        customerName: customers.find(c => c.id === acc.customerId)?.name || '-',
        senderAccountName: acc.name,
        clientIp: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
        linkNodeIp: '10.0.0.1',
        linkId: `LNK-${acc.id}`,
        currentConcurrent: Math.floor(Math.random() * 50) + 10,
        status: status
      }
    });
  });
  
  // 平台 → 通道 (实线，可点击，4条连接)
  if (channel) {
    for (let i = 0; i < 4; i++) {
      const status = Math.random() > 0.15 ? 'normal' : 'abnormal';
      edges.push({
        id: `edge_platform_to_channel_${channel.id}_${i}`,
        source: platform.id,
        target: channel.id,
        lineStyle: { color: status === 'normal' ? '#2ecc71' : '#e74c3c', width: 3, curveness: -0.1 + (i - 1.5) * 0.08 },
        label: { show: false },
        interactive: true,
        symbol: ['none', 'arrow'],
        data: {
          type: 'platform2channel',
          seq: i + 1,
          vendorName: vendors[0]?.name || '-',
          channelName: channel.name,
          channelAccount: `channel_acc_${String(i + 1).padStart(3, '0')}`,
          linkNodeIp: '10.0.0.2',
          linkId: `LNK-CH-${channel.id}-${i}`,
          currentConcurrent: Math.floor(Math.random() * 100) + 50,
          status: status
        }
      });
    }
  }
  
  // 通道 → 通道商 (归属虚线)
  vendors.forEach(vendor => {
    if (channel) {
      edges.push({
        id: `edge_channel_to_vendor_${vendor.id}`,
        source: channel.id,
        target: vendor.id,
        lineStyle: { color: '#94a3b8', width: 2, type: 'dashed', curveness: 0.15 },
        label: { show: false },
        interactive: false,
        symbol: ['none', 'none'],
        data: null
      });
    }
  });
  
  const categories = [
    { name: '客户', itemStyle: { color: '#3b82f6' } },
    { name: '发送账号', itemStyle: { color: '#10b981' } },
    { name: '平台', itemStyle: { color: '#f59e0b' } },
    { name: '通道', itemStyle: { color: '#a855f7' } },
    { name: '通道商', itemStyle: { color: '#e879f9' } }
  ];
  
  const option = {
    title: { show: false },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (params.dataType === 'edge') {
          const edgeData = params.data;
          if (edgeData) {
            if (edgeData.type === 'account2platform') {
              const statusText = edgeData.status === 'normal' ? '正常' : '异常';
              return `🔗 账号→平台链接 #${edgeData.seq}<br/>发送账号: ${edgeData.senderAccountName}<br/>状态: ${statusText}<br/>并发: ${edgeData.currentConcurrent}<br/>点击查看详情`;
            } else if (edgeData.type === 'platform2channel') {
              const statusText = edgeData.status === 'normal' ? '正常' : '异常';
              return `🔗 平台→通道链接 #${edgeData.seq}<br/>通道: ${edgeData.channelName}<br/>状态: ${statusText}<br/>并发: ${edgeData.currentConcurrent}<br/>点击查看详情`;
            }
          }
          if (params.data.lineStyle?.type === 'dashed') return '归属关系（虚线）';
          return `链接 (${params.data.lineStyle?.color === '#2ecc71' ? '正常' : '异常'})`;
        } else {
          return `节点: ${params.name}`;
        }
      },
      backgroundColor: 'rgba(15,23,42,0.85)',
      borderColor: '#334155',
      textStyle: { color: '#f1f5f9', fontSize: 12 }
    },
    series: [{
      type: 'graph',
      layout: 'none',
      roam: true,
      draggable: false,
      data: nodes,
      links: edges,
      categories: categories,
      edgeSymbol: ['none', 'arrow'],
      edgeSymbolSize: [0, 8],
      label: { show: true, position: 'bottom', fontSize: 10, offset: [0, 6], formatter: (params) => params.name },
      emphasis: { focus: 'adjacency', lineStyle: { width: 4, shadowBlur: 8 } },
      lineStyle: { opacity: 0.9 },
      itemStyle: { borderWidth: 1 },
      select: { disabled: false },
      roamZoom: true,
      roamPan: true
    }],
    backgroundColor: '#ffffff',
    toolbox: {
      show: true,
      feature: { saveAsImage: { title: '保存拓扑图' }, restore: { title: '重置视图' } },
      right: 20,
      top: 10
    }
  };
  
  channelTopologyChart.setOption(option);
  
  // 点击事件处理
  channelTopologyChart.off('click');
  channelTopologyChart.on('click', (params) => {
    if (params.dataType === 'edge') {
      const edgeInfo = params.data;
      if (edgeInfo && edgeInfo.data && (edgeInfo.data.type === 'account2platform' || edgeInfo.data.type === 'platform2channel')) {
        showChannelDetail(edgeInfo.data);
      } else {
        hideChannelDetail();
      }
    } else {
      hideChannelDetail();
    }
  });
}

// 通道连接详情面板
function showChannelDetail(linkData) {
  const detailPanel = document.getElementById('channelDetailPanel');
  const detailContent = document.getElementById('channelDetailContent');
  if (!detailPanel || !detailContent || !linkData) return;
  
  let html = '';
  if (linkData.type === 'account2platform') {
    const statusText = linkData.status === 'normal' ? '正常 ✓' : '异常 ✗';
    const statusClass = linkData.status === 'normal' ? 'status-normal' : 'status-error';
    html = `
      <div class="detail-row"><div class="detail-label">客户</div><div class="detail-value">${linkData.customerName}</div></div>
      <div class="detail-row"><div class="detail-label">发送账号</div><div class="detail-value">${linkData.senderAccountName}</div></div>
      <div class="detail-row"><div class="detail-label">客户IP</div><div class="detail-value">${linkData.clientIp}</div></div>
      <div class="detail-row"><div class="detail-label">链接节点IP</div><div class="detail-value">${linkData.linkNodeIp}</div></div>
      <div class="detail-row"><div class="detail-label">链接ID</div><div class="detail-value">${linkData.linkId}</div></div>
      <div class="detail-row"><div class="detail-label">当前并发</div><div class="detail-value">${linkData.currentConcurrent}</div></div>
      <div class="detail-row"><div class="detail-label">链接状态</div><div class="detail-value"><span class="status-badge ${statusClass}">${statusText}</span></div></div>
      <div class="detail-row"><div class="detail-label">链路序号</div><div class="detail-value">第 ${linkData.seq} 条连接</div></div>
    `;
  } else if (linkData.type === 'platform2channel') {
    const statusText = linkData.status === 'normal' ? '正常 ✓' : '异常 ✗';
    const statusClass = linkData.status === 'normal' ? 'status-normal' : 'status-error';
    html = `
      <div class="detail-row"><div class="detail-label">通道商</div><div class="detail-value">${linkData.vendorName || '-'}</div></div>
      <div class="detail-row"><div class="detail-label">通道名称</div><div class="detail-value">${linkData.channelName}</div></div>
      <div class="detail-row"><div class="detail-label">通道账号</div><div class="detail-value">${linkData.channelAccount}</div></div>
      <div class="detail-row"><div class="detail-label">链接节点IP</div><div class="detail-value">${linkData.linkNodeIp}</div></div>
      <div class="detail-row"><div class="detail-label">链接ID</div><div class="detail-value">${linkData.linkId}</div></div>
      <div class="detail-row"><div class="detail-label">当前并发</div><div class="detail-value">${linkData.currentConcurrent}</div></div>
      <div class="detail-row"><div class="detail-label">链接状态</div><div class="detail-value"><span class="status-badge ${statusClass}">${statusText}</span></div></div>
      <div class="detail-row"><div class="detail-label">链路序号</div><div class="detail-value">第 ${linkData.seq} 条连接</div></div>
    `;
  } else {
    html = `<div style="padding:12px;text-align:center;">无法获取链接详情</div>`;
  }
  
  detailContent.innerHTML = html;
  detailPanel.classList.add('show');
}

function hideChannelDetail() {
  const detailPanel = document.getElementById('channelDetailPanel');
  if (detailPanel) {
    detailPanel.classList.remove('show');
  }
}

// ==================== 页面初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
  initTabSwitch();
  initQPSChart();
  initLatencyChart();
  renderAllErrorCharts(currentErrorRole);
  initRealtimeUpdate();
  renderLongLinkContent();
  initCustomerAnalysisCharts();
  initTopologyChart();
  initChannelAnalysisCharts();
  
  window.addEventListener('resize', handleErrorResize);
  window.addEventListener('resize', handleChartResize);
  window.addEventListener('resize', handleCustomerChartsResize);
  
  window.addEventListener('resize', function() {
    if (topologyChart && !topologyChart.isDisposed) topologyChart.resize();
    if (channelTopologyChart && !channelTopologyChart.isDisposed) channelTopologyChart.resize();
    if (channelAccountQpsPieChart && !channelAccountQpsPieChart.isDisposed) channelAccountQpsPieChart.resize();
    if (channelErrorChart && !channelErrorChart.isDisposed) channelErrorChart.resize();
    if (channelQueueBacklogBarChart && !channelQueueBacklogBarChart.isDisposed) channelQueueBacklogBarChart.resize();
    if (channelSendQpsChart && !channelSendQpsChart.isDisposed) channelSendQpsChart.resize();
    if (channelReceiptQpsChart && !channelReceiptQpsChart.isDisposed) channelReceiptQpsChart.resize();
  });
});