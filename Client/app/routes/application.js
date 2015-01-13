import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		return this.store.findAll('simpleGame');
	},
	afterModel: function(){
		this.transitionTo('simple-game');
	}
});
