import React from "react"

/**
 * Componente de ejemplo que demuestra el uso del sistema de tipografía centralizado
 * 
 * Este componente muestra cómo usar las 4 fuentes del sistema:
 * - font-navbar: Para navegación
 * - font-heading: Para títulos
 * - font-body: Para contenido principal
 * - font-aux: Para elementos auxiliares
 */
export const TypographyExample = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Header con navegación */}
      <header className="bg-gray-100 p-6 rounded-lg">
        <nav className="font-navbar flex justify-between items-center">
          <div className="font-heading text-2xl font-bold text-gray-800">
            Logo
          </div>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Inicio</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Servicios</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Contacto</a></li>
          </ul>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="space-y-8">
        {/* Título principal */}
        <section>
          <h1 className="font-heading text-5xl font-bold text-gray-900 mb-4">
            Sistema de Tipografía Centralizado
          </h1>
          <p className="font-body text-xl text-gray-600 leading-relaxed">
            Este es un ejemplo de cómo usar el sistema de tipografía completamente centralizado 
            y escalable implementado en este proyecto.
          </p>
        </section>

        {/* Sección de características */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-gray-800 mb-4">
              Características
            </h2>
            <div className="font-body text-gray-700 space-y-3">
              <p>✅ Configuración centralizada en un solo archivo</p>
              <p>✅ 4 fuentes especializadas para diferentes propósitos</p>
              <p>✅ Fácil de cambiar en futuros proyectos</p>
              <p>✅ Optimizado para performance</p>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-3xl font-semibold text-gray-800 mb-4">
              Beneficios
            </h2>
            <div className="font-body text-gray-700 space-y-3">
              <p>🎯 Consistencia visual en toda la aplicación</p>
              <p>🔧 Mantenimiento simplificado</p>
              <p>📈 Escalabilidad para múltiples proyectos</p>
              <p>⚡ Carga optimizada de fuentes</p>
            </div>
          </div>
        </section>

        {/* Ejemplos de uso */}
        <section>
          <h2 className="font-heading text-3xl font-semibold text-gray-800 mb-6">
            Ejemplos de Uso
          </h2>
          
          <div className="grid gap-6">
            {/* Ejemplo 1: Artículo */}
            <article className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-heading text-2xl font-semibold text-gray-800 mb-3">
                Artículo de Blog
              </h3>
              <p className="font-body text-gray-700 mb-4 leading-relaxed">
                Este es un ejemplo de contenido principal usando la fuente body. 
                Es perfecta para párrafos largos y contenido legible.
              </p>
              <div className="flex gap-2">
                <span className="font-aux text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Tecnología
                </span>
                <span className="font-aux text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  Desarrollo
                </span>
              </div>
            </article>

            {/* Ejemplo 2: Tarjeta de producto */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-heading text-2xl font-semibold text-gray-800 mb-3">
                Tarjeta de Producto
              </h3>
              <p className="font-body text-gray-700 mb-4">
                Descripción del producto usando la fuente body para máxima legibilidad.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-aux text-sm text-gray-500">
                  SKU: PRD-001
                </span>
                <span className="font-aux text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  En Stock
                </span>
              </div>
            </div>

            {/* Ejemplo 3: Formulario */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-heading text-2xl font-semibold text-gray-800 mb-4">
                Formulario de Contacto
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="font-aux text-sm font-medium text-gray-700 block mb-1">
                    Nombre completo
                  </label>
                  <input 
                    type="text" 
                    className="font-body w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                <div>
                  <label className="font-aux text-sm font-medium text-gray-700 block mb-1">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="font-body w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="tu@email.com"
                  />
                </div>
                <button className="font-navbar bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Tabla de referencia */}
        <section>
          <h2 className="font-heading text-3xl font-semibold text-gray-800 mb-6">
            Referencia Rápida
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="font-heading text-left p-3 border border-gray-300">Rol</th>
                  <th className="font-heading text-left p-3 border border-gray-300">Clase CSS</th>
                  <th className="font-heading text-left p-3 border border-gray-300">Uso</th>
                  <th className="font-heading text-left p-3 border border-gray-300">Ejemplo</th>
                </tr>
              </thead>
              <tbody className="font-body">
                <tr>
                  <td className="p-3 border border-gray-300 font-semibold">Navegación</td>
                  <td className="p-3 border border-gray-300 font-mono text-sm">font-navbar</td>
                  <td className="p-3 border border-gray-300">Menús, enlaces, botones</td>
                  <td className="p-3 border border-gray-300">
                    <span className="font-navbar">Menú principal</span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border border-gray-300 font-semibold">Títulos</td>
                  <td className="p-3 border border-gray-300 font-mono text-sm">font-heading</td>
                  <td className="p-3 border border-gray-300">H1, H2, H3, secciones</td>
                  <td className="p-3 border border-gray-300">
                    <span className="font-heading">Título Principal</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-300 font-semibold">Contenido</td>
                  <td className="p-3 border border-gray-300 font-mono text-sm">font-body</td>
                  <td className="p-3 border border-gray-300">Párrafos, texto principal</td>
                  <td className="p-3 border border-gray-300">
                    <span className="font-body">Contenido legible</span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border border-gray-300 font-semibold">Auxiliar</td>
                  <td className="p-3 border border-gray-300 font-mono text-sm">font-aux</td>
                  <td className="p-3 border border-gray-300">Etiquetas, detalles, extras</td>
                  <td className="p-3 border border-gray-300">
                    <span className="font-aux">Etiqueta</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-6 rounded-lg">
        <div className="font-aux text-sm text-gray-600 text-center">
          Sistema de Tipografía Centralizado - Ejemplo de implementación
        </div>
      </footer>
    </div>
  )
} 