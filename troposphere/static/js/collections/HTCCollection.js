import Backbone from "backbone";
import HTC from "models/HTC";
import globals from "globals";

export default Backbone.Collection.extend({
    model: HTC,

    url: globals.API_V2_ROOT + "/htc_submit",

    parse: function(data) {
        return data;
    }

});

