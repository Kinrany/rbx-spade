export function makeHello(name: string) {
	return `Hello from ${name}!`;
}

export function makeWorld(greeting: string) {
	return `${greeting.sub(1, 1).upper()}${greeting.sub(2)} world!`;
}
