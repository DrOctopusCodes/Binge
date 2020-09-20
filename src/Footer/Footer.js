import React, {useState} from 'react'
import './Footer.css'
import Pagination from '@material-ui/lab/Pagination';

function Footer({passChildData, pageCount}) {
    const [page, setPage] = useState(1)

    const handleClick = (event, value) => {
        setPage(value)
        passChildData(value)
    }

    return (
        <div className="footer">
            <Pagination className="paginator" count={pageCount} page={page} spacing={2} color="primary" size="large" showFirstButton showLastButton  onChange={handleClick}/>
      </div>
    )
}

export default Footer
