import { 
  StyleSheet,
  Platform
 } from 'react-native';

import commonStyles from '../../commonStyles';

export default StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
  formContainer:{
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    width: '90%',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#FFF',
    padding: Platform.OS =='ios' ? 15 : 10,
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10, 
    padding: 10,
    alignItems: 'center',
  },
  buttonText:{
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
  },
})