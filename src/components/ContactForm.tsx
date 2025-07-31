"use client"

import type React from "react"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Send, AlertCircle } from "lucide-react"
import { useTheme } from "next-themes"
import "react-phone-number-input/style.css"
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input"
import en from "react-phone-number-input/locale/en.json"

// Tipos para el formulario
type FormData = {
  name: string
  email: string
  phoneCountryCode: string
  phoneNumber: string
  city: string
  sector: string
  generationType: string
  message: string
}

// Estado inicial del formulario
const initialFormData: FormData = {
  name: "",
  email: "",
  phoneCountryCode: "BO", // Bolivia por defecto
  phoneNumber: "",
  city: "",
  sector: "",
  generationType: "",
  message: "",
}

// Función para obtener emoji de bandera basado en el código de país ISO
const getFlagEmoji = (countryCode: string): string => {
  if (!countryCode || countryCode.length !== 2) return "🌐"

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0))

  return String.fromCodePoint(...codePoints)
}

export function ContactForm() {
  const t = useTranslations("ContactSection")
  const { theme } = useTheme()
  const { data: session } = useSession()

  // Estados para el formulario
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Obtener lista de países de la librería
  const countries = getCountries()
  const countryOptions = countries.map((country) => ({
    value: country,
    label: en[country] || country,
    callingCode: getCountryCallingCode(country as any),
    flag: getFlagEmoji(country),
  }))

  // Opciones para los selectores
  const sectorOptions = [
    { value: "public", label: t("form.sectors.public") },
    { value: "agriculture", label: t("form.sectors.agriculture") },
    { value: "residential", label: t("form.sectors.residential") },
    { value: "commercial", label: t("form.sectors.commercial") },
    { value: "industrial", label: t("form.sectors.industrial") },
  ]

  const generationOptions = [
    { value: "bipv", label: t("form.generationTypes.bipv") },
    { value: "photovoltaic", label: t("form.generationTypes.photovoltaic") },
    { value: "wind", label: t("form.generationTypes.wind") },
  ]

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Manejar cambios en el número de teléfono (solo permitir números)
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Solo permitir números
    if (/^\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, phoneNumber: value }))
    }
  }

  // Manejar cambios en los selects
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Obtener el código de llamada del país seleccionado
  const getSelectedCountryCallingCode = () => {
    if (!formData.phoneCountryCode) return ""
    try {
      return `+${getCountryCallingCode(formData.phoneCountryCode as any)}`
    } catch {
      return ""
    }
  }

  // Validar el formulario
  const validateForm = (): boolean => {
    // Validar campos requeridos
    if (!formData.name) {
      setErrorMessage(t("validation.nameRequired"))
      return false
    }

    if (!formData.phoneNumber) {
      setErrorMessage(t("validation.phoneRequired"))
      return false
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage(t("validation.emailInvalid"))
      return false
    }

    if (!formData.city) {
      setErrorMessage(t("validation.cityRequired"))
      return false
    }

    if (!formData.sector) {
      setErrorMessage(t("validation.sectorRequired"))
      return false
    }

    if (!formData.generationType) {
      setErrorMessage(t("validation.generationTypeRequired"))
      return false
    }

    return true
  }

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Resetear estados
    setErrorMessage("")
    setSubmitStatus("idle")

    // Validar formulario
    if (!validateForm()) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)

    try {
      // Preparar datos para Firestore
      const contactData = {
        ...formData,
        phone: `${getSelectedCountryCallingCode()}${formData.phoneNumber}`,
        userId: session?.user?.id || null,
        userEmail: session?.user?.email || null,
        createdAt: serverTimestamp(),
        status: "Nuevo Contacto",
      }

      // Guardar en Firestore
      await addDoc(collection(db, "contacts"), contactData)

      // Éxito
      setSubmitStatus("success")
      setFormData(initialFormData)

      // Resetear después de 5 segundos
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 5000)
    } catch (error) {
      console.error("Error al enviar formulario:", error)
      setSubmitStatus("error")
      setErrorMessage(t("errors.submitFailed"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Mensajes de estado */}
      {submitStatus === "success" && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4">
          {t("form.successMessage")}
        </div>
      )}

      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Grid para layout horizontal en pantallas grandes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Columna izquierda */}
        <div className="space-y-5">
          {/* Nombre */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
              {t("form.name")} <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("form.namePlaceholder")}
              className="w-full"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
              {t("form.email")}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("form.emailPlaceholder")}
              className="w-full"
            />
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-muted-foreground">
              {t("form.phone")} <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {/* Selector de código de país */}
              <Select
                value={formData.phoneCountryCode}
                onValueChange={(value) => handleSelectChange("phoneCountryCode", value)}
              >
                <SelectTrigger className="w-[140px] flex-shrink-0">
                  <SelectValue>
                    {formData.phoneCountryCode ? (
                      <div className="flex items-center">
                        <span className="mr-2">{getFlagEmoji(formData.phoneCountryCode)}</span>
                        <span>{getSelectedCountryCallingCode()}</span>
                      </div>
                    ) : (
                      <span>Seleccionar</span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {countryOptions.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      <div className="flex items-center">
                        <span className="mr-2">{country.flag}</span>
                        <span className="mr-2">+{country.callingCode}</span>
                        <span className="text-sm text-muted-foreground">{country.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Campo de número de teléfono (solo números) */}
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder={t("form.phonePlaceholder")}
                className="flex-grow"
                required
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="space-y-5">
          {/* Ciudad */}
          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-medium text-muted-foreground">
              {t("form.city")} <span className="text-red-500">*</span>
            </label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder={t("form.cityPlaceholder")}
              className="w-full"
              required
            />
          </div>

          {/* Sector */}
          <div className="space-y-2">
            <label htmlFor="sector" className="block text-sm font-medium text-muted-foreground">
              {t("form.sector")} <span className="text-red-500">*</span>
            </label>
            <Select value={formData.sector} onValueChange={(value) => handleSelectChange("sector", value)}>
              <SelectTrigger>
                <SelectValue placeholder={t("form.sectorPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {sectorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de Generación */}
          <div className="space-y-2">
            <label htmlFor="generationType" className="block text-sm font-medium text-muted-foreground">
              {t("form.generationType")} <span className="text-red-500">*</span>
            </label>
            <Select value={formData.generationType} onValueChange={(value) => handleSelectChange("generationType", value)}>
              <SelectTrigger>
                <SelectValue placeholder={t("form.generationTypePlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {generationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mensaje */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">
          {t("form.message")}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("form.messagePlaceholder")}
          className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Botón de envío */}
      <Button type="submit" className="w-full py-6 text-base" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t("form.submitting")}
          </span>
        ) : (
          <span className="flex items-center">
            <Send className="mr-2 h-5 w-5" />
            {t("form.submit")}
          </span>
        )}
      </Button>
    </form>
  )
} 