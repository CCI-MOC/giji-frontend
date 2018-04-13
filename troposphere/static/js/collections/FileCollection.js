import Backbone from "backbone";
import File from "models/File";
import globals from "globals";

export default Backbone.Collection.extend({
    model: File,

    url: globals.API_V2_ROOT + "/conclave_files",

    parse: function(data) {
        return data;
    }

});
