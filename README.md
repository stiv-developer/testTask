# Proyecto: API de Tareas con Node.js y MongoDB
## Descripción
Este proyecto es una API REST para gestionar tareas, creada con **Node.js**, **Express** y **MongoDB**. Permite crear, leer, actualizar y eliminar tareas en una base de datos NoSQL.


## Requisitos
- **Node.js** 
- **MongoDB**

# Instalación

1. Clona el repositorio

   ```console
   git clone https://github.com/stiv-developer/testTask.git
   ```

2. Ir al directorio del proyecto

  cd nombre-del-proyecto

3. Instalar dependencias

  ```
  npm install
  ```

4. Asegurar que esta corriendo MongoDB

5. Iniciar el servidor

   ```
   npm start
   ```

El servidor estará corriendo en http://localhost:3000

## Endpoints de la API

| Method  | URL                                 | Descripción                       |
|---------|-------------------------------------|-----------------------------------|
|`GET`    |`http://localhost:3000/tasks`        | Obtener todas las tareas          |
|`GET`    |`http://localhost:3000/tasks/:id`    | Obtener tarea por id              |
|`GET`    |`http://localhost:3000/filter-tasks` | Buscar tarea por titulo o estado  |
|`POST`   |`http://localhost:3000/tasks`        | Registrar tarea                   |
|`PUT`    |`http://localhost:3000/tasks/:id`    | Actualizar tarea                  |
|`DELETE` |`http://localhost:3000/tasks/:id`    | Eliminar tarea                    |

Curl con POSTMAN
https://documenter.getpostman.com/view/13313714/2sAXxQcWbb