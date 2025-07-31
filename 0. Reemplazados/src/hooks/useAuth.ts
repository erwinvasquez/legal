"use client"

import { useState, useCallback } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials extends LoginCredentials {
  name: string
}

interface AuthError {
  message: string
  code?: string
}

/**
 * Hook para centralizar la lógica de autenticación
 *
 * @returns Objeto con métodos y estado de autenticación
 *
 * @example
 * const { login, loginWithGoogle, logout, isLoading, error } = useAuth();
 *
 * // Iniciar sesión con email y contraseña
 * const handleSubmit = async (e) => {
 *   e.preventDefault();
 *   const success = await login({ email, password });
 *   if (success) {
 *     // Hacer algo después del login exitoso
 *   }
 * };
 */
export function useAuth() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  // Obtener locale de la URL
  const locale = pathname?.split("/")[1] || "es"

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)

  /**
   * Iniciar sesión con email y contraseña
   */
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true)
      setError(null)

      try {
        console.log("🔑 useAuth: Iniciando sesión con credenciales...")
        const result = await signIn("credentials", {
          redirect: false,
          email: credentials.email,
          password: credentials.password,
        })

        if (result?.error) {
          console.log("❌ useAuth: Error en login:", result.error)
          setError({ message: "Credenciales incorrectas" })
          return false
        }

        if (result?.ok) {
          console.log("✅ useAuth: Login exitoso")

          // Actualizar la sesión
          await update()
          console.log("✅ useAuth: Sesión actualizada")

          // Forzar actualización de la UI usando router
          router.refresh()

          // Redirección después de login exitoso
          console.log("🔄 useAuth: Redirigiendo después de login exitoso...")
          router.push(`/${locale}`)
          return true
        }

        return false
      } catch (err) {
        console.error("❌ useAuth: Error de autenticación:", err)
        setError({
          message: "Ocurrió un error durante la autenticación",
          code: "auth/unknown-error",
        })
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [update, router, locale],
  )

  /**
   * Iniciar sesión con Google
   */
  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("🔑 useAuth: Iniciando login con Google...")

      // Usar callbackUrl para asegurar que la redirección funcione correctamente
      const callbackUrl = `${window.location.origin}/${locale}`

      const result = await signIn("google", {
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        console.log("❌ useAuth: Error en login con Google:", result.error)
        setError({ message: "Error al iniciar sesión con Google" })
        return false
      }

      if (result?.ok) {
        console.log("✅ useAuth: Login con Google exitoso")

        // Si hay una URL de redirección, navegar a ella
        if (result.url) {
          console.log("🔄 useAuth: Redirigiendo a:", result.url)
          window.location.href = result.url
          return true
        }

        // Si no hay URL de redirección, actualizar la sesión y refrescar
        await update()
        router.refresh()
        router.push(`/${locale}`)
        return true
      }

      return false
    } catch (err) {
      console.error("❌ useAuth: Error de autenticación con Google:", err)
      setError({
        message: "Error al iniciar sesión con Google",
        code: "auth/google-signin-failed",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }, [update, router, locale])

  /**
   * Registrar un nuevo usuario
   * Nota: Esta función es un ejemplo y debe adaptarse a tu implementación real
   */
  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      setIsLoading(true)
      setError(null)

      try {
        // Aquí implementarías la lógica real de registro
        // Por ejemplo, una llamada a tu API
        console.log("🔑 useAuth: Registrando nuevo usuario...")

        // Simulación de registro exitoso
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Después del registro exitoso, iniciar sesión automáticamente
        return await login({
          email: credentials.email,
          password: credentials.password,
        })
      } catch (err) {
        console.error("❌ useAuth: Error en registro:", err)
        setError({
          message: "Error al registrar usuario",
          code: "auth/registration-failed",
        })
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [login],
  )

  /**
   * Cerrar sesión
   */
  const logout = useCallback(async () => {
    setIsLoading(true)

    try {
      console.log("🔄 useAuth: Cerrando sesión...")

      // Cerrar sesión con NextAuth
      // Usamos redirect: true para forzar una recarga completa de la página
      // Esto garantiza que el estado de la sesión se actualice correctamente
      await signOut({
        redirect: true,
        callbackUrl: `/${locale}`,
      })

      // Nota: El código después de signOut con redirect: true no se ejecutará
      // porque la página se recargará automáticamente

      return true
    } catch (err) {
      console.error("❌ useAuth: Error al cerrar sesión:", err)
      setError({
        message: "Error al cerrar sesión",
        code: "auth/signout-failed",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }, [locale])

  /**
   * Limpiar errores de autenticación
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Funciones adicionales para manejo de roles (NUEVAS)
  const userRole = (session?.user?.role as "admin" | "user") || null
  const isAdmin = userRole === "admin"
  const isUser = userRole === "user"

  const hasRole = useCallback(
    (role: "admin" | "user") => {
      return userRole === role
    },
    [userRole],
  )

  return {
    session,
    status,
    isLoading,
    error,
    isAuthenticated: status === "authenticated" && !!session,
    login,
    loginWithGoogle,
    register,
    logout,
    clearError,
    // Nuevas propiedades para roles
    userRole,
    isAdmin,
    isUser,
    hasRole,
  }
}
