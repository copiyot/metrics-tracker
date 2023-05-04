import { Migration } from '@mikro-orm/migrations';

export class Migration20220416224252 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "token" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "value" int not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "token" cascade;');
  }

}
