import assert from "node:assert/strict";
import type { Server } from "http";
import { after, before, test } from "node:test";
import app from "../src/app";

let server: Server;
let baseURL: string;

before(async () => {
  await new Promise<void>((resolve, reject) => {
    server = app.listen(0, "127.0.0.1", (error?: Error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("could not determine the test server port");
  }
  baseURL = `http://127.0.0.1:${address.port}`;
});

after(() => {
  server.close();
});

test("GET /api/health returns a healthy response", async () => {
  const response = await fetch(`${baseURL}/api/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});
