"use client"

import { useRef, useState, useEffect } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import CatalogFilter from "./catalog-filter"
import CatalogToolbar from "./catalog-toolbar"
import ProductGrid from "./product-grid"
import CatalogPagination from "./catalog-pagination"
import { useSearchParams } from "next/navigation"
import { Store } from "@/constants/store"

export default function CatalogContent({
  products,
  categories,
  totalProducts,
  currentPage,
  totalPages,
  minPrice,
  maxPrice,
  vendors,
  unitParams,
  selectParams,
  email,
  searchParams,
}) {
  const searchParamsObj = useSearchParams()
  const [currentView, setCurrentView] = useState(searchParamsObj.get("view") || "grid")

  // Update view when URL params change
  useEffect(() => {
    setCurrentView(searchParamsObj.get("view") || "grid")
  }, [searchParamsObj])

  // Handle view change from toolbar
  const handleViewChange = (view) => {
    setCurrentView(view)
  }

  // Refs for scroll animations
  const catalogRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: catalogRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  return (
    <section ref={catalogRef} className="py-20 relative overflow-hidden">
      {/* Enhanced sophisticated background elements */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 -z-10 will-change-transform">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100 to-stone-50"></div>

        {/* Enhanced luxury paper texture overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        ></div>

        {/* Enhanced refined grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </motion.div>

      {/* Enhanced accent lines */}
      <div className="absolute top-0 left-0 w-1 h-60 bg-gradient-to-b from-olive-700/30 to-transparent -z-10"></div>
      <div className="absolute top-0 left-0 w-60 h-1 bg-gradient-to-r from-olive-700/30 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-1 h-60 bg-gradient-to-t from-olive-700/30 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-60 h-1 bg-gradient-to-l from-olive-700/30 to-transparent -z-10"></div>

      {/* Enhanced diagonal accent lines */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] border-[1px] border-olive-700/10 rotate-45 -z-10"></div>
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] border-[1px] border-olive-700/10 rotate-45 -z-10"></div>

      {/* Enhanced animated decorative circles */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-olive-700/5 blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      ></motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-stone-300/10 blur-3xl -z-10"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 5,
        }}
      ></motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced catalog introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-block mb-6">
            <span className="text-olive-700 text-xs tracking-[0.35em] uppercase font-light border-b border-olive-700/20 pb-2">
              Тактична колекція 2025
            </span>
          </div>

          <h2 className="font-belleza text-4xl md:text-5xl text-stone-900 tracking-wide leading-tight mb-6">
            ВІЙСЬКОВА ЕСТЕТИКА.
            <br />
            МІСЬКИЙ СТИЛЬ.
          </h2>

          <p className="text-stone-600 leading-relaxed">
            Наша колекція поєднує військову функціональність з міською елегантністю. Кожен елемент розроблений з увагою
            до деталей, використовуючи найякісніші матеріали та технології для забезпечення комфорту, довговічності та
            неперевершеного стилю.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Component */}
          <CatalogFilter
            categories={categories}
            minPrice={minPrice}
            maxPrice={maxPrice}
            vendors={vendors}
            unitParams={unitParams}
            selectParams={selectParams}
            searchParams={searchParams}
          />

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1"
          >
            {/* Toolbar Component */}
            <CatalogToolbar totalProducts={totalProducts} searchParams={searchParams} onViewChange={handleViewChange} />

            {/* Products Grid */}
            <ProductGrid products={products} email={email} gridView={currentView} />

            {/* Enhanced Military-inspired divider */}
            <div className="mt-20 mb-12 flex items-center justify-center">
              <div className="h-px w-24 bg-stone-300"></div>
              <div className="mx-6 w-12 h-12 rounded-full border border-olive-700/30 flex items-center justify-center relative">
                <div className="w-3 h-3 bg-olive-700/60 rounded-full"></div>
                <div className="absolute inset-0 border border-olive-700/20 rounded-full animate-pulse"></div>
              </div>
              <div className="h-px w-24 bg-stone-300"></div>
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <CatalogPagination currentPage={currentPage} totalPages={totalPages} searchParams={searchParams} />
            )}

            {/* Military-inspired decorative element */}
            <div className="mt-20 text-center">
              <div className="inline-block relative">
                <div className="absolute -top-3 -left-3 w-5 h-5 border-t border-l border-olive-700/30"></div>
                <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b border-r border-olive-700/30"></div>
                <span className="font-belleza text-stone-500 tracking-widest text-sm px-6">
                  {Store.name} TACTICAL COLLECTION
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
