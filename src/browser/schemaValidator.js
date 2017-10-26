var validator = validator || {};
(function() {
  var SCHEMAMODEL = "model"; //Schema root.
  var SCHEMAREQUIRED = "required"; //Boolean.
  var SCHEMATYPE = "type"; //String with data type.
  var SCHEMALENGTH = "length"; //Length of key, it can be given as int or as "[min-max]".
  var SCHEMADATA = "data"; //Child nodes.
  var SCHEMAALLOWUNKNOWN = "allowUnknown"; //Does schema node accept data not declared.
  var SCHEMAREGEX = "regex"; //Regex for a node.
  var RANGEREGEX = new RegExp("\\[\\d+\\-\\d+\\]");

  // Exceptions

  /**
   * Validation exception.
   * @param       {[type]} sMessage [description]
   * @constructor
   */
  function ValidationException(sMessage) {
    this.name = "ValidationException";
    this.message = sMessage;
    this.stack = new Error().stack;
  }
  ValidationException.prototype = Object.create(Error.prototype);
  ValidationException.prototype.constructor = ValidationException;

  function NotAcceptableException(sMessage) {
    this.name = "NotAcceptableException";
    this.message = sMessage;
    this.stack = new Error().stack;
  }
  NotAcceptableException.prototype = Object.create(Error.prototype);
  NotAcceptableException.prototype.constructor = NotAcceptableException;

  /**
   * Validate a json from its schema
   * @param  {[type]} json       [description]
   * @param  {[type]} jsonSchema [description]
   * @return {[type]}            [description]
   */
  this.validate = function(json, jsonSchema) {
    try {
      jsonSchema = JSON.parse(jsonSchema);
      if (jsonSchema[SCHEMAMODEL]) {
        if (typeof jsonSchema[SCHEMAMODEL] == "object") {
          validateModel(JSON.parse(json), jsonSchema[SCHEMAMODEL]);
        } else {
          throw new NotAcceptableException(SCHEMAMODEL + " cast exception.");
        }
      } else {
        throw new ValidationException("Not found schema root model.");
      }
    } catch (e) {
      if (e instanceof ValidationException) {
        console.log(e.message);
      } else if (e instanceof NotAcceptableException) {
        console.log(e.message);
      }
    }
  };

  /**
   * Validate model. Mode is an object in the schema, it can be root node or an object inside it.
   * @param  {[type]} json  [description]
   * @param  {[type]} model [description]
   * @return {[type]}       [description]
   */
  function validateModel(json, model) {
    var schemaKeys = [];
    for (var keyInSchema in model) {
      schemaKeys.push(keyInSchema);
    }
    // Check if foreing keys are allowed.
    if (!model[SCHEMAALLOWUNKNOWN]) {
      // TODO ensure that null and false enter here.
      checkUnknown(json, schemaKeys);
    }
    for (var schemaKeyI = 0; schemaKeyI < schemaKeys.length; schemaKeyI++) {
      var node = null;
      var schemaKey = schemaKeys[schemaKeyI];
      if (json[schemaKey]) {
        node = json[schemaKey];
      }
      if (!isReservedWord(schemaKey)) {
        validateNode(node, model[schemaKey], schemaKey);
      }
    }
  }

  function validateNode(node, schema, key) {
    if (isRequired(schema) && node === null) {
      throw new ValidationException("Key " + key + " not found.");
    } else if (node != null) {
      var type = schema[SCHEMATYPE];
      if (!type) {
        throw new ValidationException(
          SCHEMATYPE + " not found at schema for key: " + key
        );
      } else {
        switch (type) {
          case "object":
            validateObject(node, schema, key);
            break;
          case "array":
            validateArray(node, schema, key);
            break;
          case "string":
            validateString(node, schema, key);
            break;
          case "number":
            validateNumber(node, schema, key);
            break;
          case "boolean":
            validateBoolean(node, key);
            break;
          default:
            throw new ValidationException("Unrecognized type for key " + key);
        }
      }
    }
  }

  /**
   * Check if a key is required by schema
   * @param  {[type]}  schema [description]
   * @return {Boolean}        [description]
   */
  function isRequired(schema) {
    var required = false;
    if (schema[SCHEMAREQUIRED]) {
      try {
        required = schema[SCHEMAREQUIRED];
        if (typeof required != "boolean") {
          throw new ValidationException(
            schema[SCHEMAREQUIRED] + " cast exception."
          );
        }
      } catch (e) {
        throw new ValidationException(
          schema[SCHEMAREQUIRED] + " cast exception."
        );
      }
    }
    return required;
  }

  /**
   * Check if the key is a reserved word to skip it.
   * @param  {[type]}  key [description]
   * @return {Boolean}     [description]
   */
  function isReservedWord(key) {
    return key === SCHEMAALLOWUNKNOWN;
  }

  /**
   * Check for unknown keys
   * @param  {[type]} json       [description]
   * @param  {[type]} schemaKeys [description]
   * @return {[type]}            [description]
   */
  function checkUnknown(json, schemaKeys) {
    var jsonKeys = [];
    for (var k in json) {
      if (schemaKeys.indexOf(k) === -1) {
        throw new ValidationException(
          "The key: " +
            k +
            " is not declared in the schema. Declare it or allow unknown keys."
        );
      }
    }
  }

  /**
   * Validate an object node
   * @param  {[type]} node   [description]
   * @param  {[type]} schema [description]
   * @param  {[type]} key    [description]
   * @return {[type]}        [description]
   */
  function validateObject(node, schema, key) {
    if (typeof node == "object") {
      try {
        validateModel(node, schema[SCHEMADATA]);
      } catch (e) {
        throw new ValidationException(e.message + " at " + key + ".");
      }
    } else {
      throw new ValidationException("Expected object for " + key);
    }
  }

  /**
   * Validate an array node.
   * @param  {[type]} node   [description]
   * @param  {[type]} schema [description]
   * @param  {[type]} key    [description]
   * @return {[type]}        [description]
   */
  function validateArray(node, schema, key) {
    if (Array.isArray(node)) {
      if (schema[SCHEMALENGTH]) {
        checkLength(node.length, schema, key);
      }
      for (var arrayI = 0; arrayI < node.length; arrayI++) {
        try {
          validateNode(node[arrayI], schema[SCHEMADATA], "");
        } catch (e) {
          throw new ValidationException(
            e.message + key + " position " + arrayI
          );
        }
      }
    } else {
      throw new ValidationException("Expected array for " + key);
    }
  }

  /**
   * Validate a number node
   * @param  {[type]} node   [description]
   * @param  {[type]} schema [description]
   * @param  {[type]} key    [description]
   * @return {[type]}        [description]
   */
  function validateNumber(node, schema, key) {
    if (isNaN(parseFloat(node)) || !isFinite(node)) {
      throw new ValidationException("Expected number for " + key);
    }
    if (schema[SCHEMAREGEX]) {
      checkRegex(node, schema, key);
    }
  }

  function validateString(node, schema, key) {
    if (typeof node !== "string") {
      throw new ValidationException("Expected string for " + key);
    }
    if (schema[SCHEMAREGEX]) {
      checkRegex(node, schema, key);
    }
  }

  /**
   * Check if node is boolean
   * @param  {[type]} node [description]
   * @param  {[type]} key  [description]
   * @return {[type]}      [description]
   */
  function validateBoolean(node, key) {
    if (typeof node !== "boolean") {
      throw new ValidationException("Expected boolean for " + key);
    }
  }

  /**
   * Check that an array fit its lenght
   * @param  {[type]} size   [description]
   * @param  {[type]} schema [description]
   * @param  {[type]} key    [description]
   * @return {[type]}        [description]
   */
  function checkLength(size, schema, key) {
    //Check if it is an int
    if (Number.isInteger(schema[SCHEMALENGTH])) {
      if (size != schema[SCHEMALENGTH]) {
        throw new ValidationException("Size of " + key + " is not correct.");
      }
    } else if (typeof schema[SCHEMALENGTH] == "string") {
      if (
        size < getMin(schema[SCHEMALENGTH], key) ||
        size > getMax(schema[SCHEMALENGTH], key)
      ) {
        throw new ValidationException("Size of " + key + " is not correct.");
      }
    } else {
      throw new ValidationException(SCHEMALENGTH + " cast exception: " + key);
    }
  }

  /**
   * Get min of an array lenght [min-max]
   * @param  {[type]} range [description]
   * @param  {[type]} key   [description]
   * @return {[type]}       [description]
   */
  function getMin(range, key) {
    if (!RANGEREGEX.test(range)) {
      throw new NotAcceptableException("Length bad formated at " + key);
    } else {
      var start = range.indexOf("[");
      var last = range.indexOf("-");
      if (start != -1 && last > start) {
        var min = parseInt(range.substring(start + 1, last));
        return min;
      }
      throw new NotAcceptableException("Length bad formated at " + key);
    }
  }

  /**
   * Get max of an array lenght [min-max]
   * @param  {[type]} range [description]
   * @param  {[type]} key   [description]
   * @return {[type]}       [description]
   */
  function getMax(range, key) {
    if (!RANGEREGEX.test(range)) {
      throw new NotAcceptableException("Length bad formated at " + key);
    } else {
      var start = range.indexOf("-");
      var last = range.indexOf("]");
      if (start != -1 && last > start) {
        var max = parseInt(range.substring(start + 1, last));
        return max;
      }
      throw new NotAcceptableException("Length bad formated at " + key);
    }
  }

  /**
   * Check regex.
   * @param  {[type]} node   [description]
   * @param  {[type]} schema [description]
   * @param  {[type]} key    [description]
   * @return {[type]}        [description]
   */
  function checkRegex(node, schema, key) {
    try {
      schema[SCHEMAREGEX].test(node);
    } catch (e) {
      throw new ValidationException(key + " doesn't match its regex.");
    }
  }
}.apply(validator));
