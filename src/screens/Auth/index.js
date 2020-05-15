import React, { Component } from 'react';
import { 
  ImageBackground, 
  Text, 
  View, 
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import backgroundImage from '../../../assets/imgs/login.jpg';

export default class Auth extends Component {

  state = {
    email: '',
    password: '',
  }

  render() {
    return(
      <ImageBackground 
        style={styles.background}
        source={backgroundImage}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <TextInput placeholder='E-mail' 
            value={this.state.email} 
            style={styles.input}
            onChangeText={email => this.setState({email})}
          />
          <TextInput placeholder='Senha' 
            value={this.state.password} 
            style={styles.input}
            onChangeText={password => this.setState({password})}
          />
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };
}