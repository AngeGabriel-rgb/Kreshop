/*
  Warnings:

  - The primary key for the `addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `addresses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `admins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `admins` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `parent_id` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `clients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `coupons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `coupons` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `order_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `order_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `variante_id` column on the `order_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `product_images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `product_images` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `variante_id` column on the `product_images` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `product_variants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `product_variants` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `commande_id` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `shopping_cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `shopping_cart` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `variante_id` column on the `shopping_cart` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `client_id` column on the `shopping_cart` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `wishlists` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `wishlists` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `client_id` on the `addresses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `commande_id` on the `order_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `produit_id` on the `order_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `client_id` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `produit_id` on the `product_images` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `produit_id` on the `product_variants` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `categorie_id` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `produit_id` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `client_id` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `produit_id` on the `shopping_cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `produit_id` on the `wishlists` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `client_id` on the `wishlists` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_client_id_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_commande_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_produit_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_variante_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_client_id_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_produit_id_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_variante_id_fkey";

-- DropForeignKey
ALTER TABLE "product_variants" DROP CONSTRAINT "product_variants_produit_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categorie_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_client_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_produit_id_fkey";

-- DropForeignKey
ALTER TABLE "shopping_cart" DROP CONSTRAINT "shopping_cart_client_id_fkey";

-- DropForeignKey
ALTER TABLE "shopping_cart" DROP CONSTRAINT "shopping_cart_produit_id_fkey";

-- DropForeignKey
ALTER TABLE "shopping_cart" DROP CONSTRAINT "shopping_cart_variante_id_fkey";

-- DropForeignKey
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_client_id_fkey";

-- DropForeignKey
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_produit_id_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "client_id",
ADD COLUMN     "client_id" INTEGER NOT NULL,
ADD CONSTRAINT "addresses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "admins" DROP CONSTRAINT "admins_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "admins_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "parent_id",
ADD COLUMN     "parent_id" INTEGER,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "clients" DROP CONSTRAINT "clients_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "clients_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "coupons" DROP CONSTRAINT "coupons_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "coupons_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "commande_id",
ADD COLUMN     "commande_id" INTEGER NOT NULL,
DROP COLUMN "produit_id",
ADD COLUMN     "produit_id" INTEGER NOT NULL,
DROP COLUMN "variante_id",
ADD COLUMN     "variante_id" INTEGER,
ADD CONSTRAINT "order_items_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "client_id",
ADD COLUMN     "client_id" INTEGER NOT NULL,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "produit_id",
ADD COLUMN     "produit_id" INTEGER NOT NULL,
DROP COLUMN "variante_id",
ADD COLUMN     "variante_id" INTEGER,
ADD CONSTRAINT "product_images_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "product_variants" DROP CONSTRAINT "product_variants_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "produit_id",
ADD COLUMN     "produit_id" INTEGER NOT NULL,
ADD CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "products" DROP CONSTRAINT "products_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "categorie_id",
ADD COLUMN     "categorie_id" INTEGER NOT NULL,
ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "produit_id",
ADD COLUMN     "produit_id" INTEGER NOT NULL,
DROP COLUMN "commande_id",
ADD COLUMN     "commande_id" INTEGER,
DROP COLUMN "client_id",
ADD COLUMN     "client_id" INTEGER NOT NULL,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "shopping_cart" DROP CONSTRAINT "shopping_cart_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "produit_id",
ADD COLUMN     "produit_id" INTEGER NOT NULL,
DROP COLUMN "variante_id",
ADD COLUMN     "variante_id" INTEGER,
DROP COLUMN "client_id",
ADD COLUMN     "client_id" INTEGER,
ADD CONSTRAINT "shopping_cart_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "produit_id",
ADD COLUMN     "produit_id" INTEGER NOT NULL,
DROP COLUMN "client_id",
ADD COLUMN     "client_id" INTEGER NOT NULL,
ADD CONSTRAINT "wishlists_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "wishlists_client_id_produit_id_key" ON "wishlists"("client_id", "produit_id");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categorie_id_fkey" FOREIGN KEY ("categorie_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_variante_id_fkey" FOREIGN KEY ("variante_id") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_commande_id_fkey" FOREIGN KEY ("commande_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_variante_id_fkey" FOREIGN KEY ("variante_id") REFERENCES "product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_variante_id_fkey" FOREIGN KEY ("variante_id") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
