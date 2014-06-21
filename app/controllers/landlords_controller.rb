class LandlordsController < ApplicationController
  
  def auth
    #code = params[:code]
    code = "ac_4G7o02ADrpH1vgjQmz3Nc6jUHR5gXcgL"
    postData = Net::HTTP.post_form(URI.parse('https://connect.stripe.com/oauth/token'), {'code'=> code, 'client_secret' => 'sk_test_tTndnwq76QzfilIrXTok7yhK'})
    
    
    # response from auth flow:  http://localhost:3000/stripe/account_authorization?scope=read_write
    # &code=ac_4G7o02ADrpH1vgjQmz3Nc6jUHR5gXcgL
    
    # {
    #   "access_token": "sk_test_wjFpOS56RZxp1giKApGYSFnB",
    #   "livemode": false,
    #   "refresh_token": "rt_4G98GSgjcVqUqF13QJ4oHsr0xBpo447c5wXLhdcX76MhRCPL",
    #   "token_type": "bearer",
    #   "stripe_publishable_key": "pk_test_x5j9z7KLv59LUycN52OS9MDY",
    #   "stripe_user_id": "acct_1AGl5ZbcBpkM6oOuJldY",
    #   "scope": "read_write"
    # }
    
    
  end
  
  def new
  
  end
  
end
