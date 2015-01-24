import Ember from 'ember';

export default Ember.Object.extend({
  map: null,

  initMap: function (options) {
    var $container = Ember.$('<div/>');
    var map;

    options = options || {};

    $container.attr('id', options.containerId || 'map');
    map = L.map($container.get(0), {
      center: new L.LatLng(41.80408, -72.47131),
      zoom: 5
    });

    L.Icon.Default.imagePath = 'assets/images';
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.set('map', map);
    this.set('$container', $container);
  }.on('init'),

  attachTo: function ($el) {
    var $container = this.get('$container');
    var map = this.get('map');

    $container.appendTo($el);
    map.invalidateSize(true);
  }
});
