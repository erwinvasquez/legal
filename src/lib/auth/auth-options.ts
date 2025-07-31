// Opciones de configuración para NextAuth
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { createOrUpdateUser, getUserRole } from "@/lib/firestore-roles"

// Log para verificar que este archivo se está cargando
console.log("🔄 NextAuth: Configuración cargada")

// Opciones de configuración para NextAuth
export const authOptions: NextAuthOptions = {
  // Configurar proveedores de autenticación
  providers: [
    // Proveedor de credenciales para email/password
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("🔄 NextAuth: authorize - Verificando credenciales...")
          // Verificar que se proporcionaron credenciales
          if (!credentials?.email || !credentials?.password) {
            console.log("❌ NextAuth: authorize - Credenciales incompletas")
            return null
          }

          // Aquí puedes implementar tu propia lógica de verificación de credenciales
          // Por ejemplo, verificar contra una base de datos
          // Para este ejemplo, usaremos credenciales de prueba
          if (credentials.email === "test@example.com" && credentials.password === "password") {
            console.log("✅ NextAuth: authorize - Autenticación exitosa")
            return {
              id: "1",
              name: "Usuario de Prueba",
              email: credentials.email,
              image: null,
              emailVerified: true,
              providerId: "credentials",
            }
          }

          // Si las credenciales no coinciden, devolver null
          console.log("❌ NextAuth: authorize - Credenciales incorrectas")
          return null
        } catch (error) {
          console.error("❌ NextAuth: Error en authorize:", error)
          return null
        }
      },
    }),

    // Proveedor de Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  // Configuración de sesiones y tokens
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here",
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("🔄 NextAuth: jwt callback - Personalizando token")

      if (user) {
        console.log("🔄 NextAuth: jwt callback - Añadiendo datos de usuario al token")
        token.id = user.id
        token.emailVerified = (user as any).emailVerified || false
        token.providerId = account?.provider || "unknown"

        // Crear o actualizar usuario en Firestore y obtener rol
        try {
          console.log("🔄 NextAuth: jwt callback - Sincronizando con Firestore...")
          const userData = await createOrUpdateUser({
            id: user.id,
            email: user.email,
            name: user.name,
            provider: account?.provider || "unknown",
            image: user.image,
          })

          token.role = userData.role
          console.log(`✅ NextAuth: jwt callback - Rol asignado: ${userData.role}`)
        } catch (error) {
          console.error("❌ NextAuth: Error al sincronizar con Firestore:", error)
          token.role = "user" // Rol por defecto en caso de error
        }
      } else if (token.id) {
        // En renovaciones de token, verificar si el rol ha cambiado
        try {
          const currentRole = await getUserRole(token.id as string)
          if (currentRole !== token.role) {
            console.log(`🔄 NextAuth: jwt callback - Rol actualizado de ${token.role} a ${currentRole}`)
            token.role = currentRole
          }
        } catch (error) {
          console.error("❌ NextAuth: Error al verificar rol en renovación:", error)
          // Mantener el rol actual en caso de error
        }
      }

      return token
    },
    async session({ session, token }) {
      console.log("🔄 NextAuth: session callback - Personalizando sesión")
      if (token && session.user) {
        console.log("🔄 NextAuth: session callback - Añadiendo datos del token a la sesión")
        session.user.id = token.id as string
        session.user.emailVerified = token.emailVerified as boolean
        session.user.providerId = token.providerId as string
        session.user.role = token.role as "admin" | "user"

        console.log(`✅ NextAuth: session callback - Sesión creada con rol: ${session.user.role}`)
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      console.log("🔄 NextAuth: redirect callback - Redirigiendo a:", url)
      // Asegurarse de que la URL de redirección comience con la URL base
      if (url.startsWith(baseUrl)) return url
      // Si la URL es relativa, añadir la URL base
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // De lo contrario, redirigir a la URL base
      return baseUrl
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  debug: process.env.NODE_ENV !== "production",
  events: {
    async signIn({ user, account }) {
      console.log(`🔄 NextAuth Event: signIn - Usuario ha iniciado sesión con ${account?.provider}:`, user.name)

      // IMPORTANTE: Asegurarse de que el usuario se guarde en Firestore al iniciar sesión
      try {
        await createOrUpdateUser({
          id: user.id,
          email: user.email,
          name: user.name,
          provider: account?.provider || "unknown",
          image: user.image,
        })
        console.log("✅ NextAuth Event: signIn - Usuario guardado en Firestore")
      } catch (error) {
        console.error("❌ NextAuth Event: signIn - Error al guardar usuario en Firestore:", error)
      }
    },
    async signOut() {
      console.log("🔄 NextAuth Event: signOut - Usuario ha cerrado sesión")
    },
    async session({ session }) {
      console.log("🔄 NextAuth Event: session - Sesión actualizada", session.user?.role)
    },
  },
}

// Extender la sesión de NextAuth para incluir datos adicionales
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string | null
      email: string | null
      image: string | null
      emailVerified: boolean
      providerId: string
      role: "admin" | "user" // Añadir rol a la sesión
    }
  }

  interface User {
    id: string
    name: string | null
    email: string | null
    image: string | null
    role?: "admin" | "user"
  }
}

