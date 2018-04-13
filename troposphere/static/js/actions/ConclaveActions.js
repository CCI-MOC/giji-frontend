import NotificationController from "controllers/NotificationController";
import globals from "globals";
import $ from "jquery";
import Conclave from "models/Conclave";
import ConclaveConstants from "constants/ConclaveConstants";
import Utils from "./Utils";


export default {

    upload: function(params) {
        if (!params.file[0])
            throw new Error("Missing files");

        var file = params.file;

        var formdata = new FormData();
        formdata.append('file', file[0]);

        var request_url = globals.API_ROOT + "/conclave_upload/" + file[0].name;

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

    submit: function(params) {
        if (!params.file)
            throw new Error("Missing Files");
        if (!params.dataFiles)
            throw new Error("Missing Data");

        var identity = params.identity,
            file = params.file,
            dataFiles = params.dataFiles;

        let Conclavejob = new Conclave({
            identity: identity,
            file: file,
            dataFiles: dataFiles
        });

        var sendData = {
            identity: identity,
            file: file,
            dataFiles: dataFiles,

        };

        var requestUrl = globals.API_V2_ROOT + "/conclave_submit";

        $.ajax(requestUrl, {
            type: "POST",
            data: JSON.stringify(sendData),
            dataType: "json",
            contentType: "application/json",
            success: function(sendData) {
                NotificationController.info("Conclave Job Submitted");
            },
            error: function(response) {
                NotificationController.error("Error submitting the job");
            }
        });
    },
};

