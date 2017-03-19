let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

let userSchema   = new Schema({
    name: String,
    age:Number
});

let movieSchema = new Schema({
  title: String,
  releaseYear: String,
  director: String,
  genre: String,
  play:Number
});

module.exports = mongoose.model('User', userSchema);
module.exports=mongoose.model("Movie",movieSchema);
