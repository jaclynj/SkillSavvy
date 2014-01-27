App.Views.Results = Backbone.View.extend({
  events: {
    "change #sort-by-select" : "triggerSortedSearch",
    "click a.rate-this" : "showRatingForm"
  },
  attributes: {
    //this.attributes.query
  },
  showRatingForm: function(e){
      e.preventDefault();
      //displays and moves rating box
      var rating = $('#rating-form');
      //passes attributes of resource to rating form
      var item = $(e.currentTarget.attributes.href.ownerElement.parentElement.childNodes[2]);
      var bod = $(e.currentTarget.attributes.href.ownerElement.parentElement.childNodes[6]);
      var resourceBody = bod.text();
      var resourceLink = item.context.href;
      var resourceName = item.context.textContent;
      //this is important! Prevents rating form from submitting multiple times
      if (App.ratingForm) {
        App.ratingForm.stopListening();
        App.ratingForm.undelegateEvents();
      };
      //that was important
      App.ratingForm = new App.Views.RatingForm({attributes:{query: this.attributes.query, title: resourceName, url: resourceLink, description: resourceBody} });
      App.ratingForm.on('resetEverything', this.reloadResults);
      rating.removeClass('hidden');
      rating.fadeIn(320);
  },

  reloadResults: function(){
    // console.log('before reloading');
    $('#successful-rating').fadeOut(100);
    App.main.updateResources();
    // console.log('after reloading');
    App.main.results.ratedSuccess();
  },

  ratedSuccess: function() {
    var successMessage = $('#successful-rating');
    // console.log('fading in');
    successMessage.fadeIn(600).delay(2000).fadeOut(500);
    // console.log('should have faded out?');
  },

  triggerSortedSearch: function() {
    App.main.submitSortedSearch();
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

  addStarRating: function(ratingNumber) {
    var starRatingClass = "";
    if (ratingNumber >= 4.8 ) {
      //display 5 stars
      starRatingClass = "star50";
    } else if (ratingNumber >= 4.3 ) {
      //display 4.5 stars
      starRatingClass = "star45";
    } else if (ratingNumber >= 3.8 ) {
      //display 4 stars
      starRatingClass = "star40";
    } else if (ratingNumber >= 3.3 ) {
      //display 3.5 stars
      starRatingClass = "star35";
    } else if (ratingNumber >= 2.8 ) {
      //display 3 stars
      starRatingClass = "star30";
    } else if (ratingNumber >= 2.3 ) {
      //display 2.5 stars
      starRatingClass = "star25";
    } else if (ratingNumber >= 1.8 ) {
      //display 2 stars
      starRatingClass = "star20";
    } else if (ratingNumber >= 1.3 ) {
      //display 1.5 stars
      starRatingClass = "star15";
    } else if (ratingNumber >= 0.8 ) {
      //display 1 star
      starRatingClass = "star10";
    } else if (ratingNumber >= 0.3) {
      //display 0.5 star
      starRatingClass = "star05";
    } else {
      //display 0 stars
      starRatingClass = "star00";
    }
    return starRatingClass;
    //should returns class name
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

    //tb.append('<tr>'+ '<td>' + "overall rating: " + '</td><td>' + rA.overallRating + '</td>' +'</tr>');
    var overallStars = App.main.results.addStarRating(rA.overallRating);
    var overallRatingTR = "<tr>"+ "<td class = 'rating-type' >" + "overall rating: " + "</td><td class = '" + overallStars + " star' >" + "</td>" + "<td>" + rA.overallRating + "</td>" + "</tr>";
    tb.append( overallRatingTR );

    var newbieStars = App.main.results.addStarRating(rA.newbieRating);
    var newbieRatingTR = "<tr>"+ "<td class = 'rating-type' >" + "newbie rating: " + "</td><td class = '" + newbieStars + " star' >" + "</td>" + "<td>" + rA.newbieRating + "</td>" + "</tr>";
    tb.append( newbieRatingTR );


    var noviceStars = App.main.results.addStarRating(rA.noviceRating);
    var noviceRatingTR = "<tr>"+ "<td class = 'rating-type' >" + "novice rating: " + "</td><td class = '" + noviceStars + " star' >" + "</td>" + "<td>" + rA.noviceRating + "</td>" + "</tr>";
    tb.append( noviceRatingTR );

    var advancedStars = App.main.results.addStarRating(rA.advancedRating);
    var advancedRatingTR = "<tr>"+ "<td class = 'rating-type' >" + "advanced rating: " + "</td><td class = '" + advancedStars + " star' >" + "</td>" + "<td>" + rA.advancedRating + "</td>" + "</tr>";
    tb.append( advancedRatingTR );

    var expertStars = App.main.results.addStarRating(rA.expertRating);
    var expertRatingTR = "<tr>"+ "<td class = 'rating-type' >" + "expert rating: " + "</td><td class = '" + expertStars + " star' >" + "</td>" + "<td>" + rA.expertRating + "</td>" + "</tr>";
    tb.append( expertRatingTR );

    ratingDiv.append(tb);
    //returns the div as a jquery object
    return ratingDiv;
  },

  skillLevel: function(ratingModel) {
    var attrs = ratingModel.attributes;
    if (attrs.newbie_rating > 0) {
      return "Newbie level";
    } else if (attrs.novice_rating > 0) {
      return "Novice level";
    } else if (attrs.adv_rating > 0) {
      return "Advanced level";
    } else if (attrs.expert_rating > 0 ) {
      return "Expert level";
    }
  },

  displayRateThisLink: function(existingRating) {
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
    if (existingRating && existingRating != null && existingRating != []) {
      var skillLvl = App.main.results.skillLevel(existingRating);
      var starDiv = $('<div>');
      starDivClass = App.main.results.addStarRating(existingRating.attributes.overall_rating);
      starDiv.addClass(starDivClass);
      starDiv.addClass('my-rating');
      var alreadyRated = $("<div>Your rating: </div>");
      alreadyRated.append(starDiv);
      // alreadyRated.append("at the " + skillLvl);
      alreadyRated.addClass('already-rated');
      return alreadyRated;
    } else if (  $("#user-box:contains('Login')").length > 0  ) {
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
      //creates
      var thisResult = App.main.results.createResultDivWithRating(model);
      sortedResults.append(thisResult);
    });
    //this should return a div of divs
    return sortedResults;
  },
  createResultDivWithRating: function(model){
    var thisResult = $('<div>');
    thisResult.addClass('results-div row');
    var div = $('<div>');
    var title = model.attributes.title;
    var url = model.attributes.url;
    var desc = model.attributes.description;
    //adds title+link
    div.addClass("search-results col-md-9");
    var titleLink = $('<a>',{
      text: title,
      href: url,
      target: "_blank"
    });
    //resource link under title
    titleLink.addClass('resource-link');
    var thisDomain = App.main.results.urlDomain(model.attributes.url);
    var favicon = ("<img class='fav' src='http://www.google.com/s2/favicons?domain=" + thisDomain + "' /> ");
    div.append(favicon);
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
    var ratingDiv = App.main.results.displayRating(model.ratings);
    ratingDiv.attr("id", "rating-" + model.id);
    thisResult.append(ratingDiv);
    //return thisResult, div with the result and rating
    var existingRating = App.main.ratings.findWhere({resource_id: model.id, user_id: App.main.userId});
    var rateThisLink = App.main.results.displayRateThisLink(existingRating);
    div.append('<br>');
    div.append(rateThisLink);
    return thisResult;
  },

  urlDomain: function(data) {
    var a = document.createElement('a');
    a.href = data;
    return a.hostname;
  },

  displayResults: function(feedObject) {
    //this is the setup
    $('#throbber').addClass('hidden');
    var resultsArea = App.main.results.$el;
    var webResultsOnPage = $('#web-results');
    var webResults = $("<div>");
    webResultsOnPage.html(webResults);
    // webResultsOnPage.prepend("<h3>Results</h3>");
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
          existingResource.ratings = App.main.results.getRatingAverages();
          //sortedRatings is an array of models
          if ($('#sort-by-select').val() != 'search ranking') {
            sortedRatings.push(existingResource);
          } else {
            var searchResultDiv = App.main.results.createResultDivWithRating(existingResource);
            notInDB.append(searchResultDiv);
          }

        } else {
          var thisResultDiv = $("<div>");
          thisResultDiv.addClass('results-div row');
          var div = $("<div>");
          var notRatedDiv = $("<div>");
          notRatedDiv.addClass('rating-div col-md-3');
          notRatedDiv.html('<h4>No ratings yet</h4>');
          //adds title+link
          div.addClass("search-results col-md-9");
          var resourceLink = $('<a>',{
            text: thisResource.title,
            href: thisResource.link,
            target: "_blank"
          });
          //resource link under title
          resourceLink.addClass('resource-link');
          var thisDomain = App.main.results.urlDomain(thisResource.link);
          var favicon = ("<img class='fav' src='http://www.google.com/s2/favicons?domain=" + thisDomain + "' /> ");
            div.append(favicon);
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
          div.append("<br>");
          div.append( App.main.results.displayRateThisLink(null) );
          thisResultDiv.append(div);
          thisResultDiv.append(notRatedDiv);
          notInDB.append(thisResultDiv);
        }
      }
    }
    sortedRatings = App.main.results.detectSortingMethod(sortedRatings);
    //sort the rating first, then pass that in here
    var sortedRatingsDiv = App.main.results.createSortedDiv(sortedRatings);
    //sort the sortedRatingsDiv before appending.
    webResults.append(sortedRatingsDiv);
    webResults.append(notInDB);
    webResultsOnPage.append(webResults);
    $('#results-header').fadeIn( 300 );
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
