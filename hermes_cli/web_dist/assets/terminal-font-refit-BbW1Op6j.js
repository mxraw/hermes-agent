//#region web/src/lib/terminal-font-refit.ts
/**
* Dashboard xterm font stack. 'JetBrains Mono' is bundled via @font-face in
* index.css with `font-display: swap`, so it is usually still downloading
* when a terminal first opens.
*/
var TERMINAL_FONT_FAMILY = "'JetBrains Mono', 'Cascadia Mono', 'Fira Code', 'MesloLGS NF', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace";
var BUNDLED_FACES = [
	"400",
	"700",
	"italic 400"
].map((descriptor) => `${descriptor} 1em 'JetBrains Mono'`);
function browserFontSet() {
	return typeof document === "undefined" ? void 0 : document.fonts;
}
/**
* xterm measures its cell size once at open() and afterwards only when
* fontFamily/fontSize *change* or the grid resizes. When the bundled font
* swaps in later, the grid keeps fallback-font metrics (and the WebGL atlas
* keeps fallback glyphs) until something resizes the host, e.g. toggling the
* sidebar (#92899). Once the bundled faces load, force a re-measure, refit,
* and redraw. Returns a cleanup that drops a still-pending load.
*/
function refitWhenTerminalFontLoads(term, fit, fontSet = browserFontSet()) {
	if (!fontSet?.load) return () => void 0;
	try {
		if (BUNDLED_FACES.every((face) => fontSet.check(face))) return () => void 0;
	} catch {}
	let cancelled = false;
	Promise.allSettled(BUNDLED_FACES.map((face) => Promise.resolve().then(() => fontSet.load(face)))).then((results) => {
		if (cancelled) return;
		if (!results.some((r) => r.status === "fulfilled" && r.value.length > 0)) return;
		const family = term.options.fontFamily ?? "'JetBrains Mono', 'Cascadia Mono', 'Fira Code', 'MesloLGS NF', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace";
		term.options.fontFamily = "monospace";
		term.options.fontFamily = family;
		fit();
		term.clearTextureAtlas();
		if (term.rows > 0) term.refresh(0, term.rows - 1);
	});
	return () => {
		cancelled = true;
	};
}
//#endregion
export { refitWhenTerminalFontLoads as n, TERMINAL_FONT_FAMILY as t };
