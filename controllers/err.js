exports.err = (req, res, next) => {
    res.status(404).render('404', { title: `404 Page`, path: req.url, isAuthenticated: req.session.isLoggedIn })
}
