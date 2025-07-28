const express = require('express');
const router = express.Router();
const ownerProfileController = require('../controllers/ownerProfileController');

/**
 * @swagger
 * tags:
 *   name: OwnerProfiles
 *   description: Owner Profile management
 */

/**
 * @swagger
 * /api/owner-profiles:
 *   post:
 *     summary: Create a new owner profile
 *     tags: [OwnerProfiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OwnerProfile'
 *     responses:
 *       201:
 *         description: The owner profile was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OwnerProfile'
 *       400:
 *         description: Bad request
 */
router.post('/', ownerProfileController.createOwnerProfile);

/**
 * @swagger
 * /api/owner-profiles:
 *   get:
 *     summary: Get all owner profiles
 *     tags: [OwnerProfiles]
 *     responses:
 *       200:
 *         description: A list of owner profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OwnerProfile'
 */
router.get('/', ownerProfileController.getAllOwnerProfiles);

/**
 * @swagger
 * /api/owner-profiles/{id}:
 *   get:
 *     summary: Get an owner profile by ID
 *     tags: [OwnerProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The owner profile ID
 *     responses:
 *       200:
 *         description: The owner profile description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OwnerProfile'
 *       404:
 *         description: The owner profile was not found
 */
router.get('/:id', ownerProfileController.getOwnerProfileById);

/**
 * @swagger
 * /api/owner-profiles/{id}:
 *   put:
 *     summary: Update an owner profile by ID
 *     tags: [OwnerProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The owner profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OwnerProfile'
 *     responses:
 *       200:
 *         description: The owner profile was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OwnerProfile'
 *       404:
 *         description: The owner profile was not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', ownerProfileController.updateOwnerProfile);

/**
 * @swagger
 * /api/owner-profiles/{id}:
 *   delete:
 *     summary: Delete an owner profile by ID
 *     tags: [OwnerProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The owner profile ID
 *     responses:
 *       200:
 *         description: The owner profile was successfully deleted
 *       404:
 *         description: The owner profile was not found
 */
router.delete('/:id', ownerProfileController.deleteOwnerProfile);

module.exports = router;