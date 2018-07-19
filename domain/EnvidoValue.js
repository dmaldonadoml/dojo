class EnvidoValue {
    constructor(value) { this.value = value }
    equals(otherEnvidoValue) {
        return this.value === otherEnvidoValue.value
    }
}
module.exports = EnvidoValue;