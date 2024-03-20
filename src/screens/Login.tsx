import {
    BackHandler,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Button,
    ScrollView,
    SafeAreaView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup'
import { Formik, ErrorMessage, FormikValues } from 'formik';
import { getRandomNumber, renderError } from '../utility/Helper';
import { config } from '../utility/config';
import { RootState } from '../store';
import { connect } from 'react-redux';
import { loginAPI } from '../store/Service/login';
import { MODE_OF_OPERATIONS } from '../models/model';
import { PATTERN_FOR_ONLY_ALPHABATES } from '../utility/Validation_Helper';
interface Login {
    companyCode: string;
}
const Login = (props) => {

    // Define a reference for Formik
    const formikRef = React.useRef<any>();

    // Initial form values
    const initform: Login = {
        companyCode: ''
    };

    // Define validation schema for form fields using Yup
    const validationSchema = Yup.lazy<any>((values) => {
        return Yup.object().shape({
            companyCode: Yup.string()
                .required("Company Code is Required")
                .matches(PATTERN_FOR_ONLY_ALPHABATES, 'Please enter valid Company Code')
                .nullable()
        });
    });

    const [modeOfOperation, setModeOfOperation] = useState<any>(null);

    /**
    * Function to handle login action.
    * @param {FormikValues} values - Form values containing company code.
    */
    const handleLogin = async (values: FormikValues) => {

        const param = {
            DeviceID: getRandomNumber(),
            CompanyCode: values.companyCode
        }
        const response = await props.loginAPI(param)
        if (response) {
            props.navigation.navigate('Home');
        }
    }

    useEffect(() => {
        BackHandler.addEventListener('closeApp', _closeApp);

        // cleanup function
        return () => {
            BackHandler.removeEventListener("closeApp", _closeApp);
        };

    }, []);
    const _closeApp = () => {

        if (props.navigation.isFocused()) {
            BackHandler.exitApp();
        }
    }

    useEffect(() => {
        return () => {
            setModeOfOperation(null);
        }
    }, [])


    return (
        <SafeAreaView style={styles.safeareaview}>
        <ScrollView>
            <View style={styles.container}>

                <Formik
                    enableReinitialize
                    initialValues={{
                        ...initform as any,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                    innerRef={formikRef}
                >
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                        setFieldTouched,
                        handleSubmit
                    }) => (
                        <>

                            <View style={styles.logoContainer}>
                                <Image style={styles.logo} source={require("../assets/images/logo.png")} resizeMode='contain' />
                            </View>
                            <View style={styles.welcomeContainer}>
                                <Text style={styles.welcomeText}>Welcome to</Text>
                                <Text style={styles.welcomeText}>Proof Of Delivery</Text>
                            </View>
                            <View style={styles.formContainer}>
                                <View style={styles.formgroup}>
                                    <Text style={styles.formLabel}>Enter Company Code</Text>
                                    <View style={styles.formginnerroup}>
                                        <View style={styles.formggroupicon}>
                                            <Image style={styles.formggroupiconimg} source={require("../assets/images/buildings.png")} />
                                        </View>
                                        <TextInput maxLength={4} placeholder="Company Code" value={values.companyCode} onChangeText={handleChange('companyCode')} onBlur={handleBlur('companyCode')} style={styles.formcontrol} placeholderTextColor="#7D7C7B" />
                                    </View>
                                    <ErrorMessage
                                        name="companyCode"
                                        render={renderError}
                                    />
                                </View>
                                <View style={styles.formgroup}>
                                    <Text style={styles.formLabel}>Select Mode of Operation</Text>

                                    <View style={styles.operationgroup}>
                                        <View style={styles.operationcol}>
                                            <TouchableOpacity onPress={() => { setModeOfOperation(MODE_OF_OPERATIONS.QA) }} >
                                                <Text style={[styles.operationtext, modeOfOperation && modeOfOperation === MODE_OF_OPERATIONS.QA && styles.activeoperationtext]}>QA</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.operationcol}>
                                            <TouchableOpacity onPress={() => { setModeOfOperation(MODE_OF_OPERATIONS.LIVE) }}>
                                                <Text style={[styles.operationtext, modeOfOperation && modeOfOperation === MODE_OF_OPERATIONS.LIVE && styles.activeoperationtext]}>Live</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>
                                <View style={styles.buttonOuter}>
                                    <TouchableOpacity onPress={handleSubmit}>
                                        <Text style={styles.buttonStyle}>Log In</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View >
                                <Text style={styles.version}>Android V.2.1.02</Text>
                            </View>
                        </>

                    )}
                </Formik>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        loginData: state.loginReducer.loginData
    };
};

const mapDispatchToProps = {
    loginAPI
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    safeareaview: {flex:1},
    container: {
        flex: 1,
        backgroundColor: "#FAF9FA",
        padding: 30,
        paddingBottom: 70,
    },
    scrollView: {
        flex: 1,
        height: '100%',
    },
    logoContainer: {
        justifyContent: "flex-start", flex: 0, flexDirection: "row", marginBottom: 0, marginTop: 50,
    },
    logo: {
        width: 80,
        height: 60,
    },
    welcomeContainer: {
        marginTop: 20,
        marginBottom: 30
    },
    welcomeText: {
        fontSize: 30,
        color: "#2D3C5C",
        fontWeight: '600',
        marginBottom: 0
    },
    formContainer: {
        marginTop: 0,
        width: '100%',
    },
    formgroup: {
        marginBottom: 26,
        paddingBottom: 2,
        position: 'relative',
    },
    formginnerroup: {
        position: 'relative',
    },
    formggroupicon: {
        position: 'absolute',
        left: 11,
        zIndex: 9,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center'
    },
    formggroupiconimg: {
        width: 22,
        height: 22,
    },
    formLabel: {
        color: '#4D5A78',
        marginBottom: 5,
        fontWeight: '500',
    },
    formcontrol: {
        backgroundColor: "#FFFFFF",
        paddingLeft: 40, paddingRight: 12, paddingTop: 5, paddingBottom: 5,
        height: 50,
        borderRadius: 6,
        borderWidth: 2,
        color: '#BBC5D8',
        fontSize: 14,
        fontWeight: '500',
        borderColor: '#BBC5D8'
    },
    operationgroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    operationcol: {
        width: '49%',
    },
    operationtext: {
        padding: 10,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#E5EAF3',
        textAlign: 'center',
        fontSize: 18,
        color: '#8C97AF',
        fontWeight: '600',overflow:"hidden",
    },
    activeoperationtext: {
        backgroundColor: '#0C86EA',
        borderColor: '#0C86EA',
        color: '#FFF',
        borderRadius: 6,
    },
    buttonOuter: {
        marginTop: 200
    },
    buttonStyle: {
        backgroundColor: '#0C86EA',
        borderColor: '#0C86EA',
        color: '#FFF',
        fontSize: 16,
        padding: 12,
        borderRadius: 25,
        borderWidth: 2,
        textAlign: 'center',
        overflow:"hidden",
    },
    version: {
        textAlign: 'center',
        color: '#9CA6BD',
        marginTop: 10,
        fontSize: 14, fontWeight: '500',
    }
})