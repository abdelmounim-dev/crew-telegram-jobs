const express = require('express');
const router = express.Router();
const crewProfileController = require('../controllers/crewProfileController');

router.post('/', crewProfileController.createCrewProfile);
router.get('/', crewProfileController.getAllCrewProfiles);
router.get('/:id', crewProfileController.getCrewProfileById);
router.put('/:id', crewProfileController.updateCrewProfile);
router.delete('/:id', crewProfileController.deleteCrewProfile);

module.exports = router;