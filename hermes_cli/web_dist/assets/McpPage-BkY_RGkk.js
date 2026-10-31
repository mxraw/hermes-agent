import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { A as Server, V as Power, et as Package, g as Trash2, n as Zap, pt as KeyRound, r as X } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, L as Spinner, N as Select, P as SelectOption, a as H2, b as useConfirmDelete, f as Label, h as CardContent, m as Card, p as Input, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { t as cn } from "./utils-XzxpPQdK.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
import { t as useModalBehavior } from "./useModalBehavior-DSqJduTw.js";
import { t as DeleteConfirmDialog } from "./DeleteConfirmDialog-CS54bGFr.js";
import { t as buildMcpServerCreate } from "./mcp-server-create-BjaPvL6F.js";
//#region web/src/lib/mcp-dashboard-oauth.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var defaultSleep = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
async function completeMcpDashboardOAuth({ serverName, start, status, open, sleep = defaultSleep, maxPollFailures = 3 }) {
	const authWindow = open("about:blank", "_blank");
	if (!authWindow) throw new Error("OAuth popup was blocked — allow popups for this dashboard and retry");
	authWindow.opener = null;
	let started;
	try {
		started = await start(serverName);
		if (started.status === "error") throw new Error(started.error || "OAuth failed to start");
		if (!started.authorization_url) throw new Error("OAuth server did not provide an authorization URL");
		authWindow.location.href = started.authorization_url;
	} catch (error) {
		authWindow.close();
		throw error;
	}
	let pollFailures = 0;
	for (;;) {
		let current;
		try {
			current = await status(started.flow_id);
			pollFailures = 0;
		} catch (error) {
			pollFailures += 1;
			if (pollFailures >= maxPollFailures) throw error;
			await sleep(1e3);
			continue;
		}
		if (current.status === "approved") return current;
		if (current.status === "error") throw new Error(current.error || "OAuth authorization failed");
		if (authWindow.closed) throw new Error("OAuth authorization window was closed before completion");
		await sleep(1e3);
	}
}
//#endregion
//#region web/src/pages/McpPage.tsx
var import_jsx_runtime = require_jsx_runtime();
function isHttpUrl(value) {
	return /^https?:\/\//i.test(value.trim());
}
function truncateText(value, maxLength) {
	return value.length > maxLength ? value.slice(0, maxLength) + "..." : value;
}
var TRANSPORT_TONE = {
	http: "success",
	stdio: "warning",
	unknown: "secondary"
};
function McpPage() {
	const [servers, setServers] = (0, import_react.useState)([]);
	const [catalog, setCatalog] = (0, import_react.useState)([]);
	const [diagnostics, setDiagnostics] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const { toast, showToast } = useToast();
	const { setEnd } = usePageHeader();
	const [createModalOpen, setCreateModalOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [transport, setTransport] = (0, import_react.useState)("http");
	const [url, setUrl] = (0, import_react.useState)("");
	const [httpAuth, setHttpAuth] = (0, import_react.useState)("none");
	const [bearerToken, setBearerToken] = (0, import_react.useState)("");
	const [command, setCommand] = (0, import_react.useState)("");
	const [args, setArgs] = (0, import_react.useState)("");
	const [env, setEnv] = (0, import_react.useState)("");
	const [creating, setCreating] = (0, import_react.useState)(false);
	const closeCreateModal = (0, import_react.useCallback)(() => {
		setBearerToken("");
		setCreateModalOpen(false);
	}, []);
	const createModalRef = useModalBehavior({
		open: createModalOpen,
		onClose: closeCreateModal
	});
	const [testing, setTesting] = (0, import_react.useState)(null);
	const [authenticating, setAuthenticating] = (0, import_react.useState)(null);
	const [testResults, setTestResults] = (0, import_react.useState)({});
	const [togglingName, setTogglingName] = (0, import_react.useState)(null);
	const [restartNote, setRestartNote] = (0, import_react.useState)(null);
	const [installEntry, setInstallEntry] = (0, import_react.useState)(null);
	const [installEnv, setInstallEnv] = (0, import_react.useState)({});
	const [installingName, setInstallingName] = (0, import_react.useState)(null);
	const closeInstallModal = (0, import_react.useCallback)(() => setInstallEntry(null), []);
	const installModalRef = useModalBehavior({
		open: installEntry !== null,
		onClose: closeInstallModal
	});
	const loadServers = (0, import_react.useCallback)(() => {
		return api.getMcpServers().then((res) => setServers(res.servers)).catch((e) => showToast(`Could not load MCP servers: ${errorMessage(e)}`, "error"));
	}, [showToast]);
	const loadCatalog = (0, import_react.useCallback)(() => {
		return api.getMcpCatalog().then((res_0) => {
			setCatalog(res_0.entries);
			setDiagnostics(res_0.diagnostics);
		}).catch((e_0) => showToast(`Could not load the MCP catalog: ${errorMessage(e_0)}`, "error"));
	}, [showToast]);
	(0, import_react.useEffect)(() => {
		Promise.all([loadServers(), loadCatalog()]).finally(() => setLoading(false));
	}, [loadServers, loadCatalog]);
	const handleCreate = async () => {
		let body;
		try {
			body = buildMcpServerCreate({
				name,
				transport,
				url,
				httpAuth,
				bearerToken,
				command,
				args,
				env
			});
		} catch (error) {
			showToast(error instanceof Error ? error.message : "Invalid MCP server", "error");
			return;
		}
		setCreating(true);
		try {
			await api.addMcpServer(body);
			showToast(transport === "http" && httpAuth === "oauth" ? "Added — authenticate with OAuth" : "Add ✓", "success");
			setName("");
			setUrl("");
			setHttpAuth("none");
			setBearerToken("");
			setCommand("");
			setArgs("");
			setEnv("");
			setTransport("http");
			setCreateModalOpen(false);
			loadServers();
		} catch (e_1) {
			showToast(`Could not add MCP server: ${errorMessage(e_1)}`, "error");
		} finally {
			setCreating(false);
		}
	};
	const handleTest = async (server) => {
		setTesting(server.name);
		try {
			const result = await api.testMcpServer(server.name);
			setTestResults((prev) => ({
				...prev,
				[server.name]: result
			}));
			if (result.ok) showToast(`${server.name}: ${result.tools.length} tool(s)`, "success");
			else showToast(`${server.name}: ${result.error ?? "Failed"}`, "error");
		} catch (e_2) {
			showToast(`Could not test the MCP server: ${errorMessage(e_2)}`, "error");
		} finally {
			setTesting(null);
		}
	};
	const handleAuthenticate = async (server_0) => {
		setAuthenticating(server_0.name);
		try {
			const result_0 = await completeMcpDashboardOAuth({
				serverName: server_0.name,
				start: api.authMcpServer,
				status: api.getMcpOAuthFlow,
				open: window.open.bind(window)
			});
			setTestResults((prev_0) => ({
				...prev_0,
				[server_0.name]: {
					ok: true,
					tools: result_0.tools ?? []
				}
			}));
			showToast(`${server_0.name}: OAuth authentication complete`, "success");
		} catch (e_3) {
			showToast(`Could not sign in to the MCP server: ${errorMessage(e_3)}`, "error");
		} finally {
			setAuthenticating(null);
		}
	};
	const handleToggleEnabled = async (server_1) => {
		const next = !server_1.enabled;
		setTogglingName(server_1.name);
		try {
			await api.setMcpServerEnabled(server_1.name, next);
			setServers((prev_1) => prev_1.map((s) => s.name === server_1.name ? {
				...s,
				enabled: next
			} : s));
			setRestartNote("Enable/disable takes effect on the next gateway restart.");
		} catch (e_4) {
			showToast(`Could not update the MCP server: ${errorMessage(e_4)}`, "error");
		} finally {
			setTogglingName(null);
		}
	};
	const serverDelete = useConfirmDelete({ onDelete: (0, import_react.useCallback)(async (serverName) => {
		try {
			await api.removeMcpServer(serverName);
			showToast(`Delete: "${truncateText(serverName, 30)}"`, "success");
			setTestResults((prev_2) => {
				const next_0 = { ...prev_2 };
				delete next_0[serverName];
				return next_0;
			});
			loadServers();
		} catch (e_5) {
			showToast(`Could not remove the MCP server: ${errorMessage(e_5)}`, "error");
			throw e_5;
		}
	}, [loadServers, showToast]) });
	const runInstall = (0, import_react.useCallback)(async (entry, envMap) => {
		setInstallingName(entry.name);
		try {
			if ((await api.installMcpCatalogEntry(entry.name, envMap, true)).background) showToast("Installing in background…", "success");
			else showToast(`Installed: "${truncateText(entry.name, 30)}"`, "success");
			setInstallEntry(null);
			setInstallEnv({});
			await Promise.all([loadServers(), loadCatalog()]);
		} catch (e_6) {
			showToast(`Could not install from the catalog: ${errorMessage(e_6)}`, "error");
		} finally {
			setInstallingName(null);
		}
	}, [
		loadServers,
		loadCatalog,
		showToast
	]);
	const handleInstallClick = (entry_0) => {
		if (entry_0.required_env.length > 0) {
			const initial = {};
			entry_0.required_env.forEach((item) => {
				initial[item.name] = "";
			});
			setInstallEnv(initial);
			setInstallEntry(entry_0);
		} else runInstall(entry_0, {});
	};
	const handleInstallSubmit = () => {
		if (!installEntry) return;
		const missing = installEntry.required_env.filter((item_0) => item_0.required && !(installEnv[item_0.name] ?? "").trim());
		if (missing.length > 0) {
			showToast(`${missing[0].prompt} required`, "error");
			return;
		}
		const envMap_0 = {};
		Object.entries(installEnv).forEach(([k, v]) => {
			if (v.trim()) envMap_0[k] = v.trim();
		});
		runInstall(installEntry, envMap_0);
	};
	(0, import_react.useLayoutEffect)(() => {
		setEnd(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "uppercase",
			size: "sm",
			onClick: () => setCreateModalOpen(true),
			children: "Add Server"
		}));
		return () => {
			setEnd(null);
		};
	}, [setEnd, loading]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-2xl text-primary" })
	});
	const diagnosticsByName = {};
	diagnostics.forEach((d) => {
		(diagnosticsByName[d.name] ??= []).push(d);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: serverDelete.isOpen,
				onCancel: serverDelete.cancel,
				onConfirm: serverDelete.confirm,
				title: "Remove MCP server",
				description: serverDelete.pendingId ? `"${truncateText(serverDelete.pendingId, 40)}" — this will remove the server.` : "This will remove the server.",
				loading: serverDelete.isDeleting
			}),
			createModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: createModalRef,
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4",
				onClick: (e_7) => e_7.target === e_7.currentTarget && closeCreateModal(),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "create-mcp-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("font-mondwest normal-case", "relative w-full max-w-lg border border-border bg-card shadow-2xl flex flex-col"),
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
								id: "create-mcp-title",
								className: "font-mondwest text-display text-base tracking-wider",
								children: "Add MCP server"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "mcp-name",
										children: "Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "mcp-name",
										autoFocus: true,
										placeholder: "my-server",
										value: name,
										onChange: (e_8) => setName(e_8.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "mcp-transport",
										children: "Transport"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										id: "mcp-transport",
										value: transport,
										onValueChange: (value) => {
											const nextTransport = value;
											setTransport(nextTransport);
											if (nextTransport === "stdio") setBearerToken("");
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
											value: "http",
											children: "HTTP/SSE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
											value: "stdio",
											children: "stdio"
										})]
									})]
								}),
								transport === "http" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "mcp-url",
											children: "URL"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "mcp-url",
											placeholder: "https://example.com/mcp",
											value: url,
											onChange: (e_9) => setUrl(e_9.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "mcp-auth",
											children: "Authentication"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											id: "mcp-auth",
											value: httpAuth,
											onValueChange: (value_0) => {
												const nextAuth = value_0;
												setHttpAuth(nextAuth);
												if (nextAuth !== "header") setBearerToken("");
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
													value: "none",
													children: "None"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
													value: "header",
													children: "Bearer token"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
													value: "oauth",
													children: "OAuth"
												})
											]
										})]
									}),
									httpAuth === "header" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "mcp-bearer-token",
												children: "Bearer token"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "mcp-bearer-token",
												type: "password",
												autoComplete: "new-password",
												placeholder: "Token or Bearer token",
												value: bearerToken,
												onChange: (e_10) => setBearerToken(e_10.target.value)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Stored in this profile's .env; config.yaml keeps only an environment-variable reference."
											})
										]
									}),
									httpAuth === "oauth" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Add the server, then use Authenticate. Hermes opens the OAuth browser on the machine running the Dashboard backend."
									})
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "mcp-command",
											children: "Command"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "mcp-command",
											placeholder: "npx",
											value: command,
											onChange: (e_11) => setCommand(e_11.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "mcp-args",
											children: "Args"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "mcp-args",
											placeholder: "-y @modelcontextprotocol/server-foo",
											value: args,
											onChange: (e_12) => setArgs(e_12.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "mcp-env",
											children: "Environment (KEY=VALUE per line)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "mcp-env",
											className: "flex min-h-[80px] w-full border border-border bg-background/40 px-3 py-2 text-sm font-courier shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 focus-visible:border-foreground/25",
											placeholder: "API_KEY=secret\nDEBUG=1",
											value: env,
											onChange: (e_13) => setEnv(e_13.target.value)
										})]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "uppercase",
										size: "sm",
										onClick: handleCreate,
										disabled: creating,
										prefix: creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
										children: creating ? "Adding..." : "Add"
									})
								})
							]
						})
					]
				})
			}),
			installEntry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: installModalRef,
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4",
				onClick: (e_14) => e_14.target === e_14.currentTarget && setInstallEntry(null),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "install-mcp-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("font-mondwest normal-case", "relative w-full max-w-lg border border-border bg-card shadow-2xl flex flex-col"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							ghost: true,
							size: "icon",
							onClick: () => setInstallEntry(null),
							className: "absolute right-2 top-2 text-muted-foreground hover:text-foreground",
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
							className: "p-5 pb-3 border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								id: "install-mcp-title",
								className: "font-mondwest text-display text-base tracking-wider",
								children: ["Install ", installEntry.name]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "This MCP requires the following values to be configured."
								}),
								installEntry.required_env.map((item_1) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: `install-env-${item_1.name}`,
										children: [item_1.prompt, item_1.required ? " *" : ""]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: `install-env-${item_1.name}`,
										type: "password",
										placeholder: item_1.name,
										value: installEnv[item_1.name] ?? "",
										onChange: (e_15) => setInstallEnv((prev_3) => ({
											...prev_3,
											[item_1.name]: e_15.target.value
										}))
									})]
								}, item_1.name)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "uppercase",
										size: "sm",
										onClick: handleInstallSubmit,
										disabled: installingName === installEntry.name,
										prefix: installingName === installEntry.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
										children: installingName === installEntry.name ? "Installing..." : "Install"
									})
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
							variant: "sm",
							className: "flex items-center gap-2 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "h-4 w-4" }),
								"Your MCP servers (",
								servers.length,
								")"
							]
						})
					}),
					restartNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-warning",
						children: restartNote
					}),
					servers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col items-center gap-3 py-8 text-center text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No MCP servers yet. MCP servers give the agent extra tools (GitHub, databases, browsers…). Pick one from the catalog below, or click Add Server at the top of the page." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => document.getElementById("mcp-catalog")?.scrollIntoView({
								behavior: "smooth",
								block: "start"
							}),
							prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-3.5 w-3.5" }),
							children: "Browse catalog"
						})]
					}) }),
					servers.map((server_2) => {
						const envCount = Object.keys(server_2.env ?? {}).length;
						const result_1 = testResults[server_2.name];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: cn("flex items-start gap-4 py-4", !server_2.enabled && "opacity-60"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-sm truncate",
												children: server_2.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: TRANSPORT_TONE[server_2.transport] ?? "secondary",
												children: server_2.transport
											}),
											server_2.auth && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												tone: "outline",
												children: [
													"auth:",
													" ",
													server_2.auth === "header" ? "bearer" : server_2.auth
												]
											}),
											!server_2.enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "outline",
												children: "disabled"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4 text-xs text-muted-foreground",
										children: [server_2.transport === "http" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono truncate",
											children: server_2.url ?? "—"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono truncate",
											children: [server_2.command, ...server_2.args ?? []].filter(Boolean).join(" ") || "—"
										}), envCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											envCount,
											" env var",
											envCount === 1 ? "" : "s"
										] })]
									}),
									result_1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 text-xs",
										children: result_1.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-success",
											children: result_1.tools.length === 0 ? "Connected — no tools" : `Tools: ${result_1.tools.map((tool) => tool.name).join(", ")}`
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-destructive",
											children: result_1.error ?? "Connection failed"
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 shrink-0",
								children: [
									server_2.auth === "oauth" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										size: "sm",
										title: "Authenticate with OAuth",
										onClick: () => handleAuthenticate(server_2),
										disabled: authenticating === server_2.name,
										prefix: authenticating === server_2.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {}),
										children: "Authenticate"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										size: "sm",
										title: server_2.enabled ? "Disable" : "Enable",
										"aria-label": server_2.enabled ? "Disable" : "Enable",
										onClick: () => handleToggleEnabled(server_2),
										disabled: togglingName === server_2.name,
										prefix: togglingName === server_2.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, {}),
										className: server_2.enabled ? "text-success" : void 0,
										children: server_2.enabled ? "Disable" : "Enable"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										size: "icon",
										title: "Test connection",
										"aria-label": "Test connection",
										onClick: () => handleTest(server_2),
										disabled: testing === server_2.name,
										children: testing === server_2.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										destructive: true,
										size: "icon",
										title: "Delete",
										"aria-label": "Delete",
										onClick: () => serverDelete.requestDelete(server_2.name),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
									})
								]
							})]
						}) }, server_2.name);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
							variant: "sm",
							className: "flex items-center gap-2 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								id: "mcp-catalog",
								children: [
									"Catalog (",
									catalog.length,
									")"
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Browse Nous-approved MCP servers and install them with one click."
					}),
					catalog.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "No catalog entries available."
					}) }),
					catalog.map((entry_1) => {
						const entryDiags = diagnosticsByName[entry_1.name] ?? [];
						const isInstalling = installingName === entry_1.name;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "flex items-start gap-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-1 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-sm truncate",
												children: entry_1.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: TRANSPORT_TONE[entry_1.transport] ?? "secondary",
												children: entry_1.transport
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												tone: "outline",
												children: ["auth: ", entry_1.auth_type]
											}),
											isHttpUrl(entry_1.source) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: entry_1.source,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-xs text-primary underline underline-offset-2 hover:opacity-80",
												children: "source ↗"
											}) : entry_1.source && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "outline",
												children: entry_1.source
											}),
											entry_1.installed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "success",
												children: "Installed"
											}),
											entry_1.installed && !entry_1.enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "outline",
												children: "disabled"
											})
										]
									}),
									entry_1.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: entry_1.description
									}),
									entry_1.transport === "http" && entry_1.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: "Endpoint:"
											}),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
												className: "font-mono",
												children: entry_1.url
											})
										]
									}),
									entry_1.transport === "stdio" && entry_1.command && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground break-all",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: "Runs:"
											}),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
												className: "font-mono",
												children: [entry_1.command, ...entry_1.args].join(" ")
											})
										]
									}),
									entry_1.install_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground break-all",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: "Installs from:"
											}),
											" ",
											isHttpUrl(entry_1.install_url) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: entry_1.install_url,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "text-primary underline underline-offset-2 hover:opacity-80",
												children: entry_1.install_url
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
												className: "font-mono",
												children: entry_1.install_url
											}),
											entry_1.install_ref && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" @ ", entry_1.install_ref] })
										]
									}),
									entry_1.bootstrap.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
											className: "cursor-pointer select-none",
											children: [
												"Bootstrap commands (",
												entry_1.bootstrap.length,
												")"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "mt-1 ml-3 list-disc space-y-0.5",
											children: entry_1.bootstrap.map((cmd, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
												className: "break-all",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
													className: "font-mono",
													children: cmd
												})
											}, `${entry_1.name}-bs-${i}`))
										})]
									}),
									entry_1.post_install && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
											className: "cursor-pointer select-none",
											children: "Setup notes"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 whitespace-pre-wrap",
											children: entry_1.post_install.trim()
										})]
									}),
									entryDiags.map((d_0, i_0) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-warning mt-1",
										children: d_0.message
									}, `${entry_1.name}-diag-${i_0}`))
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1 shrink-0",
								children: entry_1.installed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "success",
									children: "Installed"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "uppercase",
									size: "sm",
									onClick: () => handleInstallClick(entry_1),
									disabled: isInstalling,
									prefix: isInstalling ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
									children: isInstalling ? "Installing..." : "Install"
								})
							})]
						}) }, entry_1.name);
					})
				]
			})
		]
	});
}
//#endregion
export { McpPage as default };
