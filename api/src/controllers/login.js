const client = require("../../db/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//------ Login functionallity with bcrypt and jwt ---------------------------------//
//----- user_name: password: admin: true/false -----=------------------------------//
const login = async (req, res) => {
  const { user_name, password } = req.body;

  try {
    const user = await client.query(
      `SELECT * FROM users WHERE user_name = '${user_name}'`
    );

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (isMatch) {
      const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      });
      res.set("Authorization", token, {
        maxAge: 28800000,
        httpOnly: true,
        secure: true,
      })
      res.cookie("auth", token, {
        maxAge: 28800000,
        httpOnly: true,
        secure: true,
      });
      res.status(200).json({
        token,
        user: {
          id: user.rows[0].id,
          user_name: user.rows[0].user_name,
          admin: user.rows[0].admin,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
 

//----- Register functionallity with bcrypt *** must register with postman --------//
//----- user_name: password: admin: true/false -----=------------------------------//
const register = async (req, res) => {
  if (req.body.admin === undefined) {
    req.body.admin = false;
  }
  const password = await bcrypt.hash(req.body.password, 10);
  const { user_name, admin } = req.body;
  try {
    if (!user_name || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    const user = await client.query(
      `INSERT INTO users (user_name, password, admin) VALUES ('${user_name}', '${password}', '${admin}')`
    );
    res.status(200).send({ user_name, admin });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

//logout/////////////////////////////////////////////////////////////////////////
const logout = async (req, res) => {
  res.clearCookie("auth");
  res.status(200).json({ message: "success" });
};

module.exports = { login, register, logout };
