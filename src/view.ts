// generateMarkdownLink(file: TFile, sourcePath: string, subpath?: string, alias?: string): string;
import { ItemView, WorkspaceLeaf } from "obsidian";
import {saveButton} from "./buttons/saveButton";
import TabCessions from "./main";
import { resetButton } from "./buttons/resetButton";
export const VIEW_TYPE = "VIEW_TYPE";

export interface TabSessionsState {
	sessionData: {
		index: number
		sessionName: string;
		tabs: { file: string; path: string; index: number }[] | [];
	};
}

export class TabSessionsView extends ItemView {
	private plugin: TabCessions;
	constructor(leaf: WorkspaceLeaf, plugin: TabCessions) {
		super(leaf);
		this.plugin = plugin;
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

	deleteSession() {
		//state: TabSessionsState
		console.log("boumboum");
		// localStorage.clear();
		// console.log("window.localStorage", localStorage.getItem(STORAGE_KEY));
		// this.saveState(state)
	}

	render() {
		console.log("turolut")
		const { containerEl } = this;
		containerEl.empty();
		const body = containerEl.createEl("div", { cls: "body" });
		body.createEl("h4", { text: "Tab Sessions" });
		const buttonsContainer = body.createEl("div", {
			cls: "buttons-container",
		});
		buttonsContainer.style.display = "flex";
		buttonsContainer.style.flexDirection = "row";
		// buttonsContainer.style.justifyContent = "space-between";
		saveButton(body, buttonsContainer);
		// resetButton(buttonsContainer);
		// restoreTabs(containerEl);
	}

	// reset(state: TabSessionsState) {
	// 	const existingSessions = getExistingSessions();
	// 	if (existingSessions.length > 0) {
	// 		if (confirm("Are you sure you want to reset the saved tab sessions?")) {
	// 			localStorage.clear();
	// 			this.saveState(state);
	// 			addView();
	// 		}
	// 	} else {
	// 		console.log("There are no saved tab sessions to reset.");// alert?
	// 	}
	// }

	// loadState(): TabSessionsState {
	// 	const stateJson = localStorage.getItem(STORAGE_KEY);
	// 	if (stateJson) {
	// 		return JSON.parse(stateJson) as TabSessionsState;
	// 	} else {
	// 		return { tabs: [] };
	// 	}
	// }


}

