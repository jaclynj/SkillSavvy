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
    var query = $('#search-field').val();
    this.resources.search(query);
  },
  showResults: function() {
    this.results = this.resources.WebSearch.get(this.displayResults);
  },
  displayResults: function(feedObject) {
   var resultsArea = $('#results');
   resultsArea.html("Web Search");
   for (var i=0; i < feedObject.entries.length; i++) {
      var thisResource = feedObject.entries[i];
      if (thisResource.link) {
        div = $("<div>");
        link = $('<a>',{
                text: thisResource.title,
                href: thisResource.link
              })
        div.append(link);
        div.append("<br>" + thisResource.content + "<br>");
        resultsArea.append(div);
      }
    }
  }
});
