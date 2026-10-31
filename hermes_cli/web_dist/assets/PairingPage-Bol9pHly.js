import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { T as ShieldCheck, Yt as Check, g as Trash2, r as X, u as Users } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, L as Spinner, a as H2, b as useConfirmDelete, h as CardContent, m as Card, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
import { t as DeleteConfirmDialog } from "./DeleteConfirmDialog-CS54bGFr.js";
//#region web/src/pages/PairingPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function getUserKey(user) {
	return `${user.platform}:${user.user_id}`;
}
function splitUserKey(key) {
	const idx = key.indexOf(":");
	if (idx === -1) return {
		platform: "",
		user_id: key
	};
	return {
		platform: key.slice(0, idx),
		user_id: key.slice(idx + 1)
	};
}
function getUserLabel(user) {
	return user.user_name || user.user_id;
}
function PairingPage() {
	const [pending, setPending] = (0, import_react.useState)([]);
	const [approved, setApproved] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [approving, setApproving] = (0, import_react.useState)(null);
	const [clearing, setClearing] = (0, import_react.useState)(false);
	const { toast, showToast } = useToast();
	const { setEnd } = usePageHeader();
	const loadPairing = (0, import_react.useCallback)(() => {
		api.getPairing().then((res) => {
			setPending(res.pending);
			setApproved(res.approved);
		}).catch(() => showToast("Failed to load pairing requests", "error")).finally(() => setLoading(false));
	}, [showToast]);
	(0, import_react.useEffect)(() => {
		loadPairing();
	}, [loadPairing]);
	const handleApprove = async (user) => {
		if (!user.request_id) {
			showToast("Missing pairing request", "error");
			return;
		}
		const key = getUserKey(user);
		setApproving(key);
		try {
			await api.approvePairing(user.platform, user.request_id);
			showToast(`Approved: "${getUserLabel(user)}"`, "success");
			loadPairing();
		} catch (e) {
			showToast(`Could not approve the pairing request: ${errorMessage(e)}`, "error");
		} finally {
			setApproving(null);
		}
	};
	const handleClearPending = async () => {
		if (!window.confirm("Clear all pending pairing requests?")) return;
		setClearing(true);
		try {
			const res = await api.clearPendingPairing();
			showToast(`Cleared ${res.cleared} pending request(s)`, "success");
			loadPairing();
		} catch (e) {
			showToast(`Could not clear pending requests: ${errorMessage(e)}`, "error");
		} finally {
			setClearing(false);
		}
	};
	const userRevoke = useConfirmDelete({ onDelete: (0, import_react.useCallback)(async (key) => {
		const { platform, user_id } = splitUserKey(key);
		const user = approved.find((u) => getUserKey(u) === key);
		try {
			await api.revokePairing(platform, user_id);
			showToast(`Revoked: "${user ? getUserLabel(user) : user_id}"`, "success");
			loadPairing();
		} catch (e) {
			showToast(`Could not revoke access: ${errorMessage(e)}`, "error");
			throw e;
		}
	}, [
		approved,
		loadPairing,
		showToast
	]) });
	(0, import_react.useLayoutEffect)(() => {
		setEnd(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "uppercase",
			size: "sm",
			onClick: handleClearPending,
			disabled: clearing,
			prefix: clearing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }),
			children: "Clear pending"
		}));
		return () => {
			setEnd(null);
		};
	}, [setEnd, clearing]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-2xl text-primary" })
	});
	const pendingRevokeUser = userRevoke.pendingId ? approved.find((u) => getUserKey(u) === userRevoke.pendingId) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: userRevoke.isOpen,
				onCancel: userRevoke.cancel,
				onConfirm: userRevoke.confirm,
				title: "Revoke access",
				description: pendingRevokeUser ? `"${getUserLabel(pendingRevokeUser)}" will lose access. This cannot be undone.` : "This user will lose access. This cannot be undone.",
				confirmLabel: "Revoke",
				loading: userRevoke.isDeleting
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
						variant: "sm",
						className: "flex items-center gap-2 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
							"Pending requests (",
							pending.length,
							")"
						]
					}),
					pending.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "No pending pairing requests"
					}) }),
					pending.map((user) => {
						const key = getUserKey(user);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "flex items-start gap-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "outline",
										children: user.platform
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-sm truncate",
										children: getUserLabel(user)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: user.user_id
									}), typeof user.age_minutes === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [user.age_minutes, "m ago"] })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: "uppercase",
									onClick: () => handleApprove(user),
									disabled: approving === key || !user.request_id,
									prefix: approving === key ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }),
									children: "Approve"
								})
							})]
						}) }, key);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
						variant: "sm",
						className: "flex items-center gap-2 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }),
							"Approved users (",
							approved.length,
							")"
						]
					}),
					approved.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "py-8 text-center text-sm text-muted-foreground",
						children: "No approved users"
					}) }),
					approved.map((user) => {
						const key = getUserKey(user);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "flex items-start gap-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "outline",
										children: user.platform
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-sm truncate",
										children: user.user_id
									})]
								}), user.user_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground truncate",
									children: user.user_name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									ghost: true,
									size: "icon",
									title: "Revoke",
									"aria-label": "Revoke",
									className: "text-destructive",
									onClick: () => userRevoke.requestDelete(key),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
								})
							})]
						}) }, key);
					})
				]
			})
		]
	});
}
//#endregion
export { PairingPage as default };
