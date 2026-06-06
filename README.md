# Crypta - Generador de  Contraseñas Seguras

Aplicación web para generar contraseñas seguras de forma local.  
Las contraseñas se generan en el navegador usando `crypto.getRandomValues()` y **nunca salen del dispositivo**.

---

## Descripción

Crypta es una herramienta simple y minimalista que permite generar contraseñas seguras con opciones configurables. No requiere backend ni base de datos, todo corre en el navegador y se sirve mediante un contenedor Docker con Nginx.

---

## Tecnologías utilizadas 

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura de la página |
| CSS3 | Estilos y diseño visual |
| JavaScript (Vanilla) | Lógica del generador |
| Nginx Alpine | Servidor web dentro del contenedor |
| Docker | Contenedorización y despliegue |

---

## Características

- Elegir el largo de la contraseña (6 a 40 caracteres)
- Activar o desactivar : mayúsculas, minúsculas, números y símbolos
- Indicador visual de seguridad (Débil / Regular / Buena / Muy segura)
-  Botón para copiar al portapapeles con un clic
- Sin dependencia externas 
- 100% local, sin conexión a servidores externos

---

## Requisitos previos 

- Tener [Docker](https://www.docker.com/products/docker-desktop) instalado y corriendo
- No se requiere ninguna otra dependencia

---

## Estructura del proyecto 

```
generador-contrasenas/
├── index.html      -> estructura de la página
├── style.css       -> estilos visuales
├── script.js       -> lógica del generador
├── Dockerfile      -> configuración del contenedor Docker
└── README.md       -> documentación del proyecto
```

---

##  Opción 1 — Correr desde el código fuente

### 1. Clonar el repositorio

```bash
git clone https://github.com/Sofia98C/Generador-de-contrase-as---Crypta
cd generador-contrasenas
```

### 2. Construir la imagen Docker

```bash
docker build -t crypta .
```

### 3. Ejecutar el contenedor 

```bash
docker run -p 8080:80 crypta
```

### 4. Abrir en el navegador 

```
http://localhost:8080
```

### 5. Detener el contenedor 

```bash
docker stop $(docker ps -q --filter ancestor=genpass)
```

---