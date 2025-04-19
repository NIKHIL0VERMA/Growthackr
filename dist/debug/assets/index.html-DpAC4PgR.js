import { t as template, i as insert, c as createMemo, a as createRenderEffect, s as setAttribute, b as spread, m as mergeProps, d as delegateEvents, e as className, f as createComponent, S as Show, F as For, g as createSignal, h as addEventListener, o as onMount, T as ThemeSwitch, B as Button, j as createResource, r as render, k as ThemeProvider, u as useTheme } from "./IconSetup-7JOCPL7z.js";
import { v as validateUrl, e as extractHostName, r as removeTLD } from "./utilities-C8WWmy9q.js";
import { M as MessageAction, c as colorLog, L as LogTypes } from "./messages-DZkklMRP.js";
var _tmpl$$5 = /* @__PURE__ */ template(`<div class=input-container><input>`), _tmpl$2$3 = /* @__PURE__ */ template(`<label class=input-label>`);
function Input(props) {
  return (() => {
    var _el$ = _tmpl$$5(), _el$2 = _el$.firstChild;
    insert(_el$, (() => {
      var _c$ = createMemo(() => !!props.label);
      return () => _c$() && (() => {
        var _el$3 = _tmpl$2$3();
        insert(_el$3, () => props.label);
        createRenderEffect((_p$) => {
          var _v$ = props.id, _v$2 = props.label;
          _v$ !== _p$.e && setAttribute(_el$3, "for", _p$.e = _v$);
          _v$2 !== _p$.t && setAttribute(_el$3, "aria-label", _p$.t = _v$2);
          return _p$;
        }, {
          e: void 0,
          t: void 0
        });
        return _el$3;
      })();
    })(), _el$2);
    spread(_el$2, mergeProps(props, {
      get ["class"]() {
        return `input-field ${props.class || ""}`;
      },
      get ["aria-required"]() {
        return props.required;
      },
      get ["aria-invalid"]() {
        return props["aria-invalid"] || false;
      }
    }), false);
    return _el$;
  })();
}
var _tmpl$$4 = /* @__PURE__ */ template(`<div class=platform-list role=group>`), _tmpl$2$2 = /* @__PURE__ */ template(`<div role=listbox>`), _tmpl$3$2 = /* @__PURE__ */ template(`<div class=platform-list-loading aria-live=polite><div class=loading-spinner aria-hidden=true></div><span>Loading platforms...`), _tmpl$4$1 = /* @__PURE__ */ template(`<div class=platform-list-empty aria-live=polite><p>`), _tmpl$5$1 = /* @__PURE__ */ template(`<div tabindex=0><div class=platform-item-content><div class=platform-icon-wrapper><i></i></div><div class=platform-details><span class=platform-name>`), _tmpl$6$1 = /* @__PURE__ */ template(`<span class=platform-time-limit>h <!>m`), _tmpl$7$1 = /* @__PURE__ */ template(`<div class=platform-actions><button class="action-button edit"><i class="fas fa-edit"></i></button><button class="action-button delete"><i class="fas fa-trash">`);
const PlatformList = (props) => {
  const variant = props.variant || "default";
  const showTimeLimit = props.showTimeLimit !== void 0 ? props.showTimeLimit : false;
  const showActions = props.showActions !== void 0 ? props.showActions : false;
  const maxHeight = props.maxHeight || "400px";
  const emptyMessage = props.emptyMessage || "No platforms available";
  return (() => {
    var _el$ = _tmpl$2$2();
    className(_el$, `platform-list-container ${variant}`);
    maxHeight != null ? _el$.style.setProperty("max-height", maxHeight) : _el$.style.removeProperty("max-height");
    setAttribute(_el$, "aria-multiselectable", variant !== "dashboard");
    insert(_el$, createComponent(Show, {
      get when() {
        return !props.loading;
      },
      get fallback() {
        return _tmpl$3$2();
      },
      get children() {
        return createComponent(Show, {
          get when() {
            return props.platforms && props.platforms.length > 0;
          },
          get fallback() {
            return (() => {
              var _el$4 = _tmpl$4$1(), _el$5 = _el$4.firstChild;
              insert(_el$5, emptyMessage);
              return _el$4;
            })();
          },
          get children() {
            var _el$2 = _tmpl$$4();
            insert(_el$2, createComponent(For, {
              get each() {
                return props.platforms;
              },
              children: (platform) => (() => {
                var _el$6 = _tmpl$5$1(), _el$7 = _el$6.firstChild, _el$8 = _el$7.firstChild, _el$9 = _el$8.firstChild, _el$10 = _el$8.nextSibling, _el$11 = _el$10.firstChild;
                _el$6.$$keydown = (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    props.onSelect(platform);
                  }
                };
                _el$6.$$click = () => props.onSelect(platform);
                setAttribute(_el$6, "role", variant !== "dashboard" ? "option" : void 0);
                insert(_el$11, () => platform.name);
                insert(_el$10, showTimeLimit && (() => {
                  var _el$12 = _tmpl$6$1(), _el$13 = _el$12.firstChild, _el$15 = _el$13.nextSibling;
                  _el$15.nextSibling;
                  insert(_el$12, () => platform.timeLimit.hours, _el$13);
                  insert(_el$12, () => platform.timeLimit.minutes, _el$15);
                  return _el$12;
                })(), null);
                insert(_el$6, showActions && (() => {
                  var _el$16 = _tmpl$7$1(), _el$17 = _el$16.firstChild, _el$18 = _el$17.nextSibling;
                  _el$17.$$click = (e) => {
                    e.stopPropagation();
                    props.onEdit && props.onEdit(platform);
                  };
                  _el$18.$$click = (e) => {
                    e.stopPropagation();
                    props.onDelete && props.onDelete(platform);
                  };
                  createRenderEffect((_p$) => {
                    var _v$4 = `Edit ${platform.name}`, _v$5 = `Delete ${platform.name}`;
                    _v$4 !== _p$.e && setAttribute(_el$17, "aria-label", _p$.e = _v$4);
                    _v$5 !== _p$.t && setAttribute(_el$18, "aria-label", _p$.t = _v$5);
                    return _p$;
                  }, {
                    e: void 0,
                    t: void 0
                  });
                  return _el$16;
                })(), null);
                createRenderEffect((_p$) => {
                  var _v$ = `platform-item ${variant} ${props.isSelected(platform) ? "selected" : ""}`, _v$2 = variant !== "dashboard" ? props.isSelected(platform) : void 0, _v$3 = `${platform.isCustom ? "fas fa-globe" : "fab " + platform.icon} platform-icon`;
                  _v$ !== _p$.e && className(_el$6, _p$.e = _v$);
                  _v$2 !== _p$.t && setAttribute(_el$6, "aria-selected", _p$.t = _v$2);
                  _v$3 !== _p$.a && className(_el$9, _p$.a = _v$3);
                  return _p$;
                }, {
                  e: void 0,
                  t: void 0,
                  a: void 0
                });
                return _el$6;
              })()
            }));
            return _el$2;
          }
        });
      }
    }));
    return _el$;
  })();
};
delegateEvents(["click", "keydown"]);
var _tmpl$$3 = /* @__PURE__ */ template(`<button>Get started<div class=GSBicon><svg height=24 width=24 viewBox="0 0 24 24"xmlns=http://www.w3.org/2000/svg><path d="M0 0h24v24H0z"fill=none></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"fill=currentColor>`);
const GetStartedButton = (props) => {
  const [isHovered, setIsHovered] = createSignal(false);
  return (() => {
    var _el$ = _tmpl$$3();
    _el$.addEventListener("mouseleave", () => setIsHovered(false));
    _el$.addEventListener("mouseenter", () => setIsHovered(true));
    addEventListener(_el$, "click", props.onClick, true);
    createRenderEffect(() => className(_el$, `cssbuttons-io-button ${isHovered() ? "hover" : ""}`));
    return _el$;
  })();
};
delegateEvents(["click"]);
const popularPlatforms = [
  { name: "Facebook", url: "facebook.com", icon: "fa-facebook", timeLimit: { hours: 0, minutes: 15 }, isCustom: false },
  { name: "YouTube", url: "youtube.com", icon: "fa-youtube", timeLimit: { hours: 0, minutes: 15 }, isCustom: false },
  { name: "Instagram", url: "instagram.com", icon: "fa-instagram", timeLimit: { hours: 0, minutes: 15 }, isCustom: false },
  { name: "X", url: "x.com", icon: "fa-square-x-twitter", timeLimit: { hours: 0, minutes: 15 }, isCustom: false },
  { name: "TikTok", url: "tiktok.com", timeLimit: { hours: 0, minutes: 15 }, icon: "fa-tiktok", isCustom: false },
  { name: "Snapchat", url: "snapchat.com", timeLimit: { hours: 0, minutes: 15 }, icon: "fa-snapchat", isCustom: false }
];
var _tmpl$$2 = /* @__PURE__ */ template(`<p class=error-message role=alert>`), _tmpl$2$1 = /* @__PURE__ */ template(`<div class="section platforms-section"><h3 class=section-title>Popular Platforms</h3><p class=section-description>Select the platforms you want to track:</p><div class=custom-url-section><h4 class=custom-url-title>Add Custom URL</h4><div class=input-group><button class=add-button aria-label="Add custom URL"><i class="fas fa-plus">`), _tmpl$3$1 = /* @__PURE__ */ template(`<ul class=selected-list>`), _tmpl$4 = /* @__PURE__ */ template(`<div class="section selection-section"><h3 class=section-title>Your Selection</h3><p class=section-description>Selected platforms:</p><div class=selected-container>`), _tmpl$5 = /* @__PURE__ */ template(`<div class="section goals-section"><h3 class=section-title>Set Your Goals</h3><p class=section-description>Define how much time you want to spend on each platform daily:</p><div class=goals-list>`), _tmpl$6 = /* @__PURE__ */ template(`<div class="section tips-section"><h3 class=section-title>Tips for Success</h3><ul class=tips-list><li><i class="fas fa-check-circle"></i><span>Start with realistic time limits you can achieve</span></li><li><i class="fas fa-check-circle"></i><span>Gradually reduce time limits as you adjust</span></li><li><i class="fas fa-check-circle"></i><span>Use the extension consistently for best results</span></li><li><i class="fas fa-check-circle"></i><span>Review your usage patterns weekly`), _tmpl$7 = /* @__PURE__ */ template(`<i class="fas fa-arrow-right">`), _tmpl$8 = /* @__PURE__ */ template(`<i class="fas fa-arrow-left">`), _tmpl$9 = /* @__PURE__ */ template(`<div class=page-container><header class=header><div class=header-content><img alt=Growthackr class=app-icon><h2 class=title>Growthackr Settings</h2></div><div class=theme-switch-wrapper></div></header><div class=content-container><div class=progress-bar-container><div class=progress-step><div>1</div><span class=step-label>Select Platforms</span></div><div class=progress-line></div><div class=progress-step><div>2</div><span class=step-label>Set Goals</span></div></div><div class=welcome-sections></div><div class=welcome-footer>`), _tmpl$10 = /* @__PURE__ */ template(`<div class=empty-selection><p>No platforms selected yet. Choose from popular platforms or add a custom URL.`), _tmpl$11 = /* @__PURE__ */ template(`<div class=platform-info><div class=platform-icon-small><i></i></div><span class=platform-name>`), _tmpl$12 = /* @__PURE__ */ template(`<div class=icon-container><button class="icon-button edit-button"><i class="fas fa-edit"></i></button><button class="icon-button delete-button"><i class="fas fa-trash">`), _tmpl$13 = /* @__PURE__ */ template(`<li class=selected-item>`), _tmpl$14 = /* @__PURE__ */ template(`<div class=edit-container><div class=edit-actions>`), _tmpl$15 = /* @__PURE__ */ template(`<div class=goal-item><div class=goal-platform-info><div class=platform-icon-small><i></i></div><span class=platform-name></span></div><div class=goal-time-inputs><div class=time-input-small><input type=number min=0 max=23 aria-label=Hours><span>h</span></div><div class=time-input-small><input type=number min=0 max=59 aria-label=Minutes><span>m`);
const DEFAULT_SETTINGS = {
  timeLimit: {
    hours: 0,
    minutes: 15
  }
};
function WelcomePage({
  onComplete
}) {
  const [selectedPlatforms, setSelectedPlatforms] = createSignal([]);
  const [customUrl, setCustomUrl] = createSignal("");
  const [error, setError] = createSignal("");
  const [editIndex, setEditIndex] = createSignal(-1);
  const [editUrl, setEditUrl] = createSignal("");
  const [step, setStep] = createSignal(1);
  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) => {
      if (prev.some((p) => p.url.toLowerCase() === platform.url.toLowerCase())) {
        return prev.filter((p) => p.url.toLowerCase() !== platform.url.toLowerCase());
      } else {
        return [...prev, platform];
      }
    });
  };
  const addCustomUrl = () => {
    if (!customUrl()) {
      setError("Please enter a URL.");
      animateError();
      return;
    }
    const url = customUrl();
    if (!validateUrl(url)) {
      setError("Please enter a valid URL.");
      animateError();
      return;
    }
    const hostname = extractHostName(url);
    if (selectedPlatforms().some((p) => p.url.toLowerCase() === hostname.toLowerCase())) {
      setError("This URL is already in your list.");
      animateError();
      return;
    }
    const display_name = removeTLD(hostname);
    setSelectedPlatforms((prev) => [...prev, {
      name: display_name,
      url: hostname,
      icon: "",
      timeLimit: DEFAULT_SETTINGS.timeLimit,
      isCustom: true
    }]);
    setCustomUrl("");
    setError("");
  };
  const animateError = () => {
    const inputElement = document.querySelector(".url-input");
    if (inputElement) {
      inputElement.classList.add("shake-animation");
      setTimeout(() => {
        inputElement.classList.remove("shake-animation");
      }, 500);
    }
  };
  const handleEdit = (platform, index) => {
    setEditIndex(index);
    setEditUrl(platform.url.toLowerCase());
  };
  const saveEdit = (index) => {
    if (validateUrl(editUrl())) {
      const updatedPlatforms = [...selectedPlatforms()];
      updatedPlatforms[index] = {
        ...updatedPlatforms[index],
        url: editUrl(),
        name: removeTLD(extractHostName(editUrl()))
      };
      setSelectedPlatforms(updatedPlatforms);
      setEditIndex(-1);
      setEditUrl("");
      setError("");
    } else {
      setError("Please enter a valid URL.");
      animateError();
    }
  };
  const deletePlatform = (index) => {
    setSelectedPlatforms((prev) => prev.filter((_, i) => i !== index));
  };
  const nextStep = () => {
    if (selectedPlatforms().length === 0) {
      setError("Please select at least one platform.");
      return;
    }
    setStep(2);
  };
  const handleComplete = () => {
    const button = document.querySelector(".get-started-button");
    if (button) {
      button.classList.add("pulse-animation");
      setTimeout(() => {
        onComplete(selectedPlatforms());
      }, 600);
    } else {
      onComplete(selectedPlatforms());
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addCustomUrl();
    }
  };
  onMount(() => {
    document.title = "Welcome to Growthackr";
  });
  return (() => {
    var _el$ = _tmpl$9(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$3.nextSibling, _el$6 = _el$2.nextSibling, _el$7 = _el$6.firstChild, _el$8 = _el$7.firstChild, _el$9 = _el$8.firstChild, _el$10 = _el$8.nextSibling, _el$11 = _el$10.nextSibling, _el$12 = _el$11.firstChild, _el$13 = _el$7.nextSibling, _el$32 = _el$13.nextSibling;
    insert(_el$5, createComponent(ThemeSwitch, {}));
    insert(_el$13, createComponent(Show, {
      get when() {
        return step() === 1;
      },
      get children() {
        return [(() => {
          var _el$14 = _tmpl$2$1(), _el$15 = _el$14.firstChild, _el$16 = _el$15.nextSibling, _el$17 = _el$16.nextSibling, _el$18 = _el$17.firstChild, _el$19 = _el$18.nextSibling, _el$20 = _el$19.firstChild;
          insert(_el$14, createComponent(PlatformList, {
            platforms: popularPlatforms,
            isSelected: (platform) => selectedPlatforms().some((p) => p.url.toLowerCase() === platform.url.toLowerCase()),
            onSelect: togglePlatform,
            maxHeight: "calc(70vh - 250px)"
          }), _el$17);
          insert(_el$19, createComponent(Input, {
            type: "text",
            placeholder: "Enter URL (e.g., example.com)",
            get value() {
              return customUrl();
            },
            onInput: (e) => setCustomUrl(e.target.value),
            onKeyPress: handleKeyPress,
            "class": "url-input",
            "aria-label": "Custom URL"
          }), _el$20);
          _el$20.$$click = addCustomUrl;
          insert(_el$17, createComponent(Show, {
            get when() {
              return error();
            },
            get children() {
              var _el$21 = _tmpl$$2();
              insert(_el$21, error);
              return _el$21;
            }
          }), null);
          return _el$14;
        })(), (() => {
          var _el$22 = _tmpl$4(), _el$23 = _el$22.firstChild, _el$24 = _el$23.nextSibling, _el$25 = _el$24.nextSibling;
          insert(_el$25, createComponent(Show, {
            get when() {
              return selectedPlatforms().length > 0;
            },
            get fallback() {
              return _tmpl$10();
            },
            get children() {
              var _el$26 = _tmpl$3$1();
              insert(_el$26, createComponent(For, {
                get each() {
                  return selectedPlatforms();
                },
                children: (platform, index) => (() => {
                  var _el$36 = _tmpl$13();
                  insert(_el$36, createComponent(Show, {
                    get when() {
                      return editIndex() !== index();
                    },
                    get fallback() {
                      return (() => {
                        var _el$44 = _tmpl$14(), _el$45 = _el$44.firstChild;
                        insert(_el$44, createComponent(Input, {
                          type: "text",
                          get value() {
                            return editUrl();
                          },
                          onInput: (e) => setEditUrl(e.target.value),
                          onKeyPress: handleKeyPress,
                          "class": "edit-input",
                          get ["aria-label"]() {
                            return `Edit URL for ${platform.name}`;
                          }
                        }), _el$45);
                        insert(_el$45, createComponent(Button, {
                          onClick: () => saveEdit(index()),
                          "class": "save-edit-button",
                          "aria-label": "Save changes",
                          children: "Save"
                        }), null);
                        insert(_el$45, createComponent(Button, {
                          onClick: () => setEditIndex(-1),
                          "class": "cancel-edit-button",
                          "aria-label": "Cancel editing",
                          children: "Cancel"
                        }), null);
                        return _el$44;
                      })();
                    },
                    get children() {
                      return [(() => {
                        var _el$37 = _tmpl$11(), _el$38 = _el$37.firstChild, _el$39 = _el$38.firstChild, _el$40 = _el$38.nextSibling;
                        insert(_el$40, () => platform.name);
                        createRenderEffect(() => className(_el$39, `${platform.isCustom ? "fas fa-globe" : "fab " + platform.icon}`));
                        return _el$37;
                      })(), (() => {
                        var _el$41 = _tmpl$12(), _el$42 = _el$41.firstChild, _el$43 = _el$42.nextSibling;
                        _el$42.$$click = () => handleEdit(platform, index());
                        _el$43.$$click = () => deletePlatform(index());
                        createRenderEffect((_p$) => {
                          var _v$4 = `Edit ${platform.name}`, _v$5 = `Delete ${platform.name}`;
                          _v$4 !== _p$.e && setAttribute(_el$42, "aria-label", _p$.e = _v$4);
                          _v$5 !== _p$.t && setAttribute(_el$43, "aria-label", _p$.t = _v$5);
                          return _p$;
                        }, {
                          e: void 0,
                          t: void 0
                        });
                        return _el$41;
                      })()];
                    }
                  }));
                  return _el$36;
                })()
              }));
              return _el$26;
            }
          }));
          return _el$22;
        })()];
      }
    }), null);
    insert(_el$13, createComponent(Show, {
      get when() {
        return step() === 2;
      },
      get children() {
        return [(() => {
          var _el$27 = _tmpl$5(), _el$28 = _el$27.firstChild, _el$29 = _el$28.nextSibling, _el$30 = _el$29.nextSibling;
          insert(_el$30, createComponent(For, {
            get each() {
              return selectedPlatforms();
            },
            children: (platform, index) => (() => {
              var _el$46 = _tmpl$15(), _el$47 = _el$46.firstChild, _el$48 = _el$47.firstChild, _el$49 = _el$48.firstChild, _el$50 = _el$48.nextSibling, _el$51 = _el$47.nextSibling, _el$52 = _el$51.firstChild, _el$53 = _el$52.firstChild, _el$54 = _el$52.nextSibling, _el$55 = _el$54.firstChild;
              insert(_el$50, () => platform.name);
              _el$53.$$input = (e) => {
                const updatedPlatforms = [...selectedPlatforms()];
                updatedPlatforms[index()].timeLimit.hours = Number.parseInt(e.target.value) || 0;
                setSelectedPlatforms(updatedPlatforms);
              };
              _el$55.$$input = (e) => {
                const updatedPlatforms = [...selectedPlatforms()];
                updatedPlatforms[index()].timeLimit.minutes = Number.parseInt(e.target.value) || 0;
                setSelectedPlatforms(updatedPlatforms);
              };
              createRenderEffect(() => className(_el$49, `${platform.isCustom ? "fas fa-globe" : "fab " + platform.icon}`));
              createRenderEffect(() => _el$53.value = platform.timeLimit.hours);
              createRenderEffect(() => _el$55.value = platform.timeLimit.minutes);
              return _el$46;
            })()
          }));
          return _el$27;
        })(), _tmpl$6()];
      }
    }), null);
    insert(_el$32, createComponent(Show, {
      get when() {
        return step() === 1;
      },
      get children() {
        return createComponent(Button, {
          variant: "primary",
          "class": "next-button",
          onClick: nextStep,
          get children() {
            return ["Continue ", _tmpl$7()];
          }
        });
      }
    }), null);
    insert(_el$32, createComponent(Show, {
      get when() {
        return step() === 2;
      },
      get children() {
        return [createComponent(Button, {
          variant: "outline",
          "class": "back-button",
          onClick: () => setStep(1),
          get children() {
            return [_tmpl$8(), " Back"];
          }
        }), createComponent(GetStartedButton, {
          "class": "get-started-button",
          onClick: handleComplete
        })];
      }
    }), null);
    createRenderEffect((_p$) => {
      var _v$ = chrome.runtime.getURL("/icons/34x34.png") || "/placeholder.svg", _v$2 = `step-circle ${step() >= 1 ? "active" : ""}`, _v$3 = `step-circle ${step() >= 2 ? "active" : ""}`;
      _v$ !== _p$.e && setAttribute(_el$4, "src", _p$.e = _v$);
      _v$2 !== _p$.t && className(_el$9, _p$.t = _v$2);
      _v$3 !== _p$.a && className(_el$12, _p$.a = _v$3);
      return _p$;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    });
    return _el$;
  })();
}
delegateEvents(["click", "input"]);
var _tmpl$$1 = /* @__PURE__ */ template(`<div class=time-limit-panel><div class=input-card><h2 class=section-title>Set Daily Time Limit</h2><h3 class=platform-title>For </h3><div class=time-inputs><div class=time-input-group><label for=hours-input>Hours</label><input id=hours-input type=number min=0 max=23 class=time-input aria-label=Hours></div><div class=time-input-group><label for=minutes-input>Minutes</label><input id=minutes-input type=number min=0 max=59 class=time-input aria-label=Minutes></div></div><div class=button-group><button class="action-button save-button">Save</button><button class="action-button cancel-button">Cancel`), _tmpl$2 = /* @__PURE__ */ template(`<div class=confirmation-toast role=alert aria-live=assertive><i class="fas fa-check-circle"></i><span>`), _tmpl$3 = /* @__PURE__ */ template(`<div class=page-container><header class=header><div class=header-content><img alt=Growthackr class=app-icon><h2 class=title>Growthackr Settings</h2></div><div class=theme-switch-wrapper></div></header><div class=content-container style=align-items:center><div class=platform-manager-layout><div class=platform-selection-panel><h2 class=section-title>Select Platforms</h2><p class=section-description>Choose a platform to set daily time limits`);
function PlatformManager() {
  const [selectedPlatform, setSelectedPlatform] = createSignal(null);
  const [hours, setHours] = createSignal(0);
  const [minutes, setMinutes] = createSignal(0);
  const [showConfirmation, setShowConfirmation] = createSignal(false);
  const [confirmationMessage, setConfirmationMessage] = createSignal("");
  const [platforms, {
    refetch
  }] = createResource(async () => {
    try {
      const stored_platforms = await chrome.runtime.sendMessage({
        action: MessageAction.GET_PLATFORMS
      });
      return stored_platforms.data;
    } catch (error) {
      colorLog("Error fetching platforms:" + error, LogTypes.ERROR);
      return [];
    }
  });
  const handlePlatformSelect = (platform) => {
    if (selectedPlatform() && selectedPlatform().name === platform.name) {
      setSelectedPlatform(null);
    } else {
      setSelectedPlatform(platform);
      setHours(platform.timeLimit.hours);
      setMinutes(platform.timeLimit.minutes);
    }
  };
  const saveSettings = async () => {
    if (!selectedPlatform()) return;
    try {
      const hr = hours();
      const mn = minutes();
      const updatedPlatform = {
        ...selectedPlatform(),
        timeLimit: {
          hours: hr,
          minutes: mn
        }
      };
      const updateMessage = {
        action: MessageAction.UPDATE_PLATFORM,
        platform: updatedPlatform
      };
      const response = await chrome.runtime.sendMessage(updateMessage);
      if (response.success) {
        colorLog(`Time limit updated for ${updatedPlatform.name} to ${hr} hours and ${mn} minutes`, LogTypes.INFO);
        setConfirmationMessage(`Time limit for ${updatedPlatform.name} updated successfully!`);
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 3e3);
        refetch();
        setSelectedPlatform(null);
      } else {
        colorLog(`Failed to update time limit: ${response.error}`, LogTypes.ERROR);
        setConfirmationMessage("Failed to update time limit. Please try again.");
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 3e3);
      }
    } catch (error) {
      colorLog("Error saving settings:" + error, LogTypes.ERROR);
      setConfirmationMessage("An error occurred. Please try again.");
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3e3);
    }
  };
  const handleHoursChange = (e) => {
    let value = Number.parseInt(e.target.value);
    if (isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 23) value = 23;
    setHours(value);
  };
  const handleMinutesChange = (e) => {
    let value = Number.parseInt(e.target.value);
    if (isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 59) value = 59;
    setMinutes(value);
  };
  return (() => {
    var _el$ = _tmpl$3(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$3.nextSibling, _el$6 = _el$2.nextSibling, _el$7 = _el$6.firstChild, _el$8 = _el$7.firstChild, _el$9 = _el$8.firstChild;
    _el$9.nextSibling;
    insert(_el$5, createComponent(ThemeSwitch, {}));
    insert(_el$8, createComponent(PlatformList, {
      get platforms() {
        return platforms() || [];
      },
      isSelected: (platform) => selectedPlatform() && selectedPlatform().name === platform.name,
      onSelect: handlePlatformSelect,
      showTimeLimit: true,
      get loading() {
        return platforms.loading;
      },
      maxHeight: "calc(70vh - 250px)",
      emptyMessage: "No platforms configured. Add platforms in the welcome page."
    }), null);
    insert(_el$7, createComponent(Show, {
      get when() {
        return selectedPlatform();
      },
      get children() {
        var _el$11 = _tmpl$$1(), _el$12 = _el$11.firstChild, _el$13 = _el$12.firstChild, _el$14 = _el$13.nextSibling;
        _el$14.firstChild;
        var _el$16 = _el$14.nextSibling, _el$17 = _el$16.firstChild, _el$18 = _el$17.firstChild, _el$19 = _el$18.nextSibling, _el$20 = _el$17.nextSibling, _el$21 = _el$20.firstChild, _el$22 = _el$21.nextSibling, _el$23 = _el$16.nextSibling, _el$24 = _el$23.firstChild, _el$25 = _el$24.nextSibling;
        insert(_el$14, () => {
          var _a;
          return (_a = selectedPlatform()) == null ? void 0 : _a.name;
        }, null);
        _el$19.$$input = handleHoursChange;
        _el$22.$$input = handleMinutesChange;
        _el$24.$$click = saveSettings;
        _el$25.$$click = () => setSelectedPlatform(null);
        createRenderEffect(() => _el$19.value = hours());
        createRenderEffect(() => _el$22.value = minutes());
        return _el$11;
      }
    }), null);
    insert(_el$, createComponent(Show, {
      get when() {
        return showConfirmation();
      },
      get children() {
        var _el$26 = _tmpl$2(), _el$27 = _el$26.firstChild, _el$28 = _el$27.nextSibling;
        insert(_el$28, confirmationMessage);
        return _el$26;
      }
    }), null);
    createRenderEffect(() => setAttribute(_el$4, "src", chrome.runtime.getURL("/icons/34x34.png") || "/placeholder.svg"));
    return _el$;
  })();
}
delegateEvents(["input", "click"]);
var _tmpl$ = /* @__PURE__ */ template(`<div><main>`);
const OptionsContent = () => {
  const [welcomeShown, setwelcomeShown] = createSignal(false);
  const {
    isDarkMode
  } = useTheme();
  const handleWelcomeComplete = async (platformList) => {
    try {
      const platformResponse = await chrome.runtime.sendMessage({
        action: MessageAction.SET_PLATFORMS,
        platforms: platformList
      });
      if (platformResponse.success) {
        colorLog(`Successfully added ${platformList.length} platforms`, LogTypes.SUCCESS);
      }
      const welcomeResponse = await chrome.runtime.sendMessage({
        action: MessageAction.WELCOME_COMPLETED
      });
      if (welcomeResponse.success) {
        colorLog("Welcome Event completed", LogTypes.SUCCESS);
      }
      const closeResponse = await chrome.runtime.sendMessage({
        action: MessageAction.CLOSE_OPTIONS_PAGE
      });
      if (closeResponse.success) {
        colorLog("Options page closed after welcome", LogTypes.SUCCESS);
      }
    } catch (error) {
      colorLog(`Error during welcome completion: ${error}`, LogTypes.ERROR);
    }
  };
  onMount(() => {
    chrome.storage.local.get(["welcome"], (res) => {
      if (res.welcome !== false) {
        setwelcomeShown(true);
      }
    });
  });
  return (() => {
    var _el$ = _tmpl$(), _el$2 = _el$.firstChild;
    insert(_el$2, (() => {
      var _c$ = createMemo(() => !!welcomeShown());
      return () => _c$() ? createComponent(WelcomePage, {
        onComplete: handleWelcomeComplete
      }) : createComponent(PlatformManager, {});
    })());
    createRenderEffect(() => className(_el$, `app ${isDarkMode() ? "dark" : "light"}`));
    return _el$;
  })();
};
const Index = () => {
  return createComponent(ThemeProvider, {
    get children() {
      return createComponent(OptionsContent, {});
    }
  });
};
const root = document.getElementById("options-container");
render(Index, root);
//# sourceMappingURL=index.html-DpAC4PgR.js.map
