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
  country: string
  serviceType: string
  message: string
}

// Estado inicial del formulario
const initialFormData: FormData = {
  name: "",
  email: "",
  phoneCountryCode: "BO", // Bolivia por defecto
  phoneNumber: "",
  country: "BO", // Bolivia por defecto
  serviceType: "",
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

export default function ContactFormEmedue() {
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

  // Opciones para los servicios
  const serviceOptions = [
    { value: "design", label: t('form.generationTypes.bipv') },
    { value: "construction", label: t('form.generationTypes.photovoltaic') },
    { value: "supervision", label: t('form.generationTypes.wind') },
    { value: "training", label: t('form.sectors.public') },
    { value: "consultation", label: t('form.sectors.commercial') },
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
      setErrorMessage(t('form.nameRequired'))
      return false
    }
    if (!formData.phoneNumber) {
      setErrorMessage(t('form.phoneRequired'))
      return false
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage(t('form.emailInvalid'))
      return false
    }
    if (!formData.country) {
      setErrorMessage(t('form.countryRequired'))
      return false
    }
    if (!formData.serviceType) {
      setErrorMessage(t('form.serviceTypeRequired'))
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
        type: "emedue_construction_contact",
        source: "emedue_form",
      }

      // Guardar en Firestore
      await addDoc(collection(db, "contacts"), contactData)

      // Éxito
      setSubmitStatus("success")
      setFormData({
        ...initialFormData,
        country: formData.country, // Mantener país seleccionado
        phoneCountryCode: formData.phoneCountryCode, // Mantener código de país
      })

      // Resetear después de 5 segundos
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 5000)
    } catch (error) {
      console.error("Error al enviar formulario:", error)
      setSubmitStatus("error")
      setErrorMessage(t('form.submitError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center space-y-4 bg-green-50 border border-green-200 rounded-lg p-8">
          <div className="h-16 w-16 text-green-500 mx-auto flex items-center justify-center">
            <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-green-700">¡Mensaje Enviado!</h3>
          <p className="text-gray-600">
            Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo muy pronto.
          </p>
          <div className="bg-green-100 border border-green-300 rounded-lg p-4">
            <p className="text-sm text-green-700">
              <strong>📱 Nos contactaremos contigo por WhatsApp en las próximas 2 horas</strong>
            </p>
          </div>
          <Button onClick={() => setSubmitStatus("idle")} variant="outline" className="mt-4">
            Enviar otro mensaje
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mensajes de estado */}
        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Grid para layout - 2 columnas en desktop, 1 en mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="space-y-5">
            {/* Nombre */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                {t('form.name')} <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('form.namePlaceholder')}
                className="w-full"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                {t('form.email')} ({t('form.emailOptional')})
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('form.emailPlaceholder')}
                className="w-full"
              />
            </div>

            {/* Tipo de Servicio */}
            <div className="space-y-2">
              <label htmlFor="serviceType" className="block text-sm font-medium text-muted-foreground">
                {t('form.serviceType')} <span className="text-red-500">*</span>
              </label>
              <Select value={formData.serviceType} onValueChange={(value) => handleSelectChange("serviceType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('form.serviceTypePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
          </div>

          {/* Columna derecha */}
          <div className="space-y-5">
            {/* País */}
            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-muted-foreground">
                {t('form.country')} <span className="text-red-500">*</span>
              </label>
              <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                <SelectTrigger>
                  <SelectValue>
                    {formData.country ? (
                      <div className="flex items-center">
                        <span className="mr-2">{getFlagEmoji(formData.country)}</span>
                        <span>{en[formData.country as keyof typeof en] || formData.country}</span>
                      </div>
                    ) : (
                      <span>{t('form.countrySelectPlaceholder')}</span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {countryOptions.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      <div className="flex items-center">
                        <span className="mr-2">{country.flag}</span>
                        <span>{country.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Teléfono */}
            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-muted-foreground">
                {t('form.phone')} <span className="text-red-500">*</span>
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
                        <span>{t('form.phoneCountryCodePlaceholder')}</span>
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
                  placeholder={t('form.phoneNumberPlaceholder')}
                  className="flex-grow"
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
            </div>

            
          </div>
        </div>

        {/* Mensaje - ancho completo */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-muted-foreground">
            {t('form.message')} ({t('form.messageOptional')})
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t('form.messagePlaceholder')}
            className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical"
          />
        </div>

        {/* Botón de envío */}
        <Button type="submit" className="w-full py-6 text-base bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
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
              {t('form.submitting')}...
            </span>
          ) : (
            <span className="flex items-center">
              <Send className="mr-2 h-5 w-5" />
              {t('form.sendMessage')}
            </span>
          )}
        </Button>

      </form>
    </div>
  )
}


