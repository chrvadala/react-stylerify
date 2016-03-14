module.exports = function (config) {
    return {
        "mystyle": {
            "color": "darkgreen",
            "fontSize": function () {
                var a = this.number;
                return a * 2;
            }.bind(config)(),
            "cursor": "pointer",
            ":hover": {
                "color": "blue",
                "textDecoration": "underline"
            }
        },
        "anotherstyle": {
            "fontSize": "20px"
        }
    }
};
