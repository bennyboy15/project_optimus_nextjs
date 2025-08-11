import {
  sqliteTable,
  integer,
  text,
  primaryKey,
  real
} from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";


// ------------------ BASIC ENTITIES ------------------
export const customers = sqliteTable("customer", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
});

export const headings = sqliteTable("heading", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sectionId: integer("section_id").notNull().references(() => sections.id, { onDelete: "cascade" }), // FK
  name: text("name").notNull(),
});

export const mapLocations = sqliteTable("map_location", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  latitude: text("latitude"),
  longitude: text("longitude"),
  createdOn: integer("created_on", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

export const optimusNotifications = sqliteTable("optimus_notification", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => optimusUsers.id, {
    onDelete: "cascade",
  }),
  message: text("message").notNull(),
  type: integer("type"), // 0-Worksheet, 1-Schedule, 2-Admin
  importance: integer("importance").default(0),
  read: integer("read", { mode: "boolean" }).default(false),
  createdOn: integer("created_on", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  createdBy: integer("created_by").references(() => optimusUsers.id),
});

export const optimusUsers = sqliteTable("optimus_user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull(), // 'PD-Manager', 'Sales-Manager', 'PD', 'Sales', 'IT', 'Technician'
  email: text("email"),
  phone: text("phone"),
});

export const options = sqliteTable("option", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  headingId: integer("heading_id").references(() => headings.id, { onDelete: "set null" }),

  name: text("name").notNull(),
  desc: text("desc"),

  applyTo: text("apply_to"),
  BOM: text("bom"),

  // Cascading values
  COLOUR: text("colour"),
  QTY: text("qty"),
  STYLE: text("style"),

  cost: real("cost"),
  isGroup: integer("is_group", { mode: "boolean" }).default(false),

  // Labour
  labour: text("labour"),
  labour_cost: real("labour_cost"),
  labour_hours: real("labour_hours"),
  labour_type: text("labour_type"),
});

export const optionSuggestions = sqliteTable("option_suggestion", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("additional_comments").notNull(),
  option_heading: text("option_heading"),
  stock_example: text("stock_example"),
  variation: text("variation"),
  part_from: text("part_from"),
  is_deleted: integer("is_deleted", { mode: "boolean" }).default(false),
  additionalComments: text("additional_comments"),
  section_id: integer("section_id").references(() => sections.id, {
    onDelete: "set null",
  }),
});

export const salesmen = sqliteTable("salesman", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => optimusUsers.id, {
    onDelete: "cascade",
  }),
  name: text("name").notNull(),
});

export const sections = sqliteTable("section", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  section_id: integer("section_id"),
});

export const technicians = sqliteTable("technician", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => optimusUsers.id, {
    onDelete: "cascade",
  }),
  name: text("name").notNull(),
  techNo: integer("techNo"),
});

// ------------------ TRUCK RELATED ------------------
export const trucks = sqliteTable("truck", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerId: integer("customer_id").references(() => customers.id, {
    onDelete: "set null",
  }),
  salesmanId: integer("salesman_id").references(() => salesmen.id, {
    onDelete: "set null",
  }),
  makeId: integer("make_id").references(() => truckMakes.id, {
    onDelete: "set null",
  }),
  modelId: integer("model_id").references(() => truckModels.id, {
    onDelete: "set null",
  }),

  fleetNo: text("fleetNo"),
  stockNo: text("stockNo"),
  chassisNo: text("chassisNo"),
  registration: text("registration"),

  offlineDate: integer("offline_date", { mode: "timestamp" }),
  deliveryDate: integer("delivery_date", { mode: "timestamp" }),
  
  truckColour: text("truck_colour"),
  chassisColour: text("chassis_colour"),
  trimColour: text("trim_colour"),

  status: integer("status").default(0),

  A4_stickers_done: integer("A4_stickers_done", { mode: "boolean" }).default(false),
  small_stickers_done: integer("small_stickers_done", { mode: "boolean" }).default(false),
});

export const truckComments = sqliteTable("truck_comment", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  truckId: integer("truck_id").notNull().references(() => trucks.id, { onDelete: "cascade" }),
  comment: text("comment").notNull(),
  createdBy: integer("created_by").references(() => optimusUsers.id),
  createdOn: integer("created_on", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

export const truckMakes = sqliteTable("truck_make", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  code: text("code")
});

export const truckModels = sqliteTable("truck_model", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  makeId: integer("make_id").notNull().references(() => truckMakes.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  category: text("category"),
});

export const truckModelOptions = sqliteTable("truck_model_option", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  modelId: integer("model_id").notNull().references(() => truckModels.id, { onDelete: "cascade" }),
  optionId: integer("option_id").notNull().references(() => options.id, { onDelete: "cascade" }),
});

// ------------------ WORKSHEET RELATED ------------------
export const worksheets = sqliteTable("worksheet", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  truckId: integer("truck_id").notNull().references(() => trucks.id, { onDelete: "cascade" }),
  salesman_id: integer("salesman_id").notNull().references(() => salesmen.id, { onDelete: "cascade" }),
  customer_id: integer("customer_id").notNull().references(() => customers.id, { onDelete: "cascade" }),
  status: integer("status"),
  createdBy: integer("created_by").references(() => optimusUsers.id),
  createdOn: integer("created_on", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  modifiedBy: integer("modified_by").references(() => optimusUsers.id),
  modifiedOn: integer("modified_on", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

export const worksheetChanges = sqliteTable("worksheet_change", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  worksheetId: integer("worksheet_id").notNull().references(() => worksheets.id, { onDelete: "cascade" }),
  changeDescription: text("change_description").notNull(),
  createdBy: integer("created_by").references(() => optimusUsers.id),
  createdOn: integer("created_on", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  modifiedOn: integer("modified_on", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  modifiedBy: integer("modified_by").references(() => optimusUsers.id),
});

/* RELATIONS */
export const worksheetOptions = sqliteTable(
  "worksheet_option",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    worksheetId: integer("worksheet_id").notNull().references(() => worksheets.id, { onDelete: "cascade" }),
    optionId: integer("option_id").notNull().references(() => options.id, { onDelete: "cascade" }),
    quantity: integer("quantity").default(1),
  }
);

export const sectionsRelations = relations(sections, ({ many }) => ({
  headings: many(headings),
}));

export const headingsRelations = relations(headings, ({ one }) => ({
  section: one(sections, {
    fields: [headings.sectionId],
    references: [sections.id],
  }),
}));


/*
Customer
Heading
MapLocations
OptimusNotifications
OptimusUsers
OptionAttribute
OptionAttributeValue
Options
OptionSuggestions
Salesman
Section
Technician
Truck
TruckComments
TruckFiles
TruckMake
TruckModel
TruckModelOptions
Worksheet
WorksheetChanges
WorksheetOpionAttributes
WorksheetOptions 
*/