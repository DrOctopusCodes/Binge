import React,{useState, useEffect} from 'react'
import './Header.css'
import {Dialog, DialogActions, DialogTitle, DialogContent, CircularProgress} from '@material-ui/core'
import {Button, TextField} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {fetchMyShows, removeShow, fetchRemovedShows} from '../Firebase/databaseOps'

import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import {searchShow} from '../Content/API'

function Header() {

    const [showMyShows, setShowMyShows] = useState(false)
    const [myShowsList, setMyShowsList] = useState([])
    const [showSearchResults, setShowSearchResults] = useState(false)

    const onClickHandle = (show) => {
        removeShow(show)
        // var updatedShow = myShowsList.filter(s => (s.id !== show.id))
        // setMyShowsList(updatedShow)
        // setMyShowsList(b)
    }
    
    useEffect(()=>{
        const mySL = async ()=>{
            const a = await fetchMyShows()
            setMyShowsList(a)
        }
       mySL()
    }, [myShowsList])

    useEffect(()=>{
        const rml = async ()=>{
            const b = await fetchRemovedShows()
            // var updatedShow = myShowsList.filter(s => (s.id !== b))
            // setMyShowsList(updatedShow)
        }
        rml()
    }, [])

    const show = myShowsList.length ? (myShowsList.map(show =>(
        <div className='myShowsDivs' key={show.id}>
            <label className='label'>{show.name}</label>
            <button className='removeBtn' onClick={()=>onClickHandle(show)}>Remove</button>
        </div>
        ))):(<p>Shows added to your watchlist appear here</p>)

    const showDialog = showMyShows ? (
        <Dialog  width='1000px' aria-labelledby="simple-dialog-title" open={true} style={{maxHeight: '60vh'}}>
            <div className='titleContainer'>
                <DialogTitle id="form-dialog-title">My Shows</DialogTitle>
                <button className='closeBtn' onClick={()=>(setShowMyShows(false))}>{<CloseIcon fontSize="small"/>}</button>
            </div>
            <DialogContent maxWidth='10px' maxHeight='20vh'>{show}</DialogContent>
        </Dialog>)
        :(<h1></h1>)

    
    // function searchResults(){        
    //     <Dialog  width='1000px' aria-labelledby="simple-dialog-title" open={true} style={{maxHeight: '60vh'}}>
    //         <div className='titleContainer'>
    //             <DialogTitle id="form-dialog-title">My Shows</DialogTitle>
    //             <button className='closeBtn' onClick={()=>(setShowMyShows(false))}>{<CloseIcon fontSize="small"/>}</button>
    //         </div>
    //         <DialogContent maxWidth='10px' maxHeight='20vh'>{show}</DialogContent>
    //     </Dialog>}
        

    const handleSearch = async (e) =>{
        if(e.key === 'Enter'){
            console.log('enter', e.target.value)
            // searchShow('arrow')
            const searchResults = await searchShow('arrow')
            console.log(searchResults)
            // searchResults()
        }
    }

    return (
        <div className='header'>
            
            <Toolbar className='toolbar'>
                <SearchIcon />
                <InputBase placeholder="Search Shows" onKeyDown={handleSearch}/>
            </Toolbar>


            <h1 className='title'>Binge</h1>
            
            <button className='myShows' onClick={()=>setShowMyShows(true)}> My Shows </button>
            {showDialog}
        </div>
    )
}

export default Header

