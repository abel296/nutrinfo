module.exports = app => {

    // Base URLS
    app.use('/api/recipes', require('./recipes.routes.js'))
}