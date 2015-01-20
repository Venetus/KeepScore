import DS from 'ember-data';
import Ember from 'ember';
/**
  The default Implementation of .net webapi returns
    ´´´
      [{obj1:obj1_val},{obj2:obj2_val}]
    ´´´
  Ember expects
    ´´´
      { 
        typeKey : [{obj1:obj1_val},{obj2:obj2_val}]
      }
    ´´´
*/
export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {

  extractArray: function(store, type, payload) {
    console.log("Serializer called: ExtractArray");
    var newHash = {};

    newHash[Ember.String.pluralize(type.typeKey)] = payload;
    payload = newHash;
    var returnObject = this._super(store, type, payload);
    return returnObject ;
  },

  extractSingle: function(store, type, payload, recordId){
    console.log("Serializer called: ExtractSingle");
    var newHash = this.addRootToHash(type, payload);

    return this._super(store, type, newHash, recordId);
  },

  normalize: function(type, hash, prop){
    console.log("Serializer called: normalize");

    var newHash = {};
    //Makes all the props camelized like Ember Expects them.
    for(var property in hash){
        newHash[property.camelize()] = hash[property];
    }

    return this._super(type, newHash, prop);
  },

  /**
   Overrided method
  */
  normalizePayload: function(originalPayload) {
    console.log("Serializer called: normalizePayload"); 

    //add camelize properties first!
    var payload = this.camelizeProperties(originalPayload);
    
     
    payload = this._super(payload);
     
    return payload;
  },



  //Own function
  
  addRootToHash: function(type, hash){
    var newHash = {};
    if(Ember.typeOf(hash[type.typeKey.capitalize()]) === "undefined"){
      newHash[type.typeKey] = hash;
    }else{
      newHash = hash;
    }

    return newHash;
  },


  camelizeProperties: function(payload){
    var camelizedProperties = {};
    var serializer = this;

    //If the payload is an array
    if(Ember.typeOf(payload) === 'array'){
      camelizedProperties = Ember.A();
      //If an array is sent, recursevily camelizes all objects
      payload.forEach(function(obj){
        if(Ember.typeOf(obj) === 'object'){
          camelizedProperties.pushObject(serializer.camelizeProperties(obj));  
        }
      });
    }
    
    //if the payload is an object
    else if(Ember.typeOf(payload) === 'object') {
      //Loop through properties
      for (var prop in payload){
        var propVal = payload[prop];

        if(propVal){
            propVal = serializer.camelizeProperties(propVal)  ;
        } 
        camelizedProperties[prop.camelize()] = propVal;

      }
    }

    else {
      return payload;
    }

    return camelizedProperties;
  },


  /**
  Removes the root element. 
  Instead of delivering 
    { gallery : { props : propsvals }}
  it delivers 
    {props: propsvals}
  and always includes the Id
  */
  serializeIntoHash: function(hash, type, record){
    console.log("Serializer called: serializeIntoHash");
    //Ember.merge(hash, this.serialize(record, options));
    //Always includes Id
    
    Ember.merge(hash, this.serialize(record, {includeId : true}));
    //this._super(hash, type, record, options);
  },


  //Might have to be in specific serializers
  serializeHasMany: function(record, json, relationship){
    console.log("Galleries Serializer: SerializeHasMany");
    var key = relationship.key,
          hasManyRecords = Ember.get(record, key),
          attrs = Ember.get(this, 'attrs'),
          embed = attrs && attrs[key] && attrs[key].embedded === 'always';
       
      // Embed hasMany relationship if records exist
      if (hasManyRecords && embed) {
          json[key] = [];
          hasManyRecords.forEach(function(item){
              json[key].push(item.serialize());
          });
      }
      // Fallback to default serialization behavior
      else {
          return this._super(record, json, relationship);
      }
  }

});