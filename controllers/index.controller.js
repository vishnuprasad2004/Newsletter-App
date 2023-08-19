
const getHomePage = (req, res) => {
    res.render('index.ejs', { message:'' });
}

module.exports = { getHomePage };