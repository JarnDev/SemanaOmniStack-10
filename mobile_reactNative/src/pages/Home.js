import * as React from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Dimensions, Image } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import { FontAwesome } from '@expo/vector-icons'
import dev_api from '../services/dev_api'
function Home({navigation}){
    const [currentRegion, setRegion] = React.useState(null)
    const [devList, setDevList] = React.useState([])
    const [techs, setTechs] =  React.useState('')

    async function loadInit(){
        const {latitude, longitude} = currentRegion
        // console.log("OK")
        const api_response = await dev_api.get('/dev/searchNearby',{
            params:{
                latitude,
                longitude,
                techs: techs
            }
        })
        // console.log(api_response.data)
        setDevList(api_response.data)
    }

    function updateRegion(region){
        // console.log(region)
        setRegion(region)
    }

    React.useEffect(()=>{
        async function selfLocation(){
            const {granted} = await requestPermissionsAsync();

            if(granted){
                const location = await getCurrentPositionAsync({
                    enableHighAccuracy:true
                })
                const {latitude, longitude} = location.coords
                
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta:0.01,
                    longitudeDelta:0.01
                })

            }
        }
        selfLocation()
    },[])

    return(
        <View style={styles.container}>
            <MapView onRegionChangeComplete={updateRegion} initialRegion={currentRegion} style={styles.mapStyle}>
                {devList.map(dev =>(

                <Marker key={dev._id}coordinate={{latitude:dev.location.coordinates[1], longitude:dev.location.coordinates[0]}}>
                    <Image style={styles.markerImg} source={{uri:dev.avatar_url}}/>
                    <Callout onPress={()=>{
                        navigation.navigate('GitProfile',{github_username:'jarn40'})
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.name}>{dev.name}</Text>
                            <Text style={styles.bio}>{dev.bio}</Text>
                            <Text style={styles.techs}>{dev.techs.join(', ')}</Text>
                        </View>
                    </Callout>
                </Marker>
                
                
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput 
                style={styles.search}
                placeholder='Find devs by techs under 10Km'
                placeholderTextColor='#667'
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={text => setTechs(text)}
                />
                <TouchableOpacity onPress={loadInit} style={styles.searchButton}>
                    <FontAwesome  name="search" size={20} color='white'/>    
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    markerImg:{
        width:50,
        height:50,
        borderRadius:50
    },
    callout:{
        width:200
    },
    name:{
        fontWeight:'bold',
        fontSize:15
    },
    bio:{
        color:'#667',
        marginTop:5
    },
    techs:{
        marginTop:5
    },
    searchForm:{
        position:'absolute',
        top:30,
        left:20,
        right:20,
        zIndex:5,
        flexDirection:'row'
    },
    search:{
        flex:1,
        height:50,
        backgroundColor:'#fff',
        borderRadius:25,
        paddingHorizontal:20,
        shadowColor:'#000',
        shadowOpacity: 0.5,
        shadowOffset:{
            width:5,
            height:5
        },
        elevation: 5
    },
    searchButton:{
        width:50,
        height:50,
        backgroundColor:'gray',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10
    }
  });

export default Home