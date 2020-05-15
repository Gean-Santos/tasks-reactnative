import React, { Component } from 'react';
import { 
  ImageBackground, 
  Text, 
  View, 
  TouchableOpacity,
  Alert,
} from 'react-native';

import axios from 'axios';

import styles from './styles';
import backgroundImage from '../../../assets/imgs/login.jpg';
import AuthInput from '../../components/AuthInput';

import { server, showError, showSuccess } from '../../common';

const initialState = {
  name: '',
  email: 'geanrdn13@gmail.com',
  password: '123456',
  confirmPassword: '',
  stageNew: false,
}

export default class Auth extends Component {

  state = {...initialState}

  signinOrSignup = () => {
    if(this.state.stageNew) {
      this.signup();
    } else {
      this.signin();
    }
  }

  signup = async () => {
    try {
      await axios.post(`${server}/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      })

      showSuccess('Usuario cadastrado');
      this.setState({ ...initialState });
    } catch (error) {
      showError(error);
    }
  };

  signin = async () => {
    try {
      const response = await axios.post(`${server}/signin`, {
        email: this.state.email,
        password: this.state.password,
      });

      axios.defaults.headers.common['Authorization'] = `bearer ${response.data.token}`;
      this.props.navigation.navigate('Home');
    } catch (error) {
      showError(error);
    }
  };

  render() {
    const validations = [];
    validations.push(this.state.email && this.state.email.includes('@'));
    validations.push(this.state.password && this.state.password.length >= 6);

    if(this.state.stageNew) {
      validations.push(this.state.name && this.state.name.trim().length >= 3);
      validations.push(this.state.password === this.state.confirmPassword);
    }

    const validForm = validations.reduce((total, atual) => total && atual);

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
            <AuthInput placeholder='Nome' 
              icon='user'
              value={this.state.name} 
              style={styles.input}
              onChangeText={name => this.setState({name})} /> 
          }
          <AuthInput placeholder='E-mail' 
            icon='at'
            value={this.state.email} 
            style={styles.input}
            onChangeText={email => this.setState({email})}
          />
          <AuthInput placeholder='Senha' 
            icon='lock'
            value={this.state.password} 
            style={styles.input}
            onChangeText={password => this.setState({password})}
            secureTextEntry={true}
          />
          {this.state.stageNew &&
            <AuthInput placeholder='Confirmação de senha' 
              icon='asterisk'
              value={this.state.confirmPassword} 
              style={styles.input}
              onChangeText={confirmPassword => this.setState({confirmPassword})} 
              secureTextEntry={true}/>
          }
          <TouchableOpacity onPress ={this.signinOrSignup}
            disabled={!validForm}>
            <View style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
              <Text style={styles.buttonText}>
                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ padding: 10 }}
          onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
          <Text style={styles.buttonText}>
            {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  };
}