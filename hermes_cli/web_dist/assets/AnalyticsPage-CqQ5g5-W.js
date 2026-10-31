import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { I as RefreshCw, Rt as Cpu, Xt as ChartColumn, Zt as Brain, h as TrendingUp, nn as ArrowUpDown, rn as ArrowDown, tn as ArrowUp } from "./vendor-DkbdVxWs.js";
import { B as Button, L as Spinner, _ as CardHeader, h as CardContent, m as Card, s as Stats, v as CardTitle } from "./ui-vIdGzE07.js";
import { i as timeAgo } from "./utils-XzxpPQdK.js";
import { r as useI18n } from "./i18n-Zn9FHQtI.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { u as PluginSlot } from "./index-CeRydpmd.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
//#region web/src/pages/AnalyticsPage.tsx
var import_compiler_runtime = require_compiler_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var PERIODS = [
	{
		label: "7d",
		days: 7
	},
	{
		label: "30d",
		days: 30
	},
	{
		label: "90d",
		days: 90
	}
];
var CHART_HEIGHT_PX = 160;
function formatTokens(n) {
	if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
	if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
	return String(n);
}
function formatDate(day) {
	try {
		return (/* @__PURE__ */ new Date(day + "T00:00:00")).toLocaleDateString(void 0, {
			month: "short",
			day: "numeric"
		});
	} catch {
		return day;
	}
}
function useTableSort(data, defaultKey, t0) {
	const $ = (0, import_compiler_runtime.c)(14);
	const defaultDir = t0 === void 0 ? "desc" : t0;
	const [sortKey, setSortKey] = (0, import_react.useState)(defaultKey);
	const [sortDir, setSortDir] = (0, import_react.useState)(defaultDir);
	let t1;
	if ($[0] !== data || $[1] !== sortDir || $[2] !== sortKey) {
		let t2;
		if ($[4] !== sortDir || $[5] !== sortKey) {
			t2 = (a, b) => {
				const aVal = a[sortKey];
				const bVal = b[sortKey];
				if (aVal === null || aVal === void 0) return 1;
				if (bVal === null || bVal === void 0) return -1;
				if (aVal === bVal) return 0;
				const cmp = aVal > bVal ? 1 : -1;
				return sortDir === "asc" ? cmp : -cmp;
			};
			$[4] = sortDir;
			$[5] = sortKey;
			$[6] = t2;
		} else t2 = $[6];
		t1 = [...data].sort(t2);
		$[0] = data;
		$[1] = sortDir;
		$[2] = sortKey;
		$[3] = t1;
	} else t1 = $[3];
	const sorted = t1;
	let t2;
	if ($[7] !== sortKey) {
		t2 = (key) => {
			if (key === sortKey) setSortDir(_temp);
			else {
				setSortKey(key);
				setSortDir("desc");
			}
		};
		$[7] = sortKey;
		$[8] = t2;
	} else t2 = $[8];
	const toggle = t2;
	let t3;
	if ($[9] !== sortDir || $[10] !== sortKey || $[11] !== sorted || $[12] !== toggle) {
		t3 = {
			sorted,
			sortKey,
			sortDir,
			toggle
		};
		$[9] = sortDir;
		$[10] = sortKey;
		$[11] = sorted;
		$[12] = toggle;
		$[13] = t3;
	} else t3 = $[13];
	return t3;
}
function _temp(d) {
	return d === "asc" ? "desc" : "asc";
}
function SortHeader(t0) {
	const $ = (0, import_compiler_runtime.c)(13);
	const { label, col, sortKey, sortDir, toggle, className } = t0;
	const active = col === sortKey;
	let t1;
	if ($[0] !== col || $[1] !== toggle) {
		t1 = () => toggle(col);
		$[0] = col;
		$[1] = toggle;
		$[2] = t1;
	} else t1 = $[2];
	const t2 = `cursor-pointer select-none ${className ?? ""}`;
	let t3;
	if ($[3] !== active || $[4] !== sortDir) {
		t3 = active ? sortDir === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-3.5 w-3.5 text-foreground/80 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-3.5 w-3.5 text-foreground/80 shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "h-3 w-3 text-text-tertiary shrink-0" });
		$[3] = active;
		$[4] = sortDir;
		$[5] = t3;
	} else t3 = $[5];
	let t4;
	if ($[6] !== label || $[7] !== t3) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5 rounded px-1 -mx-1 py-0.5 hover:bg-muted/40 transition-colors",
			children: [label, t3]
		});
		$[6] = label;
		$[7] = t3;
		$[8] = t4;
	} else t4 = $[8];
	let t5;
	if ($[9] !== t1 || $[10] !== t2 || $[11] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			onClick: t1,
			className: t2,
			children: t4
		});
		$[9] = t1;
		$[10] = t2;
		$[11] = t4;
		$[12] = t5;
	} else t5 = $[12];
	return t5;
}
function TokenBarChart(t0) {
	const $ = (0, import_compiler_runtime.c)(52);
	const { daily } = t0;
	const { t } = useI18n();
	if (daily.length === 0) return null;
	let t1;
	if ($[0] !== daily) {
		t1 = Math.max(...daily.map(_temp2), 1);
		$[0] = daily;
		$[1] = t1;
	} else t1 = $[1];
	const maxTokens = t1;
	let t2;
	if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-5 w-5 text-muted-foreground" });
		$[2] = t2;
	} else t2 = $[2];
	let t3;
	if ($[3] !== t.analytics.dailyTokenUsage) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [t2, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: t.analytics.dailyTokenUsage
			})]
		});
		$[3] = t.analytics.dailyTokenUsage;
		$[4] = t3;
	} else t3 = $[4];
	let t4;
	if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-2.5 w-2.5",
			style: { backgroundColor: "var(--series-input-token)" }
		});
		$[5] = t4;
	} else t4 = $[5];
	let t5;
	if ($[6] !== t.analytics.input) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5",
			children: [t4, t.analytics.input]
		});
		$[6] = t.analytics.input;
		$[7] = t5;
	} else t5 = $[7];
	let t6;
	if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-2.5 w-2.5",
			style: { backgroundColor: "var(--series-output-token)" }
		});
		$[8] = t6;
	} else t6 = $[8];
	let t7;
	if ($[9] !== t.analytics.output) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5",
			children: [t6, t.analytics.output]
		});
		$[9] = t.analytics.output;
		$[10] = t7;
	} else t7 = $[10];
	let t8;
	if ($[11] !== t5 || $[12] !== t7) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4 font-mondwest normal-case text-xs text-muted-foreground",
			children: [t5, t7]
		});
		$[11] = t5;
		$[12] = t7;
		$[13] = t8;
	} else t8 = $[13];
	let t9;
	if ($[14] !== t3 || $[15] !== t8) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [t3, t8] });
		$[14] = t3;
		$[15] = t8;
		$[16] = t9;
	} else t9 = $[16];
	let t10;
	if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
		t10 = { height: CHART_HEIGHT_PX };
		$[17] = t10;
	} else t10 = $[17];
	let t11;
	if ($[18] !== daily || $[19] !== maxTokens || $[20] !== t.analytics.input || $[21] !== t.analytics.output || $[22] !== t.analytics.total) {
		let t12;
		if ($[24] !== maxTokens || $[25] !== t.analytics.input || $[26] !== t.analytics.output || $[27] !== t.analytics.total) {
			t12 = (d_0) => {
				const total = d_0.input_tokens + d_0.output_tokens;
				const inputH = Math.round(d_0.input_tokens / maxTokens * CHART_HEIGHT_PX);
				const outputH = Math.round(d_0.output_tokens / maxTokens * CHART_HEIGHT_PX);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0 group relative flex flex-col justify-end",
					style: { height: CHART_HEIGHT_PX },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 pointer-events-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mondwest normal-case bg-card border border-border px-2.5 py-1.5 text-xs text-foreground shadow-lg whitespace-nowrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: formatDate(d_0.day)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										t.analytics.input,
										": ",
										formatTokens(d_0.input_tokens)
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										t.analytics.output,
										": ",
										formatTokens(d_0.output_tokens)
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										t.analytics.total,
										": ",
										formatTokens(total)
									] })
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full",
							style: {
								backgroundColor: "color-mix(in srgb, var(--series-input-token) 70%, transparent)",
								height: Math.max(inputH, total > 0 ? 1 : 0)
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full",
							style: {
								backgroundColor: "color-mix(in srgb, var(--series-output-token) 70%, transparent)",
								height: Math.max(outputH, d_0.output_tokens > 0 ? 1 : 0)
							}
						})
					]
				}, d_0.day);
			};
			$[24] = maxTokens;
			$[25] = t.analytics.input;
			$[26] = t.analytics.output;
			$[27] = t.analytics.total;
			$[28] = t12;
		} else t12 = $[28];
		t11 = daily.map(t12);
		$[18] = daily;
		$[19] = maxTokens;
		$[20] = t.analytics.input;
		$[21] = t.analytics.output;
		$[22] = t.analytics.total;
		$[23] = t11;
	} else t11 = $[23];
	let t12;
	if ($[29] !== t11) {
		t12 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-end gap-[2px]",
			style: t10,
			children: t11
		});
		$[29] = t11;
		$[30] = t12;
	} else t12 = $[30];
	let t13;
	if ($[31] !== daily[0] || $[32] !== daily.length) {
		t13 = daily.length > 0 ? formatDate(daily[0].day) : "";
		$[31] = daily[0];
		$[32] = daily.length;
		$[33] = t13;
	} else t13 = $[33];
	let t14;
	if ($[34] !== t13) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t13 });
		$[34] = t13;
		$[35] = t14;
	} else t14 = $[35];
	let t15;
	if ($[36] !== daily) {
		t15 = daily.length > 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(daily[Math.floor(daily.length / 2)].day) });
		$[36] = daily;
		$[37] = t15;
	} else t15 = $[37];
	let t16;
	if ($[38] !== daily) {
		t16 = daily.length > 1 ? formatDate(daily[daily.length - 1].day) : "";
		$[38] = daily;
		$[39] = t16;
	} else t16 = $[39];
	let t17;
	if ($[40] !== t16) {
		t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t16 });
		$[40] = t16;
		$[41] = t17;
	} else t17 = $[41];
	let t18;
	if ($[42] !== t14 || $[43] !== t15 || $[44] !== t17) {
		t18 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between mt-2 font-mondwest normal-case text-xs text-text-tertiary",
			children: [
				t14,
				t15,
				t17
			]
		});
		$[42] = t14;
		$[43] = t15;
		$[44] = t17;
		$[45] = t18;
	} else t18 = $[45];
	let t19;
	if ($[46] !== t12 || $[47] !== t18) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [t12, t18] });
		$[46] = t12;
		$[47] = t18;
		$[48] = t19;
	} else t19 = $[48];
	let t20;
	if ($[49] !== t19 || $[50] !== t9) {
		t20 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [t9, t19] });
		$[49] = t19;
		$[50] = t9;
		$[51] = t20;
	} else t20 = $[51];
	return t20;
}
function _temp2(d) {
	return d.input_tokens + d.output_tokens;
}
function DailyTable(t0) {
	const $ = (0, import_compiler_runtime.c)(38);
	const { daily } = t0;
	const { t } = useI18n();
	const { sorted, sortKey, sortDir, toggle } = useTableSort(daily, "day", "desc");
	if (daily.length === 0) return null;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-muted-foreground" });
		$[0] = t1;
	} else t1 = $[0];
	let t2;
	if ($[1] !== t.analytics.dailyBreakdown) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [t1, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: t.analytics.dailyBreakdown
			})]
		}) });
		$[1] = t.analytics.dailyBreakdown;
		$[2] = t2;
	} else t2 = $[2];
	let t3;
	if ($[3] !== sortDir || $[4] !== sortKey || $[5] !== t.analytics.date || $[6] !== toggle) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
			label: t.analytics.date,
			col: "day",
			sortKey,
			sortDir,
			toggle,
			className: "text-left py-2 pr-4 font-medium"
		});
		$[3] = sortDir;
		$[4] = sortKey;
		$[5] = t.analytics.date;
		$[6] = toggle;
		$[7] = t3;
	} else t3 = $[7];
	let t4;
	if ($[8] !== sortDir || $[9] !== sortKey || $[10] !== t.sessions.title || $[11] !== toggle) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
			label: t.sessions.title,
			col: "sessions",
			sortKey,
			sortDir,
			toggle,
			className: "text-right py-2 px-4 font-medium"
		});
		$[8] = sortDir;
		$[9] = sortKey;
		$[10] = t.sessions.title;
		$[11] = toggle;
		$[12] = t4;
	} else t4 = $[12];
	let t5;
	if ($[13] !== sortDir || $[14] !== sortKey || $[15] !== t.analytics.input || $[16] !== toggle) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
			label: t.analytics.input,
			col: "input_tokens",
			sortKey,
			sortDir,
			toggle,
			className: "text-right py-2 px-4 font-medium"
		});
		$[13] = sortDir;
		$[14] = sortKey;
		$[15] = t.analytics.input;
		$[16] = toggle;
		$[17] = t5;
	} else t5 = $[17];
	let t6;
	if ($[18] !== sortDir || $[19] !== sortKey || $[20] !== t.analytics.output || $[21] !== toggle) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
			label: t.analytics.output,
			col: "output_tokens",
			sortKey,
			sortDir,
			toggle,
			className: "text-right py-2 pl-4 font-medium"
		});
		$[18] = sortDir;
		$[19] = sortKey;
		$[20] = t.analytics.output;
		$[21] = toggle;
		$[22] = t6;
	} else t6 = $[22];
	let t7;
	if ($[23] !== t3 || $[24] !== t4 || $[25] !== t5 || $[26] !== t6) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-b border-border text-muted-foreground text-xs",
			children: [
				t3,
				t4,
				t5,
				t6
			]
		}) });
		$[23] = t3;
		$[24] = t4;
		$[25] = t5;
		$[26] = t6;
		$[27] = t7;
	} else t7 = $[27];
	let t8;
	if ($[28] !== sorted) {
		t8 = sorted.map(_temp3);
		$[28] = sorted;
		$[29] = t8;
	} else t8 = $[29];
	let t9;
	if ($[30] !== t8) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: t8 });
		$[30] = t8;
		$[31] = t9;
	} else t9 = $[31];
	let t10;
	if ($[32] !== t7 || $[33] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full font-mondwest normal-case text-sm",
				children: [t7, t9]
			})
		}) });
		$[32] = t7;
		$[33] = t9;
		$[34] = t10;
	} else t10 = $[34];
	let t11;
	if ($[35] !== t10 || $[36] !== t2) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [t2, t10] });
		$[35] = t10;
		$[36] = t2;
		$[37] = t11;
	} else t11 = $[37];
	return t11;
}
function _temp3(d) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-b border-border/50 hover:bg-secondary/20 transition-colors",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2 pr-4 font-medium",
				children: formatDate(d.day)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "text-right py-2 px-4 text-muted-foreground",
				children: d.sessions
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "text-right py-2 px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { color: "var(--series-input-token)" },
					children: formatTokens(d.input_tokens)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "text-right py-2 pl-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { color: "var(--series-output-token)" },
					children: formatTokens(d.output_tokens)
				})
			})
		]
	}, d.day);
}
function ModelTable(t0) {
	const $ = (0, import_compiler_runtime.c)(32);
	const { models } = t0;
	const { t } = useI18n();
	const { sorted, sortKey, sortDir, toggle } = useTableSort(models, "input_tokens", "desc");
	if (models.length === 0) return null;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-5 w-5 text-muted-foreground" });
		$[0] = t1;
	} else t1 = $[0];
	let t2;
	if ($[1] !== t.analytics.perModelBreakdown) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [t1, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: t.analytics.perModelBreakdown
			})]
		}) });
		$[1] = t.analytics.perModelBreakdown;
		$[2] = t2;
	} else t2 = $[2];
	let t3;
	if ($[3] !== sortDir || $[4] !== sortKey || $[5] !== t.analytics.model || $[6] !== toggle) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
			label: t.analytics.model,
			col: "model",
			sortKey,
			sortDir,
			toggle,
			className: "text-left py-2 pr-4 font-medium"
		});
		$[3] = sortDir;
		$[4] = sortKey;
		$[5] = t.analytics.model;
		$[6] = toggle;
		$[7] = t3;
	} else t3 = $[7];
	let t4;
	if ($[8] !== sortDir || $[9] !== sortKey || $[10] !== t.sessions.title || $[11] !== toggle) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
			label: t.sessions.title,
			col: "sessions",
			sortKey,
			sortDir,
			toggle,
			className: "text-right py-2 px-4 font-medium"
		});
		$[8] = sortDir;
		$[9] = sortKey;
		$[10] = t.sessions.title;
		$[11] = toggle;
		$[12] = t4;
	} else t4 = $[12];
	let t5;
	if ($[13] !== sortDir || $[14] !== sortKey || $[15] !== t.analytics.tokens || $[16] !== toggle) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
			label: t.analytics.tokens,
			col: "input_tokens",
			sortKey,
			sortDir,
			toggle,
			className: "text-right py-2 pl-4 font-medium"
		});
		$[13] = sortDir;
		$[14] = sortKey;
		$[15] = t.analytics.tokens;
		$[16] = toggle;
		$[17] = t5;
	} else t5 = $[17];
	let t6;
	if ($[18] !== t3 || $[19] !== t4 || $[20] !== t5) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-b border-border text-muted-foreground text-xs",
			children: [
				t3,
				t4,
				t5
			]
		}) });
		$[18] = t3;
		$[19] = t4;
		$[20] = t5;
		$[21] = t6;
	} else t6 = $[21];
	let t7;
	if ($[22] !== sorted) {
		t7 = sorted.map(_temp4);
		$[22] = sorted;
		$[23] = t7;
	} else t7 = $[23];
	let t8;
	if ($[24] !== t7) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: t7 });
		$[24] = t7;
		$[25] = t8;
	} else t8 = $[25];
	let t9;
	if ($[26] !== t6 || $[27] !== t8) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full font-mondwest normal-case text-sm",
				children: [t6, t8]
			})
		}) });
		$[26] = t6;
		$[27] = t8;
		$[28] = t9;
	} else t9 = $[28];
	let t10;
	if ($[29] !== t2 || $[30] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [t2, t9] });
		$[29] = t2;
		$[30] = t9;
		$[31] = t10;
	} else t10 = $[31];
	return t10;
}
function _temp4(m) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-b border-border/50 hover:bg-secondary/20 transition-colors",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2 pr-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono-ui text-xs",
					children: m.model
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "text-right py-2 px-4 text-muted-foreground",
				children: m.sessions
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
				className: "text-right py-2 pl-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: "var(--series-input-token)" },
						children: formatTokens(m.input_tokens)
					}),
					" / ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: "var(--series-output-token)" },
						children: formatTokens(m.output_tokens)
					})
				]
			})
		]
	}, m.model);
}
function SkillTable(t0) {
	const $ = (0, import_compiler_runtime.c)(44);
	const { skills } = t0;
	const { t } = useI18n();
	const { sorted, sortKey, sortDir, toggle } = useTableSort(skills, "total_count", "desc");
	if (skills.length === 0) return null;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-5 w-5 text-muted-foreground" });
		$[0] = t1;
	} else t1 = $[0];
	let t2;
	if ($[1] !== t.analytics.topSkills) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [t1, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: t.analytics.topSkills
			})]
		}) });
		$[1] = t.analytics.topSkills;
		$[2] = t2;
	} else t2 = $[2];
	let t3;
	if ($[3] !== sortDir || $[4] !== sortKey || $[5] !== t.analytics.skill || $[6] !== toggle) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
			label: t.analytics.skill,
			col: "skill",
			sortKey,
			sortDir,
			toggle,
			className: "text-left py-2 pr-4 font-medium"
		});
		$[3] = sortDir;
		$[4] = sortKey;
		$[5] = t.analytics.skill;
		$[6] = toggle;
		$[7] = t3;
	} else t3 = $[7];
	let t4;
	if ($[8] !== sortDir || $[9] !== sortKey || $[10] !== t.analytics.loads || $[11] !== toggle) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
			label: t.analytics.loads,
			col: "view_count",
			sortKey,
			sortDir,
			toggle,
			className: "text-right py-2 px-4 font-medium"
		});
		$[8] = sortDir;
		$[9] = sortKey;
		$[10] = t.analytics.loads;
		$[11] = toggle;
		$[12] = t4;
	} else t4 = $[12];
	let t5;
	if ($[13] !== sortDir || $[14] !== sortKey || $[15] !== t.analytics.edits || $[16] !== toggle) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
			label: t.analytics.edits,
			col: "manage_count",
			sortKey,
			sortDir,
			toggle,
			className: "text-right py-2 px-4 font-medium"
		});
		$[13] = sortDir;
		$[14] = sortKey;
		$[15] = t.analytics.edits;
		$[16] = toggle;
		$[17] = t5;
	} else t5 = $[17];
	let t6;
	if ($[18] !== sortDir || $[19] !== sortKey || $[20] !== t.analytics.total || $[21] !== toggle) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
			label: t.analytics.total,
			col: "total_count",
			sortKey,
			sortDir,
			toggle,
			className: "text-right py-2 px-4 font-medium"
		});
		$[18] = sortDir;
		$[19] = sortKey;
		$[20] = t.analytics.total;
		$[21] = toggle;
		$[22] = t6;
	} else t6 = $[22];
	let t7;
	if ($[23] !== sortDir || $[24] !== sortKey || $[25] !== t.analytics.lastUsed || $[26] !== toggle) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortHeader, {
			label: t.analytics.lastUsed,
			col: "last_used_at",
			sortKey,
			sortDir,
			toggle,
			className: "text-right py-2 pl-4 font-medium"
		});
		$[23] = sortDir;
		$[24] = sortKey;
		$[25] = t.analytics.lastUsed;
		$[26] = toggle;
		$[27] = t7;
	} else t7 = $[27];
	let t8;
	if ($[28] !== t3 || $[29] !== t4 || $[30] !== t5 || $[31] !== t6 || $[32] !== t7) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-b border-border text-muted-foreground text-xs",
			children: [
				t3,
				t4,
				t5,
				t6,
				t7
			]
		}) });
		$[28] = t3;
		$[29] = t4;
		$[30] = t5;
		$[31] = t6;
		$[32] = t7;
		$[33] = t8;
	} else t8 = $[33];
	let t9;
	if ($[34] !== sorted) {
		t9 = sorted.map(_temp5);
		$[34] = sorted;
		$[35] = t9;
	} else t9 = $[35];
	let t10;
	if ($[36] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: t9 });
		$[36] = t9;
		$[37] = t10;
	} else t10 = $[37];
	let t11;
	if ($[38] !== t10 || $[39] !== t8) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full font-mondwest normal-case text-sm",
				children: [t8, t10]
			})
		}) });
		$[38] = t10;
		$[39] = t8;
		$[40] = t11;
	} else t11 = $[40];
	let t12;
	if ($[41] !== t11 || $[42] !== t2) {
		t12 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [t2, t11] });
		$[41] = t11;
		$[42] = t2;
		$[43] = t12;
	} else t12 = $[43];
	return t12;
}
function _temp5(skill) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-b border-border/50 hover:bg-secondary/20 transition-colors",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-2 pr-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono-ui text-xs",
					children: skill.skill
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "text-right py-2 px-4 text-muted-foreground",
				children: skill.view_count
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "text-right py-2 px-4 text-muted-foreground",
				children: skill.manage_count
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "text-right py-2 px-4",
				children: skill.total_count
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "text-right py-2 pl-4 text-muted-foreground",
				children: skill.last_used_at ? timeAgo(skill.last_used_at) : "—"
			})
		]
	}, skill.skill);
}
function AnalyticsPage() {
	const $ = (0, import_compiler_runtime.c)(42);
	const [days, setDays] = (0, import_react.useState)(30);
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [showTokens, setShowTokens] = (0, import_react.useState)(null);
	const { t } = useI18n();
	const { setAfterTitle, setEnd } = usePageHeader();
	let t0;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = () => {
			api.getConfig().then((cfg) => {
				const dash = cfg?.dashboard ?? {};
				setShowTokens(dash.show_token_analytics === true);
			}).catch(() => setShowTokens(false));
		};
		t1 = [];
		$[0] = t0;
		$[1] = t1;
	} else {
		t0 = $[0];
		t1 = $[1];
	}
	(0, import_react.useEffect)(t0, t1);
	let t2;
	if ($[2] !== days || $[3] !== showTokens) {
		t2 = () => {
			if (!showTokens) return;
			setLoading(true);
			setError(null);
			api.getAnalytics(days).then(setData).catch((err) => setError(errorMessage(err))).finally(() => setLoading(false));
		};
		$[2] = days;
		$[3] = showTokens;
		$[4] = t2;
	} else t2 = $[4];
	const load = t2;
	let t3;
	let t4;
	if ($[5] !== days || $[6] !== load || $[7] !== loading || $[8] !== setAfterTitle || $[9] !== setEnd || $[10] !== showTokens || $[11] !== t.common.refresh) {
		t3 = () => {
			setAfterTitle(showTokens === false ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: [PERIODS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					outlined: days !== p.days,
					onClick: () => setDays(p.days),
					children: p.label
				}, p.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					ghost: true,
					size: "icon",
					className: "text-muted-foreground hover:text-foreground",
					onClick: load,
					disabled: loading,
					"aria-label": t.common.refresh,
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {})
				})]
			}));
			setEnd(null);
			return () => {
				setAfterTitle(null);
				setEnd(null);
			};
		};
		t4 = [
			days,
			loading,
			load,
			setAfterTitle,
			setEnd,
			t.common.refresh,
			showTokens
		];
		$[5] = days;
		$[6] = load;
		$[7] = loading;
		$[8] = setAfterTitle;
		$[9] = setEnd;
		$[10] = showTokens;
		$[11] = t.common.refresh;
		$[12] = t3;
		$[13] = t4;
	} else {
		t3 = $[12];
		t4 = $[13];
	}
	(0, import_react.useLayoutEffect)(t3, t4);
	let t5;
	let t6;
	if ($[14] !== load) {
		t5 = () => {
			load();
		};
		t6 = [load];
		$[14] = load;
		$[15] = t5;
		$[16] = t6;
	} else {
		t5 = $[15];
		t6 = $[16];
	}
	(0, import_react.useEffect)(t5, t6);
	let t7;
	if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "analytics:top" });
		$[17] = t7;
	} else t7 = $[17];
	let t8;
	if ($[18] !== showTokens) {
		t8 = showTokens === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-2xl flex-col gap-3 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-mondwest text-display text-base tracking-wider text-foreground",
						children: "Token analytics hidden"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"The token, cost, and per-day analytics on this page are a local debug estimate. They only count successful main-agent responses with a usable ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono",
							children: "usage"
						}),
						" ",
						"block, and silently exclude auxiliary calls (context compression, title generation, vision, session search, web extract, smart approvals, MCP routing, plugin LLM access) plus provider-side retries and fallback attempts. Cache writes are missing entirely."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "On models with heavy auxiliary traffic (Kimi K2.6, MiniMax M2.7) the local total can be 10x–100x lower than what your provider bills. Hiding these numbers is safer than letting them look authoritative." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Check your provider dashboard (OpenRouter, Anthropic, etc.) for actual usage and billing. To re-enable the local debug estimate anyway, set",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono",
							children: "dashboard.show_token_analytics: true"
						}),
						" ",
						"in ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/config",
							className: "underline",
							children: "Config"
						}),
						"."
					] })
				]
			})
		}) });
		$[18] = showTokens;
		$[19] = t8;
	} else t8 = $[19];
	let t9;
	if ($[20] !== data || $[21] !== loading || $[22] !== showTokens) {
		t9 = showTokens && loading && !data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-2xl text-primary" })
		});
		$[20] = data;
		$[21] = loading;
		$[22] = showTokens;
		$[23] = t9;
	} else t9 = $[23];
	let t10;
	if ($[24] !== error || $[25] !== showTokens) {
		t10 = showTokens && error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive text-center",
				children: error
			})
		}) });
		$[24] = error;
		$[25] = showTokens;
		$[26] = t10;
	} else t10 = $[26];
	let t11;
	if ($[27] !== data || $[28] !== days || $[29] !== showTokens || $[30] !== t.analytics) {
		t11 = showTokens && data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "py-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, { items: [
						{
							label: t.analytics.totalTokens,
							value: formatTokens(data.totals.total_input + data.totals.total_output)
						},
						{
							label: t.analytics.input,
							value: formatTokens(data.totals.total_input)
						},
						{
							label: t.analytics.output,
							value: formatTokens(data.totals.total_output)
						},
						{
							label: t.analytics.totalSessions,
							value: `${data.totals.total_sessions} (~${(data.totals.total_sessions / days).toFixed(1)}${t.analytics.perDayAvg})`
						},
						{
							label: t.analytics.apiCalls,
							value: String(data.totals.total_api_calls ?? data.daily.reduce(_temp6, 0))
						}
					] })
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenBarChart, { daily: data.daily })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyTable, { daily: data.daily }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelTable, { models: data.by_model }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillTable, { skills: data.skills.top_skills })
		] });
		$[27] = data;
		$[28] = days;
		$[29] = showTokens;
		$[30] = t.analytics;
		$[31] = t11;
	} else t11 = $[31];
	let t12;
	if ($[32] !== data || $[33] !== t.analytics) {
		t12 = data && data.daily.length === 0 && data.by_model.length === 0 && data.skills.top_skills.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-8 w-8 mb-3 opacity-40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: t.analytics.noUsageData
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs mt-1 text-text-tertiary",
						children: t.analytics.startSession
					})
				]
			})
		}) });
		$[32] = data;
		$[33] = t.analytics;
		$[34] = t12;
	} else t12 = $[34];
	let t13;
	if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "analytics:bottom" });
		$[35] = t13;
	} else t13 = $[35];
	let t14;
	if ($[36] !== t10 || $[37] !== t11 || $[38] !== t12 || $[39] !== t8 || $[40] !== t9) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-6",
			children: [
				t7,
				t8,
				t9,
				t10,
				t11,
				t12,
				t13
			]
		});
		$[36] = t10;
		$[37] = t11;
		$[38] = t12;
		$[39] = t8;
		$[40] = t9;
		$[41] = t14;
	} else t14 = $[41];
	return t14;
}
function _temp6(sum, d) {
	return sum + d.sessions;
}
//#endregion
export { AnalyticsPage as default };
