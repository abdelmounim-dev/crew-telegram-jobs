const express = require('express');
const router = express.Router();
const crewProfileController = require('../controllers/crewProfileController');

/**
 * @swagger
 * tags:
 *   name: CrewProfiles
 *   description: Crew Profile management
 */

/**
 * @swagger
 * /api/crew-profiles:
 *   post:
 *     summary: Create a new crew profile
 *     tags: [CrewProfiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrewProfile'
 *     responses:
 *       201:
 *         description: The crew profile was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CrewProfile'
 *       400:
 *         description: Bad request
 */
router.post('/', crewProfileController.createCrewProfile);

/**
 * @swagger
 * /api/crew-profiles:
 *   get:
 *     summary: Get all crew profiles
 *     tags: [CrewProfiles]
 *     responses:
 *       200:
 *         description: A list of crew profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CrewProfile'
 */
router.get('/', crewProfileController.getAllCrewProfiles);

/**
 * @swagger
 * /api/crew-profiles/{id}:
 *   get:
 *     summary: Get a crew profile by ID
 *     tags: [CrewProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The crew profile ID
 *     responses:
 *       200:
 *         description: The crew profile description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CrewProfile'
 *       404:
 *         description: The crew profile was not found
 */
router.get('/:id', crewProfileController.getCrewProfileById);

/**
 * @swagger
 * /api/crew-profiles/{id}:
 *   put:
 *     summary: Update a crew profile by ID
 *     tags: [CrewProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The crew profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrewProfile'
 *     responses:
 *       200:
 *         description: The crew profile was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CrewProfile'
 *       404:
 *         description: The crew profile was not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', crewProfileController.updateCrewProfile);

/**
 * @swagger
 * /api/crew-profiles/{id}:
 *   delete:
 *     summary: Delete a crew profile by ID
 *     tags: [CrewProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The crew profile ID
 *     responses:
 *       200:
 *         description: The crew profile was successfully deleted
 *       404:
 *         description: The crew profile was not found
 */
router.delete('/:id', crewProfileController.deleteCrewProfile);

module.exports = router;