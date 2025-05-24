import { Request, Response, NextFunction } from "express";
import { listActiveDrivers } from "../services/drivers.service";

export async function getDrivers(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const drivers = await listActiveDrivers();
    res.json(drivers);
  } catch (err) {
    next(err);
  }
}
