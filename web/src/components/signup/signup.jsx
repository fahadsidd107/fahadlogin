import { Formik, Field, Form, useFormik } from "formik";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Item from '@mui/material/Grid'
import * as yup from 'yup';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { baseUrl } from "./../../core"

const validationSchema = yup.object({

    name: yup
        .string('Enter your Name')
        .required('Name is required'),

    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),

    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .max(10, 'No more then 10')
        .required('Password is required'),

    contact: yup
        .string('Enter your Contact')
        .min(11, "invalid number")
        .max(11, "invalid number")
        .required('contact number is required'),

    address: yup
        .string('Enter your address')
        .required('Address is required'),
    website: yup
        .string('Enter your profile/URL')
        .url("please enter valid URL e.g: https://somewebsite.com")
        .required('profile/URL is required'),
});

function Signup() {
    let history = useHistory();
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            name: '',
            email: '',
            password: '',
            contact: '',
            address: '',
            website: '',
        },
        onSubmit: function (values) {
            console.log("values: ", values)
            axios.post(`${baseUrl}/api/v1/signup`, {
                name: values.name,
                email: values.email,
                password: values.password,
                contact: values.contact,
                address: values.address,
                website: values.website,
            })
                .then((res) => {
                    console.log("res: ", res.data);
                    if (res.data === "profile created") {
                        alert("Signed up")
                        setTimeout(() => {
                            history.push("/login")
                        }, 1000);
                    }
                })
        }
    });

    return (

        <div style={{ padding: "1rem" }}>
            <h1 style={{ margin: "auto", padding: "1rem", textAlign: "center" }}>Sign Up</h1>
            <br />
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xl={6} lg={6} xs={12} sm={12} md={12} sx={{ width: "50%", margin: "auto" }} >
                        <Item >
                            <Stack spacing={3}  >
                                <TextField
                                    color="secondary"
                                    id="outlined-basic"
                                    label="Name"
                                    placeholder="enter your name"
                                    variant="outlined"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />

                                <TextField
                                    color="secondary"
                                    id="outlined-basic"
                                    label="Email"
                                    placeholder="enter email address"
                                    variant="outlined"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />

                                <TextField
                                    color="secondary"
                                    id="filled-basic"
                                    label="Password"
                                    placeholder="enter your password"
                                    variant="outlined"
                                    type="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />

                                <TextField
                                    color="secondary"
                                    id="filled-basic"
                                    label="Contact"
                                    placeholder="enter your Contact Number"
                                    variant="outlined"
                                    // type="s"
                                    name="contact"
                                    value={formik.values.contact}
                                    onChange={formik.handleChange}
                                    error={formik.touched.contact && Boolean(formik.errors.contact)}
                                    helperText={formik.touched.contact && formik.errors.contact}
                                />

                                <TextField
                                    color="secondary"
                                    id="filled-basic"
                                    label="address"
                                    placeholder="enter your address"
                                    variant="outlined"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                />

                                <TextField
                                    color="secondary"
                                    id="outlined-basic"
                                    label="Website"
                                    placeholder="enter Website"
                                    variant="outlined"
                                    name="website"
                                    value={formik.values.website}
                                    onChange={formik.handleChange}
                                    error={formik.touched.website && Boolean(formik.errors.website)}
                                    helperText={formik.touched.website && formik.errors.website}
                                />

                                <Grid item xl={6} lg={6} xs={12} sm={12} md={12}  >
                                    <Item >
                                        <Button sx={{ marginBottom: "1%" }} variant="contained" color="primary" type="submit" >Sign up</Button>
                                       
                                    </Item >
                                </Grid>
                            </Stack>
                        </Item >
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default Signup;