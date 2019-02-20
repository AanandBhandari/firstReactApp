const path = require('path');
module.exports = {
    entry:'./src/app.js',
    output:{
        path:path.join(__dirname,'public'),
        filename : 'bundle.js'
    },
    "mode" : "none",
    module : {
        rules : [{
            loader:'bael-loader',
            test : /\.js$/,
            exclude :/node_modules/
        }]
    }
}