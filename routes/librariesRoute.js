const express = require("express");

const {
  getAllLibraries,
  getLibraryById,
  addLibrary,
  updateLibrary,
  deleteLibrary,
} = require("../controllers/librariesController");

const { auth } = require("../middlewares/auth");

module.exports = express
  .Router()
  .get("/", auth, async (req, res) => {
    await getAllLibraries(req, res);
  })
  .get("/:id", auth, async (req, res) => await getLibraryById(req, res))
  .post("/", auth, async (req, res) => {
    await addLibrary(req, res);
  })
  .put("/:id", auth, async (req, res) => {
    await updateLibrary(req, res);
  })
  .delete("/:id", auth, async (req, res) => {
    await deleteLibrary(req, res);
  });
