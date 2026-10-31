import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, n as require_compiler_runtime } from "./react-vendor-KEpZRUr8.js";
//#region web/src/hooks/useModalBehavior.ts
var import_compiler_runtime = require_compiler_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Hook that adds standard modal behaviors when `open` is true:
* - Escape key calls `onClose`
* - Body scroll is locked
* - Focus is restored to the previously focused element on close
*
* Returns a ref to attach to the modal container (for optional future focus trapping).
*/
function useModalBehavior(t0) {
	const $ = (0, import_compiler_runtime.c)(4);
	const { open, onClose } = t0;
	const containerRef = (0, import_react.useRef)(null);
	let t1;
	let t2;
	if ($[0] !== onClose || $[1] !== open) {
		t1 = () => {
			if (!open) return;
			const prevActive = document.activeElement;
			const onKey = (e) => {
				if (e.key === "Escape") {
					e.preventDefault();
					onClose();
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
		};
		t2 = [open, onClose];
		$[0] = onClose;
		$[1] = open;
		$[2] = t1;
		$[3] = t2;
	} else {
		t1 = $[2];
		t2 = $[3];
	}
	(0, import_react.useEffect)(t1, t2);
	return containerRef;
}
//#endregion
export { useModalBehavior as t };
