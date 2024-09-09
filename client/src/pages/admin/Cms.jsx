import clsx from 'clsx'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from "yup"
import { useAddTechMutation, useDeleteTechMutation, useGetTechnologiesQuery, useUpdateTechMutation } from '../../redux/adminApi'
import UseDevLog from '../../hooks/UseDevLog'
import { toast } from 'react-toastify'
import { useAddSocialMutation, useDeleteSocialMutation, useGetSocialQuery, useUpdateSocialMutation } from '../../redux/socialApi'
import { useAddCarouselMutation, useDeleteCarouselMutation, useGetAllCarouselQuery, useUpdateCarouselMutation } from '../../redux/carouselApi'
const Cms = () => {
    const [selectedCompo, setSelectedCompo] = useState(<Tech />)
    return <>
        <div className='d-flex'>
            <div className='bg-light'>
                <div onClick={e => setSelectedCompo(<Tech />)} style={{ cursor: "pointer" }} className='p-2 px-3' >Technologies</div>
                <div onClick={e => setSelectedCompo(<Carousel />)} style={{ cursor: "pointer" }} className='p-2 px-3' >Carousel</div>
                <div onClick={e => setSelectedCompo(<Social />)} style={{ cursor: "pointer" }} className='p-2 px-3' >Social Links</div>
            </div>
            <div className='flex-grow-1'>
                <div className="card">
                    <div className="card-body">
                        {selectedCompo}
                    </div>
                </div>
            </div>
        </div>
    </>
}

