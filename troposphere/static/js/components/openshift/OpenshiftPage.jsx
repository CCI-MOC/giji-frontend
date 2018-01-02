import React from "react";


export default React.createClass({
    displayName: "OpenShiftPage",

    render: function() {

    return (
        <div style={{paddingTop: "50px"}} className="container">
            <h1 className="t-display-1">MOC OpenShift</h1>
            <div>
                <p>{"On top of our OpenStack service, the MOC and Red Hat have just started offering an OpenShift service. OpenShift offers users a self-scaling container platform with support for anything that can be containerized including web frameworks, databases, and messaging queues. In seconds, one can spin up new containers along with rich Continuous Integration and Continuous Deployment capabilities built in. "}
                </p>
                <p>
                    {"To use MOC OpenShift service, please go to"}<a href={"https://openshift.massopen.cloud/"} target="_blank"> {"MOC OpenShift"}</a>
                </p>
                <p>
                    {"To learn more about OpenShift, please go to"}<a href={"https://www.openshift.com/about/"} target="_blank"> {"OpenShift"}</a>
                </p>
            </div>
        </div>
        );
    }
});
