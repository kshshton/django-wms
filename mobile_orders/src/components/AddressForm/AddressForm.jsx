import {StatusBar, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {colors} from '../../config/colors';

const CustomerFormSchema = Yup.object().shape({
  city: Yup.string()
    .min(2, 'Wartość jest zbyt krótka!')
    .max(50, 'Wartość jest zbyt długa!')
    .required('Obowiązkowe pole!'),
  state: Yup.string()
    .min(2, 'Wartość jest zbyt krótka!')
    .max(50, 'Wartość jest zbyt długa!')
    .required('Obowiązkowe pole!'),
  streetName: Yup.string()
    .min(2, 'Wartość jest zbyt krótka!')
    .max(50, 'Wartość jest zbyt długa!')
    .required('Obowiązkowe pole!'),
  buildingNumber: Yup.string()
    .matches(/^\d+.*?/)
    .required('Obowiązkowe pole!'),
  apartmentNumber: Yup.string()
    .matches(/^\d+.*?/)
    .optional(),
});

const AddressForm = ({route, navigation}) => {
  const {order} = route.params;

  const handleSubmit = values => {
    const result = {
      order,
      address: values,
    };
    console.log(JSON.stringify(result));
  };

  return (
    <Formik
      initialValues={{
        city: '',
        state: '',
        streetName: '',
        buildingNumber: '',
        apartmentNumber: '',
        customerEmail: '',
      }}
      validationSchema={CustomerFormSchema}
      onSubmit={values => handleSubmit(values)}>
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
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Miejscowość"
                autoCapitalize={'words'}
                value={values.city}
                onChangeText={handleChange('city')}
                onBlur={() => setFieldTouched('city')}
              />
              {touched.city && errors.city && (
                <Text style={styles.errorTxt}>{errors.city}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Województwo"
                value={values.state}
                onChangeText={handleChange('state')}
                onBlur={() => setFieldTouched('state')}
              />
              {touched.state && errors.state && (
                <Text style={styles.errorTxt}>{errors.state}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Ulica"
                autoCapitalize={'words'}
                value={values.streetName}
                onChangeText={handleChange('streetName')}
                onBlur={() => setFieldTouched('streetName')}
              />
              {touched.streetName && errors.streetName && (
                <Text style={styles.errorTxt}>{errors.streetName}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Numer budynku"
                value={values.buildingNumber}
                onChangeText={handleChange('buildingNumber')}
                onBlur={() => setFieldTouched('buildingNumber')}
              />
              {touched.buildingNumber && errors.buildingNumber && (
                <Text style={styles.errorTxt}>{errors.buildingNumber}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Numer mieszkania"
                value={values.apartmentNumber}
                onChangeText={handleChange('apartmentNumber')}
                onBlur={() => setFieldTouched('apartmentNumber')}
              />
              {touched.apartmentNumber && errors.apartmentNumber && (
                <Text style={styles.errorTxt}>{errors.apartmentNumber}</Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.submitBtn,
                {backgroundColor: isValid ? colors.gray : colors.turquoise},
              ]}
              disabled={!isValid}>
              <Text style={styles.submitBtnTxt}>Zamów</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default AddressForm;
