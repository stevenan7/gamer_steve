require 'bcrypt'

class Player < ActiveRecord::Base
  has_many :player_games
  has_many :games, through: :player_games

  validates :username, uniqueness: true
  validates :password, presence: true

  def password
    @password ||= BCrypt::Password.new(password_hash)
  end

  def password=(new_password)
    @password = BCrypt::Password.create(new_password)
    self.password_hash = @password
  end





  def self.authenticate(username, password)
    player = Player.find_by(username: username)
    player if player && player.password == password
  end
end