// Extender JWT para incluir rol
declare module "next-auth/jwt" {
  interface JWT {
    id: string
    emailVerified: boolean
    providerId: string
    role: "admin" | "user"
  }
}





// // Opciones de configuración para NextAuth
// import type { NextAuthOptions } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google"
// import { signInWithEmailAndPassword } from "firebase/auth"
// import { auth } from "@/lib/firebase"

// // Log para verificar que este archivo se está cargando
// console.log("🔄 NextAuth: Configuración cargada")

// // Opciones de configuración para NextAuth
// export const authOptions: NextAuthOptions = {
//   // Configurar proveedores de autenticación
//   providers: [
//     // Proveedor de credenciales para email/password
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           console.log("🔄 NextAuth: authorize - Verificando credenciales...")
//           // Verificar que se proporcionaron credenciales
//           if (!credentials?.email || !credentials?.password) {
//             console.log("❌ NextAuth: authorize - Credenciales incompletas")
//             return null
//           }

//           // Intentar autenticar con Firebase real
//           console.log("🔄 NextAuth: authorize - Intentando autenticar con Firebase...")
//           const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
//           const user = userCredential.user
//           console.log("✅ NextAuth: authorize - Autenticación exitosa con Firebase")

//           // Devolver usuario en formato compatible con NextAuth
//           console.log("🔄 NextAuth: authorize - Devolviendo usuario para NextAuth")
//           return {
//             id: user.uid,
//             name: user.displayName,
//             email: user.email,
//             image: user.photoURL,
//             emailVerified: user.emailVerified,
//             providerId: user.providerId,
//           }
//         } catch (error) {
//           console.error("❌ NextAuth: Error en authorize:", error)
//           return null
//         }
//       },
//     }),

//     // Usar el proveedor oficial de Google de NextAuth
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//   ],

//   // El resto de tu configuración se mantiene igual
//   secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here",
//   pages: {
//     signIn: "/",
//     error: "/",
//   },
//   callbacks: {
//     async jwt({ token, user, account }) {
//       console.log("🔄 NextAuth: jwt callback - Personalizando token")
//       if (user) {
//         console.log("🔄 NextAuth: jwt callback - Añadiendo datos de usuario al token")
//         token.id = user.id
//         token.emailVerified = (user as any).emailVerified || false
//         token.providerId = (user as any).providerId || account?.provider || "unknown"
//       }
//       return token
//     },
//     async session({ session, token }) {
//       console.log("🔄 NextAuth: session callback - Personalizando sesión")
//       if (token && session.user) {
//         console.log("🔄 NextAuth: session callback - Añadiendo datos del token a la sesión")
//         session.user.id = token.id as string
//         session.user.emailVerified = token.emailVerified as boolean
//         session.user.providerId = token.providerId as string
//       }
//       return session
//     },
//     async redirect({ url, baseUrl }) {
//       console.log("🔄 NextAuth: redirect callback - Redirigiendo a:", url)
//       return url.startsWith(baseUrl) ? url : baseUrl
//     },
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60,
//   },
//   cookies: {
//     sessionToken: {
//       name: `next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 30 * 24 * 60 * 60,
//       },
//     },
//   },
//   debug: process.env.NODE_ENV !== "production",
//   events: {
//     async signIn({ user, account }) {
//       console.log(`🔄 NextAuth Event: signIn - Usuario ha iniciado sesión con ${account?.provider}:`, user.name)
//     },
//     async signOut() {
//       console.log("🔄 NextAuth Event: signOut - Usuario ha cerrado sesión")
//     },
//     async session({ session }) {
//       console.log("🔄 NextAuth Event: session - Sesión actualizada", session)
//     },
//   },
// }

// // Extender la sesión de NextAuth para incluir datos de Firebase
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string
//       name: string | null
//       email: string | null
//       image: string | null
//       emailVerified: boolean
//       providerId: string
//     }
//   }
// }

