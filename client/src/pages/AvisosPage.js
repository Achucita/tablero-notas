//"use client"
import React from 'react'; // Agrega esta línea
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import AvisoCard from "../components/AvisoCard"
import { FaPlus } from "react-icons/fa"
import "./Page.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api"

const AvisosPage = () => {
  const [avisos, setAvisos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAvisos()
  }, [])

  const fetchAvisos = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/avisos`)
      setAvisos(response.data.data)
      setLoading(false)
    } catch (error) {
      setError("Error al cargar los avisos. Por favor, intenta de nuevo.")
      setLoading(false)
      console.error("Error fetching avisos:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este aviso?")) {
      try {
        await axios.delete(`${API_URL}/avisos/${id}`)
        setAvisos(avisos.filter((aviso) => aviso.id !== id))
      } catch (error) {
        setError("Error al eliminar el aviso. Por favor, intenta de nuevo.")
        console.error("Error deleting aviso:", error)
      }
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Avisos</h1>
        <Link to="/avisos/nuevo" className="btn btn-primary">
          <FaPlus className="icon-left" /> Nuevo Aviso
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="loading">Cargando avisos...</div>
      ) : avisos.length === 0 ? (
        <div className="empty-state">
          <p>No hay avisos disponibles. ¡Crea tu primer aviso!</p>
          <Link to="/avisos/nuevo" className="btn btn-primary">
            <FaPlus className="icon-left" /> Nuevo Aviso
          </Link>
        </div>
      ) : (
        <div className="grid">
          {avisos.map((aviso) => (
            <AvisoCard key={aviso.id} aviso={aviso} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AvisosPage
