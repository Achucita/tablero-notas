import React from 'react'; // Agrega esta línea
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Tablero de Avisos y Notas. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
