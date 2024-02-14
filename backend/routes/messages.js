// src/routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Assuming you have a Message model defined

// Route for replying to messages
router.post('/reply', async (req, res) => {
  const { userId, messageId, reply } = req.body;
  
  try {
    // Find the message in the database
    let message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    // Check if the user has permission to reply to the message
    if (message.recipientId !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized to reply to this message' });
    }

    // Update the message with the reply
    message.reply = reply;

    await message.save();

    res.status(200).json({ success: true, message: 'Reply sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
