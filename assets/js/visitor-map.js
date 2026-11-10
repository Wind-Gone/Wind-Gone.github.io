/* ==========================================================================
   Wind-Gone · 全球访客来源地图
   - 归属地：ip.zxinc.org（中文）+ ipwho.is（英文国家名，用于世界地图着色）
   - 存储：ntfy.sh 公共频道（免费 / 无需账号 / CORS 放行 / 消息缓存 12 小时）
   - 渲染：ECharts + 本地世界地图 GeoJSON（assets/data/world.json，零外部依赖）
   仅采集「国家 / 省 / 市」，不保存完整 IP。
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------- 配置 */

  var CONFIG = {
    topic: "windgone-visitors-2f8a1c", /* 换掉这里 = 换一个新的统计频道 */
    window: "12h", /* ntfy 免费缓存窗口 */
    publish: true /* 是否上报本次访问 */
  };

  var NTFY = "https://ntfy.sh/";
  var GEO_CN = "https://ip.zxinc.org/api.php?type=json";
  var GEO_EN = "https://ipwho.is/";
  var DEFAULT_MAP_SRC = "/assets/data/world.json";
  var ECHARTS_CDNS = [
    "https://registry.npmmirror.com/echarts/5.5.1/files/dist/echarts.min.js",
    "https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js",
    "https://unpkg.com/echarts@5.5.1/dist/echarts.min.js"
  ];

  /* 中文国家名 → 英文（世界地图 feature 名） */
  var CN2EN = {
    中国: "China",
    美国: "United States",
    日本: "Japan",
    韩国: "Korea",
    朝鲜: "Dem. Rep. Korea",
    新加坡: "Singapore",
    英国: "United Kingdom",
    德国: "Germany",
    法国: "France",
    加拿大: "Canada",
    澳大利亚: "Australia",
    新西兰: "New Zealand",
    荷兰: "Netherlands",
    瑞士: "Switzerland",
    瑞典: "Sweden",
    挪威: "Norway",
    丹麦: "Denmark",
    芬兰: "Finland",
    意大利: "Italy",
    西班牙: "Spain",
    葡萄牙: "Portugal",
    爱尔兰: "Ireland",
    奥地利: "Austria",
    比利时: "Belgium",
    波兰: "Poland",
    俄罗斯: "Russia",
    印度: "India",
    巴西: "Brazil",
    墨西哥: "Mexico",
    阿根廷: "Argentina",
    南非: "South Africa",
    越南: "Vietnam",
    泰国: "Thailand",
    马来西亚: "Malaysia",
    印度尼西亚: "Indonesia",
    菲律宾: "Philippines",
    阿联酋: "United Arab Emirates",
    沙特阿拉伯: "Saudi Arabia",
    以色列: "Israel",
    土耳其: "Turkey",
    巴基斯坦: "Pakistan",
    中国香港: "China",
    中国澳门: "China",
    中国台湾: "China",
    香港: "China",
    澳门: "China",
    台湾: "China"
  };

  /* 英文变体 → 世界地图 feature 名 */
  var EN_ALIAS = {
    "south korea": "Korea",
    "republic of korea": "Korea",
    "united states of america": "United States",
    usa: "United States",
    us: "United States",
    uk: "United Kingdom",
    "great britain": "United Kingdom",
    "russian federation": "Russia",
    "viet nam": "Vietnam",
    "hong kong": "China",
    macau: "China",
    macao: "China",
    taiwan: "China",
    "czech republic": "Czech Rep.",
    "czechia": "Czech Rep.",
    "united arab emirates": "United Arab Emirates",
    "saudi arabia": "Saudi Arabia",
    "south africa": "South Africa",
    "new zealand": "New Zealand"
  };

  /* 英文省名 → 中文省名（国家接口失败时的兜底） */
  var EN2CN_PROVINCE = {
    beijing: "北京市",
    tianjin: "天津市",
    shanghai: "上海市",
    chongqing: "重庆市",
    hebei: "河北省",
    shanxi: "山西省",
    liaoning: "辽宁省",
    jilin: "吉林省",
    heilongjiang: "黑龙江省",
    jiangsu: "江苏省",
    zhejiang: "浙江省",
    anhui: "安徽省",
    fujian: "福建省",
    jiangxi: "江西省",
    shandong: "山东省",
    henan: "河南省",
    hubei: "湖北省",
    hunan: "湖南省",
    guangdong: "广东省",
    hainan: "海南省",
    sichuan: "四川省",
    guizhou: "贵州省",
    yunnan: "云南省",
    shaanxi: "陕西省",
    gansu: "甘肃省",
    qinghai: "青海省",
    taiwan: "台湾省",
    "inner mongolia": "内蒙古自治区",
    guangxi: "广西壮族自治区",
    tibet: "西藏自治区",
    xizang: "西藏自治区",
    ningxia: "宁夏回族自治区",
    xinjiang: "新疆维吾尔自治区",
    "hong kong": "香港特别行政区",
    macau: "澳门特别行政区",
    macao: "澳门特别行政区"
  };

  var I18N = {
    en: {
      meta: function (total, countries) {
        return (
          "last 12 hours · " + total + " visits · " + countries + " countries / regions"
        );
      },
      empty: "No visitor data yet.",
      loading: "loading…",
      unit: " visits"
    },
    zh: {
      meta: function (total, countries) {
        return (
          "近 12 小时 · " + total + " 次访问 · " + countries + " 个国家 / 地区"
        );
      },
      empty: "暂时还没有访客数据。",
      loading: "加载中…",
      unit: " 次"
    }
  };

  /* ---------------------------------------------------------------- 工具 */

  function fetchWithTimeout(url, ms, opts) {
    var controller = new AbortController();
    var timer = setTimeout(function () {
      controller.abort();
    }, ms || 6000);

    var options = opts || {};
    options.signal = controller.signal;

    return fetch(url, options).then(
      function (res) {
        clearTimeout(timer);
        return res;
      },
      function (err) {
        clearTimeout(timer);
        throw err;
      }
    );
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function loadEcharts() {
    if (window.echarts) return Promise.resolve(window.echarts);

    return ECHARTS_CDNS.reduce(function (chain, url) {
      return chain.catch(function () {
        return loadScript(url);
      });
    }, Promise.reject()).then(function () {
      return window.echarts;
    });
  }

  function normalizeCountry(enName, zhName) {
    var en = String(enName || "").trim();
    if (en) {
      var alias = EN_ALIAS[en.toLowerCase()];
      if (alias) return alias;
    }
    var zh = String(zhName || "").trim();
    if (zh && CN2EN[zh]) return CN2EN[zh];
    return en || zh || "";
  }

  function normalizeProvinceFromEN(region) {
    if (!region) return "";
    var key = String(region)
      .toLowerCase()
      .replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔|sheng|shi|zizhiqu|province|autonomous region|region/g, "")
      .replace(/[^a-z\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    return EN2CN_PROVINCE[key] || "";
  }

  /* ------------------------------------------------------------ 归属地 */

  function getCN() {
    return fetchWithTimeout(GEO_CN, 6000)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        var info = (data && data.data) || {};
        var parts = String(info.country || info.location || "")
          .split(/[\u2013\u2014-]/)
          .map(function (s) {
            return s.trim();
          })
          .filter(Boolean);
        if (!parts.length) throw new Error("no geo");
        return {
          zh: parts[0] || "",
          province: parts[1] || "",
          city: parts[2] || ""
        };
      })
      .catch(function () {
        return null;
      });
  }

  function getEN() {
    return fetchWithTimeout(GEO_EN, 6000)
      .then(function (res) {
        return res.json();
      })
      .then(function (g) {
        return {
          country: g.country || "",
          code: String(g.country_code || "").toUpperCase(),
          region: g.region || "",
          city: g.city || ""
        };
      })
      .catch(function () {
        return null;
      });
  }

  function getGeo() {
    return Promise.all([getCN(), getEN()]).then(function (res) {
      var cn = res[0];
      var en = res[1];
      if (!cn && !en) return null;

      var zh = (cn && cn.zh) || "";
      var isCN = /中国/.test(zh) || (en && en.code === "CN");

      return {
        zh: zh,
        en: (en && en.country) || "",
        cc: (en && en.code) || "",
        province: isCN
          ? (cn && cn.province) || normalizeProvinceFromEN(en && en.region)
          : "",
        city: (cn && cn.city) || (en && en.city) || ""
      };
    });
  }

  /* -------------------------------------------------------------- 上报 */

  function publishHit(geo) {
    if (!CONFIG.publish || !geo) return;

    var country = normalizeCountry(geo.en, geo.zh);
    if (!country) return;

    try {
      if (sessionStorage.getItem("wg_visitor_hit")) return;
      sessionStorage.setItem("wg_visitor_hit", "1");
    } catch (e) {
      /* 隐私模式下 sessionStorage 不可用，照常上报 */
    }

    var payload = JSON.stringify({
      e: country,
      z: geo.zh || "",
      p: geo.province || "",
      c: geo.city || ""
    });

    fetchWithTimeout(NTFY + CONFIG.topic, 8000, {
      method: "POST",
      body: payload,
      keepalive: true
    }).catch(function () {
      /* 静默失败 */
    });
  }

  /* -------------------------------------------------------------- 拉取 */

  function loadHits() {
    return fetchWithTimeout(
      NTFY + CONFIG.topic + "/json?poll=1&since=" + CONFIG.window,
      8000
    )
      .then(function (res) {
        return res.text();
      })
      .then(function (text) {
        var hits = [];
        text.split("\n").forEach(function (line) {
          line = line.trim();
          if (!line) return;
          try {
            var item = JSON.parse(line);
            if (item.event !== "message" || !item.message) return;
            var d = JSON.parse(item.message);
            hits.push({
              e: d.e || "",
              z: d.z || d.n || "",
              p: d.p || "",
              c: d.c || ""
            });
          } catch (e) {
            /* 忽略脏数据 */
          }
        });
        return hits;
      });
  }

  function aggregate(hits) {
    var countries = {};
    var cities = {};

    hits.forEach(function (h) {
      var country = normalizeCountry(h.e, h.z);
      if (country) countries[country] = (countries[country] || 0) + 1;

      var city = h.c || h.p;
      if (city) cities[city] = (cities[city] || 0) + 1;
    });

    return { total: hits.length, countries: countries, cities: cities };
  }

  /* -------------------------------------------------------------- 渲染 */

  function isDark() {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }

  function renderChart(el, stats, mapSrc, t) {
    return Promise.all([
      loadEcharts(),
      fetchWithTimeout(mapSrc, 12000).then(function (res) {
        return res.json();
      })
    ]).then(function (results) {
      var echarts = results[0];
      var geoJson = results[1];

      if (!echarts.getMap("wg-world")) {
        echarts.registerMap("wg-world", geoJson);
      }

      var data = Object.keys(stats.countries).map(function (name) {
        return { name: name, value: stats.countries[name] };
      });

      var max = data.reduce(function (m, d) {
        return Math.max(m, d.value);
      }, 1);

      var dark = isDark();
      var chart = echarts.init(el, null, { renderer: "canvas" });

      chart.setOption({
        backgroundColor: "transparent",
        tooltip: {
          trigger: "item",
          backgroundColor: dark ? "rgba(40,42,46,.95)" : "rgba(255,255,255,.96)",
          borderWidth: 0,
          textStyle: { color: dark ? "#eee" : "#333", fontSize: 12 },
          formatter: function (p) {
            return p.name + "：" + (p.value || 0) + t.unit;
          }
        },
        visualMap: {
          min: 0,
          max: max,
          left: 6,
          bottom: 6,
          itemWidth: 10,
          itemHeight: 50,
          calculable: false,
          text: [max + "", "0"],
          textStyle: {
            color: dark ? "rgba(255,255,255,.55)" : "rgba(0,0,0,.45)",
            fontSize: 10
          },
          inRange: {
            color: dark
              ? ["#2f3b45", "#3d7f92", "#52adc8", "#9b8bff"]
              : ["#eaf3f7", "#a9d8e6", "#52adc8", "#7b68ee"]
          }
        },
        series: [
          {
            type: "map",
            map: "wg-world",
            roam: false,
            zoom: 1.15,
            center: [12, 22],
            label: { show: false },
            itemStyle: {
              areaColor: dark ? "#333a41" : "#f2f6f8",
              borderColor: dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.09)",
              borderWidth: 0.5
            },
            emphasis: {
              label: { show: true, fontSize: 10, color: dark ? "#fff" : "#222" },
              itemStyle: { areaColor: "#7b68ee" }
            },
            select: { disabled: true },
            data: data
          }
        ]
      });

      window.addEventListener(
        "resize",
        function () {
          chart.resize();
        },
        { passive: true }
      );

      /* 深浅色切换时重绘配色 */
      if (window.MutationObserver) {
        var observer = new MutationObserver(function () {
          var nowDark = isDark();
          if (nowDark === dark) return;
          observer.disconnect();
          chart.dispose();
          renderChart(el, stats, mapSrc, t);
        });
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["data-theme"]
        });
      }

      return chart;
    });
  }

  function renderList(listEl, stats) {
    var entries = Object.keys(stats.cities)
      .map(function (name) {
        return { name: name, value: stats.cities[name] };
      })
      .sort(function (a, b) {
        return b.value - a.value;
      })
      .slice(0, 10);

    listEl.innerHTML = entries
      .map(function (e) {
        return "<li>" + e.name + "<b>" + e.value + "</b></li>";
      })
      .join("");
  }

  /* ---------------------------------------------------------------- 主流程 */

  function init() {
    var box = document.getElementById("wg-visitor-map");
    var lang =
      (box && box.getAttribute("data-lang")) ||
      document.documentElement.lang ||
      "en";
    var t = I18N[lang.indexOf("zh") === 0 ? "zh" : "en"];

    /* 上报：任意页面都记录，每个会话只记一次 */
    if (CONFIG.publish) {
      getGeo()
        .then(publishHit)
        .catch(function () {});
    }

    if (!box) return;

    var mapSrc = box.getAttribute("data-map-src") || DEFAULT_MAP_SRC;
    var metaEl = box.querySelector('[data-role="meta"]');
    var chartEl = box.querySelector('[data-role="chart"]');
    var listEl = box.querySelector('[data-role="list"]');
    var noteEl = box.querySelector('[data-role="note"]');

    if (noteEl) noteEl.textContent = t.note;
    if (metaEl) metaEl.textContent = t.loading;

    var started = false;

    function start() {
      if (started) return;
      started = true;

      loadHits()
        .then(function (hits) {
          var stats = aggregate(hits);
          var countryCount = Object.keys(stats.countries).length;

          if (metaEl) {
            metaEl.textContent = stats.total
              ? t.meta(stats.total, countryCount)
              : t.empty;
          }

          renderList(listEl, stats);

          if (stats.total && chartEl) {
            renderChart(chartEl, stats, mapSrc, t).catch(function () {
              chartEl.style.display = "none";
            });
          } else if (chartEl) {
            chartEl.style.display = "none";
          }
        })
        .catch(function () {
          if (metaEl) metaEl.textContent = t.empty;
          if (chartEl) chartEl.style.display = "none";
        });
    }

    /* 进入视口后再加载，避免拖慢首屏 */
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              start();
              io.disconnect();
            }
          });
        },
        { rootMargin: "200px" }
      );
      io.observe(box);
    } else {
      start();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
