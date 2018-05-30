function ComputersRequest(computers) {
    this.computers = computers;
}
ComputersRequest.prototype.fits = function(classroom) {
    return classroom.fitsComputers(this.computers)
};

module.exports = ComputersRequest;