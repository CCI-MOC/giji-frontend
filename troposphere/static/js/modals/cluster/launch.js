import actions from "actions";
import ModalHelpers from "components/modals/ModalHelpers";
import ClusterLaunchModal from "components/modals/cluster/ClusterLaunchModal";

export default {

    launch: function(sizes) {
        var props = {
            sizes: sizes
        };

        ModalHelpers.renderModal(ClusterLaunchModal, props, function(identity, pluginName, clusterName, clusterSize, workerNum, clusterStatus) {
            actions.ClusterActions.launch({
                identity,
                pluginName,
                clusterName,
                clusterSize,
                workerNum,
                clusterStatus
            });
        });
    }
};
