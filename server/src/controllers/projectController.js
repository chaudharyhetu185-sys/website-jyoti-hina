const Project = require('../models/Project');
const { getIsConnected } = require('../config/db');
const { projects: fallbackProjects } = require('../data/seedData');

// In-memory array store for created items when DB is offline
let localProjects = [...fallbackProjects];

// @desc    Get all projects (with optional category filter)
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res) => {
  try {
    const { category } = req.query;
    
    if (getIsConnected()) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      const projects = await Project.find(query).sort({ createdAt: -1 });
      if (projects && projects.length > 0) {
        return res.status(200).json({ success: true, count: projects.length, data: projects });
      }
    }

    // Fallback response
    let filtered = localProjects;
    if (category && category !== 'All') {
      filtered = localProjects.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered,
      source: 'fallback'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving projects',
      error: error.message,
      data: fallbackProjects
    });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (getIsConnected()) {
      const project = await Project.findById(id);
      if (project) {
        return res.status(200).json({ success: true, data: project });
      }
    }

    const project = localProjects.find(p => p._id === id || p.id === id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving project', error: error.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public (or Admin ready)
exports.createProject = async (req, res) => {
  try {
    const { title, description, detailedDescription, image, technologies, category, liveUrl, githubUrl, featured } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ success: false, message: 'Please provide title, description and image URL' });
    }

    const projectData = {
      title,
      description,
      detailedDescription: detailedDescription || description,
      image,
      technologies: Array.isArray(technologies) ? technologies : (technologies ? technologies.split(',').map(t => t.trim()) : ['React', 'Node.js']),
      category: category || 'Websites',
      liveUrl: liveUrl || '#',
      githubUrl: githubUrl || '#',
      featured: Boolean(featured)
    };

    if (getIsConnected()) {
      const newProject = await Project.create(projectData);
      return res.status(201).json({ success: true, message: 'Project created successfully', data: newProject });
    }

    const mockNewProject = {
      _id: `proj-${Date.now()}`,
      ...projectData,
      createdAt: new Date().toISOString()
    };
    localProjects.unshift(mockNewProject);

    return res.status(201).json({
      success: true,
      message: 'Project created successfully (In-Memory)',
      data: mockNewProject
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create project', error: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Public (or Admin ready)
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (getIsConnected()) {
      const updated = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (updated) {
        return res.status(200).json({ success: true, message: 'Project updated', data: updated });
      }
    }

    const index = localProjects.findIndex(p => p._id === id);
    if (index !== -1) {
      localProjects[index] = { ...localProjects[index], ...req.body };
      return res.status(200).json({ success: true, message: 'Project updated (In-Memory)', data: localProjects[index] });
    }

    return res.status(404).json({ success: false, message: 'Project not found to update' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating project', error: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Public (or Admin ready)
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const deleted = await Project.findByIdAndDelete(id);
      if (deleted) {
        return res.status(200).json({ success: true, message: 'Project deleted' });
      }
    }

    localProjects = localProjects.filter(p => p._id !== id);
    return res.status(200).json({ success: true, message: 'Project removed (In-Memory)' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error deleting project', error: error.message });
  }
};
