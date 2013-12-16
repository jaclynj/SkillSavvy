App.Views.RatingForm = Backbone.View.extend({
  el:"#rating-form",
  events: {
    "click button#x-button" : "closeForm",
    "click #submit" : "createResource"
  },
  attributes: {
    //this.attributes.query
    //this.attributes.title
    //this.attributes.url
    //this.attributes.description
  },
  initialize: function(){
    this.resources = new App.Collections.Resources({model: App.Models.Resource});
    this.resource = new App.Models.Resource();
    this.resources.add(this.resource);
    this.rating = new App.Models.Rating();
    this.listenTo(this.resource, 'sync', this.createRating);
  },
  closeForm: function(e) {
    if (e) {
      e.preventDefault();
    }
    console.log('closing form');
    this.$el.addClass('hidden');
  },
  createResource: function(e) {
    console.log('submitting form...');
    e.preventDefault();
    this.resources.fetch();
    var existingResource = this.resources.findWhere({url: this.attributes.url});
    if (existingResource == null) {
      this.userId = $('form #user-id').val();
      this.userId = parseInt(this.userId);
      this.resource.set({
        query: this.attributes.query,
        title: this.attributes.title,
        url: this.attributes.url,
        description: this.attributes.description
        });
      this.resource.save(null, {
        success: function(model, response){
          console.log('saved resource');
        },
        error: function(model, response) {
          console.log(response);
        }
      });
    } else {
      this.resource = existingResource;
      this.createRating();
    }
  },
  createRating: function() {
    //this should happen only if this users has not rated this resource
    this.skillLevel = $('#skill-level option:selected').val();
    this.overallRating = $('#overall-rating option:selected').val();
    this.overallRating = parseInt(this.overallRating);
    this.rating.set({
      resource_id: this.resource.id,
      user_id: this.userId,
      overall_rating: this.overallRating
      });
    this.setSkillLevel();
  },
  setSkillLevel: function() {
    if (this.skillLevel == 'newbie') {
      this.rating.set({
        newbie_rating: this.overallRating
      });
    } else if (this.skillLevel == 'novice') {
      this.rating.set({
        novice_rating: this.overallRating
      });
    } else if (this.skillLevel == 'advanced') {
      this.rating.set({
        adv_rating: this.overallRating
      });
    } else {
      this.rating.set({
        newbie_rating: this.overallRating
      });
    }

    this.rating.save(null, {
      success: function(model, response){
        console.log('saved rating');
        console.log(model);
      },
      error: function(model, response) {
        console.log(response);
      }
    });
    this.closeForm();
  }
});
