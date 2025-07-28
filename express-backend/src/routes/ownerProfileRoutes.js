const express = require('express');
const router = express.Router();
const ownerProfileController = require('../controllers/ownerProfileController');

router.post('/', ownerProfileController.createOwnerProfile);
router.get('/', ownerProfileController.getAllOwnerProfiles);
router.get('/:id', ownerProfileController.getOwnerProfileById);
router.put('/:id', ownerProfileController.updateOwnerProfile);
router.delete('/:id', ownerProfileController.deleteOwnerProfile);

module.exports = router;