import Ember from 'ember';
import DataRoute from 'ember-data-route/mixins/data-route';

export default Ember.Route.extend(DataRoute, {
  model: function () {
    return this.store.createRecord('hunt');
  },

  willTransitionConfirm: function() {
    return window.confirm('You have unsaved changes that will be lost. Do you want to continue?');
  },

  actions: {
    create: function (model) {
      var self = this;

      Ember.RSVP.all([model.get('items').invoke('save'), model.save()])
        .then(function (data) {
          console.log(data);
          self.transitionTo('hunt', data[1].id);
        }, function (error) {
          console.error(error);
        });
    },

    addItem: function (model) {
      var items = model.get('items');
      var item = this.store.createRecord('item', {
        location: [40, -70],
        clue: '',
        description: items.get('length') + 1
      });

      model.get('items').addObject(item);
    }
  }
});
