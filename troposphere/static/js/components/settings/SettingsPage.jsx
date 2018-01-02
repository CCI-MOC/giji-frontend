import React from "react";

import SecondarySettingNavigation from "./common/SecondarySettingNavigation";


export default React.createClass({
    displayName: "SettingMaster",

    render: function() {
        return (
            <div>
                <SecondarySettingNavigation currentRoute="todo-remove-this" />
                {this.props.children}
            </div>
        );
    }
})
