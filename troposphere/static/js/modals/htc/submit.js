import actions from "actions";
import ModalHelpers from "components/modals/ModalHelpers";

import SubmitHTCModal from "components/modals/htc/HTCSubmitModal";

export default {

    submit: function() {

        ModalHelpers.renderModal(SubmitHTCModal, null, function(identity, file, data) {
            actions.HTCActions.submit({
                identity,
                file,
                data
            });
        });
    }
};

