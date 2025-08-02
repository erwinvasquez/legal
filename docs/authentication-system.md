# Sistema de Autenticación y Estado Global - Documentación Técnica

## Tabla de Contenidos
1. [Resumen del Sistema de Autenticación](#resumen-del-sistema-de-autenticación)
2. [Componentes y Hooks Relacionados](#componentes-y-hooks-relacionados)
3. [Gestión del Estado Global](#gestión-del-estado-global)
4. [Integración con Enrutamiento y Middleware](#integración-con-enrutamiento-y-middleware)
5. [Buenas Prácticas y Directrices Obligatorias](#buenas-prácticas-y-directrices-obligatorias)
6. [Ubicación de Archivos Clave](#ubicación-de-archivos-clave)

---

## Resumen del Sistema de Autenticación

### Proveedor de Autenticación
El proyecto utiliza **NextAuth.js v4** como sistema principal de autenticación, configurado para trabajar con:
- **Estrategia de sesión**: JWT (JSON Web Tokens)
- **Duración de sesión**: 30 días
- **Proveedores soportados**:
  - Credentials Provider (email/password)
  - Google OAuth Provider

### Configuración Principal
La configuración se encuentra en /lib/auth/auth-options.ts y define:

\\\typescript
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // Configuración para email/password
      // Credenciales de prueba: test@example.com / password
    }),
    GoogleProvider({
      // Configuración OAuth con Google
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  // Callbacks personalizados para JWT y sesión
}
\\\

### Datos en JWT y Sesión
**JWT Token incluye**:
- id: ID único del usuario
- emailVerified: Estado de verificación del email
- providerId: Proveedor usado para autenticación
- role: Rol del usuario ("admin" | "user")

**Sesión incluye**:
- user.id: ID del usuario
- user.name: Nombre del usuario
- user.email: Email del usuario
- user.image: URL de la imagen de perfil
- user.emailVerified: Estado de verificación
- user.providerId: Proveedor de autenticación
- user.role: Rol del usuario

### Sistema de Roles
- **Roles disponibles**: "admin" | "user"
- **Rol por defecto**: "user"
- **Almacenamiento**: Firestore (users collection)
- **Sincronización**: Automática en callbacks de NextAuth

---

## Componentes y Hooks Relacionados

### Hooks de Autenticación

#### useAuth() - /hooks/useAuth.ts
Hook principal que centraliza toda la lógica de autenticación.

**Funciones principales**:
- login(credentials): Autenticación con email/password
- loginWithGoogle(): Autenticación con Google OAuth
- logout(): Cerrar sesión con redirección automática
- register(credentials): Registro de nuevos usuarios (simulado)
- clearError(): Limpiar errores de autenticación

**Estados expuestos**:
- session: Datos de la sesión actual
- status: Estado de carga ("loading" | "authenticated" | "unauthenticated")
- isLoading: Indicador de operaciones en curso
- error: Errores de autenticación
- isAuthenticated: Boolean de estado de autenticación
- userRole: Rol del usuario actual
- isAdmin: Boolean si es administrador
- isUser: Boolean si es usuario regular

#### useRole() - /hooks/useRole.ts
Hook especializado en manejo de roles y permisos.

**Funciones principales**:
- hasRole(requiredRole): Verificar si tiene un rol específico
- hasPermission(permission): Verificar permisos específicos

**Permisos definidos**:
\\\typescript
const ROLE_PERMISSIONS = {
  admin: ["view_admin_panel", "manage_users", "edit_content", "delete_content", "view_analytics", "manage_settings"],
  user: ["view_profile", "edit_profile", "view_content"],
}
\\\

#### useProtectedRoute() - /hooks/useProtectedRoute.ts
Hook para proteger rutas que requieren autenticación.

**Opciones**:
- redirectTo: URL de redirección si no está autenticado
- requireAdmin: Requiere rol de administrador

### Providers

#### AuthProvider - /providers/AuthProvider.tsx
Wrapper del SessionProvider de NextAuth con logging adicional.

#### AppProviders - /providers/AppProviders.tsx
Provider principal que envuelve toda la aplicación, incluye:
- NextIntlClientProvider: Internacionalización
- ThemeProvider: Gestión de temas
- AuthProvider: Autenticación

### Componentes de Autenticación

#### AuthDrawer - /components/auth/AuthDrawer.tsx
Drawer lateral para login/registro con:
- Formulario de credenciales
- Botón de Google OAuth
- Alternancia entre login/registro
- Gestión de estados de carga y errores
- Integración con internacionalización

#### RoleGuard - /components/auth/RoleGuard.tsx
Componentes para proteger contenido basado en roles:
- RoleGuard: Protección genérica por rol
- AdminGuard: Protección específica para administradores
- AuthGuard: Protección que solo requiere autenticación

---

## Gestión del Estado Global

### Arquitectura del Estado
El estado global se maneja mediante una combinación de:
1. **NextAuth Session**: Estado de autenticación
2. **Next-Intl**: Estado de internacionalización
3. **Context API personalizado**: Estado de tema

### Inicialización del Estado
El estado se inicializa en /app/layout.tsx a través de AppProviders:

\\\typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontVariables}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
\\\

### Estados Gestionados Globalmente

#### 1. Estado de Autenticación
- **Proveedor**: NextAuth SessionProvider
- **Acceso**: useSession() o useAuth()
- **Persistencia**: JWT en cookies
- **Actualización**: Automática en login/logout

#### 2. Estado de Internacionalización
- **Proveedor**: NextIntlClientProvider
- **Idiomas soportados**: "en", "es", "pt"
- **Detección**: Automática por middleware
- **Persistencia**: Cookie NEXT_LOCALE

#### 3. Estado de Tema
- **Proveedor**: ThemeProvider personalizado
- **Temas**: "light", "dark", "system"
- **Persistencia**: localStorage
- **Acceso**: useTheme()

### Integración con Firestore
El sistema sincroniza automáticamente datos de usuario con Firestore:

#### createOrUpdateUser() - /lib/firestore-roles.ts
- Se ejecuta automáticamente en login
- Crea nuevos usuarios con rol "user"
- Actualiza lastLogin en usuarios existentes
- Mantiene sincronización de datos básicos

#### getUserRole() - /lib/firestore-roles.ts
- Obtiene rol actual del usuario
- Se ejecuta en callbacks de NextAuth
- Maneja errores devolviendo rol "user" por defecto

---

## Integración con Enrutamiento y Middleware

### Middleware - /middleware.ts
El middleware maneja múltiples responsabilidades:

#### 1. Detección de Idioma
\\\typescript
function getPreferredLanguage(request: NextRequest): SupportedLocale {
  // 1. Cookie NEXT_LOCALE
  // 2. Header Accept-Language
  // 3. Default: "es"
}
\\\

#### 2. Protección de Rutas
\\\typescript
const PROTECTED_ROUTES = ["/admin", "/account"]
const ADMIN_ROUTES = ["/admin"]
\\\

#### 3. Verificación de Autenticación
- Usa getToken() para verificar JWT
- Redirige a página principal si no hay token
- Verifica rol para rutas de administrador

#### 4. Redirecciones SEO
- Maneja redirecciones configuradas
- Normaliza URLs (elimina barras finales)

### Rutas Protegidas
Las rutas se protegen mediante:

1. **Middleware**: Verificación a nivel de servidor
2. **Hooks**: useProtectedRoute() en componentes
3. **Componentes**: RoleGuard, AdminGuard, AuthGuard

### Flujo de Redirección
1. Usuario accede a ruta protegida
2. Middleware verifica autenticación
3. Si no está autenticado → redirige a /{locale}
4. Si no tiene rol requerido → redirige a /{locale}
5. Si está autorizado → permite acceso

---

## Buenas Prácticas y Directrices Obligatorias

### ✅ Reglas Obligatorias

#### 1. Modificación de Autenticación
- **NUNCA** modificar directamente el estado de sesión desde componentes
- **SIEMPRE** usar useAuth() para operaciones de autenticación
- **OBLIGATORIO** actualizar callbacks en auth-options.ts si se añaden nuevos providers
- **REQUERIDO** sincronizar cambios con Firestore en callbacks

#### 2. Gestión de Roles
- **SOLO** modificar roles a través de updateUserRole() en Firestore
- **OBLIGATORIO** actualizar ROLE_PERMISSIONS si se añaden nuevos permisos
- **NUNCA** hardcodear verificaciones de rol en componentes
- **SIEMPRE** usar useRole() o RoleGuard para verificaciones

#### 3. Rutas Protegidas
- **OBLIGATORIO** añadir nuevas rutas protegidas a PROTECTED_ROUTES en middleware
- **REQUERIDO** usar useProtectedRoute() en páginas que requieren autenticación
- **NUNCA** confiar solo en verificaciones del lado cliente

#### 4. Estado Global
- **PROHIBIDO** crear nuevos Context providers sin documentar
- **OBLIGATORIO** usar providers existentes antes de crear nuevos
- **REQUERIDO** mantener consistencia en patrones de inicialización

### ❌ Qué NO Hacer

1. **NO** usar any types (actualmente no se detectaron)
2. **NO** modificar directamente cookies de sesión
3. **NO** crear lógica de autenticación fuera del sistema establecido
4. **NO** hardcodear credenciales o tokens
5. **NO** omitir manejo de errores en operaciones de autenticación

### 🔧 Extensión del Sistema

#### Añadir Nuevo Provider de Autenticación
1. Añadir provider a authOptions.providers
2. Actualizar callback jwt para manejar nuevos datos
3. Actualizar tipos en types/next-auth.d.ts si es necesario
4. Probar integración con Firestore

#### Añadir Nuevo Rol
1. Actualizar tipo "admin" | "user" en todos los archivos relevantes
2. Añadir permisos en ROLE_PERMISSIONS
3. Actualizar RoleGuard si es necesario
4. Documentar nuevo rol y sus permisos

#### Añadir Nueva Ruta Protegida
1. Añadir a PROTECTED_ROUTES o ADMIN_ROUTES en middleware
2. Usar useProtectedRoute() en el componente de página
3. Considerar usar RoleGuard para protección granular

---

## Ubicación de Archivos Clave

### Configuración Principal
- /lib/auth/auth-options.ts - Configuración de NextAuth
- /middleware.ts - Middleware de rutas y autenticación
- /types/next-auth.d.ts - Tipos personalizados de NextAuth

### Hooks de Autenticación
- /hooks/useAuth.ts - Hook principal de autenticación
- /hooks/useRole.ts - Hook de manejo de roles
- /hooks/useProtectedRoute.ts - Hook para rutas protegidas

### Providers
- /providers/AuthProvider.tsx - Provider de autenticación
- /providers/AppProviders.tsx - Provider principal de la app
- /providers/ThemeProvider.tsx - Provider de tema

### Componentes de Autenticación
- /components/auth/AuthDrawer.tsx - Drawer de login/registro
- /components/auth/RoleGuard.tsx - Componentes de protección por roles

### Integración con Firestore
- /lib/firestore-roles.ts - Manejo de roles en Firestore
- /lib/firebase.ts - Configuración de Firebase

### API Routes
- /app/api/auth/[...nextauth]/route.ts - Endpoint de NextAuth

### Configuración de Entorno
Variables requeridas en .env.local:
\\\
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
# ... otras variables de Firebase
\\\

---

## Notas Técnicas Adicionales

### Logging y Debug
El sistema incluye logging extensivo para debugging:
- Todos los hooks principales incluyen console.log statements
- NextAuth está configurado con debug: true en desarrollo
- Los eventos de NextAuth están monitoreados

### Manejo de Errores
- Errores de autenticación se capturan y exponen a través de useAuth()
- Errores de Firestore se manejan con fallbacks seguros
- Middleware incluye manejo de errores para tokens inválidos

### Rendimiento
- Uso de useMemo en hooks para evitar re-renders innecesarios
- Lazy loading de componentes de autenticación
- Optimización de callbacks de NextAuth

### Seguridad
- JWT tokens con expiración de 30 días
- Verificación de roles tanto en cliente como servidor
- Sanitización de datos de usuario antes de almacenar en Firestore
- Uso de HTTPS obligatorio en producción (configurado en NextAuth)

---

*Documentación generada para el proyecto Base - Versión 1.0*
*Última actualización: julio 2025*