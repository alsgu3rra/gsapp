import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

interface Props extends IButtonProps {
  title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase
      bg="primary.700"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{
        bg: 'primary.700'
      }}
      {...rest}
    >
      <Heading color="gray.100" fontSize="sm">
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}
