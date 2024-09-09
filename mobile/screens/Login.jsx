import { StyleSheet, View, Dimensions, Pressable } from 'react-native'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Card, MD3Colors, Text, TextInput } from 'react-native-paper'
import * as yup from "yup"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLoginMobileUserMutation } from '../redux/authApi'

const Login = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showForgetPassword, setShowForgetPassword] = useState(false)
    const [login, { isLoading, isSuccess, isError, error, data }] = useLoginMobileUserMutation()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required("Enter Email").email("Enter Valid Email"),
            password: yup.string().required("Enter Password"),
        }),
        onSubmit: (values, { resetForm }) => {
            login(values)

            resetForm()
        }
    })
    useEffect(() => {
        if (isSuccess) {
            AsyncStorage.setItem("mobile-user", JSON.stringify(data.result))
                .then(() => navigation.navigate("Home"))
                .catch(() => console.warn("unable to AsyncStorge"))
        }
    }, [isSuccess])
    return (
        <View>
            <Card style={styles.card}>
                {isError && <View><Text>{JSON.stringify(error)}</Text></View>}

                {<View><Text>{JSON.stringify(formik.values)}</Text></View>}
                {<View><Text>{JSON.stringify(formik.values)}</Text></View>}
                {<View><Text>{JSON.stringify(formik.errors)}</Text></View>}
                <Card.Title title="Login" />
                <Card.Content>
                    {
                        showForgetPassword
                            ? <ForgetPassword />
                            : <>
                                <TextInput
                                    value={formik.values.email}
                                    onChangeText={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                    mode='outlined'
                                    error={formik.touched.email && formik.errors.email}
                                    label="Enter Email"
                                />
                                {formik.touched.email && formik.errors.email && <Text style={styles.errorText}>{formik.errors.email}</Text>}

                                <TextInput
                                    value={formik.values.password}
                                    style={styles.input}
                                    mode='outlined'
                                    onChangeText={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                    error={formik.touched.password && formik.errors.password}
                                    label="Enter Password"
                                    secureTextEntry={!showPassword}
                                    right={<TextInput.Icon
                                        icon={showPassword ? "eye" : "eye-off"}
                                        onPress={() => setShowPassword(!showPassword)} />}
                                />
                                {formik.touched.password && formik.errors.password && <Text style={styles.errorText}>{formik.errors.password}</Text>}

                                <Button onPress={formik.handleSubmit} disabled={formik.errors.email || formik.errors.password} mode='contained'>Login</Button>
                            </>
                    }

                </Card.Content>
            </Card>
        </View>
    )
}
export default Login

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get("screen").height,
        backgroundColor: MD3Colors.primary95
    },
    card: {
        width: 350,
        marginTop: 100,
        marginLeft: 20
    },
    input: {
        marginVertical: 8
    },
    errorText: {
        marginTop: 10,
        color: MD3Colors.error50
    },
    switchText: {
        textAlign: "center",
        marginTop: 10
    }
})