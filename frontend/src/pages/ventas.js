import { ventasService } from '../services/ventasService.js';

let carrito = [];
let productos = [];
let valorUF = 0;
let totalesActuales = { neto: 0, iva: 0, bruto: 0 }; // Estado para el pago

const contenedorProductos = document.getElementById('contenedor-productos');
const listaCarrito = document.getElementById('lista-carrito');
const totalNetoEl = document.getElementById('total-neto');
const totalIvaEl = document.getElementById('total-iva');
const totalBrutoEl = document.getElementById('total-bruto');
const btnPagar = document.getElementById('btn-pagar');
const mensajePago = document.getElementById('mensaje-pago');

document.addEventListener('DOMContentLoaded', async () => {
    if (!localStorage.getItem('medistock_token')) {
        alert("Acceso denegado. Debes iniciar sesión.");
        window.location.href = './login.html';
        return;
    }
    
    contenedorProductos.innerHTML = '<p>Cargando sistema...</p>';

    try {
        // Ejecutamos ambas peticiones al mismo tiempo
        const [datosProductos, datosIndicadores] = await Promise.all([
            ventasService.obtenerProductos(),
            ventasService.obtenerIndicadores()
        ]);
        
        productos = datosProductos;
        valorUF = datosIndicadores.uf;
        
        document.getElementById('texto-uf').textContent = `Valor UF hoy: $${valorUF}`;
        renderizarCatalogo();
    } catch (error) {
        contenedorProductos.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
});

const renderizarCatalogo = () => {
    contenedorProductos.innerHTML = productos.map(prod => {
        // El precio base viene del backend o fijamos 5000 de prueba
        const precio = prod.precio || 5000; 
        const equivalenciaUF = (precio / valorUF).toFixed(2);

        return `
        <div class="producto-card">
            <h4 style="margin: 0 0 5px 0; color: var(--color-secundario);">${prod.nombre}</h4>
            <p style="color: #94a3b8; font-size: 13px; margin-bottom: 15px;">Stock: ${prod.stock || 'Disponible'}</p>
            
            <p style="color: var(--color-primario); font-weight: bold; font-size: 20px; margin: 0;">$${precio}</p>
            <p style="color: #64748b; font-size: 12px; margin-top: 0; margin-bottom: 15px;">~ ${equivalenciaUF} UF</p>
            
            <button onclick="window.agregarAlCarrito(${prod.id}, '${prod.nombre}', ${precio})" style="width: 100%;">Agregar</button>
        </div>
        `;
    }).join('');
};

window.agregarAlCarrito = (id, nombre, precio) => {
    const item = carrito.find(i => i.id === id);
    if (item) item.cantidad++;
    else carrito.push({ id, nombre, precio, cantidad: 1 });
    actualizarCarrito();
};

const actualizarCarrito = () => {
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p style="text-align: center; color: #94a3b8; margin: 30px 0;">El carrito está vacío</p>';
        totalNetoEl.textContent = '$0';
        totalIvaEl.textContent = '$0';
        totalBrutoEl.textContent = '$0';
        btnPagar.disabled = true;
        return;
    }

    let neto = 0;
    listaCarrito.innerHTML = carrito.map(item => {
        const subtotal = item.precio * item.cantidad;
        neto += subtotal;
        return `
            <div class="item-carrito">
                <span style="color: var(--color-secundario); font-weight: 500;">${item.cantidad}x ${item.nombre}</span>
                <span style="color: #64748b;">$${subtotal}</span>
            </div>
        `;
    }).join('');

    // Cálculos tributarios
    const iva = Math.round(neto * 0.19);
    const bruto = neto + iva;

    // Actualizamos el estado global
    totalesActuales = { neto, iva, bruto };

    totalNetoEl.textContent = `$${neto}`;
    totalIvaEl.textContent = `$${iva}`;
    totalBrutoEl.textContent = `$${bruto}`;
    btnPagar.disabled = false;
};

// Flujo de Transbank
btnPagar.addEventListener('click', async () => {
    btnPagar.disabled = true;
    btnPagar.textContent = 'Conectando con banco...';
    mensajePago.textContent = '';

    try {
        // Obtenemos los datos del usuario logueado
        const usuario = JSON.parse(localStorage.getItem('medistock_usuario'));

        const payloadVenta = {
            venta: {
                valor_total_impuesto: totalesActuales.iva,
                valor_total_neto: totalesActuales.neto,
                valor_total_bruto: totalesActuales.bruto,
                prioridad_urgencia_medica: false,
                id_usuario: usuario.id,
                id_tipo_documento: 1,
                id_estado_pago: 1 // 1: Pendiente
            },
            detalles: carrito.map(item => ({
                id_producto: item.id,
                cantidad: item.cantidad,
                valor_unidad: item.precio,
                valor_total: item.precio * item.cantidad,
                id_impuesto: 1,
                id_bodega: 1
            }))
        };

        // 1. Registrar venta en PostgreSQL
        const resultadoVenta = await ventasService.procesarVenta(payloadVenta);
        
        // 2. Pedir Token a Transbank
        const transaccion = await ventasService.iniciarPagoTransbank(totalesActuales.bruto, resultadoVenta.id_venta);

        // 3. Limpiar y Redirigir
        carrito = [];
        window.location.href = `${transaccion.url}?token_ws=${transaccion.token}`;

    } catch (error) {
        btnPagar.disabled = false;
        btnPagar.textContent = 'Confirmar y Pagar';
        mensajePago.textContent = error.message;
    }
});

document.getElementById('btn-cerrar-sesion').addEventListener('click', () => {
    localStorage.removeItem('medistock_token');
    localStorage.removeItem('medistock_usuario');
    window.location.href = '../index.html';
});