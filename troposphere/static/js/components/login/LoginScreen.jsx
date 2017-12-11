import $ from "jquery";
import actions from "actions";
import globals from "globals";
import React from "react";
import Backbone from "backbone";
import ReactDOM from "react-dom";
import NotificationController from "controllers/NotificationController";
import SplashScreen from "components/SplashScreen";
import { setCookie } from "utilities/cookieHelpers";
import OpenstackLoginForm from "./OpenstackLoginForm";

export default React.createClass({
    displayName: "LoginScreen",

    //
    // Mounting & State
    // ----------------
    //

    getDefaultProps: function() {
        return {
            login_from: "application",
        };
    },
    getInitialState: function() {
        //Default with no window variables: only allows access to /login
        let loginProvider,
            loginsAllowed = window.login_auth_allowed || [{"method": "oauth-login"}];
        let identityProviders = new Backbone.Collection(loginsAllowed);
        loginProvider = identityProviders.first()
        return {
            loginProvider: loginProvider,
            identityProviders: identityProviders
        };
    },
    // High level logic
    attemptOAuthLogin: function() {
        window.location = '/login';
    },
    attemptPasswordLogin: function(username, password, onPasswordFailure) {
        actions.LoginActions.attemptPasswordLogin(
            username, password,
            this.onPasswordLogin, onPasswordFailure);
    },
    onPasswordLogin: function(username, token) {
        //1. set window.access_token
        window.access_token = token;
        setCookie("auth_token", token);

        //2. re-init SplashScreen on 'application'

        let authHeaders = {
            "Content-Type": "application/json",
            "Authorization" : "Token " + window.access_token
        }

        // Make sure the Authorization header is added to every AJAX request
        $.ajaxSetup({
            headers: authHeaders
        });
        this.renderAuthenticatedApplication();
    },
    attemptOpenstackLogin: function(username, password, projectName, provider, onLoginError) {
        actions.LoginActions.attemptOpenstackLogin(
            username, password, projectName, provider,
            this.onOpenstackLogin, onLoginError);
    },
    onOpenstackLogin: function(username, token, project_name, provider) {
        //1. set window.access_token
        window.access_token = token;
        setCookie("auth_token", token);

        //2. re-init SplashScreen on 'application'

        let authHeaders = {
            "Content-Type": "application/json",
            "Authorization" : "Token " + window.access_token
        }
        // Make sure the Authorization header is added to every AJAX request
        $.ajaxSetup({
            headers: authHeaders
        });
        let provider_uuid
        if(provider != null) {
            provider_uuid = provider.get('uuid')
        }
        var data = {username, token, project_name, provider: provider_uuid};
        this.postTokenUpdate(data)
    },
    postTokenUpdate: function(data) {
        var update_token_url = globals.API_V2_ROOT + "/token_update";
        var self = this;
        $.ajax(update_token_url, {
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: self.renderAuthenticatedApplication,
            error: function(response) {
                var errorMessage,
                    response_error = (response.responseJSON != null) ? response.responseJSON.detail : response.responseText;
                if (response.status >= 500) {
                    errorMessage = `Your login failed due to an unexpected error in the GIJI Auth Server. If you continue to see this message please email <a href='mailto:${globals.SUPPORT_EMAIL}'>${globals.SUPPORT_EMAIL}</a>.`;
                } else {
                    errorMessage = `There was an error saving new user token: ${response_error}`;
                }
                NotificationController.error("An error occured", errorMessage);
            }
        });
    },
    renderAuthenticatedApplication: function() {
        if(this.props.login_from != "application") {
            //Post Refresh will render an authenticated application
            location.reload();
        } else {
            $("#main").addClass("splash-screen");

            var SplashScreenComponent = React.createFactory(SplashScreen);
            ReactDOM.render(SplashScreenComponent(), document.getElementById("application"));
        }
    },
    // Rendering
    renderLoginMethod: function() {
        return (<OpenstackLoginForm
            attemptLogin={this.attemptOpenstackLogin}/>);
    },

    onIdentityProviderChange: function(idp) {
        this.setState({loginProvider:idp});
    },

    render: function() {
        let mainClassnames = "",
            customStyle = {};
        if (this.props.login_from == "application") {
            mainClassnames = "login-screen-master container"
        } else {
            //Renders inside a modal
            mainClassnames = "login-screen-master"
            customStyle = {
                minHeight: "0px"
            }
        }

        return (
           <div id="main-login-modal" className={mainClassnames} style={customStyle}>
                {this.renderLoginMethod()}
           </div>
        );
    }
});
