"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useAppContext } from "@/app/(root)/context"
import { trackFacebookEvent } from "@/helpers/pixel"

export default function BuyNow({
  id,
  name,
  image,
  price,
  priceWithoutDiscount,
  className = "",
  selectedVariant = {},
  quantity = 1,
}: {
  id: string
  name: string
  image: string
  price: number
  priceWithoutDiscount: number
  className?: string
  selectedVariant?: Record<string, string>
  quantity?: number
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()
  //@ts-ignore
  const { setCartData, cartData } = useAppContext()

  // Reset animation state when component unmounts
  useEffect(() => {
    return () => setIsAnimating(false)
  }, [])

  const handleBuyNow = async () => {
    setIsLoading(true)
    setIsAnimating(true)

    try {
      // Check if product with same ID and variant already exists in cart
      const existingItemIndex = cartData?.findIndex(
        (item: any) =>
          item.id === id && JSON.stringify(item.selectedVariant || {}) === JSON.stringify(selectedVariant || {}),
      )

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        setCartData((prev: any) => {
          const newCart = [...prev]
          newCart[existingItemIndex].quantity += quantity
          return newCart
        })
      } else {
        // Add new item to cart
        setCartData((prev: any) => [
          ...prev,
          {
            id,
            name,
            image,
            price,
            priceWithoutDiscount,
            quantity,
            selectedVariant,
          },
        ])
      }

      // Track Facebook event
      trackFacebookEvent("InitiateCheckout", {
        content_name: name,
        content_ids: [id],
        content_type: "product",
        value: price * quantity,
        currency: "UAH",
        contents: [
          {
            id: id,
            quantity: quantity,
            item_price: price,
          },
        ],
      })
      // Redirect to checkout after a short delay
      setTimeout(() => {
        router.push("/order")
      }, 500)
    } catch (error) {
      console.error("Error during buy now process:", error)
    } finally {
      setIsLoading(false)
      // Animation continues until redirect
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={handleBuyNow}
        disabled={isLoading}
        className="w-full bg-stone-800 hover:bg-stone-700 text-white rounded-none py-6 px-8 font-belleza tracking-wider group overflow-hidden relative"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? "ОБРОБКА..." : "КУПИТИ ЗАРАЗ"}
          <motion.span
            animate={isAnimating ? { x: [0, 8, 0] } : { x: [0, 5, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: isAnimating ? 0.8 : 1.5,
            }}
            className="inline-block"
          >
            →
          </motion.span>
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-stone-700 to-stone-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
      </Button>
      <div className="absolute top-0 left-0 w-full h-full border border-stone-500/20 transform translate-x-1 translate-y-1 pointer-events-none"></div>
    </div>
  )
}
