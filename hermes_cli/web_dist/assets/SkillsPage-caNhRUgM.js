import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { f as useNavigate, h as require_react, m as require_react_dom, n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { $ as Paintbrush, Bt as Code, C as ShieldQuestionMark, E as ShieldAlert, Et as FileText, Ft as Download, I as RefreshCw, Rt as Cpu, S as Shield, T as ShieldCheck, U as Plus, Wt as CircleCheck, Yt as Check, Zt as Brain, bt as Funnel, en as Blocks, et as Package, i as Wrench, j as Search, jt as ExternalLink, kt as Eye, lt as LoaderCircle, m as TriangleAlert, n as Zap, q as Pencil, r as X, v as Terminal, x as Sparkles, yt as Globe } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, D as DialogHeader, L as Spinner, O as DialogTitle, S as Dialog, T as DialogDescription, _ as CardHeader, f as Label, h as CardContent, j as ListItem, m as Card, o as Switch, p as Input, v as CardTitle, w as DialogContent, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { r as themedBody, t as cn } from "./utils-XzxpPQdK.js";
import { i as en, r as useI18n } from "./i18n-Zn9FHQtI.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { p as useProfileScope, u as PluginSlot } from "./index-CeRydpmd.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
import { t as LoadErrorNotice } from "./LoadErrorNotice-BOHNWMyf.js";
//#region apps/shared/src/catalog-install.ts
function skillCatalogInstallIdentifier(skill) {
	if (skill.installIdentifier) return skill.installIdentifier;
	const identifier = skill.identifier;
	if (!identifier) return skill.source === "built-in" ? null : skill.source === "optional" ? `official/${skill.name}` : skill.name;
	return skill.source.toLowerCase() === "clawhub" && !identifier.startsWith("clawhub/") ? `clawhub/${identifier}` : identifier;
}
//#endregion
//#region web/src/components/ToolsetConfigDrawer.tsx
var import_compiler_runtime = require_compiler_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var import_jsx_runtime = require_jsx_runtime();
/**
* Full configuration surface for a single toolset's backends — the dashboard
* equivalent of selecting a toolset in the `hermes tools` curses UI: toggle
* the toolset on/off, pick a provider, enter API keys, and run a provider's
* post-setup install hook (npm/pip/binary) with a live log tail.
*/
function ToolsetConfigDrawer({ toolset, profile, onClose, onChanged }) {
	const { toast, showToast } = useToast();
	const [config, setConfig] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [enabled, setEnabled] = (0, import_react.useState)(toolset.enabled);
	const [toggling, setToggling] = (0, import_react.useState)(false);
	const [selecting, setSelecting] = (0, import_react.useState)(null);
	const [activeProvider, setActiveProvider] = (0, import_react.useState)(null);
	const [drafts, setDrafts] = (0, import_react.useState)({});
	const [savingProvider, setSavingProvider] = (0, import_react.useState)(null);
	const [isSet, setIsSet] = (0, import_react.useState)({});
	const [postSetupRunning, setPostSetupRunning] = (0, import_react.useState)(false);
	const [postSetupLog, setPostSetupLog] = (0, import_react.useState)([]);
	const [postSetupKey, setPostSetupKey] = (0, import_react.useState)(null);
	const [postSetupTrigger, setPostSetupTrigger] = (0, import_react.useState)(0);
	const loadConfig = (0, import_react.useCallback)(() => {
		return api.getToolsetConfig(toolset.name, profile).then((cfg) => {
			setConfig(cfg);
			setActiveProvider(cfg.active_provider);
			const seed = {};
			for (const p of cfg.providers) for (const e of p.env_vars) seed[e.key] = e.is_set;
			setIsSet(seed);
		}).catch(() => showToast("Failed to load toolset config", "error")).finally(() => setLoading(false));
	}, [
		toolset.name,
		profile,
		showToast
	]);
	(0, import_react.useEffect)(() => {
		loadConfig();
	}, [loadConfig]);
	(0, import_react.useEffect)(() => {
		if (postSetupTrigger === 0) return;
		let cancelled = false;
		let timer = null;
		const poll = async () => {
			try {
				const st = await api.getActionStatus("tools-post-setup", 300);
				if (cancelled) return;
				setPostSetupLog(st.lines);
				if (st.running) timer = setTimeout(() => void poll(), 1200);
				else {
					setPostSetupRunning(false);
					const ok = st.exit_code === 0;
					showToast(ok ? "Post-setup complete" : "Post-setup finished with errors", ok ? "success" : "error");
					loadConfig();
					onChanged();
				}
			} catch {
				if (!cancelled) {
					setPostSetupRunning(false);
					showToast("Lost track of the post-setup process", "error");
				}
			}
		};
		timer = setTimeout(() => void poll(), 800);
		return () => {
			cancelled = true;
			if (timer) clearTimeout(timer);
		};
	}, [
		postSetupTrigger,
		showToast,
		loadConfig,
		onChanged
	]);
	const handleToggle = async (next) => {
		setToggling(true);
		try {
			await api.toggleToolset(toolset.name, next, profile);
			setEnabled(next);
			showToast(`${toolset.label || toolset.name} ${next ? "enabled" : "disabled"}`, "success");
			onChanged();
		} catch {
			showToast("Failed to toggle toolset", "error");
		} finally {
			setToggling(false);
		}
	};
	const handleSelectProvider = async (provider) => {
		setSelecting(provider.name);
		try {
			await api.selectToolsetProvider(toolset.name, provider.name, profile);
			setActiveProvider(provider.name);
			showToast(`Provider set to ${provider.name}`, "success");
			onChanged();
		} catch (e_0) {
			showToast(e_0 instanceof Error ? e_0.message : "Failed to select provider", "error");
		} finally {
			setSelecting(null);
		}
	};
	const handleSaveKeys = async (provider_0) => {
		const env = {};
		for (const e_1 of provider_0.env_vars) {
			const v = drafts[e_1.key];
			if (v && v.trim()) env[e_1.key] = v.trim();
		}
		if (Object.keys(env).length === 0) {
			showToast("Enter at least one value to save", "error");
			return;
		}
		setSavingProvider(provider_0.name);
		try {
			const res = await api.saveToolsetEnv(toolset.name, env, profile);
			setIsSet((prev) => ({
				...prev,
				...res.is_set
			}));
			setDrafts((prev_0) => {
				const next_0 = { ...prev_0 };
				for (const k of res.saved) delete next_0[k];
				return next_0;
			});
			showToast(res.saved.length ? `Saved ${res.saved.length} key${res.saved.length > 1 ? "s" : ""}` : "Nothing to save", "success");
			onChanged();
		} catch (e_2) {
			showToast(e_2 instanceof Error ? e_2.message : "Failed to save keys", "error");
		} finally {
			setSavingProvider(null);
		}
	};
	const handleRunPostSetup = async (provider_1) => {
		if (!provider_1.post_setup) return;
		setPostSetupRunning(true);
		setPostSetupLog([]);
		setPostSetupKey(provider_1.post_setup);
		try {
			await api.runToolsetPostSetup(toolset.name, provider_1.post_setup, profile);
			setPostSetupTrigger((n) => n + 1);
		} catch (e_3) {
			setPostSetupRunning(false);
			showToast(e_3 instanceof Error ? e_3.message : "Failed to start post-setup", "error");
		}
	};
	const labelText = toolset.label?.trim() || toolset.name;
	const platformText = toolset.platform_label?.trim() || toolset.platform;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4",
		onMouseDown: (e_4) => {
			if (e_4.target === e_4.currentTarget) onClose();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn(themedBody, "relative w-full max-w-2xl max-h-[85vh] border border-border bg-card shadow-2xl flex flex-col"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ghost: true,
					size: "xs",
					className: "absolute right-2 top-2 text-muted-foreground hover:text-foreground",
					onClick: onClose,
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "p-5 pb-3 border-b border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 pr-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mondwest text-display text-base tracking-wider",
								children: labelText
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: enabled ? "success" : "outline",
								className: "text-xs",
								children: enabled ? "Active" : "Inactive"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: toolset.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: enabled,
								onCheckedChange: (v_0) => void handleToggle(v_0),
								disabled: toggling,
								"aria-label": `Enable toolset for ${platformText}`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: enabled ? `Enabled for ${platformText}` : `Disabled for ${platformText}`
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-h-0 overflow-y-auto p-5 pt-4 space-y-4",
					children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center py-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {})
					}) : !config?.has_category ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground py-6 text-center",
						children: "This toolset has no configurable backends — toggle it on or off above. It works with no provider selection or API keys."
					}) : config.providers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground py-6 text-center",
						children: "No providers are available for this toolset in this install."
					}) : config.providers.map((provider_2) => {
						const isActive = provider_2.name === activeProvider;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("border border-border p-3", isActive && "border-emerald-500/60 bg-emerald-500/5"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-sm",
												children: provider_2.name
											}),
											provider_2.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "secondary",
												className: "text-xs",
												children: provider_2.badge
											}),
											provider_2.requires_nous_auth && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "outline",
												className: "text-xs",
												children: "Nous Portal"
											})
										]
									}), isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										tone: "success",
										className: "text-xs shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 mr-0.5" }), " Selected"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										outlined: true,
										onClick: () => void handleSelectProvider(provider_2),
										disabled: selecting !== null,
										children: selecting === provider_2.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : "Select"
									})]
								}),
								provider_2.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: provider_2.tag
								}),
								provider_2.env_vars.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 space-y-2.5",
									children: [provider_2.env_vars.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: `env-${ev.key}`,
													className: "text-xs font-mono",
													children: ev.key
												}), isSet[ev.key] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: "success",
													className: "text-xs",
													children: "Saved"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: `env-${ev.key}`,
												type: "password",
												className: "h-8 rounded-none text-xs font-mono",
												placeholder: isSet[ev.key] ? "•••••••• (saved — leave blank to keep)" : ev.prompt || ev.key,
												value: drafts[ev.key] ?? "",
												onChange: (e_5) => setDrafts((prev_1) => ({
													...prev_1,
													[ev.key]: e_5.target.value
												}))
											}),
											ev.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: ev.url,
												target: "_blank",
												rel: "noreferrer",
												className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }), " Get a key"]
											})
										]
									}, ev.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										onClick: () => void handleSaveKeys(provider_2),
										disabled: savingProvider !== null,
										children: savingProvider === provider_2.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : "Save keys"
									})]
								}),
								provider_2.post_setup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 border-t border-border pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground mb-1.5",
										children: [
											"This backend needs a one-time install",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono",
												children: [
													"(",
													provider_2.post_setup,
													")"
												]
											}),
											". Runs on this host — may take a few minutes."
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										outlined: true,
										className: cn(postSetupRunning && postSetupKey === provider_2.post_setup && "[&_svg]:animate-spin"),
										onClick: () => void handleRunPostSetup(provider_2),
										disabled: postSetupRunning,
										prefix: postSetupRunning && postSetupKey === provider_2.post_setup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, {}),
										children: postSetupRunning && postSetupKey === provider_2.post_setup ? "Installing…" : "Run setup"
									})]
								})
							]
						}, provider_2.name);
					}), (postSetupRunning || postSetupLog.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 px-3 py-1.5 border-b border-border bg-muted/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-3.5 w-3.5 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-mono text-muted-foreground",
									children: ["post-setup: ", postSetupKey]
								}),
								postSetupRunning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin ml-auto text-muted-foreground" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "max-h-48 overflow-y-auto p-3 text-xs font-mono whitespace-pre-wrap text-text-secondary",
							children: postSetupLog.length ? postSetupLog.join("\n") : "Starting…"
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast })]
	}), document.body);
}
//#endregion
//#region web/src/components/SkillEditorDialog.tsx
var CREATE_TEMPLATE = `---
name: my-skill
description: One-line description of when to use this skill.
---

# My Skill

Numbered steps, exact commands, and pitfalls go here.
`;
function SkillEditorDialog(t0) {
	const $ = (0, import_compiler_runtime.c)(14);
	const { open, editName, profile, onClose, onSaved } = t0;
	let t1;
	if ($[0] !== onClose) {
		t1 = (o) => !o && onClose();
		$[0] = onClose;
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	if ($[2] !== editName || $[3] !== onClose || $[4] !== onSaved || $[5] !== open || $[6] !== profile) {
		t2 = open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorBody, {
			editName,
			profile,
			onClose,
			onSaved
		}, editName ?? "__create__");
		$[2] = editName;
		$[3] = onClose;
		$[4] = onSaved;
		$[5] = open;
		$[6] = profile;
		$[7] = t2;
	} else t2 = $[7];
	let t3;
	if ($[8] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "max-w-3xl",
			children: t2
		});
		$[8] = t2;
		$[9] = t3;
	} else t3 = $[9];
	let t4;
	if ($[10] !== open || $[11] !== t1 || $[12] !== t3) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: t1,
			children: t3
		});
		$[10] = open;
		$[11] = t1;
		$[12] = t3;
		$[13] = t4;
	} else t4 = $[13];
	return t4;
}
function EditorBody({ editName, profile, onClose, onSaved }) {
	const isEdit = editName !== null;
	const [name, setName] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)(isEdit ? "" : CREATE_TEMPLATE);
	const [loading, setLoading] = (0, import_react.useState)(isEdit);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!editName) return;
		let cancelled = false;
		api.getSkillContent(editName, profile || void 0).then((res) => !cancelled && setContent(res.content)).catch((e) => !cancelled && setError(errorMessage(e))).finally(() => !cancelled && setLoading(false));
		return () => {
			cancelled = true;
		};
	}, [editName, profile]);
	const handleSave = async () => {
		setError(null);
		if (!isEdit && !name.trim()) {
			setError("Skill name is required.");
			return;
		}
		if (!content.trim()) {
			setError("SKILL.md content is required.");
			return;
		}
		setSaving(true);
		try {
			if (isEdit) {
				await api.updateSkillContent(editName, content, profile || void 0);
				onSaved(editName);
			} else {
				const trimmed = name.trim();
				await api.createSkill({
					name: trimmed,
					content,
					category: category.trim() || void 0
				}, profile || void 0);
				onSaved(trimmed);
			}
			onClose();
		} catch (e_0) {
			setError(errorMessage(e_0));
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: isEdit ? `Edit skill: ${editName}` : "New skill" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: isEdit ? "Rewrite this skill's SKILL.md. Frontmatter (name, description) is validated on save." : "Author a custom skill — YAML frontmatter plus markdown instructions. It becomes available to the agent and attachable to cron jobs." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			!isEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "skill-editor-name",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "skill-editor-name",
						autoFocus: true,
						placeholder: "my-skill",
						value: name,
						onChange: (e_1) => setName(e_1.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "skill-editor-category",
						children: "Category (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "skill-editor-category",
						placeholder: "devops",
						value: category,
						onChange: (e_2) => setCategory(e_2.target.value)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "skill-editor-content",
					children: "SKILL.md"
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center py-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-xl text-primary" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "skill-editor-content",
					spellCheck: false,
					className: "min-h-[320px] max-h-[55vh] w-full resize-y border border-border bg-background/40 px-3 py-2 font-mono text-xs leading-relaxed shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 focus-visible:border-foreground/25",
					value: content,
					onChange: (e_3) => setContent(e_3.target.value)
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap text-xs text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ghost: true,
					size: "sm",
					onClick: onClose,
					disabled: saving,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					className: "uppercase",
					onClick: handleSave,
					disabled: saving || loading,
					prefix: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
					children: saving ? "Saving…" : isEdit ? "Save changes" : "Create skill"
				})]
			})
		]
	})] });
}
//#endregion
//#region web/src/lib/skill-hub-installed.ts
/**
* The installed lock entry a hub search or featured hit names. The backend keys
* a ClawHub install by its lock id (`@owner/slug`) and by the `clawhub/<slug>`
* id a catalog card installs, but a ClawHub hit carries its bare slug. So a hit
* is looked up under its own id, then under the id a catalog card would install
* for it, which differs only for ClawHub.
*/
function installedHubEntry(installed, hit) {
	return installed[hit.identifier] ?? installed[skillCatalogInstallIdentifier(hit) ?? hit.identifier];
}
//#endregion
//#region web/src/pages/SkillsPage.tsx
var CATEGORY_LABELS = {
	mlops: "MLOps",
	"mlops/cloud": "MLOps / Cloud",
	"mlops/evaluation": "MLOps / Evaluation",
	"mlops/inference": "MLOps / Inference",
	"mlops/models": "MLOps / Models",
	"mlops/training": "MLOps / Training",
	"mlops/vector-databases": "MLOps / Vector DBs",
	mcp: "MCP",
	"red-teaming": "Red Teaming",
	ocr: "OCR",
	p5js: "p5.js",
	ai: "AI",
	ux: "UX",
	ui: "UI"
};
function prettyCategory(raw, generalLabel) {
	if (!raw) return generalLabel;
	if (CATEGORY_LABELS[raw]) return CATEGORY_LABELS[raw];
	return raw.split(/[-_/]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
var TOOLSET_ICONS = {
	computer: Cpu,
	web: Globe,
	security: Shield,
	vision: Eye,
	design: Paintbrush,
	ai: Brain,
	integration: Blocks,
	code: Code,
	automation: Zap
};
function toolsetIcon(name) {
	const lower = name.toLowerCase();
	for (const [key, icon] of Object.entries(TOOLSET_ICONS)) if (lower.includes(key)) return icon;
	return Wrench;
}
function SkillsPage() {
	const [skills, setSkills] = (0, import_react.useState)([]);
	const [toolsets, setToolsets] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [loadError, setLoadError] = (0, import_react.useState)(null);
	const [loadNonce, setLoadNonce] = (0, import_react.useState)(0);
	const [search, setSearch] = (0, import_react.useState)("");
	const [view, setView] = (0, import_react.useState)("skills");
	const [activeCategory, setActiveCategory] = (0, import_react.useState)(null);
	const [togglingSkills, setTogglingSkills] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [configToolset, setConfigToolset] = (0, import_react.useState)(null);
	const [editorOpen, setEditorOpen] = (0, import_react.useState)(false);
	const [editorSkill, setEditorSkill] = (0, import_react.useState)(null);
	const { toast, showToast } = useToast();
	const { t } = useI18n();
	const { setAfterTitle, setEnd } = usePageHeader();
	const { profile: selectedProfile } = useProfileScope();
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		Promise.all([api.getSkills(selectedProfile || void 0), api.getToolsets(selectedProfile || void 0)]).then(([s, tsets]) => {
			if (cancelled) return;
			setSkills(s);
			setToolsets(tsets);
			setLoadError(null);
		}).catch((e) => !cancelled && setLoadError(errorMessage(e))).finally(() => !cancelled && setLoading(false));
		return () => {
			cancelled = true;
		};
	}, [selectedProfile, loadNonce]);
	const handleToggleSkill = async (skill) => {
		setTogglingSkills((prev) => new Set(prev).add(skill.name));
		try {
			await api.toggleSkill(skill.name, !skill.enabled, selectedProfile || void 0);
			setSkills((prev_0) => prev_0.map((s_0) => s_0.name === skill.name ? {
				...s_0,
				enabled: !s_0.enabled
			} : s_0));
			showToast(`${skill.name} ${skill.enabled ? t.common.disabled : t.common.enabled}`, "success");
		} catch {
			showToast(`${t.common.failedToToggle} ${skill.name}`, "error");
		} finally {
			setTogglingSkills((prev) => {
				const next = new Set(prev);
				next.delete(skill.name);
				return next;
			});
		}
	};
	const refreshToolsets = async () => {
		try {
			const tsets_0 = await api.getToolsets(selectedProfile || void 0);
			setToolsets(tsets_0);
		} catch {}
	};
	const openCreateEditor = (0, import_react.useCallback)(() => {
		setEditorSkill(null);
		setEditorOpen(true);
	}, []);
	const navigate = useNavigate();
	const [learnOpen, setLearnOpen] = (0, import_react.useState)(false);
	const [learnDir, setLearnDir] = (0, import_react.useState)("");
	const [learnUrl, setLearnUrl] = (0, import_react.useState)("");
	const [learnText, setLearnText] = (0, import_react.useState)("");
	const openLearn = (0, import_react.useCallback)(() => {
		setLearnDir("");
		setLearnUrl("");
		setLearnText("");
		setLearnOpen(true);
	}, []);
	const submitLearn = (0, import_react.useCallback)(() => {
		const segs = [];
		const dir = learnDir.trim();
		const url = learnUrl.trim();
		const text = learnText.trim();
		if (dir) segs.push(`local source: ${dir}`);
		if (url) segs.push(`URL: ${url}`);
		if (text) segs.push(text);
		const composed = segs.join("; ").replace(/\s*\n\s*/g, " ").trim();
		if (!composed) return;
		setLearnOpen(false);
		navigate(`/chat?learn=${encodeURIComponent(composed)}`);
	}, [
		learnDir,
		learnUrl,
		learnText,
		navigate
	]);
	const openEditEditor = (0, import_react.useCallback)((skillName) => {
		setEditorSkill(skillName);
		setEditorOpen(true);
	}, []);
	const handleEditorSaved = (0, import_react.useCallback)((skillName_0) => {
		showToast(`${skillName_0} saved ✓`, "success");
		api.getSkills(selectedProfile || void 0).then(setSkills).catch(() => {});
	}, [selectedProfile, showToast]);
	const lowerSearch = search.toLowerCase();
	const isSearching = search.trim().length > 0;
	const searchMatchedSkills = (0, import_react.useMemo)(() => {
		if (!isSearching) return [];
		return skills.filter((s_1) => s_1.name.toLowerCase().includes(lowerSearch) || s_1.description.toLowerCase().includes(lowerSearch) || (s_1.category ?? "").toLowerCase().includes(lowerSearch));
	}, [
		skills,
		isSearching,
		lowerSearch
	]);
	const activeSkills = (0, import_react.useMemo)(() => {
		if (isSearching) return [];
		if (!activeCategory) return [...skills].sort((a, b) => a.name.localeCompare(b.name));
		return skills.filter((s_2) => activeCategory === "__none__" ? !s_2.category : s_2.category === activeCategory).sort((a_0, b_0) => a_0.name.localeCompare(b_0.name));
	}, [
		skills,
		activeCategory,
		isSearching
	]);
	const allCategories = (0, import_react.useMemo)(() => {
		const cats = /* @__PURE__ */ new Map();
		for (const s_3 of skills) {
			const key = s_3.category || "__none__";
			cats.set(key, (cats.get(key) || 0) + 1);
		}
		return [...cats.entries()].sort((a_1, b_1) => {
			if (a_1[0] === "__none__") return -1;
			if (b_1[0] === "__none__") return 1;
			return a_1[0].localeCompare(b_1[0]);
		}).map(([key_0, count]) => ({
			key: key_0,
			name: prettyCategory(key_0 === "__none__" ? null : key_0, t.common.general),
			count
		}));
	}, [skills, t]);
	const enabledCount = skills.filter((s_4) => s_4.enabled).length;
	(0, import_react.useLayoutEffect)(() => {
		if (loading) {
			setAfterTitle(null);
			setEnd(null);
			return;
		}
		setAfterTitle(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex items-center gap-2 whitespace-nowrap text-xs text-muted-foreground",
			children: t.skills.enabledOf.replace("{enabled}", String(enabledCount)).replace("{total}", String(skills.length))
		}));
		setEnd(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full min-w-0 sm:max-w-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "h-8 rounded-none pl-8 pr-7 text-xs",
					placeholder: t.common.search,
					value: search,
					onChange: (e_0) => setSearch(e_0.target.value)
				}),
				search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ghost: true,
					size: "xs",
					className: "absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
					onClick: () => setSearch(""),
					"aria-label": t.common.clear,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})
			]
		}));
		return () => {
			setAfterTitle(null);
			setEnd(null);
		};
	}, [
		enabledCount,
		loading,
		search,
		setAfterTitle,
		setEnd,
		skills.length,
		t
	]);
	const filteredToolsets = (0, import_react.useMemo)(() => {
		return toolsets.filter((ts) => !search || ts.name.toLowerCase().includes(lowerSearch) || ts.label.toLowerCase().includes(lowerSearch) || ts.description.toLowerCase().includes(lowerSearch));
	}, [
		toolsets,
		search,
		lowerSearch
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-2xl text-primary" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "skills:top" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }),
			loadError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadErrorNotice, {
				what: t.skills.loadWhat ?? en.skills.loadWhat,
				detail: loadError,
				onRetry: () => {
					setLoading(true);
					setLoadNonce((n) => n + 1);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					"aria-label": t.skills.title,
					className: "sm:w-56 sm:shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:sticky sm:top-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col rounded-none border border-border bg-muted/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden sm:flex items-center gap-2 px-3 py-2 border-b border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3 w-3 text-text-tertiary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mondwest text-display text-xs tracking-[0.12em] text-text-secondary",
										children: t.skills.filters
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex sm:flex-col gap-1 overflow-x-auto sm:overflow-x-visible scrollbar-none p-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelItem, {
											icon: Package,
											label: `${t.skills.all} (${skills.length})`,
											active: view === "skills" && !isSearching,
											onClick: () => {
												setView("skills");
												setActiveCategory(null);
												setSearch("");
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelItem, {
											icon: Wrench,
											label: `${t.skills.toolsets} (${toolsets.length})`,
											active: view === "toolsets",
											onClick: () => {
												setView("toolsets");
												setSearch("");
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelItem, {
											icon: Search,
											label: "Browse hub",
											active: view === "hub",
											onClick: () => {
												setView("hub");
												setSearch("");
											}
										})
									]
								}),
								view === "skills" && !isSearching && allCategories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden sm:flex flex-col border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-3 pt-2 pb-1 font-mondwest text-display text-xs tracking-[0.12em] text-text-tertiary",
										children: t.skills.categories
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col p-2 pt-1 gap-px max-h-[calc(100vh-340px)] overflow-y-auto",
										children: allCategories.map(({ key: key_1, name, count: count_0 }) => {
											const isActive = activeCategory === key_1;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
												active: isActive,
												onClick: () => setActiveCategory(isActive ? null : key_1),
												className: "rounded-none px-2 py-1 text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "flex-1 truncate",
													children: name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `text-xs tabular-nums ${isActive ? "text-text-secondary" : "text-text-tertiary"}`,
													children: count_0
												})]
											}, key_1);
										})
									})]
								})
							]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 min-w-0",
					children: isSearching ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							className: "py-3 px-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									className: "text-sm flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), t.skills.title]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "secondary",
									className: "text-xs",
									children: t.skills.resultCount.replace("{count}", String(searchMatchedSkills.length)).replace("{s}", searchMatchedSkills.length !== 1 ? "s" : "")
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "px-4 pb-4",
							children: searchMatchedSkills.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground text-center py-8",
								children: t.skills.noSkillsMatch
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-1",
								children: searchMatchedSkills.map((skill_0) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillRow, {
									skill: skill_0,
									toggling: togglingSkills.has(skill_0.name),
									onToggle: () => handleToggleSkill(skill_0),
									onEdit: () => openEditEditor(skill_0.name),
									noDescriptionLabel: t.skills.noDescription
								}, skill_0.name))
							})
						})]
					}) : view === "skills" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							className: "py-3 px-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
									className: "text-sm flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), activeCategory ? prettyCategory(activeCategory === "__none__" ? null : activeCategory, t.common.general) : t.skills.all]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "secondary",
											className: "text-xs",
											children: t.skills.skillCount.replace("{count}", String(activeSkills.length)).replace("{s}", activeSkills.length !== 1 ? "s" : "")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											outlined: true,
											onClick: openLearn,
											prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}),
											children: "Learn a skill"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											outlined: true,
											onClick: openCreateEditor,
											prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}),
											children: "New skill"
										})
									]
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "px-4 pb-4",
							children: loadError ? null : activeSkills.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-3 py-8 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: skills.length === 0 ? t.skills.noSkills : t.skills.noSkillsMatch
								}), skills.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										onClick: () => setView("hub"),
										children: t.skills.browseHub ?? en.skills.browseHub
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										outlined: true,
										onClick: openCreateEditor,
										children: t.skills.createSkill ?? en.skills.createSkill
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-1",
								children: activeSkills.map((skill_1) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillRow, {
									skill: skill_1,
									toggling: togglingSkills.has(skill_1.name),
									onToggle: () => handleToggleSkill(skill_1),
									onEdit: () => openEditEditor(skill_1.name),
									noDescriptionLabel: t.skills.noDescription
								}, skill_1.name))
							})
						})]
					}) : view === "toolsets" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: filteredToolsets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "rounded-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "py-8 text-center text-sm text-muted-foreground",
							children: t.skills.noToolsetsMatch
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: filteredToolsets.map((ts_0) => {
							const TsIcon = toolsetIcon(ts_0.name);
							const labelText = ts_0.label.trim() || ts_0.name;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "relative rounded-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									className: "py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TsIcon, { className: "h-5 w-5 text-muted-foreground shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 mb-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-sm",
														children: labelText
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														tone: ts_0.enabled ? "success" : "outline",
														className: "text-xs",
														children: ts_0.enabled ? t.common.active : t.common.inactive
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-text-secondary mb-2",
													children: ts_0.description
												}),
												ts_0.enabled && !ts_0.configured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-amber-300 mb-2",
													children: t.skills.setupNeeded
												}),
												ts_0.tools.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex flex-wrap gap-1",
													children: ts_0.tools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														tone: "secondary",
														className: "text-xs font-mono",
														children: tool
													}, tool))
												}),
												ts_0.tools.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-text-tertiary",
													children: ts_0.enabled ? t.skills.toolsetLabel.replace("{name}", ts_0.name) : t.skills.disabledForCli
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														size: "sm",
														outlined: true,
														onClick: () => setConfigToolset(ts_0),
														prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {}),
														children: "Configure"
													})
												})
											]
										})]
									})
								})
							}, ts_0.name);
						})
					}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubBrowser, {
						showToast,
						profile: selectedProfile || void 0
					})
				})]
			}),
			configToolset && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolsetConfigDrawer, {
				toolset: configToolset,
				profile: selectedProfile || void 0,
				onClose: () => setConfigToolset(null),
				onChanged: () => void refreshToolsets()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillEditorDialog, {
				open: editorOpen,
				editName: editorSkill,
				profile: selectedProfile || void 0,
				onClose: () => setEditorOpen(false),
				onSaved: handleEditorSaved
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: learnOpen,
				onOpenChange: setLearnOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Learn a skill" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Point Hermes at anything and it will distill a reusable skill — following the house authoring standards. Fill in any combination below; the agent gathers the sources and writes the skill in chat." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-muted-foreground",
										children: "Local file or directory"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "~/projects/some-sdk  (read with read_file / search_files)",
										value: learnDir,
										onChange: (e_1) => setLearnDir(e_1.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-muted-foreground",
										children: "URL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "https://docs.example.com/api  (fetched with web_extract)",
										value: learnUrl,
										onChange: (e_2) => setLearnUrl(e_2.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-muted-foreground",
										children: "Anything else — describe the workflow, paste notes, or say \"what we just did\""
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										className: "min-h-[90px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
										placeholder: "e.g. how I file an expense report: open the portal, …",
										value: learnText,
										onChange: (e_3) => setLearnText(e_3.target.value)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								ghost: true,
								onClick: () => setLearnOpen(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: submitLearn,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}),
								disabled: !learnDir.trim() && !learnUrl.trim() && !learnText.trim(),
								children: "Learn it"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "skills:bottom" })
		]
	});
}
function SkillRow(t0) {
	const $ = (0, import_compiler_runtime.c)(20);
	const { skill, toggling, onToggle, onEdit, noDescriptionLabel } = t0;
	let t1;
	if ($[0] !== onToggle || $[1] !== skill.enabled || $[2] !== toggling) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pt-0.5 shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				checked: skill.enabled,
				onCheckedChange: onToggle,
				disabled: toggling
			})
		});
		$[0] = onToggle;
		$[1] = skill.enabled;
		$[2] = toggling;
		$[3] = t1;
	} else t1 = $[3];
	const t2 = `font-mono-ui text-sm ${skill.enabled ? "text-foreground" : "text-muted-foreground"}`;
	let t3;
	if ($[4] !== skill.name || $[5] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2 mb-0.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: t2,
				children: skill.name
			})
		});
		$[4] = skill.name;
		$[5] = t2;
		$[6] = t3;
	} else t3 = $[6];
	const t4 = skill.description || noDescriptionLabel;
	let t5;
	if ($[7] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground leading-relaxed line-clamp-2",
			children: t4
		});
		$[7] = t4;
		$[8] = t5;
	} else t5 = $[8];
	let t6;
	if ($[9] !== t3 || $[10] !== t5) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 min-w-0",
			children: [t3, t5]
		});
		$[9] = t3;
		$[10] = t5;
		$[11] = t6;
	} else t6 = $[11];
	const t7 = `Edit ${skill.name}`;
	let t8;
	if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {});
		$[12] = t8;
	} else t8 = $[12];
	let t9;
	if ($[13] !== onEdit || $[14] !== t7) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			size: "icon",
			className: "shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 hover:text-foreground",
			title: "Edit SKILL.md",
			"aria-label": t7,
			onClick: onEdit,
			children: t8
		});
		$[13] = onEdit;
		$[14] = t7;
		$[15] = t9;
	} else t9 = $[15];
	let t10;
	if ($[16] !== t1 || $[17] !== t6 || $[18] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "group flex items-start gap-3 px-3 py-2.5 transition-colors hover:bg-muted/40",
			children: [
				t1,
				t6,
				t9
			]
		});
		$[16] = t1;
		$[17] = t6;
		$[18] = t9;
		$[19] = t10;
	} else t10 = $[19];
	return t10;
}
function PanelItem(t0) {
	const $ = (0, import_compiler_runtime.c)(12);
	const { active, icon: Icon, label, onClick } = t0;
	const t1 = active && "bg-foreground/90 text-background hover:text-background";
	let t2;
	if ($[0] !== t1) {
		t2 = cn("rounded-none whitespace-nowrap px-2.5 py-1.5", "font-mondwest text-[0.7rem] tracking-[0.08em] uppercase", t1);
		$[0] = t1;
		$[1] = t2;
	} else t2 = $[1];
	let t3;
	if ($[2] !== Icon) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 shrink-0" });
		$[2] = Icon;
		$[3] = t3;
	} else t3 = $[3];
	let t4;
	if ($[4] !== label) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex-1 truncate",
			children: label
		});
		$[4] = label;
		$[5] = t4;
	} else t4 = $[5];
	let t5;
	if ($[6] !== active || $[7] !== onClick || $[8] !== t2 || $[9] !== t3 || $[10] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
			active,
			onClick,
			className: t2,
			children: [t3, t4]
		});
		$[6] = active;
		$[7] = onClick;
		$[8] = t2;
		$[9] = t3;
		$[10] = t4;
		$[11] = t5;
	} else t5 = $[11];
	return t5;
}
/** Map a trust level to a Badge tone + label + icon. */
function trustVisual(level) {
	switch (level) {
		case "trusted": return {
			tone: "success",
			label: "trusted"
		};
		case "builtin": return {
			tone: "secondary",
			label: "builtin"
		};
		case "community": return {
			tone: "warning",
			label: "community"
		};
		default: return {
			tone: "outline",
			label: level || "unknown"
		};
	}
}
/** Map a scan verdict to tone + icon. */
function verdictVisual(verdict) {
	switch (verdict) {
		case "safe": return {
			tone: "success",
			Icon: ShieldCheck,
			label: "Safe"
		};
		case "caution": return {
			tone: "warning",
			Icon: ShieldAlert,
			label: "Caution"
		};
		case "dangerous": return {
			tone: "destructive",
			Icon: ShieldAlert,
			label: "Dangerous"
		};
		default: return {
			tone: "warning",
			Icon: ShieldQuestionMark,
			label: verdict
		};
	}
}
var SEVERITY_TONE = {
	critical: "destructive",
	high: "destructive",
	medium: "warning",
	low: "secondary"
};
function HubBrowser({ showToast, profile }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [results, setResults] = (0, import_react.useState)([]);
	const [searching, setSearching] = (0, import_react.useState)(false);
	const [searched, setSearched] = (0, import_react.useState)(false);
	const [sourceCounts, setSourceCounts] = (0, import_react.useState)({});
	const [timedOut, setTimedOut] = (0, import_react.useState)([]);
	const [searchMs, setSearchMs] = (0, import_react.useState)(null);
	const [sources, setSources] = (0, import_react.useState)([]);
	const [featured, setFeatured] = (0, import_react.useState)([]);
	const [sourcesLoading, setSourcesLoading] = (0, import_react.useState)(true);
	const [installed, setInstalled] = (0, import_react.useState)({});
	const [action, setAction] = (0, import_react.useState)(null);
	const [actionLog, setActionLog] = (0, import_react.useState)([]);
	const [actionRunning, setActionRunning] = (0, import_react.useState)(false);
	const [detail, setDetail] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		api.getSkillHubSources(profile).then((r) => {
			if (cancelled) return;
			setSources(r.sources);
			setFeatured(r.featured);
			setInstalled(r.installed);
		}).catch(() => {}).finally(() => {
			if (!cancelled) setSourcesLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [profile]);
	const runSearch = (0, import_react.useCallback)(async () => {
		const q = query.trim();
		if (!q) return;
		setSearching(true);
		setSearched(true);
		const t0 = performance.now();
		try {
			const r_0 = await api.searchSkillsHub(q, "all", 20, profile);
			setResults(r_0.results);
			setSourceCounts(r_0.source_counts || {});
			setTimedOut(r_0.timed_out || []);
			setInstalled((prev) => ({
				...prev,
				...r_0.installed || {}
			}));
		} catch (e) {
			showToast(`Hub search failed: ${errorMessage(e)}`, "error");
			setResults([]);
			setSourceCounts({});
			setTimedOut([]);
		} finally {
			setSearchMs(Math.round(performance.now() - t0));
			setSearching(false);
		}
	}, [
		query,
		showToast,
		profile
	]);
	(0, import_react.useEffect)(() => {
		if (!action) return;
		let cancelled_0 = false;
		let timer = null;
		const poll = async () => {
			try {
				const st = await api.getActionStatus(action, 200);
				if (cancelled_0) return;
				setActionLog(st.lines);
				setActionRunning(st.running);
				if (st.running) timer = setTimeout(poll, 1200);
				else api.getSkillHubSources(profile).then((r_1) => !cancelled_0 && setInstalled(r_1.installed)).catch(() => {});
			} catch {
				if (!cancelled_0) setActionRunning(false);
			}
		};
		poll();
		return () => {
			cancelled_0 = true;
			if (timer) clearTimeout(timer);
		};
	}, [action, profile]);
	const install = (0, import_react.useCallback)(async (identifier) => {
		try {
			const res = await api.installSkillFromHub(identifier, profile);
			showToast(`Installing ${identifier}…`, "success");
			setActionLog([]);
			setActionRunning(true);
			setAction(res.name);
			setDetail(null);
		} catch (e_0) {
			showToast(`Install failed: ${errorMessage(e_0)}`, "error");
		}
	}, [showToast, profile]);
	const updateAll = (0, import_react.useCallback)(async () => {
		try {
			const res_0 = await api.updateSkillsFromHub(profile);
			showToast("Updating installed skills…", "success");
			setActionLog([]);
			setActionRunning(true);
			setAction(res_0.name);
		} catch (e_1) {
			showToast(`Update failed: ${errorMessage(e_1)}`, "error");
		}
	}, [showToast, profile]);
	const isInstalled = (0, import_react.useCallback)((hit) => Boolean(installedHubEntry(installed, hit)), [installed]);
	const showLanding = !searched && !searching;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-4 flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "h-8 pl-8 text-sm",
									placeholder: "Search the skill hub (GitHub, official, community)…",
									value: query,
									onChange: (e_2) => setQuery(e_2.target.value),
									onKeyDown: (e_3) => {
										if (e_3.key === "Enter") runSearch();
									}
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => void runSearch(),
								disabled: searching || !query.trim(),
								prefix: searching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5" }),
								children: "Search"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								outlined: true,
								onClick: () => void updateAll(),
								prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }),
								children: "Update all"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectedHubs, {
						sources,
						loading: sourcesLoading
					})]
				})
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs",
								children: action
							}),
							actionRunning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "warning",
								children: "running"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: "done"
							}),
							!actionRunning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								ghost: true,
								size: "xs",
								className: "ml-auto text-muted-foreground",
								onClick: () => setAction(null),
								"aria-label": "Dismiss",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "max-h-48 overflow-auto whitespace-pre-wrap break-words bg-background/50 border border-border p-2 text-xs font-mono text-muted-foreground",
						children: actionLog.length ? actionLog.join("\n") : "Starting…"
					})]
				})
			}),
			showLanding && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: sourcesLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-xl text-primary" })
			}) : featured.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mondwest text-display text-xs tracking-[0.12em] text-text-secondary uppercase",
							children: "Featured skills"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-text-tertiary",
							children: "from the Hermes index — search above for thousands more"
						})
					]
				}), featured.map((r_2) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubResultCard, {
					result: r_2,
					installed: isInstalled(r_2),
					onOpen: () => setDetail(r_2),
					onInstall: () => void install(r_2.identifier)
				}, r_2.identifier))]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "py-10 text-center text-sm text-muted-foreground",
					children: "Search the hub above to browse installable skills from the connected sources."
				})
			}) }),
			searching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-xl text-primary" })
			}),
			!searching && searched && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchMeta, {
				count: results.length,
				sourceCounts,
				timedOut,
				ms: searchMs
			}), results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-none",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
					className: "py-8 text-center text-sm text-muted-foreground",
					children: "No matching skills found in the hub."
				})
			}) : results.map((r_3) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubResultCard, {
				result: r_3,
				installed: isInstalled(r_3),
				onOpen: () => setDetail(r_3),
				onInstall: () => void install(r_3.identifier)
			}, r_3.identifier))] }),
			detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillDetailDialog, {
				result: detail,
				installed: isInstalled(detail),
				onClose: () => setDetail(null),
				onInstall: () => void install(detail.identifier),
				showToast
			})
		]
	});
}
function ConnectedHubs(t0) {
	const $ = (0, import_compiler_runtime.c)(7);
	const { sources, loading } = t0;
	if (loading) {
		let t1;
		if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
			t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Connecting to skill hubs…"
			});
			$[0] = t1;
		} else t1 = $[0];
		return t1;
	}
	if (sources.length === 0) {
		let t1;
		if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
			t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Results come from the same sources as",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono",
						children: "hermes skills search"
					}),
					"."
				]
			});
			$[1] = t1;
		} else t1 = $[1];
		return t1;
	}
	let t1;
	if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1 text-xs text-text-tertiary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-3 w-3" }), "Connected hubs:"]
		});
		$[2] = t1;
	} else t1 = $[2];
	let t2;
	if ($[3] !== sources) {
		t2 = sources.map(_temp);
		$[3] = sources;
		$[4] = t2;
	} else t2 = $[4];
	let t3;
	if ($[5] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-1.5",
			children: [t1, t2]
		});
		$[5] = t2;
		$[6] = t3;
	} else t3 = $[6];
	return t3;
}
function _temp(s) {
	const down = s.id === "hermes-index" && s.available === false || s.id === "github" && s.rate_limited === true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		tone: down ? "outline" : "secondary",
		className: cn("text-xs", down && "opacity-60"),
		title: s.id === "github" && s.rate_limited ? "GitHub API rate-limited — set GITHUB_TOKEN to raise the limit" : s.id === "hermes-index" && s.available === false ? "Centralized index unavailable — falling back to live sources" : void 0,
		children: [s.label, s.id === "github" && s.rate_limited ? " (rate-limited)" : ""]
	}, s.id);
}
function SearchMeta(t0) {
	const $ = (0, import_compiler_runtime.c)(16);
	const { count, sourceCounts, timedOut, ms } = t0;
	let t1;
	if ($[0] !== sourceCounts) {
		t1 = Object.entries(sourceCounts).filter(_temp2);
		$[0] = sourceCounts;
		$[1] = t1;
	} else t1 = $[1];
	const entries = t1;
	const t2 = count !== 1 ? "s" : "";
	let t3;
	if ($[2] !== count || $[3] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			tone: "secondary",
			className: "text-xs",
			children: [
				count,
				" result",
				t2
			]
		});
		$[2] = count;
		$[3] = t2;
		$[4] = t3;
	} else t3 = $[4];
	let t4;
	if ($[5] !== ms) {
		t4 = ms != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [(ms / 1e3).toFixed(1), "s"] });
		$[5] = ms;
		$[6] = t4;
	} else t4 = $[6];
	let t5;
	if ($[7] !== entries) {
		t5 = entries.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex flex-wrap items-center gap-1.5",
			children: entries.map(_temp3)
		});
		$[7] = entries;
		$[8] = t5;
	} else t5 = $[8];
	let t6;
	if ($[9] !== timedOut) {
		t6 = timedOut.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1 text-amber-400",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3" }),
				timedOut.join(", "),
				" timed out"
			]
		});
		$[9] = timedOut;
		$[10] = t6;
	} else t6 = $[10];
	let t7;
	if ($[11] !== t3 || $[12] !== t4 || $[13] !== t5 || $[14] !== t6) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2 px-1 text-xs text-text-tertiary",
			children: [
				t3,
				t4,
				t5,
				t6
			]
		});
		$[11] = t3;
		$[12] = t4;
		$[13] = t5;
		$[14] = t6;
		$[15] = t7;
	} else t7 = $[15];
	return t7;
}
function _temp3(t0) {
	const [sid, n_0] = t0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "font-mono",
		children: [
			sid,
			":",
			n_0
		]
	}, sid);
}
function _temp2(t0) {
	const [, n] = t0;
	return n > 0;
}
function HubResultCard(t0) {
	const $ = (0, import_compiler_runtime.c)(43);
	const { result, installed, onOpen, onInstall } = t0;
	let t1;
	if ($[0] !== result.trust_level) {
		t1 = trustVisual(result.trust_level);
		$[0] = result.trust_level;
		$[1] = t1;
	} else t1 = $[1];
	const trust = t1;
	const t2 = `Open ${result.name}`;
	let t3;
	if ($[2] !== result.name) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono-ui text-sm hover:underline",
			children: result.name
		});
		$[2] = result.name;
		$[3] = t3;
	} else t3 = $[3];
	let t4;
	if ($[4] !== trust.label || $[5] !== trust.tone) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: trust.tone,
			className: "text-xs",
			children: trust.label
		});
		$[4] = trust.label;
		$[5] = trust.tone;
		$[6] = t4;
	} else t4 = $[6];
	let t5;
	if ($[7] !== result.source) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: "secondary",
			className: "text-xs",
			children: result.source
		});
		$[7] = result.source;
		$[8] = t5;
	} else t5 = $[8];
	let t6;
	if ($[9] !== installed) {
		t6 = installed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: "success",
			className: "text-xs",
			children: "installed"
		});
		$[9] = installed;
		$[10] = t6;
	} else t6 = $[10];
	let t7;
	if ($[11] !== t3 || $[12] !== t4 || $[13] !== t5 || $[14] !== t6) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2 mb-0.5",
			children: [
				t3,
				t4,
				t5,
				t6
			]
		});
		$[11] = t3;
		$[12] = t4;
		$[13] = t5;
		$[14] = t6;
		$[15] = t7;
	} else t7 = $[15];
	let t8;
	if ($[16] !== result.description) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-text-secondary line-clamp-2",
			children: result.description
		});
		$[16] = result.description;
		$[17] = t8;
	} else t8 = $[17];
	let t9;
	if ($[18] !== result.tags) {
		t9 = result.tags.slice(0, 5).map(_temp4);
		$[18] = result.tags;
		$[19] = t9;
	} else t9 = $[19];
	let t10;
	if ($[20] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center gap-1 mt-1",
			children: t9
		});
		$[20] = t9;
		$[21] = t10;
	} else t10 = $[21];
	let t11;
	if ($[22] !== result.identifier) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-mono text-text-tertiary truncate mt-1",
			children: result.identifier
		});
		$[22] = result.identifier;
		$[23] = t11;
	} else t11 = $[23];
	let t12;
	if ($[24] !== onOpen || $[25] !== t10 || $[26] !== t11 || $[27] !== t2 || $[28] !== t7 || $[29] !== t8) {
		t12 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "flex-1 min-w-0 text-left",
			onClick: onOpen,
			"aria-label": t2,
			children: [
				t7,
				t8,
				t10,
				t11
			]
		});
		$[24] = onOpen;
		$[25] = t10;
		$[26] = t11;
		$[27] = t2;
		$[28] = t7;
		$[29] = t8;
		$[30] = t12;
	} else t12 = $[30];
	let t13;
	if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" });
		$[31] = t13;
	} else t13 = $[31];
	let t14;
	if ($[32] !== onOpen) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			outlined: true,
			onClick: onOpen,
			prefix: t13,
			children: "Details"
		});
		$[32] = onOpen;
		$[33] = t14;
	} else t14 = $[33];
	let t15;
	if ($[34] !== installed || $[35] !== onInstall) {
		t15 = installed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			ghost: true,
			disabled: true,
			prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }),
			children: "Installed"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			onClick: onInstall,
			prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }),
			children: "Install"
		});
		$[34] = installed;
		$[35] = onInstall;
		$[36] = t15;
	} else t15 = $[36];
	let t16;
	if ($[37] !== t14 || $[38] !== t15) {
		t16 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex shrink-0 flex-col gap-1.5",
			children: [t14, t15]
		});
		$[37] = t14;
		$[38] = t15;
		$[39] = t16;
	} else t16 = $[39];
	let t17;
	if ($[40] !== t12 || $[41] !== t16) {
		t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "rounded-none transition-colors hover:bg-muted/30",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "py-3 flex items-start gap-3",
				children: [t12, t16]
			})
		});
		$[40] = t12;
		$[41] = t16;
		$[42] = t17;
	} else t17 = $[42];
	return t17;
}
function _temp4(tag) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-[0.65rem] font-mono text-text-tertiary border border-border px-1 py-px",
		children: tag
	}, tag);
}
function SkillDetailDialog({ result, installed, onClose, onInstall, showToast }) {
	const [tab, setTab] = (0, import_react.useState)("readme");
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [previewLoading, setPreviewLoading] = (0, import_react.useState)(true);
	const [scan, setScan] = (0, import_react.useState)(null);
	const [scanning, setScanning] = (0, import_react.useState)(false);
	const trust = trustVisual(result.trust_level);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setPreviewLoading(true);
		api.previewSkillFromHub(result.identifier).then((p) => !cancelled && setPreview(p)).catch((e) => {
			if (!cancelled) showToast(`Preview failed: ${errorMessage(e)}`, "error");
		}).finally(() => !cancelled && setPreviewLoading(false));
		return () => {
			cancelled = true;
		};
	}, [result.identifier, showToast]);
	const runScan = (0, import_react.useCallback)(async () => {
		setScanning(true);
		setTab("scan");
		try {
			const s = await api.scanSkillFromHub(result.identifier);
			setScan(s);
		} catch (e_0) {
			showToast(`Scan failed: ${errorMessage(e_0)}`, "error");
		} finally {
			setScanning(false);
		}
	}, [result.identifier, showToast]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-3xl rounded-none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex flex-wrap items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }),
						result.name,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: trust.tone,
							className: "text-xs",
							children: trust.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "secondary",
							className: "text-xs",
							children: result.source
						}),
						installed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "success",
							className: "text-xs",
							children: "installed"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
					className: "sr-only",
					children: [
						"Preview the SKILL.md source and run a security scan for ",
						result.name,
						" ",
						"before installing."
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-text-secondary",
						children: result.description
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-mono text-text-tertiary truncate",
						children: result.identifier
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center gap-2 border-y border-border py-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							outlined: tab !== "readme",
							onClick: () => setTab("readme"),
							prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" }),
							children: "Read SKILL.md"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							outlined: tab !== "scan",
							onClick: () => void runScan(),
							disabled: scanning,
							prefix: scanning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5" }),
							children: scan ? "Re-scan" : "Security scan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-3",
							children: [result.repo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `https://github.com/${result.repo}`,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center gap-1 text-xs text-primary hover:underline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" }), result.repo]
							}), installed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								ghost: true,
								disabled: true,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }),
								children: "Installed"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: onInstall,
								prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }),
								children: "Install"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 max-h-[55vh] overflow-auto",
					children: tab === "readme" ? previewLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center py-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-xl text-primary" })
					}) : preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2.5",
						children: [
							preview.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap items-center gap-1",
								children: preview.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.65rem] font-mono text-text-tertiary border border-border px-1 py-px",
									children: tag
								}, tag))
							}),
							preview.files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-text-tertiary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mondwest tracking-[0.1em] uppercase",
									children: ["Files:", " "]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: preview.files.join("  ")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "whitespace-pre-wrap break-words bg-background/50 border border-border p-3 text-xs font-mono text-text-secondary leading-relaxed",
								children: (preview.skill_md || "").trim() || "(SKILL.md is empty)"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground text-center py-10",
						children: "Couldn't load the skill source."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanPanel, {
						scan,
						scanning
					})
				})
			]
		})
	});
}
function ScanPanel(t0) {
	const $ = (0, import_compiler_runtime.c)(48);
	const { scan, scanning } = t0;
	if (scanning && !scan) {
		let t1;
		if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
			t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center gap-2 py-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: "Fetching, quarantining, and scanning…"
				})]
			});
			$[0] = t1;
		} else t1 = $[0];
		return t1;
	}
	if (!scan) {
		let t1;
		if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
			t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground text-center py-10",
				children: "Run a security scan to inspect this skill for risky patterns before installing."
			});
			$[1] = t1;
		} else t1 = $[1];
		return t1;
	}
	let t1;
	if ($[2] !== scan.verdict) {
		t1 = verdictVisual(scan.verdict);
		$[2] = scan.verdict;
		$[3] = t1;
	} else t1 = $[3];
	const v = t1;
	const policyTone = scan.policy === "allow" ? "success" : scan.policy === "ask" ? "warning" : "destructive";
	const policyLabel = scan.policy === "allow" ? "Install allowed" : scan.policy === "ask" ? "Needs confirmation" : "Install blocked";
	const T0 = v.Icon;
	const t2 = scan.verdict === "safe" ? "text-emerald-400" : scan.verdict === "dangerous" ? "text-red-400" : "text-amber-400";
	let t3;
	if ($[4] !== t2) {
		t3 = cn("h-6 w-6", t2);
		$[4] = t2;
		$[5] = t3;
	} else t3 = $[5];
	let t4;
	if ($[6] !== t3 || $[7] !== v.Icon) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(T0, { className: t3 });
		$[6] = t3;
		$[7] = v.Icon;
		$[8] = t4;
	} else t4 = $[8];
	let t5;
	if ($[9] !== v.label) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-sm font-medium",
			children: ["Verdict: ", v.label]
		});
		$[9] = v.label;
		$[10] = t5;
	} else t5 = $[10];
	let t6;
	if ($[11] !== scan.verdict || $[12] !== v.tone) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: v.tone,
			className: "text-xs",
			children: scan.verdict
		});
		$[11] = scan.verdict;
		$[12] = v.tone;
		$[13] = t6;
	} else t6 = $[13];
	let t7;
	if ($[14] !== t5 || $[15] !== t6) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [t5, t6]
		});
		$[14] = t5;
		$[15] = t6;
		$[16] = t7;
	} else t7 = $[16];
	const t8 = scan.findings.length !== 1 ? "s" : "";
	let t9;
	if ($[17] !== scan.findings.length || $[18] !== scan.trust_level || $[19] !== t8) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-xs text-text-tertiary",
			children: [
				scan.trust_level,
				" source · ",
				scan.findings.length,
				" finding",
				t8
			]
		});
		$[17] = scan.findings.length;
		$[18] = scan.trust_level;
		$[19] = t8;
		$[20] = t9;
	} else t9 = $[20];
	let t10;
	if ($[21] !== t7 || $[22] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col",
			children: [t7, t9]
		});
		$[21] = t7;
		$[22] = t9;
		$[23] = t10;
	} else t10 = $[23];
	let t11;
	if ($[24] !== policyLabel || $[25] !== policyTone) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: policyTone,
			className: "ml-auto text-xs",
			children: policyLabel
		});
		$[24] = policyLabel;
		$[25] = policyTone;
		$[26] = t11;
	} else t11 = $[26];
	let t12;
	if ($[27] !== t10 || $[28] !== t11 || $[29] !== t4) {
		t12 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2 border border-border p-3",
			children: [
				t4,
				t10,
				t11
			]
		});
		$[27] = t10;
		$[28] = t11;
		$[29] = t4;
		$[30] = t12;
	} else t12 = $[30];
	let t13;
	if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
		t13 = [
			"critical",
			"high",
			"medium",
			"low"
		];
		$[31] = t13;
	} else t13 = $[31];
	let t14;
	if ($[32] !== scan.severity_counts) {
		t14 = t13.map((sev) => {
			const n = scan.severity_counts[sev] || 0;
			if (n === 0) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				tone: SEVERITY_TONE[sev],
				className: "text-xs",
				children: [
					n,
					" ",
					sev
				]
			}, sev);
		});
		$[32] = scan.severity_counts;
		$[33] = t14;
	} else t14 = $[33];
	let t15;
	if ($[34] !== scan.findings.length) {
		t15 = scan.findings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1 text-xs text-emerald-400",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), "No risky patterns detected"]
		});
		$[34] = scan.findings.length;
		$[35] = t15;
	} else t15 = $[35];
	let t16;
	if ($[36] !== t14 || $[37] !== t15) {
		t16 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-1.5",
			children: [t14, t15]
		});
		$[36] = t14;
		$[37] = t15;
		$[38] = t16;
	} else t16 = $[38];
	let t17;
	if ($[39] !== scan.policy_reason) {
		t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-text-tertiary",
			children: scan.policy_reason
		});
		$[39] = scan.policy_reason;
		$[40] = t17;
	} else t17 = $[40];
	let t18;
	if ($[41] !== scan.findings) {
		t18 = scan.findings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col border border-border divide-y divide-border",
			children: scan.findings.map(_temp5)
		});
		$[41] = scan.findings;
		$[42] = t18;
	} else t18 = $[42];
	let t19;
	if ($[43] !== t12 || $[44] !== t16 || $[45] !== t17 || $[46] !== t18) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3",
			children: [
				t12,
				t16,
				t17,
				t18
			]
		});
		$[43] = t12;
		$[44] = t16;
		$[45] = t17;
		$[46] = t18;
		$[47] = t19;
	} else t19 = $[47];
	return t19;
}
function _temp5(f, i) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-2 p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: SEVERITY_TONE[f.severity] || "outline",
			className: "text-xs shrink-0",
			children: f.severity
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium",
					children: f.category
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-mono text-text-tertiary truncate",
					children: [
						f.file,
						":",
						f.line
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-text-secondary",
				children: f.description
			})]
		})]
	}, i);
}
//#endregion
export { SkillsPage as default };
