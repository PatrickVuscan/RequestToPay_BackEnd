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
  "ArrivedStatus" boolean not null,
  "DeliveredStatus" boolean not null,
  "PaidStatus" boolean not null
);

/* This part of the file inserts example data into the RequestToPay schema. */

-- Sets the namespace for where we keep the tables
set search_path to "RequestToPay";

-- Entity
insert into "Entity"("EID", "Name", "BillingAddress", "Username", "Password")
values (default, 'Coke', '20 Everywhere Ave.', 'coke', 'coke'),
       (default, 'McDonalds', '-1 College s.t.', 'mcdonalds', 'mcdonalds'),
       (default, 'Chestnut Res', '89 Chestnut s.t.', 'chesnut', 'chesnut'),
       (default, 'Patrick', '66 Broadway Ave.', 'patrick', 'patrick'),
       (default, 'Driver Mac', '33 Orchard Blvd.', 'driver', 'zoomzoom');

-- Items
insert into "Item"("IID", "SID", "Name", "Price")
values (default, 1, 'Pallet of Diet Coke', 99.99),
       (default, 1, 'Pallet of Coke', 105.49),
       (default, 1, 'Pallet of Fanta', 106.99);

-- Invoice
insert into "Invoice"("InID", "NextInID", "DeliveryDate")
values (default, null, '2019-01-02'),
       (default, null, '2019-08-05'),
       (default, 2, '2019-11-15'),
       (default, 3, '2019-11-15'),
       (default, null, '2019-09-10'),
       (default, null, '2019-09-15'),
       (default, null, '2019-09-22'),
       (default, null, '2019-09-25'),
       (default, null, '2019-10-11'),
       (default, null, '2019-10-30'),
       (default, null, '2019-11-5'),
       (default, null, '2019-11-6'),
       (default, null, '2019-11-11'),
       (default, null, '2019-11-20');

-- InvoiceItems
insert into "InvoiceItems"("InID", "IID", "Price", "Quantity")
values (1, 1, 99.98, 3),
       (1, 2, 105.49, 2);

-- WarehouseContents
insert into "WarehouseContents"("SID", "IID", "Quantity", "Location")
values (1, 1, 20, '900 Nowhere Ave.');

-- Orders
insert into "Order"("OID", "SID", "CID", "InID", "DID", "OrderDate", "ArrivedStatus", "DeliveredStatus", "PaidStatus")
values (default, 1, 3, 1, 5, '2019-01-01', true, true, true),
       (default, 1, 4, 4, 5, '2019-08-05', true, true, true),
       (default, 1, 4, 5, 5, '2019-09-10', true, true, true),
       (default, 1, 4, 6, 5, '2019-09-15', true, true, false),
       (default, 1, 4, 7, 5, '2019-09-22', true, false, false),
       (default, 1, 4, 8, 5, '2019-09-25', true, false, false),
       (default, 1, 4, 9, 5, '2019-10-11', false, false, false),
       (default, 1, 4, 10, 5, '2019-10-30', false, false, false),
       (default, 1, 4, 11, 5, '2019-11-5', false, false, false),
       (default, 1, 4, 12, 5, '2019-11-6', false, false, false),
       (default, 1, 4, 13, 5, '2019-11-11', true, true, true),
       (default, 1, 4, 14, 5, '2019-11-20', false, false, false);
