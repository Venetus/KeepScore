import Ember from 'ember';

export default Ember.Component.extend({	
	// Attributes passed externally
	match: undefined, // THe actual Match
	onDelete: undefined, // Action to be sent on delete 

	// Private Attributes
	showDeleteMatchButton: function(){
		return !this.get('isNew');
	}.property('isNew'),

	isNew: function(){ return this.get('match').get('isNew'); }.property('match.isNew'),

	// Actions
	actions : {
		delete: function() {
			this.sendAction('onDelete', this.get('match')) ;
		}
	}
});
