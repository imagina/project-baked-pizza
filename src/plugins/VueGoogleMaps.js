import * as VueGoogleMaps from "vue2-google-maps";

export default ({ Vue }) => {
	Vue.use(VueGoogleMaps, {
	  load: {
	    key: env('GOOGLE_APY_KEY'),
	    libraries: "places" // necessary for places input
	  }
	});
}



