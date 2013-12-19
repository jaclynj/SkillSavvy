App.Views.Main = Backbone.View.extend({
  el: "#search",
  events: {
    "submit #submit-form" : "submitSearch"
  },
  initialize: function(){
    this.search = new App.Models.Search();
    this.listenTo(this.search, 'gotResults', this.showResults);
  },
  submitSearch: function(e){
    e.preventDefault();
    this.query = $('#search-field').val();
    this.search.searchWeb(this.query);
  },
  showResults: function() {
    this.results = new App.Views.Results({ el:"#results", attributes:{query: this.query} });
    App.main.resources = new App.Collections.Resources({model: App.Models.Resource});
    App.main.ratings = new App.Collections.Ratings({model: App.Models.Rating});
    App.main.updateResources();
  },
  updateResources: function() {
    $('#web-results').fadeOut( 100, function() {
      $('#throbber').removeClass('hidden');
    });

    console.log(App.main.resources);
    App.main.resources.fetch({
      success: function() {
        console.log(App.main.resources);
        App.main.updateRatings();
      }
    });
  },
  updateRatings: function(){
    console.log(App.main.ratings);
    App.main.ratings.fetch({
      success: function() {
        console.log(App.main.ratings);
        App.main.search.webSearch.get(App.main.displayResults);
      }
    });
  },
  displayRating: function(div){
    //this is called in displayResults
    div.html('');
    ratingDiv = div;
    var theseRatings = App.main.ratingInfo;
    var len = theseRatings.length;
    var overall = 0;
    var newbRating = 0;
    var novRating = 0;
    var advRating = 0;
    var expRating = 0;

    _.each(theseRatings, function(rating) {
      var attr = rating.attributes;
      overall += attr.overall_rating;
    });

    var newbieRatings = _.filter(theseRatings, function(r){
      return r.attributes.newbie_rating > 0;
    });

    var noviceRatings = _.filter(theseRatings, function(r){
      return r.attributes.novice_rating > 0;
    });

    var advancedRatings = _.filter(theseRatings, function(r){
      return r.attributes.adv_rating > 0;
    });
    var expertRatings = _.filter(theseRatings, function(r){
      return r.attributes.expert_rating > 0;
    });
    _.each(newbieRatings, function(rating){
      newbRating += rating.attributes.newbie_rating;
    });
    _.each(noviceRatings, function(rating){
      novRating += rating.attributes.novice_rating;
    });
    _.each(advancedRatings, function(rating){
      advRating += rating.attributes.adv_rating;
    });
    _.each(expertRatings, function(rating){
      expRating += rating.attributes.expert_rating;
    });

      overall = (overall / len).toFixed(1);
      newbRating = (newbRating / newbieRatings.length).toFixed(1);
      novRating = (novRating / noviceRatings.length).toFixed(1);
      advRating = (advRating / advancedRatings.length).toFixed(1);
      expRating = (expRating / expertRatings.length).toFixed(1);


      ratingDiv.append('<h4>Ratings from other learners</h4>');
      var ul = $('<ul>');

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
      //returns the div as a jquery object
      return ratingDiv;
  },
  displayRateThisLink: function() {
    var rateLink = $('<a>',{
      text: "Rate This",
      href: '/ratings/new'
    });

    var logInLink = $('<a>',{
      text: "Log In to Rate This",
      href: '/login'
    });

    rateLink.addClass('rate-this');

    if (  $("#user-box:contains('Login')").length > 0  ) {
      return logInLink;
    } else {
      return rateLink;
    }
  },
  displayResults: function(feedObject) {
    //this is the setup

    console.log('displaying results');
    $('#throbber').addClass('hidden');
    var resultsArea = $('#results');
    var webResultsOnPage = $('#web-results');
    var webResults = $("<div>");
    webResultsOnPage.html(webResults);
    webResultsOnPage.prepend("<h3>Results</h3>");
    webResults.attr("id", "these-web-results");

    for (var i=0; i < feedObject.entries.length; i++) {
      var thisResource = feedObject.entries[i];
      if (thisResource.link) {
        //refactor, turn this into a handlebars template
        var thisResultDiv = $("<div>");
        thisResultDiv.addClass('results-div row');
        var div = $("<div>");

        div.addClass("search-results col-md-8");
        App.main.resourceLink = $('<a>',{
            text: thisResource.title,
            href: thisResource.link,
            target: "_blank"
          });
          div.append(App.main.resourceLink);
        div.append("<br>" + thisResource.content);

        thisResultDiv.append(div);

        var existingResource = App.main.resources.findWhere({url: thisResource.link});
        var ratingDiv = $('<div>');
        ratingDiv.addClass('rating-div col-md-4');

        if (existingResource && existingResource != []) {

          App.main.ratingInfo = App.main.ratings.where({resource_id: existingResource.id});
          ratingDiv.attr("id", "rating-" + existingResource.id);
          var updatedRatingDiv = App.main.displayRating(ratingDiv);
          thisResultDiv.append(updatedRatingDiv);
        } else {
          thisResultDiv.append(ratingDiv);
        }
        var rateThisLink = App.main.displayRateThisLink();
          div.append(rateThisLink);
        webResults.append(thisResultDiv);
      }
    }
    webResultsOnPage.append(webResults);
    $('#web-results').fadeIn( 300);
  }
});

