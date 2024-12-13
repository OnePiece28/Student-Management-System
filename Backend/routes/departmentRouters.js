const express = require("express");
const router = express.Router();
const DepartmentController = require("../controllers/departmnentController");

router.get("/", DepartmentController.getDepartments);
router.get("/:id", DepartmentController.getDepartmentsByID);
router.post("/", DepartmentController.createDepartments);
router.put("/:id", DepartmentController.updateDepartments);
router.delete("/:id", DepartmentController.deleteDepartments);

module.exports = router;
