import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, n as require_compiler_runtime, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { Ht as Clock, J as Pause, K as Play, c as WandSparkles, g as Trash2, n as Zap, q as Pencil, r as X } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, L as Spinner, N as Select, P as SelectOption, a as H2, b as useConfirmDelete, f as Label, h as CardContent, i as Segmented, m as Card, p as Input, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { r as themedBody, t as cn } from "./utils-XzxpPQdK.js";
import { i as en, r as useI18n } from "./i18n-Zn9FHQtI.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { u as PluginSlot } from "./index-CeRydpmd.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
import { t as useModalBehavior } from "./useModalBehavior-DSqJduTw.js";
import { t as DeleteConfirmDialog } from "./DeleteConfirmDialog-CS54bGFr.js";
import { t as LoadErrorNotice } from "./LoadErrorNotice-BOHNWMyf.js";
//#region apps/shared/src/cron-trigger-controller.ts
function createCronTriggerController(onRunningChange = () => void 0) {
	const running = /* @__PURE__ */ new Set();
	return {
		isRunning: (key) => running.has(key),
		async run(key, action, onStarted) {
			if (running.has(key)) return {
				started: false,
				value: null
			};
			running.add(key);
			try {
				onRunningChange(key, true);
				onStarted?.();
				return {
					started: true,
					value: await action()
				};
			} finally {
				running.delete(key);
				onRunningChange(key, false);
			}
		}
	};
}
//#endregion
//#region web/src/lib/cron-job.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_compiler_runtime = require_compiler_runtime();
/** Split a comma/newline list (or array) into trimmed, non-empty items. */
function splitCronList(value) {
	return (Array.isArray(value) ? value : typeof value === "string" ? value.split(/[\n,]/) : []).map((item) => String(item).trim()).filter(Boolean);
}
/** Trim to a non-empty string, or null. Optionally strip trailing slashes
* (base URLs). Mirrors the backend's `_cron_optional_text`. */
function optionalText(value, stripTrailingSlash = false) {
	return (stripTrailingSlash ? value.trim().replace(/\/+$/, "") : value.trim()) || null;
}
/** Read a stored string field as a plain string ("" when absent). */
function asString(value) {
	return typeof value === "string" ? value : "";
}
/** Build the create/update payload. Optional fields collapse to null so an
* update explicitly clears them rather than leaving stale values. */
function buildCronJobPayload(form) {
	const contextFrom = splitCronList(form.context_from).filter((item) => item.toLowerCase() !== "self");
	if (form.continuity) contextFrom.push("self");
	const enabledToolsets = form.enabled_toolsets.filter(Boolean);
	return {
		name: form.name.trim(),
		prompt: form.prompt.trim(),
		schedule: form.schedule.trim(),
		deliver: form.deliver.trim() || "local",
		skills: form.skills.filter(Boolean),
		provider: optionalText(form.provider),
		model: optionalText(form.model),
		base_url: optionalText(form.base_url, true),
		script: optionalText(form.script),
		no_agent: Boolean(form.no_agent),
		context_from: contextFrom.length > 0 ? contextFrom : null,
		enabled_toolsets: enabledToolsets.length > 0 ? enabledToolsets : null,
		workdir: optionalText(form.workdir)
	};
}
function cronJobHasExecutionContent(job) {
	const skills = Array.isArray(job.skills) ? job.skills.filter(Boolean) : [];
	return Boolean(asString(job.prompt).trim() || asString(job.script).trim() || skills.length);
}
/** Focus a cron editor input by id (the editor renders `${idPrefix}-script`, etc.). */
function focusCronField(id) {
	if (typeof document === "undefined") return;
	const el = document.getElementById(id);
	if (el instanceof HTMLElement) {
		el.focus();
		el.scrollIntoView?.({ block: "center" });
	}
}
function cronJobFormFromJob(job) {
	const storedRefs = splitCronList(job.context_from);
	const continuity = Boolean(job.continuity) || storedRefs.some((item) => item.toLowerCase() === "self");
	const externalRefs = storedRefs.filter((item) => item.toLowerCase() !== "self");
	return {
		name: asString(job.name),
		prompt: asString(job.prompt),
		schedule: asString(job.schedule?.expr) || asString(job.schedule?.run_at) || asString(job.schedule_display),
		deliver: asString(job.deliver) || "local",
		skills: Array.isArray(job.skills) ? job.skills.filter(Boolean) : [],
		provider: asString(job.provider),
		model: asString(job.model),
		base_url: asString(job.base_url),
		script: asString(job.script),
		no_agent: Boolean(job.no_agent),
		context_from: externalRefs.join("\n"),
		continuity,
		enabled_toolsets: splitCronList(job.enabled_toolsets),
		workdir: asString(job.workdir)
	};
}
var CRON_LAST_RESULT_TONE = {
	ok: "success",
	delivery_failed: "warning",
	blocked_config: "warning",
	error: "destructive"
};
function cronLastResult(job) {
	const status = asString(job.last_status).trim();
	if (!status) return null;
	const tone = CRON_LAST_RESULT_TONE[status] ?? "destructive";
	if (status === "ok") return {
		status,
		tone,
		detail: null
	};
	return {
		status,
		tone,
		detail: (status === "delivery_failed" ? asString(job.last_delivery_error).trim() || asString(job.last_error).trim() : asString(job.last_error).trim() || asString(job.last_delivery_error).trim()) || null
	};
}
/**
* Milliseconds a job's stored `next_run_at` has sat in the past beyond the doctor grace, or
* null when the job is upcoming, within grace, not expected to fire, or has no parseable stamp.
* A stamp parked in the past is the only user-visible trace of a dead scheduler (#114309), so
* the dashboard must never present it as an upcoming "Next".
*/
function cronNextRunOverdueMs(job, nowMs = Date.now()) {
	if (job.enabled === false || job.state === "paused" || job.state === "completed") return null;
	const at = Date.parse(asString(job.next_run_at));
	if (Number.isNaN(at)) return null;
	const overdue = nowMs - at;
	return overdue > 9e5 ? overdue : null;
}
/**
* Seconds since the scheduler last ticked when that is long enough ago to strand jobs, or null
* while it ticks on time, when no listed job is expected to fire, or when the server could not
* date the last tick. Jobs from several profiles report their own ticker; the oldest wins.
*/
function cronSchedulerStaleAgeS(jobs) {
	let stale = null;
	for (const job of jobs) {
		const age = job.scheduler_heartbeat_age_s;
		if (typeof age !== "number" || age <= 200) continue;
		if (job.enabled === false || job.state === "paused" || job.state === "completed") continue;
		if (stale === null || age > stale) stale = age;
	}
	return stale;
}
/** "7h ago"-style label for an elapsed duration in seconds (no clock read, so it renders pure). */
function cronAgoLabel(seconds) {
	if (seconds < 3600) return `${Math.max(1, Math.floor(seconds / 60))}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
//#endregion
//#region web/src/lib/schedule.ts
/** Cron weekday convention: Sunday = 0 .. Saturday = 6. Matches what
* croniter expects on the backend (no need to remap on submit). */
var WEEKDAY_INDEXES = [
	0,
	1,
	2,
	3,
	4,
	5,
	6
];
/** Default state — "every 30 minutes" is the most-common-cron-pattern
* starting point and avoids forcing the user to pick everything from
* scratch. */
var DEFAULT_SCHEDULE_STATE = {
	mode: "interval",
	intervalValue: 30,
	intervalUnit: "minutes",
	timeOfDay: "09:00",
	weekdays: [
		1,
		2,
		3,
		4,
		5
	],
	dayOfMonth: 1,
	onceAt: "",
	custom: ""
};
var UNIT_SUFFIX = {
	minutes: "m",
	hours: "h",
	days: "d"
};
/** Build the schedule string from picker state. Returns ``""`` when the
* state is incomplete enough that the backend would 400 — the caller
* uses that to disable the Submit button.
*
* Why we lean on the broad parse_schedule grammar instead of always
* emitting cron expressions: interval syntax ("every 30m") survives a
* backend without ``croniter`` installed and renders more readably in
* the job list. We only emit raw cron when the picker truly needs the
* cron field expressiveness (specific weekdays, specific day-of-month). */
function buildScheduleString(state) {
	switch (state.mode) {
		case "interval": {
			const n = Math.floor(state.intervalValue);
			if (!Number.isFinite(n) || n < 1) return "";
			return `every ${n}${UNIT_SUFFIX[state.intervalUnit]}`;
		}
		case "daily": {
			const parsed = parseTimeOfDay(state.timeOfDay);
			if (!parsed) return "";
			return `${parsed.minute} ${parsed.hour} * * *`;
		}
		case "weekly": {
			const parsed = parseTimeOfDay(state.timeOfDay);
			if (!parsed) return "";
			const days = state.weekdays.length === 0 ? "*" : [...state.weekdays].sort((a, b) => a - b).join(",");
			return `${parsed.minute} ${parsed.hour} * * ${days}`;
		}
		case "monthly": {
			const parsed = parseTimeOfDay(state.timeOfDay);
			if (!parsed) return "";
			const dom = Math.floor(state.dayOfMonth);
			if (!Number.isFinite(dom) || dom < 1 || dom > 31) return "";
			return `${parsed.minute} ${parsed.hour} ${dom} * *`;
		}
		case "once": {
			const v = state.onceAt.trim();
			if (!v) return "";
			return v.length === 16 ? `${v}:00` : v;
		}
		case "custom": return state.custom.trim();
	}
}
/** Parse schedules emitted by buildScheduleString; unknown strings stay custom. */
function parseScheduleString(schedule) {
	const trimmed = schedule.trim();
	if (!trimmed) return { ...DEFAULT_SCHEDULE_STATE };
	if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?$/.test(trimmed)) return {
		...DEFAULT_SCHEDULE_STATE,
		mode: "once",
		onceAt: trimmed.slice(0, 16)
	};
	const intervalMatch = /^every\s+(\d+)\s*([mhd])$/i.exec(trimmed);
	if (intervalMatch) {
		const value = Number.parseInt(intervalMatch[1], 10);
		const suffix = intervalMatch[2].toLowerCase();
		const unit = suffix === "d" ? "days" : suffix === "h" ? "hours" : "minutes";
		return {
			...DEFAULT_SCHEDULE_STATE,
			mode: "interval",
			intervalValue: Number.isFinite(value) && value > 0 ? value : 1,
			intervalUnit: unit
		};
	}
	const parsedCron = parseSimpleCronExpression(trimmed);
	if (parsedCron) {
		if (parsedCron.mode === "daily") return {
			...DEFAULT_SCHEDULE_STATE,
			mode: "daily",
			timeOfDay: parsedCron.time
		};
		if (parsedCron.mode === "weekly") return {
			...DEFAULT_SCHEDULE_STATE,
			mode: "weekly",
			timeOfDay: parsedCron.time,
			weekdays: parsedCron.weekdays ?? []
		};
		return {
			...DEFAULT_SCHEDULE_STATE,
			mode: "monthly",
			timeOfDay: parsedCron.time,
			dayOfMonth: parsedCron.dayOfMonth ?? 1
		};
	}
	return {
		...DEFAULT_SCHEDULE_STATE,
		mode: "custom",
		custom: trimmed
	};
}
/**
* Shared helper: recognise the simple, well-shaped 5-field cron patterns
* that both the human-readable describer and the schedule builder care
* about. Returns a structured result or ``null`` when the expression has
* ranges, steps, per-month rules, or other complexity.
*/
function parseSimpleCronExpression(expr) {
	const parts = expr.trim().split(/\s+/);
	if (parts.length !== 5) return null;
	const [minField, hourField, domField, monField, dowField] = parts;
	if (monField !== "*") return null;
	const isLiteralOrList = (f) => /^\d+(,\d+)*$|^\*$/.test(f);
	if (!isLiteralOrList(minField) || !isLiteralOrList(hourField) || !isLiteralOrList(domField) || !isLiteralOrList(dowField)) return null;
	if (minField === "*" || hourField === "*") return null;
	const minutes = minField.split(",").map((n) => parseInt(n, 10));
	const hours = hourField.split(",").map((n) => parseInt(n, 10));
	if (minutes.length !== 1 || hours.length !== 1) return null;
	if (!Number.isFinite(minutes[0]) || !Number.isFinite(hours[0]) || hours[0] < 0 || hours[0] > 23 || minutes[0] < 0 || minutes[0] > 59) return null;
	const time = `${pad2(hours[0])}:${pad2(minutes[0])}`;
	const domAll = domField === "*";
	const dowAll = dowField === "*";
	if (domAll && dowAll) return {
		mode: "daily",
		time
	};
	if (domAll && !dowAll) {
		const weekdays = [];
		for (const part of dowField.split(",")) {
			const day = parseInt(part, 10);
			if (!Number.isFinite(day) || day < 0 || day > 7) return null;
			const normalized = day === 7 ? 0 : day;
			if (!weekdays.includes(normalized)) weekdays.push(normalized);
		}
		if (weekdays.length === 0) return null;
		return {
			mode: "weekly",
			time,
			weekdays
		};
	}
	if (!domAll && dowAll) {
		if (!/^\d+$/.test(domField)) return null;
		const dom = parseInt(domField, 10);
		if (!Number.isFinite(dom) || dom < 1 || dom > 31) return null;
		return {
			mode: "monthly",
			time,
			dayOfMonth: dom
		};
	}
	return null;
}
function parseTimeOfDay(value) {
	if (!value || !/^\d{1,2}:\d{2}$/.test(value)) return null;
	const [hh, mm] = value.split(":");
	const hour = parseInt(hh, 10);
	const minute = parseInt(mm, 10);
	if (!Number.isFinite(hour) || !Number.isFinite(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
	return {
		hour,
		minute
	};
}
/** Human-readable description of a stored schedule.
*
* Prefers a structured render over the raw ``display`` string so cron
* expressions like ``30 14 * * 1,3,5`` show up as "Weekly on Mon, Wed,
* Fri at 14:30" instead of the raw five-field gibberish. Falls back to
* ``display`` / ``expr`` / ``none`` in that order if we can't make sense
* of the schedule (e.g. exotic cron with ranges, step values, or @reboot
* macros that we'd misrepresent if we tried to "humanize"). */
function describeSchedule(schedule, fallbackDisplay, strings) {
	if (!schedule) return fallbackDisplay || strings.none;
	if (schedule.kind === "interval" && typeof schedule.minutes === "number") return describeInterval(schedule.minutes, strings);
	if (schedule.kind === "once" && schedule.run_at) return strings.onceAt.replace("{time}", formatIsoLocal(schedule.run_at, false));
	if (schedule.kind === "cron" && schedule.expr) {
		const cronDesc = describeCronExpression(schedule.expr, strings);
		if (cronDesc) return cronDesc;
	}
	if (fallbackDisplay) {
		const cronDesc = describeCronExpression(fallbackDisplay, strings);
		if (cronDesc) return cronDesc;
		return fallbackDisplay;
	}
	if (schedule.display) return schedule.display;
	if (schedule.expr) return schedule.expr;
	return strings.none;
}
function describeInterval(minutes, strings) {
	if (minutes <= 0) return strings.none;
	if (minutes % 1440 === 0) return strings.everyDays.replace("{n}", String(minutes / 1440));
	if (minutes % 60 === 0) return strings.everyHours.replace("{n}", String(minutes / 60));
	return strings.everyMinutes.replace("{n}", String(minutes));
}
/** Recognise the common, well-shaped cron patterns and return a
* human sentence for them. Returns ``null`` when the expression has any
* ranges, steps, or other complexity that would be misleading to
* "humanize" — caller falls back to displaying the raw expression so
* the user sees what's actually scheduled.
*
* Strictly 5-field only: the backend ``parse_schedule`` also accepts the
* 6-field ``minute hour dom month dow year`` form, but humanising those
* by destructuring only the first five fields would silently drop the
* year and mislead the user (e.g. ``0 9 * * * 2099`` would read as
* "Daily at 09:00"). 6+ field expressions intentionally fall through to
* the raw-string fallback in {@link describeSchedule}. */
function describeCronExpression(expr, strings) {
	const parsed = parseSimpleCronExpression(expr);
	if (!parsed) return null;
	if (parsed.mode === "daily") return strings.dailyAt.replace("{time}", parsed.time);
	if (parsed.mode === "weekly") {
		const labels = (parsed.weekdays ?? []).map((d) => strings.weekdaysShort[d]).filter(Boolean).join(", ");
		return strings.weeklyAt.replace("{days}", labels).replace("{time}", parsed.time);
	}
	return strings.monthlyAt.replace("{day}", strings.ordinal(parsed.dayOfMonth ?? 1)).replace("{time}", parsed.time);
}
function pad2(n) {
	return n < 10 ? `0${n}` : String(n);
}
/** Format an ISO date for inline display. Drops the seconds + TZ
* suffix so the cron list stays compact. Falls back to the raw string
* if Date parsing fails. */
function formatIsoLocal(iso, includeSeconds) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	const yyyy = d.getFullYear();
	const mm = pad2(d.getMonth() + 1);
	const dd = pad2(d.getDate());
	const hh = pad2(d.getHours());
	const mi = pad2(d.getMinutes());
	if (includeSeconds) return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${pad2(d.getSeconds())}`;
	return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}
