App.Models.Resources = Backbone.Model.extend({

  initialize: function() {

  },
  search: function(query){
    this.WebSearch = new Bounce.MixedResultsSearch();
    this.WebSearch.group = 'bounce-internet-and-blogs';
    this.WebSearch.keywords = query;
    this.WebSearch.exclude = 'ajax';
    this.WebSearch.numPerPage = 10;
    this.WebSearch.pageNum = 1;
    this.trigger('gotResults');

  },
  getResults: function(feedObject){
    App.mainView.showResults(feedObject);
  }
});
