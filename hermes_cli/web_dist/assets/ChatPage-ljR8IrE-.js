import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { f as useNavigate, h as require_react, m as require_react_dom, n as require_compiler_runtime, o as useSearchParams, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { F as RotateCcw, Gt as CircleAlert, I as RefreshCw, Jt as ChevronDown, Y as PanelRight, Zt as Brain, it as MessageSquarePlus, pt as KeyRound, r as X, wt as FolderGit2, zt as Copy } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, L as Spinner, N as Select, P as SelectOption, V as Typography, j as ListItem, m as Card, p as Input } from "./ui-vIdGzE07.js";
import { i as timeAgo, t as cn } from "./utils-XzxpPQdK.js";
import { r as useI18n } from "./i18n-Zn9FHQtI.js";
import { a as buildWsUrl, b as JsonRpcGatewayClient, d as maybeReloadForLoopbackWsAuthFailure, g as buildHermesWebSocketUrl, i as buildWsAuthParam, n as api, r as authedFetch, t as HERMES_BASE_PATH, u as errorMessage, v as DEFAULT_REASONING_EFFORT, y as REASONING_EFFORT_VALUES } from "./api-rr7lTIEw.js";
import { n as ModelPickerDialog, t as ModelReloadConfirm } from "./ModelReloadConfirm-Dm6sEujK.js";
import { c as latchChatActivation, d as useTheme, p as useProfileScope, u as PluginSlot } from "./index-CeRydpmd.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
import { a as o, i as Ke, n as xr, r as L, t as Dl } from "./xterm-BNnjXmiT.js";
import { t as copyTextToClipboard } from "./clipboard-C-rbBxe_.js";
import { n as refitWhenTerminalFontLoads, t as TERMINAL_FONT_FAMILY } from "./terminal-font-refit-BbW1Op6j.js";
//#region apps/shared/src/reconnect-backoff.ts
var DEFAULT_BASE_DELAY_MS = 300;
var DEFAULT_CAP_MS = 15e3;
var MAX_EXPONENT = 32;
/**
* Delay before reconnect attempt number `attempt` (0-indexed: the first retry
* after the initial failure is `attempt = 0`). With jitter the value lies in
* `[0, min(capMs, baseDelayMs * 2 ** attempt))`; without it, it IS that ceiling.
*/
function reconnectBackoffDelayMs(attempt, options = {}) {
	const baseDelayMs = options.baseDelayMs ?? DEFAULT_BASE_DELAY_MS;
	const capMs = options.capMs ?? DEFAULT_CAP_MS;
	const ceiling = Math.min(capMs, baseDelayMs * 2 ** Math.min(Math.max(0, Math.trunc(attempt)), MAX_EXPONENT));
	return options.jitter === false ? ceiling : Math.random() * ceiling;
}
//#endregion
//#region web/src/lib/reasoning-effort.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var EFFORT_LABELS = {
	none: "Off (no thinking)",
	minimal: "Minimal",
	low: "Low",
	medium: "Medium",
	high: "High",
	xhigh: "Extra High",
	max: "Max",
	ultra: "Ultra"
};
/** `none` first, then the seven levels ascending — the shared value order. */
var EFFORT_OPTIONS = REASONING_EFFORT_VALUES.map((value) => ({
	value,
	label: EFFORT_LABELS[value]
}));
var VALID_EFFORTS = new Set(REASONING_EFFORT_VALUES);
/** Normalize a raw `agent.reasoning_effort` config value to a selectable
*  option. Empty/unknown → `medium` (Hermes' default when unset). */
function normalizeEffort(raw) {
	const value = String(raw ?? "").trim().toLowerCase();
	if (!value) return DEFAULT_REASONING_EFFORT;
	return VALID_EFFORTS.has(value) ? value : DEFAULT_REASONING_EFFORT;
}
//#endregion
//#region web/src/components/ReasoningPicker.tsx
/**
* ReasoningPicker — sets the main model's reasoning effort from the dashboard
* Chat sidebar, mirroring the desktop app's composer effort radio.
*
* The dashboard previously only showed a read-only "Reasoning" capability
* badge (see ModelInfoCard) with no way to actually choose the effort level —
* unlike the desktop app, which exposes a radio in its model menu. This closes
* that parity gap.
*
* Storage: the effort persists to config.yaml at `agent.reasoning_effort`
* (the same key the TUI's `/reasoning <level>` command and the desktop radio
* write). We read the whole config and write it back — the established
* single-key pattern on the dashboard (see ConfigPage) — so the value lands in
* the config the agent boots a fresh chat from. As with the model picker, the
* running chat session adopts the change on the next `/new` or page reload;
* we surface that hint rather than forcing a reload here.
*
* Profile scoping: the sidebar passes the chat profile explicitly, so this
* reads/writes the same config the chat PTY was launched from.
*/
var import_jsx_runtime = require_jsx_runtime();
function ReasoningPicker({ currentModel, profile, refreshKey = 0, onChanged }) {
	const [effort, setEffort] = (0, import_react.useState)("medium");
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const lastFetchKeyRef = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		const fetchKey = `${profile ?? ""}:${currentModel}:${refreshKey}`;
		if (fetchKey === lastFetchKeyRef.current) return;
		lastFetchKeyRef.current = fetchKey;
		api.getConfig(profile).then((cfg) => {
			const agent = cfg?.agent ?? {};
			setEffort(normalizeEffort(agent.reasoning_effort));
			setLoaded(true);
		}).catch(() => {
			setLoaded(true);
		});
	}, [
		currentModel,
		profile,
		refreshKey
	]);
	const onSelect = (0, import_react.useCallback)((next) => {
		if (!VALID_EFFORTS.has(next) || next === effort) return;
		const prev = effort;
		setEffort(next);
		setSaving(true);
		api.saveConfig({ agent: { reasoning_effort: next } }, profile).then(() => {
			onChanged?.(next);
		}).catch(() => {
			setEffort(prev);
		}).finally(() => setSaving(false));
	}, [
		effort,
		onChanged,
		profile
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 px-3 py-2 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-text-tertiary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-display tracking-wider",
				children: "reasoning"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
			className: "ml-auto min-w-0",
			disabled: !loaded || saving,
			onValueChange: onSelect,
			value: effort,
			children: EFFORT_OPTIONS.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
				value: opt.value,
				children: opt.label
			}, opt.value))
		})]
	});
}
//#endregion
//#region web/src/lib/gatewayClient.ts
/**
* Browser WebSocket client for the tui_gateway JSON-RPC protocol.
*
* Speaks the exact same newline-delimited JSON-RPC dialect that the Ink TUI
* drives over stdio. The server-side transport abstraction
* (tui_gateway/transport.py + ws.py) routes the same dispatcher's writes
* onto either stdout or a WebSocket depending on how the client connected.
*
*   const gw = new GatewayClient()
*   await gw.connect()
*   const { session_id } = await gw.request<{ session_id: string }>("session.create")
*   gw.on("message.delta", (ev) => console.log(ev.payload?.text))
*   await gw.request("prompt.submit", { session_id, text: "hi" })
*/
var GatewayClient = class extends JsonRpcGatewayClient {
	constructor() {
		super({
			closedErrorMessage: "WebSocket closed",
			connectErrorMessage: "WebSocket connection failed",
			notConnectedErrorMessage: "gateway not connected",
			onSocketClose: (event) => maybeReloadForLoopbackWsAuthFailure(event.code),
			requestIdPrefix: "w"
		});
	}
	async connect(token) {
		if (this.connectionState === "open" || this.connectionState === "connecting") return;
		const authParam = token ? ["token", token] : await buildWsAuthParam();
		if (!authParam[1]) throw new Error("Session token not available — page must be served by the Hermes dashboard server");
		await super.connect(buildHermesWebSocketUrl({
			authParam,
			basePath: HERMES_BASE_PATH,
			path: "/api/ws"
		}));
	}
};
//#endregion
//#region web/src/lib/events-reconnect.ts
/**
* Reconnect policy for the ChatSidebar `/api/events` subscriber socket.
*
* Pure helpers, no DOM: the component owns the socket and the timer, this
* module owns the arithmetic and the "is this close code worth retrying"
* decision so both can be unit-tested without a fake WebSocket.
*/
var EVENTS_RECONNECT_BASE_MS = 1e3;
var EVENTS_RECONNECT_MAX_MS = 3e4;
/** Bound ticket minting plus the WebSocket opening handshake. */
var EVENTS_CONNECT_TIMEOUT_MS = 15e3;
/** Normal closure — the server said goodbye, don't chase it. */
var WS_CLOSE_NORMAL = 1e3;
/** Ticket rejected / forbidden: retrying just burns tickets, user must reload. */
var WS_CLOSE_AUTH_CODES = /* @__PURE__ */ new Set([4401, 4403]);
/**
* Exponential backoff, 1s → 2s → 4s → … → 30s cap. Deterministic (no jitter)
* because the banner prints the exact delay.
*
* `attempt` is 0-based: attempt 0 is the first retry after the initial
* connection dropped.
*/
function eventsReconnectDelayMs(attempt) {
	return reconnectBackoffDelayMs(attempt, {
		baseDelayMs: EVENTS_RECONNECT_BASE_MS,
		capMs: EVENTS_RECONNECT_MAX_MS,
		jitter: false
	});
}
/**
* Whether a close code should trigger a retry.
*
* Auth rejections are terminal (the banner tells the user to reload) and a
* normal 1000 close is intentional. Everything else — gateway restart,
* network drop, 1005/1006, proxy timeout — is worth retrying.
*/
function shouldRetryEventsClose(code) {
	if (code === void 0) return true;
	return code !== WS_CLOSE_NORMAL && !WS_CLOSE_AUTH_CODES.has(code);
}
function isEventsAuthRejection(code) {
	return code !== void 0 && WS_CLOSE_AUTH_CODES.has(code);
}
var EVENTS_FEED_PREFIX = "Live tool activity ";
`${EVENTS_FEED_PREFIX}`;
function eventsReconnectingMessage(delayMs) {
	return `${EVENTS_FEED_PREFIX}paused — reconnecting in ${Math.round(delayMs / 1e3)}s…`;
}
/** Auth rejection (4401/4403): the login expired, only a reload mints a new one.
*  The code is logged by the caller; it never appears in user text. */
function eventsRejectedMessage(code) {
	return `${EVENTS_FEED_PREFIX}stopped (your login expired). Reload the page to resume.`;
}
function eventsGaveUpMessage() {
	return `${EVENTS_FEED_PREFIX}stopped after 15 reconnect attempts. Click Reconnect side panel, or reload the page.`;
}
/** True for the auth-rejection message, which needs a Reload button rather than Reconnect. */
function isEventsAuthRejectionMessage(message) {
	return message === eventsRejectedMessage(4401);
}
/**
* True when `message` is one this module produced, i.e. safe to clear on a
* successful reconnect. Guards against stomping a `credential_warning` or a
* sidecar error that happens to be showing when the feed recovers.
*/
function isEventsFeedMessage(message) {
	if (!message) return false;
	return message.startsWith(EVENTS_FEED_PREFIX);
}
//#endregion
//#region web/src/lib/eventsFeedClient.ts
/**
* `/api/events` subscriber for the dashboard chat sidebar.
*
* A notification-only view of the shared JSON-RPC client: the server never
* answers requests on this socket (subscribers don't speak), so replay is
* off and `request()` is not part of the surface. One instance lives for
* the component's whole life — the owner calls `connect()` again after a
* drop instead of building a new client — so the shared per-generation
* guards (stale-socket close, connect timeout, `error`+`close` collapsed
* into one `closed` transition) apply to every attempt.
*/
var EventsFeedClient = class extends JsonRpcGatewayClient {
	closeHandlers = /* @__PURE__ */ new Set();
	closeCode = void 0;
	constructor() {
		super({
			closedErrorMessage: "events feed closed",
			connectErrorMessage: "events feed connection failed",
			connectTimeoutMs: EVENTS_CONNECT_TIMEOUT_MS,
			heartbeatDeadlineMs: 0,
			heartbeatIntervalMs: 0,
			onSocketClose: (event) => {
				this.closeCode = event.code;
				return maybeReloadForLoopbackWsAuthFailure(event.code);
			},
			replay: false,
			requestIdPrefix: "e"
		});
		this.onState((state) => {
			if (state === "closed" || state === "error") {
				const code = this.closeCode ?? void 0;
				this.closeCode = void 0;
				for (const handler of this.closeHandlers) handler(code);
			}
		});
	}
	/** Close code of the most recent drop; `null` before any socket was dialed. */
	get lastCloseCode() {
		return this.closeCode;
	}
	/**
	* Called once per generation that ends without opening or after opening:
	* `code` is the WebSocket close code, or `undefined` when the handshake
	* timed out / errored without a close frame.
	*/
	onClose(handler) {
		this.closeHandlers.add(handler);
		return () => this.closeHandlers.delete(handler);
	}
	/** Mint a fresh single-use ticket and dial `/api/events` for `channel`. */
	async connect(channel) {
		this.closeCode = null;
		const url = await withTimeout(buildWsUrl("/api/events", { channel }), EVENTS_CONNECT_TIMEOUT_MS);
		await super.connect(url);
	}
};
function withTimeout(promise, ms) {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => reject(/* @__PURE__ */ new Error("events feed ticket request timed out")), ms);
		promise.then((value) => {
			clearTimeout(timer);
			resolve(value);
		}, (error) => {
			clearTimeout(timer);
			reject(error instanceof Error ? error : new Error(String(error)));
		});
	});
}
//#endregion
//#region web/src/lib/chat-sidebar-banner.ts
/**
* Copy for the ChatSidebar banner: the sidecar (JSON-RPC over /api/ws) and
* the credential probe the gateway sends in `session.info`.
*
* Pure helpers so the wording is testable without React.
*/
/** The side panel could not connect; the chat itself is unaffected. */
var SIDECAR_DISCONNECTED_MESSAGE = "The chat side panel (model and tool activity) could not connect. Chat still works. Click Reconnect side panel to try again.";
/** Transport-level texts the shared JSON-RPC client can throw. All mean "sidecar down". */
var SIDECAR_TRANSPORT_ERRORS = [
	"WebSocket connection failed",
	"WebSocket closed",
	"gateway not connected",
	"Session token not available",
	"heartbeat acknowledgement timed out"
];
/**
* Map a sidecar connect/RPC error to the banner sentence. Transport jargon
* collapses to SIDECAR_DISCONNECTED_MESSAGE; anything else (a real gateway
* error payload, e.g. a bad profile name) is shown as-is.
*/
function sidecarErrorMessage(raw) {
	return SIDECAR_TRANSPORT_ERRORS.some((needle) => raw.includes(needle)) ? SIDECAR_DISCONNECTED_MESSAGE : raw;
}
var NO_KEY_RE = /No API key configured for provider '([^']+)'/;
/**
* Rewrite the gateway's "No API key configured for provider 'x'. First message
* will fail." into a sentence that names the fix. Unknown warnings pass
* through unchanged (provider null) so nothing is lost.
*/
function credentialWarning(raw) {
	if (!raw) return null;
	const match = raw.match(NO_KEY_RE);
	if (!match) return {
		provider: null,
		message: raw
	};
	const provider = match[1];
	return {
		provider,
		message: `No API key set for ${provider}, so messages will fail. Add a key under Keys, or pick a different provider.`
	};
}
//#endregion
//#region web/src/lib/chat-title.ts
function normalizeSessionTitle(raw) {
	if (typeof raw !== "string") return null;
	const title = raw.trim();
	return title ? title : null;
}
function titleFromSessionInfoPayload(payload) {
	if (!payload || typeof payload !== "object" || !("title" in payload)) return;
	return normalizeSessionTitle(payload.title);
}
//#endregion
//#region web/src/components/ChatSidebar.tsx
/**
* ChatSidebar — structured-events panel that sits next to the xterm.js
* terminal in the dashboard Chat tab.
*
* Two WebSockets, one per concern:
*
*   1. **JSON-RPC sidecar** (`GatewayClient` → /api/ws) — a lightweight
*      session used only for connection state (the "live" badge) and
*      credential warnings. Independent of the PTY pane's session by
*      design. The model badge does NOT come from here: it prefers the
*      PTY chat session's runtime identity (`session.info` over the events
*      feed — the model actually answering, which changes when a provider
*      fallback replaces the configured primary mid-turn, #54509), falls
*      back to the effective config model over REST (`/api/model/info`),
*      and the model picker writes config over REST (`/api/model/set`)
*      then offers a dashboard reload so the running chat adopts it.
*
*   2. **Event subscriber** (/api/events?channel=…) — passive, receives
*      every dispatcher emit from the PTY-side `tui_gateway.entry` that
*      the dashboard fanned out.  The sidebar uses it for `session.info`
*      (live chat title) and `dashboard.new_session_requested`.  The
*      `channel` id ties this listener to the same chat tab's PTY child —
*      see `ChatPage.tsx` for where the id is generated.  Transient drops
*      (gateway restart, network blip) auto-reconnect with exponential
*      backoff; auth rejections are terminal.  See `lib/events-reconnect`.
*
* Best-effort throughout: WS failures show in the badge / banner, the
* terminal pane keeps working unimpaired.
*/
var SIDE_CAR_MAX_RECONNECT_ATTEMPTS = 5;
var HEALTHY_OPEN_GRACE_MS = 1e4;
var SIDE_CAR_GAVE_UP_MESSAGE = `gateway sidecar disconnected — gave up after ${SIDE_CAR_MAX_RECONNECT_ATTEMPTS} attempts, use Reconnect`;
var STATE_LABEL = {
	idle: "idle",
	connecting: "connecting",
	open: "live",
	closed: "closed",
	error: "error"
};
var STATE_TONE = {
	idle: "secondary",
	connecting: "warning",
	open: "success",
	closed: "secondary",
	error: "destructive"
};
/** The runtime model a `session.info` payload reports, or undefined when it
*  carries none (title-only updates) — config stays the badge's source then.
*  `session.info` is surface-specific on the wire, so narrow defensively. */
function sessionInfoModel(payload) {
	if (!payload || typeof payload !== "object") return void 0;
	const model = payload.model;
	return typeof model === "string" && model.trim() ? model : void 0;
}
/** Build the ``session.create`` params for the sidecar session.
*
* Extracted from the effect below so the invariant — close_on_disconnect
* is set, source is "tool", and the profile is forwarded when present —
* can be tested without reading component source text. See
* ``chat-sidebar-session-params.test.ts``.
*/
function sidecarSessionCreateParams(profile) {
	return {
		close_on_disconnect: true,
		source: "tool",
		...profile ? { profile } : {}
	};
}
function ChatSidebar({ channel, profile, className, onDashboardNewSessionRequest, onSessionTitleChange }) {
	const navigate = useNavigate();
	const [version, setVersion] = (0, import_react.useState)(0);
	const gw = (0, import_react.useMemo)(() => new GatewayClient(), []);
	const feed = (0, import_react.useMemo)(() => new EventsFeedClient(), []);
	const sidecarRedialAttemptRef = (0, import_react.useRef)(0);
	const sidecarGaveUpRef = (0, import_react.useRef)(false);
	const [state, setState] = (0, import_react.useState)("idle");
	const [info, setInfo] = (0, import_react.useState)({});
	const [modelOpen, setModelOpen] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [runtimeModel, setRuntimeModel] = (0, import_react.useState)("");
	const [effectiveModel, setEffectiveModel] = (0, import_react.useState)("");
	const [supportsReasoning, setSupportsReasoning] = (0, import_react.useState)(false);
	const [modelRefreshKey, setModelRefreshKey] = (0, import_react.useState)(0);
	const [modelNotice, setModelNotice] = (0, import_react.useState)(null);
	const [pendingReloadModel, setPendingReloadModel] = (0, import_react.useState)(null);
	const [switchNotice, setSwitchNotice] = (0, import_react.useState)(null);
	const refreshEffectiveModel = (0, import_react.useCallback)(() => {
		api.getModelInfo(profile).then((r) => {
			if (r?.model) setEffectiveModel(String(r.model));
			setSupportsReasoning(!!r?.capabilities?.supports_reasoning);
			setModelRefreshKey((k) => k + 1);
		}).catch(() => {});
	}, [profile]);
	const scopeKey = `${channel}\0${profile ?? ""}`;
	const prevScopeKey = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (prevScopeKey.current === null) {
			prevScopeKey.current = scopeKey;
			return;
		}
		if (prevScopeKey.current === scopeKey) return;
		prevScopeKey.current = scopeKey;
		setError(null);
		setRuntimeModel("");
		sidecarRedialAttemptRef.current = 0;
		sidecarGaveUpRef.current = false;
		setVersion((v) => v + 1);
	}, [scopeKey]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		queueMicrotask(() => {
			if (cancelled) return;
			setInfo({});
			setError(null);
		});
		const offState = gw.onState(setState);
		const offSessionInfo = gw.on("session.info", (ev) => {
			const payload = ev.payload;
			if (payload) setInfo((prev) => ({
				...prev,
				...payload
			}));
		});
		const offError = gw.on("error", (ev) => {
			const message = ev.payload?.message;
			if (message) {
				console.warn(`[chat-sidebar] sidecar error: ${message}`);
				setError(sidecarErrorMessage(message));
			}
		});
		let redialTimer = null;
		let healthyOpenTimer = null;
		let replayingInitialState = true;
		queueMicrotask(() => {
			replayingInitialState = false;
		});
		const offRedial = gw.onState((s) => {
			if (replayingInitialState) return;
			if (s === "open") {
				if (redialTimer) {
					clearTimeout(redialTimer);
					redialTimer = null;
				}
				if (healthyOpenTimer) clearTimeout(healthyOpenTimer);
				healthyOpenTimer = setTimeout(() => {
					healthyOpenTimer = null;
					sidecarRedialAttemptRef.current = 0;
					if (sidecarGaveUpRef.current) {
						sidecarGaveUpRef.current = false;
						setError((current) => current === SIDE_CAR_GAVE_UP_MESSAGE ? null : current);
					}
				}, HEALTHY_OPEN_GRACE_MS);
				return;
			}
			if (s !== "closed" && s !== "error") return;
			if (healthyOpenTimer) {
				clearTimeout(healthyOpenTimer);
				healthyOpenTimer = null;
			}
			if (cancelled || redialTimer) return;
			if (sidecarRedialAttemptRef.current >= SIDE_CAR_MAX_RECONNECT_ATTEMPTS) {
				if (!sidecarGaveUpRef.current) {
					sidecarGaveUpRef.current = true;
					setError((current) => current ?? SIDE_CAR_GAVE_UP_MESSAGE);
				}
				return;
			}
			const attempt = sidecarRedialAttemptRef.current;
			sidecarRedialAttemptRef.current += 1;
			const delayMs = Math.min(250 * 2 ** attempt, 3e3);
			redialTimer = setTimeout(() => {
				redialTimer = null;
				if (!cancelled) setVersion((v) => v + 1);
			}, delayMs);
		});
		gw.connect().then(() => {
			if (cancelled) return;
			return gw.request("session.create", sidecarSessionCreateParams(profile));
		}).catch((e) => {
			if (!cancelled) {
				console.warn(`[chat-sidebar] sidecar connect failed: ${e.message}`);
				setError(sidecarErrorMessage(e.message));
			}
		});
		return () => {
			cancelled = true;
			if (redialTimer) {
				clearTimeout(redialTimer);
				redialTimer = null;
			}
			if (healthyOpenTimer) {
				clearTimeout(healthyOpenTimer);
				healthyOpenTimer = null;
			}
			offRedial();
			offState();
			offSessionInfo();
			offError();
			gw.close();
		};
	}, [gw, version]);
	(0, import_react.useEffect)(() => {
		if (!channel) return;
		let unmounting = false;
		let reconnectTimer = null;
		let healthyOpenTimer = null;
		let attempt = 0;
		const surface = (msg) => !unmounting && setError((current) => isEventsFeedMessage(current) ? msg : current ?? msg);
		const clearEventsBanner = () => !unmounting && setError((current) => isEventsFeedMessage(current) ? null : current);
		const scheduleReconnect = () => {
			if (unmounting || reconnectTimer) return;
			if (healthyOpenTimer) {
				clearTimeout(healthyOpenTimer);
				healthyOpenTimer = null;
			}
			if (attempt >= 15) {
				surface(eventsGaveUpMessage());
				return;
			}
			const delay = eventsReconnectDelayMs(attempt);
			attempt += 1;
			surface(eventsReconnectingMessage(delay));
			reconnectTimer = setTimeout(() => {
				reconnectTimer = null;
				connect();
			}, delay);
		};
		const connect = async () => {
			if (unmounting) return;
			try {
				await feed.connect(channel);
			} catch {
				if (!unmounting && feed.lastCloseCode === null) scheduleReconnect();
			}
		};
		const offClose = feed.onClose((code) => {
			if (unmounting) return;
			console.warn(`[chat-sidebar] events feed closed code=${code ?? "none"}`);
			if (code !== void 0 && isEventsAuthRejection(code)) {
				surface(eventsRejectedMessage(code));
				return;
			}
			if (shouldRetryEventsClose(code)) scheduleReconnect();
		});
		const offState = feed.onState((state) => {
			if (state === "open") {
				clearEventsBanner();
				if (healthyOpenTimer) clearTimeout(healthyOpenTimer);
				healthyOpenTimer = setTimeout(() => {
					healthyOpenTimer = null;
					attempt = 0;
				}, HEALTHY_OPEN_GRACE_MS);
			}
		});
		const offSessionInfo = feed.on("session.info", (ev) => {
			const title = titleFromSessionInfoPayload(ev.payload);
			if (title !== void 0) onSessionTitleChange?.(title);
			const model = sessionInfoModel(ev.payload);
			if (model !== void 0) setRuntimeModel(model);
		});
		const offNewSession = feed.on("dashboard.new_session_requested", () => {
			onDashboardNewSessionRequest?.();
		});
		connect();
		return () => {
			unmounting = true;
			if (reconnectTimer) {
				clearTimeout(reconnectTimer);
				reconnectTimer = null;
			}
			if (healthyOpenTimer) {
				clearTimeout(healthyOpenTimer);
				healthyOpenTimer = null;
			}
			offClose();
			offState();
			offSessionInfo();
			offNewSession();
			feed.close();
		};
	}, [
		channel,
		feed,
		onDashboardNewSessionRequest,
		onSessionTitleChange,
		version
	]);
	(0, import_react.useEffect)(() => {
		refreshEffectiveModel();
	}, [refreshEffectiveModel, version]);
	const reconnect = (0, import_react.useCallback)(() => {
		setError(null);
		setModelNotice(null);
		setPendingReloadModel(null);
		setVersion((v) => v + 1);
	}, []);
	const modelName = runtimeModel || effectiveModel || info.model || "—";
	const modelLabel = modelName.split("/").slice(-1)[0] ?? "—";
	const credential = credentialWarning(info.credential_warning);
	const banner = error ?? credential?.message ?? null;
	const showReload = isEventsAuthRejectionMessage(error);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("flex h-full w-full min-w-0 shrink-0 flex-col gap-3 overflow-y-auto overflow-x-hidden pr-1", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex items-center justify-between gap-2 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-display text-xs tracking-wider text-text-tertiary",
						children: "model"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						ghost: true,
						size: "sm",
						onClick: () => setModelOpen(true),
						className: cn("max-w-full min-w-0 px-0 py-0", "self-start normal-case tracking-normal text-sm font-medium", "hover:underline disabled:no-underline"),
						title: modelName === "—" ? "switch model" : modelName,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex min-w-0 max-w-full items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: modelLabel
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5 shrink-0 text-text-secondary" })]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: STATE_TONE[state],
					className: "shrink-0",
					children: STATE_LABEL[state]
				})]
			}),
			supportsReasoning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "py-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReasoningPicker, {
					currentModel: modelName,
					profile,
					refreshKey: modelRefreshKey,
					onChanged: (effort) => setModelNotice(`Reasoning effort set to ${effort}. Run /new or refresh the page to apply it to this chat.`)
				})
			}),
			modelNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex items-start gap-2 border-warning/40 bg-warning/5 px-3 py-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "wrap-break-word min-w-0 flex-1 text-text-secondary",
					children: modelNotice
				})]
			}),
			banner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex items-start gap-2 border-destructive/40 bg-destructive/5 px-3 py-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "wrap-break-word text-destructive",
							children: banner
						}),
						error && showReload && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							outlined: true,
							className: "mt-1",
							onClick: () => window.location.reload(),
							prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}),
							children: "Reload page"
						}),
						error && !showReload && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							outlined: true,
							className: "mt-1",
							onClick: reconnect,
							prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}),
							children: "Reconnect side panel"
						}),
						!error && credential && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								outlined: true,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {}),
								onClick: () => navigate("/env"),
								children: "Add key"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								outlined: true,
								onClick: () => setModelOpen(true),
								children: "Switch model"
							})]
						})
					]
				})]
			}),
			modelOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelPickerDialog, {
				loader: () => api.getModelOptions(profile),
				alwaysGlobal: true,
				onApply: async ({ provider, model, confirmExpensiveModel }) => {
					setModelNotice(null);
					setPendingReloadModel(null);
					setSwitchNotice(null);
					const result = await api.setModelAssignment({
						confirm_expensive_model: confirmExpensiveModel,
						scope: "main",
						provider,
						model
					}, profile);
					if (!result.confirm_required) {
						refreshEffectiveModel();
						setSwitchNotice(result.notice ?? null);
						setPendingReloadModel(model.split("/").slice(-1)[0]);
					}
					return result;
				},
				onClose: () => {
					setModelOpen(false);
					refreshEffectiveModel();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelReloadConfirm, {
				model: pendingReloadModel,
				notice: switchNotice,
				onCancel: () => {
					const m = pendingReloadModel;
					setPendingReloadModel(null);
					setModelNotice(`Model set to ${m}. Run /new or refresh the page to apply it to this chat.` + (switchNotice ? ` ${switchNotice}` : ""));
				}
			})
		]
	});
}
//#endregion
//#region web/src/lib/chat-workspaces.ts
var import_compiler_runtime = require_compiler_runtime();
var STORAGE_PREFIX = "hermes-chat-workspace:";
function workspaceStorageKey(profile) {
	return `${STORAGE_PREFIX}${profile ?? ""}`;
}
function readStoredWorkspace(profile) {
	try {
		return localStorage.getItem(workspaceStorageKey(profile)) ?? "";
	} catch {
		return "";
	}
}
function writeStoredWorkspace(profile, cwd) {
	try {
		const key = workspaceStorageKey(profile);
		if (cwd) localStorage.setItem(key, cwd);
		else localStorage.removeItem(key);
	} catch {}
}
/** `~`-abbreviate a host path for compact display. */
function abbreviateHomePath(path, home) {
	const h = home.replace(/[\\/]+$/, "");
	if (!h) return path;
	if (path === h) return "~";
	const sep = path.startsWith(h + "/") ? "/" : path.startsWith(h + "\\") ? "\\" : null;
	return sep ? `~${sep}${path.slice(h.length + 1)}` : path;
}
/**
* Flatten the workspaces payload into picker rows: explicit project folders
* first (a multi-folder project contributes one row per folder), then
* discovered repos not already covered by a project folder, most recently
* active first. Deduped on the path.
*/
function workspaceOptions(data) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	const push = (value, label) => {
		if (!value || seen.has(value)) return;
		seen.add(value);
		out.push({
			value,
			label
		});
	};
	for (const project of data.projects) {
		if (project.archived) continue;
		const folders = project.folders.length ? project.folders : project.primary_path ? [{
			path: project.primary_path,
			label: null,
			is_primary: true
		}] : [];
		for (const folder of folders) {
			const suffix = folders.length > 1 ? ` · ${folder.label || abbreviateHomePath(folder.path, data.home)}` : "";
			push(folder.path, `${project.name}${suffix}`);
		}
	}
	const repos = [...data.repos].sort((a, b) => b.last_active - a.last_active);
	for (const repo of repos) push(repo.root, `${repo.label}  ${abbreviateHomePath(repo.root, data.home)}`);
	return out;
}
//#endregion
//#region web/src/components/ChatWorkspacePicker.tsx
/**
* ChatWorkspacePicker — choose which host directory a FRESH dashboard chat
* starts in.
*
* The dashboard is the "drive Hermes from a phone or any browser" surface,
* yet every new /chat used to spawn in the dashboard process's launch
* directory with no way to say "work in ~/code/foo". The Desktop sidebar
* already knows the user's projects and discovered repos; this exposes the
* same list here (GET /api/chat/workspaces) so a fresh chat can be aimed at
* one of them, or at a typed path. The choice is sent as `/api/pty?cwd=` and
* only affects fresh chats — a resumed session keeps its own workspace.
*
* The value is owned by ChatPage (persisted per profile) so the picker can be
* changed at any time and applies on the next "New chat".
*/
var CUSTOM_VALUE = "\0custom";
function ChatWorkspacePicker(t0) {
	const $ = (0, import_compiler_runtime.c)(69);
	const { profile, value, onChange, className } = t0;
	const { t } = useI18n();
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [customOpen, setCustomOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(value);
	const requestRef = (0, import_react.useRef)(0);
	let t1;
	if ($[0] !== profile) {
		t1 = (scan) => {
			const token = requestRef.current = requestRef.current + 1;
			api.getChatWorkspaces(profile, scan).then((res) => {
				if (token !== requestRef.current) return;
				setData(res);
			}).catch(_temp).finally(() => {
				if (token === requestRef.current) setLoading(false);
			});
		};
		$[0] = profile;
		$[1] = t1;
	} else t1 = $[1];
	const load = t1;
	let t2;
	if ($[2] !== load) {
		t2 = () => {
			setLoading(true);
			load(true);
		};
		$[2] = load;
		$[3] = t2;
	} else t2 = $[3];
	const rescan = t2;
	let t3;
	let t4;
	if ($[4] !== load) {
		t3 = () => {
			load(false);
		};
		t4 = [load];
		$[4] = load;
		$[5] = t3;
		$[6] = t4;
	} else {
		t3 = $[5];
		t4 = $[6];
	}
	(0, import_react.useEffect)(t3, t4);
	let t5;
	if ($[7] !== data) {
		t5 = data ? workspaceOptions(data) : [];
		$[7] = data;
		$[8] = t5;
	} else t5 = $[8];
	const options = t5;
	const home = data?.home ?? "";
	let t6;
	if ($[9] !== options || $[10] !== value) {
		t6 = !value || options.some((o) => o.value === value);
		$[9] = options;
		$[10] = value;
		$[11] = t6;
	} else t6 = $[11];
	const valueListed = t6;
	let t7;
	if ($[12] !== data || $[13] !== home || $[14] !== t.sessions.workspaceDefault) {
		t7 = data?.default_cwd ? `${t.sessions.workspaceDefault} · ${abbreviateHomePath(data.default_cwd, home)}` : t.sessions.workspaceDefault;
		$[12] = data;
		$[13] = home;
		$[14] = t.sessions.workspaceDefault;
		$[15] = t7;
	} else t7 = $[15];
	const defaultLabel = t7;
	let t8;
	if ($[16] !== onChange || $[17] !== value) {
		t8 = (next) => {
			if (next === CUSTOM_VALUE) {
				setDraft(value);
				setCustomOpen(true);
				return;
			}
			setCustomOpen(false);
			onChange(next);
		};
		$[16] = onChange;
		$[17] = value;
		$[18] = t8;
	} else t8 = $[18];
	const onSelect = t8;
	let t9;
	if ($[19] !== draft || $[20] !== onChange || $[21] !== value) {
		t9 = () => {
			const trimmed = draft.trim();
			setCustomOpen(false);
			if (trimmed !== value) onChange(trimmed);
		};
		$[19] = draft;
		$[20] = onChange;
		$[21] = value;
		$[22] = t9;
	} else t9 = $[22];
	const commitDraft = t9;
	let t10;
	if ($[23] !== className) {
		t10 = cn("flex flex-col gap-1.5 px-2 pb-2", className);
		$[23] = className;
		$[24] = t10;
	} else t10 = $[24];
	let t11;
	if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderGit2, { className: "h-3.5 w-3.5" });
		$[25] = t11;
	} else t11 = $[25];
	let t12;
	if ($[26] !== t.sessions.workspace) {
		t12 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-text-tertiary",
			children: [t11, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-display tracking-wider",
				children: t.sessions.workspace
			})]
		});
		$[26] = t.sessions.workspace;
		$[27] = t12;
	} else t12 = $[27];
	const t13 = t.sessions.workspaceRescan;
	const t14 = t.sessions.workspaceRescan;
	const t15 = loading && "animate-spin";
	let t16;
	if ($[28] !== t15) {
		t16 = cn(t15);
		$[28] = t15;
		$[29] = t16;
	} else t16 = $[29];
	let t17;
	if ($[30] !== t16) {
		t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: t16 });
		$[30] = t16;
		$[31] = t17;
	} else t17 = $[31];
	let t18;
	if ($[32] !== loading || $[33] !== rescan || $[34] !== t.sessions.workspaceRescan || $[35] !== t17) {
		t18 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			size: "icon",
			onClick: rescan,
			disabled: loading,
			"aria-label": t13,
			title: t14,
			className: "ml-auto text-text-secondary hover:text-foreground",
			children: t17
		});
		$[32] = loading;
		$[33] = rescan;
		$[34] = t.sessions.workspaceRescan;
		$[35] = t17;
		$[36] = t18;
	} else t18 = $[36];
	let t19;
	if ($[37] !== t12 || $[38] !== t18) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-xs",
			children: [t12, t18]
		});
		$[37] = t12;
		$[38] = t18;
		$[39] = t19;
	} else t19 = $[39];
	const t20 = customOpen ? CUSTOM_VALUE : value;
	const t21 = t.sessions.workspace;
	let t22;
	if ($[40] !== defaultLabel) {
		t22 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
			value: "",
			children: defaultLabel
		});
		$[40] = defaultLabel;
		$[41] = t22;
	} else t22 = $[41];
	let t23;
	if ($[42] !== options) {
		t23 = options.map(_temp2);
		$[42] = options;
		$[43] = t23;
	} else t23 = $[43];
	let t24;
	if ($[44] !== customOpen || $[45] !== home || $[46] !== value || $[47] !== valueListed) {
		t24 = !valueListed && !customOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
			value,
			children: abbreviateHomePath(value, home)
		});
		$[44] = customOpen;
		$[45] = home;
		$[46] = value;
		$[47] = valueListed;
		$[48] = t24;
	} else t24 = $[48];
	let t25;
	if ($[49] !== t.sessions.workspaceCustom) {
		t25 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
			value: CUSTOM_VALUE,
			children: t.sessions.workspaceCustom
		});
		$[49] = t.sessions.workspaceCustom;
		$[50] = t25;
	} else t25 = $[50];
	let t26;
	if ($[51] !== onSelect || $[52] !== t.sessions.workspace || $[53] !== t20 || $[54] !== t22 || $[55] !== t23 || $[56] !== t24 || $[57] !== t25) {
		t26 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			className: "min-w-0",
			onValueChange: onSelect,
			value: t20,
			"aria-label": t21,
			children: [
				t22,
				t23,
				t24,
				t25
			]
		});
		$[51] = onSelect;
		$[52] = t.sessions.workspace;
		$[53] = t20;
		$[54] = t22;
		$[55] = t23;
		$[56] = t24;
		$[57] = t25;
		$[58] = t26;
	} else t26 = $[58];
	let t27;
	if ($[59] !== commitDraft || $[60] !== customOpen || $[61] !== draft || $[62] !== home) {
		t27 = customOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			autoFocus: true,
			value: draft,
			placeholder: home ? `${home}/…` : "/path/to/project",
			onChange: (e) => setDraft(e.target.value),
			onBlur: commitDraft,
			onKeyDown: (e_0) => {
				if (e_0.key === "Enter") commitDraft();
				if (e_0.key === "Escape") setCustomOpen(false);
			},
			className: "h-8 text-xs"
		});
		$[59] = commitDraft;
		$[60] = customOpen;
		$[61] = draft;
		$[62] = home;
		$[63] = t27;
	} else t27 = $[63];
	let t28;
	if ($[64] !== t10 || $[65] !== t19 || $[66] !== t26 || $[67] !== t27) {
		t28 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t10,
			children: [
				t19,
				t26,
				t27
			]
		});
		$[64] = t10;
		$[65] = t19;
		$[66] = t26;
		$[67] = t27;
		$[68] = t28;
	} else t28 = $[68];
	return t28;
}
function _temp2(opt) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
		value: opt.value,
		children: opt.label
	}, opt.value);
}
function _temp() {}
//#endregion
//#region web/src/components/ChatSessionList.tsx
/**
* ChatSessionList — a ChatGPT-style conversation switcher that sits beside
* the embedded TUI on the dashboard Chat tab.
*
* It lists the most recent sessions for the active management profile and
* lets the user swap between them without leaving the Chat page. Selecting
* a row sets `/chat?resume=<id>`; ChatPage treats the resume target as part
* of the PTY identity, so the change tears down the current terminal child
* and respawns it resuming that conversation (see ChatPage.tsx). The
* "New session" action clears the resume param, which spawns a fresh PTY.
*
* Best-effort, like ChatSidebar: a failed fetch surfaces a small inline
* error with a retry affordance and the terminal pane keeps working.
*
* This is a navigation surface, NOT a session-management one — delete,
* rename, export, and bulk actions live on the Sessions page. Keeping this
* panel read-only (plus select / new) avoids duplicating that machinery and
* keeps the chat context focused on switching conversations quickly.
*/
var SESSION_LIMIT = 30;
var SESSION_REFRESH_MS = 2e4;
function rowLabel(session, untitled) {
	const title = session.title?.trim();
	if (title && title !== "Untitled") return title;
	const preview = session.preview?.trim();
	if (preview) return preview;
	return untitled;
}
function ChatSessionList({ activeSessionId, isActive = true, profile, className, onPicked, onNewChat, workspaceCwd, onWorkspaceChange }) {
	const { t } = useI18n();
	const [, setSearchParams] = useSearchParams();
	const [sessions, setSessions] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [reloadNonce, setReloadNonce] = (0, import_react.useState)(0);
	const scopeKey = profile ?? "";
	const reqRef = (0, import_react.useRef)(0);
	const load = (0, import_react.useCallback)(() => {
		const myReq = ++reqRef.current;
		setLoading(true);
		setError(null);
		api.getSessions(SESSION_LIMIT, 0, scopeKey, "recent").then((res) => {
			if (reqRef.current !== myReq) return;
			setSessions(res.sessions);
		}).catch((e) => {
			if (reqRef.current !== myReq) return;
			setError(e.message || "failed to load sessions");
		}).finally(() => {
			if (reqRef.current === myReq) setLoading(false);
		});
	}, [scopeKey]);
	const reload = (0, import_react.useCallback)(() => setReloadNonce((n) => n + 1), []);
	(0, import_react.useEffect)(() => {
		if (!isActive) return;
		load();
	}, [
		isActive,
		load,
		reloadNonce
	]);
	(0, import_react.useEffect)(() => {
		if (!isActive) return;
		const interval = window.setInterval(reload, SESSION_REFRESH_MS);
		const onVisibilityChange = () => {
			if (document.visibilityState === "visible") reload();
		};
		document.addEventListener("visibilitychange", onVisibilityChange);
		return () => {
			window.clearInterval(interval);
			document.removeEventListener("visibilitychange", onVisibilityChange);
		};
	}, [isActive, reload]);
	const pick = (0, import_react.useCallback)((id) => {
		onPicked?.();
		if (id === activeSessionId) return;
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			next.set("resume", id);
			return next;
		}, { replace: false });
	}, [
		activeSessionId,
		onPicked,
		setSearchParams
	]);
	const startNew = (0, import_react.useCallback)(() => {
		onPicked?.();
		if (onNewChat) {
			onNewChat();
			return;
		}
		setSearchParams((prev_0) => {
			const next_0 = new URLSearchParams(prev_0);
			next_0.delete("resume");
			return next_0;
		}, { replace: false });
	}, [
		onNewChat,
		onPicked,
		setSearchParams
	]);
	const content = (0, import_react.useMemo)(() => {
		if (loading && sessions === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-center gap-2 px-2 py-6 text-xs text-text-secondary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}),
				" ",
				t.common.loading
			]
		});
		if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-start gap-2 px-2 py-4 text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2 text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wrap-break-word",
					children: error
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				outlined: true,
				onClick: reload,
				prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}),
				children: t.common.retry
			})]
		});
		if (!sessions || sessions.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-2 py-6 text-center text-xs text-text-secondary",
			children: t.sessions.noSessions
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-0.5",
			children: sessions.map((s) => {
				const isActive_0 = s.id === activeSessionId;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
					onClick: () => pick(s.id),
					"aria-current": isActive_0 ? "true" : void 0,
					className: cn("flex-col items-start gap-0.5 rounded px-2 py-1.5", "normal-case tracking-normal", isActive_0 ? "bg-primary/10 text-foreground border-l-2 border-primary" : "text-text-secondary hover:bg-midground/5 hover:text-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-full truncate text-sm font-medium",
						children: rowLabel(s, t.sessions.untitledSession)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex w-full items-center gap-1.5 text-[0.6875rem] text-text-tertiary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: timeAgo(s.last_active) }),
							s.message_count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: "·"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [s.message_count, " msgs"] })] }),
							s.source && s.source !== "cli" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: "·"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: s.source
							})] })
						]
					})]
				}, s.id);
			})
		});
	}, [
		activeSessionId,
		error,
		loading,
		pick,
		reload,
		sessions,
		t
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("flex h-full w-full min-w-0 shrink-0 flex-col overflow-hidden", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 px-2 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-display text-xs tracking-wider text-text-tertiary",
					children: t.sessions.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ghost: true,
					size: "icon",
					onClick: reload,
					"aria-label": t.common.refresh,
					title: t.common.refresh,
					className: "text-text-secondary hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn(loading && "animate-spin") })
				})]
			}),
			onWorkspaceChange && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatWorkspacePicker, {
				profile,
				value: workspaceCwd ?? "",
				onChange: onWorkspaceChange
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				outlined: true,
				size: "sm",
				onClick: startNew,
				prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquarePlus, {}),
				className: "mx-2 mb-2 justify-center",
				children: t.sessions.newChat
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-1 pb-1",
				children: content
			})
		]
	});
}
//#endregion
//#region web/src/lib/chat-panel-collapsed.ts
/**
* Collapse state for the desktop chat side panel (model + sessions),
* persisted in localStorage so the choice survives reloads.
*
* Pure helpers so ChatPage stays under its FILE_LINES cap and the
* persistence stays testable without React.
*/
var CHAT_PANEL_COLLAPSED_KEY = "hermes-chat-panel-collapsed";
/** The panel's collapsed flag remembered from the previous visit. */
function readChatPanelCollapsed() {
	return localStorage.getItem(CHAT_PANEL_COLLAPSED_KEY) === "1";
}
/** Flip the collapsed flag and persist the new choice. */
function toggleChatPanelCollapsed(previous) {
	const next = !previous;
	localStorage.setItem(CHAT_PANEL_COLLAPSED_KEY, next ? "1" : "0");
	return next;
}
//#endregion
//#region web/src/lib/pty-composition.ts
/**
* Delays an IME/dead-key commit just long enough for xterm to emit onData.
*
* xterm is authoritative when it emits onData. Browsers/layouts where it
* does not emit onData still forward the compositionend text on the next turn.
*
* Mobile IME keyboards (Android/Gboard) turn composition events and onData
* into overlapping sources of the same user intent instead of exclusive
* ones: compositionend can fire twice with identical data, it can trail
* onData that already carried the committed text, and onData can echo a
* word the composition path just forwarded. The forwarder keeps a short
* record of both delivery channels and drops these re-sends.
*/
var ECHO_WINDOW_MS = 80;
function createPtyCompositionForwarder(send) {
	let pending = null;
	let timer = null;
	let matchedTerminalPrefix = "";
	let sawUnrelatedTerminalData = false;
	let lastSent = null;
	let lastTerminalData = null;
	const clearPending = () => {
		pending = null;
		matchedTerminalPrefix = "";
		sawUnrelatedTerminalData = false;
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	};
	const sendCommitted = (data) => {
		lastSent = {
			text: data,
			at: Date.now()
		};
		send(data);
	};
	const withinEchoWindow = (entry) => entry !== null && Date.now() - entry.at <= ECHO_WINDOW_MS;
	return {
		onCompositionEnd(data) {
			if (!data) return;
			if (withinEchoWindow(lastTerminalData) && lastTerminalData.text.endsWith(data)) return;
			if (withinEchoWindow(lastSent) && lastSent.text === data) return;
			const previous = pending;
			clearPending();
			if (previous) sendCommitted(previous);
			pending = data;
			timer = setTimeout(() => {
				const committed = pending;
				clearPending();
				if (committed) sendCommitted(committed);
			}, 16);
		},
		noteTerminalData(data) {
			if (!data.startsWith("\x1B")) {
				const now = Date.now();
				lastTerminalData = {
					text: ((withinEchoWindow(lastTerminalData) ? lastTerminalData.text : "") + data).slice(-256),
					at: now
				};
			}
			if (!pending || data.startsWith("\x1B") || sawUnrelatedTerminalData) return;
			const observed = matchedTerminalPrefix + data;
			if (observed.startsWith(pending)) clearPending();
			else if (pending.startsWith(observed)) matchedTerminalPrefix = observed;
			else sawUnrelatedTerminalData = true;
		},
		filterTerminalData(data) {
			if (!withinEchoWindow(lastSent)) return data;
			if (data === lastSent.text) return "";
			if (data.length > lastSent.text.length && data.startsWith(lastSent.text)) return data.slice(lastSent.text.length);
			return data;
		},
		dispose: () => {
			clearPending();
			lastSent = null;
			lastTerminalData = null;
		}
	};
}
//#endregion
//#region web/src/lib/pty-focus.ts
function shouldRestoreTerminalFocus(active, host) {
	if (active === null || active === document.body || host === null) return true;
	return host.contains(active);
}
//#endregion
//#region web/src/lib/pty-resume-sanitizer.ts
/**
* PTY resume output sanitizer — strips pathological ANSI sequences that
* Ink's two-pass virtual scroll emits during session resume.
*
* Three properties of the real pipeline drive this design:
*
* 1. **The PTY is in cooked mode (ONLCR).** `hermes_cli/pty_bridge.py` spawns
*    via `ptyprocess.PtyProcess.spawn()` and never calls `setraw()`, so the
*    line discipline rewrites every LF the child writes as CRLF. A burst
*    therefore arrives as `\r\n\r\n\r\n…`, never as bare `\n\n\n…`, and any
*    filter matching `\n{50,}` would never fire in production.
*
* 2. **Reads are chunked, not message-framed.** `bridge.read()` does
*    `os.read(fd, 65536)` per drain tick and `pty_session.py` forwards each
*    read as its own binary WebSocket frame. A CSI escape, a UTF-8 code
*    point, *and* a long blank-line run can each straddle a frame boundary,
*    so all three need trailing-state buffering to survive reassembly.
*
* 3. **Erase codes are only pathological during the resume replay.** Once the
*    replay has settled, `ESC[K` / `ESC[X` are exactly how a TUI clears stale
*    glyphs for spinners, progress bars, and status lines. Stripping them
*    forever corrupts normal interactive output, so suppression is bounded to
*    a short window after connect (see PTY_RESUME_SANITIZE_WINDOW_MS).
*/
/** A blank-line run: CRLF (real PTY, cooked mode) or bare LF (raw-mode PTY). */
var BLANK_LINE_BURST = /(?:\r?\n){50,}/g;
var ERASE_LINE = /\x1b\[\d*K/g;
var ERASE_CHAR = /\x1b\[\d*X/g;
/** Still-incomplete trailing escape: "\x1b", "\x1b[", "\x1b[\d*". */
var PARTIAL_ESC = /^\x1b(?:\[\d*)?$/;
/**
* A trailing run of newlines that may continue into the next frame. Held back
* so a burst split across frames still meets the collapse threshold instead of
* slipping through as sub-threshold fragments. A lone trailing `\r` is
* included: a frame boundary can fall between the CR and LF of a CRLF pair,
* and emitting the CR early would break one run into two shorter ones.
*
* Always matches (possibly empty, at end of input).
*/
var TRAILING_NEWLINES = /(?:\r?\n)*\r?$/;
/** Collapsed form of a pathological burst: one blank row, CRLF for xterm. */
var COLLAPSED_BURST = "\r\n\r\n";
/**
* Apply all suppression rules to a safely-completed string.
*
* @param stripErase When false, `ESC[K` / `ESC[X` are preserved. Blank-line
*   burst collapsing still applies — a thousand-row burst is pathological
*   whenever it appears, but erase codes are legitimate once resume settles.
* Exported for focused unit-testing of filter behaviour.
*/
function applyPtyFilters(input, stripErase = true) {
	const collapsed = input.replace(BLANK_LINE_BURST, COLLAPSED_BURST);
	if (!stripErase) return collapsed;
	return collapsed.replace(ERASE_LINE, "").replace(ERASE_CHAR, "");
}
/** Stateful chunk processor that guards against cross-frame split sequences. */
var PtyResumeSanitizer = class {
	#pending = "";
	#stripErase = true;
	/**
	* Stop stripping erase codes while continuing to collapse blank-line bursts.
	* Called when the resume-replay window closes so that ordinary interactive
	* redraws (spinners, progress bars, status lines) keep their `ESC[K`.
	*/
	endEraseSuppression() {
		this.#stripErase = false;
	}
	/** True while erase-code stripping is still active. */
	get isSuppressingErase() {
		return this.#stripErase;
	}
	/** Feed one decoded WebSocket frame payload. Returns the sanitized output. */
	next(chunk) {
		const combined = this.#pending + chunk;
		if (combined === "") {
			this.#pending = "";
			return "";
		}
		const lastEsc = combined.lastIndexOf("\x1B");
		if (lastEsc !== -1 && PARTIAL_ESC.test(combined.slice(lastEsc))) {
			this.#pending = combined.slice(lastEsc);
			return applyPtyFilters(combined.slice(0, lastEsc), this.#stripErase);
		}
		const trailing = TRAILING_NEWLINES.exec(combined);
		if (trailing.index === 0) {
			this.#pending = combined;
			return "";
		}
		this.#pending = trailing[0];
		return applyPtyFilters(combined.slice(0, trailing.index), this.#stripErase);
	}
	/**
	* Drain buffered state at end of stream.
	*
	* A buffered *partial escape* is dropped rather than written: `#pending` only
	* ever holds an incomplete sequence, and emitting one would leave xterm's
	* parser in an "in-escape" state that swallows subsequent output after
	* reconnect. A buffered *newline run* is safe and is emitted (collapsed).
	*/
	flush() {
		const last = this.#pending;
		this.#pending = "";
		if (last === "" || last.includes("\x1B")) return "";
		return applyPtyFilters(last, this.#stripErase);
	}
};
//#endregion
//#region web/src/lib/pty-reconnect.ts
var PTY_RECONNECT_INPUT_MESSAGE = "Chat is reconnecting. Input will resume when connected.";
var PTY_CONNECTING_TIMEOUT_MS = 8e3;
var PTY_TICKET_TIMEOUT_MS = 8e3;
var PTY_RECONNECT_MAX_MS = 3e3;
var PTY_KEEPALIVE_INTERVAL_MS = 2e4;
/** Delay before PTY reconnect `attempt` (1-based: ChatPage bumps its counter before scheduling). */
function ptyReconnectDelayMs(attempt) {
	return reconnectBackoffDelayMs(attempt - 1, {
		baseDelayMs: 250,
		capMs: PTY_RECONNECT_MAX_MS,
		jitter: false
	});
}
var PTY_RESUME_SANITIZE_WINDOW_MS = 3e4;
var WS_CONNECTING = 0;
var WS_OPEN$1 = 1;
var WS_CLOSING = 2;
var WS_CLOSED = 3;
function shouldReconnectPtyOnPageResume({ isActive, visibilityState, online, socketReadyState, ptyState, connectInFlight, reconnectGaveUp }) {
	if (!isActive || !online || visibilityState === "hidden") return false;
	if (reconnectGaveUp) return false;
	if (ptyState === "ended") return false;
	if (socketReadyState === WS_OPEN$1) return false;
	if ((connectInFlight || socketReadyState === WS_CONNECTING) && ptyState !== "reconnecting" && ptyState !== "closed") return false;
	return socketReadyState === null || socketReadyState === void 0 || socketReadyState === WS_CLOSING || socketReadyState === WS_CLOSED || ptyState === "reconnecting" || ptyState === "closed";
}
function shouldBlockPtyInput(ptyState) {
	return ptyState !== "open";
}
//#endregion
//#region web/src/lib/pty-resume-loading.ts
/**
* Hard cap so a wedged resume (never gets PTY payload) cannot leave the
* wait notice up forever.
*/
var PTY_RESUME_LOADING_MAX_MS = 3e4;
/**
* Show a wait notice only while a resumed chat is still blank. Once the
* first real PTY payload arrives the terminal has something to show, so
* the notice hides and history can stream in underneath.
*
* Reconnect / ended / closed states keep their own overlays and must not
* stack this one on top.
*/
function shouldShowResumeLoadingOverlay({ hasResumeTarget, ptyState, hydrating }) {
	if (!hasResumeTarget || !hydrating) return false;
	if (ptyState === "reconnecting" || ptyState === "closed" || ptyState === "ended") return false;
	return ptyState === "connecting" || ptyState === "open";
}
/** First non-empty PTY chunk means the blank window is over. */
function shouldFinishResumeHydrationOnChunk(chunkText) {
	return chunkText.length > 0;
}
//#endregion
//#region web/src/lib/pty-mobile-input.ts
var DELETE = "";
function chars(text) {
	return Array.from(text);
}
function removeLastChar(text) {
	const c = chars(text);
	c.pop();
	return c.join("");
}
function isPlainText(data) {
	return !/[\x00-\x1f\x7f]/.test(data);
}
function lastWordMatch(line) {
	return line.match(/^(.*?)(\S+)(\s*)$/u);
}
function collapseDuplicatedFinalWord(text, previousLine) {
	const match = text.match(/^(.*?)(\S+)(\s+)(\S+)(\s*)$/u);
	if (!match) return text;
	const [, prefix, first, , second, trailing] = match;
	if (first.toLocaleLowerCase() !== second.toLocaleLowerCase()) return text;
	if (first.length < 2) return text;
	if (!previousLine.trimEnd().toLocaleLowerCase().endsWith(first.toLocaleLowerCase())) return text;
	return `${prefix}${first}${trailing}`;
}
function replacementLineForMobileInput(currentLine, incoming) {
	if (!currentLine || currentLine.length < 2 || !incoming) return null;
	const currentLower = currentLine.toLocaleLowerCase();
	if (incoming.toLocaleLowerCase().startsWith(currentLower)) return collapseDuplicatedFinalWord(incoming, currentLine);
	const word = lastWordMatch(currentLine);
	if (!word) return null;
	const [, prefix, last, trailing] = word;
	if (trailing) return null;
	const incomingFirst = incoming.trimStart().split(/\s+/u)[0] ?? "";
	if (incomingFirst && incomingFirst.toLocaleLowerCase() === last.toLocaleLowerCase()) return `${prefix}${collapseDuplicatedFinalWord(incoming, currentLine)}`;
	return null;
}
function shouldTreatInputAsMobileReplacement(inputType, data, isMobileLike) {
	if (inputType === "insertReplacementText" || inputType === "insertFromComposition" || inputType === "insertCompositionText") return true;
	return isMobileLike && inputType === "insertText" && (data?.length ?? 0) > 1;
}
function updatePtyInputLine(currentLine, data) {
	if (data.includes("\x1B")) return "";
	let next = currentLine;
	for (const ch of chars(data)) if (ch === "\r" || ch === "\n") next = "";
	else if (ch === DELETE || ch === "\b") next = removeLastChar(next);
	else if (ch === "") next = "";
	else if (isPlainText(ch)) next += ch;
	return next;
}
function normalizePtyMobileInput(data, currentLine, replacementActive) {
	if (replacementActive && isPlainText(data)) {
		const replacementLine = replacementLineForMobileInput(currentLine, data);
		if (replacementLine !== null) return {
			data: DELETE.repeat(chars(currentLine).length) + replacementLine,
			nextLine: replacementLine,
			normalized: true
		};
	}
	return {
		data,
		nextLine: updatePtyInputLine(currentLine, data),
		normalized: false
	};
}
/**
* Height (px) of the layout viewport currently obscured by the soft
* keyboard, or 0 when no keyboard is showing / the signal is unusable.
*/
function computeKeyboardInset(viewport, layoutHeightPx) {
	if (!viewport || !Number.isFinite(layoutHeightPx) || layoutHeightPx <= 0) return 0;
	const { height, offsetTop } = viewport;
	if (!Number.isFinite(height) || !Number.isFinite(offsetTop)) return 0;
	const inset = Math.round(layoutHeightPx - height - offsetTop);
	return inset >= 80 ? inset : 0;
}
/** Pixels to `window.scrollBy` so the composer (xterm host bottom) sits on
* the visible bottom of the visual viewport — just above the keyboard.
* Pinning the page to (0, 0) fights iOS and can leave the input line off-screen. */
function keyboardRevealScrollDelta(composerBottomPx, visual) {
	if (!Number.isFinite(composerBottomPx) || !Number.isFinite(visual.height) || !Number.isFinite(visual.offsetTop)) return 0;
	return Math.round(composerBottomPx - (visual.offsetTop + visual.height));
}
//#endregion
//#region web/src/lib/pty-keyboard-shortcuts.ts
var WS_OPEN = 1;
function resolvePtyKeyboardShortcut(ev, isMac, hasTerminalSelection) {
	const key = ev.key.toLowerCase();
	if ((isMac ? ev.metaKey && !ev.ctrlKey : ev.ctrlKey && !ev.altKey && !ev.metaKey) && key === "c" && hasTerminalSelection) return "copy";
	if (ev.ctrlKey && !ev.shiftKey && !ev.altKey && !ev.metaKey && ev.key === "Backspace") return "delete-word-backward";
	if (ev.ctrlKey && !ev.shiftKey && !ev.altKey && !ev.metaKey && ev.key === "Delete") return "delete-word-forward";
	return "pass";
}
function sendPtyShortcutSequence(ws, ptyState, sequence) {
	if (!ws || ws.readyState !== WS_OPEN || shouldBlockPtyInput(ptyState)) return false;
	ws.send(sequence);
	return true;
}
//#endregion
//#region web/src/lib/pty-scroll.ts
/**
* True when the viewport is scrolled to (or past) the bottom, i.e. the latest
* output is on screen. xterm reports `viewportY === baseY` at the bottom; the
* `>=` also covers the transient overshoot while scrollback rows are trimmed.
*/
function isViewportPinnedToBottom(buffer) {
	return buffer.viewportY >= buffer.baseY;
}
/**
* Whether a freshly written PTY output chunk should scroll the terminal to the
* bottom afterwards. We only auto-follow while resuming a session (the replay
* case) and only while the user hasn't scrolled up to read the backlog. A fresh
* (non-resume) session returns `false` so normal cursor output is never fought.
*/
function shouldFollowPtyOutput(resumeParam, stickToBottom) {
	return Boolean(resumeParam) && stickToBottom;
}
/**
* When `pty_ws` falls back to the per-channel active-session file (no
* `?resume=` on the URL), the server sends a one-off JSON text frame naming
* the session it resolved before any PTY replay bytes arrive, since the
* frontend has no other way to learn a replay is happening (#93518). PTY
* output itself always arrives as binary frames, so any text frame is a
* candidate; this returns the resume id on a match and `null` for anything
* else (including the plain ANSI error banners `pty_ws` still sends as text
* on failure, which must keep rendering into the terminal as before).
*/
function parseResumeControlMessage(data) {
	try {
		const parsed = JSON.parse(data);
		if (parsed && typeof parsed === "object" && parsed.type === "resume" && typeof parsed.id === "string" && parsed.id) return parsed.id;
	} catch {}
	return null;
}
//#endregion
//#region web/src/lib/terminal-touch-scroll.ts
var TOUCH_SCROLL_PX_PER_LINE = 18;
var TOUCH_SCROLL_MIN_PX = 2;
var CAPTURE = { capture: true };
var PASSIVE_CAPTURE = {
	capture: true,
	passive: true
};
var ACTIVE_CAPTURE = {
	capture: true,
	passive: false
};
function firstTouchY(ev) {
	const touch = ev.touches[0] ?? ev.changedTouches[0];
	return touch ? touch.clientY : null;
}
function canScrollTerminal(term, amount) {
	const { baseY, viewportY } = term.buffer.active;
	if (amount < 0) return viewportY > 0;
	if (amount > 0) return viewportY < baseY;
	return false;
}
/**
* Add touch-drag scrollback support for dashboard xterm panes.
*
* xterm.js handles wheel/trackpad scrollback for the embedded TUI, but iPadOS
* WebKit does not translate a finger drag inside the terminal into wheel events
* or native scrollbar dragging. Mirror the wheel path by converting vertical
* touch movement into `scrollLines()` while there is xterm scrollback available;
* at the top/bottom boundary we leave the event alone so the outer dashboard
* page can still move above the software keyboard.
*/
function installTerminalTouchScroll(host, term) {
	let lastY = null;
	let residualPx = 0;
	const reset = () => {
		lastY = null;
		residualPx = 0;
	};
	const onTouchStart = (ev) => {
		if (ev.touches.length !== 1) {
			reset();
			return;
		}
		lastY = firstTouchY(ev);
		residualPx = 0;
	};
	const onTouchMove = (ev) => {
		if (ev.touches.length !== 1 || lastY === null) {
			reset();
			return;
		}
		const nextY = firstTouchY(ev);
		if (nextY === null) {
			reset();
			return;
		}
		const deltaPx = lastY - nextY;
		lastY = nextY;
		if (Math.abs(deltaPx) < TOUCH_SCROLL_MIN_PX) return;
		residualPx += deltaPx;
		const lines = residualPx / TOUCH_SCROLL_PX_PER_LINE;
		const wholeLines = lines < 0 ? Math.ceil(lines) : Math.floor(lines);
		if (wholeLines === 0) return;
		if (!canScrollTerminal(term, wholeLines)) return;
		residualPx -= wholeLines * TOUCH_SCROLL_PX_PER_LINE;
		term.scrollLines(wholeLines);
		ev.preventDefault();
		ev.stopPropagation();
	};
	host.addEventListener("touchstart", onTouchStart, PASSIVE_CAPTURE);
	host.addEventListener("touchmove", onTouchMove, ACTIVE_CAPTURE);
	host.addEventListener("touchcancel", reset, CAPTURE);
	host.addEventListener("touchend", reset, CAPTURE);
	return () => {
		host.removeEventListener("touchstart", onTouchStart, PASSIVE_CAPTURE);
		host.removeEventListener("touchmove", onTouchMove, ACTIVE_CAPTURE);
		host.removeEventListener("touchcancel", reset, CAPTURE);
		host.removeEventListener("touchend", reset, CAPTURE);
	};
}
//#endregion
//#region web/src/lib/chatImagePaste.ts
var IMAGE_MIME_EXT = {
	"image/png": "png",
	"image/jpeg": "jpg",
	"image/gif": "gif",
	"image/webp": "webp",
	"image/bmp": "bmp"
};
var MAX_IMAGE_BYTES = 26214400;
function imageFileKey(file) {
	return `${file.name}\0${file.type}\0${file.size}\0${file.lastModified}`;
}
function addImageFile(files, seen, file) {
	if (!file || !file.type.startsWith("image/")) return;
	const key = imageFileKey(file);
	if (seen.has(key)) return;
	seen.add(key);
	files.push(file);
}
/** Pull every image file out of a DataTransfer (clipboard or drop). */
function imageFilesFromTransfer(data) {
	if (!data) return [];
	const files = [];
	const seen = /* @__PURE__ */ new Set();
	if (data.items?.length) for (let i = 0; i < data.items.length; i++) {
		const item = data.items[i];
		if (item.kind === "file" && item.type.startsWith("image/")) addImageFile(files, seen, item.getAsFile());
	}
	if (data.files?.length) for (let i = 0; i < data.files.length; i++) addImageFile(files, seen, data.files[i]);
	return files;
}
/** True when a drag payload may contain an image (for dragover preventDefault). */
function transferMayContainImage(data) {
	if (!data) return false;
	if (data.items?.length) {
		for (let i = 0; i < data.items.length; i++) {
			const item = data.items[i];
			if (item.kind === "file" && (!item.type || item.type.startsWith("image/"))) return true;
		}
		return false;
	}
	if (data.files?.length) {
		for (let i = 0; i < data.files.length; i++) if (data.files[i].type.startsWith("image/")) return true;
	}
	return false;
}
function fileToDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(reader.error ?? /* @__PURE__ */ new Error("image read failed"));
		reader.onload = () => {
			const result = reader.result;
			if (typeof result === "string") resolve(result);
			else reject(/* @__PURE__ */ new Error("image read failed"));
		};
		reader.readAsDataURL(file);
	});
}
/**
* Upload a browser clipboard/drop image to ``HERMES_HOME/images`` via the
* dedicated chat upload endpoint and return the absolute gateway path.
*
* The dashboard Chat tab is an xterm mirror of a TUI running INSIDE the
* gateway. The container has no access to the browser's clipboard, so the
* server-side ``clipboard.paste`` path can never see a pasted image.
* Upload the bytes the browser already holds, then hand the path to the
* TUI's ``/image`` command.
*/
async function uploadChatImage(blob, profile = "") {
	if (blob.size === 0) throw new Error("clipboard image is empty");
	if (blob.size > MAX_IMAGE_BYTES) throw new Error(`image too large (max ${Math.round(MAX_IMAGE_BYTES / 1048576)} MB)`);
	const mime = blob.type || "image/png";
	const ext = IMAGE_MIME_EXT[mime] || "png";
	const filename = blob instanceof File && blob.name ? blob.name : `clipboard.${ext}`;
	const dataUrl = await fileToDataUrl(blob instanceof File ? blob : new File([blob], filename, { type: mime }));
	const qs = profile ? `?profile=${encodeURIComponent(profile)}` : "";
	const res = await authedFetch(`/api/chat/image-upload${qs}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			data_url: dataUrl,
			filename
		})
	});
	if (!res.ok) {
		const text = await res.text().catch(() => res.statusText);
		throw new Error(text || `HTTP ${res.status}`);
	}
	const uploaded = await res.json();
	if (!uploaded?.path) throw new Error("image upload did not return a path");
	return uploaded;
}
//#endregion
//#region web/src/lib/chat-image-drop.ts
/**
* Browser clipboard/drag-and-drop image wiring for the chat host element.
*
* paste / dragover / drop listeners (capture phase) that pull image files out
* of the transfer data and hand them to the caller's upload+attach pipeline.
* `attachChatImageDropListeners` returns a detach function for effect cleanup.
*
* Plain-text pastes go through `pasteText` (#52471): xterm's own paste listener
* clears the hidden textarea, but the browser's default insert runs AFTER event
* dispatch, so the stale value survives and the next typed character gets
* duplicated ("when" → "whenn"). Cancelling the native paste and delivering the
* text through `term.paste()` exactly once is the same route the Ctrl/Cmd+V
* keydown interception uses.
*/
function attachChatImageDropListeners(host, uploadAndAttachImages, pasteText) {
	const handleBrowserPaste = (ev) => {
		const files = imageFilesFromTransfer(ev.clipboardData);
		if (files.length) {
			ev.preventDefault();
			ev.stopPropagation();
			uploadAndAttachImages(files);
			return;
		}
		const text = ev.clipboardData?.getData("text/plain");
		if (text) {
			ev.preventDefault();
			ev.stopPropagation();
			pasteText(text);
		}
	};
	const handleBrowserDragOver = (ev) => {
		if (!transferMayContainImage(ev.dataTransfer)) return;
		ev.preventDefault();
		if (ev.dataTransfer) ev.dataTransfer.dropEffect = "copy";
	};
	const handleBrowserDrop = (ev) => {
		const files = imageFilesFromTransfer(ev.dataTransfer);
		if (!files.length) return;
		ev.preventDefault();
		ev.stopPropagation();
		uploadAndAttachImages(files);
	};
	host.addEventListener("paste", handleBrowserPaste, { capture: true });
	host.addEventListener("dragover", handleBrowserDragOver, { capture: true });
	host.addEventListener("drop", handleBrowserDrop, { capture: true });
	return () => {
		host.removeEventListener("paste", handleBrowserPaste, true);
		host.removeEventListener("dragover", handleBrowserDragOver, true);
		host.removeEventListener("drop", handleBrowserDrop, true);
	};
}
//#endregion
//#region web/src/lib/pty-close-copy.ts
/** Chat tab opened without the injected login token (loopback mode only). */
var PTY_TOKEN_MISSING_BANNER = {
	text: "Chat can't connect because this page was opened without a login token. Reload the page, or start it again with `hermes dashboard` in a terminal.",
	action: "reload"
};
/** Rejection close codes the server sends before any PTY exists. `reason` is logged, not shown. */
var REJECTION_BANNERS = {
	4401: {
		text: "This chat tab's login expired (the dashboard server was restarted). Reload the page to reconnect.",
		action: "reload"
	},
	4403: {
		text: "The dashboard refused this chat connection because the page address does not match the server it was opened from. Open the dashboard from the address `hermes dashboard` printed.",
		action: null
	},
	4404: {
		text: "This Hermes server does not offer the terminal chat. Update Hermes (`hermes update`) and reload the page.",
		action: "reload"
	},
	4408: {
		text: "This Hermes server only accepts chat from the machine it runs on. Open the dashboard on that machine, or start it with a public bind.",
		action: null
	}
};
function ptyRejectionBanner(code) {
	return REJECTION_BANNERS[code] ?? null;
}
/** Shown after the last automatic attempt failed (overlay + banner). */
var PTY_GAVE_UP_BANNER = {
	text: "Lost connection to the Hermes dashboard server. If you stopped `hermes dashboard`, start it again; otherwise click Reconnect now.",
	action: "check-server"
};
/** Terminal footer line replacing `[session ended (code N)]`. */
var PTY_SESSION_ENDED_TERMINAL_LINE = "[chat session ended]";
/** True once the ladder has used its last attempt and that attempt also failed. */
function ptyReconnectExhausted(attempt, maxAttempts) {
	return attempt >= maxAttempts;
}
//#endregion
//#region web/src/lib/pty-attach-token.ts
/**
* Identity of THIS browser tab's keep-alive PTY, sent as `?attach=`.
*
* The dashboard's PTY registry maps one attach token to exactly one PTY, so a
* token two tabs present makes the second tab take the first one's terminal
* over (the first is closed 4409 and goes dead — the reported multi-tab
* interference). localStorage is shared per ORIGIN, so every tab read the same
* value, and Chrome's "Duplicate tab" clones sessionStorage into the new tab,
* so neither storage alone isolates the tabs. The token therefore lives in
* sessionStorage *and* is claimed with a Web Lock: a tab whose token is
* already claimed by a live document mints its own instead of sharing one.
* See #115304.
*/
var PTY_ATTACH_TOKEN_KEY = "hermes.pty.token.chat";
/** The token this document claimed — a reconnect must not re-request the lock
*  (Web Locks are not reentrant, so asking twice in one document deadlocks). */
var claimedToken = null;
function tabStorage() {
	try {
		return typeof window === "undefined" ? null : window.sessionStorage;
	} catch {
		return null;
	}
}
function mint() {
	const a = /* @__PURE__ */ new Uint8Array(16);
	crypto.getRandomValues(a);
	return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
}
/** Never settles, so the lock stays held for this document's lifetime. */
var HOLD = new Promise(() => {});
/**
* Claim `token` for this document. True when we now hold it; the browser
* releases it when the document unloads, so a reload of this tab finds the
* token free again while a live second tab does not. Browsers without the Web
* Locks API fall back to sessionStorage isolation only.
*/
async function claim(token) {
	const locks = typeof navigator === "undefined" ? void 0 : navigator.locks;
	if (!locks) return true;
	return new Promise((resolve) => {
		locks.request(`hermes.pty.attach.${token}`, { ifAvailable: true }, (lock) => {
			resolve(lock !== null);
			return lock ? HOLD : Promise.resolve();
		});
	});
}
/**
* This tab's `?attach=` token, minted when `rotate` starts a fresh session (the
* old keep-alive PTY must NOT be reattached) or when another live tab already
* claimed the stored one.
*/
async function ptyAttachToken(rotate = false) {
	const stored = claimedToken ?? tabStorage()?.getItem(PTY_ATTACH_TOKEN_KEY) ?? "";
	if (!rotate && stored && (stored === claimedToken || await claim(stored))) {
		claimedToken = stored;
		return stored;
	}
	const token = mint();
	try {
		tabStorage()?.setItem(PTY_ATTACH_TOKEN_KEY, token);
	} catch {}
	await claim(token);
	claimedToken = token;
	return token;
}
//#endregion
//#region web/src/lib/chat-channel-id.ts
function generateChannelId(scope) {
	const prefix = scope ? "chat" : "chat-fresh";
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `${prefix}-${crypto.randomUUID()}`;
	return `${prefix}-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}
//#endregion
//#region web/src/lib/chat-copy-last.ts
/**
* Sends `/copy` over the open PTY WebSocket, waits long enough for Ink's
* tokenizer to emit a keypress event per character (not coalesce them into
* a paste), then sends Return as its own event. The 100ms timing is
* empirical — safely past Node's default stdin coalescing window and well
* inside UI responsiveness. Flips `copyState` to "copied" for 1.5s and
* refocuses the terminal.
*/
function sendCopyLastCommand(opts) {
	const ws = opts.wsRef.current;
	if (!ws || ws.readyState !== WebSocket.OPEN) return;
	ws.send("/copy");
	setTimeout(() => {
		const s = opts.wsRef.current;
		if (s && s.readyState === WebSocket.OPEN) s.send("\r");
	}, 100);
	opts.onCopied();
	if (opts.copyResetRef.current) clearTimeout(opts.copyResetRef.current);
	opts.copyResetRef.current = setTimeout(() => opts.onCopyReset(), 1500);
	opts.termRef.current?.focus();
}
//#endregion
//#region web/src/lib/chat-copy-last-button.tsx
/**
* Floating "copy last response" overlay on the chat terminal: sends `/copy` over
* the PTY (see chat-copy-last.ts) and shows "copied" for the 1.5s reset window.
*/
function CopyLastButton(t0) {
	const $ = (0, import_compiler_runtime.c)(10);
	const { onClick, copied, color } = t0;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = cn("absolute z-10", "normal-case tracking-normal font-normal", "rounded border border-current/30", "bg-black/20", "opacity-70 hover:opacity-100 hover:border-current/60", "transition-opacity duration-150", "bottom-2 right-2 px-2 py-1 text-xs sm:bottom-3 sm:right-3 sm:px-2.5 sm:py-1.5", "lg:bottom-4 lg:right-4");
		$[0] = t1;
	} else t1 = $[0];
	let t2;
	if ($[1] !== color) {
		t2 = { color };
		$[1] = color;
		$[2] = t2;
	} else t2 = $[2];
	let t3;
	if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3 shrink-0" });
		$[3] = t3;
	} else t3 = $[3];
	const t4 = copied ? "copied" : "copy last response";
	let t5;
	if ($[4] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1.5",
			children: [t3, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden min-[400px]:inline tracking-wide",
				children: t4
			})]
		});
		$[4] = t4;
		$[5] = t5;
	} else t5 = $[5];
	let t6;
	if ($[6] !== onClick || $[7] !== t2 || $[8] !== t5) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			onClick,
			title: "Copy last assistant response as raw markdown",
			"aria-label": "Copy last assistant response",
			className: t1,
			style: t2,
			children: t5
		});
		$[6] = onClick;
		$[7] = t2;
		$[8] = t5;
		$[9] = t6;
	} else t6 = $[9];
	return t6;
}
//#endregion
//#region web/src/lib/xterm-webgl-gating.ts
var SOFTWARE_RENDERER_RE = /llvmpipe|swiftshader|softpipe|software/i;
/**
* Probe once whether WebGL is usable on this host, then release the probe
* context: browsers cap live contexts (~16) and chat reconnects already fight
* that cap (see xterm-webgl-release.ts).
*/
function probeWebglSupport(doc) {
	let gl = null;
	try {
		const canvas = doc.createElement("canvas");
		gl = (canvas.getContext("webgl2") ?? canvas.getContext("webgl")) || null;
	} catch {}
	if (!gl) return {
		contextAvailable: false,
		softwareRenderer: false
	};
	let softwareRenderer = false;
	try {
		const debug = gl.getExtension("WEBGL_debug_renderer_info");
		if (debug) {
			const renderer = String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL));
			softwareRenderer = SOFTWARE_RENDERER_RE.test(renderer);
		}
	} catch {}
	try {
		gl.getExtension("WEBGL_lose_context")?.loseContext();
	} catch {}
	return {
		contextAvailable: true,
		softwareRenderer
	};
}
/**
* Detect Safari (the WebKit browser shipped with macOS/iOS). Chromium
* derivatives and iOS wrapper apps keep the legacy `Safari/` token in their
* UA for compat, so exclude every fingerprint we know wraps another engine.
*/
function isSafari(userAgent) {
	if (!userAgent.includes("Safari/")) return false;
	return !/Chrom(e|ium)\/|CriOS\/|FxiOS\/|EdgiOS\/|EdgA\/|SamsungBrowser\/|Android/i.test(userAgent);
}
/**
* Wide layouts get WebGL for crisp box-drawing — but only where it works:
* never on Safari (#18773), never without a real hardware GL context
* (#45520). Everything else stays on the default DOM renderer.
*/
function shouldUseWebglRenderer(input) {
	return input.layoutWidthPx >= 768 && !isSafari(input.userAgent) && input.support.contextAvailable && !input.support.softwareRenderer;
}
var COMPLEX_SCRIPT_RANGES = [
	[2304, 2431],
	[2432, 2559],
	[2560, 2687],
	[2688, 2815],
	[2816, 2943],
	[2944, 3071],
	[3072, 3199],
	[3200, 3327],
	[3328, 3455],
	[3456, 3583],
	[4096, 4255],
	[6016, 6143]
];
/**
* True when the payload contains a script the WebGL/canvas atlas cannot
* shape. Used to drop the WebGL addon mid-stream so xterm re-renders
* through the DOM renderer (#58685).
*/
function textNeedsDomShaping(text) {
	for (let i = 0; i < text.length; i += 1) {
		const codePoint = text.codePointAt(i) ?? 0;
		if (codePoint > 65535) i += 1;
		for (const [low, high] of COMPLEX_SCRIPT_RANGES) if (codePoint >= low && codePoint <= high) return true;
	}
	return false;
}
//#endregion
//#region web/src/lib/xterm-webgl-release.ts
/**
* Release the WebGL contexts an xterm WebglAddon left behind.
*
* `@xterm/addon-webgl` (0.19) removes its canvas on dispose but never calls
* `WEBGL_lose_context.loseContext()`, so the GL context stays alive until the
* browser garbage-collects the canvas. Browsers cap live contexts (~16) and
* force-lose the oldest when the cap is hit; ChatPage rebuilds the terminal on
* every PTY reconnect, so a reconnect storm walks straight into that cap and
* eventually loses the context of the terminal the user is looking at.
*
* Call it on the terminal host BEFORE `term.dispose()` removes the canvases.
* Returns the number of contexts released.
*/
function loseWebglContexts(host) {
	let released = 0;
	for (const canvas of Array.from(host.querySelectorAll("canvas"))) {
		const lose = (canvas.getContext("webgl2") ?? canvas.getContext("webgl"))?.getExtension("WEBGL_lose_context");
		if (lose) {
			lose.loseContext();
			released += 1;
		}
	}
	return released;
}
function buildTerminalTheme(background, foreground) {
	return {
		background,
		foreground,
		cursor: foreground,
		cursorAccent: background,
		selectionBackground: foreground.length === 7 ? `${foreground}44` : foreground
	};
}
/**
* CSS width for xterm font tiers.
*
* Prefer the terminal host's `clientWidth` — Chrome DevTools device mode often
* keeps `window.innerWidth` at the full desktop value while the *drawn* layout
* is phone-sized, which made us pick desktop font sizes (~14px) and look huge.
*/
function terminalTierWidthPx(host) {
	if (typeof window === "undefined") return 1280;
	const fromHost = host?.clientWidth ?? 0;
	if (fromHost > 2) return Math.round(fromHost);
	const doc = document.documentElement?.clientWidth ?? 0;
	const vv = window.visualViewport;
	const inner = window.innerWidth;
	const vvw = vv?.width ?? inner;
	return Math.max(1, Math.round(Math.min(inner, vvw, doc > 0 ? doc : inner)));
}
function terminalFontSizeForWidth(layoutWidthPx) {
	if (layoutWidthPx < 300) return 7;
	if (layoutWidthPx < 360) return 8;
	if (layoutWidthPx < 420) return 9;
	if (layoutWidthPx < 520) return 10;
	if (layoutWidthPx < 720) return 11;
	if (layoutWidthPx < 1024) return 12;
	return 14;
}
function terminalLineHeightForWidth(layoutWidthPx) {
	return layoutWidthPx < 1024 ? 1.02 : 1.15;
}
//#endregion
//#region web/src/lib/pty-mouse-report.ts
var SGR_MOUSE_RE = /^\x1b\[<(\d+);(\d+);(\d+)([Mm])$/;
//#endregion
//#region web/src/pages/ChatPage.tsx
/**
* ChatPage — embeds `hermes --tui` inside the dashboard.
*
*   <div host> (dashboard chrome)                                         .
*     └─ <div wrapper> (rounded, dark bg, padded — the "terminal window"  .
*         look that gives the page a distinct visual identity)            .
*         └─ @xterm/xterm Terminal (WebGL renderer, Unicode 11 widths)    .
*              │ onData      keystrokes → WebSocket → PTY master          .
*              │ onResize    terminal resize → `\x1b[RESIZE:cols;rows]`   .
*              │ write(data) PTY output bytes → VT100 parser              .
*              ▼                                                          .
*     WebSocket /api/pty?token=<session>                                  .
*          ▼                                                              .
*     FastAPI pty_ws  (hermes_cli/web_server.py)                          .
*          ▼                                                              .
*     POSIX PTY → `node ui-tui/dist/entry.js` → tui_gateway + AIAgent     .
*/
function ChatPage({ isActive = true }) {
	const hostRef = (0, import_react.useRef)(null);
	const termWrapRef = (0, import_react.useRef)(null);
	const termRef = (0, import_react.useRef)(null);
	const fitRef = (0, import_react.useRef)(null);
	const wsRef = (0, import_react.useRef)(null);
	const isActiveRef = (0, import_react.useRef)(isActive);
	(0, import_react.useEffect)(() => {
		isActiveRef.current = isActive;
	}, [isActive]);
	const stickToBottomRef = (0, import_react.useRef)(true);
	const syncMetricsRef = (0, import_react.useRef)(null);
	const keyboardInsetSyncRef = (0, import_react.useRef)(null);
	const keyboardInsetResetRef = (0, import_react.useRef)(null);
	const [hasActivated, setHasActivated] = (0, import_react.useState)(isActive);
	(0, import_react.useEffect)(() => {
		setHasActivated((prev) => latchChatActivation(prev, isActive));
	}, [isActive]);
	const [searchParams, setSearchParams] = useSearchParams();
	const tokenMissing = typeof window !== "undefined" && !window.__HERMES_SESSION_TOKEN__ && !window.__HERMES_AUTH_REQUIRED__;
	const [banner, setBanner] = (0, import_react.useState)(() => tokenMissing ? PTY_TOKEN_MISSING_BANNER.text : null);
	const [bannerAction, setBannerAction] = (0, import_react.useState)(() => tokenMissing ? PTY_TOKEN_MISSING_BANNER.action : null);
	const [reconnectGaveUp, setReconnectGaveUp] = (0, import_react.useState)(false);
	const reconnectGaveUpRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		reconnectGaveUpRef.current = reconnectGaveUp;
	}, [reconnectGaveUp]);
	const [endedReason, setEndedReason] = (0, import_react.useState)("exited");
	const navigate = useNavigate();
	const [copyState, setCopyState] = (0, import_react.useState)("idle");
	const copyResetRef = (0, import_react.useRef)(null);
	const reconnectTimerRef = (0, import_react.useRef)(null);
	const reconnectAttemptRef = (0, import_react.useRef)(0);
	const forceFreshPtyRef = (0, import_react.useRef)(false);
	const blockedInputNoticeRef = (0, import_react.useRef)(false);
	const lastResumeReconnectAtRef = (0, import_react.useRef)(0);
	const connectInFlightRef = (0, import_react.useRef)(false);
	const connectingTimerRef = (0, import_react.useRef)(null);
	const ptyInputLineRef = (0, import_react.useRef)("");
	const mobileReplacementInputUntilRef = (0, import_react.useRef)(0);
	const [ptyState, setPtyState] = (0, import_react.useState)("connecting");
	const ptyStateRef = (0, import_react.useRef)("connecting");
	const [resumeHydrating, setResumeHydrating] = (0, import_react.useState)(false);
	const [reconnectNonce, setReconnectNonce] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		ptyStateRef.current = ptyState;
	}, [ptyState]);
	const clearReconnectTimer = (0, import_react.useCallback)(() => {
		if (reconnectTimerRef.current) {
			clearTimeout(reconnectTimerRef.current);
			reconnectTimerRef.current = null;
		}
	}, []);
	const reconnectPty = (0, import_react.useCallback)(() => {
		forceFreshPtyRef.current = false;
		reconnectAttemptRef.current = 0;
		clearReconnectTimer();
		blockedInputNoticeRef.current = false;
		ptyInputLineRef.current = "";
		mobileReplacementInputUntilRef.current = 0;
		setBanner(null);
		setBannerAction(null);
		setReconnectGaveUp(false);
		setPtyState("connecting");
		setReconnectNonce((n) => n + 1);
	}, [clearReconnectTimer]);
	const startFreshPty = (0, import_react.useCallback)(() => {
		forceFreshPtyRef.current = true;
		reconnectAttemptRef.current = 0;
		clearReconnectTimer();
		blockedInputNoticeRef.current = false;
		ptyInputLineRef.current = "";
		mobileReplacementInputUntilRef.current = 0;
		setBanner(null);
		setBannerAction(null);
		setReconnectGaveUp(false);
		setPtyState("connecting");
		setReconnectNonce((n_0) => n_0 + 1);
	}, [clearReconnectTimer]);
	const startFreshDashboardChat = (0, import_react.useCallback)(() => {
		const next = new URLSearchParams(searchParams);
		next.delete("resume");
		forceFreshPtyRef.current = true;
		reconnectAttemptRef.current = 0;
		clearReconnectTimer();
		blockedInputNoticeRef.current = false;
		ptyInputLineRef.current = "";
		mobileReplacementInputUntilRef.current = 0;
		setSearchParams(next, { replace: true });
		setBanner(null);
		setBannerAction(null);
		setReconnectGaveUp(false);
		setPtyState("connecting");
		setReconnectNonce((n_1) => n_1 + 1);
	}, [
		clearReconnectTimer,
		searchParams,
		setSearchParams
	]);
	(0, import_react.useEffect)(() => {
		if (!isActive) {
			clearReconnectTimer();
			ptyInputLineRef.current = "";
			mobileReplacementInputUntilRef.current = 0;
		}
	}, [clearReconnectTimer, isActive]);
	const [mobilePanelOpenRaw, setMobilePanelOpenRaw] = (0, import_react.useState)(false);
	const mobilePanelOpen = isActive && mobilePanelOpenRaw;
	const [chatPanelCollapsed, setChatPanelCollapsed] = (0, import_react.useState)(readChatPanelCollapsed);
	const toggleChatPanel = (0, import_react.useCallback)(() => {
		setChatPanelCollapsed(toggleChatPanelCollapsed);
	}, []);
	const { setEnd, setTitle } = usePageHeader();
	const [sessionTitleState, setSessionTitleState] = (0, import_react.useState)({
		scope: "",
		title: null
	});
	const { t } = useI18n();
	const closeMobilePanel = (0, import_react.useCallback)(() => setMobilePanelOpenRaw(false), []);
	const modelToolsLabel = (0, import_react.useMemo)(() => `${t.app.modelToolsSheetTitle} ${t.app.modelToolsSheetSubtitle}`, [t.app.modelToolsSheetSubtitle, t.app.modelToolsSheetTitle]);
	const [portalRoot] = (0, import_react.useState)(() => typeof document !== "undefined" ? document.body : null);
	const [narrow, setNarrow] = (0, import_react.useState)(() => typeof window !== "undefined" ? window.matchMedia("(max-width: 1023px)").matches : false);
	const { theme } = useTheme();
	const terminalBg = theme.terminalBackground ?? "#000000";
	const terminalFg = theme.terminalForeground ?? "#f0e6d2";
	const terminalTheme = (0, import_react.useMemo)(() => buildTerminalTheme(terminalBg, terminalFg), [terminalBg, terminalFg]);
	const resumeParam = searchParams.get("resume");
	const { profile: scopedProfile } = useProfileScope();
	const [workspaceCwd, setWorkspaceCwdState] = (0, import_react.useState)(() => readStoredWorkspace(scopedProfile));
	const setWorkspaceCwd = (0, import_react.useCallback)((next_0) => {
		writeStoredWorkspace(scopedProfile, next_0);
		setWorkspaceCwdState(next_0);
	}, [scopedProfile]);
	const [workspaceProfile, setWorkspaceProfile] = (0, import_react.useState)(scopedProfile);
	if (workspaceProfile !== scopedProfile) {
		setWorkspaceProfile(scopedProfile);
		setWorkspaceCwdState(readStoredWorkspace(scopedProfile));
	}
	const channel = (0, import_react.useMemo)(() => generateChannelId(`${resumeParam ?? ""}\0${scopedProfile}`), [resumeParam, scopedProfile]);
	const titleScope = `${channel}\0${reconnectNonce}`;
	const sessionTitle = sessionTitleState.scope === titleScope ? sessionTitleState.title : null;
	const handleSessionTitleChange = (0, import_react.useCallback)((title) => setSessionTitleState({
		scope: titleScope,
		title
	}), [titleScope]);
	(0, import_react.useLayoutEffect)(() => {
		if (!isActive) {
			setTitle(null);
			return;
		}
		setTitle(sessionTitle);
		return () => setTitle(null);
	}, [
		isActive,
		sessionTitle,
		setTitle
	]);
	(0, import_react.useEffect)(() => {
		if (!resumeParam) return;
		let cancelled = false;
		api.getSessionDetail(resumeParam, scopedProfile).then((session) => {
			if (cancelled) return;
			handleSessionTitleChange(normalizeSessionTitle(session.title));
		}).catch(() => {});
		return () => {
			cancelled = true;
		};
	}, [
		resumeParam,
		scopedProfile,
		handleSessionTitleChange
	]);
	(0, import_react.useEffect)(() => {
		if (!resumeParam) return;
		let cancelled_0 = false;
		api.getSessionLatestDescendant(resumeParam, scopedProfile).then((res) => {
			if (cancelled_0 || !res.session_id || res.session_id === resumeParam) return;
			const next_1 = new URLSearchParams(searchParams);
			next_1.set("resume", res.session_id);
			setSearchParams(next_1, { replace: true });
		}).catch(() => {});
		return () => {
			cancelled_0 = true;
		};
	}, [
		resumeParam,
		scopedProfile,
		searchParams,
		setSearchParams
	]);
	(0, import_react.useEffect)(() => {
		const mql = window.matchMedia("(max-width: 1023px)");
		const sync = () => setNarrow(mql.matches);
		sync();
		mql.addEventListener("change", sync);
		return () => mql.removeEventListener("change", sync);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!mobilePanelOpen) return;
		const onKey = (e) => {
			if (e.key === "Escape") closeMobilePanel();
		};
		document.addEventListener("keydown", onKey);
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prevOverflow;
		};
	}, [mobilePanelOpen, closeMobilePanel]);
	(0, import_react.useEffect)(() => {
		const mql_0 = window.matchMedia("(min-width: 1024px)");
		const onChange = (e_0) => {
			if (e_0.matches) setMobilePanelOpenRaw(false);
		};
		mql_0.addEventListener("change", onChange);
		return () => mql_0.removeEventListener("change", onChange);
	}, []);
	(0, import_react.useLayoutEffect)(() => {
		if (!isActive || !narrow) return;
		setEnd(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			onClick: () => setMobilePanelOpenRaw(true),
			"aria-expanded": mobilePanelOpen,
			"aria-controls": "chat-side-panel",
			className: cn("shrink-0 rounded border border-current/20", "px-2 py-1 text-xs font-medium tracking-wide", "text-text-secondary hover:text-midground hover:bg-midground/5"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRight, { className: "h-3 w-3 shrink-0" }), modelToolsLabel]
			})
		}));
		return () => setEnd(null);
	}, [
		isActive,
		narrow,
		mobilePanelOpen,
		modelToolsLabel,
		setEnd
	]);
	const handleCopyLast = () => {
		sendCopyLastCommand({
			wsRef,
			termRef,
			copyResetRef,
			onCopied: () => setCopyState("copied"),
			onCopyReset: () => setCopyState("idle")
		});
	};
	(0, import_react.useEffect)(() => {
		if (!hasActivated) return;
		const host = hostRef.current;
		if (!host) return;
		const termWrap = termWrapRef.current;
		const token = window.__HERMES_SESSION_TOKEN__;
		const gated = !!window.__HERMES_AUTH_REQUIRED__;
		if (!token && !gated) return;
		const tierW0 = terminalTierWidthPx(host);
		const term = new Dl({
			allowProposedApi: true,
			cursorBlink: true,
			fontFamily: TERMINAL_FONT_FAMILY,
			fontSize: terminalFontSizeForWidth(tierW0),
			lineHeight: terminalLineHeightForWidth(tierW0),
			letterSpacing: 0,
			fontWeight: "400",
			fontWeightBold: "700",
			macOptionIsMeta: true,
			macOptionClickForcesSelection: true,
			rightClickSelectsWord: true,
			scrollback: 5e3,
			screenReaderMode: true,
			theme: terminalTheme
		});
		termRef.current = term;
		term.parser.registerOscHandler(52, (data) => {
			const semi = data.indexOf(";");
			if (semi < 0) return false;
			const payload = data.slice(semi + 1);
			if (payload === "?" || payload === "") return false;
			try {
				const binary = atob(payload);
				const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
				const text = new TextDecoder("utf-8").decode(bytes);
				copyTextToClipboard(text).then((copied) => {
					if (!copied) console.warn("[dashboard clipboard] OSC 52 write failed");
				});
			} catch {
				console.warn("[dashboard clipboard] malformed OSC 52 payload");
			}
			return true;
		});
		const isMac = typeof navigator !== "undefined" && /Mac/i.test(navigator.platform);
		let imageUploadDisposed = false;
		const pasteDelay = () => new Promise((resolve) => window.setTimeout(resolve, 40));
		const reportImageUploadError = (err) => {
			const message = err instanceof Error ? err.message : String(err);
			console.warn("[dashboard chat] image upload failed:", message);
			setBanner(`Image upload failed: ${message}`);
		};
		const driveImageAttach = async (paths) => {
			for (const path of paths) {
				if (imageUploadDisposed) return;
				const ws = wsRef.current;
				if (!ws || ws.readyState !== WebSocket.OPEN) {
					setBanner("Image uploaded, but chat is not connected — try again.");
					return;
				}
				ws.send(`/image ${path}`);
				await new Promise((resolve_0) => window.setTimeout(resolve_0, 100));
				const s = wsRef.current;
				if (!s || s.readyState !== WebSocket.OPEN) return;
				s.send("\r");
				await pasteDelay();
			}
			term.focus();
		};
		const uploadAndAttachImages = (files) => {
			if (!files.length) return;
			(async () => {
				const paths_0 = [];
				for (const file of files) {
					const uploaded = await uploadChatImage(file, scopedProfile);
					if (imageUploadDisposed) return;
					paths_0.push(uploaded.path);
				}
				await driveImageAttach(paths_0);
			})().catch(reportImageUploadError);
		};
		const handleBrowserDropCleanup = attachChatImageDropListeners(host, uploadAndAttachImages, (text_0) => term.paste(text_0));
		term.attachCustomKeyEventHandler((ev) => {
			if (ev.type !== "keydown") return true;
			if (ev.key === "Tab") return false;
			const copyModifier = isMac ? ev.metaKey : ev.ctrlKey;
			const pasteModifier = isMac ? ev.metaKey : ev.ctrlKey;
			const terminalSelection = term.getSelection();
			const shortcut = resolvePtyKeyboardShortcut(ev, isMac, Boolean(terminalSelection));
			if ((shortcut === "copy" || copyModifier && ev.shiftKey && ev.key.toLowerCase() === "c") && terminalSelection) {
				copyTextToClipboard(terminalSelection).then((copied_0) => {
					if (!copied_0) console.warn("[dashboard clipboard] direct copy failed");
				});
				term.clearSelection();
				ev.preventDefault();
				return false;
			}
			if (shortcut === "delete-word-backward") {
				ev.preventDefault();
				sendPtyShortcutSequence(wsRef.current, ptyStateRef.current, "");
				return false;
			}
			if (shortcut === "delete-word-forward") {
				ev.preventDefault();
				sendPtyShortcutSequence(wsRef.current, ptyStateRef.current, "\x1Bd");
				return false;
			}
			if (pasteModifier && ev.key.toLowerCase() === "v") {
				ev.preventDefault();
				(async () => {
					try {
						const read = navigator.clipboard?.read;
						if (typeof read === "function") {
							const items = await read.call(navigator.clipboard);
							const files_0 = [];
							for (const item of items) {
								const type = item.types.find((t_0) => t_0.startsWith("image/"));
								if (!type) continue;
								const blob = await item.getType(type);
								const ext = type.split("/")[1]?.split("+")[0] || "png";
								files_0.push(new File([blob], `clipboard.${ext}`, { type }));
							}
							if (files_0.length) {
								uploadAndAttachImages(files_0);
								return;
							}
						}
					} catch {}
					try {
						const text_1 = await navigator.clipboard.readText();
						if (text_1) term.paste(text_1);
					} catch (err_0) {
						const message_0 = err_0 instanceof Error ? err_0.message : String(err_0);
						console.warn("[dashboard clipboard] paste failed:", message_0);
					}
				})();
				return false;
			}
			return true;
		});
		const fit = new o();
		fitRef.current = fit;
		term.loadAddon(fit);
		term.attachCustomWheelEventHandler((ev_0) => {
			const delta = ev_0.deltaY;
			if (!delta) return false;
			const step = Math.max(1, Math.round(Math.abs(delta) / 50));
			term.scrollLines(delta > 0 ? step : -step);
			ev_0.preventDefault();
			ev_0.stopPropagation();
			return false;
		});
		const cleanupTouchScroll = installTerminalTouchScroll(host, term);
		const unicode11 = new Ke();
		term.loadAddon(unicode11);
		term.unicode.activeVersion = "11";
		term.loadAddon(new L());
		let mobileInputCleanup = null;
		let sendComposedText = () => void 0;
		const compositionForwarder = createPtyCompositionForwarder((data_0) => {
			sendComposedText(data_0);
		});
		term.open(host);
		const _imeCompositionGuard = (e_1) => {
			if (e_1.keyCode === 229 || e_1.key === "Process") e_1.stopPropagation();
		};
		host.addEventListener("keydown", _imeCompositionGuard, true);
		const textarea = term.textarea;
		if (textarea) {
			textarea.setAttribute("autocomplete", "off");
			textarea.setAttribute("autocorrect", "off");
			textarea.setAttribute("autocapitalize", "off");
			textarea.setAttribute("spellcheck", "false");
			const isMobileLike = typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
			const markReplacementInput = (ev_1) => {
				const input = ev_1;
				if (shouldTreatInputAsMobileReplacement(input.inputType, input.data, isMobileLike)) mobileReplacementInputUntilRef.current = Date.now() + 350;
			};
			const markCompositionEnd = (ev_2) => {
				mobileReplacementInputUntilRef.current = Date.now() + 350;
				compositionForwarder.onCompositionEnd(ev_2.data);
			};
			textarea.addEventListener("beforeinput", markReplacementInput, true);
			textarea.addEventListener("compositionend", markCompositionEnd, true);
			mobileInputCleanup = () => {
				textarea.removeEventListener("beforeinput", markReplacementInput, true);
				textarea.removeEventListener("compositionend", markCompositionEnd, true);
			};
		}
		const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
		const useWebgl = shouldUseWebglRenderer({
			layoutWidthPx: terminalTierWidthPx(host),
			userAgent,
			support: probeWebglSupport(document)
		});
		let webglAddon = null;
		if (useWebgl) try {
			const webgl = new xr();
			webgl.onContextLoss(() => webgl.dispose());
			term.loadAddon(webgl);
			webglAddon = webgl;
		} catch (err_1) {
			console.warn("[hermes-chat] WebGL renderer unavailable; falling back to default", err_1);
		}
		let hostSyncRaf = 0;
		const scheduleHostSync = () => {
			if (hostSyncRaf) return;
			hostSyncRaf = requestAnimationFrame(() => {
				hostSyncRaf = 0;
				syncTerminalMetrics();
			});
		};
		let metricsDebounce = null;
		const syncTerminalMetrics = () => {
			if (!host.isConnected || host.clientWidth <= 0 || host.clientHeight <= 0) return;
			const w = terminalTierWidthPx(host);
			const nextSize = terminalFontSizeForWidth(w);
			const nextLh = terminalLineHeightForWidth(w);
			const fontChanged = term.options.fontSize !== nextSize || term.options.lineHeight !== nextLh;
			if (fontChanged) {
				term.options.fontSize = nextSize;
				term.options.lineHeight = nextLh;
			}
			try {
				fit.fit();
			} catch {
				return;
			}
			if (fontChanged && term.rows > 0) try {
				term.refresh(0, term.rows - 1);
			} catch {}
			if (fontChanged && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) wsRef.current.send(`\x1b[RESIZE:${term.cols};${term.rows}]`);
		};
		syncMetricsRef.current = syncTerminalMetrics;
		const scheduleSyncTerminalMetrics = () => {
			if (metricsDebounce) clearTimeout(metricsDebounce);
			metricsDebounce = setTimeout(() => {
				metricsDebounce = null;
				syncTerminalMetrics();
			}, 60);
		};
		const ro = new ResizeObserver(() => scheduleHostSync());
		ro.observe(host);
		let appliedKeyboardInset = 0;
		const syncKeyboardInset = () => {
			const wrap = termWrap;
			if (!wrap) return;
			const vv = window.visualViewport;
			const inset = computeKeyboardInset(vv ? {
				height: vv.height,
				offsetTop: vv.offsetTop
			} : null, window.innerHeight);
			if (inset !== appliedKeyboardInset) {
				appliedKeyboardInset = inset;
				wrap.style.paddingBottom = inset > 0 ? `${inset}px` : "";
				scheduleHostSync();
			}
			const revealComposer = () => {
				if (inset <= 0 || !vv) return;
				try {
					term.scrollToBottom();
				} catch {}
				const delta_0 = keyboardRevealScrollDelta(host.getBoundingClientRect().bottom, {
					height: vv.height,
					offsetTop: vv.offsetTop
				});
				if (delta_0) window.scrollBy(0, delta_0);
			};
			if (inset > 0) {
				revealComposer();
				requestAnimationFrame(() => {
					revealComposer();
					requestAnimationFrame(revealComposer);
				});
			}
		};
		const onViewportChange = () => {
			syncKeyboardInset();
			scheduleSyncTerminalMetrics();
		};
		window.addEventListener("resize", scheduleSyncTerminalMetrics);
		keyboardInsetSyncRef.current = onViewportChange;
		keyboardInsetResetRef.current = () => {
			appliedKeyboardInset = 0;
			if (termWrap) termWrap.style.paddingBottom = "";
		};
		let keyboardRevealTimer = 0;
		const onTerminalFocus = () => {
			onViewportChange();
			window.clearTimeout(keyboardRevealTimer);
			keyboardRevealTimer = window.setTimeout(onViewportChange, 350);
		};
		term.textarea?.addEventListener("focus", onTerminalFocus);
		scheduleHostSync();
		requestAnimationFrame(() => scheduleHostSync());
		let settleRaf1 = 0;
		let settleRaf2 = 0;
		settleRaf1 = requestAnimationFrame(() => {
			settleRaf1 = 0;
			settleRaf2 = requestAnimationFrame(() => {
				settleRaf2 = 0;
				syncTerminalMetrics();
			});
		});
		const stopFontRefit = refitWhenTerminalFontLoads(term, syncTerminalMetrics);
		let unmounting = false;
		let effectiveResume = resumeParam;
		let onDataDisposable = null;
		let onResizeDisposable = null;
		let onScrollDisposable = null;
		let eraseSuppressionTimer = null;
		let resumeMaxTimer = null;
		const clearEraseSuppressionTimer = () => {
			if (eraseSuppressionTimer) {
				clearTimeout(eraseSuppressionTimer);
				eraseSuppressionTimer = null;
			}
		};
		const clearResumeLoadingTimers = () => {
			if (resumeMaxTimer) {
				clearTimeout(resumeMaxTimer);
				resumeMaxTimer = null;
			}
		};
		const finishResumeHydration = () => {
			clearResumeLoadingTimers();
			if (!unmounting) setResumeHydrating(false);
		};
		const noteResumePtyChunk = (chunkText) => {
			if (!effectiveResume || unmounting) return;
			if (shouldFinishResumeHydrationOnChunk(chunkText)) finishResumeHydration();
		};
		if (resumeParam) {
			setResumeHydrating(true);
			resumeMaxTimer = setTimeout(finishResumeHydration, PTY_RESUME_LOADING_MAX_MS);
		} else setResumeHydrating(false);
		const forceFresh = forceFreshPtyRef.current;
		forceFreshPtyRef.current = false;
		connectInFlightRef.current = true;
		const clearConnectingTimer = () => {
			if (connectingTimerRef.current) {
				clearTimeout(connectingTimerRef.current);
				connectingTimerRef.current = null;
			}
		};
		let ticketSuperseded = false;
		let ticketTimer = null;
		let keepaliveTimer = null;
		const clearKeepaliveTimer = () => {
			if (keepaliveTimer) {
				clearInterval(keepaliveTimer);
				keepaliveTimer = null;
			}
		};
		const clearTicketTimer = () => {
			if (ticketTimer) {
				clearTimeout(ticketTimer);
				ticketTimer = null;
			}
		};
		const scheduleReconnect = (code) => {
			if (!isActiveRef.current || typeof document !== "undefined" && document.visibilityState === "hidden") {
				setBanner(null);
				setBannerAction(null);
				setPtyState("closed");
				return;
			}
			if (reconnectTimerRef.current) return;
			if (ptyReconnectExhausted(reconnectAttemptRef.current, 5)) {
				console.warn(`[chat] PTY reconnect gave up after 5 attempts (last code=${code ?? "none"})`);
				setBanner(null);
				setBannerAction(null);
				reconnectGaveUpRef.current = true;
				setReconnectGaveUp(true);
				setPtyState("closed");
				return;
			}
			const attempt = reconnectAttemptRef.current + 1;
			reconnectAttemptRef.current = attempt;
			const delayMs = ptyReconnectDelayMs(attempt);
			setBanner(null);
			setBannerAction(null);
			setPtyState("reconnecting");
			reconnectTimerRef.current = setTimeout(() => {
				reconnectTimerRef.current = null;
				setReconnectNonce((n_2) => n_2 + 1);
			}, delayMs);
		};
		const failTicketAttempt = () => {
			ticketSuperseded = true;
			clearTicketTimer();
			connectInFlightRef.current = false;
			scheduleReconnect(null);
		};
		(async () => {
			if (unmounting) return;
			const params = { channel };
			if (resumeParam) params.resume = resumeParam;
			if (forceFresh) params.fresh = "1";
			const pickedWorkspace = resumeParam ? "" : readStoredWorkspace(scopedProfile);
			if (pickedWorkspace) params.cwd = pickedWorkspace;
			params.attach = await ptyAttachToken(forceFresh);
			if (scopedProfile) params.profile = scopedProfile;
			ticketTimer = setTimeout(() => {
				ticketTimer = null;
				if (unmounting || ticketSuperseded) return;
				failTicketAttempt();
			}, PTY_TICKET_TIMEOUT_MS);
			let url;
			try {
				url = await api.buildWsUrl("/api/pty", params);
			} catch (err_2) {
				if (unmounting || ticketSuperseded) return;
				console.warn(`[chat] PTY ticket request failed: ${errorMessage(err_2)}`);
				failTicketAttempt();
				return;
			}
			if (unmounting || ticketSuperseded) return;
			clearTicketTimer();
			const ws_0 = new WebSocket(url);
			ws_0.binaryType = "arraybuffer";
			wsRef.current = ws_0;
			clearConnectingTimer();
			connectingTimerRef.current = setTimeout(() => {
				connectingTimerRef.current = null;
				if (wsRef.current === ws_0 && ws_0.readyState === WebSocket.CONNECTING) try {
					ws_0.close();
				} catch {}
			}, PTY_CONNECTING_TIMEOUT_MS);
			ws_0.onopen = () => {
				clearReconnectTimer();
				clearConnectingTimer();
				connectInFlightRef.current = false;
				reconnectAttemptRef.current = 0;
				setBanner(null);
				setBannerAction(null);
				setReconnectGaveUp(false);
				setPtyState("open");
				blockedInputNoticeRef.current = false;
				if (reconnectTimerRef.current) {
					clearTimeout(reconnectTimerRef.current);
					reconnectTimerRef.current = null;
				}
				const sendTerminalResize = () => {
					if (ws_0.readyState === WebSocket.OPEN) ws_0.send(`\x1b[RESIZE:${term.cols};${term.rows}]`);
				};
				sendTerminalResize();
				keepaliveTimer = setInterval(sendTerminalResize, PTY_KEEPALIVE_INTERVAL_MS);
				if (resumeParam) stickToBottomRef.current = true;
				const learnSeed = searchParams.get("learn");
				if (learnSeed) {
					const next_2 = new URLSearchParams(searchParams);
					next_2.delete("learn");
					setSearchParams(next_2, { replace: true });
					const cmd = `/learn ${learnSeed}`.trim();
					setTimeout(() => {
						try {
							wsRef.current?.send(cmd + "\r");
						} catch {}
					}, 800);
				}
			};
			const decoder = new TextDecoder();
			const sanitizer = new PtyResumeSanitizer();
			const beginResumeReplay = () => {
				stickToBottomRef.current = true;
				if (!eraseSuppressionTimer) eraseSuppressionTimer = setTimeout(() => {
					eraseSuppressionTimer = null;
					sanitizer.endEraseSuppression();
				}, PTY_RESUME_SANITIZE_WINDOW_MS);
				if (!resumeMaxTimer) {
					setResumeHydrating(true);
					resumeMaxTimer = setTimeout(finishResumeHydration, PTY_RESUME_LOADING_MAX_MS);
				}
			};
			if (resumeParam) beginResumeReplay();
			ws_0.onmessage = (ev_3) => {
				if (typeof ev_3.data === "string") {
					const resumeId = parseResumeControlMessage(ev_3.data);
					if (resumeId) {
						effectiveResume = resumeId;
						beginResumeReplay();
						return;
					}
				}
				const text_2 = typeof ev_3.data === "string" ? ev_3.data : decoder.decode(new Uint8Array(ev_3.data), { stream: true });
				const rendered = effectiveResume ? sanitizer.next(text_2) : text_2;
				const followScroll = shouldFollowPtyOutput(effectiveResume, stickToBottomRef.current) ? () => termRef.current?.scrollToBottom() : void 0;
				if (webglAddon && textNeedsDomShaping(text_2)) {
					try {
						webglAddon.dispose();
					} catch {}
					webglAddon = null;
				}
				term.write(rendered, followScroll);
				noteResumePtyChunk(rendered);
			};
			ws_0.onclose = (ev_4) => {
				clearKeepaliveTimer();
				if (effectiveResume) {
					clearEraseSuppressionTimer();
					try {
						term.write(sanitizer.flush());
					} catch {}
				}
				wsRef.current = null;
				connectInFlightRef.current = false;
				clearConnectingTimer();
				if (unmounting) return;
				const why = ev_4.reason ? ` reason=${ev_4.reason}` : "";
				console.warn(`[chat] PTY WebSocket closed code=${ev_4.code}${why}`);
				if (ev_4.code === 4401 && maybeReloadForLoopbackWsAuthFailure(ev_4.code)) return;
				const rejection = ptyRejectionBanner(ev_4.code);
				if (rejection) {
					setPtyState("closed");
					setBanner(rejection.text);
					setBannerAction(rejection.action);
					return;
				}
				if (ev_4.code === 1011) {
					setEndedReason("start-failed");
					setPtyState("ended");
					return;
				}
				if (ev_4.code === 4410) {
					term.write(`\r\n\x1b[90m${PTY_SESSION_ENDED_TERMINAL_LINE}\x1b[0m\r\n`);
					setEndedReason("exited");
					setPtyState("ended");
					return;
				}
				if (ev_4.code === 4409) {
					setPtyState("closed");
					return;
				}
				if (!ev_4.wasClean || ev_4.code === 1001 || ev_4.code === 1006 || ev_4.code === 1012 || ev_4.code === 1013) {
					scheduleReconnect(ev_4.code);
					return;
				}
				term.write(`\r\n\x1b[90m${PTY_SESSION_ENDED_TERMINAL_LINE}\x1b[0m\r\n`);
				setEndedReason("exited");
				setPtyState("ended");
			};
			const forwardPtyData = (data_1, useMobileReplacement = true) => {
				if (SGR_MOUSE_RE.test(data_1)) return;
				if (ws_0.readyState !== WebSocket.OPEN || shouldBlockPtyInput(ptyStateRef.current)) {
					if (!blockedInputNoticeRef.current) {
						blockedInputNoticeRef.current = true;
						term.write(`\r\n\x1b[33m[${PTY_RECONNECT_INPUT_MESSAGE}]\x1b[0m\r\n`);
					}
					return;
				}
				const normalized = normalizePtyMobileInput(data_1, ptyInputLineRef.current, useMobileReplacement && Date.now() <= mobileReplacementInputUntilRef.current);
				ptyInputLineRef.current = normalized.nextLine;
				if (normalized.normalized) mobileReplacementInputUntilRef.current = 0;
				ws_0.send(normalized.data);
			};
			sendComposedText = (data_2) => forwardPtyData(data_2, false);
			onDataDisposable = term.onData((data_3) => {
				if (!SGR_MOUSE_RE.test(data_3)) compositionForwarder.noteTerminalData(data_3);
				const unechoed = compositionForwarder.filterTerminalData(data_3);
				if (unechoed) forwardPtyData(unechoed);
			});
			onResizeDisposable = term.onResize(({ cols, rows }) => {
				if (ws_0.readyState === WebSocket.OPEN) ws_0.send(`\x1b[RESIZE:${cols};${rows}]`);
			});
			onScrollDisposable = term.onScroll(() => {
				stickToBottomRef.current = isViewportPinnedToBottom(term.buffer.active);
			});
		})();
		term.focus();
		return () => {
			unmounting = true;
			imageUploadDisposed = true;
			syncMetricsRef.current = null;
			clearEraseSuppressionTimer();
			clearResumeLoadingTimers();
			setResumeHydrating(false);
			onDataDisposable?.dispose();
			onResizeDisposable?.dispose();
			onScrollDisposable?.dispose();
			mobileInputCleanup?.();
			compositionForwarder.dispose();
			cleanupTouchScroll();
			handleBrowserDropCleanup();
			if (metricsDebounce) clearTimeout(metricsDebounce);
			window.removeEventListener("resize", scheduleSyncTerminalMetrics);
			window.clearTimeout(keyboardRevealTimer);
			term.textarea?.removeEventListener("focus", onTerminalFocus);
			keyboardInsetSyncRef.current = null;
			keyboardInsetResetRef.current = null;
			const wrap_0 = termWrap;
			if (wrap_0) wrap_0.style.paddingBottom = "";
			ro.disconnect();
			if (hostSyncRaf) cancelAnimationFrame(hostSyncRaf);
			if (settleRaf1) cancelAnimationFrame(settleRaf1);
			if (settleRaf2) cancelAnimationFrame(settleRaf2);
			stopFontRefit();
			clearReconnectTimer();
			clearConnectingTimer();
			clearTicketTimer();
			clearKeepaliveTimer();
			ticketSuperseded = true;
			connectInFlightRef.current = false;
			wsRef.current?.close();
			wsRef.current = null;
			host.removeEventListener("keydown", _imeCompositionGuard, true);
			loseWebglContexts(host);
			term.dispose();
			termRef.current = null;
			fitRef.current = null;
			if (copyResetRef.current) {
				clearTimeout(copyResetRef.current);
				copyResetRef.current = null;
			}
			if (reconnectTimerRef.current) {
				clearTimeout(reconnectTimerRef.current);
				reconnectTimerRef.current = null;
			}
		};
	}, [
		hasActivated,
		channel,
		clearReconnectTimer,
		resumeParam,
		scopedProfile,
		reconnectNonce
	]);
	(0, import_react.useEffect)(() => {
		if (!isActive || typeof window === "undefined") return;
		const vv_0 = window.visualViewport;
		if (!vv_0) return;
		const onViewportChange_0 = () => keyboardInsetSyncRef.current?.();
		vv_0.addEventListener("resize", onViewportChange_0);
		vv_0.addEventListener("scroll", onViewportChange_0);
		onViewportChange_0();
		return () => {
			vv_0.removeEventListener("resize", onViewportChange_0);
			vv_0.removeEventListener("scroll", onViewportChange_0);
			keyboardInsetResetRef.current?.();
		};
	}, [isActive]);
	(0, import_react.useEffect)(() => {
		if (!isActive) return;
		let raf1 = 0;
		let raf2 = 0;
		raf1 = requestAnimationFrame(() => {
			raf1 = 0;
			raf2 = requestAnimationFrame(() => {
				raf2 = 0;
				syncMetricsRef.current?.();
				if (shouldRestoreTerminalFocus(typeof document !== "undefined" ? document.activeElement : null, hostRef.current)) termRef.current?.focus();
			});
		});
		return () => {
			if (raf1) cancelAnimationFrame(raf1);
			if (raf2) cancelAnimationFrame(raf2);
		};
	}, [isActive]);
	(0, import_react.useEffect)(() => {
		if (!isActive || typeof window === "undefined") return;
		const onWindowFocus = () => {
			if (shouldRestoreTerminalFocus(document.activeElement, hostRef.current)) termRef.current?.focus();
		};
		window.addEventListener("focus", onWindowFocus);
		return () => window.removeEventListener("focus", onWindowFocus);
	}, [isActive]);
	const maybeReconnectOnPageResume = (0, import_react.useCallback)(() => {
		const visibilityState = typeof document !== "undefined" ? document.visibilityState : "visible";
		const online = typeof navigator === "undefined" ? true : navigator.onLine !== false;
		const socketReadyState = wsRef.current?.readyState ?? null;
		if (banner && ptyStateRef.current === "closed") return;
		if (shouldReconnectPtyOnPageResume({
			isActive,
			visibilityState,
			online,
			socketReadyState,
			ptyState: ptyStateRef.current,
			connectInFlight: connectInFlightRef.current,
			reconnectGaveUp: reconnectGaveUpRef.current
		})) {
			const now = Date.now();
			if (now - lastResumeReconnectAtRef.current < 1e3) return;
			lastResumeReconnectAtRef.current = now;
			reconnectPty();
		}
	}, [
		banner,
		isActive,
		reconnectPty
	]);
	(0, import_react.useEffect)(() => {
		if (!isActive || typeof window === "undefined") return;
		const onResume = () => maybeReconnectOnPageResume();
		document.addEventListener("visibilitychange", onResume);
		window.addEventListener("pageshow", onResume);
		window.addEventListener("focus", onResume);
		window.addEventListener("online", onResume);
		onResume();
		return () => {
			document.removeEventListener("visibilitychange", onResume);
			window.removeEventListener("pageshow", onResume);
			window.removeEventListener("focus", onResume);
			window.removeEventListener("online", onResume);
		};
	}, [isActive, maybeReconnectOnPageResume]);
	(0, import_react.useEffect)(() => {
		const term_0 = termRef.current;
		if (!term_0) return;
		term_0.options.theme = terminalTheme;
	}, [terminalTheme]);
	const visibleBanner = banner ?? (ptyState === "reconnecting" ? "Chat connection interrupted. Reconnecting..." : null);
	const showReconnectOverlay = ptyState === "reconnecting" || ptyState === "closed" && !banner;
	const showResumeLoadingOverlay = shouldShowResumeLoadingOverlay({
		hasResumeTarget: Boolean(resumeParam),
		ptyState,
		hydrating: resumeHydrating
	});
	const mobileModelToolsPortal = isActive && narrow && portalRoot && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [mobilePanelOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		ghost: true,
		"aria-label": t.app.closeModelTools,
		onClick: closeMobilePanel,
		className: cn("fixed inset-0 z-[55] p-0 block", "bg-black/60")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "chat-side-panel",
		role: "complementary",
		"aria-label": modelToolsLabel,
		className: cn("font-mondwest fixed top-0 right-0 z-[60] flex h-dvh max-h-dvh w-64 min-w-0 flex-col antialiased", "border-l border-current/20 text-midground", "bg-background-base/95", "transition-transform duration-200 ease-out", "[background:var(--component-sidebar-background,var(--background-base))]", "[clip-path:var(--component-sidebar-clip-path)]", "[border-image:var(--component-sidebar-border-image)]", mobilePanelOpen ? "translate-x-0" : "pointer-events-none translate-x-full"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex h-14 shrink-0 items-center justify-between gap-2 border-b border-current/20 px-5"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
				mondwest: true,
				className: "text-display font-bold text-[1.125rem] leading-[0.95] tracking-[0.0525rem] text-midground",
				children: [
					t.app.modelToolsSheetTitle,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					t.app.modelToolsSheetSubtitle
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				ghost: true,
				size: "icon",
				onClick: closeMobilePanel,
				"aria-label": t.app.closeModelTools,
				className: "text-text-secondary hover:text-midground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("min-h-0 flex-1 overflow-y-auto overflow-x-hidden", "border-t border-current/10"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-current/10 px-1 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatSidebar, {
					channel,
					profile: scopedProfile,
					onDashboardNewSessionRequest: startFreshDashboardChat,
					onSessionTitleChange: handleSessionTitleChange
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatSessionList, {
				activeSessionId: resumeParam,
				isActive,
				profile: scopedProfile,
				onPicked: closeMobilePanel,
				onNewChat: startFreshDashboardChat,
				workspaceCwd,
				onWorkspaceChange: setWorkspaceCwd
			})]
		})]
	})] }), portalRoot);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "chat:top" }),
			mobileModelToolsPortal,
			visibleBanner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "alert",
				className: "flex flex-wrap items-center gap-2 border border-warning/50 bg-warning/10 text-warning px-3 py-2 text-xs tracking-wide",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1",
					children: visibleBanner
				}), banner && bannerAction === "reload" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					outlined: true,
					onClick: () => window.location.reload(),
					children: "Reload page"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col gap-2 lg:flex-row lg:gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: termWrapRef,
					className: cn("relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg", "p-2 sm:p-3"),
					style: {
						backgroundColor: terminalBg,
						boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: hostRef,
							role: "region",
							"aria-label": "Chat terminal",
							className: "hermes-chat-xterm-host min-h-0 min-w-0 flex-1"
						}),
						showReconnectOverlay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-x-3 top-3 z-20 flex justify-center sm:inset-x-auto sm:right-3 sm:justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex max-w-[min(28rem,calc(100vw-3rem))] flex-col items-start gap-2 border border-warning/60 bg-black/80 px-3 py-2 text-xs text-warning shadow-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "tracking-wide",
									children: ptyState === "reconnecting" ? "Chat is reconnecting." : reconnectGaveUp ? PTY_GAVE_UP_BANNER.text : "Chat disconnected."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										outlined: true,
										onClick: reconnectPty,
										prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }),
										"aria-label": "Reconnect chat",
										children: "Reconnect now"
									}), ptyState === "closed" && reconnectGaveUp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										ghost: true,
										onClick: () => navigate("/system"),
										"aria-label": "Check server status",
										children: "Check server status"
									})]
								})]
							})
						}),
						showResumeLoadingOverlay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute inset-0 z-20 flex items-center justify-center",
							role: "status",
							"aria-live": "polite",
							"aria-label": "Please wait while the conversation loads…",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-w-[min(28rem,calc(100vw-3rem))] border border-current/30 bg-black/80 px-4 py-3 text-center text-xs tracking-wide text-white/85 shadow-lg",
								children: "Please wait while the conversation loads…"
							})
						}),
						ptyState === "ended" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-black/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-w-[min(32rem,calc(100vw-3rem))] text-center text-sm tracking-wide text-white/80",
								children: endedReason === "start-failed" ? "Chat could not start. The reason is printed above." : "Chat session ended. If you did not end it yourself, the agent may have crashed — open Logs to see why, or start a new session."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: startFreshPty,
									prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }),
									"aria-label": "Start a new chat session",
									children: "Start new session"
								}), endedReason === "exited" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									outlined: true,
									onClick: () => navigate("/logs"),
									"aria-label": "Open logs",
									children: "Open logs"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyLastButton, {
							onClick: handleCopyLast,
							copied: copyState === "copied",
							color: terminalFg
						}),
						chatPanelCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							ghost: true,
							onClick: toggleChatPanel,
							title: "Show side panel (model + sessions)",
							"aria-label": "Show chat side panel",
							className: cn("absolute z-10", "normal-case tracking-normal font-normal", "rounded border border-current/30", "bg-black/20", "opacity-70 hover:opacity-100 hover:border-current/60", "transition-opacity duration-150", "top-2 right-2 px-2 py-1 text-xs sm:top-3 sm:right-3"),
							style: { color: terminalFg },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRight, { className: "h-3 w-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden min-[400px]:inline tracking-wide",
									children: "panel"
								})]
							})
						})
					]
				}), !narrow && !chatPanelCollapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "chat-side-panel",
					role: "complementary",
					"aria-label": modelToolsLabel,
					className: "flex min-h-0 shrink-0 flex-col gap-3 overflow-hidden lg:h-full lg:w-60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 shrink-0 items-center justify-end pr-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								ghost: true,
								size: "icon",
								onClick: toggleChatPanel,
								"aria-label": "Collapse chat side panel",
								title: "Collapse side panel",
								className: "text-text-secondary hover:text-midground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatSidebar, {
								channel,
								profile: scopedProfile,
								onDashboardNewSessionRequest: startFreshDashboardChat,
								onSessionTitleChange: handleSessionTitleChange
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0 flex-1 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatSessionList, {
								activeSessionId: resumeParam,
								isActive,
								profile: scopedProfile,
								onNewChat: startFreshDashboardChat,
								workspaceCwd,
								onWorkspaceChange: setWorkspaceCwd
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "chat:bottom" })
		]
	});
}
//#endregion
export { ChatPage as default };
