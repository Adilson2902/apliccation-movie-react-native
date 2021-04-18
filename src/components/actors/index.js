import * as React from 'react';
import { View,Image ,Text} from 'react-native';

import CardView from 'react-native-cardview'
 
export default function MyFavActors (props)  {
   


  return (
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
             uri: `https://image.tmdb.org/t/p/w500${props.profile_path}`,
           }}
         />
      </View>
     <View style={{width:"35%",justifyContent:"center"}}>
         <Text style={{margin:2,textAlign:"center"}}>Personagem {props.character}</Text>
         <Text style={{margin:3,textAlign:"center"}}>Nome {props.original_name}</Text>
     </View>
    </View>
    </CardView>
    </View>
  );
};



