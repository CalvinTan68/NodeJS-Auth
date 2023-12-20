const express = require("express");

const {
  getAllLibraries,
  getLibraryById,
  addLibrary,
  updateLibrary,
  deleteLibrary,
} = require("../controllers/librariesController");

module.exports = express
  .Router()
  .get("/", async (req, res) => {
    await getAllLibraries(req, res);
  })
  .get("/:id", async (req, res) => await getLibraryById(req, res))
  .post("/", async (req, res) => {
    await addLibrary(req, res);
  })
  .put("/:id", async (req, res) => {
    await updateLibrary(req, res);
  })
  .delete("/:id", async (req, res) => {
    await deleteLibrary(req, res);
  });
