import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, m as require_react_dom, n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { I as RefreshCw, It as DollarSign, Jt as ChevronDown, Rt as Cpu, Zt as Brain, b as Star, i as Wrench, k as Settings2, kt as Eye, n as Zap, r as X } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, L as Spinner, _ as CardHeader, h as CardContent, m as Card, o as Switch, s as Stats, v as CardTitle } from "./ui-vIdGzE07.js";
import { i as timeAgo, r as themedBody, t as cn } from "./utils-XzxpPQdK.js";
import { r as useI18n } from "./i18n-Zn9FHQtI.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { n as ModelPickerDialog, r as assignmentToPickerCurrent, t as ModelReloadConfirm } from "./ModelReloadConfirm-Dm6sEujK.js";
import { u as PluginSlot } from "./index-CeRydpmd.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
import { t as useModalBehavior } from "./useModalBehavior-DSqJduTw.js";
import { t as ConfirmDialog } from "./ConfirmDialog-D-vC_4KK.js";
//#region apps/shared/src/format.ts
function compactNumber(value) {
	const num = Number(value ?? 0);
	if (!Number.isFinite(num) || num <= 0) return "0";
	const scaled = (v, suffix) => `${v.toFixed(1).replace(/\.0$/, "")}${suffix}`;
	if (num >= 999950) return scaled(num / 1e6, "M");
	if (num >= 999.5) return scaled(num / 1e3, "k");
	return `${Math.round(num)}`;
}
//#endregion
//#region web/src/lib/aux-tasks.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var import_compiler_runtime = require_compiler_runtime();
var BUILTIN_AUX_TASKS = [
	{
		key: "vision",
		label: "Vision",
		hint: "Image analysis"
	},
	{
		key: "compression",
		label: "Compression",
		hint: "Context compaction"
	},
	{
		key: "skills_hub",
		label: "Skills Hub",
		hint: "Skill search"
	},
	{
		key: "approval",
		label: "Approval",
		hint: "Smart auto-approve"
	},
	{
		key: "mcp",
		label: "MCP",
		hint: "MCP tool routing"
	},
	{
		key: "title_generation",
		label: "Title Gen",
		hint: "Session titles"
	},
	{
		key: "review",
		label: "Review",
		hint: "/review subagent"
	},
	{
		key: "voice_chat",
		label: "Voice Chat",
		hint: "Spoken voice-mode replies"
	},
	{
		key: "triage_specifier",
		label: "Triage Specifier",
		hint: "Kanban spec fleshing"
	},
	{
		key: "kanban_decomposer",
		label: "Kanban Decomposer",
		hint: "Task decomposition"
	},
	{
		key: "profile_describer",
		label: "Profile Describer",
		hint: "Auto profile descriptions"
	},
	{
		key: "curator",
		label: "Curator",
		hint: "Skill-usage review"
	}
];
/**
* Rows the Models page renders: the built-ins, then every task the backend
* reported that is not a built-in — plugin-registered auxiliary tasks
* (`PluginContext.register_auxiliary_task`), labelled by the plugin. Older
* backends never send extra rows, so this is a no-op against them; built-ins
* stay first so the layout is stable.
*/
function auxTaskRows(tasks) {
	const builtin = new Set(BUILTIN_AUX_TASKS.map((t) => t.key));
	const extra = (tasks ?? []).filter((entry) => !builtin.has(entry.task)).map((entry) => ({
		key: entry.task,
		label: entry.label || entry.task,
		hint: entry.hint || "",
		...entry.inherit_from ? { inheritFrom: entry.inherit_from } : {}
	}));
	return extra.length ? [...BUILTIN_AUX_TASKS, ...extra] : [...BUILTIN_AUX_TASKS];
}
function auxTaskLabel(tasks, key) {
	return auxTaskRows(tasks).find((t) => t.key === key)?.label ?? key;
}
//#endregion
//#region web/src/lib/dashboard-modal-shell.ts
/**
* Shared dashboard dialog shell classes.
*
* Page `<Card>` defaults to `bg-background-base/80` (glass). That looks fine
* on the page canvas, but as a modal panel it lets the Models page bleed
* through and kills readability — especially on Cyberpunk / mobile.
*
* Modal panels must use opaque `bg-card`; backdrops use the same z-index
* band as Auxiliary / Confirm dialogs so they sit above page chrome.
*
* Callers must `createPortal(..., document.body)` — `z-[100]` alone cannot
* escape the dashboard column's `relative z-2` stacking context (see
* ModelPickerDialog / ToolsetConfigDrawer).
*/
var DASHBOARD_MODAL_BACKDROP = "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4";
var DASHBOARD_MODAL_PANEL = "relative w-full border border-border bg-card shadow-2xl";
/**
* Outer modals that host a nested picker (e.g. MoA → ModelPickerDialog)
* must ignore Escape while the picker is open; the picker owns that key.
*/
function shouldCloseOuterModalOnEscape(nestedPickerOpen) {
	return !nestedPickerOpen;
}
//#endregion
//#region web/src/pages/ModelsPage.tsx
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
function formatTokens(n) {
	if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
	if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
	return String(n);
}
function formatCost(n) {
	if (n >= 1) return `$${n.toFixed(2)}`;
	if (n >= .01) return `$${n.toFixed(3)}`;
	if (n > 0) return `$${n.toFixed(4)}`;
	return "$0";
}
/** Short model name: strip vendor prefix like "openrouter/" or "anthropic/". */
function shortModelName(model) {
	const slashIdx = model.indexOf("/");
	if (slashIdx > 0) return model.slice(slashIdx + 1);
	return model;
}
/** Extract vendor prefix from a model string like "anthropic/claude-opus-4.7" → "anthropic". */
function modelVendor(model, fallback) {
	const slashIdx = model.indexOf("/");
	if (slashIdx > 0) return model.slice(0, slashIdx);
	return fallback || "";
}
function TokenBar(t0) {
	const $ = (0, import_compiler_runtime.c)(16);
	const { input, output, cacheRead, reasoning } = t0;
	const total = input + output + cacheRead + reasoning;
	if (total === 0) return null;
	let t1;
	let t2;
	let t3;
	let t4;
	if ($[0] !== cacheRead || $[1] !== input || $[2] !== output || $[3] !== reasoning || $[4] !== total) {
		const segments = [
			{
				value: cacheRead,
				color: "#60a5fa",
				label: "Cache Read"
			},
			{
				value: reasoning,
				color: "#c084fc",
				label: "Reasoning"
			},
			{
				value: input,
				color: "var(--series-input-token)",
				label: "Input"
			},
			{
				value: output,
				color: "var(--series-output-token)",
				label: "Output"
			}
		].filter(_temp);
		t3 = "space-y-1.5";
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative flex min-h-[1.5rem] w-full items-stretch overflow-hidden",
			children: segments.map((s_0, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative flex items-center transition-all duration-300",
				style: {
					backgroundColor: `color-mix(in srgb, ${s_0.color} 70%, transparent)`,
					width: `${s_0.value / total * 100}%`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 opacity-30",
					style: { backgroundImage: "repeating-linear-gradient(to right, transparent 0 0.4rem, currentColor 0.4rem calc(0.4rem + 1px))" }
				})
			}, i))
		});
		t1 = "flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-text-secondary";
		t2 = segments.map(_temp2);
		$[0] = cacheRead;
		$[1] = input;
		$[2] = output;
		$[3] = reasoning;
		$[4] = total;
		$[5] = t1;
		$[6] = t2;
		$[7] = t3;
		$[8] = t4;
	} else {
		t1 = $[5];
		t2 = $[6];
		t3 = $[7];
		t4 = $[8];
	}
	let t5;
	if ($[9] !== t1 || $[10] !== t2) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: t1,
			children: t2
		});
		$[9] = t1;
		$[10] = t2;
		$[11] = t5;
	} else t5 = $[11];
	let t6;
	if ($[12] !== t3 || $[13] !== t4 || $[14] !== t5) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t3,
			children: [t4, t5]
		});
		$[12] = t3;
		$[13] = t4;
		$[14] = t5;
		$[15] = t6;
	} else t6 = $[15];
	return t6;
}
function _temp2(s_1, i_0) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex items-center gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-block h-1.5 w-1.5 rounded-full",
				style: { backgroundColor: s_1.color }
			}),
			s_1.label,
			" ",
			formatTokens(s_1.value)
		]
	}, i_0);
}
function _temp(s) {
	return s.value > 0;
}
function CapabilityBadges(t0) {
	const $ = (0, import_compiler_runtime.c)(13);
	const { capabilities } = t0;
	if (!(capabilities.supports_tools || capabilities.supports_vision || capabilities.supports_reasoning || capabilities.model_family)) return null;
	let t1;
	if ($[0] !== capabilities.supports_tools) {
		t1 = capabilities.supports_tools && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1 bg-success/10 px-1.5 py-0.5 text-xs font-medium text-success",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-2.5 w-2.5" }), " Tools"]
		});
		$[0] = capabilities.supports_tools;
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	if ($[2] !== capabilities.supports_vision) {
		t2 = capabilities.supports_vision && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1 bg-blue-500/10 px-1.5 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-2.5 w-2.5" }), " Vision"]
		});
		$[2] = capabilities.supports_vision;
		$[3] = t2;
	} else t2 = $[3];
	let t3;
	if ($[4] !== capabilities.supports_reasoning) {
		t3 = capabilities.supports_reasoning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1 bg-purple-500/10 px-1.5 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-2.5 w-2.5" }), " Reasoning"]
		});
		$[4] = capabilities.supports_reasoning;
		$[5] = t3;
	} else t3 = $[5];
	let t4;
	if ($[6] !== capabilities.model_family) {
		t4 = capabilities.model_family && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex items-center bg-muted px-1.5 py-0.5 text-xs font-medium text-text-secondary",
			children: capabilities.model_family
		});
		$[6] = capabilities.model_family;
		$[7] = t4;
	} else t4 = $[7];
	let t5;
	if ($[8] !== t1 || $[9] !== t2 || $[10] !== t3 || $[11] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-1.5",
			children: [
				t1,
				t2,
				t3,
				t4
			]
		});
		$[8] = t1;
		$[9] = t2;
		$[10] = t3;
		$[11] = t4;
		$[12] = t5;
	} else t5 = $[12];
	return t5;
}
function UseAsMenu({ provider, model, isMain, mainAuxTask, auxTasks, onAssigned }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [pendingConfirm, setPendingConfirm] = (0, import_react.useState)(null);
	const assign = async (scope, task, confirmExpensiveModel = false) => {
		if (!provider || !model) {
			setError("Missing provider/model");
			return;
		}
		setBusy(true);
		setError(null);
		try {
			const result = await api.setModelAssignment({
				confirm_expensive_model: confirmExpensiveModel,
				scope,
				provider,
				model,
				task
			});
			if (result.confirm_required) {
				setPendingConfirm({
					scope,
					task,
					message: result.confirm_message || "This model has unusually high known pricing."
				});
				return;
			}
			onAssigned();
			setOpen(false);
		} catch (e) {
			setError(errorMessage(e));
		} finally {
			setBusy(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onDown = (e_0) => {
			const target = e_0.target;
			if (target && !target.closest?.("[data-use-as-menu]")) setOpen(false);
		};
		window.addEventListener("mousedown", onDown);
		return () => window.removeEventListener("mousedown", onDown);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative", open && "z-20"),
		"data-use-as-menu": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				outlined: true,
				onClick: () => setOpen((v) => !v),
				disabled: busy,
				className: "h-6 px-2 text-xs uppercase",
				prefix: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : null,
				children: ["Use as ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3" })]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-0 top-full mt-1 z-50 min-w-[220px] border border-border bg-card shadow-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => assign("main", ""),
						disabled: busy,
						className: "flex w-full items-center justify-between px-3 py-2 text-xs uppercase hover:bg-muted/50 disabled:opacity-40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3" }), "Main model"]
						}), isMain && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-display text-xs tracking-wider text-primary",
							children: "current"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border/50 px-3 py-1.5 text-display text-xs tracking-wider text-text-tertiary",
						children: "Auxiliary task"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => assign("auxiliary", ""),
						disabled: busy,
						className: "flex w-full items-center justify-between px-3 py-1.5 text-xs uppercase hover:bg-muted/50 disabled:opacity-40",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All auxiliary tasks" })
					}),
					auxTaskRows(auxTasks).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => assign("auxiliary", t.key),
						disabled: busy,
						className: "flex w-full items-center justify-between px-3 py-1.5 text-xs uppercase hover:bg-muted/50 disabled:opacity-40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.label }), mainAuxTask === t.key && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-display text-xs tracking-wider text-primary",
							children: "current"
						})]
					}, t.key)),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 py-2 text-xs text-destructive border-t border-border/50",
						children: error
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!pendingConfirm,
				title: "Expensive Model Warning",
				description: pendingConfirm?.message,
				destructive: true,
				confirmLabel: "Switch anyway",
				cancelLabel: "Cancel",
				loading: busy,
				onCancel: () => setPendingConfirm(null),
				onConfirm: () => {
					const pending = pendingConfirm;
					if (!pending) return;
					setPendingConfirm(null);
					assign(pending.scope, pending.task, true);
				}
			})
		]
	});
}
function ModelCard(t0) {
	const $ = (0, import_compiler_runtime.c)(90);
	const { entry, rank, main, aux, onAssigned, showTokens } = t0;
	const { t } = useI18n();
	let t1;
	if ($[0] !== entry.model || $[1] !== entry.provider) {
		t1 = entry.provider || modelVendor(entry.model);
		$[0] = entry.model;
		$[1] = entry.provider;
		$[2] = t1;
	} else t1 = $[2];
	const provider = t1;
	const totalTokens = entry.input_tokens + entry.output_tokens;
	const caps = entry.capabilities;
	const isMain = !!main && main.provider === provider && main.model === entry.model;
	let t2;
	if ($[3] !== aux || $[4] !== entry.model || $[5] !== provider) {
		t2 = aux.find((a) => a.provider === provider && a.model === entry.model)?.task ?? null;
		$[3] = aux;
		$[4] = entry.model;
		$[5] = provider;
		$[6] = t2;
	} else t2 = $[6];
	const mainAuxTask = t2;
	const t3 = isMain && "ring-1 ring-primary/40";
	let t4;
	if ($[7] !== t3) {
		t4 = cn("min-w-0 max-w-full", t3);
		$[7] = t3;
		$[8] = t4;
	} else t4 = $[8];
	let t5;
	if ($[9] !== rank) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-text-tertiary text-xs font-mono",
			children: ["#", rank]
		});
		$[9] = rank;
		$[10] = t5;
	} else t5 = $[10];
	let t6;
	if ($[11] !== entry.model) {
		t6 = shortModelName(entry.model);
		$[11] = entry.model;
		$[12] = t6;
	} else t6 = $[12];
	let t7;
	if ($[13] !== t6) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
			className: "text-sm font-mono-ui truncate",
			children: t6
		});
		$[13] = t6;
		$[14] = t7;
	} else t7 = $[14];
	let t8;
	if ($[15] !== isMain) {
		t8 = isMain && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-0.5 bg-primary/15 px-1.5 py-0.5 text-display text-xs font-medium tracking-wider text-primary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-2.5 w-2.5" }), " main"]
		});
		$[15] = isMain;
		$[16] = t8;
	} else t8 = $[16];
	let t9;
	if ($[17] !== mainAuxTask) {
		t9 = mainAuxTask && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center bg-purple-500/10 px-1.5 py-0.5 text-display text-xs font-medium tracking-wider text-purple-600 dark:text-purple-400",
			children: ["aux · ", mainAuxTask]
		});
		$[17] = mainAuxTask;
		$[18] = t9;
	} else t9 = $[18];
	let t10;
	if ($[19] !== t5 || $[20] !== t7 || $[21] !== t8 || $[22] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				t5,
				t7,
				t8,
				t9
			]
		});
		$[19] = t5;
		$[20] = t7;
		$[21] = t8;
		$[22] = t9;
		$[23] = t10;
	} else t10 = $[23];
	let t11;
	if ($[24] !== provider) {
		t11 = provider && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: "secondary",
			className: "text-xs",
			children: provider
		});
		$[24] = provider;
		$[25] = t11;
	} else t11 = $[25];
	let t12;
	if ($[26] !== caps.context_window) {
		t12 = caps.context_window && caps.context_window > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-xs text-text-secondary",
			children: [compactNumber(caps.context_window), " ctx"]
		});
		$[26] = caps.context_window;
		$[27] = t12;
	} else t12 = $[27];
	let t13;
	if ($[28] !== caps.max_output_tokens) {
		t13 = caps.max_output_tokens && caps.max_output_tokens > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-xs text-text-secondary",
			children: [compactNumber(caps.max_output_tokens), " out"]
		});
		$[28] = caps.max_output_tokens;
		$[29] = t13;
	} else t13 = $[29];
	let t14;
	if ($[30] !== t11 || $[31] !== t12 || $[32] !== t13) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 mt-1",
			children: [
				t11,
				t12,
				t13
			]
		});
		$[30] = t11;
		$[31] = t12;
		$[32] = t13;
		$[33] = t14;
	} else t14 = $[33];
	let t15;
	if ($[34] !== t10 || $[35] !== t14) {
		t15 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [t10, t14]
		});
		$[34] = t10;
		$[35] = t14;
		$[36] = t15;
	} else t15 = $[36];
	let t16;
	if ($[37] !== entry.sessions || $[38] !== showTokens || $[39] !== t || $[40] !== totalTokens) {
		t16 = showTokens ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-right",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-mono font-semibold",
				children: formatTokens(totalTokens)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-text-tertiary",
				children: t.models.tokens
			})]
		}) : entry.sessions > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-right",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-mono font-semibold",
				children: entry.sessions
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-text-tertiary",
				children: t.models.sessions
			})]
		});
		$[37] = entry.sessions;
		$[38] = showTokens;
		$[39] = t;
		$[40] = totalTokens;
		$[41] = t16;
	} else t16 = $[41];
	let t17;
	if ($[42] !== aux || $[43] !== entry.model || $[44] !== isMain || $[45] !== mainAuxTask || $[46] !== onAssigned || $[47] !== provider) {
		t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseAsMenu, {
			provider,
			model: entry.model,
			isMain,
			mainAuxTask,
			auxTasks: aux,
			onAssigned
		});
		$[42] = aux;
		$[43] = entry.model;
		$[44] = isMain;
		$[45] = mainAuxTask;
		$[46] = onAssigned;
		$[47] = provider;
		$[48] = t17;
	} else t17 = $[48];
	let t18;
	if ($[49] !== t16 || $[50] !== t17) {
		t18 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-end gap-1 shrink-0",
			children: [t16, t17]
		});
		$[49] = t16;
		$[50] = t17;
		$[51] = t18;
	} else t18 = $[51];
	let t19;
	if ($[52] !== t15 || $[53] !== t18) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "pb-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [t15, t18]
			})
		});
		$[52] = t15;
		$[53] = t18;
		$[54] = t19;
	} else t19 = $[54];
	let t20;
	if ($[55] !== entry.api_calls || $[56] !== entry.avg_tokens_per_session || $[57] !== entry.cache_read_tokens || $[58] !== entry.input_tokens || $[59] !== entry.output_tokens || $[60] !== entry.reasoning_tokens || $[61] !== entry.sessions || $[62] !== showTokens || $[63] !== t) {
		t20 = showTokens && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TokenBar, {
			input: entry.input_tokens,
			output: entry.output_tokens,
			cacheRead: entry.cache_read_tokens,
			reasoning: entry.reasoning_tokens
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-2 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono font-semibold",
						children: entry.sessions
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-text-tertiary",
						children: t.models.sessions
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono font-semibold",
						children: formatTokens(entry.avg_tokens_per_session)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-text-tertiary",
						children: t.models.avgPerSession
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono font-semibold",
						children: entry.api_calls > 0 ? formatTokens(entry.api_calls) : "—"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-text-tertiary",
						children: t.models.apiCalls
					})]
				})
			]
		})] });
		$[55] = entry.api_calls;
		$[56] = entry.avg_tokens_per_session;
		$[57] = entry.cache_read_tokens;
		$[58] = entry.input_tokens;
		$[59] = entry.output_tokens;
		$[60] = entry.reasoning_tokens;
		$[61] = entry.sessions;
		$[62] = showTokens;
		$[63] = t;
		$[64] = t20;
	} else t20 = $[64];
	let t21;
	if ($[65] !== entry.estimated_cost || $[66] !== showTokens) {
		t21 = showTokens && entry.estimated_cost > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-2.5 w-2.5" }), formatCost(entry.estimated_cost)]
		});
		$[65] = entry.estimated_cost;
		$[66] = showTokens;
		$[67] = t21;
	} else t21 = $[67];
	let t22;
	if ($[68] !== entry.tool_calls || $[69] !== showTokens || $[70] !== t) {
		t22 = showTokens && entry.tool_calls > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-0.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-2.5 w-2.5" }),
				entry.tool_calls,
				" ",
				t.models.toolCalls
			]
		});
		$[68] = entry.tool_calls;
		$[69] = showTokens;
		$[70] = t;
		$[71] = t22;
	} else t22 = $[71];
	let t23;
	if ($[72] !== t21 || $[73] !== t22) {
		t23 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [t21, t22]
		});
		$[72] = t21;
		$[73] = t22;
		$[74] = t23;
	} else t23 = $[74];
	let t24;
	if ($[75] !== entry.last_used_at) {
		t24 = entry.last_used_at > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: timeAgo(entry.last_used_at) });
		$[75] = entry.last_used_at;
		$[76] = t24;
	} else t24 = $[76];
	let t25;
	if ($[77] !== t23 || $[78] !== t24) {
		t25 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-xs text-text-secondary border-t border-border/30 pt-2",
			children: [t23, t24]
		});
		$[77] = t23;
		$[78] = t24;
		$[79] = t25;
	} else t25 = $[79];
	let t26;
	if ($[80] !== entry.capabilities) {
		t26 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapabilityBadges, { capabilities: entry.capabilities });
		$[80] = entry.capabilities;
		$[81] = t26;
	} else t26 = $[81];
	let t27;
	if ($[82] !== t20 || $[83] !== t25 || $[84] !== t26) {
		t27 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-3 pt-3",
			children: [
				t20,
				t25,
				t26
			]
		});
		$[82] = t20;
		$[83] = t25;
		$[84] = t26;
		$[85] = t27;
	} else t27 = $[85];
	let t28;
	if ($[86] !== t19 || $[87] !== t27 || $[88] !== t4) {
		t28 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: t4,
			children: [t19, t27]
		});
		$[86] = t19;
		$[87] = t27;
		$[88] = t4;
		$[89] = t28;
	} else t28 = $[89];
	return t28;
}
function AuxiliaryTasksModal({ aux, refreshKey, onSaved, onClose }) {
	const [picker, setPicker] = (0, import_react.useState)(null);
	const [resetBusy, setResetBusy] = (0, import_react.useState)(false);
	const [confirmReset, setConfirmReset] = (0, import_react.useState)(false);
	const modalRef = useModalBehavior({
		open: true,
		onClose
	});
	const resetAllAux = async () => {
		setConfirmReset(false);
		setResetBusy(true);
		try {
			await api.setModelAssignment({
				scope: "auxiliary",
				task: "__reset__",
				provider: "",
				model: ""
			});
			onSaved();
		} finally {
			setResetBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: modalRef,
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4",
		onClick: (e) => e.target === e.currentTarget && onClose(),
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "aux-modal-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn(themedBody, "relative w-full max-w-2xl max-h-[80vh] border border-border bg-card shadow-2xl flex flex-col"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ghost: true,
					size: "icon",
					onClick: onClose,
					className: "absolute right-2 top-2 text-muted-foreground hover:text-foreground",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "p-5 pb-3 border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 pr-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "aux-modal-title",
							className: "font-mondwest text-display text-base tracking-wider",
							children: "Auxiliary Tasks"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							outlined: true,
							onClick: () => setConfirmReset(true),
							disabled: resetBusy,
							className: "h-6 text-xs uppercase",
							prefix: resetBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : null,
							children: "Reset all to auto"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-text-secondary mt-2",
						children: [
							"Auxiliary tasks handle side-jobs like vision, session search, and compression. ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono",
								children: "auto"
							}),
							" means \"use the main model\". Override per-task when you want a cheap/fast model for a specific job."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto p-5 space-y-1",
					children: auxTaskRows(aux?.tasks).map((t) => {
						const cur = aux?.tasks.find((a) => a.task === t.key);
						const isAuto = !cur || cur.provider === "auto" || !cur.provider;
						const eff = cur?.effective;
						const effRoute = eff?.provider && eff.provider !== "auto" ? `${eff.provider} · ${eff.model || "(provider default)"}` : "auto (use main model)";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 px-3 py-2 border border-border/30 bg-card/50 hover:bg-muted/20 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium",
											children: t.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-text-tertiary",
											children: t.hint
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-mono text-text-secondary truncate",
										children: isAuto && t.inheritFrom ? `inherits ${auxTaskLabel(aux?.tasks, t.inheritFrom)} · ${effRoute}` : isAuto ? "auto (use main model)" : `${cur?.provider} · ${cur?.model || "(provider default)"}`
									})]
								}),
								t.inheritFrom && !isAuto && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									outlined: true,
									onClick: async () => {
										await api.setModelAssignment({
											scope: "auxiliary",
											task: t.key,
											provider: "auto",
											model: ""
										});
										onSaved();
									},
									className: "h-6 text-xs uppercase",
									children: ["Follow ", auxTaskLabel(aux?.tasks, t.inheritFrom)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									outlined: true,
									onClick: () => setPicker({
										kind: "aux",
										task: t.key
									}),
									className: "h-6 text-xs uppercase",
									children: "Change"
								})
							]
						}, t.key);
					})
				}),
				picker && picker.kind === "aux" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelPickerDialog, {
					loader: api.getModelOptions,
					alwaysGlobal: true,
					currentAssignment: assignmentToPickerCurrent(aux?.tasks.find((a_0) => a_0.task === picker.task)),
					title: `Set Auxiliary: ${auxTaskLabel(aux?.tasks, picker.task)}`,
					onApply: async ({ provider, model, confirmExpensiveModel }) => {
						const result = await api.setModelAssignment({
							confirm_expensive_model: confirmExpensiveModel,
							scope: "auxiliary",
							task: picker.task,
							provider,
							model
						});
						if (!result.confirm_required) onSaved();
						return result;
					},
					onClose: () => setPicker(null)
				}, `picker-${refreshKey}`),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
					open: confirmReset,
					onCancel: () => setConfirmReset(false),
					onConfirm: () => void resetAllAux(),
					title: "Reset auxiliary models",
					description: "Reset every auxiliary task to 'auto'? This overrides any per-task overrides you've set.",
					destructive: true,
					confirmLabel: "Reset all",
					loading: resetBusy
				})
			]
		})
	});
}
function MoaModelsModal({ config, refreshKey, onClose, onSaved }) {
	const [draft, setDraft] = (0, import_react.useState)(config);
	const [selected, setSelected] = (0, import_react.useState)(config.default_preset || Object.keys(config.presets)[0] || "default");
	const [newName, setNewName] = (0, import_react.useState)("");
	const [picker, setPicker] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const closeMoaUnlessPickerOpen = (0, import_react.useCallback)(() => {
		if (!shouldCloseOuterModalOnEscape(picker !== null)) return;
		onClose();
	}, [picker, onClose]);
	const modalRef = useModalBehavior({
		open: true,
		onClose: closeMoaUnlessPickerOpen
	});
	const presetNames = Object.keys(draft.presets || {});
	const preset = draft.presets[selected] || draft.presets[presetNames[0]];
	const slotLabel = (slot) => `${slot.provider || "(provider)"} · ${slot.model || "(model)"}`;
	const updateSelectedPreset = (updater) => {
		setDraft((prev) => ({
			...prev,
			presets: {
				...prev.presets,
				[selected]: updater(prev.presets[selected])
			}
		}));
	};
	const save = async () => {
		setBusy(true);
		setError(null);
		try {
			onSaved(await api.saveMoaModels(draft));
			onClose();
		} catch (e) {
			setError(errorMessage(e));
		} finally {
			setBusy(false);
		}
	};
	const addPreset = () => {
		const name = newName.trim();
		if (!name || draft.presets[name]) return;
		const seed = preset || {
			reference_models: draft.reference_models,
			aggregator: draft.aggregator,
			reference_temperature: draft.reference_temperature,
			aggregator_temperature: draft.aggregator_temperature,
			reference_timeout: draft.reference_timeout,
			degraded_reference_policy: draft.degraded_reference_policy,
			enabled: draft.enabled
		};
		setDraft((prev_0) => ({
			...prev_0,
			default_preset: prev_0.default_preset || name,
			presets: {
				...prev_0.presets,
				[name]: {
					...seed,
					reference_models: [...seed.reference_models]
				}
			}
		}));
		setSelected(name);
		setNewName("");
	};
	const deletePreset = () => {
		if (presetNames.length <= 1) return;
		const nextSelected = presetNames.filter((name_0) => name_0 !== selected)[0];
		setDraft((prev_1) => {
			const next = { ...prev_1.presets };
			delete next[selected];
			return {
				...prev_1,
				presets: next,
				default_preset: prev_1.default_preset === selected ? nextSelected : prev_1.default_preset,
				active_preset: prev_1.active_preset === selected ? "" : prev_1.active_preset
			};
		});
		setSelected(nextSelected);
	};
	if (!preset) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: modalRef,
		className: DASHBOARD_MODAL_BACKDROP,
		onMouseDown: (e_0) => {
			if (e_0.target === e_0.currentTarget) closeMoaUnlessPickerOpen();
		},
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "moa-modal-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn(themedBody, DASHBOARD_MODAL_PANEL, "max-h-[85vh] max-w-2xl overflow-auto flex flex-col"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "p-5 pb-3 border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "moa-modal-title",
					className: "font-mondwest text-display text-base tracking-wider",
					children: "Configure Mixture of Agents presets"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary",
						children: "Presets appear as models under the Mixture of Agents provider. References produce perspectives; the aggregator is the acting model that answers and calls tools."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "border border-border bg-background px-2 py-1 text-xs",
								value: selected,
								onChange: (event) => setSelected(event.target.value),
								children: presetNames.map((name_1) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: name_1,
									children: name_1
								}, name_1))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								outlined: true,
								onClick: () => setDraft((prev_2) => ({
									...prev_2,
									default_preset: selected
								})),
								children: "Set default"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								ghost: true,
								disabled: presetNames.length <= 1,
								onClick: deletePreset,
								children: "Delete"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "border border-border bg-background px-2 py-1 text-xs",
								placeholder: "new preset name",
								value: newName,
								onChange: (event_0) => setNewName(event_0.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								outlined: true,
								disabled: !newName.trim() || !!draft.presets[newName.trim()],
								onClick: addPreset,
								children: "Add preset"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-text-secondary",
						children: ["Default: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono",
							children: draft.default_preset
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-display text-xs font-medium tracking-wider",
								children: "Reference models"
							}),
							preset.reference_models.map((slot_0, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("flex items-center gap-2 border border-border/50 bg-muted/20 px-3 py-2", slot_0.enabled === false && "opacity-60"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: slot_0.enabled !== false,
										onCheckedChange: (checked) => updateSelectedPreset((prev_3) => ({
											...prev_3,
											reference_models: prev_3.reference_models.map((s, i) => i === index ? {
												...s,
												enabled: checked === true
											} : s)
										}))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "min-w-0 flex-1 truncate font-mono text-xs text-text-secondary",
										children: slotLabel(slot_0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										outlined: true,
										onClick: () => setPicker({
											kind: "reference",
											index
										}),
										children: "Change"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										ghost: true,
										disabled: preset.reference_models.length <= 1,
										onClick: () => updateSelectedPreset((prev_4) => ({
											...prev_4,
											reference_models: prev_4.reference_models.filter((_, i_0) => i_0 !== index)
										})),
										children: "Remove"
									})
								]
							}, `${selected}-${slot_0.provider}-${slot_0.model}-${index}`)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								outlined: true,
								onClick: () => updateSelectedPreset((prev_5) => ({
									...prev_5,
									reference_models: [...prev_5.reference_models, {
										...prev_5.aggregator,
										enabled: true
									}]
								})),
								children: "Add reference model"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-display text-xs font-medium tracking-wider",
							children: "Aggregator"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border border-border/50 bg-muted/20 px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-w-0 flex-1 truncate font-mono text-xs text-text-secondary",
								children: slotLabel(preset.aggregator)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								outlined: true,
								onClick: () => setPicker({ kind: "aggregator" }),
								children: "Change"
							})]
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							ghost: true,
							onClick: onClose,
							disabled: busy,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void save(),
							disabled: busy,
							children: busy ? "Saving…" : "Save"
						})]
					})
				]
			})]
		}), picker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelPickerDialog, {
			loader: api.getModelOptions,
			alwaysGlobal: true,
			currentAssignment: picker.kind === "aggregator" ? preset.aggregator : preset.reference_models[picker.index],
			title: "Select MoA Model",
			onApply: async ({ provider, model }) => {
				if ((provider || "").toLowerCase() === "moa") {
					setError("MoA presets can't reference or aggregate the Mixture of Agents provider (no recursive MoA).");
					return;
				}
				setError(null);
				updateSelectedPreset((prev_6) => {
					if (picker.kind === "aggregator") return {
						...prev_6,
						aggregator: {
							provider,
							model
						}
					};
					return {
						...prev_6,
						reference_models: prev_6.reference_models.map((slot_1, i_1) => i_1 === picker.index ? {
							...slot_1,
							provider,
							model
						} : slot_1)
					};
				});
			},
			onClose: () => setPicker(null)
		}, `moa-picker-${refreshKey}-${selected}-${picker.kind}-${picker.kind === "reference" ? picker.index : "agg"}`)]
	}), document.body);
}
function ModelSettingsPanel(t0) {
	const $ = (0, import_compiler_runtime.c)(61);
	const { aux, refreshKey, onSaved } = t0;
	const [auxModalOpen, setAuxModalOpen] = (0, import_react.useState)(false);
	const [moaModalOpen, setMoaModalOpen] = (0, import_react.useState)(false);
	const [moa, setMoa] = (0, import_react.useState)(null);
	const [picker, setPicker] = (0, import_react.useState)(null);
	const [pendingReloadModel, setPendingReloadModel] = (0, import_react.useState)(null);
	const [switchNotice, setSwitchNotice] = (0, import_react.useState)(null);
	const mainProv = aux?.main.provider ?? "";
	const mainModel = aux?.main.model ?? "";
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = () => {
			api.getMoaModels().then(setMoa).catch(() => setMoa(null));
		};
		$[0] = t1;
	} else t1 = $[0];
	let t2;
	if ($[1] !== refreshKey) {
		t2 = [refreshKey];
		$[1] = refreshKey;
		$[2] = t2;
	} else t2 = $[2];
	(0, import_react.useEffect)(t1, t2);
	let t3;
	if ($[3] !== onSaved) {
		t3 = async (t4) => {
			const { scope, task, provider, model, confirmExpensiveModel } = t4;
			const result = await api.setModelAssignment({
				confirm_expensive_model: confirmExpensiveModel,
				scope,
				task,
				provider,
				model
			});
			if (!result.confirm_required) onSaved();
			return result;
		};
		$[3] = onSaved;
		$[4] = t3;
	} else t3 = $[4];
	const applyAssignment = t3;
	let t4;
	if ($[5] !== aux?.tasks) {
		t4 = aux?.tasks.filter(_temp3).length ?? 0;
		$[5] = aux?.tasks;
		$[6] = t4;
	} else t4 = $[6];
	const auxOverrideCount = t4;
	const t5 = aux?.tasks;
	let t6;
	if ($[7] !== t5) {
		t6 = auxTaskRows(t5);
		$[7] = t5;
		$[8] = t6;
	} else t6 = $[8];
	const auxTaskCount = t6.length;
	let t7;
	if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "min-w-0 pb-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-sm",
						children: "Model Settings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "max-w-full min-w-0 text-xs text-text-secondary [overflow-wrap:anywhere]",
						children: "applies to new sessions"
					})
				]
			})
		});
		$[9] = t7;
	} else t7 = $[9];
	let t8;
	if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 mb-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-display text-xs font-medium tracking-wider",
				children: "Main model"
			})]
		});
		$[10] = t8;
	} else t8 = $[10];
	const t9 = mainProv || "(unset)";
	const t10 = mainProv && mainModel && " · ";
	const t11 = mainModel || "(unset)";
	let t12;
	if ($[11] !== t10 || $[12] !== t11 || $[13] !== t9) {
		t12 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [t8, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-xs font-mono text-text-secondary truncate",
				children: [
					t9,
					t10,
					t11
				]
			})]
		});
		$[11] = t10;
		$[12] = t11;
		$[13] = t9;
		$[14] = t12;
	} else t12 = $[14];
	let t13;
	if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			onClick: () => setPicker({ kind: "main" }),
			className: "shrink-0 self-start text-xs uppercase sm:self-center",
			children: "Change"
		});
		$[15] = t13;
	} else t13 = $[15];
	let t14;
	if ($[16] !== t12) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-2 bg-muted/20 border border-border/50 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3",
			children: [t12, t13]
		});
		$[16] = t12;
		$[17] = t14;
	} else t14 = $[17];
	let t15;
	if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
		t15 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 mb-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-3 w-3 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-display text-xs font-medium tracking-wider",
				children: "Auxiliary tasks"
			})]
		});
		$[18] = t15;
	} else t15 = $[18];
	const t16 = auxOverrideCount > 0 ? `${auxOverrideCount} override${auxOverrideCount > 1 ? "s" : ""} · ${auxTaskCount - auxOverrideCount} auto` : `${auxTaskCount} tasks · all auto`;
	let t17;
	if ($[19] !== t16) {
		t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [t15, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-mono text-text-secondary truncate",
				children: t16
			})]
		});
		$[19] = t16;
		$[20] = t17;
	} else t17 = $[20];
	let t18;
	if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
		t18 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			outlined: true,
			onClick: () => setAuxModalOpen(true),
			className: "shrink-0 self-start text-xs uppercase sm:self-center",
			children: "Configure"
		});
		$[21] = t18;
	} else t18 = $[21];
	let t19;
	if ($[22] !== t17) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-2 bg-muted/20 border border-border/50 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3",
			children: [t17, t18]
		});
		$[22] = t17;
		$[23] = t19;
	} else t19 = $[23];
	let t20;
	if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
		t20 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 mb-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-3 w-3 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-display text-xs font-medium tracking-wider",
				children: "Mixture of Agents"
			})]
		});
		$[24] = t20;
	} else t20 = $[24];
	let t21;
	if ($[25] !== moa) {
		t21 = moa ? `${moa.reference_models.length} reference${moa.reference_models.length === 1 ? "" : "s"} · ${moa.aggregator.provider}/${shortModelName(moa.aggregator.model)}` : "not loaded";
		$[25] = moa;
		$[26] = t21;
	} else t21 = $[26];
	let t22;
	if ($[27] !== t21) {
		t22 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [t20, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-mono text-text-secondary truncate",
				children: t21
			})]
		});
		$[27] = t21;
		$[28] = t22;
	} else t22 = $[28];
	let t23;
	if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
		t23 = () => setMoaModalOpen(true);
		$[29] = t23;
	} else t23 = $[29];
	const t24 = !moa;
	let t25;
	if ($[30] !== t24) {
		t25 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			outlined: true,
			onClick: t23,
			disabled: t24,
			className: "shrink-0 self-start text-xs uppercase sm:self-center",
			children: "Configure"
		});
		$[30] = t24;
		$[31] = t25;
	} else t25 = $[31];
	let t26;
	if ($[32] !== t22 || $[33] !== t25) {
		t26 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-2 bg-muted/20 border border-border/50 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3",
			children: [t22, t25]
		});
		$[32] = t22;
		$[33] = t25;
		$[34] = t26;
	} else t26 = $[34];
	let t27;
	if ($[35] !== applyAssignment || $[36] !== picker || $[37] !== refreshKey) {
		t27 = picker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelPickerDialog, {
			loader: api.getModelOptions,
			alwaysGlobal: true,
			title: "Set Main Model",
			onApply: async (t28) => {
				const { provider: provider_0, model: model_0, confirmExpensiveModel: confirmExpensiveModel_0 } = t28;
				const result_0 = await applyAssignment({
					confirmExpensiveModel: confirmExpensiveModel_0,
					scope: "main",
					task: "",
					provider: provider_0,
					model: model_0
				});
				if (!result_0.confirm_required) {
					setSwitchNotice(result_0.notice ?? null);
					setPendingReloadModel(model_0.split("/").slice(-1)[0]);
				}
				return result_0;
			},
			onClose: () => setPicker(null)
		}, `picker-${refreshKey}`);
		$[35] = applyAssignment;
		$[36] = picker;
		$[37] = refreshKey;
		$[38] = t27;
	} else t27 = $[38];
	let t28;
	if ($[39] !== aux || $[40] !== auxModalOpen || $[41] !== onSaved || $[42] !== refreshKey) {
		t28 = auxModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuxiliaryTasksModal, {
			aux,
			refreshKey,
			onSaved,
			onClose: () => setAuxModalOpen(false)
		});
		$[39] = aux;
		$[40] = auxModalOpen;
		$[41] = onSaved;
		$[42] = refreshKey;
		$[43] = t28;
	} else t28 = $[43];
	let t29;
	if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
		t29 = () => setPendingReloadModel(null);
		$[44] = t29;
	} else t29 = $[44];
	let t30;
	if ($[45] !== pendingReloadModel || $[46] !== switchNotice) {
		t30 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelReloadConfirm, {
			model: pendingReloadModel,
			notice: switchNotice,
			onCancel: t29
		});
		$[45] = pendingReloadModel;
		$[46] = switchNotice;
		$[47] = t30;
	} else t30 = $[47];
	let t31;
	if ($[48] !== moa || $[49] !== moaModalOpen || $[50] !== onSaved || $[51] !== refreshKey) {
		t31 = moaModalOpen && moa && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoaModelsModal, {
			config: moa,
			refreshKey,
			onSaved: (next) => {
				setMoa(next);
				onSaved();
			},
			onClose: () => setMoaModalOpen(false)
		});
		$[48] = moa;
		$[49] = moaModalOpen;
		$[50] = onSaved;
		$[51] = refreshKey;
		$[52] = t31;
	} else t31 = $[52];
	let t32;
	if ($[53] !== t14 || $[54] !== t19 || $[55] !== t26 || $[56] !== t27 || $[57] !== t28 || $[58] !== t30 || $[59] !== t31) {
		t32 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "min-w-0 max-w-full overflow-hidden",
			children: [t7, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "min-w-0 space-y-3 pt-3",
				children: [
					t14,
					t19,
					t26,
					t27,
					t28,
					t30,
					t31
				]
			})]
		});
		$[53] = t14;
		$[54] = t19;
		$[55] = t26;
		$[56] = t27;
		$[57] = t28;
		$[58] = t30;
		$[59] = t31;
		$[60] = t32;
	} else t32 = $[60];
	return t32;
}
function _temp3(a) {
	return a.provider && a.provider !== "auto";
}
function ModelsPage() {
	const $ = (0, import_compiler_runtime.c)(48);
	const [days, setDays] = (0, import_react.useState)(30);
	const [data, setData] = (0, import_react.useState)(null);
	const [aux, setAux] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [saveKey, setSaveKey] = (0, import_react.useState)(0);
	const [showTokens, setShowTokens] = (0, import_react.useState)(false);
	const { t } = useI18n();
	const { setAfterTitle, setEnd } = usePageHeader();
	let t0;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = () => {
			api.getConfig().then((cfg) => {
				const dash = cfg?.dashboard ?? {};
				setShowTokens(dash.show_token_analytics === true);
			}).catch(() => {
				setShowTokens(false);
			});
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
	if ($[2] !== days) {
		t2 = () => {
			setLoading(true);
			setError(null);
			Promise.all([api.getModelsAnalytics(days), api.getAuxiliaryModels().catch(_temp4)]).then((t3) => {
				const [models, auxData] = t3;
				setData(models);
				setAux(auxData);
			}).catch((err) => setError(errorMessage(err))).finally(() => setLoading(false));
		};
		$[2] = days;
		$[3] = t2;
	} else t2 = $[3];
	const load = t2;
	let t3;
	if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
		t3 = () => {
			api.getAuxiliaryModels().then(setAux).catch(_temp5);
		};
		$[4] = t3;
	} else t3 = $[4];
	const refreshAux = t3;
	let t4;
	if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
		t4 = () => {
			refreshAux();
			setSaveKey(_temp6);
		};
		$[5] = t4;
	} else t4 = $[5];
	const onAssigned = t4;
	let t5;
	let t6;
	if ($[6] !== days || $[7] !== load || $[8] !== loading || $[9] !== setAfterTitle || $[10] !== setEnd || $[11] !== t.common.refresh) {
		t5 = () => {
			setAfterTitle(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: [PERIODS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					outlined: days !== p.days,
					onClick: () => setDays(p.days),
					className: "uppercase",
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
		t6 = [
			days,
			loading,
			load,
			setAfterTitle,
			setEnd,
			t.common.refresh
		];
		$[6] = days;
		$[7] = load;
		$[8] = loading;
		$[9] = setAfterTitle;
		$[10] = setEnd;
		$[11] = t.common.refresh;
		$[12] = t5;
		$[13] = t6;
	} else {
		t5 = $[12];
		t6 = $[13];
	}
	(0, import_react.useLayoutEffect)(t5, t6);
	let t7;
	let t8;
	if ($[14] !== load) {
		t7 = () => {
			load();
		};
		t8 = [load];
		$[14] = load;
		$[15] = t7;
		$[16] = t8;
	} else {
		t7 = $[15];
		t8 = $[16];
	}
	(0, import_react.useEffect)(t7, t8);
	let t10;
	let t9;
	if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
		t9 = () => {
			let last = 0;
			const onFocus = () => {
				if (document.visibilityState !== "visible") return;
				if (Date.now() - last < 1e3) return;
				last = Date.now();
				refreshAux();
			};
			window.addEventListener("focus", onFocus);
			document.addEventListener("visibilitychange", onFocus);
			return () => {
				window.removeEventListener("focus", onFocus);
				document.removeEventListener("visibilitychange", onFocus);
			};
		};
		t10 = [refreshAux];
		$[17] = t10;
		$[18] = t9;
	} else {
		t10 = $[17];
		t9 = $[18];
	}
	(0, import_react.useEffect)(t9, t10);
	let t11;
	if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "models:top" });
		$[19] = t11;
	} else t11 = $[19];
	let t12;
	if ($[20] !== aux || $[21] !== saveKey) {
		t12 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelSettingsPanel, {
			aux,
			refreshKey: saveKey,
			onSaved: onAssigned
		});
		$[20] = aux;
		$[21] = saveKey;
		$[22] = t12;
	} else t12 = $[22];
	let t13;
	if ($[23] !== data || $[24] !== showTokens || $[25] !== t.analytics || $[26] !== t.models) {
		t13 = data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "min-w-0 max-w-full overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "min-w-0 py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 max-w-full [&_div.grid]:grid-cols-[auto_minmax(0,1fr)_auto]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {
						className: "min-w-0",
						items: showTokens ? [
							{
								label: t.models.modelsUsed,
								value: String(data.totals.distinct_models)
							},
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
								label: t.models.estimatedCost,
								value: formatCost(data.totals.total_estimated_cost)
							},
							{
								label: t.analytics.totalSessions,
								value: String(data.totals.total_sessions)
							}
						] : [{
							label: t.models.modelsUsed,
							value: String(data.totals.distinct_models)
						}, {
							label: t.analytics.totalSessions,
							value: String(data.totals.total_sessions)
						}]
					})
				}), !showTokens && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-xs text-text-tertiary leading-relaxed",
					children: [
						"Token & cost analytics are hidden because the local counts exclude auxiliary calls (compression, vision, web extract, …) and provider retries, so they diverge from your provider bill. Enable",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono",
							children: "dashboard.show_token_analytics"
						}),
						" ",
						"in ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/config",
							className: "underline",
							children: "Config"
						}),
						" to show the local debug estimate anyway."
					]
				})]
			})
		});
		$[23] = data;
		$[24] = showTokens;
		$[25] = t.analytics;
		$[26] = t.models;
		$[27] = t13;
	} else t13 = $[27];
	let t14;
	if ($[28] !== t12 || $[29] !== t13) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-w-0 gap-6 lg:grid-cols-2",
			children: [t12, t13]
		});
		$[28] = t12;
		$[29] = t13;
		$[30] = t14;
	} else t14 = $[30];
	let t15;
	if ($[31] !== data || $[32] !== loading) {
		t15 = loading && !data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-2xl text-primary" })
		});
		$[31] = data;
		$[32] = loading;
		$[33] = t15;
	} else t15 = $[33];
	let t16;
	if ($[34] !== error) {
		t16 = error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "py-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive text-center",
				children: error
			})
		}) });
		$[34] = error;
		$[35] = t16;
	} else t16 = $[35];
	let t17;
	if ($[36] !== aux?.main || $[37] !== aux?.tasks || $[38] !== data || $[39] !== showTokens || $[40] !== t.models) {
		t17 = data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data.models.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: data.models.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelCard, {
				entry: m,
				rank: i + 1,
				main: aux?.main ?? null,
				aux: aux?.tasks ?? [],
				onAssigned,
				showTokens
			}, `${m.model}:${m.provider}`))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-8 w-8 mb-3 opacity-40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: t.models.noModelsData
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs mt-1 text-text-tertiary",
						children: t.models.startSession
					})
				]
			})
		}) }) });
		$[36] = aux?.main;
		$[37] = aux?.tasks;
		$[38] = data;
		$[39] = showTokens;
		$[40] = t.models;
		$[41] = t17;
	} else t17 = $[41];
	let t18;
	if ($[42] === Symbol.for("react.memo_cache_sentinel")) {
		t18 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "models:bottom" });
		$[42] = t18;
	} else t18 = $[42];
	let t19;
	if ($[43] !== t14 || $[44] !== t15 || $[45] !== t16 || $[46] !== t17) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 max-w-full flex-col gap-6",
			children: [
				t11,
				t14,
				t15,
				t16,
				t17,
				t18
			]
		});
		$[43] = t14;
		$[44] = t15;
		$[45] = t16;
		$[46] = t17;
		$[47] = t19;
	} else t19 = $[47];
	return t19;
}
function _temp6(k) {
	return k + 1;
}
function _temp5() {}
function _temp4() {
	return null;
}
//#endregion
export { ModelsPage as default };
