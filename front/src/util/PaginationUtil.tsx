import {Pagination} from "react-bootstrap";
import React from "react";

/**
 * Renders pagination bar.
 *
 * Examples of render:
 * pageNumber: 0 totalPages: 5
 * '1' 2 3 4 5
 *
 * pageNumber: 0 totalPages: 6
 * '1' 2 3 ... 5 6
 *
 * pageNumber: 5 totalPages: 9
 * 1 2 3 4 5 '6' 7 8 9
 *
 * pageNumber: 5 totalPages: 7
 * 1 2 ... 4 5 '6' 7
 *
 * pageNumber: 5 totalPages: 11
 * 1 2 ... 4 5 '6' 7 8 ... 10 11
 *
 * Pagination bar does not render if there are less than 2 pages
 *
 * @param pageNumber number of current page
 * @param totalPages total pages number
 * @param onPageChange callback when user clicks on page item
 */
export const renderPagination = (pageNumber: number,
                                 totalPages: number,
                                 onPageChange : (number: number) => void) => {
    if (totalPages < 2) {
        return (<></>);
    }

    const ellipsis = <Pagination.Ellipsis disabled={true} style={{cursor: "auto"}}/>;
    const paginationItemsLeft : JSX.Element[] = [];

    if (pageNumber <= 4) {
        for (let i = 1; i <= pageNumber; i++) {
            paginationItemsLeft.push(
                <Pagination.Item onClick={() => onPageChange(i - 1)}>{i}</Pagination.Item>
            );
        }
    } else {
        const leftItemsWithEllipsis = [
            <Pagination.Item onClick={() => onPageChange(0)}>{1}</Pagination.Item>,
            <Pagination.Item onClick={() => onPageChange(1)}>{2}</Pagination.Item>,
            ellipsis,
            <Pagination.Item onClick={() => onPageChange(pageNumber - 2)}>{pageNumber - 1}</Pagination.Item>,
            <Pagination.Item onClick={() => onPageChange(pageNumber - 1)}>{pageNumber}</Pagination.Item>
        ];
        paginationItemsLeft.push(...leftItemsWithEllipsis);
    }

    const paginationItemsRight : JSX.Element[] = [];

    if (totalPages - pageNumber <= 5) {
        if (totalPages - pageNumber > 1) {
            for (let i = pageNumber + 2; i <= totalPages; i++) {
                paginationItemsRight.push(
                    <Pagination.Item onClick={() => onPageChange(i - 1)}>{i}</Pagination.Item>
                );
            }
        }
    } else {
        const leftItemsWithEllipsis = [
            <Pagination.Item onClick={() => onPageChange(pageNumber + 1)}>{pageNumber + 2}</Pagination.Item>,
            <Pagination.Item onClick={() => onPageChange(pageNumber + 2)}>{pageNumber + 3}</Pagination.Item>,
            ellipsis,
            <Pagination.Item onClick={() => onPageChange(totalPages - 2)}>{totalPages - 1}</Pagination.Item>,
            <Pagination.Item onClick={() => onPageChange(totalPages - 1)}>{totalPages}</Pagination.Item>
        ];
        paginationItemsRight.push(...leftItemsWithEllipsis);
    }

    const paginationPrev = () => {
        if (pageNumber <= 0) {
            return <></>;
        }

        return <Pagination.Prev onClick={() => onPageChange(pageNumber - 1)}/>
    }

    const paginationNext = () => {
        if (pageNumber >= totalPages - 1) {
            return <></>;
        }

        return <Pagination.Next onClick={() => onPageChange(pageNumber + 1)}/>
    }

    return (
        <Pagination>
            {paginationPrev()}
            {paginationItemsLeft}
            <Pagination.Item active>{pageNumber + 1}</Pagination.Item>
            {paginationItemsRight}
            {paginationNext()}
        </Pagination>
    )
}