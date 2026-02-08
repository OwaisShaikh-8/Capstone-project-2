import express from "express";
import {
  createCustomization,
  getCustomerCustomizations,
  getOwnerCustomizations,
  getCustomizationById,
  replyToCustomization,
  updateCustomizationStatus,
} from "../controllers/customizationController.js";
import { protect, customerOnly, ownerOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, customerOnly, createCustomization);
router.get("/customer", protect, customerOnly, getCustomerCustomizations);
router.get("/owner", protect, ownerOnly, getOwnerCustomizations);
router.get("/:id", protect, getCustomizationById);
router.put("/:id/reply", protect, ownerOnly, replyToCustomization);
router.put("/:id/status", protect, customerOnly, updateCustomizationStatus);

export default router;
