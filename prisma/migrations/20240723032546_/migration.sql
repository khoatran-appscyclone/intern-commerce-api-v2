/*
  Warnings:

  - You are about to drop the column `cartId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_cartId_fkey`;

-- AlterTable
ALTER TABLE `CartItem` DROP COLUMN `cartId`,
    ADD COLUMN `customerId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Cart`;
