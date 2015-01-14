import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	pathForType: function(type){
		return this._super(type).camelize().capitalize();
	}
});
