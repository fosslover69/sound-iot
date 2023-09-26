import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const ApiChecker = () => {
  const [apiResponse, setApiResponse] = useState(null); 
  const [isLocked, setIsLocked] = useState(false);
  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await axios.get('http://yourlocalip:5173/getData'); // Replace with your local ip
        const data = response.data;
        console.log(data);
        if(data && data.data==="true") {
          setIsLocked(true);
        }
        const respose = await axios.get('http://yourlocalip:5173/update_opp'); // Replace with your local ip
        console.log(respose.data);
      } catch (error) {
        console.error('Error fetching API:', error);
        setApiResponse('Error fetching API');
      }
    };

    // Check the API every 5 seconds (adjust the interval as needed)
    const intervalId = setInterval(checkApi, 2000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);

  }, []);
  const toggleLock = () => {
    setIsLocked(!isLocked);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{isLocked ? 'Locked' : 'Unlocked'}</Text>
      {isLocked&&
      <Button
        title={isLocked ? 'Unlock' : 'Lock'}
        onPress={toggleLock}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default ApiChecker;
