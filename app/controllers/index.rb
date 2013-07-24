get '/' do
  @best_times = Game.order('updated_at - created_at').limit(10)
  erb :index
end

post '/new_game' do
  Game.create(params[:players])
  content_type :json
  @game.to_json
end

post '/new_player' do
  @player = Player.find_or_create_by_name(params[:player])
  content_type :json
  @player.to_json
end

post '/add_player' do
  erb :_form, layout: false
end

post '/finished' do
  @game = Game.last
  @game.update_attributes(params[:game])
  erb :_winner, layout: false, locals: { game: @game, winner: @winner}
end
