module.exports = app => {

    // Base URLS
    app.use('/api/recipes', require('./recipes.routes.js'))
    app.use('/api/auth', require('./auth.routes.js'))
    app.use('/api/comments', require('./comments.routes.js'))
    app.use('/api/files', require('./files.routes.js'))
    app.use('/api/ratings', require('./ratings.routes.js'))

}