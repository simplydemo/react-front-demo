import React, {useEffect, useState} from "react";
import {Pagination} from "react-bootstrap";


// interface Props {
//     dataLength: number,
//         pageSize: number,
//         maxItems: number,
//         page?: number,
//         onPageChange: (num: number) => void,
//         className?: string;
// }

const MyPagination = ({dataLength, maxItems, onPageChange, pageSize, className, currentPage}) => {
    const [page, setPage] = useState(currentPage)

    const changePage = (num) => {
        setPage(num)
        onPageChange(num);
    }

    useEffect(() => {
        setPage(currentPage)
    }, [pageSize, currentPage]);

    const pages = Math.ceil(dataLength / pageSize);

    const records = [...Array(pages).keys()];
    let responsiveMaxItems = 4

    let sliceStart = (page - responsiveMaxItems / 2);
    if (sliceStart < 0) sliceStart = 0;
    let sliceEnd = sliceStart + responsiveMaxItems;

    const allItems = records.map((i, x) => {
        const num = i + 1;
        return <Pagination.Item active={num === page} onClick={() => {
            changePage(num);
        }} key={num}>{num}</Pagination.Item>
    });

    const items = allItems.slice(sliceStart, sliceEnd);

    return <Pagination className={className}>
        <Pagination.First disabled={!(sliceStart > 0)} onClick={() => {
            changePage(1);
        }}/>
        <Pagination.Prev disabled={!(page > 1)} onClick={() => {
            changePage(page - 1);
        }}/>
        {items}
        <Pagination.Next disabled={page >= pages} onClick={() => {
            changePage(page + 1);
        }}/>
        <Pagination.Last disabled={page >= pages} onClick={() => {
            changePage(pages);
        }}/>
    </Pagination>;
}

export default MyPagination
