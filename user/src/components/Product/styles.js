import {StyleSheet} from 'react-native';
import {colors} from '../../config/colors.js';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemList: {
    marginTop: 240,
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 20,
    color: colors.black,
  },
});
