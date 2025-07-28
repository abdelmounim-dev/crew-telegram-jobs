const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

router.post('/', userProfileController.createUserProfile);
router.get('/', userProfileController.getAllUserProfiles);
router.get('/:id', userProfileController.getUserProfileById);
router.put('/:id', userProfileController.updateUserProfile);
router.delete('/:id', userProfileController.deleteUserProfile);

module.exports = router;