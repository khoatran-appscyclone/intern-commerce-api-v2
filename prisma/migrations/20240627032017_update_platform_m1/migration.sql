/*
  Warnings:

  - You are about to drop the column `countries` on the `CustomerAddress` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `DiscountProduct` table. All the data in the column will be lost.
  - You are about to drop the `ProductOfCollection` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rate` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fixedPrice` to the `DiscountProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentagePrice` to the `DiscountProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `rate` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `phoneNumber` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CustomerAddress` DROP COLUMN `countries`,
    ADD COLUMN `country` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `DiscountProduct` DROP COLUMN `value`,
    ADD COLUMN `fixedPrice` DOUBLE NOT NULL,
    ADD COLUMN `percentagePrice` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `rate` INTEGER NOT NULL,
    MODIFY `description` VARCHAR(240) NULL;

-- DropTable
DROP TABLE `ProductOfCollection`;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_username_key` ON `Customer`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `Customer_email_key` ON `Customer`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
