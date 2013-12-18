require 'spec_helper'

describe Rating do

it "updates in the database" do
      resource = Resource.new({
        added_by: 2,
        description: "How to Solve the Rubix Cube. Invented by Hungarian Erno Rubik in 1974, the Rubik's Cube is a three-dimensional puzzle cube with 54 colored squares, each square one of ...",
        query: "solve rubix cube",
        title: "How to Solve the Rubix Cube | eHow",
        url: "http://www.ehow.com/how_6583718_solve-rubix-cube.html"
      })
      resource.save()
      rating = Rating.new({
        newbie_rating: 4,
        overall_rating: 4,
        resource_id: 1,
        user_id: 1
      })
      rating.save()
      expect(Rating.all.length).to eq(1)
    end

    it "can belong to resource" do
      resource = Resource.new({
        added_by: 2,
        description: "How to Solve the Rubix Cube. Invented by Hungarian Erno Rubik in 1974, the Rubik's Cube is a three-dimensional puzzle cube with 54 colored squares, each square one of ...",
        query: "solve rubix cube",
        title: "How to Solve the Rubix Cube | eHow",
        url: "http://www.ehow.com/how_6583718_solve-rubix-cube.html"
      })
      resource.save()
      rating = Rating.new({
        newbie_rating: 4,
        overall_rating: 4,
        resource_id: 1
      })
      rating.save()
      resource.ratings(rating)
      expect(resource.ratings).to include(rating)
    end


end
