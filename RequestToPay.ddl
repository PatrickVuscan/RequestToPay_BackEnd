/* This file will set up the database tables. If there is data already in the database, it will be removed. */

-- Refresh the db
drop schema if exists "RequestToPay" cascade;
create schema "RequestToPay";
set search_path to "RequestToPay";

-- tables
create table "Entity" (
  "EID" serial primary key,
  "Name" text not null,
  "BillingAddress" text not null,
  "Username" text unique not null,
  "Password" text not null
);

create table "Item" (
  "IID" serial primary key,
  "Name" text not null,
  "SID" integer not null references "Entity"("EID"),
  "Price" float not null
);

create table "Invoice" (
  "InID" serial primary key,
  "NextInID" integer references "Invoice"("InID"),
  "DeliveryDate" timestamp not null
);

create table "InvoiceItems" (
  "InID" integer references "Invoice"("InID"),
  "IID" integer references "Item"("IID"),
  "Price" float not null,
  "Quantity" integer not null,
  primary key ("InID", "IID")
);

create table "WarehouseContents" (
  "SID" integer not null references "Entity"("EID"),
  "IID" integer not null references "Item"("IID"),
  "Location" text not null,
  "Quantity" integer default 0
);

create table "Order" (
  "OID" serial primary key,
  "InID" integer unique not null references "Invoice"("InID"),
  "SID" integer not null references "Entity"("EID"),
  "CID" integer not null references "Entity"("EID"),
  "DID" integer not null references "Entity"("EID"),
  "OrderDate" timestamp not null,
  "PaidStatus" boolean not null,
  "ArrivedStatus" boolean not null,
  "DeliveredStatus" boolean not null
);
