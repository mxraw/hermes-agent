import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react } from "./react-vendor-KEpZRUr8.js";
import { m as PageHeaderContext } from "./index-CeRydpmd.js";
//#region web/src/contexts/usePageHeader.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Fill header slots from `useLayoutEffect` and clear them in its cleanup. A
* `useEffect` cleanup on the outgoing page runs after the incoming page's
* layout effects, so it would erase the new page's header.
*/
function usePageHeader() {
	const ctx = (0, import_react.useContext)(PageHeaderContext);
	if (!ctx) throw new Error("usePageHeader must be used within a PageHeaderProvider");
	return ctx;
}
//#endregion
export { usePageHeader as t };
