-- AlterTable
ALTER TABLE `Category` MODIFY `active` BOOLEAN NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Collection` MODIFY `active` BOOLEAN NULL DEFAULT true;

-- AlterTable
ALTER TABLE `DiscountOrder` MODIFY `active` BOOLEAN NULL DEFAULT true;

-- AlterTable
ALTER TABLE `DiscountProduct` MODIFY `active` BOOLEAN NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Product` MODIFY `active` BOOLEAN NULL DEFAULT true;
