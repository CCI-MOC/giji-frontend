import React from "react";
import BootstrapModalMixin from "components/mixins/BootstrapModalMixin";
import globals from "globals";
import LoginScreen from "components/login/LoginScreen.jsx";


export default React.createClass({
    displayName: "PublicLoginModal",

    mixins: [BootstrapModalMixin],

    render: function() {
        var buttons = (
        <button key={'Okay'}
            type="button"
            className={'btn btn-primary'}
            onClick={this.confirm}>
            {'Okay'}
        </button>
        );

        return (
        <div className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content login-modal-content">
                    <div className="modal-header">
                        {this.renderCloseButton()}
                        <h1 className="t-title">Login to Atmosphere</h1>
                    </div>
                    <div className="modal-body" style={{paddingBottom: "0px", minHeight: "350px"}}>
                        <LoginScreen login_from="public_site" />
                    </div>
                </div>
            </div>
        </div>
        );
    }

})
