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

const deleteUser = async (req, res) => {
  try {
    
    const user = await client.query(
      `DELETE FROM Users WHERE id = '${req.body.id}'`
    );
    res.status(200).send("User deleted");
  } catch {
    res.status(500).send(err);
  }
};

module.exports = { getAllUsers, deleteUser };
