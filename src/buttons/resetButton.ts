// import { TabSessionsView } from "src/view";
import { addView } from "src/viewUtils";
export let resetButt: HTMLElement | null = null;
export function resetButton(buttonsContainer: HTMLElement) {
	resetButt = buttonsContainer.createEl("button", {
		text: "Reset",
		cls: "mod-cta",
	});
	resetButt.addEventListener("click", () => {
		reset();
		resetButt?.remove()
		resetButt = null
	});
}

function reset() {
	if (confirm("Are you sure you want to reset the saved tab sessions?")) {
		localStorage.clear();
		addView();
	}
}

// getExistingSessions()
