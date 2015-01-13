import DS from 'ember-data';

export default DS.Model.extend({
	player1Name: DS.attr('string'),
	player1Score: DS.attr('number'),

	player2Name: DS.attr('string'),
	player2Score: DS.attr('number')
});
