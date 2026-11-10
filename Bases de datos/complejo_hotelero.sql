-- =============================================================================
-- ESQUEMA DE BASE DE DATOS: COMPLEJO HOTELERO
-- Basado en la captura de pantalla T5E2 y el temario (Temas 4 al 8)
-- =============================================================================
-- Este script DDL crea las tablas, claves primarias/foráneas y restricciones
-- (CHECK, UNIQUE, NOT NULL, DEFAULT) para la gestión integral del hotel.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. TABLA: HUESPEDES
-- Almacena la información de los clientes del complejo hotelero.
-- -----------------------------------------------------------------------------
CREATE TABLE HUESPEDES (
    ID_Huesped INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Direccion VARCHAR(200) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    CONSTRAINT PK_HUESPEDES PRIMARY KEY (ID_Huesped),
    CONSTRAINT UQ_HUESPEDES_EMAIL UNIQUE (Email)
);

-- -----------------------------------------------------------------------------
-- 2. TABLA: HABITACIONES
-- Almacena el inventario de habitaciones, su tipo y estado.
-- -----------------------------------------------------------------------------
CREATE TABLE HABITACIONES (
    ID_Habitacion INT NOT NULL,
    Numero_Habitacion VARCHAR(10) NOT NULL,
    Tipo VARCHAR(20) NOT NULL,
    Estado VARCHAR(20) DEFAULT 'disponible' NOT NULL,
    CONSTRAINT PK_HABITACIONES PRIMARY KEY (ID_Habitacion),
    CONSTRAINT UQ_HABITACIONES_NUMERO UNIQUE (Numero_Habitacion),
    CONSTRAINT CK_HABITACION_TIPO CHECK (Tipo IN ('sencilla', 'doble', 'suite')),
    CONSTRAINT CK_HABITACION_ESTADO CHECK (Estado IN ('disponible', 'reservada', 'ocupada'))
);

-- -----------------------------------------------------------------------------
-- 3. TABLA: EMPLEADOS
-- Registro de trabajadores del complejo y sus cargos.
-- -----------------------------------------------------------------------------
CREATE TABLE EMPLEADOS (
    ID_Empleado INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Direccion VARCHAR(200) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Cargo VARCHAR(50) NOT NULL,
    CONSTRAINT PK_EMPLEADOS PRIMARY KEY (ID_Empleado),
    CONSTRAINT CK_EMPLEADO_CARGO CHECK (Cargo IN ('recepcionista', 'camarero', 'entrenador', 'monitor', 'terapeuta', 'administrador'))
);

-- -----------------------------------------------------------------------------
-- 4. TABLA: SERVICIOS
-- Servicios ofrecidos en el complejo (Restaurante, Spa, Actividades recreativas).
-- -----------------------------------------------------------------------------
CREATE TABLE SERVICIOS (
    ID_Servicio INT NOT NULL,
    Nombre_Servicio VARCHAR(100) NOT NULL,
    Tipo_Servicio VARCHAR(30) NOT NULL,
    ID_Empleado_Encargado INT,
    CONSTRAINT PK_SERVICIOS PRIMARY KEY (ID_Servicio),
    CONSTRAINT FK_SERVICIOS_EMPLEADO FOREIGN KEY (ID_Empleado_Encargado) REFERENCES EMPLEADOS(ID_Empleado) ON DELETE SET NULL,
    CONSTRAINT CK_SERVICIO_TIPO CHECK (Tipo_Servicio IN ('restaurante', 'actividad_recreativa', 'spa'))
);

-- -----------------------------------------------------------------------------
-- 5. TABLA: RESERVAS_HABITACIONES
-- Gestión de reservas de estancia hechas por los huéspedes.
-- -----------------------------------------------------------------------------
CREATE TABLE RESERVAS_HABITACIONES (
    ID_Reserva_Habitacion INT NOT NULL,
    ID_Huesped INT NOT NULL,
    ID_Habitacion INT NOT NULL,
    Fecha_CheckIn DATE NOT NULL,
    Fecha_CheckOut DATE NOT NULL,
    Estado_Reserva VARCHAR(20) DEFAULT 'pendiente' NOT NULL,
    CONSTRAINT PK_RESERVAS_HABITACIONES PRIMARY KEY (ID_Reserva_Habitacion),
    CONSTRAINT FK_RES_HAB_HUESPED FOREIGN KEY (ID_Huesped) REFERENCES HUESPEDES(ID_Huesped) ON DELETE CASCADE,
    CONSTRAINT FK_RES_HAB_HABITACION FOREIGN KEY (ID_Habitacion) REFERENCES HABITACIONES(ID_Habitacion),
    CONSTRAINT CK_RES_HAB_FECHAS CHECK (Fecha_CheckOut > Fecha_CheckIn),
    CONSTRAINT CK_RES_HAB_ESTADO CHECK (Estado_Reserva IN ('confirmada', 'pendiente', 'cancelada', 'finalizada'))
);

