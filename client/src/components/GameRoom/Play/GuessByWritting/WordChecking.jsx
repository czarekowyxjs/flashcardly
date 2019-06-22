import React, { useEffect } from 'react';

function WordChecking(props) {
  useEffect(() => {
    window.addEventListener("keyup", props.methods.confirmCheckedWord, false);
    return () => window.removeEventListener("keyup", props.methods.confirmCheckedWord, false);
  })

  const lang = props.lang;

  return (
    <div>
      <div className="gsb_game_word_right">
        <span>
          {
            props.selectedGameType === "firstToSecond"
            ? props.word.firstColumnValue
            : props.word.secondColumnValue
          }
        </span>
      </div>
      <div className="gsb_game_word_native">
          <span>
          {
            props.selectedGameType === "firstToSecond"
            ? props.word.secondColumnValue
            : props.word.firstColumnValue
          }
          </span>
          <div className="gsb_game_word_curryup">
          <span>
            {
              props.good 
              ? lang.shorts.rightAnswer
              : lang.shorts.badAnswer
            }
          </span>
          <button className="flashcardly_btn flashcardly_btn--common" onClick={props.methods.confirmCheckedWord}>
              { lang.shorts.continue }
          </button>
      </div>
      </div>
    </div>
  )
}

export default WordChecking;