/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `DiscountOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `DiscountOrder_code_key` ON `DiscountOrder`(`code`);
