class SpreadsheetHandler
  require 'roo'
  
  def self.compile_units(filename, str)
    
    quote_chars = %w(" | ~ ^ & *)
    
    decoded_file = Base64.decode64(str.split(',')[1])
    f = decoded_file.encode("UTF-8", "ISO-8859-15")
    io = IO.new(f)
    file = File.new(io)
    # file = CSV.parse(f.gsub!(/\0/, ''))
    #  #s = Roo::Excelx.new(f.gsub!(/\0/, ''))  
    #  Rails.logger.debug(">>>>>>>>>>>>>>>>>> file : #{file.inspect}")
    
    begin
      @report = CSV.read(f.gsub!(/,\s+\"/,',\"'))
    rescue CSV::MalformedCSVError
      quote_chars.empty? ? raise : retry 
    end
    
    #   
    #   file = CSV.parse(new_file)
  end
  
end