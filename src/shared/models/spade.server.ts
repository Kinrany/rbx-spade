export {};

const tool = script.Parent;

if (!tool || !tool.IsA("Tool")) {
	throw `Expected parent to be a Tool, found ${tool?.ClassName}`;
}

tool.Activated.Connect(() => {
	const humanoid = tool.Parent?.FindFirstChild("Humanoid");
	if (!humanoid || !humanoid.IsA("Humanoid")) {
		throw `Expected parent to be a Humanoid, found ${humanoid?.ClassName}`;
	}

	humanoid.Jump = true;
});
