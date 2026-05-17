-- Roles para inicio de sesión
INSERT INTO rol_usuario ("nombre", "descripcion") VALUES
('Paciente','Cliente paciente particular con hospitalización en casa.'),
('Administrativo','Funcionario de medistock capaz de realizar reportes de movimientos, historiales de compra y venta'),
('Ejecutivo de ventas','Promotor de medistock, puede hacer descuentos, hacer compras en nombre de usuarios clinica o particulares'),
('Operador Logístico','Encargado del inventario, ingreso y despacho de los productos'),
('Analista','Encargado de analizar los datos financieros de medistock'),
('Administrador','Encargado de la plataforma medistock'),
('Institución (Clínica)','Cliente corporativo encargado de comprar a nombre de la empresa');

-- Estado de seguimiento del despacho
INSERT INTO "estado_seguimiento" ("nombre", "descripcion") VALUES
('En preparación', 'Pedido en estado de preparación por parte del equipo de bodegas'),
('Listo para envío', 'Pedido está preparado listo para ser retirado por el courier'),
('Enviado', 'Pedido fue retirado por el courier y está siendo gestionado por ellos'),
('Entregado', 'Pedido fue entregado exitosamente');

-- Tipo cliente 
INSERT INTO "tipo_cliente" ("nombre", "porcentaje_utilidad") VALUES
('Institución (Clínica)', 15),
('Hospitalización domiciliaria', 30);

-- Tipo medición
INSERT INTO "tipo_medicion" ("nombre", "descripcion") VALUES
('gr', 'Gramos'),
('kg', 'Kilogramo'),
('mg', 'Miligramo'),
('mL', 'Mililitro'),
('L', 'Litro'),
('u', 'Unidad'),
('cm', 'Centímetro'),
('m', 'Metro'),
('mm', 'Milímetro'),
('cc', 'Centímetro cúbico'),
('gal', 'Galón'),
('cj', 'Caja'),
('paq', 'Paquete'),
('rll', 'Rollo'),
('bl', 'Blíster');

-- Categoría de producto ej: insumo, máquina, guantes etc
INSERT INTO "categoria" ("nombre", "descripcion") VALUES
('Medicamentos', '(sueros, analgésicos, antibióticos, medicamentos, etc.)'),
('Insumos desechables', 'Material de un solo uso (jeringas, gasas, guantes, mascarillas, catéteres, etc.)'),
('Equipamiento clínico', 'Aparatos electrónicos, maquinaria y mobiliario médico (saturómetros, monitores de signos vitales, camas clínicas, etc.)'),
('Higiene y desinfección', 'Productos para la sanitización y limpieza de espacios clínicos y esterilización del personal (alcohol, jabón quirúrgico, amonio cuaternario, etc.)'),
('Instrumento médico', 'Herramientas reutilizables para procedimientos y curaciones (pinzas, tijeras quirúrgicas, esterilizadores, etc.)'),
('Ortopedia y rehabilitación', 'Artículos para soporte físico y recuperación motora (sillas de ruedas, bastones, órtesis, vendas kinesiológicas, etc.)');

-- tipo documento ej: boleta o factura
INSERT INTO "tipo_documento" ("nombre") VALUES
('Boleta electrónica'),
('Factura electrónica'),
('Guia de despacho')
('Nota de crédito');

-- estado pago
INSERT INTO "estado_pago" ("nombre", "descripcion") VALUES
('Pendiente', 'Transacción pendiente de validación.'),
('Aprobado', 'Transacción validada correctamente.'),
('Rechazado', 'Transacción rechazada');

--Tipo despacho si es urgente o envío normal
INSERT INTO "tipo_despacho" ("nombre", "descripcion") VALUES
('Urgencia crítica', 'El envío debe ser realizado lo antes posible a través de medios de transportes disponibles.'),
('Despacho normal', 'Procedimiento regular para el envío a través del courier.'),
('Retiro en bodega', 'El cliente o un tercero retirará personalmente los productos en la bodega correspondiente.');

--Impuestos
INSERT INTO "impuesto" ("nombre", "porcentaje", "descripcion") VALUES
('IVA', 19, 'Impuesto al valor agregado.'),
('Exento', 0, 'Sin impuestos.');

--Bodegas
INSERT INTO "bodega" ("nombre", "dirección", "id_comuna") VALUES
('Bodega Matriz Providencia', 'Av. Andrés Bello 2425', (SELECT "id" FROM "comuna" WHERE "nombre" = 'Providencia')),
('Centro de distribución Renca', 'Av. Miraflores 8953', (SELECT "id" FROM "comuna" WHERE "nombre" = 'Renca')),
('Centro de distribución San Bernardo', 'Freire 867', (SELECT "id" FROM "comuna" WHERE "nombre" = 'San Bernardo')),
('Centro de distribución Concepción', 'Barros Arana 1068', (SELECT "id" FROM "comuna" WHERE "nombre" = 'Concepción')),
('Centro de distribución Puerto Montt', 'Antonio Varas 502', (SELECT "id" FROM "comuna" WHERE "nombre" = 'Puerto Montt'));