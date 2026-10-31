import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { f as useNavigate, h as require_react, n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { A as Badge, B as Button, a as H2, f as Label, h as CardContent, k as Checkbox, m as Card, p as Input, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { t as cn } from "./utils-XzxpPQdK.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { n as emptyMcpServerDraft, t as buildMcpServerCreate } from "./mcp-server-create-BjaPvL6F.js";
//#region web/src/pages/ProfileBuilderPage.tsx
var import_compiler_runtime = require_compiler_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var PROFILE_NAME_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/;
var STEPS = [
	{
		id: "identity",
		label: "Identity"
	},
	{
		id: "model",
		label: "Model"
	},
	{
		id: "skills",
		label: "Skills"
	},
	{
		id: "mcp",
		label: "MCPs"
	},
	{
		id: "review",
		label: "Review"
	}
];
/**
* Dashboard-native, full-featured profile builder.
*
* Composes the same elements the standalone Models / Skills / MCP pages
* manage — Name, Description, Model+Provider, Skills (built-in/optional +
* hub), MCP servers — into one stepped create flow. Nothing is written to
* disk until "Create profile" on the final step; the single POST /api/profiles
* call commits model + MCPs + skill selection synchronously and spawns any
* hub-skill installs (which the success toast reports as in-progress).
*
* Skills use REPLACE semantics: the default bundle is seeded server-side, then
* every seeded skill the user did NOT keep is disabled. The "Start from full
* bundle" toggle keeps everything (sends no keep list).
*/
function ProfileBuilderPage() {
	const navigate = useNavigate();
	const { toast, showToast } = useToast();
	const [step, setStep] = (0, import_react.useState)("identity");
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [modelChoices, setModelChoices] = (0, import_react.useState)(null);
	const [modelChoice, setModelChoice] = (0, import_react.useState)("");
	const [modelFilter, setModelFilter] = (0, import_react.useState)("");
	const modelLoading = (0, import_react.useRef)(false);
	const [skills, setSkills] = (0, import_react.useState)(null);
	const [keepAll, setKeepAll] = (0, import_react.useState)(true);
	const [keptSkills, setKeptSkills] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [skillFilter, setSkillFilter] = (0, import_react.useState)("");
	const skillsLoading = (0, import_react.useRef)(false);
	const [hubQuery, setHubQuery] = (0, import_react.useState)("");
	const [hubResults, setHubResults] = (0, import_react.useState)([]);
	const [hubSearching, setHubSearching] = (0, import_react.useState)(false);
	const [hubSkills, setHubSkills] = (0, import_react.useState)([]);
	const [mcpServers, setMcpServers] = (0, import_react.useState)([]);
	const [mcpDraft, setMcpDraft] = (0, import_react.useState)(emptyMcpServerDraft);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const nameValid = PROFILE_NAME_RE.test(name.trim());
	const loadModels = (0, import_react.useCallback)(() => {
		if (modelChoices !== null || modelLoading.current) return;
		modelLoading.current = true;
		api.getModelOptions().then((res) => {
			const flat = [];
			for (const prov of res.providers ?? []) for (const m of prov.models ?? []) flat.push({
				provider: prov.slug,
				model: m,
				label: `${prov.name} · ${m}`
			});
			setModelChoices(flat);
		}).catch(() => setModelChoices([])).finally(() => {
			modelLoading.current = false;
		});
	}, [modelChoices]);
	const loadSkills = (0, import_react.useCallback)(() => {
		if (skills !== null || skillsLoading.current) return;
		skillsLoading.current = true;
		api.getSkills().then((res_0) => {
			setSkills(res_0);
			setKeptSkills(new Set(res_0.filter((s) => s.enabled).map((s_0) => s_0.name)));
		}).catch(() => setSkills([])).finally(() => {
			skillsLoading.current = false;
		});
	}, [skills]);
	(0, import_react.useEffect)(() => {
		if (step === "model") loadModels();
		if (step === "skills") loadSkills();
	}, [
		step,
		loadModels,
		loadSkills
	]);
	const runHubSearch = (0, import_react.useCallback)(() => {
		const q = hubQuery.trim();
		if (!q) return;
		setHubSearching(true);
		api.searchSkillsHub(q, "all", 20).then((res_1) => setHubResults(res_1.results ?? [])).catch(() => setHubResults([])).finally(() => setHubSearching(false));
	}, [hubQuery]);
	const toggleKeep = (skillName) => {
		setKeptSkills((prev) => {
			const next = new Set(prev);
			if (next.has(skillName)) next.delete(skillName);
			else next.add(skillName);
			return next;
		});
	};
	const addHubSkill = (r) => {
		setHubSkills((prev_0) => prev_0.some((x) => x.identifier === r.identifier) ? prev_0 : [...prev_0, r]);
	};
	const removeHubSkill = (identifier) => setHubSkills((prev_1) => prev_1.filter((x_0) => x_0.identifier !== identifier));
	const addMcpDraft = () => {
		let entry;
		try {
			entry = buildMcpServerCreate(mcpDraft);
		} catch (error) {
			showToast(error instanceof Error ? error.message : "Invalid MCP server", "error");
			return;
		}
		setMcpServers((prev_2) => [...prev_2.filter((server) => server.name !== entry.name), entry]);
		setMcpDraft(emptyMcpServerDraft());
	};
	const removeMcp = (n) => setMcpServers((prev_3) => prev_3.filter((s_1) => s_1.name !== n));
	const setMcpTransport = (transport) => {
		setMcpDraft((draft) => transport === "http" ? {
			...draft,
			transport,
			command: "",
			args: "",
			env: ""
		} : {
			...draft,
			transport,
			url: "",
			httpAuth: "none",
			bearerToken: ""
		});
	};
	const setMcpHttpAuth = (httpAuth) => {
		setMcpDraft((draft_0) => ({
			...draft_0,
			httpAuth,
			bearerToken: httpAuth === "header" ? draft_0.bearerToken : ""
		}));
	};
	const filteredModels = (0, import_react.useMemo)(() => {
		if (!modelChoices) return [];
		const f = modelFilter.trim().toLowerCase();
		if (!f) return modelChoices;
		return modelChoices.filter((c) => c.label.toLowerCase().includes(f));
	}, [modelChoices, modelFilter]);
	const filteredSkills = (0, import_react.useMemo)(() => {
		if (!skills) return [];
		const f_0 = skillFilter.trim().toLowerCase();
		if (!f_0) return skills;
		return skills.filter((s_2) => s_2.name.toLowerCase().includes(f_0) || (s_2.description || "").toLowerCase().includes(f_0) || (s_2.category || "").toLowerCase().includes(f_0));
	}, [skills, skillFilter]);
	const pickedModel = (0, import_react.useMemo)(() => modelChoice ? modelChoices?.find((c_0) => `${c_0.provider}\u0000${c_0.model}` === modelChoice) : void 0, [modelChoice, modelChoices]);
	const handleCreate = async () => {
		const n_0 = name.trim();
		if (!PROFILE_NAME_RE.test(n_0)) {
			showToast("Invalid profile name (lowercase, digits, - and _)", "error");
			setStep("identity");
			return;
		}
		setCreating(true);
		try {
			const pending = ((await api.createProfile({
				name: n_0,
				clone_from: null,
				description: description.trim() || void 0,
				provider: pickedModel?.provider,
				model: pickedModel?.model,
				mcp_servers: mcpServers.length ? mcpServers : void 0,
				keep_skills: keepAll ? void 0 : Array.from(keptSkills),
				hub_skills: hubSkills.length ? hubSkills.map((s_3) => s_3.identifier) : void 0
			})).hub_installs ?? []).filter((h) => h.pid).length;
			showToast(pending ? `Profile "${n_0}" created — ${pending} hub skill${pending === 1 ? "" : "s"} installing` : `Profile "${n_0}" created`, "success");
			navigate("/profiles");
		} catch (e) {
			showToast(`Create failed: ${errorMessage(e)}`, "error");
		} finally {
			setCreating(false);
		}
	};
	const stepIndex = STEPS.findIndex((s_4) => s_4.id === step);
	const canAdvance = step !== "identity" || nameValid;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-3xl space-y-6 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2, { children: "New profile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ghost: true,
					onClick: () => navigate("/profiles"),
					children: "Cancel"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2 text-sm",
				children: STEPS.map((s_5, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					disabled: i > 0 && !nameValid,
					onClick: () => setStep(s_5.id),
					className: cn("rounded-full px-3 py-1 transition-colors", s_5.id === step ? "bg-primary text-primary-foreground" : i <= stepIndex ? "bg-muted text-foreground" : "text-muted-foreground", i > 0 && !nameValid && "cursor-not-allowed opacity-50"),
					children: [
						i + 1,
						". ",
						s_5.label
					]
				}, s_5.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "space-y-4 p-5",
				children: [
					step === "identity" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "pb-name",
									children: "Profile name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "pb-name",
									placeholder: "coder",
									value: name,
									onChange: (e_0) => setName(e_0.target.value)
								}),
								name && !nameValid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive",
									children: "Lowercase letters, digits, hyphens and underscores; must start with a letter or digit."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "pb-desc",
								children: "Description (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "pb-desc",
								placeholder: "What this agent profile is for",
								value: description,
								onChange: (e_1) => setDescription(e_1.target.value)
							})]
						})]
					}),
					step === "model" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Pick the model+provider for this profile. Skip to use the default."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Filter models…",
								value: modelFilter,
								onChange: (e_2) => setModelFilter(e_2.target.value)
							}),
							modelChoices === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Loading models…"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-h-72 space-y-1 overflow-y-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setModelChoice(""),
									className: cn("block w-full rounded px-3 py-2 text-left text-sm", modelChoice === "" ? "bg-primary/10" : "hover:bg-muted"),
									children: "Use default (set later)"
								}), filteredModels.map((c_1) => {
									const key = `${c_1.provider}\u0000${c_1.model}`;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setModelChoice(key),
										className: cn("block w-full rounded px-3 py-2 text-left text-sm", modelChoice === key ? "bg-primary/10" : "hover:bg-muted"),
										children: c_1.label
									}, key);
								})]
							})
						]
					}),
					step === "skills" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: keepAll,
									onCheckedChange: (v) => setKeepAll(Boolean(v))
								}), "Start from the full default skill bundle (recommended)"]
							}),
							!keepAll && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Choose which built-in / optional skills to keep active. Unchecked skills are disabled in the new profile."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Filter skills…",
										value: skillFilter,
										onChange: (e_3) => setSkillFilter(e_3.target.value)
									}),
									skills === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Loading skills…"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "max-h-56 space-y-1 overflow-y-auto",
										children: filteredSkills.map((s_6) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-start gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: keptSkills.has(s_6.name),
												onCheckedChange: () => toggleKeep(s_6.name)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium",
														children: s_6.name
													}),
													s_6.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														tone: "secondary",
														className: "ml-2",
														children: s_6.category
													}),
													s_6.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-xs text-muted-foreground",
														children: s_6.description
													})
												]
											})]
										}, s_6.name))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 border-t pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Add from the skills hub" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Search the hub (e.g. linear, hyperliquid)…",
											value: hubQuery,
											onChange: (e_4) => setHubQuery(e_4.target.value),
											onKeyDown: (e_5) => {
												if (e_5.key === "Enter") runHubSearch();
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											outlined: true,
											onClick: runHubSearch,
											disabled: hubSearching,
											children: hubSearching ? "Searching…" : "Search"
										})]
									}),
									hubResults.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "max-h-48 space-y-1 overflow-y-auto",
										children: hubResults.map((r_0) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between rounded px-2 py-1.5 text-sm hover:bg-muted",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium",
														children: r_0.name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														tone: "secondary",
														className: "ml-2",
														children: r_0.source
													}),
													r_0.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-xs text-muted-foreground",
														children: r_0.description
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												ghost: true,
												onClick: () => addHubSkill(r_0),
												children: "Add"
											})]
										}, r_0.identifier))
									}),
									hubSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2 pt-1",
										children: hubSkills.map((r_1) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											className: "gap-1",
											children: [r_1.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "ml-1 text-xs",
												onClick: () => removeHubSkill(r_1.identifier),
												"aria-label": `Remove ${r_1.name}`,
												children: "×"
											})]
										}, r_1.identifier))
									})
								]
							})
						]
					}),
					step === "mcp" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-expanded text-base font-bold tracking-[0.04em]",
										children: "MCP servers"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Add MCP servers to give this profile access to external tools and data."
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									"aria-live": "polite",
									children: [mcpServers.length, " configured"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 border border-border bg-background/20 p-4 md:p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-medium",
										children: "Add server"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 md:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "pb-mcp-name",
												children: "Server name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "pb-mcp-name",
												placeholder: "Enter server name",
												value: mcpDraft.name,
												onChange: (e_6) => setMcpDraft({
													...mcpDraft,
													name: e_6.target.value
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Transport" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-2 border border-border bg-background/30 p-0.5",
												role: "group",
												"aria-label": "MCP transport",
												children: [["http", "HTTP/SSE"], ["stdio", "stdio"]].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-pressed": mcpDraft.transport === value,
													className: cn("px-3 py-2 text-sm font-medium transition-colors", mcpDraft.transport === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
													onClick: () => setMcpTransport(value),
													children: label
												}, value))
											})]
										})]
									}),
									mcpDraft.transport === "http" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "pb-mcp-url",
												children: "URL"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "pb-mcp-url",
												placeholder: "https://example.com/mcp",
												value: mcpDraft.url,
												onChange: (e_7) => setMcpDraft({
													...mcpDraft,
													url: e_7.target.value
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Authentication" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-3 border border-border bg-background/30 p-0.5 md:max-w-md",
												role: "group",
												"aria-label": "HTTP authentication",
												children: [
													["none", "None"],
													["header", "Bearer token"],
													["oauth", "OAuth"]
												].map(([value_0, label_0]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-pressed": mcpDraft.httpAuth === value_0,
													className: cn("px-2 py-2 text-sm font-medium transition-colors", mcpDraft.httpAuth === value_0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
													onClick: () => setMcpHttpAuth(value_0),
													children: label_0
												}, value_0))
											})]
										}),
										mcpDraft.httpAuth === "header" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "pb-mcp-bearer-token",
													children: "Bearer token"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "pb-mcp-bearer-token",
													type: "password",
													autoComplete: "new-password",
													placeholder: "Token or Bearer token",
													value: mcpDraft.bearerToken,
													onChange: (e_8) => setMcpDraft({
														...mcpDraft,
														bearerToken: e_8.target.value
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Stored in the new profile's .env; config.yaml keeps only an environment-variable reference."
												})
											]
										}),
										mcpDraft.httpAuth === "oauth" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "After creating the profile, open its MCP page and use Authenticate to complete OAuth."
										})
									] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 md:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "pb-mcp-command",
												children: "Command"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "pb-mcp-command",
												placeholder: "npx",
												value: mcpDraft.command,
												onChange: (e_9) => setMcpDraft({
													...mcpDraft,
													command: e_9.target.value
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "pb-mcp-args",
												children: "Arguments"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "pb-mcp-args",
												placeholder: "-y @modelcontextprotocol/server",
												value: mcpDraft.args,
												onChange: (e_10) => setMcpDraft({
													...mcpDraft,
													args: e_10.target.value
												})
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "pb-mcp-env",
											children: "Environment (KEY=VALUE per line)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "pb-mcp-env",
											className: "flex min-h-[80px] w-full border border-border bg-background/40 px-3 py-2 text-sm font-courier shadow-sm placeholder:text-muted-foreground focus-visible:border-foreground/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30",
											placeholder: "API_KEY=secret\nDEBUG=1",
											value: mcpDraft.env,
											onChange: (e_11) => setMcpDraft({
												...mcpDraft,
												env: e_11.target.value
											})
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: addMcpDraft,
											children: "Add server"
										})
									})
								]
							}),
							mcpServers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: mcpServers.map((s_7) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-4 border border-border bg-muted/40 p-4 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium",
													children: s_7.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: "outline",
													children: s_7.url ? "HTTP" : "stdio"
												}),
												s_7.auth && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
													tone: "outline",
													children: ["auth: ", s_7.auth === "header" ? "bearer" : s_7.auth]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block break-all text-xs text-muted-foreground",
											children: s_7.url || [s_7.command, ...s_7.args || []].join(" ")
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										ghost: true,
										destructive: true,
										className: "shrink-0",
										onClick: () => removeMcp(s_7.name),
										children: "Remove"
									})]
								}, s_7.name))
							})
						]
					}),
					step === "review" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
								label: "Name",
								value: name.trim() || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
								label: "Description",
								value: description.trim() || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
								label: "Model",
								value: pickedModel ? pickedModel.label : "Default (set later)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
								label: "Skills",
								value: keepAll ? "Full default bundle" : `${keptSkills.size} built-in/optional kept` + (hubSkills.length ? ` + ${hubSkills.length} hub` : "")
							}),
							!keepAll && hubSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "pl-24 text-xs text-muted-foreground",
								children: ["Hub: ", hubSkills.map((s_8) => s_8.name).join(", ")]
							}),
							keepAll && hubSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
								label: "Hub skills",
								value: hubSkills.map((s_9) => s_9.name).join(", ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewRow, {
								label: "MCP servers",
								value: mcpServers.length ? mcpServers.map((s_10) => s_10.name).join(", ") : "None"
							})
						]
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ghost: true,
					disabled: stepIndex === 0,
					onClick: () => setStep(STEPS[Math.max(0, stepIndex - 1)].id),
					children: "Back"
				}), step === "review" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleCreate,
					disabled: creating || !nameValid,
					children: creating ? "Creating…" : "Create profile"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !canAdvance,
					onClick: () => setStep(STEPS[Math.min(STEPS.length - 1, stepIndex + 1)].id),
					children: "Next"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast })
		]
	});
}
function ReviewRow(t0) {
	const $ = (0, import_compiler_runtime.c)(7);
	const { label, value } = t0;
	let t1;
	if ($[0] !== label) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-24 shrink-0 text-muted-foreground",
			children: label
		});
		$[0] = label;
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	if ($[2] !== value) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex-1 break-words",
			children: value
		});
		$[2] = value;
		$[3] = t2;
	} else t2 = $[3];
	let t3;
	if ($[4] !== t1 || $[5] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-3",
			children: [t1, t2]
		});
		$[4] = t1;
		$[5] = t2;
		$[6] = t3;
	} else t3 = $[6];
	return t3;
}
//#endregion
export { ProfileBuilderPage as default };
