import React from 'react'; // Agrega esta línea
import { Link } from "react-router-dom"
import { FaStickyNote, FaBullhorn } from "react-icons/fa"
import "./HomePage.css"

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Bienvenido al Tablero de Avisos y Notas</h1>
        <p>Una aplicación simple para gestionar tus avisos y notas personales</p>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">
            <FaStickyNote />
          </div>
          <h2>Notas</h2>
          <p>
            Crea, edita y organiza tus notas personales. Personaliza el color de cada nota para una mejor organización.
          </p>
          <Link to="/notas" className="btn btn-primary">
            Ver Notas
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaBullhorn />
          </div>
          <h2>Avisos</h2>
          <p>Publica y gestiona avisos importantes. Mantén a todos informados con anuncios claros y accesibles.</p>
          <Link to="/avisos" className="btn btn-primary">
            Ver Avisos
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
