CREATE TABLE "portfolio_accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"impersonated_by" text,
	"user_id" text NOT NULL,
	CONSTRAINT "portfolio_sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "portfolio_users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"role" text NOT NULL,
	"banned" boolean,
	"ban_reason" text,
	"ban_expires" timestamp,
	CONSTRAINT "portfolio_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "portfolio_verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "portfolio_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"page" varchar(256) NOT NULL,
	"thread" integer,
	"author" varchar(256) NOT NULL,
	"content" json NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_rates" (
	"userId" varchar(256) NOT NULL,
	"commentId" integer NOT NULL,
	"like" boolean NOT NULL,
	CONSTRAINT "portfolio_rates_userId_commentId_pk" PRIMARY KEY("userId","commentId")
);
--> statement-breakpoint
CREATE TABLE "portfolio_roles" (
	"userId" varchar(256) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"canDelete" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_message_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"message" text NOT NULL,
	"signature" text,
	"edited_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_message_reactions" (
	"entry_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"emoji" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "portfolio_message_reactions_entry_id_user_id_emoji_pk" PRIMARY KEY("entry_id","user_id","emoji")
);
--> statement-breakpoint
ALTER TABLE "portfolio_accounts" ADD CONSTRAINT "portfolio_accounts_user_id_portfolio_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."portfolio_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_sessions" ADD CONSTRAINT "portfolio_sessions_user_id_portfolio_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."portfolio_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_message_entries" ADD CONSTRAINT "portfolio_message_entries_user_id_portfolio_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."portfolio_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_message_reactions" ADD CONSTRAINT "portfolio_message_reactions_entry_id_portfolio_message_entries_id_fk" FOREIGN KEY ("entry_id") REFERENCES "public"."portfolio_message_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_message_reactions" ADD CONSTRAINT "portfolio_message_reactions_user_id_portfolio_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."portfolio_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "comment_idx" ON "portfolio_rates" USING btree ("commentId");--> statement-breakpoint
CREATE INDEX "message_reaction_entry_idx" ON "portfolio_message_reactions" USING btree ("entry_id");