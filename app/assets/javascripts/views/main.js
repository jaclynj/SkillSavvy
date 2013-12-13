App.Views.Main = Backbone.View.extend({
  el: "#search",
  events: {
    "click button" : "submitSearch"
  },
  initialize: function(){
    console.log('hi from the view');
    this.resources = new App.Models.Resources();
    this.listenTo(this.resources, 'gotResults', this.showResults);
  },
  submitSearch: function(e){
    e.preventDefault();
    $('#results').html($('#throbber'));
    $('#throbber').toggle();
    var query = $('#search-field').val();
    this.resources.searchWeb(query);
  },
  showResults: function() {
    this.results = this.resources.webSearch.get(this.displayResults);
  },
  displayResults: function(feedObject) {
    $('#throbber').toggle();
   var resultsArea = $('#results');
   webResults = $("<div>");
   webResults.append("<h3>Web Search</h3>");
   webResults.attr("id", "web-results");
   for (var i=0; i < feedObject.entries.length; i++) {
      var thisResource = feedObject.entries[i];
      if (thisResource.link) {
        div = $("<div>");
        resourceLink = $('<a>',{
                text: thisResource.title,
                href: thisResource.link
              });
        div.append(resourceLink);
        div.append("<br>" + thisResource.content + "<br>");
        div.addClass("search-results");
        rateLink = $('<a>',{
                text: "Rate This",
                href: '#'
              });
        logInLink = $('<a>',{
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

