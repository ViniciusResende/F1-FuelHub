import { app } from './app';
import { env } from './config';
import { connectDB } from './config/db';
import { Logger } from './utils/logger';

const PORT = env.PORT ?? 4000;

(async function bootstrap() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      Logger.info(`🚀 API running at http://localhost:${PORT}`);
    });
  } catch (err) {
    Logger.error('❌ Failed to start server', err);
    process.exit(1);
  }
})();
