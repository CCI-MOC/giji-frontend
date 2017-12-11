import React from "react";


export default React.createClass({
    displayName: "PluginPage",

    style() {
        return {
            td: {
                wordWrap: "break-word",
                whiteSpace: "normal"
            }
        }
    },

    render: function() {
        let { td } = this.style();

        return (
            <div className="container">
                <h1 className="t-display-1">Plugins</h1>
                <div>
                    <h2 className="t-title">Sahara Plugins</h2>
                </div>
                <div>
                    <table className="clearfix table" style={{ tableLayout: "fixed" }}>
                        <thead>
                        <tr>
                            <th style={{ width: "30px"}}>Plugin Name</th>
                            <th style={{ width: "30px"}}>Version</th>
                            <th style={{ width: "60px"}}>Description</th>
                            <th style={{ width: "10px"}}></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={td}>
                                {"Vanilla Apache Hadoop"}

                            </td>
                            <td style={td}>
                                {"2.7.1"}

                            </td>
                            <td style={td}>
                                {"The Apache Vanilla plugin provides the ability to launch upstream Vanilla Apache Hadoop cluster without any management consoles. It can also deploy the Oozie component."}

                            </td>
                        </tr>
                        <tr>
                            <td style={td}>
                                {"Apache Spark"}
                            </td>
                            <td style={td}>
                                {"1.6.0"}

                            </td>
                            <td style={td}>
                                {"This plugin provides an ability to launch Spark on Hadoop CDH cluster without any management consoles."}

                            </td>
                        </tr>
                        <tr>
                            <td style={td}>

                                {"Apache Storm"}
                            </td>
                            <td style={td}>

                                {"1.0.1"}
                            </td>
                            <td style={td}>

                                {"This plugin provides an ability to launch Storm cluster without any management consoles."}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
});
