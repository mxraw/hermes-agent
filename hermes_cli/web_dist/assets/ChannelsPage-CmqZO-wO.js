import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { G as PlugZap, M as Save, P as RotateCw, Qt as Bot, R as Radio, U as Plus, Wt as CircleCheck, Yt as Check, jt as ExternalLink, k as Settings2, m as TriangleAlert, mt as Info, o as WifiOff, r as X, t as require_browser, z as QrCode } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, L as Spinner, f as Label, h as CardContent, m as Card, o as Switch, p as Input, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { t as cn } from "./utils-XzxpPQdK.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
import { t as useModalBehavior } from "./useModalBehavior-DSqJduTw.js";
import { t as ConfirmDialog } from "./ConfirmDialog-D-vC_4KK.js";
//#region web/src/components/AllowlistInput.tsx
var import_browser = /* @__PURE__ */ __toESM(require_browser(), 1);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var rowSeq = 0;
/** Allowlists are stored as one comma-separated env value; a pasted list may also use newlines. */
function splitAllowlist(raw) {
	return (raw || "").split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean);
}
function joinAllowlist(entries) {
	return [...new Set(entries.map((entry) => entry.trim()).filter(Boolean))].join(",");
}
function toRows(raw) {
	const entries = splitAllowlist(raw);
	return (entries.length ? entries : [""]).map((value) => ({
		id: rowSeq++,
		value
	}));
}
/** One input per allowed user/ID, with + to add and × to remove; reports one comma-separated value. */
function AllowlistInput({ id, label, value, onChange, invalid }) {
	const [rows, setRows] = (0, import_react.useState)(() => toRows(value));
	const [focusId, setFocusId] = (0, import_react.useState)(null);
	const commit = (next) => {
		setRows(next);
		onChange(joinAllowlist(next.map((row) => row.value)));
	};
	const change = (rowId, text) => {
		const parts = /[,\n]/.test(text) ? splitAllowlist(text) : [text];
		const index = rows.findIndex((row_0) => row_0.id === rowId);
		const replacement = parts.length ? parts.map((part, i) => ({
			id: i === 0 ? rowId : rowSeq++,
			value: part
		})) : [{
			id: rowId,
			value: ""
		}];
		commit([
			...rows.slice(0, index),
			...replacement,
			...rows.slice(index + 1)
		]);
	};
	const add = () => {
		const rowId_0 = rowSeq++;
		setFocusId(rowId_0);
		setRows([...rows, {
			id: rowId_0,
			value: ""
		}]);
	};
	const remove = (rowId_1) => {
		const next_0 = rows.filter((row_1) => row_1.id !== rowId_1);
		commit(next_0.length ? next_0 : [{
			id: rowSeq++,
			value: ""
		}]);
	};
	const lone = rows.length === 1 && !rows[0].value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		"data-slot": "allowlist-input",
		children: [rows.map((row_2, index_0) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: index_0 === 0 ? id : void 0,
				"aria-label": `${label} ${index_0 + 1}`,
				"aria-invalid": invalid,
				autoFocus: row_2.id === focusId,
				type: "text",
				className: "text-base leading-6 sm:text-xs sm:leading-4",
				placeholder: "Enter an ID",
				value: row_2.value,
				onChange: (e) => change(row_2.id, e.target.value),
				onKeyDown: (e_0) => {
					if (e_0.key === "Enter" && row_2.value.trim()) {
						e_0.preventDefault();
						add();
					}
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				ghost: true,
				size: "icon",
				"aria-label": "Remove",
				title: "Remove",
				disabled: lone,
				onClick: () => remove(row_2.id),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
			})]
		}, row_2.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			size: "sm",
			onClick: add,
			prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }),
			children: "Add another"
		}) })]
	});
}
//#endregion
//#region web/src/pages/ChannelsPage.tsx
var STATE_BADGE = {
	connected: {
		tone: "success",
		label: "Connected"
	},
	pending_restart: {
		tone: "warning",
		label: "Restart to apply"
	},
	gateway_stopped: {
		tone: "warning",
		label: "Gateway stopped"
	},
	startup_failed: {
		tone: "destructive",
		label: "Start failed"
	},
	disconnected: {
		tone: "warning",
		label: "Disconnected"
	},
	not_configured: {
		tone: "outline",
		label: "Not configured"
	},
	disabled: {
		tone: "secondary",
		label: "Disabled"
	},
	fatal: {
		tone: "destructive",
		label: "Error"
	}
};
function stateBadge(state) {
	return STATE_BADGE[state] ?? {
		tone: "outline",
		label: state
	};
}
var TELEGRAM_USER_ID_RE = /^\d+$/;
var TELEGRAM_BOT_TOKEN_RE = /^\d+:[A-Za-z0-9_-]{30,}$/;
var SLACK_MEMBER_ID_RE = /^[UW][A-Z0-9]{2,}$/;
var SLACK_TOKEN_PREFIXES = {
	SLACK_BOT_TOKEN: "xoxb-",
	SLACK_APP_TOKEN: "xapp-"
};
function validateMessagingEnvField(field, value) {
	const trimmed = value.trim();
	if (!trimmed) return null;
	if (field.key === "TELEGRAM_BOT_TOKEN" && !TELEGRAM_BOT_TOKEN_RE.test(trimmed)) return "Paste the complete token from @BotFather (for example, 123456789:ABC…).";
	if (field.key === "TELEGRAM_ALLOWED_USERS") {
		const invalid = trimmed.split(",").map((part) => part.trim()).filter(Boolean).find((part) => !TELEGRAM_USER_ID_RE.test(part));
		if (invalid) return `${invalid} is not a numeric Telegram user ID.`;
	}
	const expectedPrefix = SLACK_TOKEN_PREFIXES[field.key];
	if (expectedPrefix && !trimmed.startsWith(expectedPrefix)) return `${field.prompt || field.key} must start with ${expectedPrefix}`;
	if (field.key === "SLACK_ALLOWED_USERS") {
		const invalid = trimmed.split(",").map((part) => part.trim()).filter(Boolean).find((part) => part !== "*" && !SLACK_MEMBER_ID_RE.test(part));
		if (invalid) return `${invalid} does not look like a Slack member ID. Use IDs like U01ABC2DEF3.`;
	}
	return null;
}
function formatExpiry(expiresAt) {
	const ms = Date.parse(expiresAt) - Date.now();
	if (!Number.isFinite(ms) || ms <= 0) return "expired";
	const seconds = Math.ceil(ms / 1e3);
	return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
}
function isTerminalTelegramOnboardingError(error) {
	const message = error instanceof Error ? error.message : String(error);
	return /\b410\b/.test(message) && /\b(expired|claimed|gone)\b/i.test(message);
}
function isTerminalWhatsAppOnboardingError(error) {
	const message = error instanceof Error ? error.message : String(error);
	return /\b410\b/.test(message) && /\b(expired|gone)\b/i.test(message);
}
function normalizeWhatsAppMode(mode) {
	return mode === "bot" || mode === "self-chat" ? mode : null;
}
function ChannelsPage() {
	const [platforms, setPlatforms] = (0, import_react.useState)([]);
	const [envPath, setEnvPath] = (0, import_react.useState)("~/.hermes/.env");
	const [gatewayStartCommand, setGatewayStartCommand] = (0, import_react.useState)("hermes gateway start");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const { toast, showToast } = useToast();
	const { setEnd } = usePageHeader();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [draftEnv, setDraftEnv] = (0, import_react.useState)({});
	const [fieldErrors, setFieldErrors] = (0, import_react.useState)({});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const closeEdit = (0, import_react.useCallback)(() => {
		setEditing(null);
		setFieldErrors({});
	}, []);
	const editModalRef = useModalBehavior({
		open: editing !== null,
		onClose: closeEdit
	});
	const [togglingId, setTogglingId] = (0, import_react.useState)(null);
	const [testingId, setTestingId] = (0, import_react.useState)(null);
	const [restartNeeded, setRestartNeeded] = (0, import_react.useState)(false);
	const [restarting, setRestarting] = (0, import_react.useState)(false);
	const gatewayRunning = platforms.length > 0 && platforms[0].gateway_running;
	const load = (0, import_react.useCallback)(() => {
		return api.getMessagingPlatforms().then((res) => {
			setPlatforms(res.platforms);
			setEnvPath(res.env_path || "~/.hermes/.env");
			setGatewayStartCommand(res.gateway_start_command || "hermes gateway start");
		}).catch((e) => showToast(`Could not load channels: ${errorMessage(e)}`, "error"));
	}, [showToast]);
	(0, import_react.useEffect)(() => {
		load().finally(() => setLoading(false));
	}, [load]);
	const openConfig = (platform) => {
		const initial = {};
		platform.env_vars.forEach((v) => {
			initial[v.key] = v.is_list ? v.value || "" : "";
		});
		setDraftEnv(initial);
		setFieldErrors({});
		setEditing(platform);
	};
	const handleSave = async () => {
		if (!editing) return;
		const env = {};
		const clearEnv = [];
		editing.env_vars.forEach((field) => {
			const v = (draftEnv[field.key] || "").trim();
			if (field.is_list) {
				if (v === (field.value || "")) return;
				if (v) env[field.key] = v;
				else if (field.is_set) clearEnv.push(field.key);
			} else if (v) env[field.key] = v;
		});
		if (Object.keys(env).length === 0 && clearEnv.length === 0) {
			showToast("Nothing to save — fill in at least one field.", "error");
			return;
		}
		const missing = editing.env_vars.filter((v) => v.required && !v.is_set && !env[v.key]);
		if (missing.length > 0) {
			showToast(`${missing[0].prompt || missing[0].key} is required`, "error");
			return;
		}
		const nextFieldErrors = {};
		editing.env_vars.forEach((field) => {
			const message = validateMessagingEnvField(field, draftEnv[field.key] || "");
			if (message) nextFieldErrors[field.key] = message;
		});
		if (Object.keys(nextFieldErrors).length > 0) {
			setFieldErrors(nextFieldErrors);
			showToast("Fix the highlighted fields before saving.", "error");
			return;
		}
		setSaving(true);
		try {
			const body = {
				env,
				enabled: true,
				...clearEnv.length ? { clear_env: clearEnv } : {}
			};
			const result = await api.updateMessagingPlatform(editing.id, body);
			showToast(result.hot_served ? `${editing.name} saved; the running gateway is connecting` : `${editing.name} saved`, "success");
			setEditing(null);
			if (!result.hot_served) setRestartNeeded(true);
			await load();
			if (result.hot_served) setTimeout(() => void load(), 4e3);
		} catch (e) {
			showToast(`Failed to save: ${errorMessage(e)}`, "error");
		} finally {
			setSaving(false);
		}
	};
	const handleToggle = async (platform) => {
		const next = !platform.enabled;
		setTogglingId(platform.id);
		try {
			const result = await api.updateMessagingPlatform(platform.id, { enabled: next });
			setPlatforms((prev) => prev.map((p) => p.id === platform.id ? {
				...p,
				enabled: next,
				state: next ? "pending_restart" : "disabled"
			} : p));
			if (result.hot_served) setTimeout(() => void load(), 4e3);
			else setRestartNeeded(true);
		} catch (e) {
			showToast(`Could not update the channel: ${errorMessage(e)}`, "error");
		} finally {
			setTogglingId(null);
		}
	};
	const handleTest = async (platform) => {
		setTestingId(platform.id);
		try {
			const res = await api.testMessagingPlatform(platform.id);
			showToast(`${platform.name}: ${res.message}`, res.ok ? "success" : "error");
		} catch (e) {
			showToast(`Could not test the channel: ${errorMessage(e)}`, "error");
		} finally {
			setTestingId(null);
		}
	};
	const handleRestart = async () => {
		setRestarting(true);
		try {
			await api.restartGateway();
			showToast("Gateway restarting…", "success");
			setRestartNeeded(false);
			setTimeout(() => void load(), 4e3);
		} catch (e) {
			showToast(`Failed to restart: ${errorMessage(e)}`, "error");
		} finally {
			setRestarting(false);
		}
	};
	(0, import_react.useLayoutEffect)(() => {
		setEnd(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "uppercase",
			size: "sm",
			onClick: handleRestart,
			disabled: restarting,
			prefix: restarting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-4 w-4" }),
			children: restarting ? "Restarting…" : "Restart gateway"
		}));
		return () => setEnd(null);
	}, [setEnd, restarting]);
	const configured = (0, import_react.useMemo)(() => platforms.filter((p) => p.configured).length, [platforms]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-2xl text-primary" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }),
			restartNeeded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-warning/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 shrink-0 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Changes are saved. Restart the gateway for them to take effect." })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "uppercase shrink-0",
						onClick: handleRestart,
						disabled: restarting,
						prefix: restarting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-4 w-4" }),
						children: restarting ? "Restarting…" : "Restart now"
					})]
				})
			}),
			!gatewayRunning && !restartNeeded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex items-center gap-2 p-4 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"The gateway is not running. Configure channels here, then start the gateway with ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-courier",
							children: gatewayStartCommand
						}),
						" ",
						"(or the Restart button above)."
					] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					configured,
					" of ",
					platforms.length,
					" channels configured. Credentials are written to ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "font-courier",
						children: envPath
					}),
					"; the gateway connects each enabled channel on its next restart."
				]
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: editModalRef,
				className: cn("fixed inset-0 z-[100] flex min-h-dvh items-start justify-center overflow-y-auto bg-background/85 px-4", "pb-[calc(1rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))]", "sm:items-center sm:p-4"),
				onClick: (e) => e.target === e.currentTarget && setEditing(null),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "channel-config-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("font-mondwest normal-case", "relative flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col border border-border bg-card shadow-2xl sm:max-h-[90dvh]"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							ghost: true,
							size: "icon",
							onClick: () => setEditing(null),
							className: "absolute right-2 top-2 text-muted-foreground hover:text-foreground",
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "p-5 pb-3 border-b border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "channel-config-title",
								className: "font-mondwest text-display text-base tracking-wider",
								children: editing.id === "telegram" ? "Use your own Telegram bot" : `Configure ${editing.name}`
							}), editing.docs_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: editing.docs_url,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline",
								children: [editing.id === "telegram" ? "BotFather guide" : "Setup guide", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 overflow-y-auto overscroll-contain p-4 sm:p-5",
							children: [
								editing.id === "telegram" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Connect a bot you already own, or create one in Telegram before filling in this form." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
											className: "grid list-decimal gap-1.5 pl-5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"Open ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-foreground",
														children: "@BotFather"
													}),
													", send",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
														className: "mx-1 font-courier text-xs",
														children: "/newbot"
													}),
													", and follow its prompts."
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Copy the complete bot token BotFather gives you." }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"Message ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-foreground",
														children: "@userinfobot"
													}),
													" to find your numeric Telegram user ID, then add it below for immediate access."
												] })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-x-4 gap-y-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: "https://t.me/BotFather",
												target: "_blank",
												rel: "noopener noreferrer",
												className: "inline-flex items-center gap-1 text-primary hover:underline",
												children: ["Open @BotFather ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: "https://t.me/userinfobot",
												target: "_blank",
												rel: "noopener noreferrer",
												className: "inline-flex items-center gap-1 text-primary hover:underline",
												children: ["Find my user ID ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs",
											children: "You can leave allowed users blank. Hermes will then send new DM users a code that you approve from the Pairing page."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: editing.description
								}),
								editing.env_vars.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: `field-${field.key}`,
												children: [field.prompt || field.key, field.required ? " *" : ""]
											}), field.help && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-label": field.help,
												className: "inline-flex text-muted-foreground hover:text-foreground",
												role: "img",
												title: field.help,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5" })
											})]
										}),
										field.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: field.description
										}),
										field.is_list ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AllowlistInput, {
											id: `field-${field.key}`,
											label: field.prompt || field.key,
											value: draftEnv[field.key] ?? "",
											invalid: Boolean(fieldErrors[field.key]),
											onChange: (nextValue) => {
												setDraftEnv((prev) => ({
													...prev,
													[field.key]: nextValue
												}));
												setFieldErrors((prev) => {
													if (!prev[field.key]) return prev;
													const next = { ...prev };
													delete next[field.key];
													return next;
												});
											}
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: `field-${field.key}`,
											type: field.is_password ? "password" : "text",
											className: "text-base leading-6 sm:text-xs sm:leading-4",
											placeholder: field.is_set ? field.redacted_value || "•••••• (set — leave blank to keep)" : field.key,
											value: draftEnv[field.key] ?? "",
											"aria-invalid": Boolean(fieldErrors[field.key]),
											onChange: (e) => {
												const nextValue = e.target.value;
												setDraftEnv((prev) => ({
													...prev,
													[field.key]: nextValue
												}));
												setFieldErrors((prev) => {
													if (!prev[field.key]) return prev;
													const next = { ...prev };
													delete next[field.key];
													return next;
												});
											}
										}),
										fieldErrors[field.key] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-destructive",
											children: fieldErrors[field.key]
										})
									]
								}, field.key)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										size: "sm",
										className: "w-full sm:w-auto",
										onClick: () => setEditing(null),
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full uppercase sm:w-auto",
										size: "sm",
										onClick: handleSave,
										disabled: saving,
										prefix: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
										children: saving ? "Saving…" : "Save & enable"
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3",
				children: platforms.map((platform) => {
					const badge = stateBadge(platform.state);
					const busy = togglingId === platform.id;
					const StateIcon = platform.state === "connected" ? CircleCheck : platform.state === "fatal" || platform.state === "startup_failed" ? TriangleAlert : Radio;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "flex flex-col gap-4 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateIcon, { className: cn("h-5 w-5 shrink-0 mt-0.5", platform.state === "connected" ? "text-success" : platform.state === "fatal" || platform.state === "startup_failed" ? "text-destructive" : "text-muted-foreground") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-0.5 min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 flex-wrap",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mondwest normal-case text-sm font-medium",
														children: platform.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														tone: badge.tone,
														children: badge.label
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: platform.description
												}),
												platform.error_message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-destructive",
													children: platform.error_message
												}),
												platform.ingress_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-muted-foreground break-all",
													children: [
														"Callback URL (shared listener):",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
															className: "font-mono",
															children: platform.ingress_url
														})
													]
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 shrink-0 self-start sm:self-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center gap-1.5",
												children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-sm" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
													checked: platform.enabled,
													onCheckedChange: () => void handleToggle(platform),
													"aria-label": `Enable ${platform.name}`
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												ghost: true,
												size: "sm",
												onClick: () => handleTest(platform),
												disabled: testingId === platform.id,
												prefix: testingId === platform.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlugZap, { className: "h-4 w-4" }),
												children: "Test"
											}),
											platform.id !== "telegram" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												className: "uppercase",
												onClick: () => openConfig(platform),
												prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-4 w-4" }),
												children: "Configure"
											})
										]
									})]
								}),
								platform.id === "telegram" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TelegramOnboardingPanel, {
									onManualSetup: () => openConfig(platform),
									onChanged: load,
									onRestartNeeded: () => setRestartNeeded(true),
									platform,
									setRestartNeeded,
									showToast
								}),
								platform.id === "whatsapp" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppOnboardingPanel, {
									onChanged: load,
									onRestartNeeded: () => setRestartNeeded(true),
									platform,
									setRestartNeeded,
									showToast
								})
							]
						})
					}, platform.id);
				})
			})
		]
	});
}
function WhatsAppOnboardingPanel({ onChanged, onRestartNeeded, platform, setRestartNeeded, showToast }) {
	const configuredMode = (0, import_react.useMemo)(() => normalizeWhatsAppMode(platform.whatsapp_setup?.mode), [platform.whatsapp_setup?.mode]);
	const [setup, setSetup] = (0, import_react.useState)(null);
	const [qrDataUrl, setQrDataUrl] = (0, import_react.useState)("");
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [mode, setMode] = (0, import_react.useState)(configuredMode ?? "bot");
	const [allowedUsers, setAllowedUsers] = (0, import_react.useState)("");
	const [confirmRepair, setConfirmRepair] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [tick, setTick] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!setup && phase === "idle" && configuredMode) setMode(configuredMode);
	}, [
		configuredMode,
		phase,
		setup
	]);
	const updateQr = (0, import_react.useCallback)(async (payload) => {
		if (!payload) return;
		const dataUrl = await import_browser.toDataURL(payload, {
			errorCorrectionLevel: "M",
			margin: 3,
			width: 240
		});
		setQrDataUrl(dataUrl);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!setup || phase !== "waiting") return;
		let cancelled = false;
		let timeout = null;
		const poll = async () => {
			try {
				const status = await api.getWhatsAppOnboardingStatus(setup.pairing_id);
				if (cancelled) return;
				setSetup(status);
				if (status.qr_payload && status.qr_payload !== setup.qr_payload) await updateQr(status.qr_payload);
				if (cancelled) return;
				if (status.status === "connected") {
					setPhase("connected");
					setError("");
					return;
				}
				if (status.status === "error") {
					setError(status.error || "WhatsApp setup failed.");
					setSetup(null);
					setQrDataUrl("");
					setPhase("idle");
					return;
				}
				setError("");
				timeout = setTimeout(poll, 1500);
			} catch (pollError) {
				if (cancelled) return;
				const expiresAt = Date.parse(setup.expires_at);
				const expired = Number.isFinite(expiresAt) && Date.now() >= expiresAt;
				if (isTerminalWhatsAppOnboardingError(pollError) || expired) {
					setSetup(null);
					setQrDataUrl("");
					setPhase("idle");
					setError("WhatsApp QR setup expired. Start a new QR setup to try again.");
					return;
				}
				setError(`Still waiting for WhatsApp. Retrying after: ${pollError}`);
				timeout = setTimeout(poll, 2e3);
			}
		};
		timeout = setTimeout(poll, 1e3);
		return () => {
			cancelled = true;
			if (timeout) clearTimeout(timeout);
		};
	}, [
		phase,
		setup,
		updateQr
	]);
	(0, import_react.useEffect)(() => {
		if (!setup) return;
		const timer = setInterval(() => setTick((value) => value + 1), 1e3);
		return () => clearInterval(timer);
	}, [setup]);
	const resetSetup = () => {
		setSetup(null);
		setQrDataUrl("");
		setPhase("idle");
		setError("");
	};
	const start = async (resetSession = false) => {
		setConfirmRepair(false);
		setSetup(null);
		setPhase("starting");
		setError("");
		setQrDataUrl("");
		try {
			const res = await api.startWhatsAppOnboarding({
				mode,
				allowed_users: allowedUsers,
				reset_session: resetSession
			});
			setSetup(res);
			if (res.qr_payload) await updateQr(res.qr_payload);
			if (res.status === "error") {
				setError(res.error || "WhatsApp setup failed.");
				setSetup(null);
				setPhase("idle");
			} else setPhase(res.status === "connected" ? "connected" : "waiting");
		} catch (startError) {
			setPhase("idle");
			setError(String(startError));
		}
	};
	const cancel = async () => {
		if (setup) try {
			await api.cancelWhatsAppOnboarding(setup.pairing_id);
		} catch {}
		resetSetup();
	};
	const watchRestartOutcome = async () => {
		for (let i = 0; i < 20; i++) {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			try {
				const st = await api.getActionStatus("gateway-restart", 5);
				if (st.running) continue;
				if (st.exit_code !== 0 && st.exit_code !== null) {
					onRestartNeeded();
					showToast(`Gateway restart failed (exit ${st.exit_code}) — restart manually`, "error");
				}
				return;
			} catch {}
		}
	};
	const apply = async () => {
		if (!setup) return;
		setPhase("applying");
		setError("");
		try {
			const result = await api.applyWhatsAppOnboarding(setup.pairing_id, {
				mode,
				allowed_users: allowedUsers
			});
			resetSetup();
			if (result.restart_started) {
				showToast("WhatsApp saved; gateway restarting…", "success");
				setRestartNeeded(false);
				setTimeout(() => void onChanged(), 4e3);
				watchRestartOutcome();
			} else {
				onRestartNeeded();
				showToast(`WhatsApp saved; gateway restart failed${result.restart_error ? `: ${result.restart_error}` : ""}`, "error");
			}
			await onChanged();
		} catch (applyError) {
			setPhase("connected");
			setError(String(applyError));
		}
	};
	const expiresIn = (0, import_react.useMemo)(() => setup ? formatExpiry(setup.expires_at) : "", [setup, tick]);
	const setupStatusLabel = setup?.status === "installing" ? "preparing" : setup?.status === "starting" ? "starting" : "waiting";
	const setupHelp = phase === "connected" || phase === "applying" ? "WhatsApp is linked but Hermes is not listening yet. Save and restart the gateway to finish setup." : setup?.status === "installing" ? "Preparing the WhatsApp bridge. The QR code will appear here when it is ready." : setup?.status === "starting" ? "Starting the WhatsApp pairing bridge. The QR code will appear here when it is ready." : "Open WhatsApp on your phone, then go to Linked Devices and scan from there. This QR is not a browser URL.";
	const linkedAccountLabel = setup?.account_phone ? `+${setup.account_phone}` : setup?.account_name || setup?.account_id || "";
	const linkedAccountDetail = setup?.account_phone || setup?.account_id ? "This is the WhatsApp account Hermes is now logged into." : "Hermes is logged into the WhatsApp account that scanned the QR code.";
	const linkedAccountChatUrl = setup?.account_phone ? `https://wa.me/${setup.account_phone}` : "";
	const messageInstruction = mode === "self-chat" ? "After the restart, open Message Yourself on the linked account and send Hermes a message." : "After the restart, start a chat from another WhatsApp account with the linked account and send Hermes a message.";
	const hasSavedAllowedUsers = Boolean(platform.whatsapp_setup?.allowed_users_set);
	const pairingInstruction = mode === "self-chat" && !allowedUsers.trim() ? hasSavedAllowedUsers ? "Hermes will keep the saved WhatsApp allowlist." : "Self-chat mode will allow the linked account automatically when you save." : !allowedUsers.trim() && hasSavedAllowedUsers ? "Hermes will keep the saved WhatsApp allowlist." : "If no allowed numbers were entered, Hermes replies with a pairing code. Approve it from the dashboard Pairing page.";
	const pairingBusy = [
		"starting",
		"waiting",
		"applying"
	].includes(phase);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-sm border border-border bg-background/35 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							className: "uppercase",
							onClick: () => void start(),
							disabled: pairingBusy,
							prefix: phase === "starting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-4 w-4" }),
							children: phase === "starting" ? "Starting…" : "Pair with QR"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							outlined: true,
							onClick: () => setConfirmRepair(true),
							disabled: pairingBusy,
							children: "Re-pair with QR"
						}),
						platform.configured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Existing WhatsApp settings are configured."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
					open: confirmRepair,
					title: "Replace the saved WhatsApp link?",
					description: "Use this if WhatsApp logged out or removed this linked device. Disable WhatsApp and restart the gateway first. The old session will be kept in a private backup. Scan the new QR from Linked Devices on your phone, then Save and restart to enable WhatsApp again.",
					confirmLabel: "Back up and re-pair",
					destructive: true,
					onCancel: () => setConfirmRepair(false),
					onConfirm: () => void start(true)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 lg:flex-row lg:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-[0.12em] text-muted-foreground",
							children: "Mode"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								outlined: mode !== "bot",
								onClick: () => setMode("bot"),
								disabled: phase === "waiting" || phase === "applying",
								children: "Bot"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								outlined: mode !== "self-chat",
								onClick: () => setMode("self-chat"),
								disabled: phase === "waiting" || phase === "applying",
								children: "Self-chat"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid min-w-0 flex-1 gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "whatsapp-allowed-users",
							children: "Allowed WhatsApp numbers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "whatsapp-allowed-users",
							value: allowedUsers,
							onChange: (event) => setAllowedUsers(event.target.value),
							disabled: phase === "waiting" || phase === "applying",
							placeholder: "15551234567,15557654321"
						})]
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive",
					children: error
				}),
				setup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [phase === "connected" || phase === "applying" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "success",
									children: "Connected"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "warning",
									children: setupStatusLabel
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: expiresIn === "expired" ? "destructive" : "outline",
									children: expiresIn
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: setupHelp
							}),
							phase === "waiting" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "After saving, unknown DMs use Hermes pairing codes unless their number is already allowed."
							}),
							(phase === "connected" || phase === "applying") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border border-border bg-background/45 p-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium",
											children: linkedAccountLabel ? `Linked as ${linkedAccountLabel}` : "WhatsApp device linked"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1 text-muted-foreground",
											children: linkedAccountDetail
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
											className: "mt-3 list-decimal space-y-1 pl-5 text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Save and restart the gateway." }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: messageInstruction }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: pairingInstruction })
											]
										}),
										linkedAccountChatUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											className: "mt-3 inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline",
											href: linkedAccountChatUrl,
											target: "_blank",
											rel: "noreferrer",
											children: ["Open chat link", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: "uppercase",
										onClick: () => void apply(),
										disabled: phase === "applying",
										prefix: phase === "applying" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }),
										children: phase === "applying" ? "Saving…" : "Save and restart"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										ghost: true,
										onClick: () => void cancel(),
										children: "Cancel"
									})]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center gap-3",
						children: [
							qrDataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: qrDataUrl,
								alt: "WhatsApp setup QR code",
								className: "h-60 w-60 bg-white p-2"
							}) : phase === "connected" || phase === "applying" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-60 w-60 flex-col items-center justify-center gap-2 border border-border bg-background/50 p-4 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "success",
									children: "Linked"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground",
									children: linkedAccountLabel || "Existing WhatsApp session found"
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-60 w-60 flex-col items-center justify-center gap-3 border border-border bg-background/50 p-4 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: "Waiting for WhatsApp to provide a QR code…"
								})]
							}),
							phase === "waiting" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-center text-xs text-muted-foreground",
								children: "Scan with WhatsApp Linked Devices, not the camera app."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								ghost: true,
								onClick: () => void cancel(),
								children: "Cancel"
							})
						]
					})]
				})
			]
		})
	});
}
function TelegramOnboardingPanel({ onManualSetup, onChanged, onRestartNeeded, platform, setRestartNeeded, showToast }) {
	const [setup, setSetup] = (0, import_react.useState)(null);
	const [qrDataUrl, setQrDataUrl] = (0, import_react.useState)("");
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [botUsername, setBotUsername] = (0, import_react.useState)(null);
	const [allowedIds, setAllowedIds] = (0, import_react.useState)([]);
	const [detectedOwnerId, setDetectedOwnerId] = (0, import_react.useState)(null);
	const [newAllowedId, setNewAllowedId] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [tick, setTick] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!setup || phase !== "waiting") return;
		let cancelled = false;
		let timeout = null;
		const poll = async () => {
			try {
				const status = await api.getTelegramOnboardingStatus(setup.pairing_id);
				if (cancelled) return;
				if (status.status === "ready") {
					setPhase("ready");
					setBotUsername(status.bot_username ?? null);
					setError("");
					if (status.owner_user_id && TELEGRAM_USER_ID_RE.test(status.owner_user_id)) {
						setDetectedOwnerId(status.owner_user_id);
						setAllowedIds([status.owner_user_id]);
					}
					return;
				}
				setError("");
				timeout = setTimeout(poll, 2e3);
			} catch (pollError) {
				if (cancelled) return;
				const expiresAt = Date.parse(setup.expires_at);
				const expired = Number.isFinite(expiresAt) && Date.now() >= expiresAt;
				if (isTerminalTelegramOnboardingError(pollError) || expired) {
					setSetup(null);
					setQrDataUrl("");
					setPhase("idle");
					setError("Telegram pairing expired. Start a new QR setup to try again.");
					return;
				}
				setError(`Still waiting for Telegram. Retrying after: ${pollError}`);
				timeout = setTimeout(poll, 2e3);
			}
		};
		timeout = setTimeout(poll, 1200);
		return () => {
			cancelled = true;
			if (timeout) clearTimeout(timeout);
		};
	}, [phase, setup]);
	(0, import_react.useEffect)(() => {
		if (!setup) return;
		const timer = setInterval(() => setTick((value) => value + 1), 1e3);
		return () => clearInterval(timer);
	}, [setup]);
	const resetSetup = () => {
		setSetup(null);
		setQrDataUrl("");
		setPhase("idle");
		setBotUsername(null);
		setAllowedIds([]);
		setDetectedOwnerId(null);
		setNewAllowedId("");
		setError("");
	};
	const start = async () => {
		setPhase("starting");
		setError("");
		setBotUsername(null);
		setAllowedIds([]);
		setDetectedOwnerId(null);
		setNewAllowedId("");
		try {
			const res = await api.startTelegramOnboarding({ bot_name: "Hermes Agent" });
			const dataUrl = await import_browser.toDataURL(res.qr_payload, {
				errorCorrectionLevel: "M",
				margin: 1,
				width: 224
			});
			setSetup(res);
			setQrDataUrl(dataUrl);
			setPhase("waiting");
		} catch (startError) {
			setPhase("idle");
			setError(String(startError));
		}
	};
	const cancel = async () => {
		if (setup) try {
			await api.cancelTelegramOnboarding(setup.pairing_id);
		} catch {}
		resetSetup();
	};
	const addAllowedId = () => {
		const trimmed = newAllowedId.trim();
		if (!TELEGRAM_USER_ID_RE.test(trimmed)) {
			setError("Allowed Telegram user IDs must be numeric.");
			return;
		}
		setError("");
		setAllowedIds((ids) => ids.includes(trimmed) ? ids : [...ids, trimmed]);
		setNewAllowedId("");
	};
	const watchRestartOutcome = async () => {
		for (let i = 0; i < 20; i++) {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			try {
				const st = await api.getActionStatus("gateway-restart", 5);
				if (st.running) continue;
				if (st.exit_code !== 0 && st.exit_code !== null) {
					onRestartNeeded();
					showToast(`Gateway restart failed (exit ${st.exit_code}) — restart manually`, "error");
				}
				return;
			} catch {}
		}
	};
	const apply = async () => {
		if (!setup) return;
		if (allowedIds.length === 0) {
			setError("Add at least one allowed Telegram user ID.");
			return;
		}
		setPhase("applying");
		setError("");
		try {
			const result = await api.applyTelegramOnboarding(setup.pairing_id, { allowed_user_ids: allowedIds });
			resetSetup();
			if (result.restart_started) {
				showToast("Telegram saved; gateway restarting…", "success");
				setRestartNeeded(false);
				setTimeout(() => void onChanged(), 4e3);
				watchRestartOutcome();
			} else if (result.restart_started === void 0 && result.needs_restart) try {
				await api.restartGateway();
				showToast("Telegram saved; gateway restarting…", "success");
				setRestartNeeded(false);
				setTimeout(() => void onChanged(), 4e3);
			} catch (restartError) {
				onRestartNeeded();
				showToast(`Telegram saved; gateway restart failed: ${restartError}`, "error");
			}
			else {
				onRestartNeeded();
				showToast(`Telegram saved; gateway restart failed${result.restart_error ? `: ${result.restart_error}` : ""}`, "error");
			}
			await onChanged();
		} catch (applyError) {
			setPhase("ready");
			setError(String(applyError));
		}
	};
	const expiresIn = (0, import_react.useMemo)(() => setup ? formatExpiry(setup.expires_at) : "", [setup, tick]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-sm border border-border bg-background/35 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mondwest text-sm text-foreground",
					children: "Choose how to connect your Telegram bot"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: "Both options connect a bot you control and save its credentials only to this Hermes installation."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2 sm:divide-x sm:divide-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid content-start gap-3 sm:pr-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium uppercase text-foreground",
								children: "Quick setup"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: "recommended"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Scan a QR code and confirm in Telegram. Hermes creates the bot and detects your Telegram user ID automatically."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							className: "w-fit uppercase",
							onClick: () => void start(),
							disabled: phase !== "idle",
							prefix: phase === "starting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-4 w-4" }),
							children: phase === "starting" ? "Starting…" : "Create with QR"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid content-start gap-3 border-t border-border pt-4 sm:border-t-0 sm:pl-4 sm:pt-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium uppercase text-foreground",
							children: "Use your own bot"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Create a bot with @BotFather, or connect one you already have, by entering its token and choosing who can use it."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							outlined: true,
							className: "w-fit uppercase",
							onClick: onManualSetup,
							disabled: phase !== "idle",
							prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4" }),
							children: "Manual setup"
						})
					]
				})]
			}),
			platform.configured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 border-t border-border pt-3 text-xs text-muted-foreground",
				children: "Telegram credentials are already configured. A new QR setup or bot token will replace the current bot when you save."
			}),
			phase !== "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 border-t border-border pt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: "Finish or cancel the current QR setup before switching methods."
				})
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive",
				children: error
			}),
			setup && qrDataUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					children: (phase === "ready" || phase === "applying") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "success",
									children: "Ready"
								}), botUsername && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-courier text-sm text-muted-foreground",
									children: ["@", botUsername]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-[0.12em] text-muted-foreground",
										children: "Allowed users"
									}), detectedOwnerId && allowedIds.includes(detectedOwnerId) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "success",
										children: "owner detected"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [allowedIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "inline-flex items-center gap-1 border border-border px-2 py-1 font-courier text-xs text-foreground hover:border-destructive/50",
										onClick: () => setAllowedIds((ids) => ids.filter((existing) => existing !== id)),
										children: [id, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })]
									}, id)), allowedIds.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground",
										children: "Add at least one Telegram user ID."
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: newAllowedId,
									onChange: (event) => setNewAllowedId(event.target.value),
									placeholder: "Telegram user ID",
									className: "font-courier"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									outlined: true,
									onClick: addAllowedId,
									prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}),
									children: "Add"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: "uppercase",
									onClick: () => void apply(),
									disabled: phase === "applying",
									prefix: phase === "applying" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }),
									children: phase === "applying" ? "Saving…" : "Save and restart"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									ghost: true,
									onClick: () => void cancel(),
									children: "Cancel"
								})]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: qrDataUrl,
							alt: "Telegram setup QR code",
							className: "h-56 w-56 bg-white p-2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: expiresIn === "expired" ? "destructive" : "outline",
								children: expiresIn
							}), phase === "waiting" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "warning",
								children: "waiting"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: setup.deep_link,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex h-8 items-center gap-1 border border-border px-3 text-xs uppercase text-foreground hover:border-foreground/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" }), "Open Telegram"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								ghost: true,
								onClick: () => void cancel(),
								children: "Cancel"
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { WhatsAppOnboardingPanel, ChannelsPage as default };
