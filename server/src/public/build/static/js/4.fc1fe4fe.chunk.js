(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{118:function(e,a,t){},130:function(e,a,t){"use strict";t.r(a);var l=t(23),r=t(2),c=t(3),n=t(5),s=t(4),o=t(6),d=t(1),i=t.n(d),h=t(114),m=t(12),f=(t(118),function(e){function a(){return Object(r.a)(this,a),Object(n.a)(this,Object(s.a)(a).apply(this,arguments))}return Object(o.a)(a,e),Object(c.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:"pounded_line"},i.a.createElement("hr",null))}}]),a}(d.Component)),u=t(32),p=function(e){function a(){var e,t;Object(r.a)(this,a);for(var c=arguments.length,o=new Array(c),d=0;d<c;d++)o[d]=arguments[d];return(t=Object(n.a)(this,(e=Object(s.a)(a)).call.apply(e,[this].concat(o)))).state={flashcardTitle:"",flashcardFirstCol:"",flashcardSecondCol:""},t.handleCreatorSubmit=function(e){e.preventDefault(),t.props.createNewFlashcard({title:t.state.flashcardTitle,firstCol:t.state.flashcardFirstCol,secondCol:t.state.flashcardSecondCol})},t.handleCreatorChange=function(e){t.setState(Object(l.a)({},e.target.name,e.target.value))},t}return Object(o.a)(a,e),Object(c.a)(a,[{key:"componentDidMount",value:function(){document.title="Flashcards creator - Flashacrdly"}},{key:"componentWillUnmount",value:function(){this.props.setCreateFlashcardLoaded(!1)}},{key:"render",value:function(){var e=this.props.user.lang;return this.props.flashcard.createFlashcardLoaded?i.a.createElement(h.a,{to:"/flashcards/".concat(this.props.flashcard.flashcardData.fid)}):i.a.createElement("div",{className:"flashcards_window"},i.a.createElement("div",{className:"flashcards_block"},i.a.createElement("div",{className:"flashcards_block_header"},i.a.createElement("div",{className:"flashcards_block_header_title"},i.a.createElement("h3",null,e.titles.flashcardsCreator),i.a.createElement("div",{className:"flashcards_block_header_description"},i.a.createElement("p",null,e.contents.flashcardsCreatorDesc)))),i.a.createElement(f,null),i.a.createElement("div",{className:"flashcards_block_body flashcards_block_body_creator"},i.a.createElement("div",{className:"flashcards_block_body_form_creator"},i.a.createElement("form",{onSubmit:this.handleCreatorSubmit},i.a.createElement("div",{className:"form_creator_field"},i.a.createElement("label",{htmlFor:"flashcardTitle"},e.titles.flashcardsSetTitle),i.a.createElement("input",{type:"text",className:"flashcardly_input",name:"flashcardTitle",onChange:this.handleCreatorChange,value:this.state.flashcardTitle}),i.a.createElement("p",null,e.contents.flashcardsTitleDesc)),i.a.createElement("div",{className:"form_creator_field"},i.a.createElement("label",{htmlFor:"flashcardFirstCol"},e.titles.nameFirstColumn),i.a.createElement("input",{type:"text",className:"flashcardly_input",name:"flashcardFirstCol",onChange:this.handleCreatorChange,value:this.state.flashcardFirstCol}),i.a.createElement("p",null,e.contents.nameColumnDesc)),i.a.createElement("div",{className:"form_creator_field"},i.a.createElement("label",{htmlFor:"flashcardSecondCol"},e.titles.nameSecondColumn),i.a.createElement("input",{type:"text",className:"flashcardly_input",name:"flashcardSecondCol",onChange:this.handleCreatorChange,value:this.state.flashcardSecondCol}),i.a.createElement("p",null,e.contents.nameColumnDesc)),i.a.createElement("div",{className:"form_creator_field_btn"},i.a.createElement("button",{type:"submit",className:"flashcardly_btn flashcardly_btn--common"},e.buttons.confirm)))))))}}]),a}(d.Component);a.default=Object(m.b)(function(e){return{user:e.user,flashcard:e.flashcard}},{createNewFlashcard:u.c,setCreateFlashcardLoaded:u.i})(p)}}]);
//# sourceMappingURL=4.fc1fe4fe.chunk.js.map