-- -----------------------------------------------------------------------------
-- 6. TABLA: RESERVAS_ACTIVIDADES
-- Reservas de actividades recreativas, spa y restaurantes por los huéspedes.
-- -----------------------------------------------------------------------------
CREATE TABLE RESERVAS_ACTIVIDADES (
    ID_Reserva_Actividad INT NOT NULL,
    ID_Huesped INT NOT NULL,
    ID_Servicio INT NOT NULL,
    ID_Empleado_Monitor INT,
    Fecha_Hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Estado_Reserva VARCHAR(20) DEFAULT 'pendiente' NOT NULL,
    CONSTRAINT PK_RESERVAS_ACTIVIDADES PRIMARY KEY (ID_Reserva_Actividad),
    CONSTRAINT FK_RES_ACT_HUESPED FOREIGN KEY (ID_Huesped) REFERENCES HUESPEDES(ID_Huesped) ON DELETE CASCADE,
    CONSTRAINT FK_RES_ACT_SERVICIO FOREIGN KEY (ID_Servicio) REFERENCES SERVICIOS(ID_Servicio),
    CONSTRAINT FK_RES_ACT_MONITOR FOREIGN KEY (ID_Empleado_Monitor) REFERENCES EMPLEADOS(ID_Empleado) ON DELETE SET NULL,
    CONSTRAINT CK_RES_ACT_ESTADO CHECK (Estado_Reserva IN ('confirmada', 'pendiente', 'realizada', 'cancelada'))
);

-- -----------------------------------------------------------------------------
-- 7. TABLA: PAGOS
-- Registro de cobros a huéspedes por reservas de habitación o de actividades.
-- -----------------------------------------------------------------------------
CREATE TABLE PAGOS (
    ID_Pago INT NOT NULL,
    ID_Huesped INT NOT NULL,
    ID_Reserva_Habitacion INT,
    ID_Reserva_Actividad INT,
    Cantidad_Pagada DECIMAL(10,2) NOT NULL,
    Fecha_Pago DATE NOT NULL DEFAULT (CURRENT_DATE),
    CONSTRAINT PK_PAGOS PRIMARY KEY (ID_Pago),
    CONSTRAINT FK_PAGOS_HUESPED FOREIGN KEY (ID_Huesped) REFERENCES HUESPEDES(ID_Huesped),
    CONSTRAINT FK_PAGOS_RES_HAB FOREIGN KEY (ID_Reserva_Habitacion) REFERENCES RESERVAS_HABITACIONES(ID_Reserva_Habitacion) ON DELETE SET NULL,
    CONSTRAINT FK_PAGOS_RES_ACT FOREIGN KEY (ID_Reserva_Actividad) REFERENCES RESERVAS_ACTIVIDADES(ID_Reserva_Actividad) ON DELETE SET NULL,
    CONSTRAINT CK_PAGOS_CANTIDAD CHECK (Cantidad_Pagada > 0),
    CONSTRAINT CK_PAGOS_ASOCIACION CHECK ( (ID_Reserva_Habitacion IS NOT NULL) OR (ID_Reserva_Actividad IS NOT NULL) )
);

-- =============================================================================
-- RESTRICCIONES COMPLEJAS DE NEGOCIO (TRIGGERS ADAPTADOS A MYSQL)
-- =============================================================================

DELIMITER //

CREATE TRIGGER TRG_EXCLUSIVIDAD_EMPLEADO 
BEFORE INSERT ON RESERVAS_ACTIVIDADES 
FOR EACH ROW 
BEGIN
    DECLARE v_cargo VARCHAR(50);
    
    IF NEW.ID_Empleado_Monitor IS NOT NULL THEN
        SELECT Cargo INTO v_cargo FROM EMPLEADOS WHERE ID_Empleado = NEW.ID_Empleado_Monitor;
        IF v_cargo = 'recepcionista' THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Error de Exclusividad: Un recepcionista no puede ser monitor de actividades.';
        END IF;
    END IF;
END //

CREATE TRIGGER TRG_VERIFICAR_RESERVA_ACTIVA 
BEFORE INSERT ON RESERVAS_ACTIVIDADES 
FOR EACH ROW 
BEGIN
    DECLARE v_conteo INT;
    
    SELECT COUNT(*) INTO v_conteo 
    FROM RESERVAS_HABITACIONES 
    WHERE ID_Huesped = NEW.ID_Huesped AND Estado_Reserva IN ('confirmada', 'pendiente');
    
    IF v_conteo = 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Restricción de Acceso: El huésped no tiene ninguna reserva de habitación activa.';
    END IF;
END //

DELIMITER ;
