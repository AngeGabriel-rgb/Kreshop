"use client"

import * as React from "react"
import { getCartItemsCount } from "@/lib/cart"

export function CartBadge() {
  const [itemCount, setItemCount] = React.useState(0)

  const updateItemCount = () => {
    setItemCount(getCartItemsCount())
  }

  React.useEffect(() => {
    updateItemCount() // Initial count on mount

    // Listen for storage changes
    const handleStorageChange = () => {
      updateItemCount()
    }
    window.addEventListener("storage", handleStorageChange)

    // Clean up event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  if (itemCount === 0) {
    return null
  }

  return (
    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
      {itemCount}
    </span>
  )
}
