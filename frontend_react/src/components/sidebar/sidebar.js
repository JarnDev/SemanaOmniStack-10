import React, {useEffect, useState} from 'react';
import "./sidebar.css"


function SideBar( { onSubmit } ){
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [userName, setUserName] = useState('')
    const [techs, setTechs] = useState('')
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
            (location) =>{
                const {latitude, longitude} = location.coords
                setLat(latitude)
                setLon(longitude)
            },
            (error) =>{
                console.log(error)
            },
            {
                timeout:30000
            }
        )    
    },[])


    async function handleSubmit(event){
        event.preventDefault()
        await onSubmit(
            {
                github_username: userName,
                techs: techs,
                latitude:lat,
                longitude:lon
            }
        )
    
    }

    return(
        <>
            <strong>Register</strong>
            <form onSubmit={handleSubmit}>

            <div className="input-form">
                <label htmlFor="userName">GitHub UserName</label>
                <input name="userName" id="userName" required value={userName}
                onChange={e => setUserName(e.target.value)}/>
            </div>

            <div className="input-form">
                <label htmlFor="technologies">Technologies</label>
                <input name="technologies" id="technologies" required value={techs}
                onChange={e => setTechs(e.target.value)}/>
            </div>
            
            
            <div className="input-group">
                <div className="input-form">
                <label htmlFor="latitude">Latitude</label>
                <input type='number' name="latitude" id="latitude" required value={lat}
                onChange={e => setLat(e.target.value)}/>
                </div>

                <div className="input-form">
                <label htmlFor="longitude">Longitude</label>
                <input type='number' name="longitude" id="longitude" required value={lon}
                onChange={e => setLon(e.target.value)}/>
                </div>
                
            </div>
            <button type="submit">Register</button>
            </form>
        </>
    )
}

export default SideBar