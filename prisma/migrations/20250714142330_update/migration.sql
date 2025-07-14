/*
  Warnings:

  - You are about to drop the column `utilisateur_id` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `utilisateur_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `utilisateur_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `utilisateur_id` on the `shopping_cart` table. All the data in the column will be lost.
  - You are about to drop the column `utilisateur_id` on the `wishlists` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[client_id,produit_id]` on the table `wishlists` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `client_id` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `wishlists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_utilisateur_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_utilisateur_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_utilisateur_id_fkey";

-- DropForeignKey
ALTER TABLE "shopping_cart" DROP CONSTRAINT "shopping_cart_utilisateur_id_fkey";

-- DropForeignKey
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_utilisateur_id_fkey";

-- DropIndex
DROP INDEX "wishlists_utilisateur_id_produit_id_key";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "utilisateur_id",
ADD COLUMN     "client_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "utilisateur_id",
ADD COLUMN     "client_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "utilisateur_id",
ADD COLUMN     "client_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "shopping_cart" DROP COLUMN "utilisateur_id",
ADD COLUMN     "client_id" UUID;

-- AlterTable
ALTER TABLE "wishlists" DROP COLUMN "utilisateur_id",
ADD COLUMN     "client_id" UUID NOT NULL;

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "user_role";

-- CreateTable
CREATE TABLE "admins" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "telephone" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "telephone" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "wishlists_client_id_produit_id_key" ON "wishlists"("client_id", "produit_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_cart" ADD CONSTRAINT "shopping_cart_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
