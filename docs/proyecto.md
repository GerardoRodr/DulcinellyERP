# Resumen del Proyecto: Sistema Web de Control de Inventario para DulciNelly S.A.C.

**Objetivo Central:** Desarrollar una aplicación web centralizada para gestionar la logística y el almacén de la pastelería DulciNelly S.A.C.. El sistema busca reemplazar los métodos manuales, sincronizar la información en tiempo real entre las sedes de Trujillo y Huanchaco, prevenir quiebres de stock y reducir la carga cognitiva del personal.

## Directrices Generales de UX/UI y Accesibilidad para todo el sistema
Antes de diseñar cada pantalla, debes asegurar que toda la aplicación cumpla con los siguientes Requerimientos No Funcionales (RNF) y métricas de usabilidad:
*   **Velocidad:** Las consultas deben cargar en menos de 3 segundos (RNF03) y las transacciones procesarse en menos de 2 segundos (RNF04).
*   **Accesibilidad (WCAG):** Toda la interfaz debe ser navegable con soporte para lectores de pantalla (etiquetas semánticas HTML5), permitir aumento de fuente hasta 200%, y asegurar alto contraste visual.
*   **Prevención de Errores:** Validar siempre los campos obligatorios antes de enviar formularios y usar mensajes de error claros (RNF01).

---

## Arquitectura de Interfaces del Sistema

### 1. Interfaz de Autenticación (Login)
*   **Requerimientos asociados:** HU08, RNF08.
*   **Objetivo:** Controlar el acceso al sistema garantizando la seguridad y dirigiendo al usuario a su vista correspondiente según su rol (Administrador, Jefe de Logística u Operario de Almacén).
*   **Elementos de la Interfaz:**
    *   Formulario simple: Campos para "Usuario" y "Contraseña" cifrada.
    *   Botón principal de "Ingresar".
*   **Reglas y Validaciones:**
    *   Debe validar las credenciales contra la base de datos y cargar los permisos correspondientes (RN07).
    *   **UX:** Mantener la pantalla limpia para evitar carga cognitiva innecesaria.

### 2. Interfaz Principal: Dashboard (Panel de Control Multisucursal)
*   **Requerimientos asociados:** HU05, HU06, RNF05, RN03, RN04.
*   **Objetivo:** Ser la pantalla de inicio tras el login. Para el Administrador (como "Carlos"), debe mostrar una vista global del estado del negocio en tiempo real. Para el operario de almacén (como "Rosa"), solo debe mostrar su sucursal.
*   **Elementos de la Interfaz:**
    *   **Selector de Sucursal (Filtro):** Un menú desplegable para alternar entre "Trujillo" y "Huanchaco" (si el rol lo permite).
    *   **Módulo de Alertas de Stock Mínimo (Crucial):** Una sección destacada que muestre los insumos críticos.
    *   **Resumen Rápido:** Tarjetas (*cards*) con métricas clave (ej. Total de entradas hoy, salidas hoy).
*   **Reglas y Validaciones:**
    *   **Accesibilidad en Alertas:** Para cumplir con el principio de *afordancia* y soporte para daltonismo (RNF05), las alertas por stock bajo no deben depender solo del color rojo; deben incluir un ícono de advertencia (⚠️) y texto descriptivo.

### 3. Interfaz de Gestión de Catálogo (Productos e Insumos)
*   **Requerimientos asociados:** HU01, HU02, HU03, RN01, RN06.
*   **Objetivo:** Permitir registrar, editar y buscar rápidamente cualquier insumo o producto terminado en la base de datos.
*   **Elementos de la Interfaz:**
    *   **Tabla de Datos (DataGrid):** Lista de insumos con columnas para: ID, Nombre, Tipo, Unidad de Medida y Stock Mínimo.
    *   **Barra de Búsqueda y Filtros:** Para encontrar insumos rápidamente (RNF03).
    *   **Modal/Formulario de "Nuevo Insumo" y "Editar Insumo":**
        *   Input de texto: Nombre del insumo.
        *   Select (Desplegable): Tipo (Materia prima, producto terminado).
        *   Select: Unidad de medida estandarizada (kg, litros, unidades).
        *   Input numérico: Nivel de stock mínimo para disparar alertas.
*   **Reglas y Validaciones:**
    *   Todos los campos son obligatorios (RN01). El botón de "Guardar" debe estar deshabilitado hasta que se llenen correctamente (protección contra errores - RNF01, RNF02).

### 4. Interfaz de Registro de Movimientos (Entradas y Salidas)
*   **Requerimientos asociados:** HU04, HU07, HU09, RN02, RN05, RN08, RNF09.
*   **Objetivo:** Es la pantalla de uso diario del operario de almacén (Escenario de "Rosa") para registrar cuando un insumo llega al local o sale hacia la cocina.
*   **Elementos de la Interfaz:**
    *   Botones tipo *Tab* para seleccionar el tipo de movimiento: "Registrar Entrada" o "Registrar Salida".
    *   **Buscador predictivo:** Para seleccionar el insumo a mover sin tener que escribir todo el nombre (reduce la carga cognitiva).
    *   Input numérico: Cantidad a mover.
    *   Input de texto/Select: Motivo del movimiento.
    *   **Input Condicional (Solo para Salidas):** Campo obligatorio para ingresar o seleccionar el "Número de Orden de Producción" (HU09).
*   **Reglas y Validaciones:**
    *   El sistema debe inyectar automáticamente el "Usuario" actual y la "Fecha/Hora" en el registro (RN05).
    *   Si es una salida, el sistema debe bloquear el registro si no se proporciona una orden de producción válida (RN08, RNF09).
    *   Al guardar, el stock del producto debe recalcularse en la base de datos de manera automática (HU04, RN02).

### 5. Interfaz de Reportes e Historial (Auditoría)
*   **Requerimientos asociados:** HU10, RN10, RNF07, RNF10.
*   **Objetivo:** Permitir a los perfiles administrativos consultar la trazabilidad de todos los movimientos de inventario.
*   **Elementos de la Interfaz:**
    *   Filtros de rango de fechas (Fecha de inicio y fin).
    *   Filtro por sucursal y por usuario.
    *   Tabla de historial detallado (Fecha, Producto, Cantidad, Tipo de Movimiento, Usuario, Motivo, Orden de producción).
    *   Botón para "Exportar Reporte" (ej. en PDF o Excel).
*   **Reglas y Validaciones:**
    *   Esta interfaz es **de solo lectura**. Los movimientos listados aquí no pueden ser eliminados ni editados bajo ninguna circunstancia (RNF07) para garantizar auditorías transparentes por los próximos 5 años (RNF10).

**Consejo para el desarrollo:** El proyecto sera un **"Single Page Application" (SPA)** utilizando Angular, acompañados de una librería de componentes visuales (como Material-UI o spartan.ng). Esto ayudará a cumplir fácilmente con las métricas de respuesta menores a 3 segundos (RNF03) y a mantener un diseño consistente e intuitivo para el personal de DulciNelly.