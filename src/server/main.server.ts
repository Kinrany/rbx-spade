export {};

const workspace = game.GetService("Workspace");

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
	new Vector3(-slateRegionSize, -slateRegionSize, -slateRegionSize),
	new Vector3(-spawnPlatformSize, slateRegionSize, slateRegionSize),
);
workspace.Terrain.FillRegion(slateRegion, 4, Enum.Material.Slate);
