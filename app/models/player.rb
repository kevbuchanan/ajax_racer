class Player < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  has_many :players_games
  has_many :games, through: :players_games

  def wins
    Game.where('winner_id = ?', self.id)
  end
end
