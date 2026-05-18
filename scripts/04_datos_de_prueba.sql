-- ==============================================================================
-- DATOS DE PRUEBA: CATÁLOGO Y USUARIOS (Para pruebas GET en Postman)
-- ==============================================================================

-- 1. Inserción de Productos de Prueba
-- Asume: id_categoria (1 = Medicamentos, 2 = Insumos) | id_tipo_medicion (1 = Caja, 2 = Unidad)
INSERT INTO "producto" ("nombre", "codigo_barras", "id_categoria", "id_tipo_medicion") VALUES
('Caja de jeringas desechables 5ml 100 unidades', '7800987654321', 2, 2),
('caja de Suero Fisiológico 250ml 16 unidades', '7801122334455', 1, 2);

-- 2. Inserción de Usuarios de Prueba
-- Asume: id_rol_usuario (1 = Administrador, 2 = Ejecutivo de Ventas)
-- Nota: En un entorno real, las contraseñas deben ir encriptadas (ej. con bcrypt).
INSERT INTO "usuario" ("nombre_usuario", "contrasena", "correo_electronico", "telefono", "id_rol_usuario") VALUES
('admin', 'admin', 'admin@medistock.cl', '+56911223344', 6),
('brandon', '1234', 'brandon@medistock.cl', '+56955667788', 1);