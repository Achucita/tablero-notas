import request from "supertest"
import app from "../index.js"
import { describe, test, expect } from "@jest/globals"

// Pruebas para la API de notas
describe("API de Notas", () => {
  let notaId

  // Prueba para crear una nota
  test("Debería crear una nueva nota", async () => {
    const res = await request(app.callback()).post("/api/notas").send({
      titulo: "Nota de prueba",
      contenido: "Contenido de prueba",
      color: "#f0f0f0",
    })

    expect(res.statusCode).toEqual(201)
    expect(res.body.status).toEqual("success")
    expect(res.body.data).toHaveProperty("id")
    expect(res.body.data.titulo).toEqual("Nota de prueba")

    notaId = res.body.data.id
  })

  // Prueba para obtener todas las notas
  test("Debería obtener todas las notas", async () => {
    const res = await request(app.callback()).get("/api/notas")

    expect(res.statusCode).toEqual(200)
    expect(res.body.status).toEqual("success")
    expect(Array.isArray(res.body.data)).toBeTruthy()
  })

  // Prueba para obtener una nota por ID
  test("Debería obtener una nota por ID", async () => {
    const res = await request(app.callback()).get(`/api/notas/${notaId}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.status).toEqual("success")
    expect(res.body.data).toHaveProperty("id")
    expect(res.body.data.titulo).toEqual("Nota de prueba")
  })

  // Prueba para actualizar una nota
  test("Debería actualizar una nota existente", async () => {
    const res = await request(app.callback()).put(`/api/notas/${notaId}`).send({
      titulo: "Nota actualizada",
      contenido: "Contenido actualizado",
      color: "#e0e0e0",
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body.status).toEqual("success")
    expect(res.body.data.titulo).toEqual("Nota actualizada")
  })

  // Prueba para eliminar una nota
  test("Debería eliminar una nota", async () => {
    const res = await request(app.callback()).delete(`/api/notas/${notaId}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.status).toEqual("success")
  })
})

// Pruebas para la API de avisos
describe("API de Avisos", () => {
  let avisoId

  // Prueba para crear un aviso
  test("Debería crear un nuevo aviso", async () => {
    const res = await request(app.callback()).post("/api/avisos").send({
      titulo: "Aviso de prueba",
      contenido: "Contenido de prueba",
    })

    expect(res.statusCode).toEqual(201)
    expect(res.body.status).toEqual("success")
    expect(res.body.data).toHaveProperty("id")
    expect(res.body.data.titulo).toEqual("Aviso de prueba")

    avisoId = res.body.data.id
  })

  // Prueba para obtener todos los avisos
  test("Debería obtener todos los avisos", async () => {
    const res = await request(app.callback()).get("/api/avisos")

    expect(res.statusCode).toEqual(200)
    expect(res.body.status).toEqual("success")
    expect(Array.isArray(res.body.data)).toBeTruthy()
  })

  // Prueba para obtener un aviso por ID
  test("Debería obtener un aviso por ID", async () => {
    const res = await request(app.callback()).get(`/api/avisos/${avisoId}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.status).toEqual("success")
    expect(res.body.data).toHaveProperty("id")
    expect(res.body.data.titulo).toEqual("Aviso de prueba")
  })

  // Prueba para actualizar un aviso
  test("Debería actualizar un aviso existente", async () => {
    const res = await request(app.callback()).put(`/api/avisos/${avisoId}`).send({
      titulo: "Aviso actualizado",
      contenido: "Contenido actualizado",
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body.status).toEqual("success")
    expect(res.body.data.titulo).toEqual("Aviso actualizado")
  })

  // Prueba para eliminar un aviso
  test("Debería eliminar un aviso", async () => {
    const res = await request(app.callback()).delete(`/api/avisos/${avisoId}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.status).toEqual("success")
  })
})