/** Convenience: build an English ordinal suffix ("1st", "2nd", "23rd").
* Most non-English locales should just return ``String(day)`` from
* their ``ordinal`` override. */
function englishOrdinal(day) {
	const d = Math.floor(day);
	if (!Number.isFinite(d) || d < 1) return String(day);
	const lastTwo = d % 100;
	if (lastTwo >= 11 && lastTwo <= 13) return `${d}th`;
	switch (d % 10) {
		case 1: return `${d}st`;
		case 2: return `${d}nd`;
		case 3: return `${d}rd`;
		default: return `${d}th`;
	}
}
//#endregion
//#region web/src/components/ScheduleBuilder.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Human-readable schedule picker for cron job create/edit flows.
*
* Replaces the raw "type a cron expression" input that lived inline in
* ``CronPage``. The picker still emits a single backend-compatible
* schedule string (see ``cron/jobs.py::parse_schedule``), but the user
* fills out shape-appropriate inputs (time picker, weekday toggles,
* datetime-local field) per mode.
*
* Architecture:
*
*  - The component is fully controlled. Parent owns the
*    ``ScheduleBuilderState`` and the derived schedule string (built
*    via ``buildScheduleString`` in render).
*  - Mode-specific state slots (``timeOfDay``, ``weekdays``, ...) are
*    preserved across mode switches so flipping back to a previous mode
*    doesn't erase the user's work.
*  - The "Custom" mode is an escape hatch — surfacing it as a normal
*    option (instead of hiding it behind an "advanced" toggle) keeps
*    power-user workflows discoverable without making everyone scroll
*    past it.
*/
function ScheduleBuilder(t0) {
	const $ = (0, import_compiler_runtime.c)(96);
	const { onChange, value } = t0;
	const { t } = useI18n();
	const cronStrings = t.cron;
	const modeStrings = cronStrings.scheduleModes;
	let t1;
	if ($[0] !== onChange || $[1] !== value) {
		t1 = (patch) => {
			onChange({
				...value,
				...patch
			});
		};
		$[0] = onChange;
		$[1] = value;
		$[2] = t1;
	} else t1 = $[2];
	const update = t1;
	let t2;
	if ($[3] !== update || $[4] !== value.weekdays) {
		t2 = (day) => {
			const present = value.weekdays.includes(day);
			update({ weekdays: present ? value.weekdays.filter((d) => d !== day) : [...value.weekdays, day] });
		};
		$[3] = update;
		$[4] = value.weekdays;
		$[5] = t2;
	} else t2 = $[5];
	const toggleWeekday = t2;
	const t3 = cronStrings.scheduleMode ?? "Schedule";
	let t4;
	if ($[6] !== t3) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: "cron-schedule-mode",
			children: t3
		});
		$[6] = t3;
		$[7] = t4;
	} else t4 = $[7];
	let t5;
	if ($[8] !== update) {
		t5 = (v) => update({ mode: v });
		$[8] = update;
		$[9] = t5;
	} else t5 = $[9];
	let t6;
	if ($[10] !== modeStrings.interval) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
			value: "interval",
			children: modeStrings.interval
		});
		$[10] = modeStrings.interval;
		$[11] = t6;
	} else t6 = $[11];
	let t7;
	if ($[12] !== modeStrings.daily) {
		t7 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
			value: "daily",
			children: modeStrings.daily
		});
		$[12] = modeStrings.daily;
		$[13] = t7;
	} else t7 = $[13];
	let t8;
	if ($[14] !== modeStrings.weekly) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
			value: "weekly",
			children: modeStrings.weekly
		});
		$[14] = modeStrings.weekly;
		$[15] = t8;
	} else t8 = $[15];
	let t9;
	if ($[16] !== modeStrings.monthly) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
			value: "monthly",
			children: modeStrings.monthly
		});
		$[16] = modeStrings.monthly;
		$[17] = t9;
	} else t9 = $[17];
	let t10;
	if ($[18] !== modeStrings.once) {
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
			value: "once",
			children: modeStrings.once
		});
		$[18] = modeStrings.once;
		$[19] = t10;
	} else t10 = $[19];
	let t11;
	if ($[20] !== modeStrings.custom) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
			value: "custom",
			children: modeStrings.custom
		});
		$[20] = modeStrings.custom;
		$[21] = t11;
	} else t11 = $[21];
	let t12;
	if ($[22] !== t10 || $[23] !== t11 || $[24] !== t5 || $[25] !== t6 || $[26] !== t7 || $[27] !== t8 || $[28] !== t9 || $[29] !== value.mode) {
		t12 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			id: "cron-schedule-mode",
			value: value.mode,
			onValueChange: t5,
			children: [
				t6,
				t7,
				t8,
				t9,
				t10,
				t11
			]
		});
		$[22] = t10;
		$[23] = t11;
		$[24] = t5;
		$[25] = t6;
		$[26] = t7;
		$[27] = t8;
		$[28] = t9;
		$[29] = value.mode;
		$[30] = t12;
	} else t12 = $[30];
	let t13;
	if ($[31] !== t12 || $[32] !== t4) {
		t13 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [t4, t12]
		});
		$[31] = t12;
		$[32] = t4;
		$[33] = t13;
	} else t13 = $[33];
	let t14;
	if ($[34] !== modeStrings.intervalEvery || $[35] !== modeStrings.intervalUnit || $[36] !== modeStrings.unitDays || $[37] !== modeStrings.unitHours || $[38] !== modeStrings.unitMinutes || $[39] !== update || $[40] !== value.intervalUnit || $[41] !== value.intervalValue || $[42] !== value.mode) {
		t14 = value.mode === "interval" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[1fr_1.4fr] gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "cron-interval-value",
					children: modeStrings.intervalEvery
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "cron-interval-value",
					type: "number",
					min: 1,
					max: 9999,
					value: String(value.intervalValue),
					onChange: (e) => {
						const n = parseInt(e.target.value, 10);
						update({ intervalValue: Number.isFinite(n) && n > 0 ? n : 1 });
					}
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "cron-interval-unit",
					children: modeStrings.intervalUnit
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					id: "cron-interval-unit",
					value: value.intervalUnit,
					onValueChange: (v_0) => update({ intervalUnit: v_0 }),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
							value: "minutes",
							children: modeStrings.unitMinutes
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
							value: "hours",
							children: modeStrings.unitHours
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
							value: "days",
							children: modeStrings.unitDays
						})
					]
				})]
			})]
		});
		$[34] = modeStrings.intervalEvery;
		$[35] = modeStrings.intervalUnit;
		$[36] = modeStrings.unitDays;
		$[37] = modeStrings.unitHours;
		$[38] = modeStrings.unitMinutes;
		$[39] = update;
		$[40] = value.intervalUnit;
		$[41] = value.intervalValue;
		$[42] = value.mode;
		$[43] = t14;
	} else t14 = $[43];
	let t15;
	if ($[44] !== modeStrings.timeOfDay || $[45] !== update || $[46] !== value.mode || $[47] !== value.timeOfDay) {
		t15 = value.mode === "daily" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeOfDayField, {
			id: "cron-daily-time",
			label: modeStrings.timeOfDay,
			value: value.timeOfDay,
			onChange: (timeOfDay) => update({ timeOfDay })
		});
		$[44] = modeStrings.timeOfDay;
		$[45] = update;
		$[46] = value.mode;
		$[47] = value.timeOfDay;
		$[48] = t15;
	} else t15 = $[48];
	let t16;
	if ($[49] !== modeStrings.timeOfDay || $[50] !== modeStrings.weekdays || $[51] !== modeStrings.weekdaysShort || $[52] !== toggleWeekday || $[53] !== update || $[54] !== value.mode || $[55] !== value.timeOfDay || $[56] !== value.weekdays) {
		t16 = value.mode === "weekly" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: modeStrings.weekdays }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				role: "group",
				"aria-label": modeStrings.weekdays,
				children: WEEKDAY_INDEXES.map((d_0) => {
					const isOn = value.weekdays.includes(d_0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						outlined: !isOn,
						"aria-pressed": isOn,
						onClick: () => toggleWeekday(d_0),
						className: "min-w-[2.5rem] font-mono-ui text-xs uppercase",
						children: modeStrings.weekdaysShort[d_0]
					}, d_0);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeOfDayField, {
			id: "cron-weekly-time",
			label: modeStrings.timeOfDay,
			value: value.timeOfDay,
			onChange: (timeOfDay_0) => update({ timeOfDay: timeOfDay_0 })
		})] });
		$[49] = modeStrings.timeOfDay;
		$[50] = modeStrings.weekdays;
		$[51] = modeStrings.weekdaysShort;
		$[52] = toggleWeekday;
		$[53] = update;
		$[54] = value.mode;
		$[55] = value.timeOfDay;
		$[56] = value.weekdays;
		$[57] = t16;
	} else t16 = $[57];
	let t17;
	if ($[58] !== modeStrings.dayOfMonth || $[59] !== modeStrings.timeOfDay || $[60] !== update || $[61] !== value.dayOfMonth || $[62] !== value.mode || $[63] !== value.timeOfDay) {
		t17 = value.mode === "monthly" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[1fr_1fr] gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "cron-month-day",
					children: modeStrings.dayOfMonth
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "cron-month-day",
					type: "number",
					min: 1,
					max: 31,
					value: String(value.dayOfMonth),
					onChange: (e_0) => {
						const n_0 = parseInt(e_0.target.value, 10);
						update({ dayOfMonth: Number.isFinite(n_0) && n_0 >= 1 && n_0 <= 31 ? n_0 : 1 });
					}
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeOfDayField, {
				id: "cron-monthly-time",
				label: modeStrings.timeOfDay,
				value: value.timeOfDay,
				onChange: (timeOfDay_1) => update({ timeOfDay: timeOfDay_1 })
			})]
		});
		$[58] = modeStrings.dayOfMonth;
		$[59] = modeStrings.timeOfDay;
		$[60] = update;
		$[61] = value.dayOfMonth;
		$[62] = value.mode;
		$[63] = value.timeOfDay;
		$[64] = t17;
	} else t17 = $[64];
	let t18;
	if ($[65] !== modeStrings.onceAt || $[66] !== update || $[67] !== value.mode || $[68] !== value.onceAt) {
		t18 = value.mode === "once" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "cron-once-at",
				children: modeStrings.onceAt
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "cron-once-at",
				type: "datetime-local",
				className: "flex h-9 w-full border border-border bg-background/40 px-3 py-2 text-sm font-courier shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 focus-visible:border-foreground/25",
				value: value.onceAt,
				onChange: (e_1) => update({ onceAt: e_1.target.value })
			})]
		});
		$[65] = modeStrings.onceAt;
		$[66] = update;
		$[67] = value.mode;
		$[68] = value.onceAt;
		$[69] = t18;
	} else t18 = $[69];
	let t19;
	if ($[70] !== modeStrings.customHint || $[71] !== modeStrings.customLabel || $[72] !== modeStrings.customPlaceholder || $[73] !== update || $[74] !== value.custom || $[75] !== value.mode) {
		t19 = value.mode === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "cron-custom-expr",
					children: modeStrings.customLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "cron-custom-expr",
					placeholder: modeStrings.customPlaceholder,
					value: value.custom,
					onChange: (e_2) => update({ custom: e_2.target.value }),
					className: "font-mono-ui"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: modeStrings.customHint
				})
			]
		});
		$[70] = modeStrings.customHint;
		$[71] = modeStrings.customLabel;
		$[72] = modeStrings.customPlaceholder;
		$[73] = update;
		$[74] = value.custom;
		$[75] = value.mode;
		$[76] = t19;
	} else t19 = $[76];
	let t20;
	if ($[77] !== modeStrings.preview) {
		t20 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "opacity-70",
			children: [modeStrings.preview, ": "]
		});
		$[77] = modeStrings.preview;
		$[78] = t20;
	} else t20 = $[78];
	let t21;
	if ($[79] !== modeStrings.previewEmpty || $[80] !== value) {
		t21 = buildScheduleString(value) || modeStrings.previewEmpty;
		$[79] = modeStrings.previewEmpty;
		$[80] = value;
		$[81] = t21;
	} else t21 = $[81];
	let t22;
	if ($[82] !== t21) {
		t22 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono-ui text-foreground",
			children: t21
		});
		$[82] = t21;
		$[83] = t22;
	} else t22 = $[83];
	let t23;
	if ($[84] !== t20 || $[85] !== t22) {
		t23 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted-foreground",
			children: [t20, t22]
		});
		$[84] = t20;
		$[85] = t22;
		$[86] = t23;
	} else t23 = $[86];
	let t24;
	if ($[87] !== t13 || $[88] !== t14 || $[89] !== t15 || $[90] !== t16 || $[91] !== t17 || $[92] !== t18 || $[93] !== t19 || $[94] !== t23) {
		t24 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				t13,
				t14,
				t15,
				t16,
				t17,
				t18,
				t19,
				t23
			]
		});
		$[87] = t13;
		$[88] = t14;
		$[89] = t15;
		$[90] = t16;
		$[91] = t17;
		$[92] = t18;
		$[93] = t19;
		$[94] = t23;
		$[95] = t24;
	} else t24 = $[95];
	return t24;
}
function TimeOfDayField(t0) {
	const $ = (0, import_compiler_runtime.c)(12);
	const { id, label, onChange, value } = t0;
	let t1;
	if ($[0] !== id || $[1] !== label) {
		t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: id,
			children: label
		});
		$[0] = id;
		$[1] = label;
		$[2] = t1;
	} else t1 = $[2];
	let t2;
	if ($[3] !== onChange) {
		t2 = (e) => onChange(e.target.value);
		$[3] = onChange;
		$[4] = t2;
	} else t2 = $[4];
	let t3;
	if ($[5] !== id || $[6] !== t2 || $[7] !== value) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			type: "time",
			className: "flex h-9 w-full border border-border bg-background/40 px-3 py-2 text-sm font-courier shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 focus-visible:border-foreground/25",
			value,
			onChange: t2
		});
		$[5] = id;
		$[6] = t2;
		$[7] = value;
		$[8] = t3;
	} else t3 = $[8];
	let t4;
	if ($[9] !== t1 || $[10] !== t3) {
		t4 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [t1, t3]
		});
		$[9] = t1;
		$[10] = t3;
		$[11] = t4;
	} else t4 = $[11];
	return t4;
}
//#endregion
//#region web/src/components/AutomationBlueprints.tsx
/** Initial form values for a blueprint = each field's default (or ""). */
function initialValues(blueprint) {
	const out = {};
	for (const f of blueprint.fields) out[f.name] = f.default ?? "";
	return out;
}
function FieldInput(t0) {
	const $ = (0, import_compiler_runtime.c)(19);
	const { field, value, onChange } = t0;
	if (field.type === "enum" || field.type === "weekdays") {
		let t1;
		if ($[0] !== onChange) {
			t1 = (v) => onChange(v);
			$[0] = onChange;
			$[1] = t1;
		} else t1 = $[1];
		let t2;
		if ($[2] !== field.options) {
			t2 = field.options.map(_temp$1);
			$[2] = field.options;
			$[3] = t2;
		} else t2 = $[3];
		let t3;
		if ($[4] !== t1 || $[5] !== t2 || $[6] !== value) {
			t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value,
				onValueChange: t1,
				children: t2
			});
			$[4] = t1;
			$[5] = t2;
			$[6] = value;
			$[7] = t3;
		} else t3 = $[7];
		return t3;
	}
	if (field.type === "time") {
		let t1;
		if ($[8] !== onChange) {
			t1 = (e) => onChange(e.target.value);
			$[8] = onChange;
			$[9] = t1;
		} else t1 = $[9];
		let t2;
		if ($[10] !== t1 || $[11] !== value) {
			t2 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "time",
				value,
				onChange: t1
			});
			$[10] = t1;
			$[11] = value;
			$[12] = t2;
		} else t2 = $[12];
		return t2;
	}
	const t1 = field.help || field.label;
	let t2;
	if ($[13] !== onChange) {
		t2 = (e_0) => onChange(e_0.target.value);
		$[13] = onChange;
		$[14] = t2;
	} else t2 = $[14];
	let t3;
	if ($[15] !== t1 || $[16] !== t2 || $[17] !== value) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "text",
			value,
			placeholder: t1,
			onChange: t2
		});
		$[15] = t1;
		$[16] = t2;
		$[17] = value;
		$[18] = t3;
	} else t3 = $[18];
	return t3;
}
function _temp$1(opt) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
		value: opt,
		children: opt
	}, opt);
}
function BlueprintCard({ blueprint, profile, showToast, onCreated }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [values, setValues] = (0, import_react.useState)(() => initialValues(blueprint));
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const submit = (0, import_react.useCallback)(async () => {
		setSubmitting(true);
		setError(null);
		try {
			const job = await api.instantiateAutomationBlueprint({
				blueprint: blueprint.key,
				values
			}, profile);
			const when = job.schedule_display ? ` — ${job.schedule_display}` : "";
			showToast(`${blueprint.title} scheduled${when}`, "success");
			setOpen(false);
			setValues(initialValues(blueprint));
			onCreated?.();
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			setError(msg.replace(/^\d+:\s*/, ""));
		} finally {
			setSubmitting(false);
		}
	}, [
		blueprint,
		values,
		profile,
		showToast,
		onCreated
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: cn("overflow-hidden", themedBody),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "space-y-3 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-4 w-4 shrink-0 opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: blueprint.title
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm opacity-70",
							children: blueprint.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-1",
							children: [blueprint.plugin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "outline",
								children: ["plugin: ", blueprint.plugin]
							}) : null, blueprint.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "secondary",
								children: t
							}, t))]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					ghost: open,
					size: "sm",
					onClick: () => setOpen((o) => !o),
					children: open ? "Cancel" : "Set up"
				})]
			}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 border-t pt-3",
				children: [
					blueprint.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: `${blueprint.key}-${f.name}`,
								children: f.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								field: f,
								value: values[f.name] ?? "",
								onChange: (v) => setValues((prev) => ({
									...prev,
									[f.name]: v
								}))
							}),
							f.help && f.type !== "text" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs opacity-60",
								children: f.help
							}) : null
						]
					}, f.name)),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-red-500",
						role: "alert",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void submit(),
							disabled: submitting,
							prefix: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {}),
							children: "Schedule it"
						})
					})
				]
			})]
		})
	});
}
/**
* Automation Blueprints gallery — the form-where-there's-a-screen surface. Each blueprint
* card expands into an inline form (one field per typed slot); submitting POSTs
* to /api/cron/blueprints/instantiate which fills the blueprint and creates the job
* via the same create_job path as everything else.
*/
function AutomationBlueprints(t0) {
	const $ = (0, import_compiler_runtime.c)(23);
	const { profile, onCreated } = t0;
	const { toast, showToast } = useToast();
	const [blueprints, setBlueprints] = (0, import_react.useState)(null);
	const [loadError, setLoadError] = (0, import_react.useState)(null);
	let t1;
	let t2;
	if ($[0] !== profile) {
		t1 = () => {
			let cancelled = false;
			api.getAutomationBlueprints(profile).then((r) => {
				if (!cancelled) {
					setLoadError(null);
					setBlueprints(r.blueprints);
				}
			}).catch((e) => {
				if (!cancelled) setLoadError(errorMessage(e));
			});
			return () => {
				cancelled = true;
			};
		};
		t2 = [profile];
		$[0] = profile;
		$[1] = t1;
		$[2] = t2;
	} else {
		t1 = $[1];
		t2 = $[2];
	}
	(0, import_react.useEffect)(t1, t2);
	if (loadError) {
		let t3;
		if ($[3] !== loadError) {
			t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-red-500",
				children: ["Couldn't load blueprints: ", loadError]
			});
			$[3] = loadError;
			$[4] = t3;
		} else t3 = $[4];
		return t3;
	}
	if (blueprints === null) {
		let t3;
		if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
			t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 opacity-70",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "h-4 w-4" }), " Loading blueprints…"]
			});
			$[5] = t3;
		} else t3 = $[5];
		return t3;
	}
	if (blueprints.length === 0) {
		let t3;
		if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
			t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "opacity-70",
				children: "No automation blueprints available."
			});
			$[6] = t3;
		} else t3 = $[6];
		return t3;
	}
	let t3;
	if ($[7] !== toast) {
		t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast });
		$[7] = toast;
		$[8] = t3;
	} else t3 = $[8];
	let t4;
	if ($[9] !== blueprints || $[10] !== onCreated || $[11] !== profile || $[12] !== showToast) {
		let t5;
		if ($[14] !== onCreated || $[15] !== profile || $[16] !== showToast) {
			t5 = (r_0) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlueprintCard, {
				blueprint: r_0,
				profile,
				showToast,
				onCreated
			}, r_0.key);
			$[14] = onCreated;
			$[15] = profile;
			$[16] = showToast;
			$[17] = t5;
		} else t5 = $[17];
		t4 = blueprints.map(t5);
		$[9] = blueprints;
		$[10] = onCreated;
		$[11] = profile;
		$[12] = showToast;
		$[13] = t4;
	} else t4 = $[13];
	let t5;
	if ($[18] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-3 md:grid-cols-2",
			children: t4
		});
		$[18] = t4;
		$[19] = t5;
	} else t5 = $[19];
	let t6;
	if ($[20] !== t3 || $[21] !== t5) {
		t6 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [t3, t5] });
		$[20] = t3;
		$[21] = t5;
		$[22] = t6;
	} else t6 = $[22];
	return t6;
}
//#endregion
//#region web/src/pages/CronPage.tsx
function formatTime(iso) {
	if (!iso) return "—";
	return new Date(iso).toLocaleString();
}
function asText(value) {
	return typeof value === "string" ? value : "";
}
function truncateText(value, maxLength) {
	return value.length > maxLength ? value.slice(0, maxLength) + "..." : value;
}
function getJobPrompt(job) {
	return asText(job.prompt);
}
function NameCheckboxPicker(t0) {
	const $ = (0, import_compiler_runtime.c)(9);
	const { id, available, selected, onChange, emptyLabel } = t0;
	let t1;
	let t2;
	if ($[0] !== available || $[1] !== emptyLabel || $[2] !== id || $[3] !== onChange || $[4] !== selected) {
		t2 = Symbol.for("react.early_return_sentinel");
		bb0: {
			const names = available.map(_temp);
			const all = [...selected.filter((s) => !names.includes(s)).map(_temp2), ...available];
			if (all.length === 0) {
				let t3;
				if ($[7] !== emptyLabel) {
					t3 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: emptyLabel
					});
					$[7] = emptyLabel;
					$[8] = t3;
				} else t3 = $[8];
				t2 = t3;
				break bb0;
			}
			const toggle = (name_0, checked) => {
				if (checked) onChange([...selected, name_0]);
				else onChange(selected.filter((s_0) => s_0 !== name_0));
			};
			t1 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id,
				className: "max-h-36 overflow-y-auto border border-border bg-background/40 p-1",
				children: all.map((item_0) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex cursor-pointer items-center gap-2 px-2 py-1 text-xs hover:bg-muted/40",
					title: item_0.description || void 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						className: "accent-foreground",
						checked: selected.includes(item_0.name),
						onChange: (e) => toggle(item_0.name, e.target.checked)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono-ui truncate",
						children: item_0.name
					})]
				}, item_0.name))
			});
		}
		$[0] = available;
		$[1] = emptyLabel;
		$[2] = id;
		$[3] = onChange;
		$[4] = selected;
		$[5] = t1;
		$[6] = t2;
	} else {
		t1 = $[5];
		t2 = $[6];
	}
	if (t2 !== Symbol.for("react.early_return_sentinel")) return t2;
	return t1;
}
function _temp2(name) {
	return {
		name,
		description: ""
	};
}
function _temp(item) {
	return item.name;
}
function emptyCronJobForm() {
	return {
		name: "",
		prompt: "",
		schedule: "",
		deliver: "local",
		skills: [],
		provider: "",
		model: "",
		base_url: "",
		script: "",
		no_agent: false,
		context_from: "",
		continuity: false,
		enabled_toolsets: [],
		workdir: "",
		scheduleState: { ...DEFAULT_SCHEDULE_STATE }
	};
}
function editorFormFromJob(job) {
	const form = cronJobFormFromJob(job);
	return {
		...form,
		scheduleState: parseScheduleString(form.schedule)
	};
}
function buildCronJobPayloadFromEditor(form) {
	const { scheduleState, ...payloadForm } = form;
	return buildCronJobPayload({
		...payloadForm,
		schedule: buildScheduleString(scheduleState)
	});
}
function selectOptions(current, options) {
	const known = new Set(options.map((option) => option.value));
	return [...options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
		value: option.value,
		children: option.label
	}, option.value)), ...current && !known.has(current) ? [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
		value: current,
		children: current
	}, current)] : []];
}
function CronAdvancedFields(t0) {
	const $ = (0, import_compiler_runtime.c)(136);
	const { idPrefix, form, onChange, modelOptions, availableToolsets } = t0;
	let t1;
	if ($[0] !== form || $[1] !== onChange) {
		t1 = (key, next) => {
			onChange({
				...form,
				[key]: next
			});
		};
		$[0] = form;
		$[1] = onChange;
		$[2] = t1;
	} else t1 = $[2];
	const update = t1;
	let T0;
	let t10;
	let t11;
	let t12;
	let t13;
	let t14;
	let t2;
	let t3;
	let t4;
	let t5;
	let t6;
	let t7;
	let t8;
	let t9;
	if ($[3] !== form || $[4] !== idPrefix || $[5] !== modelOptions?.providers || $[6] !== onChange || $[7] !== update) {
		const providers = (modelOptions?.providers ?? []).filter(_temp3);
		let t15;
		if ($[22] !== form.provider) {
			t15 = (p_0) => p_0.slug === form.provider;
			$[22] = form.provider;
			$[23] = t15;
		} else t15 = $[23];
		const models = providers.find(t15)?.models ?? [];
		t12 = "border border-border bg-background/30 p-3";
		t13 = true;
		if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
			t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
				className: "cursor-pointer text-xs font-medium uppercase tracking-wide text-muted-foreground",
				children: "Advanced fields"
			});
			$[24] = t14;
		} else t14 = $[24];
		t11 = "mt-3 grid gap-3";
		t9 = "grid grid-cols-1 sm:grid-cols-2 gap-3";
		const t16 = `${idPrefix}-provider`;
		let t17;
		if ($[25] !== t16) {
			t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: t16,
				children: "Provider"
			});
			$[25] = t16;
			$[26] = t17;
		} else t17 = $[26];
		let t18;
		if ($[27] !== form || $[28] !== onChange) {
			t18 = (v) => {
				onChange({
					...form,
					provider: v,
					model: ""
				});
			};
			$[27] = form;
			$[28] = onChange;
			$[29] = t18;
		} else t18 = $[29];
		let t19;
		if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
			t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
				value: "",
				children: "Default"
			});
			$[30] = t19;
		} else t19 = $[30];
		t10 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-1",
			children: [t17, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				id: `${idPrefix}-provider`,
				value: form.provider,
				onValueChange: t18,
				children: [t19, selectOptions(form.provider, providers.map(_temp4))]
			})]
		});
		t7 = "grid gap-1";
		const t20 = `${idPrefix}-model`;
		if ($[31] !== t20) {
			t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: t20,
				children: "Model"
			});
			$[31] = t20;
			$[32] = t8;
		} else t8 = $[32];
		T0 = Select;
		t2 = `${idPrefix}-model`;
		t3 = form.model;
		if ($[33] !== update) {
			t4 = (v_0) => update("model", v_0);
			$[33] = update;
			$[34] = t4;
		} else t4 = $[34];
		if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
			t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
				value: "",
				children: "Default"
			});
			$[35] = t5;
		} else t5 = $[35];
		t6 = selectOptions(form.model, models.map(_temp5));
		$[3] = form;
		$[4] = idPrefix;
		$[5] = modelOptions?.providers;
		$[6] = onChange;
		$[7] = update;
		$[8] = T0;
		$[9] = t10;
		$[10] = t11;
		$[11] = t12;
		$[12] = t13;
		$[13] = t14;
		$[14] = t2;
		$[15] = t3;
		$[16] = t4;
		$[17] = t5;
		$[18] = t6;
		$[19] = t7;
		$[20] = t8;
		$[21] = t9;
	} else {
		T0 = $[8];
		t10 = $[9];
		t11 = $[10];
		t12 = $[11];
		t13 = $[12];
		t14 = $[13];
		t2 = $[14];
		t3 = $[15];
		t4 = $[16];
		t5 = $[17];
		t6 = $[18];
		t7 = $[19];
		t8 = $[20];
		t9 = $[21];
	}
	let t15;
	if ($[36] !== T0 || $[37] !== t2 || $[38] !== t3 || $[39] !== t4 || $[40] !== t5 || $[41] !== t6) {
		t15 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(T0, {
			id: t2,
			value: t3,
			onValueChange: t4,
			children: [t5, t6]
		});
		$[36] = T0;
		$[37] = t2;
		$[38] = t3;
		$[39] = t4;
		$[40] = t5;
		$[41] = t6;
		$[42] = t15;
	} else t15 = $[42];
	let t16;
	if ($[43] !== t15 || $[44] !== t7 || $[45] !== t8) {
		t16 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t7,
			children: [t8, t15]
		});
		$[43] = t15;
		$[44] = t7;
		$[45] = t8;
		$[46] = t16;
	} else t16 = $[46];
	let t17;
	if ($[47] !== t10 || $[48] !== t16 || $[49] !== t9) {
		t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t9,
			children: [t10, t16]
		});
		$[47] = t10;
		$[48] = t16;
		$[49] = t9;
		$[50] = t17;
	} else t17 = $[50];
	const t18 = `${idPrefix}-base-url`;
	let t19;
	if ($[51] !== t18) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: t18,
			children: "Base URL override"
		});
		$[51] = t18;
		$[52] = t19;
	} else t19 = $[52];
	const t20 = `${idPrefix}-base-url`;
	let t21;
	if ($[53] !== update) {
		t21 = (e) => update("base_url", e.target.value);
		$[53] = update;
		$[54] = t21;
	} else t21 = $[54];
	let t22;
	if ($[55] !== form.base_url || $[56] !== t20 || $[57] !== t21) {
		t22 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: t20,
			placeholder: "https://api.example.com/v1",
			value: form.base_url,
			onChange: t21
		});
		$[55] = form.base_url;
		$[56] = t20;
		$[57] = t21;
		$[58] = t22;
	} else t22 = $[58];
	let t23;
	if ($[59] !== t19 || $[60] !== t22) {
		t23 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-1",
			children: [t19, t22]
		});
		$[59] = t19;
		$[60] = t22;
		$[61] = t23;
	} else t23 = $[61];
	let t24;
	if ($[62] !== update) {
		t24 = (e_0) => update("no_agent", e_0.target.checked);
		$[62] = update;
		$[63] = t24;
	} else t24 = $[63];
	let t25;
	if ($[64] !== form.no_agent || $[65] !== t24) {
		t25 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex items-center gap-2 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				className: "accent-foreground",
				checked: form.no_agent,
				onChange: t24
			}), "no_agent: run the script only and deliver stdout verbatim"]
		});
		$[64] = form.no_agent;
		$[65] = t24;
		$[66] = t25;
	} else t25 = $[66];
	const t26 = `${idPrefix}-script`;
	let t27;
	if ($[67] !== t26) {
		t27 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: t26,
			children: "Script"
		});
		$[67] = t26;
		$[68] = t27;
	} else t27 = $[68];
	const t28 = `${idPrefix}-script`;
	let t29;
	if ($[69] !== update) {
		t29 = (e_1) => update("script", e_1.target.value);
		$[69] = update;
		$[70] = t29;
	} else t29 = $[70];
	let t30;
	if ($[71] !== form.script || $[72] !== t28 || $[73] !== t29) {
		t30 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: t28,
			value: form.script,
			onChange: t29,
			placeholder: "relative/path/in/scripts"
		});
		$[71] = form.script;
		$[72] = t28;
		$[73] = t29;
		$[74] = t30;
	} else t30 = $[74];
	let t31;
	if ($[75] !== t27 || $[76] !== t30) {
		t31 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-1",
			children: [t27, t30]
		});
		$[75] = t27;
		$[76] = t30;
		$[77] = t31;
	} else t31 = $[77];
	let t32;
	if ($[78] !== t25 || $[79] !== t31) {
		t32 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 gap-3 items-end",
			children: [t25, t31]
		});
		$[78] = t25;
		$[79] = t31;
		$[80] = t32;
	} else t32 = $[80];
	const t33 = `${idPrefix}-workdir`;
	let t34;
	if ($[81] !== t33) {
		t34 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: t33,
			children: "Workdir"
		});
		$[81] = t33;
		$[82] = t34;
	} else t34 = $[82];
	const t35 = `${idPrefix}-workdir`;
	let t36;
	if ($[83] !== update) {
		t36 = (e_2) => update("workdir", e_2.target.value);
		$[83] = update;
		$[84] = t36;
	} else t36 = $[84];
	let t37;
	if ($[85] !== form.workdir || $[86] !== t35 || $[87] !== t36) {
		t37 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: t35,
			value: form.workdir,
			onChange: t36,
			placeholder: "/absolute/project/path"
		});
		$[85] = form.workdir;
		$[86] = t35;
		$[87] = t36;
		$[88] = t37;
	} else t37 = $[88];
	let t38;
	if ($[89] !== t34 || $[90] !== t37) {
		t38 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-1",
			children: [t34, t37]
		});
		$[89] = t34;
		$[90] = t37;
		$[91] = t38;
	} else t38 = $[91];
	let t39;
	if ($[92] !== update) {
		t39 = (e_3) => update("continuity", e_3.target.checked);
		$[92] = update;
		$[93] = t39;
	} else t39 = $[93];
	let t40;
	if ($[94] !== form.continuity || $[95] !== t39) {
		t40 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex items-center gap-2 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				className: "accent-foreground",
				checked: form.continuity,
				onChange: t39
			}), "continuity: each run sees the previous run's output (dedupe, pick up where it left off)"]
		});
		$[94] = form.continuity;
		$[95] = t39;
		$[96] = t40;
	} else t40 = $[96];
	const t41 = `${idPrefix}-context-from`;
	let t42;
	if ($[97] !== t41) {
		t42 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: t41,
			children: "context_from job IDs"
		});
		$[97] = t41;
		$[98] = t42;
	} else t42 = $[98];
	const t43 = `${idPrefix}-context-from`;
	let t44;
	if ($[99] !== update) {
		t44 = (e_4) => update("context_from", e_4.target.value);
		$[99] = update;
		$[100] = t44;
	} else t44 = $[100];
	let t45;
	if ($[101] !== form.context_from || $[102] !== t43 || $[103] !== t44) {
		t45 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			id: t43,
			className: "flex min-h-[64px] w-full border border-border bg-background/40 px-3 py-2 text-xs font-courier shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 focus-visible:border-foreground/25",
			placeholder: "one job id per line",
			value: form.context_from,
			onChange: t44
		});
		$[101] = form.context_from;
		$[102] = t43;
		$[103] = t44;
		$[104] = t45;
	} else t45 = $[104];
	let t46;
	if ($[105] !== t42 || $[106] !== t45) {
		t46 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-1",
			children: [t42, t45]
		});
		$[105] = t42;
		$[106] = t45;
		$[107] = t46;
	} else t46 = $[107];
	const t47 = `${idPrefix}-toolsets`;
	let t48;
	if ($[108] !== t47) {
		t48 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: t47,
			children: "enabled_toolsets"
		});
		$[108] = t47;
		$[109] = t48;
	} else t48 = $[109];
	const t49 = `${idPrefix}-toolsets`;
	let t50;
	if ($[110] !== update) {
		t50 = (v_1) => update("enabled_toolsets", v_1);
		$[110] = update;
		$[111] = t50;
	} else t50 = $[111];
	let t51;
	if ($[112] !== availableToolsets || $[113] !== form.enabled_toolsets || $[114] !== t49 || $[115] !== t50) {
		t51 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameCheckboxPicker, {
			id: t49,
			available: availableToolsets,
			selected: form.enabled_toolsets,
			onChange: t50,
			emptyLabel: "No toolsets available."
		});
		$[112] = availableToolsets;
		$[113] = form.enabled_toolsets;
		$[114] = t49;
		$[115] = t50;
		$[116] = t51;
	} else t51 = $[116];
	let t52;
	if ($[117] !== t48 || $[118] !== t51) {
		t52 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-1",
			children: [t48, t51]
		});
		$[117] = t48;
		$[118] = t51;
		$[119] = t52;
	} else t52 = $[119];
	let t53;
	if ($[120] !== t46 || $[121] !== t52) {
		t53 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
			children: [t46, t52]
		});
		$[120] = t46;
		$[121] = t52;
		$[122] = t53;
	} else t53 = $[122];
	let t54;
	if ($[123] !== t11 || $[124] !== t17 || $[125] !== t23 || $[126] !== t32 || $[127] !== t38 || $[128] !== t40 || $[129] !== t53) {
		t54 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: t11,
			children: [
				t17,
				t23,
				t32,
				t38,
				t40,
				t53
			]
		});
		$[123] = t11;
		$[124] = t17;
		$[125] = t23;
		$[126] = t32;
		$[127] = t38;
		$[128] = t40;
		$[129] = t53;
		$[130] = t54;
	} else t54 = $[130];
	let t55;
	if ($[131] !== t12 || $[132] !== t13 || $[133] !== t14 || $[134] !== t54) {
		t55 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: t12,
			open: t13,
			children: [t14, t54]
		});
		$[131] = t12;
		$[132] = t13;
		$[133] = t14;
		$[134] = t54;
		$[135] = t55;
	} else t55 = $[135];
	return t55;
}
function _temp5(model) {
	return {
		value: model,
		label: model
	};
}
function _temp4(p_1) {
	return {
		value: p_1.slug,
		label: p_1.name
	};
}
function _temp3(p) {
	return p.authenticated !== false;
}
function CronJobFormFields(t0) {
	const $ = (0, import_compiler_runtime.c)(86);
	const { idPrefix, autoFocus, form, resources, onChange } = t0;
	const { t } = useI18n();
	const { availableSkills, availableToolsets, deliveryTargets, modelOptions } = resources;
	let t1;
	if ($[0] !== form || $[1] !== onChange) {
		t1 = (key, next) => {
			onChange({
				...form,
				[key]: next
			});
		};
		$[0] = form;
		$[1] = onChange;
		$[2] = t1;
	} else t1 = $[2];
	const update = t1;
	let t2;
	if ($[3] !== deliveryTargets) {
		t2 = deliveryTargets.filter(_temp6);
		$[3] = deliveryTargets;
		$[4] = t2;
	} else t2 = $[4];
	const onlyLocalAvailable = t2.length === 0;
	let t3;
	if ($[5] !== deliveryTargets || $[6] !== form.deliver || $[7] !== t.cron.delivery) {
		let t4;
		if ($[9] !== t.cron.delivery) {
			t4 = (target_0) => {
				const base = target_0.id === "local" ? t.cron.delivery.local : target_0.name;
				if (target_0.id !== "local" && !target_0.home_target_set) {
					const hint = t.cron.delivery.needsHomeChannel ?? "set a home channel first";
					return {
						value: target_0.id,
						label: `${base} — ${hint}`
					};
				}
				return {
					value: target_0.id,
					label: base
				};
			};
			$[9] = t.cron.delivery;
			$[10] = t4;
		} else t4 = $[10];
		t3 = selectOptions(form.deliver, deliveryTargets.map(t4));
		$[5] = deliveryTargets;
		$[6] = form.deliver;
		$[7] = t.cron.delivery;
		$[8] = t3;
	} else t3 = $[8];
	const deliveryOptions = t3;
	const t4 = `${idPrefix}-name`;
	let t5;
	if ($[11] !== t.cron.nameOptional || $[12] !== t4) {
		t5 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: t4,
			children: t.cron.nameOptional
		});
		$[11] = t.cron.nameOptional;
		$[12] = t4;
		$[13] = t5;
	} else t5 = $[13];
	const t6 = `${idPrefix}-name`;
	let t7;
	if ($[14] !== update) {
		t7 = (e) => update("name", e.target.value);
		$[14] = update;
		$[15] = t7;
	} else t7 = $[15];
	let t8;
	if ($[16] !== autoFocus || $[17] !== form.name || $[18] !== t.cron.namePlaceholder || $[19] !== t6 || $[20] !== t7) {
		t8 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: t6,
			autoFocus,
			placeholder: t.cron.namePlaceholder,
			value: form.name,
			onChange: t7
		});
		$[16] = autoFocus;
		$[17] = form.name;
		$[18] = t.cron.namePlaceholder;
		$[19] = t6;
		$[20] = t7;
		$[21] = t8;
	} else t8 = $[21];
	let t9;
	if ($[22] !== t5 || $[23] !== t8) {
		t9 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [t5, t8]
		});
		$[22] = t5;
		$[23] = t8;
		$[24] = t9;
	} else t9 = $[24];
	const t10 = `${idPrefix}-prompt`;
	let t11;
	if ($[25] !== t.cron.prompt || $[26] !== t10) {
		t11 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: t10,
			children: t.cron.prompt
		});
		$[25] = t.cron.prompt;
		$[26] = t10;
		$[27] = t11;
	} else t11 = $[27];
	const t12 = `${idPrefix}-prompt`;
	let t13;
	if ($[28] !== update) {
		t13 = (e_0) => update("prompt", e_0.target.value);
		$[28] = update;
		$[29] = t13;
	} else t13 = $[29];
	let t14;
	if ($[30] !== form.prompt || $[31] !== t.cron.promptPlaceholder || $[32] !== t12 || $[33] !== t13) {
		t14 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			id: t12,
			className: "flex min-h-[80px] w-full border border-border bg-background/40 px-3 py-2 text-sm font-courier shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 focus-visible:border-foreground/25",
			placeholder: t.cron.promptPlaceholder,
			value: form.prompt,
			onChange: t13
		});
		$[30] = form.prompt;
		$[31] = t.cron.promptPlaceholder;
		$[32] = t12;
		$[33] = t13;
		$[34] = t14;
	} else t14 = $[34];
	let t15;
	if ($[35] !== t11 || $[36] !== t14) {
		t15 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [t11, t14]
		});
		$[35] = t11;
		$[36] = t14;
		$[37] = t15;
	} else t15 = $[37];
	let t16;
	if ($[38] !== update) {
		t16 = (state) => update("scheduleState", state);
		$[38] = update;
		$[39] = t16;
	} else t16 = $[39];
	let t17;
	if ($[40] !== form.scheduleState || $[41] !== t16) {
		t17 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleBuilder, {
			value: form.scheduleState,
			onChange: t16
		});
		$[40] = form.scheduleState;
		$[41] = t16;
		$[42] = t17;
	} else t17 = $[42];
	const t18 = `${idPrefix}-deliver`;
	let t19;
	if ($[43] !== t.cron.deliverTo || $[44] !== t18) {
		t19 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: t18,
			children: t.cron.deliverTo
		});
		$[43] = t.cron.deliverTo;
		$[44] = t18;
		$[45] = t19;
	} else t19 = $[45];
	const t20 = `${idPrefix}-deliver`;
	let t21;
	if ($[46] !== update) {
		t21 = (v) => update("deliver", v);
		$[46] = update;
		$[47] = t21;
	} else t21 = $[47];
	let t22;
	if ($[48] !== deliveryOptions || $[49] !== form.deliver || $[50] !== t20 || $[51] !== t21) {
		t22 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
			id: t20,
			value: form.deliver,
			onValueChange: t21,
			children: deliveryOptions
		});
		$[48] = deliveryOptions;
		$[49] = form.deliver;
		$[50] = t20;
		$[51] = t21;
		$[52] = t22;
	} else t22 = $[52];
	let t23;
	if ($[53] !== onlyLocalAvailable || $[54] !== t.cron.delivery) {
		t23 = onlyLocalAvailable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: t.cron.delivery.noneConfigured ?? "No messaging platforms configured. Set one up under Channels to deliver reports."
		});
		$[53] = onlyLocalAvailable;
		$[54] = t.cron.delivery;
		$[55] = t23;
	} else t23 = $[55];
	let t24;
	if ($[56] !== t19 || $[57] !== t22 || $[58] !== t23) {
		t24 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [
				t19,
				t22,
				t23
			]
		});
		$[56] = t19;
		$[57] = t22;
		$[58] = t23;
		$[59] = t24;
	} else t24 = $[59];
	const t25 = `${idPrefix}-skills`;
	let t26;
	if ($[60] !== t25) {
		t26 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: t25,
			children: "Skills (optional)"
		});
		$[60] = t25;
		$[61] = t26;
	} else t26 = $[61];
	const t27 = `${idPrefix}-skills`;
	let t28;
	if ($[62] !== update) {
		t28 = (skills) => update("skills", skills);
		$[62] = update;
		$[63] = t28;
	} else t28 = $[63];
	let t29;
	if ($[64] !== availableSkills || $[65] !== form.skills || $[66] !== t27 || $[67] !== t28) {
		t29 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameCheckboxPicker, {
			id: t27,
			available: availableSkills,
			selected: form.skills,
			onChange: t28,
			emptyLabel: "No skills installed for this profile."
		});
		$[64] = availableSkills;
		$[65] = form.skills;
		$[66] = t27;
		$[67] = t28;
		$[68] = t29;
	} else t29 = $[68];
	let t30;
	if ($[69] === Symbol.for("react.memo_cache_sentinel")) {
		t30 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: "Selected skills are loaded before the prompt runs — the cron sets when, the skill sets how."
		});
		$[69] = t30;
	} else t30 = $[69];
	let t31;
	if ($[70] !== t26 || $[71] !== t29) {
		t31 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [
				t26,
				t29,
				t30
			]
		});
		$[70] = t26;
		$[71] = t29;
		$[72] = t31;
	} else t31 = $[72];
	const t32 = `${idPrefix}-advanced`;
	let t33;
	if ($[73] !== availableToolsets || $[74] !== form || $[75] !== modelOptions || $[76] !== onChange || $[77] !== t32) {
		t33 = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CronAdvancedFields, {
			idPrefix: t32,
			form,
			onChange,
			modelOptions,
			availableToolsets
		});
		$[73] = availableToolsets;
		$[74] = form;
		$[75] = modelOptions;
		$[76] = onChange;
		$[77] = t32;
		$[78] = t33;
	} else t33 = $[78];
	let t34;
	if ($[79] !== t15 || $[80] !== t17 || $[81] !== t24 || $[82] !== t31 || $[83] !== t33 || $[84] !== t9) {
		t34 = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			t9,
			t15,
			t17,
			t24,
			t31,
			t33
		] });
		$[79] = t15;
		$[80] = t17;
		$[81] = t24;
		$[82] = t31;
		$[83] = t33;
		$[84] = t9;
		$[85] = t34;
	} else t34 = $[85];
	return t34;
}
function _temp6(target) {
	return target.id !== "local";
}
function getJobName(job) {
	return asText(job.name).trim();
}
function getJobTitle(job) {
	const name = getJobName(job);
	if (name) return name;
	const prompt = getJobPrompt(job);
	if (prompt) return truncateText(prompt, 60);
	const script = asText(job.script);
	if (script) return truncateText(script, 60);
	return job.id || "Cron job";
}
function getJobScheduleDisplay(job, strings) {
	return describeSchedule(job.schedule, asText(job.schedule_display) || asText(job.schedule?.display), strings);
}
function getJobState(job) {
	return asText(job.state) || (job.enabled === false ? "disabled" : "scheduled");
}
function getRepeatDisplay(job) {
	const repeat = job.repeat;
	if (!repeat || repeat.times == null) return "forever";
	const completed = repeat.completed ?? 0;
	return completed > 0 ? `${completed}/${repeat.times}` : `${repeat.times} times`;
}
function getJobMode(job) {
	if (job.no_agent) return "no_agent";
	if (job.script) return "script+agent";
	return "agent";
}
function getModelDisplay(job) {
	const provider = asText(job.provider);
	const model = asText(job.model);
	if (provider && model) return `${provider}/${model}`;
	return model || provider;
}
function getJobProfile(job) {
	return asText(job.profile) || asText(job.profile_name) || "default";
}
function getJobKey(job) {
	return `${getJobProfile(job)}:${job.id}`;
}
function splitJobKey(key) {
	const idx = key.indexOf(":");
	if (idx === -1) return {
		profile: "default",
		id: key
	};
	return {
		profile: key.slice(0, idx) || "default",
		id: key.slice(idx + 1)
	};
}
function profileLabel(profile) {
	return profile === "default" ? "default" : profile;
}
var STATUS_TONE = {
	enabled: "success",
	scheduled: "success",
	paused: "warning",
	error: "destructive",
	completed: "destructive"
};
function CronPage() {
	const [jobs, setJobs] = (0, import_react.useState)([]);
	const schedulerStaleAgeS = cronSchedulerStaleAgeS(jobs);
	const [triggeringJobKeys, setTriggeringJobKeys] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const triggerControllerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const controller = createCronTriggerController((key, running) => {
			if (triggerControllerRef.current !== controller) return;
			setTriggeringJobKeys((current) => {
				const next = new Set(current);
				if (running) next.add(key);
				else next.delete(key);
				return next;
			});
		});
		triggerControllerRef.current = controller;
		return () => {
			triggerControllerRef.current = null;
		};
	}, []);
	const [profiles, setProfiles] = (0, import_react.useState)([]);
	const [selectedProfile, setSelectedProfile] = (0, import_react.useState)("all");
	const [view, setView] = (0, import_react.useState)("jobs");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const { toast, showToast } = useToast();
	const { t, locale } = useI18n();
	const { setEnd } = usePageHeader();
	const scheduleDescribeStrings = {
		...t.cron.scheduleDescribe,
		weekdaysShort: t.cron.scheduleModes.weekdaysShort,
		ordinal: locale === "en" ? englishOrdinal : (n) => String(n)
	};
	const [createModalOpen, setCreateModalOpen] = (0, import_react.useState)(false);
	const [createProfile, setCreateProfile] = (0, import_react.useState)("default");
	const [createForm, setCreateForm] = (0, import_react.useState)(emptyCronJobForm);
	const closeCreateModal = (0, import_react.useCallback)(() => setCreateModalOpen(false), []);
	const createModalRef = useModalBehavior({
		open: createModalOpen,
		onClose: closeCreateModal
	});
	const [deliveryTargets, setDeliveryTargets] = (0, import_react.useState)([{
		id: "local",
		name: "Local",
		home_target_set: true,
		home_env_var: null
	}]);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [editJob, setEditJob] = (0, import_react.useState)(null);
	const [editForm, setEditForm] = (0, import_react.useState)(emptyCronJobForm);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const closeEditModal = (0, import_react.useCallback)(() => setEditJob(null), []);
	const editModalRef = useModalBehavior({
		open: editJob !== null,
		onClose: closeEditModal
	});
	const [availableSkills, setAvailableSkills] = (0, import_react.useState)([]);
	const [availableToolsets, setAvailableToolsets] = (0, import_react.useState)([]);
	const [modelOptions, setModelOptions] = (0, import_react.useState)(null);
	const resourceProfile = editJob ? getJobProfile(editJob) : createProfile;
	const openEditModal = (0, import_react.useCallback)((job) => {
		setEditJob(job);
		setEditForm(editorFormFromJob(job));
	}, []);
	const selectedProfileRef = (0, import_react.useRef)(selectedProfile);
	const jobsRequestGenerationRef = (0, import_react.useRef)(0);
	const jobsActiveRef = (0, import_react.useRef)(false);
	const [jobsLoadError, setJobsLoadError] = (0, import_react.useState)(null);
	const loadJobs = (0, import_react.useCallback)((profile) => {
		if (!jobsActiveRef.current || selectedProfileRef.current !== profile) return;
		const generation = ++jobsRequestGenerationRef.current;
		api.getCronJobs(profile).then((nextJobs) => {
			if (jobsRequestGenerationRef.current === generation && selectedProfileRef.current === profile) {
				setJobs(nextJobs);
				setJobsLoadError(null);
			}
		}).catch((e) => {
			if (jobsRequestGenerationRef.current === generation && selectedProfileRef.current === profile) setJobsLoadError(errorMessage(e));
		}).finally(() => {
			if (jobsRequestGenerationRef.current === generation && selectedProfileRef.current === profile) setLoading(false);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		api.getProfiles().then((res) => setProfiles(res.profiles)).catch(() => setProfiles([]));
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		api.getCronDeliveryTargets(resourceProfile).then((res_0) => {
			if (!cancelled) setDeliveryTargets(res_0.targets);
		}).catch(() => {
			if (!cancelled) setDeliveryTargets([{
				id: "local",
				name: "Local",
				home_target_set: true,
				home_env_var: null
			}]);
		});
		return () => {
			cancelled = true;
		};
	}, [resourceProfile]);
	(0, import_react.useEffect)(() => {
		jobsActiveRef.current = true;
		selectedProfileRef.current = selectedProfile;
		loadJobs(selectedProfile);
		return () => {
			jobsActiveRef.current = false;
			jobsRequestGenerationRef.current += 1;
		};
	}, [loadJobs, selectedProfile]);
	(0, import_react.useEffect)(() => {
		let cancelled_0 = false;
		Promise.all([
			api.getSkills(resourceProfile).catch(() => []),
			api.getToolsets(resourceProfile).catch(() => []),
			api.getModelOptions(resourceProfile).catch(() => null)
		]).then(([skills, toolsets, options]) => {
			if (cancelled_0) return;
			setAvailableSkills([...skills].sort((a, b) => a.name.localeCompare(b.name)));
			setAvailableToolsets([...toolsets].sort((a_0, b_0) => a_0.name.localeCompare(b_0.name)));
			setModelOptions(options);
		});
		return () => {
			cancelled_0 = true;
		};
	}, [resourceProfile]);
	const handleCreate = async () => {
		const payload = buildCronJobPayloadFromEditor(createForm);
		if (!payload.schedule || !payload.no_agent && !cronJobHasExecutionContent(payload)) {
			showToast(`${t.cron.prompt} & ${t.cron.schedule} required`, "error");
			return;
		}
		if (payload.no_agent && !payload.script) {
			showToast(t.cron.scriptRequired ?? en.cron.scriptRequired, "error");
			focusCronField("cron-script");
			return;
		}
		setCreating(true);
		try {
			await api.createCronJob(payload, createProfile);
			showToast(t.common.create + " ✓", "success");
			setCreateForm(emptyCronJobForm());
			setCreateModalOpen(false);
			loadJobs(selectedProfile);
		} catch (e_0) {
			showToast(`${t.config.failedToSave}: ${errorMessage(e_0)}`, "error");
		} finally {
			setCreating(false);
		}
	};
	const handleEdit = async () => {
		if (!editJob) return;
		const payload_0 = buildCronJobPayloadFromEditor(editForm);
		if (!payload_0.schedule || !payload_0.no_agent && !cronJobHasExecutionContent(payload_0)) {
			showToast(`${t.cron.prompt} & ${t.cron.schedule} required`, "error");
			return;
		}
		if (payload_0.no_agent && !payload_0.script) {
			showToast(t.cron.scriptRequired ?? en.cron.scriptRequired, "error");
			focusCronField("edit-cron-script");
			return;
		}
		setSaving(true);
		try {
			await api.updateCronJob(editJob.id, payload_0, getJobProfile(editJob));
			showToast("Saved changes ✓", "success");
			setEditJob(null);
			loadJobs(selectedProfile);
		} catch (e_1) {
			showToast(`${t.config.failedToSave}: ${errorMessage(e_1)}`, "error");
		} finally {
			setSaving(false);
		}
	};
	const handlePauseResume = async (job_0) => {
		try {
			const isPaused = getJobState(job_0) === "paused";
			const profile_0 = getJobProfile(job_0);
			if (isPaused) {
				await api.resumeCronJob(job_0.id, profile_0);
				showToast(`${t.cron.resume}: "${truncateText(getJobTitle(job_0), 30)}"`, "success");
			} else {
				await api.pauseCronJob(job_0.id, profile_0);
				showToast(`${t.cron.pause}: "${truncateText(getJobTitle(job_0), 30)}"`, "success");
			}
			loadJobs(selectedProfile);
		} catch (e_2) {
			showToast(`${t.status.error}: ${errorMessage(e_2)}`, "error");
		}
	};
	const handleTrigger = async (job_1) => {
		const jobKey = getJobKey(job_1);
		const label = `${t.cron.triggerNow}: "${truncateText(getJobTitle(job_1), 30)}"`;
		const viewProfile = selectedProfile;
		const controller_0 = triggerControllerRef.current;
		if (!controller_0) return;
		try {
			const result = await controller_0.run(jobKey, () => api.triggerCronJob(job_1.id, getJobProfile(job_1)));
			if (triggerControllerRef.current !== controller_0 || selectedProfileRef.current !== viewProfile || !result.started) return;
			showToast(`${label} ✓`, "success");
			loadJobs(viewProfile);
		} catch (e_3) {
			if (triggerControllerRef.current === controller_0 && selectedProfileRef.current === viewProfile) showToast(`${t.status.error}: ${errorMessage(e_3)}`, "error");
		}
	};
	const jobDelete = useConfirmDelete({ onDelete: (0, import_react.useCallback)(async (key_0) => {
		const { profile: profile_1, id } = splitJobKey(key_0);
		const job_2 = jobs.find((j) => getJobKey(j) === key_0);
		try {
			await api.deleteCronJob(id, profile_1);
			showToast(`${t.common.delete}: "${job_2 ? truncateText(getJobTitle(job_2), 30) : id}"`, "success");
			loadJobs(selectedProfile);
		} catch (e_4) {
			showToast(`${t.status.error}: ${errorMessage(e_4)}`, "error");
			throw e_4;
		}
	}, [
		jobs,
		loadJobs,
		selectedProfile,
		showToast,
		t.common.delete,
		t.status.error
	]) });
	(0, import_react.useLayoutEffect)(() => {
		setEnd(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "uppercase",
			size: "sm",
			onClick: () => {
				setCreateProfile(selectedProfile === "all" ? "default" : selectedProfile);
				setCreateModalOpen(true);
			},
			children: t.common.create
		}));
		return () => {
			setEnd(null);
		};
	}, [
		setEnd,
		t.common.create,
		loading,
		selectedProfile
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { className: "text-2xl text-primary" })
	});
	const pendingJob = jobDelete.pendingId ? jobs.find((j_0) => getJobKey(j_0) === jobDelete.pendingId) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "cron:top" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }),
			jobsLoadError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadErrorNotice, {
				what: t.cron.loadWhat ?? en.cron.loadWhat,
				detail: jobsLoadError,
				onRetry: () => loadJobs(selectedProfile)
			}),
			schedulerStaleAgeS !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-warning font-medium",
				"data-testid": "cron-scheduler-stale",
				children: (t.cron.schedulerLastTicked ?? en.cron.schedulerLastTicked).replace("{when}", cronAgoLabel(schedulerStaleAgeS))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
				value: view,
				onChange: (v) => setView(v),
				options: [{
					value: "jobs",
					label: "Jobs"
				}, {
					value: "blueprints",
					label: "Blueprints"
				}]
			}),
			view === "blueprints" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutomationBlueprints, {
				profile: selectedProfile === "all" ? "default" : selectedProfile,
				onCreated: () => loadJobs(selectedProfile)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: jobDelete.isOpen,
				onCancel: jobDelete.cancel,
				onConfirm: jobDelete.confirm,
				title: t.cron.confirmDeleteTitle,
				description: pendingJob ? `"${truncateText(getJobTitle(pendingJob), 40)}" — ${t.cron.confirmDeleteMessage}` : t.cron.confirmDeleteMessage,
				loading: jobDelete.isDeleting
			}),
			createModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: createModalRef,
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4",
				onClick: (e_5) => e_5.target === e_5.currentTarget && setCreateModalOpen(false),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "create-cron-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("font-mondwest normal-case", "relative w-full max-w-3xl max-h-[90vh] border border-border bg-card shadow-2xl flex flex-col"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							ghost: true,
							size: "icon",
							onClick: () => setCreateModalOpen(false),
							className: "absolute right-2 top-2 text-muted-foreground hover:text-foreground",
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
							className: "p-5 pb-3 border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "create-cron-title",
								className: "font-mondwest text-display text-base tracking-wider",
								children: t.cron.newJob
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-h-0 overflow-y-auto p-5 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "cron-profile",
										children: "Profile"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										id: "cron-profile",
										value: createProfile,
										onValueChange: (v_0) => setCreateProfile(v_0),
										children: profiles.map((profile_2) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
											value: profile_2.name,
											children: profileLabel(profile_2.name)
										}, profile_2.name))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CronJobFormFields, {
									idPrefix: "cron",
									autoFocus: true,
									form: createForm,
									onChange: setCreateForm,
									resources: {
										availableSkills,
										availableToolsets,
										modelOptions,
										deliveryTargets
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "uppercase",
										size: "sm",
										onClick: handleCreate,
										disabled: creating,
										prefix: creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
										children: creating ? t.common.creating : t.common.create
									})
								})
							]
						})
					]
				})
			}),
			editJob && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: editModalRef,
				className: "fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4",
				onClick: (e_6) => e_6.target === e_6.currentTarget && setEditJob(null),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "edit-cron-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("font-mondwest normal-case", "relative w-full max-w-3xl max-h-[90vh] border border-border bg-card shadow-2xl flex flex-col"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							ghost: true,
							size: "icon",
							onClick: () => setEditJob(null),
							className: "absolute right-2 top-2 text-muted-foreground hover:text-foreground",
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
							className: "p-5 pb-3 border-b border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: "edit-cron-title",
								className: "font-mondwest text-display text-base tracking-wider",
								children: "Edit job"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-h-0 overflow-y-auto p-5 grid gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CronJobFormFields, {
								idPrefix: "edit-cron",
								autoFocus: true,
								form: editForm,
								onChange: setEditForm,
								resources: {
									availableSkills,
									availableToolsets,
									modelOptions,
									deliveryTargets
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground font-mono-ui truncate pr-4",
									children: editJob.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "uppercase",
									size: "sm",
									onClick: handleEdit,
									disabled: saving,
									prefix: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : void 0,
									children: saving ? t.common.loading : "Save changes"
								})]
							})]
						})
					]
				})
			}),
			view === "jobs" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(H2, {
							variant: "sm",
							className: "flex items-center gap-2 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
								t.cron.scheduledJobs,
								" (",
								jobs.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1 min-w-[220px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "cron-profile-filter",
								children: "Profile"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								id: "cron-profile-filter",
								value: selectedProfile,
								onValueChange: (v_1) => setSelectedProfile(v_1),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
									value: "all",
									children: "All profiles"
								}), profiles.map((profile_3) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectOption, {
									value: profile_3.name,
									children: profileLabel(profile_3.name)
								}, profile_3.name))]
							})]
						})]
					}),
					jobs.length === 0 && !jobsLoadError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col items-center gap-3 py-8 text-center text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.cron.noJobs }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "uppercase",
							size: "sm",
							onClick: () => {
								setCreateProfile(selectedProfile === "all" ? "default" : selectedProfile);
								setCreateModalOpen(true);
							},
							children: t.common.create
						})]
					}) }),
					jobs.map((job_3) => {
						const state = getJobState(job_3);
						const promptText = getJobPrompt(job_3);
						const title = getJobTitle(job_3);
						const hasName = Boolean(getJobName(job_3));
						const deliver = asText(job_3.deliver);
						const profile_4 = getJobProfile(job_3);
						const jobKey_0 = getJobKey(job_3);
						const mode = getJobMode(job_3);
						const modelDisplay = getModelDisplay(job_3);
						const toolsets_0 = Array.isArray(job_3.enabled_toolsets) ? job_3.enabled_toolsets.filter(Boolean) : [];
						const lastResult = cronLastResult(job_3);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "flex items-start gap-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2 mb-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-sm truncate min-w-0",
												children: title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: STATUS_TONE[state] ?? "secondary",
												children: state
											}),
											lastResult && lastResult.status !== "ok" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: lastResult.tone,
												title: lastResult.detail ?? void 0,
												"data-testid": "cron-last-result",
												children: lastResult.status
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "outline",
												children: profileLabel(profile_4)
											}),
											deliver && deliver !== "local" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "outline",
												children: deliver
											}),
											Array.isArray(job_3.skills) && job_3.skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "outline",
												title: job_3.skills.join(", "),
												children: job_3.skills.length === 1 ? job_3.skills[0] : `${job_3.skills.length} skills`
											}),
											mode !== "agent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "outline",
												children: mode
											}),
											modelDisplay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "outline",
												title: modelDisplay,
												children: "model"
											}),
											toolsets_0.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												tone: "outline",
												title: toolsets_0.join(", "),
												children: [toolsets_0.length, " toolsets"]
											})
										]
									}),
									hasName && promptText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground truncate mb-1",
										children: truncateText(promptText, 100)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono-ui",
												children: getJobScheduleDisplay(job_3, scheduleDescribeStrings)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["repeat: ", getRepeatDisplay(job_3)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												t.cron.last,
												": ",
												formatTime(job_3.last_run_at)
											] }),
											cronNextRunOverdueMs(job_3) === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												t.cron.next,
												": ",
												formatTime(job_3.next_run_at)
											] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-warning font-medium",
												"data-testid": "cron-next-run-overdue",
												children: [
													t.cron.overdueSince ?? en.cron.overdueSince,
													": ",
													formatTime(job_3.next_run_at)
												]
											})
										]
									}),
									job_3.last_delivery_error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-destructive mt-1",
										children: ["delivery: ", job_3.last_delivery_error]
									}),
									job_3.last_fire_error?.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-destructive mt-1",
										children: [
											"missed scheduled fire (",
											formatTime(job_3.last_fire_error.at ?? null),
											"):",
											" ",
											job_3.last_fire_error.detail
										]
									}),
									job_3.last_error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive mt-1",
										children: job_3.last_error
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 shrink-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										size: "icon",
										title: state === "paused" ? t.cron.resume : t.cron.pause,
										"aria-label": state === "paused" ? t.cron.resume : t.cron.pause,
										onClick: () => handlePauseResume(job_3),
										className: state === "paused" ? "text-success" : "text-warning",
										children: state === "paused" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										size: "icon",
										disabled: triggeringJobKeys.has(jobKey_0),
										title: t.cron.triggerNow,
										"aria-label": t.cron.triggerNow,
										onClick: () => handleTrigger(job_3),
										children: triggeringJobKeys.has(jobKey_0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										size: "icon",
										title: "Edit job",
										"aria-label": "Edit job",
										onClick: () => openEditModal(job_3),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										destructive: true,
										size: "icon",
										title: t.common.delete,
										"aria-label": t.common.delete,
										onClick: () => jobDelete.requestDelete(jobKey_0),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
									})
								]
							})]
						}) }, jobKey_0);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "cron:bottom" })
		]
	});
}
//#endregion
export { CronPage as default };
