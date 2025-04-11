"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAppContext } from "@/app/(root)/context"
import { productAddedToCart } from "@/lib/actions/product.actions"
import { ShoppingBag, ShoppingCart } from "lucide-react"
import { trackFacebookEvent } from "@/helpers/pixel"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type AddToCartVariant =
  | "default" // Standard button with text
  | "full" // Wide button with icon and text
  | "icon-only" // Just the icon
  | "military" // Styled with military aesthetic
  | "minimal" // Subtle design for product cards
  | "quick-add" // For quick add on hover
  | "large" // Larger button for product pages

interface AddToCartProps {
  id: string
  name: string
  image: string
  price: number
  priceWithoutDiscount: number
  variant?: AddToCartVariant
  quantity?: number
  className?: string
  showQuantity?: boolean
  onAddToCart?: () => void
}

const AddToCart = ({
  id,
  name,
  image,
  price,
  priceWithoutDiscount,
  variant = "default",
  quantity = 1,
  className = "",
  showQuantity = false,
  onAddToCart,
}: AddToCartProps) => {
  const [isAdding, setIsAdding] = useState(false)
  //@ts-ignore
  const { cartData, setCartData } = useAppContext()

  async function AddDataToCart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    setIsAdding(true)

    try {
      let exist = 0
      let del = 0

      cartData.map((data: any, index: number) => {
        if (data.name == name) {
          exist = 1
          del = index
        }
      })

      if (exist == 0) {
        // Add to local cart state first
        setCartData((prev: any) => [...prev, { id, name, image, price, priceWithoutDiscount, quantity }])

        // Then try to update the server
        const result = await productAddedToCart(id)

        // If there was an error, show a toast but don't remove from cart

        if (onAddToCart) onAddToCart()
      } else {
        // Remove from cart
        cartData.splice(del, 1)
        setCartData((prev: any) => [...prev], cartData)

        // Show toas
      }
    } catch (error) {
      console.error("Error in AddToCart component:", error)
      // Show error toast
    } finally {
      setTimeout(() => setIsAdding(false), 500)
    }
  }

  // Check if product is already in cart
  const isInCart = cartData.some((item: any) => item.name === name)

  // Render different button variants
  switch (variant) {
    case "full":
      return (
        <Button
          variant="outline"
          className={`w-48 max-[425px]:w-full bg-white text-[#006AA7] border-[#006AA7] border hover:bg-[#006AA7] hover:text-white transition-all duration-300 rounded-lg shadow-sm ${className}`}
          onClick={AddDataToCart}
          disabled={isAdding}
        >
          <ShoppingCart className="mr-2" size={20} />
          {isInCart ? "В кошику" : "Додати в кошик"}
        </Button>
      )

    case "icon-only":
      return (
        <Button
          size="icon"
          className={`w-10 h-10 bg-olive-700 hover:bg-olive-600 text-white rounded-none flex items-center justify-center ${className}`}
          onClick={AddDataToCart}
          disabled={isAdding}
          aria-label="Додати в кошик"
        >
          <ShoppingBag className="h-5 w-5" />
        </Button>
      )

    case "military":
      return (
        <div className="relative">
          <Button
            className={`bg-olive-700 hover:bg-olive-600 text-white rounded-none py-4 px-6 font-belleza tracking-wider group overflow-hidden relative ${className}`}
            onClick={AddDataToCart}
            disabled={isAdding}
          >
            <span className="relative z-10 flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" /> {isInCart ? "В КОШИКУ" : "ДОДАТИ ДО КОШИКА"}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
          </Button>
          <div className="absolute top-0 left-0 w-full h-full border border-olive-500/20 transform translate-x-1 translate-y-1"></div>
        </div>
      )

    case "minimal":
      return (
        <Button
          variant="ghost"
          className={`text-stone-700 hover:text-olive-700 hover:bg-olive-50 p-2 h-auto ${className}`}
          onClick={AddDataToCart}
          disabled={isAdding}
        >
          <ShoppingBag className={`h-5 w-5 ${isInCart ? "fill-olive-700 text-olive-700" : ""}`} />
        </Button>
      )

    case "quick-add":
      return (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(`flex-1 bg-olive-700 hover:bg-olive-600 text-white py-2.5 font-belleza tracking-wider text-sm flex items-center justify-center gap-2 transition-colors` + className)}
          onClick={AddDataToCart}
          disabled={isAdding}
        >
          <ShoppingBag className="h-4 w-4" /> {isInCart ? "В КОШИКУ" : "ДОДАТИ"}
        </motion.button>
      )

    case "large":
      return (
        <div className="relative flex-1 min-w-[200px]">
          <Button
            className={`w-full bg-olive-700 hover:bg-olive-600 text-white rounded-none py-6 px-8 font-belleza tracking-wider group overflow-hidden relative ${className}`}
            onClick={AddDataToCart}
            disabled={isAdding}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isInCart ? "В КОШИКУ" : "ДОДАТИ ДО КОШИКА"}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
          </Button>
          <div className="absolute top-0 left-0 w-full h-full border border-olive-500/20 transform translate-x-1 translate-y-1"></div>
        </div>
      )

    default:
      return (
        <Button
          className={`bg-[#006AA7] text-white hover:bg-[#005a8e] px-9 z-20 transition-all duration-300 rounded-lg shadow-sm ${className}`}
          onClick={AddDataToCart}
          disabled={isAdding}
        >
          {isInCart ? "В кошику" : "У кошик"}
        </Button>
      )
  }
}

export default AddToCart
