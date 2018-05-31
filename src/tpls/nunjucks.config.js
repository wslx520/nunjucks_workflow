module.exports = function(environment) {
    environment.addFilter('slug', function(str) {
      return str && str.replace(/\s/g, '-', str).toLowerCase();
    });
  
    environment.addGlobal('globalTitle', 'My global title');
    return environment;
  }