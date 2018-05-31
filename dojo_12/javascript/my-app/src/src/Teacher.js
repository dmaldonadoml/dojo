const Booking = require('../src/Booking');

function Teacher(name) {
    this.name = name;
}

Teacher.prototype.getName = function() {
    return this.name;
};

//I hate this...
Teacher.prototype.book = function(room) {
    //I hate this more...
    return new Booking(room, this).save();
};

module.exports = Teacher;