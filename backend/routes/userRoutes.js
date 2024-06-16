const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const { protect } = require('../middleware/authMiddleware');

// POST /api/users/register - Register user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ username, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/users/login - Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/users/:userId/recipes - Add recipe to user's profile
router.post('/:userId/recipes', protect, async (req, res) => {
    const { userId } = req.params;
    const { recipeId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        if (user.recipes.includes(recipeId)) {
            return res.status(400).json({ message: 'Recipe already selected' });
        }

        user.recipes.push(recipeId);
        await user.save();

        res.status(201).json({ message: 'Recipe added to profile' });
    } catch (error) {
        console.error('Error adding recipe to profile:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/users/:userId/recipes - Get user's selected recipes
router.get('/:userId/recipes', protect, async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('recipes');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.recipes);
    } catch (error) {
        console.error('Error fetching user recipes:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
