import Koa from "koa"
import Router from "@koa/router"
import bodyParser from "koa-bodyparser"
import cors from "@koa/cors"
import { config } from "dotenv"
import { notasRoutes } from "./routes/notas.js"
import { avisosRoutes } from "./routes/avisos.js"
import { initDB } from "./db/db.js"

// Cargar variables de entorno
config()

const app = new Koa()
const router = new Router()

// Middleware
app.use(cors())
app.use(bodyParser())

// Rutas
router.get("/", (ctx) => {
  ctx.body = {
    status: "success",
    message: "API de Tablero de Avisos y Notas funcionando correctamente",
  }
})

// Agregar rutas de la API
app.use(router.routes())
app.use(notasRoutes.routes())
app.use(avisosRoutes.routes())

// Inicializar la base de datos
initDB()
  .then(() => {
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error("Error al inicializar la base de datos:", err)
    process.exit(1)
  })

export default app
