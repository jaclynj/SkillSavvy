App.Models.Rating = Backbone.Model.extend({
  urlRoot: '/ratings',
  defaults: {
    newbie_rating:  0,
    novice_rating:  0,
    adv_rating:     0,
    expert_rating:  0,
    overall_rating: 0,
    resource_id:    1,
    user_id:        1
  },
  initialize: function(){

  }
});
