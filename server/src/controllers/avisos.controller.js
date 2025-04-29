import { AvisoModel } from "../models/aviso.model.js"

export const AvisosController = {
  // Obtener todos los avisos
  getAll: async (ctx) => {
    try {
      const avisos = await AvisoModel.getAll()
      ctx.body = {
        status: "success",
        data: avisos,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        status: "error",
        message: "Error al obtener los avisos",
        error: error.message,
      }
    }
  },

  // Obtener un aviso por ID
  getById: async (ctx) => {
    try {
      const id = ctx.params.id
      const aviso = await AvisoModel.getById(id)

      if (!aviso) {
        ctx.status = 404
        ctx.body = {
          status: "error",
          message: `No se encontró el aviso con ID ${id}`,
        }
        return
      }

      ctx.body = {
        status: "success",
        data: aviso,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        status: "error",
        message: "Error al obtener el aviso",
        error: error.message,
      }
    }
  },

  // Crear un nuevo aviso
  create: async (ctx) => {
    try {
      const { titulo, contenido } = ctx.request.body

      // Validación básica
      if (!titulo || !contenido) {
        ctx.status = 400
        ctx.body = {
          status: "error",
          message: "El título y el contenido son obligatorios",
        }
        return
      }

      const nuevoAviso = await AvisoModel.create({ titulo, contenido })

      ctx.status = 201
      ctx.body = {
        status: "success",
        message: "Aviso creado correctamente",
        data: nuevoAviso,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        status: "error",
        message: "Error al crear el aviso",
        error: error.message,
      }
    }
  },

  // Actualizar un aviso existente
  update: async (ctx) => {
    try {
      const id = ctx.params.id
      const { titulo, contenido } = ctx.request.body

      // Validación básica
      if (!titulo || !contenido) {
        ctx.status = 400
        ctx.body = {
          status: "error",
          message: "El título y el contenido son obligatorios",
        }
        return
      }

      // Verificar si el aviso existe
      const avisoExistente = await AvisoModel.getById(id)
      if (!avisoExistente) {
        ctx.status = 404
        ctx.body = {
          status: "error",
          message: `No se encontró el aviso con ID ${id}`,
        }
        return
      }

      const avisoActualizado = await AvisoModel.update(id, { titulo, contenido })

      ctx.body = {
        status: "success",
        message: "Aviso actualizado correctamente",
        data: avisoActualizado,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        status: "error",
        message: "Error al actualizar el aviso",
        error: error.message,
      }
    }
  },

  // Eliminar un aviso
  delete: async (ctx) => {
    try {
      const id = ctx.params.id

      // Verificar si el aviso existe
      const avisoExistente = await AvisoModel.getById(id)
      if (!avisoExistente) {
        ctx.status = 404
        ctx.body = {
          status: "error",
          message: `No se encontró el aviso con ID ${id}`,
        }
        return
      }

      await AvisoModel.delete(id)

      ctx.body = {
        status: "success",
        message: `Aviso con ID ${id} eliminado correctamente`,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        status: "error",
        message: "Error al eliminar el aviso",
        error: error.message,
      }
    }
  },
}