const Tech = () => {
    const [selectedTech, setSelectedTech] = useState()
    const [addTech, { isSuccess, isError, error, isLoading }] = useAddTechMutation()
    const { data } = useGetTechnologiesQuery()

    const [deleteTech, { isSuccess: deleteSucess, isError: deletIseerror, isLoading: deleteLoading, error: deleteerror }] = useDeleteTechMutation()
    const [updateTech, { isSuccess: updateSuces, isError: updateIsError, isLoading: updateIsloading, error: updaterror }] = useUpdateTechMutation()
    const devPrint = UseDevLog()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedTech ? selectedTech.name : "",
            category: selectedTech ? selectedTech.category : "",
            _id: selectedTech ? selectedTech._id : "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            category: yup.string().required("Enter category"),
        }),
        onSubmit: (values, { resetForm }) => {
            if (selectedTech) {
                updateTech(values)
            } else {
                addTech(values)
            }
            resetForm()
        }
    })

    const handleClasses = key => clsx({
        "form-control my-2": true,
        "is-invalid": formik.touched[key] && formik.errors[key],
        "is-valid": formik.touched[key] && !formik.errors[key]
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Technogly Create Success")
        }
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            toast.error("unable to create technologyes")
        }
    }, [isError])

    useEffect(() => {
        if (deleteSucess) {
            toast.error("Technology Delete Success")
        }
    }, [deleteSucess])

    useEffect(() => {
        if (isError) {
            toast.error("Unabele to delete Technogloy")
        }
    }, [isError])
    useEffect(() => {
        if (deleteSucess) {
            toast.error("Technology Delete Success")
        }
    }, [deleteSucess])

    useEffect(() => {
        if (isError) {
            toast.error("Unabele to delete Technogloy")
        }
    }, [isError])


    return <>
        {isError && devPrint(error)}
        {deletIseerror && devPrint(deleteerror)}

        <form onSubmit={formik.handleSubmit} >
            <div>
                <input className={handleClasses("name")} {...formik.getFieldProps("name")} type="text" />
                <span className='invalid-feedback'>{formik.errors.name}</span>
            </div>
            <div>
                <select {...formik.getFieldProps("category")} className={handleClasses("category")}>
                    <option >Choose Category</option>
                    <option value="frontend">Frontend </option>
                    <option value="backend">Backend</option>
                    <option value="mobile">Mobile</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="hosting">Hosting</option>
                </select>
                <span className='invalid-feedback'>{formik.errors.category}</span>
            </div>
            {/* <pre>{JSON.stringify(selectedTech, null, 2)}</pre> */}
            {selectedTech
                ? <button disabled={isLoading} type="submit" class="btn btn-dark">
                    {isLoading
                        ? <>Please Wait <div class="spinner-border text-primary"></div>
                        </>
                        : "Update Technology"
                    }
                </button>
                : <button disabled={isLoading} type="submit" class="btn btn-dark">
                    {isLoading
                        ? <>Please Wait <div class="spinner-border text-primary"></div>
                        </>
                        : "Add Technology"
                    }
                </button>
            }
            {/* <button disabled={isLoading} type="submit" class="btn btn-dark">
                {isLoading
                    ? <>Please Wait <div class="spinner-border text-primary"></div>
                    </>
                    : "Add Technology"
                }
            </button> */}
        </form>

        <table className='table table-bordered mt-5'>
            <thead>
                <tr>
                    <th>name</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {data && data.map(item => <tr>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>
                        <button type="button" onClick={e => setSelectedTech(item)} class="btn btn-outline-warning mx-2">Edit</button>
                        <button disabled={deleteLoading} type="button" onClick={e => deleteTech(item._id)} class="btn btn-outline-danger mx-2">
                            {deleteLoading
                                ? <>Please Wait <div class="spinner-border text-primary"></div>
                                </>
                                : "Delete Technology"
                            }
                        </button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </>
}

const Carousel = () => {
    const [addcarousel, { isSuccess, isError, isLoading, error }] = useAddCarouselMutation()
    const { data } = useGetAllCarouselQuery()
    const [deleteCarousel, { isSuccess: deleteSUccess, isLoading: deleteLoading, isError: deleteIserror, error: deletError }] = useDeleteCarouselMutation()
    const [selectedCarsouel, setselectedCarsouel] = useState()
    const [isnew, setIsnew] = useState(false)
    const [show, setShow] = useState(false)
    const [updateCarsuel, { isSuccess: updatesuccess }] = useUpdateCarouselMutation()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            hero: selectedCarsouel ? selectedCarsouel.hero : "",
            caption: selectedCarsouel ? selectedCarsouel.caption : "",
        },
        validationSchema: yup.object({
            hero: yup.mixed().required("Enter hero"),
            caption: yup.string().required("Enter Name"),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (selectedCarsouel) {
                const fd = new FormData()
                for (const key in values) {
                    fd.append(key, values[key])
                }
                fd.append("_id", selectedCarsouel._id)
                updateCarsuel({ _id: selectedCarsouel._id, fd })

            } else {
                const fd = new FormData()
                for (const key in values) {
                    fd.append(key, values[key])
                }
                // fd.append("hero", values.hero)
                // fd.append("caption", values.caption)
                addcarousel(fd)
            }
            resetForm()
        }
    })

    useEffect(() => {
        if (updatesuccess) {
            setselectedCarsouel(null)
        }
    }, [updatesuccess])


    const handleClasses = key => clsx({
        "form-control my-2": true,
        "is-invalid": formik.touched[key] && formik.errors[key],
        "is-valid": formik.touched[key] && !formik.errors[key]
    })

    return <div>
        <form onSubmit={formik.handleSubmit}>
            <div>
                {selectedCarsouel
                    ? isnew
                        ? <><div class="input-group">
                            <input onChange={(event) => {
                                formik.setFieldValue('hero', event.currentTarget.files[0]);
                            }} type="file" class="form-control" />
                            <button type="button" onClick={e => setIsnew(false)} class="btn btn-primary">Cancle</button>
                        </div></>
                        : <> <img src={selectedCarsouel.hero} height={50} alt="" />
                            <button type="button" onClick={e => setIsnew(true)} class="btn btn-primary">Chnage Image</button>
                        </>

                    : <>
                        <div>
                            <input onChange={(event) => {
                                formik.setFieldValue('hero', event.currentTarget.files[0]);
                            }} type="file" class={handleClasses("hero")} placeholder="Enter Your Name" />
                            <span className='invalid-feedback'>{formik.errors.hero}</span>
                        </div>
                    </>
                }
            </div>
            <div>
                <input {...formik.getFieldProps("caption")} type="text" class={handleClasses("caption")} placeholder="Enter Your caption" />
                <span className='invalid-feedback'>{formik.errors.caption}</span>
            </div>
            {selectedCarsouel

                ? <>
                    <button type="submit" class="btn btn-warning mx-3">Update Carsousel</button>
                    <button type="button" onClick={e => setselectedCarsouel(null)} class="btn btn-primary">Cancel Update</button>
                </>


                : <button type="submit" class="btn btn-primary">Add Carsousel</button>
            }
        </form >


        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>hero</th>
                    <th>caption</th>
                </tr>
            </thead>

            <tbody>
                {data && data.map(item => <tr>
                    <td>
                        <img height={50} src={item.hero} />
                        {/* <img height={50} src={`http://localhost:5000/${item.hero}`} /> */}
                    </td>
                    <td>{item.caption}</td>
                    <td>
                        <button type="button" onClick={e => setselectedCarsouel(item)} class="btn btn-outline-warning mx-2">Edit</button>

                        <button disabled={deleteLoading} type="button" onClick={e => deleteCarousel(item._id)} class="btn btn-outline-danger mx-2">
                            {deleteLoading
                                ? <>Please Wait <div class="spinner-border text-primary"></div>
                                </>
                                : "Delete"
                            }
                        </button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </div >


}
const Social = () => {
    const { data } = useGetSocialQuery()
    const [selectedSocial, setSelectedSocial] = useState()
    const [addsocial, { isSuccess, isError, isLoading, error }] = useAddSocialMutation()
    const [deleteSocial, { isSuccess: deleteSuces, isLoading: deleteLoading, isError: deleteIsError, error: deleteeror }] = useDeleteSocialMutation()
    const [updatesocial, { isSuccess: updateSUccess, isError: updateerIserror, error: udaterror, isLoading: updateLoading }] = useUpdateSocialMutation()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedSocial ? selectedSocial.name : "",
            link: selectedSocial ? selectedSocial.link : "",
            _id: selectedSocial ? selectedSocial._id : "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            link: yup.string().required("Enter Link"),
        }),
        onSubmit: (values, { resetForm }) => {
            if (selectedSocial) {
                updatesocial(values)
            } else {
                addsocial(values)
            }
            setSelectedSocial(null)
            resetForm()
        }
    })

    const handleClasses = key => clsx({
        "form-control my-2": true,
        "is-invalid": formik.touched[key] && formik.errors[key],
        "is-valid": formik.touched[key] && !formik.errors[key]
    })
    useEffect(() => {
        if (isSuccess) {
            toast.success("Social Create Success")
        }
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            toast.error("unable to social technologyes")
        }
    }, [isError])

    useEffect(() => {
        if (deleteSuces) {
            toast.error("Social Delete Success")
        }
    }, [deleteSuces])

    useEffect(() => {
        if (deleteIsError) {
            toast.error("Unabele to delete Socail")
        }
    }, [deleteIsError])
    useEffect(() => {
        if (updateSUccess) {
            toast.warn("Social Update Success")
        }
    }, [updateSUccess])

    useEffect(() => {
        if (isError) {
            toast.error("Unabele to delete Technogloy")
        }
    }, [isError])


    return <div>
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input className={handleClasses("name")} {...formik.getFieldProps("name")} type="text" placeholder='Enter Social Media Name' />
                <span className='invalid-feedback'>{formik.errors.name}</span>
            </div>
            <div>
                <input className={handleClasses("link")} {...formik.getFieldProps("link")} type="text" placeholder='Enter Social Media Live Link' />
                <span className='invalid-feedback'>{formik.errors.link}</span>
            </div>
            {/* <button type="submit" class="btn btn-primary">Add Social Media</button> */}

            {selectedSocial
                ? <button disabled={isLoading} type="submit" class="btn btn-dark">
                    {isLoading
                        ? <>Please Wait <div class="spinner-border text-primary"></div>
                        </>
                        : "Update social"
                    }
                </button>
                : <button disabled={isLoading} type="submit" class="btn btn-dark">
                    {isLoading
                        ? <>Please Wait <div class="spinner-border text-primary"></div>
                        </>
                        : "Add Social"
                    }
                </button>
            }
        </form>

        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>name</th>
                    <th>Link</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {data && data.map(item => <tr>
                    <td>{item.name}</td>
                    <td>{item.link}</td>
                    <td>
                        <button type="button" onClick={e => setSelectedSocial(item)} class="btn btn-outline-warning mx-2">Edit</button>

                        <button disabled={deleteLoading} type="button" onClick={e => deleteSocial(item._id)} class="btn btn-outline-danger mx-2">
                            {deleteLoading
                                ? <>Please Wait <div class="spinner-border text-primary"></div>
                                </>
                                : "Delete"
                            }
                        </button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </div>

}

export default Cms