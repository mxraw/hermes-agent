import { n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { F as RotateCcw, Gt as CircleAlert } from "./vendor-DkbdVxWs.js";
import { B as Button, m as Card } from "./ui-vIdGzE07.js";
import { t as cn } from "./utils-XzxpPQdK.js";
import { i as en, r as useI18n } from "./i18n-Zn9FHQtI.js";
//#region web/src/lib/load-error-copy.ts
var import_compiler_runtime = require_compiler_runtime();
/** Fill the `{what}` / `{detail}` placeholders of the "could not load" card copy.
*  Kept out of the component so the copy shape is testable without rendering. */
function loadErrorCopy(t, what, detail) {
	const loadFailed = t.loadFailed ?? en.common.loadFailed;
	const loadFailedDetails = t.loadFailedDetails ?? en.common.loadFailedDetails;
	return {
		title: loadFailed.replace("{what}", what),
		details: detail ? loadFailedDetails.replace("{detail}", detail) : null
	};
}
//#endregion
//#region web/src/components/LoadErrorNotice.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Persistent "could not load X" card with a Retry button. Used instead of an
* error toast for page loaders: a toast vanishes after 3s and cannot carry a
* retry action, so the user was left with an empty page and no next step.
*/
function LoadErrorNotice(t0) {
	const $ = (0, import_compiler_runtime.c)(22);
	const { what, detail, onRetry, className } = t0;
	const { t } = useI18n();
	let t1;
	if ($[0] !== detail || $[1] !== t.common || $[2] !== what) {
		t1 = loadErrorCopy(t.common, what, detail);
		$[0] = detail;
		$[1] = t.common;
		$[2] = what;
		$[3] = t1;
	} else t1 = $[3];
	const copy = t1;
	let t2;
	if ($[4] !== className) {
		t2 = cn("flex items-start gap-2 border-destructive/40 bg-destructive/5 px-3 py-2 text-xs", className);
		$[4] = className;
		$[5] = t2;
	} else t2 = $[5];
	let t3;
	if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" });
		$[6] = t3;
	} else t3 = $[6];
	let t4;
	if ($[7] !== copy.title) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-destructive",
			children: copy.title
		});
		$[7] = copy.title;
		$[8] = t4;
	} else t4 = $[8];
	let t5;
	if ($[9] !== copy.details) {
		t5 = copy.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5 text-muted-foreground",
			children: copy.details
		});
		$[9] = copy.details;
		$[10] = t5;
	} else t5 = $[10];
	let t6;
	if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" });
		$[11] = t6;
	} else t6 = $[11];
	let t7;
	if ($[12] !== onRetry || $[13] !== t.common.retry) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			outlined: true,
			className: "mt-1",
			onClick: onRetry,
			prefix: t6,
			children: t.common.retry
		});
		$[12] = onRetry;
		$[13] = t.common.retry;
		$[14] = t7;
	} else t7 = $[14];
	let t8;
	if ($[15] !== t4 || $[16] !== t5 || $[17] !== t7) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				t4,
				t5,
				t7
			]
		});
		$[15] = t4;
		$[16] = t5;
		$[17] = t7;
		$[18] = t8;
	} else t8 = $[18];
	let t9;
	if ($[19] !== t2 || $[20] !== t8) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			role: "alert",
			className: t2,
			children: [t3, t8]
		});
		$[19] = t2;
		$[20] = t8;
		$[21] = t9;
	} else t9 = $[21];
	return t9;
}
//#endregion
export { LoadErrorNotice as t };
