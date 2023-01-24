const express = require("express");
const router = express.Router();

const { getAllVehicles, addVehicle } = require("../controllers/vehicles");
const { getAllUsers, deleteUser } = require('../controllers/users')




router.route('/').get(getAllVehicles).post(addVehicle)
router.route('/users').get(getAllUsers).delete(deleteUser)

module.exports = router;