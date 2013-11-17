import entities
    
const main_menu_options = {"1": "Start an adventure", "2": "Exit"}

proc delim() =
  echo """
  
================================================================================

"""

proc quit() =
  delim()
  echo "Bye!"

proc welcome_message() =
  delim()
  echo """
Welcome to Seal of Ardour!

Press any key to continue.
"""
  discard stdin.readline

proc show_main_menu():string =
  delim()
  for tup in main_menu_options:
    echo tup[0], ": ", tup[1]
  result = stdin.readline

proc build_character() =
  var nc = PPlayerCharacter()
  
  echo "What's your name?"
  nc.name = stdin.readline
  echo "Hail, ", nc.name, "!"
  
  echo """
Whats your gender?
  1. Male
  2. Female  
"""
  var g = stdin.readline
  case g
  of "1":
    nc.gender = Male
  of "2":
    nc.gender = Female
    
  echo "OK, so you're a ", nc.gender
  
  

proc start_adventure() =
  delim()
  echo "Starting"
  build_character()

proc handle_main_menu_choice(c:string) =
  case c
  of "1":
    start_adventure()
  else:
    quit()

proc main() =
  welcome_message()
  var choice = show_main_menu()
  handle_main_menu_choice(choice)
  
main()
