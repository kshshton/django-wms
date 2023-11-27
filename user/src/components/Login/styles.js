import {StyleSheet} from 'react-native';
import {colors} from '../../config/colors.js';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: colors.lightBlue,
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: colors.black,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgotAndSignUpText: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: colors.blue,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});
