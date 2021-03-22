import React, { useEffect, useState } from 'react'

const PaginationComponent = () => {
    // to store api call data
    const [data, setData] = useState([]);

    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(5);

    // page number limit
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    // first item index and last item index
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // current 5 item to display in a particular single page
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


    // to load data from api
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then((json) => setData(json));
    }, []);

    // total pages array
    const pages = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pages.push(i);
    }

    // page handle click btn event
    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
    };

    // next btn
    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);
    
        if (currentPage + 1 > maxPageNumberLimit) {
          setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
      };

    //  prev btn
    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);
    
        if ((currentPage - 1) % pageNumberLimit == 0) {
          setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
      }; 


    //   ...(dot) btn
      let pageIncrementBtn = null;
      if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
      }
    
      let pageDecrementBtn = null;
      if (minPageNumberLimit > 0) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
      }
    return (
        <div>
            {/* page number  */}
            <ul className="pageNumbers">
                <li>
                    <button
                        onClick={handlePrevbtn}
                        disabled={currentPage == pages[0] ? true : false}
                    >
                        Prev
                     </button>
                    
                     
                </li>
                {pageDecrementBtn}
               
                {
                    pages.map((number) => {
                        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                            return (
                                <li
                                    key={number}
                                    id={number}
                                    onClick={handleClick}
                                    className={currentPage == number ? "active" : null}
                                >
                                    {number}
                                </li>
                            );
                        } else {
                            return null;
                        }
                    })
                }
                  {pageIncrementBtn}
                <li>
                   
                    <button
                        onClick={handleNextbtn}
                        disabled={currentPage == pages[pages.length - 1] ? true : false}
                    >
                        Next
                     </button>
                </li>
            </ul>

            {/* to do list title  */}
            <ul>

                {currentItems.map((todo, index) => {
                    return <li key={index}>{todo.title}</li>;
                })}
            </ul>

        </div>
    )
}

export default PaginationComponent
