const Resource = require('../models/Resource');
const memoryDb = require('../utils/memoryDb');

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
const getResources = async (req, res) => {
  try {
    const { category, search, sort = '-createdAt', page = 1, limit = 12 } = req.query;

    if (!memoryDb.isDbConnected()) {
      let list = [...memoryDb.mockResources];

      if (category && category !== 'All') {
        list = list.filter(r => r.category === category);
      }

      if (search) {
        const s = search.toLowerCase();
        list = list.filter(r => 
          r.title.toLowerCase().includes(s) || 
          r.description.toLowerCase().includes(s) || 
          r.tags.some(t => t.toLowerCase().includes(s))
        );
      }

      // Sort
      if (sort.startsWith('-')) {
        const field = sort.substring(1);
        list.sort((a, b) => b[field] - a[field]);
      } else {
        list.sort((a, b) => a[sort] - b[sort]);
      }

      const total = list.length;
      const paginated = list.slice((page - 1) * limit, page * limit);

      return res.json({
        success: true,
        count: paginated.length,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: Number(page),
        resources: paginated,
      });
    }

    let query = { isPublic: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const total = await Resource.countDocuments(query);
    const resources = await Resource.find(query)
      .populate('uploadedBy', 'name avatar')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json({
      success: true,
      count: resources.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      resources,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create resource
// @route   POST /api/resources
// @access  Private
const createResource = async (req, res) => {
  try {
    const { title, description, category, fileUrl, previewUrl, type, tags } = req.body;

    if (!memoryDb.isDbConnected()) {
      const resource = {
        _id: 'res_' + Date.now(),
        title,
        description,
        category,
        fileUrl,
        previewUrl,
        type,
        tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
        uploadedBy: {
          _id: req.user._id,
          name: req.user.name,
        },
        downloadCount: 0,
        isPublic: true,
        createdAt: new Date(),
      };
      memoryDb.mockResources.push(resource);
      return res.status(201).json({ success: true, resource });
    }

    const resource = await Resource.create({
      title,
      description,
      category,
      fileUrl,
      previewUrl,
      type,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      uploadedBy: req.user._id,
    });

    res.status(201).json({ success: true, resource });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private
const updateResource = async (req, res) => {
  try {
    if (!memoryDb.isDbConnected()) {
      const index = memoryDb.mockResources.findIndex(r => r._id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Resource not found' });
      }
      
      const resource = memoryDb.mockResources[index];
      const updated = {
        ...resource,
        ...req.body,
        tags: req.body.tags ? (Array.isArray(req.body.tags) ? req.body.tags : req.body.tags.split(',').map(t => t.trim())) : resource.tags,
      };
      memoryDb.mockResources[index] = updated;
      return res.json({ success: true, resource: updated });
    }

    let resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    if (resource.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this resource' });
    }

    resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, resource });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private
const deleteResource = async (req, res) => {
  try {
    if (!memoryDb.isDbConnected()) {
      const index = memoryDb.mockResources.findIndex(r => r._id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Resource not found' });
      }
      memoryDb.mockResources.splice(index, 1);
      return res.json({ success: true, message: 'Resource deleted' });
    }

    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    if (resource.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await resource.deleteOne();
    res.json({ success: true, message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Increment download count
// @route   POST /api/resources/:id/download
// @access  Public
const downloadResource = async (req, res) => {
  try {
    if (!memoryDb.isDbConnected()) {
      const resource = memoryDb.mockResources.find(r => r._id === req.params.id);
      if (!resource) {
        return res.status(404).json({ success: false, message: 'Resource not found' });
      }
      resource.downloadCount = (resource.downloadCount || 0) + 1;
      return res.json({ success: true, downloadCount: resource.downloadCount });
    }

    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );
    res.json({ success: true, downloadCount: resource.downloadCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getResources, createResource, updateResource, deleteResource, downloadResource };
