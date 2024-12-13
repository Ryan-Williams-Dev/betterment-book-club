ALTER TABLE "user_library" ALTER COLUMN "isbn" SET DATA TYPE varchar(13);--> statement-breakpoint
ALTER TABLE "user_library" ADD CONSTRAINT "user_library_user_id_isbn_unique" UNIQUE("user_id","isbn");