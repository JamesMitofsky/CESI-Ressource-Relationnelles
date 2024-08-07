import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  Link,
  useToast,
  Toast,
  Box,
  CheckIcon,
  Checkbox, ToastTitle,
  InputField,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  InputIcon,
  FormControlHelper,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  ButtonText, Heading,
  LinkText,
  InputSlot,
  EyeIcon,
  EyeOffIcon
} from '@gluestack-ui/themed';

import { Link as ExpoLink } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Keyboard } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import SideContainerWeb from './SideContainerWeb';
import axios from 'axios';
import { BASE_URL } from '../../globals/port';
import HeaderComponent from '../../components/HeaderComponent';
import ReturnButtonComponent from '../../components/ReturnButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string(),
  // .min(6, 'Must be at least 8 characters in length')
  // .regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
  // .regex(new RegExp('.*[a-z].*'), 'One lowercase character')
  // .regex(new RegExp('.*\\d.*'), 'One number')
  // .regex(
  //   new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
  //   'One special character',
  //)
  rememberme: z.boolean().optional(),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const toast = useToast();

  const onSubmit = (_data: SignInSchemaType) => {
    const loginUser = async () => {

      try {
        const response = await axios.post(
          `${BASE_URL}/api/users/login`,
          _data,
        );
        await AsyncStorage.setItem('token', response.data.token);

        const token = await AsyncStorage.getItem('token');
        console.log(token);
        console.log('Vous etes maintenant connectez', response);
        toast.show({
          placement: 'bottom right',
          render: ({ id }) => {
            return (
              <Toast nativeID={id} variant="accent" action="success">
                <ToastTitle>Vous êtes connecté !</ToastTitle>
              </Toast>
            );
          },
        });

        router.navigate('/')
      } catch (error) {
        console.error('Error logging in  user:', error);
      }
    };
    loginUser();
    // Implement your own onSubmit and navigation logic here.
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };

  return (
    <>
      <VStack justifyContent="space-between">
        <FormControl isInvalid={!!errors.email} isRequired={true}>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{
              validate: async value => {
                try {
                  await signInSchema.parseAsync({
                    email: value,
                  });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  fontSize="$sm"
                  placeholder="Email"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} size="md" />
            <FormControlErrorText>
              {errors?.email?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl
          my="$6"
          isInvalid={!!errors.password}
          isRequired={true}
        >
          <Controller
            name="password"
            defaultValue=""
            control={control}
            rules={{
              validate: async value => {
                try {
                  await signInSchema.parseAsync({
                    password: value,
                  });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  fontSize="$sm"
                  placeholder="Mot de passe"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                  type={showPassword ? 'text' : 'password'}
                />
                <InputSlot onPress={handleState} pr="$3">
                  <InputIcon
                    as={showPassword ? EyeIcon : EyeOffIcon}
                  />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertTriangle} size="sm" />
            <FormControlErrorText>
              {errors?.password?.message}
            </FormControlErrorText>
          </FormControlError>

          <FormControlHelper></FormControlHelper>
        </FormControl>
      </VStack>
      <Link ml="auto">
        <LinkText fontSize="$xs">Mot de pass oublié ?</LinkText>
      </Link>
      <Controller
        name="rememberme"
        defaultValue={false}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            my="$5"
            size="sm"
            value="Remember me"
            isChecked={value}
            onChange={onChange}
            alignSelf="flex-start"
          >
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Souvienir de moi</CheckboxLabel>
          </Checkbox>
        )}
      />
      <Button
        variant="solid"
        size="lg"
        mt="$5"
        onPress={handleSubmit(onSubmit)}
      >
        <ButtonText fontSize="$sm">CONNEXION</ButtonText>
      </Button>
    </>
  );
};

function MobileHeader() {
  return (
    <VStack px="$3" mt="$4.5" space="md">
      <HStack space="md" alignItems="center"></HStack>
      <VStack space="xs" ml="$1" my="$4">
        <Heading
          color="$textLight50"
          sx={{
            _dark: {
              color: '$textDark50',
            },
          }}
        >
          Bonjour !
        </Heading>
        <Text
          fontSize="$md"
          fontWeight="normal"
          color="$primary300"
          sx={{
            _dark: {
              color: '$textDark400',
            },
          }}
        >
          Sign in to continue
        </Text>
      </VStack>
    </VStack>
  );
}

function LoginFormComponent() {
  return (
    <Box flex={1}>
      <>
        <Box
          sx={{
            '@md': { display: 'none' },
          }}
        >
          <MobileHeader />
        </Box>
        <Box
          px="$4"
          sx={{
            '@md': {
              px: '$8',
              borderTopLeftRadius: '$none',
              borderTopRightRadius: '$none',
              borderBottomRightRadius: '$none',
            },
            _dark: {
              bg: '$backgroundDark800',
            },
          }}
          py="$8"
          flex={1}
          bg="$backgroundLight0"
          justifyContent="space-between"
          borderTopLeftRadius="$2xl"
          borderTopRightRadius="$2xl"
          borderBottomRightRadius="$none"
        >
          <ReturnButtonComponent />
          <HeaderComponent />
          <Heading
            display="none"
            mb="$8"
            sx={{
              '@md': {
                display: 'flex',
                fontSize: '$2xl',
              },
            }}
          >
            Connectez-vous à votre compte
          </Heading>
          <SignInForm />
          <HStack
            space="xs"
            alignItems="center"
            justifyContent="center"
            mt="auto"
          >
            <Text
              color="$textLight500"
              fontSize="$sm"
              sx={{
                _dark: {
                  color: '$textDark400',
                },
              }}
            >
              Pas de compte ?
            </Text>
            <ExpoLink href="/connexion/inscrire/">
              <LinkText fontSize="$sm">Inscrivez-vous !</LinkText>
            </ExpoLink>
          </HStack>
        </Box>
      </>
    </Box>
  );
}

export default function SignIn() {
  return (
    <>
      <Box
        sx={{
          '@md': {
            display: 'flex',
          },
        }}
        flex={1}
        display="none"
      >
        <SideContainerWeb />
      </Box>
      <Box flex={1}>
        <LoginFormComponent />
      </Box>
    </>
  );
}
