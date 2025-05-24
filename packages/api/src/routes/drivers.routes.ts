import { Router } from "express";
import { getDrivers } from "../controllers/drivers.controller";

const router = Router();

router.get("/", getDrivers); // GET /api/drivers

export default router;
