// generateMarkdownLink(file: TFile, sourcePath: string, subpath?: string, alias?: string): string;
import { ItemView, WorkspaceLeaf } from "obsidian";
import { resetButton, restoreTabs, saveButton } from "src/viewUtils";
export const VIEW_TYPE = "VIEW_TYPE";
const STORAGE_KEY = "tab_sessions_state";

interface TabSessionsState {
	sessionData: {
		sessionName: string;
		tabs: { file: string; path: string; index: number }[];
	};
}

export class TabSessionsView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getDisplayText(): string {
		return "Tab Cessions";
	}

	getIcon(): string {
		return "pocket";
	}

	getViewType(): string {
		return VIEW_TYPE;
	}

	async onOpen() {
		this.render();
	}

	reset(){
		localStorage.clear();
		console.log("window.localStorage", localStorage.getItem(STORAGE_KEY));

	}

	saveState(state: TabSessionsState) {
		const existingState = JSON.parse(
			localStorage.getItem(STORAGE_KEY) || "{}"
		);
		const sessions = existingState.sessions || [];
		sessions.push(state);
		existingState.sessions = sessions;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(existingState));
		// localStorage.clear();
		console.log("window.localStorage", localStorage.getItem(STORAGE_KEY));
		// console.log(
		// 	"Number of saved sessions:",
		// Object.keys(localStorage).filter((key) =>
		// 	key.startsWith("tab_sessions_state_")
		// ).length
	}

	// loadState(): TabSessionsState {
	// 	const stateJson = localStorage.getItem(STORAGE_KEY);
	// 	if (stateJson) {
	// 		return JSON.parse(stateJson) as TabSessionsState;
	// 	} else {
	// 		return { tabs: [] };
	// 	}
	// }

	render() {
		console.log("tututt");
		const { containerEl } = this;
		containerEl.empty();
		// title
		containerEl.createEl("h4", { text: "Tab Sessions" });
		const buttonsContainer = containerEl.createEl("div", {
			cls: "buttons-container",
		});
		buttonsContainer.style.display = "flex";
		buttonsContainer.style.flexDirection = "row";
		// Save button
		saveButton(containerEl,buttonsContainer);
		resetButton(containerEl,buttonsContainer);
		// render buttons
		// restoreTabs(containerEl);
	}
}
