class Rating < ActiveRecord::Base
  attr_accessible :adv_rating, :comment, :expert_rating, :newbie_rating, :novice_rating, :overall_rating, :resource_id, :user_id
  belongs_to :resource
end
