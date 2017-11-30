import Backbone from "backbone";
import DataFile from "models/DataFile";
import globals from "globals";

export default Backbone.Collection.extend({
    model: DataFile,

    url: globals.API_V2_ROOT + "/dataFiles",

    parse: function(data) {
        return data;
    }

});

