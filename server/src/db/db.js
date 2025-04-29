import mysql from "mysql2/promise"

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "tablero_notas",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Pool de conexiones
let pool

// Inicializar la base de datos
export const initDB = async () => {
  try {
    // Crear conexión para inicializar la base de datos
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
    })

    // Crear la base de datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`)

    // Usar la base de datos
    await connection.query(`USE ${dbConfig.database}`)

    // Crear tablas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS avisos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        contenido TEXT NOT NULL,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    await connection.query(`
      CREATE TABLE IF NOT EXISTS notas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        contenido TEXT NOT NULL,
        color VARCHAR(50) DEFAULT '#ffffff',
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Cerrar la conexión inicial
    await connection.end()

    // Crear el pool de conexiones
    pool = mysql.createPool(dbConfig)

    console.log("Base de datos inicializada correctamente")

    return pool
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error)
    throw error
  }
}

// Obtener conexión del pool
export const getConnection = async () => {
  if (!pool) {
    pool = await initDB()
  }
  return pool
}

// Ejecutar consulta
export const query = async (sql, params) => {
  const connection = await getConnection()
  const [results] = await connection.query(sql, params)
  return results
}
