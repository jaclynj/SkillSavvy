[![Build Status](https://travis-ci.org/jaclynj/learner_app.png?branch=master)](https://travis-ci.org/jaclynj/learner_app)
[![Coverage Status](https://coveralls.io/repos/jaclynj/learner_app/badge.png)](https://coveralls.io/r/jaclynj/learner_app)


Skill Savvy

About: The site allows you to search resources for any skill you want to learn. each resource is rated by other users with your same skill level. So you can easily see what resources people find to be most helpful in learning that ability or skill.

You could just google "rails tutorial" and maybe get a good one, but you could be wasting your time with one that is too advanced or too entry level for you. With my app you can sort by what others with your skill level have found to be most useful.

###Walkthrough
1. Person goes on site.
2. It asks you, what do you want to learn?
3. You type something in - "Ruby on Rails"
4. A page is generated with resource for learning or practicing rails:
*** Articles, tutorials, YouTube videos, treehouse/code school etc, amazon Books, learning meet ups nearby.
You can sort by these categories
6. Each link has a rating. Users can only rate once. Tutorials are rated for complete newbies, novices, advanced or experts.
7. You can sort by search ranking, or by the top rated tutorials by each skill level.
8. *Backlog* You can create an account and choose to save your favorite "Ruby on Rails" tutorials to go through later. Like a playlist or a netflix queue. The page also serves as a reminder list of things you want to learn or improve upon.

####Visuals
- I kind of want it to look like Linda.com, simple like wunderlist

###Models
#####Users
has_many ratings

- email
- password

##### resources
has_many ratings

- title
- url
- query
- description
- price
- added_by(userID)

#####rating
belongs_to a resource
belongs_to a user

- resource_id
- user_id
- overall_rating (1-5)
- newbie_rating
- novice_rating
- int_rating
- adv_rating
- comment(*not for MVP, will add comment feature later)

####Views
- main search view
- results view
- 'rate this' form
- signup form
- login form


###Tools(apis, frameworks)
Frameworks

- Rails
- BackboneJS
- Bootstrap(just for positioning)

APIs

- Bounce Web API (for search agregating, pulls from Bing and Google)

###User Stories

###PHASE ONE Due by Thurs Dec 12
- Single page search asks "what skill you want to learn or practice?" (ie Spanish, Photoshop)
- - text box on a page, grabs input value
- When you hit enter it pulls from:
- - Bounce Web API
- Display results on page

###PHASE TWO due by Friday Dec 13
- Users should be able to sign up and log in(user authentication)
- to rate you must be logged in:
- - if logged in && if you have not rated this resource yet, link says 'rate this'
- - if not logged in, link says 'log in to rate this'

###PHASE THREE due by Sunday Dec 15
- when user clicks 'rate this', it will display a form for rating. (create form)
- - submitting this form creates an entry for the resource in our db
- - rating entry is associated with that user
- - the rating is added to the database under the query it was found under
- - resource only gets added once to db
- get some TESTS working
- get this up working with travis

###PHASE FOUR due by Monday Dec 16
- You can see the rating for each resource if it exists. for now it'll just be 'rating: 4, newbie rating: 4.3', later i'll add a graphic
- get this up on github (done)
- Make it refresh when submit form (using Backbone)
- fix form calculation issues
//done
//THE MOST MINIMAL MVP

###PHASE FIVE (4 hours) due by Wednesday Dec 18
- the average user stuff should calculate properly
- get it up on heroku
//done
- make pretty
- fix bugs
- resources sorted by rating
- users cannot rate a resource more than once
- filter and sort by skill level

###little fixes
- url redirecting when signup error
- favicon
- seed with ratings

### BACKLOG
- refactor (handlebars)
- add video search
- add comments
- add meetup search
- users can add resources
users can 'bookmark' resources for later
- displayed on all pages is a trending section, lists recently trending searches
- Select all ratings from this week:
For each topic, find its freq for each day of the week
{twerking: {09062013: 5, 09072013: 2, 09082013: 12}
(might not need a hash, this could work as an array)
Add a multiplier to the freq of each day. Ex today freq is 12 x 2, yesterday freq is 2 x1.8, day before freq is 5 x1.5
Add these up for that topic, now you have your weighted frequency for that topic
Then take the weighted frequency and take the top 10, list those as trending
- You can add an article to your "read/watch this later" list as a to-do to remind yourself
- If you come across a great tutorial or video that isn't listed you can add it and rate it. (this can just be an add new form, manually add one instead of it getting populated by an API)
- This also goes in the db and is listed first because of its rating.


###What this shows:

- complex relational databases
- math/logic for ratings, trending and order of resources
- user authentication
- apis
- rails
- backboneJS
