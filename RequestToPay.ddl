/* This file will set up the database tables. If there is data already in the database, it will be removed. */

-- Refresh the db
drop schema if exists RequestToPay cascade;
create schema RequestToPay;
set search_path to RequestToPay;

-- tables
create table Entity (
  EID serial primary key,
  name text not null,
  billingAddress text not null
);

create table Items (
  IID serial primary key,
  name text not null,
  SID integer not null references Entity(EID),
  price float not null
);

create table Invoice (
  InID serial primary key,
  NextInId integer references Invoice(InID)
);

create table InvoiceItems (
  InId integer references Invoice(InId),
  IID integer references Items(IID),
  price float not null,
  quantity integer not null,
  primary key (InId, IID)
);

create table WarehouseContents (
  SID integer not null references Entity(EID),
  IID integer not null references Items(IID),
  location text not null,
  quantity integer default 0
);

create table Orders (
  OID serial primary key,
  InId integer unique not null references Invoice(InID),
  DID integer not null,
  SID integer not null references Entity(EID),
  CID integer not null references Entity(EID)
);
