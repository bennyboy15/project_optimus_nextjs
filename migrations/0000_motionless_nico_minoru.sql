CREATE TABLE `customer` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`address` text
);
--> statement-breakpoint
CREATE TABLE `heading` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`section_id` integer NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`section_id`) REFERENCES `section`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `map_location` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`latitude` text,
	`longitude` text,
	`created_on` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `optimus_notification` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`message` text NOT NULL,
	`type` integer,
	`importance` integer DEFAULT 0,
	`read` integer DEFAULT false,
	`created_on` integer DEFAULT (unixepoch()) NOT NULL,
	`created_by` integer,
	FOREIGN KEY (`user_id`) REFERENCES `optimus_user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `optimus_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `optimus_user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text NOT NULL,
	`email` text,
	`phone` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `optimus_user_username_unique` ON `optimus_user` (`username`);--> statement-breakpoint
CREATE TABLE `option_suggestion` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`additional_comments` text,
	`option_heading` text,
	`stock_example` text,
	`variation` text,
	`part_from` text,
	`is_deleted` integer DEFAULT false,
	`section_id` integer,
	FOREIGN KEY (`section_id`) REFERENCES `section`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `option` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`heading_id` integer,
	`name` text NOT NULL,
	`desc` text,
	`apply_to` text,
	`bom` text,
	`colour` text,
	`qty` text,
	`style` text,
	`cost` real,
	`is_group` integer DEFAULT false,
	`labour` text,
	`labour_cost` real,
	`labour_hours` real,
	`labour_type` text,
	FOREIGN KEY (`heading_id`) REFERENCES `heading`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `salesman` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`name` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `optimus_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `section` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`section_id` integer
);
--> statement-breakpoint
CREATE TABLE `technician` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`name` text NOT NULL,
	`techNo` integer,
	FOREIGN KEY (`user_id`) REFERENCES `optimus_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `truck_comment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`truck_id` integer NOT NULL,
	`comment` text NOT NULL,
	`created_by` integer,
	`created_on` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`truck_id`) REFERENCES `truck`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `optimus_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `truck_make` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`code` text
);
--> statement-breakpoint
CREATE TABLE `truck_model_option` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`model_id` integer NOT NULL,
	`option_id` integer NOT NULL,
	FOREIGN KEY (`model_id`) REFERENCES `truck_model`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`option_id`) REFERENCES `option`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `truck_model` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`make_id` integer NOT NULL,
	`name` text NOT NULL,
	`category` text,
	FOREIGN KEY (`make_id`) REFERENCES `truck_make`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `truck` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_id` integer,
	`salesman_id` integer,
	`make_id` integer,
	`model_id` integer,
	`fleetNo` text,
	`stockNo` text,
	`chassisNo` text,
	`registration` text,
	`offline_date` integer,
	`delivery_date` integer,
	`truck_colour` text,
	`chassis_colour` text,
	`trim_colour` text,
	`status` integer DEFAULT 0,
	`A4_stickers_done` integer DEFAULT false,
	`small_stickers_done` integer DEFAULT false,
	FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`salesman_id`) REFERENCES `salesman`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`make_id`) REFERENCES `truck_make`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`model_id`) REFERENCES `truck_model`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `worksheet_change` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`worksheet_id` integer NOT NULL,
	`change_description` text NOT NULL,
	`created_by` integer,
	`created_on` integer DEFAULT (unixepoch()) NOT NULL,
	`modified_on` integer DEFAULT (unixepoch()) NOT NULL,
	`modified_by` integer,
	FOREIGN KEY (`worksheet_id`) REFERENCES `worksheet`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `optimus_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`modified_by`) REFERENCES `optimus_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `worksheet_option` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`worksheet_id` integer NOT NULL,
	`option_id` integer NOT NULL,
	`quantity` integer DEFAULT 1,
	FOREIGN KEY (`worksheet_id`) REFERENCES `worksheet`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`option_id`) REFERENCES `option`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `worksheet` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`truck_id` integer NOT NULL,
	`salesman_id` integer NOT NULL,
	`customer_id` integer NOT NULL,
	`status` integer,
	`created_by` integer,
	`created_on` integer DEFAULT (unixepoch()) NOT NULL,
	`modified_by` integer,
	`modified_on` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`truck_id`) REFERENCES `truck`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`salesman_id`) REFERENCES `salesman`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `optimus_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`modified_by`) REFERENCES `optimus_user`(`id`) ON UPDATE no action ON DELETE no action
);
