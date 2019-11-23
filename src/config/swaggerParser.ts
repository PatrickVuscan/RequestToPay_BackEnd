/* Parses the input of swagger when needed, to provide the required file structure. */

export type invoiceItemsEntry = {
    IID: number,
    Quantity: number,
};

export const invoiceItemsParser: (itemsArray: number[]) => invoiceItemsEntry[] = (itemsArray: number[]) => {
    const invoiceItemsList = [];
    for (let i = 0; i < itemsArray.length; i += 2) {
        const invoiceItem = {
            IID: itemsArray[i],
            Quantity: itemsArray[i + 1],
        };
        invoiceItemsList.push(invoiceItem);
    }
    return invoiceItemsList;
};
