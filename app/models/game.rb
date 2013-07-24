class Game < ActiveRecord::Base

  has_many :players_games
  has_many :players, through: :players_games

end
