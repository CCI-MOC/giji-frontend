import NotificationController from "controllers/NotificationController";
import globals from "globals";
import $ from "jquery";
import HTCConstants from "constants/HTCConstants";
import Utils from "./Utils";
import HTC from "models/HTC";

export default {

    upload: function(params) {
        if (!params.file)
            throw new Error("Missing files");

        var identity = params.identity,
            file = params.file;

        var formdata = new FormData();
        formdata.append('file', file[0]);

        console.log(file);
        var request_url = globals.API_ROOT + "/htc_upload/" + file[0].name;
        console.log(formdata);

        $.ajax({
            url: request_url,
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            type: 'PUT',
            success: function(data){
                NotificationController.success(null, "Job Script File Uploaded");
            },
            error: function(data){
                NotificationController.error(null, "NO Uploaded");
            }
        });

    },

    uploadData: function(params) {
        if (!params.file)
            throw new Error("Missing Data files");

        var identity = params.identity,
            file = params.file;

        var formdata = new FormData();
        formdata.append('file', file[0]);

        console.log(file);
        var request_url = globals.API_ROOT + "/htc_upload_data/" + file[0].name;
        console.log(formdata);

        $.ajax({
            url: request_url,
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            type: 'PUT',
            success: function(data){
                NotificationController.success(null, "Data File Uploaded");
            },
            error: function(data){
                NotificationController.error(null, "NO Uploaded");
            }
        });

    },

    submit: function(params) {
        if (!params.file)
            throw new Error("Missing Files");
        if (!params.data)
            throw new Error("Missing Data");

        var identity = params.identity,
            file = params.file,
            data = params.data;


        let htcjob = new HTC({
            identity: identity,
            file: file,
            data: data
        });

        Utils.dispatch(HTCConstants.ADD_HTC, {
            htcjob: htcjob
        });

        var sendData = {
            identity: identity,
            file: file,
            data: data,

        };

        var requestUrl = globals.API_V2_ROOT + "/htc_submit";

        $.ajax(requestUrl, {
            type: "POST",
            data: JSON.stringify(sendData),
            dataType: "json",
            contentType: "application/json",
            success: function(sendData) {
                var jobID = sendData["submit_batch_job"];
                NotificationController.info("Batch Job " + jobID + " Submitted");
            },
            error: function(response) {
                NotificationController.error("Error submitting the job");
            }
        });

    },
};


