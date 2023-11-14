import {StyleSheet} from 'react-native';
import {colors} from '../../config/colors';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    paddingHorizontal: 15,
  },
  formContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    width: '100%',
  },
  title: {
    color: colors.navy,
    fontSize: 26,
    fontWeight: '400',
    marginBottom: 15,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputStyle: {
    borderColor: colors.navy,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  errorTxt: {
    fontSize: 12,
    color: colors.red,
  },
  submitBtn: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  submitBtnTxt: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});
