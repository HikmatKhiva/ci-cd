import express from "express";
const app = express();

app.get("/", (_req, res) => {
  const version = "Development";
  res.type("html").send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>Welcome CI/CD</h1>
        <p>The application running</p>
        <p>Version ${version}</p>
    </body>
    </html>
    `);
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

export default app;
