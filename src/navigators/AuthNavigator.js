


import React from 'react';
import { FluidNavigator } from 'react-navigation-fluid-transitions';

import { Icon } from 'react-native-vector-icons/MaterialIcons'
import { createStackNavigator }  from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { TouchableHighlight } from 'react-native';
import DismissButton from '../components/common/DismissButton';
import themes from '../styleTheme';

const BackButton = ({onPress}) => (
    <TouchableHighlight onPress={onPress}>
        <Icon name="keyboard-backspace"/>
    </TouchableHighlight>
)


const AuthNavigator = createStackNavigator(
    {
        SignIn: {
            screen: LoginScreen,
            navigationOptions: ({navigation}) => {
                return {
                    headerLeft: ( <DismissButton onPress={() => {navigation.navigate('Main')}} color={themes.base.colors.white.default}/>),
                    headerTransparent: true,
                    headerStyle: {
                        shadowColor: 'transparent',
                        borderBottomWidth: 0,
                    }
                }
            }

        },
        SignUp: {
            screen: SignupScreen,

            navigationOptions: ({navigation}) => ({
                title: 'Sign Up',
                headerMode: 'screen',
                headerTransparent: true,
                headerTintColor: '#fff',
                headerStyle: {
                    shadowColor: 'transparent',
                    borderBottomWidth: 0,
                }


            })
        }
    },
    {
        mode: 'modal',
        headerMode: 'screen',



    }

);

export default AuthNavigator;