const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

/**
 * @swagger
 * tags:
 *   name: UserProfiles
 *   description: User Profile management
 */

/**
 * @swagger
 * /api/user-profiles:
 *   post:
 *     summary: Create a new user profile
 *     tags: [UserProfiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       201:
 *         description: The user profile was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Bad request
 */
router.post('/', userProfileController.createUserProfile);

/**
 * @swagger
 * /api/user-profiles:
 *   get:
 *     summary: Get all user profiles
 *     tags: [UserProfiles]
 *     responses:
 *       200:
 *         description: A list of user profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserProfile'
 */
router.get('/', userProfileController.getAllUserProfiles);

/**
 * @swagger
 * /api/user-profiles/{id}:
 *   get:
 *     summary: Get a user profile by ID
 *     tags: [UserProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user profile ID
 *     responses:
 *       200:
 *         description: The user profile description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: The user profile was not found
 */
router.get('/:id', userProfileController.getUserProfileById);

/**
 * @swagger
 * /api/user-profiles/{id}:
 *   put:
 *     summary: Update a user profile by ID
 *     tags: [UserProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200:
 *         description: The user profile was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: The user profile was not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', userProfileController.updateUserProfile);

/**
 * @swagger
 * /api/user-profiles/{id}:
 *   delete:
 *     summary: Delete a user profile by ID
 *     tags: [UserProfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user profile ID
 *     responses:
 *       200:
 *         description: The user profile was successfully deleted
 *       404:
 *         description: The user profile was not found
 */
router.delete('/:id', userProfileController.deleteUserProfile);

module.exports = router;