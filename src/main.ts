// https://github.com/Lisandra-dev/obsidian-create-note-in-folder/blob/master/plugin/settings.ts

import { Plugin } from "obsidian";
import { TabSessionsSettingsTab } from "src/settings";
import { TabSessionsView, VIEW_TYPE } from "src/view";

interface TabCessionsSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: TabCessionsSettings = {
	mySetting: "default",
};

export default class TabCessions extends Plugin {
	settings: TabCessionsSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new TabSessionsSettingsTab(this.app, this));

		this.registerView(VIEW_TYPE, (leaf) => {
			return new TabSessionsView(leaf);
		});
		// this.activateView()
		this.app.workspace.onLayoutReady(() => this.activateView());
		this.addRibbonIcon("pocket", "Tab Cessions", () => {
			this.activateView();
		});
	}

	async onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE);
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async activateView() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE);
		await this.app.workspace.getRightLeaf(false).setViewState({
			type: VIEW_TYPE,
			active: true,
		});
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

// async activateView() {
	// 	if (!leaves.length) {
		// const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE);
		// 		this.app.workspace.getRightLeaf(false).setViewState({
// 			type: VIEW_TYPE,
// 			active: true,
// 		});
// 	}
// }
