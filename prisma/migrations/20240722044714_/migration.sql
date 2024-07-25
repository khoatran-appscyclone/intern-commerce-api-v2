/*
  Warnings:

  - You are about to drop the column `customerAddressId` on the `Customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Customer` DROP FOREIGN KEY `Customer_customerAddressId_fkey`;

-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `customerAddressId`,
    ADD COLUMN `active` BOOLEAN NULL DEFAULT true,
    ADD COLUMN `avatar` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CustomerAddress` ADD COLUMN `customerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `CustomerAddress` ADD CONSTRAINT `CustomerAddress_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
