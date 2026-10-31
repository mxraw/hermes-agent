import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, i as Link, n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { At as EyeOff, I as RefreshCw, g as Trash2, jt as ExternalLink, kt as Eye } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, I as ConfirmDialog, L as Spinner, N as Select, P as SelectOption, _ as CardHeader, f as Label, h as CardContent, m as Card, n as CopyButton, o as Switch, p as Input, t as CommandBlock, v as CardTitle, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { t as cn } from "./utils-XzxpPQdK.js";
import { i as en, r as useI18n } from "./i18n-Zn9FHQtI.js";
import { n as api } from "./api-rr7lTIEw.js";
import { u as PluginSlot } from "./index-CeRydpmd.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
//#region web/src/lib/plugin-update.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_compiler_runtime = require_compiler_runtime();
var SEVERITY_ORDER = [
	"critical",
	"high",
	"medium",
	"low"
];
var FINDINGS_SHOWN = 8;
var severityRank = (severity) => {
	const rank = SEVERITY_ORDER.indexOf(severity);
	return rank === -1 ? SEVERITY_ORDER.length : rank;
};
/** One line per finding, worst first, capped so a native confirm stays readable. */
function scanFindingLines(findings) {
	const sorted = [...findings].sort((a, b) => severityRank(a.severity) - severityRank(b.severity));
	const lines = sorted.slice(0, FINDINGS_SHOWN).map((f) => `${f.severity.toUpperCase()}  ${f.file}:${f.line}  ${f.description || f.category}`);
	return sorted.length > FINDINGS_SHOWN ? [...lines, `+${sorted.length - FINDINGS_SHOWN}`] : lines;
}
/** Update one plugin, asking before each override the backend asks for: a catalog pin that widens the
*  plugin, or new code the security scan rated caution. Each question is asked at most once. Resolves
*  true when the update applied; throws on a refusal (a dangerous verdict included). */
async function runDashboardPluginUpdate(name, copy, ask = (message) => window.confirm(message)) {
	const options = {
		acceptCapabilities: false,
		force: false
	};
	for (;;) {
		const res = await api.updateAgentPlugin(name, options);
		if (res.consent_required && !options.acceptCapabilities) {
			if (!ask([copy.consentBody(name, (res.sha ?? "").slice(0, 8)), ...res.delta_lines ?? []].join("\n"))) return false;
			options.acceptCapabilities = true;
			continue;
		}
		if (res.scan_blocked && res.scan_verdict === "caution" && !options.force) {
			const findings = res.scan_findings ?? [];
			if (!ask([copy.scanBody(name, findings.length), ...scanFindingLines(findings)].join("\n"))) return false;
			options.force = true;
			continue;
		}
		if (res.scan_blocked) throw new Error(copy.scanBlocked(name));
		return true;
	}
}
//#endregion
//#region web/src/lib/memory-provider-setup.ts
function setupHasDetails(setup) {
	return Boolean(setup && (setup.external_dependencies?.length || setup.python_dependencies_declared || setup.pip_dependencies?.length || setup.required_env?.length));
}
function setupHasInstallableSteps(setup) {
	return Boolean(setup && (setup.external_dependencies?.some((dep) => dep.install) || setup.python_dependencies_declared || setup.pip_dependencies?.length));
}
//#endregion
//#region web/src/pages/PluginsPage.tsx
var import_jsx_runtime = require_jsx_runtime();
/** Select value for built-in memory (`config` uses empty string). Never use `""` — UI Select maps empty value to an empty label. */
var MEMORY_PROVIDER_BUILTIN = "__hermes_memory_builtin__";
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
function fieldInitialValue(field) {
	if (field.kind === "secret") return "";
	if (field.kind === "boolean") return Boolean(field.value);
	return String(field.value ?? "");
}
function fieldIsVisible(field, values) {
	if (!field.when) return true;
	return Object.entries(field.when).every(([key, expected]) => {
		const current = values[key];
		return String(current ?? "") === String(expected);
	});
}
function SetupCommandBlock(t0) {
	const $ = (0, import_compiler_runtime.c)(12);
	const { code, label } = t0;
	let t1;
	if ($[0] !== label) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[0.6875rem] text-muted-foreground",
			children: label
		});
		$[0] = label;
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	if ($[2] !== code) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { text: code });
		$[2] = code;
		$[3] = t2;
	} else t2 = $[3];
	let t3;
	if ($[4] !== t1 || $[5] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [t1, t2]
		});
		$[4] = t1;
		$[5] = t2;
		$[6] = t3;
	} else t3 = $[6];
	let t4;
	if ($[7] !== code) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border border-border bg-background/40 px-3 py-2 font-mono text-[0.6875rem] leading-relaxed",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
				className: "break-all",
				children: code
			})
		});
		$[7] = code;
		$[8] = t4;
	} else t4 = $[8];
	let t5;
	if ($[9] !== t3 || $[10] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1",
			children: [t3, t4]
		});
		$[9] = t3;
		$[10] = t4;
		$[11] = t5;
	} else t5 = $[11];
	return t5;
}
function setupResultLabel(status) {
	if (status === "already_installed") return "already installed";
	if (status === "no_declared_steps") return "no declared setup";
	return status.replace(/_/g, " ");
}
function setupResultClass(status) {
	if (status === "failed") return "border-destructive/50 text-destructive";
	if (status === "installed" || status === "verified" || status === "already_installed") return "border-success/50 text-success";
	if (status === "missing") return "border-warning/50 text-warning";
	return "border-border text-muted-foreground";
}
function MemoryProviderSetupResults(t0) {
	const $ = (0, import_compiler_runtime.c)(5);
	const { results } = t0;
	if (!results.length) return null;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Setup results"
		});
		$[0] = t1;
	} else t1 = $[0];
	let t2;
	if ($[1] !== results) {
		t2 = results.map(_temp);
		$[1] = results;
		$[2] = t2;
	} else t2 = $[2];
	let t3;
	if ($[3] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2 border border-border bg-background/20 p-3",
			children: [t1, t2]
		});
		$[3] = t2;
		$[4] = t3;
	} else t3 = $[4];
	return t3;
}
function _temp(result, index) {
	const detail = result.stderr || result.stdout;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("border px-2 py-0.5 font-mono text-[0.6875rem]", setupResultClass(result.status)),
					children: setupResultLabel(result.status)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground",
					children: [result.name, result.kind ? ` (${result.kind.replace(/_/g, " ")})` : ""]
				})]
			}),
			result.command ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
				className: "block break-all border border-border bg-background/40 px-2 py-1 font-mono text-[0.6875rem]",
				children: result.command
			}) : null,
			detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "max-h-32 overflow-auto whitespace-pre-wrap break-words border border-border bg-background/40 px-2 py-1 font-mono text-[0.6875rem] text-muted-foreground",
				children: detail
			}) : null
		]
	}, `${result.kind}-${result.name}-${index}`);
}
function MemoryProviderSetupHint(t0) {
	const $ = (0, import_compiler_runtime.c)(31);
	const { installing, onInstall, provider, results } = t0;
	const setup = provider.setup;
	const hasDetails = setupHasDetails(setup);
	let t1;
	if ($[0] !== setup) {
		t1 = setupHasInstallableSteps(setup);
		$[0] = setup;
		$[1] = t1;
	} else t1 = $[1];
	const hasInstallableSteps = t1;
	const dependenciesInstalled = setup?.dependencies_installed ?? !hasInstallableSteps;
	const hasResults = Boolean(results?.length);
	const needsDependencySetup = hasInstallableSteps && !dependenciesInstalled;
	const isBlocked = provider.status === "unavailable" && needsDependencySetup;
	if (!(hasResults || needsDependencySetup || provider.status === "unavailable" && hasDetails && !dependenciesInstalled)) return null;
	if (!hasDetails || !setup) {
		let t2;
		if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
			t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border border-destructive/50 px-3 py-2 text-xs text-destructive",
				children: "This provider is installed but unavailable. It may need local dependencies or a manual setup step before Hermes can activate it."
			});
			$[2] = t2;
		} else t2 = $[2];
		return t2;
	}
	const t2 = isBlocked ? "border-destructive/50" : "border-border";
	let t3;
	if ($[3] !== t2) {
		t3 = cn("grid gap-3 border px-3 py-3 text-xs text-foreground", t2);
		$[3] = t2;
		$[4] = t3;
	} else t3 = $[4];
	const t4 = isBlocked ? "text-destructive" : "text-muted-foreground";
	const t5 = needsDependencySetup ? "Finish these setup steps before Hermes can activate this provider." : "Provider dependency setup completed.";
	let t6;
	if ($[5] !== t4 || $[6] !== t5) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: t4,
			children: t5
		});
		$[5] = t4;
		$[6] = t5;
		$[7] = t6;
	} else t6 = $[7];
	let t7;
	if ($[8] !== installing || $[9] !== needsDependencySetup || $[10] !== onInstall) {
		t7 = needsDependencySetup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "w-fit uppercase",
			disabled: installing,
			onClick: onInstall,
			size: "sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-2",
				children: [installing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : null, installing ? "Installing provider dependencies" : "Install provider dependencies"]
			})
		}) : null;
		$[8] = installing;
		$[9] = needsDependencySetup;
		$[10] = onInstall;
		$[11] = t7;
	} else t7 = $[11];
	let t8;
	if ($[12] !== installing) {
		t8 = installing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Running provider setup. This may take a minute…"]
		}) : null;
		$[12] = installing;
		$[13] = t8;
	} else t8 = $[13];
	let t9;
	if ($[14] !== results) {
		t9 = results ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryProviderSetupResults, { results }) : null;
		$[14] = results;
		$[15] = t9;
	} else t9 = $[15];
	let t10;
	if ($[16] !== needsDependencySetup || $[17] !== setup.external_dependencies || $[18] !== setup.pip_dependencies) {
		t10 = needsDependencySetup ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [setup.external_dependencies.map(_temp2), setup.pip_dependencies.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Python dependencies"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: setup.pip_dependencies.map(_temp3)
			})]
		}) : null] }) : null;
		$[16] = needsDependencySetup;
		$[17] = setup.external_dependencies;
		$[18] = setup.pip_dependencies;
		$[19] = t10;
	} else t10 = $[19];
	let t11;
	if ($[20] !== needsDependencySetup || $[21] !== setup.required_env) {
		t11 = setup.required_env.length && needsDependencySetup ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Required environment values. Fill the matching fields below, or set them in the Hermes environment."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: setup.required_env.map(_temp4)
			})]
		}) : null;
		$[20] = needsDependencySetup;
		$[21] = setup.required_env;
		$[22] = t11;
	} else t11 = $[22];
	let t12;
	if ($[23] !== t10 || $[24] !== t11 || $[25] !== t3 || $[26] !== t6 || $[27] !== t7 || $[28] !== t8 || $[29] !== t9) {
		t12 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t3,
			children: [
				t6,
				t7,
				t8,
				t9,
				t10,
				t11
			]
		});
		$[23] = t10;
		$[24] = t11;
		$[25] = t3;
		$[26] = t6;
		$[27] = t7;
		$[28] = t8;
		$[29] = t9;
		$[30] = t12;
	} else t12 = $[30];
	return t12;
}
function _temp4(envKey) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
		className: "border border-border bg-background/40 px-2 py-1 font-mono text-[0.6875rem]",
		children: envKey
	}, envKey);
}
function _temp3(dep_0) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
		className: "border border-border bg-background/40 px-2 py-1 font-mono text-[0.6875rem]",
		children: dep_0
	}, dep_0);
}
function _temp2(dep, index) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground",
				children: ["External dependency", dep.name ? `: ${dep.name}` : ""]
			}),
			dep.install ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupCommandBlock, {
				label: dep.name ? `Install ${dep.name}` : "Install dependency",
				code: dep.install
			}) : null,
			dep.check ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupCommandBlock, {
				label: dep.name ? `Verify ${dep.name}` : "Verify dependency",
				code: dep.check
			}) : null
		]
	}, `${dep.name || "dependency"}-${index}`);
}
function PluginsPage() {
	const [hub, setHub] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [catalog, setCatalog] = (0, import_react.useState)(null);
	const [catalogLoading, setCatalogLoading] = (0, import_react.useState)(true);
	const [catalogSearch, setCatalogSearch] = (0, import_react.useState)("");
	const [catalogConfirm, setCatalogConfirm] = (0, import_react.useState)(null);
	const [catalogBusy, setCatalogBusy] = (0, import_react.useState)(null);
	const [installId, setInstallId] = (0, import_react.useState)("");
	const [installForce, setInstallForce] = (0, import_react.useState)(false);
	const [installEnable, setInstallEnable] = (0, import_react.useState)(true);
	const [installBusy, setInstallBusy] = (0, import_react.useState)(false);
	const [rescanBusy, setRescanBusy] = (0, import_react.useState)(false);
	const [memorySel, setMemorySel] = (0, import_react.useState)(MEMORY_PROVIDER_BUILTIN);
	const [memoryConfig, setMemoryConfig] = (0, import_react.useState)(null);
	const [memoryValues, setMemoryValues] = (0, import_react.useState)({});
	const [memoryConfigBusy, setMemoryConfigBusy] = (0, import_react.useState)(false);
	const [secretVisible, setSecretVisible] = (0, import_react.useState)({});
	const [contextSel, setContextSel] = (0, import_react.useState)("compressor");
	const [memoryBusy, setMemoryBusy] = (0, import_react.useState)(false);
	const [memorySetupBusy, setMemorySetupBusy] = (0, import_react.useState)(false);
	const [memorySetupResults, setMemorySetupResults] = (0, import_react.useState)(null);
	const [contextBusy, setContextBusy] = (0, import_react.useState)(false);
	const [rowBusy, setRowBusy] = (0, import_react.useState)(null);
	const { toast, showToast } = useToast();
	const { t } = useI18n();
	const { setAfterTitle } = usePageHeader();
	const loadHub = (0, import_react.useCallback)((memorySelection) => {
		return api.getPluginsHub().then((h) => {
			setHub(h);
			const p = h.providers;
			setMemorySel(memorySelection ?? (p.memory_provider ? p.memory_provider : MEMORY_PROVIDER_BUILTIN));
			setContextSel(p.context_engine || "compressor");
		}).catch(() => showToast(t.common.loading, "error"));
	}, [showToast, t.common.loading]);
	const loadCatalog = (0, import_react.useCallback)(() => {
		return api.getPluginsCatalog().then(setCatalog).catch(() => setCatalog(null));
	}, []);
	(0, import_react.useEffect)(() => {
		loadHub().finally(() => setLoading(false));
		loadCatalog().finally(() => setCatalogLoading(false));
	}, [loadHub, loadCatalog]);
	(0, import_react.useEffect)(() => {
		const provider = memorySel === MEMORY_PROVIDER_BUILTIN ? "" : memorySel;
		let cancelled = false;
		Promise.resolve().then(() => {
			if (cancelled) return;
			setSecretVisible({});
			setMemorySetupResults(null);
			if (!provider) {
				setMemoryConfig(null);
				setMemoryValues({});
				setMemoryConfigBusy(false);
				return;
			}
			setMemoryConfigBusy(true);
			api.getMemoryProviderConfig(provider).then((config) => {
				if (cancelled) return;
				setMemoryConfig(config);
				setMemoryValues(Object.fromEntries(config.fields.map((field) => [field.key, fieldInitialValue(field)])));
			}).catch((e) => {
				if (!cancelled) {
					setMemoryConfig(null);
					setMemoryValues({});
					showToast(e instanceof Error ? e.message : "Failed to load provider config", "error");
				}
			}).finally(() => {
				if (!cancelled) setMemoryConfigBusy(false);
			});
		});
		return () => {
			cancelled = true;
		};
	}, [memorySel, showToast]);
	const onInstall = async () => {
		const id = installId.trim();
		if (!id) {
			showToast(t.pluginsPage.installHint, "error");
			return;
		}
		setInstallBusy(true);
		try {
			const r = await api.installAgentPlugin({
				identifier: id,
				force: installForce,
				enable: installEnable
			});
			showToast(`${r.plugin_name ?? id} installed`, "success");
			if ((r.warnings?.length ?? 0) > 0) showToast(r.warnings.join(" "), "error");
			if ((r.missing_env?.length ?? 0) > 0) showToast(`${t.pluginsPage.missingEnvWarn} ${r.missing_env.join(", ")}`, "error");
			setInstallId("");
			await loadHub();
		} catch (e_0) {
			showToast(e_0 instanceof Error ? e_0.message : "Install failed", "error");
		} finally {
			setInstallBusy(false);
		}
	};
	const onCatalogInstall = async (entry) => {
		setCatalogConfirm(null);
		setCatalogBusy(entry.name);
		try {
			const r_0 = await api.installAgentPlugin({
				identifier: "",
				catalog_name: entry.name,
				force: entry.installed,
				enable: false
			});
			showToast(`${r_0.plugin_name ?? entry.name} installed`, "success");
			if ((r_0.missing_env?.length ?? 0) > 0) showToast(`${t.pluginsPage.missingEnvWarn} ${r_0.missing_env.join(", ")}`, "error");
			await Promise.all([loadHub(), loadCatalog()]);
		} catch (e_1) {
			showToast(e_1 instanceof Error ? e_1.message : "Install failed", "error");
		} finally {
			setCatalogBusy(null);
		}
	};
	const onRescan = (0, import_react.useCallback)(async () => {
		setRescanBusy(true);
		try {
			const rc = await api.rescanPlugins();
			showToast(`${t.pluginsPage.refreshDashboard} (${rc.count})`, "success");
			await loadHub();
		} catch (e_2) {
			showToast(e_2 instanceof Error ? e_2.message : "Rescan failed", "error");
		} finally {
			setRescanBusy(false);
		}
	}, [
		loadHub,
		showToast,
		t.pluginsPage.refreshDashboard
	]);
	(0, import_react.useLayoutEffect)(() => {
		setAfterTitle(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			size: "icon",
			className: "shrink-0 text-muted-foreground hover:text-foreground",
			disabled: loading || rescanBusy,
			onClick: () => void onRescan(),
			"aria-label": t.pluginsPage.refreshDashboard,
			children: rescanBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {})
		}));
		return () => setAfterTitle(null);
	}, [
		loading,
		onRescan,
		rescanBusy,
		setAfterTitle,
		t.pluginsPage.refreshDashboard
	]);
	const onSaveMemoryProvider = async () => {
		const provider_0 = memorySel === MEMORY_PROVIDER_BUILTIN ? "" : memorySel;
		setMemoryBusy(true);
		try {
			if (!provider_0) await api.setMemoryProvider("");
			else {
				const visibleValues = Object.fromEntries(Object.entries(memoryValues).filter(([key]) => {
					const field_0 = memoryConfig?.fields.find((candidate) => candidate.key === key);
					return field_0 ? fieldIsVisible(field_0, memoryValues) : true;
				}));
				await api.updateMemoryProviderConfig(provider_0, visibleValues);
			}
			showToast(t.pluginsPage.savedProviders, "success");
			await loadHub();
		} catch (e_3) {
			showToast(e_3 instanceof Error ? e_3.message : "Save failed", "error");
		} finally {
			setMemoryBusy(false);
		}
	};
	const currentVisibleMemoryValues = () => Object.fromEntries(Object.entries(memoryValues).filter(([key_0]) => {
		const field_1 = memoryConfig?.fields.find((candidate_0) => candidate_0.key === key_0);
		return field_1 ? fieldIsVisible(field_1, memoryValues) : true;
	}));
	const onSetupMemoryProvider = async () => {
		const provider_1 = memorySel === MEMORY_PROVIDER_BUILTIN ? "" : memorySel;
		if (!provider_1) return;
		setMemorySetupBusy(true);
		setMemorySetupResults(null);
		try {
			const result = await api.setupMemoryProvider(provider_1, currentVisibleMemoryValues());
			setMemorySetupResults(result.results);
			const failed = result.results.filter((row) => row.status === "failed");
			if (failed.length) {
				const names = Array.from(new Set(failed.map((row_0) => row_0.name))).join(", ");
				showToast(`Provider setup failed: ${names || provider_1}. See setup results below.`, "error");
			} else showToast("Provider setup finished", "success");
			await loadHub(provider_1);
		} catch (e_4) {
			showToast(e_4 instanceof Error ? e_4.message : "Provider setup failed", "error");
		} finally {
			setMemorySetupBusy(false);
		}
	};
	const onSaveContextEngine = async () => {
		setContextBusy(true);
		try {
			await api.savePluginProviders({ context_engine: contextSel });
			showToast(t.pluginsPage.savedProviders, "success");
			await loadHub();
		} catch (e_5) {
			showToast(e_5 instanceof Error ? e_5.message : "Save failed", "error");
		} finally {
			setContextBusy(false);
		}
	};
	const setRuntimeLoading = async (name, fn) => {
		setRowBusy(name);
		try {
			await fn();
			await loadHub();
		} catch (e_6) {
			showToast(e_6 instanceof Error ? e_6.message : "Failed", "error");
		} finally {
			setRowBusy(null);
		}
	};
	const rows = hub?.plugins ?? [];
	const providers = hub?.providers;
	const catalogEntries = (0, import_react.useMemo)(() => {
		const entries = catalog?.entries ?? [];
		const q = catalogSearch.trim().toLowerCase();
		if (!q) return entries;
		return entries.filter((entry_0) => [
			entry_0.name,
			entry_0.description,
			entry_0.maintainer,
			...entry_0.capabilities.provides_tools
		].some((haystack) => haystack.toLowerCase().includes(q)));
	}, [catalog, catalogSearch]);
	const removedByName = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const r_1 of catalog?.removed ?? []) map.set(r_1.name, r_1);
		return map;
	}, [catalog]);
	const selectedMemoryName = memorySel === MEMORY_PROVIDER_BUILTIN ? "" : memorySel;
	const selectedMemoryInfo = selectedMemoryName ? providers?.memory_options.find((provider_2) => provider_2.name === selectedMemoryName) : null;
	const activeMemoryInfo = providers?.memory_provider ? providers.memory_options.find((provider_3) => provider_3.name === providers.memory_provider) : null;
	const visibleMemoryFields = memoryConfig?.fields.filter((field_2) => fieldIsVisible(field_2, memoryValues)) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "plugins:top" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex w-full flex-col gap-8"),
				children: [
					providers && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t.pluginsPage.providersHeading }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.08em] text-text-tertiary",
						children: "Configure memory providers and runtime context engine selection."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "flex flex-col gap-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "mem-provider",
													children: t.pluginsPage.memoryProviderLabel
												}),
												selectedMemoryName && selectedMemoryInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: MEMORY_STATUS_TONE[selectedMemoryInfo.status],
													children: MEMORY_STATUS_LABEL[selectedMemoryInfo.status]
												}),
												selectedMemoryName && selectedMemoryName === providers.memory_provider && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: "outline",
													children: "active"
												}),
												!selectedMemoryName && !providers.memory_provider && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													tone: "success",
													children: "active"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											id: "mem-provider",
											className: "w-full",
											value: memorySel,
											onValueChange: setMemorySel,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
												value: MEMORY_PROVIDER_BUILTIN,
												children: `(${t.pluginsPage.providerDefaults})`
											}), providers.memory_options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
												value: o.name,
												children: o.name
											}, o.name))]
										})]
									}),
									!selectedMemoryName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Hermes will use the built-in MEMORY.md and USER.md files."
									}),
									activeMemoryInfo?.status === "missing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "border border-destructive/50 px-3 py-2 text-xs text-destructive",
										children: [
											"Active provider ",
											providers.memory_provider,
											" is no longer installed. Select another provider and save."
										]
									}),
									selectedMemoryName && selectedMemoryInfo?.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: selectedMemoryInfo.description
									}),
									selectedMemoryName && selectedMemoryInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryProviderSetupHint, {
										installing: memorySetupBusy,
										onInstall: () => void onSetupMemoryProvider(),
										provider: selectedMemoryInfo,
										results: memorySetupResults
									}),
									selectedMemoryName && selectedMemoryInfo?.status === "needs_config" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "border border-warning/50 px-3 py-2 text-xs text-warning",
										children: "Provider dependencies are installed. Add the required credentials or self-hosted URL below, then save the provider."
									}),
									selectedMemoryName && memoryConfigBusy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), " Loading provider settings…"]
									}),
									selectedMemoryName && !memoryConfigBusy && visibleMemoryFields.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "This provider does not expose dashboard settings."
									}),
									selectedMemoryName && !memoryConfigBusy && visibleMemoryFields.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-4 border border-border p-4",
										children: visibleMemoryFields.map((field_3) => {
											const value = memoryValues[field_3.key];
											const secretIsVisible = !!secretVisible[field_3.key];
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-2 min-w-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-wrap items-center gap-2",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
																htmlFor: `memory-${field_3.key}`,
																children: field_3.label
															}),
															field_3.required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
																tone: "outline",
																children: "required"
															}),
															field_3.kind === "secret" && field_3.is_set && !value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
																tone: "success",
																children: "set"
															}),
															field_3.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
																href: field_3.url,
																target: "_blank",
																rel: "noreferrer",
																className: "inline-flex items-center gap-1 text-xs underline",
																children: ["Open ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })]
															})
														]
													}),
													field_3.kind === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
														id: `memory-${field_3.key}`,
														className: "w-full",
														value: String(value ?? ""),
														onValueChange: (next) => setMemoryValues((current) => ({
															...current,
															[field_3.key]: next
														})),
														children: field_3.options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
															value: option.value,
															children: option.label
														}, option.value))
													}) : field_3.kind === "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
														checked: Boolean(value),
														onCheckedChange: (next_0) => setMemoryValues((current_0) => ({
															...current_0,
															[field_3.key]: next_0
														}))
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: `memory-${field_3.key}`,
															type: field_3.kind === "secret" && !secretIsVisible ? "password" : field_3.kind === "integer" || field_3.kind === "number" ? "number" : "text",
															min: field_3.minimum ?? void 0,
															max: field_3.maximum ?? void 0,
															step: field_3.step ?? (field_3.kind === "integer" ? 1 : void 0),
															value: String(value ?? ""),
															placeholder: field_3.kind === "secret" && field_3.is_set ? "Leave blank to keep existing value" : field_3.placeholder,
															onChange: (event) => setMemoryValues((current_1) => ({
																...current_1,
																[field_3.key]: event.target.value
															}))
														}), field_3.kind === "secret" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															ghost: true,
															size: "icon",
															"aria-label": secretIsVisible ? "Hide secret" : "Show secret",
															onClick: () => setSecretVisible((current_2) => ({
																...current_2,
																[field_3.key]: !current_2[field_3.key]
															})),
															children: secretIsVisible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" })
														})]
													}),
													field_3.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground",
														children: field_3.description
													})
												]
											}, field_3.key);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-fit uppercase",
										size: "sm",
										disabled: memoryBusy || memoryConfigBusy || memorySetupBusy,
										onClick: () => void onSaveMemoryProvider(),
										prefix: memoryBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
										children: "Save memory provider"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid content-start gap-3 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "ctx-engine",
										children: t.pluginsPage.contextEngineLabel
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										id: "ctx-engine",
										className: "w-full",
										value: contextSel,
										onValueChange: setContextSel,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
											value: "compressor",
											children: "compressor"
										}), providers.context_options.filter((o_0) => o_0.name !== "compressor").map((o_1) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
											value: o_1.name,
											children: o_1.name
										}, o_1.name))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-fit uppercase",
										size: "sm",
										disabled: contextBusy,
										onClick: () => void onSaveContextEngine(),
										prefix: contextBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
										children: "Save context engine"
									})
								]
							})]
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: t.pluginsPage.installHeading }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.08em] text-text-tertiary",
						children: t.pluginsPage.installHint
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "install-url",
									children: t.pluginsPage.identifierLabel
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "font-mono-ui lowercase",
									id: "install-url",
									placeholder: "owner/repo, owner/repo/subdir, or https://...",
									spellCheck: false,
									value: installId,
									onChange: (e_7) => setInstallId(e_7.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: installForce,
										onCheckedChange: setInstallForce
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs tracking-[0.06em] text-text-secondary",
										children: t.pluginsPage.forceReinstall
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: installEnable,
										onCheckedChange: setInstallEnable
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs tracking-[0.06em] text-text-secondary",
										children: t.pluginsPage.enableAfterInstall
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-fit uppercase",
								size: "sm",
								disabled: installBusy,
								onClick: () => void onInstall(),
								prefix: installBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
								children: t.pluginsPage.installBtn
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.06em] text-text-tertiary",
								children: t.pluginsPage.rescanHint
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.06em] text-text-tertiary",
								children: t.pluginsPage.removeHint
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						"data-testid": "plugin-catalog-section",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-mondwest text-display text-xs tracking-[0.12em] text-text-secondary",
								children: t.pluginsPage.catalogHeading ?? "Plugin catalog"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.06em] text-text-tertiary",
								children: t.pluginsPage.catalogHint ?? "Curated, Nous-reviewed plugins pinned to exact commits."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "max-w-md",
								placeholder: t.pluginsPage.catalogSearchPlaceholder ?? "Search catalog...",
								value: catalogSearch,
								onChange: (e_8) => setCatalogSearch(e_8.target.value),
								"aria-label": t.pluginsPage.catalogSearchPlaceholder ?? "Search catalog..."
							}),
							catalogLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 py-4 text-xs text-text-tertiary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.common.loading })]
							}) : catalogEntries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-text-tertiary",
								children: [
									t.pluginsPage.catalogEmpty ?? "No catalog entries match.",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "underline",
										href: "https://hermes-agent.nousresearch.com/docs/plugins",
										target: "_blank",
										rel: "noreferrer",
										children: t.pluginsPage.catalogEmptyDocsLink ?? "Learn about Hermes plugins"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "flex flex-col gap-3",
								children: catalogEntries.map((entry_1) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogEntryCard, {
									busy: catalogBusy === entry_1.name,
									entry: entry_1,
									onInstall: () => setCatalogConfirm(entry_1),
									removed: removedByName.get(entry_1.name) ?? null,
									t
								}) }, entry_1.name))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-mondwest text-display text-xs tracking-[0.12em] text-text-secondary",
							children: t.pluginsPage.pluginListHeading
						}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 py-8 text-xs text-text-tertiary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.common.loading })]
						}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-text-tertiary",
							children: t.common.noResults
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-3",
							children: rows.map((row_1) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginRowCard, {
								row: row_1,
								rowBusy,
								setRuntimeLoading,
								showToast,
								t
							}) }, row_1.name))
						})]
					}),
					(hub?.orphan_dashboard_plugins?.length ?? 0) > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 opacity-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-mondwest text-display text-xs tracking-[0.12em] text-text-secondary",
							children: t.pluginsPage.orphanHeading
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-2 rounded border border-current/15 p-4",
							children: hub.orphan_dashboard_plugins.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "text-xs text-text-secondary",
								children: [
									m.label ?? m.name,
									" — ",
									m.description || m.tab?.path,
									!m.tab?.hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										className: "ml-3 inline-flex items-center gap-1 underline",
										to: m.tab.path,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3 opacity-65" }), t.pluginsPage.openTab]
									}) : null
								]
							}, m.name))
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "plugins:bottom" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: catalogConfirm !== null,
				onCancel: () => setCatalogConfirm(null),
				onConfirm: () => {
					if (catalogConfirm) onCatalogInstall(catalogConfirm);
				},
				title: t.pluginsPage.catalogConfirmTitle ?? "Install this plugin?",
				description: catalogConfirm ? [
					catalogConfirm.capability_summary,
					catalogConfirm.capabilities.requires_env.length ? `${t.pluginsPage.catalogRequiresEnv ?? "Requires env"}: ${catalogConfirm.capabilities.requires_env.join(", ")}` : "",
					t.pluginsPage.catalogConfirmInstallNote ?? "Plugins install disabled; enable it after install to activate."
				].filter(Boolean).join("\n\n") : "",
				confirmLabel: t.pluginsPage.catalogInstallBtn ?? "Install"
			})
		]
	});
}
function PluginRowCard(props) {
	const $ = (0, import_compiler_runtime.c)(102);
	const { row, rowBusy, setRuntimeLoading, showToast, t } = props;
	const dm = row.dashboard_manifest;
	const tabPath = dm?.tab && !dm.tab.hidden ? dm.tab.override ?? dm.tab.path : null;
	const busy = rowBusy === row.name;
	const [confirmRemove, setConfirmRemove] = (0, import_react.useState)(false);
	const badgeTone = row.runtime_status === "enabled" ? "success" : row.runtime_status === "disabled" ? "destructive" : "outline";
	const t0 = busy ? "opacity-70" : void 0;
	let t1;
	if ($[0] !== t0) {
		t1 = cn(t0);
		$[0] = t0;
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	if ($[2] !== row.name) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate font-semibold",
			children: row.name
		});
		$[2] = row.name;
		$[3] = t2;
	} else t2 = $[3];
	let t3;
	if ($[4] !== row.source || $[5] !== t.pluginsPage.sourceBadge) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			tone: "outline",
			children: [
				t.pluginsPage.sourceBadge,
				": ",
				row.source
			]
		});
		$[4] = row.source;
		$[5] = t.pluginsPage.sourceBadge;
		$[6] = t3;
	} else t3 = $[6];
	const t4 = row.version || "—";
	let t5;
	if ($[7] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			tone: "outline",
			children: ["v", t4]
		});
		$[7] = t4;
		$[8] = t5;
	} else t5 = $[8];
	let t6;
	if ($[9] !== badgeTone || $[10] !== row.runtime_status) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: badgeTone,
			children: row.runtime_status
		});
		$[9] = badgeTone;
		$[10] = row.runtime_status;
		$[11] = t6;
	} else t6 = $[11];
	let t7;
	if ($[12] !== row.auth_required || $[13] !== t.pluginsPage.authRequired) {
		t7 = row.auth_required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: "destructive",
			children: t.pluginsPage.authRequired
		}) : null;
		$[12] = row.auth_required;
		$[13] = t.pluginsPage.authRequired;
		$[14] = t7;
	} else t7 = $[14];
	let t8;
	if ($[15] !== row.removed_reason || $[16] !== t.pluginsPage.catalogRemovedBadge) {
		t8 = row.removed_reason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: "destructive",
			children: t.pluginsPage.catalogRemovedBadge ?? "Removed"
		}) : null;
		$[15] = row.removed_reason;
		$[16] = t.pluginsPage.catalogRemovedBadge;
		$[17] = t8;
	} else t8 = $[17];
	let t9;
	if ($[18] !== t2 || $[19] !== t3 || $[20] !== t5 || $[21] !== t6 || $[22] !== t7 || $[23] !== t8) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-wrap items-center gap-3",
			children: [
				t2,
				t3,
				t5,
				t6,
				t7,
				t8
			]
		});
		$[18] = t2;
		$[19] = t3;
		$[20] = t5;
		$[21] = t6;
		$[22] = t7;
		$[23] = t8;
		$[24] = t9;
	} else t9 = $[24];
	let t10;
	if ($[25] !== busy || $[26] !== row.name || $[27] !== row.runtime_status || $[28] !== setRuntimeLoading || $[29] !== showToast || $[30] !== t.pluginsPage.disableRuntime || $[31] !== t.pluginsPage.enableRuntime || $[32] !== t.pluginsPage.toggleTakesEffectAfterRestart) {
		t10 = row.runtime_status === "enabled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			disabled: busy,
			ghost: true,
			size: "sm",
			onClick: () => {
				setRuntimeLoading(row.name, async () => {
					const res = await api.disableAgentPlugin(row.name);
					showToast(res.restart_required ? t.pluginsPage.toggleTakesEffectAfterRestart : t.pluginsPage.disableRuntime, "success");
				});
			},
			children: t.pluginsPage.disableRuntime
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			disabled: busy,
			ghost: true,
			size: "sm",
			onClick: () => {
				setRuntimeLoading(row.name, async () => {
					const res_0 = await api.enableAgentPlugin(row.name);
					showToast(res_0.restart_required ? t.pluginsPage.toggleTakesEffectAfterRestart : t.pluginsPage.enableRuntime, "success");
				});
			},
			children: t.pluginsPage.enableRuntime
		});
		$[25] = busy;
		$[26] = row.name;
		$[27] = row.runtime_status;
		$[28] = setRuntimeLoading;
		$[29] = showToast;
		$[30] = t.pluginsPage.disableRuntime;
		$[31] = t.pluginsPage.enableRuntime;
		$[32] = t.pluginsPage.toggleTakesEffectAfterRestart;
		$[33] = t10;
	} else t10 = $[33];
	let t11;
	if ($[34] !== t.pluginsPage.openTab || $[35] !== tabPath) {
		t11 = tabPath ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			className: cn("inline-flex items-center rounded-none px-3 py-1.5", "border border-current/25 hover:bg-current/10", "font-mondwest text-display text-xs tracking-[0.1em]"),
			to: tabPath,
			children: t.pluginsPage.openTab
		}) : null;
		$[34] = t.pluginsPage.openTab;
		$[35] = tabPath;
		$[36] = t11;
	} else t11 = $[36];
	let t12;
	if ($[37] !== busy || $[38] !== row.can_update_git || $[39] !== row.name || $[40] !== setRuntimeLoading || $[41] !== showToast || $[42] !== t.pluginsPage) {
		t12 = row.can_update_git ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			disabled: busy,
			ghost: true,
			size: "sm",
			onClick: () => {
				setRuntimeLoading(row.name, async () => {
					const pp = t.pluginsPage;
					if (await runDashboardPluginUpdate(row.name, {
						consentBody: pp.updateConsentBody ?? en.pluginsPage.updateConsentBody,
						scanBody: pp.updateScanBody ?? en.pluginsPage.updateScanBody,
						scanBlocked: pp.updateScanBlocked ?? en.pluginsPage.updateScanBlocked
					})) showToast(pp.updateGit, "success");
				});
			},
			children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : null, t.pluginsPage.updateGit]
		}) : null;
		$[37] = busy;
		$[38] = row.can_update_git;
		$[39] = row.name;
		$[40] = setRuntimeLoading;
		$[41] = showToast;
		$[42] = t.pluginsPage;
		$[43] = t12;
	} else t12 = $[43];
	let t13;
	if ($[44] !== busy || $[45] !== row.has_dashboard_manifest || $[46] !== row.name || $[47] !== row.user_hidden || $[48] !== setRuntimeLoading || $[49] !== t.pluginsPage.hideFromSidebar || $[50] !== t.pluginsPage.showInSidebar) {
		t13 = row.has_dashboard_manifest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			disabled: busy,
			ghost: true,
			size: "sm",
			title: row.user_hidden ? t.pluginsPage.showInSidebar : t.pluginsPage.hideFromSidebar,
			onClick: () => {
				setRuntimeLoading(row.name, async () => {
					await api.setPluginVisibility(row.name, !row.user_hidden);
				});
			},
			children: [row.user_hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), row.user_hidden ? t.pluginsPage.showInSidebar : t.pluginsPage.hideFromSidebar]
		}) : null;
		$[44] = busy;
		$[45] = row.has_dashboard_manifest;
		$[46] = row.name;
		$[47] = row.user_hidden;
		$[48] = setRuntimeLoading;
		$[49] = t.pluginsPage.hideFromSidebar;
		$[50] = t.pluginsPage.showInSidebar;
		$[51] = t13;
	} else t13 = $[51];
	let t14;
	if ($[52] !== busy || $[53] !== row.can_remove) {
		t14 = row.can_remove ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			destructive: true,
			disabled: busy,
			ghost: true,
			size: "sm",
			onClick: () => setConfirmRemove(true),
			children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
		}) : null;
		$[52] = busy;
		$[53] = row.can_remove;
		$[54] = t14;
	} else t14 = $[54];
	let t15;
	if ($[55] !== t10 || $[56] !== t11 || $[57] !== t12 || $[58] !== t13 || $[59] !== t14) {
		t15 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2 shrink-0",
			children: [
				t10,
				t11,
				t12,
				t13,
				t14
			]
		});
		$[55] = t10;
		$[56] = t11;
		$[57] = t12;
		$[58] = t13;
		$[59] = t14;
		$[60] = t15;
	} else t15 = $[60];
	let t16;
	if ($[61] !== t15 || $[62] !== t9) {
		t16 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-4",
			children: [t9, t15]
		});
		$[61] = t15;
		$[62] = t9;
		$[63] = t16;
	} else t16 = $[63];
	let t17;
	if ($[64] !== row.description) {
		t17 = row.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "min-w-0 w-full text-xs tracking-[0.06em] text-text-secondary break-words",
			children: row.description
		}) : null;
		$[64] = row.description;
		$[65] = t17;
	} else t17 = $[65];
	let t18;
	if ($[66] !== row.removed_reason || $[67] !== t.pluginsPage.removedFromCatalog) {
		t18 = row.removed_reason ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "border border-destructive/50 px-3 py-2 text-xs text-destructive",
			children: [
				t.pluginsPage.removedFromCatalog ?? "Removed from catalog",
				": ",
				row.removed_reason
			]
		}) : null;
		$[66] = row.removed_reason;
		$[67] = t.pluginsPage.removedFromCatalog;
		$[68] = t18;
	} else t18 = $[68];
	let t19;
	if ($[69] !== dm || $[70] !== t.pluginsPage.dashboardSlots) {
		t19 = dm?.slots?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs tracking-[0.05em] text-text-tertiary",
			children: [
				t.pluginsPage.dashboardSlots,
				": ",
				dm.slots.join(", ")
			]
		}) : null;
		$[69] = dm;
		$[70] = t.pluginsPage.dashboardSlots;
		$[71] = t19;
	} else t19 = $[71];
	let t20;
	if ($[72] !== row.auth_command || $[73] !== row.auth_required || $[74] !== t.pluginsPage.authRequiredHint) {
		t20 = row.auth_required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandBlock, {
			label: t.pluginsPage.authRequiredHint,
			code: row.auth_command
		}) : null;
		$[72] = row.auth_command;
		$[73] = row.auth_required;
		$[74] = t.pluginsPage.authRequiredHint;
		$[75] = t20;
	} else t20 = $[75];
	let t21;
	if ($[76] !== dm || $[77] !== row.has_dashboard_manifest || $[78] !== t.pluginsPage.noDashboardTab) {
		t21 = !row.has_dashboard_manifest && !dm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs italic text-text-disabled",
			children: t.pluginsPage.noDashboardTab
		}) : null;
		$[76] = dm;
		$[77] = row.has_dashboard_manifest;
		$[78] = t.pluginsPage.noDashboardTab;
		$[79] = t21;
	} else t21 = $[79];
	let t22;
	if ($[80] !== t16 || $[81] !== t17 || $[82] !== t18 || $[83] !== t19 || $[84] !== t20 || $[85] !== t21) {
		t22 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col gap-4 px-6 py-4",
			children: [
				t16,
				t17,
				t18,
				t19,
				t20,
				t21
			]
		});
		$[80] = t16;
		$[81] = t17;
		$[82] = t18;
		$[83] = t19;
		$[84] = t20;
		$[85] = t21;
		$[86] = t22;
	} else t22 = $[86];
	let t23;
	if ($[87] === Symbol.for("react.memo_cache_sentinel")) {
		t23 = () => setConfirmRemove(false);
		$[87] = t23;
	} else t23 = $[87];
	let t24;
	if ($[88] !== row.name || $[89] !== setRuntimeLoading || $[90] !== showToast) {
		t24 = () => {
			setConfirmRemove(false);
			setRuntimeLoading(row.name, async () => {
				await api.removeAgentPlugin(row.name);
				showToast(`${row.name} removed`, "success");
			});
		};
		$[88] = row.name;
		$[89] = setRuntimeLoading;
		$[90] = showToast;
		$[91] = t24;
	} else t24 = $[91];
	const t25 = `This will remove the "${row.name}" plugin from your agent.`;
	let t26;
	if ($[92] !== confirmRemove || $[93] !== t.common.delete || $[94] !== t.pluginsPage.removeConfirm || $[95] !== t24 || $[96] !== t25) {
		t26 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: confirmRemove,
			onCancel: t23,
			onConfirm: t24,
			title: t.pluginsPage.removeConfirm,
			description: t25,
			destructive: true,
			confirmLabel: t.common.delete
		});
		$[92] = confirmRemove;
		$[93] = t.common.delete;
		$[94] = t.pluginsPage.removeConfirm;
		$[95] = t24;
		$[96] = t25;
		$[97] = t26;
	} else t26 = $[97];
	let t27;
	if ($[98] !== t1 || $[99] !== t22 || $[100] !== t26) {
		t27 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: t1,
			children: [t22, t26]
		});
		$[98] = t1;
		$[99] = t22;
		$[100] = t26;
		$[101] = t27;
	} else t27 = $[101];
	return t27;
}
function CatalogEntryCard(props) {
	const $ = (0, import_compiler_runtime.c)(75);
	const { busy, entry, onInstall, removed, t } = props;
	const caps = entry.capabilities;
	let chips;
	if ($[0] !== caps.provides_hooks.length || $[1] !== caps.provides_middleware.length || $[2] !== caps.provides_tools.length || $[3] !== caps.requires_env) {
		chips = [];
		if (caps.provides_tools.length) chips.push(`${caps.provides_tools.length} tools`);
		if (caps.provides_hooks.length) chips.push(`${caps.provides_hooks.length} hooks`);
		if (caps.provides_middleware.length) chips.push(`${caps.provides_middleware.length} middleware`);
		if (caps.requires_env.length) {
			let t0;
			if ($[5] !== caps.requires_env) {
				t0 = caps.requires_env.join(", ");
				$[5] = caps.requires_env;
				$[6] = t0;
			} else t0 = $[6];
			chips.push(`env: ${t0}`);
		}
		$[0] = caps.provides_hooks.length;
		$[1] = caps.provides_middleware.length;
		$[2] = caps.provides_tools.length;
		$[3] = caps.requires_env;
		$[4] = chips;
	} else chips = $[4];
	const isRemoved = removed !== null;
	const t0 = busy ? "opacity-70" : void 0;
	let t1;
	if ($[7] !== t0) {
		t1 = cn(t0);
		$[7] = t0;
		$[8] = t1;
	} else t1 = $[8];
	let t2;
	if ($[9] !== entry.name) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate font-semibold",
			children: entry.name
		});
		$[9] = entry.name;
		$[10] = t2;
	} else t2 = $[10];
	const t3 = entry.tier === "community" ? "secondary" : "success";
	let t4;
	if ($[11] !== entry.tier || $[12] !== t3) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: t3,
			children: entry.tier
		});
		$[11] = entry.tier;
		$[12] = t3;
		$[13] = t4;
	} else t4 = $[13];
	let t5;
	if ($[14] !== entry.installed || $[15] !== entry.runtime_status) {
		t5 = entry.installed && entry.runtime_status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: "outline",
			children: entry.runtime_status
		}) : null;
		$[14] = entry.installed;
		$[15] = entry.runtime_status;
		$[16] = t5;
	} else t5 = $[16];
	let t6;
	if ($[17] !== isRemoved || $[18] !== t) {
		t6 = isRemoved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: "destructive",
			children: t.pluginsPage.catalogRemovedBadge ?? "Removed"
		}) : null;
		$[17] = isRemoved;
		$[18] = t;
		$[19] = t6;
	} else t6 = $[19];
	let t7;
	if ($[20] !== t2 || $[21] !== t4 || $[22] !== t5 || $[23] !== t6) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-wrap items-center gap-3",
			children: [
				t2,
				t4,
				t5,
				t6
			]
		});
		$[20] = t2;
		$[21] = t4;
		$[22] = t5;
		$[23] = t6;
		$[24] = t7;
	} else t7 = $[24];
	let t8;
	if ($[25] !== busy || $[26] !== entry.installed || $[27] !== entry.update_available || $[28] !== isRemoved || $[29] !== onInstall || $[30] !== t) {
		t8 = isRemoved ? null : entry.installed && !entry.update_available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: "success",
			children: t.pluginsPage.catalogInstalledBadge ?? "Installed ✓"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			disabled: busy,
			ghost: true,
			size: "sm",
			onClick: onInstall,
			children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : null, entry.update_available ? t.pluginsPage.catalogUpdateBtn ?? "Update available" : t.pluginsPage.catalogInstallBtn ?? "Install"]
		});
		$[25] = busy;
		$[26] = entry.installed;
		$[27] = entry.update_available;
		$[28] = isRemoved;
		$[29] = onInstall;
		$[30] = t;
		$[31] = t8;
	} else t8 = $[31];
	let t9;
	if ($[32] !== t8) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center gap-2 shrink-0",
			children: t8
		});
		$[32] = t8;
		$[33] = t9;
	} else t9 = $[33];
	let t10;
	if ($[34] !== t7 || $[35] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-4",
			children: [t7, t9]
		});
		$[34] = t7;
		$[35] = t9;
		$[36] = t10;
	} else t10 = $[36];
	let t11;
	if ($[37] !== isRemoved || $[38] !== removed || $[39] !== t) {
		t11 = isRemoved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "border border-destructive/50 px-3 py-2 text-xs text-destructive",
			children: [
				t.pluginsPage.removedFromCatalog ?? "Removed from catalog",
				removed.reason ? `: ${removed.reason}` : "",
				removed.date ? ` (${removed.date})` : ""
			]
		}) : null;
		$[37] = isRemoved;
		$[38] = removed;
		$[39] = t;
		$[40] = t11;
	} else t11 = $[40];
	let t12;
	if ($[41] !== entry.description) {
		t12 = entry.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "min-w-0 w-full text-xs tracking-[0.06em] text-text-secondary break-words",
			children: entry.description
		}) : null;
		$[41] = entry.description;
		$[42] = t12;
	} else t12 = $[42];
	let t13;
	if ($[43] !== chips) {
		t13 = chips.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: chips.map(_temp5)
		}) : null;
		$[43] = chips;
		$[44] = t13;
	} else t13 = $[44];
	let t14;
	if ($[45] !== entry.maintainer) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.maintainer });
		$[45] = entry.maintainer;
		$[46] = t14;
	} else t14 = $[46];
	let t15;
	if ($[47] !== entry.repo) {
		let t16;
		if ($[49] === Symbol.for("react.memo_cache_sentinel")) {
			t16 = /\.git$/;
			$[49] = t16;
		} else t16 = $[49];
		t15 = entry.repo.replace(t16, "");
		$[47] = entry.repo;
		$[48] = t15;
	} else t15 = $[48];
	const t16 = `${t15}/tree/${entry.sha}`;
	let t17;
	if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
		t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3 opacity-65" });
		$[50] = t17;
	} else t17 = $[50];
	let t18;
	if ($[51] !== entry.sha_short || $[52] !== t16) {
		t18 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			className: "inline-flex items-center gap-1 font-mono underline",
			href: t16,
			target: "_blank",
			rel: "noreferrer",
			children: [entry.sha_short, t17]
		});
		$[51] = entry.sha_short;
		$[52] = t16;
		$[53] = t18;
	} else t18 = $[53];
	let t19;
	if ($[54] !== entry.docs_url) {
		t19 = entry.docs_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			className: "inline-flex items-center gap-1 underline",
			href: entry.docs_url,
			target: "_blank",
			rel: "noreferrer",
			children: ["docs", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3 opacity-65" })]
		}) : null;
		$[54] = entry.docs_url;
		$[55] = t19;
	} else t19 = $[55];
	let t20;
	if ($[56] !== entry.requires_hermes) {
		t20 = entry.requires_hermes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["hermes ", entry.requires_hermes] }) : null;
		$[56] = entry.requires_hermes;
		$[57] = t20;
	} else t20 = $[57];
	let t21;
	if ($[58] !== entry.platforms) {
		t21 = entry.platforms.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.platforms.join(", ") }) : null;
		$[58] = entry.platforms;
		$[59] = t21;
	} else t21 = $[59];
	let t22;
	if ($[60] !== t14 || $[61] !== t18 || $[62] !== t19 || $[63] !== t20 || $[64] !== t21) {
		t22 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-3 text-xs text-text-tertiary",
			children: [
				t14,
				t18,
				t19,
				t20,
				t21
			]
		});
		$[60] = t14;
		$[61] = t18;
		$[62] = t19;
		$[63] = t20;
		$[64] = t21;
		$[65] = t22;
	} else t22 = $[65];
	let t23;
	if ($[66] !== t10 || $[67] !== t11 || $[68] !== t12 || $[69] !== t13 || $[70] !== t22) {
		t23 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "flex flex-col gap-3 px-6 py-4",
			children: [
				t10,
				t11,
				t12,
				t13,
				t22
			]
		});
		$[66] = t10;
		$[67] = t11;
		$[68] = t12;
		$[69] = t13;
		$[70] = t22;
		$[71] = t23;
	} else t23 = $[71];
	let t24;
	if ($[72] !== t1 || $[73] !== t23) {
		t24 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: t1,
			children: t23
		});
		$[72] = t1;
		$[73] = t23;
		$[74] = t24;
	} else t24 = $[74];
	return t24;
}
function _temp5(chip) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
		className: "border border-border bg-background/40 px-2 py-1 font-mono text-[0.6875rem]",
		children: chip
	}, chip);
}
//#endregion
export { PluginsPage as default };
