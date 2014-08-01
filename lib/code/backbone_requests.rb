class BackboneRequests
  
  def self.matches?(request)
    request.env["HTTP_ACCEPT"] =~ /(application\/json|text\/javascript|text\/plain)/
  end
  
end