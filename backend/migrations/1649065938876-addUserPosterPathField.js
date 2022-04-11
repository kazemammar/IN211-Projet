const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addUserPosterPathField1649065938876 {
    name = 'addUserPosterPathField1649065938876'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" ADD "poster_path" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "poster_path"`);
    }
}
