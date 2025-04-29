import React from 'react'; // Agrega esta línea
//"use client"
import { Link } from "react-router-dom"
import { FaEdit, FaTrash } from "react-icons/fa"
import "./AvisoCard.css"

const AvisoCard = ({ aviso, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="aviso-card">
      <div className="aviso-header">
        <h3>{aviso.titulo}</h3>
        <div className="aviso-actions">
          <Link to={`/avisos/editar/${aviso.id}`} className="btn-icon">
            <FaEdit />
          </Link>
          <button onClick={() => onDelete(aviso.id)} className="btn-icon delete">
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="aviso-body">
        <p>{aviso.contenido}</p>
      </div>
      <div className="aviso-footer">
        <small>Publicado: {formatDate(aviso.fecha_creacion)}</small>
      </div>
    </div>
  )
}

export default AvisoCard
