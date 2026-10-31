import { n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { I as ConfirmDialog } from "./ui-vIdGzE07.js";
import { r as useI18n } from "./i18n-Zn9FHQtI.js";
//#region web/src/components/DeleteConfirmDialog.tsx
var import_compiler_runtime = require_compiler_runtime();
var import_jsx_runtime = require_jsx_runtime();
function DeleteConfirmDialog(t0) {
	const $ = (0, import_compiler_runtime.c)(9);
	const { cancelLabel, confirmLabel, description, loading, onCancel, onConfirm, open, title } = t0;
	const { t } = useI18n();
	const t1 = confirmLabel ?? t.common.delete;
	const t2 = cancelLabel ?? t.common.cancel;
	let t3;
	if ($[0] !== description || $[1] !== loading || $[2] !== onCancel || $[3] !== onConfirm || $[4] !== open || $[5] !== t1 || $[6] !== t2 || $[7] !== title) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open,
			onCancel,
			onConfirm,
			title,
			description,
			loading,
			destructive: true,
			confirmLabel: t1,
			cancelLabel: t2
		});
		$[0] = description;
		$[1] = loading;
		$[2] = onCancel;
		$[3] = onConfirm;
		$[4] = open;
		$[5] = t1;
		$[6] = t2;
		$[7] = title;
		$[8] = t3;
	} else t3 = $[8];
	return t3;
}
//#endregion
export { DeleteConfirmDialog as t };
