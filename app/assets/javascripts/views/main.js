App.Views.Main = Backbone.View.extend({
  el: "#search",
  events: {
    "submit #submit-form" : "submitSearch",
    "change #sort-by-select" : "submitSortedSearch"
  },

  initialize: function(){
    this.resources = new App.Collections.Resources({model: App.Models.Resource});
    this.ratings = new App.Collections.Ratings({model: App.Models.Rating});
    this.search = new App.Models.Search();
    this.listenTo(this.search, 'gotResults', this.showResults);
  },

  submitSearch: function(e){
    console.log('submitting search');
    $('#successful-rating').fadeOut(100);
    e.preventDefault();
    this.query = $('#search-field').val();
    if (this.query != "") {
      this.trigger('turn it off');
      this.search.searchWeb(this.query);
    }
  },
  submitSortedSearch: function(e){
    console.log('submitting sorted search');
    $('#successful-rating').fadeOut(100);
    e.preventDefault();
    this.query = $('#search-field').val();
    if (this.query != "") {
      this.trigger('turn it off');
      $('#web-results').fadeOut( 100, function() {
        $('#throbber').removeClass('hidden');
        App.main.search.webSearch.get(App.main.displayResults);
    });
    }
  },

  showResults: function() {
    this.results = new App.Views.Results({ el:"#results", attributes:{query: this.query} });
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

  getRatingAverages: function(){
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

    if (newbieRatings.length >= 1) {
      newbRating = (newbRating / newbieRatings.length).toFixed(1);
    }
    if (noviceRatings.length >= 1) {
      novRating = (novRating / noviceRatings.length).toFixed(1);
    }
    if (advancedRatings.length >= 1) {
      advRating = (advRating / advancedRatings.length).toFixed(1);
    }
    if (expertRatings.length >= 1) {
      expRating = (expRating / expertRatings.length).toFixed(1);
    }
    return {
      overallRating: overall,
      newbieRating: newbRating,
      noviceRating: novRating,
      advancedRating: advRating,
      expertRating: expRating
      };
  },

  displayRating: function(ratingsAverages){
    //this is called in displayResults
    //move these to the results view
    var ratingDiv = $('<div>');
    ratingDiv.addClass('rating-div col-md-3');
    var rA = ratingsAverages;

    //refactor into a handlebars template
    ratingDiv.append('<h4>Ratings from other learners</h4>');
    var tb = $('<table>');

    tb.append('<tr>'+ '<td>' + "overall rating: " + '</td><td>' + rA.overallRating + '</td>' +'</tr>');

    if (rA.newbieRating >= 1) {
      tb.append('<tr>'+ '<td>' + "newbie rating: " + '</td><td>' + rA.newbieRating + '</td>' +'</tr>');
    }

    if (rA.noviceRating >= 1) {
      tb.append('<tr>'+ '<td>' + "novice rating: " + '</td><td>' + rA.noviceRating + '</td>' +'</tr>');
    }

    if (rA.advancedRating >= 1) {
      tb.append('<tr>'+ '<td>' + "advanced rating: " + '</td><td>' + rA.advancedRating + '</td>' +'</tr>');
    }

    if (rA.expertRating >= 1) {
      tb.append('<tr>'+ '<td>' + "expert rating: " + '</td><td>' + rA.expertRating + '</td>' +'</tr>');
    }
    ratingDiv.append(tb);
    //returns the div as a jquery object
    return ratingDiv;
  },

  displayRateThisLink: function() {
    //move these to the results view
    var rateLink = $('<a>',{
      text: "Rate This",
      href: '/ratings/new'
    });

    var logInLink = $('<a>',{
      text: "Log In to Rate This",
      href: '/login'
    });

    rateLink.addClass('rate-this');
    logInLink.addClass('add-rating');

    if (  $("#user-box:contains('Login')").length > 0  ) {
      return logInLink;
    } else {
      return rateLink;
    }
  },
  overallSort: function(a,b) {
    if (a.ratings.overallRating < b.ratings.overallRating )
      return 1;
    if (a.ratings.overallRating  > b.ratings.overallRating )
      return -1;
    return 0;
  },
  newbieSort: function(a,b) {
    if (a.ratings.newbieRating < b.ratings.newbieRating )
      return 1;
    if (a.ratings.newbieRating  > b.ratings.newbieRating )
      return -1;
    return 0;
  },
  noviceSort: function(a,b) {
    if (a.ratings.noviceRating < b.ratings.noviceRating )
      return 1;
    if (a.ratings.noviceRating  > b.ratings.noviceRating )
      return -1;
    return 0;
  },
  advancedSort: function(a,b) {
    if (a.ratings.advancedRating < b.ratings.advancedRating )
      return 1;
    if (a.ratings.advancedRating  > b.ratings.advancedRating )
      return -1;
    return 0;
  },
  expertSort: function(a,b) {
    if (a.ratings.expertRating < b.ratings.expertRating )
      return 1;
    if (a.ratings.expertRating  > b.ratings.expertRating )
      return -1;
    return 0;
  },
  createSortedDiv: function(ratingsArray){
    var sortedResults = $('<div>');
    //create a div for each
    _.each(ratingsArray, function(model){
      thisResult = $('<div>');
      thisResult.addClass('results-div row');
      div = $('<div>');
      var title = model.attributes.title;
      var url = model.attributes.url;
      var desc = model.attributes.description;
      //adds title+link
      div.addClass("search-results col-md-8");
      var titleLink = $('<a>',{
        text: title,
        href: url,
        target: "_blank"
      });
      //resource link under title
      titleLink.addClass('resource-link');
        div.append(titleLink);
        div.append("<br>");
      var siteLink = $('<a>',{
        text: url,
        href: url,
        target: "_blank"
      });
      siteLink.addClass('site-link');
      div.append(siteLink);
      //description
      div.append("<br>" + desc);
      thisResult.append(div);
      //create rating div for this result
      var ratingDiv = App.main.displayRating(model.ratings);
      ratingDiv.attr("id", "rating-" + model.id);
      thisResult.append(ratingDiv);
      //add each from sortedRatings array to the sorted ratings div in order
      sortedResults.append(thisResult);
      var rateThisLink = App.main.displayRateThisLink();
      div.append(rateThisLink);
    });
    //this should return a div of divs
    return sortedResults;
  },

  displayResults: function(feedObject) {
    //move these to the results view
    //this is the setup
    console.log('displaying results');
    $('#throbber').addClass('hidden');
    var resultsArea = $('#results');
    var webResultsOnPage = $('#web-results');
    var webResults = $("<div>");
    webResultsOnPage.html(webResults);
    webResultsOnPage.prepend("<h3>Results</h3>");
    webResults.attr("id", "these-web-results");
    var sortedRatings = [];
    var notInDB = $("<div>");

    for (var i=0; i < feedObject.entries.length; i++) {
      var thisResource = feedObject.entries[i];
      if (thisResource.link) {
        ///check if it exists
        var existingResource = App.main.resources.findWhere({url: thisResource.link});
        //do this if resource exists in db
        if (existingResource && existingResource != []) {
          App.main.ratingInfo = App.main.ratings.where({resource_id: existingResource.id});
          existingResource.ratings = App.main.getRatingAverages();
          //sortedRatings is an array of models
          sortedRatings.push(existingResource);
        } else {
          var thisResultDiv = $("<div>");
          thisResultDiv.addClass('results-div row');
          var div = $("<div>");
          var notRatedDiv = $("<div>");
          notRatedDiv.addClass('rating-div col-md-3');
          notRatedDiv.html('<h4>No ratings yet</h4>');
          //adds title+link
          div.addClass("search-results col-md-8");
          var resourceLink = $('<a>',{
            text: thisResource.title,
            href: thisResource.link,
            target: "_blank"
          });
          //resource link under title
          resourceLink.addClass('resource-link');
            div.append(resourceLink);
            div.append("<br>");
          var siteLink = $('<a>',{
            text: thisResource.link,
            href: thisResource.link,
            target: "_blank"
          });
          siteLink.addClass('site-link');
          div.append(siteLink);
          //description
          div.append("<br>" + thisResource.content);
          div.append( App.main.displayRateThisLink() );
          thisResultDiv.append(div);
          thisResultDiv.append(notRatedDiv);
          notInDB.append(thisResultDiv);
        }
      }
    }
    sortedRatings = App.main.detectSortingMethod(sortedRatings);
    //sort the rating first, then pass that in here
    var sortedRatingsDiv = App.main.createSortedDiv(sortedRatings);
    //sort the sortedRatingsDiv before appending.
    webResults.append(sortedRatingsDiv);
    webResults.append(notInDB);
    webResultsOnPage.append(webResults);
    $('#web-results').fadeIn( 300 );
  },

  detectSortingMethod: function(ratingsArray){
    var selected = $('#sort-by-select').val();

    if (selected == "overall rating") {
      return ratingsArray.sort(this.overallSort);

    } else if (selected == "newbie rating") {
      return ratingsArray.sort(this.newbieSort);

    } else if (selected == "novice rating") {
      return ratingsArray.sort(this.noviceSort);

    } else if (selected == "advanced rating") {
      return ratingsArray.sort(this.advancedSort);

    } else if (selected == "expert rating") {
      return ratingsArray.sort(this.expertSort);
    }


  }
});

