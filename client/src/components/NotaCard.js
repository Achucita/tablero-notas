import React from 'react'; // Agrega esta línea
//"use client"
import { Link } from "react-router-dom"
import { FaEdit, FaTrash } from "react-icons/fa"
import "./NotaCard.css"

const NotaCard = ({ nota, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="nota-card" style={{ backgroundColor: nota.color || "#ffffff" }}>
      <div className="nota-header">
        <h3>{nota.titulo}</h3>
        <div className="nota-actions">
          <Link to={`/notas/editar/${nota.id}`} className="btn-icon">
            <FaEdit />
          </Link>
          <button onClick={() => onDelete(nota.id)} className="btn-icon delete">
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="nota-body">
        <p>{nota.contenido}</p>
      </div>
      <div className="nota-footer">
        <small>Creada: {formatDate(nota.fecha_creacion)}</small>
      </div>
    </div>
  )
}

export default NotaCard
