import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { f as useNavigate, h as require_react, n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { Jt as ChevronDown, Nt as EllipsisVertical, Rt as Cpu, Yt as Check, _ as TextAlignStart, et as Package, g as Trash2, q as Pencil, r as X, u as Users, v as Terminal, x as Sparkles } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, N as Select, P as SelectOption, R as braille_default, a as H2, b as useConfirmDelete, f as Label, h as CardContent, k as Checkbox, m as Card, p as Input, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { t as cn } from "./utils-XzxpPQdK.js";
import { r as useI18n } from "./i18n-Zn9FHQtI.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { p as useProfileScope } from "./index-CeRydpmd.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
import { t as useModalBehavior } from "./useModalBehavior-DSqJduTw.js";
import { t as copyTextToClipboard } from "./clipboard-C-rbBxe_.js";
import { t as DeleteConfirmDialog } from "./DeleteConfirmDialog-CS54bGFr.js";
//#region web/src/pages/ProfilesPage.tsx
var import_compiler_runtime = require_compiler_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var PROFILE_NAME_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/;
/** Braille unicode spinner (`unicode-animations`); static first frame when reduced motion is preferred. */
function ProfilesLoadingSpinner() {
	const $ = (0, import_compiler_runtime.c)(4);
	const { frames, interval } = braille_default.braille;
	const [frameIndex, setFrameIndex] = (0, import_react.useState)(0);
	let t0;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = () => {
			if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			const id = window.setInterval(() => setFrameIndex((i) => (i + 1) % frames.length), interval);
			return () => window.clearInterval(id);
		};
		t1 = [frames.length, interval];
		$[0] = t0;
		$[1] = t1;
	} else {
		t0 = $[0];
		t1 = $[1];
	}
	(0, import_react.useEffect)(t0, t1);
	const t2 = frames[frameIndex];
	let t3;
	if ($[2] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "inline-block select-none font-mono text-xl leading-none text-muted-foreground",
			children: t2
		});
		$[2] = t2;
		$[3] = t3;
	} else t3 = $[3];
	return t3;
}
/**
* Per-card "⋯" actions menu. Holds every action for the profile (set active,
* model, description, SOUL, copy command, rename, delete) so the card row stays
* a single button. Mirrors the hand-rolled dropdown pattern used by ModelsPage's
* "Use as" menu (button + absolute panel + outside-click close).
*/
function ProfileActionsMenu(t0) {
	const $ = (0, import_compiler_runtime.c)(36);
	const { isActive, isDefault, isEditingDesc, isEditingModel, isEditingSoul, labels, settingActive, onCopyCommand, onDelete, onEditDescription, onEditModel, onEditSoul, onManageSkills, onRename, onSetActive } = t0;
	const [open, setOpen] = (0, import_react.useState)(false);
	const containerRef = (0, import_react.useRef)(null);
	let t1;
	let t2;
	if ($[0] !== open) {
		t1 = () => {
			if (!open) return;
			const onDown = (e) => {
				const target = e.target;
				if (target && !containerRef.current?.contains(target)) setOpen(false);
			};
			window.addEventListener("mousedown", onDown);
			return () => window.removeEventListener("mousedown", onDown);
		};
		t2 = [open];
		$[0] = open;
		$[1] = t1;
		$[2] = t2;
	} else {
		t1 = $[1];
		t2 = $[2];
	}
	(0, import_react.useEffect)(t1, t2);
	let t3;
	if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
		t3 = (fn) => () => {
			fn();
			setOpen(false);
		};
		$[3] = t3;
	} else t3 = $[3];
	const run = t3;
	let t4;
	let t5;
	if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
		t4 = () => setOpen(_temp);
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-4 w-4" });
		$[4] = t4;
		$[5] = t5;
	} else {
		t4 = $[4];
		t5 = $[5];
	}
	let t6;
	if ($[6] !== labels.actions || $[7] !== open) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			size: "icon",
			title: labels.actions,
			"aria-label": labels.actions,
			"aria-haspopup": "menu",
			"aria-expanded": open,
			onClick: t4,
			children: t5
		});
		$[6] = labels.actions;
		$[7] = open;
		$[8] = t6;
	} else t6 = $[8];
	let t7;
	if ($[9] !== isActive || $[10] !== isDefault || $[11] !== isEditingDesc || $[12] !== isEditingModel || $[13] !== isEditingSoul || $[14] !== labels.delete || $[15] !== labels.editDescription || $[16] !== labels.editModel || $[17] !== labels.editSoul || $[18] !== labels.manageSkills || $[19] !== labels.openInTerminal || $[20] !== labels.rename || $[21] !== labels.setActive || $[22] !== onCopyCommand || $[23] !== onDelete || $[24] !== onEditDescription || $[25] !== onEditModel || $[26] !== onEditSoul || $[27] !== onManageSkills || $[28] !== onRename || $[29] !== onSetActive || $[30] !== open || $[31] !== settingActive) {
		t7 = open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "menu",
			className: "absolute right-0 top-full z-50 mt-1 min-w-[200px] border border-border bg-card shadow-lg",
			children: [
				!isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "menuitem",
					className: "flex w-full items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider hover:bg-muted/50 disabled:opacity-40",
					disabled: settingActive,
					onClick: run(onSetActive),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), labels.setActive]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "menuitem",
					className: "flex w-full items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider hover:bg-muted/50 disabled:opacity-40",
					onClick: run(onEditModel),
					children: [isEditingModel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "h-4 w-4" }), labels.editModel]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "menuitem",
					className: "flex w-full items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider hover:bg-muted/50 disabled:opacity-40",
					onClick: run(onEditDescription),
					children: [isEditingDesc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAlignStart, { className: "h-4 w-4" }), labels.editDescription]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "menuitem",
					className: "flex w-full items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider hover:bg-muted/50 disabled:opacity-40",
					onClick: run(onEditSoul),
					children: [isEditingSoul ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "w-4 text-center text-xs font-bold",
						children: "S"
					}), labels.editSoul]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "menuitem",
					className: "flex w-full items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider hover:bg-muted/50 disabled:opacity-40",
					onClick: run(onManageSkills),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), labels.manageSkills]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "menuitem",
					className: "flex w-full items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider hover:bg-muted/50 disabled:opacity-40",
					onClick: run(onCopyCommand),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-4 w-4" }), labels.openInTerminal]
				}),
				!isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "menuitem",
					className: cn("flex w-full items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider hover:bg-muted/50 disabled:opacity-40", "border-t border-border/50"),
					onClick: run(onRename),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" }), labels.rename]
				}),
				!isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "menuitem",
					className: cn("flex w-full items-center gap-2.5 px-3 py-2 text-xs uppercase tracking-wider hover:bg-muted/50 disabled:opacity-40", "text-destructive hover:bg-destructive/10"),
					onClick: run(onDelete),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), labels.delete]
				})
			]
		});
		$[9] = isActive;
		$[10] = isDefault;
		$[11] = isEditingDesc;
		$[12] = isEditingModel;
		$[13] = isEditingSoul;
		$[14] = labels.delete;
		$[15] = labels.editDescription;
		$[16] = labels.editModel;
		$[17] = labels.editSoul;
		$[18] = labels.manageSkills;
		$[19] = labels.openInTerminal;
		$[20] = labels.rename;
		$[21] = labels.setActive;
		$[22] = onCopyCommand;
		$[23] = onDelete;
		$[24] = onEditDescription;
		$[25] = onEditModel;
		$[26] = onEditSoul;
		$[27] = onManageSkills;
		$[28] = onRename;
		$[29] = onSetActive;
		$[30] = open;
		$[31] = settingActive;
		$[32] = t7;
	} else t7 = $[32];
	let t8;
	if ($[33] !== t6 || $[34] !== t7) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			"data-profile-actions": true,
			ref: containerRef,
			children: [t6, t7]
		});
		$[33] = t6;
		$[34] = t7;
		$[35] = t8;
	} else t8 = $[35];
	return t8;
}
function _temp(v) {
	return !v;
}
function ProfilesPage() {
	const navigate = useNavigate();
	const [profiles, setProfiles] = (0, import_react.useState)([]);
	const [activeInfo, setActiveInfo] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const { toast, showToast } = useToast();
	const { t } = useI18n();
	const { setEnd } = usePageHeader();
	const { setProfile } = useProfileScope();
	const L = (0, import_react.useMemo)(() => {
		const p = t.profiles;
		return {
			activeProfile: p.activeProfile ?? "Active profile",
			activeBadge: p.activeBadge ?? "active",
			setActive: p.setActive ?? "Set as active",
			activeSet: p.activeSet ?? "Active profile set",
			gatewayRunning: p.gatewayRunning ?? "Gateway running",
			gatewayStopped: p.gatewayStopped ?? "Gateway stopped",
			gatewayRunningWarning: p.gatewayRunningWarning ?? "This profile's gateway is running — it will be stopped.",
			aliasBadge: p.aliasBadge ?? "alias",
			description: p.description ?? "Description",
			descriptionPlaceholder: p.descriptionPlaceholder ?? "What is this profile good at? Used to route kanban tasks by role.",
			noDescription: p.noDescription ?? "No description",
			editDescription: p.editDescription ?? "Edit description",
			descriptionSaved: p.descriptionSaved ?? "Description saved",
			reviewBadge: p.reviewBadge ?? "review",
			autoGenerate: p.autoGenerate ?? "Auto-generate",
			generating: p.generating ?? "Generating…",
			describeFailed: p.describeFailed ?? "Could not generate description",
			distribution: p.distribution ?? "Distribution",
			advancedOptions: p.advancedOptions ?? "Advanced options",
			cloneAll: p.cloneAll ?? "Clone everything (memories, sessions, skills, state)",
			noSkillsOption: p.noSkillsOption ?? "Don't seed bundled skills",
			descriptionOptional: p.descriptionOptional ?? "Description (optional)",
			modelOptional: p.modelOptional ?? "Model (optional)",
			modelInherit: p.modelInherit ?? "Inherit from clone / default",
			modelLoading: p.modelLoading ?? "Loading models…",
			modelNone: p.modelNone ?? "No model providers are set up yet. Add an API key under Keys or sign in to a provider under Models.",
			editModel: p.editModel ?? "Change model",
			modelSaved: p.modelSaved ?? "Model updated",
			modelSelect: p.modelSelect ?? "Select a model",
			actions: p.actions ?? "Actions",
			manageSkills: p.manageSkills ?? "Manage skills & tools",
			activeSetHint: p.activeSetHint ?? "Dashboard switched to manage {name}. New CLI/gateway runs will use this profile too."
		};
	}, [t.profiles]);
	const [createModalOpen, setCreateModalOpen] = (0, import_react.useState)(false);
	const [newName, setNewName] = (0, import_react.useState)("");
	const [cloneFrom, setCloneFrom] = (0, import_react.useState)("default");
	const [cloneAll, setCloneAll] = (0, import_react.useState)(false);
	const [noSkills, setNoSkills] = (0, import_react.useState)(false);
	const [newDescription, setNewDescription] = (0, import_react.useState)("");
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [modelChoices, setModelChoices] = (0, import_react.useState)(null);
	const modelChoicesLoading = (0, import_react.useRef)(false);
	const [modelChoice, setModelChoice] = (0, import_react.useState)("");
	const closeCreateModal = (0, import_react.useCallback)(() => setCreateModalOpen(false), []);
	const createModalRef = useModalBehavior({
		open: createModalOpen,
		onClose: closeCreateModal
	});
	const [renamingFrom, setRenamingFrom] = (0, import_react.useState)(null);
	const [renameTo, setRenameTo] = (0, import_react.useState)("");
	const [editingSoulFor, setEditingSoulFor] = (0, import_react.useState)(null);
	const [soulText, setSoulText] = (0, import_react.useState)("");
	const [soulSaving, setSoulSaving] = (0, import_react.useState)(false);
	const activeSoulRequest = (0, import_react.useRef)(null);
	const [editingDescFor, setEditingDescFor] = (0, import_react.useState)(null);
	const [descText, setDescText] = (0, import_react.useState)("");
	const [descSaving, setDescSaving] = (0, import_react.useState)(false);
	const [describing, setDescribing] = (0, import_react.useState)(false);
	const activeDescRequest = (0, import_react.useRef)(null);
	const descSavingCount = (0, import_react.useRef)(0);
	const describingCount = (0, import_react.useRef)(0);
	const [editingModelFor, setEditingModelFor] = (0, import_react.useState)(null);
	const [modelEditChoice, setModelEditChoice] = (0, import_react.useState)("");
	const [modelSaving, setModelSaving] = (0, import_react.useState)(false);
	const [settingActive, setSettingActive] = (0, import_react.useState)(null);
	const modelKey = (provider, model) => provider && model ? `${provider}\u0000${model}` : "";
	const loadModelChoices = (0, import_react.useCallback)(() => {
		if (modelChoices !== null || modelChoicesLoading.current) return;
		modelChoicesLoading.current = true;
		api.getModelOptions().then((res) => {
			const flat = [];
			for (const prov of res.providers ?? []) for (const m of prov.models ?? []) flat.push({
				provider: prov.slug,
				model: m,
				label: `${prov.name} · ${m}`
			});
			setModelChoices(flat);
		}).catch(() => setModelChoices([])).finally(() => {
			modelChoicesLoading.current = false;
		});
	}, [modelChoices]);
	const load = (0, import_react.useCallback)(() => {
		Promise.all([api.getProfiles(), api.getActiveProfile().catch(() => null)]).then(([res_0, active]) => {
			setProfiles(res_0.profiles);
			setActiveInfo(active);
		}).catch((e) => showToast(`${t.status.error}: ${errorMessage(e)}`, "error")).finally(() => setLoading(false));
	}, [showToast, t.status.error]);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	(0, import_react.useEffect)(() => {
		if (createModalOpen) loadModelChoices();
	}, [createModalOpen, loadModelChoices]);
	const isActive = (0, import_react.useCallback)((p_0) => activeInfo != null && (activeInfo.active === p_0.name || activeInfo.active === "default" && p_0.is_default), [activeInfo]);
	const handleCreate = async () => {
		const name = newName.trim();
		if (!name) {
			showToast(t.profiles.nameRequired, "error");
			return;
		}
		if (!PROFILE_NAME_RE.test(name)) {
			showToast(`${t.profiles.invalidName}: ${t.profiles.nameRule}`, "error");
			return;
		}
		setCreating(true);
		try {
			const cloning = cloneFrom !== null;
			const picked = modelChoice ? modelChoices?.find((c) => `${c.provider}\u0000${c.model}` === modelChoice) : void 0;
			const res_1 = await api.createProfile({
				name,
				clone_from: cloneFrom,
				clone_all: cloning && cloneAll,
				no_skills: cloning ? false : noSkills,
				description: newDescription.trim() || void 0,
				provider: picked?.provider,
				model: picked?.model
			});
			showToast(`${t.profiles.created}: ${name}`, "success");
			if (picked && res_1.model_set === false) showToast(`Profile created, but the model could not be saved — set it from the profile editor.`, "error");
			setNewName("");
			setNewDescription("");
			setNoSkills(false);
			setCloneAll(false);
			setCloneFrom("default");
			setModelChoice("");
			setCreateModalOpen(false);
			load();
		} catch (e_0) {
			showToast(`${t.status.error}: ${errorMessage(e_0)}`, "error");
		} finally {
			setCreating(false);
		}
	};
	const handleRenameSubmit = async () => {
		if (!renamingFrom) return;
		const target = renameTo.trim();
		if (!target || target === renamingFrom) {
			setRenamingFrom(null);
			setRenameTo("");
			return;
		}
		if (!PROFILE_NAME_RE.test(target)) {
			showToast(`${t.profiles.invalidName}: ${t.profiles.nameRule}`, "error");
			return;
		}
		try {
			await api.renameProfile(renamingFrom, target);
			showToast(`${t.profiles.renamed}: ${renamingFrom} → ${target}`, "success");
			setRenamingFrom(null);
			setRenameTo("");
			load();
		} catch (e_1) {
			showToast(`${t.status.error}: ${errorMessage(e_1)}`, "error");
		}
	};
	const handleSetActive = async (name_0) => {
		setSettingActive(name_0);
		try {
			const { active: active_0 } = await api.setActiveProfile(name_0);
			setProfile(active_0);
			showToast(`${L.activeSet}: ${active_0} — ${L.activeSetHint.replace("{name}", active_0)}`, "success");
			setActiveInfo((prev) => prev ? {
				...prev,
				active: active_0
			} : {
				active: active_0,
				current: active_0
			});
		} catch (e_2) {
			showToast(`${t.status.error}: ${errorMessage(e_2)}`, "error");
		} finally {
			setSettingActive(null);
		}
	};
	const closeEditor = (0, import_react.useCallback)(() => {
		activeSoulRequest.current = null;
		activeDescRequest.current = null;
		setEditingModelFor(null);
		setEditingDescFor(null);
		setEditingSoulFor(null);
	}, []);
	const openSoulEditor = (0, import_react.useCallback)(async (name_1) => {
		if (editingSoulFor === name_1) {
			closeEditor();
			return;
		}
		setEditingDescFor(null);
		setEditingModelFor(null);
		setEditingSoulFor(name_1);
		setSoulText("");
		activeSoulRequest.current = name_1;
		try {
			const soul = await api.getProfileSoul(name_1);
			if (activeSoulRequest.current === name_1) setSoulText(soul.content);
		} catch (e_3) {
			if (activeSoulRequest.current === name_1) showToast(`${t.status.error}: ${errorMessage(e_3)}`, "error");
		}
	}, [
		closeEditor,
		editingSoulFor,
		showToast,
		t.status.error
	]);
	const handleSaveSoul = async (name_2) => {
		setSoulSaving(true);
		try {
			await api.updateProfileSoul(name_2, soulText);
			showToast(`${t.profiles.soulSaved}: ${name_2}`, "success");
			activeSoulRequest.current = null;
			setEditingSoulFor(null);
		} catch (e_4) {
			showToast(`${t.status.error}: ${errorMessage(e_4)}`, "error");
		} finally {
			setSoulSaving(false);
		}
	};
	const openDescEditor = (0, import_react.useCallback)((p_1) => {
		if (editingDescFor === p_1.name) {
			closeEditor();
			return;
		}
		activeDescRequest.current = p_1.name;
		setEditingSoulFor(null);
		setEditingModelFor(null);
		setEditingDescFor(p_1.name);
		setDescText(p_1.description ?? "");
	}, [closeEditor, editingDescFor]);
	const handleSaveDesc = async (name_3) => {
		descSavingCount.current += 1;
		setDescSaving(true);
		activeDescRequest.current = name_3;
		try {
			const res_2 = await api.updateProfileDescription(name_3, descText);
			setProfiles((prev_0) => prev_0.map((p_2) => p_2.name === name_3 ? {
				...p_2,
				description: res_2.description,
				description_auto: res_2.description_auto
			} : p_2));
			if (activeDescRequest.current === name_3) {
				showToast(`${L.descriptionSaved}: ${name_3}`, "success");
				setEditingDescFor(null);
			}
		} catch (e_5) {
			if (activeDescRequest.current === name_3) showToast(`${t.status.error}: ${errorMessage(e_5)}`, "error");
		} finally {
			descSavingCount.current -= 1;
			if (descSavingCount.current === 0) setDescSaving(false);
		}
	};
	const handleAutoDescribe = async (name_4) => {
		describingCount.current += 1;
		setDescribing(true);
		activeDescRequest.current = name_4;
		try {
			const res_3 = await api.describeProfileAuto(name_4);
			const current = activeDescRequest.current === name_4;
			if (res_3.ok && res_3.description != null) {
				if (current) setDescText(res_3.description);
				setProfiles((prev_1) => prev_1.map((p_3) => p_3.name === name_4 ? {
					...p_3,
					description: res_3.description ?? "",
					description_auto: res_3.description_auto
				} : p_3));
				if (current) showToast(`${L.descriptionSaved}: ${name_4}`, "success");
			} else if (current) showToast(`${L.describeFailed}: ${res_3.reason}`, "error");
		} catch (e_6) {
			if (activeDescRequest.current === name_4) showToast(`${t.status.error}: ${errorMessage(e_6)}`, "error");
		} finally {
			describingCount.current -= 1;
			if (describingCount.current === 0) setDescribing(false);
		}
	};
	const openModelEditor = (0, import_react.useCallback)((p_4) => {
		if (editingModelFor === p_4.name) {
			closeEditor();
			return;
		}
		setEditingSoulFor(null);
		setEditingDescFor(null);
		setEditingModelFor(p_4.name);
		setModelEditChoice(modelKey(p_4.provider, p_4.model));
		loadModelChoices();
	}, [
		closeEditor,
		editingModelFor,
		loadModelChoices
	]);
	const handleSaveModel = async (name_5) => {
		const picked_0 = modelEditChoice ? modelChoices?.find((c_0) => `${c_0.provider}\u0000${c_0.model}` === modelEditChoice) : void 0;
		if (!picked_0) return;
		setModelSaving(true);
		try {
			await api.setProfileModel(name_5, picked_0.provider, picked_0.model);
			showToast(`${L.modelSaved}: ${picked_0.model}`, "success");
			setProfiles((prev_2) => prev_2.map((p_5) => p_5.name === name_5 ? {
				...p_5,
				model: picked_0.model,
				provider: picked_0.provider
			} : p_5));
			setEditingModelFor(null);
		} catch (e_7) {
			showToast(`${t.status.error}: ${errorMessage(e_7)}`, "error");
		} finally {
			setModelSaving(false);
		}
	};
	const editorName = editingModelFor ?? editingDescFor ?? editingSoulFor;
	const editorKind = editingModelFor ? "model" : editingDescFor ? "desc" : editingSoulFor ? "soul" : null;
	const editorModalRef = useModalBehavior({
		open: editorName != null,
		onClose: closeEditor
	});
	const handleCopyTerminalCommand = async (name_6) => {
		let cmd;
		try {
			cmd = (await api.getProfileSetupCommand(name_6)).command;
		} catch (e_8) {
			showToast(`${t.status.error}: ${errorMessage(e_8)}`, "error");
			return;
		}
		if (await copyTextToClipboard(cmd)) showToast(`${t.profiles.commandCopied}: ${cmd}`, "success");
		else showToast(`${t.profiles.copyFailed}: ${cmd}`, "error");
	};
	const profileDelete = useConfirmDelete({ onDelete: (0, import_react.useCallback)(async (name_7) => {
		try {
			await api.deleteProfile(name_7);
			showToast(`${t.profiles.deleted}: ${name_7}`, "success");
			load();
		} catch (e_9) {
			showToast(`${t.status.error}: ${errorMessage(e_9)}`, "error");
			throw e_9;
		}
	}, [
		load,
		showToast,
		t.profiles.deleted,
		t.status.error
	]) });
	const pendingName = profileDelete.pendingId;
	const pendingProfile = pendingName ? profiles.find((p_6) => p_6.name === pendingName) : void 0;
	const deleteMessage = (() => {
		if (!pendingName) return t.profiles.confirmDeleteMessage;
		const base = t.profiles.confirmDeleteMessage.replace("{name}", pendingName);
		return pendingProfile?.gateway_running ? `${base}\n\n${L.gatewayRunningWarning}` : base;
	})();
	(0, import_react.useLayoutEffect)(() => {
		setEnd(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "uppercase",
				size: "sm",
				outlined: true,
				onClick: () => navigate("/profiles/new"),
				children: "Build"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "uppercase",
				size: "sm",
				onClick: () => setCreateModalOpen(true),
				children: t.common.create
			})]
		}));
		return () => {
			setEnd(null);
		};
	}, [
		setEnd,
		t.common.create,
		loading,
		navigate
	]);
	const cloning_0 = cloneFrom !== null;
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-busy": "true",
		"aria-live": "polite",
		className: "flex items-center justify-center py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: t.common.loading
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilesLoadingSpinner, {})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: profileDelete.isOpen,
				onCancel: profileDelete.cancel,
				onConfirm: profileDelete.confirm,
				title: t.profiles.confirmDeleteTitle,
				description: deleteMessage,
				loading: profileDelete.isDeleting
			}),
			createModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: createModalRef,
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4",
				onClick: (e_10) => e_10.target === e_10.currentTarget && setCreateModalOpen(false),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "create-profile-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("font-mondwest normal-case", "relative w-full max-w-md border border-border bg-card shadow-2xl flex flex-col max-h-[90vh]"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							ghost: true,
							size: "icon",
							onClick: () => setCreateModalOpen(false),
							className: "absolute right-2 top-2 text-muted-foreground hover:text-foreground",
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
							className: "p-5 pb-3 border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "create-profile-title",
								className: "font-mondwest text-display text-base tracking-wider",
								children: t.profiles.newProfile
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-h-0 overflow-y-auto p-5 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "profile-name",
											children: t.profiles.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "profile-name",
											autoFocus: true,
											placeholder: t.profiles.namePlaceholder,
											value: newName,
											onChange: (e_11) => setNewName(e_11.target.value),
											onKeyDown: (e_12) => {
												if (e_12.key === "Enter") handleCreate();
											},
											"aria-invalid": newName.trim() !== "" && !PROFILE_NAME_RE.test(newName.trim())
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: t.profiles.nameRule
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "clone-from",
										children: t.profiles.cloneFrom
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										id: "clone-from",
										value: cloneFrom ?? "",
										onValueChange: (v) => {
											const next = v || null;
											setCloneFrom(next);
											if (next === null) setCloneAll(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
											value: "",
											children: t.profiles.cloneFromNone
										}), profiles.map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
											value: profile.name,
											children: profile.name
										}, profile.name))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "profile-description",
										children: L.descriptionOptional
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "profile-description",
										className: "flex min-h-[64px] w-full border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
										placeholder: L.descriptionPlaceholder,
										value: newDescription,
										onChange: (e_13) => setNewDescription(e_13.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "profile-model",
											children: L.modelOptional
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											id: "profile-model",
											value: modelChoice,
											disabled: modelChoices === null,
											onValueChange: setModelChoice,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
												value: "",
												children: modelChoices === null ? L.modelLoading : L.modelInherit
											}), (modelChoices ?? []).map((c_1) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
												value: `${c_1.provider}\u0000${c_1.model}`,
												children: c_1.label
											}, `${c_1.provider}\u0000${c_1.model}`))]
										}),
										modelChoices !== null && modelChoices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: L.modelNone
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
									className: "grid gap-3 border-t border-border pt-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
											className: "font-mondwest text-display text-xs tracking-wider text-muted-foreground",
											children: L.advancedOptions
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: cloneAll,
												disabled: !cloning_0,
												id: "clone-all",
												onCheckedChange: (checked) => setCloneAll(checked === true)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: cn("font-mondwest normal-case tracking-normal text-sm cursor-pointer", !cloning_0 && "opacity-50"),
												htmlFor: "clone-all",
												children: L.cloneAll
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: noSkills,
												id: "no-skills",
												disabled: cloning_0,
												onCheckedChange: (checked_0) => setNoSkills(checked_0 === true)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: cn("font-mondwest normal-case tracking-normal text-sm cursor-pointer", cloning_0 && "opacity-50"),
												htmlFor: "no-skills",
												children: L.noSkillsOption
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "uppercase",
										size: "sm",
										onClick: handleCreate,
										disabled: creating,
										children: creating ? t.common.creating : t.common.create
									})
								})
							]
						})
					]
				})
			}),
			activeInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-wrap items-center gap-x-4 gap-y-1 py-3 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						L.activeProfile,
						":",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-foreground",
							children: activeInfo.active
						})
					] })]
				}), activeInfo.current !== activeInfo.active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-muted-foreground/80",
					children: [
						"(",
						activeInfo.current,
						")"
					]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
						variant: "sm",
						className: "flex items-center gap-2 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
							t.profiles.allProfiles,
							" (",
							profiles.length,
							")"
						]
					}),
					profiles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: t.profiles.noProfiles
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3",
						children: profiles.map((p_7) => {
							const isRenaming = renamingFrom === p_7.name;
							const isEditingSoul = editingSoulFor === p_7.name;
							const isEditingDesc = editingDescFor === p_7.name;
							const isEditingModel = editingModelFor === p_7.name;
							const active_1 = isActive(p_7);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									className: "flex h-full flex-col gap-2 py-4",
									children: isRenaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												autoFocus: true,
												value: renameTo,
												onChange: (e_14) => setRenameTo(e_14.target.value),
												onKeyDown: (e_15) => {
													if (e_15.key === "Enter") handleRenameSubmit();
													if (e_15.key === "Escape") setRenamingFrom(null);
												},
												"aria-invalid": renameTo.trim() !== "" && renameTo.trim() !== p_7.name && !PROFILE_NAME_RE.test(renameTo.trim())
											}),
											(() => {
												const trimmed = renameTo.trim();
												const invalid = trimmed !== "" && trimmed !== p_7.name && !PROFILE_NAME_RE.test(trimmed);
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: cn("text-xs", invalid ? "text-destructive" : "text-muted-foreground"),
													children: invalid ? `${t.profiles.invalidName}: ${t.profiles.nameRule}` : t.profiles.nameRule
												});
											})(),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													onClick: handleRenameSubmit,
													children: t.common.save
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													ghost: true,
													onClick: () => setRenamingFrom(null),
													children: t.common.cancel
												})]
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-sm truncate",
														children: p_7.display_name?.trim() ? `${p_7.display_name.trim()} (${p_7.name})` : p_7.name
													}),
													active_1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														tone: "success",
														children: L.activeBadge
													}),
													p_7.is_default && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														tone: "secondary",
														children: t.profiles.defaultBadge
													}),
													p_7.has_alias && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														tone: "outline",
														children: L.aliasBadge
													}),
													p_7.has_env && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														tone: "outline",
														children: t.profiles.hasEnv
													}),
													p_7.distribution_name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
														tone: "outline",
														className: "gap-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-3 w-3" }),
															p_7.distribution_name,
															p_7.distribution_version ? `@${p_7.distribution_version}` : ""
														]
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileActionsMenu, {
												isActive: active_1,
												isDefault: p_7.is_default,
												isEditingDesc,
												isEditingModel,
												isEditingSoul,
												settingActive: settingActive === p_7.name,
												labels: {
													actions: L.actions,
													setActive: L.setActive,
													editModel: L.editModel,
													editDescription: L.editDescription,
													editSoul: t.profiles.editSoul,
													manageSkills: L.manageSkills,
													openInTerminal: t.profiles.openInTerminal,
													rename: t.profiles.rename,
													delete: t.common.delete
												},
												onCopyCommand: () => handleCopyTerminalCommand(p_7.name),
												onDelete: () => profileDelete.requestDelete(p_7.name),
												onEditDescription: () => openDescEditor(p_7),
												onEditModel: () => openModelEditor(p_7),
												onEditSoul: () => openSoulEditor(p_7.name),
												onManageSkills: () => navigate(`/skills?profile=${encodeURIComponent(p_7.name)}`),
												onRename: () => {
													setRenamingFrom(p_7.name);
													setRenameTo(p_7.name);
												},
												onSetActive: () => handleSetActive(p_7.name)
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 w-1.5 rounded-full", p_7.gateway_running ? "bg-success" : "bg-muted-foreground/40") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn(p_7.gateway_running ? "text-success" : "text-muted-foreground"),
												children: p_7.gateway_running ? L.gatewayRunning : L.gatewayStopped
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("line-clamp-2", p_7.description ? "text-muted-foreground" : "text-muted-foreground/60 italic"),
												children: p_7.description || L.noDescription
											}), p_7.description && p_7.description_auto && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "warning",
												className: "shrink-0",
												children: L.reviewBadge
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-auto flex flex-col gap-0.5 pt-1 text-xs text-muted-foreground",
											children: [
												p_7.model && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "truncate",
													children: [
														t.profiles.model,
														": ",
														p_7.model,
														p_7.provider ? ` (${p_7.provider})` : ""
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													t.profiles.skills,
													": ",
													p_7.skill_count
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono truncate",
													children: p_7.path
												})
											]
										})
									] })
								})
							}, p_7.name);
						})
					})
				]
			}),
			editorName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: editorModalRef,
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4",
				onClick: (e_16) => e_16.target === e_16.currentTarget && closeEditor(),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "profile-editor-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("font-mondwest normal-case", "relative w-full max-w-lg border border-border bg-card shadow-2xl flex flex-col max-h-[90vh]"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							ghost: true,
							size: "icon",
							onClick: closeEditor,
							className: "absolute right-2 top-2 text-muted-foreground hover:text-foreground",
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
							className: "p-5 pb-3 border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								id: "profile-editor-title",
								className: "font-mondwest text-display text-base tracking-wider",
								children: [editorKind === "model" ? L.editModel : editorKind === "desc" ? L.description : t.profiles.soulSection, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [" · ", editorName]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("p-5 grid gap-4", editorKind === "soul" && "min-h-0 overflow-y-auto"),
							children: [
								editorKind === "model" && (modelChoices !== null && modelChoices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: L.modelNone
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									value: modelEditChoice,
									disabled: modelChoices === null,
									placeholder: modelChoices === null ? L.modelLoading : L.modelSelect,
									onValueChange: setModelEditChoice,
									children: (modelChoices ?? []).map((c_2) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
										value: `${c_2.provider}\u0000${c_2.model}`,
										children: c_2.label
									}, `${c_2.provider}\u0000${c_2.model}`))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: "uppercase",
										onClick: () => handleSaveModel(editorName),
										disabled: modelSaving || !modelChoices?.some((c_3) => `${c_3.provider}\u0000${c_3.model}` === modelEditChoice),
										children: modelSaving ? t.common.saving : t.common.save
									})
								})] })),
								editorKind === "desc" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "profile-desc-editor",
											className: "font-mondwest text-display text-xs tracking-wider text-muted-foreground",
											children: L.description
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											ghost: true,
											className: "gap-1.5",
											disabled: describing,
											onClick: () => handleAutoDescribe(editorName),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), describing ? L.generating : L.autoGenerate]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "profile-desc-editor",
										className: "flex min-h-[96px] w-full border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
										placeholder: L.descriptionPlaceholder,
										value: descText,
										onChange: (e_17) => setDescText(e_17.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											className: "uppercase",
											onClick: () => handleSaveDesc(editorName),
											disabled: descSaving,
											children: descSaving ? t.common.saving : t.common.save
										})
									})
								] }),
								editorKind === "soul" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "profile-soul-editor",
										className: "font-mondwest text-display text-xs tracking-wider text-muted-foreground",
										children: t.profiles.soulSection
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "profile-soul-editor",
										className: "flex min-h-[280px] w-full border border-input bg-transparent px-3 py-2 text-sm font-mono shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
										placeholder: t.profiles.soulPlaceholder,
										value: soulText,
										onChange: (e_18) => setSoulText(e_18.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											className: "uppercase",
											onClick: () => handleSaveSoul(editorName),
											disabled: soulSaving,
											children: soulSaving ? t.common.saving : t.common.save
										})
									})
								] })
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { ProfilesPage as default };
