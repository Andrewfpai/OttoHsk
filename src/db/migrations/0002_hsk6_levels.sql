ALTER TYPE "public"."drill_kind" ADD VALUE 'error';--> statement-breakpoint
ALTER TYPE "public"."essay_kind" ADD VALUE 'retell';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "level" smallint DEFAULT 5 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "exam_date" date DEFAULT '2026-11-07';--> statement-breakpoint
ALTER TABLE "flashcard_state" ADD COLUMN "level" smallint DEFAULT 5 NOT NULL;--> statement-breakpoint
ALTER TABLE "flashcard_state" DROP CONSTRAINT "flashcard_state_pkey";--> statement-breakpoint
ALTER TABLE "flashcard_state" ADD CONSTRAINT "flashcard_state_user_id_level_pk" PRIMARY KEY("user_id","level");--> statement-breakpoint
ALTER TABLE "flashcard_tests" ADD COLUMN "level" smallint DEFAULT 5 NOT NULL;--> statement-breakpoint
ALTER TABLE "mock_tests" ADD COLUMN "level" smallint DEFAULT 5 NOT NULL;--> statement-breakpoint
ALTER TABLE "mock_tests" DROP CONSTRAINT "mock_tests_listening_range";--> statement-breakpoint
ALTER TABLE "mock_tests" DROP CONSTRAINT "mock_tests_reading_range";--> statement-breakpoint
ALTER TABLE "mock_tests" DROP CONSTRAINT "mock_tests_writing_range";--> statement-breakpoint
ALTER TABLE "mock_tests" ADD CONSTRAINT "mock_tests_scores_range" CHECK (("mock_tests"."level" = 5 and "mock_tests"."listening" between 0 and 45 and "mock_tests"."reading" between 0 and 45 and "mock_tests"."writing" between 0 and 8)
       or ("mock_tests"."level" = 6 and "mock_tests"."listening" between 0 and 50 and "mock_tests"."reading" between 0 and 50 and "mock_tests"."writing" between 0 and 100));
