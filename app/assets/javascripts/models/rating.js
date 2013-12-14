// App.Models.Rating = Backbone.Model.extend({
//   urlRoot: '/ratings',
//   defaults: {
//     newbie_rating:  0,
//     novice_rating:  0,
//     adv_rating:     0,
//     expert_rating:  0,
//     overall_rating: 0,
//     resource_id:    1,
//     user_id:        1,
//     query: ""
//   }
//   // attrs is model attributes
//   // options are what's passed from save or set
//   initialize: function(){
//     var rating = this;
//     $.ajax({
//       url: "/create",
//       type: "post",
//       data: {
//         overall_rating: this.set({overall_rating: somethinginparams}),
//         // newbie_rating: this.get('newbie_rating'),
//         // novice_rating: this.get('novice_rating'),
//         // adv_rating: this.get('adv_rating'),
//         // expert_rating: this.get('expert_rating'),
//       }
//     })
// })
