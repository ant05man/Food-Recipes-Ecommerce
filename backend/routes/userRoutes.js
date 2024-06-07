// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController'); // Correct import

// Define your routes here
router.get('/', getAllUsers); // Ensure this function is defined and correctly imported
router.get('/:id', getUserById); // Ensure this function is defined and correctly imported
router.post('/', createUser); // Ensure this function is defined and correctly imported
router.patch('/:id', updateUser); // Ensure this function is defined and correctly imported
router.delete('/:id', deleteUser); // Ensure this function is defined and correctly imported

module.exports = router;
