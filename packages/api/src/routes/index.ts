import { Router } from "express";
import drivers from "./drivers.routes";

const router = Router();

router.use("/drivers", drivers);

export default router;
