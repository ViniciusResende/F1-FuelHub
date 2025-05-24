import { app } from "./app";
import { env } from "./config";

const PORT = env.PORT ?? 4000;

app.listen(PORT, () => {
  console.log(`🚀 API up at http://localhost:${PORT}`);
});