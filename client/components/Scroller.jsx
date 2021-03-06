import React from 'react';

/**
* Helper function to return the right kind of div tag
* depending on whether we are selected on the number or not.
*/
const renderNumber = (currPage, numPages, i, handlePageSelectionClick) => {
  const isSelectedPage = currPage === i;
  return isSelectedPage ? <div className="scroll-number-selected" key={i}>{i}</div> : <div className="scroll-number" onClick={handlePageSelectionClick} onKeyDown={handlePageSelectionClick} role="button" key={i}>{i}</div>;
};

/**
* Helper function to draw the complicated scroll bar numbering/ellipsis scheme
*/
const mapScrollNumbers = (currPage, numPages, handlePageSelectionClick) => {
  const result = [];
  // If pages is less than 7, simply render all the pages.
  if (numPages <= 7) {
    for (let i = 1; i <= numPages; i += 1) {
      result.push(renderNumber(currPage, numPages, i, handlePageSelectionClick));
    }
    // If more than 7 pages, and selected on 1-4, put an ellipsis at the end.
  } else if (currPage <= 4) {
    for (let i = 1; i <= 6; i += 1) {
      result.push(renderNumber(currPage, numPages, i, handlePageSelectionClick));
    }
    result.push(<div className="scroll-ellipsis" key="...">...</div>);
    result.push(<div className="scroll-number" onClick={handlePageSelectionClick} onKeyDown={handlePageSelectionClick} role="button" key={numPages}>{numPages}</div>);
    /**
     * If more than 7 pages and selected on a higher number,
     * put an ellipsis at the beginning. Render the current number +- 2.
     */
  } else {
    result.push(<div className="scroll-number" onClick={handlePageSelectionClick} onKeyDown={handlePageSelectionClick} role="button" key="1">1</div>);
    result.push(<div className="scroll-ellipsis" key="...">...</div>);
    for (let i = currPage - 2; (i <= currPage + 2) && (i <= numPages); i += 1) {
      result.push(renderNumber(currPage, numPages, i, handlePageSelectionClick));
    }
    /**
     * If the current number is close enough to the total, no need for a second ellipsis.
     * But if it isn't, render a second ellipsis.
     */
    if (currPage === (numPages - 3)) {
      result.push(<div className="scroll-number" onClick={handlePageSelectionClick} onKeyDown={handlePageSelectionClick} role="button" key={numPages}>{numPages}</div>);
    } else if (currPage < (numPages - 3)) {
      result.push(<div className="scroll-ellipsis" key="...">...</div>);
      result.push(<div className="scroll-number" onClick={handlePageSelectionClick} onKeyDown={handlePageSelectionClick} role="button" key={numPages}>{numPages}</div>);
    }
  }
  return result;
};

/**
* The scroller at the bottom that allows you to change the displayed questions.
* Receives the number of pages needed and some click handler functions as props.
* Parent: QsAndAsBox
* Children: none
*/
const Scroller = ({
  currPage,
  numPages,
  handlePreviousButtonClick,
  handlePageSelectionClick,
  handleNextButtonClick,
}) => (
  <div id="scroller">
    {currPage === 1
      ? <button type="button" className="large-white-button-inactive">Previous</button>
      : <button type="button" className="large-white-button" onClick={handlePreviousButtonClick}>Previous</button>}
    <div id="scroll-numbers">
      {mapScrollNumbers(currPage, numPages, handlePageSelectionClick)}
    </div>
    {currPage === numPages
      ? <button type="button" className="large-black-button-inactive">Next</button>
      : <button type="button" className="large-black-button" onClick={handleNextButtonClick}>Next</button>}
  </div>
);

export default Scroller;
