"use client"

import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export default function CatalogPagination({ currentPage, totalPages, searchParams }) {
  const router = useRouter()
  const pathname = usePathname()

  // Handle page change
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-12 flex justify-center"
    >
      <div className="flex border border-stone-200 relative">
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-olive-700/30"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-olive-700/30"></div>

        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`w-12 h-12 flex items-center justify-center border-r border-stone-200 ${
            currentPage === 1 ? "text-stone-400 cursor-not-allowed" : "text-stone-700 hover:bg-stone-100"
          }`}
        >
          <ChevronRight className="h-5 w-5 transform rotate-180" />
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`w-12 h-12 flex items-center justify-center border-r border-stone-200 font-belleza ${
              currentPage === index + 1 ? "bg-olive-700 text-white" : "text-stone-700 hover:bg-stone-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`w-12 h-12 flex items-center justify-center ${
            currentPage === totalPages ? "text-stone-400 cursor-not-allowed" : "text-stone-700 hover:bg-stone-100"
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  )
}
