import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { OTPVerificationScreen } from '../screens/OTPVerificationScreen';
import { SeedPhraseScreen } from '../screens/SeedPhraseScreen';
import { DrawerNavigator } from './DrawerNavigator';
import { ChatScreen } from '../screens/ChatScreen';
import { VoiceVideoCallScreen } from '../screens/VoiceVideoCallScreen';
import { FileViewerScreen } from '../screens/FileViewerScreen';
import { SecureStorage } from '../services/security/SecureStorage';

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);

    const checkAuthStatus = useCallback(async () => {
        try {
            const token = await SecureStorage.getToken();
            setIsAuthenticated(!!token);
            setShowOnboarding(!token); // Show onboarding only if user has never logged in
        } catch (error) {
            setIsAuthenticated(false);
            setShowOnboarding(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    if (isLoading) {
        return null; // Or add a splash screen component
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            >
                {!isAuthenticated ? (
                    <>
                        {showOnboarding && (
                            <Stack.Screen
                                name="Onboarding"
                                options={{ animation: 'fade' }}
                            >
                                {(props) => (
                                    <OnboardingScreen
                                        {...props}
                                        onComplete={() => setShowOnboarding(false)}
                                    />
                                )}
                            </Stack.Screen>
                        )}
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
                        <Stack.Screen
                            name="SeedPhrase"
                            options={{ gestureEnabled: false }}
                        >
                            {(props) => (
                                <SeedPhraseScreen
                                    {...props}
                                    onSuccess={() => setIsAuthenticated(true)}
                                />
                            )}
                        </Stack.Screen>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Main" component={DrawerNavigator} />
                        <Stack.Screen
                            name="Chat"
                            options={{}}
                        >
                            {(props) => (
                                <ChatScreen
                                    {...props}
                                    groupName={props.route.params?.groupName}
                                    onBack={() => props.navigation.goBack()}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen
                            name="Call"
                            options={{}}
                        >
                            {(props) => (
                                <VoiceVideoCallScreen
                                    {...props}
                                    isVideoCall={props.route.params?.isVideoCall ?? false}
                                    onEndCall={() => props.navigation.goBack()}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen
                            name="FileViewer"
                            options={{}}
                        >
                            {(props) => (
                                <FileViewerScreen
                                    {...props}
                                    fileType={props.route.params?.fileType}
                                    fileName={props.route.params?.fileName}
                                    onClose={() => props.navigation.goBack()}
                                />
                            )}
                        </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
