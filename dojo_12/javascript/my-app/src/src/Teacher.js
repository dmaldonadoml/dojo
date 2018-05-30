function Teacher(name) {
    this.name = name;
}

Teacher.prototype.getName = function() {
    return this.name;
};

module.exports = Teacher;