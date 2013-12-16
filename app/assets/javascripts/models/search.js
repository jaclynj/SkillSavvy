App.Models.Search = Backbone.Model.extend({

  initialize: function() {

  },
  searchWeb: function(query){
    this.webSearch = new Bounce.MixedResultsSearch();
    this.webSearch.group = 'bounce-internet-and-blogs';
    this.webSearch.keywords = query + " learn";
    this.webSearch.exclude = 'ajax';
    this.webSearch.numPerPage = 10;
    this.webSearch.pageNum = 1;
    this.trigger('gotResults');
  },
});
