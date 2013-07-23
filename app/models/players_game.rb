class PlayersGame < ActiveRecord::Base
  validates_uniqueness_of :player_id, :scope => :game_id
  belongs_to :player
  belongs_to :game
end
