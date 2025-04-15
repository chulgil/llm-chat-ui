"use client"

import { createInstance } from "i18next"
import { I18nextProvider } from "react-i18next"
import { useEffect, useState } from "react"
import initTranslations from "@/lib/i18n"

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: any) {
  const [i18n, setI18n] = useState<any>(null)

  useEffect(() => {
    const init = async () => {
      const instance = createInstance()
      const { i18n: initializedI18n } = await initTranslations(
        locale,
        namespaces,
        instance,
        resources
      )
      initializedI18n.changeLanguage(locale)
      setI18n(initializedI18n)
    }

    init()
  }, [locale, namespaces, resources])

  if (!i18n) {
    return null
  }

  return (
    <I18nextProvider i18n={i18n} defaultNS={namespaces[0]}>
      {children}
    </I18nextProvider>
  )
}
