module.exports = {
    getHomePage:  (req, res) => {
        let query = "SELECT * FROM players ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, async (err, result) => {
            if (err) {
                res.redirect('/');
            }
           await res.render("index.ejs", {
                title: "Welcome  Socka | View Players",
                players: result,
                
            });
        });
    },
};