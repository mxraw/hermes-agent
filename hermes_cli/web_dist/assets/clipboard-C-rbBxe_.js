//#region web/src/lib/clipboard.ts
async function copyTextToClipboard(text) {
	const clipboard = typeof navigator === "undefined" ? void 0 : navigator.clipboard;
	if ((typeof window === "undefined" ? true : window.isSecureContext) && clipboard?.writeText) try {
		await clipboard.writeText(text);
		return true;
	} catch {}
	if (typeof document === "undefined") return false;
	const textarea = document.createElement("textarea");
	textarea.value = text;
	textarea.setAttribute("readonly", "");
	textarea.style.position = "fixed";
	textarea.style.top = "-1000px";
	textarea.style.left = "-1000px";
	textarea.style.opacity = "0";
	document.body.appendChild(textarea);
	const selection = document.getSelection();
	const ranges = [];
	if (selection) for (let i = 0; i < selection.rangeCount; i += 1) ranges.push(selection.getRangeAt(i));
	textarea.focus();
	textarea.select();
	textarea.setSelectionRange(0, textarea.value.length);
	let copied = false;
	try {
		copied = document.execCommand("copy");
	} catch {
		copied = false;
	} finally {
		document.body.removeChild(textarea);
		if (selection) {
			selection.removeAllRanges();
			for (const range of ranges) selection.addRange(range);
		}
	}
	return copied;
}
//#endregion
export { copyTextToClipboard as t };
