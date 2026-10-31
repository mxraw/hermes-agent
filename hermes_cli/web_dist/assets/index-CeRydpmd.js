const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ConfigPage-CqvigfOS.js","assets/rolldown-runtime-BPOCksWG.js","assets/react-vendor-KEpZRUr8.js","assets/vendor-DkbdVxWs.js","assets/ui-vIdGzE07.js","assets/i18n-Zn9FHQtI.js","assets/api-rr7lTIEw.js","assets/usePageHeader-Dtz2jsT4.js","assets/DocsPage-DGH7jQvH.js","assets/utils-XzxpPQdK.js","assets/EnvPage-pbhdBNs5.js","assets/clipboard-C-rbBxe_.js","assets/DeleteConfirmDialog-CS54bGFr.js","assets/FilesPage-TMo7w2gA.js","assets/SessionsPage-DDKq8-Yd.js","assets/LogsPage-CY1hThHf.js","assets/AnalyticsPage-CqQ5g5-W.js","assets/ModelsPage-Dq-6diH4.js","assets/ModelReloadConfirm-Dm6sEujK.js","assets/ConfirmDialog-D-vC_4KK.js","assets/useModalBehavior-DSqJduTw.js","assets/CronPage-BwK5ALfD.js","assets/LoadErrorNotice-BOHNWMyf.js","assets/ProfilesPage-AnUAGL9S.js","assets/ProfileBuilderPage-TpadDqy5.js","assets/mcp-server-create-BjaPvL6F.js","assets/SkillsPage-caNhRUgM.js","assets/PluginsPage-Dfkqzfr4.js","assets/McpPage-BkY_RGkk.js","assets/PairingPage-Bol9pHly.js","assets/ChannelsPage-CmqZO-wO.js","assets/WebhooksPage-CeRKqMH0.js","assets/SystemPage-C-EV7JC1.js","assets/xterm-BNnjXmiT.js","assets/xterm-GVL3fBIr.css","assets/terminal-font-refit-BbW1Op6j.js","assets/ChatPage-ljR8IrE-.js"])))=>i.map(i=>d[i]);
import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { a as NavLink, c as Navigate, d as useLocation, f as useNavigate, h as require_react, i as Link, l as Route, m as require_react_dom, n as require_compiler_runtime, o as useSearchParams, p as require_client, r as BrowserRouter, s as __vitePreload, t as require_jsx_runtime, u as Routes } from "./react-vendor-KEpZRUr8.js";
import { $t as BookOpen, B as Puzzle, Bt as Code, Ct as FolderOpen, Et as FileText, Ft as Download, Ht as Clock, Lt as Database, O as Settings, P as RotateCw, Q as Palette, R as Radio, Rt as Cpu, S as Shield, T as ShieldCheck, W as Plug, X as PanelLeftOpen, Xt as ChartColumn, Yt as Check, Z as PanelLeftClose, an as Activity, b as Star, et as Package, gt as Heart, i as Wrench, kt as Eye, m as TriangleAlert, n as Zap, ot as Menu, p as Type, pt as KeyRound, r as X, rt as MessageSquare, s as Webhook, st as LogOut, u as Users, v as Terminal, x as Sparkles, yt as Globe } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, C as DialogClose, D as DialogHeader, E as DialogFooter, F as useBelowBreakpoint, I as ConfirmDialog, L as Spinner, M as BottomSheet, N as Select, O as DialogTitle, P as SelectOption, S as Dialog, T as DialogDescription, V as Typography, _ as CardHeader, b as useConfirmDelete, c as Tabs, d as Separator, f as Label, h as CardContent, j as ListItem, k as Checkbox, l as TabsList, m as Card, p as Input, u as TabsTrigger, v as CardTitle, w as DialogContent, x as Toast, y as useToast, z as SelectionSwitcher } from "./ui-vIdGzE07.js";
import { i as timeAgo, n as isoTimeAgo, t as cn } from "./utils-XzxpPQdK.js";
import { i as en, n as LOCALE_META, r as useI18n, t as I18nProvider } from "./i18n-Zn9FHQtI.js";
import { _ as THEME_PRESET_PALETTES, a as buildWsUrl, c as ApiError, f as dashboardInitialProfile, h as shouldAdoptActiveProfile, i as buildWsAuthParam, m as initialProfileScope, n as api, o as fetchJSON, p as dashboardServingProfile, r as authedFetch, s as setManagementProfile, t as HERMES_BASE_PATH } from "./api-rr7lTIEw.js";
//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region web/src/index.css
var import_client = require_client();
//#endregion
//#region web/src/components/SidebarFooter.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var import_compiler_runtime = require_compiler_runtime();
var import_jsx_runtime = require_jsx_runtime();
function SidebarFooter(t0) {
	const $ = (0, import_compiler_runtime.c)(9);
	const { status } = t0;
	const { t } = useI18n();
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = cn("flex shrink-0 items-center justify-between gap-2", "px-5 py-2.5", "border-t border-current/10");
		$[0] = t1;
	} else t1 = $[0];
	const t2 = status?.version != null ? `v${status.version}` : "—";
	let t3;
	if ($[1] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
			className: "font-mono-ui text-xs tabular-nums tracking-[0.08em] text-text-tertiary lowercase",
			children: t2
		});
		$[1] = t2;
		$[2] = t3;
	} else t3 = $[2];
	let t4;
	if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
		t4 = cn("font-sans text-display text-xs tracking-[0.12em] text-midground", "transition-opacity hover:opacity-90", "focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground/40");
		$[3] = t4;
	} else t4 = $[3];
	let t5;
	if ($[4] !== t.app.footer.org) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "https://nousresearch.com",
			target: "_blank",
			rel: "noopener noreferrer",
			className: t4,
			children: t.app.footer.org
		});
		$[4] = t.app.footer.org;
		$[5] = t5;
	} else t5 = $[5];
	let t6;
	if ($[6] !== t3 || $[7] !== t5) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t1,
			children: [t3, t5]
		});
		$[6] = t3;
		$[7] = t5;
		$[8] = t6;
	} else t6 = $[8];
	return t6;
}
//#endregion
//#region web/src/components/SidebarStatusStrip.tsx
/** Gateway + session summary for the System sidebar block (no separate strip chrome). */
function SidebarStatusStrip(t0) {
	const $ = (0, import_compiler_runtime.c)(42);
	const { status } = t0;
	const { t } = useI18n();
	if (status === null) {
		let t1;
		if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
			t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 py-1.5",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-[80%] max-w-full animate-pulse rounded-sm bg-midground/10" })
			});
			$[0] = t1;
		} else t1 = $[0];
		return t1;
	}
	let T0;
	let activeSessionsLabel;
	let gw;
	let t1;
	let t2;
	let t3;
	let t4;
	let t5;
	let t6;
	let t7;
	let t8;
	if ($[1] !== status || $[2] !== t) {
		gw = gatewayLine(status, t);
		const { activeSessionsLabel: t9, gatewayStatusLabel } = t.app;
		activeSessionsLabel = t9;
		T0 = Link;
		t6 = "/sessions";
		t7 = t.app.statusOverview;
		if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
			t8 = cn("block text-left", "px-5 pb-2 pt-0.5", "text-text-secondary", "transition-colors hover:text-midground", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground/40", "focus-visible:ring-inset");
			$[14] = t8;
		} else t8 = $[14];
		t5 = "flex flex-col gap-1 font-sans text-xs leading-snug tracking-[0.08em]";
		t2 = "break-words";
		if ($[15] !== gatewayStatusLabel) {
			t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-text-tertiary",
				children: gatewayStatusLabel
			});
			$[15] = gatewayStatusLabel;
			$[16] = t3;
		} else t3 = $[16];
		t4 = " ";
		t1 = cn("font-medium", gw.tone);
		$[1] = status;
		$[2] = t;
		$[3] = T0;
		$[4] = activeSessionsLabel;
		$[5] = gw;
		$[6] = t1;
		$[7] = t2;
		$[8] = t3;
		$[9] = t4;
		$[10] = t5;
		$[11] = t6;
		$[12] = t7;
		$[13] = t8;
	} else {
		T0 = $[3];
		activeSessionsLabel = $[4];
		gw = $[5];
		t1 = $[6];
		t2 = $[7];
		t3 = $[8];
		t4 = $[9];
		t5 = $[10];
		t6 = $[11];
		t7 = $[12];
		t8 = $[13];
	}
	let t9;
	if ($[17] !== gw.label || $[18] !== t1) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: t1,
			children: gw.label
		});
		$[17] = gw.label;
		$[18] = t1;
		$[19] = t9;
	} else t9 = $[19];
	let t10;
	if ($[20] !== t2 || $[21] !== t3 || $[22] !== t4 || $[23] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: t2,
			children: [
				t3,
				t4,
				t9
			]
		});
		$[20] = t2;
		$[21] = t3;
		$[22] = t4;
		$[23] = t9;
		$[24] = t10;
	} else t10 = $[24];
	let t11;
	if ($[25] !== activeSessionsLabel) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-text-tertiary",
			children: activeSessionsLabel
		});
		$[25] = activeSessionsLabel;
		$[26] = t11;
	} else t11 = $[26];
	let t12;
	if ($[27] !== status.active_sessions) {
		t12 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums text-text-secondary",
			children: status.active_sessions
		});
		$[27] = status.active_sessions;
		$[28] = t12;
	} else t12 = $[28];
	let t13;
	if ($[29] !== t11 || $[30] !== t12) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "break-words",
			children: [
				t11,
				" ",
				t12
			]
		});
		$[29] = t11;
		$[30] = t12;
		$[31] = t13;
	} else t13 = $[31];
	let t14;
	if ($[32] !== t10 || $[33] !== t13 || $[34] !== t5) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t5,
			children: [t10, t13]
		});
		$[32] = t10;
		$[33] = t13;
		$[34] = t5;
		$[35] = t14;
	} else t14 = $[35];
	let t15;
	if ($[36] !== T0 || $[37] !== t14 || $[38] !== t6 || $[39] !== t7 || $[40] !== t8) {
		t15 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T0, {
			to: t6,
			title: t7,
			className: t8,
			children: t14
		});
		$[36] = T0;
		$[37] = t14;
		$[38] = t6;
		$[39] = t7;
		$[40] = t8;
		$[41] = t15;
	} else t15 = $[41];
	return t15;
}
function gatewayLine(status, t) {
	const g = t.app.gatewayStrip;
	const byState = {
		running: {
			label: g.running,
			tone: "text-success"
		},
		starting: {
			label: g.starting,
			tone: "text-warning"
		},
		startup_failed: {
			label: g.failed,
			tone: "text-destructive"
		},
		degraded: {
			label: g.degraded ?? en.app.gatewayStrip.degraded,
			tone: status.gateway_running ? "text-warning" : "text-destructive"
		},
		stopped: {
			label: g.stopped,
			tone: "text-muted-foreground"
		}
	};
	if (status.gateway_heartbeat_stale_s != null) return {
		label: g.heartbeatStale ?? en.app.gatewayStrip.heartbeatStale,
		tone: "text-destructive"
	};
	if (status.gateway_state && byState[status.gateway_state]) return byState[status.gateway_state];
	return status.gateway_running ? {
		label: g.running,
		tone: "text-success"
	} : {
		label: g.off,
		tone: "text-muted-foreground"
	};
}
//#endregion
//#region apps/shared/src/color.ts
var HEX6_RE = /^#?([0-9a-f]{6})$/i;
var HEX3_RE = /^#?([0-9a-f]{3})$/i;
var RGB_FN_RE = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i;
var clampChannel = (v) => Math.max(0, Math.min(255, Math.round(v)));
/** Parse `#rgb`, `#rrggbb` or `rgb(r,g,b)` → channels. Null for anything else. */
function parseColor(input) {
	const value = input.trim();
	let m = HEX6_RE.exec(value);
	if (m) {
		const n = parseInt(m[1], 16);
		return [
			n >> 16 & 255,
			n >> 8 & 255,
			n & 255
		];
	}
	m = HEX3_RE.exec(value);
	if (m) {
		const [r, g, b] = m[1];
		return [
			parseInt(r + r, 16),
			parseInt(g + g, 16),
			parseInt(b + b, 16)
		];
	}
	m = RGB_FN_RE.exec(value);
	if (m) return [
		clampChannel(Number(m[1])),
		clampChannel(Number(m[2])),
		clampChannel(Number(m[3]))
	];
	return null;
}
//#endregion
//#region apps/shared/src/update-debt.ts
/** The debt of THIS action's committed run, or null when nothing is owed.
*
*  Committed is `success` or `partial` (record_user_action turns a committed success into
*  partial / exit 1), so the debt is read for every committed outcome, not only exit 0. The
*  status route attaches the latest receipt when this action has none, so a receipt is only
*  this action's when its `action_id` matches the id the start request returned. */
function updateDebt(receipt, actionId) {
	if (!receipt || !actionId || receipt.action_id !== actionId) return null;
	if (receipt.outcome !== "success" && receipt.outcome !== "partial") return null;
	const followups = (receipt.followups ?? []).map((step) => step.reason ? `${step.step} (${step.reason})` : step.step).join("; ");
	const action = receipt.user_action;
	const userAction = action ? action.reason ? `${action.step}: ${action.reason}` : action.step : "";
	return followups || userAction ? {
		followups,
		userAction
	} : null;
}
//#endregion
//#region web/src/hooks/useSidebarStatus.ts
var POLL_MS = 1e4;
/**
* Light-weight status poll for the app shell (sidebar). The Status page uses
* its own faster interval; we keep this slower to avoid duplicate load.
*/
function useSidebarStatus() {
	const $ = (0, import_compiler_runtime.c)(2);
	const [status, setStatus] = (0, import_react.useState)(null);
	let t0;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = () => {
			const load = () => {
				api.getStatus().then(setStatus).catch(_temp$6);
			};
			load();
			const id = setInterval(load, POLL_MS);
			return () => clearInterval(id);
		};
		t1 = [];
		$[0] = t0;
		$[1] = t1;
	} else {
		t0 = $[0];
		t1 = $[1];
	}
	(0, import_react.useEffect)(t0, t1);
	return status;
}
function _temp$6() {}
//#endregion
//#region web/src/components/auth-widget-visibility.ts
function shouldHideAuthWidget(identity) {
	return identity.provider === "loopback";
}
//#endregion
//#region web/src/components/AuthWidget.tsx
/**
* AuthWidget — sidebar "Logged in as …" affordance for the dashboard
* OAuth gate (Phase 7 of .hermes/plans/2026-05-21-dashboard-oauth-auth.md).
*
* Renders nothing in loopback / --insecure mode. In gated mode, fetches
* /api/auth/me on mount and surfaces:
*
*   - the user_id (truncated to 14 chars + ellipsis) since the Nous Portal
*     contract V1 doesn't emit email/display_name claims (Contract Anchor
*     C4 in the plan; the API responds with empty strings for those
*     fields, so we use user_id as the display value)
*   - the provider's display_name (looked up from /api/auth/providers,
*     defaults to the bare provider key)
*   - a logout button that POSTs /auth/logout and full-page-navigates to
*     /login (the dashboard becomes inaccessible again)
*
* Failure modes:
*   - 401 from /api/auth/me means we're not gated (or the gate is on but
*     we have no cookie — in that case the gate's middleware would have
*     redirected us before App.tsx renders, so we won't see this). The
*     widget renders nothing.
*   - Network error: shows a minimal "auth status unavailable" message
*     so the user knows the widget tried.
*/
/** Truncate ``user_id`` to fit a small UI without revealing the full
*  opaque identifier. 14 chars is enough to disambiguate users in a
*  small org and short enough to fit a single sidebar row. */
function truncateUserId(id) {
	if (id.length <= 14) return id;
	return `${id.slice(0, 14)}…`;
}
function AuthWidget(t0) {
	const $ = (0, import_compiler_runtime.c)(31);
	const { className } = t0;
	const [me, setMe] = (0, import_react.useState)(null);
	const [hidden, setHidden] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	let t1;
	let t2;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = () => {
			let cancelled = false;
			api.getAuthMe().then((data) => {
				if (cancelled) return;
				if (shouldHideAuthWidget(data)) {
					setHidden(true);
					return;
				}
				setMe(data);
			}).catch((err) => {
				if (cancelled) return;
				if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
					setHidden(true);
					return;
				}
				setError("auth status unavailable");
			});
			return () => {
				cancelled = true;
			};
		};
		t2 = [];
		$[0] = t1;
		$[1] = t2;
	} else {
		t1 = $[0];
		t2 = $[1];
	}
	(0, import_react.useEffect)(t1, t2);
	if (hidden) return null;
	if (error) {
		let t3;
		if ($[2] !== className) {
			t3 = cn("px-5 py-2 text-[0.65rem] tracking-[0.05em] text-muted-foreground/70", className);
			$[2] = className;
			$[3] = t3;
		} else t3 = $[3];
		let t4;
		if ($[4] !== error || $[5] !== t3) {
			t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: t3,
				children: error
			});
			$[4] = error;
			$[5] = t3;
			$[6] = t4;
		} else t4 = $[6];
		return t4;
	}
	if (!me) {
		let t3;
		if ($[7] !== className) {
			t3 = cn("h-9 px-5 py-2 text-[0.65rem] text-muted-foreground/40", className);
			$[7] = className;
			$[8] = t3;
		} else t3 = $[8];
		let t4;
		if ($[9] !== t3) {
			t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: t3,
				"aria-busy": "true",
				children: "…"
			});
			$[9] = t3;
			$[10] = t4;
		} else t4 = $[10];
		return t4;
	}
	const handleLogout = _temp$5;
	let t3;
	if ($[11] !== me.display_name || $[12] !== me.email || $[13] !== me.user_id) {
		t3 = me.display_name || me.email || truncateUserId(me.user_id);
		$[11] = me.display_name;
		$[12] = me.email;
		$[13] = me.user_id;
		$[14] = t3;
	} else t3 = $[14];
	const label = t3;
	let t4;
	if ($[15] !== className) {
		t4 = cn("flex shrink-0 items-center justify-between gap-2", "px-5 py-2", "border-t border-current/10", "text-[0.65rem] tracking-[0.05em]", className);
		$[15] = className;
		$[16] = t4;
	} else t4 = $[16];
	const t5 = `Logged in as ${label}`;
	let t6;
	if ($[17] !== label || $[18] !== me.user_id) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate font-mono text-foreground/90",
			title: me.user_id,
			children: label
		});
		$[17] = label;
		$[18] = me.user_id;
		$[19] = t6;
	} else t6 = $[19];
	let t7;
	if ($[20] !== me.provider) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "truncate text-muted-foreground/70",
			children: ["via ", me.provider]
		});
		$[20] = me.provider;
		$[21] = t7;
	} else t7 = $[21];
	let t8;
	if ($[22] !== t6 || $[23] !== t7) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-col",
			children: [t6, t7]
		});
		$[22] = t6;
		$[23] = t7;
		$[24] = t8;
	} else t8 = $[24];
	let t9;
	if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
		t9 = cn("shrink-0 rounded p-1.5 text-muted-foreground/70", "transition-colors hover:bg-current/10 hover:text-foreground", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current/40");
		$[25] = t9;
	} else t9 = $[25];
	let t10;
	if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: handleLogout,
			className: t9,
			"aria-label": "Log out",
			title: "Log out",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" })
		});
		$[26] = t10;
	} else t10 = $[26];
	let t11;
	if ($[27] !== t4 || $[28] !== t5 || $[29] !== t8) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t4,
			role: "status",
			"aria-label": t5,
			children: [t8, t10]
		});
		$[27] = t4;
		$[28] = t5;
		$[29] = t8;
		$[30] = t11;
	} else t11 = $[30];
	return t11;
}
function _temp$5() {
	api.logout();
}
//#endregion
//#region web/src/contexts/page-header-context.ts
var PageHeaderContext = (0, import_react.createContext)(null);
//#endregion
//#region web/src/lib/resolve-page-title.ts
var BUILTIN = {
	"/chat": "chat",
	"/sessions": "sessions",
	"/analytics": "analytics",
	"/models": "models",
	"/logs": "logs",
	"/cron": "cron",
	"/skills": "skills",
	"/plugins": "plugins",
	"/profiles": "profiles",
	"/config": "config",
	"/env": "keys",
	"/docs": "documentation"
};
var BUILTIN_LITERAL = {
	"/files": "Files",
	"/mcp": "MCP",
	"/channels": "Channels",
	"/webhooks": "Webhooks",
	"/pairing": "Pairing",
	"/system": "System"
};
function resolvePageTitle(pathname, t, pluginTabs) {
	const normalized = pathname.replace(/\/$/, "") || "/";
	if (normalized === "/") return t.app.nav.sessions;
	const plugin = pluginTabs.find((p) => p.path === normalized);
	if (plugin) return plugin.label;
	const key = BUILTIN[normalized];
	if (key) return t.app.nav[key];
	const literal = BUILTIN_LITERAL[normalized];
	if (literal) return literal;
	const segment = normalized.slice(1);
	if (segment) return segment.charAt(0).toUpperCase() + segment.slice(1);
	return t.app.webUi;
}
//#endregion
//#region web/src/contexts/PageHeaderProvider.tsx
function PageHeaderProvider(t0) {
	const $ = (0, import_compiler_runtime.c)(39);
	const { children, pluginTabs } = t0;
	const { pathname } = useLocation();
	const { t } = useI18n();
	const [titleOverride, setTitleOverride] = (0, import_react.useState)(null);
	const [afterTitle, setAfterTitle] = (0, import_react.useState)(null);
	const [end, setEnd] = (0, import_react.useState)(null);
	const [previousPathname, setPreviousPathname] = (0, import_react.useState)(pathname);
	if (pathname !== previousPathname) {
		setPreviousPathname(pathname);
		setTitleOverride(null);
		setAfterTitle(null);
		setEnd(null);
	}
	let t1;
	if ($[0] !== pathname || $[1] !== pluginTabs || $[2] !== t) {
		t1 = resolvePageTitle(pathname, t, pluginTabs);
		$[0] = pathname;
		$[1] = pluginTabs;
		$[2] = t;
		$[3] = t1;
	} else t1 = $[3];
	const displayTitle = titleOverride ?? t1;
	const isChatRoute = pathname === "/chat" || pathname === "/chat/";
	let t2;
	if ($[4] !== pathname) {
		t2 = pathname === "/env" || pathname.startsWith("/env/");
		$[4] = pathname;
		$[5] = t2;
	} else t2 = $[5];
	const isEnvRoute = t2;
	let t3;
	if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
		t3 = {
			setAfterTitle,
			setEnd,
			setTitle: setTitleOverride
		};
		$[6] = t3;
	} else t3 = $[6];
	const value = t3;
	let t4;
	if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
		t4 = cn("z-1 w-full shrink-0", "box-border border-b border-current/20", "bg-background-base", "min-h-0 overflow-x-hidden overflow-y-visible py-3 sm:h-14 sm:min-h-[3.5rem] sm:overflow-hidden sm:py-0");
		$[7] = t4;
	} else t4 = $[7];
	const t5 = isChatRoute ? "flex-row items-center" : "flex-col justify-center sm:flex-row sm:items-center";
	let t6;
	if ($[8] !== t5) {
		t6 = cn("flex w-full min-w-0 flex-1 gap-3 px-3 sm:h-full sm:gap-3 sm:px-6", t5);
		$[8] = t5;
		$[9] = t6;
	} else t6 = $[9];
	const t7 = afterTitle && isEnvRoute ? "flex-col items-start sm:flex-row sm:items-center" : afterTitle ? "flex-row flex-wrap items-center" : "flex-row items-center";
	let t8;
	if ($[10] !== t7) {
		t8 = cn("flex min-w-0 flex-1 gap-2 sm:gap-3", t7);
		$[10] = t7;
		$[11] = t8;
	} else t8 = $[11];
	const t9 = afterTitle && isEnvRoute ? "max-w-full sm:min-w-0 sm:shrink sm:truncate" : afterTitle ? "shrink truncate" : "truncate";
	let t10;
	if ($[12] !== t9) {
		t10 = cn("font-expanded min-w-0 text-sm font-bold tracking-[0.08em] text-midground", t9);
		$[12] = t9;
		$[13] = t10;
	} else t10 = $[13];
	let t11;
	if ($[14] !== displayTitle || $[15] !== t10) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: t10,
			children: displayTitle
		});
		$[14] = displayTitle;
		$[15] = t10;
		$[16] = t11;
	} else t11 = $[16];
	let t12;
	if ($[17] !== afterTitle || $[18] !== isEnvRoute) {
		t12 = afterTitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("min-w-0 scrollbar-none", isEnvRoute ? "w-full overflow-x-auto sm:flex-1 sm:overflow-x-auto" : "shrink-0 overflow-visible"),
			children: afterTitle
		}) : null;
		$[17] = afterTitle;
		$[18] = isEnvRoute;
		$[19] = t12;
	} else t12 = $[19];
	let t13;
	if ($[20] !== t11 || $[21] !== t12 || $[22] !== t8) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t8,
			children: [t11, t12]
		});
		$[20] = t11;
		$[21] = t12;
		$[22] = t8;
		$[23] = t13;
	} else t13 = $[23];
	let t14;
	if ($[24] !== end || $[25] !== isChatRoute) {
		t14 = end ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("flex min-w-0 sm:max-w-md sm:flex-1", isChatRoute ? "w-auto shrink-0 justify-end" : "w-full justify-start sm:justify-end"),
			children: end
		}) : null;
		$[24] = end;
		$[25] = isChatRoute;
		$[26] = t14;
	} else t14 = $[26];
	let t15;
	if ($[27] !== t13 || $[28] !== t14 || $[29] !== t6) {
		t15 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: t4,
			role: "banner",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: t6,
				children: [t13, t14]
			})
		});
		$[27] = t13;
		$[28] = t14;
		$[29] = t6;
		$[30] = t15;
	} else t15 = $[30];
	const t16 = isChatRoute ? "overflow-hidden" : "overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable]";
	let t17;
	if ($[31] !== t16) {
		t17 = cn("min-h-0 w-full min-w-0 flex-1 flex flex-col", t16);
		$[31] = t16;
		$[32] = t17;
	} else t17 = $[32];
	let t18;
	if ($[33] !== children || $[34] !== t17) {
		t18 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: t17,
			children
		});
		$[33] = children;
		$[34] = t17;
		$[35] = t18;
	} else t18 = $[35];
	let t19;
	if ($[36] !== t15 || $[37] !== t18) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeaderContext.Provider, {
			value,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden",
				children: [t15, t18]
			})
		});
		$[36] = t15;
		$[37] = t18;
		$[38] = t19;
	} else t19 = $[38];
	return t19;
}
//#endregion
//#region web/src/contexts/profile-context.ts
var ProfileContext = (0, import_react.createContext)({
	profile: "",
	currentProfile: "default",
	profiles: [],
	setProfile: () => {}
});
//#endregion
//#region web/src/contexts/useProfileScope.ts
function useProfileScope() {
	return (0, import_react.useContext)(ProfileContext);
}
//#endregion
//#region web/src/components/ProfileSwitcher.tsx
/**
* The machine dashboard's single write-target selector.
*
* Rendered in the sidebar above the nav. Every management page (Config,
* Keys, Skills, MCP, Models) reads/writes the selected profile via the
* fetchJSON ?profile= injection. Hidden when only one profile exists.
*/
function ProfileSwitcher(t0) {
	const $ = (0, import_compiler_runtime.c)(34);
	const { collapsed } = t0;
	const { profile, currentProfile, profiles, setProfile } = useProfileScope();
	const { t } = useI18n();
	const t1 = t.app.currentProfileOption ?? "this dashboard ({name})";
	let t2;
	if ($[0] !== currentProfile || $[1] !== t1) {
		t2 = t1.replace("{name}", currentProfile || "default");
		$[0] = currentProfile;
		$[1] = t1;
		$[2] = t2;
	} else t2 = $[2];
	const currentDashboardLabel = t2;
	if (profiles.length < 2) return null;
	const managed = profile || currentProfile || "default";
	const isOther = !!profile && profile !== currentProfile;
	const managingLabel = t.app.managingProfile ?? "Managing profile";
	const t3 = collapsed && "lg:justify-center lg:px-0";
	let t4;
	if ($[3] !== t3) {
		t4 = cn("flex items-center gap-2 border-b border-current/10 px-3 py-2", t3);
		$[3] = t3;
		$[4] = t4;
	} else t4 = $[4];
	const t5 = isOther ? "text-amber-300" : "text-text-tertiary";
	let t6;
	if ($[5] !== t5) {
		t6 = cn("h-3.5 w-3.5 shrink-0", t5);
		$[5] = t5;
		$[6] = t6;
	} else t6 = $[6];
	let t7;
	if ($[7] !== t6) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: t6 });
		$[7] = t6;
		$[8] = t7;
	} else t7 = $[8];
	const t8 = collapsed && "lg:hidden";
	const t9 = isOther && "[&_button]:border-amber-500/50 [&_button]:text-amber-300";
	let t10;
	if ($[9] !== t8 || $[10] !== t9) {
		t10 = cn("min-w-0 flex-1", t8, "[&_button]:h-7 [&_button]:border-border [&_button]:bg-background [&_button]:px-2 [&_button]:text-xs", "[&_button]:font-sans [&_button]:normal-case [&_button]:tracking-normal", "[&_[role=listbox]>div]:font-sans [&_[role=listbox]>div]:text-xs", "[&_[role=listbox]>div]:normal-case [&_[role=listbox]>div]:tracking-normal", t9);
		$[9] = t8;
		$[10] = t9;
		$[11] = t10;
	} else t10 = $[11];
	let t11;
	if ($[12] !== currentDashboardLabel) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
			value: "",
			children: currentDashboardLabel
		});
		$[12] = currentDashboardLabel;
		$[13] = t11;
	} else t11 = $[13];
	let t12;
	if ($[14] !== currentProfile || $[15] !== profiles) {
		let t13;
		if ($[17] !== currentProfile) {
			t13 = (name) => name !== currentProfile;
			$[17] = currentProfile;
			$[18] = t13;
		} else t13 = $[18];
		t12 = profiles.filter(t13).map(_temp$4);
		$[14] = currentProfile;
		$[15] = profiles;
		$[16] = t12;
	} else t12 = $[16];
	let t13;
	if ($[19] !== profile || $[20] !== setProfile || $[21] !== t10 || $[22] !== t11 || $[23] !== t12) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			className: t10,
			id: "hermes-profile-switcher",
			onValueChange: setProfile,
			value: profile,
			children: [t11, t12]
		});
		$[19] = profile;
		$[20] = setProfile;
		$[21] = t10;
		$[22] = t11;
		$[23] = t12;
		$[24] = t13;
	} else t13 = $[24];
	let t14;
	if ($[25] !== collapsed || $[26] !== managed) {
		t14 = collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: managed
		});
		$[25] = collapsed;
		$[26] = managed;
		$[27] = t14;
	} else t14 = $[27];
	let t15;
	if ($[28] !== managingLabel || $[29] !== t13 || $[30] !== t14 || $[31] !== t4 || $[32] !== t7) {
		t15 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t4,
			title: managingLabel,
			children: [
				t7,
				t13,
				t14
			]
		});
		$[28] = managingLabel;
		$[29] = t13;
		$[30] = t14;
		$[31] = t4;
		$[32] = t7;
		$[33] = t15;
	} else t15 = $[33];
	return t15;
}
function _temp$4(name_0) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
		value: name_0,
		children: name_0
	}, name_0);
}
//#endregion
//#region web/src/components/ProfileScopeBanner.tsx
/**
* App-wide amber banner shown while the global switcher targets a profile
* OTHER than the dashboard's own — every management write (config, keys,
* skills, MCPs, model) and new Chat sessions land in that profile.
*/
function ProfileScopeBanner() {
	const $ = (0, import_compiler_runtime.c)(6);
	const { profile, currentProfile } = useProfileScope();
	const { t } = useI18n();
	if (!profile || profile === currentProfile) return null;
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5 shrink-0" });
		$[0] = t0;
	} else t0 = $[0];
	const t1 = t.app.managingProfileBanner ?? "Managing profile “{name}” — config, keys, skills, MCPs, model, and new chats apply to that profile.";
	let t2;
	if ($[1] !== profile || $[2] !== t1) {
		t2 = t1.replace("{name}", profile);
		$[1] = profile;
		$[2] = t1;
		$[3] = t2;
	} else t2 = $[3];
	let t3;
	if ($[4] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs text-amber-300",
			children: [t0, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t2 })]
		});
		$[4] = t2;
		$[5] = t3;
	} else t3 = $[5];
	return t3;
}
//#endregion
//#region web/src/components/MemoryPressureBanner.tsx
/**
* App-wide warning banner for resource trouble (NS-656): memory pressure
* and disk exhaustion.
*
* Triggers, worst-first:
* 1. Disk critical — the HERMES_HOME volume is nearly full. Worst because
*    the failure mode is silent data loss (SQLite writes failing, sessions
*    and config not persisting), not just a restart (OOF-2/OOF-107).
* 2. Memory critical — the gateway's heartbeat shows system memory in the
*    `critical` band right now.
* 3. Post-mortem — the previous gateway life died uncleanly and its last
*    heartbeat showed near-exhausted memory (`last_boot_suspected_oom`).
*    This is a heuristic, not proof the OOM killer acted — copy says so.
* 4. Disk elevated / 5. memory elevated — early warnings.
*
* All of this previously died in server-side log files; a hosted agent
* could be OOM-killed hourly or fill its disk completely while the
* dashboard looked healthy.
*
* Dismissal semantics (session-scoped, sessionStorage):
* - EVERY dismissal key embeds the reporting boot (`boot_id`), so a gateway
*   restart invalidates all of them. Without this, dismissing `critical`,
*   rebooting, and coming back still-critical would hide the NEW incident —
*   and mask the OOM notice too, since critical takes precedence. Disk
*   entries share the scheme: disk state has no boot relationship, but
*   re-surfacing a still-full disk after a restart is the desired behavior.
* - Within one boot, dismissal masks only the dismissed trigger; escalation
*   (elevated → critical, in either domain) re-opens immediately, and a
*   confirmed recovery (pressure back to "ok", not "unknown") clears that
*   domain's live dismissals so the NEXT episode in the same boot surfaces
*   again.
*/
var STORAGE_KEY$3 = "memoryBannerDismissed";
var MEMORY_LIVE_TRIGGERS = ["critical", "elevated"];
var DISK_LIVE_TRIGGERS = ["disk_critical", "disk_elevated"];
function readDismissed() {
	try {
		const parsed = JSON.parse(sessionStorage.getItem(STORAGE_KEY$3) ?? "[]");
		return Array.isArray(parsed) ? parsed.filter((entry) => typeof entry === "string") : [];
	} catch {
		return [];
	}
}
function writeDismissed(entries) {
	try {
		sessionStorage.setItem(STORAGE_KEY$3, JSON.stringify(entries));
	} catch {}
}
function entryMatches(triggers) {
	return (entry) => triggers.some((sev) => entry === sev || entry.startsWith(`${sev}:`));
}
function MemoryPressureBanner(t0) {
	const $ = (0, import_compiler_runtime.c)(24);
	const { status } = t0;
	const { t } = useI18n();
	const memory = status?.memory;
	const disk = status?.disk;
	const pressure = memory?.pressure;
	const diskPressure = disk?.pressure;
	const [dismissed, setDismissed] = (0, import_react.useState)(readDismissed);
	const [prevPressure, setPrevPressure] = (0, import_react.useState)(pressure);
	const [prevDiskPressure, setPrevDiskPressure] = (0, import_react.useState)(diskPressure);
	if (pressure !== prevPressure || diskPressure !== prevDiskPressure) {
		setPrevPressure(pressure);
		setPrevDiskPressure(diskPressure);
		const recovered = [];
		if (pressure === "ok") recovered.push(entryMatches(MEMORY_LIVE_TRIGGERS));
		if (diskPressure === "ok") recovered.push(entryMatches(DISK_LIVE_TRIGGERS));
		if (recovered.length > 0) {
			const isRecovered = (entry) => recovered.some((match) => match(entry));
			if (dismissed.some(isRecovered)) {
				const next = dismissed.filter((entry_0) => !isRecovered(entry_0));
				writeDismissed(next);
				setDismissed(next);
			}
		}
	}
	let t1;
	let trigger;
	if ($[0] !== diskPressure || $[1] !== dismissed || $[2] !== memory?.boot_id || $[3] !== memory?.last_boot_suspected_oom || $[4] !== memory?.pressure) {
		const activeTriggers = [];
		if (diskPressure === "critical") activeTriggers.push("disk_critical");
		if (memory?.pressure === "critical") activeTriggers.push("critical");
		if (memory?.last_boot_suspected_oom) activeTriggers.push("oom_restart");
		if (diskPressure === "elevated") activeTriggers.push("disk_elevated");
		if (memory?.pressure === "elevated") activeTriggers.push("elevated");
		let t2;
		if ($[7] !== memory?.boot_id) {
			t2 = (trig) => `${trig}:${memory?.boot_id ?? "unknown"}`;
			$[7] = memory?.boot_id;
			$[8] = t2;
		} else t2 = $[8];
		const keyFor = t2;
		trigger = activeTriggers.find((trig_0) => !dismissed.includes(keyFor(trig_0))) ?? null;
		t1 = trigger ? keyFor(trigger) : null;
		$[0] = diskPressure;
		$[1] = dismissed;
		$[2] = memory?.boot_id;
		$[3] = memory?.last_boot_suspected_oom;
		$[4] = memory?.pressure;
		$[5] = t1;
		$[6] = trigger;
	} else {
		t1 = $[5];
		trigger = $[6];
	}
	const dismissKey = t1;
	if (!trigger || !dismissKey) return null;
	let t2;
	if ($[9] !== dismissKey) {
		t2 = () => {
			setDismissed((prev) => {
				const next_0 = prev.includes(dismissKey) ? prev : [...prev, dismissKey];
				writeDismissed(next_0);
				return next_0;
			});
		};
		$[9] = dismissKey;
		$[10] = t2;
	} else t2 = $[10];
	const dismiss = t2;
	const critical = trigger === "critical" || trigger === "disk_critical";
	let t3;
	if ($[11] !== disk) {
		t3 = disk?.free_mb != null ? ` (${Math.round(disk.free_mb)} MB free)` : "";
		$[11] = disk;
		$[12] = t3;
	} else t3 = $[12];
	const diskFreeLabel = t3;
	const message = trigger === "disk_critical" ? `${t.app.diskCriticalBanner ?? "Your agent's disk is almost full. New messages, memories, and settings may fail to save."}${diskFreeLabel}` : trigger === "disk_elevated" ? `${t.app.diskElevatedBanner ?? "Your agent's disk is filling up. Consider clearing old sessions or expanding its storage."}${diskFreeLabel}` : trigger === "oom_restart" ? t.app.memoryOomRestartBanner ?? "Your agent restarted unexpectedly, most likely because it ran out of memory. Long sessions and many concurrent tasks increase memory use." : critical ? t.app.memoryCriticalBanner ?? "Your agent is almost out of memory and may restart. Consider closing idle sessions or upgrading its memory." : t.app.memoryElevatedBanner ?? "Your agent is running low on memory.";
	const t4 = `flex items-center gap-2 border-b px-4 py-1.5 text-xs ${critical ? "border-red-500/40 bg-red-500/10 text-red-300" : "border-amber-500/40 bg-amber-500/10 text-amber-300"}`;
	let t5;
	if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5 shrink-0" });
		$[13] = t5;
	} else t5 = $[13];
	let t6;
	if ($[14] !== message) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 flex-1",
			children: message
		});
		$[14] = message;
		$[15] = t6;
	} else t6 = $[15];
	const t7 = t.app.dismiss ?? "Dismiss";
	let t8;
	if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" });
		$[16] = t8;
	} else t8 = $[16];
	let t9;
	if ($[17] !== dismiss || $[18] !== t7) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": t7,
			onClick: dismiss,
			className: "shrink-0 opacity-70 hover:opacity-100",
			children: t8
		});
		$[17] = dismiss;
		$[18] = t7;
		$[19] = t9;
	} else t9 = $[19];
	let t10;
	if ($[20] !== t4 || $[21] !== t6 || $[22] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "alert",
			"data-testid": "memory-pressure-banner",
			className: t4,
			children: [
				t5,
				t6,
				t9
			]
		});
		$[20] = t4;
		$[21] = t6;
		$[22] = t9;
		$[23] = t10;
	} else t10 = $[23];
	return t10;
}
//#endregion
//#region web/src/components/MultiplexStandaloneBanner.tsx
/**
* A multi-profile host whose gateway came up STANDALONE on a boot guard: every other
* profile's bot is silent until `hermes gateway migrate --multiplex` runs. The backend only
* sets `multiplex_standalone_reason` when there is something unserved (never for a
* single-profile install), so presence == show. Dismissal is session-scoped and keyed on the
* reason text so a different blocker re-surfaces.
*/
var STORAGE_KEY$2 = "multiplexStandaloneBannerDismissed";
function MultiplexStandaloneBanner(t0) {
	const $ = (0, import_compiler_runtime.c)(16);
	const { status } = t0;
	const { t } = useI18n();
	const reason = status?.multiplex_standalone_reason ?? null;
	const [dismissed, setDismissed] = (0, import_react.useState)(_temp$3);
	if (!reason || dismissed === reason) return null;
	let t1;
	if ($[0] !== reason || $[1] !== status?.profiles || $[2] !== t.app.multiplexStandaloneBanner) {
		const unserved = (status?.profiles ?? []).filter(_temp2$3);
		t1 = (t.app.multiplexStandaloneBanner ?? "Your gateway serves only one profile. Not served: {profiles}. Why: {reason}. Fix: hermes gateway migrate --multiplex").replace("{profiles}", unserved.length > 0 ? unserved.join(", ") : "—").replace("{reason}", reason);
		$[0] = reason;
		$[1] = status?.profiles;
		$[2] = t.app.multiplexStandaloneBanner;
		$[3] = t1;
	} else t1 = $[3];
	const message = t1;
	let t2;
	if ($[4] !== reason) {
		t2 = () => {
			try {
				sessionStorage.setItem(STORAGE_KEY$2, reason);
			} catch {}
			setDismissed(reason);
		};
		$[4] = reason;
		$[5] = t2;
	} else t2 = $[5];
	const dismiss = t2;
	let t3;
	if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5 shrink-0" });
		$[6] = t3;
	} else t3 = $[6];
	let t4;
	if ($[7] !== message) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 flex-1",
			children: message
		});
		$[7] = message;
		$[8] = t4;
	} else t4 = $[8];
	const t5 = t.app.dismiss ?? "Dismiss";
	let t6;
	if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" });
		$[9] = t6;
	} else t6 = $[9];
	let t7;
	if ($[10] !== dismiss || $[11] !== t5) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": t5,
			onClick: dismiss,
			className: "shrink-0 opacity-70 hover:opacity-100",
			children: t6
		});
		$[10] = dismiss;
		$[11] = t5;
		$[12] = t7;
	} else t7 = $[12];
	let t8;
	if ($[13] !== t4 || $[14] !== t7) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "alert",
			"data-testid": "multiplex-standalone-banner",
			className: "flex items-center gap-2 border-b border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs text-amber-300",
			children: [
				t3,
				t4,
				t7
			]
		});
		$[13] = t4;
		$[14] = t7;
		$[15] = t8;
	} else t8 = $[15];
	return t8;
}
function _temp2$3(p) {
	return p !== "default";
}
function _temp$3() {
	try {
		return sessionStorage.getItem(STORAGE_KEY$2);
	} catch {
		return null;
	}
}
//#endregion
//#region web/src/components/SharedMetricsConsentBanner.tsx
var DOCS_URL = "https://hermes-agent.nousresearch.com/docs/developer-guide/relay-shared-metrics";
var STORAGE_KEY$1 = "sharedMetricsOfferDismissed";
/**
* The dashboard's first-run shared-metrics offer: the twin of Desktop's composer strip and the
* terminal's offer, with the same two equal answers. Shown while the managed profile has no
* answer in its config.yaml; answering writes it (every surface then stops asking), while the X
* only hides the banner for this browser session. A re-ask (``reask``) is the exception: its X
* keeps the recorded "No thanks", so nobody is asked a third time.
*/
function SharedMetricsConsentBanner() {
	const $ = (0, import_compiler_runtime.c)(39);
	const { t } = useI18n();
	const { profile } = useProfileScope();
	const [loaded, setLoaded] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const [dismissed, setDismissed] = (0, import_react.useState)(_temp$2);
	let t0;
	let t1;
	if ($[0] !== profile) {
		t0 = () => {
			let live = true;
			api.getSharedMetricsConsent().then((next) => {
				if (live) setLoaded({
					profile,
					consent: next
				});
			}).catch(_temp2$2);
			return () => {
				live = false;
			};
		};
		t1 = [profile];
		$[0] = profile;
		$[1] = t0;
		$[2] = t1;
	} else {
		t0 = $[1];
		t1 = $[2];
	}
	(0, import_react.useEffect)(t0, t1);
	const consent = loaded?.profile === profile ? loaded.consent : null;
	if (dismissed || !consent || consent.decided || consent.managed) return null;
	let t2;
	if ($[3] !== profile) {
		t2 = (enabled, send) => {
			setSaving(true);
			setFailed(false);
			api.saveSharedMetricsConsent({
				enabled,
				send
			}).then((next_0) => setLoaded({
				profile,
				consent: next_0
			})).catch(() => setFailed(true)).finally(() => setSaving(false));
		};
		$[3] = profile;
		$[4] = t2;
	} else t2 = $[4];
	const answer = t2;
	let t3;
	if ($[5] !== answer || $[6] !== consent.reask) {
		t3 = () => {
			if (consent.reask) {
				answer(false, false);
				return;
			}
			try {
				sessionStorage.setItem(STORAGE_KEY$1, "1");
			} catch {}
			setDismissed(true);
		};
		$[5] = answer;
		$[6] = consent.reask;
		$[7] = t3;
	} else t3 = $[7];
	const dismiss = t3;
	const t4 = t.app.sharedMetricsTitle ?? "Help improve Hermes?";
	let t5;
	if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-3.5 w-3.5 shrink-0" });
		$[8] = t5;
	} else t5 = $[8];
	const t6 = t.app.sharedMetricsTitle ?? "Help improve Hermes?";
	let t7;
	if ($[9] !== t6) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-semibold",
			children: t6
		});
		$[9] = t6;
		$[10] = t7;
	} else t7 = $[10];
	const t8 = failed ? t.app.sharedMetricsSaveFailed ?? "Couldn't save your choice" : consent.reask ? t.app.sharedMetricsReaskBody ?? "Asking once more: an earlier version could save \"No thanks\" before you saw this question." : t.app.sharedMetricsBody ?? "Shared metrics are bounded counters, never prompts, files, paths or error text. Sharing sends them to Nous once a day.";
	const t9 = t.app.sharedMetricsDetails ?? "Details";
	let t10;
	if ($[11] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: DOCS_URL,
			target: "_blank",
			rel: "noreferrer",
			className: "underline",
			children: t9
		});
		$[11] = t9;
		$[12] = t10;
	} else t10 = $[12];
	let t11;
	if ($[13] !== t10 || $[14] !== t8) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0 flex-1 opacity-80",
			children: [
				t8,
				" ",
				t10
			]
		});
		$[13] = t10;
		$[14] = t8;
		$[15] = t11;
	} else t11 = $[15];
	let t12;
	if ($[16] !== answer) {
		t12 = () => answer(true, true);
		$[16] = answer;
		$[17] = t12;
	} else t12 = $[17];
	const t13 = t.app.sharedMetricsShare ?? "Share with Nous";
	let t14;
	if ($[18] !== saving || $[19] !== t12 || $[20] !== t13) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled: saving,
			className: "shrink-0 rounded border border-current/30 px-2 py-0.5 hover:bg-current/10 disabled:opacity-50",
			onClick: t12,
			children: t13
		});
		$[18] = saving;
		$[19] = t12;
		$[20] = t13;
		$[21] = t14;
	} else t14 = $[21];
	let t15;
	if ($[22] !== answer) {
		t15 = () => answer(false, false);
		$[22] = answer;
		$[23] = t15;
	} else t15 = $[23];
	const t16 = t.app.sharedMetricsOff ?? "No thanks";
	let t17;
	if ($[24] !== saving || $[25] !== t15 || $[26] !== t16) {
		t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled: saving,
			className: "shrink-0 rounded border border-current/30 px-2 py-0.5 hover:bg-current/10 disabled:opacity-50",
			onClick: t15,
			children: t16
		});
		$[24] = saving;
		$[25] = t15;
		$[26] = t16;
		$[27] = t17;
	} else t17 = $[27];
	const t18 = t.app.dismiss ?? "Dismiss";
	let t19;
	if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" });
		$[28] = t19;
	} else t19 = $[28];
	let t20;
	if ($[29] !== dismiss || $[30] !== t18) {
		t20 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": t18,
			onClick: dismiss,
			className: "shrink-0 opacity-70 hover:opacity-100",
			children: t19
		});
		$[29] = dismiss;
		$[30] = t18;
		$[31] = t20;
	} else t20 = $[31];
	let t21;
	if ($[32] !== t11 || $[33] !== t14 || $[34] !== t17 || $[35] !== t20 || $[36] !== t4 || $[37] !== t7) {
		t21 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "region",
			"aria-label": t4,
			"data-testid": "shared-metrics-consent-banner",
			className: "flex flex-wrap items-center gap-2 border-b border-current/20 bg-current/5 px-4 py-1.5 text-xs text-midground",
			children: [
				t5,
				t7,
				t11,
				t14,
				t17,
				t20
			]
		});
		$[32] = t11;
		$[33] = t14;
		$[34] = t17;
		$[35] = t20;
		$[36] = t4;
		$[37] = t7;
		$[38] = t21;
	} else t21 = $[38];
	return t21;
}
function _temp2$2() {}
function _temp$2() {
	try {
		return sessionStorage.getItem(STORAGE_KEY$1) === "1";
	} catch {
		return false;
	}
}
//#endregion
//#region web/src/contexts/system-actions-context.ts
var SystemActionsContext = (0, import_react.createContext)(null);
//#endregion
//#region web/src/contexts/useSystemActions.ts
function useSystemActions() {
	const ctx = (0, import_react.useContext)(SystemActionsContext);
	if (!ctx) throw new Error("useSystemActions must be used within a SystemActionsProvider");
	return ctx;
}
//#endregion
//#region web/src/components/LanguageSwitcher.tsx
/**
* Language picker — shows the current language's endonym, opens a dropdown
* of all supported locales when clicked.  Persists choice to localStorage via
* the I18n context.
*
* Replaces the older two-state EN↔ZH toggle now that we ship 16 locales
* (en, zh, zh-hant, ja, de, es, fr, tr, uk, af, ko, it, ga, pt, ru, hu).
*
* No country flags by design — languages aren't countries, and flag pairings
* inevitably create political mismappings (e.g. Mandarin variants ≠ any single
* jurisdiction, English ≠ GB, Portuguese ≠ PT). Endonyms are unambiguous.
*
* When placed at the bottom of the sidebar (next to ThemeSwitcher), pass
* `dropUp` so the list opens above the trigger and avoids clipping below the
* viewport / overflow ancestors. Below the `sm` breakpoint, `dropUp` uses a
* bottom sheet portaled to `document.body` instead of an anchored dropdown.
*/
function LanguageSwitcher({ collapsed = false, dropUp = false }) {
	const { locale, setLocale, t } = useI18n();
	const [open, setOpen] = (0, import_react.useState)(false);
	const containerRef = (0, import_react.useRef)(null);
	const dropdownRef = (0, import_react.useRef)(null);
	const narrowViewport = useBelowBreakpoint(640);
	const useMobileSheet = Boolean(dropUp && narrowViewport);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		function onKey(e) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open || useMobileSheet) return;
		function onPointerDown(e_0) {
			const target = e_0.target;
			if (containerRef.current?.contains(target)) return;
			if (dropdownRef.current?.contains(target)) return;
			setOpen(false);
		}
		document.addEventListener("pointerdown", onPointerDown);
		return () => document.removeEventListener("pointerdown", onPointerDown);
	}, [open, useMobileSheet]);
	const current = LOCALE_META[locale];
	const allLocales = Object.entries(LOCALE_META);
	const sheetTitle = t.language.switchTo;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: "relative inline-flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				ghost: true,
				onClick: () => setOpen((v) => !v),
				title: t.language.switchTo,
				"aria-label": t.language.switchTo,
				"aria-haspopup": "listbox",
				"aria-expanded": open,
				className: cn("px-2 py-1 normal-case tracking-normal font-normal text-xs text-text-secondary hover:text-foreground", collapsed && "hover:bg-transparent"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center gap-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						className: "hidden sm:inline text-display tracking-wide text-xs",
						children: locale === "en" ? "EN" : current.name
					})
				})
			}),
			useMobileSheet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSheet, {
				backdropDismissLabel: t.common.close,
				onClose: () => setOpen(false),
				open,
				title: sheetTitle,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-label": sheetTitle,
					role: "listbox",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcherOptions, {
						allLocales,
						locale,
						setLocale,
						setOpen
					})
				})
			}),
			open && !useMobileSheet && (() => {
				const rect = containerRef.current?.getBoundingClientRect();
				const dropdown = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: dropdownRef,
					"aria-label": sheetTitle,
					className: cn("min-w-[10rem] border border-border bg-popover shadow-md py-1 max-h-80 overflow-y-auto", dropUp ? "fixed z-[100]" : "absolute z-50 right-0 top-full mt-1"),
					role: "listbox",
					style: dropUp && rect ? {
						bottom: window.innerHeight - rect.top + 4,
						left: rect.left
					} : void 0,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcherOptions, {
						allLocales,
						locale,
						setLocale,
						setOpen
					})
				});
				return dropUp ? (0, import_react_dom.createPortal)(dropdown, document.body) : dropdown;
			})()
		]
	});
}
function LanguageSwitcherOptions(t0) {
	const $ = (0, import_compiler_runtime.c)(11);
	const { allLocales, locale, setLocale, setOpen } = t0;
	let t1;
	if ($[0] !== allLocales || $[1] !== locale || $[2] !== setLocale || $[3] !== setOpen) {
		let t2;
		if ($[5] !== locale || $[6] !== setLocale || $[7] !== setOpen) {
			t2 = (t3) => {
				const [code, meta] = t3;
				const selected = code === locale;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					"aria-selected": selected,
					className: cn("w-full text-left px-3 py-1.5 flex items-center gap-2 cursor-pointer", "font-sans text-display text-xs tracking-[0.08em]", "hover:bg-accent hover:text-accent-foreground transition-colors", selected ? "font-semibold text-foreground" : "text-muted-foreground"),
					onClick: () => {
						setLocale(code);
						setOpen(false);
					},
					role: "option",
					type: "button",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: meta.name
					}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "ml-auto h-3 w-3 shrink-0 text-midground" })]
				}, code);
			};
			$[5] = locale;
			$[6] = setLocale;
			$[7] = setOpen;
			$[8] = t2;
		} else t2 = $[8];
		t1 = allLocales.map(t2);
		$[0] = allLocales;
		$[1] = locale;
		$[2] = setLocale;
		$[3] = setOpen;
		$[4] = t1;
	} else t1 = $[4];
	let t2;
	if ($[9] !== t1) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t1 });
		$[9] = t1;
		$[10] = t2;
	} else t2 = $[10];
	return t2;
}
//#endregion
//#region web/src/themes/presets.ts
/**
* Built-in dashboard themes.
*
* Each theme defines its own palette, typography, and layout so switching
* themes produces visible changes beyond just color — fonts, density, and
* corner-radius all shift to match the theme's personality.
*
* Theme names must stay in sync with the backend's
* `_BUILTIN_DASHBOARD_THEMES` list in `hermes_cli/web_server.py`.
*
* Presets that also ship on the desktop (midnight, ember, mono, cyberpunk)
* take their colours from `@hermes/shared` `THEME_PRESET_PALETTES` so both
* surfaces render one palette; only typography/layout/overrides live here.
*/
/** Default system stack — neutral, safe fallback for every platform. */
var SYSTEM_SANS$1 = "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif";
var SYSTEM_MONO$1 = "ui-monospace, \"SF Mono\", \"Cascadia Mono\", Menlo, Consolas, monospace";
var DEFAULT_TYPOGRAPHY = {
	fontSans: SYSTEM_SANS$1,
	fontMono: SYSTEM_MONO$1,
	baseSize: "15px",
	lineHeight: "1.55",
	letterSpacing: "0"
};
var DEFAULT_LAYOUT = {
	radius: "0.5rem",
	density: "comfortable"
};
/**
* Project a shared (desktop-shaped) preset palette onto the dashboard's
* 3-slot model. The dashboard's `midground` is its text + primary-fill
* colour, which is the desktop's `primary`; its `warmGlow` is the brand
* accent stroke, which is the desktop's `midground` (falling back to `ring`).
* `foreground` stays the dashboard's invisible white overlay. Dark palettes
* are the dashboard's home turf, so a preset shipping `darkColors` is read
* from that side.
*/
function webPresetFromShared(preset) {
	const colors = preset.darkColors ?? preset.colors;
	const [r, g, b] = parseColor(colors.midground ?? colors.ring) ?? [
		255,
		255,
		255
	];
	return {
		background: {
			hex: colors.background,
			alpha: 1
		},
		midground: {
			hex: colors.primary,
			alpha: 1
		},
		foreground: {
			hex: "#ffffff",
			alpha: 0
		},
		warmGlow: `rgba(${r}, ${g}, ${b}, 0.3)`
	};
}
var defaultTheme = {
	name: "default",
	label: "Hermes Teal",
	description: "Classic dark teal — the canonical Hermes look",
	palette: {
		background: {
			hex: "#041c1c",
			alpha: 1
		},
		midground: {
			hex: "#ffe6cb",
			alpha: 1
		},
		foreground: {
			hex: "#ffffff",
			alpha: 0
		},
		warmGlow: "rgba(255, 189, 56, 0.35)",
		noiseOpacity: 1
	},
	typography: DEFAULT_TYPOGRAPHY,
	layout: DEFAULT_LAYOUT,
	terminalBackground: "#000000"
};
var midnightTheme = {
	name: "midnight",
	label: "Midnight",
	description: "Deep blue-violet with cool accents",
	palette: {
		...webPresetFromShared(THEME_PRESET_PALETTES.midnight),
		noiseOpacity: .8
	},
	typography: {
		...DEFAULT_TYPOGRAPHY,
		fontSans: `"Inter", ${SYSTEM_SANS$1}`,
		fontMono: `"JetBrains Mono", ${SYSTEM_MONO$1}`,
		fontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
		letterSpacing: "-0.005em"
	},
	layout: {
		...DEFAULT_LAYOUT,
		radius: "0.75rem"
	}
};
var emberTheme = {
	name: "ember",
	label: "Ember",
	description: "Warm crimson and bronze — forge vibes",
	palette: {
		...webPresetFromShared(THEME_PRESET_PALETTES.ember),
		noiseOpacity: 1
	},
	typography: {
		...DEFAULT_TYPOGRAPHY,
		fontSans: `"Spectral", Georgia, "Times New Roman", serif`,
		fontMono: `"IBM Plex Mono", ${SYSTEM_MONO$1}`,
		fontUrl: "https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap"
	},
	layout: {
		...DEFAULT_LAYOUT,
		radius: "0.25rem"
	},
	colorOverrides: {
		destructive: "#c92d0f",
		warning: "#f97316"
	}
};
var monoTheme = {
	name: "mono",
	label: "Mono",
	description: "Clean grayscale — minimal and focused",
	palette: {
		...webPresetFromShared(THEME_PRESET_PALETTES.mono),
		noiseOpacity: .6
	},
	typography: {
		...DEFAULT_TYPOGRAPHY,
		fontSans: `"IBM Plex Sans", ${SYSTEM_SANS$1}`,
		fontMono: `"IBM Plex Mono", ${SYSTEM_MONO$1}`,
		fontUrl: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
	},
	layout: {
		...DEFAULT_LAYOUT,
		radius: "0"
	}
};
var cyberpunkTheme = {
	name: "cyberpunk",
	label: "Cyberpunk",
	description: "Neon green on black — matrix terminal",
	palette: {
		...webPresetFromShared(THEME_PRESET_PALETTES.cyberpunk),
		noiseOpacity: 1.2
	},
	typography: {
		...DEFAULT_TYPOGRAPHY,
		fontSans: `"Share Tech Mono", "JetBrains Mono", ${SYSTEM_MONO$1}`,
		fontMono: `"Share Tech Mono", "JetBrains Mono", ${SYSTEM_MONO$1}`,
		fontUrl: "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=JetBrains+Mono:wght@400;700&display=swap"
	},
	layout: {
		...DEFAULT_LAYOUT,
		radius: "0"
	},
	colorOverrides: {
		success: "#00ff88",
		warning: "#ffd700",
		destructive: "#ff0055"
	}
};
var roseTheme = {
	name: "rose",
	label: "Rosé",
	description: "Soft pink and warm ivory — easy on the eyes",
	palette: {
		background: {
			hex: "#1a0f15",
			alpha: 1
		},
		midground: {
			hex: "#ffd4e1",
			alpha: 1
		},
		foreground: {
			hex: "#ffffff",
			alpha: 0
		},
		warmGlow: "rgba(249, 168, 212, 0.3)",
		noiseOpacity: .9
	},
	typography: {
		...DEFAULT_TYPOGRAPHY,
		fontSans: `"Fraunces", Georgia, serif`,
		fontMono: `"DM Mono", ${SYSTEM_MONO$1}`,
		fontUrl: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=DM+Mono:wght@400;500&display=swap"
	},
	layout: {
		...DEFAULT_LAYOUT,
		radius: "1rem"
	}
};
/** Light mode — vivid Nous-blue accents on a cream canvas. */
var nousBlueTheme = {
	name: "nous-blue",
	label: "Nous Blue",
	description: "Light mode — vivid Nous-blue accents on cream canvas",
	palette: {
		background: {
			hex: "#E8F2FD",
			alpha: 1
		},
		midground: {
			hex: "#0053FD",
			alpha: 1
		},
		foreground: {
			hex: "#170d02",
			alpha: 0
		},
		warmGlow: "rgba(0, 83, 253, 0.12)",
		noiseOpacity: 0
	},
	typography: DEFAULT_TYPOGRAPHY,
	layout: DEFAULT_LAYOUT,
	terminalBackground: "#f5f8fc",
	terminalForeground: "#170d02",
	seriesColors: {
		inputTokenAccent: "#001934",
		outputTokenAccent: "#0053fd"
	},
	swatchColors: [
		"#170d02",
		"#0053FD",
		"#E8F2FD"
	]
};
var BUILTIN_THEMES = {
	default: defaultTheme,
	"default-large": {
		name: "default-large",
		label: "Hermes Teal (Large)",
		description: "Hermes Teal with bigger fonts and roomier spacing",
		palette: defaultTheme.palette,
		typography: {
			...DEFAULT_TYPOGRAPHY,
			baseSize: "18px",
			lineHeight: "1.65"
		},
		layout: {
			...DEFAULT_LAYOUT,
			density: "spacious"
		}
	},
	"nous-blue": nousBlueTheme,
	midnight: midnightTheme,
	ember: emberTheme,
	mono: monoTheme,
	cyberpunk: cyberpunkTheme,
	rose: roseTheme
};
//#endregion
//#region web/src/themes/fonts.ts
/**
* Curated UI-font catalog for the dashboard font override.
*
* The font override is an independent layer that sits ON TOP of the active
* theme: a theme still ships its own `typography.fontSans` default, but a
* user can pick any font here and it persists across theme switches. Picking
* "Theme default" clears the override and returns to whatever the active
* theme specifies.
*
* Why a curated catalog instead of a free-text font name + URL box: the
* `fontUrl` is injected into the page as a `<link rel="stylesheet">`, so
* accepting an arbitrary user-supplied URL would be a self-XSS / SSRF-ish
* footgun in the dashboard. A vetted catalog keeps the injected origins
* fixed (system stacks + Google Fonts) while still giving real choice. The
* matching allow-list on the backend (`_FONT_CHOICES` in web_server.py)
* rejects any id not defined here.
*
* Keep `FONT_CHOICES` in sync with `_FONT_CHOICES` in
* `hermes_cli/web_server.py` — the ids must match exactly.
*/
/** System stacks reused from presets so "System" choices need no webfont. */
var SYSTEM_SANS = "system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif";
var SYSTEM_MONO = "ui-monospace, \"SF Mono\", \"Cascadia Mono\", Menlo, Consolas, monospace";
var SYSTEM_SERIF = "Georgia, Cambria, \"Times New Roman\", Times, serif";
/** Sentinel id meaning "no override — use the active theme's font". */
var THEME_DEFAULT_FONT_ID = "theme";
var GF = (family) => `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
/**
* The curated set. Order is the display order in the picker (grouped by
* category in the UI). `stack` always ends in a system fallback so a font
* that fails to load still renders something sane.
*/
var FONT_CHOICES = [
	{
		id: "system-sans",
		label: "System Sans",
		category: "sans",
		stack: SYSTEM_SANS
	},
	{
		id: "system-serif",
		label: "System Serif",
		category: "serif",
		stack: SYSTEM_SERIF
	},
	{
		id: "system-mono",
		label: "System Mono",
		category: "mono",
		stack: SYSTEM_MONO
	},
	{
		id: "inter",
		label: "Inter",
		category: "sans",
		stack: `"Inter", ${SYSTEM_SANS}`,
		fontUrl: GF("Inter:wght@400;500;600;700")
	},
	{
		id: "ibm-plex-sans",
		label: "IBM Plex Sans",
		category: "sans",
		stack: `"IBM Plex Sans", ${SYSTEM_SANS}`,
		fontUrl: GF("IBM+Plex+Sans:wght@400;500;600;700")
	},
	{
		id: "work-sans",
		label: "Work Sans",
		category: "sans",
		stack: `"Work Sans", ${SYSTEM_SANS}`,
		fontUrl: GF("Work+Sans:wght@400;500;600;700")
	},
	{
		id: "atkinson-hyperlegible",
		label: "Atkinson Hyperlegible",
		category: "sans",
		stack: `"Atkinson Hyperlegible", ${SYSTEM_SANS}`,
		fontUrl: GF("Atkinson+Hyperlegible:wght@400;700")
	},
	{
		id: "dm-sans",
		label: "DM Sans",
		category: "sans",
		stack: `"DM Sans", ${SYSTEM_SANS}`,
		fontUrl: GF("DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700")
	},
	{
		id: "spectral",
		label: "Spectral",
		category: "serif",
		stack: `"Spectral", ${SYSTEM_SERIF}`,
		fontUrl: GF("Spectral:wght@400;500;600;700")
	},
	{
		id: "fraunces",
		label: "Fraunces",
		category: "serif",
		stack: `"Fraunces", ${SYSTEM_SERIF}`,
		fontUrl: GF("Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600")
	},
	{
		id: "source-serif",
		label: "Source Serif 4",
		category: "serif",
		stack: `"Source Serif 4", ${SYSTEM_SERIF}`,
		fontUrl: GF("Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700")
	},
	{
		id: "jetbrains-mono",
		label: "JetBrains Mono",
		category: "mono",
		stack: `"JetBrains Mono", ${SYSTEM_MONO}`,
		fontUrl: GF("JetBrains+Mono:wght@400;500;700")
	},
	{
		id: "ibm-plex-mono",
		label: "IBM Plex Mono",
		category: "mono",
		stack: `"IBM Plex Mono", ${SYSTEM_MONO}`,
		fontUrl: GF("IBM+Plex+Mono:wght@400;500;700")
	},
	{
		id: "space-mono",
		label: "Space Mono",
		category: "mono",
		stack: `"Space Mono", ${SYSTEM_MONO}`,
		fontUrl: GF("Space+Mono:wght@400;700")
	}
];
var FONT_BY_ID = Object.fromEntries(FONT_CHOICES.map((f) => [f.id, f]));
/** Look up a font choice by id. Returns undefined for the theme-default
*  sentinel and for any unknown id. */
function getFontChoice(id) {
	if (!id || id === "theme") return void 0;
	return FONT_BY_ID[id];
}
//#endregion
//#region web/src/themes/context.tsx
/** LocalStorage key — pre-applied before the React tree mounts to avoid
*  a visible flash of the default palette on theme-overridden installs. */
var STORAGE_KEY = "hermes-dashboard-theme";
/** LocalStorage key for the font override (independent of theme). Holds a
*  font id from the catalog in `fonts.ts`, or the `THEME_DEFAULT_FONT_ID`
*  sentinel / absent = "use the active theme's font". Pre-applied before
*  the React tree mounts (see `main.tsx`) to avoid a font flash. */
var FONT_STORAGE_KEY = "hermes-dashboard-font";
/** Renames of built-in theme keys we've shipped previously. Without this,
*  users who saved one of the old names in localStorage (or had it
*  persisted server-side) would silently fall back to `defaultTheme`
*  because the lookup in `resolveTheme` no longer finds the stale key.
*  Keep entries here until enough release cycles have passed that we can
*  reasonably assume nobody still has the old value persisted. */
var THEME_NAME_ALIASES = { "lens-5i": "nous-blue" };
function migrateThemeName(name) {
	return THEME_NAME_ALIASES[name] ?? name;
}
/** Tracks fontUrls we've already injected so multiple theme switches don't
*  pile up <link> tags. Keyed by URL. */
var INJECTED_FONT_URLS = /* @__PURE__ */ new Set();
/** Turn a ThemeLayer into the two CSS expressions the DS consumes:
*  `--<name>` (color-mix'd with alpha) and `--<name>-base` (opaque hex). */
function layerVars(name, layer) {
	const pct = Math.round(layer.alpha * 100);
	return {
		[`--${name}`]: `color-mix(in srgb, ${layer.hex} ${pct}%, transparent)`,
		[`--${name}-base`]: layer.hex,
		[`--${name}-alpha`]: String(layer.alpha)
	};
}
function paletteVars(palette) {
	return {
		...layerVars("background", palette.background),
		...layerVars("midground", palette.midground),
		...layerVars("foreground", palette.foreground)
	};
}
var DENSITY_MULTIPLIERS = {
	compact: "0.85",
	comfortable: "1",
	spacious: "1.2"
};
function typographyVars(typo) {
	return {
		"--theme-font-sans": typo.fontSans,
		"--theme-font-mono": typo.fontMono,
		"--theme-font-display": typo.fontDisplay ?? typo.fontSans,
		"--theme-base-size": typo.baseSize,
		"--theme-line-height": typo.lineHeight,
		"--theme-letter-spacing": typo.letterSpacing
	};
}
function layoutVars(layout) {
	return {
		"--radius": layout.radius,
		"--theme-radius": layout.radius,
		"--theme-spacing-mul": DENSITY_MULTIPLIERS[layout.density] ?? "1",
		"--theme-density": layout.density
	};
}
/** Map a color-overrides key (camelCase) to its `--color-*` CSS var. */
var OVERRIDE_KEY_TO_VAR = {
	card: "--color-card",
	cardForeground: "--color-card-foreground",
	popover: "--color-popover",
	popoverForeground: "--color-popover-foreground",
	primary: "--color-primary",
	primaryForeground: "--color-primary-foreground",
	secondary: "--color-secondary",
	secondaryForeground: "--color-secondary-foreground",
	muted: "--color-muted",
	mutedForeground: "--color-muted-foreground",
	accent: "--color-accent",
	accentForeground: "--color-accent-foreground",
	destructive: "--color-destructive",
	destructiveForeground: "--color-destructive-foreground",
	success: "--color-success",
	warning: "--color-warning",
	border: "--color-border",
	input: "--color-input",
	ring: "--color-ring"
};
/** Keys we might have written on a previous theme — needed to know which
*  properties to clear when a theme with fewer overrides replaces one
*  with more. */
var ALL_OVERRIDE_VARS = Object.values(OVERRIDE_KEY_TO_VAR);
function overrideVars(overrides) {
	if (!overrides) return {};
	const out = {};
	for (const [key, value] of Object.entries(overrides)) {
		if (!value) continue;
		const cssVar = OVERRIDE_KEY_TO_VAR[key];
		if (cssVar) out[cssVar] = value;
	}
	return out;
}
/** Map data-series accents to their CSS vars. Themes omit either field to
*  inherit the `:root` default from `index.css`; when omitted we also
*  proactively clear any leftover value from a previous theme so switches
*  don't carry stale colors. */
var SERIES_KEY_TO_VAR = {
	inputTokenAccent: "--series-input-token",
	outputTokenAccent: "--series-output-token"
};
var ALL_SERIES_VARS = Object.values(SERIES_KEY_TO_VAR);
function seriesColorVars(series) {
	if (!series) return {};
	const out = {};
	for (const [key, value] of Object.entries(series)) {
		if (!value) continue;
		const cssVar = SERIES_KEY_TO_VAR[key];
		if (cssVar) out[cssVar] = value;
	}
	return out;
}
/** Well-known named asset slots a theme may populate. Kept in sync with
*  `_THEME_NAMED_ASSET_KEYS` in `hermes_cli/web_server.py`. */
var NAMED_ASSET_KEYS = [
	"bg",
	"hero",
	"logo",
	"crest",
	"sidebar",
	"header"
];
/** Component buckets mirrored from the backend's `_THEME_COMPONENT_BUCKETS`.
*  Each bucket emits `--component-<bucket>-<kebab-prop>` CSS vars. */
var COMPONENT_BUCKETS = [
	"card",
	"header",
	"footer",
	"sidebar",
	"tab",
	"progress",
	"badge",
	"backdrop",
	"page"
];
/** Camel → kebab (`clipPath` → `clip-path`). */
function toKebab(s) {
	return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}
/** Build `--theme-asset-*` CSS vars from the assets block. Values are wrapped
*  in `url(...)` when they look like a bare path/URL; raw CSS expressions
*  (`linear-gradient(...)`, pre-wrapped `url(...)`, `none`) pass through. */
function assetVars(assets) {
	if (!assets) return {};
	const out = {};
	const wrap = (v) => {
		const trimmed = v.trim();
		if (!trimmed) return "";
		if (/^(url\(|linear-gradient|radial-gradient|conic-gradient|none$)/i.test(trimmed)) return trimmed;
		return `url("${trimmed.replace(/"/g, "\\\"")}")`;
	};
	for (const key of NAMED_ASSET_KEYS) {
		const val = assets[key];
		if (typeof val === "string" && val.trim()) {
			out[`--theme-asset-${key}`] = wrap(val);
			out[`--theme-asset-${key}-raw`] = val;
		}
	}
	if (assets.custom) for (const [key, val] of Object.entries(assets.custom)) {
		if (typeof val !== "string" || !val.trim()) continue;
		if (!/^[a-zA-Z0-9_-]+$/.test(key)) continue;
		out[`--theme-asset-custom-${key}`] = wrap(val);
		out[`--theme-asset-custom-${key}-raw`] = val;
	}
	return out;
}
/** Build `--component-<bucket>-<prop>` CSS vars from the componentStyles
*  block. Values pass through untouched so themes can use any CSS expression. */
function componentStyleVars(styles) {
	if (!styles) return {};
	const out = {};
	for (const bucket of COMPONENT_BUCKETS) {
		const props = styles[bucket];
		if (!props) continue;
		for (const [prop, value] of Object.entries(props)) {
			if (typeof value !== "string" || !value.trim()) continue;
			if (!/^[a-zA-Z0-9_-]+$/.test(prop)) continue;
			out[`--component-${bucket}-${toKebab(prop)}`] = value;
		}
	}
	return out;
}
var _PREV_DYNAMIC_VAR_KEYS = /* @__PURE__ */ new Set();
/** ID for the injected <style> tag that carries a theme's customCSS.
*  A single tag is reused + replaced on every theme switch. */
var CUSTOM_CSS_STYLE_ID = "hermes-theme-custom-css";
function applyCustomCSS(css) {
	if (typeof document === "undefined") return;
	let el = document.getElementById(CUSTOM_CSS_STYLE_ID);
	if (!css || !css.trim()) {
		if (el) el.remove();
		return;
	}
	if (!el) {
		el = document.createElement("style");
		el.id = CUSTOM_CSS_STYLE_ID;
		el.setAttribute("data-hermes-theme-css", "true");
		document.head.appendChild(el);
	}
	el.textContent = css;
}
function applyLayoutVariant(variant) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	const final = variant ?? "standard";
	root.dataset.layoutVariant = final;
	root.style.setProperty("--theme-layout-variant", final);
}
function injectFontStylesheet(url) {
	if (!url || typeof document === "undefined") return;
	if (INJECTED_FONT_URLS.has(url)) return;
	if (document.querySelector(`link[rel="stylesheet"][href="${CSS.escape(url)}"]`)) {
		INJECTED_FONT_URLS.add(url);
		return;
	}
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = url;
	link.setAttribute("data-hermes-theme-font", "true");
	document.head.appendChild(link);
	INJECTED_FONT_URLS.add(url);
}
/** The active font-override id, mirrored at module scope so `applyTheme`
*  can re-assert it after every theme switch (theme application rewrites
*  `--theme-font-sans`, so the override has to win again afterwards). */
var _ACTIVE_FONT_OVERRIDE = THEME_DEFAULT_FONT_ID;
/** Apply (or clear) the font override on `:root`. When a catalog font is
*  active we override `--theme-font-sans` and `--theme-font-display` and
*  inject its webfont; the theme keeps ownership of `--theme-font-mono`
*  (code/terminal) so picking a body font doesn't mangle code blocks.
*  Passing the theme-default sentinel removes the override so the theme's
*  own font shows through. */
function applyFontOverride(fontId) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	const choice = getFontChoice(fontId);
	if (!choice) {
		root.style.removeProperty("--theme-font-override-sans");
		return;
	}
	injectFontStylesheet(choice.fontUrl);
	root.style.setProperty("--theme-font-override-sans", choice.stack);
	root.style.setProperty("--theme-font-sans", choice.stack);
	root.style.setProperty("--theme-font-display", choice.stack);
}
function applyTheme(theme) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	for (const cssVar of ALL_OVERRIDE_VARS) root.style.removeProperty(cssVar);
	for (const cssVar of ALL_SERIES_VARS) root.style.removeProperty(cssVar);
	for (const prevKey of _PREV_DYNAMIC_VAR_KEYS) root.style.removeProperty(prevKey);
	const assetMap = assetVars(theme.assets);
	const componentMap = componentStyleVars(theme.componentStyles);
	_PREV_DYNAMIC_VAR_KEYS = /* @__PURE__ */ new Set([...Object.keys(assetMap), ...Object.keys(componentMap)]);
	const vars = {
		...paletteVars(theme.palette),
		...typographyVars(theme.typography),
		...layoutVars(theme.layout),
		...overrideVars(theme.colorOverrides),
		...seriesColorVars(theme.seriesColors),
		...assetMap,
		...componentMap
	};
	for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v);
	injectFontStylesheet(theme.typography.fontUrl);
	applyCustomCSS(theme.customCSS);
	applyLayoutVariant(theme.layoutVariant);
	root.style.setProperty("--theme-terminal-background", theme.terminalBackground ?? "#000000");
	root.style.setProperty("--theme-terminal-foreground", theme.terminalForeground ?? "#f0e6d2");
	applyFontOverride(_ACTIVE_FONT_OVERRIDE);
}
function ThemeProvider({ children }) {
	/** Name of the currently active theme (built-in id or user YAML name). */
	const [themeName, setThemeName] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return "default";
		const stored = window.localStorage.getItem(STORAGE_KEY) ?? "default";
		const migrated = migrateThemeName(stored);
		if (migrated !== stored) window.localStorage.setItem(STORAGE_KEY, migrated);
		return migrated;
	});
	/** All selectable themes (shown in the picker). Starts with just the
	*  built-ins; the API call below merges in user themes. */
	const [availableThemes, setAvailableThemes] = (0, import_react.useState)(() => Object.values(BUILTIN_THEMES).map((t) => ({
		name: t.name,
		label: t.label,
		description: t.description
	})));
	/** Full definitions for user themes keyed by name — the API provides
	*  these so custom YAMLs apply without a client-side stub. */
	const [userThemeDefs, setUserThemeDefs] = (0, import_react.useState)({});
	/** Active font-override id (independent of theme). `THEME_DEFAULT_FONT_ID`
	*  = no override. Seeded from localStorage so it's applied flash-free. */
	const [fontId, setFontId] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return THEME_DEFAULT_FONT_ID;
		const stored = window.localStorage.getItem(FONT_STORAGE_KEY);
		const valid = stored && getFontChoice(stored) ? stored : THEME_DEFAULT_FONT_ID;
		_ACTIVE_FONT_OVERRIDE = valid;
		return valid;
	});
	const resolveTheme = (0, import_react.useCallback)((name) => {
		return BUILTIN_THEMES[name] ?? userThemeDefs[name] ?? defaultTheme;
	}, [userThemeDefs]);
	(0, import_react.useEffect)(() => {
		_ACTIVE_FONT_OVERRIDE = fontId;
		applyTheme(resolveTheme(themeName));
	}, [
		themeName,
		resolveTheme,
		fontId
	]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		api.getThemes().then((resp) => {
			if (cancelled) return;
			if (resp.themes?.length) {
				setAvailableThemes(resp.themes.map((t) => ({
					name: t.name,
					label: t.label,
					description: t.description,
					definition: t.definition
				})));
				const defs = {};
				for (const entry of resp.themes) if (entry.definition) defs[entry.name] = entry.definition;
				if (Object.keys(defs).length > 0) setUserThemeDefs(defs);
			}
			if (resp.active) {
				const migratedActive = migrateThemeName(resp.active);
				if (migratedActive !== themeName) {
					setThemeName(migratedActive);
					window.localStorage.setItem(STORAGE_KEY, migratedActive);
				}
				if (migratedActive !== resp.active) api.setTheme(migratedActive).catch(() => {});
			}
		}).catch(() => {});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		api.getFontPref().then((resp) => {
			if (cancelled) return;
			const serverId = resp?.font && getFontChoice(resp.font) ? resp.font : THEME_DEFAULT_FONT_ID;
			if (serverId !== fontId) {
				setFontId(serverId);
				if (typeof window !== "undefined") window.localStorage.setItem(FONT_STORAGE_KEY, serverId);
			}
		}).catch(() => {});
		return () => {
			cancelled = true;
		};
	}, []);
	const setTheme = (0, import_react.useCallback)((name) => {
		const next = (/* @__PURE__ */ new Set([
			...Object.keys(BUILTIN_THEMES),
			...availableThemes.map((t) => t.name),
			...Object.keys(userThemeDefs)
		])).has(name) ? name : "default";
		setThemeName(next);
		if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next);
		api.setTheme(next).catch(() => {});
	}, [availableThemes, userThemeDefs]);
	const setFont = (0, import_react.useCallback)((id) => {
		const next = getFontChoice(id) ? id : THEME_DEFAULT_FONT_ID;
		setFontId(next);
		if (typeof window !== "undefined") window.localStorage.setItem(FONT_STORAGE_KEY, next);
		api.setFontPref(next).catch(() => {});
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		theme: resolveTheme(themeName),
		themeName,
		availableThemes,
		setTheme,
		fontId,
		fontChoices: FONT_CHOICES,
		setFont
	}), [
		themeName,
		availableThemes,
		setTheme,
		resolveTheme,
		fontId,
		setFont
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value,
		children
	});
}
function useTheme() {
	return (0, import_react.useContext)(ThemeContext);
}
var ThemeContext = (0, import_react.createContext)({
	theme: defaultTheme,
	themeName: "default",
	availableThemes: Object.values(BUILTIN_THEMES).map((t) => ({
		name: t.name,
		label: t.label,
		description: t.description
	})),
	setTheme: () => {},
	fontId: THEME_DEFAULT_FONT_ID,
	fontChoices: FONT_CHOICES,
	setFont: () => {}
});
//#endregion
//#region web/src/components/ThemeSwitcher.tsx
/**
* Compact theme picker mounted next to the language switcher in the header.
* Each dropdown row shows a 3-stop swatch (background / midground / warm
* glow) so users can preview the palette before committing. User-defined
* themes from `~/.hermes/dashboard-themes/*.yaml` use their API-provided
* definitions so they show real palette swatches just like built-ins.
*
* When placed at the bottom of a container (e.g. the sidebar rail), pass
* `dropUp` so the menu opens above the trigger instead of clipping below
* the viewport. On viewports below the `sm` breakpoint, `dropUp` uses a
* bottom sheet portaled to `document.body` so the picker is not clipped by
* the sidebar (same idea as a responsive Drawer).
*/
function ThemeSwitcher({ collapsed = false, dropUp = false }) {
	const { themeName, availableThemes, setTheme, fontId, fontChoices, setFont } = useTheme();
	const { t } = useI18n();
	const [open, setOpen] = (0, import_react.useState)(false);
	const wrapperRef = (0, import_react.useRef)(null);
	const dropdownRef = (0, import_react.useRef)(null);
	const narrowViewport = useBelowBreakpoint(640);
	const useMobileSheet = Boolean(dropUp && narrowViewport);
	const close = (0, import_react.useCallback)(() => setOpen(false), []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") close();
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, close]);
	(0, import_react.useEffect)(() => {
		if (!open || useMobileSheet) return;
		const onMouseDown = (e_0) => {
			const target = e_0.target;
			if (wrapperRef.current?.contains(target)) return;
			if (dropdownRef.current?.contains(target)) return;
			close();
		};
		document.addEventListener("mousedown", onMouseDown);
		return () => document.removeEventListener("mousedown", onMouseDown);
	}, [
		open,
		close,
		useMobileSheet
	]);
	const label = availableThemes.find((th) => th.name === themeName)?.label ?? themeName;
	const sheetTitle = t.theme?.title ?? "Theme";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapperRef,
		className: "relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				ghost: true,
				size: collapsed ? "icon" : void 0,
				onClick: () => setOpen((o) => !o),
				className: cn(collapsed ? "text-text-secondary hover:text-foreground hover:bg-transparent" : "px-2 py-1 normal-case tracking-normal font-normal text-xs text-text-secondary hover:text-foreground"),
				title: `${t.theme?.switchTheme ?? "Switch theme"}: ${label}`,
				"aria-label": t.theme?.switchTheme ?? "Switch theme",
				"aria-expanded": open,
				"aria-haspopup": "listbox",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "h-3.5 w-3.5" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						className: "hidden sm:inline text-display tracking-wide text-xs",
						children: label
					})]
				})
			}),
			useMobileSheet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomSheet, {
				backdropDismissLabel: t.common.close,
				onClose: close,
				open,
				title: sheetTitle,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"aria-label": sheetTitle,
					role: "listbox",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSwitcherOptions, {
						availableThemes,
						close,
						setTheme,
						themeName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontSection, {
						fontChoices,
						fontId,
						setFont
					})]
				})
			}),
			open && !useMobileSheet && (() => {
				const rect = wrapperRef.current?.getBoundingClientRect();
				const dropdown = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: dropdownRef,
					"aria-label": sheetTitle,
					className: cn("min-w-[240px] max-h-[70dvh] overflow-y-auto", "border border-current/20 bg-background-base/95", "shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)]", dropUp ? "fixed z-[100]" : "absolute z-50 right-0 top-full mt-1"),
					role: "listbox",
					style: dropUp && rect ? {
						bottom: window.innerHeight - rect.top + 4,
						left: rect.left
					} : void 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-b border-current/20 px-3 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								className: "text-display text-xs tracking-[0.12em] text-text-tertiary",
								children: sheetTitle
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSwitcherOptions, {
							availableThemes,
							close,
							setTheme,
							themeName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontSection, {
							fontChoices,
							fontId,
							setFont
						})
					]
				});
				return dropUp ? (0, import_react_dom.createPortal)(dropdown, document.body) : dropdown;
			})()
		]
	});
}
function ThemeSwitcherOptions(t0) {
	const $ = (0, import_compiler_runtime.c)(11);
	const { availableThemes, close, setTheme, themeName } = t0;
	let t1;
	if ($[0] !== availableThemes || $[1] !== close || $[2] !== setTheme || $[3] !== themeName) {
		let t2;
		if ($[5] !== close || $[6] !== setTheme || $[7] !== themeName) {
			t2 = (th) => {
				const isActive = th.name === themeName;
				const paletteTheme = BUILTIN_THEMES[th.name] ?? th.definition;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
					active: isActive,
					"aria-selected": isActive,
					className: "gap-3",
					onClick: () => {
						setTheme(th.name);
						close();
					},
					role: "option",
					children: [
						paletteTheme ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSwatch, { theme: paletteTheme }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderSwatch, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 flex-col gap-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								className: "truncate text-display text-xs tracking-wide",
								children: th.label
							}), th.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
								className: "truncate text-xs tracking-normal text-text-tertiary",
								children: th.description
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("h-3 w-3 shrink-0 text-midground", isActive ? "opacity-100" : "opacity-0") })
					]
				}, th.name);
			};
			$[5] = close;
			$[6] = setTheme;
			$[7] = themeName;
			$[8] = t2;
		} else t2 = $[8];
		t1 = availableThemes.map(t2);
		$[0] = availableThemes;
		$[1] = close;
		$[2] = setTheme;
		$[3] = themeName;
		$[4] = t1;
	} else t1 = $[4];
	let t2;
	if ($[9] !== t1) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t1 });
		$[9] = t1;
		$[10] = t2;
	} else t2 = $[10];
	return t2;
}
var FONT_CATEGORY_LABEL_KEY = {
	sans: "fontSans",
	serif: "fontSerif",
	mono: "fontMono"
};
/** Font-override section rendered below the theme list. Lets the user pick
*  any catalog font independently of the active theme, or "Theme default"
*  to clear the override. Each row previews itself in its own font. */
function FontSection(t0) {
	const $ = (0, import_compiler_runtime.c)(33);
	const { fontChoices, fontId, setFont } = t0;
	const { t } = useI18n();
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = [
			"sans",
			"serif",
			"mono"
		];
		$[0] = t1;
	} else t1 = $[0];
	const order = t1;
	let t2;
	if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, { className: "h-3 w-3 text-text-tertiary" });
		$[1] = t2;
	} else t2 = $[1];
	const t3 = t.theme?.fontTitle ?? "Font";
	let t4;
	if ($[2] !== t3) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 border-t border-current/20 px-3 pb-1 pt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5",
				children: [t2, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					className: "text-display text-xs tracking-[0.12em] text-text-tertiary",
					children: t3
				})]
			})
		});
		$[2] = t3;
		$[3] = t4;
	} else t4 = $[3];
	const t5 = fontId === THEME_DEFAULT_FONT_ID;
	const t6 = fontId === THEME_DEFAULT_FONT_ID;
	let t7;
	if ($[4] !== setFont) {
		t7 = () => setFont(THEME_DEFAULT_FONT_ID);
		$[4] = setFont;
		$[5] = t7;
	} else t7 = $[5];
	let t8;
	if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "h-4 w-9 shrink-0"
		});
		$[6] = t8;
	} else t8 = $[6];
	const t9 = t.theme?.fontDefault ?? "Theme default";
	let t10;
	if ($[7] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
			className: "truncate text-xs tracking-normal",
			children: t9
		});
		$[7] = t9;
		$[8] = t10;
	} else t10 = $[8];
	const t11 = t.theme?.fontDefaultHint ?? "Use the active theme's font";
	let t12;
	if ($[9] !== t11) {
		t12 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
			className: "truncate text-xs tracking-normal text-text-tertiary",
			children: t11
		});
		$[9] = t11;
		$[10] = t12;
	} else t12 = $[10];
	let t13;
	if ($[11] !== t10 || $[12] !== t12) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col gap-0.5",
			children: [t10, t12]
		});
		$[11] = t10;
		$[12] = t12;
		$[13] = t13;
	} else t13 = $[13];
	const t14 = fontId === "theme" ? "opacity-100" : "opacity-0";
	let t15;
	if ($[14] !== t14) {
		t15 = cn("h-3 w-3 shrink-0 text-midground", t14);
		$[14] = t14;
		$[15] = t15;
	} else t15 = $[15];
	let t16;
	if ($[16] !== t15) {
		t16 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: t15 });
		$[16] = t15;
		$[17] = t16;
	} else t16 = $[17];
	let t17;
	if ($[18] !== t13 || $[19] !== t16 || $[20] !== t5 || $[21] !== t6 || $[22] !== t7) {
		t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
			active: t5,
			"aria-selected": t6,
			className: "gap-3",
			onClick: t7,
			role: "option",
			children: [
				t8,
				t13,
				t16
			]
		});
		$[18] = t13;
		$[19] = t16;
		$[20] = t5;
		$[21] = t6;
		$[22] = t7;
		$[23] = t17;
	} else t17 = $[23];
	let t18;
	if ($[24] !== fontChoices || $[25] !== fontId || $[26] !== setFont || $[27] !== t.theme) {
		t18 = order.map((cat) => {
			const fonts = fontChoices.filter((f) => f.category === cat);
			if (fonts.length === 0) return null;
			const catLabel = t.theme?.[FONT_CATEGORY_LABEL_KEY[cat]] ?? cat;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 pb-0.5 pt-1.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					className: "text-[0.65rem] uppercase tracking-[0.1em] text-text-tertiary",
					children: catLabel
				})
			}), fonts.map((f_0) => {
				const isActive = f_0.id === fontId;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
					active: isActive,
					"aria-selected": isActive,
					className: "gap-3",
					onClick: () => setFont(f_0.id),
					role: "option",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "h-4 w-9 shrink-0"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex min-w-0 flex-1 flex-col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm",
								style: { fontFamily: f_0.stack },
								children: f_0.label
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: cn("h-3 w-3 shrink-0 text-midground", isActive ? "opacity-100" : "opacity-0") })
					]
				}, f_0.id);
			})] }, cat);
		});
		$[24] = fontChoices;
		$[25] = fontId;
		$[26] = setFont;
		$[27] = t.theme;
		$[28] = t18;
	} else t18 = $[28];
	let t19;
	if ($[29] !== t17 || $[30] !== t18 || $[31] !== t4) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			t4,
			t17,
			t18
		] });
		$[29] = t17;
		$[30] = t18;
		$[31] = t4;
		$[32] = t19;
	} else t19 = $[32];
	return t19;
}
function ThemeSwatch(t0) {
	const $ = (0, import_compiler_runtime.c)(13);
	const { theme } = t0;
	let t1;
	if ($[0] !== theme.palette || $[1] !== theme.swatchColors) {
		t1 = theme.swatchColors ?? [
			theme.palette.background.hex,
			theme.palette.midground.hex,
			theme.palette.warmGlow
		];
		$[0] = theme.palette;
		$[1] = theme.swatchColors;
		$[2] = t1;
	} else t1 = $[2];
	const [c1, c2, c3] = t1;
	let t2;
	if ($[3] !== c1) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex-1",
			style: { background: c1 }
		});
		$[3] = c1;
		$[4] = t2;
	} else t2 = $[4];
	let t3;
	if ($[5] !== c2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex-1",
			style: { background: c2 }
		});
		$[5] = c2;
		$[6] = t3;
	} else t3 = $[6];
	let t4;
	if ($[7] !== c3) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex-1",
			style: { background: c3 }
		});
		$[7] = c3;
		$[8] = t4;
	} else t4 = $[8];
	let t5;
	if ($[9] !== t2 || $[10] !== t3 || $[11] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": true,
			className: "flex h-4 w-9 shrink-0 overflow-hidden border border-current/20",
			children: [
				t2,
				t3,
				t4
			]
		});
		$[9] = t2;
		$[10] = t3;
		$[11] = t4;
		$[12] = t5;
	} else t5 = $[12];
	return t5;
}
function PlaceholderSwatch() {
	const $ = (0, import_compiler_runtime.c)(1);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "h-4 w-9 shrink-0 border border-dashed border-current/20"
		});
		$[0] = t0;
	} else t0 = $[0];
	return t0;
}
//#endregion
//#region web/src/plugins/slots.ts
/**
* Plugin slot registry.
*
* Plugins can inject components into named locations in the app shell
* (header-left, sidebar, backdrop, etc.) by calling
* `window.__HERMES_PLUGINS__.registerSlot(pluginName, slotName, Component)`
* from their JS bundle. Multiple plugins can populate the same slot — they
* render stacked in registration order.
*
* The canonical slot names are documented in `KNOWN_SLOT_NAMES` below. The
* registry accepts any string so plugin ecosystems can define their own
* slots; the shell only renders `<PluginSlot name="..." />` for the slots
* it knows about.
*/
/** Map<slotName, SlotEntry[]>. Entries are appended in registration order. */
var _slotRegistry = /* @__PURE__ */ new Map();
var _slotListeners = /* @__PURE__ */ new Set();
function _notifySlots() {
	for (const fn of _slotListeners) try {
		fn();
	} catch {}
}
/** Register a component for a slot. Called by plugin bundles via
*  `window.__HERMES_PLUGINS__.registerSlot(...)`.
*
*  If the same (plugin, slot) pair is registered twice, the later call
*  replaces the earlier one — this matches how React HMR expects plugin
*  re-mounts to behave. */
function registerSlot(plugin, slot, component) {
	const filtered = (_slotRegistry.get(slot) ?? []).filter((e) => e.plugin !== plugin);
	filtered.push({
		plugin,
		component
	});
	_slotRegistry.set(slot, filtered);
	_notifySlots();
}
/** Read current entries for a slot. Returns a copy so callers can't mutate
*  registry state. */
function getSlotEntries(slot) {
	return (_slotRegistry.get(slot) ?? []).slice();
}
/** Subscribe to registry changes. Returns an unsubscribe function. */
function onSlotRegistered(fn) {
	_slotListeners.add(fn);
	return () => {
		_slotListeners.delete(fn);
	};
}
/** Clear every slot registration (the selected profile changed). Listeners
*  hear of it on the next microtask, so this is safe during a render. */
function clearPluginSlots() {
	if (_slotRegistry.size === 0) return;
	_slotRegistry.clear();
	queueMicrotask(_notifySlots);
}
/** Render all components registered for a given slot, stacked in order.
*
*  Component re-renders when the slot registry changes so plugins that
*  arrive after initial mount show up without a manual refresh. */
function PluginSlot({ name, fallback }) {
	const [entries, setEntries] = (0, import_react.useState)(() => getSlotEntries(name));
	(0, import_react.useEffect)(() => {
		setEntries(getSlotEntries(name));
		return onSlotRegistered(() => setEntries(getSlotEntries(name)));
	}, [name]);
	if (entries.length === 0) return fallback ? import_react.createElement(import_react.Fragment, null, fallback) : null;
	return import_react.createElement(import_react.Fragment, null, ...entries.map((entry) => import_react.createElement(entry.component, { key: entry.plugin })));
}
//#endregion
//#region web/src/plugins/registry.ts
/**
* Dashboard Plugin SDK + Registry
*
* Exposes React, UI components, hooks, and utilities on the window so
* that plugin bundles can use them without bundling their own copies.
*
* Plugins call window.__HERMES_PLUGINS__.register(name, Component)
* to register their tab component.
*/
var _registered = /* @__PURE__ */ new Map();
var _loadErrors = /* @__PURE__ */ new Map();
var _listeners = /* @__PURE__ */ new Set();
function _notify() {
	for (const fn of _listeners) try {
		fn();
	} catch {}
}
/** Re-run registry subscribers (e.g. after a plugin script onload, or dev HMR re-inject). */
function notifyPluginRegistry() {
	_notify();
}
var _profile = "";
/**
* Select the management profile whose plugin bundles the dashboard shows
* (PLG-3). Selecting another one forgets every component, load error and slot
* the previous profile's bundles registered; subscribers hear of it on the
* next microtask, never during the render that switched.
*/
function selectPluginProfile(profile) {
	if (profile === _profile) return;
	_profile = profile;
	_registered.clear();
	_loadErrors.clear();
	clearPluginSlots();
	queueMicrotask(_notify);
}
function getPluginProfile() {
	return _profile;
}
/** Whether the bundle now running was loaded for a profile no longer selected. */
function _fromOtherProfile() {
	const owner = (typeof document === "undefined" ? null : document.currentScript)?.getAttribute("data-hermes-profile");
	return owner != null && owner !== _profile;
}
/** Register a plugin component. Called by plugin JS bundles. */
function registerPlugin(name, component) {
	if (_fromOtherProfile()) return;
	_loadErrors.delete(name);
	_registered.set(name, component);
	_notify();
}
/** Get a registered component by plugin name. */
function getPluginComponent(name) {
	return _registered.get(name);
}
function getPluginLoadError(name) {
	return _loadErrors.get(name);
}
function setPluginLoadError(name, message) {
	_loadErrors.set(name, message);
	_notify();
}
/** Subscribe to registry changes (returns unsubscribe fn). */
function onPluginRegistered(fn) {
	_listeners.add(fn);
	return () => _listeners.delete(fn);
}
/**
* Version of the plugin SDK contract (see ``plugins/sdk.d.ts``). Bump the
* major on any backwards-incompatible change to the exposed surface;
* additive changes (new optional fields / helpers) don't require a bump.
* Exposed at runtime as ``window.__HERMES_PLUGIN_SDK__.sdkVersion`` so a
* plugin (or a future host-side compatibility gate) can read it.
*/
var SDK_CONTRACT_VERSION = "1.1.0";
function exposePluginSDK() {
	window.__HERMES_PLUGINS__ = {
		register: registerPlugin,
		registerSlot: (plugin, slot, component) => {
			if (!_fromOtherProfile()) registerSlot(plugin, slot, component);
		}
	};
	window.__HERMES_PLUGIN_SDK__ = {
		sdkVersion: SDK_CONTRACT_VERSION,
		React: import_react.default,
		hooks: {
			useState: import_react.useState,
			useEffect: import_react.useEffect,
			useCallback: import_react.useCallback,
			useMemo: import_react.useMemo,
			useRef: import_react.useRef,
			useContext: import_react.useContext,
			createContext: import_react.createContext,
			useToast,
			useConfirmDelete
		},
		api,
		fetchJSON,
		authedFetch,
		buildWsUrl,
		buildWsAuthParam,
		components: {
			Card,
			CardHeader,
			CardTitle,
			CardContent,
			Badge,
			Button,
			Checkbox,
			ConfirmDialog,
			Dialog,
			DialogClose,
			DialogContent,
			DialogDescription,
			DialogFooter,
			DialogHeader,
			DialogTitle,
			Input,
			Label,
			Select,
			SelectOption,
			Separator,
			Tabs,
			TabsList,
			TabsTrigger,
			Toast,
			PluginSlot
		},
		utils: {
			cn,
			timeAgo,
			isoTimeAgo
		},
		useI18n
	};
}
//#endregion
//#region web/src/plugins/PluginPage.tsx
/** Renders a plugin tab once its bundle has called `register()`. */
function PluginPage(t0) {
	const $ = (0, import_compiler_runtime.c)(16);
	const { name } = t0;
	const { t } = useI18n();
	let t1;
	if ($[0] !== name) {
		t1 = () => getPluginComponent(name) ?? null;
		$[0] = name;
		$[1] = t1;
	} else t1 = $[1];
	const Component = (0, import_react.useSyncExternalStore)(_temp$1, t1, _temp2$1);
	let t2;
	if ($[2] !== name) {
		t2 = () => getPluginLoadError(name) ?? null;
		$[2] = name;
		$[3] = t2;
	} else t2 = $[3];
	const loadError = (0, import_react.useSyncExternalStore)(_temp3$1, t2, _temp4$1);
	if (Component) {
		let t3;
		if ($[4] !== Component) {
			t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {});
			$[4] = Component;
			$[5] = t3;
		} else t3 = $[5];
		return t3;
	}
	if (loadError) {
		let t3;
		if ($[6] !== loadError || $[7] !== t) {
			t3 = formatPluginError(loadError, t);
			$[6] = loadError;
			$[7] = t;
			$[8] = t3;
		} else t3 = $[8];
		const message = t3;
		let t4;
		if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
			t4 = cn("max-w-lg p-4", "font-mondwest text-sm tracking-[0.08em] text-text-secondary");
			$[9] = t4;
		} else t4 = $[9];
		let t5;
		if ($[10] !== message) {
			t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: t4,
				role: "alert",
				children: message
			});
			$[10] = message;
			$[11] = t5;
		} else t5 = $[11];
		return t5;
	}
	let t3;
	let t4;
	if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
		t3 = cn("flex items-center gap-2 p-4", "font-mondwest text-sm tracking-[0.1em] text-text-tertiary");
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "shrink-0" });
		$[12] = t3;
		$[13] = t4;
	} else {
		t3 = $[12];
		t4 = $[13];
	}
	let t5;
	if ($[14] !== t.common.loading) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t3,
			children: [t4, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.common.loading })]
		});
		$[14] = t.common.loading;
		$[15] = t5;
	} else t5 = $[15];
	return t5;
}
function _temp4$1() {
	return null;
}
function _temp3$1(onChange_0) {
	return onPluginRegistered(onChange_0);
}
function _temp2$1() {
	return null;
}
function _temp$1(onChange) {
	return onPluginRegistered(onChange);
}
function formatPluginError(code, t) {
	if (code === "LOAD_FAILED") return t.common.pluginLoadFailed;
	if (code === "NO_REGISTER") return t.common.pluginNotRegistered;
	return code;
}
//#endregion
//#region web/src/plugins/usePlugins.ts
/**
* usePlugins hook — discovers and loads dashboard plugins.
*
* 1. Fetches plugin manifests from GET /api/dashboard/plugins
* 2. Injects CSS <link> tags for plugins that declare css
* 3. Loads plugin JS bundles via <script> tags
* 4. Waits for plugins to call register() and resolves them
*
* Everything is bound to the selected management profile (PLG-3): the list
* request names it, asset URLs name the profile whose list described them,
* and a list for an older selection is dropped. Switching profiles forgets
* the previous profile's manifests, assets and registered plugins.
*/
var MANIFEST_CACHE_KEY = "hermes:plugin-manifests";
/** One profile's cached list: another profile's never seeds it. */
function manifestCacheKey(profile) {
	return `${MANIFEST_CACHE_KEY}:${profile}`;
}
function getCachedManifests(profile) {
	try {
		const raw = sessionStorage.getItem(manifestCacheKey(profile));
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : null;
	} catch {
		return null;
	}
}
function cacheManifests(profile, manifests) {
	try {
		sessionStorage.setItem(manifestCacheKey(profile), JSON.stringify(manifests));
	} catch {}
}
/**
* Whether it is safe to skip the initial plugin-loading gate for a set of
* cached manifests.
*
* App.tsx waits on `pluginsLoading` before mounting the persistent ChatPage
* host: if a plugin overrides /chat (`tab.override === "/chat"`), mounting
* the built-in chat first would spawn a PTY and then yank it out from under
* the user when the plugin resolves. That gate is load-bearing — so we may
* only seed `loading = false` from the cache when no cached manifest
* declares a /chat override. Manifests are still seeded either way; only
* the loading flag stays conservative.
*/
function canSeedLoadedFromCache(cached) {
	if (cached === null) return false;
	return !cached.some((m) => m.tab?.override === "/chat");
}
/**
* URL of one of a plugin's browser assets. It names the management profile
* whose GET /api/dashboard/plugins list described the plugin, so the server
* serves that profile's copy, not a same-named one of another profile. The
* profile is a path segment, so URLs relative to a stylesheet or bundle
* (`url("./icon.svg")`, chunk imports) keep it.
*/
function pluginAssetUrl(name, file, profile) {
	const scope = profile ? `@${encodeURIComponent(profile)}/` : "";
	return `${HERMES_BASE_PATH}/dashboard-plugins/${scope}${name}/${file}`;
}
function seedManifests(profile) {
	const cached = getCachedManifests(profile);
	return {
		profile,
		manifests: cached ?? [],
		loading: !canSeedLoadedFromCache(cached)
	};
}
/** State update ending the loading phase of ``owner``'s plugins (no-op for another profile). */
function settled(owner) {
	return (s) => s.profile === owner && s.loading ? {
		...s,
		loading: false
	} : s;
}
/** Dashboard plugins of the selected management profile ("" = the dashboard's own). */
function usePlugins(selectedProfile) {
	const $ = (0, import_compiler_runtime.c)(24);
	let t0;
	if ($[0] !== selectedProfile) {
		t0 = selectedProfile || dashboardServingProfile();
		$[0] = selectedProfile;
		$[1] = t0;
	} else t0 = $[1];
	const profile = t0;
	selectPluginProfile(profile);
	let t1;
	if ($[2] !== profile) {
		t1 = () => seedManifests(profile);
		$[2] = profile;
		$[3] = t1;
	} else t1 = $[3];
	const [state, setState] = (0, import_react.useState)(t1);
	let t2;
	if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = [];
		$[4] = t2;
	} else t2 = $[4];
	const [plugins, setPlugins] = (0, import_react.useState)(t2);
	if (state.profile !== profile) {
		setState(seedManifests(profile));
		setPlugins([]);
	}
	let t3;
	if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
		t3 = /* @__PURE__ */ new Set();
		$[5] = t3;
	} else t3 = $[5];
	const loadedScripts = (0, import_react.useRef)(t3);
	let t4;
	let t5;
	if ($[6] !== profile) {
		t4 = () => {
			const loaded = loadedScripts.current;
			return () => {
				for (const el of document.querySelectorAll("[data-hermes-profile]")) if (el.getAttribute("data-hermes-profile") === profile) el.remove();
				loaded.clear();
			};
		};
		t5 = [profile];
		$[6] = profile;
		$[7] = t4;
		$[8] = t5;
	} else {
		t4 = $[7];
		t5 = $[8];
	}
	(0, import_react.useEffect)(t4, t5);
	let t6;
	let t7;
	if ($[9] !== profile) {
		t6 = () => {
			let current = true;
			api.getPlugins(profile).then((list) => {
				if (!current) return;
				cacheManifests(profile, list);
				setState((s) => s.profile === profile ? {
					profile,
					manifests: list,
					loading: s.loading && list.length > 0
				} : s);
			}).catch(() => {
				if (current) setState(settled(profile));
			});
			return () => {
				current = false;
			};
		};
		t7 = [profile];
		$[9] = profile;
		$[10] = t6;
		$[11] = t7;
	} else {
		t6 = $[10];
		t7 = $[11];
	}
	(0, import_react.useEffect)(t6, t7);
	const { profile: owner, manifests } = state;
	let t8;
	let t9;
	if ($[12] !== manifests || $[13] !== owner) {
		t8 = () => {
			if (manifests.length === 0) return;
			const injectedScripts = [];
			const loaded_0 = loadedScripts.current;
			const stale = () => getPluginProfile() !== owner;
			for (const manifest of manifests) {
				if (manifest.css) {
					const cssUrl = pluginAssetUrl(manifest.name, manifest.css, owner);
					if (!document.querySelector(`link[href="${cssUrl}"]`)) {
						const link = document.createElement("link");
						link.rel = "stylesheet";
						link.href = cssUrl;
						link.setAttribute("data-hermes-profile", owner);
						document.head.appendChild(link);
					}
				}
				const baseUrl = pluginAssetUrl(manifest.name, manifest.entry, owner);
				const scriptSrc = baseUrl;
				if (loaded_0.has(baseUrl)) continue;
				loaded_0.add(baseUrl);
				const script = document.createElement("script");
				script.setAttribute("data-hermes-plugin", manifest.name);
				script.setAttribute("data-hermes-profile", owner);
				script.src = scriptSrc;
				script.async = true;
				if (manifest.integrity && typeof manifest.integrity === "string") {
					script.integrity = manifest.integrity;
					script.crossOrigin = "anonymous";
				}
				script.onerror = () => {
					if (stale()) return;
					setPluginLoadError(manifest.name, "LOAD_FAILED");
					console.warn(`[plugins] Failed to load ${manifest.name} from ${scriptSrc} (open Network tab)`);
				};
				script.onload = () => {
					if (stale()) return;
					notifyPluginRegistry();
					queueMicrotask(() => {
						if (getPluginComponent(manifest.name)) return;
						setPluginLoadError(manifest.name, "NO_REGISTER");
					});
				};
				document.body.appendChild(script);
				injectedScripts.push(script);
			}
			const timeout = setTimeout(() => setState(settled(owner)), 2e3);
			return () => {
				clearTimeout(timeout);
			};
		};
		t9 = [owner, manifests];
		$[12] = manifests;
		$[13] = owner;
		$[14] = t8;
		$[15] = t9;
	} else {
		t8 = $[14];
		t9 = $[15];
	}
	(0, import_react.useEffect)(t8, t9);
	let t10;
	let t11;
	if ($[16] !== manifests || $[17] !== owner) {
		t10 = () => {
			const resolvePlugins = function resolvePlugins() {
				const resolved = [];
				for (const manifest_0 of manifests) {
					const component = getPluginComponent(manifest_0.name);
					if (component) resolved.push({
						manifest: manifest_0,
						component
					});
				}
				setPlugins(resolved);
				if (resolved.length === manifests.length && manifests.length > 0) setState(settled(owner));
			};
			resolvePlugins();
			return onPluginRegistered(resolvePlugins);
		};
		t11 = [owner, manifests];
		$[16] = manifests;
		$[17] = owner;
		$[18] = t10;
		$[19] = t11;
	} else {
		t10 = $[18];
		t11 = $[19];
	}
	(0, import_react.useEffect)(t10, t11);
	let t12;
	if ($[20] !== manifests || $[21] !== plugins || $[22] !== state.loading) {
		t12 = {
			plugins,
			manifests,
			loading: state.loading
		};
		$[20] = manifests;
		$[21] = plugins;
		$[22] = state.loading;
		$[23] = t12;
	} else t12 = $[23];
	return t12;
}
//#endregion
//#region web/src/lib/dashboard-flags.ts
/**
* Whether the dashboard's embedded TUI Chat surface is available.
*
* The embedded chat (`/chat` tab, `/api/ws` + `/api/pty` WebSockets) is now
* an unconditional part of the dashboard — the desktop app and the in-browser
* Chat tab both depend on it — so this always returns `true`. The function is
* retained as a stable seam so call sites don't need to change if the surface
* ever becomes conditional again.
*/
function isDashboardEmbeddedChatEnabled() {
	return true;
}
//#endregion
//#region web/src/lib/chat-activation.ts
/**
* Chat PTY activation latch.
*
* The dashboard keeps `ChatPage` mounted persistently (just hidden with CSS)
* on every route so the embedded chat PTY survives tab switches. The downside
* is that the PTY-connect effect would otherwise open `/api/pty` — which spawns
* the whole TUI + agent bootstrap (on a fresh checkout this prints
* `Installing TUI dependencies…` and runs `npm install`) — the moment the
* dashboard loads *any* page, even one the user never navigates the chat into.
*
* The fix is to only open the PTY once the chat tab has actually been active,
* while keeping activation **sticky** so the PTY still persists across later
* tab switches. This helper computes that latch: once `true`, it stays `true`.
*/
function latchChatActivation(previous, isActive) {
	return previous || isActive;
}
//#endregion
//#region web/src/lib/shared-gateway.ts
/** Profiles a gateway restart would blip when the managed profile is carried by the shared
*  multiplexer (default first). `null` for a standalone gateway or an older backend without
*  `gateway_shared_with`; those keep the plain restart copy. */
function sharedGatewayProfiles(status) {
	const shared = status?.gateway_shared_with;
	if (!Array.isArray(shared)) return null;
	const names = [...new Set(shared.map((n) => String(n).trim()).filter(Boolean))];
	if (names.length < 2) return null;
	return names.sort((a, b) => a === "default" ? -1 : b === "default" ? 1 : a.localeCompare(b));
}
function sharedGatewayRestartDescription(profiles) {
	return `All bots on this device reconnect: ${profiles.join(", ")}`;
}
function sharedGatewayRestartedMessage(count) {
	return `Shared gateway restarted (${count} ${count === 1 ? "bot" : "bots"})`;
}
/** Raw `gateway_state` values (gateway/status.py) → what they mean for the user. */
var GATEWAY_STATE_COPY = {
	running: "Running — messaging channels are online",
	starting: "Starting up",
	degraded: "Running with some channels offline — see Logs",
	stopped: "Stopped — messaging channels are offline",
	startup_failed: "Failed to start — see Logs"
};
/** A `degraded` record of a dead process is a watchdog exit, not a live gateway with channels down. */
var GATEWAY_EXITED_DEGRADED_COPY = "Exited: a watchdog stopped a wedged gateway — see Logs";
/** Plain description of the gateway's state; null/unknown falls back to running/stopped. */
function gatewayStateDescription(state, running) {
	if (state === "degraded" && running === false) return GATEWAY_EXITED_DEGRADED_COPY;
	if (state && GATEWAY_STATE_COPY[state]) return GATEWAY_STATE_COPY[state];
	return running ? GATEWAY_STATE_COPY.running : GATEWAY_STATE_COPY.stopped;
}
/** True when the state points at Logs as the next step. */
function gatewayStateNeedsLogs(state) {
	return state === "startup_failed" || state === "degraded";
}
var GATEWAY_VERB_COPY = {
	start: "Could not start the gateway",
	stop: "Could not stop the gateway",
	restart: "Could not restart the gateway"
};
/** Toast for a failed Start/Stop/Restart: lead with the outcome, then the detail, then the fix.
*  `error` (the caught value) decides whether the Logs pointer makes sense: when the dashboard
*  itself is unreachable (ApiError.status 0) the Logs page cannot load either, so it is omitted. */
function gatewayActionFailedMessage(verb, detail, error) {
	const trimmed = detail.trim().replace(/\.+$/, "");
	const ended = /[!?]$/.test(trimmed);
	const head = trimmed ? `${GATEWAY_VERB_COPY[verb]}: ${trimmed}${ended ? "" : "."}` : `${GATEWAY_VERB_COPY[verb]}.`;
	return error instanceof ApiError && error.status === 0 ? head : `${head} Open Logs for details.`;
}
/** A 409 on gateway start/stop for a served profile carries the multiplexer explanation in
*  `detail`, which `fetchJSON` already lifts into `ApiError.message`. Return it, else null. */
function servedProfileRefusal(error) {
	if (error instanceof ApiError) return error.status === 409 ? error.message : null;
	const text = error instanceof Error ? error.message : String(error ?? "");
	if (!text.startsWith("409")) return null;
	return text.match(/"detail"\s*:\s*"([^"]+)"/)?.[1] ?? text.replace(/^409:\s*/, "");
}
//#endregion
//#region web/src/App.tsx
var ConfigPage = (0, import_react.lazy)(() => __vitePreload(() => import("./ConfigPage-CqvigfOS.js"), __vite__mapDeps([0,1,2,3,4,5,6,7])));
var DocsPage = (0, import_react.lazy)(() => __vitePreload(() => import("./DocsPage-DGH7jQvH.js"), __vite__mapDeps([8,1,2,3,9,4,5,7])));
var EnvPage = (0, import_react.lazy)(() => __vitePreload(() => import("./EnvPage-pbhdBNs5.js"), __vite__mapDeps([10,1,2,3,4,9,5,6,7,11,12])));
var FilesPage = (0, import_react.lazy)(() => __vitePreload(() => import("./FilesPage-TMo7w2gA.js"), __vite__mapDeps([13,1,2,3,4,6,7,12,5])));
var SessionsPage = (0, import_react.lazy)(() => __vitePreload(() => import("./SessionsPage-DDKq8-Yd.js"), __vite__mapDeps([14,1,2,3,4,9,5,6,7,12])));
var LogsPage = (0, import_react.lazy)(() => __vitePreload(() => import("./LogsPage-CY1hThHf.js"), __vite__mapDeps([15,1,2,3,4,5,6,7])));
var AnalyticsPage = (0, import_react.lazy)(() => __vitePreload(() => import("./AnalyticsPage-CqQ5g5-W.js"), __vite__mapDeps([16,1,2,3,4,9,5,6,7])));
var ModelsPage = (0, import_react.lazy)(() => __vitePreload(() => import("./ModelsPage-Dq-6diH4.js"), __vite__mapDeps([17,1,2,3,4,9,5,6,18,19,7,20])));
var CronPage = (0, import_react.lazy)(() => __vitePreload(() => import("./CronPage-BwK5ALfD.js"), __vite__mapDeps([21,1,2,3,4,9,5,6,7,20,12,22])));
var ProfilesPage = (0, import_react.lazy)(() => __vitePreload(() => import("./ProfilesPage-AnUAGL9S.js"), __vite__mapDeps([23,1,2,3,4,9,5,6,7,20,11,12])));
var ProfileBuilderPage = (0, import_react.lazy)(() => __vitePreload(() => import("./ProfileBuilderPage-TpadDqy5.js"), __vite__mapDeps([24,1,2,4,9,6,25])));
var SkillsPage = (0, import_react.lazy)(() => __vitePreload(() => import("./SkillsPage-caNhRUgM.js"), __vite__mapDeps([26,1,2,3,4,9,5,6,7,22])));
var PluginsPage = (0, import_react.lazy)(() => __vitePreload(() => import("./PluginsPage-Dfkqzfr4.js"), __vite__mapDeps([27,1,2,3,4,9,5,6,7])));
var McpPage = (0, import_react.lazy)(() => __vitePreload(() => import("./McpPage-BkY_RGkk.js"), __vite__mapDeps([28,1,2,3,4,9,6,7,20,12,5,25])));
var PairingPage = (0, import_react.lazy)(() => __vitePreload(() => import("./PairingPage-Bol9pHly.js"), __vite__mapDeps([29,1,2,3,4,6,7,12,5])));
var ChannelsPage = (0, import_react.lazy)(() => __vitePreload(() => import("./ChannelsPage-CmqZO-wO.js"), __vite__mapDeps([30,1,2,3,4,9,6,7,20,19])));
var WebhooksPage = (0, import_react.lazy)(() => __vitePreload(() => import("./WebhooksPage-CeRKqMH0.js"), __vite__mapDeps([31,1,2,3,4,9,6,7,20,11,12,5])));
var SystemPage = (0, import_react.lazy)(() => __vitePreload(() => import("./SystemPage-C-EV7JC1.js"), __vite__mapDeps([32,1,2,3,4,9,5,6,20,33,34,11,35,12])));
var ChatPage = (0, import_react.lazy)(() => __vitePreload(() => import("./ChatPage-ljR8IrE-.js"), __vite__mapDeps([36,1,2,3,4,9,5,6,18,19,7,33,34,11,35])));
function RouteFallback({ label = "Loading…" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[12rem] flex-1 items-center justify-center",
		"aria-busy": "true",
		"aria-live": "polite",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
		})
	});
}
function RootRedirect() {
	const $ = (0, import_compiler_runtime.c)(1);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
			to: "/sessions",
			replace: true
		});
		$[0] = t0;
	} else t0 = $[0];
	return t0;
}
function UnknownRouteFallback(t0) {
	const $ = (0, import_compiler_runtime.c)(1);
	const { pluginsLoading } = t0;
	if (pluginsLoading) return null;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
			to: "/sessions",
			replace: true
		});
		$[0] = t1;
	} else t1 = $[0];
	return t1;
}
var CHAT_NAV_ITEM = {
	path: "/chat",
	labelKey: "chat",
	label: "Chat",
	icon: Terminal
};
/**
* Built-in routes except /chat.  Chat is rendered persistently (outside
* <Routes>) when embedded — see the persistent chat host block rendered
* inline near the bottom of this file — so the PTY child, WebSocket,
* and xterm instance survive when the user visits another tab and comes
* back.  A `display:none` toggle hides the terminal without unmounting.
* The host itself is still deferred until the first /chat visit so the
* xterm chunk is not downloaded on unrelated pages.  Routing still owns
* the URL so /chat deep-links, browser back/forward, and nav highlight
* keep working.
*/
var BUILTIN_ROUTES_CORE = {
	"/": RootRedirect,
	"/sessions": SessionsPage,
	"/files": FilesPage,
	"/analytics": AnalyticsPage,
	"/models": ModelsPage,
	"/logs": LogsPage,
	"/cron": CronPage,
	"/skills": SkillsPage,
	"/plugins": PluginsPage,
	"/mcp": McpPage,
	"/pairing": PairingPage,
	"/channels": ChannelsPage,
	"/webhooks": WebhooksPage,
	"/system": SystemPage,
	"/profiles": ProfilesPage,
	"/profiles/new": ProfileBuilderPage,
	"/config": ConfigPage,
	"/env": EnvPage,
	"/docs": DocsPage
};
function ChatRouteSink() {
	return null;
}
var BUILTIN_NAV_REST = [
	{
		path: "/sessions",
		labelKey: "sessions",
		label: "Sessions",
		icon: MessageSquare
	},
	{
		path: "/files",
		label: "Files",
		icon: FolderOpen
	},
	{
		path: "/analytics",
		labelKey: "analytics",
		label: "Analytics",
		icon: ChartColumn
	},
	{
		path: "/models",
		labelKey: "models",
		label: "Models",
		icon: Cpu
	},
	{
		path: "/logs",
		labelKey: "logs",
		label: "Logs",
		icon: FileText
	},
	{
		path: "/cron",
		labelKey: "cron",
		label: "Cron",
		icon: Clock
	},
	{
		path: "/skills",
		labelKey: "skills",
		label: "Skills",
		icon: Package
	},
	{
		path: "/plugins",
		labelKey: "plugins",
		label: "Plugins",
		icon: Puzzle
	},
	{
		path: "/mcp",
		label: "MCP",
		icon: Plug
	},
	{
		path: "/channels",
		label: "Channels",
		icon: Radio
	},
	{
		path: "/webhooks",
		label: "Webhooks",
		icon: Webhook
	},
	{
		path: "/pairing",
		label: "Pairing",
		icon: ShieldCheck
	},
	{
		path: "/profiles",
		labelKey: "profiles",
		label: "Profiles",
		icon: Users
	},
	{
		path: "/config",
		labelKey: "config",
		label: "Config",
		icon: Settings
	},
	{
		path: "/env",
		labelKey: "keys",
		label: "Keys",
		icon: KeyRound
	},
	{
		path: "/system",
		label: "System",
		icon: Wrench
	},
	{
		path: "/docs",
		labelKey: "documentation",
		label: "Documentation",
		icon: BookOpen
	}
];
var ICON_MAP = {
	Activity,
	BarChart3: ChartColumn,
	Clock,
	Cpu,
	FileText,
	FolderOpen,
	KeyRound,
	MessageSquare,
	Package,
	Settings,
	Puzzle,
	Sparkles,
	Terminal,
	Globe,
	Database,
	Shield,
	Users,
	Wrench,
	Zap,
	Heart,
	Star,
	Code,
	Eye
};
function resolveIcon(name) {
	return ICON_MAP[name] ?? Puzzle;
}
function buildNavItems(builtIn, manifests) {
	const items = [...builtIn];
	for (const manifest of manifests) {
		if (manifest.tab.override) continue;
		if (manifest.tab.hidden) continue;
		const pluginItem = {
			path: manifest.tab.path,
			label: manifest.label,
			icon: resolveIcon(manifest.icon)
		};
		const pos = manifest.tab.position ?? "end";
		if (pos === "end") items.push(pluginItem);
		else if (pos.startsWith("after:")) {
			const target = "/" + pos.slice(6);
			const idx = items.findIndex((i) => i.path === target);
			items.splice(idx >= 0 ? idx + 1 : items.length, 0, pluginItem);
		} else if (pos.startsWith("before:")) {
			const target = "/" + pos.slice(7);
			const idx = items.findIndex((i) => i.path === target);
			items.splice(idx >= 0 ? idx : items.length, 0, pluginItem);
		} else items.push(pluginItem);
	}
	return items;
}
/** Split merged nav into built-in sidebar entries vs plugin tabs, preserving plugin order hints. */
function partitionSidebarNav(builtIn, manifests) {
	const merged = buildNavItems(builtIn, manifests);
	const builtinPaths = new Set(builtIn.map((i) => i.path));
	const coreItems = [];
	const pluginItems = [];
	for (const item of merged) if (builtinPaths.has(item.path)) coreItems.push(item);
	else pluginItems.push(item);
	return {
		coreItems,
		pluginItems
	};
}
function buildRoutes(builtinRoutes, manifests) {
	const byOverride = /* @__PURE__ */ new Map();
	const addons = [];
	for (const m of manifests) if (m.tab.override) byOverride.set(m.tab.override, m);
	else addons.push(m);
	const routes = [];
	for (const [path, Component] of Object.entries(builtinRoutes)) {
		const om = byOverride.get(path);
		if (om) routes.push({
			key: `override:${om.name}`,
			path,
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginPage, { name: om.name })
		});
		else routes.push({
			key: `builtin:${path}`,
			path,
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {})
		});
	}
	for (const m of addons) {
		if (m.tab.hidden) continue;
		if (m.tab.path === "/plugins") continue;
		if (builtinRoutes[m.tab.path]) continue;
		routes.push({
			key: `plugin:${m.name}`,
			path: m.tab.path,
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginPage, { name: m.name })
		});
	}
	for (const m of manifests) {
		if (!m.tab.hidden) continue;
		if (m.tab.path === "/plugins") continue;
		if (builtinRoutes[m.tab.path] || m.tab.override) continue;
		routes.push({
			key: `plugin:hidden:${m.name}`,
			path: m.tab.path,
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginPage, { name: m.name })
		});
	}
	return routes;
}
var SIDEBAR_COLLAPSED_KEY = "hermes-sidebar-collapsed";
function App() {
	const $ = (0, import_compiler_runtime.c)(178);
	const { t } = useI18n();
	const { pathname } = useLocation();
	const { profile } = useProfileScope();
	const { manifests, loading: pluginsLoading } = usePlugins(profile);
	const { theme } = useTheme();
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = () => setMobileOpen(false);
		$[0] = t0;
	} else t0 = $[0];
	const closeMobile = t0;
	const [collapsed, setCollapsed] = (0, import_react.useState)(_temp);
	let t1;
	if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = () => {
			setCollapsed(_temp2);
		};
		$[1] = t1;
	} else t1 = $[1];
	const toggleCollapsed = t1;
	const isMobile = useBelowBreakpoint(1024);
	const isDesktopCollapsed = collapsed && !isMobile;
	const tooltipWarmRef = (0, import_react.useRef)(0);
	const sidebarStatus = useSidebarStatus();
	const isDocsRoute = pathname === "/docs" || pathname === "/docs/";
	let t2;
	if ($[2] !== pathname) {
		t2 = pathname.replace(/\/$/, "") || "/";
		$[2] = pathname;
		$[3] = t2;
	} else t2 = $[3];
	const isChatRoute = t2 === "/chat";
	let t3;
	if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
		t3 = isDashboardEmbeddedChatEnabled();
		$[4] = t3;
	} else t3 = $[4];
	const embeddedChat = t3;
	const [chatHostMounted, setChatHostMounted] = (0, import_react.useState)(isChatRoute);
	let t4;
	let t5;
	if ($[5] !== isChatRoute) {
		t4 = () => {
			setChatHostMounted((prev_0) => latchChatActivation(prev_0, isChatRoute));
		};
		t5 = [isChatRoute];
		$[5] = isChatRoute;
		$[6] = t4;
		$[7] = t5;
	} else {
		t4 = $[6];
		t5 = $[7];
	}
	(0, import_react.useEffect)(t4, t5);
	const [showTokenAnalytics, setShowTokenAnalytics] = (0, import_react.useState)(false);
	let t6;
	let t7;
	if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
		t6 = () => {
			api.getConfig().then((cfg) => {
				const dash = cfg?.dashboard ?? {};
				setShowTokenAnalytics(dash.show_token_analytics === true);
			}).catch(() => setShowTokenAnalytics(false));
		};
		t7 = [];
		$[8] = t6;
		$[9] = t7;
	} else {
		t6 = $[8];
		t7 = $[9];
	}
	(0, import_react.useEffect)(t6, t7);
	let t8;
	if ($[10] !== manifests) {
		t8 = manifests.some(_temp3);
		$[10] = manifests;
		$[11] = t8;
	} else t8 = $[11];
	const chatOverriddenByPlugin = t8;
	let t9;
	if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
		t9 = {
			...BUILTIN_ROUTES_CORE,
			...embeddedChat ? { "/chat": ChatRouteSink } : {}
		};
		$[12] = t9;
	} else t9 = $[12];
	const builtinRoutes = t9;
	let t10;
	if ($[13] !== showTokenAnalytics) {
		const base = embeddedChat ? [CHAT_NAV_ITEM, ...BUILTIN_NAV_REST] : BUILTIN_NAV_REST;
		t10 = showTokenAnalytics ? base : base.filter(_temp4);
		$[13] = showTokenAnalytics;
		$[14] = t10;
	} else t10 = $[14];
	const builtinNav = t10;
	let t11;
	if ($[15] !== builtinNav || $[16] !== manifests) {
		t11 = partitionSidebarNav(builtinNav, manifests);
		$[15] = builtinNav;
		$[16] = manifests;
		$[17] = t11;
	} else t11 = $[17];
	const sidebarNav = t11;
	let t12;
	if ($[18] !== manifests) {
		t12 = buildRoutes(builtinRoutes, manifests);
		$[18] = manifests;
		$[19] = t12;
	} else t12 = $[19];
	const routes = t12;
	let t13;
	if ($[20] !== manifests) {
		t13 = manifests.filter(_temp5).map(_temp6);
		$[20] = manifests;
		$[21] = t13;
	} else t13 = $[21];
	const pluginTabMeta = t13;
	const layoutVariant = theme.layoutVariant ?? "standard";
	let t14;
	let t15;
	if ($[22] !== mobileOpen) {
		t14 = () => {
			if (!mobileOpen) return;
			const onKey = (e) => {
				if (e.key === "Escape") setMobileOpen(false);
			};
			document.addEventListener("keydown", onKey);
			const prevOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";
			return () => {
				document.removeEventListener("keydown", onKey);
				document.body.style.overflow = prevOverflow;
			};
		};
		t15 = [mobileOpen];
		$[22] = mobileOpen;
		$[23] = t14;
		$[24] = t15;
	} else {
		t14 = $[23];
		t15 = $[24];
	}
	(0, import_react.useEffect)(t14, t15);
	let t16;
	let t17;
	if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
		t16 = () => {
			const mql = window.matchMedia("(min-width: 1024px)");
			const onChange = (e_0) => {
				if (e_0.matches) setMobileOpen(false);
			};
			mql.addEventListener("change", onChange);
			return () => mql.removeEventListener("change", onChange);
		};
		t17 = [];
		$[25] = t16;
		$[26] = t17;
	} else {
		t16 = $[25];
		t17 = $[26];
	}
	(0, import_react.useEffect)(t16, t17);
	let t18;
	if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
		t18 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectionSwitcher, {});
		$[27] = t18;
	} else t18 = $[27];
	let t19;
	let t20;
	let t21;
	if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none fixed inset-0 z-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "backdrop" })
		});
		t20 = cn("lg:hidden fixed top-0 left-0 right-0 z-40 min-h-14", "flex items-center gap-2 px-4 py-2", "border-b border-current/20", "bg-background-base");
		t21 = {
			background: "var(--component-header-background, var(--background-base))",
			borderImage: "var(--component-header-border-image)",
			clipPath: "var(--component-header-clip-path)"
		};
		$[28] = t19;
		$[29] = t20;
		$[30] = t21;
	} else {
		t19 = $[28];
		t20 = $[29];
		t21 = $[30];
	}
	let t22;
	if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
		t22 = () => setMobileOpen(true);
		$[31] = t22;
	} else t22 = $[31];
	let t23;
	if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
		t23 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {});
		$[32] = t23;
	} else t23 = $[32];
	let t24;
	if ($[33] !== mobileOpen || $[34] !== t.app.openNavigation) {
		t24 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			size: "icon",
			onClick: t22,
			"aria-label": t.app.openNavigation,
			"aria-expanded": mobileOpen,
			"aria-controls": "app-sidebar",
			className: "text-text-secondary hover:text-midground",
			children: t23
		});
		$[33] = mobileOpen;
		$[34] = t.app.openNavigation;
		$[35] = t24;
	} else t24 = $[35];
	let t25;
	if ($[36] !== t.app.brand) {
		t25 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
			className: "font-bold text-[0.95rem] leading-[0.95] tracking-[0.05em] text-midground",
			children: t.app.brand
		});
		$[36] = t.app.brand;
		$[37] = t25;
	} else t25 = $[37];
	let t26;
	if ($[38] !== t24 || $[39] !== t25) {
		t26 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: t20,
			style: t21,
			children: [t24, t25]
		});
		$[38] = t24;
		$[39] = t25;
		$[40] = t26;
	} else t26 = $[40];
	let t27;
	if ($[41] !== mobileOpen || $[42] !== t.app.closeNavigation) {
		t27 = mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			"aria-label": t.app.closeNavigation,
			onClick: closeMobile,
			className: cn("lg:hidden fixed inset-0 z-40 p-0 block", "bg-black/70")
		});
		$[41] = mobileOpen;
		$[42] = t.app.closeNavigation;
		$[43] = t27;
	} else t27 = $[43];
	let t28;
	let t29;
	let t30;
	if ($[44] === Symbol.for("react.memo_cache_sentinel")) {
		t28 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "h-14 shrink-0 lg:hidden"
		});
		t29 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "header-banner" });
		t30 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileScopeBanner, {});
		$[44] = t28;
		$[45] = t29;
		$[46] = t30;
	} else {
		t28 = $[44];
		t29 = $[45];
		t30 = $[46];
	}
	let t31;
	let t32;
	if ($[47] !== sidebarStatus) {
		t31 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryPressureBanner, { status: sidebarStatus });
		t32 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiplexStandaloneBanner, { status: sidebarStatus });
		$[47] = sidebarStatus;
		$[48] = t31;
		$[49] = t32;
	} else {
		t31 = $[48];
		t32 = $[49];
	}
	let t33;
	if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
		t33 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedMetricsConsentBanner, {});
		$[50] = t33;
	} else t33 = $[50];
	const t34 = t.app.navigation;
	const t35 = mobileOpen ? "translate-x-0" : "-translate-x-full";
	const t36 = collapsed && "lg:w-14";
	let t37;
	if ($[51] !== t35 || $[52] !== t36) {
		t37 = cn("fixed top-0 left-0 z-50 flex h-dvh max-h-dvh w-64 min-h-0 flex-col font-sans", "border-r border-current/20", "bg-background-base", "transition-[transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]", t35, "lg:sticky lg:top-0 lg:translate-x-0 lg:shrink-0 lg:overflow-hidden", "lg:transition-[width] lg:duration-300 lg:ease-[cubic-bezier(0.23,1,0.32,1)]", t36);
		$[51] = t35;
		$[52] = t36;
		$[53] = t37;
	} else t37 = $[53];
	let t38;
	if ($[54] === Symbol.for("react.memo_cache_sentinel")) {
		t38 = {
			background: "var(--component-sidebar-background, var(--background-base))",
			clipPath: "var(--component-sidebar-clip-path)",
			borderImage: "var(--component-sidebar-border-image)"
		};
		$[54] = t38;
	} else t38 = $[54];
	const t39 = collapsed ? "lg:justify-center lg:px-0" : "px-4 justify-between";
	let t40;
	if ($[55] !== t39) {
		t40 = cn("flex h-14 shrink-0 items-center gap-2", "border-b border-current/20", t39);
		$[55] = t39;
		$[56] = t40;
	} else t40 = $[56];
	const t41 = collapsed && "lg:hidden";
	let t42;
	if ($[57] !== t41) {
		t42 = cn("flex items-center gap-2", t41);
		$[57] = t41;
		$[58] = t42;
	} else t42 = $[58];
	let t43;
	if ($[59] === Symbol.for("react.memo_cache_sentinel")) {
		t43 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "header-left" });
		$[59] = t43;
	} else t43 = $[59];
	let t44;
	if ($[60] === Symbol.for("react.memo_cache_sentinel")) {
		t44 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
			className: "font-bold text-[1.125rem] leading-[0.95] tracking-[0.0525rem] text-midground uppercase",
			children: [
				"Hermes",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"Agent"
			]
		});
		$[60] = t44;
	} else t44 = $[60];
	let t45;
	if ($[61] !== t42) {
		t45 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t42,
			children: [t43, t44]
		});
		$[61] = t42;
		$[62] = t45;
	} else t45 = $[62];
	let t46;
	if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
		t46 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {});
		$[63] = t46;
	} else t46 = $[63];
	let t47;
	if ($[64] !== t.app.closeNavigation) {
		t47 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			size: "icon",
			onClick: closeMobile,
			"aria-label": t.app.closeNavigation,
			className: "lg:hidden text-text-secondary hover:text-midground",
			children: t46
		});
		$[64] = t.app.closeNavigation;
		$[65] = t47;
	} else t47 = $[65];
	const t48 = collapsed ? t.common.expand : t.common.collapse;
	let t49;
	if ($[66] !== collapsed) {
		t49 = collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftOpen, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeftClose, { className: "h-4 w-4" });
		$[66] = collapsed;
		$[67] = t49;
	} else t49 = $[67];
	let t50;
	if ($[68] !== t48 || $[69] !== t49) {
		t50 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			size: "icon",
			onClick: toggleCollapsed,
			"aria-label": t48,
			className: "hidden lg:flex text-text-secondary hover:text-midground",
			children: t49
		});
		$[68] = t48;
		$[69] = t49;
		$[70] = t50;
	} else t50 = $[70];
	let t51;
	if ($[71] !== t40 || $[72] !== t45 || $[73] !== t47 || $[74] !== t50) {
		t51 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t40,
			children: [
				t45,
				t47,
				t50
			]
		});
		$[71] = t40;
		$[72] = t45;
		$[73] = t47;
		$[74] = t50;
		$[75] = t51;
	} else t51 = $[75];
	let t52;
	if ($[76] !== isDesktopCollapsed) {
		t52 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileSwitcher, { collapsed: isDesktopCollapsed });
		$[76] = isDesktopCollapsed;
		$[77] = t52;
	} else t52 = $[77];
	const t53 = t.app.navigation;
	let t54;
	if ($[78] !== isDesktopCollapsed || $[79] !== sidebarNav.coreItems || $[80] !== t) {
		t54 = sidebarNav.coreItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNavLink, {
			closeMobile,
			collapsed: isDesktopCollapsed,
			item,
			t,
			tooltipWarmRef
		}, item.path));
		$[78] = isDesktopCollapsed;
		$[79] = sidebarNav.coreItems;
		$[80] = t;
		$[81] = t54;
	} else t54 = $[81];
	let t55;
	if ($[82] !== t54) {
		t55 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col",
			children: t54
		});
		$[82] = t54;
		$[83] = t55;
	} else t55 = $[83];
	let t56;
	if ($[84] !== isDesktopCollapsed || $[85] !== sidebarNav.pluginItems || $[86] !== t) {
		t56 = sidebarNav.pluginItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-labelledby": "hermes-sidebar-plugin-nav-heading",
			className: "flex flex-col border-t border-current/10 pb-2",
			role: "group",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("px-5 pt-2.5 pb-1", "font-sans text-display text-xs tracking-[0.12em] text-text-tertiary", isDesktopCollapsed && "lg:hidden"),
				id: "hermes-sidebar-plugin-nav-heading",
				children: t.app.pluginNavSection
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col",
				children: sidebarNav.pluginItems.map((item_0) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNavLink, {
					closeMobile,
					collapsed: isDesktopCollapsed,
					item: item_0,
					t,
					tooltipWarmRef
				}, item_0.path))
			})]
		});
		$[84] = isDesktopCollapsed;
		$[85] = sidebarNav.pluginItems;
		$[86] = t;
		$[87] = t56;
	} else t56 = $[87];
	let t57;
	if ($[88] !== t.app.navigation || $[89] !== t55 || $[90] !== t56) {
		t57 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden border-t border-current/10 py-2",
			"aria-label": t53,
			children: [t55, t56]
		});
		$[88] = t.app.navigation;
		$[89] = t55;
		$[90] = t56;
		$[91] = t57;
	} else t57 = $[91];
	let t58;
	if ($[92] !== isDesktopCollapsed || $[93] !== sidebarStatus) {
		t58 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarSystemActions, {
			collapsed: isDesktopCollapsed,
			onNavigate: closeMobile,
			status: sidebarStatus,
			tooltipWarmRef
		});
		$[92] = isDesktopCollapsed;
		$[93] = sidebarStatus;
		$[94] = t58;
	} else t58 = $[94];
	const t59 = isDesktopCollapsed ? "lg:flex-col lg:items-start lg:gap-3 lg:py-3" : "justify-between";
	let t60;
	if ($[95] !== t59) {
		t60 = cn("flex shrink-0 items-center gap-2", "px-3 py-2", "border-t border-current/20", t59);
		$[95] = t59;
		$[96] = t60;
	} else t60 = $[96];
	const t61 = isDesktopCollapsed && "lg:flex-col lg:items-start";
	let t62;
	if ($[97] !== t61) {
		t62 = cn("flex min-w-0 items-center gap-2", t61);
		$[97] = t61;
		$[98] = t62;
	} else t62 = $[98];
	let t63;
	if ($[99] === Symbol.for("react.memo_cache_sentinel")) {
		t63 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "header-right" });
		$[99] = t63;
	} else t63 = $[99];
	const t64 = t.theme?.switchTheme ?? "Switch theme";
	let t65;
	if ($[100] !== isDesktopCollapsed) {
		t65 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSwitcher, {
			collapsed: isDesktopCollapsed,
			dropUp: true
		});
		$[100] = isDesktopCollapsed;
		$[101] = t65;
	} else t65 = $[101];
	let t66;
	if ($[102] !== isDesktopCollapsed || $[103] !== t64 || $[104] !== t65) {
		t66 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarIconWithTooltip, {
			collapsed: isDesktopCollapsed,
			label: t64,
			tooltipWarmRef,
			children: t65
		});
		$[102] = isDesktopCollapsed;
		$[103] = t64;
		$[104] = t65;
		$[105] = t66;
	} else t66 = $[105];
	let t67;
	if ($[106] !== isDesktopCollapsed) {
		t67 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {
			collapsed: isDesktopCollapsed,
			dropUp: true
		});
		$[106] = isDesktopCollapsed;
		$[107] = t67;
	} else t67 = $[107];
	let t68;
	if ($[108] !== isDesktopCollapsed || $[109] !== t.language.switchTo || $[110] !== t67) {
		t68 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarIconWithTooltip, {
			collapsed: isDesktopCollapsed,
			label: t.language.switchTo,
			tooltipWarmRef,
			children: t67
		});
		$[108] = isDesktopCollapsed;
		$[109] = t.language.switchTo;
		$[110] = t67;
		$[111] = t68;
	} else t68 = $[111];
	let t69;
	if ($[112] !== t62 || $[113] !== t66 || $[114] !== t68) {
		t69 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t62,
			children: [
				t63,
				t66,
				t68
			]
		});
		$[112] = t62;
		$[113] = t66;
		$[114] = t68;
		$[115] = t69;
	} else t69 = $[115];
	let t70;
	if ($[116] !== t60 || $[117] !== t69) {
		t70 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: t60,
			children: t69
		});
		$[116] = t60;
		$[117] = t69;
		$[118] = t70;
	} else t70 = $[118];
	const t71 = isDesktopCollapsed && "lg:hidden";
	let t72;
	if ($[119] !== t71) {
		t72 = cn("flex shrink-0 flex-col", t71);
		$[119] = t71;
		$[120] = t72;
	} else t72 = $[120];
	let t73;
	if ($[121] === Symbol.for("react.memo_cache_sentinel")) {
		t73 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthWidget, {});
		$[121] = t73;
	} else t73 = $[121];
	let t74;
	if ($[122] !== sidebarStatus) {
		t74 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarFooter, { status: sidebarStatus });
		$[122] = sidebarStatus;
		$[123] = t74;
	} else t74 = $[123];
	let t75;
	if ($[124] !== t72 || $[125] !== t74) {
		t75 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t72,
			children: [t73, t74]
		});
		$[124] = t72;
		$[125] = t74;
		$[126] = t75;
	} else t75 = $[126];
	let t76;
	if ($[127] !== t.app.navigation || $[128] !== t37 || $[129] !== t51 || $[130] !== t52 || $[131] !== t57 || $[132] !== t58 || $[133] !== t70 || $[134] !== t75) {
		t76 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			id: "app-sidebar",
			"aria-label": t34,
			className: t37,
			style: t38,
			children: [
				t51,
				t52,
				t57,
				t58,
				t70,
				t75
			]
		});
		$[127] = t.app.navigation;
		$[128] = t37;
		$[129] = t51;
		$[130] = t52;
		$[131] = t57;
		$[132] = t58;
		$[133] = t70;
		$[134] = t75;
		$[135] = t76;
	} else t76 = $[135];
	const t77 = isChatRoute ? "pb-0 pt-1 sm:pt-2 lg:pt-4" : "pt-2 sm:pt-4 lg:pt-6";
	const t78 = isDocsRoute && "min-h-0 flex-1";
	let t79;
	if ($[136] !== t77 || $[137] !== t78) {
		t79 = cn("relative z-2 flex min-w-0 min-h-0 flex-1 flex-col", "px-3 sm:px-6", t77, t78);
		$[136] = t77;
		$[137] = t78;
		$[138] = t79;
	} else t79 = $[138];
	let t80;
	if ($[139] === Symbol.for("react.memo_cache_sentinel")) {
		t80 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "pre-main" });
		$[139] = t80;
	} else t80 = $[139];
	const t81 = !isChatRoute && "pb-[calc(2rem+env(safe-area-inset-bottom,0px))] lg:pb-8";
	const t82 = (isDocsRoute || isChatRoute) && "min-h-0 flex flex-1 flex-col";
	let t83;
	if ($[140] !== t81 || $[141] !== t82) {
		t83 = cn("w-full min-w-0", t81, t82);
		$[140] = t81;
		$[141] = t82;
		$[142] = t83;
	} else t83 = $[142];
	let t84;
	if ($[143] === Symbol.for("react.memo_cache_sentinel")) {
		t84 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteFallback, {});
		$[143] = t84;
	} else t84 = $[143];
	let t85;
	if ($[144] !== routes) {
		t85 = routes.map(_temp7);
		$[144] = routes;
		$[145] = t85;
	} else t85 = $[145];
	let t86;
	if ($[146] !== pluginsLoading) {
		t86 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
			path: "*",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnknownRouteFallback, { pluginsLoading })
		});
		$[146] = pluginsLoading;
		$[147] = t86;
	} else t86 = $[147];
	let t87;
	if ($[148] !== t85 || $[149] !== t86) {
		t87 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileKeyedRoutes, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: t84,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Routes, { children: [t85, t86] })
		}) });
		$[148] = t85;
		$[149] = t86;
		$[150] = t87;
	} else t87 = $[150];
	let t88;
	if ($[151] !== chatHostMounted || $[152] !== chatOverriddenByPlugin || $[153] !== isChatRoute || $[154] !== pluginsLoading) {
		t88 = embeddedChat && !chatOverriddenByPlugin && (pluginsLoading ? isChatRoute ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteFallback, { label: "Loading chat…" }) : null : chatHostMounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-chat-active": isChatRoute ? "true" : "false",
			className: cn("min-h-0 min-w-0", isChatRoute ? "flex flex-1 flex-col" : "hidden"),
			"aria-hidden": !isChatRoute,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: isChatRoute ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteFallback, { label: "Loading chat…" }) : null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPage, { isActive: isChatRoute })
			})
		}) : isChatRoute ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteFallback, { label: "Loading chat…" }) : null);
		$[151] = chatHostMounted;
		$[152] = chatOverriddenByPlugin;
		$[153] = isChatRoute;
		$[154] = pluginsLoading;
		$[155] = t88;
	} else t88 = $[155];
	let t89;
	if ($[156] !== t83 || $[157] !== t87 || $[158] !== t88) {
		t89 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t83,
			children: [t87, t88]
		});
		$[156] = t83;
		$[157] = t87;
		$[158] = t88;
		$[159] = t89;
	} else t89 = $[159];
	let t90;
	if ($[160] === Symbol.for("react.memo_cache_sentinel")) {
		t90 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "post-main" });
		$[160] = t90;
	} else t90 = $[160];
	let t91;
	if ($[161] !== t79 || $[162] !== t89) {
		t91 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t79,
			children: [
				t80,
				t89,
				t90
			]
		});
		$[161] = t79;
		$[162] = t89;
		$[163] = t91;
	} else t91 = $[163];
	let t92;
	if ($[164] !== pluginTabMeta || $[165] !== t91) {
		t92 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeaderProvider, {
			pluginTabs: pluginTabMeta,
			children: t91
		});
		$[164] = pluginTabMeta;
		$[165] = t91;
		$[166] = t92;
	} else t92 = $[166];
	let t93;
	if ($[167] !== t76 || $[168] !== t92) {
		t93 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 min-w-0 flex-1",
				children: [t76, t92]
			})
		});
		$[167] = t76;
		$[168] = t92;
		$[169] = t93;
	} else t93 = $[169];
	let t94;
	if ($[170] === Symbol.for("react.memo_cache_sentinel")) {
		t94 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "overlay" });
		$[170] = t94;
	} else t94 = $[170];
	let t95;
	if ($[171] !== layoutVariant || $[172] !== t26 || $[173] !== t27 || $[174] !== t31 || $[175] !== t32 || $[176] !== t93) {
		t95 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-layout-variant": layoutVariant,
			className: "flex h-dvh max-h-dvh min-h-0 flex-col overflow-hidden bg-background-base text-text-primary antialiased",
			children: [
				t18,
				t19,
				t26,
				t27,
				t28,
				t29,
				t30,
				t31,
				t32,
				t33,
				t93,
				t94
			]
		});
		$[171] = layoutVariant;
		$[172] = t26;
		$[173] = t27;
		$[174] = t31;
		$[175] = t32;
		$[176] = t93;
		$[177] = t95;
	} else t95 = $[177];
	return t95;
}
/**
* Remounts the entire routed page tree when the global management profile
* changes. Pages load their data on mount; without this, a page opened
* under profile A would keep showing A's state while writes (via the
* fetchJSON ?profile= injection) silently targeted the newly selected
* profile B — the exact stale-target footgun the switcher exists to kill.
* Keying by profile resets every page's local state so it refetches under
* the new scope. The persistent ChatPage host below handles its own
* remount (channel keyed on scopedProfile).
*/
function _temp7(t0) {
	const { key, path, element } = t0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
		path,
		element
	}, key);
}
function _temp6(m_1) {
	return {
		path: m_1.tab.override ?? m_1.tab.path,
		label: m_1.label
	};
}
function _temp5(m_0) {
	return !m_0.tab.hidden;
}
function _temp4(n) {
	return n.path !== "/analytics";
}
function _temp3(m) {
	return m.tab.override === "/chat";
}
function _temp2(prev) {
	const next = !prev;
	try {
		localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
	} catch {}
	return next;
}
function _temp() {
	try {
		return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
	} catch {
		return false;
	}
}
function ProfileKeyedRoutes(t0) {
	const $ = (0, import_compiler_runtime.c)(3);
	const { children } = t0;
	const { profile } = useProfileScope();
	const t1 = profile || "__own__";
	let t2;
	if ($[0] !== children || $[1] !== t1) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "contents",
			children
		}, t1);
		$[0] = children;
		$[1] = t1;
		$[2] = t2;
	} else t2 = $[2];
	return t2;
}
function SidebarNavLink(t0) {
	const $ = (0, import_compiler_runtime.c)(26);
	const { closeMobile, collapsed, item, tooltipWarmRef, t } = t0;
	const { path, label, labelKey, icon: Icon } = item;
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const [tooltipAnchor, setTooltipAnchor] = (0, import_react.useState)(null);
	const navLabel = labelKey ? t.app.nav[labelKey] ?? label : label;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = (event) => {
			setHovered(true);
			setTooltipAnchor(event.currentTarget);
		};
		$[0] = t1;
	} else t1 = $[0];
	const showTooltip = t1;
	let t2;
	if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = () => {
			setHovered(false);
			setTooltipAnchor(null);
		};
		$[1] = t2;
	} else t2 = $[1];
	const hideTooltip = t2;
	const t3 = collapsed ? showTooltip : void 0;
	const t4 = collapsed ? hideTooltip : void 0;
	const t5 = path === "/sessions";
	const t6 = collapsed ? navLabel : void 0;
	const t7 = collapsed ? showTooltip : void 0;
	const t8 = collapsed ? hideTooltip : void 0;
	let t9;
	if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
		t9 = { clipPath: "var(--component-tab-clip-path)" };
		$[2] = t9;
	} else t9 = $[2];
	let t10;
	if ($[3] !== Icon || $[4] !== collapsed || $[5] !== navLabel) {
		t10 = (t11) => {
			const { isActive: isActive_0 } = t11;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 shrink-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("truncate transition-opacity duration-300", collapsed ? "lg:opacity-0" : "lg:opacity-100"),
					children: navLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "absolute inset-y-0.5 left-1.5 right-1.5 bg-midground opacity-0 pointer-events-none transition-opacity duration-200 group-hover/nav:opacity-5"
				}),
				isActive_0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "absolute left-0 top-0 bottom-0 w-px bg-midground"
				})
			] });
		};
		$[3] = Icon;
		$[4] = collapsed;
		$[5] = navLabel;
		$[6] = t10;
	} else t10 = $[6];
	let t11;
	if ($[7] !== closeMobile || $[8] !== path || $[9] !== t10 || $[10] !== t5 || $[11] !== t6 || $[12] !== t7 || $[13] !== t8) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
			to: path,
			end: t5,
			onClick: closeMobile,
			"aria-label": t6,
			onFocus: t7,
			onBlur: t8,
			className: _temp8,
			style: t9,
			children: t10
		});
		$[7] = closeMobile;
		$[8] = path;
		$[9] = t10;
		$[10] = t5;
		$[11] = t6;
		$[12] = t7;
		$[13] = t8;
		$[14] = t11;
	} else t11 = $[14];
	let t12;
	if ($[15] !== collapsed || $[16] !== hovered || $[17] !== navLabel || $[18] !== tooltipAnchor || $[19] !== tooltipWarmRef) {
		t12 = collapsed && hovered && tooltipAnchor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTooltip, {
			anchor: tooltipAnchor,
			label: navLabel,
			warmRef: tooltipWarmRef
		});
		$[15] = collapsed;
		$[16] = hovered;
		$[17] = navLabel;
		$[18] = tooltipAnchor;
		$[19] = tooltipWarmRef;
		$[20] = t12;
	} else t12 = $[20];
	let t13;
	if ($[21] !== t11 || $[22] !== t12 || $[23] !== t3 || $[24] !== t4) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			onMouseEnter: t3,
			onMouseLeave: t4,
			children: [t11, t12]
		});
		$[21] = t11;
		$[22] = t12;
		$[23] = t3;
		$[24] = t4;
		$[25] = t13;
	} else t13 = $[25];
	return t13;
}
function _temp8(t0) {
	const { isActive } = t0;
	return cn("group/nav relative flex items-center gap-3", "px-5 py-2.5", "font-sans text-display uppercase text-sm tracking-[0.12em]", "whitespace-nowrap transition-colors cursor-pointer", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground", isActive ? "text-midground" : "text-text-secondary hover:text-midground");
}
function SidebarSystemActions(t0) {
	const $ = (0, import_compiler_runtime.c)(89);
	const { collapsed, onNavigate, status, tooltipWarmRef } = t0;
	const { t } = useI18n();
	const navigate = useNavigate();
	const { activeAction, isBusy, isRunning, pendingAction, runAction } = useSystemActions();
	const canUpdateHermes = status?.can_update_hermes === true;
	const sharedGateway = sharedGatewayProfiles(status);
	const [restartConfirmOpen, setRestartConfirmOpen] = (0, import_react.useState)(false);
	const [updateConfirmOpen, setUpdateConfirmOpen] = (0, import_react.useState)(false);
	const [updateConfirmInfo, setUpdateConfirmInfo] = (0, import_react.useState)(null);
	const [updateConfirmChecking, setUpdateConfirmChecking] = (0, import_react.useState)(false);
	let t1;
	let t2;
	if ($[0] !== updateConfirmOpen) {
		t1 = () => {
			if (!updateConfirmOpen) {
				setUpdateConfirmInfo(null);
				return;
			}
			let cancelled = false;
			setUpdateConfirmChecking(true);
			api.checkHermesUpdate(false).then((info) => {
				if (!cancelled) setUpdateConfirmInfo(info);
			}).catch(() => {
				if (!cancelled) setUpdateConfirmInfo(null);
			}).finally(() => {
				if (!cancelled) setUpdateConfirmChecking(false);
			});
			return () => {
				cancelled = true;
			};
		};
		t2 = [updateConfirmOpen];
		$[0] = updateConfirmOpen;
		$[1] = t1;
		$[2] = t2;
	} else {
		t1 = $[1];
		t2 = $[2];
	}
	(0, import_react.useEffect)(t1, t2);
	let t3;
	bb0: {
		if (updateConfirmInfo?.behind && updateConfirmInfo.behind > 0) {
			const cmd = updateConfirmInfo.update_command;
			const n = updateConfirmInfo.behind;
			t3 = `This will run 'hermes update' (${cmd}) and pull ${n} new commit${n === 1 ? "" : "s"}. The gateway restarts when the update finishes; the current session keeps its prompt cache until then.`;
			break bb0;
		}
		const cmd_0 = updateConfirmInfo?.update_command ?? "hermes update";
		t3 = t.status.updateHermesConfirmMessage ?? `This will run 'hermes update' (${cmd_0}) and restart the gateway when it finishes.`;
	}
	const updateConfirmDescription = t3;
	let t4;
	if ($[3] !== t.status.restartGateway || $[4] !== t.status.restartingGateway) {
		t4 = {
			action: "restart",
			icon: RotateCw,
			label: t.status.restartGateway,
			runningLabel: t.status.restartingGateway,
			spin: true
		};
		$[3] = t.status.restartGateway;
		$[4] = t.status.restartingGateway;
		$[5] = t4;
	} else t4 = $[5];
	let items;
	if ($[6] !== canUpdateHermes || $[7] !== t.status.updateHermes || $[8] !== t.status.updatingHermes || $[9] !== t4) {
		items = [t4];
		if (canUpdateHermes) {
			let t5;
			if ($[11] !== t.status.updateHermes || $[12] !== t.status.updatingHermes) {
				t5 = {
					action: "update",
					icon: Download,
					label: t.status.updateHermes,
					runningLabel: t.status.updatingHermes,
					spin: false
				};
				$[11] = t.status.updateHermes;
				$[12] = t.status.updatingHermes;
				$[13] = t5;
			} else t5 = $[13];
			items.push(t5);
		}
		$[6] = canUpdateHermes;
		$[7] = t.status.updateHermes;
		$[8] = t.status.updatingHermes;
		$[9] = t4;
		$[10] = items;
	} else items = $[10];
	let t5;
	if ($[14] !== isBusy || $[15] !== navigate || $[16] !== onNavigate || $[17] !== runAction || $[18] !== setRestartConfirmOpen || $[19] !== setUpdateConfirmOpen) {
		t5 = (action) => {
			if (isBusy) return;
			if (action === "restart") {
				setRestartConfirmOpen(true);
				return;
			}
			if (action === "update") {
				setUpdateConfirmOpen(true);
				return;
			}
			runAction(action);
			navigate("/sessions");
			onNavigate();
		};
		$[14] = isBusy;
		$[15] = navigate;
		$[16] = onNavigate;
		$[17] = runAction;
		$[18] = setRestartConfirmOpen;
		$[19] = setUpdateConfirmOpen;
		$[20] = t5;
	} else t5 = $[20];
	const handleClick = t5;
	let t6;
	if ($[21] !== navigate || $[22] !== onNavigate || $[23] !== runAction || $[24] !== setRestartConfirmOpen) {
		t6 = () => {
			setRestartConfirmOpen(false);
			runAction("restart");
			navigate("/sessions");
			onNavigate();
		};
		$[21] = navigate;
		$[22] = onNavigate;
		$[23] = runAction;
		$[24] = setRestartConfirmOpen;
		$[25] = t6;
	} else t6 = $[25];
	const confirmRestart = t6;
	let t7;
	if ($[26] !== navigate || $[27] !== onNavigate || $[28] !== runAction || $[29] !== setUpdateConfirmOpen) {
		t7 = () => {
			setUpdateConfirmOpen(false);
			runAction("update");
			navigate("/sessions");
			onNavigate();
		};
		$[26] = navigate;
		$[27] = onNavigate;
		$[28] = runAction;
		$[29] = setUpdateConfirmOpen;
		$[30] = t7;
	} else t7 = $[30];
	const confirmUpdate = t7;
	let t8;
	if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
		t8 = cn("shrink-0 flex flex-col", "border-t border-current/10", "py-1");
		$[31] = t8;
	} else t8 = $[31];
	const t9 = collapsed && "lg:hidden";
	let t10;
	if ($[32] !== t9) {
		t10 = cn("px-5 pt-0.5 pb-0.5", "font-sans text-display text-xs tracking-[0.12em] text-text-tertiary", t9);
		$[32] = t9;
		$[33] = t10;
	} else t10 = $[33];
	let t11;
	if ($[34] !== t.app.system || $[35] !== t10) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: t10,
			children: t.app.system
		});
		$[34] = t.app.system;
		$[35] = t10;
		$[36] = t11;
	} else t11 = $[36];
	const t12 = collapsed && "lg:hidden";
	let t13;
	if ($[37] !== t12) {
		t13 = cn(t12);
		$[37] = t12;
		$[38] = t13;
	} else t13 = $[38];
	let t14;
	if ($[39] !== status) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarStatusStrip, { status });
		$[39] = status;
		$[40] = t14;
	} else t14 = $[40];
	let t15;
	if ($[41] !== t13 || $[42] !== t14) {
		t15 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: t13,
			children: t14
		});
		$[41] = t13;
		$[42] = t14;
		$[43] = t15;
	} else t15 = $[43];
	let t16;
	if ($[44] !== collapsed || $[45] !== status || $[46] !== tooltipWarmRef) {
		t16 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GatewayDot, {
			collapsed,
			status,
			tooltipWarmRef
		});
		$[44] = collapsed;
		$[45] = status;
		$[46] = tooltipWarmRef;
		$[47] = t16;
	} else t16 = $[47];
	let t17;
	if ($[48] !== activeAction || $[49] !== collapsed || $[50] !== handleClick || $[51] !== isBusy || $[52] !== isRunning || $[53] !== items || $[54] !== pendingAction || $[55] !== tooltipWarmRef) {
		t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemActionButton, {
				collapsed,
				disabled: isBusy && !(pendingAction === item.action || activeAction === item.action && isRunning),
				tooltipWarmRef,
				isPending: pendingAction === item.action,
				isRunning: activeAction === item.action && isRunning && pendingAction !== item.action,
				item,
				onClick: () => handleClick(item.action)
			}, item.action))
		});
		$[48] = activeAction;
		$[49] = collapsed;
		$[50] = handleClick;
		$[51] = isBusy;
		$[52] = isRunning;
		$[53] = items;
		$[54] = pendingAction;
		$[55] = tooltipWarmRef;
		$[56] = t17;
	} else t17 = $[56];
	let t18;
	if ($[57] !== t11 || $[58] !== t15 || $[59] !== t16 || $[60] !== t17) {
		t18 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t8,
			children: [
				t11,
				t15,
				t16,
				t17
			]
		});
		$[57] = t11;
		$[58] = t15;
		$[59] = t16;
		$[60] = t17;
		$[61] = t18;
	} else t18 = $[61];
	const T0 = ConfirmDialog;
	const t19 = sharedGateway ? "Restart all" : t.status.restartGateway;
	const t20 = sharedGateway ? sharedGatewayRestartDescription(sharedGateway) : t.status.restartGatewayConfirmMessage ?? "This restarts the Hermes gateway process. Connected channels and active sessions will reconnect afterward.";
	const t21 = pendingAction === "restart";
	let t22;
	if ($[62] !== setRestartConfirmOpen) {
		t22 = () => setRestartConfirmOpen(false);
		$[62] = setRestartConfirmOpen;
		$[63] = t22;
	} else t22 = $[63];
	const t23 = sharedGateway ? "Restart the shared gateway?" : t.status.restartGatewayConfirmTitle ?? `${t.status.restartGateway}?`;
	let t24;
	if ($[64] !== T0 || $[65] !== confirmRestart || $[66] !== restartConfirmOpen || $[67] !== t.common.cancel || $[68] !== t19 || $[69] !== t20 || $[70] !== t21 || $[71] !== t22 || $[72] !== t23) {
		t24 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T0, {
			cancelLabel: t.common.cancel,
			confirmLabel: t19,
			description: t20,
			loading: t21,
			onCancel: t22,
			onConfirm: confirmRestart,
			open: restartConfirmOpen,
			title: t23
		});
		$[64] = T0;
		$[65] = confirmRestart;
		$[66] = restartConfirmOpen;
		$[67] = t.common.cancel;
		$[68] = t19;
		$[69] = t20;
		$[70] = t21;
		$[71] = t22;
		$[72] = t23;
		$[73] = t24;
	} else t24 = $[73];
	const t25 = t.status.updateHermesConfirmNow ?? "Update now";
	const t26 = updateConfirmChecking ? t.common.loading : updateConfirmDescription;
	const t27 = pendingAction === "update" || updateConfirmChecking;
	let t28;
	if ($[74] !== setUpdateConfirmOpen) {
		t28 = () => setUpdateConfirmOpen(false);
		$[74] = setUpdateConfirmOpen;
		$[75] = t28;
	} else t28 = $[75];
	const t29 = t.status.updateHermesConfirmTitle ?? `${t.status.updateHermes}?`;
	let t30;
	if ($[76] !== confirmUpdate || $[77] !== t.common.cancel || $[78] !== t25 || $[79] !== t26 || $[80] !== t27 || $[81] !== t28 || $[82] !== t29 || $[83] !== updateConfirmOpen) {
		t30 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			cancelLabel: t.common.cancel,
			confirmLabel: t25,
			description: t26,
			loading: t27,
			onCancel: t28,
			onConfirm: confirmUpdate,
			open: updateConfirmOpen,
			title: t29
		});
		$[76] = confirmUpdate;
		$[77] = t.common.cancel;
		$[78] = t25;
		$[79] = t26;
		$[80] = t27;
		$[81] = t28;
		$[82] = t29;
		$[83] = updateConfirmOpen;
		$[84] = t30;
	} else t30 = $[84];
	let t31;
	if ($[85] !== t18 || $[86] !== t24 || $[87] !== t30) {
		t31 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			t18,
			t24,
			t30
		] });
		$[85] = t18;
		$[86] = t24;
		$[87] = t30;
		$[88] = t31;
	} else t31 = $[88];
	return t31;
}
function SystemActionButton(t0) {
	const $ = (0, import_compiler_runtime.c)(39);
	const { collapsed, disabled, isPending, isRunning: isActionRunning, item, onClick, tooltipWarmRef } = t0;
	const { icon: Icon, label, runningLabel, spin } = item;
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const [tooltipAnchor, setTooltipAnchor] = (0, import_react.useState)(null);
	const busy = isPending || isActionRunning;
	const displayLabel = isActionRunning ? runningLabel : label;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = (event) => {
			setHovered(true);
			setTooltipAnchor(event.currentTarget);
		};
		$[0] = t1;
	} else t1 = $[0];
	const showTooltip = t1;
	let t2;
	if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = () => {
			setHovered(false);
			setTooltipAnchor(null);
		};
		$[1] = t2;
	} else t2 = $[1];
	const hideTooltip = t2;
	const t3 = collapsed ? showTooltip : void 0;
	const t4 = collapsed ? hideTooltip : void 0;
	const t5 = collapsed ? displayLabel : void 0;
	const t6 = collapsed ? showTooltip : void 0;
	const t7 = collapsed ? hideTooltip : void 0;
	const t8 = busy ? "text-midground" : "text-text-secondary hover:text-midground";
	let t9;
	if ($[2] !== t8) {
		t9 = cn("group/action relative flex w-full items-center gap-3", "px-5 py-2.5", "font-sans text-display text-xs tracking-[0.1em]", "whitespace-nowrap transition-colors cursor-pointer", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground", t8, "disabled:text-text-disabled disabled:cursor-not-allowed");
		$[2] = t8;
		$[3] = t9;
	} else t9 = $[3];
	let t10;
	if ($[4] !== Icon || $[5] !== isActionRunning || $[6] !== isPending || $[7] !== spin) {
		t10 = isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "shrink-0 text-[0.875rem]" }) : isActionRunning && spin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "shrink-0 text-[0.875rem]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-3.5 w-3.5 shrink-0", isActionRunning && !spin && "animate-pulse") });
		$[4] = Icon;
		$[5] = isActionRunning;
		$[6] = isPending;
		$[7] = spin;
		$[8] = t10;
	} else t10 = $[8];
	const t11 = collapsed ? "lg:opacity-0" : "lg:opacity-100";
	let t12;
	if ($[9] !== t11) {
		t12 = cn("truncate transition-opacity duration-300", t11);
		$[9] = t11;
		$[10] = t12;
	} else t12 = $[10];
	let t13;
	if ($[11] !== displayLabel || $[12] !== t12) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: t12,
			children: displayLabel
		});
		$[11] = displayLabel;
		$[12] = t12;
		$[13] = t13;
	} else t13 = $[13];
	let t14;
	if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "absolute inset-y-0.5 left-1.5 right-1.5 bg-midground opacity-0 pointer-events-none transition-opacity duration-200 group-hover/action:opacity-5"
		});
		$[14] = t14;
	} else t14 = $[14];
	let t15;
	if ($[15] !== busy) {
		t15 = busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "absolute left-0 top-0 bottom-0 w-px bg-midground"
		});
		$[15] = busy;
		$[16] = t15;
	} else t15 = $[16];
	let t16;
	if ($[17] !== busy || $[18] !== disabled || $[19] !== onClick || $[20] !== t10 || $[21] !== t13 || $[22] !== t15 || $[23] !== t5 || $[24] !== t6 || $[25] !== t7 || $[26] !== t9) {
		t16 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick,
			disabled,
			"aria-busy": busy,
			"aria-label": t5,
			onFocus: t6,
			onBlur: t7,
			type: "button",
			className: t9,
			children: [
				t10,
				t13,
				t14,
				t15
			]
		});
		$[17] = busy;
		$[18] = disabled;
		$[19] = onClick;
		$[20] = t10;
		$[21] = t13;
		$[22] = t15;
		$[23] = t5;
		$[24] = t6;
		$[25] = t7;
		$[26] = t9;
		$[27] = t16;
	} else t16 = $[27];
	let t17;
	if ($[28] !== collapsed || $[29] !== displayLabel || $[30] !== hovered || $[31] !== tooltipAnchor || $[32] !== tooltipWarmRef) {
		t17 = collapsed && hovered && tooltipAnchor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTooltip, {
			anchor: tooltipAnchor,
			label: displayLabel,
			warmRef: tooltipWarmRef
		});
		$[28] = collapsed;
		$[29] = displayLabel;
		$[30] = hovered;
		$[31] = tooltipAnchor;
		$[32] = tooltipWarmRef;
		$[33] = t17;
	} else t17 = $[33];
	let t18;
	if ($[34] !== t16 || $[35] !== t17 || $[36] !== t3 || $[37] !== t4) {
		t18 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			onMouseEnter: t3,
			onMouseLeave: t4,
			children: [t16, t17]
		});
		$[34] = t16;
		$[35] = t17;
		$[36] = t3;
		$[37] = t4;
		$[38] = t18;
	} else t18 = $[38];
	return t18;
}
function SidebarIconWithTooltip(t0) {
	const $ = (0, import_compiler_runtime.c)(19);
	const { children, collapsed, label, tooltipWarmRef } = t0;
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const [tooltipAnchor, setTooltipAnchor] = (0, import_react.useState)(null);
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = (event) => {
			setHovered(true);
			setTooltipAnchor(event.currentTarget);
		};
		$[0] = t1;
	} else t1 = $[0];
	const showTooltip = t1;
	let t2;
	if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = () => {
			setHovered(false);
			setTooltipAnchor(null);
		};
		$[1] = t2;
	} else t2 = $[1];
	const hideTooltip = t2;
	const t3 = collapsed && "group/icon";
	let t4;
	if ($[2] !== t3) {
		t4 = cn("relative w-fit", t3);
		$[2] = t3;
		$[3] = t4;
	} else t4 = $[3];
	const t5 = collapsed ? showTooltip : void 0;
	const t6 = collapsed ? hideTooltip : void 0;
	let t7;
	if ($[4] !== collapsed) {
		t7 = collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "absolute inset-y-0 inset-x-[-0.375rem] bg-midground opacity-0 pointer-events-none transition-opacity duration-200 group-hover/icon:opacity-5 hidden lg:block"
		});
		$[4] = collapsed;
		$[5] = t7;
	} else t7 = $[5];
	let t8;
	if ($[6] !== collapsed || $[7] !== hovered || $[8] !== label || $[9] !== tooltipAnchor || $[10] !== tooltipWarmRef) {
		t8 = collapsed && hovered && tooltipAnchor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTooltip, {
			anchor: tooltipAnchor,
			label,
			warmRef: tooltipWarmRef
		});
		$[6] = collapsed;
		$[7] = hovered;
		$[8] = label;
		$[9] = tooltipAnchor;
		$[10] = tooltipWarmRef;
		$[11] = t8;
	} else t8 = $[11];
	let t9;
	if ($[12] !== children || $[13] !== t4 || $[14] !== t5 || $[15] !== t6 || $[16] !== t7 || $[17] !== t8) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t4,
			onMouseEnter: t5,
			onMouseLeave: t6,
			children: [
				children,
				t7,
				t8
			]
		});
		$[12] = children;
		$[13] = t4;
		$[14] = t5;
		$[15] = t6;
		$[16] = t7;
		$[17] = t8;
		$[18] = t9;
	} else t9 = $[18];
	return t9;
}
function GatewayDot(t0) {
	const $ = (0, import_compiler_runtime.c)(40);
	const { collapsed, status, tooltipWarmRef } = t0;
	const { t } = useI18n();
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const [tooltipAnchor, setTooltipAnchor] = (0, import_react.useState)(null);
	let label;
	let t1;
	let t10;
	let t2;
	let t3;
	let t4;
	let t5;
	let t6;
	let t7;
	let t8;
	let t9;
	if ($[0] !== collapsed || $[1] !== status || $[2] !== t) {
		const toneToColor = {
			"text-success": "bg-success",
			"text-warning": "bg-warning",
			"text-destructive": "bg-destructive",
			"text-muted-foreground": "bg-muted-foreground"
		};
		let color;
		if (!status) {
			color = "bg-midground/20";
			label = t.status.gateway;
		} else {
			let t11;
			if ($[14] !== status || $[15] !== t) {
				t11 = gatewayLine(status, t);
				$[14] = status;
				$[15] = t;
				$[16] = t11;
			} else t11 = $[16];
			const gw = t11;
			color = toneToColor[gw.tone] ?? "bg-muted-foreground";
			label = `${t.status.gateway} ${gw.label}`;
		}
		let t11;
		if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
			t11 = (event) => {
				setHovered(true);
				setTooltipAnchor(event.currentTarget);
			};
			$[17] = t11;
		} else t11 = $[17];
		const showTooltip = t11;
		let t12;
		if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
			t12 = () => {
				setHovered(false);
				setTooltipAnchor(null);
			};
			$[18] = t12;
		} else t12 = $[18];
		const hideTooltip = t12;
		const t13 = collapsed ? "lg:opacity-100" : "lg:opacity-0 lg:h-0 lg:py-0 lg:overflow-hidden";
		if ($[19] !== t13) {
			t3 = cn("hidden lg:flex py-3 pl-[1.625rem] transition-opacity duration-300", t13);
			$[19] = t13;
			$[20] = t3;
		} else t3 = $[20];
		t4 = "status";
		t5 = label;
		t6 = collapsed ? 0 : -1;
		t7 = collapsed ? showTooltip : void 0;
		t8 = collapsed ? hideTooltip : void 0;
		t9 = collapsed ? showTooltip : void 0;
		t10 = collapsed ? hideTooltip : void 0;
		t1 = true;
		t2 = cn("h-1.5 w-1.5 rounded-full", color);
		$[0] = collapsed;
		$[1] = status;
		$[2] = t;
		$[3] = label;
		$[4] = t1;
		$[5] = t10;
		$[6] = t2;
		$[7] = t3;
		$[8] = t4;
		$[9] = t5;
		$[10] = t6;
		$[11] = t7;
		$[12] = t8;
		$[13] = t9;
	} else {
		label = $[3];
		t1 = $[4];
		t10 = $[5];
		t2 = $[6];
		t3 = $[7];
		t4 = $[8];
		t5 = $[9];
		t6 = $[10];
		t7 = $[11];
		t8 = $[12];
		t9 = $[13];
	}
	let t11;
	if ($[21] !== t1 || $[22] !== t2) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": t1,
			className: t2
		});
		$[21] = t1;
		$[22] = t2;
		$[23] = t11;
	} else t11 = $[23];
	let t12;
	if ($[24] !== hovered || $[25] !== label || $[26] !== tooltipAnchor || $[27] !== tooltipWarmRef) {
		t12 = hovered && tooltipAnchor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTooltip, {
			anchor: tooltipAnchor,
			label,
			warmRef: tooltipWarmRef
		});
		$[24] = hovered;
		$[25] = label;
		$[26] = tooltipAnchor;
		$[27] = tooltipWarmRef;
		$[28] = t12;
	} else t12 = $[28];
	let t13;
	if ($[29] !== t10 || $[30] !== t11 || $[31] !== t12 || $[32] !== t3 || $[33] !== t4 || $[34] !== t5 || $[35] !== t6 || $[36] !== t7 || $[37] !== t8 || $[38] !== t9) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t3,
			role: t4,
			"aria-label": t5,
			tabIndex: t6,
			onMouseEnter: t7,
			onMouseLeave: t8,
			onFocus: t9,
			onBlur: t10,
			children: [t11, t12]
		});
		$[29] = t10;
		$[30] = t11;
		$[31] = t12;
		$[32] = t3;
		$[33] = t4;
		$[34] = t5;
		$[35] = t6;
		$[36] = t7;
		$[37] = t8;
		$[38] = t9;
		$[39] = t13;
	} else t13 = $[39];
	return t13;
}
function SidebarTooltip(t0) {
	const $ = (0, import_compiler_runtime.c)(16);
	const { anchor, label, warmRef } = t0;
	let t1;
	if ($[0] !== anchor) {
		t1 = anchor.getBoundingClientRect();
		$[0] = anchor;
		$[1] = t1;
	} else t1 = $[1];
	const rect = t1;
	let t2;
	if ($[2] !== rect.right) {
		t2 = document.getElementById("app-sidebar")?.getBoundingClientRect().right ?? rect.right;
		$[2] = rect.right;
		$[3] = t2;
	} else t2 = $[3];
	const sidebarRight = t2;
	const [isWarm, setIsWarm] = (0, import_react.useState)(false);
	let t3;
	let t4;
	if ($[4] !== warmRef) {
		t3 = () => {
			if (!warmRef) {
				setIsWarm(false);
				return;
			}
			const now = Date.now();
			setIsWarm(now - warmRef.current < 300);
			warmRef.current = now;
			return () => {
				if (warmRef) warmRef.current = Date.now();
			};
		};
		t4 = [warmRef];
		$[4] = warmRef;
		$[5] = t3;
		$[6] = t4;
	} else {
		t3 = $[5];
		t4 = $[6];
	}
	(0, import_react.useEffect)(t3, t4);
	let t5;
	if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
		t5 = cn("fixed z-[100] pointer-events-none", "px-2 py-1", "bg-background-base border border-current/20 shadow-lg", "font-sans text-display text-xs tracking-[0.1em] text-midground uppercase");
		$[7] = t5;
	} else t5 = $[7];
	const t6 = rect.top + rect.height / 2;
	const t7 = sidebarRight + 8;
	const t8 = isWarm ? 1 : void 0;
	const t9 = isWarm ? "none" : "sidebar-tooltip-in 120ms ease-out";
	let t10;
	if ($[8] !== t6 || $[9] !== t7 || $[10] !== t8 || $[11] !== t9) {
		t10 = {
			top: t6,
			left: t7,
			transform: "translateY(-50%)",
			opacity: t8,
			animation: t9
		};
		$[8] = t6;
		$[9] = t7;
		$[10] = t8;
		$[11] = t9;
		$[12] = t10;
	} else t10 = $[12];
	let t11;
	if ($[13] !== label || $[14] !== t10) {
		t11 = (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: t5,
			style: t10,
			children: label
		}), document.body);
		$[13] = label;
		$[14] = t10;
		$[15] = t11;
	} else t11 = $[15];
	return t11;
}
//#endregion
//#region web/src/contexts/ProfileProvider.tsx
/**
* Machine-level management-profile scope.
*
* One switcher (rendered in the sidebar) decides which profile every
* management page reads/writes. React STATE is the source of truth; the
* URL (`?profile=<name>`) is a synchronized projection of it so deep links
* land scoped and refresh survives. The selection is mirrored into the api
* module so `fetchJSON` transparently appends it to the profile-scoped
* endpoint families. "" = the dashboard's own profile.
*
* Why state-first instead of URL-first: sidebar nav links are bare paths
* (`/config`, `/skills`). A URL-derived scope would silently reset to the
* dashboard's own profile on every nav click — the switcher would LOOK
* global while normal navigation dropped the write target. With state as
* truth, the effect below re-asserts `?profile=` onto the new location
* after each navigation, so the scope survives nav and stays deep-linkable.
*
* This exists because "Set as active" on the Profiles page historically only
* flipped the sticky active_profile file (future CLI/gateway runs). The
* switcher is the dashboard's write-target selector for Chat and management
* pages. We now sync the switcher when the sticky active profile differs from
* the dashboard process on load, and ProfilesPage updates the switcher when
* you click "Set as active".
*/
function ProfileProvider({ children }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const { pathname } = useLocation();
	const [profiles, setProfiles] = (0, import_react.useState)([]);
	const [currentProfile, setCurrentProfile] = (0, import_react.useState)("default");
	const bootstrapProfile = dashboardInitialProfile();
	const [profile, setProfileState] = (0, import_react.useState)(() => initialProfileScope(searchParams, bootstrapProfile));
	const urlProfile = searchParams.get("profile");
	const [seenUrlProfile, setSeenUrlProfile] = (0, import_react.useState)(urlProfile);
	if (urlProfile !== seenUrlProfile) {
		setSeenUrlProfile(urlProfile);
		if (urlProfile !== null && urlProfile !== profile) setProfileState(urlProfile);
	}
	setManagementProfile(profile);
	(0, import_react.useEffect)(() => {
		if ((profile || "") === (urlProfile ?? "")) return;
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (profile) next.set("profile", profile);
			else next.delete("profile");
			return next;
		}, { replace: true });
	}, [
		pathname,
		urlProfile,
		profile
	]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const urlProfile = searchParams.get("profile");
		Promise.all([api.getProfiles(), api.getActiveProfile()]).then(([profilesRes, info]) => {
			if (cancelled) return;
			setProfiles(profilesRes.profiles.map((p) => p.name));
			const current = info.current || "default";
			const active = info.active || "default";
			setCurrentProfile(current);
			if (shouldAdoptActiveProfile(urlProfile, bootstrapProfile, current, active)) {
				setManagementProfile(active);
				setProfileState(active);
			}
		}).catch(() => {});
		return () => {
			cancelled = true;
		};
	}, []);
	const setProfile = (0, import_react.useCallback)((name) => {
		setManagementProfile(name);
		setProfileState(name);
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (name) next.set("profile", name);
			else next.delete("profile");
			return next;
		}, { replace: true });
	}, [setSearchParams]);
	const value = (0, import_react.useMemo)(() => ({
		profile,
		currentProfile,
		profiles,
		setProfile
	}), [
		profile,
		currentProfile,
		profiles,
		setProfile
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileContext.Provider, {
		value,
		children
	});
}
//#endregion
//#region web/src/contexts/SystemActions.tsx
var ACTION_NAMES = {
	restart: "gateway-restart",
	update: "hermes-update"
};
function SystemActionsProvider({ children }) {
	const [pendingAction, setPendingAction] = (0, import_react.useState)(null);
	const [activeAction, setActiveAction] = (0, import_react.useState)(null);
	const [actionStatus, setActionStatus] = (0, import_react.useState)(null);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [updateActionId, setUpdateActionId] = (0, import_react.useState)();
	const { t } = useI18n();
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const timer = setTimeout(() => setToast(null), 4e3);
		return () => clearTimeout(timer);
	}, [toast]);
	(0, import_react.useEffect)(() => {
		if (!activeAction) return;
		const name = ACTION_NAMES[activeAction];
		let cancelled = false;
		const poll = async () => {
			try {
				const resp = await api.getActionStatus(name);
				if (cancelled) return;
				setActionStatus(resp);
				if (!resp.running) {
					const ok = resp.exit_code === 0;
					const shared = ok && activeAction === "restart" ? sharedGatewayProfiles(await api.getStatus().catch(() => null)) : null;
					if (cancelled) return;
					const debt = activeAction === "update" ? updateDebt(resp.receipt, updateActionId) : null;
					const owed = [debt?.followups && `${t.status.actionFinishedOwed}: ${debt.followups}`, debt?.userAction].filter(Boolean).join(". ");
					const verdict = ok ? shared ? sharedGatewayRestartedMessage(shared.length) : owed ? "" : t.status.actionFinished : `${t.status.actionFailed} (exit ${resp.exit_code ?? "?"})`;
					setToast({
						type: ok && !owed ? "success" : "error",
						message: [verdict, owed].filter(Boolean).join(" — ")
					});
					return;
				}
			} catch {}
			if (!cancelled) setTimeout(poll, 1500);
		};
		poll();
		return () => {
			cancelled = true;
		};
	}, [
		activeAction,
		updateActionId,
		t.status.actionFinished,
		t.status.actionFinishedOwed,
		t.status.actionFailed
	]);
	const runAction = (0, import_react.useCallback)(async (action) => {
		setPendingAction(action);
		setActionStatus(null);
		try {
			if (action === "restart") {
				await api.restartGateway();
				setActiveAction(action);
			} else {
				const resp_0 = await api.updateHermes();
				if (!resp_0.ok) {
					const cmd = resp_0.update_command ? `  ${resp_0.update_command}` : "";
					setToast({
						type: "success",
						message: (resp_0.message ?? "Updates don't apply from this dashboard.") + cmd
					});
					return;
				}
				setUpdateActionId(resp_0.action_id);
				setActiveAction(action);
			}
		} catch (err) {
			const detail = err instanceof Error ? err.message : String(err);
			setToast({
				type: "error",
				message: `${t.status.actionFailed}: ${detail}`
			});
		} finally {
			setPendingAction(null);
		}
	}, [t.status.actionFailed]);
	const dismissLog = (0, import_react.useCallback)(() => {
		setActiveAction(null);
		setActionStatus(null);
	}, []);
	const isRunning = activeAction !== null && actionStatus?.running !== false;
	const isBusy = pendingAction !== null || isRunning;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SystemActionsContext.Provider, {
		value: {
			actionStatus,
			activeAction,
			dismissLog,
			isBusy,
			isRunning,
			pendingAction,
			runAction
		},
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast })]
	});
}
//#endregion
//#region web/src/lib/chunk-load-recovery.ts
var RELOADED_FROM_KEY = "hermes.chunkLoadReloadedFrom";
var CHUNK_LOAD_ERROR = /* @__PURE__ */ new RegExp("^(Unable to preload CSS for |Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed)");
var ENTRY_SCRIPT = /<script\b[^>]*\btype=["']module["'][^>]*\bsrc=["']([^"']+)["']/i;
/** A failed load of one of our own build chunks. Safari's message carries no
*  URL; the others must point at the build's `/assets/`, so a broken plugin
*  bundle under `/dashboard-plugins/` never triggers a reload. */
function isChunkLoadError(error) {
	if (!(error instanceof Error) || !CHUNK_LOAD_ERROR.test(error.message)) return false;
	const url = /https?:\/\/\S+|\/\S+/.exec(error.message)?.[0];
	return !url || url.includes("/assets/");
}
/** The built entry an index.html references, resolved against `base`. */
function entryFromIndexHtml(html, base) {
	const src = ENTRY_SCRIPT.exec(html)?.[1];
	return src ? new URL(src, base).href : null;
}
function sessionStore() {
	try {
		return window.sessionStorage;
	} catch {
		return null;
	}
}
function documentEntry() {
	return document.querySelector("script[type=\"module\"][src*=\"/assets/\"]")?.src || null;
}
/** Fetches the URL a reload would load, so both see the same index.html. */
async function freshIndexEntry() {
	const url = window.location.href.split("#")[0];
	try {
		const res = await fetch(url, {
			cache: "no-store",
			credentials: "same-origin"
		});
		return res.ok ? entryFromIndexHtml(await res.text(), res.url || url) : null;
	} catch {
		return null;
	}
}
/** The entry this tab last reloaded away from; undefined when storage throws. */
function reloadedFrom(storage) {
	try {
		return storage.getItem(RELOADED_FROM_KEY);
	} catch {
		return;
	}
}
function markReloadedFrom(storage, entry) {
	try {
		storage.setItem(RELOADED_FROM_KEY, entry);
		return true;
	} catch {
		return false;
	}
}
/** Reload into a newer build after a chunk load failure. Resolves to whether a
*  reload started. */
async function reloadForChunkLoadError(error, { storage = sessionStore(), reload = () => window.location.reload(), runningEntry = documentEntry, publishedEntry = freshIndexEntry, online = () => navigator.onLine !== false } = {}) {
	if (!storage || !isChunkLoadError(error) || !online()) return false;
	const running = runningEntry();
	if (!running) return false;
	const guard = reloadedFrom(storage);
	if (guard === void 0 || guard === running) return false;
	const published = await publishedEntry();
	if (!published || published === running) return false;
	if (reloadedFrom(storage) === running || !markReloadedFrom(storage, running)) return false;
	reload();
	return true;
}
/** Vite dispatches `vite:preloadError` for every failed lazy import and chunk
*  CSS preload, including imports nobody awaits. The event is not cancelled,
*  so the import still rejects as before when no reload happens. */
function startChunkLoadRecovery(target = window, deps = {}) {
	target.addEventListener("vite:preloadError", (event) => {
		reloadForChunkLoadError(event.payload, deps);
	});
}
//#endregion
//#region web/src/main.tsx
startChunkLoadRecovery();
exposePluginSDK();
(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrowserRouter, {
	basename: HERMES_BASE_PATH || void 0,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemActionsProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}) }) }) }) })
}));
//#endregion
export { sharedGatewayProfiles as a, latchChatActivation as c, useTheme as d, useSystemActions as f, servedProfileRefusal as i, isDashboardEmbeddedChatEnabled as l, PageHeaderContext as m, gatewayStateDescription as n, sharedGatewayRestartDescription as o, useProfileScope as p, gatewayStateNeedsLogs as r, sharedGatewayRestartedMessage as s, gatewayActionFailedMessage as t, PluginSlot as u };
