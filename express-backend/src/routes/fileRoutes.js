const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: File management
 */

/**
 * @swagger
 * /api/files:
 *   post:
 *     summary: Create a new file entry
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/File'
 *     responses:
 *       201:
 *         description: The file entry was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/File'
 *       400:
 *         description: Bad request
 */
router.post('/', fileController.createFile);

/**
 * @swagger
 * /api/files:
 *   get:
 *     summary: Get all file entries
 *     tags: [Files]
 *     responses:
 *       200:
 *         description: A list of file entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/File'
 */
router.get('/', fileController.getAllFiles);

/**
 * @swagger
 * /api/files/{id}:
 *   get:
 *     summary: Get a file entry by ID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The file entry ID
 *     responses:
 *       200:
 *         description: The file entry description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/File'
 *       404:
 *         description: The file entry was not found
 */
router.get('/:id', fileController.getFileById);

/**
 * @swagger
 * /api/files/{id}:
 *   put:
 *     summary: Update a file entry by ID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The file entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/File'
 *     responses:
 *       200:
 *         description: The file entry was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/File'
 *       404:
 *         description: The file entry was not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', fileController.updateFile);

/**
 * @swagger
 * /api/files/{id}:
 *   delete:
 *     summary: Delete a file entry by ID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The file entry ID
 *     responses:
 *       200:
 *         description: The file entry was successfully deleted
 *       404:
 *         description: The file entry was not found
 */
router.delete('/:id', fileController.deleteFile);

module.exports = router;