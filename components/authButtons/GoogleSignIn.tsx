"use client"

import Image from "next/image"
import { signIn } from "next-auth/react"
import { cn } from "@/lib/utils"

export default function GoogleSignIn({ className, label }: { className?: string; label?: string }) {
  return (
    <button
      onClick={() => signIn("google")}
      className={cn(
        "bg-stone-800 hover:bg-stone-700 text-white py-3 font-belleza tracking-wider relative overflow-hidden group flex items-center justify-center gap-2 border border-stone-700 hover:border-stone-600 transition-colors duration-300",
        className,
      )}
    >
      <Image src="/google-logo.png" height={24} width={24} alt={"Google logo"} className="h-4 w-4" />
      <span>{label || "GOOGLE"}</span>
    </button>
  )
}
