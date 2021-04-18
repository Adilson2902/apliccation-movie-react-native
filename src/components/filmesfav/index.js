import * as React from 'react';
import { View,Image ,Text} from 'react-native';

import CardView from 'react-native-cardview'
 
export default function MyFavMovies (props)  {
   


  return (
    <View>
      <CardView >
       
      <View style={{flexDirection:"row",alignItems:"center",marginBottom:15,borderWidth:1,width:"100%"}}>

     <View style={{width:"50%",justifyContent:"center",marginLeft:10}}>

    
       <Image
           style={{
               width: "80%",
               height: 158,
               margin: 5
             }}
           source={{
             uri: props.profile_path,
           }}
         />
      </View>
     <View style={{width:"35%",justifyContent:"center"}}>
         <Text style={{margin:2,textAlign:"center"}}>Titulo</Text>
         <Text>{props.title}</Text>
         
     </View>
    </View>
    </CardView>
    </View>
  );
};



