/* This file inserts example data into the RequestToPay schema. */

-- Sets the namespace for where we keep the tables
set search_path to RequestToPay;

-- Entity
insert into Entity("name", billingAddress)
values ('Coke', '20 Everywhere Ave.'),
       ('McDonalds', '-1 College s.t.'),
       ('Chestnut Res', '89 Chestnut s.t.');

-- Items
insert into Items(SID, "name", price)
values (1, 'Pallete of Diet Coke', 99.99),
       (1, 'Pallete of Coke', 105.49);

-- Invoice
insert into Invoice(nextinid)
values (null);

-- InvoiceItems
insert into InvoiceItems(InId, IID, price, quantity)
values (1, 1, 99.98, 3),
       (1, 2, 105.49, 2);

-- WarehouseContents
insert into WarehouseContents(SID, IID, quantity, "location")
values (1, 1, 20, '900 Nowhere Ave.');

-- Orders
insert into Orders(SID, "CID", InId, DID)
values (1, 3, 1, 99);

