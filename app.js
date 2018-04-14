const experss = require('express'),
    app = experss(),
    PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => console.log(`SERVER is listening to port ${PORT}`));