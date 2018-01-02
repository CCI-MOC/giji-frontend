import $ from "jquery";
import NotificationController from "controllers/NotificationController";
import globals from "globals";
import Utils from "./Utils";
import Constants from "constants/JobLaunchConstants";
import Job from "models/Job";


export default {

    jobLaunch: function(params) {
        if (!params.typeName)
            throw new Error("Missing Type Name");
        if (!params.jobName)
            throw new Error("Missing Job Name");


        var identity = params.identity,
            clusterName = params.clusterName,
            typeName = params.typeName,
            jobName = params.jobName,
            inputPath = params.inputPath,
            outputPath = params.outputPath,
            locationSearch = window.location.search;

        var containerName = locationSearch.toString().split('=')[1];

        let job = new Job({
            identity: identity,
            clusterName: clusterName,
            typeName: typeName,
            jobName: jobName,
            jobStatus: "Submitting",
        });

        Utils.dispatch(Constants.ADD, {
            job: job
        });

        var data = {
            identity: identity,
            clusterName: clusterName,
            typeName: typeName,
            jobName: jobName,
            inputPath: inputPath,
            outputPath: outputPath,
            containerName: containerName,
        };


        var requestUrl = globals.API_V2_ROOT + "/sahara_job";

        $.ajax(requestUrl, {
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(data) {
                NotificationController.info("Job Submitted");
                job.set({jobStatus: 'Submitted'});
                Utils.dispatch(Constants.UPDATE, {
                    job: job
                });
            },
            error: function(response) {
                var errorMessage,
                    response_error = response.responseJSON.detail;
                if (response.status >= 500) {
                    errorMessage = "This is a >=500 error. Please contact Lucas";
                } else {
                    errorMessage = "There was an error launching your job: " + response_error;
                }
                NotificationController.error("Launch Job error", errorMessage);
            }
        });
    }

};
