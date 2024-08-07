const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load Resource model
const Resource = require("../models/Resource");

// @route   POST api/resources
// @desc    Create a resource
router.post("/", async (req, res) => {
  const {
    title,
    type,
    categories,
    uploader,
    comments,
    isArchived,
    isFavorite,
  } = req.body;

  const newResource = new Resource({
    title,
    type,
    categories,
    uploader,
    comments,
    isArchived,
    isFavorite,
  });

  try {
    const resource = await newResource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get all favourite resources
router.get("/favourites", async (req, res) => {
  try {
    const favourites = await Resource.find({ isFavorite: true });
    res.json(favourites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/resources
// @desc    Get all resources
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET api/resources/:id
// @desc    Get a resource by id
router.get("/:id", getResource, (req, res) => {
  res.json(res.resource);
});

//Create a comment for a resource
router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { content, commenter } = req.body;

  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).send({ error: "Resource not found" });
    }

    const newComment = { content, commenter };
    resource.comments.push(newComment);

    await resource.save();

    res.status(200).send(resource);
  } catch (err) {
    console.error(err); // Log the error to the console
    res
      .status(500)
      .send({ error: "Error adding comment", message: err.message });
  }
});

// @route   PUT api/resources/:id
// @desc    Update a resource
router.put("/:id", getResource, async (req, res) => {
  const {
    title,
    type,
    categories,
    uploader,
    comments,
    isArchived,
    isFavorite,
  } = req.body;

  if (title != null) {
    res.resource.title = title;
  }
  if (type != null) {
    res.resource.type = type;
  }
  if (categories != null) {
    res.resource.categories = categories;
  }
  if (uploader != null) {
    res.resource.uploader = uploader;
  }
  if (comments != null) {
    res.resource.comments = comments;
  }
  if (isArchived != null) {
    res.resource.isArchived = isArchived;
  }
  if (isFavorite != null) {
    res.resource.isFavorite = isFavorite;
  }

  try {
    const updatedResource = await res.resource.save();
    res.json(updatedResource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   DELETE api/resources/:id
// @desc    Delete a resource
router.delete("/:id", getResource, async (req, res) => {
  try {
    await res.resource.deleteOne();
    res.json({ message: "Deleted Resource" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware function for getting resource by ID
async function getResource(req, res, next) {
  let resource;
  try {
    resource = await Resource.findById(req.params.id);
    if (resource == null) {
      return res.status(404).json({ message: "Cannot find resource" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  res.resource = resource;
  next();
}

// @route   GET api/resources/most-commented
// @desc    Get resources sorted by the number of comments
router.get("/most-commented", async (req, res) => {
  try {
    const resources = await Resource.find().sort({ "comments.length": -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET api/resources/most-visited
// @desc    Get resources sorted by the number of visits
router.get("/most-visited", async (req, res) => {
  // Assuming you have a 'visits' field in your Resource model
  try {
    const resources = await Resource.find().sort({ visits: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
