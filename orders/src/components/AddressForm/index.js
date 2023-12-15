import {Formik} from 'formik';
import {
  Alert,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {v4} from 'react-native-uuid/src/v4';
import * as Yup from 'yup';
import {colors} from '../../config/colors';
import {send_address_data} from '../../services/Address/send_address_data';
import {send_customer_data} from '../../services/Customer/send_customer_data';
import {send_order} from '../../services/Order/send_order';
import {send_products} from '../../services/Products/send_products';
import {update_products} from '../../services/Products/update_products';
import styles from './styles';

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

const AddressForm = ({route}) => {
  const {order} = route.params;

  const handleSubmit = async values => {
    order.id = v4();
    order.address = values;
    order.address.id = v4();
    order.address.customerEmail = order.customer.email;
    order.products = order.products.map(product => ({
      ...product,
      orderId: order.id,
    }));

    await send_customer_data(order.customer);

    await send_address_data(order.address, order.customer);

    await send_order(order);

    await update_products(order.products);

    await send_products(order.products);

    Alert.alert('Wysłano zamówienie!');
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
