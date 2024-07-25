/*
  Warnings:

  - You are about to drop the column `city` on the `CustomerAddress` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `CustomerAddress` table. All the data in the column will be lost.
  - Added the required column `commune` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `CustomerAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CustomerAddress` DROP COLUMN `city`,
    DROP COLUMN `country`,
    ADD COLUMN `commune` VARCHAR(191) NOT NULL,
    ADD COLUMN `district` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL;
