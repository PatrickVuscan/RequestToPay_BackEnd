import {Entity, Invoice, InvoiceItems, Item, Order, OrderFields} from "../../../utils/dbTypes";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import q from "../../../utils/query";
import {setInvoice} from "../../Invoice/QueryController";
import {setInvoiceItems} from "../../InvoiceItems/QueryController";
import {createItem} from "../../Item/providers/createItem";
import {setOrder} from "../../Order/QueryController";

const generateSetString: (entity: Entity) => string = (ent: Entity) => {
    return `INSERT INTO "RequestToPay"."Entity"
        ("EID", "Name", "Username", "Password", "BillingAddress", "PhoneNumber")
        VALUES (default, '${ent.Name}', random(), '${ent.Password}', '${ent.BillingAddress}', '${ent.PhoneNumber}')
        RETURNING "EID"`;
};

export const createDemoEntity: (ent: Entity) => void = async (ent: Entity) => {
    let res = null;
    try {
        res = await q(generateSetString(ent));
    } catch (e) {
        throw new HTTP400Error("SQL Error");
    }
    if (!res) {
        throw new HTTP404Error("No response");
    } else if (res.rows.length !== 1) {
        throw new HTTP404Error(generateSetString(ent));
        // throw new HTTP404Error("Couldn't create entity");
    }

    const demoID = res.rows[0].EID;

    // Orders 1-4 display the different bool value cases.
    const invoice1: Invoice = {
        InID: -1,
        DeliveryDate: new Date(),
        NextInID: null,
    };
    const invoice1ID = await setInvoice(invoice1);

    const order1: Order = {
        ApprovedStatus: false,
        ArrivedStatus: false,
        CID: demoID,
        DID: 5,
        DeliveredStatus: false,
        InID: invoice1ID,
        OID: -1,
        OrderDate: new Date(),
        PaidStatus: false,
        SID: 1,

    };
    await setOrder(order1);

    const items1: InvoiceItems = {
        InID: invoice1ID,
        IID: 1,
        Price: 79.99,
        Quantity: 4,
    };
    await setInvoiceItems(items1);

    const invoice2: Invoice = {
        InID: -1,
        DeliveryDate: new Date(),
        NextInID: null,
    };
    const invoice2ID = await setInvoice(invoice2);

    const order2: Order = {
        ApprovedStatus: true,
        ArrivedStatus: false,
        CID: demoID,
        DID: 5,
        DeliveredStatus: false,
        InID: invoice2ID,
        OID: -1,
        OrderDate: new Date(),
        PaidStatus: false,
        SID: 1,

    };
    await setOrder(order2);

    const items2: InvoiceItems = {
        InID: invoice2ID,
        IID: 1,
        Price: 79.99,
        Quantity: 4,
    };
    await setInvoiceItems(items2);

    const invoice3: Invoice = {
        InID: -1,
        DeliveryDate: new Date(),
        NextInID: null,
    };
    const invoice3ID = await setInvoice(invoice3);

    const order3: Order = {
        ApprovedStatus: true,
        ArrivedStatus: true,
        CID: demoID,
        DID: 5,
        DeliveredStatus: false,
        InID: invoice3ID,
        OID: -1,
        OrderDate: new Date(),
        PaidStatus: false,
        SID: 1,

    };
    await setOrder(order3);

    const items3: InvoiceItems = {
        InID: invoice3ID,
        IID: 1,
        Price: 79.99,
        Quantity: 4,
    };
    await setInvoiceItems(items3);

    const invoice4: Invoice = {
        InID: -1,
        DeliveryDate: new Date(),
        NextInID: null,
    };
    const invoice4ID = await setInvoice(invoice4);

    const order4: Order = {
        ApprovedStatus: true,
        ArrivedStatus: true,
        CID: demoID,
        DID: 5,
        DeliveredStatus: true,
        InID: invoice4ID,
        OID: -1,
        OrderDate: new Date(),
        PaidStatus: false,
        SID: 1,

    };
    await setOrder(order4);

    const items4: InvoiceItems = {
        InID: invoice4ID,
        IID: 1,
        Price: 79.99,
        Quantity: 4,
    };
    await setInvoiceItems(items4);

    // Orders 5-7 are different cases where you are the driver.
    const invoice5: Invoice = {
        InID: -1,
        DeliveryDate: new Date(),
        NextInID: null,
    };
    const invoice5ID = await setInvoice(invoice5);

    const order5: Order = {
        ApprovedStatus: true,
        ArrivedStatus: false,
        CID: 4,
        DID: demoID,
        DeliveredStatus: false,
        InID: invoice5ID,
        OID: -1,
        OrderDate: new Date(),
        PaidStatus: false,
        SID: 1,

    };
    await setOrder(order5);

    const items5p1: InvoiceItems = {
        InID: invoice5ID,
        IID: 1,
        Price: 89.99,
        Quantity: 4,
    };
    await setInvoiceItems(items5p1);
    const items5p2: InvoiceItems = {
        InID: invoice5ID,
        IID: 2,
        Price: 109.99,
        Quantity: 7,
    };
    await setInvoiceItems(items5p2);

    const invoice6: Invoice = {
        InID: -1,
        DeliveryDate: new Date(),
        NextInID: null,
    };
    const invoice6ID = await setInvoice(invoice6);

    const order6: Order = {
        ApprovedStatus: true,
        ArrivedStatus: true,
        CID: 4,
        DID: demoID,
        DeliveredStatus: false,
        InID: invoice6ID,
        OID: -1,
        OrderDate: new Date(),
        PaidStatus: false,
        SID: 1,

    };
    await setOrder(order6);

    const items6p1: InvoiceItems = {
        InID: invoice6ID,
        IID: 1,
        Price: 89.99,
        Quantity: 4,
    };
    await setInvoiceItems(items6p1);
    const items6p2: InvoiceItems = {
        InID: invoice6ID,
        IID: 2,
        Price: 109.99,
        Quantity: 7,
    };
    await setInvoiceItems(items6p2);

    // Create an item that is the demo user's product to sell.
    const demoItem: Item = {
        IID: -1,
        Name: `Pallet of ${ent.Name}''s Produce`,
        Price: 109.99,
        SID: demoID,

    };
    const demoItemID = await createItem(demoItem);

    const invoice7: Invoice = {
        InID: -1,
        DeliveryDate: new Date(),
        NextInID: null,
    };
    const invoice7ID = await setInvoice(invoice7);

    const order7: Order = {
        ApprovedStatus: false,
        ArrivedStatus: false,
        CID: 4,
        DID: 5,
        DeliveredStatus: false,
        InID: invoice7ID,
        OID: -1,
        OrderDate: new Date(),
        PaidStatus: false,
        SID: demoID,

    };
    await setOrder(order7);

    const items7: InvoiceItems = {
        InID: invoice7ID,
        IID: demoItemID,
        Price: 59.99,
        Quantity: 13,
    };
    await setInvoiceItems(items7);

    const invoice8: Invoice = {
        InID: -1,
        DeliveryDate: new Date(),
        NextInID: null,
    };
    const invoice8ID = await setInvoice(invoice8);

    const order8: Order = {
        ApprovedStatus: false,
        ArrivedStatus: false,
        CID: 4,
        DID: 5,
        DeliveredStatus: false,
        InID: invoice8ID,
        OID: -1,
        OrderDate: new Date(),
        PaidStatus: false,
        SID: demoID,

    };
    await setOrder(order8);

    const items8: InvoiceItems = {
        InID: invoice8ID,
        IID: demoItemID,
        Price: 59.99,
        Quantity: 13,
    };
    await setInvoiceItems(items8);

    return demoID;
};
