import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, m as require_react_dom, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { m as TriangleAlert } from "./vendor-DkbdVxWs.js";
import { B as Button } from "./ui-vIdGzE07.js";
import { r as themedBody, t as cn } from "./utils-XzxpPQdK.js";
//#region web/src/components/ConfirmDialog.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ConfirmDialog({ cancelLabel = "Cancel", confirmLabel = "Confirm", description, destructive = false, loading = false, onCancel, onConfirm, open, title }) {
	const dialogRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prevActive = document.activeElement;
		dialogRef.current?.querySelector("[data-confirm]")?.focus();
		const onKey = (e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onCancel();
			}
		};
		document.addEventListener("keydown", onKey);
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prevOverflow;
			prevActive?.focus?.();
		};
	}, [open, onCancel]);
	if (!open) return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "confirm-dialog-title",
		"aria-describedby": description ? "confirm-dialog-desc" : void 0,
		onClick: (e_0) => {
			if (e_0.target === e_0.currentTarget) onCancel();
		},
		className: "fixed inset-0 z-[200] flex items-center justify-center bg-background/85 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: dialogRef,
			className: cn(themedBody, "relative w-full max-w-md border border-border bg-card shadow-2xl"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 p-4 border-b border-border",
				children: [destructive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "mt-0.5 shrink-0 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0 flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "confirm-dialog-title",
						className: "font-mondwest text-display text-base tracking-wider",
						children: title
					}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "confirm-dialog-desc",
						className: "text-xs text-muted-foreground leading-relaxed whitespace-pre-line",
						children: description
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-end gap-2 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					outlined: true,
					onClick: onCancel,
					disabled: loading,
					children: cancelLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					"data-confirm": true,
					type: "button",
					destructive,
					onClick: onConfirm,
					disabled: loading,
					children: loading ? "…" : confirmLabel
				})]
			})]
		})
	}), document.body);
}
//#endregion
export { ConfirmDialog as t };
