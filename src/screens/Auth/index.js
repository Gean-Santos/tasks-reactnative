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
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: true,
  }

  render() {
    return(
      <ImageBackground 
        style={styles.background}
        source={backgroundImage}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>
            {this.state.stageNew ? 'Crie a sua conta': 'Informe seus dados'}
          </Text>
          {this.state.stageNew && 
            <TextInput placeholder='Nome' 
              value={this.state.name} 
              style={styles.input}
              onChangeText={name => this.setState({name})} /> 
          }
          <TextInput placeholder='E-mail' 
            value={this.state.email} 
            style={styles.input}
            onChangeText={email => this.setState({email})}
          />
          <TextInput placeholder='Senha' 
            value={this.state.password} 
            style={styles.input}
            onChangeText={password => this.setState({password})}
            secureTextEntry={true}
          />
          {this.state.stageNew &&
            <TextInput placeholder='Confirmação de senha' 
            value={this.state.confirmPassword} 
            style={styles.input}
            onChangeText={confirmPassword => this.setState({confirmPassword})} 
            secureTextEntry={true}/>
          }
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };
}