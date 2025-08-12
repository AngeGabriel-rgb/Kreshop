-- CreateEnum
CREATE TYPE "public"."stock_status" AS ENUM ('in_stock', 'low_stock', 'out_of_stock', 'on_order');

-- AlterTable
ALTER TABLE "public"."product_variants" ADD COLUMN     "available_stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reserved_stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stock_status" "public"."stock_status" NOT NULL DEFAULT 'in_stock';

-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "available_stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "low_stock_threshold" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "reserved_stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stock_management" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "stock_status" "public"."stock_status" NOT NULL DEFAULT 'in_stock',
ADD COLUMN     "total_stock" INTEGER NOT NULL DEFAULT 0;
