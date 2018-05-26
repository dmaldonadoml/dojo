function CapacityRequest(capacity) {
    this.capacity = capacity;
}
CapacityRequest.prototype.fits = function(classroom) {
    return classroom.fitsCapacity(this.capacity);
};
CapacityRequest.prototype.value = function() {
    return this.capacity
};
module.exports = CapacityRequest;