import React, { useState, useEffect } from 'react';
import './global.css';
import './App.css';
import SideBar from './components/sidebar'
import DevInfo from './components/devInfo'

import dev_api from './services/dev_api'

function App() {
  const [devs, setDevs] = useState([])

  async function handleSubmit(post_data){
    const api_response = await dev_api.post('/dev/addDev', post_data)

    setDevs([...devs, api_response.data])

  }

  async function removeDev(dev_id){
    await dev_api.delete('/dev/removeDev', {params:{"id":dev_id}})
    setDevs(devs.filter(dev => (dev._id!==dev_id)))
  
  }

  useEffect(()=>{
    async function listDevs(){
      const api_response = await dev_api.get('/dev')

      setDevs(api_response.data)
    }

    listDevs()
  },[])

  return (
    <div id="app">
      <aside>
        <SideBar onSubmit={handleSubmit} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            
            <DevInfo key={dev._id} dev={dev} removeDev={removeDev}/>
           
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
