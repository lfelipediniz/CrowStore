const Category = require("../models/Category");

class CategoryController {
  static async addCategory(req, res) {
    try {
      const { name } = req.body;

      // Verificar se a categoria já existe
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ error: "Categoria já existe" });
      }

      // Criar uma nova categoria
      const category = new Category({ name });
      await category.save();

      res.status(201).json({ message: "Categoria adicionada com sucesso" });
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async getAllCategories(req, res) {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      console.error("Erro ao obter categorias:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { categoryName } = req.params;

      // Verificar se a categoria existe
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }

      // Excluir a categoria
      await category.remove();

      res.json({ message: "Categoria excluída com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

module.exports = CategoryController;
