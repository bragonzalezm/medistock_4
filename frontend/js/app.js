// Referencias a los elementos del HTML
const contenedorPrincipal = document.getElementById('app-container');
const btnNavLogin = document.getElementById('nav-login');
const btnNavCatalogo = document.getElementById('nav-catalogo');
const btnNavCarrito = document.getElementById('nav-carrito');
const btnNavLogistica = document.getElementById('nav-logistica');

// Estado de la aplicación en memoria
let carrito = [];
let productosDisponibles = [];

// ==========================================
// 1. MÓDULO DE LOGIN
// ==========================================
const cargarVistaLogin = () => {
    contenedorPrincipal.innerHTML = `
        <div class="row justify-content-center mt-5">
            <div class="col-md-6 col-lg-4">
                <div class="card shadow-sm border-0">
                    <div class="card-body p-4">
                        <h3 class="text-center mb-4 text-primary">Iniciar Sesión</h3>
                        <form id="form-login">
                            <div class="mb-3">
                                <label class="form-label text-muted small fw-bold">Correo Electrónico</label>
                                <input type="email" id="login-correo" class="form-control" required placeholder="ejemplo@paciente.cl">
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-muted small fw-bold">Contraseña</label>
                                <input type="password" id="login-pass" class="form-control" required>
                            </div>
                            
                            <div id="login-error" class="text-danger mb-3 d-none small"></div>
                            
                            <button type="submit" class="btn btn-primary w-100 fw-bold py-2">Entrar a Medistock</button>
                            
                            <div class="text-center mt-3 border-top pt-3">
                                <a href="#" id="link-ir-registro" class="text-decoration-none small text-primary fw-bold">¿No tienes cuenta? Regístrate aquí</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Evento para saltar a la vista de Registro
    document.getElementById('link-ir-registro').addEventListener('click', (e) => {
        e.preventDefault();
        cargarVistaRegistro();
    });

    // Evento para procesar el Login
    document.getElementById('form-login').addEventListener('submit', async (e) => {
        e.preventDefault();
        const correo = document.getElementById('login-correo').value;
        const contrasena = document.getElementById('login-pass').value;
        const msjError = document.getElementById('login-error');

        try {
            const credenciales = await api.post('/usuarios/login', { correo_electronico: correo, contrasena: contrasena });
            api.guardarSesion(credenciales);
            alert(`Bienvenido a Medistock, ${credenciales.usuario.nombre}`);
            
            // Validación de Rol para mostrar el botón logístico
            const contenedorLogistica = document.getElementById('contenedor-logistica');
            if (credenciales.usuario.id_rol_usuario === 4) { 
                contenedorLogistica.classList.remove('d-none');
            } else {
                contenedorLogistica.classList.add('d-none');
            }

            cargarVistaCatalogo(); 
        } catch (error) {
            msjError.textContent = error.message;
            msjError.classList.remove('d-none');
        }
    });
};

// ==========================================
// 2. MÓDULO DE REGISTRO DE USUARIO
// ==========================================
const cargarVistaRegistro = () => {
    contenedorPrincipal.innerHTML = `
        <div class="row justify-content-center mt-5">
            <div class="col-md-6 col-lg-4">
                <div class="card shadow-sm border-0">
                    <div class="card-body p-4">
                        <h3 class="text-center mb-4 text-primary">Crear Cuenta</h3>
                        <form id="form-registro">
                            <div class="mb-3">
                                <label class="form-label text-muted small fw-bold">Nombre Completo</label>
                                <input type="text" id="reg-nombre" class="form-control" placeholder="Ej: Juan Pérez" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-muted small fw-bold">Correo Electrónico</label>
                                <input type="email" id="reg-correo" class="form-control" placeholder="correo@ejemplo.com" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label text-muted small fw-bold">Contraseña</label>
                                <input type="password" id="reg-pass" class="form-control" required>
                            </div>
                            
                            <div id="reg-error" class="alert alert-danger d-none small"></div>
                            <div id="reg-exito" class="alert alert-success d-none small"></div>
                            
                            <button type="submit" class="btn btn-primary w-100 fw-bold py-2">Registrarse</button>
                            
                            <div class="text-center mt-3 border-top pt-3">
                                <a href="#" id="link-volver-login" class="text-decoration-none small text-secondary">¿Ya tienes cuenta? Inicia sesión aquí</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Evento para volver al login
    document.getElementById('link-volver-login').addEventListener('click', (e) => {
        e.preventDefault();
        cargarVistaLogin();
    });

    // Evento para procesar el formulario de Registro
    document.getElementById('form-registro').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('reg-nombre').value;
        const correo = document.getElementById('reg-correo').value;
        const contrasena = document.getElementById('reg-pass').value;
        const msjError = document.getElementById('reg-error');
        const msjExito = document.getElementById('reg-exito');

        msjError.classList.add('d-none');
        msjExito.classList.add('d-none');

        try {
            await api.post('/usuarios/registro', { 
                nombre: nombre, 
                correo_electronico: correo, 
                contrasena: contrasena 
            });
            
            msjExito.textContent = '✅ Cuenta creada exitosamente. Ya puedes iniciar sesión.';
            msjExito.classList.remove('d-none');
            document.getElementById('form-registro').reset();
            
        } catch (error) {
            msjError.textContent = error.message;
            msjError.classList.remove('d-none');
        }
    });
};
// ==========================================
// 2. MÓDULO DEL CATÁLOGO (CON MINDICADOR)
// ==========================================
const cargarVistaCatalogo = async () => {
    contenedorPrincipal.innerHTML = `<div class="text-center mt-5"><div class="spinner-border text-primary"></div><p class="mt-2 text-muted">Cargando inventario e indicadores financieros...</p></div>`;

    try {
        // Pedimos los productos y el valor de la UF a tu backend simultáneamente
        const [productos, indicadores] = await Promise.all([
            api.get('/productos'),
            api.get('/indicadores')
        ]);
        
        productosDisponibles = productos;
        
        let htmlGrilla = `
            <div class="d-flex justify-content-between align-items-end mb-4 border-bottom pb-2">
                <h2 class="mb-0">Catálogo de Productos</h2>
                <small class="text-muted fw-bold">Valor UF hoy: $${indicadores.uf}</small>
            </div>
            <div class="row g-4">
        `;

        productosDisponibles.forEach(prod => {
            const precioSimulado = 5000; 
            
            // Calculamos la equivalencia en UF, fijando a 2 decimales
            const equivalenciaUF = (precioSimulado / indicadores.uf).toFixed(2);
            
            htmlGrilla += `
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100 shadow-sm border-0">
                        <div class="card-body">
                            <span class="badge bg-secondary mb-2">${prod.nombre_categoria}</span>
                            <h5 class="card-title fw-bold text-dark">${prod.nombre}</h5>
                            <p class="card-text text-muted small mb-1">Cód: ${prod.codigo_barras}</p>
                            
                            <div class="mt-3">
                                <h5 class="text-success mb-0">$${precioSimulado} CLP</h5>
                                <p class="text-muted small fw-bold mb-0">~ ${equivalenciaUF} UF</p>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent border-top-0 pt-3">
                            <button class="btn btn-outline-primary w-100" onclick="agregarAlCarrito(${prod.id}, '${prod.nombre}', ${precioSimulado})">
                                Agregar al pedido
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        contenedorPrincipal.innerHTML = htmlGrilla + `</div>`;
    } catch (error) {
        contenedorPrincipal.innerHTML = `<div class="alert alert-danger mt-5">Error de conexión: ${error.message}</div>`;
    }
};

// ==========================================
// 3. MÓDULO DEL CARRITO Y CHECKOUT
// ==========================================
window.agregarAlCarrito = (id, nombre, precio) => {
    const itemExistente = carrito.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }
    btnNavCarrito.textContent = `🛒 Carrito (${carrito.reduce((acc, item) => acc + item.cantidad, 0)})`;
};

// ==========================================
// FUNCIÓN PARA MODIFICAR LA CANTIDAD (Si aún no la tienes, ponla arriba del carrito)
// ==========================================
const modificarCantidadCarrito = (idProducto, variacion) => {
    const producto = carrito.find(p => p.id === idProducto);
    if (producto) {
        producto.cantidad += variacion;
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(p => p.id !== idProducto);
        }
    }
    cargarVistaCarrito(); 
};

// ==========================================
// VISTA DEL CARRITO CON IMPUESTOS Y BOTONERA
// ==========================================
const cargarVistaCarrito = () => {
    if (carrito.length === 0) {
        contenedorPrincipal.innerHTML = `<div class="text-center mt-5"><h3>Tu carrito está vacío</h3></div>`;
        return;
    }

    let totalNeto = 0;
    let htmlTabla = `
        <h2 class="mb-4 border-bottom pb-2">Resumen de tu Pedido</h2>
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead class="table-light">
                    <tr>
                        <th>Producto</th>
                        <th>Precio Un.</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
    `;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalNeto += subtotal;
        
        htmlTabla += `
            <tr>
                <td class="fw-bold">${item.nombre}</td>
                <td>$${item.precio}</td>
                <td>
                    <div class="btn-group btn-group-sm shadow-sm" role="group">
                        <button class="btn btn-outline-danger fw-bold px-2" onclick="modificarCantidadCarrito(${item.id}, -1)">-</button>
                        <span class="btn btn-light disabled text-dark px-3 fw-bold border">${item.cantidad}</span>
                        <button class="btn btn-outline-success fw-bold px-2" onclick="modificarCantidadCarrito(${item.id}, 1)">+</button>
                    </div>
                </td>
                <td>$${subtotal}</td>
            </tr>
        `;
    });

    const impuesto = Math.round(totalNeto * 0.19);
    const totalBruto = totalNeto + impuesto;

    htmlTabla += `
                </tbody>
            </table>
        </div>
        <div class="row justify-content-end mt-4">
            <div class="col-md-5 col-lg-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2"><span>Neto:</span> <span>$${totalNeto}</span></div>
                        <div class="d-flex justify-content-between mb-2"><span>IVA (19%):</span> <span>$${impuesto}</span></div>
                        <div class="d-flex justify-content-between mb-3 border-top pt-2 fw-bold fs-5"><span>Total:</span> <span>$${totalBruto}</span></div>
                        <button class="btn btn-success w-100 fw-bold fs-5" onclick="procesarVenta(${totalNeto}, ${impuesto}, ${totalBruto})">Confirmar y Pagar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    contenedorPrincipal.innerHTML = htmlTabla;
};

// La Transacción SQL desde el Frontend
// La Transacción SQL y Redirección a Transbank
window.procesarVenta = async (neto, impuesto, bruto) => {
    // 1. Validar seguridad: El usuario debe estar logueado
    const usuarioString = localStorage.getItem('medistock_usuario');
    if (!usuarioString) {
        alert("Debes iniciar sesión para realizar una compra.");
        cargarVistaLogin();
        return;
    }
    
    const usuario = JSON.parse(usuarioString);

    // 2. Armar la estructura exacta (La venta nace como ESTADO 1: Pendiente)
    const payload = {
        venta: {
            valor_total_impuesto: impuesto,
            valor_total_neto: neto,
            valor_total_bruto: bruto,
            prioridad_urgencia_medica: false,
            id_usuario: usuario.id,
            id_tipo_documento: 1,
            id_estado_pago: 1 
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

    try {
        // 3. Disparar la petición transaccional a PostgreSQL
        const resultadoVenta = await api.post('/ventas', payload);
        
        // 4. Solicitar el enlace de pago a la integración de Transbank
        const transaccion = await api.post('/pagos/iniciar', {
            monto: bruto,
            id_venta: resultadoVenta.id_venta
        });

        // 5. Limpiar el estado local del carrito antes de irnos
        carrito = [];
        btnNavCarrito.textContent = `🛒 Carrito (0)`;

        // 6. Redirigir físicamente al usuario a la URL de Webpay Plus
        window.location.href = `${transaccion.url}?token_ws=${transaccion.token}`;

    } catch (error) {
        alert("Error al procesar el pago: " + error.message);
    }
};
// ==========================================
// 5. MÓDULO LOGÍSTICO (BLUE EXPRESS)
// ==========================================
const cargarVistaLogistica = () => {
    // Validar seguridad estricta: Solo rol 1 (Bodega/Admin) puede entrar
    const usuarioString = localStorage.getItem('medistock_usuario');
    if (!usuarioString) {
        alert("Acceso denegado. Debes iniciar sesión.");
        cargarVistaLogin();
        return;
    }

    const usuario = JSON.parse(usuarioString);
    if (usuario.id_rol !== 1) {
        alert("Acceso restringido. Tu cuenta de cliente no tiene permisos de operador logístico.");
        cargarVistaCatalogo(); // Expulsamos al cliente de vuelta al catálogo
        return;
    }

    // ... (el resto del código HTML del panel se mantiene igual)
    contenedorPrincipal.innerHTML = `
        <div class="row justify-content-center mt-5">
            <div class="col-md-8 col-lg-6">
                <div class="card shadow-sm border-0">
                    <div class="card-header bg-dark text-white p-3">
                        <h4 class="mb-0">📦 Panel de Despacho</h4>
                    </div>
                    <div class="card-body p-4">
                        <p class="text-muted mb-4">Ingresa el ID de una orden de venta aprobada para generar su etiqueta de envío y código de seguimiento (Blue Express).</p>
                        
                        <form id="form-despacho" class="d-flex gap-3 mb-4">
                            <input type="number" id="input-id-venta" class="form-control" placeholder="ID de la Orden (Ej: 17)" required>
                            <button type="submit" class="btn btn-primary fw-bold px-4">Generar Guía</button>
                        </form>

                        <div id="resultado-despacho"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('form-despacho').addEventListener('submit', async (e) => {
        e.preventDefault();
        const idVenta = document.getElementById('input-id-venta').value;
        const divResultado = document.getElementById('resultado-despacho');
        
        divResultado.innerHTML = `<div class="spinner-border text-primary spinner-border-sm"></div> Contactando operador logístico...`;

        try {
            // Se envía la petición POST a tu tabla de seguimiento
            const respuesta = await api.post('/seguimiento', { 
                id_venta: idVenta, 
                empresa_currier: 'Blue Express' 
            });
            
            // Dibujamos la etiqueta de envío con un código QR dinámico
            divResultado.innerHTML = `
                <div class="alert alert-success border-0 shadow-sm mt-3">
                    <h5>✅ Etiqueta Generada Exitosamente</h5>
                    <hr>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <p class="mb-1"><strong>Currier:</strong> Blue Express</p>
                            <p class="mb-1"><strong>Código de Rastreo:</strong> <span class="badge bg-dark fs-6 text-warning">${respuesta.codigo_seguimiento}</span></p>
                            <p class="mb-0"><strong>Estado:</strong> Listo para retiro en bodega</p>
                        </div>
                        <div class="text-center bg-white p-2 rounded border">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${respuesta.codigo_seguimiento}" alt="QR de Envío">
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            divResultado.innerHTML = `<div class="alert alert-danger mt-3">Error al generar despacho: ${error.message}</div>`;
        }
    });
};
// ==========================================
// ASIGNACIÓN DE EVENTOS
// ==========================================
btnNavLogin.addEventListener('click', cargarVistaLogin);
btnNavCatalogo.addEventListener('click', cargarVistaCatalogo);
btnNavCarrito.addEventListener('click', cargarVistaCarrito);

// ==========================================
// 4. INTERCEPTOR DE RESULTADOS DE PAGO
// ==========================================
const verificarEstadoPago = () => {
    // Leemos los parámetros ocultos en la barra de direcciones del navegador
    const parametrosUrl = new URLSearchParams(window.location.search);
    const estadoPago = parametrosUrl.get('pago');
    const orden = parametrosUrl.get('orden');

    if (estadoPago === 'exito') {
        // Pantalla de victoria comercial
        contenedorPrincipal.innerHTML = `
            <div class="text-center mt-5">
                <div class="card shadow border-0 p-5 col-md-8 mx-auto">
                    <h1 class="display-1 text-success mb-3">✅</h1>
                    <h2 class="fw-bold">¡Pago Exitoso!</h2>
                    <p class="lead text-dark mt-2">Tu orden de compra <strong>#${orden}</strong> ha sido aprobada por Transbank.</p>
                    <hr class="my-4">
                    <p class="text-muted small">Tu inventario ha sido actualizado y la venta está registrada en el sistema de Medistock.</p>
                    <button class="btn btn-primary mt-3 w-50 mx-auto fw-bold py-2" onclick="cargarVistaCatalogo()">Volver al Catálogo</button>
                </div>
            </div>
        `;
        // Limpiamos la URL visualmente para que al recargar no se repita el mensaje
        window.history.replaceState({}, document.title, window.location.pathname);
        return true; // Avisamos que sí hubo un pago
        
    } else if (estadoPago === 'rechazado') {
        // Pantalla de fallo bancario
        contenedorPrincipal.innerHTML = `
            <div class="text-center mt-5">
                <div class="card shadow border-0 p-5 col-md-8 mx-auto">
                    <h1 class="display-1 text-danger mb-3">❌</h1>
                    <h2 class="fw-bold">Transacción Rechazada</h2>
                    <p class="lead text-dark mt-2">Hubo un problema procesando tu tarjeta en Webpay Plus.</p>
                    <button class="btn btn-outline-danger mt-3 w-50 mx-auto fw-bold py-2" onclick="cargarVistaCatalogo()">Intentar Nuevamente</button>
                </div>
            </div>
        `;
        window.history.replaceState({}, document.title, window.location.pathname);
        return true;
    }
    
    return false; // Si no hay nada en la URL, retornamos false
};

// ==========================================
// ASIGNACIÓN DE EVENTOS Y ARRANQUE
// ==========================================
btnNavLogin.addEventListener('click', cargarVistaLogin);
btnNavCatalogo.addEventListener('click', cargarVistaCatalogo);
btnNavCarrito.addEventListener('click', cargarVistaCarrito);
btnNavLogistica.addEventListener('click', cargarVistaLogistica);

// ❌ BORRA CUALQUIER "cargarVistaCatalogo();" QUE ESTÉ SUELTO POR AQUÍ ❌

// ✅ LA ÚNICA LÓGICA DE ARRANQUE DEBE SER ESTA:
const vieneDeWebpay = verificarEstadoPago();

if (!vieneDeWebpay) {
    cargarVistaCatalogo();
}