class CreatePlayersGames < ActiveRecord::Migration
  def change
    create_table :players_games do |t|
      t.references :player
      t.references :game
      t.timestamps
    end
    add_index :players_games, [:player_id, :game_id], unique: true
  end
end
