//"use client"
import React from 'react'; // Agrega esta línea
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Form.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api"

const AvisoForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAviso = async () => {
      if (id) {
        try {
          setLoading(true)
          const response = await axios.get(`${API_URL}/avisos/${id}`)
          const { titulo, contenido } = response.data.data
          setFormData({ titulo, contenido })
          setLoading(false)
        } catch (error) {
          setError("Error al cargar el aviso. Por favor, intenta de nuevo.")
          setLoading(false)
          console.error("Error fetching aviso:", error)
        }
      }
    }

    fetchAviso()
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
        // Actualizar aviso existente
        await axios.put(`${API_URL}/avisos/${id}`, formData)
      } else {
        // Crear nuevo aviso
        await axios.post(`${API_URL}/avisos`, formData)
      }

      setLoading(false)
      navigate("/avisos")
    } catch (error) {
      setError("Error al guardar el aviso. Por favor, intenta de nuevo.")
      setLoading(false)
      console.error("Error saving aviso:", error)
    }
  }

  return (
    <div className="form-container">
      <h2>{id ? "Editar Aviso" : "Nuevo Aviso"}</h2>

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
            rows="8"
            value={formData.contenido}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/avisos")}>
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

export default AvisoForm
