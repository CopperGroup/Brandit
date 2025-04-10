"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, ChevronDown, X, Target } from "lucide-react"
import { createSearchString, sleep } from "@/lib/utils"
import { useAppContext } from "@/app/(root)/context"
import CategoriesFilter from "./categories-filter"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Store } from "@/constants/store"

// Add this custom hook for debouncing
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default function CatalogFilter({
  categories,
  minPrice,
  maxPrice,
  checkParams,
  unitParams,
  selectParams,
  category,
  delay,
  counts,
}) {
  const router = useRouter()
  const pathname = usePathname()
  const search = useSearchParams()
  const page = search.get("page")
  const { catalogData, setCatalogData } = useAppContext()

  // State for filter settings
  const [filter, setFilter] = useState({
    page: "1",
    price: [minPrice, maxPrice],
    categories: [],
    vendors: [],
    selectParamsValues: [],
    unitParamsValues: [],
  })

  // Add this after the existing state declarations
  const [searchInput, setSearchInput] = useState("")
  const debouncedSearchTerm = useDebounce(searchInput, 500) // 500ms debounce delay

  // Ensure checkParams is defined
  const safeCheckParams = checkParams || { vendors: [] }
  const safeCounts = counts || { categoriesCount: {}, vendorsCount: {} }

  // UI state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState([])
  const [checkParamsSearchTerms, setCheckParamsSearchTerms] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)
  const [prevSearch, setPrevSearch] = useState("")
  const [prevSort, setPrevSort] = useState("")

  // Refs
  const filterButtonRef = useRef(null)
  const divRef = useRef(null)

  // Initialize filter from URL params
  useEffect(() => {
    const searchParams = Object.fromEntries(search.entries())
    const searchTerm = searchParams.search || ""

    setFilter((prev) => ({
      ...prev,
      page: page || "1",
      price: [
        Number.parseFloat(searchParams.minPrice || minPrice.toString()),
        Number.parseFloat(searchParams.maxPrice || maxPrice.toString()),
      ],
      categories: searchParams.categories ? searchParams.categories.split(",") : [],
      vendors: searchParams.vendor ? searchParams.vendor.split(",") : [],
      selectParamsValues: searchParams.categories
        ? searchParams.selectParams
          ? searchParams.selectParams.split(",")
          : []
        : [],
      unitParamsValues: searchParams.categories
        ? searchParams.unitParams
          ? searchParams.unitParams.split(",")
          : []
        : [],
    }))

    setSearchInput(searchTerm)
    const currentSort = searchParams.sort || "default"
    setCatalogData((prev) => ({ ...prev, sort: currentSort, search: searchTerm }))
    setPrevSort(currentSort)
    setPrevSearch(searchTerm)
    setIsLoaded(true)
  }, [search, minPrice, maxPrice, checkParams, categories, counts, setCatalogData])

  // Update the useEffect that handles search/sort changes to use the debounced search term
  // Replace the existing useEffect that applies filters when search or sort changes with this:
  useEffect(() => {
    if (!isLoaded) return

    // Only apply filters when debounced search or sort changes
    if (debouncedSearchTerm !== prevSearch || catalogData.sort !== prevSort) {
      const applySearchOrSortChange = async () => {
        await sleep(delay)

        const searchString = createSearchString({
          pNumber: filter.page,
          sort: catalogData.sort,
          categories: filter.categories,
          vendors: filter.vendors,
          search: debouncedSearchTerm, // Use debounced search term here
          price: filter.price,
          category,
          minPrice,
          maxPrice,
          selectParamsValues: filter.categories.length > 0 ? filter.selectParamsValues : [],
          unitParamsValues: filter.categories.length > 0 ? filter.unitParamsValues : [],
        })
        router.push(`/catalog?${searchString}`)
        setPrevSearch(debouncedSearchTerm)
        setPrevSort(catalogData.sort)
      }

      applySearchOrSortChange()
    }
  }, [
    debouncedSearchTerm, // Use debounced search term in dependencies
    catalogData.sort,
    isLoaded,
    prevSearch,
    prevSort,
    filter.page,
    filter.categories,
    filter.vendors,
    filter.price,
    filter.selectParamsValues,
    filter.unitParamsValues,
    category,
    minPrice,
    maxPrice,
    delay,
    router,
  ])

  // Get screen width on mount
  useEffect(() => {
    const currentScreenWidth = window.screen.width
    setScreenWidth(currentScreenWidth)
  }, [])

  // Toggle filter sections
  const toggleFilter = (filterId) => {
    setExpandedFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  // Handle price range change
  const handlePriceChange = (newValue) => {
    setFilter({ ...filter, page: "1", price: newValue })
  }

  // Handle checkbox change for vendors and other checkParams
  const handleCheckboxChange = (param, value) => {
    const isChecked = filter[param].includes(value)

    setFilter((prevFilter) => {
      if (!isChecked) {
        return { ...prevFilter, page: "1", [param]: [...prevFilter[param], value] }
      } else {
        return { ...prevFilter, page: "1", [param]: prevFilter[param].filter((item) => item !== value) }
      }
    })
  }

  // Handle select param change
  const handleSelectParamChange = (paramName, value) => {
    setFilter((prevFilter) => {
      // Find if the param already exists in the selectParamsValues
      const existingEntry = prevFilter.selectParamsValues.find((entry) => entry.startsWith(`${paramName}--`))

      let updatedParams = [...prevFilter.selectParamsValues]

      if (existingEntry) {
        // Remove the `${paramName}--` prefix and split the values by `__`
        const values = existingEntry.replace(`${paramName}--`, "").split("__")

        if (values.includes(value)) {
          // Remove the value from the array if it's already selected
          const updatedValues = values.filter((v) => v !== value)

          if (updatedValues.length > 0) {
            // Update the selectParamsValues with the modified values
            updatedParams = updatedParams.map((entry) =>
              entry.startsWith(`${paramName}--`) ? `${paramName}--${updatedValues.join("__")}` : entry,
            )
          } else {
            // If no values are left, remove this param completely
            updatedParams = updatedParams.filter((entry) => !entry.startsWith(`${paramName}--`))
          }
        } else {
          // Add new value to the list if not already selected
          updatedParams = updatedParams.map((entry) =>
            entry.startsWith(`${paramName}--`) ? `${paramName}--${[...values, value].join("__")}` : entry,
          )
        }
      } else {
        // If the param doesn't exist in the list, add it
        updatedParams.push(`${paramName}--${value}`)
      }

      return { ...prevFilter, page: "1", selectParamsValues: updatedParams }
    })
  }

  // Handle unit param change
  const handleUnitParamChange = (paramName, min, max) => {
    setFilter((prevFilter) => {
      const { unitParamsValues } = prevFilter
      const existingEntryIndex = unitParamsValues.findIndex((entry) => entry.startsWith(`${paramName}--`))

      const paramMin = unitParams[paramName]?.min
      const paramMax = unitParams[paramName]?.max

      let updatedParams = [...unitParamsValues]

      if (min === paramMin && max === paramMax) {
        // Remove the param from the array if it matches the full range
        updatedParams = updatedParams.filter((entry) => !entry.startsWith(`${paramName}--`))
      } else {
        const newEntry = `${paramName}--${min}m${max}`
        if (existingEntryIndex !== -1) {
          // Replace the existing entry
          updatedParams[existingEntryIndex] = newEntry
        } else {
          // Add new entry
          updatedParams.push(newEntry)
        }
      }

      return { ...prevFilter, page: "1", unitParamsValues: updatedParams }
    })
  }

  // Toggle mobile filter visibility
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen)
  }

  // Handle search term change for checkParams
  const handleSearchChange = (param, value) => {
    setCheckParamsSearchTerms((prev) => ({ ...prev, [param]: value }))
  }

  // Filter values based on search term
  const filterValues = (param, values) => {
    if (!values) return []
    const searchTerm = checkParamsSearchTerms[param] || ""
    return values.filter((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  // Apply filters - only called when button is clicked
  const applyFilters = async () => {
    await sleep(delay)

    const searchString = createSearchString({
      pNumber: filter.page,
      sort: catalogData.sort,
      categories: filter.categories,
      vendors: filter.vendors,
      search: debouncedSearchTerm, // Use debounced search term here
      price: filter.price,
      category,
      minPrice,
      maxPrice,
      selectParamsValues: filter.categories.length > 0 ? filter.selectParamsValues : [],
      unitParamsValues: filter.categories.length > 0 ? filter.unitParamsValues : [],
    })
    router.push(`/catalog?${searchString}`)
    setMobileFiltersOpen(false)
    setPrevSearch(debouncedSearchTerm)
    setPrevSort(catalogData.sort)
  }

  // Update the resetFilters function to also reset the searchInput state
  const resetFilters = () => {
    router.push(pathname)
    setFilter({
      page: "1",
      price: [minPrice, maxPrice],
      categories: [],
      vendors: [],
      selectParamsValues: [],
      unitParamsValues: [],
    })
    setSearchInput("")
    setCatalogData((prev) => ({ ...prev, search: "", sort: "default" }))
    setPrevSearch("")
    setPrevSort("default")
  }

  // Update the handleSearchInputChange function to set the searchInput state
  const handleSearchInputChange = (value) => {
    setSearchInput(value)
    setCatalogData((prev) => ({ ...prev, search: value }))
  }

  // Handle sort change
  const handleSortChange = (value) => {
    setCatalogData((prev) => ({ ...prev, sort: value }))
  }

  // Define check params names and their Ukrainian translations
  const checkParamsNames = ["vendors"]
  const checkParamsNamesUa = { vendors: "Виробник" }

  return (
    <>
      {/* Desktop Filter */}
      <motion.aside
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-72 flex-shrink-0 hidden lg:block"
      >
        <div className="sticky top-24 space-y-8">
          {/* Enhanced Search */}
          <div className="relative group">
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <input
              type="text"
              placeholder="Тактичний пошук..."
              value={searchInput}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              className="w-full bg-white border border-stone-200 py-4 pl-12 pr-4 focus:outline-none focus:border-olive-700 transition-colors font-belleza"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 group-hover:text-olive-700 transition-colors duration-300" />
          </div>

          {/* Categories */}
          <CategoriesFilter categories={categories} filter={filter} setFilter={setFilter} />

          {/* Enhanced Filters - Vendors */}
          {checkParamsNames.map((param) => (
            <motion.div
              key={param}
              className="bg-white border border-stone-200 relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <button
                onClick={() => toggleFilter(param)}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <h3 className="font-belleza text-xl text-stone-800">{checkParamsNamesUa[param]}</h3>
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-olive-700/10 transition-colors">
                  <ChevronDown
                    className={`h-5 w-5 text-stone-500 transition-transform duration-300 ${
                      expandedFilters.includes(param) ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {expandedFilters.includes(param) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 border-t border-stone-100">
                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder={`Пошук ${checkParamsNamesUa[param].toLowerCase()}...`}
                          value={checkParamsSearchTerms[param] || ""}
                          onChange={(e) => handleSearchChange(param, e.target.value)}
                          className="w-full bg-white border border-stone-200 py-2 pl-9 pr-4 focus:outline-none focus:border-olive-700 transition-colors font-belleza text-sm"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                      </div>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {safeCheckParams[param] &&
                          filterValues(param, safeCheckParams[param]).map((value, index) => (
                            <div key={index} className="flex items-center justify-between group/option">
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id={`desktop-${param}-${value}`}
                                  className="rounded-none data-[state=checked]:bg-olive-700 data-[state=checked]:border-olive-700 h-5 w-5"
                                  checked={filter[param].includes(value)}
                                  onCheckedChange={() => handleCheckboxChange(param, value)}
                                />
                                <label
                                  htmlFor={`desktop-${param}-${value}`}
                                  className="text-stone-700 cursor-pointer group-hover/option:text-olive-800 transition-colors font-belleza"
                                >
                                  {value}
                                </label>
                              </div>
                              <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                                {safeCounts[`${param}Count`] && safeCounts[`${param}Count`][value]
                                  ? safeCounts[`${param}Count`][value]
                                  : 0}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Enhanced Select Params */}
          {Object.entries(selectParams).length > 0 && (
            <motion.div
              className="bg-white border border-stone-200 relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <button
                onClick={() => toggleFilter("selectParams")}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <h3 className="font-belleza text-xl text-stone-800">Параметри</h3>
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-olive-700/10 transition-colors">
                  <ChevronDown
                    className={`h-5 w-5 text-stone-500 transition-transform duration-300 ${
                      expandedFilters.includes("selectParams") ? "transform rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {expandedFilters.includes("selectParams") && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 border-t border-stone-100">
                      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                        {Object.entries(selectParams).map(([paramName, paramData]) => (
                          <div key={paramName} className="border-b border-stone-100 pb-4 last:border-0 last:pb-0">
                            <h4 className="font-belleza text-stone-700 mb-3 relative inline-block">
                              {paramName}
                              <motion.span
                                className="absolute -bottom-1 left-0 h-[1px] bg-olive-700/30 w-full"
                                initial={{ scaleX: 0, originX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                              ></motion.span>
                            </h4>
                            <div className="space-y-2 pl-1">
                              {paramData.values.map(({ value, valueTotalProducts }, index) => {
                                // Find the existing entry for the param in selectParamsValues
                                const existingEntry = filter.selectParamsValues.find((entry) =>
                                  entry.startsWith(`${paramName}--`),
                                )

                                // Initialize isChecked as false
                                let isChecked = false

                                if (existingEntry) {
                                  // Remove `${paramName}--` and split by `__`
                                  const values = existingEntry.replace(`${paramName}--`, "").split("__")
                                  // Check if the value is in the list of selected values
                                  isChecked = values.includes(value)
                                }

                                return (
                                  <div key={index} className="flex items-center justify-between group/option">
                                    <div className="flex items-center space-x-3">
                                      <Checkbox
                                        id={`desktop-${paramName}-${value}`}
                                        className="rounded-none data-[state=checked]:bg-olive-700 data-[state=checked]:border-olive-700 h-5 w-5"
                                        checked={isChecked}
                                        onCheckedChange={() => handleSelectParamChange(paramName, value)}
                                      />
                                      <label
                                        htmlFor={`desktop-${paramName}-${value}`}
                                        className="text-stone-700 cursor-pointer group-hover/option:text-olive-800 transition-colors font-belleza"
                                      >
                                        {value}
                                      </label>
                                    </div>
                                    <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                                      {valueTotalProducts}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Enhanced Unit Params */}
          {Object.entries(unitParams).map(([paramName, { min, max }], index) => {
            const currentEntry = filter.unitParamsValues.find((entry) => entry.startsWith(`${paramName}--`))

            let currentMin = min
            let currentMax = max

            if (currentEntry) {
              const [, range] = currentEntry.split("--")
              ;[currentMin, currentMax] = range.split("m").map(Number)
            }

            return (
              <motion.div
                key={paramName}
                className="bg-white border border-stone-200 relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <button
                  onClick={() => toggleFilter(`unit-${paramName}`)}
                  className="flex items-center justify-between w-full p-6 text-left"
                >
                  <h3 className="font-belleza text-xl text-stone-800">{paramName}</h3>
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-olive-700/10 transition-colors">
                    <ChevronDown
                      className={`h-5 w-5 text-stone-500 transition-transform duration-300 ${
                        expandedFilters.includes(`unit-${paramName}`) ? "transform rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {expandedFilters.includes(`unit-${paramName}`) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-stone-100">
                        <Slider
                          value={[currentMin, currentMax]}
                          onValueChange={([newMin, newMax]) => {
                            handleUnitParamChange(paramName, newMin, newMax)
                          }}
                          max={max}
                          min={min}
                          step={1}
                          className="mb-8"
                        />
                        <div className="flex items-center justify-between">
                          <div className="bg-stone-100 px-4 py-2 text-stone-800 font-belleza border-l-2 border-olive-700/50">
                            {currentMin}
                          </div>
                          <div className="bg-stone-100 px-4 py-2 text-stone-800 font-belleza border-r-2 border-olive-700/50">
                            {currentMax}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}

          {/* Enhanced Price Range */}
          <div className="bg-white border border-stone-200 p-6 relative group">
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-olive-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <h3 className="font-belleza text-xl text-stone-800 mb-6 relative inline-block">
              ЦІНОВА РОЗВІДКА
              <motion.span
                className="absolute -bottom-1 left-0 h-[1px] bg-olive-700/50 w-full"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.span>
            </h3>

            <div className="pt-4">
              <Slider
                value={filter.price}
                onValueChange={handlePriceChange}
                min={minPrice}
                max={maxPrice}
                step={100}
                className="mb-8"
              />
              <div className="flex items-center justify-between">
                <div className="bg-stone-100 px-4 py-2 text-stone-800 font-belleza border-l-2 border-olive-700/50">
                  {filter.price[0]} ₴
                </div>
                <div className="bg-stone-100 px-4 py-2 text-stone-800 font-belleza border-r-2 border-olive-700/50">
                  {filter.price[1]} ₴
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Apply Filters Button */}
          <div className="relative">
            <Button
              onClick={applyFilters}
              className="w-full bg-olive-700 hover:bg-olive-600 text-white rounded-none py-5 px-6 font-belleza tracking-wider group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Target className="h-5 w-5" />
                ЗАСТОСУВАТИ ФІЛЬТРИ
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
            </Button>
            <div className="absolute top-0 left-0 w-full h-full border border-olive-500/20 transform translate-x-1 translate-y-1"></div>
          </div>

          {/* Enhanced Reset Filters */}
          <button
            onClick={resetFilters}
            className="w-full text-center text-stone-600 hover:text-olive-700 text-sm transition-colors flex items-center justify-center gap-2 group"
          >
            <X className="h-3.5 w-3.5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="relative">
              Скинути всі фільтри
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-olive-700/50 group-hover:w-full transition-all duration-300"></span>
            </span>
          </button>

          {/* Military-inspired decorative element */}
          <div className="py-6 text-center">
            <div className="inline-block relative">
              <div className="absolute -top-3 -left-3 w-5 h-5 border-t border-l border-olive-700/30"></div>
              <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b border-r border-olive-700/30"></div>
              <span className="font-belleza text-stone-500 tracking-widest text-sm px-6">{Store.name} TACTICAL</span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Enhanced Mobile filters button */}
      <div className="lg:hidden sticky top-20 z-30 bg-stone-50 py-4 border-b border-stone-200">
        <Button
          onClick={toggleMobileFilters}
          className="bg-stone-800 hover:bg-stone-700 text-white rounded-none py-3 px-6 font-belleza tracking-wider flex items-center gap-2 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Search className="h-4 w-4" />
            ТАКТИЧНІ ФІЛЬТРИ
          </span>
          <span className="absolute inset-0 bg-olive-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
        </Button>
      </div>

      {/* Enhanced Mobile filters drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 left-0 h-full w-full max-w-xs bg-white z-50 overflow-y-auto"
            >
              <div className="p-5 border-b border-stone-200 flex items-center justify-between">
                <h2 className="font-belleza text-2xl text-stone-800">ТАКТИЧНІ ФІЛЬТРИ</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-stone-500 hover:text-stone-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile filters content - simplified version of desktop filters */}
              <div className="p-5 space-y-6">
                {/* Mobile search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Тактичний пошук..."
                    value={searchInput}
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                    className="w-full bg-white border border-stone-200 py-3 pl-10 pr-4 focus:outline-none focus:border-olive-700 transition-colors font-belleza"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                </div>

                {/* Categories */}
                <CategoriesFilter categories={categories} filter={filter} setFilter={setFilter} />

                {/* Mobile Sort Options */}
                <div>
                  <h3 className="font-belleza text-xl text-stone-800 mb-4 relative inline-block">
                    СОРТУВАННЯ
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-olive-700/30"></span>
                  </h3>
                  <RadioGroup className="space-y-2" onValueChange={handleSortChange} value={catalogData.sort}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="mobile-default" />
                      <Label htmlFor="mobile-default" className="font-belleza">
                        Без сортування
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low_price" id="mobile-low_price" />
                      <Label htmlFor="mobile-low_price" className="font-belleza">
                        Ціна(низька)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hight_price" id="mobile-hight_price" />
                      <Label htmlFor="mobile-hight_price" className="font-belleza">
                        Ціна(Висока)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Mobile Vendors */}
                {checkParamsNames.map((param) => (
                  <div key={param}>
                    <h3 className="font-belleza text-xl text-stone-800 mb-4 relative inline-block">
                      {checkParamsNamesUa[param]}
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-olive-700/30"></span>
                    </h3>
                    <div className="relative mb-4">
                      <input
                        type="text"
                        placeholder={`Пошук ${checkParamsNamesUa[param].toLowerCase()}...`}
                        value={checkParamsSearchTerms[param] || ""}
                        onChange={(e) => handleSearchChange(param, e.target.value)}
                        className="w-full bg-white border border-stone-200 py-2 pl-9 pr-4 focus:outline-none focus:border-olive-700 transition-colors font-belleza text-sm"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    </div>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                      {safeCheckParams[param] &&
                        filterValues(param, safeCheckParams[param]).map((value, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`mobile-${param}-${value}`}
                                className="rounded-none data-[state=checked]:bg-olive-700 data-[state=checked]:border-olive-700 h-5 w-5"
                                checked={filter[param].includes(value)}
                                onCheckedChange={() => handleCheckboxChange(param, value)}
                              />
                              <label
                                htmlFor={`mobile-${param}-${value}`}
                                className="text-sm text-stone-700 cursor-pointer font-belleza"
                              >
                                {value}
                              </label>
                            </div>
                            <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                              {safeCounts[`${param}Count`] && safeCounts[`${param}Count`][value]
                                ? safeCounts[`${param}Count`][value]
                                : 0}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}

                {/* Mobile Select Params */}
                {Object.entries(selectParams).length > 0 && (
                  <div>
                    <h3 className="font-belleza text-xl text-stone-800 mb-4 relative inline-block">
                      ПАРАМЕТРИ
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-olive-700/30"></span>
                    </h3>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                      {Object.entries(selectParams).map(([paramName, paramData]) => (
                        <div key={paramName} className="border-b border-stone-100 pb-4 last:border-0 last:pb-0">
                          <h4 className="font-belleza text-stone-700 mb-3">{paramName}</h4>
                          <div className="space-y-2 pl-1">
                            {paramData.values.map(({ value, valueTotalProducts }, index) => {
                              // Find the existing entry for the param in selectParamsValues
                              const existingEntry = filter.selectParamsValues.find((entry) =>
                                entry.startsWith(`${paramName}--`),
                              )

                              // Initialize isChecked as false
                              let isChecked = false

                              if (existingEntry) {
                                // Remove `${paramName}--` and split by `__`
                                const values = existingEntry.replace(`${paramName}--`, "").split("__")
                                // Check if the value is in the list of selected values
                                isChecked = values.includes(value)
                              }

                              return (
                                <div key={index} className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`mobile-${paramName}-${value}`}
                                      className="rounded-none data-[state=checked]:bg-olive-700 data-[state=checked]:border-olive-700 h-5 w-5"
                                      checked={isChecked}
                                      onCheckedChange={() => handleSelectParamChange(paramName, value)}
                                    />
                                    <label
                                      htmlFor={`mobile-${paramName}-${value}`}
                                      className="text-sm text-stone-700 cursor-pointer font-belleza"
                                    >
                                      {value}
                                    </label>
                                  </div>
                                  <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                                    {valueTotalProducts}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile Price Range */}
                <div>
                  <h3 className="font-belleza text-xl text-stone-800 mb-4 relative inline-block">
                    ЦІНОВА РОЗВІДКА
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-olive-700/30"></span>
                  </h3>
                  <div className="pt-2">
                    <Slider
                      value={filter.price}
                      onValueChange={handlePriceChange}
                      min={minPrice}
                      max={maxPrice}
                      step={100}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <div className="bg-stone-100 px-3 py-2 text-sm text-stone-800 font-belleza">
                        {filter.price[0]} ₴
                      </div>
                      <div className="bg-stone-100 px-3 py-2 text-sm text-stone-800 font-belleza">
                        {filter.price[1]} ₴
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Unit Params */}
                {Object.entries(unitParams).map(([paramName, { min, max }]) => {
                  const currentEntry = filter.unitParamsValues.find((entry) => entry.startsWith(`${paramName}--`))

                  let currentMin = min
                  let currentMax = max

                  if (currentEntry) {
                    const [, range] = currentEntry.split("--")
                    ;[currentMin, currentMax] = range.split("m").map(Number)
                  }

                  return (
                    <div key={paramName}>
                      <h3 className="font-belleza text-xl text-stone-800 mb-4 relative inline-block">
                        {paramName}
                        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-olive-700/30"></span>
                      </h3>
                      <div className="pt-2">
                        <Slider
                          value={[currentMin, currentMax]}
                          onValueChange={([newMin, newMax]) => {
                            handleUnitParamChange(paramName, newMin, newMax)
                          }}
                          max={max}
                          min={min}
                          step={1}
                          className="mb-6"
                        />
                        <div className="flex items-center justify-between">
                          <div className="bg-stone-100 px-3 py-2 text-sm text-stone-800 font-belleza">{currentMin}</div>
                          <div className="bg-stone-100 px-3 py-2 text-sm text-stone-800 font-belleza">{currentMax}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="p-5 border-t border-stone-200 space-y-3">
                <Button
                  onClick={applyFilters}
                  className="w-full bg-olive-700 hover:bg-olive-600 text-white rounded-none py-4 font-belleza tracking-wider group overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Target className="h-5 w-5" />
                    ЗАСТОСУВАТИ ФІЛЬТРИ
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-olive-800 to-olive-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                </Button>
                <button
                  onClick={resetFilters}
                  className="w-full text-center text-stone-600 hover:text-olive-700 text-sm transition-colors flex items-center justify-center gap-2 font-belleza"
                >
                  <X className="h-3.5 w-3.5" />
                  Скинути всі фільтри
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
