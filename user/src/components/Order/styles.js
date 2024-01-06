import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors.js';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemList: {
    marginTop: 17.5,
    marginBottom: 17.5,
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: colors.lightBlue,
  },
  itemText: {
    fontSize: 20,
    color: colors.black,
  },
});
