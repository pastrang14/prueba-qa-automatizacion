# Prueba Práctica de Automatización - Analista de Calidad de Software (QA)

Candidato: Guillermo Ezequiel Paredes Pastrán
Pila Tecnológica Elegida: Opción B (Playwright con TypeScript)

Este repositorio contiene la resolución de la prueba técnica para el rol de Analista de Calidad de Software (QA).

## Pila Tecnológica y Versiones

*   **Lenguaje:** TypeScript
*   **Framework de Automatización:** Playwright v1.64.0
*   **Gestor de Paquetes:** npm v11.19.0
*   **Entorno de Ejecución:** Node.js v26.7.0
*   **Control de Versiones:** Git / GitHub Actions (CI/CD)
*   **Navegador de Pruebas:** Google Chrome (Chromium)

## Requisitos Previos e Instalación

Para ejecutar este proyecto de forma local, asegúrese de contar con lo siguiente:
1. Instalar [Node.js](https://nodejs.org/).
2. Instalar [Git](https://git-scm.com/).

**Pasos de instalación:**
```bash
# 1. Clonar el repositorio
git clone [https://github.com/pastrang14/prueba-qa-automatizacion.git](https://github.com/pastrang14/prueba-qa-automatizacion.git)

# 2. Ingresar al directorio del proyecto
cd prueba-qa-automatizacion

# 3. Instalar las dependencias del proyecto
npm install

# 4. Instalar los navegadores requeridos por Playwright
npx playwright install chromium


## Ejecución de Pruebas y Reportería

Este proyecto utiliza el generador de reportes HTML nativo de Playwright para ofrecer una visualización detallada de los resultados, los tiempos de ejecución por cada paso y las evidencias recolectadas ante posibles fallos (capturas de pantalla, videos y trazas).

**Ejecutar la suite de pruebas:**
Para correr todos los casos de prueba (CP-01 al CP-04) en modo headless (sin interfaz gráfica), utilice el comando estándar:
```bash
npx playwright test

## Consultar reporteria de las pruebas
npx playwright show-report

## Decisiones de Arquitectura y Consideraciones de Prueba

Como parte de las buenas prácticas de ingeniería de calidad aplicadas en este proyecto, se tomaron las siguientes decisiones de diseño:

### 1. Estructura del Page Object Model (POM)
Se decidió agrupar lógicamente los componentes de interfaz para evitar la sobre-ingeniería. Por ejemplo, el **Modal de Confirmación** al agregar un artículo se encapsuló dentro de la clase `ProductPage`. Dado que este modal es una respuesta directa e inmediata a la acción "Add to cart" y no representa una navegación hacia una pantalla completamente nueva, mantenerlo en la misma clase centraliza la lógica del flujo de compra inicial y respeta el principio de responsabilidad única.

### 2. Manejo de Estado en el Carrito (CP-02)
Durante la ejecución del CP-02 (Gestión del Carrito), se identificó un comportamiento de persistencia de sesión en el entorno de pruebas (`teststore.automationtesting.co.uk`). En ocasiones, el carrito conserva productos residuales de ejecuciones previas (sesiones "fantasma" del servidor). 
* **Enfoque adoptado:** Para cumplir estrictamente con los pasos solicitados en la matriz de pruebas, el script automatizado se enfoca exclusivamente en validar la adición, cálculo y eliminación del producto objetivo del caso de prueba. La limpieza de productos residuales ajenos al flujo actual se consideró fuera del alcance de este script específico para mantener la aserción concentrada en el criterio de aceptación principal.
Para la ultima aserción se penso en verificar que no aparezca el producto seleccionado, por lo mismo que se esta cargando productos que no se han seleccionado.
