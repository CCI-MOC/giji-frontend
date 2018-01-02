import Backbone from "backbone";
import SaharaPlugin from "models/SaharaPlugin";
import globals from "globals";

export default Backbone.Collection.extend({
    model: SaharaPlugin,

    url: globals.API_V2_ROOT + "/sahara_plugins",

    parse: function(data) {
        return data;
    }

});
