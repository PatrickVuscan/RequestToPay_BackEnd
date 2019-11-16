/* This file inserts example data into the RequestToPay schema. */

-- Sets the namespace for where we keep the tables
set search_path to "RequestToPay";

-- Entity
insert into "Entity"("EID", "Name", "BillingAddress", "Password")
values (default, 'Coke', '20 Everywhere Ave.', 'coke'),
       (default, 'McDonalds', '-1 College s.t.', 'mcdonalds'),
       (default, 'Chestnut Res', '89 Chestnut s.t.', 'chesnut'),
       (default, 'Patrick', '66 Broadway Ave.', 'patrick');

-- Items
insert into "Item"("IID", "SID", "Name", "Price")
values (default, 1, 'Pallete of Diet Coke', 99.99),
       (default, 1, 'Pallete of Coke', 105.49);

-- Invoice
insert into "Invoice"("InID", "NextInID", "DeliveryDate")
values (default, null, '2019-01-02'),
       (default, null, '2019-08-05'),
       (default, 2, '2019-11-15'),
       (default, 3, '2019-11-15'),
       (default, null, '2019-11-15');

-- InvoiceItems
insert into "InvoiceItems"("InID", "IID", "Price", "Quantity")
values (1, 1, 99.98, 3),
       (1, 2, 105.49, 2);

-- WarehouseContents
insert into "WarehouseContents"("SID", "IID", "Quantity", "Location")
values (1, 1, 20, '900 Nowhere Ave.');

-- Orders
insert into "Order"("OID", "SID", "CID", "InID", "DID", "OrderDate")
values (default, 1, 3, 1, 99, '2019-01-01'),
       (default, 1, 4, 2, 99, '2019-08-05'),
       (default, 1, 4, 4, 99, '2019-11-15');
