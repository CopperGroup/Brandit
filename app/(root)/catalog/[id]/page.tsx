import type { Metadata } from "next"
import { Store } from "@/constants/store"
import { fetchProductPageInfo } from "@/lib/actions/cache"
import { pretifyProductName, replaceDescription } from "@/lib/utils"
import ProductPage from "@/components/shared/ProductPage"

// Generate meta description for SEO
const generateMetaDescription = (productName: string, productDescription: string): string => {
  // Remove HTML tags from description
  const plainDescription = productDescription.replace(/<[^>]*>?/gm, "")
  let description = `${productName} - ${plainDescription}`

  // Limit description length for SEO best practices
  if (description.length > 160) {
    description = description.substring(0, 157) + "..."
  }

  return description
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { product } = await fetchProductPageInfo(params.id, "articleNumber", "-", 0)

  const pretifiedName = pretifyProductName(product.name, [], product.articleNumber || "", 0)
  const optimizedDescription = generateMetaDescription(pretifiedName, replaceDescription(product.description))

  return {
    title: `${pretifiedName} | ${Store.name}`,
    description: optimizedDescription,
    openGraph: {
      type: "website",
      title: `${pretifiedName} | ${Store.name}`,
      description: optimizedDescription,
      images: [product.images[0]],
      url: `${Store.domain}/product/${params.id}`,
      siteName: Store.name,
    },
    twitter: {
      card: "summary_large_image",
      title: pretifiedName,
      description: optimizedDescription,
      images: [product.images[0]],
    },
    alternates: {
      canonical: `${Store.domain}/product/${params.id}`,
    },
  }
}

// Server component
export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-belleza text-stone-800 mb-4">Товар не знайдено</h1>
          <p className="text-stone-600">Перевірте URL або поверніться до каталогу</p>
        </div>
      </div>
    )
  }

  const { product, selectParams } = await fetchProductPageInfo(params.id, "articleNumber", "-", 0)

  return <ProductPage productJson={JSON.stringify(product)} selectParams={selectParams} />
}
