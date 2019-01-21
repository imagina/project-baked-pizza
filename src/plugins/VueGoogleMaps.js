import * as VueGoogleMaps from "vue2-google-maps";

export default ({ Vue }) => {
	Vue.use(VueGoogleMaps, {
	  load: {
	    key: env('KEY_GOOGLE_MAPS'),
	    libraries: "places" // necessary for places input
	  }
	});
}



