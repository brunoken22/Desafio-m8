const MAPBOX_TOKEN =
  'pk.eyJ1IjoibWFyY29zcmV1cXVlbiIsImEiOiJja3UxbXBzbHQzejJvMnBwcW4yN3pqemZuIn0.z65srWhOb5sS3GilPljOpw';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
mapboxgl.accessToken = MAPBOX_TOKEN;
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  countries: 'ar',
  language: 'es',
  placeholder: 'Ej: "Obelisco, Buenos Aires"',
  marker: false,
});

function initMapbox(mapElement: HTMLElement, ubi: any) {
  return new mapboxgl.Map({
    container: mapElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: ubi || [-58.3873263, -34.6045776],
    zoom: 10,
    dragPan: true,
    cooperativeGestures: true,
    scrollZoom: true,
  });
}

export {initMapbox, geocoder};
