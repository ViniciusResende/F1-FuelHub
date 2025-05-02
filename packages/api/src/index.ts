import express from "express";

const app = express();
const PORT = process.env.PORT ?? 4000;

/**
 * GET /
 * Simple health‑check / hello world endpoint.
 */
app.get("/", (_req, res) => {
  res.json({ message: "Hello, World! 🏎️" });
});

/**
 * (Optional) namespace future API routes under /api
 * app.use("/api", someRouter);
 */

app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}/`);
});
