/* This file inserts example data into the RequestToPay schema. */

-- Sets the namespace for where we keep the tables
set search_path to "RequestToPay";

-- Entity
insert into "Entity"("EID", "Name", "BillingAddress", "Username", "Password", "PhoneNumber")
values (default, 'Coke', '20 Everywhere Ave.', 'coke', 'coke',             '7789906284'),
       (default, 'McDonalds', '-1 College s.t.', 'mcdonalds', 'mcdonalds', null),
       (default, 'Chestnut Res', '89 Chestnut s.t.', 'chesnut', 'chesnut', null),
       (default, 'Patrick', '66 Broadway Ave.', 'patrick', 'patrick',      null),
       (default, 'Driver Mac', '33 Orchard Blvd.', 'driver', 'zoomzoom',   null),
       (default, 'Will G', 'Chestnut Res.', 'will', 'will',                '9786185596');

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
insert into "Order"("OID", "SID", "CID", "InID", "DID", "OrderDate", "ApprovedStatus", "ArrivedStatus", "DeliveredStatus", "PaidStatus")
values (default, 1, 3, 1, 5, '2019-01-01',  true, true, true, true),
       (default, 1, 4, 4, 5, '2019-08-05',  true, true, true, true),
       (default, 1, 4, 5, 5, '2019-09-10',  true, true, true, true),
       (default, 1, 4, 6, 5, '2019-09-15',  true, true, true, false),
       (default, 1, 4, 7, 5, '2019-09-22',  true, true, false, false),
       (default, 1, 4, 8, 5, '2019-09-25',  true, true, false, false),
       (default, 1, 4, 9, 5, '2019-10-11',  false, false, false, false),
       (default, 1, 4, 10, 5, '2019-10-30', false, false, false, false),
       (default, 1, 4, 11, 5, '2019-11-5',  true, false, false, false),
       (default, 1, 4, 12, 5, '2019-11-6',  true, false, false, false),
       (default, 1, 4, 13, 5, '2019-11-11', true, true, true, true),
       (default, 1, 4, 14, 5, '2019-11-20', true, false, false, false);
