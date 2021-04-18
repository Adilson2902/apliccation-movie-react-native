import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { View,Text, TextInput, TouchableOpacity, ScrollView ,Pressable,Modal,StyleSheet,Alert} from 'react-native'

import {styles} from './styles.js'
import CardFilmes from '../Filmes/index.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react'
import MyFavMovies from '../../components/filmesfav/index.js'




export default function Home (){
    const [modalVisible, setModalVisible] = useState(false);
 const [filmes,SetFilmes] = useState('')
const [result,setResult] = useState([])
const [favoritos,setFavoritos] = useState([])



 useEffect(() =>{

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('filmesfav')
       
          if(value !== null) {
        
             setFavoritos(JSON.parse(value))
    
          }
        } catch(e) {
        console.log(e)
        }
      }
      
   if(favoritos.length > 0){

    setInterval(() =>{
        getData()
    },60000)
   }else{
       getData()
   }
 
       
    

 },[])
    




// unico problema que tive esse objeto bugou :( 
console.log("Objeto Bugado no Ansyc :( ->" , favoritos)





function renderFav(){

   
    
if(favoritos.length > 0){
       

  


        return favoritos.map((item,index) =>{
        
          

         return( 


         <MyFavMovies key={item.id+Math.random()} profile_path={item.url} title={item.title} />
         )              
        })
   
   
   
    }
             
              
  

   

}



async function TitleforApi(){

        
    await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a8cbd4a6c8fd3751e243ac49bcf0438b&language=en-US&query=${filmes}&page=1&include_adult=false`)
    .then(
     (resp)  =>  
   setResult(resp.data.results)

    ).then(
        SetFilmes("")
    ).catch(
        (err) => console.log(err)
    )


    
 
 

}

function render(){

   
    if(result.length > 0){
    

            return result.map((item,index) =>{

                return(
                 
                      
                   <CardFilmes key={index} id={item.id} poster_path={item.poster_path} title={item.title} date={item.release_date} sinopse={item.overview} pessoas={item.popularity} nota={item.vote_average}></CardFilmes>
                 
                )
            })

    }

   

}






    return(
     <View  style={styles.container} >
         <View style={styles.header}>
        
         <Text style={styles.textheader}>Tudo Sobre Filmes</Text>
         </View>
         
         
         <View style={styles.viewInput}>
            <TextInput placeholder="Digite seu filme aqui" placeholderTextColor={'#919191'} value={filmes} onChangeText={(text) => { SetFilmes(text) }} style={styles.input} />
            <TouchableOpacity onPress={() => TitleforApi()} style={styles.searchButton}>
            <Text style={styles.textsearch}>Buscar</Text>
            </TouchableOpacity>
         </View>
        <ScrollView>
        {render() }

        
        
        <View style={styless.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styless.centeredView}>
          <View style={styless.modalView}>
              <ScrollView>
          <Text style={{textAlign:"center",fontWeight:"bold",margin:10}}>Filmes Favoritos</Text>
        {renderFav()}
            <Pressable
              style={[styless.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styless.textStyle}>Voltar</Text>
            </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styless.button, styless.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styless.textStyle}>Favoritos</Text>
      </Pressable>
    </View>
        
        
        
        
        
        
        
        
       
        </ScrollView>
    
      
       
     
      
     </View>

    )
}


const styless = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      
      backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width:"100%"
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#000",
      margin:10
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
      marginBottom: 15,
      textAlign: "center"
    }
  });
  