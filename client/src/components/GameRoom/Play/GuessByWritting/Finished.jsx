import React from 'react';
import { Link } from 'react-router-dom';

export default function Finished(props) {
  console.log(props);
  return (
    <div>
      <div className="finished_gbw">
        <div className="finished_gbw_header">
          <span>
            {`You finished Guess by Writting for ${props.flashcard.title}`}
          </span>
        </div>
        <div className="finished_gbw_body">
          <p>
            <span>
              {`It took you ${props.staticDuration-props.duration} seconds`}
            </span>
          </p>
          <p>
            <span>
             {`You answerd correctly ${props.result} times out of ${props.flashcard.Words.length}`}
            </span>
          </p>
          <p>
            <span>If you want, you can</span>
            <Link to="#" onClick={() => window.location.reload()}>Play again</Link>
            <span>or back to</span>
            <Link to={`/flashcards/${props.flashcard.fid}`}>{props.flashcard.title}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}