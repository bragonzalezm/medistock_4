Proyecto MEDISTOCK - API RESTful

## Descripción
El objetivo de la API es centralizar y automatizar el flujo de información entre el inventario, los proveedores y los clientes. Funciona como el motor del sistema, permitiendo que la plataforma gestione pedidos y consulte existencias en tiempo real de forma eficiente y segura.

**Problemas que resuelve:**

* **Desfase de stock:** Elimina errores de inventario, asegurando que solo se venda lo que realmente está disponible.
* **Procesos manuales:** Automatiza la recepción y validación de órdenes, reduciendo los tiempos de espera y la carga administrativa.
* **Falta de visibilidad:** Proporciona trazabilidad completa, permitiendo conocer el estado exacto de cada pedido desde que se solicita hasta que se entrega.

## Stack Tecnológico
* **Lenguaje:** JavaScript (ES6+), HTML5, CSS3.
* **Framework:** Express.js y Bootstrap.
* **Base de Datos:** PostgreSQL 16 alojada en máquina virtual ubuntu.
* **Herramientas de Construcción:** npm y Vite.

## Estructura de Carpetas
* `src/`: Contiene toda la lógica de programación de la aplicación.
* `docs/`: Contiene la documentación del proyecto.
* `Scripts/`: Contiene los scripts SQL DDL para la creación de la base de datos en la máquina virtual con Ubuntu.
* `.gitignore`: Contiene archivos y carpetas excluidos del control de versiones.

## Configuración e Instalación
1. Clonar el repositorio.
2. Configurar el archivo de propiedades (database, puerto).
3. Ejecutar el comando de arranque del framework.

## Documentación de Arquitectura (Modelo 4+1)
Acceso a los diagramas de despliegue, comunicación y paquetes:
* [[Carpeta Compartida de Diagramas](https://drive.google.com/drive/folders/1F0yQQnj96hQQdklM_RN8WgjTxwys6xyc?usp=sharing)]

## Pruebas de API
* **Postman:**