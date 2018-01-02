import React from "react";
import { Link } from "react-router";

import Glyphicon from "components/common/Glyphicon";
import context from "context";
import stores from "stores";


export default React.createClass({
    displayName: "SecondarySettingNavigation",

    updateState: function() {
        this.forceUpdate();
    },

    componentDidMount: function() {
        stores.SSHKeyStore.addChangeListener(this.updateState);

    },

    componentWillUnmount: function() {
        stores.SSHKeyStore.removeChangeListener(this.updateState);

    },

    renderRoute: function(name, linksTo, icon, requiresLogin) {
        if (requiresLogin && !context.hasLoggedInUser()) return null;

        return (
            <li key={name}>
                <Link to={`/settings/${linksTo}`}
                      activeClassName="active">
                    <Glyphicon name={icon} />
                    <span>{name}</span>
                </Link>
            </li>
        )
    },

    render: function() {
        let routes;

            routes = [
                this.renderRoute("OpenStack Settings", "openstack-settings", "cloud", true),
            ];

        return (
            <div>
                <div className="secondary-nav">
                    <div className="container">
                        <ul className="secondary-nav-links">
                            {routes}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

