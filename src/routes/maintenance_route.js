import { Router } from "express";
import maintenance_controller from "../controllers/maintenance_controller.js";

const router = Router();

router.post("/", maintenance_controller.store);
router.get("/", maintenance_controller.index);
router.get("/:id", maintenance_controller.show);
router.put("/:id", maintenance_controller.update);
router.delete("/:id", maintenance_controller.destroy);

export default router;