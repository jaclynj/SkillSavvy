class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.string :title
      t.string :url
      t.string :query
      t.text :description
      t.string :price
      t.integer :added_by

      t.timestamps
    end
  end
end
