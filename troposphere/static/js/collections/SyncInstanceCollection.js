import Backbone from "backbone";
import SyncInstance from "models/SyncInstance";
import globals from "globals";

export default Backbone.Collection.extend({
    model: SyncInstance,

    url: globals.API_V2_ROOT + "/sync_instances",

    parse: function(data) {
        return data;
    }

});

