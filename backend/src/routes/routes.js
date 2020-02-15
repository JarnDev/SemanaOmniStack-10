const devRoutes = require('./developer-route')
module.exports = (app) => {
    app.use('/dev', devRoutes)
}