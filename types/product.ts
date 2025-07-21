export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isNew: boolean
  inStock: boolean
  rating: number
  reviews: number
  colors: string[]
  sizes: string[]
  description?: string
}
