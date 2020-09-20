import React,{useState, useEffect} from 'react'
import Header from './Header/Header'
import Content from './Content/Content'
import Footer from './Footer/Footer'
import {returnCount} from './Content/API'

function App() {

    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    useEffect(()=>{
        //API call to get the total pages.
        const fetchShowCount = async () => {
            const counts = await returnCount()
            const pages = counts[0]
            const total = parseInt(counts[1])
            setPageCount(pages)
        }
        fetchShowCount()
    },[])
    
    return (
        <React.Fragment>
            <Header/>
            <Content page={currentPage} style="height: 80vh"/>
            <Footer style="height: 10vh" passChildData={setCurrentPage} pageCount={pageCount}/>
        </React.Fragment>
    )    
}

export default App





