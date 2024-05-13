import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg={"gray.200"}
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: "gray.200",
        bg: "gray.200"
      }}
      {...rest}
    />
  );
}
