import React from 'react'; // Agrega esta línea
import { Link } from "react-router-dom"
import "./Header.css"

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">
            <Link to="/">Tablero de Avisos y Notas</Link>
          </h1>
          <nav className="nav">
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/notas">Notas</Link>
              </li>
              <li>
                <Link to="/avisos">Avisos</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
