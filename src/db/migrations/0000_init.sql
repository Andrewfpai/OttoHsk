CREATE TYPE "public"."drill_kind" AS ENUM('confusable', 'ordering', 'cloze');--> statement-breakpoint
CREATE TYPE "public"."essay_kind" AS ENUM('q99', 'q100');--> statement-breakpoint
CREATE TABLE "allowed_emails" (
	"email" text PRIMARY KEY NOT NULL,
	"invited_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "allowed_emails_lowercase" CHECK ("allowed_emails"."email" = lower("allowed_emails"."email"))
);
--> statement-breakpoint
CREATE TABLE "invite_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token_hash" text NOT NULL,
	"label" text NOT NULL,
	"created_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"used_by_email" text,
	CONSTRAINT "invite_links_token_hash_unique" UNIQUE("token_hash"),
	CONSTRAINT "invite_links_label_length" CHECK (char_length("invite_links"."label") between 1 and 40)
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"email_verified" timestamp with time zone,
	"image" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE "drill_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"kind" "drill_kind" NOT NULL,
	"item_id" text NOT NULL,
	"correct" boolean NOT NULL,
	"answered_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "essays" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"kind" "essay_kind" NOT NULL,
	"prompt" text NOT NULL,
	"body" text NOT NULL,
	"chars" smallint NOT NULL,
	"duration_ms" integer NOT NULL,
	"score" smallint NOT NULL,
	"feedback" jsonb NOT NULL,
	"model" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "essays_score_range" CHECK ("essays"."score" between 0 and 100)
);
--> statement-breakpoint
CREATE TABLE "flashcard_state" (
	"user_id" text PRIMARY KEY NOT NULL,
	"tests_taken" integer DEFAULT 0 NOT NULL,
	"lock_level" smallint DEFAULT 0 NOT NULL,
	"locked_until" timestamp with time zone,
	CONSTRAINT "flashcard_state_lock_level_nonnegative" CHECK ("flashcard_state"."lock_level" >= 0),
	CONSTRAINT "flashcard_state_tests_nonnegative" CHECK ("flashcard_state"."tests_taken" >= 0)
);
--> statement-breakpoint
CREATE TABLE "flashcard_tests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"taken_at" timestamp with time zone DEFAULT now() NOT NULL,
	"test_number" integer NOT NULL,
	"total" smallint NOT NULL,
	"correct" smallint NOT NULL,
	"guesses" smallint NOT NULL,
	"passed" boolean NOT NULL,
	CONSTRAINT "flashcard_tests_counts" CHECK ("flashcard_tests"."correct" between 0 and "flashcard_tests"."total")
);
--> statement-breakpoint
CREATE TABLE "mock_tests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"taken_on" date NOT NULL,
	"label" text,
	"listening" smallint NOT NULL,
	"reading" smallint NOT NULL,
	"writing" smallint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "mock_tests_listening_range" CHECK ("mock_tests"."listening" between 0 and 45),
	CONSTRAINT "mock_tests_reading_range" CHECK ("mock_tests"."reading" between 0 and 45),
	CONSTRAINT "mock_tests_writing_range" CHECK ("mock_tests"."writing" between 0 and 8)
);
--> statement-breakpoint
CREATE TABLE "word_progress" (
	"user_id" text NOT NULL,
	"word_id" text NOT NULL,
	"strength" smallint NOT NULL,
	"due_test" integer NOT NULL,
	"correct_count" integer DEFAULT 0 NOT NULL,
	"wrong_count" integer DEFAULT 0 NOT NULL,
	"last_answered_at" timestamp with time zone NOT NULL,
	CONSTRAINT "word_progress_user_id_word_id_pk" PRIMARY KEY("user_id","word_id"),
	CONSTRAINT "word_progress_strength_range" CHECK ("word_progress"."strength" between 0 and 6)
);
--> statement-breakpoint
ALTER TABLE "allowed_emails" ADD CONSTRAINT "allowed_emails_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite_links" ADD CONSTRAINT "invite_links_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drill_attempts" ADD CONSTRAINT "drill_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "essays" ADD CONSTRAINT "essays_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flashcard_state" ADD CONSTRAINT "flashcard_state_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flashcard_tests" ADD CONSTRAINT "flashcard_tests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_tests" ADD CONSTRAINT "mock_tests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "word_progress" ADD CONSTRAINT "word_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "invite_links_created_idx" ON "invite_links" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "accounts_user_id_idx" ON "accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "drill_attempts_user_kind_idx" ON "drill_attempts" USING btree ("user_id","kind","answered_at");--> statement-breakpoint
CREATE INDEX "essays_user_idx" ON "essays" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "flashcard_tests_user_idx" ON "flashcard_tests" USING btree ("user_id","taken_at");--> statement-breakpoint
CREATE INDEX "mock_tests_user_idx" ON "mock_tests" USING btree ("user_id","taken_on");--> statement-breakpoint
CREATE INDEX "word_progress_due_idx" ON "word_progress" USING btree ("user_id","due_test");