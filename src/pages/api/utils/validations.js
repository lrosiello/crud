import { query } from "../../../lib/db";

//VERIFIES THAT DATA FROM BODY IS FILLED
export function areAllDataFilled(array) {
  let countValid = 0;
  array.map((element, index) => {
    const validationElement = element;
    if (element !== null && validationElement.toString().trim() !== "") {
      countValid++;
    }
  });
  if (countValid === array.length) {
    return true;
  } else {
    return false;
  }
}

//VERIFIES IF ANOTHER ELEMENT EXISTS
export async function isItExists(tableName, columnName, elementFromBody) {
  const queryText = `SELECT ${columnName} FROM ${tableName} WHERE ${columnName} = $1`;
  const verify = await query(queryText, [elementFromBody]);

  return verify.rowCount > 0;
}

