import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importar cors
import * as dotenv from 'dotenv';

// Importar rutas de módulos
import diccionaryRoutes from './diccionary/routes/diccionaryRoutes';
import commentRoutes from './clima/routes/commentRoutes';

// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar CORS
app.use(cors());

// Rutas de los módulos
app.use('/api/diccionario', diccionaryRoutes)
app.use('/api/comentario', commentRoutes
  
)

// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
