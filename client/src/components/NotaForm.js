//"use client"
import React from 'react'; // Agrega esta línea
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Form.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api"

const NotaForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
    color: "#ffffff",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNota = async () => {
      if (id) {
        try {
          setLoading(true)
          const response = await axios.get(`${API_URL}/notas/${id}`)
          const { titulo, contenido, color } = response.data.data
          setFormData({ titulo, contenido, color: color || "#ffffff" })
          setLoading(false)
        } catch (error) {
          setError("Error al cargar la nota. Por favor, intenta de nuevo.")
          setLoading(false)
          console.error("Error fetching nota:", error)
        }
      }
    }

    fetchNota()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      if (id) {
        // Actualizar nota existente
        await axios.put(`${API_URL}/notas/${id}`, formData)
      } else {
        // Crear nueva nota
        await axios.post(`${API_URL}/notas`, formData)
      }

      setLoading(false)
      navigate("/notas")
    } catch (error) {
      setError("Error al guardar la nota. Por favor, intenta de nuevo.")
      setLoading(false)
      console.error("Error saving nota:", error)
    }
  }

  return (
    <div className="form-container">
      <h2>{id ? "Editar Nota" : "Nueva Nota"}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            className="form-control"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            id="contenido"
            name="contenido"
            className="form-control"
            rows="5"
            value={formData.contenido}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="color"
            id="color"
            name="color"
            className="form-control color-picker"
            value={formData.color}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/notas")}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NotaForm
