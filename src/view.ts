// generateMarkdownLink(file: TFile, sourcePath: string, subpath?: string, alias?: string): string;


import { ItemView, TFile, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE = "VIEW_TYPE";
const STORAGE_KEY = "tab_sessions_state";

interface TabSessionsState {
	tabs: { file: string; pane: string; path: string }[];
}

export class TabSessionsView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.app.workspace.on("layout-change", () => {
			this.render();
		});
	}

	getDisplayText(): string {
		return "Tab Cessions";
	}

	getViewType(): string {
		return VIEW_TYPE;
	}

	async onOpen() {
		this.render();
	}

	private saveState(state: TabSessionsState) {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	}

	private loadState(): TabSessionsState {
		const stateJson = window.localStorage.getItem(STORAGE_KEY);
		if (stateJson) {
			return JSON.parse(stateJson) as TabSessionsState;
		} else {
			return { tabs: [] };
		}
	}

	render() {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h4", { text: "Tab Sessions" });
	
		// Render the current tabs without links
		containerEl.createEl("p", { text: "Current Tabs:" });
		app.workspace.iterateRootLeaves((leaf) => {
			const leafState = leaf.getViewState();
			const file = leafState.state.file;
			const pane = leaf.view.containerEl.getAttribute("data-type") ?? "";
			if (file || pane) {
				const tabEl = containerEl.createEl("div", { cls: "tab-session" });
				tabEl.createEl("span", { text: pane });
				tabEl.createEl("span", { text: file });
			}
		});
	
		// Save button
		const saveButton = containerEl.createEl("button", {
			text: "Save Tabs State",
			cls: "mod-cta",
		});
		saveButton.addEventListener("click", () => {
			// Get the current tabs with links and save their state
			const tabs: { file: string; pane: string; path: string }[] = [];
			app.workspace.iterateRootLeaves((leaf) => {
				const leafState = leaf.getViewState();
				const file = leafState.state.file;
				const path = absolutePath(file);
				const pane = leaf.view.containerEl.getAttribute("data-type") ?? "";
	
				if (file || pane || path) {
					tabs.push({ file, pane, path });
				}
			});
			const state = { tabs };
			this.saveState(state);
	
			// Render the current tabs with links
			containerEl.createEl("p", { text: "Current Tabs with Links:" });
			tabs.forEach(({ file, path }) => {
				const link = containerEl.createEl("a", {
					href: path,
					text: file,
					attr: { "data-path": path },
				});
			});
		});
	
		// Restore button
		const restoreButton = containerEl.createEl("button", {
			text: "Restore Tabs State",
		});
		restoreButton.addEventListener("click", async () => {
			// Get the saved tabs and open them
			const state = this.loadState();
			const allFiles: TFile[] = app.vault.getFiles();
			for (const file of allFiles) {
				const matchingTab = state.tabs.find(
					(tab) => tab.file === file.name
				);
				if (matchingTab) {
					const leaf = this.app.workspace.createLeafBySplit(
						this.app.workspace.getLeaf(),
						"vertical",
						false
					);
					await leaf.openFile(file, {
						state: { mode: "source" },
						eState: { rename: "end" },
					});
				}
			}
		});
	}
	
}

function absolutePath(file: string) {
    const vaultName = app.vault.getName();
    return (
        "obsidian://open?vault=" +
        encodeURIComponent(vaultName) +
        String.raw`&file=` +
        encodeURIComponent(file)
    );
}
