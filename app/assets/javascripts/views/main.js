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
    var len = thisRating.length
    var overall = 0;
    var newbRating = 0;
    var novRating = 0;
    var advRating = 0;
    var expRating = 0;
    _.each(thisRating, function(rating) {
      attr = rating.attributes;
      overall += attr.overall_rating;
      if (attr.newbie_rating >= 1) {
        newbRating += attr.newbie_rating;
      }
      if (attr.novice_rating >= 1) {
        novRating += attr.novice_rating;
      }
      if (attr.adv_rating >= 1) {
        advRating += attr.adv_rating;
      }
      if (attr.expert_rating >= 1) {
        expRating += attr.expert_rating;
      }
    } );
    overall = (overall / len).toFixed(1);
    newbRating = (newbRating / len).toFixed(1);
    novRating = (novRating / len).toFixed(1);
    advRating = (advRating / len).toFixed(1);
    expRating = (advRating / len).toFixed(1);

    ratingDiv = $('<div>');
    ratingDiv.append('<h4>Ratings from other learners</h4>');
    ul = $('<ul>');
    ul.append('<li>'+ "overall rating: " + overall +'</li>');
    if (newbRating >= 1) {
      ul.append('<li>'+ "newbie rating: " + newbRating +'</li>');
    }
    if (novRating >= 1) {
      ul.append('<li>'+ "novice rating: " + novRating +'</li>');
    }
    if (advRating >= 1) {
      ul.append('<li>'+ "advanced rating: " + advRating +'</li>');
    }
    if (expRating >= 1) {
      ul.append('<li>'+ "expert rating: " + expRating +'</li>');
    }
    ratingDiv.append(ul);
    ratingDiv.addClass('ratingDiv col-md-4');

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
      ratingDiv.append(logInLink);
    } else {
      ratingDiv.append(rateLink);
    }
    return ratingDiv;
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
        var thisResultDiv = $("<div>");
        thisResultDiv.addClass('results-div');
        var div = $("<div>");
        var existingResource = App.main.resources.findWhere({url: thisResource.link});
        if (existingResource && existingResource != []) {
          App.main.ratingInfo = App.main.ratings.where({resource_id: existingResource.id});
          var ratingDiv = App.main.displayRating();
          thisResultDiv.append(ratingDiv);
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
        thisResultDiv.append(div);
        webResults.append(thisResultDiv);
      }
    }
    resultsArea.append(webResults);
  }
});

