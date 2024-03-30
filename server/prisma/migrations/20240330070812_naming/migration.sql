-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_parentId_fkey`;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
