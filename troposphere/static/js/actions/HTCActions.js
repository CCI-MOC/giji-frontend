import NotificationController from "controllers/NotificationController";
import globals from "globals";
import $ from "jquery";

export default {

    upload: function(params) {
        if (!params.file)
            throw new Error("Missing files");

        var file = params.file;

        var formdata = new FormData();
        formdata.append('file', file[0]);

        var request_url = globals.API_ROOT + "/htc_upload/" + file[0].name;

        $.ajax({
            url: request_url,
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            type: 'PUT',
            success: function(data){
                NotificationController.success(null, "Successfuly Uploaded");
            },
            error: function(data){
                NotificationController.error(null, "Uploaded Failed");
            }
        });

    },
};
