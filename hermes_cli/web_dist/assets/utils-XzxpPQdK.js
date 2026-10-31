import { H as twMerge, U as clsx } from "./ui-vIdGzE07.js";
//#region web/src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/** Mondwest body copy — sentence-case themed text (not uppercase chrome). */
var themedBody = "font-mondwest normal-case";
/** Relative time from a Unix epoch timestamp (seconds). */
function timeAgo(ts) {
	const delta = Date.now() / 1e3 - ts;
	if (delta < 60) return "just now";
	if (delta < 3600) return `${Math.floor(delta / 60)}m ago`;
	if (delta < 86400) return `${Math.floor(delta / 3600)}h ago`;
	if (delta < 172800) return "yesterday";
	return `${Math.floor(delta / 86400)}d ago`;
}
/** Relative time from an ISO-8601 timestamp string. */
function isoTimeAgo(iso) {
	const delta = (Date.now() - new Date(iso).getTime()) / 1e3;
	if (delta < 0 || Number.isNaN(delta)) return "unknown";
	if (delta < 60) return "just now";
	if (delta < 3600) return `${Math.floor(delta / 60)}m ago`;
	if (delta < 86400) return `${Math.floor(delta / 3600)}h ago`;
	return `${Math.floor(delta / 86400)}d ago`;
}
//#endregion
export { timeAgo as i, isoTimeAgo as n, themedBody as r, cn as t };
