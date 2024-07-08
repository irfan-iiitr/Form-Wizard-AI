import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
export const forms = pgTable('forms', {
  id: serial('id').primaryKey(),
  jsonform:text('jsonform').notNull(),
  theme:varchar('theme'),
  background:varchar('background'),
  style:varchar('style'),
  createdBy:varchar('createdBy').notNull(),
  createdAt:varchar('createdAt').notNull(),
});

export const userResponses=pgTable('userReponses',{
  id:serial('id').primaryKey(),
  jsonResponse:text('jsonResponse').notNull(),
  createdBy:varchar('createdBy').default('anonymous'),
  createdAt:varchar('createdAt').notNull(),
  formRef:integer('formRef').references(()=>forms.id)
})