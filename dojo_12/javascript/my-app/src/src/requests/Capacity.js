function CapacityRequest(capacity) {
    this.capacity = capacity;
}
CapacityRequest.prototype.fits = function(classroom) {
    return classroom.fitsCapacity(this.capacity);
};
module.exports = CapacityRequest;