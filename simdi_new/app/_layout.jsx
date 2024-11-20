import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot , Stack} from 'expo-router'
import { UserProvider } from './component/userDetails'; 
const pages=['index','options', 'items', 'rides', 'delivery']
const _layout = () => {
  return (
    <UserProvider>
    <Stack>
      {
        pages.map((item, key)=>{
         return  <Stack.Screen key={key} name={item}  options={{
            headerShown:false
          }}/>
        })
      }
      
    </Stack>
    </UserProvider>
  )
}


export default _layout

const styles = StyleSheet.create({

})