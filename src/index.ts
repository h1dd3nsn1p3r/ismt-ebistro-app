import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

/**
 * Function to generate a Fibonacci sequence up to n.
 *
 * @param n
 * @returns Fibonacci number at position n
 */
function fibonacci(n: number): number {
	if (n <= 1) return n;
	return fibonacci(n - 1) + fibonacci(n - 2);
}

/**
 * Return random number between 40 - 50.
 *
 * @returns number
 */
function getNumber(): number {
	return Math.floor(Math.random() * 10) + 35;
}

app.get("/", async (c) => {
	const content = {
		message: "Welcome to enchanted bistro!",
		data: fibonacci(getNumber()),
	};
	return c.json(content);
});

const port = 80;
console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port,
});
