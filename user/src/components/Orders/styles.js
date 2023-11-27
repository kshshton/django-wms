import {StyleSheet} from 'react-native';
import {colors} from '../../config/colors.js';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  orderBtn: {
    width: '80%',
    backgroundColor: colors.blue,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});
