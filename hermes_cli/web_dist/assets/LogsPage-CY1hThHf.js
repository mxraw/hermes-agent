import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, n as require_compiler_runtime, o as useSearchParams, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { Et as FileText, I as RefreshCw } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, L as Spinner, _ as CardHeader, f as Label, h as CardContent, i as Segmented, m as Card, o as Switch, r as FilterGroup, v as CardTitle } from "./ui-vIdGzE07.js";
import { r as useI18n } from "./i18n-Zn9FHQtI.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { u as PluginSlot } from "./index-CeRydpmd.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
//#region web/src/lib/log-classify.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_compiler_runtime = require_compiler_runtime();
var LEVEL_TOKEN_RE = /^\d{4}-\d{2}-\d{2}[ T][\d:,.]+\s+(DEBUG|INFO|WARNING|WARN|ERROR|CRITICAL|FATAL)\b/;
function classifyLine(line) {
	const token = LEVEL_TOKEN_RE.exec(line)?.[1];
	if (token) {
		if (token === "ERROR" || token === "CRITICAL" || token === "FATAL") return "error";
		if (token === "WARNING" || token === "WARN") return "warning";
		if (token === "DEBUG") return "debug";
		return "info";
	}
	const upper = line.toUpperCase();
	if (/\b(ERROR|CRITICAL|FATAL)\b/.test(upper) || upper.startsWith("TRACEBACK (")) return "error";
	if (/\b(WARNING|WARN)\b/.test(upper)) return "warning";
	if (/\bDEBUG\b/.test(upper)) return "debug";
	return "info";
}
//#endregion
//#region web/src/pages/LogsPage.tsx
var import_jsx_runtime = require_jsx_runtime();
var FILES = [
	"agent",
	"errors",
	"gateway"
];
var LEVELS = [
	"ALL",
	"DEBUG",
	"INFO",
	"WARNING",
	"ERROR"
];
var COMPONENTS = [
	"all",
	"gateway",
	"agent",
	"tools",
	"cli",
	"cron"
];
var LINE_COUNTS = [
	50,
	100,
	200,
	500
];
var LINE_COLORS = {
	error: "text-destructive",
	warning: "text-warning",
	info: "text-foreground",
	debug: "text-text-tertiary"
};
var formatFilterLabel = (value) => value.toUpperCase();
var toSegmentOptions = (values) => values.map((v) => ({
	value: v,
	label: formatFilterLabel(v)
}));
var filterGroupClass = "flex min-w-0 w-full flex-col items-start gap-1.5 sm:w-auto sm:max-w-full sm:flex-row sm:items-center";
var segmentedClass = "w-fit max-w-full flex-wrap justify-start self-start";
function isLogFile(value) {
	return FILES.includes(value ?? "");
}
function LogsPage() {
	const $ = (0, import_compiler_runtime.c)(86);
	const [searchParams] = useSearchParams();
	let t0;
	if ($[0] !== searchParams) {
		t0 = searchParams.get("file");
		$[0] = searchParams;
		$[1] = t0;
	} else t0 = $[1];
	const requestedFile = t0;
	let t1;
	if ($[2] !== requestedFile) {
		t1 = () => isLogFile(requestedFile) ? requestedFile : "agent";
		$[2] = requestedFile;
		$[3] = t1;
	} else t1 = $[3];
	const [file, setFile] = (0, import_react.useState)(t1);
	const [level, setLevel] = (0, import_react.useState)("ALL");
	const [component, setComponent] = (0, import_react.useState)("all");
	const [lineCount, setLineCount] = (0, import_react.useState)(100);
	const [autoRefresh, setAutoRefresh] = (0, import_react.useState)(false);
	let t2;
	if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = [];
		$[4] = t2;
	} else t2 = $[4];
	const [lines, setLines] = (0, import_react.useState)(t2);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const scrollRef = (0, import_react.useRef)(null);
	const { t } = useI18n();
	const { setAfterTitle, setEnd } = usePageHeader();
	let t3;
	if ($[5] !== component || $[6] !== file || $[7] !== level || $[8] !== lineCount) {
		t3 = () => {
			setLoading(true);
			setError(null);
			api.getLogs({
				file,
				lines: lineCount,
				level,
				component
			}).then((resp) => {
				setLines(resp.lines);
				setTimeout(() => {
					if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
				}, 50);
			}).catch((err) => setError(errorMessage(err))).finally(() => setLoading(false));
		};
		$[5] = component;
		$[6] = file;
		$[7] = level;
		$[8] = lineCount;
		$[9] = t3;
	} else t3 = $[9];
	const fetchLogs = t3;
	let t4;
	let t5;
	if ($[10] !== autoRefresh || $[11] !== component || $[12] !== fetchLogs || $[13] !== file || $[14] !== level || $[15] !== loading || $[16] !== setAfterTitle || $[17] !== setEnd || $[18] !== t.common.live || $[19] !== t.common.refresh || $[20] !== t.logs.autoRefresh) {
		t4 = () => {
			setAfterTitle(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					tone: "secondary",
					className: "text-xs",
					children: [
						formatFilterLabel(file),
						" · ",
						formatFilterLabel(level),
						" ·",
						" ",
						formatFilterLabel(component)
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					ghost: true,
					size: "icon",
					className: "text-muted-foreground hover:text-foreground",
					onClick: fetchLogs,
					disabled: loading,
					"aria-label": t.common.refresh,
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {})
				})]
			}));
			setEnd(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex w-full min-w-0 flex-wrap items-center justify-start gap-2 sm:justify-end sm:gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "logs-auto-refresh",
							className: "text-xs cursor-pointer",
							children: t.logs.autoRefresh
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: autoRefresh,
							onCheckedChange: setAutoRefresh,
							id: "logs-auto-refresh"
						}),
						autoRefresh && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							tone: "success",
							className: "text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current" }), t.common.live]
						})
					]
				})
			}));
			return () => {
				setAfterTitle(null);
				setEnd(null);
			};
		};
		t5 = [
			autoRefresh,
			component,
			file,
			level,
			loading,
			setAfterTitle,
			setEnd,
			t.common.live,
			t.common.refresh,
			t.logs.autoRefresh,
			fetchLogs
		];
		$[10] = autoRefresh;
		$[11] = component;
		$[12] = fetchLogs;
		$[13] = file;
		$[14] = level;
		$[15] = loading;
		$[16] = setAfterTitle;
		$[17] = setEnd;
		$[18] = t.common.live;
		$[19] = t.common.refresh;
		$[20] = t.logs.autoRefresh;
		$[21] = t4;
		$[22] = t5;
	} else {
		t4 = $[21];
		t5 = $[22];
	}
	(0, import_react.useLayoutEffect)(t4, t5);
	let t6;
	let t7;
	if ($[23] !== fetchLogs) {
		t6 = () => {
			fetchLogs();
		};
		t7 = [fetchLogs];
		$[23] = fetchLogs;
		$[24] = t6;
		$[25] = t7;
	} else {
		t6 = $[24];
		t7 = $[25];
	}
	(0, import_react.useEffect)(t6, t7);
	let t8;
	let t9;
	if ($[26] !== autoRefresh || $[27] !== fetchLogs) {
		t8 = () => {
			if (!autoRefresh) return;
			const interval = setInterval(fetchLogs, 5e3);
			return () => clearInterval(interval);
		};
		t9 = [autoRefresh, fetchLogs];
		$[26] = autoRefresh;
		$[27] = fetchLogs;
		$[28] = t8;
		$[29] = t9;
	} else {
		t8 = $[28];
		t9 = $[29];
	}
	(0, import_react.useEffect)(t8, t9);
	let t10;
	if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "logs:top" });
		$[30] = t10;
	} else t10 = $[30];
	const t11 = t.logs.title;
	const t12 = t.logs.file;
	let t13;
	if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
		t13 = toSegmentOptions(FILES);
		$[31] = t13;
	} else t13 = $[31];
	let t14;
	if ($[32] !== file) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
			className: segmentedClass,
			value: file,
			onChange: setFile,
			options: t13
		});
		$[32] = file;
		$[33] = t14;
	} else t14 = $[33];
	let t15;
	if ($[34] !== t.logs.file || $[35] !== t14) {
		t15 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
			label: t12,
			className: filterGroupClass,
			children: t14
		});
		$[34] = t.logs.file;
		$[35] = t14;
		$[36] = t15;
	} else t15 = $[36];
	const t16 = t.logs.level;
	let t17;
	if ($[37] === Symbol.for("react.memo_cache_sentinel")) {
		t17 = toSegmentOptions(LEVELS);
		$[37] = t17;
	} else t17 = $[37];
	let t18;
	if ($[38] !== level) {
		t18 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
			className: segmentedClass,
			value: level,
			onChange: setLevel,
			options: t17
		});
		$[38] = level;
		$[39] = t18;
	} else t18 = $[39];
	let t19;
	if ($[40] !== t.logs.level || $[41] !== t18) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
			label: t16,
			className: filterGroupClass,
			children: t18
		});
		$[40] = t.logs.level;
		$[41] = t18;
		$[42] = t19;
	} else t19 = $[42];
	const t20 = t.logs.component;
	let t21;
	if ($[43] === Symbol.for("react.memo_cache_sentinel")) {
		t21 = toSegmentOptions(COMPONENTS);
		$[43] = t21;
	} else t21 = $[43];
	let t22;
	if ($[44] !== component) {
		t22 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
			className: segmentedClass,
			value: component,
			onChange: setComponent,
			options: t21
		});
		$[44] = component;
		$[45] = t22;
	} else t22 = $[45];
	let t23;
	if ($[46] !== t.logs.component || $[47] !== t22) {
		t23 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
			label: t20,
			className: filterGroupClass,
			children: t22
		});
		$[46] = t.logs.component;
		$[47] = t22;
		$[48] = t23;
	} else t23 = $[48];
	const t24 = t.logs.lines;
	const t25 = String(lineCount);
	let t26;
	let t27;
	if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
		t26 = (v) => setLineCount(Number(v));
		t27 = LINE_COUNTS.map(_temp);
		$[49] = t26;
		$[50] = t27;
	} else {
		t26 = $[49];
		t27 = $[50];
	}
	let t28;
	if ($[51] !== t25) {
		t28 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
			className: segmentedClass,
			value: t25,
			onChange: t26,
			options: t27
		});
		$[51] = t25;
		$[52] = t28;
	} else t28 = $[52];
	let t29;
	if ($[53] !== t.logs.lines || $[54] !== t28) {
		t29 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
			label: t24,
			className: filterGroupClass,
			children: t28
		});
		$[53] = t.logs.lines;
		$[54] = t28;
		$[55] = t29;
	} else t29 = $[55];
	let t30;
	if ($[56] !== t.logs.title || $[57] !== t15 || $[58] !== t19 || $[59] !== t23 || $[60] !== t29) {
		t30 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "toolbar",
			"aria-label": t11,
			className: "flex min-w-0 max-w-full flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-6 sm:gap-y-3",
			children: [
				t15,
				t19,
				t23,
				t29
			]
		});
		$[56] = t.logs.title;
		$[57] = t15;
		$[58] = t19;
		$[59] = t23;
		$[60] = t29;
		$[61] = t30;
	} else t30 = $[61];
	let t31;
	if ($[62] === Symbol.for("react.memo_cache_sentinel")) {
		t31 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" });
		$[62] = t31;
	} else t31 = $[62];
	let t32;
	if ($[63] !== file) {
		t32 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "py-3 px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
				className: "text-sm flex items-center gap-2",
				children: [
					t31,
					file,
					".log"
				]
			})
		});
		$[63] = file;
		$[64] = t32;
	} else t32 = $[64];
	let t33;
	if ($[65] !== error) {
		t33 = error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-destructive/10 border-b border-destructive/20 p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				children: error
			})
		});
		$[65] = error;
		$[66] = t33;
	} else t33 = $[66];
	let t34;
	if ($[67] !== lines.length || $[68] !== loading || $[69] !== t.logs.noLogLines) {
		t34 = lines.length === 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground text-center py-8",
			children: t.logs.noLogLines
		});
		$[67] = lines.length;
		$[68] = loading;
		$[69] = t.logs.noLogLines;
		$[70] = t34;
	} else t34 = $[70];
	let t35;
	if ($[71] !== lines) {
		t35 = lines.map(_temp2);
		$[71] = lines;
		$[72] = t35;
	} else t35 = $[72];
	let t36;
	if ($[73] !== t34 || $[74] !== t35) {
		t36 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: scrollRef,
			className: "max-w-full min-h-[400px] max-h-[calc(100vh-220px)] overflow-auto p-4 font-mono-ui text-xs leading-5 break-words",
			children: [t34, t35]
		});
		$[73] = t34;
		$[74] = t35;
		$[75] = t36;
	} else t36 = $[75];
	let t37;
	if ($[76] !== t33 || $[77] !== t36) {
		t37 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-0",
			children: [t33, t36]
		});
		$[76] = t33;
		$[77] = t36;
		$[78] = t37;
	} else t37 = $[78];
	let t38;
	if ($[79] !== t32 || $[80] !== t37) {
		t38 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "min-w-0 max-w-full overflow-hidden",
			children: [t32, t37]
		});
		$[79] = t32;
		$[80] = t37;
		$[81] = t38;
	} else t38 = $[81];
	let t39;
	if ($[82] === Symbol.for("react.memo_cache_sentinel")) {
		t39 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "logs:bottom" });
		$[82] = t39;
	} else t39 = $[82];
	let t40;
	if ($[83] !== t30 || $[84] !== t38) {
		t40 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 max-w-full flex-col gap-4",
			children: [
				t10,
				t30,
				t38,
				t39
			]
		});
		$[83] = t30;
		$[84] = t38;
		$[85] = t40;
	} else t40 = $[85];
	return t40;
}
function _temp2(line, i) {
	const cls = classifyLine(line);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${LINE_COLORS[cls]} hover:bg-secondary/20 px-1 -mx-1`,
		children: line
	}, i);
}
function _temp(n) {
	return {
		value: String(n),
		label: String(n)
	};
}
//#endregion
export { LogsPage as default };
