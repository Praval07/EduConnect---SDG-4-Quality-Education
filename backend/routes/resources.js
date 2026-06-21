const express = require('express');
const router = express.Router();
const { getResources, createResource, updateResource, deleteResource, downloadResource } = require('../controllers/resourceController');
const { protect } = require('../middleware/auth');

router.get('/', getResources);
router.post('/', protect, createResource);
router.put('/:id', protect, updateResource);
router.delete('/:id', protect, deleteResource);
router.post('/:id/download', downloadResource);

module.exports = router;
