App.Views.Main = Backbone.View.extend({
  el: "#search",
  events: {
    "click button" : "submitSearch"
  },
  initialize: function(){
    this.search = new App.Models.Search();
    this.listenTo(this.search, 'gotResults', this.showResults);
  },
  submitSearch: function(e){
    e.preventDefault();
    $('#results').html($('#throbber'));
    $('#throbber').toggle();
    this.query = $('#search-field').val();
    this.search.searchWeb(this.query);
  },
  showResults: function() {
    this.results = new App.Views.Results({ el:"#results", attributes:{query: this.query} });
    App.main.resources = new App.Collections.Resources({model: App.Models.Resource});
    App.main.ratings = new App.Collections.Ratings({model: App.Models.Rating});
    App.main.resources.fetch({
      success: function() {
        App.main.updateRatings();
      }
    });
  },
  updateRatings: function(){
    App.main.ratings.fetch({
      success: function() {
        App.main.search.webSearch.get(App.main.displayResults);
      }
    });
  },
  displayRating: function(){
    var thisRating = App.main.ratingInfo;
    var overall = 0;
    _.each(thisRating, function(rating) {
      overall = overall + rating.attributes.overall_rating;
    } );
    overall = (overall / thisRating.length).toFixed(1);
    return $('<div>' + "average overall rating: " + overall + '</div>');
  },
  displayResults: function(feedObject) {
    //refactor, turn this into a handlebars template
    $('#throbber').toggle();
    var resultsArea = $('#results');
    var webResults = $("<div>");
    webResults.append("<h3>Search</h3>");
    webResults.attr("id", "web-results");

    for (var i=0; i < feedObject.entries.length; i++) {
      var thisResource = feedObject.entries[i];
      if (thisResource.link) {
        var div = $("<div>");
        var existingResource = App.main.resources.findWhere({url: thisResource.link});
        if (existingResource && existingResource != []) {
          App.main.ratingInfo = App.main.ratings.where({resource_id: existingResource.id});
          var ratingDiv = App.main.displayRating();
          div.append(ratingDiv);
        }
        div.addClass("search-results");
        App.main.resourceLink = $('<a>',{
            text: thisResource.title,
            href: thisResource.link,
            target: "_blank"
          });
          div.append(App.main.resourceLink);
        div.append("<br>" + thisResource.content + "<br>");
        //HERE check if exisingResource.user_id == the current user id
        // if so, instead of rateLink or Login link, say you already rated this
        var rateLink = $('<a>',{
          text: "Rate This",
          href: '/ratings/new'
        });
        rateLink.addClass('rate-this');
        var logInLink = $('<a>',{
          text: "Log In to Rate This",
          href: '/login'
        });
        if (  $("#user-box:contains('Login')").length > 0  ) {
          div.append(logInLink);
        } else {
          div.append(rateLink);
        }
        webResults.append(div);
      }
    }
    resultsArea.append(webResults);
  }
});

