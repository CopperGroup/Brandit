"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Info } from "lucide-react"

type SelectParamsType = Record<string, { _id: string; value: string }[]>

export default function ProductVariantSelector({
  selectParams,
  productId,
}: {
  selectParams: SelectParamsType
  productId: string
}) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})

  // Handle variant selection
  const handleVariantSelect = (paramName: string, variantId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [paramName]: variantId,
    }))
  }

  if (!selectParams || Object.keys(selectParams).length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      {Object.entries(selectParams).map(([paramName, variants]) => (
        <div key={paramName} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-belleza text-lg text-stone-800">{paramName}</h3>
            {paramName === "Розмір" && (
              <Link href="/size-guide" className="text-olive-700 text-sm flex items-center gap-1 hover:underline group">
                <Info className="h-3.5 w-3.5 group-hover:animate-pulse" />
                Таблиця розмірів
              </Link>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => (
              <motion.button
                key={variant._id}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`min-w-[60px] h-12 border ${
                  selectedVariants[paramName] === variant._id
                    ? "border-olive-700 bg-olive-700 text-white shadow-md"
                    : "border-stone-300 bg-white text-stone-800 hover:border-olive-700/50"
                } transition-all duration-300 font-belleza relative overflow-hidden px-3`}
                onClick={() => handleVariantSelect(paramName, variant._id)}
              >
                {selectedVariants[paramName] === variant._id && (
                  <motion.span
                    className="absolute inset-0 bg-olive-600"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">{variant.value.replaceAll("_", " ")}</span>
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
