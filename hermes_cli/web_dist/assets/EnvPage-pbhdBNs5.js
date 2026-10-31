import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { At as EyeOff, I as RefreshCw, Jt as ChevronDown, Kt as ChevronRight, M as Save, O as Settings, T as ShieldCheck, U as Plus, Yt as Check, g as Trash2, jt as ExternalLink, kt as Eye, n as Zap, pt as KeyRound, q as Pencil, r as X, rt as MessageSquare, v as Terminal, w as ShieldOff, zt as Copy } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, I as ConfirmDialog, L as Spinner, _ as CardHeader, a as H2, b as useConfirmDelete, f as Label, g as CardDescription, h as CardContent, j as ListItem, m as Card, n as CopyButton, p as Input, v as CardTitle, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { r as themedBody, t as cn } from "./utils-XzxpPQdK.js";
import { r as useI18n } from "./i18n-Zn9FHQtI.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { u as PluginSlot } from "./index-CeRydpmd.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
import { t as copyTextToClipboard } from "./clipboard-C-rbBxe_.js";
import { t as DeleteConfirmDialog } from "./DeleteConfirmDialog-CS54bGFr.js";
//#region web/src/lib/env-state.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/** Reconcile a successful DELETE /api/env response with the Keys page state. */
function removeDeletedEnvVarFromState(vars, key) {
	const info = vars?.[key];
	if (!vars || !info) return vars;
	if (info.custom) {
		const updated = { ...vars };
		delete updated[key];
		return updated;
	}
	return {
		...vars,
		[key]: {
			...info,
			is_set: false,
			redacted_value: null
		}
	};
}
//#endregion
//#region web/src/components/OAuthLoginModal.tsx
var import_jsx_runtime = require_jsx_runtime();
function OAuthLoginModal({ provider, onClose, onSuccess }) {
	const [phase, setPhase] = (0, import_react.useState)("starting");
	const [start, setStart] = (0, import_react.useState)(null);
	const [pkceCode, setPkceCode] = (0, import_react.useState)("");
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const [copyStatus, setCopyStatus] = (0, import_react.useState)("idle");
	const [secondsLeft, setSecondsLeft] = (0, import_react.useState)(null);
	const isMounted = (0, import_react.useRef)(true);
	const pollTimer = (0, import_react.useRef)(null);
	const copyResetTimer = (0, import_react.useRef)(null);
	const { t } = useI18n();
	(0, import_react.useEffect)(() => {
		isMounted.current = true;
		api.startOAuthLogin(provider.id).then((resp) => {
			if (!isMounted.current) return;
			setStart(resp);
			setSecondsLeft(resp.expires_in);
			setPhase(resp.flow === "device_code" ? "polling" : "awaiting_user");
			if (resp.flow === "pkce") window.open(resp.auth_url, "_blank", "noopener,noreferrer");
			else window.open(resp.verification_url, "_blank", "noopener,noreferrer");
		}).catch((e) => {
			if (!isMounted.current) return;
			setPhase("error");
			setErrorMsg(`Failed to start login: ${errorMessage(e)}`);
		});
		return () => {
			isMounted.current = false;
			if (pollTimer.current !== null) window.clearInterval(pollTimer.current);
			if (copyResetTimer.current !== null) window.clearTimeout(copyResetTimer.current);
		};
	}, []);
	const handleLocalExpiry = async () => {
		if (!isMounted.current) return;
		let backendMessage = null;
		if (start && start.flow === "device_code") try {
			const resp = await api.pollOAuthSession(provider.id, start.session_id);
			if (resp.error_message) backendMessage = resp.error_message;
			else if (resp.status === "pending") {
				if (isMounted.current) setPhase("polling");
				return;
			}
		} catch {}
		if (!isMounted.current) return;
		setPhase("error");
		setErrorMsg(backendMessage || t.oauth.sessionExpiredNoError);
	};
	(0, import_react.useEffect)(() => {
		if (secondsLeft === null) return;
		if (secondsLeft <= 0) return;
		if (phase === "approved" || phase === "error") return;
		const tick = window.setInterval(() => {
			if (!isMounted.current) return;
			setSecondsLeft((s) => s !== null && s > 0 ? s - 1 : 0);
		}, 1e3);
		return () => window.clearInterval(tick);
	}, [secondsLeft, phase]);
	(0, import_react.useEffect)(() => {
		if (secondsLeft !== 0) return;
		if (phase === "approved" || phase === "error") return;
		handleLocalExpiry();
	}, [secondsLeft, phase]);
	(0, import_react.useEffect)(() => {
		if (!start || start.flow !== "device_code" || phase !== "polling") return;
		const sid = start.session_id;
		pollTimer.current = window.setInterval(async () => {
			try {
				const resp = await api.pollOAuthSession(provider.id, sid);
				if (!isMounted.current) return;
				if (resp.status === "approved") {
					setPhase("approved");
					if (pollTimer.current !== null) window.clearInterval(pollTimer.current);
					onSuccess(`${provider.name} connected`);
					window.setTimeout(() => isMounted.current && onClose(), 1500);
				} else if (resp.status !== "pending") {
					setPhase("error");
					setErrorMsg(resp.error_message || `Login ${resp.status}`);
					if (pollTimer.current !== null) window.clearInterval(pollTimer.current);
				}
			} catch (e) {
				if (!isMounted.current) return;
				setPhase("error");
				setErrorMsg(`Polling failed: ${errorMessage(e)}`);
				if (pollTimer.current !== null) window.clearInterval(pollTimer.current);
			}
		}, 2e3);
		return () => {
			if (pollTimer.current !== null) window.clearInterval(pollTimer.current);
		};
	}, [
		start,
		phase,
		provider.id,
		provider.name,
		onSuccess,
		onClose
	]);
	const handleSubmitPkceCode = async () => {
		if (!start || start.flow !== "pkce") return;
		if (!pkceCode.trim()) return;
		setPhase("submitting");
		setErrorMsg(null);
		try {
			const resp = await api.submitOAuthCode(provider.id, start.session_id, pkceCode.trim());
			if (!isMounted.current) return;
			if (resp.ok && resp.status === "approved") {
				setPhase("approved");
				onSuccess(`${provider.name} connected`);
				window.setTimeout(() => isMounted.current && onClose(), 1500);
			} else {
				setPhase("error");
				setErrorMsg(resp.message || "Token exchange failed");
			}
		} catch (e) {
			if (!isMounted.current) return;
			setPhase("error");
			setErrorMsg(`Submit failed: ${errorMessage(e)}`);
		}
	};
	const handleClose = async () => {
		if (start && phase !== "approved" && phase !== "error") try {
			await api.cancelOAuthSession(start.session_id);
		} catch {}
		onClose();
	};
	const handleBackdrop = (e) => {
		if (e.target === e.currentTarget) handleClose();
	};
	const fmtTime = (s) => {
		if (s === null) return "";
		const m = Math.floor(s / 60);
		const r = s % 60;
		return `${m}:${String(r).padStart(2, "0")}`;
	};
	const handleCopyDeviceCode = async (code) => {
		if (copyResetTimer.current !== null) {
			window.clearTimeout(copyResetTimer.current);
			copyResetTimer.current = null;
		}
		const copied = await copyTextToClipboard(code);
		if (!isMounted.current) return;
		setCopyStatus(copied ? "copied" : "failed");
		copyResetTimer.current = window.setTimeout(() => {
			if (isMounted.current) setCopyStatus("idle");
			copyResetTimer.current = null;
		}, 2e3);
	};
	const deviceCode = start?.flow === "device_code" ? start.user_code : "";
	const verificationUrl = start?.flow === "device_code" ? start.verification_url : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4",
		onClick: handleBackdrop,
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "oauth-modal-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn(themedBody, "relative w-full max-w-md border border-border bg-card shadow-2xl"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				ghost: true,
				size: "icon",
				onClick: handleClose,
				className: "absolute right-2 top-2 text-muted-foreground hover:text-foreground",
				"aria-label": t.common.close,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
						id: "oauth-modal-title",
						variant: "sm",
						mondwest: true,
						className: "tracking-wider uppercase",
						children: [
							t.oauth.connect,
							" ",
							provider.name
						]
					}), secondsLeft !== null && phase !== "approved" && phase !== "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: t.oauth.sessionExpires.replace("{time}", fmtTime(secondsLeft))
					})] }),
					phase === "starting" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 py-6 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), t.oauth.initiatingLogin]
					}),
					start?.flow === "pkce" && phase === "awaiting_user" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "text-sm space-y-2 list-decimal list-inside text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t.oauth.pkceStep1 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t.oauth.pkceStep2 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t.oauth.pkceStep3 })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: pkceCode,
							onChange: (e) => setPkceCode(e.target.value),
							placeholder: t.oauth.pasteCode,
							onKeyDown: (e) => e.key === "Enter" && handleSubmitPkceCode(),
							autoFocus: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: start.auth_url,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }), t.oauth.reOpenAuth]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: handleSubmitPkceCode,
								disabled: !pkceCode.trim(),
								children: t.oauth.submitCode
							})]
						})]
					})] }),
					phase === "submitting" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 py-6 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), t.oauth.exchangingCode]
					}),
					start?.flow === "device_code" && phase === "polling" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t.oauth.enterCodePrompt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 border border-border bg-secondary/30 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "font-mono-ui text-2xl tracking-widest text-foreground",
								children: deviceCode
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								outlined: true,
								className: "shrink-0 uppercase",
								onClick: () => void handleCopyDeviceCode(deviceCode),
								prefix: copyStatus === "copied" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }),
								"aria-label": t.oauth.copyCode,
								children: copyStatus === "copied" ? t.oauth.copied : t.oauth.copyCode
							})]
						}),
						copyStatus === "failed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive",
							children: t.oauth.copyFailed
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: verificationUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }), t.oauth.reOpenVerification]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-xs" }), t.oauth.waitingAuth]
						})
					] }),
					phase === "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 py-6 text-sm text-success",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }), t.oauth.connectedClosing]
					}),
					phase === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
						children: errorMsg || t.oauth.loginFailed
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							outlined: true,
							onClick: handleClose,
							children: t.common.close
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								if (start?.session_id) api.cancelOAuthSession(start.session_id).catch(() => {});
								setErrorMsg(null);
								setStart(null);
								setPkceCode("");
								setSecondsLeft(null);
								setPhase("starting");
								api.startOAuthLogin(provider.id).then((resp) => {
									if (!isMounted.current) return;
									setStart(resp);
									setSecondsLeft(resp.expires_in);
									setPhase(resp.flow === "device_code" ? "polling" : "awaiting_user");
									if (resp.flow === "pkce") window.open(resp.auth_url, "_blank", "noopener,noreferrer");
									else window.open(resp.verification_url, "_blank", "noopener,noreferrer");
								}).catch((e) => {
									if (!isMounted.current) return;
									setPhase("error");
									setErrorMsg(`${t.common.retry} failed: ${errorMessage(e)}`);
								});
							},
							children: t.common.retry
						})]
					})] })
				]
			})]
		})
	});
}
//#endregion
//#region web/src/components/OAuthProvidersCard.tsx
function formatExpiresAt(expiresAt, expiresInTemplate) {
	if (!expiresAt) return null;
	try {
		const dt = new Date(expiresAt);
		if (Number.isNaN(dt.getTime())) return null;
		const now = Date.now();
		const diff = dt.getTime() - now;
		if (diff < 0) return "expired";
		const mins = Math.floor(diff / 6e4);
		if (mins < 60) return expiresInTemplate.replace("{time}", `${mins}m`);
		const hours = Math.floor(mins / 60);
		if (hours < 24) return expiresInTemplate.replace("{time}", `${hours}h`);
		const days = Math.floor(hours / 24);
		return expiresInTemplate.replace("{time}", `${days}d`);
	} catch {
		return null;
	}
}
function OAuthProvidersCard({ onError, onSuccess }) {
	const [providers, setProviders] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [busyId, setBusyId] = (0, import_react.useState)(null);
	const [loginFor, setLoginFor] = (0, import_react.useState)(null);
	const [disconnectTarget, setDisconnectTarget] = (0, import_react.useState)(null);
	const { t } = useI18n();
	const onErrorRef = (0, import_react.useRef)(onError);
	onErrorRef.current = onError;
	const refresh = (0, import_react.useCallback)(() => {
		setLoading(true);
		api.getOAuthProviders().then((resp) => setProviders(resp.providers)).catch((e) => onErrorRef.current?.(`Failed to load providers: ${errorMessage(e)}`)).finally(() => setLoading(false));
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh]);
	const handleDisconnect = async (provider) => {
		setBusyId(provider.id);
		setDisconnectTarget(null);
		try {
			await api.disconnectOAuthProvider(provider.id);
			onSuccess?.(`${provider.name} ${t.oauth.disconnect.toLowerCase()}ed`);
			refresh();
		} catch (e_0) {
			onError?.(`${t.oauth.disconnect} failed: ${errorMessage(e_0)}`);
		} finally {
			setBusyId(null);
		}
	};
	const connectedCount = providers?.filter((p) => p.status.logged_in).length ?? 0;
	const totalCount = providers?.length ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-base",
					children: t.oauth.providerLogins
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				ghost: true,
				size: "icon",
				className: "text-muted-foreground hover:text-foreground",
				onClick: refresh,
				disabled: loading,
				"aria-label": t.common.refresh,
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: t.oauth.description.replace("{connected}", String(connectedCount)).replace("{total}", String(totalCount)) })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
			loading && providers === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-xl text-primary" })
			}),
			providers && providers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground text-center py-8",
				children: t.oauth.noProviders
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col divide-y divide-border",
				children: providers?.map((p_0) => {
					const expiresLabel = formatExpiresAt(p_0.status.expires_at, t.oauth.expiresIn);
					const isBusy = busyId === p_0.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 min-w-0 flex-1",
							children: [p_0.status.logged_in ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-success shrink-0 mt-0.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldOff, { className: "h-5 w-5 text-muted-foreground shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col min-w-0 gap-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-sm",
												children: p_0.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "outline",
												className: "text-xs tracking-wide",
												children: t.oauth.flowLabels[p_0.flow]
											}),
											p_0.status.logged_in && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "success",
												className: "text-xs",
												children: t.oauth.connected
											}),
											expiresLabel === "expired" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "destructive",
												className: "text-xs",
												children: t.oauth.expired
											}),
											expiresLabel && expiresLabel !== "expired" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "outline",
												className: "text-xs",
												children: expiresLabel
											})
										]
									}),
									p_0.status.logged_in && p_0.status.token_preview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "truncate text-xs font-mono-ui text-text-secondary",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-text-tertiary",
												children: "token "
											}),
											p_0.status.token_preview,
											p_0.status.source_label && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-text-tertiary",
												children: [
													" ",
													"· ",
													p_0.status.source_label
												]
											})
										]
									}),
									!p_0.status.logged_in && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-text-secondary",
										children: [t.oauth.notConnected.split("{command}")[0].trimEnd(), t.oauth.notConnected.split("{command}")[1] ?? ""]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex min-w-0 flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "font-courier truncate text-xs opacity-60",
											children: p_0.cli_command
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, {
											text: p_0.cli_command,
											label: t.oauth.cli,
											copiedLabel: t.oauth.copied
										})]
									})] }),
									p_0.status.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-destructive",
										children: p_0.status.error
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 shrink-0",
							children: [
								p_0.docs_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: p_0.docs_url,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex",
									title: `Open ${p_0.name} docs`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										size: "icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {})
									})
								}),
								!p_0.status.logged_in && p_0.flow !== "external" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: "uppercase",
									onClick: () => setLoginFor(p_0),
									children: t.oauth.login
								}),
								p_0.status.logged_in && p_0.flow !== "external" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									outlined: true,
									className: "uppercase",
									onClick: () => setDisconnectTarget(p_0),
									disabled: isBusy,
									prefix: isBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
									children: t.oauth.disconnect
								}),
								p_0.status.logged_in && p_0.flow === "external" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-text-tertiary italic px-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-3 w-3 inline mr-0.5" }), t.oauth.managedExternally]
								})
							]
						})]
					}, p_0.id);
				})
			})
		] }),
		loginFor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OAuthLoginModal, {
			provider: loginFor,
			onClose: () => {
				setLoginFor(null);
				refresh();
			},
			onSuccess: (msg) => onSuccess?.(msg),
			onError: (msg_0) => onError?.(msg_0)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: disconnectTarget !== null,
			onCancel: () => setDisconnectTarget(null),
			onConfirm: () => {
				if (disconnectTarget) handleDisconnect(disconnectTarget);
			},
			title: `${t.oauth.disconnect} ${disconnectTarget?.name ?? ""}?`,
			description: `This will remove the stored OAuth tokens for ${disconnectTarget?.name ?? "this provider"}. You will need to re-authenticate to use it again.`,
			destructive: true,
			confirmLabel: t.oauth.disconnect
		})
	] });
}
//#endregion
//#region web/src/pages/EnvPage.tsx
/** Map env-var key prefixes to a human-friendly provider name + ordering. */
var PROVIDER_GROUPS = [
	{
		prefix: "NOUS_",
		name: "Nous Portal",
		priority: 0
	},
	{
		prefix: "ANTHROPIC_",
		name: "Anthropic",
		priority: 1
	},
	{
		prefix: "DASHSCOPE_",
		name: "DashScope (Qwen)",
		priority: 2
	},
	{
		prefix: "HERMES_QWEN_",
		name: "DashScope (Qwen)",
		priority: 2
	},
	{
		prefix: "DEEPSEEK_",
		name: "DeepSeek",
		priority: 3
	},
	{
		prefix: "GOOGLE_",
		name: "Gemini",
		priority: 4
	},
	{
		prefix: "GEMINI_",
		name: "Gemini",
		priority: 4
	},
	{
		prefix: "GLM_",
		name: "GLM / Z.AI",
		priority: 5
	},
	{
		prefix: "ZAI_",
		name: "GLM / Z.AI",
		priority: 5
	},
	{
		prefix: "Z_AI_",
		name: "GLM / Z.AI",
		priority: 5
	},
	{
		prefix: "HF_",
		name: "Hugging Face",
		priority: 6
	},
	{
		prefix: "KIMI_",
		name: "Kimi / Moonshot",
		priority: 7
	},
	{
		prefix: "MINIMAX_CN_",
		name: "MiniMax (China)",
		priority: 9
	},
	{
		prefix: "MINIMAX_",
		name: "MiniMax",
		priority: 8
	},
	{
		prefix: "OPENCODE_GO_",
		name: "OpenCode Go",
		priority: 10
	},
	{
		prefix: "OPENCODE_ZEN_",
		name: "OpenCode Zen",
		priority: 11
	},
	{
		prefix: "OPENROUTER_",
		name: "OpenRouter",
		priority: 12
	},
	{
		prefix: "XIAOMI_",
		name: "Xiaomi MiMo",
		priority: 13
	},
	{
		prefix: "UPSTAGE_",
		name: "Upstage Solar",
		priority: 14
	}
];
function getProviderGroup(key) {
	for (const g of PROVIDER_GROUPS) if (key.startsWith(g.prefix)) return g.name;
	return "Other";
}
function getProviderPriority(groupName) {
	return PROVIDER_GROUPS.find((g) => g.name === groupName)?.priority ?? 99;
}
var CATEGORY_META_ICONS = {
	provider: Zap,
	tool: KeyRound,
	messaging: MessageSquare,
	setting: Settings
};
function EnvVarRow({ varKey, info, edits, setEdits, revealed, saving, onSave, onClear, onReveal, onCancelEdit, clearDialogOpen = false, compact = false }) {
	const { t } = useI18n();
	const isEditing = edits[varKey] !== void 0;
	const isRevealed = !!revealed[varKey];
	const displayValue = isRevealed ? revealed[varKey] : info.redacted_value ?? "---";
	if (compact && !info.is_set && !isEditing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 py-1.5 min-w-0 overflow-hidden text-text-secondary hover:text-foreground transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono-ui text-xs",
				children: varKey
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-text-tertiary truncate hidden sm:block",
				children: info.description
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 shrink-0",
			children: [info.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: info.url,
				target: "_blank",
				rel: "noreferrer",
				className: "inline-flex items-center gap-1 text-xs text-primary hover:underline",
				children: [
					t.env.getKey,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-2.5 w-2.5" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				outlined: true,
				prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}),
				onClick: () => setEdits((prev) => ({
					...prev,
					[varKey]: ""
				})),
				children: t.common.set
			})]
		})]
	});
	if (!info.is_set && !isEditing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 border border-border/50 px-4 py-2.5 min-w-0 overflow-hidden text-text-secondary hover:text-foreground transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "font-mono-ui text-xs",
				children: varKey
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-text-tertiary truncate hidden sm:block",
				children: info.description
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 shrink-0",
			children: [info.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: info.url,
				target: "_blank",
				rel: "noreferrer",
				className: "inline-flex items-center gap-1 text-xs text-primary hover:underline",
				children: [
					t.env.getKey,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-2.5 w-2.5" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				outlined: true,
				prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}),
				onClick: () => setEdits((prev_0) => ({
					...prev_0,
					[varKey]: ""
				})),
				children: t.common.set
			})]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2 border border-border p-4 min-w-0 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "font-mono-ui text-xs",
						children: varKey
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: info.is_set ? "success" : "outline",
						children: info.is_set ? t.common.set : t.env.notSet
					})]
				}), info.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: info.url,
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex items-center gap-1 text-xs text-primary hover:underline",
					children: [
						t.env.getKey,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-2.5 w-2.5" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: info.description
			}),
			info.tools.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1",
				children: info.tools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "secondary",
					className: "text-xs py-0 px-1.5",
					children: tool
				}, tool))
			}),
			!isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex-1 border border-border px-3 py-2 font-mono-ui text-xs ${isRevealed ? "bg-background text-foreground select-all" : "bg-muted/30 text-muted-foreground"}`,
						children: info.is_set ? displayValue : "---"
					}),
					info.is_set && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						ghost: true,
						size: "icon",
						onClick: () => onReveal(varKey),
						title: isRevealed ? t.env.hideValue : t.env.showValue,
						"aria-label": isRevealed ? `Hide ${varKey}` : `Reveal ${varKey}`,
						children: isRevealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						outlined: true,
						prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}),
						onClick: () => setEdits((prev_1) => ({
							...prev_1,
							[varKey]: ""
						})),
						children: info.is_set ? t.common.replace : t.common.set
					}),
					info.is_set && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						outlined: true,
						destructive: true,
						prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}),
						onClick: () => onClear(varKey),
						disabled: saving === varKey || clearDialogOpen,
						children: saving === varKey ? "..." : t.common.clear
					})
				]
			}),
			isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoFocus: true,
						type: "text",
						value: edits[varKey],
						onChange: (e) => setEdits((prev_2) => ({
							...prev_2,
							[varKey]: e.target.value
						})),
						placeholder: info.is_set ? t.env.replaceCurrentValue.replace("{preview}", info.redacted_value ?? "---") : t.env.enterValue,
						className: "flex-1 font-mono-ui text-xs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => onSave(varKey),
						prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {}),
						disabled: saving === varKey || !edits[varKey],
						children: saving === varKey ? "..." : t.common.save
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						outlined: true,
						prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}),
						onClick: () => onCancelEdit(varKey),
						children: t.common.cancel
					})
				]
			})
		]
	});
}
function ProviderGroupCard({ group, edits, setEdits, revealed, saving, onSave, onClear, onReveal, onCancelEdit, clearDialogOpen = false }) {
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const { t } = useI18n();
	const apiKeys = group.entries.filter(([k]) => k.endsWith("_API_KEY") || k.endsWith("_TOKEN"));
	const baseUrls = group.entries.filter(([k_0]) => k_0.endsWith("_BASE_URL"));
	const other = group.entries.filter(([k_1]) => !k_1.endsWith("_API_KEY") && !k_1.endsWith("_TOKEN") && !k_1.endsWith("_BASE_URL"));
	const hasAnyConfigured = group.entries.some(([, info]) => info.is_set);
	const configuredCount = group.entries.filter(([, info_0]) => info_0.is_set).length;
	const keyUrl = apiKeys.find(([, info_1]) => info_1.url)?.[1]?.url ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
			onClick: () => setExpanded(!expanded),
			"aria-expanded": expanded,
			className: "justify-between gap-3 px-4 py-3 hover:bg-primary/5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 min-w-0",
				children: [
					expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-sm tracking-wide",
						children: group.name === "Other" ? t.common.other : group.name
					}),
					hasAnyConfigured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: "success",
						className: "text-xs",
						children: [
							configuredCount,
							" ",
							t.common.set.toLowerCase()
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 shrink-0",
				children: [keyUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: keyUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex items-center gap-1 text-xs text-primary hover:underline",
					onClick: (e) => e.stopPropagation(),
					children: [
						t.env.getKey,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-2.5 w-2.5" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-text-tertiary",
					children: t.env.keysCount.replace("{count}", String(group.entries.length)).replace("{s}", group.entries.length !== 1 ? "s" : "")
				})]
			})]
		}), expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border px-4 py-3 grid gap-2",
			children: [
				apiKeys.map(([key, info_2]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvVarRow, {
					varKey: key,
					info: info_2,
					compact: true,
					edits,
					setEdits,
					revealed,
					saving,
					onSave,
					onClear,
					onReveal,
					onCancelEdit,
					clearDialogOpen
				}, key)),
				baseUrls.map(([key_0, info_3]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvVarRow, {
					varKey: key_0,
					info: info_3,
					compact: true,
					edits,
					setEdits,
					revealed,
					saving,
					onSave,
					onClear,
					onReveal,
					onCancelEdit,
					clearDialogOpen
				}, key_0)),
				other.map(([key_1, info_4]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvVarRow, {
					varKey: key_1,
					info: info_4,
					compact: true,
					edits,
					setEdits,
					revealed,
					saving,
					onSave,
					onClear,
					onReveal,
					onCancelEdit,
					clearDialogOpen
				}, key_1))
			]
		})]
	});
}
var ENV_VAR_NAME_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;
function CustomKeysCard({ entries, edits, setEdits, revealed, saving, onSave, onClear, onReveal, onCancelEdit, onAddKey, clearDialogOpen = false }) {
	const { t } = useI18n();
	const [newKey, setNewKey] = (0, import_react.useState)("");
	const trimmed = newKey.trim().toUpperCase();
	const alreadyEditing = edits[trimmed] !== void 0;
	const nameValid = ENV_VAR_NAME_RE.test(trimmed);
	const showInvalid = trimmed.length > 0 && !nameValid;
	const rowProps = {
		edits,
		setEdits,
		revealed,
		saving,
		onSave,
		onClear,
		onReveal,
		onCancelEdit,
		clearDialogOpen
	};
	const handleAdd = () => {
		if (!nameValid || alreadyEditing) return;
		onAddKey(trimmed);
		setNewKey("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		id: "section-custom",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "border-b border-border bg-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: t.env.customTitle
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: t.env.customConfigured.replace("{count}", String(entries.length)).replace("{s}", entries.length !== 1 ? "s" : "") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					className: "text-text-tertiary",
					children: t.env.customHint
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "grid gap-3 overflow-hidden pt-4",
			children: [entries.map(([key, info]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvVarRow, {
				varKey: key,
				info,
				...rowProps
			}, key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 border border-dashed border-border p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "text-xs font-semibold tracking-wide",
					children: t.env.addCustomKey
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "text",
							value: newKey,
							onChange: (e) => setNewKey(e.target.value),
							onKeyDown: (e_0) => {
								if (e_0.key === "Enter") handleAdd();
							},
							placeholder: t.env.customKeyNamePlaceholder,
							"aria-label": t.env.customKeyName,
							className: "w-full font-mono-ui text-xs"
						}), showInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: t.env.invalidKeyName
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}),
						onClick: handleAdd,
						disabled: !nameValid || alreadyEditing,
						children: t.env.add
					})]
				})]
			})]
		})]
	});
}
function EnvPage() {
	const [vars, setVars] = (0, import_react.useState)(null);
	const [edits, setEdits] = (0, import_react.useState)({});
	const [revealed, setRevealed] = (0, import_react.useState)({});
	const [saving, setSaving] = (0, import_react.useState)(null);
	const [showAdvanced, setShowAdvanced] = (0, import_react.useState)(true);
	const { toast, showToast } = useToast();
	const { t } = useI18n();
	const { setAfterTitle } = usePageHeader();
	(0, import_react.useEffect)(() => {
		api.getEnvVars().then(setVars).catch(() => {});
	}, []);
	const sections = (0, import_react.useMemo)(() => {
		const items = [{
			id: "section-oauth",
			label: "OAuth"
		}, {
			id: "section-providers",
			label: "Providers"
		}];
		if (vars) {
			const categories = [
				"tool",
				"messaging",
				"setting"
			];
			const CATEGORY_LABELS = {
				tool: "Tools",
				messaging: t.common.gateway ?? "Gateway",
				setting: "Settings"
			};
			for (const cat of categories) if (Object.values(vars).some((info) => info.category === cat && !info.channel_managed)) items.push({
				id: `section-${cat}`,
				label: CATEGORY_LABELS[cat] ?? cat
			});
			items.push({
				id: "section-custom",
				label: t.env.customTitle
			});
		}
		return items;
	}, [vars, t]);
	(0, import_react.useLayoutEffect)(() => {
		if (!vars) {
			setAfterTitle(null);
			return;
		}
		const scrollTo = (id) => {
			document.getElementById(id)?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		};
		setAfterTitle(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "flex shrink-0 flex-nowrap items-center gap-1",
			"aria-label": "Jump to section",
			children: sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => scrollTo(s.id),
				className: "shrink-0 cursor-pointer px-2 py-0.5 font-mondwest text-display text-xs tracking-wider text-text-secondary hover:text-foreground border border-border/50 hover:border-foreground/30 transition-colors",
				children: s.label
			}, s.id))
		}));
		return () => {
			setAfterTitle(null);
		};
	}, [
		vars,
		sections,
		setAfterTitle
	]);
	const handleSave = async (key) => {
		const value = edits[key];
		if (!value) return;
		setSaving(key);
		try {
			await api.setEnvVar(key, value);
			setVars((prev) => prev ? {
				...prev,
				[key]: {
					...prev[key],
					is_set: true,
					redacted_value: value.slice(0, 4) + "..." + value.slice(-4)
				}
			} : prev);
			setEdits((prev_0) => {
				const n = { ...prev_0 };
				delete n[key];
				return n;
			});
			setRevealed((prev_1) => {
				const n_0 = { ...prev_1 };
				delete n_0[key];
				return n_0;
			});
			showToast(`${key} ${t.common.save.toLowerCase()}d`, "success");
		} catch (e) {
			showToast(`${t.config.failedToSave} ${key}: ${errorMessage(e)}`, "error");
		} finally {
			setSaving(null);
		}
	};
	const keyClear = useConfirmDelete({ onDelete: (0, import_react.useCallback)(async (key_0) => {
		setSaving(key_0);
		try {
			await api.deleteEnvVar(key_0);
			setVars((prev_2) => removeDeletedEnvVarFromState(prev_2, key_0));
			setEdits((prev_3) => {
				const n_1 = { ...prev_3 };
				delete n_1[key_0];
				return n_1;
			});
			setRevealed((prev_4) => {
				const n_2 = { ...prev_4 };
				delete n_2[key_0];
				return n_2;
			});
			showToast(`${key_0} ${t.common.removed}`, "success");
		} catch (e_0) {
			showToast(`${t.common.failedToRemove} ${key_0}: ${errorMessage(e_0)}`, "error");
			throw e_0;
		} finally {
			setSaving(null);
		}
	}, [
		showToast,
		t.common.removed,
		t.common.failedToRemove
	]) });
	const handleReveal = async (key_1) => {
		if (revealed[key_1]) {
			setRevealed((prev_5) => {
				const n_3 = { ...prev_5 };
				delete n_3[key_1];
				return n_3;
			});
			return;
		}
		try {
			const resp = await api.revealEnvVar(key_1);
			setRevealed((prev_6) => ({
				...prev_6,
				[key_1]: resp.value
			}));
		} catch {
			showToast(`${t.common.failedToReveal} ${key_1}`, "error");
		}
	};
	const cancelEdit = (key_2) => {
		setEdits((prev_7) => {
			const n_4 = { ...prev_7 };
			delete n_4[key_2];
			return n_4;
		});
	};
	const handleAddKey = (key_3) => {
		setVars((prev_8) => prev_8 && prev_8[key_3] ? prev_8 : {
			...prev_8 ?? {},
			[key_3]: {
				is_set: false,
				redacted_value: null,
				description: "",
				url: null,
				category: "custom",
				is_password: true,
				tools: [],
				advanced: false,
				custom: true
			}
		});
		setEdits((prev_9) => ({
			...prev_9,
			[key_3]: ""
		}));
	};
	const { providerGroups, nonProviderGrouped, customEntries: customEntries_0 } = (0, import_react.useMemo)(() => {
		if (!vars) return {
			providerGroups: [],
			nonProviderGrouped: [],
			customEntries: []
		};
		const providerEntries = Object.entries(vars).filter(([, info_0]) => info_0.category === "provider" && (showAdvanced || !info_0.advanced));
		const groupMap = /* @__PURE__ */ new Map();
		for (const entry of providerEntries) {
			const groupName = getProviderGroup(entry[0]);
			if (!groupMap.has(groupName)) groupMap.set(groupName, []);
			groupMap.get(groupName).push(entry);
		}
		const groups = Array.from(groupMap.entries()).map(([name, entries]) => ({
			name,
			priority: getProviderPriority(name),
			entries,
			hasAnySet: entries.some(([, info_1]) => info_1.is_set)
		})).sort((a, b) => a.priority - b.priority);
		const CATEGORY_META_LABELS = {
			tool: t.app.nav.keys,
			messaging: t.common.gateway ?? "Gateway",
			setting: t.app.nav.config
		};
		const CATEGORY_META_HINTS = { messaging: t.common.gatewayHint ?? "Messaging platforms, the API server and webhooks are configured on the Channels page. These are gateway-wide settings (proxy/relay mode and the global allowlist)." };
		return {
			providerGroups: groups,
			nonProviderGrouped: [
				"tool",
				"messaging",
				"setting"
			].map((cat_0) => {
				const entries_0 = Object.entries(vars).filter(([, info_2]) => info_2.category === cat_0 && !info_2.channel_managed && (showAdvanced || !info_2.advanced));
				const setEntries = entries_0.filter(([, info_3]) => info_3.is_set);
				const unsetEntries = entries_0.filter(([, info_4]) => !info_4.is_set);
				return {
					label: CATEGORY_META_LABELS[cat_0] ?? cat_0,
					hint: CATEGORY_META_HINTS[cat_0],
					icon: CATEGORY_META_ICONS[cat_0] ?? KeyRound,
					category: cat_0,
					setEntries,
					unsetEntries,
					totalEntries: entries_0.length
				};
			}),
			customEntries: Object.entries(vars).filter(([, info_5]) => info_5.category === "custom" && !info_5.channel_managed).sort(([a_0], [b_0]) => a_0.localeCompare(b_0))
		};
	}, [
		vars,
		showAdvanced,
		t
	]);
	if (!vars) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-2xl text-primary" })
	});
	const totalProviders = providerGroups.length;
	const configuredProviders = providerGroups.filter((g) => g.hasAnySet).length;
	const pendingClearKey = keyClear.pendingId;
	const pendingKeyDescription = pendingClearKey && vars ? vars[pendingClearKey]?.description : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "env:top" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: keyClear.isOpen,
				onCancel: keyClear.cancel,
				onConfirm: keyClear.confirm,
				title: t.env.confirmClearTitle,
				description: pendingClearKey ? `${pendingClearKey}${pendingKeyDescription ? ` — ${pendingKeyDescription}` : ""}. ${t.env.confirmClearMessage}` : t.env.confirmClearMessage,
				loading: keyClear.isDeleting
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							t.env.description,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "~/.hermes/.env" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-tertiary",
						children: t.env.changesNote
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					outlined: true,
					onClick: () => setShowAdvanced(!showAdvanced),
					children: showAdvanced ? t.env.hideAdvanced : t.env.showAdvanced
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "section-oauth",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OAuthProvidersCard, {
					onError: (msg) => showToast(msg, "error"),
					onSuccess: (msg_0) => showToast(msg_0, "success")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				id: "section-providers",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "border-b border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: t.env.llmProviders
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: t.env.providersConfigured.replace("{configured}", String(configuredProviders)).replace("{total}", String(totalProviders)) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "grid gap-0 p-0",
					children: providerGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderGroupCard, {
						group,
						edits,
						setEdits,
						revealed,
						saving,
						onSave: handleSave,
						onClear: keyClear.requestDelete,
						onReveal: handleReveal,
						onCancelEdit: cancelEdit,
						clearDialogOpen: keyClear.isOpen
					}, group.name))
				})]
			}),
			nonProviderGrouped.map((section) => {
				if (section.totalEntries === 0) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvCategoryCard, {
					section,
					edits,
					setEdits,
					revealed,
					saving,
					onSave: handleSave,
					onClear: keyClear.requestDelete,
					onReveal: handleReveal,
					onCancelEdit: cancelEdit,
					clearDialogOpen: keyClear.isOpen
				}, section.category);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomKeysCard, {
				entries: customEntries_0,
				edits,
				setEdits,
				revealed,
				saving,
				onSave: handleSave,
				onClear: keyClear.requestDelete,
				onReveal: handleReveal,
				onCancelEdit: cancelEdit,
				onAddKey: handleAddKey,
				clearDialogOpen: keyClear.isOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "env:bottom" })
		]
	});
}
function EnvCategoryCard({ section, edits, setEdits, revealed, saving, onSave, onClear, onReveal, onCancelEdit, clearDialogOpen = false }) {
	const noneConfigured = section.setEntries.length === 0;
	const [showAll, setShowAll] = (0, import_react.useState)(noneConfigured);
	const { t } = useI18n();
	const Icon = section.icon;
	const hasContent = section.setEntries.length > 0 || showAll;
	const rowProps = {
		edits,
		setEdits,
		revealed,
		saving,
		onSave,
		onClear,
		onReveal,
		onCancelEdit,
		clearDialogOpen
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		id: `section-${section.category}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: `bg-card${hasContent ? " border-b border-border" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-base",
							children: section.label
						})]
					}), section.unsetEntries.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setShowAll((open) => !open),
						"aria-expanded": showAll,
						className: "shrink-0 cursor-pointer border-0 bg-transparent p-0 font-mondwest text-xs tracking-[0.08em] text-text-secondary transition-colors hover:text-foreground",
						children: showAll ? t.env.showLess : t.env.showMore
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
					section.setEntries.length,
					" ",
					t.common.of,
					" ",
					section.totalEntries,
					" ",
					t.common.configured
				] }),
				section.hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
					className: "text-text-tertiary",
					children: section.hint
				})
			]
		}), hasContent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "grid gap-3 overflow-hidden pt-4",
			children: [section.setEntries.map(([key, info]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvVarRow, {
				varKey: key,
				info,
				...rowProps
			}, key)), showAll && section.unsetEntries.map(([key_0, info_0]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnvVarRow, {
				varKey: key_0,
				info: info_0,
				...rowProps
			}, key_0))]
		})]
	});
}
//#endregion
export { EnvPage as default };
