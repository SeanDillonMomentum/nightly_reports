const sql = require("mssql");
const test = async query => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect("mssql://Webapp:MMTMwebapp01!@10.0.0.19/CornerStone");
    const result = await sql.query(query);
    return result;
  } catch (err) {
    throw new Error(err);

    // ... error checks
  }
};
module.exports = test;
