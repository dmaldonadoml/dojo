function AreaRequest(area) {
    this.area = area;
}
AreaRequest.prototype.fits = function(classroom) {
    return classroom.fitsArea(this.area);
};
AreaRequest.prototype.value = function() {
    return this.area
};
module.exports = AreaRequest;