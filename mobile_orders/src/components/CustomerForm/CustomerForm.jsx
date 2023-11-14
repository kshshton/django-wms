import {
  Alert,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {colors} from '../../config/colors';

const CustomerFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Wartość jest zbyt krótka!')
    .max(50, 'Wartość jest zbyt długa!')
    .required('Obowiązkowe pole!'),
  lastName: Yup.string()
    .min(2, 'Wartość jest zbyt krótka!')
    .max(50, 'Wartość jest zbyt długa!')
    .required('Obowiązkowe pole!'),
  email: Yup.string().email('Błędny email!').required('Obowiązkowe pole!'),
  phone: Yup.string()
    .length(9, 'Nieprawidłowy numer!')
    .matches(/^\d+$/, 'Nieprawidłowy numer!')
    .optional(),
});

const CustomerForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      }}
      validationSchema={CustomerFormSchema}
      onSubmit={values => Alert.alert(JSON.stringify(values))}>
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <View style={styles.wrapper}>
          <StatusBar barStyle={'light-content'} />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Dane osobowe</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Imię"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={() => setFieldTouched('firstName')}
              />
              {touched.firstName && errors.firstName && (
                <Text style={styles.errorTxt}>{errors.firstName}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Nazwisko"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={() => setFieldTouched('lastName')}
              />
              {touched.lastName && errors.lastName && (
                <Text style={styles.errorTxt}>{errors.lastName}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="E-mail"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorTxt}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Numer telefonu"
                keyboardType={'phone-pad'}
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={() => setFieldTouched('phone')}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.errorTxt}>{errors.phone}</Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.submitBtn,
                {backgroundColor: isValid ? colors.gray : colors.turquoise},
              ]}
              disabled={!isValid}>
              <Text style={styles.submitBtnTxt}>Dalej</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default CustomerForm;
