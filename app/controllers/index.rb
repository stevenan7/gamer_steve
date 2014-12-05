get '/' do
  erb :index
end

get '/player/:player_id/games' do |id|
	@player = Player.find(id)
	@games = Game.all
	@player_games = PlayerGame.all

  erb :games
end

post '/redirect_simon' do
	player = Player.find(session[:player_id])

	redirect "/player/#{player.id}/games/simon"
end

post '/store_winner' do
	@player_games = PlayerGame.find(1)
	# need to dynamically query appropriate playerGame id
	@player_games.wins += 1
	@player_games.save

end

post '/store_loser' do
	@player_games = PlayerGame.find(1)
	@player_games.losses += 1
	@player_games.save
end

post '/tic_tac_toe' do
  player = Player.find(session[:player_id])
  redirect "/player/#{player.id}/games/tic_tac_toe"
end

get "/player/:player_id/games/tic_tac_toe" do |id|
  @player = Player.find(id)
  @player_games = PlayerGame.find(2)

  erb :tic_tac_toe
end


get "/player/:player_id/games/simon" do |id|
	@player = Player.find(id)
	@player_games = PlayerGame.find(id)

	erb :simon
end

post '/store_tic_winner' do
  @player_games = PlayerGame.find(2)
  # need to dynamically query appropriate playerGame id
  @player_games.wins += 1
  @player_games.save

end

post '/store_tic_loser' do
  @player_games = PlayerGame.find(2)
  @player_games.losses += 1
  @player_games.save
end


post '/color' do
  content_type :json
  {cell: cell= rand(1..9)}.to_json
end


post '/login' do
  player = Player.authenticate(params[:username], params[:password])
  if player
   	session[:player_id] = player.id
    redirect "/player/#{player.id}/games"
  else
    redirect ffasdf
  end
end

get '/logout' do
 session[:user_id] = nil
redirect '/'
end

post '/new_player' do
  player = Player.new(username: params[:username], password: params[:password])
  if player && player.save
  	@games = Game.all
		@games.each do |game|
			PlayerGame.create(game_id: game.id, player_id: player.id, wins: 0, losses: 0)
    end
    redirect '/'

  else
    redirect '/error'
end





end
