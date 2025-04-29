import Router from "@koa/router"
import { NotasController } from "../controllers/notas.controller.js"


const router = new Router({
  prefix: "/api/notas",
})

// Rutas para notas
router.get("/", NotasController.getAll)
router.get("/:id", NotasController.getById)
router.post("/", NotasController.create)
router.put("/:id", NotasController.update)
router.delete("/:id", NotasController.delete)

export const notasRoutes = router
