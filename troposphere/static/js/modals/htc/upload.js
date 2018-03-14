import actions from "actions";
import ModalHelpers from "components/modals/ModalHelpers";

import HTCModal from "components/modals/htc/HTCModal";

export default {

    upload: function(sizes) {

        ModalHelpers.renderModal(HTCModal, null, function(identity, file) {
            actions.HTCActions.upload({
                identity,
                file
            });
        });
    }
};
