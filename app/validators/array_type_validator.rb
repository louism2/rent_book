class ArrayTypeValidator < ActiveModel::EachValidator
  
  def validate_each(record, attribute, value)
    unless attribute.is_a?(Array)
      record.errors[attribute] << ("is not an array value")
    end
  end
  
end