/* eslint-disable no-console */
type Level = "debug" | "info" | "warn" | "error";

class LoggerClass {
  private format(namespace: string | null, level: Level, msg: string): string {
    const ts = new Date().toISOString();
    const ns = namespace ? ` [${namespace}]` : "";
    return `[${ts}] [${level.toUpperCase()}]${ns} ${msg}`;
  }

  /** Plain (root) log methods */
  debug(msg: string, ...meta: unknown[]) {
    console.debug(this.format(null, "debug", msg), ...meta);
  }
  info(msg: string, ...meta: unknown[]) {
    console.info(this.format(null, "info", msg), ...meta);
  }
  warn(msg: string, ...meta: unknown[]) {
    console.warn(this.format(null, "warn", msg), ...meta);
  }
  error(msg: string, ...meta: unknown[]) {
    console.error(this.format(null, "error", msg), ...meta);
  }

  /** Create a namespaced logger: Logger.withNS("drivers").info("…") */
  withNS(namespace: string) {
    return {
      debug: (msg: string, ...meta: unknown[]) =>
        console.debug(this.format(namespace, "debug", msg), ...meta),
      info: (msg: string, ...meta: unknown[]) =>
        console.info(this.format(namespace, "info", msg), ...meta),
      warn: (msg: string, ...meta: unknown[]) =>
        console.warn(this.format(namespace, "warn", msg), ...meta),
      error: (msg: string, ...meta: unknown[]) =>
        console.error(this.format(namespace, "error", msg), ...meta),
    };
  }
}

export const Logger = new LoggerClass();
