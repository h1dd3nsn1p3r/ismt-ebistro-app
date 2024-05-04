import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

const app = new Hono();

app.get("/", async (c) => {
	const path = join(process.cwd(), "/src/data.json");

	const content = await readFile(path, "utf-8").catch((err) => {
		return null;
	});

	// Just a fallback message if the data.json file is not found.
	if (!content) {
		const message = {
			name: "Anuj Subedi",
			message: "Welcome to enchanted bistro!",
		};

		return c.json(message);
	}

	return c.json(JSON.parse(content));
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port,
});
