import { createClient } from "@/lib/supabase/middleware"
import { NextResponse, type NextRequest } from "next/server"
import i18nConfig from "./i18nConfig"

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname starts with a locale
  const pathnameIsMissingLocale = i18nConfig.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Get browser's preferred language
    const acceptLanguage = request.headers.get("accept-language")
    let locale = i18nConfig.defaultLocale

    if (acceptLanguage) {
      // Parse the accept-language header
      const languages = acceptLanguage.split(",").map(lang => {
        const [code, q = "1"] = lang.trim().split(";q=")
        return { code: code.split("-")[0], q: parseFloat(q) }
      })

      // Sort by quality value
      languages.sort((a, b) => b.q - a.q)

      // Find the first supported language
      for (const lang of languages) {
        if (i18nConfig.locales.includes(lang.code)) {
          locale = lang.code
          break
        }
      }
    }

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    )
  }

  try {
    const { supabase, response } = createClient(request)

    const session = await supabase.auth.getSession()

    const redirectToChat = session && request.nextUrl.pathname === "/"

    if (redirectToChat) {
      const { data: homeWorkspace, error } = await supabase
        .from("workspaces")
        .select("*")
        .eq("user_id", session.data.session?.user.id)
        .eq("is_home", true)
        .single()

      if (!homeWorkspace) {
        throw new Error(error?.message)
      }

      return NextResponse.redirect(
        new URL(`/${homeWorkspace.id}/chat`, request.url)
      )
    }

    return response
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers
      }
    })
  }
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|auth).*)"]
}
