import React from 'react'; // Agrega esta línea
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import NotasPage from "./pages/NotasPage"
import AvisosPage from "./pages/AvisosPage"
import NotaForm from "./components/NotaForm"
import AvisoForm from "./components/AvisoForm"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notas" element={<NotasPage />} />
            <Route path="/notas/nueva" element={<NotaForm />} />
            <Route path="/notas/editar/:id" element={<NotaForm />} />
            <Route path="/avisos" element={<AvisosPage />} />
            <Route path="/avisos/nuevo" element={<AvisoForm />} />
            <Route path="/avisos/editar/:id" element={<AvisoForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
