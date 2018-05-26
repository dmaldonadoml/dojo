function SearchView(listView) {
    this.listView = listView;
}

SearchView.prototype.search = function(req) {
    this.listView = this.listView.search(req);
    return this.listView;
};
SearchView.prototype.pickFirst = function() {
    return this.listView.pickFirst();
};
SearchView.prototype.render = function() {
    return this.listView.render();
};
SearchView.prototype.iterate = function(cb) {
    return this.listView.iterate(cb);
};

module.exports = SearchView;