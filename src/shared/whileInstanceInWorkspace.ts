const runService = game.GetService("RunService");

export function whileInstanceInWorkspace(instance: Instance, heartbeatAction: () => void) {
	let heartbeatConnection: RBXScriptConnection | undefined;

	instance.AncestryChanged.Connect(() => {
		const isInWorkspace = instance.FindFirstAncestorOfClass("Workspace") !== undefined;
		if (heartbeatConnection && !isInWorkspace) {
			heartbeatConnection.Disconnect();
			heartbeatConnection = undefined;
		} else if (!heartbeatConnection && isInWorkspace) {
			heartbeatConnection = runService.Heartbeat.Connect(() => {
				heartbeatAction();
			});
		}
	});
}
