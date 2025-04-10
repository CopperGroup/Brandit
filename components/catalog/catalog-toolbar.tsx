"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Grid3X3, LayoutGrid, Map, SlidersHorizontal } from "lucide-react"
import { useAppContext } from "@/app/(root)/context"
import { useRouter, useSearchParams } from "next/navigation"

// Enhanced sort options with military terminology
const sortOptions = [
  { value: "default", label: "Новітні розробки" },
  { value: "low_price", label: "Ціна: від низької до високої" },
  { value: "hight_price", label: "Ціна: від високої до низької" },
  { value: "popularity", label: "Бойова популярність" },
  { value: "tactical", label: "Тактична ефективність" },
]

type ViewType = "grid" | "list"
type SortParams = "default" | "low_price" | "hight_price" | "popularity" | "tactical"

export default function CatalogToolbar({ totalProducts, onViewChange }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { catalogData, setCatalogData } = useAppContext()
  const [showSortOptions, setShowShowSortOptions] = useState(false)
  const [sort, setSort] = useState<SortParams>(catalogData.sort || "default")
  const [gridView, setGridView] = useState<ViewType>(
    (searchParams.get("view") as ViewType) || catalogData.view || "grid",
  )

  // Update context when sort or view changes
  useEffect(() => {
    setCatalogData({ ...catalogData, sort: sort, view: gridView })
  }, [sort, gridView])

  // Handle sort change
  const handleSortChange = (value: SortParams) => {
    setSort(value)
    setShowShowSortOptions(false)
  }

  // Handle view change
  const handleViewChange = (view: ViewType) => {
    // Update local state
    setGridView(view)

    // Update context
    setCatalogData({ ...catalogData, view: view })

    // Call the callback to update parent component
    if (onViewChange) {
      onViewChange(view)
    }

    // Update URL (for persistence between page loads)
    const params = new URLSearchParams(searchParams.toString())
    params.set("view", view)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="bg-white border border-stone-200 p-5 mb-10 flex flex-wrap items-center justify-between gap-4 relative group">
      <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex items-center gap-5">
        <div className="text-stone-600 text-sm flex items-center gap-2">
          <Map className="h-4 w-4 text-olive-700" />
          <span>
            Знайдено: <span className="font-medium text-stone-800">{totalProducts}</span> товарів
          </span>
        </div>

        {/* Enhanced Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowShowSortOptions(!showSortOptions)}
            className="flex items-center gap-2 text-stone-700 hover:text-olive-700 transition-colors group/sort"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-sm relative">
              Сортувати
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-olive-700/50 group-hover/sort:w-full transition-all duration-300"></span>
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${showSortOptions ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {showSortOptions && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-30"
                  onClick={() => setShowShowSortOptions(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 mt-2 z-40 bg-white border border-stone-200 shadow-md w-64"
                >
                  {sortOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className={`w-full text-left px-4 py-3 text-sm ${
                        sort === option.value
                          ? "bg-olive-700/10 text-olive-800 border-l-2 border-olive-700"
                          : "text-stone-700 hover:bg-stone-100 border-l-2 border-transparent"
                      } transition-colors`}
                      onClick={() => handleSortChange(option.value as SortParams)}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced View toggle */}
      <div className="flex items-center gap-2 border-l border-stone-200 pl-4">
        <button
          onClick={() => handleViewChange("grid")}
          className={`p-2 ${
            gridView === "grid"
              ? "text-olive-700 bg-olive-700/10 border-b-2 border-olive-700"
              : "text-stone-500 hover:text-stone-800 border-b-2 border-transparent"
          } transition-colors`}
          title="Сітка"
          aria-pressed={gridView === "grid"}
        >
          <Grid3X3 className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleViewChange("list")}
          className={`p-2 ${
            gridView === "list"
              ? "text-olive-700 bg-olive-700/10 border-b-2 border-olive-700"
              : "text-stone-500 hover:text-stone-800 border-b-2 border-transparent"
          } transition-colors`}
          title="Список"
          aria-pressed={gridView === "list"}
        >
          <LayoutGrid className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
