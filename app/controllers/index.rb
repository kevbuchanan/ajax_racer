get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/new_game' do

end

post '/new_player' do
  @player = Player.find_or_create_by_name(params[:player])
  content_type :json
  @player.to_json
end

post '/finished' do

end
