const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addUserModel1649060366632 {
    name = 'addUserModel1649060366632'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "release_date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title"), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "movie"`);
    }
}
