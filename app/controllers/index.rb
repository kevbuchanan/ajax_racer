get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/new_game' do
  @player1 = Player.find_or_create_by_name(params[:player1][:name])
  @player2 = Player.find_or_create_by_name(params[:player2][:name])
  if @player1.valid? && @player2.valid?
    Game.create(players: [@player1, @player2])
    
  else
    @errors1 = @player1.errors.full_messages
    @errors2 = @player2.errors.full_messages
    erb :index
  end
end
