import { Router } from "express";
import {
  GetAnchestorPath,
  GetEntireTree,
  GetChildCategories,
  Create,
  Delete,
  Update,
} from "../Controllers/Categories";

const router = Router();

router.get("/", GetEntireTree);
router.get("/:id", GetAnchestorPath);
router.get("/in/:id", GetChildCategories);
router.post("/", Create);
router.delete("/:id", Delete);
router.patch("/:id", Update);

export default router;
