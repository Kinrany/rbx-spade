import { whileInstanceInWorkspace } from "shared/whileInstanceInWorkspace";
import { t } from "@rbxts/t";

const workspace = game.GetService("Workspace");

const parent = script.Parent;

if (!parent || !parent.IsA("Tool")) {
	throw `Expected parent to be a Tool, found ${parent?.ClassName}`;
}

const tool = parent;

let activated = false;

const updateRay = new Instance("RemoteEvent", tool);
let ray = new Ray();
updateRay.OnServerEvent.Connect((_player, newRay) => {
	if (t.Ray(newRay)) {
		ray = newRay;
	} else {
		throw `Expected a Ray, found ${newRay}`;
	}
});

const maxDiggingDistance = 20;

function dig() {
	const humanoid = tool.Parent?.FindFirstChild("Humanoid");
	if (!humanoid || !humanoid.IsA("Humanoid")) {
		throw `Expected parent to have a Humanoid named "Humanoid", found ${humanoid?.ClassName}`;
	}

	const params = new RaycastParams();
	params.FilterType = Enum.RaycastFilterType.Whitelist;
	params.FilterDescendantsInstances = [workspace.Terrain];

	const raycastResult = workspace.Raycast(ray.Origin, ray.Direction.Unit.mul(1000), params);
	if (raycastResult && humanoid.RootPart) {
		const distToCharacter = raycastResult.Position.sub(humanoid.RootPart.Position).Magnitude;
		if (distToCharacter <= maxDiggingDistance) {
			workspace.Terrain.FillBall(raycastResult.Position, 5, Enum.Material.Air);
		}
	}
}

tool.Activated.Connect(() => {
	activated = true;
});

tool.Deactivated.Connect(() => {
	activated = false;
});

whileInstanceInWorkspace(tool, () => {
	if (activated) {
		dig();
	}
});
