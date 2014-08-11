module BuildingQueries
  
  def units_query
    Building.select('building.landlord_id, units.id')
  end  

end