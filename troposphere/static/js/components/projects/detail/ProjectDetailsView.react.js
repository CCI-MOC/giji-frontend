/** @jsx React.DOM */

define(
  [
    'react',
    'backbone',
    './ProjectNavigation.react',
    './SubMenu.react'
  ],
  function (React, Backbone, ProjectNavigation, SubMenu) {

    return React.createClass({

      propTypes: {
        project: React.PropTypes.instanceOf(Backbone.Model).isRequired,
        children: React.PropTypes.component.isRequired
      },

      render: function () {
        return (
          <div className="project-details">
            <ProjectNavigation project={this.props.project}/>
            <div className="container">
              <table>
                <tbody>
                  <tr>
                    <td className="td-sub-menu">
                      <SubMenu/>
                    </td>
                    <td className="td-project-content">
                      {this.props.children}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      }

    });

  });
