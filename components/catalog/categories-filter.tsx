"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronRight, Search, X } from "lucide-react"

// Define types for our component
interface CategoryType {
  name: string
  categoryId: string
  totalProducts: number
  subCategories: string[]
}

interface CategoryWithSubCategories {
  name: string
  categoryId: string
  totalProducts: number
  subCategories: CategoryWithSubCategories[]
  calculatedTotalProducts?: number
}

const CategoriesFilter = ({ categories, filter, setFilter }) => {
  const [categorySearchTerm, setCategorySearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState({})
  const categoriesContainerRef = useRef(null)
  const scrollPositionRef = useRef(0)

  // Save scroll position before expanding/collapsing or selecting
  useEffect(() => {
    const container = categoriesContainerRef.current
    if (container) {
      const handleScroll = () => {
        scrollPositionRef.current = container.scrollTop
      }

      container.addEventListener("scroll", handleScroll)
      return () => {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // Restore scroll position after expanding/collapsing
  useEffect(() => {
    const container = categoriesContainerRef.current
    if (container) {
      container.scrollTop = scrollPositionRef.current
    }
  }, [expandedCategories])

  // Restore scroll position after filter changes (category selection)
  useEffect(() => {
    const container = categoriesContainerRef.current
    if (container) {
      container.scrollTop = scrollPositionRef.current
    }
  }, [filter.categories])

  // Transform flat categories into hierarchical structure
  function transformCategories(categories: CategoryType[]): CategoryWithSubCategories[] {
    const categoryObj: Record<string, CategoryWithSubCategories> = {}

    // Create category entries in the object
    categories.forEach((category) => {
      categoryObj[category.categoryId] = {
        name: category.name,
        categoryId: category.categoryId,
        totalProducts: category.totalProducts,
        subCategories: [],
      }
    })

    // Populate subcategories for each category
    categories.forEach((category) => {
      if (category.subCategories?.length > 0) {
        category.subCategories.forEach((subCategoryId) => {
          const subCategory = categoryObj[subCategoryId]
          if (subCategory) {
            categoryObj[category.categoryId].subCategories.push(subCategory)
          }
        })
      }
    })

    // Return only root categories (those that are not subcategories of any other category)
    return Object.values(categoryObj).filter((cat) => {
      return !categories.some((c) => c.subCategories && c.subCategories.includes(cat.categoryId))
    })
  }

  // Calculate total products for a category including all its subcategories
  const calculateTotalProducts = (category: CategoryWithSubCategories): number => {
    let total = category.totalProducts

    if (category.subCategories && category.subCategories.length > 0) {
      category.subCategories.forEach((subCat) => {
        total += calculateTotalProducts(subCat)
      })
    }

    return total
  }

  // Add calculated total products to each category
  const addCalculatedTotals = (categories: CategoryWithSubCategories[]): CategoryWithSubCategories[] => {
    return categories.map((category) => {
      const calculatedTotalProducts = calculateTotalProducts(category)

      return {
        ...category,
        calculatedTotalProducts,
        subCategories: addCalculatedTotals(category.subCategories),
      }
    })
  }

  // Get all subcategory IDs recursively
  const getAllSubcategoryIds = (category: CategoryWithSubCategories): string[] => {
    const ids = [category.categoryId]

    if (category.subCategories && category.subCategories.length > 0) {
      category.subCategories.forEach((subCat) => {
        ids.push(...getAllSubcategoryIds(subCat))
      })
    }

    return ids
  }

  // Handle category selection/deselection with propagation to children
  const handleCategorySelect = (
    category: CategoryWithSubCategories,
    checked: boolean,
    event?: React.MouseEvent,
  ): void => {
    // Save current scroll position
    if (categoriesContainerRef.current) {
      scrollPositionRef.current = categoriesContainerRef.current.scrollTop
    }

    // Prevent event propagation if event is provided
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    const allIds = getAllSubcategoryIds(category)

    setFilter((prevFilter) => {
      let newCategories: string[]

      if (checked) {
        // Add this category and all its subcategories
        const uniqueCategories = [...new Set([...prevFilter.categories, ...allIds])]
        newCategories = uniqueCategories
      } else {
        // Remove this category and all its subcategories
        newCategories = prevFilter.categories.filter((id) => !allIds.includes(id))
      }

      return {
        ...prevFilter,
        page: "1",
        categories: newCategories,
      }
    })
  }

  // Toggle category expansion
  const toggleCategory = (categoryId: string, event: React.MouseEvent): void => {
    // Save current scroll position
    if (categoriesContainerRef.current) {
      scrollPositionRef.current = categoriesContainerRef.current.scrollTop
    }

    // Prevent event propagation to avoid any default behaviors
    event.stopPropagation()

    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  // Expand all parent categories of matching search results
  const expandParentsOfMatches = (categories: CategoryWithSubCategories[], searchTerm: string): void => {
    const newExpanded = { ...expandedCategories }

    const checkAndExpandParents = (cats: CategoryWithSubCategories[]): boolean => {
      let hasMatch = false

      cats.forEach((cat) => {
        // Check if this category matches the search
        const matches = cat.name.toLowerCase().includes(searchTerm.toLowerCase())

        // Check if any subcategories match
        let subMatches = false
        if (cat.subCategories.length > 0) {
          subMatches = checkAndExpandParents(cat.subCategories)
        }

        // If this category or any subcategories match, expand this category
        if (matches || subMatches) {
          newExpanded[cat.categoryId] = true
          hasMatch = true
        }
      })

      return hasMatch
    }

    checkAndExpandParents(categories)
    setExpandedCategories(newExpanded)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchTerm = e.target.value
    setCategorySearchTerm(searchTerm)

    if (searchTerm) {
      expandParentsOfMatches(categoriesWithTotals, searchTerm)
    }
  }

  // Clear search
  const clearSearch = (): void => {
    setCategorySearchTerm("")
  }

  // Filter categories based on search term
  const filterCategoriesBySearchTerm = (cats: CategoryWithSubCategories[]): CategoryWithSubCategories[] => {
    if (!categorySearchTerm) return cats

    return cats
      .filter((cat) => {
        const matchesSearch = cat.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
        const hasMatchingChildren =
          cat.subCategories.length > 0 && filterCategoriesBySearchTerm(cat.subCategories).length > 0

        return matchesSearch || hasMatchingChildren
      })
      .map((cat) => ({
        ...cat,
        subCategories: filterCategoriesBySearchTerm(cat.subCategories),
      }))
  }

  // Transform categories
  const transformedCategories = useMemo<CategoryWithSubCategories[]>(
    () => transformCategories(categories),
    [categories],
  )

  // Add calculated total products to each category
  const categoriesWithTotals = useMemo<CategoryWithSubCategories[]>(
    () => addCalculatedTotals(transformedCategories),
    [transformedCategories],
  )

  // Filter categories based on search
  const filteredCategories = useMemo<CategoryWithSubCategories[]>(
    () => (categorySearchTerm ? filterCategoriesBySearchTerm(categoriesWithTotals) : categoriesWithTotals),
    [categorySearchTerm, categoriesWithTotals],
  )

  // Calculate if a category is in indeterminate state
  const isIndeterminate = (category: CategoryWithSubCategories): boolean => {
    if (filter.categories.includes(category.categoryId)) return false

    const allSubIds = getAllSubcategoryIds(category).filter((id) => id !== category.categoryId)
    const someSelected = allSubIds.some((id) => filter.categories.includes(id))
    const allSelected = allSubIds.length > 0 && allSubIds.every((id) => filter.categories.includes(id))

    return someSelected && !allSelected
  }

  // Highlight text that matches search
  const highlightMatch = (text: string) => {
    if (!categorySearchTerm) return text

    try {
      const regex = new RegExp(`(${categorySearchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
      const parts = text.split(regex)

      return (
        <>
          {parts.map((part, i) => {
            if (part.toLowerCase() === categorySearchTerm.toLowerCase()) {
              return (
                <span key={i} className="bg-olive-100 text-olive-800">
                  {part}
                </span>
              )
            }
            return part
          })}
        </>
      )
    } catch (e) {
      // Fallback in case of regex error
      return text
    }
  }

  // Recursive category component
  const CategoryItem = ({
    category,
    depth = 0,
  }: {
    category: CategoryWithSubCategories
    depth?: number
  }) => {
    const hasSubcategories = category.subCategories && category.subCategories.length > 0
    const isChecked = filter.categories.includes(category.categoryId)
    const indeterminate = isIndeterminate(category)
    const isExpanded = !!expandedCategories[category.categoryId]

    // Handle checkbox click with event
    const handleCheckboxClick = (e: React.MouseEvent) => {
      handleCategorySelect(category, !isChecked, e)
    }

    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`flex items-center gap-2 py-2 px-1 rounded-md hover:bg-stone-50 transition-colors group ${
            categorySearchTerm && category.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
              ? "bg-olive-50"
              : ""
          }`}
        >
          {hasSubcategories && (
            <button
              onClick={(e) => toggleCategory(category.categoryId, e)}
              className="p-1 rounded-sm hover:bg-olive-100 focus:outline-none focus:ring-1 focus:ring-olive-700/30 transition-colors"
              aria-label={isExpanded ? "Collapse category" : "Expand category"}
              type="button"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-olive-700" />
              ) : (
                <ChevronRight className="h-4 w-4 text-olive-700" />
              )}
            </button>
          )}
          {!hasSubcategories && <div className="w-6" />}

          <div className="flex-1 flex items-center gap-2">
            <div onClick={handleCheckboxClick} className="cursor-pointer">
              <Checkbox
                id={category.categoryId}
                className="size-4 rounded-none border-stone-400 data-[state=checked]:bg-olive-700 data-[state=checked]:text-white"
                checked={isChecked}
                data-state={indeterminate ? "indeterminate" : isChecked ? "checked" : "unchecked"}
                // Use a dummy handler since we're handling clicks at the wrapper level
                onCheckedChange={() => {}}
              />
            </div>
            <label
              htmlFor={category.categoryId}
              className="font-belleza text-stone-700 leading-none flex-1 cursor-pointer group-hover:text-olive-800 transition-colors"
              onClick={handleCheckboxClick}
            >
              {highlightMatch(category.name)}
            </label>
            <span className="text-xs text-stone-500 font-medium bg-stone-100 px-2 py-0.5 rounded-full">
              {category.calculatedTotalProducts}
            </span>
          </div>
        </div>

        <AnimatePresence>
          {hasSubcategories && isExpanded && (
            <motion.div
              className="ml-5 pl-2 border-l border-olive-200"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {category.subCategories.map((subCategory) => (
                <CategoryItem key={subCategory.categoryId} category={subCategory} depth={depth + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  // Count selected categories
  const selectedCount = filter.categories.length

  return (
    <motion.div
      className="bg-white border border-stone-200 relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="p-6">
        <h3 className="font-belleza text-xl text-stone-800 mb-6 relative inline-flex items-center gap-2">
          ТАКТИЧНІ КАТЕГОРІЇ
          {selectedCount > 0 && (
            <span className="text-xs font-normal bg-olive-700 text-white px-2 py-0.5 rounded-full">
              {selectedCount}
            </span>
          )}
          <motion.span
            className="absolute -bottom-1 left-0 h-[1px] bg-olive-700/50 w-full"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          ></motion.span>
        </h3>

        <div className="relative mt-4 mb-4 group/search">
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-olive-700/30 opacity-0 group-hover/search:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-olive-700/30 opacity-0 group-hover/search:opacity-100 transition-opacity duration-300"></div>

          <div className="relative">
            <input
              type="text"
              placeholder="Пошук категорій..."
              value={categorySearchTerm}
              onChange={handleSearchChange}
              className="w-full bg-white border border-stone-200 py-2 pl-9 pr-9 focus:outline-none focus:border-olive-700 transition-colors font-belleza text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            {categorySearchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                aria-label="Clear search"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div
          ref={categoriesContainerRef}
          className="max-h-[350px] overflow-y-auto pr-1 space-y-1 scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-stone-100"
        >
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => <CategoryItem key={category.categoryId} category={category} />)
          ) : (
            <div className="text-center py-6 text-stone-500 font-belleza">
              <div className="inline-block relative">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-olive-700/30"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-olive-700/30"></div>
                <span className="px-4">Категорії не знайдено</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default CategoriesFilter
