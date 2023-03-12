import { Setting, TFile, WorkspaceLeaf } from "obsidian";
import { TabSessionsState, TabSessionsView, VIEW_TYPE } from "./view";
const STORAGE_KEY = "tab_sessions_state";

// export function restoreTabs(containerEl: HTMLElement): void {
// 	// Restore button
// 	const restoreButton = containerEl.createEl("button", {
// 		text: "Restore Tabs State",
// 	});

// 	restoreButton.addEventListener("click", async () => {
// 		// Get the saved tabs and open them
// 		const state = TabSessionsView.prototype.loadState();
// 		const allFiles: TFile[] = this.app.vault.getFiles();
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


export function absolutePath(file: string) {
	const vaultName = this.app.vault.getName();
	return (
		"obsidian://open?vault=" +
		encodeURIComponent(vaultName) +
		String.raw`&file=` +
		encodeURIComponent(file)
	);
}

// export function currentTextTabs(containerEl: HTMLElement): void {
// 	containerEl.createEl("p", { text: "Current Tabs:" });
// 	this.app.workspace.iterateRootLeaves((leaf) => {
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


// storage
// export function getExistingSessions() {
//     const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
//     return existing.sessions || [];
// }
export function getExistingSessions() {
	const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
	const sessions = existing.sessions || [];
	const index = sessions.length-1;
	return { sessions, index };
  }

// export function addSessionToStorage(state: TabSessionsState) {
//     const {sessions} = getExistingSessions();
//     sessions.push(state);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessions: sessions }));
// }

// export function addSessionToStorage(state: TabSessionsState) {
// 	const { sessions, index } = getExistingSessions();
  
// 	if (state.sessionData.index <= index) {
// 	  // Session already exists, update it
// 	  const existingSession = sessions.find(
// 		(session:TabSessionsState) => session.sessionData.index === state.sessionData.index
// 	  );
// 	  existingSession.sessionData.sessionName = state.sessionData.sessionName;
// 	  existingSession.sessionData.tabs = state.sessionData.tabs;
// 	} else {
// 	  // Add new session
// 	  sessions.push(state);
// 	}
  
// 	localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessions }));
//   }

// version plus avancée à vérifier
export function addSessionToStorage(state: TabSessionsState) {
	const { sessions } = getExistingSessions();
	const existingSessionIndex = sessions.findIndex(
	  (session:TabSessionsState) => session.sessionData.index === state.sessionData.index
	);
	if (existingSessionIndex >= 0) {
	  // Merge the updated session data into the existing session data
	  const existingSession = sessions[existingSessionIndex];
	  Object.assign(existingSession.sessionData, state.sessionData);
  
	  // Update the session in the array and save to localStorage
	  sessions.splice(existingSessionIndex, 1, existingSession);
	  localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessions }));
	} else {
	  // Add the new session to the array and save to localStorage
	  sessions.push(state);
	  localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessions }));
	}
  }
  



export function logLocalStorage() {
    console.log("window.localStorage", localStorage.getItem(STORAGE_KEY));
}


//add a new view
export  async function addView() {
	this.app.workspace.detachLeavesOfType(VIEW_TYPE);
	await this.app.workspace.getRightLeaf(false).setViewState({
		type: VIEW_TYPE,
		active: true,
	});
}