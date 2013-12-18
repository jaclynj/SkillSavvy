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
    // $('#results').html($('#throbber'));
    $('#throbber').removeClass('hidden');
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
      console.log(overall);
      _.each(theseRatings, function(rating) {
        attr = rating.attributes;
        overall += attr.overall_rating;
      });
        //these dont work because its dividing the full length
        // use _.filter or _.where to find the info you need for each list
        // figure out how to make it work since these are in attr and not properties
        // right now the ones below dont show up because they've been rated but
        // they are less than 1, because there are too many other ratings in the array
        var newbieRatings = _.filter(theseRatings, function(r){
            return r.attributes.newbie_rating > 0;
          });

        _.each(newbieRatings, function(rating){
          newbRating += attr.newbie_rating;
        });
        //  THIS DOESNT MAKE ANY GODDAMN SENSE
        // }
        // if (attr.novice_rating >= 1) {
        //   novRating += attr.novice_rating;
        // }
        // if (attr.adv_rating >= 1) {
        //   advRating += attr.adv_rating;
        // }
        // if (attr.expert_rating >= 1) {
        //   expRating += attr.expert_rating;
        // }

      overall = (overall / len).toFixed(1);
      newbRating = (newbRating / newbieRatings.length).toFixed(1);
      // novRating = (novRating / len).toFixed(1);
      // advRating = (advRating / len).toFixed(1);
      // expRating = (advRating / len).toFixed(1);


      ratingDiv.append('<h4>Ratings from other learners</h4>');
      var ul = $('<ul>');

      ul.append('<li>'+ "overall rating: " + overall +'</li>');
      if (newbRating >= 1) {
        ul.append('<li>'+ "newbie rating: " + newbRating +'</li>');
      }
      // if (novRating >= 1) {
      //   ul.append('<li>'+ "novice rating: " + novRating +'</li>');
      // }

      // if (advRating >= 1) {
      //   ul.append('<li>'+ "advanced rating: " + advRating +'</li>');
      // }

      // if (expRating >= 1) {
      //   ul.append('<li>'+ "expert rating: " + expRating +'</li>');
      // }

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

    rateLink.addClass('rate-this col-md-8');

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
    webResults.append("<h3>Search</h3>");
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
        div.append("<br>" + thisResource.content + "<br>");

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
  }
});

