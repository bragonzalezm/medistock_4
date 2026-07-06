INSERT INTO stock_bodega (cantidad, id_bodega, id_producto)
SELECT 100, b.id, p.id
FROM bodega b
CROSS JOIN producto p
ON CONFLICT (id_bodega, id_producto) 
DO UPDATE SET cantidad = stock_bodega.cantidad + EXCLUDED.cantidad;