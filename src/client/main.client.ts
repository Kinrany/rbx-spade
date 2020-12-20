import { makeHello, makeWorld } from "shared/module";

print(makeHello("main.client.ts"));
print(makeWorld("greeting"));

game.GetService("RunService").Heartbeat.Connect(() => {
	const player = game.GetService("Players").LocalPlayer;
	// print(player.Character?.GetPrimaryPartCFrame().Position);
});
