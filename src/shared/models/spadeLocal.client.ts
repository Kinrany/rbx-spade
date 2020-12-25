import { whileInstanceInWorkspace } from "shared/whileInstanceInWorkspace";

const workspace = game.GetService("Workspace");
const input = game.GetService("UserInputService");

const parent = script.Parent;

if (!parent || !parent.IsA("Tool")) {
	throw `Expected parent to be a Tool, found ${parent?.ClassName}`;
}

const tool = parent;

const activatedChild = tool.WaitForChild("Activated");
if (!activatedChild || !activatedChild.IsA("BoolValue")) {
	throw 'Expected tool to have a BoolValue named "Activated"';
}
const activated = activatedChild;

const updateRayChild = tool.FindFirstChildWhichIsA("RemoteEvent");
if (!updateRayChild) {
	throw `Expected tool to have a RemoteEvent.`;
}
const updateRayEvent = updateRayChild;

function updateRay() {
	if (workspace.CurrentCamera) {
		const cursorPos = input.GetMouseLocation();
		const ray = workspace.CurrentCamera.ViewportPointToRay(cursorPos.X, cursorPos.Y, 100);
		updateRayEvent.FireServer(ray);
	}
}

whileInstanceInWorkspace(tool, updateRay);
