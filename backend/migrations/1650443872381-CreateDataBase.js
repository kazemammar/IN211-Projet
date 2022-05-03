const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateDataBase1650443872381 {
    name = 'CreateDataBase1650443872381'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "genres" ("id" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"), CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" character varying NOT NULL, "title" character varying NOT NULL, "release_date" TIMESTAMP WITH TIME ZONE NOT NULL, "poster_path" character varying, "overview" character varying NOT NULL, CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title"), CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "email" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie_genres_genres" ("movieID" character varying NOT NULL, "genresId" character varying NOT NULL, CONSTRAINT "PK_902fbecbdf1dde4af2ec1cae424" PRIMARY KEY ("movieID", "genresId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f3a90a5de44f3837e85bb5cc23" ON "movie_genres_genres" ("movieID") `);
        await queryRunner.query(`CREATE INDEX "IDX_786db630d49cd33f520f93de3e" ON "movie_genres_genres" ("genresId") `);
        await queryRunner.query(`CREATE TABLE "movie_user_user" ("movieID" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_635d198550b5d0eebdd6ff46985" PRIMARY KEY ("movieID", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_365b3908fd39cebac6c28215a2" ON "movie_user_user" ("movieID") `);
        await queryRunner.query(`CREATE INDEX "IDX_17f6fca57477593364a189e36f" ON "movie_user_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "movie_genres_genres" ADD CONSTRAINT "FK_f3a90a5de44f3837e85bb5cc234" FOREIGN KEY ("movieID") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genres" ADD CONSTRAINT "FK_786db630d49cd33f520f93de3e5" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_user_user" ADD CONSTRAINT "FK_365b3908fd39cebac6c28215a27" FOREIGN KEY ("movieID") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_user_user" ADD CONSTRAINT "FK_17f6fca57477593364a189e36f5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "movie_user_user" DROP CONSTRAINT "FK_17f6fca57477593364a189e36f5"`);
        await queryRunner.query(`ALTER TABLE "movie_user_user" DROP CONSTRAINT "FK_365b3908fd39cebac6c28215a27"`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genres" DROP CONSTRAINT "FK_786db630d49cd33f520f93de3e5"`);
        await queryRunner.query(`ALTER TABLE "movie_genres_genres" DROP CONSTRAINT "FK_f3a90a5de44f3837e85bb5cc234"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_17f6fca57477593364a189e36f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_365b3908fd39cebac6c28215a2"`);
        await queryRunner.query(`DROP TABLE "movie_user_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_786db630d49cd33f520f93de3e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f3a90a5de44f3837e85bb5cc23"`);
        await queryRunner.query(`DROP TABLE "movie_genres_genres"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "genres"`);
    }
}
