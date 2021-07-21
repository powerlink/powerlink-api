<h1 align="center"><img src="https://avatars.githubusercontent.com/u/16842403?v=4"></h1>

# powerlink-api

This package provides an easy to use API which lets you connect your custom Backend/Frontend apps to your Powerlink data.

---

## Initialization & Authentication

Backend: `const api = new plapi(TOKEN_ID);`\
Frontend - Development: `const api = new plapi(TOKEN_ID);`\
Frontend - Production: `const api = new plapi();`\
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

| Field      | Description          | Example                                                                                                                                 |
| ---------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| objectType | the number of object | Account = 1, Contact = 2, Cases = 5 (<a href="https://api.powerlink.co.il/_common/viewrecordsystemsettings.aspx?oid=58">See more..</a>) |
| pageSize   | Result per page      | Min: 1 Max: 500                                                                                                                         |
| pageNumber | Page number          | Starts at: 1                                                                                                                            |
| fields     | Record's fields      | All fields = \*                                                                                                                         |
| query      | Query conditions     | ((idnumber = 1234) AND (idnumber = 5678))                                                                                               |
| sortBy     | Sort by              | accountname/idnumber/telephone1                                                                                                         |
| sortType   | Sort type            | desc/asc                                                                                                                                |

**Query property:**

| Operator           | Description              | Example                                                    |
| ------------------ | ------------------------ | ---------------------------------------------------------- |
| **=**              | Equal                    | query: "(idnumber **=** 1234)"                             |
| **!=**             | Not Equal                | query: "(idnumber **!=** 1234)"                            |
| **>**              | Greater than             | query: "(age1 **>** age2)"                                 |
| **<**              | Less than                | query: "(age1 **<** age2)"                                 |
| **<=**             | Greater than or equal to | query: "(age1 **<=** age2)"                                |
| **>=**             | Less than or equal to    | query: "(age1 **>=** age2)"                                |
| **OR**             | Logical OR               | query: "((idnumber = 1234) **OR** (idnumber = 456789))"    |
| **AND**            | Logical And              | query: "((idnumber = 1234) **AND** (accountname = 'משה'))" |
| **is-null**        | NULL values              | query: "(idnumber **is-null** 1234567)"                    |
| **is-not-null**    | Not NULL values          | query: "(idnumber **is-not-null** 1234567)"                |
| **start-with**     | Starts with              | query: "(idnumber **start-with** 1234567)"                 |
| **end-with**       | Ends with                | query: "(idnumber **end-with** 1234567)"                   |
| **not-start-with** | Doesn't start with       | query: "(idnumber **not-start-with** 1234567)"             |
| **not-end-with**   | Doesn't end with         | query: "(idnumber **not-end-with** 1234567)"               |

You can combine both the AND and OR conditions using parenthesis.

**Note**

- AND & OR conditions allow you to test multiple conditions (order of operations applies).
