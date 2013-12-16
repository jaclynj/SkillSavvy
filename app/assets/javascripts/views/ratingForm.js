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
    this.ratings = new App.Collections.Ratings({model: App.Models.Rating});
    this.ratings.add(this.ratings);
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
    this.resources.fetch({
      success: function(){
        thisForm = App.ratingForm;
        //refactor to checkForExistingResource()
        var existingResource = thisForm.resources.findWhere({url: thisForm.attributes.url});
        console.log(existingResource);
        if (existingResource && existingResource != [] && existingResource != null) {
          thisForm.resource = existingResource;
          thisForm.createRating();
        } else {
          thisForm.userId = $('form #user-id').val();
          thisForm.userId = parseInt(thisForm.userId);
          thisForm.resource.set({
            query: thisForm.attributes.query,
            title: thisForm.attributes.title,
            url: thisForm.attributes.url,
            description: thisForm.attributes.description
          });
          thisForm.resource.save(null, {
            success: function(model, response){
              console.log('saved resource');
              console.log(model);
            },
            error: function(model, response) {
              console.log(response);
            }
          });
        }
      }
    });
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
