import { Router } from "express";
import workshop_controller from "../controllers/workshop_controller";

const router = Router();

router.post("/", workshop_controller.store);
router.get("/", workshop_controller.index);
router.get("/:id", workshop_controller.show);
router.put("/:id", workshop_controller.update);
router.delete("/:id", workshop_controller.destroy);

export default router;