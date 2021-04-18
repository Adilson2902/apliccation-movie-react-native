import React,{useState} from 'react'

import { Alert,View,Text,Image, TouchableOpacity,StyleSheet,Modal, Pressable, ScrollView} from 'react-native'
import CardView from 'react-native-cardview'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import MyFavActors from '../../components/actors';

export default function CardFilmes(props){
  const [modalVisible, setModalVisible] = useState(false);

  const [ids, setIds] = useState([])
  const [actor,setActors] = useState([])
  const DataFilme = new Date(props.date)
 
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('filmesfav')
   
      if(value !== null) {
    
         setIds(JSON.parse(value))

      }
    } catch(e) {
    console.log(e)
    }
  }
  
if(ids.length == 0){
    getData()
} 

  
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('filmesfav', jsonValue)

      console.log(jsonValue)
    } catch (e) {
       console.log(e)
    }
  }


  

  async function getactor(id){
 
    setModalVisible(true)
    await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=a8cbd4a6c8fd3751e243ac49bcf0438b&language=en-US`)
    .then(
     (resp)  =>  
      setActors(resp.data.cast)

      
    ).then(
      console.log(actor.length)
    ).catch(
        (err) => console.log(err)
    )
  }



  function renderActors(){

    if(actor.length > 0){
    return  actor.map((item,index) =>{

      return(
      <MyFavActors key={item.id} profile_path={item.profile_path} character={item.character} original_name={item.original_name}></MyFavActors>
      
      )
      })
    }
    
  }

    function add  (id)  {

      const newId = [id,...ids]

      setIds(newId)


      storeData(ids)

      
      
     

    }


    return(
       <View>
        <CardView >
           <View style={{flexDirection:"row",alignItems:"center",margin:10,borderWidth:1}}>

          <View style={{width:"35%",justifyContent:"center",marginLeft:10}}>

         
            <Image
                style={{
                    width: "80%",
                    height: 158,
                    margin: 5
                  }}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${props.poster_path}`,
                }}
              />
       </View>
          <View style={{width:"35%",justifyContent:"center"}}>
              <Text style={{margin:2,textAlign:"center"}}>Titulo</Text>
              <Text style={{margin:3,textAlign:"center"}}>{props.title}</Text>
          </View>


     
  
            
     <TouchableOpacity  style={{
      justifyContent: 'center',
      alignItems: 'center',
      width: 93,
      height: 39,
      borderRadius: 8,
      
      
      marginRight:10
      }}  
     
      >



    <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal está fechando ");
              setModalVisible(!modalVisible);
            }}
          >
            <ScrollView>
            <View style={styles.modalView}>




            <View style={{alignItems:"center"}}>

            <TouchableOpacity  style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 93,
                  height: 39,
                  borderRadius: 8,
                  marginBottom:10,
                  flexDirection:"row"
              }} onPress={() => add({id:props.id+Math.random(),
                                    url:`https://image.tmdb.org/t/p/w500${props.poster_path}`,
                                    title:props.title,
                                    date:DataFilme,
                                    sinopse:props.sinopse,
                                    pessoas:props.pessoas,
                                    nota:props.nota


                                    }) }>

            <Image style={{width:30,height:40,marginRight:15}} source={require("../../assets/favoritar.png")}></Image>
            <Text>Favoritar</Text>
            </TouchableOpacity>


            
            </View>
            <Image
            style={{
                width: "80%",
                height: 308,
                margin: 5
              }}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${props.poster_path}`,
            }}
          />
              <View >
                <View style={styles.column}>
                
        
                <Text style={styles.modalText}>{props.title}({DataFilme.getFullYear()})  </Text>

                <View style={styles.rowfavoritar}>
                <Text style={{width:"100%",height:75}}  ><Image style={{width:50,height:40}} source={require("../../assets/person.png")}></Image> {props.pessoas}             <Image style={{width:30,height:40}} source={require("../../assets/star.png")}></Image> {props.nota} </Text>
                
                </View>
                <Text>{props.sinopse}</Text>
                </View>
            
          
              
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  
                    onPress={() => getactor(props.id)}
                    >

                  <Text style={styles.textStyle}>Ver Atores</Text>

                 
                  </Pressable>
                  {renderActors()}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Voltar</Text>
                </Pressable>
            
              </View>
            </View>
            </ScrollView>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() =>  getactor(props.id)}
          >
          
          <Image source={require("../../assets/icon-info.png")} 
          style={{ width: 63,
        height: 65,margin:5,tintColor:"#000"}}></Image>
          </Pressable>
        </View>
            
                </TouchableOpacity>
           


                </View>

          

            </CardView>

        
                    


            </View>
        )
    }



//styles modal
const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
      
        backgroundColor: "white",
        borderRadius: 20,
        width:"100%",height:"100%",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },column:{
        flexDirection:"column",
        padding:10
        
      },rowfavoritar:{
        flexDirection:"row"
        , alignItems:"center", justifyContent:"space-between"
        , padding:10
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#fff",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
        margin:10
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        
        textAlign: "center",
      
        padding:5,
        width:"100%"
      }
    });