# Simple Google Search Scraper

Una herramienta moderna y eficiente para extraer sugerencias de búsqueda de Google, incluyendo "People Also Ask" y "Related Searches". Construida con Next.js 15, TypeScript y Tailwind CSS.

## Características Principales

- 🕵️‍♂️ Extracción de sugerencias de búsqueda de Google
- 🔄 Historial de búsquedas con fecha y hora
- 📝 Gestión de palabras clave filtradas
- 🔄 Soporte para "People Also Ask" y "Related Searches"
- 🔄 Límite de 150 palabras clave
- 📋 Copiado masivo de resultados
- 🔄 Interfaz de usuario moderna y responsive

## Requisitos Previos

- Node.js 18+
- npm o yarn
- API Key de Serper.dev

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Jauya/simple-google-search-scraper.git
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`

## Uso de la Aplicación

1. **Formulario de Palabras Clave**
   - Escribe tus palabras clave en el textarea
   - Límite máximo de 150 palabras clave
   - El formulario muestra el contador de palabras clave actuales

2. **Palabras Filtradas**
   - Agrega palabras a la lista de filtrado
   - Elimina palabras individuales haciendo clic en ellas
   - Limpiar todos los filtros con el botón "Limpiar filtros"
   - Palabras comunes filtradas por defecto: "pdf", "gratis", "ejemplo", etc.

3. **Resultados de Búsqueda**
   - Ver "People Also Ask" o "Related Searches"
   - Historial de búsquedas con fecha y hora
   - Copiar resultados con un solo clic
   - Eliminar búsquedas individuales del historial

## Estructura del Proyecto

```
src/
├── app/              # Páginas de la aplicación
├── components/       # Componentes reutilizables
├── hooks/           # Custom hooks
├── store/           # Estado global con Zustand
├── types/           # Tipos de TypeScript
├── utils/           # Funciones utilitarias
└── lib/             # Funcionalidad core
```

## Tecnologías Utilizadas

- **Frontend**
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - Zustand (gestión de estado)

- **Backend**
  - Puppeteer (scraping)
  - Axios (peticiones HTTP)
  - Apify Client (opcional)

## Autor

Desarrollado por Jauya
