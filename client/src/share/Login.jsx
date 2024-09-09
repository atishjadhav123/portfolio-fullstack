import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'
import { useLoginUserMutation } from '../redux/authApi'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UseDevLog from '../hooks/UseDevLog'

const Login = () => {
    const devprint = UseDevLog()
    const [loginAdmin, { isSuccess, isError, error, isLoading }] = useLoginUserMutation()

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required("Enter Email").email(),
            password: yup.string().required("Enter Password"),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            loginAdmin(values)
            resetForm()
        }
    })

    const handleClass = key => clsx({
        "form-control my-2": true,
        "is-invalid": formik.touched[key] && formik.errors[key],
        "is-valid": formik.touched[key] && !formik.errors[key]
    })

    useEffect(() => {
        if (isSuccess) {
            navigate("/admin")
        }
    }, [isSuccess])

    return <>
        <div class="container">
            <div class="row">
                {
                    devprint(formik.errors)
                }
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header">Login</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div class="card-body">
                                <div>
                                    <label for="email" class="form-label">First Email</label>
                                    <input
                                        type="text"
                                        {...formik.getFieldProps("email")} className={handleClass("email")}
                                        id="email"
                                        placeholder="Enter Your Email"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.email}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="password" class="form-label">Password</label>
                                    <input
                                        type="password"
                                        {...formik.getFieldProps("password")}
                                        className={handleClass("password")}
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.password}</div>
                                </div>
                                <button
                                    type="submit" class="btn btn-primary w-100 mt-3">
                                    {/* {isLoading ? <>
                                        <div class="spinner-border text-primary"></div>
                                        <span>Verfiying ...</span>
                                    </> : "Login"} */}
                                    login

                                </button>
                                <p class="text-center mt-3">
                                    Dont Have Account? <a href="#">Create Account</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default Login