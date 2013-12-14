class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :overall_rating
      t.integer :newbie_rating
      t.integer :novice_rating
      t.integer :adv_rating
      t.integer :expert_rating
      t.text :comment
      t.integer :user_id
      t.integer :resource_id

      t.timestamps
    end
  end
end
