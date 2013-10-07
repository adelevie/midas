// App
window.Application      = window.Application || {};

Application.AppModule   = {};
Application.Controller  = {};
Application.Component   = {};

// Events
window.entities = { request: {} };
rendering       = {}

// Cache user
$.ajax({
  url: '/user',
  type: 'GET',
  success: function (data) {
    window.cache = {
      currentUser: data
    }
  }
});

define([
  'underscore',
  'backbone',
  'apps_router'
], function (_, Backbone, AppsRouter) {

  Application = {

    started: null,

    // Initialize and fire up the application.
  	initialize: function () {
      var self = this;

      // Mixin backbone events into our pub sub handler
      _.extend(entities.request, Backbone.Events);

      // Mixin backbone events into our rendering event handler
      _.extend(rendering, Backbone.Events);

      if (this.started) {
        self.started = false;
        this.application.initialize();
      } else {
        this.application = AppsRouter.initialize();
        self.started = true;
      }
  	}
  }

  // Backbone Multi-tenant router firing up.
  Application.initialize();
});