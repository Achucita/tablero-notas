import Router from "@koa/router"
import { AvisosController } from "../controllers/avisos.controller.js"

const router = new Router({
  prefix: "/api/avisos",
})

// Rutas para avisos
router.get("/", AvisosController.getAll)
router.get("/:id", AvisosController.getById)
router.post("/", AvisosController.create)
router.put("/:id", AvisosController.update)
router.delete("/:id", AvisosController.delete)

export const avisosRoutes = router
