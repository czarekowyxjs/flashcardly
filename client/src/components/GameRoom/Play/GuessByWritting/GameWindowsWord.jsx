import React, { Component } from 'react';

class GameWindowWord extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  state = {
    inputWord: ""
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleSubmit, false);
    this.inputRef.current.focus();
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleSubmit, false);
  }

  onChangeInputWord = (e) => {
    this.setState({
      inputWord: e.target.value
    });
  }

  handleSubmit = (e) => {
    if(e.type === "keyup" && e.key !== "Enter") return;

    this.setState(prevState => {
      this.props.methods.checkWord(prevState.inputWord);

      return {
        inputWord: ""
      }
    })
  }

  render() {

    return (
      <div>
        <div className="gsb_game_word_native">
          <span>
            {
              this.props.selectedGameType === "firstToSecond"
              ? this.props.word.firstColumnValue
              : this.props.word.secondColumnValue
            }
          </span>
        </div>
        <div className="gsb_game_word_translate">
            <input 
              className={`gsb_game_input ${this.props.light ? "dark" : "light"}`}
              value={this.state.inputWord}
              onChange={this.onChangeInputWord}
              ref={this.inputRef}
              />
            <div className="gsb_game_word_translate_info">
              <span>
                Type your translation
              </span>
              <button className="flashcardly_btn flashcardly_btn--common" onClick={this.handleSubmit}>
                Check
              </button>
            </div>
        </div>
      </div>
    )
  }
}

export default GameWindowWord;