import React from 'react';
import "./devInfo.css"

function DevInfo({dev, removeDev}){

    function remove(){
        removeDev(dev._id)
    }

    return(
        <li className="dev-info">
            <span className="remove" onClick={remove}>x</span>
            <header>
                <img src={dev.avatar_url} alt={dev.name}></img>
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs}</span>
                </div>
            </header>
            
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`} target="blank">Github Profile</a>
        </li>
       
                
    )
}

export default DevInfo