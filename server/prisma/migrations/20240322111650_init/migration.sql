-- DropForeignKey
ALTER TABLE `link` DROP FOREIGN KEY `link_categoryId_fkey`;

-- AddForeignKey
ALTER TABLE `link` ADD CONSTRAINT `link_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
