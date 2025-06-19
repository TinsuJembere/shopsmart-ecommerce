const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/user'); 
const router = express.Router();
const protect = require('../middlewares/authMiddleware')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

router.post('/upload-avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    const userId = req.user.id; 
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const avatarUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(userId, { avatar: avatarUrl }, { new: true });

    res.json({
      message: 'Profile picture updated successfully',
      avatar: avatarUrl,
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading avatar' });
  }
});

module.exports = router;
