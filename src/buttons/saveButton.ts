import { Setting, WorkspaceLeaf } from "obsidian";
import {
	absolutePath,
	addSessionToStorage,
	getExistingSessions,
	logLocalStorage,
} from "src/viewUtils";
import { TabSessionsState } from "src/view";
import { truncate } from "fs";
import { resetButt, resetButton } from "./resetButton";
import { nameSessionModal } from "./modalSaveButton";

export function saveButton(body: HTMLElement, buttonsContainer: HTMLElement) {
	const saveButton = buttonsContainer.createEl("button", {
		text: "Save Tabs State",
		cls: "buttons-container",
	});
	saveButton.addEventListener("click", () => {
		const tabs = getLeafTabs();
		const {index} = getExistingSessions()
		const sessionData = {
			index: index+1,
			sessionName: "",
			tabs: tabs, // array
		};
		const state: TabSessionsState = { sessionData };
		saveState(state);
		if (getExistingSessions() && !resetButt) resetButton(buttonsContainer);
		
		const date = new Date();
		const expr = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
		const butt = new Setting(body)
		.setName(` ${expr}`)
		.addButton((item) => {
			const div = body.createEl("div", {
				cls: "session-name",
			});
			item.setButtonText("Session name").onClick(() => {
				new nameSessionModal(this.app, (result) => {
					div.setText(`Session Name: ${result}`);
					state.sessionData.sessionName = result;	
					saveState(state)			
				  }).open();					
				});
			})
			.addButton((item) => {
				item.setButtonText("delete").onClick(() => {
					console.log("zipped");
				});

				// Render the current tabs with links
				// body.createEl("p", { text: `${expr}` });// introduire un bouton là

				tabs.forEach(({ file, path }) => {
					const link = body.createEl("a", {
						href: path,
						text: file,
						attr: { "data-path": path },
					});

					link.createEl("button", {
						text: "delete tab",
					});
				});
			});
	});
}

function saveState(state: TabSessionsState) {
	addSessionToStorage(state);
	logLocalStorage();
}

function getLeafTabs(): { file: string; path: string; index: number }[] {
	const tabs: { file: string; path: string; index: number }[] = [];
	let index = 0;
	this.app.workspace.iterateRootLeaves((leaf: WorkspaceLeaf) => {
		const leafState = leaf.getViewState();
		const file = leafState.state.file;
		const path = absolutePath(file);
		if (file) {
			tabs.push({ file, path, index });
			index++;
		}
	});
	return tabs;
}
