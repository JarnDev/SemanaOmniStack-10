
const axios = require('axios');
const developer = require('../models/developers-model')
class DeveloperControler{

    static rotas(){
        return {
            home: '/',
            create: '/addDev',
            remove: '/removeDev',
            searchNearby: "/searchNearby"
        }
    }

    home(){
        return async (req,res) => {
            const devs = await developer.find()

            return res.json(devs)
        }
    }


    searchNearby(){
        return async (req, res) =>{
            const { latitude, longitude, techs} = req.query

            const techs_array = techs.split(',').map(item => item.trim())

            const dev = await developer.find({
                techs: { $in:techs_array } ,
                location: {
                    $near:{
                        $geometry:{
                            type:'Point',
                            coordinates:[ longitude, latitude ]
                        },
                        $maxDistance: 1000
                    }
                }
            })

            return res.json(dev)

        }
    }

    addDev(){
        return async (req,res)=>{

            const { github_username, techs, latitude, longitude } = req.body;
            let db_response = await developer.findOne({github_username})

            if(!db_response){

                const git_response = await axios.get(`https://api.github.com/users/${github_username}`)
                const { name = login, avatar_url, bio } = git_response.data
                const techs_array = techs.split(',').map(item => item.trim())
                const location = {
                    type: 'Point',
                    coordinates:[longitude,latitude]
                }
    
    
                db_response = await developer.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs:techs_array,
                    location
                })
            }

            return res.json(
                db_response
            )
        }
    }

    removeDev(){
        return async (req, res) => {
            const {id} = req.query
            const db_response = await developer.remove({_id:id})  
            return res.json(db_response)
        }
    }
}

module.exports = DeveloperControler