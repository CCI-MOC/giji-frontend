import Backbone from "backbone";
import FileDirectory from "models/FileDirectory";
import globals from "globals";

export default Backbone.Collection.extend({
    model: FileDirectory,

    url: globals.API_V2_ROOT + "/files",

    parse: function(data) {
        return data;
    }

});

