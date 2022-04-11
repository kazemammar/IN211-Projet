const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Test1649671730831 {
    name = 'Test1649671730831'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "genres" ("id" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"), CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_genres_genres" ("movieID" character varying NOT NULL, "genresId" character varying NOT NULL, CONSTRAINT "PK_902fbecbdf1dde4af2ec1cae424" PRIMARY KEY ("movieID", "genresId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f3a90a5de44f3837e85bb5cc23" ON "movie_genres_genres" ("movieID") `);
        await queryRunner.query(`CREATE INDEX "IDX_786db630d49cd33f520f93de3e" ON "movie_genres_genres" ("genresId") `);
        await queryRunner.query(`ALTER TABLE "movie" ADD "overview" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "poster_path" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genres" ADD CONSTRAINT "FK_f3a90a5de44f3837e85bb5cc234" FOREIGN KEY ("movieID") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genres" ADD CONSTRAINT "FK_786db630d49cd33f520f93de3e5" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie_genres_genres" DROP CONSTRAINT "FK_786db630d49cd33f520f93de3e5"`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genres" DROP CONSTRAINT "FK_f3a90a5de44f3837e85bb5cc234"`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "poster_path" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "overview"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_786db630d49cd33f520f93de3e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3a90a5de44f3837e85bb5cc23"`);
        await queryRunner.query(`DROP TABLE "movie_genres_genres"`);
        await queryRunner.query(`DROP TABLE "genres"`);
    }
}
