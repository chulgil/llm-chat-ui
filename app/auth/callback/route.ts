import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next")

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {
      data: { session }
    } = await supabase.auth.exchangeCodeForSession(code)

    if (session) {
      const { data: homeWorkspace, error } = await supabase
        .from("workspaces")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("is_home", true)
        .single()

      if (!homeWorkspace) {
        return NextResponse.redirect(new URL("/setup", requestUrl.origin))
      }

      return NextResponse.redirect(
        new URL(`/${homeWorkspace.id}/chat`, requestUrl.origin)
      )
    }
  }

  if (next) {
    return NextResponse.redirect(new URL(next, requestUrl.origin))
  }

  return NextResponse.redirect(new URL("/", requestUrl.origin))
}
