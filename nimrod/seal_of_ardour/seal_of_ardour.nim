import
  entities, nimgame/lib/engine, nimgame/lib/state, nimgame/lib/entity, nimgame/lib/image, nimgame/lib/screen

proc main() =
  echo "Starting"
  
  let game_state = new_state()
  
  #let surf = new_surface(16, 16)
  #let img = new_image("pc.png")
  let ent = new_entity(graphic = nil)
  game_state.add(ent)
  
  let engine = new_engine(title = "Seal of Ardour",
                          info = true)
  
  engine.state = game_state
  start(engine)
  
  echo "Exiting"
  
main()
