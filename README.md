
# Blog Application

Aplicación de blog (Client view) desarrollada con el framework [Next.js](https://nextjs.org/), utilizando una arquitectura MERN (MongoDB, Express, React, Node.js).

## Funcionalidades

- **Blog**: Los usuarios pueden leer artículos de blog categorizados y etiquetados.
- **Markdown**: Los artículos de blog se renderizan utilizando `ReactMarkdown` con soporte para sintaxis de resaltado de código.
- **Conexión a MongoDB**: La aplicación se conecta a una base de datos MongoDB para almacenar y recuperar datos de los blogs.
- **Componentes Reutilizables**: Uso de componentes reutilizables para la interfaz de usuario, como encabezados, pies de página y botones de carga.
- **Hooks Personalizados**: Implementación de hooks personalizados para la gestión de datos y efectos secundarios.

## Configuración y Ejecución

Para comenzar con el desarrollo, primero instala las dependencias y luego ejecuta el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

## Despliegue

La forma más sencilla de desplegar la aplicación Next.js es utilizando la plataforma [Vercel](https://vercel.com/), creada por los desarrolladores de Next.js.

Para más detalles sobre el despliegue, consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/deployment).

## Dependencias Principales

- `next`: Framework de React para aplicaciones web.
- `react`: Biblioteca de JavaScript para construir interfaces de usuario.
- `mongodb`: Controlador oficial de MongoDB para Node.js.
- `mongoose`: ODM (Object Data Modeling) para MongoDB y Node.js.
- `axios`: Cliente HTTP basado en promesas para el navegador y Node.js.
- `react-markdown`: Renderizador de Markdown para React.
- `react-syntax-highlighter`: Componente de resaltado de sintaxis para React.
- `remark-gfm`: Plugin para soporte de GitHub Flavored Markdown.
- `aos`: Biblioteca para animaciones de desplazamiento.

## Archivos y Componentes Relevantes

- **Componentes**: 
  - `Aos`
  - `Footer`
  - `Header`
  - `Loading`
  - `ScrollToTopBtn`
  - `TopLoadingLine`

- **Hooks**: 
  - `useFetchData`

- **Modelos**: 
  - `Blog`

- **Páginas**: 
  - `_app`
  - `_document`
  - `index`
  - `blog/[slug]`
  - `topics/[category]`
  - `tag/[tags]`

- **API**: 
  - `getblog`
