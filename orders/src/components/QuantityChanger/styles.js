import {StyleSheet} from 'react-native';
import {colors} from '../../config/colors';

export default StyleSheet.create({
  container: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftButton: {
    fontSize: 20,
    color: colors.blue,
    paddingRight: 14,
  },
  rightButton: {
    fontSize: 20,
    color: colors.blue,
    paddingLeft: 1,
  },
  quantityText: {
    marginHorizontal: 1,
    paddingHorizontal: 1,
    fontSize: 16,
  },
});
