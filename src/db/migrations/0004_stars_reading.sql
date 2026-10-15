ALTER TYPE "public"."drill_kind" ADD VALUE 'reading';--> statement-breakpoint
CREATE TABLE "starred_words" (
	"user_id" text NOT NULL,
	"word_id" text NOT NULL,
	"starred_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "starred_words_user_id_word_id_pk" PRIMARY KEY("user_id","word_id")
);
--> statement-breakpoint
ALTER TABLE "starred_words" ADD CONSTRAINT "starred_words_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;