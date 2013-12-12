App.Views.Main = Backbone.View.extend({
  el: "#search",
  events: {
    "click button" : "submitSearch"
  },
  initialize: function(){
    console.log('hi from the view');
  },
  submitSearch: function(e){
    e.preventDefault();
    var query = $('#search-field').val();
    console.log(query);
    App.apiSearch = new Bounce.MixedResultsSearch();
    App.apiSearch.group = 'bounce-internet-and-blogs';
    App.apiSearch.keywords = query;
    App.apiSearch.exclude = 'ajax';
    App.apiSearch.numPerPage = 10;
    App.apiSearch.pageNum = 1;
    var results = App.apiSearch.get(this.showResults);
  },
  showResults: function(feedObject) {
   var resultsArea = $('#results');
   resultsArea.html(feedObject.title);
   for (var i=0; i < feedObject.entries.length; i++) {
      resultsArea.append(feedObject.entries[i].title + "\n");
   }
}
});
