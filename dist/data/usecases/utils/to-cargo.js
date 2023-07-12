"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCargo = void 0;
const toCargoItem = (rawCargo) => {
    const { itemReference, productReference, eanCode, amount, invoiced } = rawCargo;
    const totalAmount = amount;
    return {
        itemReference,
        productReference,
        eanCode,
        totalAmount,
        invoiced: !!invoiced,
        batches: [],
    };
};
const toCargo = (rawCargos) => {
    const { cargoReference, orderReference, clientName, clientCpf, cep, neighborhood, additionalInformation, propertyNumber, street, referencePoint, city, federalUnit, } = rawCargos[0];
    const cargoItems = rawCargos.map(toCargoItem);
    return {
        cargoReference,
        orderReference,
        clientName,
        clientCpf,
        cep,
        neighborhood,
        additionalInformation,
        propertyNumber,
        street,
        referencePoint,
        city,
        federalUnit,
        cargoItems,
    };
};
exports.toCargo = toCargo;
