import webApiAdapter from './web-api';

export default webApiAdapter.extend({
	/*host: 'http://localhost:57907',*/
	/* 
		For VM linux run 
			ember serve --proxy http://10.0.2.2:57907
	*/
	host: 'http://10.0.2.2:57907',
	//host: 'http://127.0.0.1:57907', 
	namespace: 'api'
});
 