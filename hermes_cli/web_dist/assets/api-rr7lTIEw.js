//#region apps/shared/src/ansi.ts
var ESC = String.fromCharCode(27);
var BEL = String.fromCharCode(7);
new RegExp(`${ESC}\\[[0-?]*[ -/]*[@-~]`, "g");
new RegExp(`${ESC}\\[[0-?]*[ -/]*([@-~])`, "g");
new RegExp(`${ESC}\\[[0-?]*[ -/]*(?=${ESC}|\\n|$)`, "g");
new RegExp(`${ESC}\\][\\s\\S]*?(?:${BEL}|${ESC}\\\\)`, "g");
new RegExp(`${ESC}[PX^_][\\s\\S]*?(?:${BEL}|${ESC}\\\\)`, "g");
new RegExp(`${ESC}(?!\\[|\\]|P|X|\\^|_)[ -/]*[0-~]`, "g");
new RegExp(`${ESC}(?!\\[)[\\s\\S]?`, "g");
//#endregion
//#region apps/shared/src/catalog-featured.ts
var DAY_MS = 864e5;
7 * DAY_MS;
30 * DAY_MS;
//#endregion
//#region apps/shared/src/json-rpc-channel.ts
var isServerRequestFrame = (frame) => typeof frame.id === "string" && typeof frame.method === "string" && frame.method !== "event";
/** JSON-RPC error with optional structured `data` from the gateway. */
var JsonRpcGatewayError = class extends Error {
	code;
	data;
	constructor(message, options) {
		super(message);
		this.name = "JsonRpcGatewayError";
		this.code = options?.code;
		this.data = options?.data;
	}
};
/** JSON-RPC "method not found" (tui_gateway/server.py::dispatch `_err(rid, -32601, …)`). */
var JSON_RPC_METHOD_NOT_FOUND = -32601;
/** JSON-RPC "internal error" — used when a server→client request handler throws. */
var JSON_RPC_INTERNAL_ERROR = -32603;
/** A window-owned request's session is not shown by any window of this client (tui_gateway/server_requests.py::NOT_SHOWN_CODE). */
var JSON_RPC_SESSION_NOT_SHOWN = 4404;
/** Map a raw `error` member of a response frame to the typed error every surface inspects. */
function jsonRpcErrorFromFrame(raw, fallbackMessage = "Hermes RPC failed") {
	const err = raw && typeof raw === "object" ? raw : {};
	return new JsonRpcGatewayError(typeof err.message === "string" && err.message ? err.message : fallbackMessage, {
		code: typeof err.code === "number" ? err.code : void 0,
		data: err.data
	});
}
var DEFAULT_REQUEST_TIMEOUT_MS$1 = 12e4;
var MAX_OUTSTANDING_PINGS = 8;
var wireDecoder = new TextDecoder();
/** Decode a socket `message.data` (string / ArrayBuffer / view) to text; `null` for anything else. */
function wireFrameText(raw) {
	if (typeof raw === "string") return raw;
	if (raw instanceof ArrayBuffer || ArrayBuffer.isView(raw)) return wireDecoder.decode(raw);
	return null;
}
var unrefTimer = (timer) => {
	timer?.unref?.();
};
/**
* The transport-agnostic half of a JSON-RPC gateway connection: request ids,
* the pending map with per-call timeouts and AbortSignal, response → typed
* error mapping, event-notification decoding, and the `gateway.ping`
* heartbeat. Owners (`JsonRpcGatewayClient` over WebSocket, the Ink TUI over
* stdio / an attached socket) supply a `JsonRpcTransport` per connection
* generation and call `handleFrame` for every inbound text frame.
*/
var JsonRpcRequestChannel = class {
	nextId = 0;
	pending = /* @__PURE__ */ new Map();
	transport = null;
	heartbeatTimer = null;
	heartbeatSequence = 0;
	outstandingPings = /* @__PURE__ */ new Set();
	lastLivenessAt = 0;
	/** The bound generation's backend counts `decline` as one client abstaining (see `ServerRequest.decline`). */
	backendCountsDeclines = false;
	requestHandlers = [];
	options;
	constructor(options = {}) {
		this.options = {
			createRequestId: options.createRequestId ?? ((nextId) => `${options.requestIdPrefix ?? "r"}${nextId}`),
			desktopLocal: options.desktopLocal ?? (() => false),
			heartbeatDeadlineMs: options.heartbeatDeadlineMs ?? 45e3,
			heartbeatIntervalMs: options.heartbeatIntervalMs ?? 15e3,
			heartbeatLiveness: options.heartbeatLiveness ?? "response",
			onEvent: options.onEvent,
			onHeartbeatFailure: options.onHeartbeatFailure,
			onRequestHandlerError: options.onRequestHandlerError,
			onUnhandledRequest: options.onUnhandledRequest,
			requestIdPrefix: options.requestIdPrefix ?? "r",
			requestTimeoutMs: options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS$1,
			unrefTimers: options.unrefTimers ?? false
		};
	}
	get defaultRequestTimeoutMs() {
		return this.options.requestTimeoutMs;
	}
	get connected() {
		return this.transport !== null;
	}
	/** Bind a new connection generation. Any previous generation's heartbeat stops; its pending calls are the owner's to reject. */
	attach(transport) {
		this.stopHeartbeat();
		this.transport = transport;
		this.lastLivenessAt = Date.now();
		this.backendCountsDeclines = false;
		if (this.options.desktopLocal()) this.request("client.capabilities", { desktop_local: true }).catch(() => void 0);
	}
	/** Drop the transport and fail every in-flight call with `error`. */
	detach(error) {
		this.stopHeartbeat();
		this.transport = null;
		this.rejectAllPending(error);
	}
	/** True while `transport` is the bound generation (owners gate stale socket callbacks on this). */
	owns(transport) {
		return this.transport === transport;
	}
	request(method, params = {}, timeoutMs = this.options.requestTimeoutMs, signal, notConnectedError = () => /* @__PURE__ */ new Error("gateway not connected")) {
		const transport = this.transport;
		if (!transport) return Promise.reject(notConnectedError());
		if (signal?.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"));
		const id = this.options.createRequestId(++this.nextId);
		return new Promise((resolve, reject) => {
			let onAbort;
			const detachAbort = () => {
				if (onAbort && signal) signal.removeEventListener("abort", onAbort);
			};
			const pending = {
				resolve: (value) => {
					detachAbort();
					resolve(value);
				},
				reject: (error) => {
					detachAbort();
					reject(error);
				}
			};
			if (timeoutMs > 0) {
				pending.timer = setTimeout(() => {
					if (this.pending.delete(id)) {
						detachAbort();
						const seconds = Math.round(timeoutMs / 1e3);
						reject(/* @__PURE__ */ new Error(`request timed out after ${seconds}s: ${method}`));
					}
				}, timeoutMs);
				if (this.options.unrefTimers) unrefTimer(pending.timer);
			}
			if (signal) {
				onAbort = () => {
					this.clearPending(id);
					detachAbort();
					reject(new DOMException("Aborted", "AbortError"));
				};
				signal.addEventListener("abort", onAbort, { once: true });
			}
			this.pending.set(id, pending);
			try {
				transport.send(JSON.stringify({
					jsonrpc: "2.0",
					id,
					method,
					params
				}));
			} catch (error) {
				this.clearPending(id);
				detachAbort();
				reject(error instanceof Error ? error : new Error(String(error)));
			}
		});
	}
	/**
	* Register a handler for server→client requests (clarify, approval, sudo,
	* …). Handlers are tried in registration order until one accepts (returns
	* anything but `false`); an unhandled request is answered `-32601` so the
	* backend never waits out its deadline against a client that cannot answer.
	*/
	onRequest(handler) {
		this.requestHandlers.push(handler);
		return () => {
			const index = this.requestHandlers.indexOf(handler);
			if (index >= 0) this.requestHandlers.splice(index, 1);
		};
	}
	/**
	* Deliver a server request to the handlers. Live frames arrive through
	* `handleFrame`; owners call this directly for `open_requests` returned by a
	* reconnect replay (`replayed: true`) so an unanswered question survives a
	* dropped socket.
	*/
	deliverRequest(id, method, params, replayed = false) {
		let settled = false;
		const send = (frame) => {
			if (settled) return;
			settled = true;
			try {
				this.transport?.send(JSON.stringify({
					jsonrpc: "2.0",
					id,
					...frame
				}));
			} catch {}
		};
		const request = {
			id,
			method,
			params,
			replayed,
			respond: (result) => send({ result }),
			fail: (code, message) => send({ error: {
				code,
				message
			} }),
			decline: (message) => {
				if (this.backendCountsDeclines) send({ error: {
					code: JSON_RPC_SESSION_NOT_SHOWN,
					message
				} });
			}
		};
		for (const handler of this.requestHandlers) {
			let accepted;
			try {
				accepted = handler(request);
			} catch (error) {
				request.fail(JSON_RPC_INTERNAL_ERROR, `server request handler crashed: ${method}`);
				this.options.onRequestHandlerError?.(error instanceof Error ? error : new Error(String(error)), {
					id,
					method,
					params
				});
				return false;
			}
			if (accepted !== false) return true;
		}
		request.fail(JSON_RPC_METHOD_NOT_FOUND, `no handler for server request: ${method}`);
		this.options.onUnhandledRequest?.({
			id,
			method,
			params
		});
		return false;
	}
	deliverOpenRequests(result) {
		const open = result?.open_requests;
		if (!Array.isArray(open)) return;
		for (const entry of open) if (typeof entry?.id === "string" && typeof entry.method === "string") {
			const params = entry.params && typeof entry.params === "object" ? entry.params : {};
			this.deliverRequest(entry.id, entry.method, params, true);
		}
	}
	/**
	* Route one inbound frame: a response settles its pending call, an
	* `event` notification reaches `onEvent`, a server→client request reaches
	* the `onRequest` handlers. Returns the decoded frame so the owner can act
	* on it too (mirror it, record seq, …) or `null` when the text was not
	* JSON or not a JSON object (`null`, a scalar).
	*/
	handleFrame(text) {
		let frame;
		try {
			frame = JSON.parse(text);
		} catch {
			return null;
		}
		if (!frame || typeof frame !== "object") return null;
		if (this.options.heartbeatLiveness === "any-inbound") this.lastLivenessAt = Date.now();
		if (isServerRequestFrame(frame)) {
			const params = frame.params && typeof frame.params === "object" ? frame.params : {};
			this.deliverRequest(frame.id, frame.method, params);
			return frame;
		}
		if (frame.id !== void 0 && frame.id !== null) {
			if (typeof frame.id === "string" && this.outstandingPings.delete(frame.id)) {
				this.lastLivenessAt = Date.now();
				return frame;
			}
			const call = this.pending.get(frame.id);
			if (call) {
				this.lastLivenessAt = Date.now();
				this.clearPending(frame.id);
				if (frame.error) call.reject(jsonRpcErrorFromFrame(frame.error));
				else {
					this.deliverOpenRequests(frame.result);
					call.resolve(frame.result);
				}
			}
			return frame;
		}
		if (frame.method === "event" && frame.params && typeof frame.params.type === "string") {
			if (frame.params.type === "gateway.ready") this.advertiseCapabilities();
			this.options.onEvent?.(frame.params);
		}
		return frame;
	}
	/**
	* Tell the backend, once per connection generation, that this client answers
	* server→client requests (a handler result or `-32601`). Without it a
	* backend treats a WebSocket client as a build that predates server requests
	* and fails every clarify/approval/… for it immediately instead of stalling
	* the agent for the full deadline. An older backend answers `-32601` here;
	* that is ignored.
	*/
	advertiseCapabilities() {
		const transport = this.transport;
		this.request("client.capabilities", { server_requests: true }).then((result) => {
			if (this.transport === transport) this.backendCountsDeclines = result?.declines_not_shown === true;
		}).catch(() => void 0);
	}
	/**
	* Begin the `gateway.ping` keepalive on the bound transport. Only call when
	* `gateway.ready.heartbeat` advertised support — an older backend would
	* answer with -32601 and never count as alive. What counts as liveness is
	* `heartbeatLiveness`; a full deadline without it drops the transport.
	*/
	startHeartbeat() {
		this.stopHeartbeat();
		this.lastLivenessAt = Date.now();
		const transport = this.transport;
		if (!transport || this.options.heartbeatIntervalMs <= 0 || this.options.heartbeatDeadlineMs <= 0) return;
		let lastPingAt = 0;
		this.heartbeatTimer = setInterval(() => {
			if (this.transport !== transport) return;
			const now = Date.now();
			if (lastPingAt > this.lastLivenessAt && now - this.lastLivenessAt >= this.options.heartbeatDeadlineMs) {
				this.failHeartbeat(/* @__PURE__ */ new Error("WebSocket heartbeat acknowledgement timed out"));
				return;
			}
			const id = `heartbeat-${++this.heartbeatSequence}`;
			this.outstandingPings.add(id);
			if (this.outstandingPings.size > MAX_OUTSTANDING_PINGS) this.outstandingPings.delete(this.outstandingPings.values().next().value);
			lastPingAt = now;
			try {
				transport.send(JSON.stringify({
					jsonrpc: "2.0",
					id,
					method: "gateway.ping",
					params: {}
				}));
			} catch (error) {
				this.failHeartbeat(error instanceof Error ? error : new Error(String(error)));
			}
		}, this.options.heartbeatIntervalMs);
		if (this.options.unrefTimers) unrefTimer(this.heartbeatTimer);
	}
	stopHeartbeat() {
		this.outstandingPings.clear();
		if (this.heartbeatTimer !== null) {
			clearInterval(this.heartbeatTimer);
			this.heartbeatTimer = null;
		}
	}
	failHeartbeat(error) {
		this.stopHeartbeat();
		this.options.onHeartbeatFailure?.(error);
	}
	clearPending(id) {
		const call = this.pending.get(id);
		if (call?.timer) clearTimeout(call.timer);
		this.pending.delete(id);
	}
	rejectAllPending(error) {
		for (const [id, call] of this.pending) {
			if (call.timer) clearTimeout(call.timer);
			this.pending.delete(id);
			call.reject(error);
		}
	}
};
//#endregion
//#region apps/shared/src/json-rpc-gateway.ts
var ANY = "*";
var DEFAULT_REQUEST_TIMEOUT_MS = 12e4;
var isGatewayReady = (event) => event.type === "gateway.ready";
var REPLAY_REQUEST_TIMEOUT_MS = 1e4;
var DEFAULT_CONNECT_TIMEOUT_MS = 15e3;
/** True for a `ws://` / `wss://` URL string — the only thing `JsonRpcGatewayClient.connect()` will dial. */
function isGatewayWebSocketUrl(value) {
	if (typeof value !== "string") return false;
	try {
		const protocol = new URL(value).protocol;
		return protocol === "ws:" || protocol === "wss:";
	} catch {
		return false;
	}
}
/**
* Typed fan-out of gateway `event` notifications: per-type handlers plus a
* `*` wildcard. Shared by the WebSocket client below and the Ink TUI's stdio
* client so both dispatch the same way.
*/
var GatewayEventHub = class {
	handlers = /* @__PURE__ */ new Map();
	on(type, handler) {
		let set = this.handlers.get(type);
		if (!set) {
			set = /* @__PURE__ */ new Set();
			this.handlers.set(type, set);
		}
		set.add(handler);
		return () => set?.delete(handler);
	}
	onAny(handler) {
		return this.on(ANY, handler);
	}
	dispatch(event) {
		for (const handler of this.handlers.get(event.type) ?? []) handler(event);
		for (const handler of this.handlers.get(ANY) ?? []) handler(event);
	}
};
/**
* Bring a `JsonRpcRequestChannel` to a raw text sink — a WebSocket here, a
* child's stdin in the TUI. Kept separate from the socket so the channel never
* holds a reference to a specific socket generation.
*/
var socketTransport = (socket) => ({ send: (text) => socket.send(text) });
/** The canonical owner's typed refusal for a session it no longer has. */
var replaySessionGone = (error) => error?.data?.reason === "not_found";
var JsonRpcGatewayClient = class {
	socket = null;
	state = "idle";
	channel;
	events = new GatewayEventHub();
	/** Last observed event seq per session_id — drives lossless reconnect replay. */
	lastSeenSeq = /* @__PURE__ */ new Map();
	/** Invalidates an interrupted replay so its async cleanup cannot own a replacement socket. */
	replayGeneration = 0;
	/**
	* While a replay fetch is in flight, live seq'd frames for the sessions
	* being replayed are parked here instead of dispatching immediately.
	* Without this hold, a live frame racing the replay response is dispatched
	* twice (once live, once when the replay returns the same seq) or, worse,
	* advances the watermark so the gap events the replay carries get skipped.
	*/
	replayHold = null;
	/**
	* Server process identity for the replay contract (from gateway.ready /
	* session.events.since). Seq counters are in-process on the backend, so a
	* restart resets them while we still hold high watermarks — without this
	* check events_since(sid, 97) returns [] + truncated=false forever and we
	* silently believe nothing was missed.
	*/
	replayEpoch = null;
	/** Canonical authorities number events per session; a session's own epoch outranks the process one. */
	replayEpochBySession = /* @__PURE__ */ new Map();
	stateHandlers = /* @__PURE__ */ new Set();
	options;
	/**
	* This client is the Desktop app on the backend's own machine, read at each socket open
	* (`JsonRpcRequestChannelOptions.desktopLocal`). Only the Desktop's client knows; others are not.
	*/
	isDesktopLocal() {
		return false;
	}
	constructor(options = {}) {
		this.options = {
			closedErrorMessage: options.closedErrorMessage ?? "WebSocket closed",
			connectErrorMessage: options.connectErrorMessage ?? "WebSocket connection failed",
			connectTimeoutMs: options.connectTimeoutMs ?? DEFAULT_CONNECT_TIMEOUT_MS,
			createRequestId: options.createRequestId ?? ((nextId) => `${options.requestIdPrefix ?? "r"}${nextId}`),
			heartbeatDeadlineMs: options.heartbeatDeadlineMs ?? 45e3,
			heartbeatIntervalMs: options.heartbeatIntervalMs ?? 15e3,
			notConnectedErrorMessage: options.notConnectedErrorMessage ?? "gateway not connected",
			onSocketClose: options.onSocketClose ?? (() => false),
			replay: options.replay ?? true,
			requestIdPrefix: options.requestIdPrefix ?? "r",
			onRequestHandlerError: options.onRequestHandlerError,
			onUnhandledRequest: options.onUnhandledRequest,
			requestTimeoutMs: options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS,
			socketFactory: options.socketFactory
		};
		this.channel = new JsonRpcRequestChannel({
			createRequestId: this.options.createRequestId,
			desktopLocal: () => this.isDesktopLocal(),
			heartbeatDeadlineMs: this.options.heartbeatDeadlineMs,
			heartbeatIntervalMs: this.options.heartbeatIntervalMs,
			heartbeatLiveness: "any-inbound",
			onEvent: (event) => this.handleEvent(event),
			onHeartbeatFailure: (error) => this.invalidate(error.message),
			onRequestHandlerError: this.options.onRequestHandlerError,
			onUnhandledRequest: this.options.onUnhandledRequest,
			requestTimeoutMs: this.options.requestTimeoutMs
		});
	}
	get connectionState() {
		return this.state;
	}
	async connect(wsUrl) {
		const invalidUrl = () => {
			const got = typeof wsUrl === "string" ? JSON.stringify(wsUrl) : `type "${typeof wsUrl}"`;
			return /* @__PURE__ */ new Error(`gateway connect() requires a ws:// or wss:// URL string, got ${got}`);
		};
		if (!isGatewayWebSocketUrl(wsUrl)) throw invalidUrl();
		if (this.socket && this.socket.readyState === WebSocket.OPEN || this.state === "connecting") return;
		this.setState("connecting");
		const socket = this.options.socketFactory?.(wsUrl) ?? new WebSocket(wsUrl);
		const transport = socketTransport(socket);
		this.socket = socket;
		this.channel.stopHeartbeat();
		socket.addEventListener("message", (message) => {
			if (this.socket !== socket) return;
			const text = wireFrameText(message.data);
			if (text !== null) this.channel.handleFrame(text);
		});
		socket.addEventListener("close", (event) => {
			if (this.socket !== socket) return;
			if (this.options.onSocketClose(event)) return;
			this.dropSocket(new Error(this.options.closedErrorMessage));
		});
		await new Promise((resolve, reject) => {
			let settled = false;
			let timer;
			const cleanup = () => {
				if (timer !== void 0) clearTimeout(timer);
				socket.removeEventListener("open", onOpen);
				socket.removeEventListener("error", onError);
				socket.removeEventListener("close", onClose);
			};
			const onOpen = () => {
				if (settled || this.socket !== socket) return;
				settled = true;
				cleanup();
				this.channel.attach(transport);
				this.fetchReplay();
				this.setState("open");
				resolve();
			};
			const onError = () => {
				if (settled || this.socket !== socket) return;
				settled = true;
				cleanup();
				this.setState("error");
				reject(this.connectFailure("WebSocket error before open"));
			};
			const onClose = (event) => {
				if (settled) return;
				settled = true;
				cleanup();
				if (this.socket === socket) {
					this.socket = null;
					this.setState("error");
				}
				reject(this.connectFailure(`WebSocket closed during handshake: code ${event.code}${event.reason ? ` ${event.reason}` : ""}`));
			};
			socket.addEventListener("open", onOpen, { once: true });
			socket.addEventListener("error", onError, { once: true });
			socket.addEventListener("close", onClose, { once: true });
			if (this.options.connectTimeoutMs > 0) timer = setTimeout(() => {
				if (settled) return;
				settled = true;
				cleanup();
				if (this.socket === socket) {
					try {
						socket.close();
					} catch {}
					this.socket = null;
					this.setState("error");
				}
				reject(this.connectFailure(`no WebSocket open within ${this.options.connectTimeoutMs} ms`));
			}, this.options.connectTimeoutMs);
		});
	}
	connectFailure(detail) {
		return /* @__PURE__ */ new Error(`${this.options.connectErrorMessage} (${detail})`);
	}
	close() {
		this.invalidate();
	}
	/**
	* Invalidate the current socket generation after an ambiguous transport
	* outcome. The outer connection owner decides whether/when to reconnect.
	*/
	invalidate(message = this.options.closedErrorMessage) {
		const socket = this.socket;
		if (!socket) return;
		this.dropSocket(new Error(message));
		try {
			socket.close();
		} catch {}
	}
	on(type, handler) {
		return this.events.on(type, handler);
	}
	onAny(handler) {
		return this.events.onAny(handler);
	}
	onEvent(handler) {
		return this.onAny(handler);
	}
	/**
	* Server→client requests (clarify, approval, sudo, …). Live frames and
	* `open_requests` re-delivered after a reconnect both arrive here; the
	* latter carry `replayed: true`.
	*/
	onRequest(handler) {
		return this.channel.onRequest(handler);
	}
	onState(handler) {
		this.stateHandlers.add(handler);
		handler(this.state);
		return () => this.stateHandlers.delete(handler);
	}
	request(method, params = {}, timeoutMs = this.options.requestTimeoutMs, signal) {
		if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return Promise.reject(new Error(this.options.notConnectedErrorMessage));
		return this.channel.request(method, params, timeoutMs, signal, () => new Error(this.options.notConnectedErrorMessage));
	}
	handleEvent(event) {
		if (isGatewayReady(event)) {
			if (event.payload?.heartbeat === true) this.channel.startHeartbeat();
			const epoch = event.payload?.replay_epoch;
			if (typeof epoch === "string" && epoch) this.adoptReplayEpoch(epoch);
		}
		const sid = event.session_id;
		const seqValue = event.seq;
		if (this.replayHold && sid && typeof seqValue === "number" && this.replayHold.has(sid)) {
			this.replayHold.get(sid)?.events.push(event);
			return;
		}
		if (sid) this.adoptSessionReplayEpoch(sid, event.replay_epoch);
		this.recordSeq(event);
		this.dispatchEvent(event);
	}
	/**
	* Track each session's last observed event seq. Events without a seq
	* (legacy backend, session-less globals) leave the map untouched.
	*/
	recordSeq(event) {
		const sid = event.session_id;
		const seq = event.seq;
		if (!sid || typeof seq !== "number" || !Number.isFinite(seq)) return;
		if (seq > (this.lastSeenSeq.get(sid) ?? 0)) this.advanceCursor(sid, seq);
	}
	/** Move a session's cursor to `seq` as its most recent; retire the least recently advanced. */
	advanceCursor(sid, seq) {
		this.lastSeenSeq.delete(sid);
		this.lastSeenSeq.set(sid, seq);
		for (const oldest of this.lastSeenSeq.keys()) {
			if (this.lastSeenSeq.size <= 256) break;
			if (this.replayHold?.has(oldest)) continue;
			const latest = this.lastSeenSeq.get(oldest);
			const epoch = this.replayEpochBySession.get(oldest);
			this.lastSeenSeq.delete(oldest);
			this.replayEpochBySession.delete(oldest);
			this.dispatchEvent({
				type: "session.replay_gap",
				session_id: oldest,
				payload: {
					replay_epoch: epoch,
					latest_seq: latest
				}
			});
		}
	}
	/** Test/telemetry hook: current last-seen seq map snapshot. */
	getSeqWatermarks() {
		return Object.fromEntries(this.lastSeenSeq);
	}
	/**
	* Wait for this session's reconnect replay AND parked live frames to dispatch.
	* True includes bounded timeout/unsupported-method fallback and an epoch
	* change on the still-open socket (backend restart: nothing will replay, so
	* REST is authoritative); false means the socket was lost and a pending
	* history read must be abandoned (the next open re-reads).
	* Unobserved sessions and replay-disabled feeds have no barrier.
	*/
	sessionReplayBarrier(sessionId) {
		const pending = this.replayHold?.get(sessionId)?.promise;
		if (pending) return pending;
		if (this.options.replay && this.lastSeenSeq.has(sessionId) && this.socket?.readyState !== WebSocket.OPEN) return Promise.resolve(false);
	}
	/**
	* After a reconnect, ask the gateway to replay every event newer than our
	* per-session watermarks. Replayed frames go through the SAME dispatchEvent
	* path as live frames, gated on seq to avoid dispatching duplicates.
	* Best-effort: failures are swallowed (the next reconnect retries).
	*/
	fetchReplay() {
		if (!this.options.replay || this.replayHold || this.lastSeenSeq.size === 0) return;
		const replayGeneration = ++this.replayGeneration;
		const entries = [...this.lastSeenSeq];
		const hold = /* @__PURE__ */ new Map();
		for (const [sid] of entries) {
			let resolve;
			const promise = new Promise((settle) => {
				resolve = settle;
			});
			hold.set(sid, {
				events: [],
				promise,
				resolve
			});
		}
		this.replayHold = hold;
		for (const [sid, lastSeen] of entries) this.fetchSessionReplay(sid, lastSeen, replayGeneration);
	}
	async fetchSessionReplay(sid, lastSeen, replayGeneration) {
		if (this.replayGeneration !== replayGeneration) return;
		try {
			const sessionEpochBefore = this.replayEpochBySession.get(sid);
			const result = await this.request("session.events.since", {
				session_id: sid,
				last_seen: lastSeen,
				...sessionEpochBefore ? { replay_epoch: sessionEpochBefore } : {}
			}, REPLAY_REQUEST_TIMEOUT_MS);
			if (this.replayGeneration !== replayGeneration) return;
			if (this.applyReplayEpochs(sid, result)) return;
			if (result?.truncated === true) {
				this.skipTruncatedWindow(sid, result);
				return;
			}
			if (!Array.isArray(result?.events)) return;
			for (const event of result.events) {
				if (this.replayGeneration !== replayGeneration) return;
				if (event?.type) this.dispatchIfNewer({
					...event,
					replayed: true
				});
			}
		} catch (error) {
			if (this.replayGeneration === replayGeneration && replaySessionGone(error)) {
				this.lastSeenSeq.delete(sid);
				this.replayEpochBySession.delete(sid);
			}
		} finally {
			if (this.replayGeneration === replayGeneration) this.flushReplayHold(sid, replayGeneration);
		}
	}
	/** Adopt the replay answer's epoch identity; true when the window must not be dispatched. */
	applyReplayEpochs(sid, result) {
		const epoch = result?.epoch;
		const sessionEpoch = result?.replay_epoch;
		if (result?.snapshot_required === true) {
			this.lastSeenSeq.delete(sid);
			this.replayEpochBySession.delete(sid);
			this.dispatchEvent({
				type: "session.replay_gap",
				session_id: sid,
				payload: {
					replay_epoch: sessionEpoch,
					latest_seq: result.latest_seq
				}
			});
			return true;
		}
		if (typeof sessionEpoch === "string" && sessionEpoch) {
			if (this.adoptSessionReplayEpoch(sid, sessionEpoch)) return true;
		} else if (typeof epoch === "string" && epoch && this.replayEpoch && epoch !== this.replayEpoch) {
			this.adoptReplayEpoch(epoch);
			return true;
		} else if (typeof epoch === "string" && epoch && !this.replayEpoch) this.replayEpoch = epoch;
		return false;
	}
	/** Advance the watermark past a truncated replay window without dispatching any of it. */
	skipTruncatedWindow(sid, result) {
		const seqs = (Array.isArray(result.events) ? result.events : []).map((event) => event?.seq);
		const head = Math.max(this.lastSeenSeq.get(sid) ?? 0, ...[result.latest_seq, ...seqs].filter((seq) => typeof seq === "number" && Number.isFinite(seq)));
		this.advanceCursor(sid, head);
	}
	/**
	* Dispatch an event only when its seq advances the session watermark.
	* Seq-less events always dispatch (no ordering contract to violate).
	*/
	dispatchIfNewer(event) {
		const sid = event.session_id;
		const seq = event.seq;
		if (sid) this.adoptSessionReplayEpoch(sid, event.replay_epoch);
		if (sid && typeof seq === "number" && Number.isFinite(seq)) {
			if (seq <= (this.lastSeenSeq.get(sid) ?? 0)) return;
			this.advanceCursor(sid, seq);
		}
		this.dispatchEvent(event);
	}
	/**
	* Record the server's replay epoch; on change (backend restart) the old
	* seq watermarks describe a numbering that no longer exists — clear them
	* so the next reconnect doesn't silently believe it missed nothing.
	*/
	adoptReplayEpoch(epoch) {
		if (this.replayEpoch === epoch) return;
		const changed = this.replayEpoch !== null;
		this.replayEpoch = epoch;
		if (changed) {
			for (const sid of this.lastSeenSeq.keys()) if (!this.replayEpochBySession.has(sid)) this.lastSeenSeq.delete(sid);
			const hold = this.cancelReplay(true);
			const generation = this.replayGeneration;
			for (const replay of hold?.values() ?? []) for (const event of replay.events) {
				if (this.replayGeneration !== generation) return;
				this.dispatchIfNewer({
					...event,
					replayed: true
				});
			}
		}
	}
	/** Release frames parked during a replay fetch, seq-gated against dupes. */
	flushReplayHold(sid, generation) {
		const replay = this.replayHold?.get(sid);
		if (!replay) return;
		while (this.replayGeneration === generation && replay.events.length) this.dispatchIfNewer({
			...replay.events.shift(),
			replayed: true
		});
		if (this.replayGeneration !== generation) return;
		this.replayHold?.delete(sid);
		if (this.replayHold?.size === 0) this.replayHold = null;
		replay.resolve(true);
	}
	/** Returns true when an established session numbering has changed. */
	adoptSessionReplayEpoch(sid, epoch) {
		if (typeof epoch !== "string" || !epoch) return false;
		const previous = this.replayEpochBySession.get(sid);
		const changed = previous !== void 0 && previous !== epoch;
		if (changed) this.lastSeenSeq.delete(sid);
		this.replayEpochBySession.set(sid, epoch);
		return changed;
	}
	cancelReplay(readsMayProceed) {
		const hold = this.replayHold;
		this.replayGeneration += 1;
		this.replayHold = null;
		for (const replay of hold?.values() ?? []) replay.resolve(readsMayProceed);
		return hold;
	}
	/** Forget the current socket generation, fail its calls, and go 'closed'. */
	dropSocket(error) {
		this.cancelReplay(false);
		this.socket = null;
		this.channel.detach(error);
		this.setState("closed");
	}
	dispatchEvent(event) {
		this.events.dispatch(this.replayEpoch ? {
			...event,
			replayEpoch: this.replayEpoch
		} : event);
	}
	setState(state) {
		if (this.state === state) return;
		this.state = state;
		for (const handler of this.stateHandlers) handler(state);
	}
};
/** The scale plus the off state — the full set a config value may hold. */
var REASONING_EFFORT_VALUES = ["none", ...[
	"minimal",
	"low",
	"medium",
	"high",
	"xhigh",
	"max",
	"ultra"
]];
/** Hermes' built-in level when neither the surface nor the profile config
*  specifies one (mirrors the backend's own fallback). */
var DEFAULT_REASONING_EFFORT = "medium";
//#endregion
//#region apps/shared/src/session-http-mutations.ts
/** Keep an ambiguous write's identity until the same intent is acknowledged.
* Keys include the captured destination and payload; neither retries nor a
* profile switch may silently refresh the precondition of a possibly committed edit.
* A key is a JSON array whose first two entries are the destination scope and the session id:
* an acknowledged write retires that session's other retained identities (their revision is
* superseded, so replaying them could only conflict or return a stale receipt).
*/
function createSessionMutationClient() {
	const pending = /* @__PURE__ */ new Map();
	return async function mutate(key, read, send, importing = false) {
		let prepared = pending.get(key);
		if (!prepared) {
			prepared = read().then((snapshot) => {
				if (typeof snapshot?.exists !== "boolean" || !Number.isSafeInteger(snapshot.runtime_revision) || snapshot.runtime_revision < 0 || !importing && !snapshot.exists || snapshot.exists && (!Number.isSafeInteger(snapshot.runtime_generation) || snapshot.runtime_generation < 0)) throw new Error("Session mutation snapshot unavailable; refresh before trying again");
				return {
					request_id: randomUuid(),
					expected_revision: snapshot.runtime_revision,
					...snapshot.exists ? { expected_generation: snapshot.runtime_generation } : {}
				};
			});
			pending.set(key, prepared);
		}
		let identity;
		try {
			identity = await prepared;
		} catch (error) {
			pending.delete(key);
			throw error;
		}
		try {
			const result = await send(identity);
			const owner = sessionOwner(key);
			for (const other of [...pending.keys()]) if (other === key || owner && sessionOwner(other) === owner) pending.delete(other);
			return result;
		} catch (error) {
			if (/revision_conflict|stale_generation|permission_denied|profile_mismatch|invalid_params|admission_conflict|session_busy|retained_receipts|runtime_coordination_required|unknown_execution|not_found|mutation_identity_required/.test(String(error))) pending.delete(key);
			throw error;
		}
	};
}
/** A v4 UUID on every origin, the one id minter for renderer and plugin code. `crypto.randomUUID`
* exists only in secure contexts, so a Webapp opened over plain HTTP from another machine has none. */
function randomUuid() {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	const bytes = /* @__PURE__ */ new Uint8Array(16);
	if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") crypto.getRandomValues(bytes);
	else for (let index = 0; index < bytes.length; index += 1) bytes[index] = Math.floor(Math.random() * 256);
	bytes[6] = bytes[6] & 15 | 64;
	bytes[8] = bytes[8] & 63 | 128;
	const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
function sessionOwner(key) {
	try {
		const parsed = JSON.parse(key);
		return Array.isArray(parsed) && parsed.length > 2 ? JSON.stringify(parsed.slice(0, 2)) : null;
	} catch {
		return null;
	}
}
new RegExp(`^${"[IMPORTANT: The user has invoked the ".replace(/[[\]]/g, "\\$&")}"([^"]*)"`);
//#endregion
//#region apps/shared/src/theme-presets.ts
var NOUS_ALT_BLUE = "#0053FD";
var NOUS_ALT_NAVY = "#1540B1";
var NOUS_ALT_CREAM = "#FFE6CB";
var nousAltTint = (pct) => `color-mix(in srgb, ${NOUS_ALT_BLUE} ${pct}%, #FFFFFF)`;
var nousAltTintTransparent = (pct) => `color-mix(in srgb, ${NOUS_ALT_BLUE} ${pct}%, transparent)`;
var THEME_PRESET_PALETTES = {
	github: {
		colors: {
			background: "#ffffff",
			foreground: "#1f2328",
			card: "#f6f8fa",
			cardForeground: "#1f2328",
			muted: "#f6f6f6",
			mutedForeground: "#656d76",
			popover: "#ffffff",
			popoverForeground: "#1f2328",
			primary: "#196d31",
			primaryForeground: "#ffffff",
			secondary: "#dfebe2",
			secondaryForeground: "#1f2328",
			accent: "#e3ede6",
			accentForeground: "#1f2328",
			border: "#d0d7de",
			input: "#ffffff",
			ring: "#196d31",
			midground: "#196d31",
			midgroundForeground: "#ffffff",
			composerRing: "#196d31",
			destructive: "#cf222e",
			destructiveForeground: "#ffffff",
			sidebarBackground: "#f6f8fa",
			sidebarBorder: "#d0d7de",
			userBubble: "#dbe7e2",
			userBubbleBorder: "#d0d7de"
		},
		darkColors: {
			background: "#0d1117",
			foreground: "#e6edf3",
			card: "#010409",
			cardForeground: "#e6edf3",
			muted: "#1a1e24",
			mutedForeground: "#7d8590",
			popover: "#161b22",
			popoverForeground: "#e6edf3",
			primary: "#4f9e5e",
			primaryForeground: "#ffffff",
			secondary: "#1f382b",
			secondaryForeground: "#e6edf3",
			accent: "#192a24",
			accentForeground: "#e6edf3",
			border: "#30363d",
			input: "#0d1117",
			ring: "#4f9e5e",
			midground: "#4f9e5e",
			midgroundForeground: "#ffffff",
			composerRing: "#4f9e5e",
			destructive: "#f85149",
			destructiveForeground: "#ffffff",
			sidebarBackground: "#010409",
			sidebarBorder: "#30363d",
			userBubble: "#0f2018",
			userBubbleBorder: "#30363d"
		}
	},
	nous: {
		colors: {
			background: "#ffffff",
			foreground: "#1f2328",
			card: "#f6f8fa",
			cardForeground: "#1f2328",
			muted: "#f6f6f6",
			mutedForeground: "#656d76",
			popover: "#ffffff",
			popoverForeground: "#1f2328",
			primary: "#0053fd",
			primaryForeground: "#ffffff",
			secondary: "#deeaff",
			secondaryForeground: "#1f2328",
			accent: "#e3edff",
			accentForeground: "#1f2328",
			border: "#d0d7de",
			input: "#ffffff",
			ring: "#0053fd",
			midground: "#0053fd",
			midgroundForeground: "#ffffff",
			composerRing: "#0053fd",
			destructive: "#cf222e",
			destructiveForeground: "#ffffff",
			sidebarBackground: "#f6f8fa",
			sidebarBorder: "#d0d7de",
			userBubble: "#dae7fd",
			userBubbleBorder: "#d0d7de"
		},
		darkColors: {
			background: "#0d1117",
			foreground: "#e6edf3",
			card: "#010409",
			cardForeground: "#e6edf3",
			muted: "#1a1e24",
			mutedForeground: "#7d8590",
			popover: "#161b22",
			popoverForeground: "#e6edf3",
			primary: "#4a84fe",
			primaryForeground: "#161616",
			secondary: "#1d2e4f",
			secondaryForeground: "#e6edf3",
			accent: "#17243a",
			accentForeground: "#e6edf3",
			border: "#30363d",
			input: "#0d1117",
			ring: "#4a84fe",
			midground: "#4a84fe",
			midgroundForeground: "#161616",
			composerRing: "#4a84fe",
			destructive: "#f85149",
			destructiveForeground: "#ffffff",
			sidebarBackground: "#010409",
			sidebarBorder: "#30363d",
			userBubble: "#07162c",
			userBubbleBorder: "#30363d"
		}
	},
	catppuccin: {
		colors: {
			background: "#eff1f5",
			foreground: "#4c4f69",
			card: "#e6e9ef",
			cardForeground: "#4c4f69",
			muted: "#e8ebef",
			mutedForeground: "#4c4f69",
			popover: "#e6e9ef",
			popoverForeground: "#4c4f69",
			primary: "#6d2ebf",
			primaryForeground: "#ffffff",
			secondary: "#ddd6ed",
			secondaryForeground: "#4c4f69",
			accent: "#dfdaef",
			accentForeground: "#4c4f69",
			border: "#acb0be",
			input: "#ccd0da",
			ring: "#6d2ebf",
			midground: "#6d2ebf",
			midgroundForeground: "#ffffff",
			composerRing: "#6d2ebf",
			destructive: "#d20f39",
			destructiveForeground: "#ffffff",
			sidebarBackground: "#e6e9ef",
			sidebarBorder: "#acb0be",
			userBubble: "#d7d3e9",
			userBubbleBorder: "#acb0be"
		},
		darkColors: {
			background: "#1e1e2e",
			foreground: "#cdd6f4",
			card: "#181825",
			cardForeground: "#cdd6f4",
			muted: "#29293a",
			mutedForeground: "#cdd6f4",
			popover: "#181825",
			popoverForeground: "#cdd6f4",
			primary: "#cba6f7",
			primaryForeground: "#ffffff",
			secondary: "#4e4466",
			secondaryForeground: "#cdd6f4",
			accent: "#3d3652",
			accentForeground: "#cdd6f4",
			border: "#585b70",
			input: "#313244",
			ring: "#cba6f7",
			midground: "#cba6f7",
			midgroundForeground: "#ffffff",
			composerRing: "#cba6f7",
			destructive: "#f38ba8",
			destructiveForeground: "#ffffff",
			sidebarBackground: "#181825",
			sidebarBorder: "#585b70",
			userBubble: "#38324b",
			userBubbleBorder: "#585b70"
		}
	},
	everforest: {
		colors: {
			background: "#fdf6e3",
			foreground: "#5c6a72",
			card: "#fdf6e3",
			cardForeground: "#5c6a72",
			muted: "#f7f0de",
			mutedForeground: "#939f91",
			popover: "#fdf6e3",
			popoverForeground: "#5c6a72",
			primary: "#586b35",
			primaryForeground: "#ffffff",
			secondary: "#e6e3cb",
			secondaryForeground: "#5c6a72",
			accent: "#e9e5ce",
			accentForeground: "#5c6a72",
			border: "#fdf6e3",
			input: "#fdf6e3",
			ring: "#586b35",
			midground: "#586b35",
			midgroundForeground: "#ffffff",
			composerRing: "#586b35",
			destructive: "#f1706f",
			destructiveForeground: "#ffffff",
			sidebarBackground: "#fdf6e3",
			sidebarBorder: "#fdf6e3",
			userBubble: "#e9e5ce",
			userBubbleBorder: "#fdf6e3"
		},
		darkColors: {
			background: "#2d353b",
			foreground: "#d3c6aa",
			card: "#2d353b",
			cardForeground: "#d3c6aa",
			muted: "#373e42",
			mutedForeground: "#859289",
			popover: "#2d353b",
			popoverForeground: "#d3c6aa",
			primary: "#a7c080",
			primaryForeground: "#ffffff",
			secondary: "#4f5c4e",
			secondaryForeground: "#d3c6aa",
			accent: "#434e47",
			accentForeground: "#d3c6aa",
			border: "#2d353b",
			input: "#2d353b",
			ring: "#a7c080",
			midground: "#a7c080",
			midgroundForeground: "#ffffff",
			composerRing: "#a7c080",
			destructive: "#da6362",
			destructiveForeground: "#ffffff",
			sidebarBackground: "#2d353b",
			sidebarBorder: "#2d353b",
			userBubble: "#434e47",
			userBubbleBorder: "#2d353b"
		}
	},
	solarized: {
		colors: {
			background: "#fdf6e3",
			foreground: "#1f1f1f",
			card: "#d3cbb7",
			cardForeground: "#1f1f1f",
			muted: "#f4eddb",
			mutedForeground: "#9ca8a6",
			popover: "#eee8d5",
			popoverForeground: "#1f1f1f",
			primary: "#675e34",
			primaryForeground: "#ffffff",
			secondary: "#e8e1cb",
			secondaryForeground: "#1f1f1f",
			accent: "#ebe4ce",
			accentForeground: "#1f1f1f",
			border: "#ddd6c1",
			input: "#ddd6c1",
			ring: "#675e34",
			midground: "#675e34",
			midgroundForeground: "#ffffff",
			composerRing: "#675e34",
			destructive: "#e25563",
			destructiveForeground: "#ffffff",
			sidebarBackground: "#eee8d5",
			sidebarBorder: "#ddd6c1",
			userBubble: "#c6bea7",
			userBubbleBorder: "#ddd6c1"
		},
		darkColors: {
			background: "#002b36",
			foreground: "#839496",
			card: "#002b36",
			cardForeground: "#839496",
			muted: "#08313c",
			mutedForeground: "#586e75",
			popover: "#001f26",
			popoverForeground: "#839496",
			primary: "#6ea1c4",
			primaryForeground: "#ffffff",
			secondary: "#1f4c5e",
			secondaryForeground: "#839496",
			accent: "#144050",
			accentForeground: "#839496",
			border: "#234751",
			input: "#073642",
			ring: "#6ea1c4",
			midground: "#6ea1c4",
			midgroundForeground: "#ffffff",
			composerRing: "#6ea1c4",
			destructive: "#e35957",
			destructiveForeground: "#ffffff",
			sidebarBackground: "#001f26",
			sidebarBorder: "#234751",
			userBubble: "#144050",
			userBubbleBorder: "#234751"
		}
	},
	"nous-alt": {
		colors: {
			background: "#F8FAFF",
			foreground: "#17171A",
			card: "#FFFFFF",
			cardForeground: "#17171A",
			muted: nousAltTint(5),
			mutedForeground: "#666678",
			popover: "#FFFFFF",
			popoverForeground: "#17171A",
			primary: NOUS_ALT_BLUE,
			primaryForeground: "#FCFCFC",
			secondary: nousAltTint(7),
			secondaryForeground: "#242432",
			accent: nousAltTint(10),
			accentForeground: "#202030",
			border: nousAltTintTransparent(22),
			input: nousAltTintTransparent(30),
			ring: NOUS_ALT_BLUE,
			midground: NOUS_ALT_BLUE,
			composerRing: NOUS_ALT_BLUE,
			destructive: "#C72E4D",
			destructiveForeground: "#FFFFFF",
			sidebarBackground: "#F3F7FF",
			sidebarBorder: nousAltTintTransparent(18),
			userBubble: nousAltTint(6),
			userBubbleBorder: nousAltTintTransparent(24)
		},
		darkColors: {
			background: "#0D2F86",
			foreground: NOUS_ALT_CREAM,
			card: "#12378F",
			cardForeground: NOUS_ALT_CREAM,
			muted: "#183F9A",
			mutedForeground: "#B5C7F3",
			popover: "#123A96",
			popoverForeground: NOUS_ALT_CREAM,
			primary: NOUS_ALT_CREAM,
			primaryForeground: "#0D2F86",
			secondary: "#1B45A4",
			secondaryForeground: "#E0E8FF",
			accent: NOUS_ALT_NAVY,
			accentForeground: "#F0F4FF",
			border: "#3158AD",
			input: "#0B2566",
			ring: NOUS_ALT_CREAM,
			midground: NOUS_ALT_BLUE,
			composerRing: NOUS_ALT_CREAM,
			destructive: "#C0473A",
			destructiveForeground: "#FEF2F2",
			sidebarBackground: "#09286F",
			sidebarBorder: "#234A9C",
			userBubble: "#143B91",
			userBubbleBorder: "#3A63BD"
		}
	},
	midnight: { colors: {
		background: "#08081c",
		foreground: "#ddd6ff",
		card: "#0d0d28",
		cardForeground: "#ddd6ff",
		muted: "#13133a",
		mutedForeground: "#7c7ab0",
		popover: "#0f0f2e",
		popoverForeground: "#ddd6ff",
		primary: "#ddd6ff",
		primaryForeground: "#08081c",
		secondary: "#1a1a4a",
		secondaryForeground: "#c4bff0",
		accent: "#1a1a44",
		accentForeground: "#d0c8ff",
		border: "#1e1e52",
		input: "#1e1e52",
		ring: "#8b80e8",
		midground: "#8b80e8",
		destructive: "#b03060",
		destructiveForeground: "#fef2f2",
		sidebarBackground: "#06061a",
		sidebarBorder: "#12123a",
		userBubble: "#14143a",
		userBubbleBorder: "#242466"
	} },
	ember: { colors: {
		background: "#160800",
		foreground: "#ffd8b0",
		card: "#1e0e04",
		cardForeground: "#ffd8b0",
		muted: "#2a1408",
		mutedForeground: "#aa7a56",
		popover: "#221008",
		popoverForeground: "#ffd8b0",
		primary: "#ffd8b0",
		primaryForeground: "#160800",
		secondary: "#341800",
		secondaryForeground: "#f0c090",
		accent: "#301600",
		accentForeground: "#e8c080",
		border: "#3a1c08",
		input: "#3a1c08",
		ring: "#d97316",
		midground: "#d97316",
		destructive: "#c43010",
		destructiveForeground: "#fef2f2",
		sidebarBackground: "#100600",
		sidebarBorder: "#2a1004",
		userBubble: "#2a1000",
		userBubbleBorder: "#4a2010"
	} },
	mono: { colors: {
		background: "#0e0e0e",
		foreground: "#eaeaea",
		card: "#141414",
		cardForeground: "#eaeaea",
		muted: "#1e1e1e",
		mutedForeground: "#808080",
		popover: "#181818",
		popoverForeground: "#eaeaea",
		primary: "#eaeaea",
		primaryForeground: "#0e0e0e",
		secondary: "#262626",
		secondaryForeground: "#c8c8c8",
		accent: "#222222",
		accentForeground: "#d8d8d8",
		border: "#2a2a2a",
		input: "#2a2a2a",
		ring: "#9a9a9a",
		midground: "#9a9a9a",
		destructive: "#a84040",
		destructiveForeground: "#fef2f2",
		sidebarBackground: "#0a0a0a",
		sidebarBorder: "#202020",
		userBubble: "#1a1a1a",
		userBubbleBorder: "#363636"
	} },
	cyberpunk: { colors: {
		background: "#000a00",
		foreground: "#00ff41",
		card: "#001200",
		cardForeground: "#00ff41",
		muted: "#001a00",
		mutedForeground: "#1a8a30",
		popover: "#001000",
		popoverForeground: "#00ff41",
		primary: "#00ff41",
		primaryForeground: "#000a00",
		secondary: "#002800",
		secondaryForeground: "#00cc34",
		accent: "#002000",
		accentForeground: "#00e038",
		border: "#003000",
		input: "#003000",
		ring: "#00ff41",
		midground: "#00ff41",
		destructive: "#ff003c",
		destructiveForeground: "#000a00",
		sidebarBackground: "#000600",
		sidebarBorder: "#001800",
		userBubble: "#001400",
		userBubbleBorder: "#004800"
	} },
	slate: { colors: {
		background: "#0d1117",
		foreground: "#c9d1d9",
		card: "#161b22",
		cardForeground: "#c9d1d9",
		muted: "#21262d",
		mutedForeground: "#8b949e",
		popover: "#1c2128",
		popoverForeground: "#c9d1d9",
		primary: "#c9d1d9",
		primaryForeground: "#0d1117",
		secondary: "#2a3038",
		secondaryForeground: "#adb5bf",
		accent: "#1e2530",
		accentForeground: "#c0c8d0",
		border: "#30363d",
		input: "#30363d",
		ring: "#58a6ff",
		midground: "#58a6ff",
		destructive: "#cf4848",
		destructiveForeground: "#fef2f2",
		sidebarBackground: "#090d13",
		sidebarBorder: "#1c2228",
		userBubble: "#1e2a38",
		userBubbleBorder: "#2e4060"
	} }
};
//#endregion
//#region apps/shared/src/translucency.ts
/**
* macOS vibrancy materials offered as glass "frost" levels, ordered sheer →
* heavy. macOS exposes no blur-radius knob (VibrancyOptions is only an
* animation duration), so the material IS the frost control: each maps to a
* different NSVisualEffectView material with its own luminance lift.
*
* Curated by pixel census on macOS 26 (one window, visualEffectState pinned
* to 'active', cycling all 14 materials over the same wallpaper): the 14
* collapse to 9 distinct looks (sidebar≡hud, window≡fullscreen-ui,
* tooltip≡content≡under-window≡under-page). These four are the ladder with
* the widest separations that stay distinct in BOTH appearances — dark lum
* 26/63/84/127, light lum 217/233/254/242. sidebar/hud sit 9 lum from
* under-window when focused and collapse INTO it when unfocused, which
* shipped as two indistinguishable picker options once — don't re-add them.
*/
var GLASS_MATERIALS = [
	"under-window",
	"popover",
	"titlebar",
	"header"
];
/**
* Frost (sheer → heavy) → Windows 11 system backdrop. Acrylic is the live-blur
* transient material, closest to macOS under-window vibrancy; tabbed and mica
* sample the wallpaper and read more opaque.
*
* Three backdrops for four rungs, so the two heaviest both land on mica. The
* mapping stays total — a frost saved on a Mac still resolves — and the PICKER
* drops the duplicate instead (see `glassMaterialsFor`).
*/
var WINDOWS_MATERIAL_BY_FROST = {
	"under-window": "acrylic",
	popover: "tabbed",
	titlebar: "mica",
	header: "mica"
};
GLASS_MATERIALS.filter((material, index) => GLASS_MATERIALS.findIndex((rung) => WINDOWS_MATERIAL_BY_FROST[rung] === WINDOWS_MATERIAL_BY_FROST[material]) === index);
//#endregion
//#region apps/shared/src/websocket-url.ts
function readWindowLocation() {
	if (typeof window === "undefined") return {
		host: "",
		protocol: "http:"
	};
	return {
		host: window.location.host,
		protocol: window.location.protocol
	};
}
function normalizeBasePath(basePath) {
	if (!basePath) return "";
	return (basePath.startsWith("/") ? basePath : `/${basePath}`).replace(/\/+$/, "");
}
function normalizeEndpointPath(path) {
	return path.startsWith("/") ? path : `/${path}`;
}
function buildHermesWebSocketUrl(options) {
	const loc = readWindowLocation();
	const protocol = options.protocol ?? loc.protocol;
	const host = options.host ?? loc.host;
	const wsScheme = protocol === "https:" || protocol === "wss:" ? "wss:" : "ws:";
	const qs = new URLSearchParams(options.params ?? {});
	if (options.authParam) {
		const [name, value] = options.authParam;
		qs.set(name, value);
	}
	const query = qs.toString();
	const suffix = query ? `?${query}` : "";
	return `${wsScheme}//${host}${normalizeBasePath(options.basePath)}${normalizeEndpointPath(options.path)}${suffix}`;
}
//#endregion
//#region web/src/lib/session-mutations.ts
function createDashboardSessionMutations(fetchJSON) {
	const mutate = createSessionMutationClient();
	return (id, method, payload, profile) => {
		const path = `/api/sessions/${encodeURIComponent(id)}`;
		const query = new URLSearchParams(profile ? { profile } : {});
		const suffix = query.size ? `?${query}` : "";
		const frozen = JSON.parse(JSON.stringify(payload));
		const key = JSON.stringify([
			profile,
			id,
			method,
			frozen
		]);
		return mutate(key, () => fetchJSON(`${path}/mutation-snapshot${suffix}`), (identity) => {
			if (method === "DELETE") {
				const params = new URLSearchParams(query);
				for (const [name, value] of Object.entries(identity)) params.set(name, String(value));
				return fetchJSON(`${path}?${params}`, { method });
			}
			const { expected_generation: generation, ...baseIdentity } = identity;
			return fetchJSON(method === "POST" ? "/api/sessions/import" : path, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...frozen,
					...baseIdentity,
					...method === "PATCH" ? { expected_generation: generation } : {},
					profile: profile || void 0
				})
			});
		}, method === "POST");
	};
}
//#endregion
//#region web/src/lib/profile-bootstrap.ts
function dashboardInitialProfile() {
	if (typeof window === "undefined") return "";
	return window.__HERMES_INITIAL_PROFILE__ ?? "";
}
/**
* The profile this backend process itself serves, injected by the server and
* empty when it cannot be named unambiguously (custom HERMES_HOME).
*
* It is the LAST fallback for the management scope: without it the dashboard
* sends no `?profile=` at all, which a multi-profile host now refuses (400) on
* every destructive route. It is never a guess — the backend only emits a name
* that provably resolves back to its own home, so it targets exactly the home
* an unnamed request used to reach.
*/
function dashboardServingProfile() {
	if (typeof window === "undefined") return "";
	return window.__HERMES_DASHBOARD_PROFILE__ ?? "";
}
function initialProfileScope(searchParams, bootstrapProfile = dashboardInitialProfile(), servingProfile = dashboardServingProfile()) {
	const urlProfile = searchParams.get("profile");
	if (urlProfile !== null) return urlProfile;
	return bootstrapProfile || servingProfile;
}
function shouldAdoptActiveProfile(urlProfile, bootstrapProfile, currentProfile, activeProfile) {
	return urlProfile === null && !bootstrapProfile && currentProfile === "default" && activeProfile !== currentProfile;
}
//#endregion
//#region web/src/lib/dashboard-auth-reload.ts
var TOKEN_RELOAD_STORAGE_KEY = "hermes.tokenReloadAttempted";
function dashboardAuthRequired() {
	return typeof window !== "undefined" && !!window.__HERMES_AUTH_REQUIRED__;
}
function reloadDashboardWindow() {
	if (typeof window !== "undefined") window.location.reload();
}
function dashboardSessionStorage() {
	if (typeof window === "undefined") return null;
	try {
		return window.sessionStorage;
	} catch {
		return null;
	}
}
function clearDashboardTokenReloadAttempt(storage = dashboardSessionStorage()) {
	try {
		storage?.removeItem(TOKEN_RELOAD_STORAGE_KEY);
	} catch {}
}
function attemptDashboardTokenReloadOnce(storage = dashboardSessionStorage(), reload = reloadDashboardWindow) {
	let alreadyReloaded = false;
	try {
		alreadyReloaded = storage?.getItem(TOKEN_RELOAD_STORAGE_KEY) === "1";
	} catch {}
	if (alreadyReloaded) return false;
	try {
		storage?.setItem(TOKEN_RELOAD_STORAGE_KEY, "1");
	} catch {}
	reload();
	return true;
}
function maybeReloadForLoopbackWsAuthFailure(code, authRequired = dashboardAuthRequired(), storage = dashboardSessionStorage(), reload = reloadDashboardWindow) {
	if (authRequired || code !== 4401) return false;
	return attemptDashboardTokenReloadOnce(storage, reload);
}
//#endregion
//#region web/src/lib/api-error.ts
/**
* User-facing error shape for the dashboard REST layer.
*
* `fetchJSON` used to throw `new Error("<status>: <raw body>")`, and ~40 toast
* call sites interpolated the Error object (`Error: ${e}`), so users saw
* `Error: Error: 404: {"detail":"Server 'foo' not found"}`. This module turns
* that into a plain sentence (`Server 'foo' not found`) while keeping the
* status and raw body on the error object for diagnostics.
*/
/** The dashboard's own backend could not be reached at all (fetch rejected). */
var API_UNREACHABLE_MESSAGE = "Hermes dashboard cannot reach the Hermes service. Is `hermes dashboard` still running?";
/** Status → plain sentence, used when the body carries no usable `detail`. */
var STATUS_COPY = {
	400: "The dashboard sent a request the server could not understand.",
	401: "Your dashboard session has expired. Reload the page to sign in again.",
	403: "You are not allowed to do that on this dashboard.",
	404: "The server could not find what the dashboard asked for.",
	409: "That change conflicts with the current state on the server.",
	413: "That upload is too large for the server to accept.",
	422: "Some of the entered values are not valid.",
	429: "Too many requests. Wait a moment and try again.",
	500: "The Hermes service hit an internal error.",
	502: "The dashboard proxy could not reach the Hermes service.",
	503: "The Hermes service is not ready yet. Try again in a moment.",
	504: "The Hermes service took too long to respond."
};
function humanizeStatus(status) {
	return STATUS_COPY[status] ?? `The Hermes service answered with an unexpected error (${status}).`;
}
/** Pull a human sentence out of a FastAPI-style error body, or null. */
function extractDetail(body) {
	const text = body.trim();
	if (!text) return null;
	if (text.startsWith("{") || text.startsWith("[")) try {
		const parsed = JSON.parse(text);
		if (parsed && typeof parsed === "object") {
			const record = parsed;
			for (const key of [
				"detail",
				"message",
				"error"
			]) {
				const value = record[key];
				if (typeof value === "string" && value.trim()) return value.trim();
				if (Array.isArray(value)) {
					const msgs = value.map((item) => item && typeof item === "object" ? item.msg : null).filter((m) => typeof m === "string");
					if (msgs.length) return msgs.join("; ");
				} else if (value && typeof value === "object") {
					const message = value.message;
					if (typeof message === "string" && message.trim()) return message.trim();
				}
			}
		}
		return null;
	} catch {
		return null;
	}
	if (text.startsWith("<")) return null;
	return text.length <= 300 ? text : null;
}
var ApiError = class extends Error {
	/** HTTP status; 0 when the request never reached the server. */
	status;
	/** Raw response body (or the transport error text) for a Copy-details action. */
	body;
	/** Request URL (path only), for diagnostics. */
	url;
	constructor(message, init) {
		super(message);
		this.name = "ApiError";
		this.status = init.status;
		this.body = init.body;
		this.url = init.url;
	}
	/** Multi-line technical detail for a Copy-details action or console. */
	get details() {
		const head = this.status ? `HTTP ${this.status} ${this.url}` : `network failure ${this.url}`;
		return this.body ? `${head}\n${this.body}` : head;
	}
};
function apiErrorFromResponse(status, body, url) {
	return new ApiError(extractDetail(body) ?? humanizeStatus(status), {
		status,
		body,
		url
	});
}
function apiErrorFromNetworkFailure(cause, url) {
	return new ApiError(API_UNREACHABLE_MESSAGE, {
		status: 0,
		body: cause instanceof Error ? `${cause.name}: ${cause.message}` : String(cause),
		url
	});
}
/**
* The one way to turn a caught `unknown` into toast/inline text. Never yields
* a `Error: Error:` double prefix because it reads `.message`, not `String(e)`.
*/
function errorMessage(err) {
	if (err instanceof Error) return err.message || err.name;
	if (typeof err === "string") return err;
	return String(err);
}
//#endregion
//#region web/src/lib/api.ts
var mutateSessionHttp = createDashboardSessionMutations(fetchJSON);
function readBasePath() {
	if (typeof window === "undefined") return "";
	const raw = window.__HERMES_BASE_PATH__ ?? "";
	if (!raw) return "";
	return (raw.startsWith("/") ? raw : `/${raw}`).replace(/\/+$/, "");
}
var HERMES_BASE_PATH = readBasePath();
var BASE = HERMES_BASE_PATH;
var SESSION_HEADER = "X-Hermes-Session-Token";
function setSessionHeader(headers, token) {
	if (!headers.has(SESSION_HEADER)) headers.set(SESSION_HEADER, token);
}
var _managementProfile = "";
function setManagementProfile(name) {
	_managementProfile = (name || "").trim();
}
/**
* The profile every management call targets: the switcher's selection, or —
* before it has resolved / on a host with no switcher interaction — the profile
* this backend itself serves.
*
* The fallback is not a guess: the backend injects a name only when it provably
* resolves back to its own home, so it names exactly the home an unnamed request
* already reached. Without it the dashboard sends no `?profile=` at all and every
* destructive route 400s as soon as the host has a second profile directory.
*/
function getManagementProfile() {
	return _managementProfile || dashboardServingProfile();
}
var PROFILE_SCOPED_PREFIXES = [
	"/api/status",
	"/api/gateway",
	"/api/analytics",
	"/api/skills",
	"/api/tools/toolsets",
	"/api/config",
	"/api/env",
	"/api/mcp",
	"/api/messaging/platforms",
	"/api/messaging/telegram/onboarding",
	"/api/messaging/whatsapp/onboarding",
	"/api/providers/oauth",
	"/api/model/info",
	"/api/model/set",
	"/api/model/auxiliary",
	"/api/model/moa",
	"/api/model/options",
	"/api/pairing",
	"/api/memory",
	"/api/curator",
	"/api/webhooks",
	"/api/ops",
	"/api/logs",
	"/api/portal",
	"/api/credentials",
	"/api/dashboard/plugin-providers",
	"/api/model/recommended-default",
	"/api/local-models",
	"/api/dashboard/theme",
	"/api/dashboard/font",
	"/api/dashboard/plugins",
	"/api/plugins/",
	"/api/shared-metrics"
];
function withManagementProfile(url) {
	const scope = getManagementProfile();
	if (!scope) return url;
	if (url.includes("profile=")) return url;
	const path = url.split("?")[0];
	if (!PROFILE_SCOPED_PREFIXES.some((p) => path.startsWith(p))) return url;
	return `${url}${url.includes("?") ? "&" : "?"}profile=${encodeURIComponent(scope)}`;
}
async function fetchJSON(url, init, options) {
	url = withManagementProfile(url);
	const headers = new Headers(init?.headers);
	const token = window.__HERMES_SESSION_TOKEN__;
	if (token) setSessionHeader(headers, token);
	let res;
	try {
		res = await fetch(`${BASE}${url}`, {
			...init,
			headers,
			credentials: init?.credentials ?? "include"
		});
	} catch (cause) {
		const err = apiErrorFromNetworkFailure(cause, url);
		console.warn("[api]", err.details);
		throw err;
	}
	if (res.status === 401) {
		let body = {};
		try {
			body = await res.clone().json();
		} catch {}
		if ((body.error === "unauthenticated" || body.error === "session_expired") && body.login_url) {
			try {
				sessionStorage.setItem("hermes.lastLocation", window.location.pathname + window.location.search);
			} catch {}
			window.location.assign(body.login_url);
			return new Promise(() => {});
		}
		if (!window.__HERMES_AUTH_REQUIRED__ && !options?.allowUnauthorized) {
			if (attemptDashboardTokenReloadOnce()) return new Promise(() => {});
		}
	}
	if (res.ok) clearDashboardTokenReloadAttempt();
	if (!res.ok) {
		const text = await res.text().catch(() => res.statusText);
		const err = apiErrorFromResponse(res.status, text, url);
		console.warn("[api]", err.details);
		throw err;
	}
	return res.json();
}
/** Encode a plugin registry key for URL paths (preserves `/` segment separators). */
function pluginPath(name) {
	return name.split("/").map(encodeURIComponent).join("/");
}
/**
* Fetch a single-use ticket for a WebSocket upgrade in gated mode.
*
* The dashboard's gated-mode WS auth (``hermes_cli.web_server._ws_auth_ok``)
* rejects the legacy ``?token=<_SESSION_TOKEN>`` path and only accepts
* ``?ticket=<minted>`` consumed against the in-memory ticket store. Browsers
* can't set ``Authorization`` on a WS upgrade, so this round-trip via the
* authenticated REST endpoint is the bridge from cookie auth to WS auth.
*
* Tickets are single-use and TTL=30s — every WS connect attempt must
* fetch a fresh ticket.
*/
async function getWsTicket() {
	const res = await fetch(`${BASE}/api/auth/ws-ticket`, {
		method: "POST",
		credentials: "include"
	});
	if (!res.ok) throw apiErrorFromResponse(res.status, await res.text().catch(() => ""), "/api/auth/ws-ticket");
	return res.json();
}
/**
* Resolve the auth query-param pair (``[name, value]``) for a WebSocket
* connect. In gated mode mints a fresh single-use ticket; in loopback
* mode returns the injected session token.
*/
async function buildWsAuthParam() {
	if (window.__HERMES_AUTH_REQUIRED__) {
		const { ticket } = await getWsTicket();
		return ["ticket", ticket];
	}
	return ["token", window.__HERMES_SESSION_TOKEN__ ?? ""];
}
/**
* Authenticated ``fetch`` for dashboard ``/api/...`` requests that aren't
* plain JSON — file uploads (``FormData``), binary downloads (blobs), etc.
* Mirrors ``fetchJSON``'s auth handling but returns the raw ``Response`` so
* the caller can read ``.blob()`` / ``.formData()`` / stream it.
*
* Auth, in both modes, exactly as ``fetchJSON`` does it:
*  - loopback / ``--insecure``: attach the ``X-Hermes-Session-Token`` header.
*  - gated OAuth: no token header (it's absent by design); the
*    ``hermes_session_at`` cookie rides along via ``credentials: 'include'``.
*
* Unlike ``fetchJSON`` this does NOT parse the body, does NOT throw on
* non-2xx (the caller decides — a 404 on a download is meaningful), and
* does NOT run the global 401 → /login redirect (binary endpoints aren't
* navigation targets). Callers that want the redirect behaviour should use
* ``fetchJSON``.
*/
async function authedFetch(url, init) {
	url = withManagementProfile(url);
	const headers = new Headers(init?.headers);
	const token = window.__HERMES_SESSION_TOKEN__;
	if (token) setSessionHeader(headers, token);
	return fetch(`${BASE}${url}`, {
		...init,
		headers,
		credentials: init?.credentials ?? "include"
	});
}
/**
* Build an absolute ``ws(s)://`` URL for a dashboard WebSocket endpoint,
* with the correct auth query param appended for the active mode (fresh
* single-use ``ticket`` in gated mode, ``token`` in loopback). Plugins and
* the SPA should use this instead of hand-assembling a WS URL + reading
* ``window.__HERMES_SESSION_TOKEN__`` directly, so the gated-mode ticket
* path can never be forgotten.
*
* ``path`` is the dashboard-relative path (e.g.
* ``"/api/plugins/kanban/events"``); the base-path prefix and host are
* applied here. Extra query params can be supplied via ``params`` and are
* merged before the auth param.
*/
async function buildWsUrl(path, params) {
	const profile = getManagementProfile();
	if (profile && path.startsWith("/api/plugins/") && !params?.profile) params = {
		...params,
		profile
	};
	return buildHermesWebSocketUrl({
		authParam: await buildWsAuthParam(),
		basePath: BASE,
		params,
		path
	});
}
/** Build a ``?profile=<name>`` query suffix, or "" when unset.
*
* Used by the skills/toolsets endpoints so the dashboard can manage a
* profile other than the one the server process runs under. */
function profileQuery(profile) {
	return profile ? `?profile=${encodeURIComponent(profile)}` : "";
}
function appendProfileParam(url, profile) {
	if (!profile || url.includes("profile=")) return url;
	return `${url}${url.includes("?") ? "&" : "?"}profile=${encodeURIComponent(profile)}`;
}
function appendQueryParam(url, key, value) {
	if (!value) return url;
	return `${url}${url.includes("?") ? "&" : "?"}${key}=${encodeURIComponent(value)}`;
}
function normalizeSessionQueryOptions(profileOrOptions, order = "created") {
	if (typeof profileOrOptions === "string") return {
		profile: profileOrOptions,
		order
	};
	return {
		profile: getManagementProfile(),
		order,
		...profileOrOptions ?? {}
	};
}
function appendSessionFilters(url, options) {
	let next = url;
	next = appendQueryParam(next, "source", options.source ?? void 0);
	if (options.sources && options.sources.length > 0) next = appendQueryParam(next, "sources", options.sources.join(","));
	if (options.excludeSources && options.excludeSources.length > 0) next = appendQueryParam(next, "exclude_sources", options.excludeSources.join(","));
	return appendProfileParam(next, options.profile);
}
var api = {
	buildWsUrl,
	getStatus: () => fetchJSON("/api/status"),
	/**
	* Identity probe for the dashboard auth gate (Phase 7).
	*
	* Returns the verified Session when gated mode is active. In loopback mode,
	* a valid injected session token returns a synthetic ``provider=loopback``
	* identity; AuthWidget recognizes that provider and renders nothing, so it
	* never exposes a logout action that would redirect to an unavailable login.
	*
	* ``allowUnauthorized`` remains load-bearing for a missing or stale loopback
	* token: keep that 401 local to the widget instead of triggering the global
	* rotated-token reload path.
	*/
	getAuthMe: () => fetchJSON("/api/auth/me", void 0, { allowUnauthorized: true }),
	logout: () => fetch(`${BASE}/auth/logout`, {
		method: "POST",
		credentials: "include"
	}).then((r) => {
		window.location.assign(`${BASE}/login`);
		return r;
	}),
	getSessions: (limit = 20, offset = 0, profileOrOptions = getManagementProfile(), order = "created") => {
		const options = normalizeSessionQueryOptions(profileOrOptions, order);
		return fetchJSON(appendSessionFilters(`/api/sessions?limit=${limit}&offset=${offset}&order=${options.order ?? order}`, options));
	},
	getSessionMessages: (id, profile = getManagementProfile()) => fetchJSON(appendProfileParam(`/api/sessions/${encodeURIComponent(id)}/messages?limit=500&order=latest`, profile)),
	getSessionDetail: (id, profile = getManagementProfile()) => fetchJSON(appendProfileParam(`/api/sessions/${encodeURIComponent(id)}`, profile)),
	/**
	* Directories a FRESH dashboard chat may start in: the profile's explicit
	* projects plus discovered git repos (session-derived + scanned). ``scan``
	* asks the host to rescan its discovery roots first (headless installs have
	* no Desktop to populate the cache).
	*/
	getChatWorkspaces: (profile = getManagementProfile(), scan = false) => fetchJSON(appendQueryParam(appendProfileParam("/api/chat/workspaces", profile), "scan", scan ? "1" : void 0)),
	getSessionLatestDescendant: (id, profile = getManagementProfile()) => fetchJSON(appendProfileParam(`/api/sessions/${encodeURIComponent(id)}/latest-descendant`, profile)),
	deleteSession: (id, profile = getManagementProfile()) => mutateSessionHttp(id, "DELETE", {}, profile),
	getEmptySessionsCount: (profile = getManagementProfile()) => fetchJSON(appendProfileParam("/api/sessions/empty/count", profile)),
	deleteEmptySessions: (profile = getManagementProfile()) => fetchJSON(appendProfileParam("/api/sessions/empty", profile), { method: "DELETE" }),
	bulkDeleteSessions: (ids, profile = getManagementProfile()) => fetchJSON("/api/sessions/bulk-delete", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			ids,
			profile: profile || void 0
		})
	}),
	renameSession: (id, title, profile = getManagementProfile()) => mutateSessionHttp(id, "PATCH", { title }, profile),
	getSessionStats: (profile = getManagementProfile()) => fetchJSON(appendProfileParam("/api/sessions/stats", profile)),
	exportSessionUrl: (id, profile = getManagementProfile()) => appendProfileParam(`/api/sessions/${encodeURIComponent(id)}/export`, profile),
	importSessions: (sessions, profile = getManagementProfile()) => {
		const id = sessions[0]?.id;
		if (typeof id !== "string" || !id) return Promise.reject(/* @__PURE__ */ new Error("session id is required"));
		return mutateSessionHttp(id, "POST", { sessions }, profile);
	},
	pruneSessions: (older_than_days, source, profile = getManagementProfile()) => fetchJSON("/api/sessions/prune", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			older_than_days,
			source,
			profile: profile || void 0
		})
	}),
	listFiles: (path) => {
		return fetchJSON(`/api/files${path ? `?path=${encodeURIComponent(path)}` : ""}`);
	},
	readFile: (path) => fetchJSON(`/api/files/read?path=${encodeURIComponent(path)}`),
	uploadFile: (path, file, overwrite = true) => {
		const form = new FormData();
		form.append("path", path);
		form.append("overwrite", String(overwrite));
		form.append("file", file, file.name);
		return fetchJSON("/api/files/upload-stream", {
			method: "POST",
			body: form
		});
	},
	createDirectory: (path) => fetchJSON("/api/files/mkdir", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ path })
	}),
	deleteFile: (path, recursive = false) => fetchJSON("/api/files", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			path,
			recursive
		})
	}),
	getLogs: (params) => {
		const qs = new URLSearchParams();
		if (params.file) qs.set("file", params.file);
		if (params.lines) qs.set("lines", String(params.lines));
		if (params.level && params.level !== "ALL") qs.set("level", params.level);
		if (params.component && params.component !== "all") qs.set("component", params.component);
		return fetchJSON(`/api/logs?${qs.toString()}`);
	},
	getAnalytics: (days, profile = getManagementProfile()) => fetchJSON(appendProfileParam(`/api/analytics/usage?days=${days}`, profile)),
	getModelsAnalytics: (days, profile = getManagementProfile()) => fetchJSON(appendProfileParam(`/api/analytics/models?days=${days}`, profile)),
	getConfig: (profile = getManagementProfile()) => fetchJSON(appendProfileParam("/api/config", profile)),
	getDefaults: () => fetchJSON("/api/config/defaults"),
	getSchema: () => fetchJSON("/api/config/schema"),
	getModelInfo: (profile = getManagementProfile()) => fetchJSON(appendProfileParam("/api/model/info", profile)),
	getModelOptions: (profileOrOptions) => {
		const profile = typeof profileOrOptions === "string" ? profileOrOptions : profileOrOptions?.profile;
		const refresh = typeof profileOrOptions === "object" && !!profileOrOptions.refresh;
		const qs = new URLSearchParams();
		if (profile) qs.set("profile", profile);
		if (refresh) qs.set("refresh", "1");
		qs.set("include_unconfigured", "1");
		return fetchJSON(`/api/model/options${qs.toString() ? `?${qs.toString()}` : ""}`);
	},
	getAuxiliaryModels: (profile = getManagementProfile()) => fetchJSON(appendProfileParam("/api/model/auxiliary", profile)),
	getMoaModels: () => fetchJSON("/api/model/moa"),
	saveMoaModels: (body) => fetchJSON("/api/model/moa", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}),
	setModelAssignment: (body, profile = getManagementProfile()) => fetchJSON(appendProfileParam("/api/model/set", profile), {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}),
	getSharedMetricsConsent: (profile = getManagementProfile()) => fetchJSON(appendProfileParam("/api/shared-metrics/consent", profile)),
	saveSharedMetricsConsent: (answer, profile = getManagementProfile()) => fetchJSON(appendProfileParam("/api/shared-metrics/consent", profile), {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(answer)
	}),
	saveConfig: (config, profile = getManagementProfile()) => fetchJSON(appendProfileParam("/api/config", profile), {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ config })
	}),
	getConfigRaw: (profile = getManagementProfile()) => fetchJSON(appendProfileParam("/api/config/raw", profile)),
	saveConfigRaw: (yaml_text, profile = getManagementProfile()) => fetchJSON(appendProfileParam("/api/config/raw", profile), {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ yaml_text })
	}),
	getEnvVars: () => fetchJSON("/api/env"),
	setEnvVar: (key, value) => fetchJSON("/api/env", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			key,
			value
		})
	}),
	deleteEnvVar: (key) => fetchJSON("/api/env", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ key })
	}),
	revealEnvVar: (key) => fetchJSON("/api/env/reveal", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ key })
	}),
	getCronJobs: (profile = "all") => fetchJSON(`/api/cron/jobs?profile=${encodeURIComponent(profile)}`),
	getCronDeliveryTargets: (profile = "default") => fetchJSON(`/api/cron/delivery-targets?profile=${encodeURIComponent(profile)}`),
	createCronJob: (job, profile = "default") => fetchJSON(`/api/cron/jobs?profile=${encodeURIComponent(profile)}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(job)
	}),
	pauseCronJob: (id, profile = "default") => fetchJSON(`/api/cron/jobs/${encodeURIComponent(id)}/pause?profile=${encodeURIComponent(profile)}`, { method: "POST" }),
	updateCronJob: (id, updates, profile = "default") => fetchJSON(`/api/cron/jobs/${encodeURIComponent(id)}?profile=${encodeURIComponent(profile)}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ updates })
	}),
	resumeCronJob: (id, profile = "default") => fetchJSON(`/api/cron/jobs/${encodeURIComponent(id)}/resume?profile=${encodeURIComponent(profile)}`, { method: "POST" }),
	triggerCronJob: (id, profile = "default") => fetchJSON(`/api/cron/jobs/${encodeURIComponent(id)}/trigger?profile=${encodeURIComponent(profile)}`, { method: "POST" }),
	deleteCronJob: (id, profile = "default") => fetchJSON(`/api/cron/jobs/${encodeURIComponent(id)}?profile=${encodeURIComponent(profile)}`, { method: "DELETE" }),
	getAutomationBlueprints: (profile = "default") => fetchJSON(`/api/cron/blueprints?profile=${encodeURIComponent(profile)}`),
	instantiateAutomationBlueprint: (body, profile = "default") => fetchJSON(`/api/cron/blueprints/instantiate?profile=${encodeURIComponent(profile)}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}),
	getProfiles: () => fetchJSON("/api/profiles"),
	getActiveProfile: () => fetchJSON("/api/profiles/active"),
	setActiveProfile: (name) => fetchJSON("/api/profiles/active", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name })
	}),
	createProfile: (body) => fetchJSON("/api/profiles", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}),
	updateProfileDescription: (name, description) => fetchJSON(`/api/profiles/${encodeURIComponent(name)}/description`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ description })
	}),
	describeProfileAuto: (name, overwrite = true) => fetchJSON(`/api/profiles/${encodeURIComponent(name)}/describe-auto`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ overwrite })
	}),
	setProfileModel: (name, provider, model) => fetchJSON(`/api/profiles/${encodeURIComponent(name)}/model`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			provider,
			model
		})
	}),
	renameProfile: (name, newName) => fetchJSON(`/api/profiles/${encodeURIComponent(name)}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ new_name: newName })
	}),
	deleteProfile: (name) => fetchJSON(`/api/profiles/${encodeURIComponent(name)}`, { method: "DELETE" }),
	getProfileSetupCommand: (name) => fetchJSON(`/api/profiles/${encodeURIComponent(name)}/setup-command`),
	getProfileSoul: (name) => fetchJSON(`/api/profiles/${encodeURIComponent(name)}/soul`),
	updateProfileSoul: (name, content) => fetchJSON(`/api/profiles/${encodeURIComponent(name)}/soul`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ content })
	}),
	getSkills: (profile) => fetchJSON(`/api/skills${profileQuery(profile)}`),
	toggleSkill: (name, enabled, profile) => fetchJSON("/api/skills/toggle", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name,
			enabled,
			profile: profile || void 0
		})
	}),
	getSkillContent: (name, profile) => fetchJSON(`/api/skills/content?name=${encodeURIComponent(name)}${profile ? `&profile=${encodeURIComponent(profile)}` : ""}`),
	createSkill: (skill, profile) => fetchJSON("/api/skills", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			...skill,
			profile: profile || void 0
		})
	}),
	updateSkillContent: (name, content, profile) => fetchJSON("/api/skills/content", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name,
			content,
			profile: profile || void 0
		})
	}),
	getToolsets: (profile) => fetchJSON(`/api/tools/toolsets${profileQuery(profile)}`),
	toggleToolset: (name, enabled, profile) => fetchJSON(`/api/tools/toolsets/${encodeURIComponent(name)}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			enabled,
			profile: profile || void 0
		})
	}),
	getToolsetConfig: (name, profile) => fetchJSON(`/api/tools/toolsets/${encodeURIComponent(name)}/config${profileQuery(profile)}`),
	selectToolsetProvider: (name, provider, profile) => fetchJSON(`/api/tools/toolsets/${encodeURIComponent(name)}/provider`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			provider,
			profile: profile || void 0
		})
	}),
	saveToolsetEnv: (name, env, profile) => fetchJSON(`/api/tools/toolsets/${encodeURIComponent(name)}/env`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			env,
			profile: profile || void 0
		})
	}),
	runToolsetPostSetup: (name, key, profile) => fetchJSON(`/api/tools/toolsets/${encodeURIComponent(name)}/post-setup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			key,
			profile: profile || void 0
		})
	}),
	searchSessions: (q, profileOrOptions = getManagementProfile()) => {
		const options = normalizeSessionQueryOptions(profileOrOptions);
		return fetchJSON(appendSessionFilters(`/api/sessions/search?q=${encodeURIComponent(q)}`, options));
	},
	getOAuthProviders: () => fetchJSON("/api/providers/oauth"),
	disconnectOAuthProvider: (providerId) => fetchJSON(`/api/providers/oauth/${encodeURIComponent(providerId)}`, { method: "DELETE" }),
	startOAuthLogin: (providerId) => fetchJSON(`/api/providers/oauth/${encodeURIComponent(providerId)}/start`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: "{}"
	}),
	submitOAuthCode: (providerId, sessionId, code) => fetchJSON(`/api/providers/oauth/${encodeURIComponent(providerId)}/submit`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			session_id: sessionId,
			code
		})
	}),
	pollOAuthSession: (providerId, sessionId) => fetchJSON(`/api/providers/oauth/${encodeURIComponent(providerId)}/poll/${encodeURIComponent(sessionId)}`),
	cancelOAuthSession: (sessionId) => fetchJSON(`/api/providers/oauth/sessions/${encodeURIComponent(sessionId)}`, { method: "DELETE" }),
	getMessagingPlatforms: () => fetchJSON("/api/messaging/platforms"),
	updateMessagingPlatform: (id, body) => fetchJSON(`/api/messaging/platforms/${encodeURIComponent(id)}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}),
	testMessagingPlatform: (id) => fetchJSON(`/api/messaging/platforms/${encodeURIComponent(id)}/test`, { method: "POST" }),
	startTelegramOnboarding: (body) => fetchJSON("/api/messaging/telegram/onboarding/start", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}),
	getTelegramOnboardingStatus: (pairingId) => fetchJSON(`/api/messaging/telegram/onboarding/${encodeURIComponent(pairingId)}`),
	applyTelegramOnboarding: (pairingId, body) => fetchJSON(`/api/messaging/telegram/onboarding/${encodeURIComponent(pairingId)}/apply`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}),
	cancelTelegramOnboarding: (pairingId) => fetchJSON(`/api/messaging/telegram/onboarding/${encodeURIComponent(pairingId)}`, { method: "DELETE" }),
	startWhatsAppOnboarding: (body) => fetchJSON("/api/messaging/whatsapp/onboarding/start", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}),
	getWhatsAppOnboardingStatus: (pairingId) => fetchJSON(`/api/messaging/whatsapp/onboarding/${encodeURIComponent(pairingId)}`),
	applyWhatsAppOnboarding: (pairingId, body) => fetchJSON(`/api/messaging/whatsapp/onboarding/${encodeURIComponent(pairingId)}/apply`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}),
	cancelWhatsAppOnboarding: (pairingId) => fetchJSON(`/api/messaging/whatsapp/onboarding/${encodeURIComponent(pairingId)}`, { method: "DELETE" }),
	restartGateway: () => fetchJSON("/api/gateway/restart", { method: "POST" }),
	getGatewayMigratePlan: () => fetchJSON("/api/gateway/migrate/plan"),
	migrateGatewayToMultiplex: () => fetchJSON("/api/gateway/migrate", { method: "POST" }),
	updateHermes: () => fetchJSON("/api/hermes/update", { method: "POST" }),
	checkHermesUpdate: (force = false) => fetchJSON(`/api/hermes/update/check${force ? "?force=true" : ""}`),
	getActionStatus: (name, lines = 200) => fetchJSON(`/api/actions/${encodeURIComponent(name)}/status?lines=${lines}`),
	getPlugins: (profile = getManagementProfile()) => fetchJSON(`/api/dashboard/plugins${profile ? `?profile=${encodeURIComponent(profile)}` : ""}`),
	rescanPlugins: () => fetchJSON("/api/dashboard/plugins/rescan"),
	getPluginsHub: () => fetchJSON("/api/dashboard/plugins/hub"),
	getPluginsCatalog: () => fetchJSON("/api/dashboard/plugins/catalog"),
	installAgentPlugin: (body) => fetchJSON("/api/dashboard/agent-plugins/install", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ ...body })
	}),
	enableAgentPlugin: (name) => fetchJSON(`/api/dashboard/agent-plugins/${pluginPath(name)}/enable`, { method: "POST" }),
	disableAgentPlugin: (name) => fetchJSON(`/api/dashboard/agent-plugins/${pluginPath(name)}/disable`, { method: "POST" }),
	updateAgentPlugin: (name, { acceptCapabilities = false, force = false } = {}) => fetchJSON(`/api/dashboard/agent-plugins/${pluginPath(name)}/update`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			accept_capabilities: acceptCapabilities,
			force
		})
	}),
	removeAgentPlugin: (name) => fetchJSON(`/api/dashboard/agent-plugins/${pluginPath(name)}`, { method: "DELETE" }),
	savePluginProviders: (body) => fetchJSON("/api/dashboard/plugin-providers", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}),
	setPluginVisibility: (name, hidden) => fetchJSON(`/api/dashboard/plugins/${pluginPath(name)}/visibility`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ hidden })
	}),
	getThemes: () => fetchJSON("/api/dashboard/themes"),
	setTheme: (name) => fetchJSON("/api/dashboard/theme", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name })
	}),
	getFontPref: () => fetchJSON("/api/dashboard/font"),
	setFontPref: (font) => fetchJSON("/api/dashboard/font", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ font })
	}),
	getMcpServers: () => fetchJSON("/api/mcp/servers"),
	addMcpServer: (body) => fetchJSON("/api/mcp/servers", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}),
	authMcpServer: (name) => fetchJSON(`/api/mcp/servers/${encodeURIComponent(name)}/auth`, { method: "POST" }),
	getMcpOAuthFlow: (flowId) => fetchJSON(`/api/mcp/oauth/flows/${encodeURIComponent(flowId)}`),
	removeMcpServer: (name) => fetchJSON(`/api/mcp/servers/${encodeURIComponent(name)}`, { method: "DELETE" }),
	testMcpServer: (name) => fetchJSON(`/api/mcp/servers/${encodeURIComponent(name)}/test`, { method: "POST" }),
	setMcpServerEnabled: (name, enabled) => fetchJSON(`/api/mcp/servers/${encodeURIComponent(name)}/enabled`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ enabled })
	}),
	getMcpCatalog: () => fetchJSON("/api/mcp/catalog"),
	installMcpCatalogEntry: (name, env = {}, enable = true) => fetchJSON("/api/mcp/catalog/install", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name,
			env,
			enable
		})
	}),
	getPairing: () => fetchJSON("/api/pairing"),
	approvePairing: (platform, request_id) => fetchJSON("/api/pairing/approve", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			platform,
			request_id,
			profile: getManagementProfile() || void 0
		})
	}),
	revokePairing: (platform, user_id) => fetchJSON("/api/pairing/revoke", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			platform,
			user_id,
			profile: getManagementProfile() || void 0
		})
	}),
	clearPendingPairing: () => fetchJSON("/api/pairing/clear-pending", { method: "POST" }),
	getWebhooks: () => fetchJSON("/api/webhooks"),
	enableWebhooks: () => fetchJSON("/api/webhooks/enable", { method: "POST" }),
	createWebhook: (body) => fetchJSON("/api/webhooks", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}),
	deleteWebhook: (name) => fetchJSON(`/api/webhooks/${encodeURIComponent(name)}`, { method: "DELETE" }),
	setWebhookEnabled: (name, enabled) => fetchJSON(`/api/webhooks/${encodeURIComponent(name)}/enabled`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ enabled })
	}),
	getCredentialPool: () => fetchJSON("/api/credentials/pool"),
	addCredentialPoolEntry: (provider, api_key, label) => fetchJSON("/api/credentials/pool", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			provider,
			api_key,
			label
		})
	}),
	removeCredentialPoolEntry: (provider, index) => fetchJSON(`/api/credentials/pool/${encodeURIComponent(provider)}/${index}`, { method: "DELETE" }),
	getMemory: () => fetchJSON("/api/memory"),
	getMemoryProviderConfig: (provider) => fetchJSON(`/api/memory/providers/${encodeURIComponent(provider)}/config`),
	updateMemoryProviderConfig: (provider, values) => fetchJSON(`/api/memory/providers/${encodeURIComponent(provider)}/config`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ values })
	}),
	setupMemoryProvider: (provider, values = {}) => fetchJSON(`/api/memory/providers/${encodeURIComponent(provider)}/setup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ values })
	}),
	setMemoryProvider: (provider) => fetchJSON("/api/memory/provider", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ provider })
	}),
	resetMemory: (target) => fetchJSON("/api/memory/reset", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ target })
	}),
	startGateway: () => fetchJSON("/api/gateway/start", { method: "POST" }),
	stopGateway: () => fetchJSON("/api/gateway/stop", { method: "POST" }),
	runDoctor: () => fetchJSON("/api/ops/doctor", { method: "POST" }),
	runSecurityAudit: () => fetchJSON("/api/ops/security-audit", { method: "POST" }),
	runBackup: (output) => fetchJSON("/api/ops/backup", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ output })
	}),
	downloadBackup: (archive) => authedFetch(`/api/ops/backup/download?archive=${encodeURIComponent(archive)}`),
	runImport: (archive, force = false) => fetchJSON("/api/ops/import", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			archive,
			force
		})
	}),
	runImportUpload: (file, force = false) => {
		const form = new FormData();
		form.append("force", String(force));
		form.append("file", file, file.name);
		return fetchJSON("/api/ops/import-upload", {
			method: "POST",
			body: form
		});
	},
	getHooks: () => fetchJSON("/api/ops/hooks"),
	createHook: (body) => fetchJSON("/api/ops/hooks", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	}),
	deleteHook: (event, command) => fetchJSON("/api/ops/hooks", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			event,
			command
		})
	}),
	getSystemStats: () => fetchJSON("/api/system/stats"),
	getCurator: () => fetchJSON("/api/curator"),
	setCuratorPaused: (paused) => fetchJSON("/api/curator/paused", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ paused })
	}),
	runCurator: () => fetchJSON("/api/curator/run", { method: "POST" }),
	getPortal: () => fetchJSON("/api/portal"),
	runPromptSize: () => fetchJSON("/api/ops/prompt-size", { method: "POST" }),
	runDump: () => fetchJSON("/api/ops/dump", { method: "POST" }),
	runConfigMigrate: () => fetchJSON("/api/ops/config-migrate", { method: "POST" }),
	runDebugShare: (opts) => fetchJSON("/api/ops/debug-share", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			redact: opts?.redact ?? true,
			lines: opts?.lines ?? 200
		})
	}),
	getCheckpoints: () => fetchJSON("/api/ops/checkpoints"),
	pruneCheckpoints: () => fetchJSON("/api/ops/checkpoints/prune", { method: "POST" }),
	installSkillFromHub: (identifier, profile) => fetchJSON("/api/skills/hub/install", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			identifier,
			profile: profile || void 0
		})
	}),
	uninstallSkillFromHub: (name, profile) => fetchJSON("/api/skills/hub/uninstall", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name,
			profile: profile || void 0
		})
	}),
	updateSkillsFromHub: (profile) => fetchJSON("/api/skills/hub/update", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ profile: profile || void 0 })
	}),
	searchSkillsHub: (q, source = "all", limit = 20, profile) => fetchJSON(`/api/skills/hub/search?q=${encodeURIComponent(q)}&source=${encodeURIComponent(source)}&limit=${limit}${profile ? `&profile=${encodeURIComponent(profile)}` : ""}`),
	getSkillHubSources: (profile) => fetchJSON(`/api/skills/hub/sources${profileQuery(profile)}`),
	previewSkillFromHub: (identifier) => fetchJSON(`/api/skills/hub/preview?identifier=${encodeURIComponent(identifier)}`),
	scanSkillFromHub: (identifier) => fetchJSON(`/api/skills/hub/scan?identifier=${encodeURIComponent(identifier)}`)
};
//#endregion
export { THEME_PRESET_PALETTES as _, buildWsUrl as a, JsonRpcGatewayClient as b, ApiError as c, maybeReloadForLoopbackWsAuthFailure as d, dashboardInitialProfile as f, buildHermesWebSocketUrl as g, shouldAdoptActiveProfile as h, buildWsAuthParam as i, apiErrorFromResponse as l, initialProfileScope as m, api as n, fetchJSON as o, dashboardServingProfile as p, authedFetch as r, setManagementProfile as s, HERMES_BASE_PATH as t, errorMessage as u, DEFAULT_REASONING_EFFORT as v, REASONING_EFFORT_VALUES as y };
