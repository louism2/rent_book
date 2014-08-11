class BuildingsController < ApplicationController
  require "base64"
  require "csv"
  require "spreadsheet_handler"
  
  def create
    building = Building.create(building_parameters.merge!({landlord_id: current_user.id}))
    if building.persisted?
      render json: {id: building.id}
    else
      response.status = "400"
      render json: {errors: building.errors}
    end
  end
  
  def show
    
    building = Building.includes(units: [:tenants]).find(params[:id])
    if building.landlord_id == @current_user.id
      render json: {building: building, tenants: building.unit}
    else
      
    end
  end
  
private

  def building_parameters
    params.require(:building).permit(:name, :street_address, :city, :state, :zip_code, :landlord_id)
  end
  
end
