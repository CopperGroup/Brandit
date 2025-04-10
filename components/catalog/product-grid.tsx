"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProductCard from "./product-card"
import QuickViewModal from "./quick-view-modal"
import { Search } from "lucide-react"

export default function ProductGrid({ products, email, gridView }) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [quickViewProduct, setQuickViewProduct] = useState<string | null>(null)

  // Handle quick view
  const handleQuickView = (productId: string) => {
    setQuickViewProduct(productId)
  }

  // Close quick view
  const closeQuickView = () => {
    setQuickViewProduct(null)
  }

  return (
    <>
      {/* Products grid */}
      <div
        className={`grid gap-8 ${
          gridView === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-200px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group hover:translate-y-[-8px] transition-all duration-500"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <ProductCard
                product={product}
                email={email}
                gridView={gridView}
                onQuickView={handleQuickView}
                isHovered={hoveredProduct === product.id}
              />
            </motion.div>
          ))
        ) : (
          // Enhanced Empty state
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20 bg-white border border-stone-200 relative col-span-full"
          >
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-olive-700/30"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-olive-700/30"></div>

            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center relative">
              <Search className="h-10 w-10 text-stone-400" />
              <div className="absolute inset-0 border border-olive-700/20 rounded-full animate-pulse"></div>
            </div>
            <h3 className="font-belleza text-2xl text-stone-800 mb-4">Товари не знайдено</h3>
            <p className="text-stone-600 max-w-md mx-auto mb-8">
              Спробуйте змінити параметри фільтрації або скиньте всі фільтри, щоб побачити більше товарів.
            </p>
          </motion.div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal product={products.find((p) => p.id === quickViewProduct)} onClose={closeQuickView} />
        )}
      </AnimatePresence>
    </>
  )
}
