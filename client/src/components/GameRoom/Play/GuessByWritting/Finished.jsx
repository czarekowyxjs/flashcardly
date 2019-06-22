import React from 'react';
import { Link } from 'react-router-dom';

export default function Finished(props) {
  
  const lang = props.lang;

  return (
    <div>
      <div className="finished_gbw">
        <div className="finished_gbw_header">
          <span>
            {`${ lang.contents.guessByWritting.finishTitle } ${props.flashcard.title}`}
          </span>
        </div>
        <div className="finished_gbw_body">
          <p>
            <span>
              {`${ lang.contents.guessByWritting.itTook } ${props.staticDuration-props.duration} ${lang.shorts.seconds}`}
            </span>
          </p>
          <p>
            <span>
             {`${ lang.contents.guessByWritting.youAnswerdCorrectly } ${props.result} ${ lang.contents.guessByWritting.times } ${props.flashcard.Words.length}`}
            </span>
          </p>
          <p>
            <span>{ lang.contents.guessByWritting.playAgainDesc }</span>
            <Link to="#" onClick={() => window.location.reload()}>{ lang.contents.guessByWritting.playAgain }</Link>
            <span>{ lang.contents.guessByWritting.orBackTo }</span>
            <Link to={`/flashcards/${props.flashcard.fid}`}>{props.flashcard.title}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}