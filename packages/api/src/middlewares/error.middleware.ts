import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils/logger";

/* ────────────────────────────
   Custom error type
   ──────────────────────────── */
export class HttpError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    // For instanceof to work when targeting ES5
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, HttpError);
  }
}

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(new HttpError(404, "Route not found"));
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const { statusCode, message, details } =
    err instanceof HttpError
      ? err
      : { statusCode: 500, message: "Internal Server Error", details: undefined };

  Logger.error(
    `[${statusCode}] ${message}`,
    err instanceof Error ? err.stack : err
  );

  const isProd = process.env.NODE_ENV === "production";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    ...(typeof details === 'object' && { details }),
    ...(isProd ? null : { stack: err instanceof Error ? err.stack : err }),
  });
}
