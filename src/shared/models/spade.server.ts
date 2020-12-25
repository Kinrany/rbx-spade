import { whileInstanceInWorkspace } from "shared/whileInstanceInWorkspace";
import { t } from "@rbxts/t";

const workspace = game.GetService("Workspace");

const parent = script.Parent;

if (!parent || !parent.IsA("Tool")) {
	throw `Expected parent to be a Tool, found ${parent?.ClassName}`;
}

const tool = parent;

const activated = new Instance("BoolValue", tool);
activated.Name = "Activated";
activated.Value = false;

const updateRay = new Instance("RemoteEvent", tool);
let ray = new Ray();
updateRay.OnServerEvent.Connect((_player, newRay) => {
	if (t.Ray(newRay)) {
		ray = newRay;
	} else {
		throw `Expected a Ray, found ${newRay}`;
	}
});

function dig() {
	const humanoid = tool.Parent?.FindFirstChild("Humanoid");
	if (!humanoid || !humanoid.IsA("Humanoid")) {
		throw `Expected parent to have a Humanoid named "Humanoid", found ${humanoid?.ClassName}`;
	}

	const raycastResult = workspace.Raycast(ray.Origin, ray.Direction);
	if (raycastResult) {
		print(`Filling ${raycastResult.Instance.Name} with air`);
		workspace.Terrain.FillBall(raycastResult.Position, 5, Enum.Material.Air);
	} else {
		print(`Ray ${ray} didn't hit anything`);
	}
}

tool.Activated.Connect(() => {
	activated.Value = true;
});

tool.Deactivated.Connect(() => {
	activated.Value = false;
});

whileInstanceInWorkspace(tool, () => {
	if (activated.Value) {
		dig();
	}
});
