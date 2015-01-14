import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		addGame: function(){
			alert('he');
			var model = this.get('model');
			model.save();
		}
	}
});
