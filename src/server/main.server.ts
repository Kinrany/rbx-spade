export {};

const workspace = game.GetService("Workspace");
const starterPack = game.GetService("StarterPack");
const replicated = game.GetService("ReplicatedStorage");

// create the player spawn
const spawnPlatformSize = 25;
const spawnPlatformRegion = new Region3(
	new Vector3(-spawnPlatformSize, -5, -spawnPlatformSize),
	new Vector3(spawnPlatformSize, 0, spawnPlatformSize),
);
workspace.Terrain.FillRegion(spawnPlatformRegion, 4, Enum.Material.WoodPlanks);

// create the slate wall
const slateRegionSize = 1000;
const slateRegion = new Region3(
	// starting with: right of platform, far down, far backward
	new Vector3(spawnPlatformSize, -slateRegionSize, -slateRegionSize),
	// ending with: far right, far up, far forward
	new Vector3(slateRegionSize, slateRegionSize, slateRegionSize),
);
workspace.Terrain.FillRegion(slateRegion, 4, Enum.Material.Slate);

const spade = replicated.FindFirstChild("Models")?.FindFirstChild("spade");
const spadeScript = replicated.FindFirstChild("TS")?.FindFirstChild("models")?.FindFirstChild("spade");
const spadeLocalScript = replicated
	.FindFirstChild("TS")
	?.FindFirstChild("models")
	?.FindFirstChild("spadeLocal")
	?.Clone();
if (spade && spadeScript && spadeLocalScript) {
	spadeScript.Clone().Parent = spade;
	spadeLocalScript.Clone().Parent = spade;
	spade.Parent = starterPack;
} else {
	error('Expected to find model and script named "spade"');
}
