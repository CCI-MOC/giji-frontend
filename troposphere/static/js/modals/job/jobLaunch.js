import actions from "actions";
import ModalHelpers from "components/modals/ModalHelpers";

import JobLaunchModal from "components/modals/job/JobLaunchModal";

export default {

    jobLaunch: function() {
        ModalHelpers.renderModal(JobLaunchModal, null, function(identity, clusterName, typeName, jobName, inputPath, outputPath, jobStatus) {

            actions.JobActions.jobLaunch({
                identity,
                clusterName,
                typeName,
                jobName,
                inputPath,
                outputPath,
                jobStatus
            });
        });
    }
};
