Proyecto MEDISTOCK - API RESTful

## Descripción
El objetivo de la API es centralizar y automatizar el flujo de información entre el inventario, los proveedores y los clientes. Funciona como el motor del sistema, permitiendo que la plataforma gestione pedidos y consulte existencias en tiempo real de forma eficiente y segura.

**Problemas que resuelve:**

* **Desfase de stock:** Elimina errores de inventario, asegurando que solo se venda lo que realmente está disponible.
* **Procesos manuales:** Automatiza la recepción y validación de órdenes, reduciendo los tiempos de espera y la carga administrativa.
* **Falta de visibilidad:** Proporciona trazabilidad completa, permitiendo conocer el estado exacto de cada pedido desde que se solicita hasta que se entrega.
* **Agilización del sistema de pagos:** Integración de pago directo mediante webpay plus
* **Agilización de gestión de despachos:** Integración con courier directo para tiempos estimados de despacho y costos.
## Stack Tecnológico
* **Lenguaje:** JavaScript (ES6+), HTML5, CSS3.
* **Framework:** Express.js y Bootstrap, NODE.js.
* **Modelamiento Base de Datos:** dbdiagram.io
* **Base de Datos:** PostgreSQL 16 alojada en máquina virtual ubuntu.
* **Herramientas de Construcción:** npm y Vite.

## Estructura de Carpetas

* `backend/`: Contiene todos los archivos relacionados al backend del proyecto.
    * `scripts/`: Contiene los scripts SQL DDL para la creación de la base de datos en la máquina virtual con Ubuntu.
    * `src/`: Contiene toda la lógica de programación de la API.
        * `config/`: Configuración y conexión a la Base de Datos (db.js)
        * `routes/`: Definición de los endpoints y verbos HTTP (rutas como POST /api/registro).
        * `controllers/`: Intermediarios que reciben las peticiones HTTP y envían respuestas al cliente.
        * `services/`: Lógica de negocio (encriptación, validaciones, generación de tokens).
        * `repositories/`: Acceso directo a los datos y ejecución de consultas SQL en PostgreSQL.
        * `app.js`: Configuración inicial de Express, Middlewares y CORS.
* `frontend/`: Contiene la interfaz gráfica y la interacción con el usuario.
    * `src/`: Contiene el código fuente modularizado del cliente.
        * `services/`: Funciones aisladas para conectar con los endpoints del backend (ej. authService.js).
        * `components/`: Piezas visuales reutilizables (formularios, botones, tablas).
        * `pages/`: Vistas completas que ensamblan los componentes (ej. Login, Registro, Dashboard).
    * `app.js`: Punto de entrada que inicializa el enrutamiento visual del frontend.
* `docs/`: Contiene la documentación, evidencias e imágenes del proyecto.
* `.gitignore`: Contiene archivos y carpetas excluidos del control de versiones.
* `index.js`: Punto de entrada oficial que enciende el servidor.

## Configuración e Instalación
1. Clonar el repositorio.
2. Configurar el archivo de propiedades (database, puerto).
3. Ejecutar el comando de arranque del framework (npm run start).

## Documentación de Arquitectura (Modelo 4+1)
Acceso a los diagramas de despliegue, comunicación y paquetes:
* [[Carpeta Compartida de Diagramas](https://drive.google.com/drive/folders/1F0yQQnj96hQQdklM_RN8WgjTxwys6xyc?usp=sharing)]

## Pruebas de API
* **Postman:**
* **Newman:**