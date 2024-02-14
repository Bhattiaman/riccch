// src/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined

// Route for deleting integration (disconnecting FB account)
router.post('/delete-integration', async (req, res) => {
  const { userId } = req.body;
  
  try {
    // Find the user in the database and update their connected FB account
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update user's connected FB account to null or remove it from the database
    user.facebookAccountId = null; // Assuming 'facebookAccountId' is the field storing FB account ID

    await user.save();

    res.status(200).json({ success: true, message: 'Integration deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
