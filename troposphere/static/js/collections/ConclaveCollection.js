import Backbone from "backbone";
import Conclave from "models/Conclave";
import globals from "globals";

export default Backbone.Collection.extend({
    model: Conclave,

    url: globals.API_V2_ROOT + "/conclave_uploads",

    parse: function(data) {
        return data;
    }

});
