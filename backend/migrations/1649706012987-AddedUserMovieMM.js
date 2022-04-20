const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddedUserMovieMM1649706012987 {
    name = 'AddedUserMovieMM1649706012987'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "movie_user_user" ("movieID" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_635d198550b5d0eebdd6ff46985" PRIMARY KEY ("movieID", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_365b3908fd39cebac6c28215a2" ON "movie_user_user" ("movieID") `);
        await queryRunner.query(`CREATE INDEX "IDX_17f6fca57477593364a189e36f" ON "movie_user_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie_user_user" ADD CONSTRAINT "FK_365b3908fd39cebac6c28215a27" FOREIGN KEY ("movieID") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_user_user" ADD CONSTRAINT "FK_17f6fca57477593364a189e36f5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie_user_user" DROP CONSTRAINT "FK_17f6fca57477593364a189e36f5"`);
        await queryRunner.query(`ALTER TABLE "movie_user_user" DROP CONSTRAINT "FK_365b3908fd39cebac6c28215a27"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_17f6fca57477593364a189e36f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_365b3908fd39cebac6c28215a2"`);
        await queryRunner.query(`DROP TABLE "movie_user_user"`);
    }
}
