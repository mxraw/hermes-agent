import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, i as Link, m as require_react_dom, n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { I as RefreshCw, Yt as Check, j as Search, r as X } from "./vendor-DkbdVxWs.js";
import { B as Button, L as Spinner, f as Label, j as ListItem, k as Checkbox, p as Input } from "./ui-vIdGzE07.js";
import { r as themedBody, t as cn } from "./utils-XzxpPQdK.js";
import { u as errorMessage } from "./api-rr7lTIEw.js";
import { t as ConfirmDialog } from "./ConfirmDialog-D-vC_4KK.js";
//#region apps/shared/src/fuzzy.ts
var WORD_BOUNDARY = /[-_/.\s]/;
/** Length-preserving search fold: lower-case and `[-_.]` → space. */
function searchFold(value) {
	return value.toLowerCase().replace(/[-_.]/g, " ");
}
function isBoundary(target, index) {
	if (index === 0) return true;
	const prev = target[index - 1];
	if (WORD_BOUNDARY.test(prev)) return true;
	const cur = target[index];
	return prev === prev.toLowerCase() && cur !== cur.toLowerCase() && cur === cur.toUpperCase();
}
/**
* Score a single query token against a target. Returns null when the token is
* not a subsequence of the target. An empty query scores 0 with no positions.
*/
function fuzzyScore(target, query) {
	if (!query) return {
		score: 0,
		positions: []
	};
	const lowerTarget = searchFold(target);
	const lowerQuery = searchFold(query);
	const positions = [];
	let score = 0;
	let prevIndex = -1;
	let searchFrom = 0;
	for (const ch of lowerQuery) {
		const idx = lowerTarget.indexOf(ch, searchFrom);
		if (idx < 0) return null;
		positions.push(idx);
		score += 1;
		if (prevIndex >= 0 && idx === prevIndex + 1) score += 5;
		else if (prevIndex >= 0) score -= Math.min(idx - prevIndex - 1, 3);
		if (isBoundary(target, idx)) score += 3;
		if (idx === 0) score += 5;
		prevIndex = idx;
		searchFrom = idx + 1;
	}
	if (positions.length && positions[0] === 0 && positions[positions.length - 1] === positions.length - 1) score += 8;
	if (lowerTarget === lowerQuery) score += 20;
	score -= lowerTarget.length * .01;
	return {
		score,
		positions
	};
}
/**
* Score a target against a whitespace-separated, multi-token query. Every token
* must match (AND semantics); the result aggregates per-token scores and the
* union of matched positions. Returns null if any token fails to match.
*/
function fuzzyScoreMulti(target, query) {
	const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
	if (!tokens.length) return {
		score: 0,
		positions: []
	};
	let score = 0;
	const positionSet = /* @__PURE__ */ new Set();
	for (const token of tokens) {
		const match = fuzzyScore(target, token);
		if (!match) return null;
		score += match.score;
		for (const pos of match.positions) positionSet.add(pos);
	}
	return {
		score,
		positions: [...positionSet].sort((a, b) => a - b)
	};
}
/**
* Filter + rank a list by a fuzzy query against a derived text key. Non-matching
* items are dropped; matches are sorted by score (descending), ties broken by
* the original index so ordering is stable for equal scores. An empty query
* returns every item in original order with no positions.
*/
function fuzzyRank(items, query, toText) {
	const trimmed = query.trim();
	if (!trimmed) return items.map((item) => ({
		item,
		score: 0,
		positions: []
	}));
	const ranked = [];
	items.forEach((item, index) => {
		const match = fuzzyScoreMulti(toText(item), trimmed);
		if (match) ranked.push({
			item,
			score: match.score,
			positions: match.positions,
			index
		});
	});
	ranked.sort((a, b) => b.score - a.score || a.index - b.index);
	return ranked.map(({ item, score, positions }) => ({
		item,
		score,
		positions
	}));
}
//#endregion
//#region apps/shared/src/model-search-text.ts
/**
* Extra tokens used only for model-picker search ranking.
*
* Wire IDs stay unchanged — some providers report short or brand-less ids
* (Kimi Coding's flagship is literally `k3`) that users still search for by
* the familiar `kimi-…` naming of sibling models.
*
* Keep in sync with the Python twin, hermes_cli/model_search.py.
*/
var MODEL_SEARCH_ALIASES = {
	k3: ["kimi-k3", "kimi"],
	"x-preview-f-free": ["ox-alpha", "ox"]
};
/** Haystack for fuzzy/substring model search; never changes the wire id. */
function modelSearchText(model) {
	const id = model.trim();
	if (!id) return model;
	const aliases = MODEL_SEARCH_ALIASES[id.toLowerCase()];
	if (!aliases?.length) return id;
	return `${id} ${aliases.join(" ")}`;
}
//#endregion
//#region web/src/lib/model-picker-filter.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var import_compiler_runtime = require_compiler_runtime();
/**
* True when `trimmedQuery` located the selected provider by name/slug but
* matches none of its models by id — the case where a single search box
* filtering both the provider and model columns would otherwise leave the
* model pane empty even though the user just successfully found the
* provider they were looking for.
*/
function queryMatchesProviderOnly(selectedProvider, models, trimmedQuery) {
	if (!trimmedQuery || !selectedProvider) return false;
	const matchesProvider = fuzzyScoreMulti(`${selectedProvider.name} ${selectedProvider.slug}`, trimmedQuery) != null;
	const matchesAnyModel = models.some((m) => fuzzyScoreMulti(m, trimmedQuery) != null);
	return matchesProvider && !matchesAnyModel;
}
//#endregion
//#region web/src/lib/model-picker-current.ts
function isAutoPickerCurrent(current) {
	const provider = current.provider.trim().toLowerCase();
	return !provider || provider === "auto";
}
/** Map an auxiliary-task row onto picker current. Auto/empty → auto. */
function assignmentToPickerCurrent(assignment) {
	const provider = String(assignment?.provider ?? "").trim();
	const model = String(assignment?.model ?? "").trim();
	if (!provider || provider.toLowerCase() === "auto") return {
		model: "",
		provider: "auto"
	};
	return {
		model,
		provider
	};
}
/**
* `override` wins when the picker is for a non-main slot. Missing override
* keeps the catalog's main model (chat-session / Set Main Model).
*/
function resolvePickerCurrent(options, override) {
	if (override) return {
		model: String(override.model ?? ""),
		provider: String(override.provider ?? "")
	};
	return {
		model: String(options?.model ?? ""),
		provider: String(options?.provider ?? "")
	};
}
function formatPickerCurrentLabel(current) {
	if (isAutoPickerCurrent(current)) return "auto (use main model)";
	const model = current.model.trim() || "(unknown)";
	const provider = current.provider.trim();
	return provider ? `${model} · ${provider}` : model;
}
function resolveInitialProviderSlug(providers, currentProvider) {
	const slug = currentProvider.trim();
	if (slug && slug.toLowerCase() !== "auto") {
		const match = providers.find((p) => p.slug === slug);
		if (match) return match.slug;
	}
	return (providers.find((p) => p.is_current) ?? providers[0])?.slug ?? "";
}
//#endregion
//#region web/src/components/ModelPickerDialog.tsx
var import_jsx_runtime = require_jsx_runtime();
function ModelPickerDialog(props) {
	const { gw, sessionId, onSubmit, loader, onApply, onClose, title = "Switch Model", alwaysGlobal = false, currentAssignment } = props;
	const standalone = !!loader && !!onApply;
	const [providers, setProviders] = (0, import_react.useState)([]);
	const [currentModel, setCurrentModel] = (0, import_react.useState)("");
	const [currentProviderSlug, setCurrentProviderSlug] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [selectedSlug, setSelectedSlug] = (0, import_react.useState)("");
	const [selectedModel, setSelectedModel] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const [persistGlobal, setPersistGlobal] = (0, import_react.useState)(alwaysGlobal);
	const [applying, setApplying] = (0, import_react.useState)(false);
	const [refreshing, setRefreshing] = (0, import_react.useState)(false);
	const [pendingConfirm, setPendingConfirm] = (0, import_react.useState)(null);
	const closedRef = (0, import_react.useRef)(false);
	const applyOptions = (r) => {
		const next = r?.providers ?? [];
		const current = resolvePickerCurrent(r, currentAssignment);
		setProviders(next);
		setCurrentModel(current.model);
		setCurrentProviderSlug(current.provider);
		setSelectedSlug((prev) => {
			if (prev && next.some((p) => p.slug === prev)) return prev;
			return resolveInitialProviderSlug(next, current.provider);
		});
		setSelectedModel("");
	};
	const requestOptions = (refresh = false) => standalone ? loader({ refresh }) : gw.request("model.options", {
		...sessionId ? { session_id: sessionId } : {},
		...refresh ? { refresh: true } : {},
		include_unconfigured: true
	});
	const refreshOptions = () => {
		setError(null);
		setRefreshing(true);
		requestOptions(true).then((r) => {
			if (closedRef.current) return;
			applyOptions(r);
		}).catch((e) => {
			if (closedRef.current) return;
			setError(errorMessage(e));
		}).finally(() => {
			if (closedRef.current) return;
			setRefreshing(false);
		});
	};
	(0, import_react.useEffect)(() => {
		closedRef.current = false;
		requestOptions().then((r) => {
			if (closedRef.current) return;
			applyOptions(r);
		}).catch((e) => {
			if (closedRef.current) return;
			setError(errorMessage(e));
		}).finally(() => {
			if (closedRef.current) return;
			setLoading(false);
		});
		return () => {
			closedRef.current = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onClose();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	const selectedProvider = (0, import_react.useMemo)(() => providers.find((p) => p.slug === selectedSlug) ?? null, [providers, selectedSlug]);
	const models = (0, import_react.useMemo)(() => selectedProvider?.models ?? [], [selectedProvider]);
	const trimmedQuery = query.trim();
	const filteredProviders = (0, import_react.useMemo)(() => {
		const ranked = fuzzyRank(providers, trimmedQuery, (p) => `${p.name} ${p.slug} ${(p.models ?? []).join(" ")}`).map((r) => r.item);
		if (trimmedQuery) return ranked;
		const withModels = ranked.filter((p) => (p.models ?? []).length > 0);
		const withoutModels = ranked.filter((p) => (p.models ?? []).length === 0);
		return [...withModels, ...withoutModels];
	}, [providers, trimmedQuery]);
	const queryMatchesSelectedProviderOnly = (0, import_react.useMemo)(() => queryMatchesProviderOnly(selectedProvider, models, trimmedQuery), [
		trimmedQuery,
		selectedProvider,
		models
	]);
	const filteredModels = (0, import_react.useMemo)(() => fuzzyRank(models, queryMatchesSelectedProviderOnly ? "" : trimmedQuery, modelSearchText).map((r) => ({
		model: r.item,
		positions: r.positions.filter((i) => i >= 0 && i < r.item.length)
	})), [
		models,
		trimmedQuery,
		queryMatchesSelectedProviderOnly
	]);
	const canConfirm = !!selectedProvider && !!selectedModel && !applying;
	const applySelection = async (confirmExpensiveModel = false, forced) => {
		const providerSlug = forced?.provider ?? selectedProvider?.slug ?? "";
		const model = forced?.model ?? selectedModel;
		const shouldPersistGlobal = forced?.persistGlobal ?? persistGlobal;
		if (!providerSlug || !model || applying) return;
		if (standalone && onApply) {
			setApplying(true);
			try {
				const result = await onApply({
					confirmExpensiveModel,
					provider: providerSlug,
					model,
					persistGlobal: shouldPersistGlobal
				});
				if (result?.confirm_required) {
					setPendingConfirm({
						provider: providerSlug,
						model,
						persistGlobal: shouldPersistGlobal,
						message: result.confirm_message || result.warning || "This model has unusually high known pricing."
					});
					return;
				}
				onClose();
			} catch (e) {
				setError(errorMessage(e));
			} finally {
				setApplying(false);
			}
		} else if (gw && sessionId) {
			setApplying(true);
			try {
				const global = shouldPersistGlobal ? " --global" : "";
				const result = await gw.request("config.set", {
					confirm_expensive_model: confirmExpensiveModel,
					key: "model",
					session_id: sessionId,
					value: `${model} --provider ${providerSlug}${global}`
				});
				if (result?.confirm_required) {
					setPendingConfirm({
						provider: providerSlug,
						model,
						persistGlobal: shouldPersistGlobal,
						message: result.confirm_message || result.warning || "This model has unusually high known pricing."
					});
					return;
				}
				onClose();
			} catch (e) {
				setError(errorMessage(e));
			} finally {
				setApplying(false);
			}
		} else if (onSubmit) {
			onSubmit(`/model ${model} --provider ${providerSlug}${shouldPersistGlobal ? " --global" : ""}`);
			onClose();
		}
	};
	const confirm = () => {
		if (!canConfirm) return;
		applySelection();
	};
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4",
		onClick: (e) => e.target === e.currentTarget && onClose(),
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "model-picker-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn(themedBody, "relative w-full max-w-3xl max-h-[80vh] border border-border bg-card shadow-2xl flex flex-col"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ghost: true,
					size: "icon",
					onClick: onClose,
					className: "absolute right-2 top-2 text-muted-foreground hover:text-foreground",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "p-5 pb-3 border-b border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "model-picker-title",
						className: "font-mondwest text-display text-base tracking-wider",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-1 font-mono",
						children: [
							"current:",
							" ",
							formatPickerCurrentLabel({
								model: currentModel,
								provider: currentProviderSlug
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 pt-3 pb-2 border-b border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							autoFocus: true,
							placeholder: "Filter providers and models…",
							value: query,
							onChange: (e) => setQuery(e.target.value),
							className: "pl-7 h-8 text-sm"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-h-0 grid grid-cols-[200px_1fr] overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderColumn, {
						loading,
						error,
						onClose,
						providers: filteredProviders,
						total: providers.length,
						selectedSlug,
						currentProviderSlug,
						query: trimmedQuery,
						onSelect: (slug) => {
							setSelectedSlug(slug);
							setSelectedModel("");
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelColumn, {
						provider: selectedProvider,
						models: filteredModels,
						allModels: models,
						selectedModel,
						currentModel,
						currentProviderSlug,
						onSelect: setSelectedModel,
						onConfirm: (m) => {
							setSelectedModel(m);
							applySelection(false, {
								provider: selectedProvider?.slug ?? "",
								model: m,
								persistGlobal,
								message: ""
							});
						}
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "border-t border-border p-3 flex items-center justify-between gap-3 flex-wrap",
					children: [alwaysGlobal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: "Saves to config.yaml — applies to new sessions."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: persistGlobal,
							id: "model-picker-persist-global",
							onCheckedChange: (checked) => setPersistGlobal(checked === true)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "font-mondwest normal-case tracking-normal text-xs text-muted-foreground cursor-pointer",
							htmlFor: "model-picker-persist-global",
							children: "Persist globally (otherwise this session only)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 ml-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								outlined: true,
								onClick: refreshOptions,
								disabled: applying || loading || refreshing,
								children: [refreshing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }), "Refresh Models"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								outlined: true,
								onClick: onClose,
								disabled: applying,
								children: "Cancel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: confirm,
								disabled: !canConfirm,
								children: applying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : "Switch"
							})
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: !!pendingConfirm,
			title: "Expensive Model Warning",
			description: pendingConfirm?.message,
			destructive: true,
			confirmLabel: "Switch anyway",
			cancelLabel: "Cancel",
			loading: applying,
			onCancel: () => setPendingConfirm(null),
			onConfirm: () => {
				const pending = pendingConfirm;
				if (!pending) return;
				setPendingConfirm(null);
				applySelection(true, pending);
			}
		})]
	}), document.body);
}
function ProviderColumn(t0) {
	const $ = (0, import_compiler_runtime.c)(25);
	const { loading, error, providers, total, selectedSlug, currentProviderSlug, query, onSelect, onClose } = t0;
	let t1;
	if ($[0] !== loading) {
		t1 = loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 p-4 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-xs" }), " loading…"]
		});
		$[0] = loading;
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	if ($[2] !== error) {
		t2 = error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 text-xs text-destructive",
			children: error
		});
		$[2] = error;
		$[3] = t2;
	} else t2 = $[3];
	let t3;
	if ($[4] !== error || $[5] !== loading || $[6] !== onClose || $[7] !== providers.length || $[8] !== query || $[9] !== total) {
		t3 = !loading && !error && providers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 text-xs text-muted-foreground",
			children: query || total > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "italic",
				children: "No providers match your search."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No model providers are set up yet. Add an API key under Keys or sign in to a provider under Models to see models here." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/env",
						onClick: onClose,
						className: "underline underline-offset-2 hover:text-foreground",
						children: "Open Keys"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/models",
						onClick: onClose,
						className: "underline underline-offset-2 hover:text-foreground",
						children: "Sign in to a provider"
					})]
				})]
			})
		});
		$[4] = error;
		$[5] = loading;
		$[6] = onClose;
		$[7] = providers.length;
		$[8] = query;
		$[9] = total;
		$[10] = t3;
	} else t3 = $[10];
	let t4;
	if ($[11] !== currentProviderSlug || $[12] !== onSelect || $[13] !== providers || $[14] !== selectedSlug) {
		let t5;
		if ($[16] !== currentProviderSlug || $[17] !== onSelect || $[18] !== selectedSlug) {
			t5 = (p) => {
				const active = p.slug === selectedSlug;
				const isCurrentProvider = p.slug === currentProviderSlug && !isAutoPickerCurrent({
					model: "",
					provider: currentProviderSlug
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, {
					active,
					onClick: () => onSelect(p.slug),
					className: `items-start text-xs border-l-2 ${active ? "border-l-primary" : "border-l-transparent"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium truncate",
								children: p.name
							}), isCurrentProvider && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrentTag, {})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-text-secondary font-mono truncate",
							children: [
								p.slug,
								" · ",
								p.total_models ?? p.models?.length ?? 0,
								" models"
							]
						})]
					})
				}, p.slug);
			};
			$[16] = currentProviderSlug;
			$[17] = onSelect;
			$[18] = selectedSlug;
			$[19] = t5;
		} else t5 = $[19];
		t4 = providers.map(t5);
		$[11] = currentProviderSlug;
		$[12] = onSelect;
		$[13] = providers;
		$[14] = selectedSlug;
		$[15] = t4;
	} else t4 = $[15];
	let t5;
	if ($[20] !== t1 || $[21] !== t2 || $[22] !== t3 || $[23] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-r border-border overflow-y-auto",
			children: [
				t1,
				t2,
				t3,
				t4
			]
		});
		$[20] = t1;
		$[21] = t2;
		$[22] = t3;
		$[23] = t4;
		$[24] = t5;
	} else t5 = $[24];
	return t5;
}
function ModelColumn(t0) {
	const $ = (0, import_compiler_runtime.c)(15);
	const { provider, models, allModels, selectedModel, currentModel, currentProviderSlug, onSelect, onConfirm } = t0;
	if (!provider) {
		let t1;
		if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
			t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 text-xs text-muted-foreground italic",
					children: "pick a provider →"
				})
			});
			$[0] = t1;
		} else t1 = $[0];
		return t1;
	}
	let t1;
	if ($[1] !== provider.warning) {
		t1 = provider.warning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-3 text-xs text-destructive border-b border-border",
			children: provider.warning
		});
		$[1] = provider.warning;
		$[2] = t1;
	} else t1 = $[2];
	let t2;
	if ($[3] !== allModels || $[4] !== currentModel || $[5] !== currentProviderSlug || $[6] !== models || $[7] !== onConfirm || $[8] !== onSelect || $[9] !== provider.slug || $[10] !== selectedModel) {
		t2 = models.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 text-xs text-muted-foreground italic",
			children: allModels.length ? "no models match your filter" : "no models listed for this provider"
		}) : models.map((t3) => {
			const { model: m, positions } = t3;
			const active = m === selectedModel;
			const isCurrent = m === currentModel && provider.slug === currentProviderSlug;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
				active,
				onClick: () => onSelect(m),
				onDoubleClick: () => onConfirm(m),
				className: "px-3 py-1.5 text-xs font-mono",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: `h-3 w-3 shrink-0 ${active ? "text-primary" : "text-transparent"}` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 truncate",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightedText, {
							text: m,
							positions
						})
					}),
					isCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrentTag, {})
				]
			}, m);
		});
		$[3] = allModels;
		$[4] = currentModel;
		$[5] = currentProviderSlug;
		$[6] = models;
		$[7] = onConfirm;
		$[8] = onSelect;
		$[9] = provider.slug;
		$[10] = selectedModel;
		$[11] = t2;
	} else t2 = $[11];
	let t3;
	if ($[12] !== t1 || $[13] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-y-auto",
			children: [t1, t2]
		});
		$[12] = t1;
		$[13] = t2;
		$[14] = t3;
	} else t3 = $[14];
	return t3;
}
function CurrentTag() {
	const $ = (0, import_compiler_runtime.c)(1);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-display text-xs tracking-wider text-primary shrink-0",
			children: "current"
		});
		$[0] = t0;
	} else t0 = $[0];
	return t0;
}
/**
* Render `text` with the characters at `positions` emphasised, so users can
* see which characters their fuzzy query matched. Positions are indices into
* `text`; out-of-range indices are ignored.
*/
function HighlightedText(t0) {
	const $ = (0, import_compiler_runtime.c)(9);
	const { text, positions } = t0;
	if (!positions.length) {
		let t1;
		if ($[0] !== text) {
			t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: text });
			$[0] = text;
			$[1] = t1;
		} else t1 = $[1];
		return t1;
	}
	let t1;
	if ($[2] !== positions) {
		t1 = new Set(positions);
		$[2] = positions;
		$[3] = t1;
	} else t1 = $[3];
	const hit = t1;
	let t2;
	if ($[4] !== text) {
		t2 = Array.from(text);
		$[4] = text;
		$[5] = t2;
	} else t2 = $[5];
	let t3;
	if ($[6] !== hit || $[7] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t2.map((ch, i) => hit.has(i) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
			className: "bg-transparent text-primary font-semibold underline underline-offset-2",
			children: ch
		}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ch }, i)) });
		$[6] = hit;
		$[7] = t2;
		$[8] = t3;
	} else t3 = $[8];
	return t3;
}
//#endregion
//#region web/src/components/ModelReloadConfirm.tsx
/**
* Confirm + full-page reload after a model change.
*
* Changing the main model persists to config.yaml, but the RUNNING chat keeps
* its model until its session is rebuilt. A full reload (fresh PTY session that
* boots its agent from the just-saved config) is the reliable way to apply it —
* the in-place hot-swap and partial remount both proved unreliable. We confirm
* first because the reload starts a fresh chat (the current one stays resumable
* in Sessions and the agent's memory is kept).
*
* Shared by the chat sidebar picker and the Models page so both behave
* identically. `model` is the short model name awaiting confirmation, or null
* when the dialog is closed. `notice`: the backend's switch warning (Nous window
* plans, Large model), shown under the body; absent for everyone else.
*/
function ModelReloadConfirm(t0) {
	const $ = (0, import_compiler_runtime.c)(4);
	const { model, description, notice, onCancel } = t0;
	const body = description ?? `Switching to ${model ?? ""} starts a fresh chat. Your current chat stays in your Sessions list and the agent's memory is kept. Reload now to apply it?`;
	const t1 = model !== null;
	const t2 = notice ? `${body}\n\n⚠ ${notice}` : body;
	let t3;
	if ($[0] !== onCancel || $[1] !== t1 || $[2] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: t1,
			title: "Switch model?",
			description: t2,
			confirmLabel: "Reload",
			onConfirm: _temp,
			onCancel
		});
		$[0] = onCancel;
		$[1] = t1;
		$[2] = t2;
		$[3] = t3;
	} else t3 = $[3];
	return t3;
}
function _temp() {
	return window.location.reload();
}
//#endregion
export { ModelPickerDialog as n, assignmentToPickerCurrent as r, ModelReloadConfirm as t };
