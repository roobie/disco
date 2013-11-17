
type
  TCaste* = enum
    Low
    Medium
    High
    
  TGender* = enum
    Uknown
    Male
    Female

  TEntity {. inheritable .} = object of TObject
    id: int
    
  TPlayerCharacter = object of TEntity
    name*: string
    gender*: TGender
    caste*: TCaste
    
  PPlayerCharacter* = ref TPlayerCharacter
  
