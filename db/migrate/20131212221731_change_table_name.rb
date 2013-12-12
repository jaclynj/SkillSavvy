class ChangeTableName < ActiveRecord::Migration
  def up
    rename_column :users, :password_salt, :password_digest
  end

  def down
  end
end
