import React from 'react'

const Pagination = ({pageBlock, page, setPage}) => {

    const pageNumbers = [...Array(pageBlock + 1).keys()].slice(1)

    const nextPage = () => {
        if (page !== pageBlock) setPage(page + 1)
    }
    const prevPage = () => {
        if (page !== 1) setPage(page - 1)
    }
    return (<nav>
        <ul className='pagination justify-content-center'>
            <li className="page-item">
                <a className="page-link"
                   onClick={prevPage}
                   href='#'>
                    Previous
                </a>
            </li>
            {pageNumbers.map(pgNumber => (
                <li key={pgNumber}
                    className={`page-item ${page == pgNumber ? 'active' : ''} `}
                ><a onClick={() => setPage(pgNumber)}
                    className='page-link'
                    href='#'>{pgNumber}</a>
                </li>))}
            <li className="page-item"
            ><a className="page-link"
                onClick={nextPage}
                href='#'>Next</a>
            </li>
        </ul>
    </nav>)
}

export default Pagination
