import assert from "node:assert/strict";

const base = "http://localhost:3001";
let passed = 0;

async function check(path, expected, snippet, options) {
  const response = await fetch(new URL(path, base), { redirect: "manual", ...options });
  const body = await response.text();
  assert.equal(response.status, expected, `${path}: unexpected status ${response.status}: ${body.slice(0, 200)}`);
  if (snippet) assert.ok(body.includes(snippet), `${path}: missing ${JSON.stringify(snippet)}`);
  passed++;
  console.log(`PASS ${response.status} ${path}`);
  return { response, body };
}

// Next can send HTTP 200 for a streamed `notFound()` response if loading.tsx
// already flushed the shell. Its rendered UI (and robots noindex) is the 404.
async function checkNotFound(path) {
  const response = await fetch(new URL(path, base));
  const body = await response.text();
  assert.ok([200, 404].includes(response.status), `${path}: unexpected ${response.status}`);
  assert.ok(body.includes("Todo not found"), `${path}: missing custom 404 UI`);
  assert.ok(body.includes("noindex"), `${path}: missing notFound() marker`);
  passed++;
  console.log(`PASS ${response.status} ${path} (custom notFound UI)`);
}

try {
  const stats = await check("/api/stats", 200, '"total":4');
  assert.deepEqual(JSON.parse(stats.body), { total: 4, done: 2, open: 2 });
  await check("/", 200, "Todo App");
  await check("/todos", 200, "Learn Next.js routing");
  await check("/todos?status=done", 200, "Read the NestJS docs");
  await check("/todos?status=open", 200, "Build the todo list page");
  await check("/todos/new", 200, "New todo");
  await check("/todos/1", 200, "Learn Next.js routing");
  await checkNotFound("/todos/99999");
  await check("/todos/5/edit", 200, "Todo catch-all route");
  await check("/help/todos/create", 200, "create");
  await check("/archive", 200, "All years");
  await check("/archive/2025", 200, "Year: 2025");
  await check("/playground/a", 200, "Layout counter");
  await check("/playground/b", 200, "Template counter");

  const blocked = await check("/dashboard", 307);
  assert.equal(new URL(blocked.response.headers.get("location"), base).pathname, "/login");
  await check("/dashboard/settings", 307);
  await check("/login", 200, "Demo login");

  const login = await check("/api/demo-login", 200, '"ok":true', { method: "POST" });
  const cookie = login.response.headers.get("set-cookie")?.split(";")[0];
  assert.equal(cookie, "demo-auth=1");
  await check("/dashboard", 200, "Recent 3 todos", { headers: { cookie } });
  await check("/dashboard/settings", 200, "Recent default", { headers: { cookie } });

  await check("/api/todos", 400, "title is required", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: "" }),
  });
  const created = await check("/api/todos", 201, "PA6 smoke todo", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: "PA6 smoke todo" }),
  });
  const { id } = JSON.parse(created.body);
  try {
    await check(`/todos/${id}`, 200, "PA6 smoke todo");
  } finally {
    await check(`/api/todos/${id}`, 200, "Todo deleted", { method: "DELETE" });
  }
  await checkNotFound(`/todos/${id}`);
  console.log(`\n${passed} HTTP checks passed.`);
} catch (error) {
  console.error("FAIL", error);
  process.exitCode = 1;
}
