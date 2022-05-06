const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addedReviewsAndTheirRelations1651850232611 {
    name = 'addedReviewsAndTheirRelations1651850232611'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "mark" integer NOT NULL DEFAULT '5', "comment" character varying, "movie_id" integer, "user_id" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_fc8ca25a3c9fe90af4a4b42a310" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_81446f2ee100305f42645d4d6c2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_81446f2ee100305f42645d4d6c2"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_fc8ca25a3c9fe90af4a4b42a310"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }
}
