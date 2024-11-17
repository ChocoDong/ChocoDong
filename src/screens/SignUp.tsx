import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { signUp } from '../auth';

// 네비게이션 타입 정의
type SignUpProps = {
    navigation: any;
};

const SignUp = ({ navigation }: SignUpProps) => {
    // 상태 관리
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // 비밀번호 유효성 검사 (8자리 이상)
    const validatePassword = (pass: string) => {
        return pass.length >= 8;
    };

    // 회원가입 처리 함수
    const handleSignUp = async () => {
        // 입력값 유효성 검사
        if (!email || !password || !confirmPassword) {
            setErrorMessage('모든 필드를 채워주세요.');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('비밀번호는 최소 8자리 이상이어야 합니다.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await signUp({ email, password });
            setErrorMessage(null);
            console.log('회원가입 성공');
            // 회원가입 성공 시 로그인 페이지로 이동
            navigation.navigate('Login');
        } catch (error) {
            setErrorMessage((error as Error).message);
        }
    };

    return (
        // 키보드가 UI를 가리지 않도록 처리
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            {/* 빈 공간 터치시 키보드 숨김 처리 */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>회원가입</Text>
                        {/* 이메일 입력 필드 */}
                        <TextInput
                            placeholder="이메일"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {/* 비밀번호 입력 필드 */}
                        <TextInput
                            placeholder="비밀번호 (8자리 이상)"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={styles.input}
                        />
                        {/* 비밀번호 확인 입력 필드 */}
                        <TextInput
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            style={styles.input}
                        />
                        {/* 에러 메시지 표시 영역 */}
                        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                        <Button title="회원가입" onPress={handleSignUp} />
                        {/* 로그인 페이지 이동 링크 */}
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.linkText}>이미 계정이 있으신가요? 로그인</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

// 스타일 정의
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    formContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    linkText: {
        color: 'blue',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default SignUp;