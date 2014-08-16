class Unit < ActiveRecord::Base
  
  validates :building_id,   presence: true
  
  validates :monthly_rent,  presence: true
  
  validates :unit_number,   presence: true
  
  validates :balance,       numericality: true
  
end
