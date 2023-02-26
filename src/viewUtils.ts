import { TFile } from "obsidian";
import { TabSessionsView } from "./view";

// export function restoreTabs(containerEl: HTMLElement): void {
// 	// Restore button
// 	const restoreButton = containerEl.createEl("button", {
// 		text: "Restore Tabs State",
// 	});

// 	restoreButton.addEventListener("click", async () => {
// 		// Get the saved tabs and open them
// 		const state = TabSessionsView.prototype.loadState();
// 		const allFiles: TFile[] = app.vault.getFiles();
// 		for (const file of allFiles) {
// 			const matchingTab = state.tabs.find(
// 				(tab) => tab.file === file.name
// 			);
// 			if (matchingTab) {
// 				const leaf = this.app.workspace.getLeaf("tab");
// 				leaf.openFile(file, {
// 					state: { mode: "source" },
// 					eState: { rename: "end" }, // 'start' | 'end'
// 				});
// 			}
// 		}
// 	});
// }

export function saveButton(
	containerEl: HTMLElement,
	buttonsContainer: HTMLElement
) {
	const saveButton = buttonsContainer.createEl("button", {
		text: "Save Tabs State",
		cls: "mod-cta",
	});

	saveButton.addEventListener("click", () => {
		// Get the current tabs with links and save their state
		const tabs: { file: string; path: string; index: number }[] = [];
		let index = 0;
		app.workspace.iterateRootLeaves((leaf) => {
			const leafState = leaf.getViewState();
			const file = leafState.state.file;
			const path = absolutePath(file);
			// const pane = leaf.view.containerEl.getAttribute("data-type") ?? ""; // eg "markdown"
			if (file) {
				tabs.push({ file, path, index });
				index++;
			}
		});
		const sessionData = {
			sessionName: "", // empty session name
			tabs: tabs, // tabs array
		};
		const state = { sessionData };
		TabSessionsView.prototype.saveState(state);
		const date = new Date();
		const expr = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
		// Render the current tabs with links
		containerEl.createEl("p", { text: `${expr}` });
		tabs.forEach(({ file, path }) => {
			const link = containerEl.createEl("a", {
				href: path,
				text: file,
				attr: { "data-path": path },
			});
		});
	});
}

export function resetButton(
	containerEl: HTMLElement,
	buttonsContainer: HTMLElement
) {
	const reset = buttonsContainer.createEl("button", {
		text: "Reset",
		cls: "mod-cta",
	});

	TabSessionsView.prototype.reset();
}

export function absolutePath(file: string) {
	const vaultName = app.vault.getName();
	return (
		"obsidian://open?vault=" +
		encodeURIComponent(vaultName) +
		String.raw`&file=` +
		encodeURIComponent(file)
	);
}

// export function currentTextTabs(containerEl: HTMLElement): void {
// 	containerEl.createEl("p", { text: "Current Tabs:" });
// 	app.workspace.iterateRootLeaves((leaf) => {
// 		const leafState = leaf.getViewState();
// 		const file = leafState.state.file;
// 		const pane = leaf.view.containerEl.getAttribute("data-type") ?? "";
// 		if (file || pane) {
// 			const tabEl = containerEl.createEl("div", { cls: "tab-session" });
// 			tabEl.createEl("span", { text: pane });
// 			tabEl.createEl("span", { text: file });
// 		}
// 	});
// }
