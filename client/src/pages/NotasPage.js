//"use client"
import React from 'react'; // Agrega esta línea
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import NotaCard from "../components/NotaCard"
import { FaPlus } from "react-icons/fa"
import "./Page.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api"

const NotasPage = () => {
  const [notas, setNotas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchNotas()
  }, [])

  const fetchNotas = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/notas`)
      setNotas(response.data.data)
      setLoading(false)
    } catch (error) {
      setError("Error al cargar las notas. Por favor, intenta de nuevo.")
      setLoading(false)
      console.error("Error fetching notas:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta nota?")) {
      try {
        await axios.delete(`${API_URL}/notas/${id}`)
        setNotas(notas.filter((nota) => nota.id !== id))
      } catch (error) {
        setError("Error al eliminar la nota. Por favor, intenta de nuevo.")
        console.error("Error deleting nota:", error)
      }
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Mis Notas</h1>
        <Link to="/notas/nueva" className="btn btn-primary">
          <FaPlus className="icon-left" /> Nueva Nota
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="loading">Cargando notas...</div>
      ) : notas.length === 0 ? (
        <div className="empty-state">
          <p>No hay notas disponibles. ¡Crea tu primera nota!</p>
          <Link to="/notas/nueva" className="btn btn-primary">
            <FaPlus className="icon-left" /> Nueva Nota
          </Link>
        </div>
      ) : (
        <div className="grid">
          {notas.map((nota) => (
            <NotaCard key={nota.id} nota={nota} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

export default NotasPage
