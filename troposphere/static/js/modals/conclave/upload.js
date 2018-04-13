import actions from "actions";
import ModalHelpers from "components/modals/ModalHelpers";

import ConclaveUploadModal from "components/modals/conclave/ConclaveUploadModal";

export default {

    upload: function() {

        ModalHelpers.renderModal(ConclaveUploadModal, null, function(identity, file) {
            actions.ConclaveActions.upload({
                identity,
                file
            });
        });
    }
};
