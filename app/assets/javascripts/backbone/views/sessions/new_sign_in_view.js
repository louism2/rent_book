backbone_data.Views.SignInView = Backbone.View.extend({
	template: JST["sessions/sign_in"],
	events: {
		'submit #sign_in_form':'signInUser',
		'click #create_account_link':'createNewLandlord'
	},
	render: function(){
		this.$el.html(this.template());
		return this		
	},
	signInUser: function(e){
		e.preventDefault();
		var $form = $('#sign_in_form');
		var email = $('#email').val();
		var pass = $('#password').val();
		this.sendSignInRequest(email, pass);
		return false;
	},
	sendSignInRequest: function(email, password){
		$.ajax('/sessions',{
				type: 'POST',
				contentType: "text/javascript",
				data: JSON.stringify({email: email, password: password})
		}).done(function(data){
			console.log(data);
		}).fail(function(jqXHR, textStatus, errorThrown){
			
		});
	},
	createNewLandlord: function(){
		var landlord = ns.landlord;
		var newLandlordView = new backbone_data.Views.NewLandlordView({model: landlord});
		$container.html(newLandlordView.render().el);
	}
});	