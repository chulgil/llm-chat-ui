"use client"

import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { useRouter } from "next/navigation"

export function GithubLoginButton() {
  const router = useRouter()

  const signInWithGithub = async () => {
    const response = await fetch("/api/auth/github", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const { url } = await response.json()
    if (url) {
      router.push(url)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="flex items-center justify-center gap-2"
      onClick={signInWithGithub}
    >
      <Github className="size-4" />
      GitHub
    </Button>
  )
}
