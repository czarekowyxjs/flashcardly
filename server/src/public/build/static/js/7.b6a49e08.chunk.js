(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{126:function(e,t,a){"use strict";a.r(t);var s=a(23),n=a(2),i=a(3),l=a(5),m=a(4),r=a(6),d=a(1),o=a.n(d),c=a(40),p=function(e){function t(){var e,a;Object(n.a)(this,t);for(var i=arguments.length,r=new Array(i),d=0;d<i;d++)r[d]=arguments[d];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={editableOption:"",username:a.props.user.userData.username,email:a.props.user.userData.email},a.handleEditableOptionToggle=function(e){switch(e.target.dataset.name){case"username":return a.props.methods.switchUsernameStatus(!1,!1,!a.props.settings.username.editable);case"email":return a.props.methods.switchEmailStatus(!1,!1,!a.props.settings.email.editable);default:return}},a.handleInputChange=function(e){a.setState(Object(s.a)({},e.target.name,e.target.value))},a.handleSaveUsername=function(e){a.state.username.length<3||a.state.username.length>48||a.props.methods.updateUserUsername(a.state.username)},a.handleSaveEmail=function(e){a.state.email.length<5||a.state.email.length>255||a.props.methods.updateUserEmail(a.state.email)},a}return Object(r.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.user.lang;document.title=e.titles.primarySettings,this.props.methods.settingsToInitial()}},{key:"render",value:function(){var e=this.props.user,t=e.lang,a=this.props.settings;return o.a.createElement("div",{className:"settings_body"},o.a.createElement("div",{className:"settings_title"},o.a.createElement("h3",null,t.titles.primarySettings)),o.a.createElement("div",{className:"settings_page"},o.a.createElement("div",{className:"settings_edit_table"},o.a.createElement("div",{className:"settings_edit_table_item"},o.a.createElement("span",{className:"settings_edit_table_item--key"},t.username),o.a.createElement("span",{className:"settings_edit_table_item--value"},a.username.editable?o.a.createElement("input",{type:"text",value:this.state.username,name:"username",onChange:this.handleInputChange,className:"flashcardly_modest_input settings_input"}):e.userData.username),a.username.editable?a.username.processing&&!a.username.loaded?o.a.createElement("div",{className:"settings_loader_wrapper"},o.a.createElement(c.a,null)):o.a.createElement("div",{className:"settings_edit_table-item--option__extended"},o.a.createElement("span",{className:"settings_edit_table-item--option__extended--action",onClick:this.handleEditableOptionToggle,"data-name":"username"},t.shorts.cancel),o.a.createElement("span",{className:"settings_edit_table-item--option__extended--static"},t.shorts.or),o.a.createElement("span",{className:"settings_edit_table-item--option__extended--action",onClick:this.handleSaveUsername},t.shorts.save)):o.a.createElement("span",{className:"settings_edit_table_item--option",onClick:this.handleEditableOptionToggle,"data-name":"username"},t.shorts.edit)),o.a.createElement("div",{className:"settings_edit_table_item"},o.a.createElement("span",{className:"settings_edit_table_item--key"},t.emailAddress),o.a.createElement("span",{className:"settings_edit_table_item--value"},a.email.editable?o.a.createElement("input",{type:"text",value:this.state.email,name:"email",onChange:this.handleInputChange,className:"flashcardly_modest_input settings_input"}):e.userData.email),a.email.editable?a.email.processing&&!a.email.loaded?o.a.createElement("div",{className:"settings_loader_wrapper"},o.a.createElement(c.a,null)):o.a.createElement("div",{className:"settings_edit_table-item--option__extended"},o.a.createElement("span",{className:"settings_edit_table-item--option__extended--action",onClick:this.handleEditableOptionToggle,"data-name":"email"},t.shorts.cancel),o.a.createElement("span",{className:"settings_edit_table-item--option__extended--static"},t.shorts.or),o.a.createElement("span",{className:"settings_edit_table-item--option__extended--action",onClick:this.handleSaveEmail},t.shorts.save)):o.a.createElement("span",{className:"settings_edit_table_item--option",onClick:this.handleEditableOptionToggle,"data-name":"email"},t.shorts.edit)))))}}]),t}(d.Component);t.default=p}}]);
//# sourceMappingURL=7.b6a49e08.chunk.js.map