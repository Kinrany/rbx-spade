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
const slateRegion = new Region3(new Vector3(-1000, -1000, -1000), new Vector3(-spawnPlatformSize, 1000, 1000));
workspace.Terrain.FillRegion(slateRegion, 4, Enum.Material.Slate);
