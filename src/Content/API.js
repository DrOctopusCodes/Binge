import axios from 'axios'

const fetchPopularShows = async (page) => {
    try {
        // const {data: {tv_shows}} = await axios.get('https://www.episodate.com/api/most-popular?page=1')
        let url = `https://www.episodate.com/api/most-popular?page=${page}`
        const {data: {tv_shows}} = await axios.get(url)
        const shows = tv_shows.map((tv)=>({
            imagePath : tv.image_thumbnail_path,
            showName: tv.name,
            network: tv.network,
            id: tv.id
        }))
        
        return(shows)
    }catch (err) {
        console.log(err)
    }
}


const returnCount = async()=>{
    try{
        let url = `https://www.episodate.com/api/most-popular?page=1`
        const {data: {pages, total}} = await axios.get(url)
        return([pages, total])
    }catch (err){
        console.log(err)
    }
} 

const searchShow = async function(name){
    console.log('yay')
    let url = `https://www.episodate.com/api/search?q=${name}`
    const {data: {tv_shows}} = await axios.get(url)
    return tv_shows
}

export {fetchPopularShows, returnCount, searchShow};