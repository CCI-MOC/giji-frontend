import actions from "actions";
import ModalHelpers from "components/modals/ModalHelpers";

import HTCUploadModal from "components/modals/htc/HTCUploadModal";

export default {

    uploadData: function() {

        ModalHelpers.renderModal(HTCUploadModal, null, function(identity, file) {
            actions.HTCActions.uploadData({
                identity,
                file
            });
        });
    }
};


