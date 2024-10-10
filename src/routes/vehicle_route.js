import { Router } from "express";
import vehicle_controller from "../controllers/vehicle_controller";

const router = Router();

router.post("/", vehicle_controller.store);
router.get("/", vehicle_controller.index);
router.get("/:id", vehicle_controller.show);
router.put("/:id", vehicle_controller.update);
router.delete("/:id", vehicle_controller.destroy);

export default router;