import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
  date,
} from "drizzle-orm/pg-core"

// ---------------------------------------------------------------------------
// Better Auth tables (camelCase columns — do not rename)
// ---------------------------------------------------------------------------
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

// ---------------------------------------------------------------------------
// App tables (plain userId column for per-user scoping, no FK by default)
// ---------------------------------------------------------------------------
export const challenge = pgTable("challenge", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  title: text("title").notNull().default("My 60-Day Challenge"),
  commitment: text("commitment").notNull().default(""),
  track: text("track").notNull().default("fullstack"),
  durationDays: integer("durationDays").notNull().default(60),
  freezeUsed: boolean("freezeUsed").notNull().default(false),
  startDate: date("startDate").notNull().defaultNow(),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const dayLog = pgTable("day_log", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  challengeId: integer("challengeId").notNull(),
  dayNumber: integer("dayNumber").notNull(),
  logDate: date("logDate").notNull(),
  proofText: text("proofText").notNull().default(""),
  githubUrl: text("githubUrl"),
  linkedinUrl: text("linkedinUrl"),
  proofUrl: text("proofUrl"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})
