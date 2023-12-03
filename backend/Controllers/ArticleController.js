const Article = require('../Models/ArticleModel')
const mongoose = require('mongoose')

// Get all products
const getArticles = async (req, res) => {
    const articles = await Article.find({}).sort({createdAt: -1})
    res.status(200).json(articles)
}

// Get Single Article
const getArticleById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid article ID' });
    }

    try {
        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get Top Products
const getLatest = async (req, res) => {
    try {
        const latestNews = await Article.find({}).sort({ createdAt: -1 }).limit(1)
        res.json(latestNews);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Create Product
const createArticle = async (req, res) => {
    const { title, post_img, description } = req.body
    try{
        const articles = await Article.create({ title, post_img, description })
        res.status(200).json(articles)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// Update Product
const updateArticle = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No articles found'})
    }

    const articles = await Article.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!articles){
        return res.status(404).json({error: 'No articles found'})
    }
    res.status(200).json(articles)
}

// Delete Product
const deleteArticle = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No articles found'})
    }

    const articles = await Article.findOneAndDelete({_id: id})

    if(!articles){
        return res.status(404).json({error: 'No articles found'})
    }
    res.status(200).json(articles)
}

module.exports = { getArticles, getArticleById, getLatest, deleteArticle, updateArticle, createArticle }