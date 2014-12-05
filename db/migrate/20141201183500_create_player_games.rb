class CreatePlayerGames < ActiveRecord::Migration
  def change
    create_table :player_games do |t|
      t.belongs_to :game
      t.belongs_to :player
      t.integer :wins
      t.integer :losses

      t.timestamps
    end
  end
end
