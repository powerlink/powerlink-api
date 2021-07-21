# powerlink-api

This package provides an easy to use API which lets you connect your custom Backend/Frontend apps to your Powerlink data.

---

## Initialization & Authentication

Backend: `const api = new plapi(TOKEN_ID);`
Frontend - Development: `const api = new plapi(TOKEN_ID);`
Frontend - Production: `const api = new plapi();`
(The Powerlink App's cookie is used instead of a token in a production environment).

## Create

```js
import { plapi } from 'powerlink-api';

const api = new plapi();
api.create(objectType, { [fieldName]: value, ... });
```

## Update

```js
import { plapi } from 'powerlink-api';

const api = new plapi();
api.update(objectType, objectId, { [fieldName]: value, ... });
```

## Delete

```js
import { plapi } from "powerlink-api";

const api = new plapi();
api.delete(objectType, objectId);
```

## Query

```js
import { plapi } from "powerlink-api";

const api = new plapi();
api.query({
  objectType: 1,
  pageSize: 50,
  pageNumber: 1,
  fields: "accountname, idnumber, telephone1",
  query: "(idnumber = 12345678) AND (telephone1 = 036339060)",
  sortBy: "accountname",
  sortType: "desc",
});
```

| Field      | Description                    | exemple                                                                                                                                 |
| ---------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| objectType | the number of object           | Account = 1, Contact = 2, Cases = 5 (<a href="https://api.powerlink.co.il/_common/viewrecordsystemsettings.aspx?oid=58">See more..</a>) |
| pageSize   | the number of result per page  | Min:1 Max:500                                                                                                                           |
| pageNumber | the page of result             | start at: 1                                                                                                                             |
| fields     | which fields to show on result | for all field: \*                                                                                                                       |
| query      | the query you want search      | ((idnumber = 1234) AND (idnumber = 5678))                                                                                               |
| sortBy     | Select field to sort by        | accountname/idnumber/telephone1                                                                                                         |
| sortType   | Select type to sort            | desc/asc                                                                                                                                |

Type of query:

| Operator           | Description                                  | exemple                                                      |
| ------------------ | -------------------------------------------- | ------------------------------------------------------------ |
| **=**              | find result equal                            | "query": "(idnumber **=** 1234)"                             |
| **!=**             | find result not equal                        | "query": "(idnumber **!=** 1234)"                            |
| **>**              | Greater than                                 | "query": "(age1 **>** age2)"                                 |
| **<**              | Less than                                    | "query": "(age1 **<** age2)"                                 |
| **<=**             | Greater than or equal to                     | "query": "(age1 **<=** age2)"                                |
| **>=**             | Less than or equal to                        | "query": "(age1 **>=** age2)"                                |
| **OR**             | performs a logical-OR of its bool operands   | "query": "((idnumber = 1234) **OR** (idnumber = 456789))"    |
| **AND**            | performs a logical-AND of its bool           | "query": "((idnumber = 1234) **AND** (accountname = 'משה'))" |
| **is-null**        | look for NULL values                         | "query": "(idnumber **is-null** 1234567)"                    |
| **is-not-null**    | look for not NULL values                     | "query": "(idnumber **is-not-null** 1234567)"                |
| **start-with**     | find if the string start with the string     | "query": "(idnumber **start-with** 1234567)"                 |
| **end-with**       | find if the string end with the string       | "query": "(idnumber **end-with** 1234567)"                   |
| **not-start-with** | find if the string not start with the string | "query": "(idnumber **not-start-with** 1234567)"             |
| **not-end-with**   | find if the string not end with the string   | "query": "(idnumber **not-end-with** 1234567)"               |

You can combine both the AND and OR conditions using parenthesis.

**Note**

- AND & OR conditions allow you to test multiple conditions.
- Don't forget the order of operation parentheses!
