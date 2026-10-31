import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, i as Link, m as require_react_dom, n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { A as Server, D as Share2, Ft as Download, Ht as Clock, K as Play, Lt as Database, P as RotateCw, Rt as Cpu, T as ShieldCheck, U as Plus, V as Power, Yt as Check, Zt as Brain, an as Activity, d as Upload, dt as Link2, g as Trash2, pt as KeyRound, r as X, v as Terminal, vt as HardDrive, x as Sparkles, y as Stethoscope, yt as Globe, zt as Copy } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, I as ConfirmDialog, L as Spinner, N as Select, P as SelectOption, a as H2, b as useConfirmDelete, f as Label, h as CardContent, k as Checkbox, m as Card, p as Input, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { r as themedBody, t as cn } from "./utils-XzxpPQdK.js";
import { r as useI18n } from "./i18n-Zn9FHQtI.js";
import { d as maybeReloadForLoopbackWsAuthFailure, l as apiErrorFromResponse, n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { a as sharedGatewayProfiles, d as useTheme, i as servedProfileRefusal, n as gatewayStateDescription, o as sharedGatewayRestartDescription, p as useProfileScope, r as gatewayStateNeedsLogs, s as sharedGatewayRestartedMessage, t as gatewayActionFailedMessage } from "./index-CeRydpmd.js";
import { t as useModalBehavior } from "./useModalBehavior-DSqJduTw.js";
import { a as o, i as Ke, r as L, t as Dl } from "./xterm-BNnjXmiT.js";
import { t as copyTextToClipboard } from "./clipboard-C-rbBxe_.js";
import { n as refitWhenTerminalFontLoads, t as TERMINAL_FONT_FAMILY } from "./terminal-font-refit-BbW1Op6j.js";
import { t as DeleteConfirmDialog } from "./DeleteConfirmDialog-CS54bGFr.js";
//#region web/src/components/HermesConsoleModal.tsx
var import_compiler_runtime = require_compiler_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var import_jsx_runtime = require_jsx_runtime();
function buildTerminalTheme(background, foreground) {
	return {
		background,
		foreground,
		cursor: foreground,
		cursorAccent: background,
		selectionBackground: "rgba(255, 255, 255, 0.25)",
		black: "#000000",
		red: "#ff5f67",
		green: "#5fffb0",
		yellow: "#ffd166",
		blue: "#7aa2ff",
		magenta: "#d597ff",
		cyan: "#58e6ff",
		white: foreground,
		brightBlack: "#666666",
		brightRed: "#ff8b90",
		brightGreen: "#8dffc8",
		brightYellow: "#ffe08a",
		brightBlue: "#9dbaff",
		brightMagenta: "#e4b7ff",
		brightCyan: "#8ef0ff",
		brightWhite: "#ffffff"
	};
}
function normalizeTerminalText(text) {
	return text.replace(/\r?\n/g, "\r\n");
}
function writeLine(term, text = "") {
	term.write(`${normalizeTerminalText(text)}\r\n`);
}
function writeBlock(term, text) {
	const normalized = normalizeTerminalText(text);
	term.write(normalized.endsWith("\r\n") ? normalized : `${normalized}\r\n`);
}
function isPrintable(data) {
	return data >= " " || data === "	";
}
function HermesConsoleModal({ open, onClose }) {
	const modalRef = useModalBehavior({
		open,
		onClose
	});
	const hostRef = (0, import_react.useRef)(null);
	const termRef = (0, import_react.useRef)(null);
	const wsRef = (0, import_react.useRef)(null);
	const lineRef = (0, import_react.useRef)("");
	const promptRef = (0, import_react.useRef)("hermes> ");
	const inputPromptRef = (0, import_react.useRef)("hermes> ");
	const historyRef = (0, import_react.useRef)([]);
	const historyIndexRef = (0, import_react.useRef)(null);
	const activeCommandRef = (0, import_react.useRef)(false);
	const pendingCommandRef = (0, import_react.useRef)(null);
	const hasReadyFrameRef = (0, import_react.useRef)(false);
	const [connectionState, setConnectionState] = (0, import_react.useState)("connecting");
	const [connectNonce, setConnectNonce] = (0, import_react.useState)(0);
	const [consoleProfile, setConsoleProfile] = (0, import_react.useState)("current");
	const { profile } = useProfileScope();
	const { theme } = useTheme();
	const redrawInput = (0, import_react.useCallback)((line = lineRef.current) => {
		const term = termRef.current;
		if (!term) return;
		lineRef.current = line;
		term.write(`\r\x1b[2K${inputPromptRef.current}${line}`);
	}, []);
	const showPrompt = (0, import_react.useCallback)(() => {
		const term_0 = termRef.current;
		if (!term_0) return;
		lineRef.current = "";
		historyIndexRef.current = null;
		inputPromptRef.current = promptRef.current;
		term_0.write(inputPromptRef.current);
	}, []);
	const sendFrame = (0, import_react.useCallback)((payload) => {
		const ws = wsRef.current;
		if (!ws || ws.readyState !== WebSocket.OPEN) return false;
		ws.send(JSON.stringify(payload));
		return true;
	}, []);
	const cancelCommand = (0, import_react.useCallback)(() => {
		pendingCommandRef.current = null;
		activeCommandRef.current = false;
		sendFrame({ type: "cancel" });
	}, [sendFrame]);
	const submitLine = (0, import_react.useCallback)((rawLine) => {
		const term_1 = termRef.current;
		if (!term_1) return;
		const line_0 = rawLine.trim();
		term_1.write("\r\n");
		lineRef.current = "";
		historyIndexRef.current = null;
		const pending = pendingCommandRef.current;
		if (pending) {
			const answer = line_0.toLowerCase();
			if (answer === "y" || answer === "yes") {
				pendingCommandRef.current = null;
				activeCommandRef.current = true;
				setConnectionState("running");
				sendFrame({
					type: "confirm",
					command: pending
				});
				return;
			}
			cancelCommand();
			return;
		}
		if (!line_0) {
			showPrompt();
			return;
		}
		historyRef.current = [...historyRef.current, line_0].slice(-200);
		activeCommandRef.current = true;
		setConnectionState("running");
		if (!sendFrame({
			type: "input",
			line: line_0
		})) {
			activeCommandRef.current = false;
			writeLine(term_1, "\x1B[31mConsole is not connected.\x1B[0m");
			showPrompt();
		}
	}, [
		cancelCommand,
		sendFrame,
		showPrompt
	]);
	const recallHistory = (0, import_react.useCallback)((direction) => {
		const history = historyRef.current;
		if (!history.length) return;
		const current = historyIndexRef.current;
		if (current === null) {
			if (direction > 0) return;
			historyIndexRef.current = history.length - 1;
		} else {
			const next = current + direction;
			if (next < 0) historyIndexRef.current = 0;
			else if (next >= history.length) {
				historyIndexRef.current = null;
				redrawInput("");
				return;
			} else historyIndexRef.current = next;
		}
		const idx = historyIndexRef.current;
		redrawInput(idx === null ? "" : history[idx] ?? "");
	}, [redrawInput]);
	const handleInputData = (0, import_react.useCallback)((data) => {
		const term_2 = termRef.current;
		if (!term_2) return;
		if (data === "\x1B[A") {
			recallHistory(-1);
			return;
		}
		if (data === "\x1B[B") {
			recallHistory(1);
			return;
		}
		for (const ch of data) {
			if (ch === "") {
				term_2.write("^C\r\n");
				if (activeCommandRef.current || pendingCommandRef.current) cancelCommand();
				else showPrompt();
				continue;
			}
			if (ch === "\f") {
				term_2.clear();
				showPrompt();
				continue;
			}
			if (activeCommandRef.current) {
				term_2.write("\x07");
				continue;
			}
			if (ch === "\r" || ch === "\n") {
				submitLine(lineRef.current);
				continue;
			}
			if (ch === "" || ch === "\b") {
				if (lineRef.current.length > 0) {
					lineRef.current = lineRef.current.slice(0, -1);
					term_2.write("\b \b");
				}
				continue;
			}
			if (ch === "\x1B") continue;
			if (isPrintable(ch)) {
				lineRef.current += ch;
				term_2.write(ch);
			}
		}
	}, [
		cancelCommand,
		recallHistory,
		showPrompt,
		submitLine
	]);
	const handleFrame = (0, import_react.useCallback)((frame) => {
		const term_3 = termRef.current;
		if (!term_3) return;
		if (frame.type === "ready") {
			const nextPrompt = frame.prompt || "hermes> ";
			promptRef.current = nextPrompt;
			inputPromptRef.current = nextPrompt;
			hasReadyFrameRef.current = true;
			setConsoleProfile(frame.profile || "current");
			activeCommandRef.current = false;
			setConnectionState("ready");
			term_3.clear();
			showPrompt();
			return;
		}
		if (frame.type === "output") {
			if (frame.data) writeBlock(term_3, frame.data);
			return;
		}
		if (frame.type === "error") {
			writeLine(term_3, `\x1b[31m${frame.message || "Command failed."}\x1b[0m`);
			return;
		}
		if (frame.type === "confirm_required") {
			pendingCommandRef.current = frame.command || "";
			activeCommandRef.current = false;
			setConnectionState("ready");
			if (frame.message) writeLine(term_3, `\x1b[33m${frame.message}\x1b[0m`);
			inputPromptRef.current = "Confirm? [y/N] ";
			lineRef.current = "";
			term_3.write(inputPromptRef.current);
			return;
		}
		if (frame.type === "complete") {
			activeCommandRef.current = false;
			if (frame.prompt) promptRef.current = frame.prompt;
			if (frame.status === "confirm_required") return;
			if (frame.status === "exit") {
				setConnectionState("closed");
				wsRef.current?.close();
				return;
			}
			if (frame.status === "timeout") writeLine(term_3, "\x1B[31mCommand timed out.\x1B[0m");
			if (frame.status === "cancelled") writeLine(term_3, "\x1B[33mCancelled.\x1B[0m");
			pendingCommandRef.current = null;
			setConnectionState("ready");
			showPrompt();
			return;
		}
		if (frame.type === "clear") {
			term_3.clear();
			showPrompt();
		}
	}, [showPrompt]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const host = hostRef.current;
		if (!host) return;
		let cancelled = false;
		let resizeFrame = 0;
		const term_4 = new Dl({
			allowProposedApi: true,
			cursorBlink: true,
			fontFamily: TERMINAL_FONT_FAMILY,
			fontSize: 13,
			lineHeight: 1.25,
			letterSpacing: 0,
			macOptionIsMeta: true,
			scrollback: 3e3,
			theme: buildTerminalTheme(theme.terminalBackground ?? "#000000", theme.terminalForeground ?? "#f0e6d2")
		});
		termRef.current = term_4;
		const fit = new o();
		term_4.loadAddon(fit);
		const unicode11 = new Ke();
		term_4.loadAddon(unicode11);
		term_4.unicode.activeVersion = "11";
		term_4.loadAddon(new L());
		term_4.open(host);
		term_4.focus();
		const fitTerminal = () => {
			if (!host.isConnected || host.clientWidth <= 0 || host.clientHeight <= 0) return;
			try {
				fit.fit();
			} catch {}
		};
		const scheduleFit = () => {
			if (resizeFrame) return;
			resizeFrame = requestAnimationFrame(() => {
				resizeFrame = 0;
				fitTerminal();
			});
		};
		const ro = new ResizeObserver(scheduleFit);
		ro.observe(host);
		scheduleFit();
		const stopFontRefit = refitWhenTerminalFontLoads(term_4, fitTerminal);
		const dataDisposable = term_4.onData(handleInputData);
		setConnectionState("connecting");
		setConsoleProfile(profile || "current");
		hasReadyFrameRef.current = false;
		writeLine(term_4, "\x1B[2mConnecting to Hermes Console...\x1B[0m");
		(async () => {
			try {
				const params = profile ? { profile } : void 0;
				const url = await api.buildWsUrl("/api/console", params);
				if (cancelled) return;
				const ws_0 = new WebSocket(url);
				wsRef.current = ws_0;
				ws_0.onopen = () => {
					setConnectionState("connecting");
				};
				ws_0.onmessage = (ev) => {
					try {
						const frame_0 = JSON.parse(String(ev.data));
						handleFrame(frame_0);
					} catch {
						writeLine(term_4, "\x1B[31mMalformed console frame.\x1B[0m");
					}
				};
				ws_0.onerror = () => {
					setConnectionState("error");
					writeLine(term_4, "\x1B[31mConsole websocket error.\x1B[0m");
				};
				ws_0.onclose = (ev_0) => {
					if (maybeReloadForLoopbackWsAuthFailure(ev_0.code)) return;
					wsRef.current = null;
					activeCommandRef.current = false;
					pendingCommandRef.current = null;
					if (cancelled) return;
					setConnectionState(ev_0.code === 1e3 ? "closed" : "error");
					console.warn(`[console] websocket closed code=${ev_0.code}${ev_0.reason ? ` reason=${ev_0.reason}` : ""}`);
					const message = ev_0.code === 1006 && !hasReadyFrameRef.current ? "Console could not connect to the dashboard server. Check that `hermes dashboard` is running, then click Reconnect." : ev_0.code === 1e3 ? "Console closed." : "Console disconnected from the dashboard server. Click Reconnect to try again.";
					writeLine(term_4, `\x1b[31m${message}\x1b[0m`);
				};
			} catch (err) {
				if (cancelled) return;
				setConnectionState("error");
				console.warn(`[console] connect failed: ${errorMessage(err)}`);
				writeLine(term_4, "\x1B[31mConsole could not connect to the dashboard server. Check that `hermes dashboard` is running, then click Reconnect.\x1B[0m");
			}
		})();
		return () => {
			cancelled = true;
			dataDisposable.dispose();
			ro.disconnect();
			if (resizeFrame) cancelAnimationFrame(resizeFrame);
			stopFontRefit();
			wsRef.current?.close();
			wsRef.current = null;
			term_4.dispose();
			termRef.current = null;
			lineRef.current = "";
			pendingCommandRef.current = null;
			activeCommandRef.current = false;
			hasReadyFrameRef.current = false;
		};
	}, [
		connectNonce,
		handleFrame,
		handleInputData,
		open,
		profile,
		theme
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const term_5 = termRef.current;
		if (!term_5) return;
		term_5.options.theme = buildTerminalTheme(theme.terminalBackground ?? "#000000", theme.terminalForeground ?? "#f0e6d2");
	}, [open, theme]);
	if (!open) return null;
	const statusTone = connectionState === "ready" ? "success" : connectionState === "running" ? "warning" : connectionState === "connecting" ? "secondary" : "destructive";
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: modalRef,
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-3 sm:p-4",
		onClick: (event) => event.target === event.currentTarget && onClose(),
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "hermes-console-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn(themedBody, "relative flex h-[min(82dvh,760px)] w-full max-w-5xl flex-col border border-border bg-card shadow-2xl"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex min-h-14 items-center gap-3 border-b border-border px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center border border-border bg-background/60 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "hermes-console-title",
							className: "font-mondwest text-display text-base tracking-wider",
							children: "Hermes Console"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: statusTone,
									children: connectionState
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: consoleProfile
								}),
								(connectionState === "closed" || connectionState === "error") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									outlined: true,
									onClick: () => {
										setConnectionState("connecting");
										setConnectNonce((n) => n + 1);
									},
									"aria-label": "Reconnect console",
									children: "Reconnect"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						ghost: true,
						size: "icon",
						onClick: onClose,
						className: "text-muted-foreground hover:text-foreground",
						"aria-label": "Close console",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 bg-black",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: hostRef,
					className: "h-full min-h-0 w-full overflow-hidden p-2 [&_.xterm]:h-full [&_.xterm-viewport]:!bg-transparent"
				})
			})]
		})
	}), document.body);
}
//#endregion
//#region web/src/pages/SystemPage.tsx
function formatBytes(n) {
	if (n < 1024) return `${n} B`;
	if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
	if (n < 1073741824) return `${(n / 1048576).toFixed(1)} MB`;
	return `${(n / 1073741824).toFixed(1)} GB`;
}
function formatDuration(seconds) {
	const d = Math.floor(seconds / 86400);
	const h = Math.floor(seconds % 86400 / 3600);
	const m = Math.floor(seconds % 3600 / 60);
	if (d > 0) return `${d}d ${h}h ${m}m`;
	if (h > 0) return `${h}h ${m}m`;
	return `${m}m`;
}
function backupImportLabel(target) {
	if (!target) return "the archive";
	return target.kind === "upload" ? target.file.name : target.path;
}
function backupFileName(path) {
	if (!path) return "No backup created yet";
	return path.split(/[\\/]/).filter(Boolean).pop() ?? path;
}
/**
* Live action-log viewer for the spawn-based admin actions (doctor, audit,
* backup, import, skills update, checkpoints prune, gateway start/stop).
* Polls /api/actions/<name>/status until the process exits.
*/
/** Badge for an available update; a rollback names the release it returns to. */
function updateBadge(info) {
	if (info.rollback_to) return `newer than v${info.rollback_to}`;
	return info.behind && info.behind > 0 ? `${info.behind} behind` : "update available";
}
function updateToast(info) {
	if (info.rollback_to && info.message) return info.message;
	return info.behind && info.behind > 0 ? `Update available — ${info.behind} commit${info.behind === 1 ? "" : "s"} behind` : "Update available";
}
function ActionLogViewer({ action, onClose, onComplete }) {
	const [lines, setLines] = (0, import_react.useState)([]);
	const [running, setRunning] = (0, import_react.useState)(true);
	const [exitCode, setExitCode] = (0, import_react.useState)(null);
	const timer = (0, import_react.useRef)(null);
	const completeRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		completeRef.current = false;
		const poll = async () => {
			try {
				const st = await api.getActionStatus(action, 400);
				if (cancelled) return;
				setLines(st.lines);
				setRunning(st.running);
				setExitCode(st.exit_code);
				if (!st.running && !completeRef.current) {
					completeRef.current = true;
					onComplete?.(action, st.exit_code);
				}
				if (st.running) timer.current = setTimeout(poll, 1200);
			} catch {
				if (!cancelled) setRunning(false);
			}
		};
		poll();
		return () => {
			cancelled = true;
			if (timer.current) clearTimeout(timer.current);
		};
	}, [action, onComplete]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-4 w-4 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-sm",
						children: action
					}),
					running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "warning",
						children: "running"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: exitCode === 0 ? "success" : "destructive",
						children: exitCode === 0 ? "done" : `exit ${exitCode}`
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				ghost: true,
				size: "icon",
				onClick: onClose,
				"aria-label": "Close log",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "max-h-72 overflow-auto whitespace-pre-wrap break-words bg-background/50 border border-border p-3 text-xs font-mono text-muted-foreground",
			children: lines.length ? lines.join("\n") : "Starting…"
		})]
	}) });
}
var HOOK_EVENTS_FALLBACK = [
	"pre_tool_call",
	"post_tool_call",
	"pre_llm_call",
	"post_llm_call",
	"on_session_start",
	"on_session_end"
];
var MEMORY_STATUS_LABEL = {
	ready: "ready",
	needs_config: "needs setup",
	unavailable: "unavailable",
	missing: "missing"
};
var MEMORY_STATUS_TONE = {
	ready: "success",
	needs_config: "warning",
	unavailable: "destructive",
	missing: "destructive"
};
function SystemPage() {
	const { toast, showToast } = useToast();
	const [status, setStatus] = (0, import_react.useState)(null);
	const [stats, setStats] = (0, import_react.useState)(null);
	const [memory, setMemory] = (0, import_react.useState)(null);
	const [pool, setPool] = (0, import_react.useState)([]);
	const [checkpoints, setCheckpoints] = (0, import_react.useState)(null);
	const [hooks, setHooks] = (0, import_react.useState)(null);
	const [curator, setCurator] = (0, import_react.useState)(null);
	const [portal, setPortal] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [activeAction, setActiveAction] = (0, import_react.useState)(null);
	const [consoleOpen, setConsoleOpen] = (0, import_react.useState)(false);
	const [migratePlan, setMigratePlan] = (0, import_react.useState)(null);
	const [credProvider, setCredProvider] = (0, import_react.useState)("openrouter");
	const [credKey, setCredKey] = (0, import_react.useState)("");
	const [credLabel, setCredLabel] = (0, import_react.useState)("");
	const [addingCred, setAddingCred] = (0, import_react.useState)(false);
	const [pendingBackupArchive, setPendingBackupArchive] = (0, import_react.useState)(null);
	const [downloadableBackupArchive, setDownloadableBackupArchive] = (0, import_react.useState)(null);
	const [downloadingBackup, setDownloadingBackup] = (0, import_react.useState)(false);
	const importUploadInputRef = (0, import_react.useRef)(null);
	const [importFile, setImportFile] = (0, import_react.useState)(null);
	const [importPath, setImportPath] = (0, import_react.useState)("");
	const [importingBackup, setImportingBackup] = (0, import_react.useState)(false);
	const [importConfirmTarget, setImportConfirmTarget] = (0, import_react.useState)(null);
	const [hookModalOpen, setHookModalOpen] = (0, import_react.useState)(false);
	const closeHookModal = (0, import_react.useCallback)(() => setHookModalOpen(false), []);
	const hookModalRef = useModalBehavior({
		open: hookModalOpen,
		onClose: closeHookModal
	});
	const [hookEvent, setHookEvent] = (0, import_react.useState)("pre_tool_call");
	const [hookCommand, setHookCommand] = (0, import_react.useState)("");
	const [hookMatcher, setHookMatcher] = (0, import_react.useState)("");
	const [hookTimeout, setHookTimeout] = (0, import_react.useState)("");
	const [hookApprove, setHookApprove] = (0, import_react.useState)(true);
	const [creatingHook, setCreatingHook] = (0, import_react.useState)(false);
	const [updateInfo, setUpdateInfo] = (0, import_react.useState)(null);
	const [checkingUpdate, setCheckingUpdate] = (0, import_react.useState)(false);
	const [updateConfirmOpen, setUpdateConfirmOpen] = (0, import_react.useState)(false);
	const loadAll = (0, import_react.useCallback)(() => {
		Promise.allSettled([
			api.getStatus(),
			api.getSystemStats(),
			api.getMemory(),
			api.getCredentialPool(),
			api.getCheckpoints(),
			api.getHooks(),
			api.getCurator(),
			api.getPortal(),
			api.checkHermesUpdate(false),
			api.getGatewayMigratePlan()
		]).then(([s, st, m, p, c, h, cur, prt, upd, mig]) => {
			if (s.status === "fulfilled") setStatus(s.value);
			if (st.status === "fulfilled") setStats(st.value);
			if (m.status === "fulfilled") setMemory(m.value);
			if (p.status === "fulfilled") setPool(p.value.providers);
			if (c.status === "fulfilled") setCheckpoints(c.value);
			if (h.status === "fulfilled") setHooks(h.value);
			if (cur.status === "fulfilled") setCurator(cur.value);
			if (prt.status === "fulfilled") setPortal(prt.value);
			if (upd.status === "fulfilled") setUpdateInfo(upd.value);
			if (mig.status === "fulfilled") setMigratePlan(mig.value);
		}).finally(() => setLoading(false));
	}, []);
	(0, import_react.useEffect)(() => {
		loadAll();
	}, [loadAll]);
	const sharedGateway = sharedGatewayProfiles(status);
	const [sharedRestartOpen, setSharedRestartOpen] = (0, import_react.useState)(false);
	const [servedNotice, setServedNotice] = (0, import_react.useState)(null);
	const runGateway = async (verb) => {
		setServedNotice(null);
		try {
			if (verb === "start") {
				await api.startGateway();
				setActiveAction("gateway-start");
			} else if (verb === "stop") {
				await api.stopGateway();
				setActiveAction("gateway-stop");
			} else {
				await api.restartGateway();
				setActiveAction("gateway-restart");
			}
			showToast(`Gateway ${verb} started`, "success");
			setTimeout(loadAll, 3e3);
			return true;
		} catch (e) {
			const refusal = servedProfileRefusal(e);
			if (refusal) {
				setServedNotice(refusal);
				return false;
			}
			showToast(gatewayActionFailedMessage(verb, errorMessage(e), e), "error");
			return false;
		}
	};
	const requestRestart = () => {
		if (sharedGateway) {
			setSharedRestartOpen(true);
			return;
		}
		runGateway("restart");
	};
	const restartShared = async () => {
		const bots = sharedGateway?.length ?? 0;
		if (!await runGateway("restart")) return;
		for (let attempt = 0; attempt < 18; attempt += 1) {
			await new Promise((r) => setTimeout(r, 1200));
			const st_0 = await api.getActionStatus("gateway-restart", 1).catch(() => null);
			if (st_0 && !st_0.running) {
				if (st_0.exit_code != null && st_0.exit_code !== 0) return;
				break;
			}
		}
		showToast(sharedGatewayRestartedMessage(bots), "success");
	};
	const migrateToMultiplex = async () => {
		try {
			await api.migrateGatewayToMultiplex();
			setActiveAction("gateway-migrate");
			showToast("Migrating to a single multiplexed gateway", "success");
			setTimeout(loadAll, 5e3);
		} catch (e_0) {
			showToast(`Gateway migration failed: ${errorMessage(e_0)}`, "error");
		}
	};
	const toggleCuratorPaused = async () => {
		if (!curator) return;
		try {
			await api.setCuratorPaused(!curator.paused);
			showToast(curator.paused ? "Curator resumed" : "Curator paused", "success");
			loadAll();
		} catch (e_1) {
			showToast(`Curator toggle failed: ${errorMessage(e_1)}`, "error");
		}
	};
	const memoryReset = useConfirmDelete({ onDelete: (0, import_react.useCallback)(async (target) => {
		try {
			const res = await api.resetMemory(target);
			showToast(`Reset: ${res.deleted.join(", ") || "nothing"}`, "success");
			loadAll();
		} catch (e_2) {
			showToast(`Reset failed: ${errorMessage(e_2)}`, "error");
			throw e_2;
		}
	}, [loadAll, showToast]) });
	const addCredential = async () => {
		if (!credProvider.trim() || !credKey.trim()) {
			showToast("Provider and API key required", "error");
			return;
		}
		setAddingCred(true);
		try {
			await api.addCredentialPoolEntry(credProvider.trim(), credKey.trim(), credLabel.trim() || void 0);
			showToast("Credential added", "success");
			setCredKey("");
			setCredLabel("");
			loadAll();
		} catch (e_3) {
			showToast(`Failed to add credential: ${errorMessage(e_3)}`, "error");
		} finally {
			setAddingCred(false);
		}
	};
	const credDelete = useConfirmDelete({ onDelete: (0, import_react.useCallback)(async (key) => {
		const [provider, idxStr] = key.split("|");
		try {
			await api.removeCredentialPoolEntry(provider, Number(idxStr));
			showToast("Credential removed", "success");
			loadAll();
		} catch (e_4) {
			showToast(`Failed to remove: ${errorMessage(e_4)}`, "error");
			throw e_4;
		}
	}, [loadAll, showToast]) });
	const runOp = async (fn, label) => {
		try {
			const res_0 = await fn();
			setActiveAction(res_0.name);
			showToast(`${label} started`, "success");
		} catch (e_5) {
			showToast(`${label} failed: ${errorMessage(e_5)}`, "error");
		}
	};
	const runDashboardBackup = async () => {
		try {
			const res_1 = await api.runBackup();
			setActiveAction(res_1.name);
			setPendingBackupArchive(res_1.archive ?? null);
			setDownloadableBackupArchive(null);
			showToast("Backup started", "success");
		} catch (e_6) {
			showToast(`Backup failed: ${errorMessage(e_6)}`, "error");
		}
	};
	const handleActionComplete = (0, import_react.useCallback)((action, exitCode) => {
		if (action === "backup" && pendingBackupArchive) {
			if (exitCode === 0) {
				setDownloadableBackupArchive(pendingBackupArchive);
				showToast("Backup ready to download", "success");
			} else setPendingBackupArchive(null);
		}
	}, [pendingBackupArchive, showToast]);
	const downloadBackup = async () => {
		const archive = downloadableBackupArchive;
		if (!archive) return;
		setDownloadingBackup(true);
		try {
			const res_2 = await api.downloadBackup(archive);
			if (!res_2.ok) throw apiErrorFromResponse(res_2.status, await res_2.text().catch(() => ""), res_2.url);
			const blob = await res_2.blob();
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = backupFileName(archive);
			document.body.appendChild(link);
			link.click();
			link.remove();
			URL.revokeObjectURL(url);
		} catch (e_7) {
			showToast(`Download failed: ${errorMessage(e_7)}`, "error");
		} finally {
			setDownloadingBackup(false);
		}
	};
	const clearImportFile = () => {
		setImportFile(null);
		if (importUploadInputRef.current) importUploadInputRef.current.value = "";
	};
	const runBackupImport = async (target_0) => {
		setImportingBackup(true);
		try {
			const res_3 = target_0.kind === "upload" ? await api.runImportUpload(target_0.file, true) : await api.runImport(target_0.path, true);
			setActiveAction(res_3.name);
			showToast("Import started", "success");
			if (target_0.kind === "upload") clearImportFile();
		} catch (e_8) {
			showToast(`Import failed: ${errorMessage(e_8)}`, "error");
		} finally {
			setImportingBackup(false);
		}
	};
	const [shareRedact, setShareRedact] = (0, import_react.useState)(true);
	const [sharing, setSharing] = (0, import_react.useState)(false);
	const [shareResult, setShareResult] = (0, import_react.useState)(null);
	const [copiedLabel, setCopiedLabel] = (0, import_react.useState)(null);
	const copyToClipboard = (0, import_react.useCallback)(async (text, label_0) => {
		if (await copyTextToClipboard(text)) {
			setCopiedLabel(label_0);
			setTimeout(() => setCopiedLabel((cur_0) => cur_0 === label_0 ? null : cur_0), 1500);
		} else showToast("Couldn't copy to clipboard", "error");
	}, [showToast]);
	const runDebugShare = (0, import_react.useCallback)(async () => {
		setSharing(true);
		setShareResult(null);
		try {
			const res_4 = await api.runDebugShare({ redact: shareRedact });
			setShareResult(res_4);
			const n = Object.keys(res_4.urls).length;
			showToast(`Uploaded ${n} paste${n === 1 ? "" : "s"}${res_4.redacted ? " (redacted)" : ""}`, "success");
		} catch (e_9) {
			showToast(`Debug share failed: ${errorMessage(e_9)}`, "error");
		} finally {
			setSharing(false);
		}
	}, [shareRedact, showToast]);
	const checkForUpdate = (0, import_react.useCallback)(async (force = false) => {
		if (status?.can_update_hermes === false) return;
		setCheckingUpdate(true);
		try {
			const info = await api.checkHermesUpdate(force);
			setUpdateInfo(info);
			if (force) {
				if (info.update_available) showToast(updateToast(info), "success");
				else if (info.behind === 0) showToast("You're on the latest version", "success");
				else if (info.message) showToast(info.message, "error");
			}
		} catch (e_10) {
			showToast(`Update check failed: ${errorMessage(e_10)}`, "error");
		} finally {
			setCheckingUpdate(false);
		}
	}, [showToast, status?.can_update_hermes]);
	const applyUpdate = async () => {
		setUpdateConfirmOpen(false);
		if (status?.can_update_hermes === false) {
			showToast("Hermes updates are managed outside this dashboard.", "success");
			return;
		}
		try {
			const resp = await api.updateHermes();
			if (!resp.ok) {
				showToast(resp.message ?? "Updates don't apply from this dashboard.", "success");
				return;
			}
			setActiveAction(resp.name ?? "hermes-update");
			showToast("Update started", "success");
		} catch (e_11) {
			showToast(`Update failed: ${errorMessage(e_11)}`, "error");
		}
	};
	const checkpointsPrune = useConfirmDelete({ onDelete: (0, import_react.useCallback)(async () => {
		try {
			const res_5 = await api.pruneCheckpoints();
			setActiveAction(res_5.name);
			showToast("Checkpoint prune started", "success");
		} catch (e_12) {
			showToast(`Prune failed: ${errorMessage(e_12)}`, "error");
			throw e_12;
		}
	}, [showToast]) });
	const createHook = async () => {
		if (!hookCommand.trim()) {
			showToast("Command is required", "error");
			return;
		}
		setCreatingHook(true);
		try {
			await api.createHook({
				event: hookEvent,
				command: hookCommand.trim(),
				matcher: hookMatcher.trim() || void 0,
				timeout: hookTimeout.trim() ? Number(hookTimeout) : void 0,
				approve: hookApprove
			});
			showToast("Hook created", "success");
			setHookCommand("");
			setHookMatcher("");
			setHookTimeout("");
			setHookModalOpen(false);
			loadAll();
		} catch (e_13) {
			showToast(`Failed to create hook: ${errorMessage(e_13)}`, "error");
		} finally {
			setCreatingHook(false);
		}
	};
	const hookDelete = useConfirmDelete({ onDelete: (0, import_react.useCallback)(async (key_0) => {
		const sep = key_0.indexOf("|");
		const event = key_0.slice(0, sep);
		const command = key_0.slice(sep + 1);
		try {
			await api.deleteHook(event, command);
			showToast("Hook removed", "success");
			loadAll();
		} catch (e_14) {
			showToast(`Failed to remove hook: ${errorMessage(e_14)}`, "error");
			throw e_14;
		}
	}, [loadAll, showToast]) });
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-2xl text-primary" })
	});
	const gatewayRunning = status?.gateway_running;
	const canUpdateHermes = status?.can_update_hermes !== false;
	const validEvents = hooks?.valid_events?.length ? hooks.valid_events : HOOK_EVENTS_FALLBACK;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: importUploadInputRef,
				type: "file",
				accept: ".zip,application/zip,application/x-zip-compressed",
				className: "hidden",
				onChange: (event_0) => {
					setImportFile(event_0.currentTarget.files?.[0] ?? null);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: sharedRestartOpen,
				onCancel: () => setSharedRestartOpen(false),
				onConfirm: () => {
					setSharedRestartOpen(false);
					restartShared();
				},
				title: "Restart the shared gateway?",
				description: sharedGatewayRestartDescription(sharedGateway ?? []),
				confirmLabel: "Restart all"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: canUpdateHermes && updateConfirmOpen,
				onCancel: () => setUpdateConfirmOpen(false),
				onConfirm: () => void applyUpdate(),
				title: "Update Hermes?",
				description: updateInfo && updateInfo.behind && updateInfo.behind > 0 ? `This will run 'hermes update' (${updateInfo.update_command}) and pull ${updateInfo.behind} new commit${updateInfo.behind === 1 ? "" : "s"}. The gateway restarts when the update finishes; the current session keeps its prompt cache until then.` : `This will run 'hermes update' (${updateInfo?.update_command ?? "hermes update"}) and restart the gateway when it finishes.`,
				confirmLabel: "Update now"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: memoryReset.isOpen,
				onCancel: memoryReset.cancel,
				onConfirm: memoryReset.confirm,
				title: "Reset memory",
				description: "This permanently erases the selected built-in memory files. This cannot be undone.",
				loading: memoryReset.isDeleting
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: credDelete.isOpen,
				onCancel: credDelete.cancel,
				onConfirm: credDelete.confirm,
				title: "Remove credential",
				description: "Remove this pooled API key? The agent will no longer rotate through it.",
				loading: credDelete.isDeleting
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: checkpointsPrune.isOpen,
				onCancel: checkpointsPrune.cancel,
				onConfirm: checkpointsPrune.confirm,
				title: "Prune checkpoints",
				description: "Delete the rollback checkpoint shadow store? Existing /rollback points will be lost.",
				loading: checkpointsPrune.isDeleting
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: hookDelete.isOpen,
				onCancel: hookDelete.cancel,
				onConfirm: hookDelete.confirm,
				title: "Remove shell hook",
				description: "Remove this hook from config and revoke its consent? It stops firing on the next restart.",
				loading: hookDelete.isDeleting
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HermesConsoleModal, {
				open: consoleOpen,
				onClose: () => setConsoleOpen(false)
			}),
			hookModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: hookModalRef,
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4",
				onClick: (e_15) => e_15.target === e_15.currentTarget && setHookModalOpen(false),
				role: "dialog",
				"aria-modal": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("font-mondwest normal-case", "relative w-full max-w-lg border border-border bg-card shadow-2xl flex flex-col"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							ghost: true,
							size: "icon",
							onClick: () => setHookModalOpen(false),
							className: "absolute right-2 top-2 text-muted-foreground hover:text-foreground",
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
							className: "p-5 pb-3 border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-mondwest text-display text-base tracking-wider",
								children: "New shell hook"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "hook-event",
										children: "Event"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										id: "hook-event",
										value: hookEvent,
										onValueChange: (v) => setHookEvent(v),
										children: validEvents.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
											value: ev,
											children: ev
										}, ev))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "hook-command",
										children: "Command (absolute path)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "hook-command",
										autoFocus: true,
										placeholder: "/usr/local/bin/my-hook.sh",
										value: hookCommand,
										onChange: (e_16) => setHookCommand(e_16.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "hook-matcher",
											children: "Matcher (optional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "hook-matcher",
											placeholder: "e.g. terminal",
											value: hookMatcher,
											onChange: (e_17) => setHookMatcher(e_17.target.value)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "hook-timeout",
											children: "Timeout (s)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "hook-timeout",
											placeholder: "10",
											value: hookTimeout,
											onChange: (e_18) => setHookTimeout(e_18.target.value)
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: hookApprove,
										id: "hook-approve",
										onCheckedChange: (checked) => setHookApprove(checked === true)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "cursor-pointer text-sm font-normal normal-case tracking-normal text-muted-foreground",
										htmlFor: "hook-approve",
										children: "Approve now (grant consent so it fires; otherwise it stays configured but inactive)"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-warning",
									children: "Shell hooks run arbitrary commands on this host. Only add scripts you trust. Takes effect on the next gateway/session restart."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "uppercase",
										size: "sm",
										onClick: createHook,
										disabled: creatingHook,
										prefix: creatingHook ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
										children: creatingHook ? "Creating" : "Create hook"
									})
								})
							]
						})
					]
				})
			}),
			activeAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionLogViewer, {
				action: activeAction,
				onComplete: handleActionComplete,
				onClose: () => setActiveAction(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
					variant: "sm",
					className: "flex items-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "h-4 w-4" }), " Host"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-wider text-muted-foreground",
									children: "OS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									stats?.os,
									" ",
									stats?.os_release
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-wider text-muted-foreground",
									children: "Arch"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: stats?.arch })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-wider text-muted-foreground",
									children: "Host"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate",
									children: stats?.hostname
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-wider text-muted-foreground",
									children: "Python"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									stats?.python_impl,
									" ",
									stats?.python_version
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-wider text-muted-foreground",
									children: "Hermes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["v", stats?.hermes_version] }), canUpdateHermes && updateInfo && (updateInfo.update_available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "warning",
										children: updateBadge(updateInfo)
									}) : updateInfo.behind === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "success",
										children: "latest"
									}) : null)]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-3 w-3" }), " CPU"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									stats?.cpu_count ?? "—",
									" cores",
									typeof stats?.cpu_percent === "number" ? ` · ${stats.cpu_percent.toFixed(0)}%` : ""
								] })] }),
								stats?.memory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-wider text-muted-foreground",
									children: "Memory"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									formatBytes(stats.memory.used),
									" / ",
									formatBytes(stats.memory.total),
									" (",
									stats.memory.percent,
									"%)"
								] })] }),
								stats?.disk && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { className: "h-3 w-3" }), " Disk"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									formatBytes(stats.disk.used),
									" / ",
									formatBytes(stats.disk.total),
									" (",
									stats.disk.percent,
									"%)"
								] })] }),
								typeof stats?.uptime_seconds === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-wider text-muted-foreground",
									children: "Uptime"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: formatDuration(stats.uptime_seconds) })] }),
								stats?.load_avg && stats.load_avg.length >= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-wider text-muted-foreground",
									children: "Load avg"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: stats.load_avg.map((n_0) => n_0.toFixed(2)).join(" / ") })] })
							]
						}),
						stats && !stats.psutil && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [
								"Install the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: "psutil"
								}),
								" extra for CPU / memory / disk metrics."
							]
						}),
						canUpdateHermes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									ghost: true,
									disabled: checkingUpdate,
									prefix: checkingUpdate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3.5 w-3.5" }),
									onClick: () => void checkForUpdate(true),
									children: "Check for updates"
								}),
								updateInfo?.update_available && updateInfo.can_apply && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }),
									onClick: () => setUpdateConfirmOpen(true),
									children: "Update now"
								}),
								updateInfo && !updateInfo.can_apply && updateInfo.update_available && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										"Update with",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono",
											children: updateInfo.update_command
										})
									]
								}),
								updateInfo?.message && !updateInfo.update_available && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: updateInfo.message
								})
							]
						})
					]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
					variant: "sm",
					className: "flex items-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-4 w-4" }), " Nous Portal"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: portal?.logged_in ? "success" : "secondary",
									children: portal?.logged_in ? "logged in" : "not logged in"
								}),
								portal?.provider && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted-foreground",
									children: ["inference provider: ", portal.provider]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: portal?.subscription_url || "https://portal.nousresearch.com/manage-subscription",
									target: "_blank",
									rel: "noreferrer",
									className: "ml-auto text-xs text-primary underline",
									children: "Manage subscription"
								})
							]
						}),
						portal?.features && portal.features.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1 border-t border-border pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: "Tool Gateway routing"
							}), portal.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: f.state
								})]
							}, f.label))]
						}),
						!portal?.logged_in && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Log in with ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: "hermes portal"
								}),
								"."
							]
						})
					]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
					variant: "sm",
					className: "flex items-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Skill curator"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex items-center justify-between py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: curator?.paused ? "warning" : curator?.enabled ? "success" : "secondary",
							children: curator?.paused ? "paused" : curator?.enabled ? "active" : "disabled"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted-foreground",
							children: [curator?.interval_hours ? `every ${curator.interval_hours}h` : "", curator?.last_run_at ? ` · last run ${new Date(curator.last_run_at).toLocaleString()}` : " · never run"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							ghost: true,
							onClick: toggleCuratorPaused,
							children: curator?.paused ? "Resume" : "Pause"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							ghost: true,
							prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5" }),
							onClick: () => runOp(api.runCurator, "Curator review"),
							children: "Run now"
						})]
					})]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
					variant: "sm",
					className: "flex items-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, { className: "h-4 w-4" }), " Gateway"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex items-center justify-between py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: gatewayRunning ? "success" : "secondary",
									children: gatewayRunning ? "running" : "stopped"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: gatewayStateDescription(status?.gateway_state, gatewayRunning)
								}),
								gatewayStateNeedsLogs(status?.gateway_state) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/logs?file=gateway",
									className: "text-sm underline",
									children: "Open logs"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: "uppercase",
									onClick: () => runGateway("start"),
									disabled: gatewayRunning,
									prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5" }),
									children: "Start"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: "uppercase",
									onClick: requestRestart,
									prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3.5 w-3.5" }),
									children: "Restart"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: "uppercase text-warning",
									ghost: true,
									onClick: () => runGateway("stop"),
									disabled: !gatewayRunning,
									prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, { className: "h-3.5 w-3.5" }),
									children: "Stop"
								})
							]
						})]
					}),
					(sharedGateway || servedNotice) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "border-t border-current/10 py-3 text-xs text-muted-foreground",
						"data-slot": "shared-gateway-notice",
						children: servedNotice ?? `Served by the shared gateway with ${sharedGateway.join(", ")}.`
					}),
					migratePlan && !migratePlan.already_multiplexed && migratePlan.profiles.length > 1 && (migratePlan.eligible || migratePlan.blockers.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-2 border-t border-border py-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Your profiles each run their own gateway. One multiplexed gateway serves every profile from a single process."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								className: "uppercase",
								onClick: migrateToMultiplex,
								disabled: !migratePlan.eligible,
								title: migratePlan.eligible ? void 0 : "Fix the blockers below first",
								children: "Migrate to a single multiplexed gateway"
							})]
						}), migratePlan.blockers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-warning",
							children: ["• ", b]
						}, b))]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemorySection, {
				memory,
				onReset: memoryReset.requestDelete
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
					variant: "sm",
					className: "flex items-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-4 w-4" }), " Credential pool"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 sm:grid-cols-4 gap-3 items-end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "cred-provider",
										children: "Provider"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cred-provider",
										value: credProvider,
										onChange: (e_19) => setCredProvider(e_19.target.value),
										placeholder: "openrouter"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "cred-key",
										children: "API key"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cred-key",
										type: "password",
										value: credKey,
										onChange: (e_20) => setCredKey(e_20.target.value),
										placeholder: "sk-…"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "cred-label",
										children: "Label"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cred-label",
										value: credLabel,
										onChange: (e_21) => setCredLabel(e_21.target.value),
										placeholder: "optional"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								className: "uppercase",
								onClick: addCredential,
								disabled: addingCred,
								prefix: addingCred ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
								children: "Add key"
							})
						}),
						pool.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No pooled credentials. Add one above to enable key rotation."
						}),
						pool.map((prov) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: prov.provider
							}), prov.entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 border border-border bg-background/40 px-3 py-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: entry.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-muted-foreground",
										children: entry.token_preview
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "outline",
										children: entry.auth_type
									}),
									entry.last_status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "secondary",
										children: entry.last_status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										size: "icon",
										className: "ml-auto text-destructive",
										"aria-label": "Remove credential",
										onClick: () => credDelete.requestDelete(`${prov.provider}|${entry.index}`),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
									})
								]
							}, `${prov.provider}-${entry.index}`))]
						}, prov.provider))
					]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
						variant: "sm",
						className: "flex items-center gap-2 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" }), " Operations"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-wrap gap-2 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								ghost: true,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-3.5 w-3.5" }),
								onClick: () => setConsoleOpen(true),
								children: "Open console"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								ghost: true,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { className: "h-3.5 w-3.5" }),
								onClick: () => runOp(api.runDoctor, "Doctor"),
								children: "Run doctor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								ghost: true,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }),
								onClick: () => runOp(api.runSecurityAudit, "Security audit"),
								children: "Security audit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								ghost: true,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3.5 w-3.5" }),
								onClick: () => runOp(api.updateSkillsFromHub, "Skills update"),
								children: "Update skills"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								ghost: true,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3.5 w-3.5" }),
								onClick: () => runOp(api.runPromptSize, "Prompt size"),
								children: "Prompt size"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								ghost: true,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-3.5 w-3.5" }),
								onClick: () => runOp(api.runDump, "Support dump"),
								children: "Support dump"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								ghost: true,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3.5 w-3.5" }),
								onClick: () => runOp(api.runConfigMigrate, "Config migrate"),
								children: "Migrate config"
							})
						]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-3 lg:flex-row lg:items-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid min-w-0 flex-1 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full backup" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												ghost: true,
												prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-3.5 w-3.5" }),
												onClick: () => void runDashboardBackup(),
												children: "Create backup"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												ghost: true,
												disabled: !downloadableBackupArchive || downloadingBackup,
												prefix: downloadingBackup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }),
												onClick: () => void downloadBackup(),
												children: "Download backup"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "min-w-0 truncate text-xs text-muted-foreground",
												title: pendingBackupArchive ?? "No backup created yet",
												children: backupFileName(pendingBackupArchive)
											})
										]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid min-w-0 flex-1 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Restore from backup upload" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											size: "sm",
											ghost: true,
											disabled: importingBackup,
											prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" }),
											onClick: () => importUploadInputRef.current?.click(),
											children: "Choose restore zip"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 truncate text-xs text-muted-foreground",
											title: importFile?.name ?? "No backup archive selected",
											children: importFile?.name ?? "No backup archive selected"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									ghost: true,
									disabled: !importFile || importingBackup,
									prefix: importingBackup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
									onClick: () => {
										if (!importFile) return;
										setImportConfirmTarget({
											kind: "upload",
											file: importFile
										});
									},
									children: "Restore upload"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid min-w-0 flex-1 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "import-path",
										children: "Restore from backups path"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "import-path",
										value: importPath,
										onChange: (e_22) => setImportPath(e_22.target.value),
										placeholder: "$HERMES_HOME/backups/hermes-backup.zip"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									ghost: true,
									disabled: !importPath.trim() || importingBackup,
									prefix: importingBackup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
									onClick: () => {
										const path = importPath.trim();
										if (!path) return;
										setImportConfirmTarget({
											kind: "path",
											path
										});
									},
									children: "Restore path"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
								open: !!importConfirmTarget,
								title: "Restore full Hermes backup?",
								description: `This will overwrite your current Hermes configuration, skills, sessions, and data with the contents of ${backupImportLabel(importConfirmTarget)}. This cannot be undone.`,
								destructive: true,
								confirmLabel: "Restore",
								cancelLabel: "Cancel",
								onCancel: () => setImportConfirmTarget(null),
								onConfirm: () => {
									const target_1 = importConfirmTarget;
									setImportConfirmTarget(null);
									if (target_1) runBackupImport(target_1);
								}
							})
						]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-3 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4 mt-0.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: "Share debug report"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground max-w-prose",
											children: "Uploads system info + logs to a public paste service and returns links to send the Hermes team. Pastes auto-delete after 6 hours."
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									disabled: sharing,
									prefix: sharing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-3.5 w-3.5" }),
									onClick: () => void runDebugShare(),
									children: sharing ? "Uploading…" : "Generate share link"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: shareRedact,
									disabled: sharing,
									id: "share-redact",
									onCheckedChange: (checked_0) => setShareRedact(checked_0 === true)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "cursor-pointer select-none text-xs font-normal normal-case tracking-normal text-muted-foreground",
									htmlFor: "share-redact",
									children: "Redact credential-shaped tokens before upload (recommended)"
								})]
							}),
							shareResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 border-t border-border pt-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: "success",
													children: "uploaded"
												}),
												shareResult.redacted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: "outline",
													children: "redacted"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: "warning",
													children: "not redacted"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1 text-xs text-muted-foreground",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
														"auto-deletes in",
														" ",
														Math.round(shareResult.auto_delete_seconds / 3600),
														"h"
													]
												})
											]
										}), Object.keys(shareResult.urls).length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											ghost: true,
											prefix: copiedLabel === "__all__" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }),
											onClick: () => void copyToClipboard(Object.entries(shareResult.urls).map(([label_1, url_0]) => `${label_1}: ${url_0}`).join("\n"), "__all__"),
											children: "Copy all"
										})]
									}),
									Object.entries(shareResult.urls).map(([label_2, url_1]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 bg-background/50 border border-border px-3 py-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-xs shrink-0 w-24 truncate text-muted-foreground",
												children: label_2
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: url_1,
												target: "_blank",
												rel: "noreferrer",
												className: "font-mono text-xs truncate flex-1 text-primary hover:underline",
												children: url_1
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												ghost: true,
												size: "icon",
												"aria-label": `Copy ${label_2} link`,
												onClick: () => void copyToClipboard(url_1, label_2),
												children: copiedLabel === label_2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {})
											})
										]
									}, label_2)),
									shareResult.failures.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-destructive",
										children: ["Some logs failed to upload: ", shareResult.failures.join("; ")]
									})
								]
							})
						]
					}) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
					variant: "sm",
					className: "flex items-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-4 w-4" }), " Checkpoints"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex items-center justify-between py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted-foreground",
						children: [
							checkpoints?.sessions.length ?? 0,
							" session(s) ·",
							" ",
							formatBytes(checkpoints?.total_bytes ?? 0)
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						ghost: true,
						className: "text-destructive",
						disabled: !checkpoints?.sessions.length,
						prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }),
						onClick: () => checkpointsPrune.requestDelete("all"),
						children: "Prune"
					})]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
							variant: "sm",
							className: "flex items-center gap-2 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-4 w-4" }), " Shell hooks"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							className: "uppercase",
							prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }),
							onClick: () => setHookModalOpen(true),
							children: "New hook"
						})]
					}),
					(!hooks || hooks.hooks.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "py-6 text-center text-sm text-muted-foreground",
						children: "No shell hooks configured."
					}) }),
					hooks?.hooks.map((h_0, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex items-center gap-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "outline",
								children: h_0.event
							}),
							h_0.matcher && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: ["matcher: ", h_0.matcher]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs truncate flex-1",
								children: h_0.command
							}),
							h_0.executable === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "destructive",
								children: "not executable"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: h_0.allowed ? "success" : "warning",
								children: h_0.allowed ? "allowed" : "not approved"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								ghost: true,
								size: "icon",
								className: "text-destructive",
								"aria-label": "Remove hook",
								onClick: () => hookDelete.requestDelete(`${h_0.event}|${h_0.command ?? ""}`),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
							})
						]
					}) }, `${h_0.event}-${i}`))
				]
			})
		]
	});
}
/** Memory card: which provider is active and the always-on built-in layer (#145175). */
function MemorySection(t0) {
	const $ = (0, import_compiler_runtime.c)(49);
	const { memory, onReset } = t0;
	const { t } = useI18n();
	let t1;
	if ($[0] !== memory) {
		t1 = memory?.active ? memory.providers.find((provider) => provider.name === memory.active) : null;
		$[0] = memory;
		$[1] = t1;
	} else t1 = $[1];
	const activeMemoryProvider = t1;
	let t2;
	if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
			variant: "sm",
			className: "flex items-center gap-2 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4 w-4" }), " Memory"]
		});
		$[2] = t2;
	} else t2 = $[2];
	const t3 = memory?.active || t.systemMemory.noProvider;
	let t4;
	if ($[3] !== t3) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-foreground",
			children: t3
		});
		$[3] = t3;
		$[4] = t4;
	} else t4 = $[4];
	let t5;
	if ($[5] !== t.systemMemory.activeProvider || $[6] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			t.systemMemory.activeProvider,
			":",
			" ",
			t4
		] });
		$[5] = t.systemMemory.activeProvider;
		$[6] = t4;
		$[7] = t5;
	} else t5 = $[7];
	let t6;
	if ($[8] !== activeMemoryProvider) {
		t6 = activeMemoryProvider && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: MEMORY_STATUS_TONE[activeMemoryProvider.status],
			children: MEMORY_STATUS_LABEL[activeMemoryProvider.status]
		});
		$[8] = activeMemoryProvider;
		$[9] = t6;
	} else t6 = $[9];
	let t7;
	if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/plugins",
			className: "underline",
			children: "Change in Plugins →"
		});
		$[10] = t7;
	} else t7 = $[10];
	let t8;
	if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "ml-auto",
			children: [
				"Provider setup:",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/plugins",
					className: "underline",
					children: "configure in Plugins"
				})
			]
		});
		$[11] = t8;
	} else t8 = $[11];
	let t9;
	if ($[12] !== t5 || $[13] !== t6) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground",
			children: [
				t5,
				t6,
				t7,
				t8
			]
		});
		$[12] = t5;
		$[13] = t6;
		$[14] = t9;
	} else t9 = $[14];
	let t10;
	if ($[15] !== activeMemoryProvider?.status) {
		t10 = activeMemoryProvider?.status === "missing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "border border-destructive/50 px-3 py-2 text-xs text-destructive",
			children: "The configured provider is no longer installed. Switch to built-in memory or configure another provider in Plugins."
		});
		$[15] = activeMemoryProvider?.status;
		$[16] = t10;
	} else t10 = $[16];
	let t11;
	if ($[17] !== t.systemMemory.builtinLayer) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-foreground",
			children: t.systemMemory.builtinLayer
		});
		$[17] = t.systemMemory.builtinLayer;
		$[18] = t11;
	} else t11 = $[18];
	const t12 = memory?.builtin_files.memory ?? 0;
	let t13;
	if ($[19] !== t12) {
		t13 = formatBytes(t12);
		$[19] = t12;
		$[20] = t13;
	} else t13 = $[20];
	const t14 = memory?.builtin_files.user ?? 0;
	let t15;
	if ($[21] !== t14) {
		t15 = formatBytes(t14);
		$[21] = t14;
		$[22] = t15;
	} else t15 = $[22];
	let t16;
	if ($[23] !== t11 || $[24] !== t13 || $[25] !== t15) {
		t16 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			t11,
			" ",
			"· MEMORY.md: ",
			t13,
			" · USER.md:",
			" ",
			t15
		] });
		$[23] = t11;
		$[24] = t13;
		$[25] = t15;
		$[26] = t16;
	} else t16 = $[26];
	let t17;
	if ($[27] !== t.systemMemory.builtinNote) {
		t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.systemMemory.builtinNote });
		$[27] = t.systemMemory.builtinNote;
		$[28] = t17;
	} else t17 = $[28];
	let t18;
	if ($[29] !== t16 || $[30] !== t17) {
		t18 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1 text-xs text-muted-foreground",
			children: [t16, t17]
		});
		$[29] = t16;
		$[30] = t17;
		$[31] = t18;
	} else t18 = $[31];
	let t19;
	if ($[32] !== onReset) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			ghost: true,
			className: "text-destructive",
			onClick: () => onReset("memory"),
			children: "Reset MEMORY.md"
		});
		$[32] = onReset;
		$[33] = t19;
	} else t19 = $[33];
	let t20;
	if ($[34] !== onReset) {
		t20 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			ghost: true,
			className: "text-destructive",
			onClick: () => onReset("user"),
			children: "Reset USER.md"
		});
		$[34] = onReset;
		$[35] = t20;
	} else t20 = $[35];
	let t21;
	if ($[36] !== onReset) {
		t21 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			ghost: true,
			className: "text-destructive",
			onClick: () => onReset("all"),
			children: "Reset all"
		});
		$[36] = onReset;
		$[37] = t21;
	} else t21 = $[37];
	let t22;
	if ($[38] !== t19 || $[39] !== t20 || $[40] !== t21) {
		t22 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 ml-auto",
			children: [
				t19,
				t20,
				t21
			]
		});
		$[38] = t19;
		$[39] = t20;
		$[40] = t21;
		$[41] = t22;
	} else t22 = $[41];
	let t23;
	if ($[42] !== t18 || $[43] !== t22) {
		t23 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3 border-t border-border pt-3",
			children: [t18, t22]
		});
		$[42] = t18;
		$[43] = t22;
		$[44] = t23;
	} else t23 = $[44];
	let t24;
	if ($[45] !== t10 || $[46] !== t23 || $[47] !== t9) {
		t24 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col gap-3",
			children: [t2, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-col gap-4 py-4",
				children: [
					t9,
					t10,
					t23
				]
			}) })]
		});
		$[45] = t10;
		$[46] = t23;
		$[47] = t9;
		$[48] = t24;
	} else t24 = $[48];
	return t24;
}
//#endregion
export { SystemPage as default };
