import { View, Text, Image } from 'react-native'
import React from 'react'

const mainScreen = () => {
  return (
    <View>
        <Image source={require('../../assets/sunset2.jpg')} style={{ height: '100%', width: '100%'}}/>
    </View>
  )
}

export default mainScreen