const Label = require('./Label');

function Booking(room, teacher) {
    this.room = room;
}

Booking.prototype.save = function() {
    return this;
};

Booking.prototype.getLabel = function() {
    return new Label(this.room.getName());
};

module.exports = Booking;