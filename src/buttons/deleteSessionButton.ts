import { TabSessionsView } from "src/view";

export function deleteSessionButton(
	containerEl: HTMLElement,
	buttonsContainer: HTMLElement
) {
	const deleteSessionButton = buttonsContainer.createEl("button", {
		text: "Delete Session",
		cls: "mod-cta",
	});
	deleteSessionButton.addEventListener("click", () => {
		TabSessionsView.prototype.deleteSession(); //state
	});
}