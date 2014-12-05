class Game < ActiveRecord::Base
  has_many :player_games
  validates :name, presence: true
end
