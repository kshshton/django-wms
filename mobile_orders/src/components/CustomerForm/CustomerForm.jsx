import {StatusBar, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';

const CustomerForm = () => {
  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Dane osobowe</Text>

        <View style={styles.inputWrapper}>
          <TextInput style={styles.inputStyle} placeholder="Imię" />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput style={styles.inputStyle} placeholder="Nazwisko" />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput style={styles.inputStyle} placeholder="E-mail" />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput style={styles.inputStyle} placeholder="Numer telefonu" />
        </View>

        <TouchableOpacity onPress={() => {}} style={styles.submitBtn}>
          <Text style={styles.submitBtnTxt}>Dalej</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomerForm;
