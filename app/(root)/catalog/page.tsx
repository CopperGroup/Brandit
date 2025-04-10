import { getSession } from "@/lib/getServerSession"
import { fetchCatalogWithCache } from "@/lib/actions/redis/catalog.actions"
import { getCounts, getFiltredProducts, pretifyProductName, processProductParams } from "@/lib/utils"
import type { FilterSettingsData } from "@/lib/types/types"

import CatalogBanner from "@/components/catalog/catalog-banner"
import CatalogContent from "@/components/catalog/catalog-content"
import PurchaseNotification from "@/components/shared/PurhaseNotification"

export default async function CatalogClientPage({ searchParams }: { searchParams: any }) {
  let {
    data: filtredProducts,
    categories,
    filterSettingsData,
  }: {
    data: any[]
    categories: { name: string; categoryId: string; totalProducts: number; subCategories: string[] }[]
    filterSettingsData: { filterSettings: FilterSettingsData; delay: number }
  } = await fetchCatalogWithCache()

  const { filterSettings, delay } = filterSettingsData
  const email = await getSession()

  // Sort products based on search params
  if (searchParams.sort === "low_price") {
    filtredProducts = filtredProducts.sort((a, b) => a.price - b.price)
  } else if (searchParams.sort === "hight_price") {
    filtredProducts = filtredProducts.sort((a, b) => b.price - a.price)
  } else if (searchParams.sort === "newest") {
    // Default sort - newest first
    filtredProducts = filtredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } else if (searchParams.sort === "popularity") {
    // Sort by popularity (could be based on views or sales)
    filtredProducts = filtredProducts.sort((a, b) => (b.views || 0) - (a.views || 0))
  }

  const searchedCategories = searchParams.categories

  // Filter products by categories if specified
  filtredProducts = filtredProducts.filter((product) => {
    const matchesCategories = searchedCategories
      ? categories
          .filter((cat) => searchedCategories.includes(cat.categoryId))
          .map((cat) => cat.categoryId)
          .some((id) => product.category.includes(id))
      : true
    return matchesCategories
  })

  // Process filter parameters
  const unitParams: Record<string, { totalProducts: number; type: string; min: number; max: number }> = {}
  const selectParams: Record<
    string,
    { totalProducts: number; type: string; values: { value: string; valueTotalProducts: number }[] }
  > = {}

  if (searchedCategories) {
    Object.entries(filterSettings).forEach(([categoryId, categoryData]) => {
      if (!searchedCategories.includes(categoryId)) return

      Object.entries(categoryData.params).forEach(([paramName, paramData]) => {
        if (paramData.type.startsWith("unit-")) {
          unitParams[paramName] = { totalProducts: paramData.totalProducts, type: paramData.type, min: 0, max: 0 }
        } else if (paramData.type === "select") {
          selectParams[paramName] = { totalProducts: paramData.totalProducts, type: paramData.type, values: [] }
        }
      })
    })
  }

  processProductParams(filtredProducts, unitParams, selectParams)

  // Get price range
  const maxPrice = Math.max(...filtredProducts.map((item) => item.priceToShow))
  const minPrice = Math.min(...filtredProducts.map((item) => item.priceToShow))
  const vendors = Array.from(new Set(filtredProducts.map((item) => item.vendor))).filter((item) => item !== "")

  // Apply filters based on search params
  filtredProducts = getFiltredProducts(filtredProducts, searchParams)

  const counts = getCounts(filtredProducts)

  // Pagination
  const productsPerPage = 9 // Changed to match original design
  const countOfPages = Math.ceil(filtredProducts.length / productsPerPage)
  const pageNumber = searchParams.page ? Number.parseInt(searchParams.page) : 1

  let min = 0
  let max = productsPerPage

  if (pageNumber > 1) {
    min = (pageNumber - 1) * productsPerPage
    max = min + productsPerPage
  }

  // Prepare products for display
  const currentProducts = filtredProducts.slice(min, max)
  const formattedProducts = currentProducts.map((product) => ({
    id: product._id,
    productId: product.id,
    name: pretifyProductName(product.name, [], product.articleNumber || "", 0),
    category: product.category,
    image: product.images[1],
    price: product.priceToShow,
    priceWithoutDiscount: product.price > product.priceToShow ? product.price : null,
    discount: product.price > product.priceToShow ? Math.round((1 - product.priceToShow / product.price) * 100) : null,
    isNew: new Date(product.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days
    isBestseller: product.views > 100, // Example threshold
    specs: product.specs || [],
    rating: product.rating || Math.floor(Math.random() * 3) + 3, // Fallback to random rating between 3-5
    stockStatus: product.inStock > 0 ? "В наявності" : "Закінчується",
    coordinates: `N ${Math.floor(Math.random() * 90)}°${Math.floor(Math.random() * 60)}'${Math.floor(Math.random() * 60)}"`,
    likedBy: product.likedBy || [],
    description: product.description?.replace(/[^а-яА-ЯіІ]/g, " "),
  }))

  // Enhanced categories with military-inspired naming
  const enhancedCategories = categories.map((category) => ({
    id: category.categoryId,
    name: category.name,
    count: category.totalProducts,
  }))

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Banner Section */}
      <CatalogBanner />

      {/* Catalog Content Section */}
      <CatalogContent
        products={formattedProducts}
        categories={enhancedCategories}
        totalProducts={filtredProducts.length}
        currentPage={pageNumber}
        totalPages={countOfPages}
        minPrice={minPrice}
        maxPrice={maxPrice}
        vendors={vendors}
        unitParams={unitParams}
        selectParams={selectParams}
        email={email}
        searchParams={searchParams}
      />

      {/* Purchase Notification */}
      {/* <PurchaseNotification
        products={filtredProducts.map((p) => ({
          id: p._id.toString(),
          name: pretifyProductName(p.name, [], p.articleNumber || "", 0),
          image: p.images[0],
        }))}
        minInterval={30000}
        maxInterval={45000}
        maxNotifications={3}
      /> */}
    </div>
  )
}
