require 'spec_helper'

describe Resource do
    it "updates in the database" do
      r = Resource.new({
        added_by: 2,
        description: "How to Solve the Rubix Cube. Invented by Hungarian Erno Rubik in 1974, the Rubik's Cube is a three-dimensional puzzle cube with 54 colored squares, each square one of ...",
        query: "solve rubix cube",
        title: "How to Solve the Rubix Cube | eHow",
        url: "http://www.ehow.com/how_6583718_solve-rubix-cube.html"
      })
      r.save()
      expect(Resource.all.length).to eq(1)
    end
    it "created in the database only once" do
      r1 = Resource.new({
        added_by: 2,
        description: "How to Solve the Rubix Cube. Invented by Hungarian Erno Rubik in 1974, the Rubik's Cube is a three-dimensional puzzle cube with 54 colored squares, each square one of ...",
        query: "solve rubix cube",
        title: "How to Solve the Rubix Cube | eHow",
        url: "http://www.ehow.com/how_6583718_solve-rubix-cube.html"
      })
      r2 = Resource.new({
        added_by: 2,
        description: "How to Solve the Rubix Cube. Invented by Hungarian Erno Rubik in 1974, the Rubik's Cube is a three-dimensional puzzle cube with 54 colored squares, each square one of ...",
        query: "solve rubix cube",
        title: "How to Solve the Rubix Cube | eHow",
        url: "http://www.ehow.com/how_6583718_solve-rubix-cube.html"
      })
      r1.save()
      r2.save()
      expect(Resource.all.length).to eq(2)
    end
end
