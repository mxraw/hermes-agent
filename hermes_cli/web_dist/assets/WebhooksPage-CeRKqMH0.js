import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { P as RotateCw, U as Plus, Yt as Check, g as Trash2, m as TriangleAlert, r as X, s as Webhook, zt as Copy } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, L as Spinner, N as Select, P as SelectOption, a as H2, b as useConfirmDelete, f as Label, h as CardContent, m as Card, p as Input, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { t as cn } from "./utils-XzxpPQdK.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
import { t as useModalBehavior } from "./useModalBehavior-DSqJduTw.js";
import { t as copyTextToClipboard } from "./clipboard-C-rbBxe_.js";
import { t as DeleteConfirmDialog } from "./DeleteConfirmDialog-CS54bGFr.js";
//#region web/src/pages/WebhooksPage.tsx
var import_compiler_runtime = require_compiler_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function CopyButton(t0) {
	const $ = (0, import_compiler_runtime.c)(7);
	const { value } = t0;
	const [copied, setCopied] = (0, import_react.useState)(false);
	let t1;
	if ($[0] !== value) {
		t1 = () => {
			copyTextToClipboard(value).then((copied_0) => {
				if (!copied_0) return;
				setCopied(true);
				window.setTimeout(() => setCopied(false), 1500);
			});
		};
		$[0] = value;
		$[1] = t1;
	} else t1 = $[1];
	const handleCopy = t1;
	let t2;
	if ($[2] !== copied) {
		t2 = copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {});
		$[2] = copied;
		$[3] = t2;
	} else t2 = $[3];
	let t3;
	if ($[4] !== handleCopy || $[5] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			size: "icon",
			title: "Copy",
			"aria-label": "Copy",
			onClick: handleCopy,
			className: "text-muted-foreground hover:text-foreground",
			children: t2
		});
		$[4] = handleCopy;
		$[5] = t2;
		$[6] = t3;
	} else t3 = $[6];
	return t3;
}
function WebhooksPage() {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [enabling, setEnabling] = (0, import_react.useState)(false);
	const [restartNeeded, setRestartNeeded] = (0, import_react.useState)(false);
	const [restartMessage, setRestartMessage] = (0, import_react.useState)(null);
	const [restartError, setRestartError] = (0, import_react.useState)(null);
	const [restarting, setRestarting] = (0, import_react.useState)(false);
	const { toast, showToast } = useToast();
	const { setEnd } = usePageHeader();
	const [createModalOpen, setCreateModalOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [events, setEvents] = (0, import_react.useState)("");
	const [deliver, setDeliver] = (0, import_react.useState)("log");
	const [deliverOnly, setDeliverOnly] = (0, import_react.useState)(false);
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [created, setCreated] = (0, import_react.useState)(null);
	const closeCreateModal = (0, import_react.useCallback)(() => {
		setCreateModalOpen(false);
		setCreated(null);
	}, []);
	const createModalRef = useModalBehavior({
		open: createModalOpen,
		onClose: closeCreateModal
	});
	const enabled = data?.enabled ?? false;
	const subscriptions = data?.subscriptions ?? [];
	const loadWebhooks = (0, import_react.useCallback)(() => {
		return api.getWebhooks().then(setData).catch(() => showToast("Failed to load webhooks", "error")).finally(() => setLoading(false));
	}, [showToast]);
	(0, import_react.useEffect)(() => {
		loadWebhooks();
	}, [loadWebhooks]);
	const watchRestartOutcome = (0, import_react.useCallback)(async () => {
		for (let i = 0; i < 20; i++) {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			try {
				const st = await api.getActionStatus("gateway-restart", 5);
				if (st.running) continue;
				if (st.exit_code !== 0 && st.exit_code !== null) {
					setRestartMessage(null);
					setRestartNeeded(true);
					setRestartError(`Gateway restart failed with exit ${st.exit_code}.`);
					showToast(`Gateway restart failed (exit ${st.exit_code}) — restart manually`, "error");
				} else {
					setRestartMessage(null);
					setRestartNeeded(false);
					setRestartError(null);
				}
				return;
			} catch {}
		}
		setRestartMessage(null);
	}, [showToast]);
	const handleRestart = (0, import_react.useCallback)(async () => {
		setRestarting(true);
		try {
			await api.restartGateway();
			setRestartNeeded(false);
			setRestartError(null);
			setRestartMessage("Gateway restarting…");
			showToast("Gateway restarting…", "success");
			setTimeout(() => void loadWebhooks(), 4e3);
			watchRestartOutcome();
		} catch (e) {
			setRestartNeeded(true);
			setRestartError(errorMessage(e));
			showToast(`Failed to restart: ${errorMessage(e)}`, "error");
		} finally {
			setRestarting(false);
		}
	}, [
		loadWebhooks,
		showToast,
		watchRestartOutcome
	]);
	const handleEnableWebhooks = (0, import_react.useCallback)(async () => {
		setEnabling(true);
		setRestartNeeded(false);
		setRestartError(null);
		try {
			const result = await api.enableWebhooks();
			await loadWebhooks();
			if (result.restart_started) {
				setRestartMessage("Webhooks enabled; gateway restarting…");
				showToast("Webhooks enabled; gateway restarting…", "success");
				setTimeout(() => void loadWebhooks(), 4e3);
				watchRestartOutcome();
			} else {
				const detail = result.restart_error ? `: ${result.restart_error}` : ".";
				setRestartMessage(null);
				setRestartNeeded(true);
				setRestartError(`Gateway restart failed${detail}`);
				showToast(`Webhooks enabled; gateway restart failed${detail}`, "error");
			}
		} catch (e_0) {
			showToast(`Failed to enable webhooks: ${errorMessage(e_0)}`, "error");
		} finally {
			setEnabling(false);
		}
	}, [
		loadWebhooks,
		showToast,
		watchRestartOutcome
	]);
	const resetForm = (0, import_react.useCallback)(() => {
		setName("");
		setDescription("");
		setEvents("");
		setDeliver("log");
		setDeliverOnly(false);
		setPrompt("");
	}, []);
	const handleCreate = async () => {
		if (!name.trim()) {
			showToast("Name required", "error");
			return;
		}
		setCreating(true);
		try {
			const eventsList = events.split(",").map((e_2) => e_2.trim()).filter(Boolean);
			const res = await api.createWebhook({
				name: name.trim(),
				description: description.trim() || void 0,
				events: eventsList.length ? eventsList : void 0,
				deliver,
				deliver_only: deliverOnly,
				prompt: prompt.trim() || void 0
			});
			showToast("Created ✓", "success");
			setCreated({
				url: res.url,
				secret: res.secret
			});
			resetForm();
			loadWebhooks();
		} catch (e_1) {
			showToast(`Failed to create: ${errorMessage(e_1)}`, "error");
		} finally {
			setCreating(false);
		}
	};
	const [togglingName, setTogglingName] = (0, import_react.useState)(null);
	const handleToggleEnabled = (0, import_react.useCallback)(async (subName, nextEnabled) => {
		setTogglingName(subName);
		try {
			await api.setWebhookEnabled(subName, nextEnabled);
			showToast(nextEnabled ? `Enabled: "${subName}"` : `Disabled: "${subName}"`, "success");
			loadWebhooks();
		} catch (e_3) {
			showToast(`Error: ${errorMessage(e_3)}`, "error");
		} finally {
			setTogglingName(null);
		}
	}, [loadWebhooks, showToast]);
	const webhookDelete = useConfirmDelete({ onDelete: (0, import_react.useCallback)(async (name_0) => {
		try {
			await api.deleteWebhook(name_0);
			showToast(`Deleted: "${name_0}"`, "success");
			loadWebhooks();
		} catch (e_4) {
			showToast(`Error: ${errorMessage(e_4)}`, "error");
			throw e_4;
		}
	}, [loadWebhooks, showToast]) });
	(0, import_react.useLayoutEffect)(() => {
		setEnd(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "uppercase",
			size: "sm",
			disabled: !enabled || enabling,
			prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}),
			onClick: () => {
				setCreated(null);
				setCreateModalOpen(true);
			},
			children: "New subscription"
		}));
		return () => {
			setEnd(null);
		};
	}, [
		setEnd,
		enabled,
		enabling,
		loading
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-2xl text-primary" })
	});
	const pendingName = webhookDelete.pendingId ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: webhookDelete.isOpen,
				onCancel: webhookDelete.cancel,
				onConfirm: webhookDelete.confirm,
				title: "Delete webhook",
				description: pendingName ? `"${pendingName}" — this will permanently remove this webhook subscription.` : "This will permanently remove this webhook subscription.",
				loading: webhookDelete.isDeleting
			}),
			createModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: createModalRef,
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4",
				onClick: (e_5) => e_5.target === e_5.currentTarget && closeCreateModal(),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "create-webhook-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("font-mondwest normal-case", "relative w-full max-w-lg border border-border bg-card shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							ghost: true,
							size: "icon",
							onClick: closeCreateModal,
							className: "absolute right-2 top-2 text-muted-foreground hover:text-foreground",
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
							className: "p-5 pb-3 border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "create-webhook-title",
								className: "font-mondwest text-display text-base tracking-wider",
								children: "New subscription"
							})
						}),
						created ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Subscription created. Copy the secret now — it is only shown once."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Webhook URL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 border border-border bg-background/40 px-3 py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1 min-w-0 truncate font-mono text-xs",
											children: created.url
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { value: created.url })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Secret (shown once)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 border border-warning/40 bg-warning/10 px-3 py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1 min-w-0 truncate font-mono text-xs",
											children: created.secret
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { value: created.secret })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "uppercase",
										size: "sm",
										onClick: closeCreateModal,
										children: "Done"
									})
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "webhook-name",
										children: "Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "webhook-name",
										autoFocus: true,
										placeholder: "e.g. github-push",
										value: name,
										onChange: (e_6) => setName(e_6.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "webhook-description",
										children: "Description"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "webhook-description",
										placeholder: "What this webhook does (optional)",
										value: description,
										onChange: (e_7) => setDescription(e_7.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "webhook-events",
										children: "Events"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "webhook-events",
										placeholder: "comma-separated, leave empty for all",
										value: events,
										onChange: (e_8) => setEvents(e_8.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "webhook-deliver",
											children: "Deliver to"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											id: "webhook-deliver",
											value: deliver,
											onValueChange: (v) => setDeliver(v),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
													value: "log",
													children: "Log"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
													value: "telegram",
													children: "Telegram"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
													value: "discord",
													children: "Discord"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
													value: "slack",
													children: "Slack"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
													value: "email",
													children: "Email"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
													value: "github_comment",
													children: "GitHub comment"
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "webhook-deliver-only",
											children: "Deliver only"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 text-sm text-muted-foreground h-9",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "webhook-deliver-only",
												type: "checkbox",
												checked: deliverOnly,
												onChange: (e_9) => setDeliverOnly(e_9.target.checked)
											}), "Skip the agent, deliver payload directly"]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "webhook-prompt",
										children: "Prompt"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "webhook-prompt",
										className: "flex min-h-[80px] w-full border border-border bg-background/40 px-3 py-2 text-sm font-courier shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 focus-visible:border-foreground/25",
										placeholder: "Instructions for the agent when this webhook fires (optional)",
										value: prompt,
										onChange: (e_10) => setPrompt(e_10.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "uppercase",
										size: "sm",
										onClick: handleCreate,
										disabled: creating,
										prefix: creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
										children: creating ? "Creating…" : "Create"
									})
								})
							]
						})
					]
				})
			}),
			!enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-warning/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Webhook, { className: "h-5 w-5 shrink-0 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "Webhook receiver disabled"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Webhooks are their own gateway platform. Enable them here to accept incoming HTTP events; chat channels are only needed when a subscription delivers to Telegram, Discord, Slack, or another channel."
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "uppercase shrink-0",
						onClick: handleEnableWebhooks,
						disabled: enabling,
						prefix: enabling ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Webhook, { className: "h-4 w-4" }),
						children: enabling ? "Enabling…" : "Enable webhooks"
					})]
				})
			}),
			restartMessage && !restartNeeded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex items-center gap-2 p-4 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-4 w-4 shrink-0 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: restartMessage })]
				})
			}),
			restartNeeded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "border-warning/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: restartError ?? "Webhooks are enabled, but the gateway still needs a restart before the receiver can come online." })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "uppercase shrink-0",
						onClick: handleRestart,
						disabled: restarting,
						prefix: restarting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-4 w-4" }),
						children: restarting ? "Restarting…" : "Restart gateway"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
						variant: "sm",
						className: "flex items-center gap-2 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Webhook, { className: "h-4 w-4" }),
							"Subscriptions (",
							subscriptions.length,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground -mt-1",
						children: "Subscription changes hot-reload once the webhook receiver is running. Disabled subscriptions reject incoming events."
					}),
					subscriptions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "No webhook subscriptions yet."
					}) }),
					subscriptions.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex items-start gap-4 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("flex-1 min-w-0", !sub.enabled && "opacity-60"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-1 flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-sm truncate",
											children: sub.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "outline",
											children: sub.deliver
										}),
										sub.deliver_only && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "secondary",
											children: "deliver only"
										}),
										!sub.enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "warning",
											children: "disabled"
										})
									]
								}),
								sub.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mb-2",
									children: sub.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-1 flex-wrap mb-2",
									children: sub.events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "secondary",
										children: "(all)"
									}) : sub.events.map((evt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "secondary",
										children: evt
									}, evt))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1 min-w-0 truncate font-mono",
										children: sub.url
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { value: sub.url })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								ghost: true,
								size: "sm",
								className: "uppercase",
								disabled: togglingName === sub.name,
								onClick: () => handleToggleEnabled(sub.name, !sub.enabled),
								children: sub.enabled ? "Disable" : "Enable"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								ghost: true,
								destructive: true,
								size: "icon",
								title: "Delete",
								"aria-label": "Delete",
								onClick: () => webhookDelete.requestDelete(sub.name),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
							})]
						})]
					}) }, sub.name))
				]
			})
		]
	});
}
//#endregion
export { WebhooksPage as default };
