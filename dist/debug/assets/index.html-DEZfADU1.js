import { c as createMemo, t as template, s as setAttribute, i as insert, a as createRenderEffect, u as useTheme, g as createSignal, o as onMount, l as createEffect, f as createComponent, T as ThemeSwitch, S as Show, F as For, e as className, B as Button, r as render, k as ThemeProvider } from "./IconSetup-7JOCPL7z.js";
import { i as initStorage, g as getStorageSnapshot, o as onStorageChange } from "./storage-BtiExJa0.js";
import "./messages-DZkklMRP.js";
var _tmpl$$1 = /* @__PURE__ */ template(`<div class=circular-progress aria-valuemin=0 aria-valuemax=100 role=progressbar><svg><circle class=progress-bg></circle><circle class=progress-fill></circle><text x=50% y=50% text-anchor=middle dy=.3em class=progress-text>%`);
const CircularProgress = (props) => {
  const size = () => props.size || 120;
  const strokeWidth = () => props.strokeWidth || 8;
  const color = () => props.color || "var(--primary-color)";
  const percentage = () => props.percentage;
  const radius = createMemo(() => (size() - strokeWidth()) / 2);
  const circumference = createMemo(() => radius() * 2 * Math.PI);
  const dash = createMemo(() => percentage() * circumference() / 100);
  return (() => {
    var _el$ = _tmpl$$1(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling, _el$6 = _el$5.firstChild;
    setAttribute(_el$2, "viewBox", `0 0 ${size} ${size}`);
    insert(_el$5, percentage, _el$6);
    createRenderEffect((_p$) => {
      var _v$ = percentage(), _v$2 = props.label || "Usage progress", _v$3 = size(), _v$4 = size(), _v$5 = size() / 2, _v$6 = size() / 2, _v$7 = radius(), _v$8 = strokeWidth(), _v$9 = size() / 2, _v$10 = size() / 2, _v$11 = radius(), _v$12 = strokeWidth(), _v$13 = `${circumference()}`, _v$14 = `${circumference() - dash()}`, _v$15 = `rotate(-90 ${size() / 2} ${size() / 2})`, _v$16 = color();
      _v$ !== _p$.e && setAttribute(_el$, "aria-valuenow", _p$.e = _v$);
      _v$2 !== _p$.t && setAttribute(_el$, "aria-label", _p$.t = _v$2);
      _v$3 !== _p$.a && setAttribute(_el$2, "width", _p$.a = _v$3);
      _v$4 !== _p$.o && setAttribute(_el$2, "height", _p$.o = _v$4);
      _v$5 !== _p$.i && setAttribute(_el$3, "cx", _p$.i = _v$5);
      _v$6 !== _p$.n && setAttribute(_el$3, "cy", _p$.n = _v$6);
      _v$7 !== _p$.s && setAttribute(_el$3, "r", _p$.s = _v$7);
      _v$8 !== _p$.h && setAttribute(_el$3, "stroke-width", _p$.h = _v$8);
      _v$9 !== _p$.r && setAttribute(_el$4, "cx", _p$.r = _v$9);
      _v$10 !== _p$.d && setAttribute(_el$4, "cy", _p$.d = _v$10);
      _v$11 !== _p$.l && setAttribute(_el$4, "r", _p$.l = _v$11);
      _v$12 !== _p$.u && setAttribute(_el$4, "stroke-width", _p$.u = _v$12);
      _v$13 !== _p$.c && setAttribute(_el$4, "stroke-dasharray", _p$.c = _v$13);
      _v$14 !== _p$.w && setAttribute(_el$4, "stroke-dashoffset", _p$.w = _v$14);
      _v$15 !== _p$.m && setAttribute(_el$4, "transform", _p$.m = _v$15);
      _v$16 !== _p$.f && ((_p$.f = _v$16) != null ? _el$4.style.setProperty("stroke", _v$16) : _el$4.style.removeProperty("stroke"));
      return _p$;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0,
      n: void 0,
      s: void 0,
      h: void 0,
      r: void 0,
      d: void 0,
      l: void 0,
      u: void 0,
      c: void 0,
      w: void 0,
      m: void 0,
      f: void 0
    });
    return _el$;
  })();
};
var _tmpl$ = /* @__PURE__ */ template(`<ul class=platform-list role=list>`), _tmpl$2 = /* @__PURE__ */ template(`<div><header class=popup-header><div class=header-content><img alt=Growthackr class=app-icon><div class=title-container><h1>Growthackr</h1><p class=tagline>Take control of your time</p></div></div></header><main class=popup-content><section class=usage-overview aria-labelledby=usage-overview-title><h2 id=usage-overview-title class=section-title>Today's Usage</h2><div class=usage-summary><div class=time-stats><div class=time-stat><span class=stat-label>Remaining</span><span class=stat-value>h <!>m</span></div><div class=time-stat><span class=stat-label>Status</span><span></span></div></div></div></section><section class=platforms-overview aria-labelledby=platforms-title><h2 id=platforms-title class=section-title>Your Platforms</h2></section></main><footer class=popup-footer>`), _tmpl$3 = /* @__PURE__ */ template(`<div class=loading-indicator aria-live=polite>Loading platforms...`), _tmpl$4 = /* @__PURE__ */ template(`<p class=empty-message>No platforms configured yet.`), _tmpl$5 = /* @__PURE__ */ template(`<li class=platform-item role=listitem><div class=platform-icon><i></i></div><div class=platform-details><div class=platform-header><span class=platform-name></span><span class=platform-time> / <!>h <!>m</span></div><div class=progress-container aria-hidden=true><div></div></div><span class=sr-only> usage: <!>% of daily limit`);
const UsageTracker = () => {
  const {
    isDarkMode
  } = useTheme();
  const [overallPercentage, setOverallPercentage] = createSignal(0);
  const [remainingTime, setRemainingTime] = createSignal({
    hours: 0,
    minutes: 0
  });
  const [platforms, setPlatforms] = createSignal([]);
  const [timeSpent, setTimeSpent] = createSignal({});
  const [isLoading, setIsLoading] = createSignal(true);
  onMount(async () => {
    await initStorage();
    const snapshot = getStorageSnapshot();
    setPlatforms(snapshot.platforms);
    setTimeSpent(snapshot.timeSpent);
    setIsLoading(false);
    onStorageChange((update) => {
      setPlatforms(update.platforms);
      setTimeSpent(update.timeSpent);
    });
  });
  const todayUsage = createMemo(() => {
    const ts = timeSpent();
    const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA");
    return ts[today] || {};
  });
  const overallStats = createMemo(() => {
    const today = todayUsage();
    const platformsList = platforms();
    let totalSeconds = 0;
    let totalLimit = 0;
    platformsList.forEach((platform) => {
      const seconds = today[platform.url.toLowerCase()] || 0;
      totalSeconds += seconds;
      const limitInSeconds = platform.timeLimit.hours * 3600 + platform.timeLimit.minutes * 60;
      totalLimit += limitInSeconds;
    });
    const percentage = totalLimit > 0 ? Math.min(Math.round(totalSeconds / totalLimit * 100), 100) : 0;
    const remaining = Math.max(totalLimit - totalSeconds, 0);
    return {
      percentage,
      remainingHours: Math.floor(remaining / 3600),
      remainingMinutes: Math.floor(remaining % 3600 / 60)
    };
  });
  createEffect(() => {
    if (isLoading()) return;
    const stats = overallStats();
    setOverallPercentage(stats.percentage);
    setRemainingTime({
      hours: stats.remainingHours,
      minutes: stats.remainingMinutes
    });
  });
  const getPlatformPercentage = (platform) => {
    const usage = todayUsage();
    const seconds = usage[platform.url.toLowerCase()] || 0;
    const limitInSeconds = platform.timeLimit.hours * 60 * 60 + platform.timeLimit.minutes * 60;
    if (limitInSeconds === 0) return 0;
    return Math.min(Math.round(seconds / limitInSeconds * 100), 100);
  };
  const formatTime = (seconds) => {
    if (!seconds) return "0m";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };
  return (() => {
    var _el$ = _tmpl$2(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$2.nextSibling, _el$6 = _el$5.firstChild, _el$7 = _el$6.firstChild, _el$8 = _el$7.nextSibling, _el$9 = _el$8.firstChild, _el$10 = _el$9.firstChild, _el$11 = _el$10.firstChild, _el$12 = _el$11.nextSibling, _el$13 = _el$12.firstChild, _el$15 = _el$13.nextSibling;
    _el$15.nextSibling;
    var _el$16 = _el$10.nextSibling, _el$17 = _el$16.firstChild, _el$18 = _el$17.nextSibling, _el$19 = _el$6.nextSibling;
    _el$19.firstChild;
    var _el$22 = _el$5.nextSibling;
    _el$4.addEventListener("error", (e) => {
      e.currentTarget.src = "/placeholder.svg?height=34&width=34";
    });
    insert(_el$2, createComponent(ThemeSwitch, {}), null);
    insert(_el$8, createComponent(CircularProgress, {
      get percentage() {
        return overallPercentage();
      },
      size: 140,
      label: "Overall usage percentage"
    }), _el$9);
    insert(_el$12, () => remainingTime().hours, _el$13);
    insert(_el$12, () => remainingTime().minutes, _el$15);
    insert(_el$18, (() => {
      var _c$ = createMemo(() => overallPercentage() < 50);
      return () => _c$() ? "Good" : overallPercentage() < 80 ? "Moderate" : "High";
    })());
    insert(_el$19, createComponent(Show, {
      get when() {
        return !isLoading();
      },
      get fallback() {
        return _tmpl$3();
      },
      get children() {
        return createComponent(Show, {
          get when() {
            return platforms().length > 0;
          },
          get fallback() {
            return _tmpl$4();
          },
          get children() {
            var _el$21 = _tmpl$();
            insert(_el$21, createComponent(For, {
              get each() {
                return platforms();
              },
              children: (platform) => {
                const percentage = createMemo(() => getPlatformPercentage(platform));
                const seconds = createMemo(() => todayUsage()[platform.url.toLowerCase()] || 0);
                return (() => {
                  var _el$25 = _tmpl$5(), _el$26 = _el$25.firstChild, _el$27 = _el$26.firstChild, _el$28 = _el$26.nextSibling, _el$29 = _el$28.firstChild, _el$30 = _el$29.firstChild, _el$31 = _el$30.nextSibling, _el$32 = _el$31.firstChild, _el$35 = _el$32.nextSibling, _el$33 = _el$35.nextSibling, _el$36 = _el$33.nextSibling;
                  _el$36.nextSibling;
                  var _el$37 = _el$29.nextSibling, _el$38 = _el$37.firstChild, _el$39 = _el$37.nextSibling, _el$40 = _el$39.firstChild, _el$42 = _el$40.nextSibling;
                  _el$42.nextSibling;
                  insert(_el$30, () => platform.name);
                  insert(_el$31, () => formatTime(seconds()), _el$32);
                  insert(_el$31, () => platform.timeLimit.hours, _el$35);
                  insert(_el$31, () => platform.timeLimit.minutes, _el$36);
                  insert(_el$39, () => platform.name, _el$40);
                  insert(_el$39, percentage, _el$42);
                  createRenderEffect((_p$) => {
                    var _v$4 = `${platform.isCustom ? "fas fa-globe" : "fab " + platform.icon}`, _v$5 = `progress-bar ${percentage() < 50 ? "good" : percentage() < 80 ? "warning" : "danger"}`, _v$6 = `${percentage()}%`;
                    _v$4 !== _p$.e && className(_el$27, _p$.e = _v$4);
                    _v$5 !== _p$.t && className(_el$38, _p$.t = _v$5);
                    _v$6 !== _p$.a && ((_p$.a = _v$6) != null ? _el$38.style.setProperty("width", _v$6) : _el$38.style.removeProperty("width"));
                    return _p$;
                  }, {
                    e: void 0,
                    t: void 0,
                    a: void 0
                  });
                  return _el$25;
                })();
              }
            }));
            return _el$21;
          }
        });
      }
    }), null);
    insert(_el$22, createComponent(Button, {
      variant: "secondary",
      "class": "open-options-button",
      onClick: () => chrome.runtime.openOptionsPage(),
      "aria-label": "Open advanced settings page",
      children: "Advanced Settings"
    }));
    createRenderEffect((_p$) => {
      var _v$ = `app ${isDarkMode() ? "dark" : "light"}`, _v$2 = chrome.runtime.getURL("/icons/34x34.png") || "/placeholder.svg", _v$3 = `stat-status ${overallPercentage() < 50 ? "good" : overallPercentage() < 80 ? "warning" : "danger"}`;
      _v$ !== _p$.e && className(_el$, _p$.e = _v$);
      _v$2 !== _p$.t && setAttribute(_el$4, "src", _p$.t = _v$2);
      _v$3 !== _p$.a && className(_el$18, _p$.a = _v$3);
      return _p$;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    });
    return _el$;
  })();
};
const App = () => {
  return createComponent(ThemeProvider, {
    get children() {
      return createComponent(UsageTracker, {});
    }
  });
};
const root = document.getElementById("extension-container");
render(App, root);
//# sourceMappingURL=index.html-DEZfADU1.js.map
