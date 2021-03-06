backbone_data.Views.ShowLandlordView = Backbone.View.extend({
	template: JST['landlords/show'],
	events: {
		'click #add_property_link':'addProperty',
		'click .building_link':'showBuilding'
	},
	initialize: function(options){
	
	},
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		this.drawPropertyList()
		return this
	},
	addProperty: function(){
		var landlord_id = this.model.id;
		var building = new backbone_data.Models.Building();
		var newBuildingView = new backbone_data.Views.NewBuildingView({model: building});
		$container.html(newBuildingView.render().el);
		router.navigate('landlords/'+landlord_id+'/new_building');
		return false;
	},
	drawPropertyList: function(){
		var collection = ns.buildingsCollection.models;
		var $list = $('<ul></ul>');
		
		if(collection.length){
			for(x in collection){
				$list.append(JST['landlords/_building_list']({name: collection[x].get('name'), id: collection[x].get('id')}));
			}	
		}else{
			$list.append('<li>No Properties In System</li>');
		}
		
		this.$el.find('#add_property_link').after($list);
	},
	showBuilding: function(e){
		var $link = $(e.currentTarget);
		var building = ns.buildingsCollection.get($link.data('id'));
		var landlord_id = this.model.id;
		var showBuildingView = new backbone_data.Views.ShowBuildingView({model: building});
		$container.html(showBuildingView.render().el);
		router.navigate('landlords/'+landlord_id+'/buildings/'+building.id);
		return false;
	}
});	