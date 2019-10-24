/* This is a list of examples that could be returned by q. */

import {QueryResult} from "pg";

const usersFields = [
    {
        columnID: 1,
        dataTypeID: 23,
        dataTypeModifier: -1,
        dataTypeSize: 4,
        format: "text",
        name: "id",
        tableID: 16472,
    },
    {
        columnID: 2,
        dataTypeID: 25,
        dataTypeModifier: -1,
        dataTypeSize: -1,
        format: "text",
        name: "uname",
        tableID: 16472,
    },
    {
        columnID: 3,
        dataTypeID: 25,
        dataTypeModifier: -1,
        dataTypeSize: -1,
        format: "text",
        name: "password",
        tableID: 16472,
    },
    {
        columnID: 4,
        dataTypeID: 23,
        dataTypeModifier: -1,
        dataTypeSize: 4,
        format: "text",
        name: "privilege",
        tableID: 16472,
    },
];

export const zeroUsers: QueryResult = {
    command: "SELECT",
    fields: usersFields,
    oid: 0,
    rowCount: 0,
    rows: [],
};

export const singleUser: QueryResult = {
    command: "SELECT",
    fields: usersFields,
    oid: 0,
    rowCount: 1,
    rows: [
        {
            id: 1,
            password: "$2a$06$h4oAU7Pl.vKEshsnBhOSUOMGVrbkayJxJk8QyCbZwoyMk0h6hGyIW",
            privilege: 0,
            uname: "admin",
        },
    ],
};

export const twoUsers: QueryResult = {
    command: "SELECT",
    fields: usersFields,
    oid: 0,
    rowCount: 2,
    rows: [
        {
            id: 1,
            password: "$2a$06$h4oAU7Pl.vKEshsnBhOSUOMGVrbkayJxJk8QyCbZwoyMk0h6hGyIW",
            privilege: 0,
            uname: "admin",
        },
        {
            id: 2,
            password: "$3a$06$h4oAU7Pl.vKEshsnBhOSUOMGVrbkayJxJk8QyCbZwoyMk0h6hGyIW",
            privilege: 1,
            uname: "bubba",
        },
    ],
};
