const client = require("../../db/client");


const getAllUsers = async (req, res) => {
    try {
      const all = await client.query("SELECT * FROM Users");
      res.status(200).send(all.rows);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };

  
  module.exports = { getAllUsers }