import {StyleSheet} from 'react-native'


export  const styles = StyleSheet.create({
 container:{
   flex:1,
   backgroundColor: "#FFF",

 },header:{
    
    flexDirection:"row",
    justifyContent:"center",
    padding: 30,
    backgroundColor:"#000000",
    
    alignItems:"center"
    

 },textheader:{
    color:"#fff"
 },textsearch:{
    fontSize: 18, 
    color: '#FFF', 
    fontWeight: '100',
    width:"70%"
 },input:{
    width: '65%',
    color: '#000',
    backgroundColor:"#FFF",
    fontSize: 18,
    margin:15,
    borderWidth:1,
    borderRadius:16,
    padding:5

}, searchButton:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 93,
    height: 39,
    borderRadius: 8,
    backgroundColor: '#000000',
    marginRight:10
}, viewInput:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:  '100%',
    borderWidth: 1
}


})