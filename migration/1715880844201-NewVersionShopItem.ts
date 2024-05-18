import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersionShopItem1715880844201 implements MigrationInterface {
    name = 'NewVersionShopItem1715880844201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
    }

}
