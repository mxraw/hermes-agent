import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { f as useNavigate, h as require_react, n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { Ft as Download, H as PowerOff, Ht as Clock, Jt as ChevronDown, K as Play, Kt as ChevronRight, Lt as Database, Mt as Eraser, R as Radio, Wt as CircleCheck, Yt as Check, _t as Hash, a as Wifi, at as MessageCircle, d as Upload, g as Trash2, in as Archive, j as Search, m as TriangleAlert, o as WifiOff, q as Pencil, qt as ChevronLeft, r as X, rt as MessageSquare, ut as ListFilter, v as Terminal, yt as Globe } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, D as DialogHeader, E as DialogFooter, L as Spinner, O as DialogTitle, S as Dialog, T as DialogDescription, _ as CardHeader, b as useConfirmDelete, h as CardContent, i as Segmented, j as ListItem, k as Checkbox, m as Card, p as Input, v as CardTitle, w as DialogContent, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { i as timeAgo, n as isoTimeAgo } from "./utils-XzxpPQdK.js";
import { r as useI18n } from "./i18n-Zn9FHQtI.js";
import { l as apiErrorFromResponse, n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { f as useSystemActions, l as isDashboardEmbeddedChatEnabled, u as PluginSlot } from "./index-CeRydpmd.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
import { t as DeleteConfirmDialog } from "./DeleteConfirmDialog-CS54bGFr.js";
//#region web/src/lib/session-prune.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_compiler_runtime = require_compiler_runtime();
function formatSessionPruneResult(result) {
	const removed = `Pruned ${result.removed} session${result.removed === 1 ? "" : "s"}`;
	if (!result.skipped_open) return removed;
	return `${removed}. Skipped ${result.skipped_open} open session${result.skipped_open === 1 ? "" : "s"}; prune only removes ended sessions.`;
}
//#endregion
//#region web/src/lib/session-refresh.ts
/**
* Decide whether the paginated sessions list should be silently
* re-fetched after an overview poll.
*
* The dashboard's FastAPI server and a terminal CLI are separate
* processes that share the same SQLite session DB. There is no
* inter-process push channel, so the Sessions page polls the 50 newest
* sessions every few seconds (the "overview" poll). When that poll
* surfaces a session id at the head of the list that we have not seen
* before, a new session was created in another process and the
* paginated list is stale — refresh it.
*
* Returns false on the very first poll (no baseline yet) and when
* either id is null (empty DB / transient empty response), so we never
* trigger a spurious reload on mount or while the DB is empty.
*/
function shouldRefreshSessions(prevNewestId, currentNewestId) {
	return prevNewestId !== null && currentNewestId !== null && prevNewestId !== currentNewestId;
}
//#endregion
//#region web/src/lib/session-import.ts
function normalizeImportSessions(value) {
	const candidate = value && typeof value === "object" && !Array.isArray(value) && Array.isArray(value.sessions) ? value.sessions : Array.isArray(value) ? value : [value];
	const sessions = candidate.filter((item) => !!item && typeof item === "object" && !Array.isArray(item));
	if (sessions.length !== candidate.length) throw new Error("Expected exported session JSON or JSONL");
	return sessions;
}
function parseImportSessions(text) {
	const trimmed = text.trim();
	if (!trimmed) throw new Error("File is empty");
	try {
		return normalizeImportSessions(JSON.parse(trimmed));
	} catch (jsonError) {
		const lines = trimmed.split(/\r?\n/).filter((line) => line.trim());
		if (lines.length <= 1) throw jsonError;
		return normalizeImportSessions(lines.map((line) => JSON.parse(line)));
	}
}
function importSummary(result) {
	const parts = [`${result.imported} imported`];
	if (result.skipped > 0) parts.push(`${result.skipped} skipped`);
	if (result.detached > 0) parts.push(`${result.detached} detached from missing parents`);
	return parts.join("; ");
}
//#endregion
//#region web/src/components/Markdown.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Lightweight markdown renderer for LLM output.
* Handles: code blocks, inline code, bold, italic, headers, links, lists, horizontal rules.
* NOT a full CommonMark parser — optimized for typical assistant message patterns.
*
* `streaming` renders a blinking caret at the tail of the last block so it
* appears to hug the final character instead of wrapping onto a new line
* after a block element (paragraph/list/code/…).
*/
function Markdown(t0) {
	const $ = (0, import_compiler_runtime.c)(15);
	const { content, highlightTerms, streaming } = t0;
	let t1;
	if ($[0] !== content) {
		t1 = parseBlocks(content);
		$[0] = content;
		$[1] = t1;
	} else t1 = $[1];
	const blocks = t1;
	let t2;
	if ($[2] !== streaming) {
		t2 = streaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreamingCaret, {}) : null;
		$[2] = streaming;
		$[3] = t2;
	} else t2 = $[3];
	const caret = t2;
	let t3;
	if ($[4] !== blocks || $[5] !== caret || $[6] !== highlightTerms) {
		let t4;
		if ($[8] !== blocks.length || $[9] !== caret || $[10] !== highlightTerms) {
			t4 = (block, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				block,
				highlightTerms,
				caret: caret && i === blocks.length - 1 ? caret : null
			}, i);
			$[8] = blocks.length;
			$[9] = caret;
			$[10] = highlightTerms;
			$[11] = t4;
		} else t4 = $[11];
		t3 = blocks.map(t4);
		$[4] = blocks;
		$[5] = caret;
		$[6] = highlightTerms;
		$[7] = t3;
	} else t3 = $[7];
	const t4 = blocks.length === 0 && caret;
	let t5;
	if ($[12] !== t3 || $[13] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-sm text-foreground leading-relaxed space-y-2",
			children: [t3, t4]
		});
		$[12] = t3;
		$[13] = t4;
		$[14] = t5;
	} else t5 = $[14];
	return t5;
}
function StreamingCaret() {
	const $ = (0, import_compiler_runtime.c)(1);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "inline-block w-[0.5em] h-[1em] ml-0.5 align-[-0.15em] bg-foreground/50 animate-pulse"
		});
		$[0] = t0;
	} else t0 = $[0];
	return t0;
}
function parseBlocks(text) {
	const lines = text.split("\n");
	const blocks = [];
	let i = 0;
	while (i < lines.length) {
		const line = lines[i];
		const fenceMatch = line.match(/^```(\w*)/);
		if (fenceMatch) {
			const lang = fenceMatch[1] || "";
			const codeLines = [];
			i++;
			while (i < lines.length && !lines[i].startsWith("```")) {
				codeLines.push(lines[i]);
				i++;
			}
			i++;
			blocks.push({
				type: "code",
				lang,
				content: codeLines.join("\n")
			});
			continue;
		}
		const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
		if (headingMatch) {
			blocks.push({
				type: "heading",
				level: headingMatch[1].length,
				content: headingMatch[2]
			});
			i++;
			continue;
		}
		if (/^[-*_]{3,}\s*$/.test(line)) {
			blocks.push({ type: "hr" });
			i++;
			continue;
		}
		if (/^[-*+]\s/.test(line)) {
			const items = [];
			while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
				items.push(lines[i].replace(/^[-*+]\s/, ""));
				i++;
			}
			blocks.push({
				type: "list",
				ordered: false,
				items
			});
			continue;
		}
		if (/^\d+[.)]\s/.test(line)) {
			const items = [];
			while (i < lines.length && /^\d+[.)]\s/.test(lines[i])) {
				items.push(lines[i].replace(/^\d+[.)]\s/, ""));
				i++;
			}
			blocks.push({
				type: "list",
				ordered: true,
				items
			});
			continue;
		}
		if (line.trim() === "") {
			i++;
			continue;
		}
		const paraLines = [];
		while (i < lines.length && lines[i].trim() !== "" && !lines[i].match(/^```/) && !lines[i].match(/^#{1,4}\s/) && !lines[i].match(/^[-*+]\s/) && !lines[i].match(/^\d+[.)]\s/) && !lines[i].match(/^[-*_]{3,}\s*$/)) {
			paraLines.push(lines[i]);
			i++;
		}
		if (paraLines.length > 0) blocks.push({
			type: "paragraph",
			content: paraLines.join("\n")
		});
	}
	return blocks;
}
function Block(t0) {
	const $ = (0, import_compiler_runtime.c)(34);
	const { block, highlightTerms, caret } = t0;
	switch (block.type) {
		case "code": {
			let t1;
			if ($[0] !== block.content || $[1] !== caret) {
				t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "bg-secondary/60 border border-border px-3 py-2.5 text-xs font-mono leading-relaxed overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", { children: [block.content, caret] })
				});
				$[0] = block.content;
				$[1] = caret;
				$[2] = t1;
			} else t1 = $[2];
			return t1;
		}
		case "heading": {
			const Tag_0 = `h${Math.min(block.level, 4)}`;
			let t1;
			if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
				t1 = {
					h1: "text-base font-bold",
					h2: "text-sm font-bold",
					h3: "text-sm font-semibold",
					h4: "text-sm font-medium"
				};
				$[3] = t1;
			} else t1 = $[3];
			const t2 = t1[Tag_0];
			let t3;
			if ($[4] !== block.content || $[5] !== highlightTerms) {
				t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineContent, {
					text: block.content,
					highlightTerms
				});
				$[4] = block.content;
				$[5] = highlightTerms;
				$[6] = t3;
			} else t3 = $[6];
			let t4;
			if ($[7] !== Tag_0 || $[8] !== caret || $[9] !== t2 || $[10] !== t3) {
				t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tag_0, {
					className: t2,
					children: [t3, caret]
				});
				$[7] = Tag_0;
				$[8] = caret;
				$[9] = t2;
				$[10] = t3;
				$[11] = t4;
			} else t4 = $[11];
			return t4;
		}
		case "hr": {
			let t1;
			if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
				t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-border" });
				$[12] = t1;
			} else t1 = $[12];
			let t2;
			if ($[13] !== caret) {
				t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [t1, caret] });
				$[13] = caret;
				$[14] = t2;
			} else t2 = $[14];
			return t2;
		}
		case "list": {
			const Tag = block.ordered ? "ol" : "ul";
			const last = block.items.length - 1;
			const t1 = `space-y-0.5 ${block.ordered ? "list-decimal" : "list-disc"} pl-5 text-sm`;
			let t2;
			if ($[15] !== block.items || $[16] !== caret || $[17] !== highlightTerms || $[18] !== last) {
				let t3;
				if ($[20] !== caret || $[21] !== highlightTerms || $[22] !== last) {
					t3 = (item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineContent, {
						text: item,
						highlightTerms
					}), i === last ? caret : null] }, i);
					$[20] = caret;
					$[21] = highlightTerms;
					$[22] = last;
					$[23] = t3;
				} else t3 = $[23];
				t2 = block.items.map(t3);
				$[15] = block.items;
				$[16] = caret;
				$[17] = highlightTerms;
				$[18] = last;
				$[19] = t2;
			} else t2 = $[19];
			let t3;
			if ($[24] !== Tag || $[25] !== t1 || $[26] !== t2) {
				t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					className: t1,
					children: t2
				});
				$[24] = Tag;
				$[25] = t1;
				$[26] = t2;
				$[27] = t3;
			} else t3 = $[27];
			return t3;
		}
		case "paragraph": {
			let t1;
			if ($[28] !== block.content || $[29] !== highlightTerms) {
				t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineContent, {
					text: block.content,
					highlightTerms
				});
				$[28] = block.content;
				$[29] = highlightTerms;
				$[30] = t1;
			} else t1 = $[30];
			let t2;
			if ($[31] !== caret || $[32] !== t1) {
				t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [t1, caret] });
				$[31] = caret;
				$[32] = t1;
				$[33] = t2;
			} else t2 = $[33];
			return t2;
		}
	}
}
function parseInline(text) {
	const nodes = [];
	const pattern = /(`[^`]+`)|(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\bhttps?:\/\/[^\s<>)\]]+)|(\n)/g;
	let lastIndex = 0;
	let match;
	while ((match = pattern.exec(text)) !== null) {
		if (match.index > lastIndex) nodes.push({
			type: "text",
			content: text.slice(lastIndex, match.index)
		});
		if (match[1]) nodes.push({
			type: "code",
			content: match[1].slice(1, -1)
		});
		else if (match[2]) nodes.push({
			type: "link",
			text: match[3],
			href: match[4]
		});
		else if (match[5]) nodes.push({
			type: "bold",
			content: match[6]
		});
		else if (match[7]) nodes.push({
			type: "italic",
			content: match[8]
		});
		else if (match[9]) nodes.push({
			type: "link",
			text: match[9],
			href: match[9]
		});
		else if (match[10]) nodes.push({ type: "br" });
		lastIndex = match.index + match[0].length;
	}
	if (lastIndex < text.length) nodes.push({
		type: "text",
		content: text.slice(lastIndex)
	});
	return nodes;
}
function InlineContent(t0) {
	const $ = (0, import_compiler_runtime.c)(9);
	const { text, highlightTerms } = t0;
	let t1;
	if ($[0] !== text) {
		t1 = parseInline(text);
		$[0] = text;
		$[1] = t1;
	} else t1 = $[1];
	const nodes = t1;
	let t2;
	if ($[2] !== highlightTerms || $[3] !== nodes) {
		let t3;
		if ($[5] !== highlightTerms) {
			t3 = (node, i) => {
				switch (node.type) {
					case "text": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightedText, {
						text: node.content,
						terms: highlightTerms
					}, i);
					case "code": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "bg-secondary/60 px-1.5 py-0.5 text-xs font-mono text-primary/90",
						children: node.content
					}, i);
					case "bold": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "font-semibold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightedText, {
							text: node.content,
							terms: highlightTerms
						})
					}, i);
					case "italic": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightedText, {
						text: node.content,
						terms: highlightTerms
					}) }, i);
					case "link": {
						const href = node.href.trim();
						if (!/^(https?:|mailto:)/i.test(href)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HighlightedText, {
							text: node.text,
							terms: highlightTerms
						}, i);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href,
							target: "_blank",
							rel: "noreferrer",
							className: "text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary/60 transition-colors",
							children: node.text
						}, i);
					}
					case "br": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}, i);
				}
			};
			$[5] = highlightTerms;
			$[6] = t3;
		} else t3 = $[6];
		t2 = nodes.map(t3);
		$[2] = highlightTerms;
		$[3] = nodes;
		$[4] = t2;
	} else t2 = $[4];
	let t3;
	if ($[7] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t2 });
		$[7] = t2;
		$[8] = t3;
	} else t3 = $[8];
	return t3;
}
/** Highlight search terms within a plain text string. */
function HighlightedText(t0) {
	const $ = (0, import_compiler_runtime.c)(7);
	const { text, terms } = t0;
	if (!terms || terms.length === 0) {
		let t1;
		if ($[0] !== text) {
			t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: text });
			$[0] = text;
			$[1] = t1;
		} else t1 = $[1];
		return t1;
	}
	let t1;
	if ($[2] !== terms || $[3] !== text) {
		const escaped = terms.map(_temp$1);
		const regex = new RegExp(`(${escaped.join("|")})`, "gi");
		t1 = text.split(regex).map((part, i) => regex.test(part) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
			className: "bg-warning/30 text-warning px-0.5",
			children: part
		}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, i));
		$[2] = terms;
		$[3] = text;
		$[4] = t1;
	} else t1 = $[4];
	let t2;
	if ($[5] !== t1) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: t1 });
		$[5] = t1;
		$[6] = t2;
	} else t2 = $[6];
	return t2;
}
function _temp$1(t) {
	return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//#endregion
//#region web/src/pages/SessionsPage_sources.tsx
var SOURCE_CONFIG = {
	cli: {
		icon: Terminal,
		color: "text-primary"
	},
	tui: {
		icon: Terminal,
		color: "text-primary"
	},
	telegram: {
		icon: MessageCircle,
		color: "text-[oklch(0.65_0.15_250)]"
	},
	discord: {
		icon: Hash,
		color: "text-[oklch(0.65_0.15_280)]"
	},
	slack: {
		icon: MessageSquare,
		color: "text-[oklch(0.7_0.15_155)]"
	},
	whatsapp: {
		icon: Globe,
		color: "text-success"
	},
	whatsapp_cloud: {
		icon: Globe,
		color: "text-success"
	},
	signal: {
		icon: MessageCircle,
		color: "text-success"
	},
	matrix: {
		icon: MessageCircle,
		color: "text-[oklch(0.65_0.15_250)]"
	},
	email: {
		icon: MessageSquare,
		color: "text-[oklch(0.7_0.15_155)]"
	},
	sms: {
		icon: MessageCircle,
		color: "text-success"
	},
	cron: {
		icon: Clock,
		color: "text-warning"
	},
	tool: {
		icon: Play,
		color: "text-warning"
	},
	oneshot: {
		icon: Terminal,
		color: "text-warning"
	},
	api_server: {
		icon: Globe,
		color: "text-muted-foreground"
	},
	acp: {
		icon: Database,
		color: "text-muted-foreground"
	},
	hermes_flow: {
		icon: Play,
		color: "text-warning"
	},
	vulcan_delegate: {
		icon: Play,
		color: "text-warning"
	},
	webhook: {
		icon: Globe,
		color: "text-warning"
	}
};
var AUTOMATION_SESSION_SOURCES = [
	"cron",
	"tool",
	"oneshot",
	"api_server",
	"acp",
	"hermes_flow",
	"vulcan_delegate",
	"webhook"
];
var AUTOMATION_SESSION_SOURCE_SET = new Set(AUTOMATION_SESSION_SOURCES);
var NO_MATCHING_SESSION_SOURCE = "__hermes_dashboard_no_matching_source__";
function isAutomationSource(source) {
	return AUTOMATION_SESSION_SOURCE_SET.has(source);
}
function sourceBelongsToCategory(source, category) {
	if (category === "all") return true;
	if (category === "automation") return isAutomationSource(source);
	return !isAutomationSource(source);
}
function sourceLabel(source) {
	switch (source) {
		case "api_server": return "API server";
		case "acp": return "ACP";
		case "cli": return "CLI";
		case "tui": return "TUI";
		case "telegram": return "Telegram";
		case "discord": return "Discord";
		case "slack": return "Slack";
		case "whatsapp": return "WhatsApp";
		case "whatsapp_cloud": return "WhatsApp Cloud";
		case "sms": return "SMS";
		case "cron": return "Cron";
		case "tool": return "Tool";
		case "hermes_flow": return "Hermes Flow";
		case "vulcan_delegate": return "Vulcan delegate";
		case "webhook": return "Webhook";
		default: return source.split("_").filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
	}
}
//#endregion
//#region web/src/lib/reasoning-markup.ts
var KNOWN_TAGS = /* @__PURE__ */ new Set([
	"thinking",
	"reflection",
	"action",
	"result"
]);
var FENCE_RE = /^```/;
var TAG_RE = /<\/?(thinking|reflection|action|result)>/gi;
function hasReasoningMarkup(content) {
	return splitFenceAware(content).some((chunk) => {
		if (chunk.kind === "code") return false;
		return findFirstCompleteKnownTag(chunk.content) !== null;
	});
}
/**
* Structured reasoning UI is for assistant output only. User prompts and tool
* results may contain literal known tags that should stay on the Markdown path.
*/
function shouldRenderStructuredReasoning(role, content) {
	return role === "assistant" && hasReasoningMarkup(content);
}
function parseReasoningMarkup(content) {
	return mergeAdjacentProse(splitFenceAware(content).flatMap((chunk) => chunk.kind === "code" ? [{
		type: "prose",
		content: chunk.content
	}] : parseKnownTags(chunk.content)));
}
function parseKnownTags(content) {
	const segments = [];
	let outputCursor = 0;
	let searchCursor = 0;
	for (;;) {
		const opening = findNextOpeningTag(content, searchCursor);
		if (!opening) break;
		const closing = findMatchingCloseTag(content, opening.tag, opening.end);
		if (!closing) {
			searchCursor = opening.end;
			continue;
		}
		if (opening.start > outputCursor) segments.push({
			type: "prose",
			content: content.slice(outputCursor, opening.start)
		});
		const inner = content.slice(opening.end, closing.start);
		if (opening.tag === "action" || opening.tag === "result") segments.push({
			type: opening.tag,
			content: inner.trim()
		});
		else segments.push(...parseKnownTags(inner));
		outputCursor = closing.end;
		searchCursor = closing.end;
	}
	if (outputCursor < content.length) segments.push({
		type: "prose",
		content: content.slice(outputCursor)
	});
	return segments.filter((segment) => segment.content.length > 0);
}
function findFirstCompleteKnownTag(content) {
	let cursor = 0;
	for (;;) {
		const opening = findNextOpeningTag(content, cursor);
		if (!opening) return null;
		if (findMatchingCloseTag(content, opening.tag, opening.end)) return opening.tag;
		cursor = opening.end;
	}
}
function findNextOpeningTag(content, from) {
	TAG_RE.lastIndex = from;
	let match;
	while ((match = TAG_RE.exec(content)) !== null) {
		const raw = match[0];
		const tag = match[1].toLowerCase();
		if (!raw.startsWith("</") && KNOWN_TAGS.has(tag)) return {
			tag,
			start: match.index,
			end: TAG_RE.lastIndex
		};
	}
	return null;
}
function findMatchingCloseTag(content, tag, from) {
	const tagRe = new RegExp(`</?${tag}>`, "gi");
	tagRe.lastIndex = from;
	let depth = 1;
	let match;
	while ((match = tagRe.exec(content)) !== null) if (match[0].startsWith("</")) {
		depth -= 1;
		if (depth === 0) return {
			start: match.index,
			end: tagRe.lastIndex
		};
	} else depth += 1;
	return null;
}
function splitFenceAware(content) {
	const chunks = [];
	const lines = content.split("\n");
	let buffer = [];
	let inCode = false;
	for (const line of lines) {
		if (FENCE_RE.test(line)) {
			if (!inCode && buffer.length > 0) {
				chunks.push({
					kind: "prose",
					content: buffer.join("\n")
				});
				buffer = [];
			}
			buffer.push(line);
			if (inCode) {
				chunks.push({
					kind: "code",
					content: buffer.join("\n")
				});
				buffer = [];
			}
			inCode = !inCode;
			continue;
		}
		buffer.push(line);
	}
	if (buffer.length > 0) chunks.push({
		kind: inCode ? "code" : "prose",
		content: buffer.join("\n")
	});
	return chunks;
}
function mergeAdjacentProse(segments) {
	const merged = [];
	for (const segment of segments) {
		const prev = merged.at(-1);
		if (prev?.type === "prose" && segment.type === "prose") prev.content += `\n${segment.content}`;
		else merged.push({ ...segment });
	}
	return merged;
}
//#endregion
//#region web/src/components/StructuredReasoning.tsx
function StructuredReasoning(t0) {
	const $ = (0, import_compiler_runtime.c)(9);
	const { content, highlightTerms } = t0;
	let t1;
	if ($[0] !== content) {
		t1 = parseReasoningMarkup(content);
		$[0] = content;
		$[1] = t1;
	} else t1 = $[1];
	const segments = t1;
	let t2;
	if ($[2] !== highlightTerms || $[3] !== segments) {
		let t3;
		if ($[5] !== highlightTerms) {
			t3 = (segment, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReasoningSegment, {
				segment,
				highlightTerms
			}, index);
			$[5] = highlightTerms;
			$[6] = t3;
		} else t3 = $[6];
		t2 = segments.map(t3);
		$[2] = highlightTerms;
		$[3] = segments;
		$[4] = t2;
	} else t2 = $[4];
	let t3;
	if ($[7] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: t2
		});
		$[7] = t2;
		$[8] = t3;
	} else t3 = $[8];
	return t3;
}
function ReasoningSegment(t0) {
	const $ = (0, import_compiler_runtime.c)(12);
	const { segment, highlightTerms } = t0;
	if (segment.type === "prose") {
		let t1;
		if ($[0] !== segment.content) {
			t1 = segment.content.trim();
			$[0] = segment.content;
			$[1] = t1;
		} else t1 = $[1];
		let t2;
		if ($[2] !== highlightTerms || $[3] !== t1) {
			t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
				content: t1,
				highlightTerms
			});
			$[2] = highlightTerms;
			$[3] = t1;
			$[4] = t2;
		} else t2 = $[4];
		return t2;
	}
	const label = segment.type === "action" ? "Action" : "Result";
	let t1;
	if ($[5] !== label) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
			children: label
		});
		$[5] = label;
		$[6] = t1;
	} else t1 = $[6];
	let t2;
	if ($[7] !== segment.content) {
		t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "px-3 py-2.5 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap text-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: segment.content })
		});
		$[7] = segment.content;
		$[8] = t2;
	} else t2 = $[8];
	let t3;
	if ($[9] !== t1 || $[10] !== t2) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border border-border bg-secondary/40",
			children: [t1, t2]
		});
		$[9] = t1;
		$[10] = t2;
		$[11] = t3;
	} else t3 = $[11];
	return t3;
}
//#endregion
//#region web/src/components/PlatformsCard.tsx
function PlatformsCard(t0) {
	const $ = (0, import_compiler_runtime.c)(28);
	const { platforms } = t0;
	const { t } = useI18n();
	let t1;
	if ($[0] !== t.status.connected) {
		t1 = {
			tone: "success",
			label: t.status.connected
		};
		$[0] = t.status.connected;
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	if ($[2] !== t.status.disconnected) {
		t2 = {
			tone: "warning",
			label: t.status.disconnected
		};
		$[2] = t.status.disconnected;
		$[3] = t2;
	} else t2 = $[3];
	const t3 = t.status.disabled ?? "Disabled";
	let t4;
	if ($[4] !== t3) {
		t4 = {
			tone: "outline",
			label: t3
		};
		$[4] = t3;
		$[5] = t4;
	} else t4 = $[5];
	let t5;
	if ($[6] !== t.status.error) {
		t5 = {
			tone: "destructive",
			label: t.status.error
		};
		$[6] = t.status.error;
		$[7] = t5;
	} else t5 = $[7];
	let t6;
	if ($[8] !== t1 || $[9] !== t2 || $[10] !== t4 || $[11] !== t5) {
		t6 = {
			connected: t1,
			disconnected: t2,
			disabled: t4,
			fatal: t5
		};
		$[8] = t1;
		$[9] = t2;
		$[10] = t4;
		$[11] = t5;
		$[12] = t6;
	} else t6 = $[12];
	const platformStateBadge = t6;
	let t7;
	if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-5 w-5 text-muted-foreground" });
		$[13] = t7;
	} else t7 = $[13];
	let t8;
	if ($[14] !== t.status.connectedPlatforms) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [t7, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-base",
				children: t.status.connectedPlatforms
			})]
		}) });
		$[14] = t.status.connectedPlatforms;
		$[15] = t8;
	} else t8 = $[15];
	let t9;
	if ($[16] !== platformStateBadge || $[17] !== platforms || $[18] !== t.status.lastUpdate) {
		let t10;
		if ($[20] !== platformStateBadge || $[21] !== t.status.lastUpdate) {
			t10 = (t11) => {
				const [name, info] = t11;
				const display = platformStateBadge[info.state] ?? {
					tone: "outline",
					label: info.state
				};
				const IconComponent = info.state === "connected" ? Wifi : info.state === "fatal" ? TriangleAlert : info.state === "disabled" ? PowerOff : WifiOff;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-border p-3 w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 min-w-0 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComponent, { className: `h-4 w-4 shrink-0 ${info.state === "connected" ? "text-success" : info.state === "fatal" ? "text-destructive" : info.state === "disabled" ? "text-muted-foreground" : "text-warning"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-0.5 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mondwest normal-case text-sm font-medium capitalize truncate",
									children: name
								}),
								info.error_message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `font-mondwest normal-case text-xs ${info.state === "disabled" ? "text-muted-foreground" : "text-destructive"}`,
									children: info.error_message
								}),
								info.updated_at && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mondwest normal-case text-xs text-muted-foreground",
									children: [
										t.status.lastUpdate,
										": ",
										isoTimeAgo(info.updated_at)
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						tone: display.tone,
						className: "shrink-0 self-start sm:self-center",
						children: [display.tone === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current" }), display.label]
					})]
				}, name);
			};
			$[20] = platformStateBadge;
			$[21] = t.status.lastUpdate;
			$[22] = t10;
		} else t10 = $[22];
		t9 = platforms.map(t10);
		$[16] = platformStateBadge;
		$[17] = platforms;
		$[18] = t.status.lastUpdate;
		$[19] = t9;
	} else t9 = $[19];
	let t10;
	if ($[23] !== t9) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "grid gap-3",
			children: t9
		});
		$[23] = t9;
		$[24] = t10;
	} else t10 = $[24];
	let t11;
	if ($[25] !== t10 || $[26] !== t8) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [t8, t10] });
		$[25] = t10;
		$[26] = t8;
		$[27] = t11;
	} else t11 = $[27];
	return t11;
}
//#endregion
//#region web/src/pages/SessionsPage.tsx
/** Render an FTS5 snippet with highlighted matches.
*  The backend wraps matches in >>> and <<< delimiters. */
function SnippetHighlight(t0) {
	const $ = (0, import_compiler_runtime.c)(6);
	const { snippet } = t0;
	let t1;
	if ($[0] !== snippet) {
		const parts = [];
		let t2;
		if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
			t2 = />>>(.*?)<<</g;
			$[2] = t2;
		} else t2 = $[2];
		const regex = t2;
		let last = 0;
		let match;
		let i = 0;
		while ((match = regex.exec(snippet)) !== null) {
			if (match.index > last) parts.push(snippet.slice(last, match.index));
			parts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
				className: "bg-warning/30 text-warning px-0.5",
				children: match[1]
			}, i++));
			last = regex.lastIndex;
		}
		if (last < snippet.length) {
			let t3;
			if ($[3] !== last || $[4] !== snippet) {
				t3 = snippet.slice(last);
				$[3] = last;
				$[4] = snippet;
				$[5] = t3;
			} else t3 = $[5];
			parts.push(t3);
		}
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mondwest normal-case mt-0.5 min-w-0 max-w-full truncate text-xs text-text-secondary",
			children: parts
		});
		$[0] = snippet;
		$[1] = t1;
	} else t1 = $[1];
	return t1;
}
function ToolCallBlock(t0) {
	const $ = (0, import_compiler_runtime.c)(23);
	const { toolCall } = t0;
	const [open, setOpen] = (0, import_react.useState)(false);
	const { t } = useI18n();
	let args = toolCall.function.arguments;
	try {
		let t1;
		if ($[0] !== args) {
			t1 = JSON.stringify(JSON.parse(args), null, 2);
			$[0] = args;
			$[1] = t1;
		} else t1 = $[1];
		args = t1;
	} catch {}
	let t1;
	if ($[2] !== open) {
		t1 = () => setOpen(!open);
		$[2] = open;
		$[3] = t1;
	} else t1 = $[3];
	const t2 = `${open ? t.common.collapse : t.common.expand} tool call ${toolCall.function.name}`;
	let t3;
	if ($[4] !== open) {
		t3 = open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" });
		$[4] = open;
		$[5] = t3;
	} else t3 = $[5];
	let t4;
	if ($[6] !== toolCall.function.name) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono-ui font-medium",
			children: toolCall.function.name
		});
		$[6] = toolCall.function.name;
		$[7] = t4;
	} else t4 = $[7];
	let t5;
	if ($[8] !== toolCall.id) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-warning/50 ml-auto",
			children: toolCall.id
		});
		$[8] = toolCall.id;
		$[9] = t5;
	} else t5 = $[9];
	let t6;
	if ($[10] !== open || $[11] !== t1 || $[12] !== t2 || $[13] !== t3 || $[14] !== t4 || $[15] !== t5) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, {
			onClick: t1,
			"aria-label": t2,
			"aria-expanded": open,
			className: "px-3 py-2 text-xs text-warning hover:bg-warning/10 hover:text-warning",
			children: [
				t3,
				t4,
				t5
			]
		});
		$[10] = open;
		$[11] = t1;
		$[12] = t2;
		$[13] = t3;
		$[14] = t4;
		$[15] = t5;
		$[16] = t6;
	} else t6 = $[16];
	let t7;
	if ($[17] !== args || $[18] !== open) {
		t7 = open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "border-t border-warning/20 px-3 py-2 text-xs text-warning/80 overflow-x-auto whitespace-pre-wrap font-mono",
			children: args
		});
		$[17] = args;
		$[18] = open;
		$[19] = t7;
	} else t7 = $[19];
	let t8;
	if ($[20] !== t6 || $[21] !== t7) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 border border-warning/20 bg-warning/5",
			children: [t6, t7]
		});
		$[20] = t6;
		$[21] = t7;
		$[22] = t8;
	} else t8 = $[22];
	return t8;
}
var COMPACTION_PREFIXES = [
	"[CONTEXT COMPACTION — REFERENCE ONLY]",
	"[CONTEXT COMPACTION - REFERENCE ONLY]",
	"[CONTEXT SUMMARY]:"
];
var COMPACTION_END_MARKER = "--- END OF CONTEXT SUMMARY — respond to the message below, not the summary above ---";
function splitCompactionContent(content) {
	const head = content.trimStart();
	if (!COMPACTION_PREFIXES.some((p) => head.startsWith(p))) return null;
	const markerIdx = content.indexOf(COMPACTION_END_MARKER);
	if (markerIdx < 0) return {
		summary: content,
		remainder: ""
	};
	return {
		summary: content.slice(0, markerIdx),
		remainder: content.slice(markerIdx + 84).replace(/^\s+/, "")
	};
}
function MessageBubble(t0) {
	const $ = (0, import_compiler_runtime.c)(61);
	const { msg, highlight } = t0;
	const { t } = useI18n();
	let t1;
	if ($[0] !== t.sessions.roles.user) {
		t1 = {
			bg: "bg-primary/10",
			text: "text-primary",
			label: t.sessions.roles.user
		};
		$[0] = t.sessions.roles.user;
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	if ($[2] !== t.sessions.roles.assistant) {
		t2 = {
			bg: "bg-success/10",
			text: "text-success",
			label: t.sessions.roles.assistant
		};
		$[2] = t.sessions.roles.assistant;
		$[3] = t2;
	} else t2 = $[3];
	let t3;
	if ($[4] !== t.sessions.roles.system) {
		t3 = {
			bg: "bg-muted",
			text: "text-muted-foreground",
			label: t.sessions.roles.system
		};
		$[4] = t.sessions.roles.system;
		$[5] = t3;
	} else t3 = $[5];
	let t4;
	if ($[6] !== t.sessions.roles.tool) {
		t4 = {
			bg: "bg-warning/10",
			text: "text-warning",
			label: t.sessions.roles.tool
		};
		$[6] = t.sessions.roles.tool;
		$[7] = t4;
	} else t4 = $[7];
	let t5;
	if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
		t5 = {
			bg: "bg-muted/50",
			text: "text-muted-foreground italic",
			label: "Context handoff"
		};
		$[8] = t5;
	} else t5 = $[8];
	let t6;
	if ($[9] !== t1 || $[10] !== t2 || $[11] !== t3 || $[12] !== t4) {
		t6 = {
			user: t1,
			assistant: t2,
			system: t3,
			tool: t4,
			compaction: t5
		};
		$[9] = t1;
		$[10] = t2;
		$[11] = t3;
		$[12] = t4;
		$[13] = t6;
	} else t6 = $[13];
	const ROLE_STYLES = t6;
	let t7;
	if ($[14] !== msg.content) {
		t7 = typeof msg.content === "string" ? splitCompactionContent(msg.content) : null;
		$[14] = msg.content;
		$[15] = t7;
	} else t7 = $[15];
	const compactionSplit = t7;
	if (compactionSplit && compactionSplit.remainder) {
		let t8;
		if ($[16] !== compactionSplit.summary || $[17] !== msg) {
			t8 = {
				...msg,
				content: compactionSplit.summary
			};
			$[16] = compactionSplit.summary;
			$[17] = msg;
			$[18] = t8;
		} else t8 = $[18];
		let t9;
		if ($[19] !== highlight || $[20] !== t8) {
			t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBubble, {
				msg: t8,
				highlight
			});
			$[19] = highlight;
			$[20] = t8;
			$[21] = t9;
		} else t9 = $[21];
		let t10;
		if ($[22] !== compactionSplit.remainder || $[23] !== msg) {
			t10 = {
				...msg,
				content: compactionSplit.remainder
			};
			$[22] = compactionSplit.remainder;
			$[23] = msg;
			$[24] = t10;
		} else t10 = $[24];
		let t11;
		if ($[25] !== highlight || $[26] !== t10) {
			t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBubble, {
				msg: t10,
				highlight
			});
			$[25] = highlight;
			$[26] = t10;
			$[27] = t11;
		} else t11 = $[27];
		let t12;
		if ($[28] !== t11 || $[29] !== t9) {
			t12 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [t9, t11] });
			$[28] = t11;
			$[29] = t9;
			$[30] = t12;
		} else t12 = $[30];
		return t12;
	}
	const isCompaction = compactionSplit !== null;
	const style = isCompaction ? ROLE_STYLES.compaction : ROLE_STYLES[msg.role] ?? ROLE_STYLES.system;
	const label = isCompaction ? ROLE_STYLES.compaction.label : msg.tool_name ? `${t.sessions.roles.tool}: ${msg.tool_name}` : style.label;
	let t8;
	bb0: {
		if (!highlight || !msg.content) {
			t8 = false;
			break bb0;
		}
		let t9;
		if ($[31] !== highlight || $[32] !== msg.content) {
			const content = msg.content.toLowerCase();
			t9 = highlight.toLowerCase().split(/\s+/).filter(Boolean).some((term) => content.includes(term));
			$[31] = highlight;
			$[32] = msg.content;
			$[33] = t9;
		} else t9 = $[33];
		t8 = t9;
	}
	const isHit = t8;
	let t9;
	if ($[34] !== highlight || $[35] !== isHit) {
		t9 = isHit && highlight ? highlight.split(/\s+/).filter(Boolean) : void 0;
		$[34] = highlight;
		$[35] = isHit;
		$[36] = t9;
	} else t9 = $[36];
	const highlightTerms = t9;
	const t10 = `${style.bg} p-3 ${isHit ? "ring-1 ring-warning/40" : ""}`;
	const t11 = isHit || void 0;
	const t12 = `text-xs font-semibold ${style.text}`;
	let t13;
	if ($[37] !== label || $[38] !== t12) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: t12,
			children: label
		});
		$[37] = label;
		$[38] = t12;
		$[39] = t13;
	} else t13 = $[39];
	let t14;
	if ($[40] !== isHit || $[41] !== t.common) {
		t14 = isHit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: "warning",
			className: "text-xs py-0 px-1.5",
			children: t.common.match
		});
		$[40] = isHit;
		$[41] = t.common;
		$[42] = t14;
	} else t14 = $[42];
	let t15;
	if ($[43] !== msg.timestamp) {
		t15 = msg.timestamp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-text-tertiary",
			children: timeAgo(msg.timestamp)
		});
		$[43] = msg.timestamp;
		$[44] = t15;
	} else t15 = $[44];
	let t16;
	if ($[45] !== t13 || $[46] !== t14 || $[47] !== t15) {
		t16 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 mb-1",
			children: [
				t13,
				t14,
				t15
			]
		});
		$[45] = t13;
		$[46] = t14;
		$[47] = t15;
		$[48] = t16;
	} else t16 = $[48];
	let t17;
	if ($[49] !== highlightTerms || $[50] !== msg.content || $[51] !== msg.role) {
		t17 = msg.content && (msg.role === "system" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-foreground whitespace-pre-wrap leading-relaxed",
			children: msg.content
		}) : shouldRenderStructuredReasoning(msg.role, msg.content) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StructuredReasoning, {
			content: msg.content,
			highlightTerms
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
			content: msg.content,
			highlightTerms
		}));
		$[49] = highlightTerms;
		$[50] = msg.content;
		$[51] = msg.role;
		$[52] = t17;
	} else t17 = $[52];
	let t18;
	if ($[53] !== msg.tool_calls) {
		t18 = msg.tool_calls && msg.tool_calls.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1",
			children: msg.tool_calls.map(_temp)
		});
		$[53] = msg.tool_calls;
		$[54] = t18;
	} else t18 = $[54];
	let t19;
	if ($[55] !== t10 || $[56] !== t11 || $[57] !== t16 || $[58] !== t17 || $[59] !== t18) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t10,
			"data-search-hit": t11,
			children: [
				t16,
				t17,
				t18
			]
		});
		$[55] = t10;
		$[56] = t11;
		$[57] = t16;
		$[58] = t17;
		$[59] = t18;
		$[60] = t19;
	} else t19 = $[60];
	return t19;
}
/** Message list with auto-scroll to first search hit. */
function _temp(tc) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolCallBlock, { toolCall: tc }, tc.id);
}
function MessageList(t0) {
	const $ = (0, import_compiler_runtime.c)(12);
	const { messages, highlight } = t0;
	const containerRef = (0, import_react.useRef)(null);
	let t1;
	if ($[0] !== highlight) {
		t1 = () => {
			if (!highlight || !containerRef.current) return;
			const timer = setTimeout(() => {
				const hit = containerRef.current?.querySelector("[data-search-hit]");
				if (hit) hit.scrollIntoView({
					behavior: "smooth",
					block: "center"
				});
			}, 50);
			return () => clearTimeout(timer);
		};
		$[0] = highlight;
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	if ($[2] !== highlight || $[3] !== messages) {
		t2 = [messages, highlight];
		$[2] = highlight;
		$[3] = messages;
		$[4] = t2;
	} else t2 = $[4];
	(0, import_react.useEffect)(t1, t2);
	let t3;
	if ($[5] !== highlight || $[6] !== messages) {
		let t4;
		if ($[8] !== highlight) {
			t4 = (msg, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBubble, {
				msg,
				highlight
			}, i);
			$[8] = highlight;
			$[9] = t4;
		} else t4 = $[9];
		t3 = messages.map(t4);
		$[5] = highlight;
		$[6] = messages;
		$[7] = t3;
	} else t3 = $[7];
	let t4;
	if ($[10] !== t3) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: containerRef,
			className: "flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2",
			children: t3
		});
		$[10] = t3;
		$[11] = t4;
	} else t4 = $[11];
	return t4;
}
function SessionRow({ session, snippet, searchQuery, isExpanded, isSelected, onToggle, onSelectClick, onDelete, onRename, onExport, resumeInChatEnabled }) {
	const [messages, setMessages] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [renaming, setRenaming] = (0, import_react.useState)(false);
	const [renameValue, setRenameValue] = (0, import_react.useState)(session.title ?? "");
	const [renameSaving, setRenameSaving] = (0, import_react.useState)(false);
	const { t } = useI18n();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!isExpanded || messages !== null) return;
		let cancelled = false;
		api.getSessionMessages(session.id, session.profile).then((resp) => {
			if (!cancelled) setMessages(resp.messages);
		}).catch((err) => {
			if (!cancelled) setError(errorMessage(err));
		});
		return () => {
			cancelled = true;
		};
	}, [
		isExpanded,
		session.id,
		session.profile,
		messages
	]);
	const sourceKey = session.source?.split(":")[0];
	const sourceInfo = (session.source ? SOURCE_CONFIG[session.source] ?? (sourceKey ? SOURCE_CONFIG[sourceKey] : null) : null) ?? {
		icon: Globe,
		color: "text-muted-foreground"
	};
	const SourceIcon = sourceInfo.icon;
	const hasTitle = session.title && session.title !== "Untitled";
	const submitRename = async () => {
		const value = renameValue.trim();
		if (!value || value === session.title) {
			setRenaming(false);
			return;
		}
		setRenameSaving(true);
		try {
			await onRename(session.id, value, session.profile);
			setRenaming(false);
		} finally {
			setRenameSaving(false);
		}
	};
	const actionButtons = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			tone: "outline",
			className: "text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceIcon, { className: `mr-1 h-3 w-3 ${sourceInfo.color}` }), session.source ? sourceLabel(session.source) : "local"]
		}),
		resumeInChatEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			size: "icon",
			className: "text-muted-foreground hover:text-success",
			"aria-label": t.sessions.resumeInChat,
			title: t.sessions.resumeInChat,
			onClick: (e) => {
				e.stopPropagation();
				navigate(`/chat?resume=${encodeURIComponent(session.id)}`);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			size: "icon",
			className: "text-muted-foreground hover:text-foreground",
			"aria-label": "Rename session",
			title: "Rename session",
			onClick: (e_0) => {
				e_0.stopPropagation();
				setRenameValue(session.title && session.title !== "Untitled" ? session.title : "");
				setRenaming(true);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			size: "icon",
			className: "text-muted-foreground hover:text-foreground",
			"aria-label": "Export session",
			title: "Export session JSON",
			onClick: (e_1) => {
				e_1.stopPropagation();
				onExport(session.id);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			ghost: true,
			destructive: true,
			size: "icon",
			"aria-label": t.sessions.deleteSession,
			onClick: (e_2) => {
				e_2.stopPropagation();
				onDelete();
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
		})
	] });
	const containerClasses = isSelected ? "border-primary/40 bg-primary/[0.06]" : session.is_active ? "border-success/30 bg-success/[0.03]" : "border-border";
	const handleSelectClick = (e_3) => {
		e_3.stopPropagation();
		onSelectClick(e_3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `max-w-full min-w-0 overflow-hidden border transition-colors ${containerClasses}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex cursor-pointer items-start gap-3 p-3 transition-colors hover:bg-secondary/30",
			onClick: onToggle,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex shrink-0 items-center pt-0.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: isSelected,
						onClick: handleSelectClick,
						"aria-label": t.sessions.selectSession
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `shrink-0 pt-0.5 ${sourceInfo.color}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceIcon, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 flex-col gap-0.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 items-center gap-2",
									children: [renaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex min-w-0 flex-1 items-center gap-1.5",
										onClick: (e_4) => e_4.stopPropagation(),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												autoFocus: true,
												value: renameValue,
												onChange: (e_5) => setRenameValue(e_5.target.value),
												onKeyDown: (e_6) => {
													if (e_6.key === "Enter") submitRename();
													else if (e_6.key === "Escape") setRenaming(false);
												},
												placeholder: "Session title",
												className: "h-7 min-w-0 flex-1 py-0 text-sm",
												disabled: renameSaving
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												ghost: true,
												size: "icon",
												className: "text-muted-foreground hover:text-success",
												"aria-label": "Save title",
												title: "Save title",
												disabled: renameSaving,
												onClick: () => void submitRename(),
												children: renameSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-sm" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												ghost: true,
												size: "icon",
												className: "text-muted-foreground hover:text-foreground",
												"aria-label": "Cancel rename",
												title: "Cancel rename",
												disabled: renameSaving,
												onClick: () => setRenaming(false),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `font-mondwest normal-case min-w-0 flex-1 truncate text-sm ${hasTitle ? "font-medium" : "text-muted-foreground italic"}`,
										children: hasTitle ? session.title : session.preview ? session.preview.slice(0, 60) : t.sessions.untitledSession
									}), session.is_active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										tone: "success",
										className: "shrink-0 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-current" }), t.common.live]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted-foreground",
									children: [
										session.model && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "max-w-[min(100%,12rem)] truncate sm:max-w-[180px]",
											children: session.model.split("/").pop()
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-border",
											children: "·"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "shrink-0",
											children: [
												session.message_count,
												" ",
												t.common.msgs
											]
										}),
										session.tool_call_count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-border",
											children: "·"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "shrink-0",
											children: [
												session.tool_call_count,
												" ",
												t.common.tools
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-border",
											children: "·"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0",
											children: timeAgo(session.last_active)
										})
									]
								}),
								snippet && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SnippetHighlight, { snippet })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden shrink-0 items-center gap-2 sm:flex",
							children: actionButtons
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center gap-2 sm:hidden",
						children: actionButtons
					})]
				})
			]
		}), isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 border-t border-border bg-background/50 p-4",
			children: [
				messages === null && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-xl text-primary" })
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive py-4 text-center",
					children: error
				}),
				messages && messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground py-4 text-center",
					children: t.sessions.noMessages
				}),
				messages && messages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageList, {
					messages,
					highlight: searchQuery
				})
			]
		})]
	});
}
var PAGE_SIZE = 20;
function SessionsPagination({ className, compact = false, onPageChange, page, total }) {
	const { t } = useI18n();
	const pageCount = Math.ceil(total / PAGE_SIZE);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center ${compact ? "gap-1" : "justify-between pt-2"}${className ? ` ${className}` : ""}`,
		children: [!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-xs text-muted-foreground",
			children: [
				page * PAGE_SIZE + 1,
				"–",
				Math.min((page + 1) * PAGE_SIZE, total),
				" ",
				t.common.of,
				" ",
				total
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					outlined: true,
					size: "icon",
					disabled: page === 0,
					onClick: () => onPageChange(page - 1),
					"aria-label": t.sessions.previousPage,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "px-2 text-xs text-muted-foreground",
					children: [
						t.common.page,
						" ",
						page + 1,
						" ",
						t.common.of,
						" ",
						pageCount
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					outlined: true,
					size: "icon",
					disabled: (page + 1) * PAGE_SIZE >= total,
					onClick: () => onPageChange(page + 1),
					"aria-label": t.sessions.nextPage,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
				})
			]
		})]
	});
}
function SessionsPage() {
	const [sessions, setSessions] = (0, import_react.useState)([]);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [page, setPage] = (0, import_react.useState)(0);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [expandedId, setExpandedId] = (0, import_react.useState)(null);
	const [searchResults, setSearchResults] = (0, import_react.useState)(null);
	const [searching, setSearching] = (0, import_react.useState)(false);
	const debounceRef = (0, import_react.useRef)(null);
	const importInputRef = (0, import_react.useRef)(null);
	const logScrollRef = (0, import_react.useRef)(null);
	const [status, setStatus] = (0, import_react.useState)(null);
	const [overviewSessions, setOverviewSessions] = (0, import_react.useState)([]);
	const [view, setView] = (0, import_react.useState)("overview");
	const [sessionCategory, setSessionCategory] = (0, import_react.useState)("chats");
	const [sourceSelectionsByCategory, setSourceSelectionsByCategory] = (0, import_react.useState)({
		chats: null,
		automation: null,
		all: null
	});
	const [sourceMenuOpen, setSourceMenuOpen] = (0, import_react.useState)(false);
	const sourceMenuRef = (0, import_react.useRef)(null);
	const sessionsRequestRef = (0, import_react.useRef)(0);
	const [emptyCount, setEmptyCount] = (0, import_react.useState)(0);
	const [deleteEmptyOpen, setDeleteEmptyOpen] = (0, import_react.useState)(false);
	const [deletingEmpty, setDeletingEmpty] = (0, import_react.useState)(false);
	const [selectedIds, setSelectedIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const lastClickedIndexRef = (0, import_react.useRef)(null);
	const [deleteSelectedOpen, setDeleteSelectedOpen] = (0, import_react.useState)(false);
	const [deletingSelected, setDeletingSelected] = (0, import_react.useState)(false);
	const [stats, setStats] = (0, import_react.useState)(null);
	const [pruneOpen, setPruneOpen] = (0, import_react.useState)(false);
	const [pruneDays, setPruneDays] = (0, import_react.useState)("90");
	const [pruning, setPruning] = (0, import_react.useState)(false);
	const [importingSessions, setImportingSessions] = (0, import_react.useState)(false);
	const { toast, showToast } = useToast();
	const { t } = useI18n();
	const { setAfterTitle, setEnd } = usePageHeader();
	const { activeAction, actionStatus, dismissLog } = useSystemActions();
	const resumeInChatEnabled = isDashboardEmbeddedChatEnabled();
	const selectedSources = sourceSelectionsByCategory[sessionCategory];
	const pinnedSourceSelections = (0, import_react.useMemo)(() => Object.values(sourceSelectionsByCategory).flatMap((selection) => selection ?? []), [sourceSelectionsByCategory]);
	const allSourceOptions = (0, import_react.useMemo)(() => {
		const entries = Object.entries(stats?.by_source ?? {}).sort(([aSource, aCount], [bSource, bCount]) => bCount - aCount || sourceLabel(aSource).localeCompare(sourceLabel(bSource)));
		const seen = new Set(entries.map(([source]) => source));
		for (const source_0 of pinnedSourceSelections) if (!seen.has(source_0)) {
			entries.unshift([source_0, 0]);
			seen.add(source_0);
		}
		return entries;
	}, [pinnedSourceSelections, stats]);
	const allSourceNames = (0, import_react.useMemo)(() => allSourceOptions.map(([source_1]) => source_1), [allSourceOptions]);
	const sessionQueryOptions = (0, import_react.useMemo)(() => {
		if (selectedSources !== null) {
			if (selectedSources.length === 0) return allSourceNames.length > 0 ? { excludeSources: allSourceNames } : { source: NO_MATCHING_SESSION_SOURCE };
			if (selectedSources.length === 1) return { source: selectedSources[0] };
			const selected = new Set(selectedSources);
			const excludedSources = allSourceNames.filter((source_2) => !selected.has(source_2));
			return excludedSources.length > 0 ? { excludeSources: excludedSources } : {};
		}
		if (sessionCategory === "chats") return { excludeSources: AUTOMATION_SESSION_SOURCES };
		if (sessionCategory === "automation") {
			const excludedSources_0 = allSourceNames.filter((source_3) => !isAutomationSource(source_3));
			return excludedSources_0.length > 0 ? { excludeSources: excludedSources_0 } : { sources: AUTOMATION_SESSION_SOURCES };
		}
		return {};
	}, [
		selectedSources,
		sessionCategory,
		allSourceNames
	]);
	const categoryDefaultSources = (0, import_react.useMemo)(() => {
		return allSourceNames.filter((source_4) => sourceBelongsToCategory(source_4, sessionCategory));
	}, [sessionCategory, allSourceNames]);
	const sourceOptions = (0, import_react.useMemo)(() => {
		const selected_0 = new Set(selectedSources ?? []);
		return allSourceOptions.filter(([source_5]) => sourceBelongsToCategory(source_5, sessionCategory) || selected_0.has(source_5));
	}, [
		allSourceOptions,
		selectedSources,
		sessionCategory
	]);
	const effectiveSelectedSources = selectedSources ?? categoryDefaultSources;
	const selectedSourceSet = (0, import_react.useMemo)(() => new Set(effectiveSelectedSources), [effectiveSelectedSources]);
	const defaultSourceFilterLabel = (0, import_react.useMemo)(() => {
		if (sessionCategory === "chats") return "Any chat source";
		if (sessionCategory === "automation") return "Any automation source";
		return t.sessions.anySource;
	}, [sessionCategory, t.sessions.anySource]);
	const sourceMenuTitle = (0, import_react.useMemo)(() => {
		if (sessionCategory === "chats") return "Chat sources";
		if (sessionCategory === "automation") return "Automation sources";
		return t.sessions.sourceFilter;
	}, [sessionCategory, t.sessions.sourceFilter]);
	const sourceFilterLabel = (0, import_react.useMemo)(() => {
		if (selectedSources === null) return defaultSourceFilterLabel;
		if (selectedSources.length === 0) return "No sources";
		if (selectedSources.length === 1) return sourceLabel(selectedSources[0]);
		return `${selectedSources.length} sources`;
	}, [defaultSourceFilterLabel, selectedSources]);
	const refreshEmptyCount = (0, import_react.useCallback)(() => {
		api.getEmptySessionsCount().then((r) => setEmptyCount(r.count)).catch(() => {});
	}, []);
	const clearSelection = (0, import_react.useCallback)(() => {
		setSelectedIds(/* @__PURE__ */ new Set());
		lastClickedIndexRef.current = null;
	}, []);
	(0, import_react.useLayoutEffect)(() => {
		if (loading) {
			setAfterTitle(null);
			return;
		}
		setAfterTitle(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: "secondary",
			className: "text-xs tabular-nums",
			children: total
		}));
		return () => {
			setAfterTitle(null);
		};
	}, [
		loading,
		setAfterTitle,
		total
	]);
	(0, import_react.useLayoutEffect)(() => {
		setEnd(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			outlined: true,
			size: "sm",
			onClick: () => setPruneOpen(true),
			prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, {}),
			children: "Prune old sessions"
		}));
		return () => {
			setEnd(null);
		};
	}, [setEnd]);
	(0, import_react.useEffect)(() => {
		if (!sourceMenuOpen) return;
		const handlePointerDown = (event) => {
			if (!sourceMenuRef.current?.contains(event.target)) setSourceMenuOpen(false);
		};
		document.addEventListener("pointerdown", handlePointerDown);
		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
		};
	}, [sourceMenuOpen]);
	const loadSessions = (0, import_react.useCallback)((p, silent = false) => {
		const requestId = silent ? sessionsRequestRef.current : sessionsRequestRef.current + 1;
		if (!silent) sessionsRequestRef.current = requestId;
		if (!silent) setLoading(true);
		api.getSessions(PAGE_SIZE, p * PAGE_SIZE, sessionQueryOptions).then((resp) => {
			if (requestId !== sessionsRequestRef.current) return;
			setSessions(resp.sessions);
			setTotal(resp.total);
		}).catch(() => {}).finally(() => {
			if (requestId !== sessionsRequestRef.current) return;
			if (!silent) setLoading(false);
		});
	}, [sessionQueryOptions]);
	const loadStats = (0, import_react.useCallback)(() => {
		api.getSessionStats().then(setStats).catch(() => {});
	}, []);
	const handleImportSessions = (0, import_react.useCallback)(async (files) => {
		const file = files?.[0];
		if (!file) return;
		setImportingSessions(true);
		try {
			const importedSessions = parseImportSessions(await file.text());
			const result = await api.importSessions(importedSessions);
			showToast(`Import complete: ${importSummary(result)}`, "success");
			clearSelection();
			loadSessions(page, true);
			loadStats();
			refreshEmptyCount();
		} catch (error) {
			showToast(`Import failed: ${errorMessage(error)}`, "error");
		} finally {
			setImportingSessions(false);
			if (importInputRef.current) importInputRef.current.value = "";
		}
	}, [
		clearSelection,
		loadSessions,
		loadStats,
		page,
		refreshEmptyCount,
		showToast
	]);
	(0, import_react.useEffect)(() => {
		loadStats();
	}, [loadStats]);
	const newestSeenRef = (0, import_react.useRef)(null);
	const pageRef = (0, import_react.useRef)(page);
	(0, import_react.useEffect)(() => {
		pageRef.current = page;
	}, [page]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		queueMicrotask(() => {
			if (cancelled) return;
			loadSessions(page);
			refreshEmptyCount();
		});
		return () => {
			cancelled = true;
		};
	}, [
		loadSessions,
		page,
		refreshEmptyCount
	]);
	(0, import_react.useEffect)(() => {
		let cancelled_0 = false;
		const loadOverview = () => {
			api.getStatus().then((nextStatus) => {
				if (!cancelled_0) setStatus(nextStatus);
			}).catch(() => {});
			api.getSessions(50, 0, sessionQueryOptions).then((r_0) => {
				if (cancelled_0) return;
				setOverviewSessions(r_0.sessions);
				const newest = r_0.sessions[0]?.id ?? null;
				if (shouldRefreshSessions(newestSeenRef.current, newest)) loadSessions(pageRef.current, true);
				newestSeenRef.current = newest;
			}).catch(() => {});
		};
		loadOverview();
		const id = setInterval(loadOverview, 5e3);
		return () => {
			cancelled_0 = true;
			clearInterval(id);
		};
	}, [loadSessions, sessionQueryOptions]);
	(0, import_react.useEffect)(() => {
		const el = logScrollRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, [actionStatus?.lines]);
	const goToPage = (0, import_react.useCallback)((p_0) => {
		setPage(p_0);
		clearSelection();
	}, [clearSelection]);
	const updateSearch = (0, import_react.useCallback)((value) => {
		setSearch(value);
		if (value.trim()) setView("list");
		clearSelection();
	}, [clearSelection]);
	const switchView = (0, import_react.useCallback)((next) => {
		setView(next);
		clearSelection();
	}, [clearSelection]);
	const updateSessionCategory = (0, import_react.useCallback)((value_0) => {
		setSessionCategory(value_0);
		setSourceMenuOpen(false);
		setPage(0);
		setExpandedId(null);
		clearSelection();
	}, [clearSelection]);
	const toggleSourceFilter = (0, import_react.useCallback)((source_6) => {
		setSourceSelectionsByCategory((currentByCategory) => {
			const current = currentByCategory[sessionCategory];
			const next_0 = new Set(current ?? categoryDefaultSources);
			if (next_0.has(source_6)) next_0.delete(source_6);
			else next_0.add(source_6);
			const nextSelection = sourceOptions.map(([optionSource]) => optionSource).filter((optionSource_0) => next_0.has(optionSource_0));
			return {
				...currentByCategory,
				[sessionCategory]: nextSelection
			};
		});
		setPage(0);
		setExpandedId(null);
		clearSelection();
	}, [
		categoryDefaultSources,
		clearSelection,
		sessionCategory,
		sourceOptions
	]);
	const clearSourceFilters = (0, import_react.useCallback)(() => {
		setSourceSelectionsByCategory((currentByCategory_0) => ({
			...currentByCategory_0,
			[sessionCategory]: null
		}));
		setPage(0);
		setExpandedId(null);
		clearSelection();
	}, [clearSelection, sessionCategory]);
	(0, import_react.useEffect)(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);
		if (!search.trim()) {
			debounceRef.current = setTimeout(() => {
				setSearchResults(null);
				setSearching(false);
			}, 0);
			return;
		}
		debounceRef.current = setTimeout(() => {
			setSearching(true);
			setSearchResults(null);
			api.searchSessions(search.trim(), sessionQueryOptions).then((resp_0) => setSearchResults(resp_0.results)).catch(() => setSearchResults(null)).finally(() => setSearching(false));
		}, 300);
		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [search, sessionQueryOptions]);
	const rowProfile = (0, import_react.useCallback)((id_0) => (searchResults ?? sessions).find((s) => s.id === id_0)?.profile, [searchResults, sessions]);
	const sessionDelete = useConfirmDelete({ onDelete: (0, import_react.useCallback)(async (id_1) => {
		try {
			await api.deleteSession(id_1, rowProfile(id_1));
			setSessions((prev) => prev.filter((s_0) => s_0.id !== id_1));
			setTotal((prev_0) => prev_0 - 1);
			if (expandedId === id_1) setExpandedId(null);
			setSelectedIds((prev_1) => {
				if (!prev_1.has(id_1)) return prev_1;
				const next_1 = new Set(prev_1);
				next_1.delete(id_1);
				return next_1;
			});
			refreshEmptyCount();
			showToast(t.sessions.sessionDeleted, "success");
			loadStats();
		} catch {
			showToast(t.sessions.failedToDelete, "error");
			throw new Error("delete failed");
		}
	}, [
		expandedId,
		refreshEmptyCount,
		rowProfile,
		showToast,
		loadStats,
		t.sessions.sessionDeleted,
		t.sessions.failedToDelete
	]) });
	/** Toggle one row's selection. When ``event.shiftKey`` is true AND we
	*  have a previous anchor, every row between the anchor and the
	*  current index (inclusive) is set to the current row's NEW state —
	*  matches Gmail/Notion/file-explorer semantics. ``visibleList`` must
	*  be the currently rendered list (post-search), since indices are
	*  resolved against what the user is actually looking at.
	*/
	const handleSelectClick = (0, import_react.useCallback)((event_0, index, visibleList) => {
		const id_2 = visibleList[index]?.id;
		if (!id_2) return;
		setSelectedIds((prev_2) => {
			const next_2 = new Set(prev_2);
			const willSelect = !next_2.has(id_2);
			const anchor = lastClickedIndexRef.current;
			if (event_0.shiftKey && anchor !== null && anchor < visibleList.length) {
				const [lo, hi] = anchor <= index ? [anchor, index] : [index, anchor];
				for (let i = lo; i <= hi; i++) {
					const rowId = visibleList[i]?.id;
					if (!rowId) continue;
					if (willSelect) next_2.add(rowId);
					else next_2.delete(rowId);
				}
			} else if (willSelect) next_2.add(id_2);
			else next_2.delete(id_2);
			return next_2;
		});
		lastClickedIndexRef.current = index;
	}, []);
	const selectAllOnPage = (0, import_react.useCallback)((visibleList_0) => {
		setSelectedIds((prev_3) => {
			const next_3 = new Set(prev_3);
			for (const s_1 of visibleList_0) next_3.add(s_1.id);
			return next_3;
		});
	}, []);
	const handleDeleteSelected = (0, import_react.useCallback)(async () => {
		const ids = Array.from(selectedIds);
		if (ids.length === 0) {
			setDeleteSelectedOpen(false);
			return;
		}
		setDeletingSelected(true);
		try {
			const owners = new Set(ids.map(rowProfile));
			const resp_1 = await api.bulkDeleteSessions(ids, owners.size === 1 ? [...owners][0] : void 0);
			const skippedCount = resp_1.skipped_active?.length ?? 0;
			if (skippedCount) showToast(t.sessions.selectedSessionsSkippedActive.replace("{deleted}", String(resp_1.deleted)).replace("{count}", String(skippedCount)), "error");
			else showToast(t.sessions.selectedSessionsDeleted.replace("{count}", String(resp_1.deleted)), "success");
			setDeleteSelectedOpen(false);
			const skipped = new Set(resp_1.skipped_active ?? []);
			const deletedSet = new Set(ids.filter((id_3) => !skipped.has(id_3)));
			setSessions((prev_4) => prev_4.filter((s_2) => !deletedSet.has(s_2.id)));
			setTotal((prev_5) => Math.max(0, prev_5 - resp_1.deleted));
			if (expandedId && deletedSet.has(expandedId)) setExpandedId(null);
			clearSelection();
			loadSessions(page);
			refreshEmptyCount();
		} catch {
			showToast(t.sessions.failedToDeleteSelected, "error");
		} finally {
			setDeletingSelected(false);
		}
	}, [
		clearSelection,
		expandedId,
		loadSessions,
		page,
		refreshEmptyCount,
		rowProfile,
		selectedIds,
		showToast,
		t.sessions.failedToDeleteSelected,
		t.sessions.selectedSessionsDeleted
	]);
	const handleDeleteEmpty = (0, import_react.useCallback)(async () => {
		setDeletingEmpty(true);
		try {
			const resp_2 = await api.deleteEmptySessions();
			showToast(t.sessions.emptySessionsDeleted.replace("{count}", String(resp_2.deleted)), "success");
			setDeleteEmptyOpen(false);
			loadSessions(page);
			refreshEmptyCount();
		} catch {
			showToast(t.sessions.failedToDeleteEmpty, "error");
		} finally {
			setDeletingEmpty(false);
		}
	}, [
		loadSessions,
		page,
		refreshEmptyCount,
		showToast,
		t.sessions.emptySessionsDeleted,
		t.sessions.failedToDeleteEmpty
	]);
	const handleRename = (0, import_react.useCallback)(async (id_4, title, profile) => {
		const targetProfile = profile ?? rowProfile(id_4);
		try {
			await api.renameSession(id_4, title, targetProfile);
			setSessions((prev_6) => prev_6.map((s_3) => s_3.id === id_4 ? {
				...s_3,
				title
			} : s_3));
			setOverviewSessions((prev_7) => prev_7.map((s_4) => s_4.id === id_4 ? {
				...s_4,
				title
			} : s_4));
			showToast("Session renamed", "success");
			loadStats();
		} catch {
			showToast("Failed to rename session", "error");
		}
	}, [
		rowProfile,
		showToast,
		loadStats
	]);
	const handleExport = (0, import_react.useCallback)(async (id_5) => {
		try {
			const res = await fetch(api.exportSessionUrl(id_5, rowProfile(id_5)), {
				credentials: "include",
				headers: { "X-Hermes-Session-Token": window.__HERMES_SESSION_TOKEN__ ?? "" }
			});
			if (!res.ok) throw apiErrorFromResponse(res.status, await res.text().catch(() => ""), res.url);
			const blob = await res.blob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `session-${id_5}.json`;
			a.click();
			URL.revokeObjectURL(url);
		} catch {
			showToast("Failed to export session", "error");
		}
	}, [rowProfile, showToast]);
	const handlePrune = (0, import_react.useCallback)(async () => {
		const days = parseInt(pruneDays, 10);
		if (!Number.isFinite(days) || days < 0) {
			showToast("Enter a valid number of days", "error");
			return;
		}
		setPruning(true);
		try {
			const resp_3 = await api.pruneSessions(days);
			showToast(formatSessionPruneResult(resp_3), "success");
			setPruneOpen(false);
			loadSessions(0);
			setPage(0);
			loadStats();
		} catch {
			showToast("Failed to prune sessions", "error");
		} finally {
			setPruning(false);
		}
	}, [
		pruneDays,
		showToast,
		loadSessions,
		loadStats
	]);
	const pendingSession = sessionDelete.pendingId ? sessions.find((s_5) => s_5.id === sessionDelete.pendingId) : null;
	const snippetMap = /* @__PURE__ */ new Map();
	if (searchResults) for (const r_1 of searchResults) {
		snippetMap.set(r_1.session_id, r_1.snippet);
		snippetMap.set(r_1.id, r_1.snippet);
	}
	const filtered = searchResults ?? sessions;
	const platformEntries = status ? Object.entries(status.gateway_platforms ?? {}) : [];
	const recentSessions = overviewSessions.filter((s_6) => !s_6.is_active).slice(0, 5);
	const isSearching = Boolean(search.trim());
	const showOverviewTab = platformEntries.length > 0 || recentSessions.length > 0;
	const showList = view === "list" || isSearching || !showOverviewTab;
	const showPagination = showList && !isSearching && total > PAGE_SIZE;
	const alerts = [];
	if (status) {
		if (status.gateway_state === "startup_failed") alerts.push({
			message: t.status.gatewayFailedToStart,
			detail: status.gateway_exit_reason ?? void 0
		});
		const failedPlatformEntries = platformEntries.filter(([, info]) => info.state === "fatal" || info.state === "disconnected");
		for (const [name, info_0] of failedPlatformEntries) {
			const stateLabel = info_0.state === "fatal" ? t.status.platformError : t.status.platformDisconnected;
			alerts.push({
				message: `${name.charAt(0).toUpperCase() + name.slice(1)} ${stateLabel}`,
				detail: info_0.error_message ?? void 0
			});
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-2xl text-primary" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 w-full max-w-full flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "sessions:top" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: importInputRef,
				type: "file",
				accept: ".json,.jsonl,application/json,application/x-ndjson",
				className: "hidden",
				onChange: (event_1) => void handleImportSessions(event_1.currentTarget.files)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: sessionDelete.isOpen,
				onCancel: sessionDelete.cancel,
				onConfirm: sessionDelete.confirm,
				title: t.sessions.confirmDeleteTitle,
				description: pendingSession?.title && pendingSession.title !== "Untitled" ? `"${pendingSession.title}" — ${t.sessions.confirmDeleteMessage}` : t.sessions.confirmDeleteMessage,
				loading: sessionDelete.isDeleting
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: deleteEmptyOpen,
				onCancel: () => setDeleteEmptyOpen(false),
				onConfirm: handleDeleteEmpty,
				title: t.sessions.deleteEmptyConfirmTitle,
				description: t.sessions.deleteEmptyConfirmMessage.replace("{count}", String(emptyCount)),
				loading: deletingEmpty
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: deleteSelectedOpen,
				onCancel: () => setDeleteSelectedOpen(false),
				onConfirm: handleDeleteSelected,
				title: t.sessions.deleteSelectedConfirmTitle.replace("{count}", String(selectedIds.size)),
				description: t.sessions.deleteSelectedConfirmMessage.replace("{count}", String(selectedIds.size)),
				loading: deletingSelected
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: pruneOpen,
				onOpenChange: (open) => {
					if (!pruning) setPruneOpen(open);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Prune old sessions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Permanently remove archived sessions whose last activity is older than the given number of days. Active sessions are never pruned." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "prune-days",
								className: "text-xs font-medium text-muted-foreground",
								children: "Older than (days)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "prune-days",
								type: "number",
								min: 0,
								value: pruneDays,
								onChange: (e) => setPruneDays(e.target.value),
								onKeyDown: (e_0) => {
									if (e_0.key === "Enter") handlePrune();
								},
								disabled: pruning
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							outlined: true,
							onClick: () => setPruneOpen(false),
							disabled: pruning,
							children: t.common.cancel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							destructive: true,
							onClick: () => void handlePrune(),
							disabled: pruning,
							className: "gap-1.5",
							children: [pruning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-sm" }), "Prune"]
						})] })
					]
				})
			}),
			stats && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-x-6 gap-y-2 border border-border bg-background-base/40 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-semibold tabular-nums leading-none",
							children: stats.total
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Total"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-semibold tabular-nums leading-none text-success",
							children: stats.active_store
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Active in store"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-semibold tabular-nums leading-none",
							children: stats.archived
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Archived"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-semibold tabular-nums leading-none",
							children: stats.messages
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Messages"
						})]
					}),
					Object.keys(stats.by_source).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-semibold tabular-nums leading-none",
							children: Object.keys(stats.by_source).length
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Sources"
						})]
					})
				]
			}),
			alerts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border border-destructive/30 bg-destructive/[0.06] p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 text-destructive shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2 min-w-0",
						children: alerts.map((alert, i_0) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-destructive",
							children: alert.message
						}), alert.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive/70 mt-0.5",
							children: alert.detail
						})] }, i_0))
					})]
				})
			}),
			activeAction && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-border bg-background-base/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 border-b border-border px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 min-w-0",
						children: [
							actionStatus?.running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "shrink-0 text-[0.875rem] text-warning" }) : actionStatus?.exit_code === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 shrink-0 text-success" }) : actionStatus !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5 shrink-0 text-destructive" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "shrink-0 text-[0.875rem] text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-mondwest tracking-[0.12em] truncate",
								children: activeAction === "restart" ? t.status.restartGateway : t.status.updateHermes
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: actionStatus?.running ? "warning" : actionStatus?.exit_code === 0 ? "success" : actionStatus ? "destructive" : "outline",
								className: "text-xs shrink-0",
								children: actionStatus?.running ? t.status.running : actionStatus?.exit_code === 0 ? t.status.actionFinished : actionStatus ? `${t.status.actionFailed} (${actionStatus.exit_code ?? "?"})` : t.common.loading
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						ghost: true,
						size: "icon",
						onClick: dismissLog,
						className: "shrink-0 text-text-secondary hover:text-foreground",
						"aria-label": t.common.close,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					ref: logScrollRef,
					className: "max-h-72 overflow-auto px-3 py-2 font-mono-ui text-xs leading-relaxed whitespace-pre-wrap break-all",
					children: actionStatus?.lines && actionStatus.lines.length > 0 ? actionStatus.lines.join("\n") : t.status.waitingForOutput
				})]
			}),
			showOverviewTab && !isSearching || showList ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full min-w-0 flex-wrap items-center gap-2 sm:gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-wrap items-center gap-2 sm:gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
							className: "w-fit shrink-0",
							size: "md",
							value: sessionCategory,
							onChange: updateSessionCategory,
							options: [
								{
									value: "chats",
									label: t.sessions.filterChats
								},
								{
									value: "automation",
									label: t.sessions.filterAutomation
								},
								{
									value: "all",
									label: t.sessions.filterAll
								}
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							ref: sourceMenuRef,
							className: "relative shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								outlined: true,
								size: "sm",
								prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListFilter, {}),
								suffix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `transition-transform ${sourceMenuOpen ? "rotate-180" : ""}` }),
								className: "h-8 min-w-[10rem] max-w-[14rem] justify-between text-xs",
								"aria-label": t.sessions.sourceFilter,
								"aria-expanded": sourceMenuOpen,
								onClick: () => setSourceMenuOpen((open_0) => !open_0),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 truncate",
									children: sourceFilterLabel
								})
							}), sourceMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute left-0 top-full z-30 mt-1 w-[18rem] max-w-[calc(100vw-2rem)] border border-border bg-background-base shadow-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2 border-b border-border px-2 py-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 truncate text-xs text-muted-foreground",
										children: sourceMenuTitle
									}), selectedSources !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										size: "xs",
										onClick: clearSourceFilters,
										className: "shrink-0",
										children: t.common.clear
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "max-h-64 overflow-y-auto p-1",
									children: sourceOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-2 py-2 text-xs text-muted-foreground",
										children: sourceMenuTitle
									}) : sourceOptions.map(([source_7, count]) => {
										const selected_1 = selectedSourceSet.has(source_7);
										const SourceIcon = SOURCE_CONFIG[source_7]?.icon ?? Terminal;
										const sourceColor = SOURCE_CONFIG[source_7]?.color ?? "text-muted-foreground";
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex min-w-0 items-center gap-2 px-2 py-1.5 hover:bg-secondary/40",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: selected_1,
												onClick: (event_2) => {
													event_2.stopPropagation();
													toggleSourceFilter(source_7);
												},
												"aria-label": `${t.sessions.sourceFilter}: ${sourceLabel(source_7)}`
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												className: "flex min-w-0 flex-1 items-center gap-2 text-left text-xs",
												onClick: () => toggleSourceFilter(source_7),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceIcon, { className: `h-3.5 w-3.5 shrink-0 ${sourceColor}` }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "min-w-0 flex-1 truncate",
														children: sourceLabel(source_7)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "shrink-0 tabular-nums text-muted-foreground",
														children: count
													})
												]
											})]
										}, source_7);
									})
								})]
							})]
						}),
						showOverviewTab && !isSearching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
							className: "w-fit shrink-0",
							size: "md",
							value: view,
							onChange: switchView,
							options: [{
								value: "overview",
								label: t.sessions.overview
							}, {
								value: "list",
								label: t.sessions.history
							}]
						}),
						showList && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-0 w-full sm:w-auto sm:min-w-[12rem] sm:max-w-md sm:flex-1",
							children: [
								searching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-[0.875rem] text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: t.sessions.searchPlaceholder,
									value: search,
									onChange: (e_1) => updateSearch(e_1.target.value),
									className: "h-8 py-0 pr-7 pl-8 text-xs leading-none"
								}),
								search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									ghost: true,
									size: "xs",
									className: "absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
									onClick: () => updateSearch(""),
									"aria-label": t.common.clear,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
								})
							]
						}),
						showList && emptyCount > 0 && !isSearching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							outlined: true,
							destructive: true,
							size: "sm",
							className: "shrink-0",
							onClick: () => setDeleteEmptyOpen(true),
							"aria-label": t.sessions.deleteEmpty,
							title: t.sessions.deleteEmpty,
							prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, {}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mondwest normal-case text-xs",
								children: [
									t.sessions.deleteEmpty,
									" (",
									emptyCount,
									")"
								]
							})
						}),
						!isSearching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							outlined: true,
							size: "sm",
							className: "shrink-0",
							disabled: importingSessions,
							onClick: () => importInputRef.current?.click(),
							"aria-label": "Import exported sessions",
							title: "Import exported session JSON or JSONL",
							prefix: importingSessions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mondwest normal-case text-xs",
								children: "Import sessions"
							})
						})
					]
				}), showPagination && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionsPagination, {
					compact: true,
					className: "shrink-0 sm:ml-auto",
					page,
					total,
					onPageChange: goToPage
				})]
			}) : null,
			showList && selectedIds.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 border border-primary/30 bg-primary/[0.06] px-3 py-2",
				role: "region",
				"aria-label": t.sessions.selectedCount.replace("{count}", String(selectedIds.size)),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mondwest normal-case text-xs text-primary tabular-nums",
						children: t.sessions.selectedCount.replace("{count}", String(selectedIds.size))
					}),
					filtered.some((s_7) => !selectedIds.has(s_7.id)) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						ghost: true,
						size: "sm",
						onClick: () => selectAllOnPage(filtered),
						"aria-label": t.sessions.selectAllOnPage,
						title: t.sessions.selectAllOnPage,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mondwest normal-case text-xs",
							children: t.sessions.selectAllOnPage
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						ghost: true,
						size: "sm",
						onClick: clearSelection,
						"aria-label": t.sessions.clearSelection,
						title: t.sessions.clearSelection,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mondwest normal-case text-xs",
							children: t.sessions.clearSelection
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						outlined: true,
						destructive: true,
						size: "sm",
						className: "ml-auto",
						onClick: () => setDeleteSelectedOpen(true),
						"aria-label": t.sessions.deleteSelected.replace("{count}", String(selectedIds.size)),
						title: t.sessions.deleteSelected.replace("{count}", String(selectedIds.size)),
						prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mondwest normal-case text-xs",
							children: t.sessions.deleteSelected.replace("{count}", String(selectedIds.size))
						})
					})
				]
			}),
			showList ? filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-16 text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-8 w-8 mb-3 opacity-40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: search ? t.sessions.noMatch : selectedSources !== null || sessionCategory !== "chats" ? t.sessions.noSessionsInFilter : t.sessions.noSessions
					}),
					!search && sessionCategory === "chats" && selectedSources === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs mt-1 text-text-tertiary",
						children: t.sessions.startConversation
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-w-0 flex-col gap-1.5",
				children: filtered.map((s_8, index_0) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionRow, {
					session: s_8,
					snippet: snippetMap.get(s_8.id),
					searchQuery: search || void 0,
					isExpanded: expandedId === s_8.id,
					isSelected: selectedIds.has(s_8.id),
					onToggle: () => setExpandedId((prev_8) => prev_8 === s_8.id ? null : s_8.id),
					onSelectClick: (event_3) => handleSelectClick(event_3, index_0, filtered),
					onDelete: () => sessionDelete.requestDelete(s_8.id),
					onRename: handleRename,
					onExport: handleExport,
					resumeInChatEnabled
				}, s_8.id))
			}), showPagination && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionsPagination, {
				page,
				total,
				onPageChange: goToPage
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-4",
				children: [platformEntries.length > 0 && status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformsCard, { platforms: platformEntries }), recentSessions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "min-w-0 max-w-full overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "min-w-0 truncate text-base",
								children: t.status.recentSessions
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
						className: "grid min-w-0 gap-3",
						children: recentSessions.map((s_9) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 max-w-full flex-col gap-2 border border-border p-3 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 flex-1 flex-col gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `font-mondwest normal-case min-w-0 truncate text-sm ${s_9.title ? "font-medium" : "text-muted-foreground italic"}`,
										children: s_9.title ?? (s_9.preview ? s_9.preview.slice(0, 60) : t.common.untitled)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 break-words text-xs text-muted-foreground",
										children: [
											s_9.model && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono-ui",
													children: s_9.model.split("/").pop()
												}),
												" ",
												"·",
												" "
											] }),
											s_9.message_count,
											" ",
											t.common.msgs,
											" ·",
											" ",
											timeAgo(s_9.last_active)
										]
									}),
									s_9.preview && s_9.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mondwest normal-case min-w-0 max-w-full text-xs leading-snug text-text-tertiary [overflow-wrap:anywhere]",
										children: s_9.preview
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "outline",
								className: "shrink-0 self-start text-xs sm:self-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "mr-1 h-3 w-3" }), s_9.source ? sourceLabel(s_9.source) : "local"]
							})]
						}, s_9.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "sessions:bottom" })
		]
	});
}
//#endregion
export { SessionsPage as default };
