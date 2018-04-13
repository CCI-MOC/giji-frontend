import actions from "actions";
import ModalHelpers from "components/modals/ModalHelpers";

import ConclaveSubmitModal from "components/modals/conclave/ConclaveSubmitModal";

export default {

    submit: function(data) {
        var props = {
            data:data
        };

        ModalHelpers.renderModal(ConclaveSubmitModal, props, function(identity, file, dataFiles) {
            actions.ConclaveActions.submit({
                identity,
                file,
                dataFiles
            });
        });
    }
};
