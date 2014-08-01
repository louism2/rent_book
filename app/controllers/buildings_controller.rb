class BuildingsController < ApplicationController
  require "base64"
  require "csv"
  require "spreadsheet_handler"
  
  def create
    SpreadsheetHandler.compile_units(params['building']['filename'],params['building']['data'])

    render json: {status: 'some shit'}
  end
  
end
