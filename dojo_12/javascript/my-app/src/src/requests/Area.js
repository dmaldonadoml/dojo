function AreaRequest(area) {
    this.area = area;
}
AreaRequest.prototype.fits = function(classroom) {
    return classroom.fitsArea(this.area);
};
module.exports = AreaRequest;