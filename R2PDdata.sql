/* This file inserts example data into the RequestToPay schema. */

-- Sets the namespace for where we keep the tables
set search_path to RequestToPay;

-- Entity
insert into Entity(EID, "name", billingAddress, password)
values (default, 'Coke', '20 Everywhere Ave.', 'coke'),
       (default, 'McDonalds', '-1 College s.t.', 'mcdonalds'),
       (default, 'Chestnut Res', '89 Chestnut s.t.', 'chesnut'),
       (default, 'Patrick', '66 Broadway Ave.', 'patrick');

-- Items
insert into Items(IID, SID, "name", price)
values (default, 1, 'Pallete of Diet Coke', 99.99),
       (default, 1, 'Pallete of Coke', 105.49);

-- Invoice
insert into Invoice(InID, nextinid, DeliveryDate)
values (default, null, '2019-01-02'),
       (default, null, '2019-08-05');

-- InvoiceItems
insert into InvoiceItems(InID, IID, price, quantity)
values (1, 1, 99.98, 3),
       (1, 2, 105.49, 2);

-- WarehouseContents
insert into WarehouseContents(SID, IID, quantity, "location")
values (1, 1, 20, '900 Nowhere Ave.');

-- Orders
insert into Orders(OID, SID, "cid", InID, DID, OrderDate)
values (default, 1, 3, 1, 99, '2019-01-01'),
       (default, 1, 4, 2, 99, '2019-08-05');
