import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { $t as BookOpen, Bt as Code, Dt as FileQuestionMark, Et as FileText, F as RotateCcw, Ft as Download, I as RefreshCw, L as RectangleEllipsis, N as Route, O as Settings, Ot as FileOutput, Pt as Ear, Q as Palette, Qt as Bot, S as Shield, Ut as ClipboardList, Vt as Cloud, Zt as Brain, at as MessageCircle, bt as Funnel, ct as Lock, d as Upload, et as Package, ft as LayoutDashboard, ht as History, i as Wrench, j as Search, k as Settings2, l as Volume2, nt as Mic, r as X, tt as Monitor, u as Users, x as Sparkles, yt as Globe } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, I as ConfirmDialog, L as Spinner, N as Select, P as SelectOption, _ as CardHeader, f as Label, h as CardContent, j as ListItem, m as Card, o as Switch, p as Input, v as CardTitle, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { r as useI18n } from "./i18n-Zn9FHQtI.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { u as PluginSlot } from "./index-CeRydpmd.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
//#region web/src/lib/nested.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_compiler_runtime = require_compiler_runtime();
function getNestedValue(obj, path) {
	const parts = path.split(".");
	let cur = obj;
	for (const p of parts) {
		if (cur == null || typeof cur !== "object") return void 0;
		cur = cur[p];
	}
	return cur;
}
function setNestedValue(obj, path, value) {
	const clone = structuredClone(obj);
	const parts = path.split(".");
	let cur = clone;
	for (let i = 0; i < parts.length - 1; i++) {
		if (cur[parts[i]] == null || typeof cur[parts[i]] !== "object") cur[parts[i]] = {};
		cur = cur[parts[i]];
	}
	cur[parts[parts.length - 1]] = value;
	return clone;
}
//#endregion
//#region web/src/components/AutoField.tsx
var import_jsx_runtime = require_jsx_runtime();
function FieldHint(t0) {
	const $ = (0, import_compiler_runtime.c)(7);
	const { schema, schemaKey } = t0;
	const keyPath = schemaKey.includes(".") ? schemaKey : "";
	const description = schema.description ? String(schema.description) : "";
	if (!keyPath && !description) return null;
	let t1;
	if ($[0] !== keyPath) {
		t1 = keyPath && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-mono text-text-tertiary",
			children: keyPath
		});
		$[0] = keyPath;
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	if ($[2] !== description) {
		t2 = description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-text-secondary",
			children: description
		});
		$[2] = description;
		$[3] = t2;
	} else t2 = $[3];
	let t3;
	if ($[4] !== t1 || $[5] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-0.5",
			children: [t1, t2]
		});
		$[4] = t1;
		$[5] = t2;
		$[6] = t3;
	} else t3 = $[6];
	return t3;
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function formatScalar(value) {
	if (value === void 0 || value === null) return "";
	if (typeof value === "string") return value;
	if (typeof value === "number" || typeof value === "boolean") return String(value);
	return JSON.stringify(value);
}
function NestedValueEditor(t0) {
	const $ = (0, import_compiler_runtime.c)(20);
	const { fieldKey, value, onChange } = t0;
	if (isRecord(value)) {
		let t1;
		if ($[0] !== value) {
			t1 = Object.entries(value);
			$[0] = value;
			$[1] = t1;
		} else t1 = $[1];
		let t2;
		if ($[2] !== fieldKey || $[3] !== onChange || $[4] !== t1 || $[5] !== value) {
			t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 border border-border p-2",
				children: t1.map((t3) => {
					const [subKey, subVal] = t3;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs text-muted-foreground",
							children: subKey
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NestedValueEditor, {
							fieldKey: `${fieldKey}.${subKey}`,
							value: subVal,
							onChange: (next) => onChange({
								...value,
								[subKey]: next
							})
						})]
					}, subKey);
				})
			});
			$[2] = fieldKey;
			$[3] = onChange;
			$[4] = t1;
			$[5] = value;
			$[6] = t2;
		} else t2 = $[6];
		return t2;
	}
	if (Array.isArray(value)) {
		let t1;
		if ($[7] !== fieldKey || $[8] !== onChange || $[9] !== value) {
			t1 = value.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
					className: "text-xs text-muted-foreground",
					children: ["Item ", index + 1]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NestedValueEditor, {
					fieldKey: `${fieldKey}.${index}`,
					value: item,
					onChange: (next_0) => onChange(value.map((existing, i) => i === index ? next_0 : existing))
				})]
			}, `${fieldKey}.${index}`));
			$[7] = fieldKey;
			$[8] = onChange;
			$[9] = value;
			$[10] = t1;
		} else t1 = $[10];
		let t2;
		if ($[11] !== t1) {
			t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				children: t1
			});
			$[11] = t1;
			$[12] = t2;
		} else t2 = $[12];
		return t2;
	}
	let t1;
	if ($[13] !== value) {
		t1 = formatScalar(value);
		$[13] = value;
		$[14] = t1;
	} else t1 = $[14];
	let t2;
	if ($[15] !== onChange) {
		t2 = (e) => onChange(e.target.value);
		$[15] = onChange;
		$[16] = t2;
	} else t2 = $[16];
	let t3;
	if ($[17] !== t1 || $[18] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: t1,
			onChange: t2,
			className: "text-xs"
		});
		$[17] = t1;
		$[18] = t2;
		$[19] = t3;
	} else t3 = $[19];
	return t3;
}
function AutoField(t0) {
	const $ = (0, import_compiler_runtime.c)(107);
	const { schemaKey, schema, value, onChange } = t0;
	let t1;
	if ($[0] !== schemaKey) {
		const rawLabel = schemaKey.split(".").pop() ?? schemaKey;
		let t2;
		if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
			t2 = /\b\w/g;
			$[2] = t2;
		} else t2 = $[2];
		t1 = rawLabel.replace(/_/g, " ").replace(t2, _temp);
		$[0] = schemaKey;
		$[1] = t1;
	} else t1 = $[1];
	const label = t1;
	if (isRecord(value) || Array.isArray(value) && value.some(_temp2)) {
		let t2;
		if ($[3] !== label) {
			t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-xs font-medium",
				children: label
			});
			$[3] = label;
			$[4] = t2;
		} else t2 = $[4];
		let t3;
		if ($[5] !== schema || $[6] !== schemaKey) {
			t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldHint, {
				schema,
				schemaKey
			});
			$[5] = schema;
			$[6] = schemaKey;
			$[7] = t3;
		} else t3 = $[7];
		let t4;
		if ($[8] !== onChange || $[9] !== schemaKey || $[10] !== value) {
			t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NestedValueEditor, {
				fieldKey: schemaKey,
				value,
				onChange
			});
			$[8] = onChange;
			$[9] = schemaKey;
			$[10] = value;
			$[11] = t4;
		} else t4 = $[11];
		let t5;
		if ($[12] !== t2 || $[13] !== t3 || $[14] !== t4) {
			t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 border border-border p-3",
				children: [
					t2,
					t3,
					t4
				]
			});
			$[12] = t2;
			$[13] = t3;
			$[14] = t4;
			$[15] = t5;
		} else t5 = $[15];
		return t5;
	}
	if (schema.type === "boolean") {
		let t2;
		if ($[16] !== label) {
			t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-sm",
				children: label
			});
			$[16] = label;
			$[17] = t2;
		} else t2 = $[17];
		let t3;
		if ($[18] !== schema || $[19] !== schemaKey) {
			t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldHint, {
				schema,
				schemaKey
			});
			$[18] = schema;
			$[19] = schemaKey;
			$[20] = t3;
		} else t3 = $[20];
		let t4;
		if ($[21] !== t2 || $[22] !== t3) {
			t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-0.5",
				children: [t2, t3]
			});
			$[21] = t2;
			$[22] = t3;
			$[23] = t4;
		} else t4 = $[23];
		const t5 = !!value;
		let t6;
		if ($[24] !== onChange || $[25] !== t5) {
			t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				checked: t5,
				onCheckedChange: onChange
			});
			$[24] = onChange;
			$[25] = t5;
			$[26] = t6;
		} else t6 = $[26];
		let t7;
		if ($[27] !== t4 || $[28] !== t6) {
			t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-4",
				children: [t4, t6]
			});
			$[27] = t4;
			$[28] = t6;
			$[29] = t7;
		} else t7 = $[29];
		return t7;
	}
	if (schema.type === "select") {
		let t2;
		if ($[30] !== schema.options) {
			t2 = schema.options ?? [];
			$[30] = schema.options;
			$[31] = t2;
		} else t2 = $[31];
		const options = t2;
		let t3;
		if ($[32] !== label) {
			t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-sm",
				children: label
			});
			$[32] = label;
			$[33] = t3;
		} else t3 = $[33];
		let t4;
		if ($[34] !== schema || $[35] !== schemaKey) {
			t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldHint, {
				schema,
				schemaKey
			});
			$[34] = schema;
			$[35] = schemaKey;
			$[36] = t4;
		} else t4 = $[36];
		const t5 = String(value ?? "");
		let t6;
		if ($[37] !== onChange) {
			t6 = (v) => onChange(v);
			$[37] = onChange;
			$[38] = t6;
		} else t6 = $[38];
		let t7;
		if ($[39] !== options) {
			t7 = options.map(_temp3);
			$[39] = options;
			$[40] = t7;
		} else t7 = $[40];
		let t8;
		if ($[41] !== t5 || $[42] !== t6 || $[43] !== t7) {
			t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value: t5,
				onValueChange: t6,
				children: t7
			});
			$[41] = t5;
			$[42] = t6;
			$[43] = t7;
			$[44] = t8;
		} else t8 = $[44];
		let t9;
		if ($[45] !== t3 || $[46] !== t4 || $[47] !== t8) {
			t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [
					t3,
					t4,
					t8
				]
			});
			$[45] = t3;
			$[46] = t4;
			$[47] = t8;
			$[48] = t9;
		} else t9 = $[48];
		return t9;
	}
	if (schema.type === "number") {
		let t2;
		if ($[49] !== label) {
			t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-sm",
				children: label
			});
			$[49] = label;
			$[50] = t2;
		} else t2 = $[50];
		let t3;
		if ($[51] !== schema || $[52] !== schemaKey) {
			t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldHint, {
				schema,
				schemaKey
			});
			$[51] = schema;
			$[52] = schemaKey;
			$[53] = t3;
		} else t3 = $[53];
		const t4 = value === void 0 || value === null ? "" : String(value);
		let t5;
		if ($[54] !== onChange) {
			t5 = (e) => {
				const raw = e.target.value;
				if (raw === "") {
					onChange(0);
					return;
				}
				const n = Number(raw);
				if (!Number.isNaN(n)) onChange(n);
			};
			$[54] = onChange;
			$[55] = t5;
		} else t5 = $[55];
		let t6;
		if ($[56] !== t4 || $[57] !== t5) {
			t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "number",
				value: t4,
				onChange: t5
			});
			$[56] = t4;
			$[57] = t5;
			$[58] = t6;
		} else t6 = $[58];
		let t7;
		if ($[59] !== t2 || $[60] !== t3 || $[61] !== t6) {
			t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [
					t2,
					t3,
					t6
				]
			});
			$[59] = t2;
			$[60] = t3;
			$[61] = t6;
			$[62] = t7;
		} else t7 = $[62];
		return t7;
	}
	if (schema.type === "text") {
		let t2;
		if ($[63] !== label) {
			t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-sm",
				children: label
			});
			$[63] = label;
			$[64] = t2;
		} else t2 = $[64];
		let t3;
		if ($[65] !== schema || $[66] !== schemaKey) {
			t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldHint, {
				schema,
				schemaKey
			});
			$[65] = schema;
			$[66] = schemaKey;
			$[67] = t3;
		} else t3 = $[67];
		const t4 = String(value ?? "");
		let t5;
		if ($[68] !== onChange) {
			t5 = (e_0) => onChange(e_0.target.value);
			$[68] = onChange;
			$[69] = t5;
		} else t5 = $[69];
		let t6;
		if ($[70] !== t4 || $[71] !== t5) {
			t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: "flex min-h-[80px] w-full border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
				value: t4,
				onChange: t5
			});
			$[70] = t4;
			$[71] = t5;
			$[72] = t6;
		} else t6 = $[72];
		let t7;
		if ($[73] !== t2 || $[74] !== t3 || $[75] !== t6) {
			t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [
					t2,
					t3,
					t6
				]
			});
			$[73] = t2;
			$[74] = t3;
			$[75] = t6;
			$[76] = t7;
		} else t7 = $[76];
		return t7;
	}
	if (schema.type === "list") {
		let t2;
		if ($[77] !== label) {
			t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-sm",
				children: label
			});
			$[77] = label;
			$[78] = t2;
		} else t2 = $[78];
		let t3;
		if ($[79] !== schema || $[80] !== schemaKey) {
			t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldHint, {
				schema,
				schemaKey
			});
			$[79] = schema;
			$[80] = schemaKey;
			$[81] = t3;
		} else t3 = $[81];
		let t4;
		if ($[82] !== value) {
			t4 = Array.isArray(value) ? value.join(", ") : String(value ?? "");
			$[82] = value;
			$[83] = t4;
		} else t4 = $[83];
		let t5;
		if ($[84] !== onChange) {
			t5 = (e_1) => onChange(e_1.target.value.split(",").map(_temp4).filter(Boolean));
			$[84] = onChange;
			$[85] = t5;
		} else t5 = $[85];
		let t6;
		if ($[86] !== t4 || $[87] !== t5) {
			t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: t4,
				onChange: t5,
				placeholder: "comma-separated values"
			});
			$[86] = t4;
			$[87] = t5;
			$[88] = t6;
		} else t6 = $[88];
		let t7;
		if ($[89] !== t2 || $[90] !== t3 || $[91] !== t6) {
			t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [
					t2,
					t3,
					t6
				]
			});
			$[89] = t2;
			$[90] = t3;
			$[91] = t6;
			$[92] = t7;
		} else t7 = $[92];
		return t7;
	}
	let t2;
	if ($[93] !== label) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-sm",
			children: label
		});
		$[93] = label;
		$[94] = t2;
	} else t2 = $[94];
	let t3;
	if ($[95] !== schema || $[96] !== schemaKey) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldHint, {
			schema,
			schemaKey
		});
		$[95] = schema;
		$[96] = schemaKey;
		$[97] = t3;
	} else t3 = $[97];
	const t4 = String(value ?? "");
	let t5;
	if ($[98] !== onChange) {
		t5 = (e_2) => onChange(e_2.target.value);
		$[98] = onChange;
		$[99] = t5;
	} else t5 = $[99];
	let t6;
	if ($[100] !== t4 || $[101] !== t5) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: t4,
			onChange: t5
		});
		$[100] = t4;
		$[101] = t5;
		$[102] = t6;
	} else t6 = $[102];
	let t7;
	if ($[103] !== t2 || $[104] !== t3 || $[105] !== t6) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-1.5",
			children: [
				t2,
				t3,
				t6
			]
		});
		$[103] = t2;
		$[104] = t3;
		$[105] = t6;
		$[106] = t7;
	} else t7 = $[106];
	return t7;
}
function _temp4(s) {
	return s.trim();
}
function _temp3(opt) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
		value: opt,
		children: opt || "(none)"
	}, opt);
}
function _temp2(item) {
	return isRecord(item);
}
function _temp(c) {
	return c.toUpperCase();
}
//#endregion
//#region web/src/pages/ConfigPage.tsx
var CATEGORY_ICONS = {
	general: Settings,
	agent: Bot,
	terminal: Monitor,
	display: Palette,
	delegation: Users,
	memory: Brain,
	compression: Package,
	security: Lock,
	browser: Globe,
	voice: Mic,
	tts: Volume2,
	stt: Ear,
	logging: ClipboardList,
	discord: MessageCircle,
	auxiliary: Wrench,
	bedrock: Cloud,
	curator: Sparkles,
	kanban: LayoutDashboard,
	model_catalog: BookOpen,
	openrouter: Route,
	sessions: History,
	tool_loop_guardrails: Shield,
	tool_output: FileOutput,
	updates: RefreshCw
};
function CategoryIcon(t0) {
	const $ = (0, import_compiler_runtime.c)(3);
	const { category, className } = t0;
	const Icon = CATEGORY_ICONS[category] ?? FileQuestionMark;
	const t1 = className ?? "h-4 w-4";
	let t2;
	if ($[0] !== Icon || $[1] !== t1) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: t1 });
		$[0] = Icon;
		$[1] = t1;
		$[2] = t2;
	} else t2 = $[2];
	return t2;
}
function ConfigPage() {
	const [config, setConfig] = (0, import_react.useState)(null);
	const [schema, setSchema] = (0, import_react.useState)(null);
	const [categoryOrder, setCategoryOrder] = (0, import_react.useState)([]);
	const [defaults, setDefaults] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [yamlMode, setYamlMode] = (0, import_react.useState)(false);
	const [yamlText, setYamlText] = (0, import_react.useState)("");
	const [yamlLoading, setYamlLoading] = (0, import_react.useState)(false);
	const [yamlSaving, setYamlSaving] = (0, import_react.useState)(false);
	const [configPath, setConfigPath] = (0, import_react.useState)(null);
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("");
	const [confirmReset, setConfirmReset] = (0, import_react.useState)(false);
	const { toast, showToast } = useToast();
	const fileInputRef = (0, import_react.useRef)(null);
	const { t } = useI18n();
	const { setEnd } = usePageHeader();
	(0, import_react.useLayoutEffect)(() => {
		if (!config || !schema) {
			setEnd(null);
			return;
		}
		setEnd(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full min-w-0 sm:max-w-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "h-8 pl-8 pr-7 text-xs",
					placeholder: t.common.search,
					value: searchQuery,
					onChange: (e) => setSearchQuery(e.target.value)
				}),
				searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ghost: true,
					size: "xs",
					className: "absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
					onClick: () => setSearchQuery(""),
					"aria-label": t.common.clear,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})
			]
		}));
		return () => setEnd(null);
	}, [
		config,
		schema,
		searchQuery,
		setEnd,
		t.common.clear,
		t.common.search
	]);
	function prettyCategoryName(cat) {
		const key = cat;
		if (t.config.categories[key]) return t.config.categories[key];
		return cat.charAt(0).toUpperCase() + cat.slice(1);
	}
	(0, import_react.useEffect)(() => {
		api.getConfig().then(setConfig).catch(() => {});
		api.getSchema().then((resp) => {
			const fields = { ...resp.fields };
			delete fields["memory.provider"];
			setSchema(fields);
			setCategoryOrder(resp.category_order ?? []);
		}).catch(() => {});
		api.getDefaults().then(setDefaults).catch(() => {});
		api.getConfigRaw().then((resp_0) => {
			if (resp_0.path) setConfigPath(resp_0.path);
		}).catch(() => {});
		api.getStatus().then((resp_1) => setConfigPath((prev) => prev ?? resp_1.config_path)).catch(() => {});
	}, []);
	(0, import_react.useEffect)(() => {
		if (categoryOrder.length > 0 && !activeCategory) setActiveCategory(categoryOrder[0]);
	}, [categoryOrder, activeCategory]);
	(0, import_react.useEffect)(() => {
		if (yamlMode) {
			setYamlLoading(true);
			api.getConfigRaw().then((resp_2) => setYamlText(resp_2.yaml)).catch(() => showToast(t.config.failedToLoadRaw, "error")).finally(() => setYamlLoading(false));
		}
	}, [yamlMode]);
	const categories = (0, import_react.useMemo)(() => {
		if (!schema) return [];
		const allCats = [...new Set(Object.values(schema).map((s) => String(s.category ?? "general")))];
		const ordered = categoryOrder.filter((c) => allCats.includes(c));
		const extra = allCats.filter((c_0) => !categoryOrder.includes(c_0)).sort();
		return [...ordered, ...extra];
	}, [schema, categoryOrder]);
	const categoryCounts = (0, import_react.useMemo)(() => {
		if (!schema) return {};
		const counts = {};
		for (const s_0 of Object.values(schema)) {
			const cat_0 = String(s_0.category ?? "general");
			counts[cat_0] = (counts[cat_0] || 0) + 1;
		}
		return counts;
	}, [schema]);
	const isSearching = searchQuery.trim().length > 0;
	const lowerSearch = searchQuery.toLowerCase();
	const searchMatchedFields = (0, import_react.useMemo)(() => {
		if (!isSearching || !schema) return [];
		return Object.entries(schema).filter(([key_0, s_1]) => {
			const humanLabel = (key_0.split(".").pop() ?? key_0).replace(/_/g, " ");
			return key_0.toLowerCase().includes(lowerSearch) || humanLabel.toLowerCase().includes(lowerSearch) || String(s_1.category ?? "").toLowerCase().includes(lowerSearch) || String(s_1.description ?? "").toLowerCase().includes(lowerSearch);
		});
	}, [
		isSearching,
		lowerSearch,
		schema
	]);
	const activeFields = (0, import_react.useMemo)(() => {
		if (!schema || isSearching) return [];
		return Object.entries(schema).filter(([, s_2]) => String(s_2.category ?? "general") === activeCategory);
	}, [
		schema,
		activeCategory,
		isSearching
	]);
	const handleSave = async () => {
		if (!config) return;
		setSaving(true);
		try {
			await api.saveConfig(config);
			showToast(t.config.configSaved, "success");
		} catch (e_0) {
			showToast(`${t.config.failedToSave}: ${errorMessage(e_0)}`, "error");
		} finally {
			setSaving(false);
		}
	};
	const handleYamlSave = async () => {
		setYamlSaving(true);
		try {
			await api.saveConfigRaw(yamlText);
			showToast(t.config.yamlConfigSaved, "success");
			api.getConfig().then(setConfig).catch(() => {});
		} catch (e_1) {
			showToast(`${t.config.failedToSaveYaml}: ${errorMessage(e_1)}`, "error");
		} finally {
			setYamlSaving(false);
		}
	};
	const handleReset = () => {
		if (!defaults || !config) return;
		if ((isSearching ? searchMatchedFields : activeFields).length === 0) return;
		setConfirmReset(true);
	};
	const executeReset = () => {
		if (!defaults || !config) return;
		setConfirmReset(false);
		const scopedFields_0 = isSearching ? searchMatchedFields : activeFields;
		if (scopedFields_0.length === 0) return;
		const scopeLabel = isSearching ? t.config.searchResults : prettyCategoryName(activeCategory);
		let next = config;
		for (const [key_1] of scopedFields_0) next = setNestedValue(next, key_1, getNestedValue(defaults, key_1));
		setConfig(next);
		showToast(t.config.resetScopeToast.replace("{scope}", scopeLabel), "success");
	};
	const handleExport = () => {
		if (!config) return;
		const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "hermes-config.json";
		a.click();
		URL.revokeObjectURL(url);
	};
	const handleImport = (e_2) => {
		const file = e_2.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			try {
				const imported = JSON.parse(reader.result);
				setConfig(imported);
				showToast(t.config.configImported, "success");
			} catch {
				showToast(t.config.invalidJson, "error");
			}
		};
		reader.readAsText(file);
	};
	if (!config || !schema) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-2xl text-primary" })
	});
	const renderFields = (fields_0, showCategory = false) => {
		let lastSection = "";
		let lastCat = "";
		return fields_0.map(([key_2, s_3]) => {
			const parts = key_2.split(".");
			const section = parts.length > 1 ? parts[0] : "";
			const cat_1 = String(s_3.category ?? "general");
			const showCatBadge = showCategory && cat_1 !== lastCat;
			const showSection = !showCategory && section && section !== lastSection && section !== activeCategory;
			lastSection = section;
			lastCat = cat_1;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				showCatBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 pt-4 pb-2 first:pt-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, {
							category: cat_1,
							className: "h-4 w-4 text-muted-foreground"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mondwest text-display text-xs font-semibold tracking-wider text-muted-foreground",
							children: prettyCategoryName(cat_1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 border-t border-border" })
					]
				}),
				showSection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 pt-4 pb-2 first:pt-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mondwest text-display text-xs font-semibold tracking-wider text-muted-foreground",
						children: section.replace(/_/g, " ")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 border-t border-border" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoField, {
						schemaKey: key_2,
						schema: s_3,
						value: getNestedValue(config, key_2),
						onChange: (v) => setConfig(setNestedValue(config, key_2, v))
					})
				})
			] }, key_2);
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "config:top" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2 sm:flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "min-w-0 flex-1 break-words text-xs text-muted-foreground bg-muted/50 px-2 py-0.5",
						children: configPath ?? t.config.configPath
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1.5 sm:shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							ghost: true,
							size: "icon",
							onClick: handleExport,
							title: t.config.exportConfig,
							"aria-label": t.config.exportConfig,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							ghost: true,
							size: "icon",
							onClick: () => fileInputRef.current?.click(),
							title: t.config.importConfig,
							"aria-label": t.config.importConfig,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileInputRef,
							type: "file",
							accept: ".json",
							className: "hidden",
							onChange: handleImport
						}),
						!yamlMode && (() => {
							const resetScopeLabel = isSearching ? t.config.searchResults : prettyCategoryName(activeCategory);
							const resetTitle = t.config.resetScopeTooltip.replace("{scope}", resetScopeLabel);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								ghost: true,
								size: "icon",
								onClick: handleReset,
								title: resetTitle,
								"aria-label": resetTitle,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
							});
						})(),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px h-5 bg-border mx-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							outlined: !yamlMode,
							onClick: () => setYamlMode(!yamlMode),
							prefix: yamlMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RectangleEllipsis, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Code, {}),
							children: yamlMode ? t.common.form : "YAML"
						}),
						yamlMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							className: "uppercase",
							onClick: handleYamlSave,
							disabled: yamlSaving,
							children: yamlSaving ? t.common.saving : t.common.save
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							className: "uppercase",
							onClick: handleSave,
							disabled: saving,
							children: saving ? t.common.saving : t.common.save
						})
					]
				})]
			}),
			yamlMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "py-3 px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
					className: "text-sm flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), t.config.rawYaml]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-0",
				children: yamlLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center py-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-xl text-primary" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "flex min-h-[600px] w-full bg-transparent px-4 py-3 text-sm font-mono leading-relaxed placeholder:text-muted-foreground focus-visible:outline-none border-t border-border",
					value: yamlText,
					onChange: (e_3) => setYamlText(e_3.target.value),
					spellCheck: false
				})
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					"aria-label": t.config.filters,
					className: "sm:w-56 sm:shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:sticky sm:top-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col border border-border bg-muted/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden sm:flex items-center gap-2 px-3 py-2 border-b border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3 w-3 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mondwest text-display text-xs tracking-[0.12em] text-text-secondary",
										children: t.config.filters
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden sm:block px-3 pt-2 pb-1 font-mondwest text-display text-xs tracking-[0.12em] text-text-tertiary",
									children: t.config.sections
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex sm:flex-col gap-1 sm:gap-px p-2 sm:pt-1 overflow-x-auto sm:overflow-x-visible scrollbar-none sm:max-h-[calc(100vh-260px)] sm:overflow-y-auto",
									children: categories.map((cat_2) => {
										const isActive = !isSearching && activeCategory === cat_2;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
											active: isActive,
											onClick: () => {
												setSearchQuery("");
												setActiveCategory(cat_2);
											},
											className: "rounded-none whitespace-nowrap px-2 py-1 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, {
													category: cat_2,
													className: "h-3.5 w-3.5 shrink-0"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "flex-1 truncate",
													children: prettyCategoryName(cat_2)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `text-xs tabular-nums ${isActive ? "text-text-secondary" : "text-text-tertiary"}`,
													children: categoryCounts[cat_2] || 0
												})
											]
										}, cat_2);
									})
								})
							]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 min-w-0",
					children: isSearching ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "py-3 px-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "text-sm flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), t.config.searchResults]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "secondary",
								className: "text-xs",
								children: [
									searchMatchedFields.length,
									" ",
									t.config.fields.replace("{s}", searchMatchedFields.length !== 1 ? "s" : "")
								]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "grid gap-2 px-4 pb-4",
						children: searchMatchedFields.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground text-center py-8",
							children: t.config.noFieldsMatch.replace("{query}", searchQuery)
						}) : renderFields(searchMatchedFields, true)
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "py-3 px-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
								className: "text-sm flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, {
									category: activeCategory,
									className: "h-4 w-4"
								}), prettyCategoryName(activeCategory)]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "secondary",
								className: "text-xs",
								children: [
									activeFields.length,
									" ",
									t.config.fields.replace("{s}", activeFields.length !== 1 ? "s" : "")
								]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "grid gap-2 px-4 pb-4",
						children: renderFields(activeFields)
					})] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "config:bottom" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmReset,
				onCancel: () => setConfirmReset(false),
				onConfirm: executeReset,
				title: t.config.confirmResetScope.replace("{scope}", isSearching ? t.config.searchResults : prettyCategoryName(activeCategory)),
				description: `This will reset ${(isSearching ? searchMatchedFields : activeFields).length} field(s) to their default values.`,
				destructive: true,
				confirmLabel: t.config.resetDefaults
			})
		]
	});
}
//#endregion
export { ConfigPage as default };
