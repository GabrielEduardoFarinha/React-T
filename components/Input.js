import { TextInput, StyleSheet, TextInputProps } from 'react-native';
export function Input({ ...rest }: TextInputProps) {
  return <TextInput {...rest} style={styles.input} />;
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    marginBottom: 10
  },
});
