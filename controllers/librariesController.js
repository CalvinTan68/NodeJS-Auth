const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getAllLibraries: async (req, res) => {
    try {
      const query = await prisma.library.findMany();
      res.status(200).json(query);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getLibraryById: async (req, res) => {
    try {
      const query = await prisma.library.findUnique({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(query);
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  },
  addLibrary: async (req, res) => {
    const { body } = req.body;
    try {
      const query = await prisma.library.create({
        data: {
          body,
        },
      });
      res.status(201).json(query);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateLibrary: async (req, res) => {
    const { body } = req.body;
    try {
      const query = await prisma.library.update({
        where: {
          id: req.params.id,
        },
        data: {
          body,
        },
      });
      res.status(200).json(query);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteLibrary: async (req, res) => {
    try {
      const query = await prisma.library.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(query);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
};
