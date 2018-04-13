import Backbone from "backbone";
import DataSource from "models/DataSource";
import globals from "globals";

export default Backbone.Collection.extend({
    model: DataSource,

    url: globals.API_V2_ROOT + "/conclave_data",

    parse: function(data) {
        return data;
    }

});
