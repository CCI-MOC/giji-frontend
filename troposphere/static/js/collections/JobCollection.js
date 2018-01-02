import Backbone from "backbone";
import Job from "models/Job";
import globals from "globals";

export default Backbone.Collection.extend({
    model: Job,

    url: globals.API_V2_ROOT + "/sahara_job",

    parse: function(data) {
        return data;
    }

});
