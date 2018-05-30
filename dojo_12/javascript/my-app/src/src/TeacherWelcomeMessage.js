function TeacherWelcomeMessage() {}

TeacherWelcomeMessage.prototype.render = function(teacher) {
    return `Welcome to the Unified Center, ${teacher.getName()}.`
};

module.exports = TeacherWelcomeMessage;