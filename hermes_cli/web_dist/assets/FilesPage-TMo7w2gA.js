import { n as __toESM } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
import { Ct as FolderOpen, Ft as Download, I as RefreshCw, St as FolderPlus, Tt as File, d as Upload, f as Unlink, g as Trash2, tn as ArrowUp, xt as Folder } from "./vendor-DkbdVxWs.js";
import { A as Badge, B as Button, D as DialogHeader, E as DialogFooter, L as Spinner, O as DialogTitle, S as Dialog, T as DialogDescription, h as CardContent, m as Card, p as Input, w as DialogContent, x as Toast, y as useToast } from "./ui-vIdGzE07.js";
import { n as api, u as errorMessage } from "./api-rr7lTIEw.js";
import { u as PluginSlot } from "./index-CeRydpmd.js";
import { t as usePageHeader } from "./usePageHeader-Dtz2jsT4.js";
import { t as DeleteConfirmDialog } from "./DeleteConfirmDialog-CS54bGFr.js";
//#region web/src/pages/FilesPage.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var DATE_FORMAT = new Intl.DateTimeFormat(void 0, {
	dateStyle: "medium",
	timeStyle: "short"
});
function joinPath(base, name) {
	const cleanName = name.trim().replace(/^[\\/]+/, "");
	if (!cleanName) return base;
	const separator = base.includes("\\") && !base.includes("/") ? "\\" : "/";
	if (!base || base.endsWith("/") || base.endsWith("\\")) return `${base}${cleanName}`;
	return `${base}${separator}${cleanName}`;
}
function formatBytes(size) {
	if (size === null) return "-";
	if (size < 1024) return `${size} B`;
	if (size < 1048576) return `${(size / 1024).toFixed(1)} KB`;
	if (size < 1073741824) return `${(size / 1048576).toFixed(1)} MB`;
	return `${(size / 1073741824).toFixed(1)} GB`;
}
function downloadDataUrl(dataUrl, name) {
	const link = document.createElement("a");
	link.href = dataUrl;
	link.download = name || "download";
	document.body.appendChild(link);
	link.click();
	link.remove();
}
function displayPath(path) {
	return path?.trim() || "Files";
}
function transferHasFiles(event) {
	return Array.from(event.dataTransfer.types).includes("Files");
}
function FilesPage() {
	const { toast, showToast } = useToast();
	const { setAfterTitle, setEnd } = usePageHeader();
	const fileInputRef = (0, import_react.useRef)(null);
	const dragDepthRef = (0, import_react.useRef)(0);
	const [currentPath, setCurrentPath] = (0, import_react.useState)(void 0);
	const [pathInput, setPathInput] = (0, import_react.useState)("");
	const [listing, setListing] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [draggingFiles, setDraggingFiles] = (0, import_react.useState)(false);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [createDialogOpen, setCreateDialogOpen] = (0, import_react.useState)(false);
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	const [folderName, setFolderName] = (0, import_react.useState)("");
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const activePath = listing?.path ?? currentPath ?? "";
	const canChangePath = listing?.can_change_path ?? false;
	const canUpload = Boolean(activePath) && !uploading;
	const headerPath = displayPath(listing?.locked_root ?? listing?.path ?? currentPath);
	const load = (0, import_react.useCallback)(async (path = currentPath) => {
		setLoading(true);
		setError(null);
		try {
			const result = await api.listFiles(path);
			setListing(result);
			setCurrentPath(result.path);
			setPathInput(result.path);
		} catch (e) {
			setError(errorMessage(e));
		} finally {
			setLoading(false);
		}
	}, [currentPath]);
	(0, import_react.useEffect)(() => {
		load(currentPath);
	}, [currentPath]);
	(0, import_react.useLayoutEffect)(() => {
		setAfterTitle(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			tone: "outline",
			className: "max-w-[22rem] truncate text-xs",
			title: headerPath,
			children: headerPath
		}));
		setEnd(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				ghost: true,
				size: "icon",
				type: "button",
				onClick: () => void load(),
				disabled: loading,
				"aria-label": "Refresh files",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {})
			})
		}));
		return () => {
			setAfterTitle(null);
			setEnd(null);
		};
	}, [
		headerPath,
		load,
		loading,
		setAfterTitle,
		setEnd
	]);
	const openDirectory = (entry) => {
		if (entry.is_directory) setCurrentPath(entry.path);
	};
	const goToPath = async () => {
		const nextPath = pathInput.trim();
		if (!nextPath) {
			showToast("Path required", "error");
			return;
		}
		await load(nextPath);
	};
	const createDirectory = async () => {
		const name = folderName.trim();
		if (!activePath) {
			showToast("Directory unavailable", "error");
			return;
		}
		if (!name) {
			showToast("Folder name required", "error");
			return;
		}
		setCreating(true);
		try {
			await api.createDirectory(joinPath(activePath, name));
			setFolderName("");
			setCreateDialogOpen(false);
			showToast("Folder created", "success");
			await load();
		} catch (e_0) {
			showToast(`Create failed: ${errorMessage(e_0)}`, "error");
		} finally {
			setCreating(false);
		}
	};
	const uploadFiles = async (files) => {
		if (!files?.length) return;
		setUploading(true);
		try {
			for (const file of Array.from(files)) await api.uploadFile(joinPath(activePath, file.name), file, true);
			showToast(`${files.length} file${files.length === 1 ? "" : "s"} uploaded`, "success");
			await load();
		} catch (e_1) {
			showToast(`Upload failed: ${errorMessage(e_1)}`, "error");
		} finally {
			setUploading(false);
			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};
	const handleDragEnter = (event) => {
		if (!canUpload || !transferHasFiles(event)) return;
		event.preventDefault();
		dragDepthRef.current += 1;
		setDraggingFiles(true);
	};
	const handleDragOver = (event_0) => {
		if (!canUpload || !transferHasFiles(event_0)) return;
		event_0.preventDefault();
		event_0.dataTransfer.dropEffect = "copy";
	};
	const handleDragLeave = (event_1) => {
		if (!canUpload || !transferHasFiles(event_1)) return;
		event_1.preventDefault();
		dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
		if (dragDepthRef.current === 0) setDraggingFiles(false);
	};
	const handleDrop = (event_2) => {
		if (!canUpload) return;
		event_2.preventDefault();
		dragDepthRef.current = 0;
		setDraggingFiles(false);
		uploadFiles(event_2.dataTransfer.files);
	};
	const downloadFile = async (entry_0) => {
		if (entry_0.is_directory || entry_0.broken_link) return;
		try {
			const file_0 = await api.readFile(entry_0.path);
			downloadDataUrl(file_0.data_url, file_0.name);
		} catch (e_2) {
			showToast(`Download failed: ${errorMessage(e_2)}`, "error");
		}
	};
	const confirmDelete = async () => {
		if (!pendingDelete) return;
		setDeleting(true);
		try {
			await api.deleteFile(pendingDelete.path, pendingDelete.is_directory);
			showToast("Deleted", "success");
			setPendingDelete(null);
			await load();
		} catch (e_3) {
			showToast(`Delete failed: ${errorMessage(e_3)}`, "error");
		} finally {
			setDeleting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 max-w-full flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, { toast }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "files:top" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileInputRef,
				type: "file",
				multiple: true,
				className: "hidden",
				onChange: (event_3) => void uploadFiles(event_3.currentTarget.files)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-3 xl:flex-row xl:items-center xl:justify-between",
				children: [canChangePath ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex min-w-0 flex-1 items-center gap-2",
					onSubmit: (event_4) => {
						event_4.preventDefault();
						goToPath();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: pathInput,
						onChange: (event_5) => setPathInput(event_5.target.value),
						"aria-label": "Path",
						placeholder: "Path",
						className: "h-9 min-w-0 flex-1 font-mono"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "sm",
						outlined: true,
						className: "uppercase",
						children: "Go"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 truncate font-mono text-sm text-text-secondary",
					title: activePath,
					children: activePath
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => fileInputRef.current?.click(),
						disabled: !canUpload,
						size: "sm",
						outlined: true,
						className: "uppercase",
						prefix: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {}),
						children: "Upload"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => setCreateDialogOpen(true),
						disabled: !activePath,
						size: "sm",
						outlined: true,
						className: "uppercase",
						prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, {}),
						children: "Create"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => canUpload && fileInputRef.current?.click(),
				onDragEnter: handleDragEnter,
				onDragOver: handleDragOver,
				onDragLeave: handleDragLeave,
				onDrop: handleDrop,
				disabled: !canUpload,
				"aria-label": "Upload files",
				className: `flex min-h-20 w-full min-w-0 items-center justify-between gap-4 border border-dashed px-4 py-3 text-left transition ${draggingFiles ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background/20 text-text-secondary hover:border-text-tertiary hover:bg-background/35"} disabled:cursor-not-allowed disabled:opacity-60`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background/45 text-text-tertiary",
						children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold uppercase tracking-[0.08em] text-foreground",
							children: uploading ? "Uploading" : draggingFiles ? "Release to upload" : "Drop files here"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate font-mono text-xs text-text-secondary",
							title: activePath,
							children: activePath || "Loading"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden shrink-0 text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary sm:block",
					children: "Choose files"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "min-w-0 max-w-full overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "overflow-x-auto p-0",
					children: [
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-b border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid min-w-[42rem] grid-cols-[minmax(12rem,1fr)_7rem_10rem_5.5rem] items-center gap-3 border-b border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Name" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Size" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Modified" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-right",
									children: "Actions"
								})
							]
						}),
						listing?.parent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setCurrentPath(listing.parent ?? void 0),
							className: "grid w-full min-w-[42rem] grid-cols-[minmax(12rem,1fr)_7rem_10rem_5.5rem] items-center gap-3 border-b border-border/60 px-4 py-2 text-left text-sm transition hover:bg-background/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex min-w-0 items-center gap-2 font-mono text-text-secondary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4 shrink-0 text-text-tertiary" }), ".."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
							]
						}),
						loading && !listing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}), "Loading files..."]
						}) : listing && listing.entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-12 text-center text-sm text-muted-foreground",
							children: "No files"
						}) : listing?.entries.map((entry_1) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid min-w-[42rem] grid-cols-[minmax(12rem,1fr)_7rem_10rem_5.5rem] items-center gap-3 border-b border-border/60 px-4 py-2 text-sm last:border-b-0 hover:bg-background/35",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => entry_1.is_directory ? openDirectory(entry_1) : void downloadFile(entry_1),
									disabled: entry_1.broken_link,
									title: entry_1.broken_link ? "Broken symbolic link" : void 0,
									className: "flex min-w-0 items-center gap-2 text-left font-mono text-foreground disabled:cursor-not-allowed disabled:text-text-tertiary",
									children: [
										entry_1.is_directory ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "h-4 w-4 shrink-0 text-warning" }) : entry_1.broken_link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unlink, { className: "h-4 w-4 shrink-0 text-destructive" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, { className: "h-4 w-4 shrink-0 text-text-tertiary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											children: entry_1.name
										}),
										entry_1.broken_link && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "destructive",
											className: "shrink-0 text-xs",
											children: "Broken link"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs tabular-nums text-text-secondary",
									children: formatBytes(entry_1.size)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-xs text-text-secondary",
									children: entry_1.mtime !== null && Number.isFinite(entry_1.mtime) ? DATE_FORMAT.format(entry_1.mtime * 1e3) : "-"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex justify-end gap-1",
									children: [entry_1.is_directory ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										size: "icon",
										type: "button",
										onClick: () => openDirectory(entry_1),
										"aria-label": `Open ${entry_1.name}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										size: "icon",
										type: "button",
										onClick: () => void downloadFile(entry_1),
										disabled: entry_1.broken_link,
										"aria-label": `Download ${entry_1.name}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										ghost: true,
										size: "icon",
										type: "button",
										onClick: () => setPendingDelete(entry_1),
										"aria-label": `Delete ${entry_1.name}`,
										className: "text-destructive hover:text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
									})]
								})
							]
						}, entry_1.path))
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PluginSlot, { name: "files:bottom" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: createDialogOpen,
				onOpenChange: (open) => {
					if (creating) return;
					setCreateDialogOpen(open);
					if (!open) setFolderName("");
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Create folder" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: ["Target: ", activePath || "Loading"] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								autoFocus: true,
								value: folderName,
								onChange: (event_6) => setFolderName(event_6.target.value),
								onKeyDown: (event_7) => {
									if (event_7.key === "Enter") createDirectory();
								},
								placeholder: "Folder name",
								disabled: creating
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							outlined: true,
							onClick: () => {
								setCreateDialogOpen(false);
								setFolderName("");
							},
							disabled: creating,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: () => void createDirectory(),
							disabled: creating,
							prefix: creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, {}),
							children: "Create"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteConfirmDialog, {
				open: Boolean(pendingDelete),
				loading: deleting,
				onCancel: () => setPendingDelete(null),
				onConfirm: () => void confirmDelete(),
				title: pendingDelete ? `Delete ${pendingDelete.name}?` : "Delete item?",
				description: pendingDelete?.is_directory ? "This removes the folder and everything inside it." : "This removes the file."
			})
		]
	});
}
//#endregion
export { FilesPage as default };
