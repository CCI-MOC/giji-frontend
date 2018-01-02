import React from "react";
import context from "context";
import openstack from "themeImages/openstack-large.png";
import dataverse from "themeImages/dataverse-large.png";
import openshift from "themeImages/openshift-large.png";


export default React.createClass({
    displayName: "AboutPage",

    render: function() {
    var hasLoggedInUser = context.hasLoggedInUser();
    return (
        <div style={{paddingTop: "50px"}} className="container">
            <h1 className="t-display-1">About GIJI</h1>
            <div>
                <p>
                {"The Massachusetts Open Cloud (MOC) needs a simple intuitive GUI for its public cloud marketplace. Our goal is to provide a tool to enhance the user experience by automating mundane but complicated steps to use cloud resources as well as presenting to our users all available cloud services including but not limited to network routing and ability to choose between virtual machine (OpenStack instances) and container technologies. "}
                </p>
                <p>
                {"OpenStack Horizon is inadequate to serve naive users who lack basic cloud knowledge and to whom the cloud is simply a tool to get computing results for their scientific research for example. This MOC marketplace GUI serves to be a simpler tool streamlining the cloud experience. It can be used by itself or alongside Horizon. Developing a new GUI from scratch can be both time-consuming and challenging. A collaboration with the Cyverse’s Atmosphere/Troposphere project has helped accelerate the development of the MOC GUI."}
                </p>
                <p>
                {"Currently, we provide the following services:"}
                </p>
                <br />
                <div id="dashboard-view">
                    <div className="row calls-to-action">
                        <div className="col-md-4 col-sm-12 center-block text-center">
                            <img src={openstack} />
                            <p>{"OpenStack is a set of software tools for building and managing cloud computing platforms for public and private clouds."}</p>
                        </div>
                        <div className="col-md-4 col-sm-12 center-block text-center">
                            <img src={dataverse} />
                            <p>{"The main focus of the Cloud Dataverse Project is to provide a platform for computing on datasets that are stored in OpenStack Swift Storage."}</p>
                        </div>
                        <div className="col-md-4 col-sm-12 center-block text-center">
                            <img src={openshift} />
                            <p>{"OpenShift is RedHat's cloud development Platform as a Service (PaaS). The free and open source cloud-based platform allows developers to create, test and run their applications and deploy them to the cloud."}</p>
                        </div>
                    </div>
                </div>
                {!hasLoggedInUser ? <p>{"Please login and choose the service you would like to use in the marketplace page"}</p> : <p></p>}
            </div>
        </div>
        );
    }
});
