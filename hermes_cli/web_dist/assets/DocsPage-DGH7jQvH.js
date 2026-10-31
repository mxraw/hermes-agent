import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { jt as ExternalLink } from "./vendor-DkbdVxWs.js";
import { t as cn } from "./utils-XzxpPQdK.js";
import { r as useI18n } from "./i18n-Zn9FHQtI.js";
import { u as PluginSlot } from "./index-CeRydpmd.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
//#region web/src/pages/DocsPage.tsx
var import_compiler_runtime = require_compiler_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var HERMES_DOCS_URL = "https://hermes-agent.nousresearch.com/docs/";
var DS_BUTTON_OUTLINED_LINK_CN = cn("group relative inline-grid grid-cols-[auto_1fr_auto] items-center", "px-[.9em_.75em] py-[1.25em] gap-2", "leading-0 font-bold tracking-[0.2em] uppercase", "text-midground bg-transparent shadow-midground", "shadow-[inset_-1px_-1px_0_0_#00000080,inset_1px_1px_0_0_#ffffff80]");
function DocsPage() {
	const $ = (0, import_compiler_runtime.c)(14);
	const { t } = useI18n();
	const { setEnd } = usePageHeader();
	let t0;
	if ($[0] !== setEnd || $[1] !== t.app.openDocumentation) {
		t0 = () => {
			setEnd(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: HERMES_DOCS_URL,
				target: "_blank",
				rel: "noopener noreferrer",
				className: DS_BUTTON_OUTLINED_LINK_CN,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), t.app.openDocumentation]
			}));
			return () => {
				setEnd(null);
			};
		};
		$[0] = setEnd;
		$[1] = t.app.openDocumentation;
		$[2] = t0;
	} else t0 = $[2];
	let t1;
	if ($[3] !== setEnd || $[4] !== t) {
		t1 = [setEnd, t];
		$[3] = setEnd;
		$[4] = t;
		$[5] = t1;
	} else t1 = $[5];
	(0, import_react.useLayoutEffect)(t0, t1);
	let t2;
	let t3;
	if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = cn("flex min-h-0 w-full min-w-0 flex-1 flex-col", "pt-1 sm:pt-2");
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "docs:top" });
		$[6] = t2;
		$[7] = t3;
	} else {
		t2 = $[6];
		t3 = $[7];
	}
	const t4 = t.app.nav.documentation;
	let t5;
	if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
		t5 = cn("min-h-0 w-full min-w-0 flex-1", "rounded-sm border border-current/20", "[color-scheme:light] bg-white");
		$[8] = t5;
	} else t5 = $[8];
	let t6;
	if ($[9] !== t.app.nav.documentation) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			title: t4,
			src: HERMES_DOCS_URL,
			className: t5,
			sandbox: "allow-scripts allow-same-origin allow-popups allow-forms",
			referrerPolicy: "no-referrer-when-downgrade"
		});
		$[9] = t.app.nav.documentation;
		$[10] = t6;
	} else t6 = $[10];
	let t7;
	if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "docs:bottom" });
		$[11] = t7;
	} else t7 = $[11];
	let t8;
	if ($[12] !== t6) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t2,
			children: [
				t3,
				t6,
				t7
			]
		});
		$[12] = t6;
		$[13] = t8;
	} else t8 = $[13];
	return t8;
}
//#endregion
export { HERMES_DOCS_URL, DocsPage as default };
