class BuildingsController < ApplicationController
  require "base64"
  require "csv"
  require "spreadsheet_handler"
  
  def create
    building = Building.new(building_parameters.merge!({landlord_id: current_user.id}))
    building.valid?
    if building.save
      render json: {building: {id: building.id}}
    else
      response.status = "400"
      render json: {errors: building.errors}
    end
  end
  
  def show
    units = Building.building_show_query(params[:id])   
    if units.any? && units.first['landlord_id'] == current_user.id.to_s
      render json: {units: units}
    else
      render json: {status: 'no results'}
    end
  end
  
private

  def building_parameters
    params.require(:building).permit(:name, :street_address, :city, :state, :zip_code, :landlord_id)
  end
  
end
