class Resource < ActiveRecord::Base
  attr_accessible :added_by, :description, :price, :query, :title, :url
  has_many :ratings
end
