import React from "react";


export default React.createClass({
    displayName: "MixMatchPage",

    render: function() {

    return (
        <div style={{paddingTop: "50px"}} className="container">
            <h1 className="t-display-1">MOC Mix and Match Resource Federation</h1>
            <div>
                <p>
                    {"Comming soon! For now, please go to"}<a href={"https://massopen.cloud/blog/mixmatch-federation/"} target="_blank"> {"MOC webside"}</a> {"and"} <a href={"https://github.com/openstack/mixmatch"} target="_blank"> {"Github"}</a> {"for more details"}
                </p>

            </div>
        </div>
        );
    }
});
