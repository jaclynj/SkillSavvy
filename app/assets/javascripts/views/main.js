//SEARCH VIEW - Submits search query
//NOTE: If you're having problems, RUN  bundle exec rake assets:precompile

App.Views.Main = Backbone.View.extend({
  el: "#search",
  events: {
    "submit #submit-form" : "setQuery",
  },

  initialize: function(){
    this.resources = new App.Collections.Resources({model: App.Models.Resource});
    this.ratings = new App.Collections.Ratings({model: App.Models.Rating});
    this.search = new App.Models.Search();
    this.listenTo(this.search, 'gotResults', this.createResultView);
    this.userId = $('form #user-id').val();
    this.userId = parseInt(this.userId);
  },

  setQuery: function(e){
    $('#successful-rating').fadeOut(100);
    e.preventDefault();
    this.query = $('#search-field').val();
    this.submitSearch(1);
  },

  submitSearch: function(num){
    if (this.query != "") {
      this.trigger('turn it off');
      this.search.searchWeb(this.query, num);
    }
  },

  submitSortedSearch: function(e){
    $('#successful-rating').fadeOut(100);
    if (e) {
      e.preventDefault();
    }
    this.query = $('#search-field').val();
    if (this.query != "") {
      this.trigger('turn it off');
      $('#web-results').fadeOut( 100, function() {
        $('#throbber').removeClass('hidden');
        App.main.search.webSearch.get(App.main.results.displayResults);
    });
    }
  },

  createResultView: function() {
    this.results = new App.Views.Results({
      el:"#results",
      attributes:{
        query: this.query,
        pageNumber: 1
      }
    });
    App.main.updateResources();
  },

  updateResources: function() {
    $('#web-results').fadeOut( 100, function() {
      $('#throbber').removeClass('hidden');
    });
    App.main.resources.fetch({
      success: function() {
        App.main.updateRatings();
      }
    });
  },

  updateRatings: function(){
    App.main.ratings.fetch({
      success: function() {
        App.main.search.webSearch.get(App.main.results.displayResults);
      }
    });
  },

});

