import type React from "react"
// Category types
export interface CategoryType {
  name: string
  categoryId: string
  totalProducts: number
  subCategories: string[]
}

export interface CategoryWithSubCategories {
  name: string
  categoryId: string
  totalProducts: number
  subCategories: CategoryWithSubCategories[]
  calculatedTotalProducts?: number
}

export interface EnhancedCategory {
  id: string
  name: string
  count: number
}

// Product types
export interface ProductSpec {
  value: string
  valueTotalProducts: number
}

export interface SelectParam {
  totalProducts: number
  type: string
  values: ProductSpec[]
}

export interface UnitParam {
  totalProducts: number
  type: string
  min: number
  max: number
}

export interface FilterSettingsData {
  filterSettings: Record<string, any>
  delay: number
}

export interface ProductImage {
  url: string
  alt?: string
}

export interface FormattedProduct {
  id: string
  productId: string
  name: string
  category: string | string[]
  image: string
  price: number
  priceWithoutDiscount: number | null
  discount: number | null
  isNew: boolean
  isBestseller: boolean
  specs: string[]
  rating: number
  stockStatus: string
  coordinates: string
  likedBy: string[]
  description?: string
}

// Filter types
export interface FilterState {
  page: string
  price: [number, number]
  categories: string[]
  vendors: string[]
  selectParamsValues: string[]
  unitParamsValues: string[]
}

export interface CatalogData {
  search: string
  sort: string
  view?: "grid" | "list"
}

export interface CheckParamCounts {
  categoriesCount?: Record<string, number>
  vendorsCount?: Record<string, number>
  [key: string]: Record<string, number> | undefined
}

// Props interfaces
export interface CatalogFilterProps {
  categories: CategoryType[]
  minPrice: number
  maxPrice: number
  checkParams?: Record<string, string[]>
  unitParams: Record<string, UnitParam>
  selectParams: Record<string, SelectParam>
  category?: string
  delay?: number
  counts?: CheckParamCounts
  searchParams?: Record<string, any>
}

export interface CatalogContentProps {
  products: FormattedProduct[]
  categories: EnhancedCategory[]
  totalProducts: number
  currentPage: number
  totalPages: number
  minPrice: number
  maxPrice: number
  vendors: string[]
  unitParams: Record<string, UnitParam>
  selectParams: Record<string, SelectParam>
  email?: string | null
  searchParams: Record<string, any>
}

export interface ProductGridProps {
  products: FormattedProduct[]
  email?: string | null
  gridView: "grid" | "list"
  searchParams?: Record<string, any>
}

export interface ProductCardProps {
  product: FormattedProduct
  email?: string | null
  gridView: "grid" | "list"
  onQuickView: (productId: string) => void
  isHovered: boolean
}

export interface CategoriesFilterProps {
  categories: CategoryType[]
  filter: FilterState
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>
}

export interface CatalogToolbarProps {
  totalProducts: number
  searchParams: Record<string, any>
}

export interface CatalogPaginationProps {
  currentPage: number
  totalPages: number
  searchParams: Record<string, any>
}

export interface QuickViewModalProps {
  product: FormattedProduct | undefined
  onClose: () => void
}
