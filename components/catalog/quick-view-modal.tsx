"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, X } from "lucide-react"
import AddToCart from "../shared/AddToCart"

// Import the AddToCart component

// Helper function to truncate text to 32 words
const truncateText = (text, wordLimit = 32) => {
  if (!text) return ""
  const words = text.split(" ")
  if (words.length <= wordLimit) return text
  return words.slice(0, wordLimit).join(" ") + "..."
}

export default function QuickViewModal({ product, onClose }) {
  const [isLiked, setIsLiked] = useState(false)

  // Handle like
  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  if (!product) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-auto z-[101]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[102] bg-white/90 hover:bg-stone-100 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors"
        >
          <X className="h-5 w-5 text-stone-700" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 border border-stone-200 md:max-h-none">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-olive-700/30 z-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-olive-700/30 z-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-olive-700/30 z-20 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-olive-700/30 z-20 pointer-events-none"></div>

            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />

            {/* Badges */}
            {product.discount && (
              <div className="absolute top-4 right-4 z-20">
                <div className="relative">
                  <div className="bg-olive-700 text-white px-3 py-1 text-xs tracking-wider font-medium">
                    -{product.discount}%
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full border border-olive-500/30 transform translate-x-1 translate-y-1"></div>
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 md:pt-6">
            <div className="mb-2 text-xs text-olive-700 tracking-wider uppercase">{product.category}</div>
            <h3 className="font-belleza text-2xl md:text-3xl text-stone-800 mb-4">{product.name}</h3>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-belleza text-2xl text-stone-800">{product.price} ₴</span>
              {product.priceWithoutDiscount && (
                <span className="text-sm text-stone-500 line-through">{product.priceWithoutDiscount} ₴</span>
              )}
            </div>

            <p className="text-stone-600 mb-6">
              {truncateText(
                product.description ||
                  "Військово-натхненний дизайн з увагою до деталей. Функціональність та стиль для повсякденного використання. Виготовлено з найякісніших матеріалів для максимальної довговічності.",
              )}
            </p>

            {/* Product specs */}
            {product.specs?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.specs.map((spec, i) => (
                  <span key={i} className="bg-stone-100 text-stone-700 text-xs px-3 py-1.5 border-l-2 border-olive-700">
                    {spec}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <AddToCart
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                priceWithoutDiscount={product.priceWithoutDiscount || product.price}
                variant="military"
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={handleLike}
                className={`border-stone-300 hover:border-olive-700 ${isLiked ? "text-olive-700 border-olive-700" : "text-stone-700"} hover:text-olive-700 rounded-none w-12 h-12 p-0 flex items-center justify-center`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-olive-700" : ""}`} />
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-stone-200">
              <Link
                href={`/catalog/${product.id}`}
                className="text-olive-700 hover:text-olive-600 font-belleza flex items-center gap-2 group"
              >
                ПЕРЕГЛЯНУТИ ДЕТАЛІ ТОВАРУ
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
