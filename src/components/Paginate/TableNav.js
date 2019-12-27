import React from 'react';
//styles
//icons
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from '@material-ui/icons';
import styled from 'styled-components';

const PageNumberDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  .pageNumbersLeftDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    border: 1px solid ${props => props.theme.backgroundLightGrey};
    border-bottom-left-radius: 110px;
    border-top-left-radius: 110px;
    border-right: none;
  }
  .chevronTable {
    color: ${props => props.theme.slateGrey};

    &:hover {
      color: ${props => props.theme.lightBlue};
    }
  }
  .chevronTableActive {
    color: ${props => props.theme.lightBlue};
  }
  .pageNumbersRightDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    border: 1px solid ${props => props.theme.backgroundLightGrey};
    border-bottom-right-radius: 110px;
    border-top-right-radius: 110px;
    border-left: none;
  }
  .pageNumbers {
    padding-left: 0;
    border: 1px solid ${props => props.theme.backgroundLightGrey};
    font-family: ${props => props.theme.font};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0;
  }
  .pageButtons {
    position: relative;
    display: inline-block;
    text-align: center;
    border: none;
    font-size: 17px;
    background-color: #ffffff;
    border-radius: 3px;
    color: ${props => props.theme.midnightBlue};
    width: 35px;

    &::before {
      content: '';
      position: absolute;
      width: 50%;
      height: 2px;
      bottom: -5px;
      left: 25%;
      background-color: ${props => props.theme.midnightBlue};
      visibility: hidden;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transition: all 0.3s ease-in-out 0s;
      transition: all 0.3s ease-in-out 0s;
    }

    &:hover {
      &::before {
        visibility: visible;
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
      }
    }
  }
  .pageButtonsActive {
    position: relative;
    display: inline-block;
    text-align: center;
    border: none;
    font-size: 17px;
    background-color: #ffffff;
    border-radius: 3px;
    color: ${props => props.theme.midnightBlue};
    width: 35px;

    &::after {
      content: '';
      position: absolute;
      width: 50%;
      height: 2px;
      bottom: -5px;
      left: 25%;
      background-color: ${props => props.theme.midnightBlue};
      visibility: visible;
    }
  }
`;

const TableNav = ({
  pageNumbers,
  currentPage,
  handlePageClick,
  handleArrowClick,
}) => {
  let renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        className={currentPage === number ? 'pageButtonsActive' : 'pageButtons'}
        key={number}
        id={number}
        onClick={handlePageClick}
      >
        {number}
      </li>
    );
  });

  if (pageNumbers.length > 3 && currentPage === 1) {
    pageNumbers = [currentPage, currentPage + 1];
    renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className={
            currentPage === number ? 'pageButtonsActive' : 'pageButtons'
          }
          key={number}
          id={number}
          onClick={handlePageClick}
        >
          {number}
        </li>
      );
    });
  } else if (pageNumbers.length > 3) {
    renderPageNumbers = pageNumbers
      .slice(currentPage - 2, currentPage + 1)
      .map(number => {
        return (
          <li
            className={
              currentPage === number ? 'pageButtonsActive' : 'pageButtons'
            }
            key={number}
            id={number}
            onClick={handlePageClick}
          >
            {number}
          </li>
        );
      });
  }

  return (
    <PageNumberDiv>
      <div className="pageNumbersLeftDiv">
        <FirstPage
          className={currentPage === 1 ? 'chevronTableActive' : 'chevronTable'}
          onClick={() => handleArrowClick('left')}
        />
        <ChevronLeft
          className="chevronTable"
          onClick={() => handleArrowClick('left')}
        />
      </div>
      <div className="pageNumbers">{renderPageNumbers}</div>
      <div className="pageNumbersRightDiv">
        <ChevronRight
          className="chevronTable"
          onClick={() => handleArrowClick('right')}
        />
        <LastPage
          className={
            currentPage === pageNumbers.length
              ? 'chevronTableActive'
              : 'chevronTable'
          }
          onClick={() => handleArrowClick('right')}
        />
      </div>
    </PageNumberDiv>
  );
};

export default TableNav;
