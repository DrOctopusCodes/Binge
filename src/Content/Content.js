import React,{useState, useEffect}from 'react'
import {fetchPopularShows} from './API'
import {Card, CardHeader, CardMedia, CardActions, Grid, IconButton, CircularProgress} from '@material-ui/core'
import './Content.css'
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import {addShow} from '../Firebase/databaseOps'

function Content({page}) {

    const [shows, setShows] = useState([])
    console.log(page)
    
    useEffect(()=>{
        const fetchAPI = async () => {
            setShows(await fetchPopularShows(page))
        }
        fetchAPI()
    }, [page])

    const addToWatchList = (show) =>{
        addShow(show)
    }

    const showsView = shows.length ? (
        shows.map((show) => (
            <React.Fragment key={show.id}>
                    <Grid item>
                        <Card className='card'>
                            <CardMedia className='cardPoster'>
                                <div className='imageHolder'>
                                    <img src={show.imagePath} alt={show.imagePath}/>
                                </div>
                            </CardMedia>
                            <CardHeader title={show.showName} subheader={show.network} style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}} className='cardDetail'/>

                            <CardActions>
                                <IconButton aria-label='Follow' style={{marginLeft: 'auto',paddingTop:0}} onClick={()=>addToWatchList(show)}> 
                                    <WatchLaterIcon fontSize="large"/> 
                                </IconButton>
                            </CardActions>

                        </Card>
                     </Grid>
                </React.Fragment>
               
        ))
    ):
    <CircularProgress className='spinner'/>

    return(
        <div className='aligning'>
            <div className='gridContainer'>
            <Grid container item spacing={6} className='grid'>
                {showsView}
            </Grid>
        </div>
        </div>
    )

}

export default Content

