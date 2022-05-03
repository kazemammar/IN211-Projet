const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class ChangeUserPosterPathField1649066097976 {
    name = 'ChangeUserPosterPathField1649066097976'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "poster_path"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "poster_path" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "poster_path"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "poster_path" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }
}
