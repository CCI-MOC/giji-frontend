import React from "react";
import { Link } from "react-router";

import Glyphicon from "components/common/Glyphicon";
import context from "context";

export default React.createClass({
    displayName: "SecondaryDataverseNavigation",

    updateState: function() {
        this.forceUpdate();
    },

    renderRoute: function(name, linksTo, icon, requiresLogin) {
        if (requiresLogin && !context.hasLoggedInUser()) return null;

        return (
            <li key={name}>
                <Link to={`/dataverse/${linksTo}`} activeClassName="active">
                    <Glyphicon name={icon} />
                    <span>{name}</span>
                </Link>
            </li>
        )
    },

    render: function() {
        let userLoggedIn = context.hasLoggedInUser();

        let routes;
        if (!userLoggedIn) {
            routes = [
            ];
        } else {
            routes = [
                this.renderRoute("Plugins", "plugins", "wrench", true),
                this.renderRoute("Big Data Analytics", "big-data-analytics", "film", true),
                this.renderRoute("MPC", "multiparty", "lock", true),

            ];
        }

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

