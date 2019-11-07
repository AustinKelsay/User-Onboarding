import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Formik, withFormik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const UserForm = ({values, touched, errors, handleSubmit, handleChange, status, isSubmitting}) => {
    const [form, setForm] = useState([])

    useEffect(() => {
        status && setForm(form => [...form, status])
    },[status])
   // console.log(handleChange)
    
    return(
        <Formik
          initialValues={{ uName: '',  email: '', password: '', terms: false}}
          render={props => {
            return(
            <div>
              <Form onSubmit={handleSubmit}>
            <div>
                {touched.uName && errors.uName && (
                    <p>Error: {errors.uName}</p>
                    )} 
                    <Field name='uName' type='text' placeholder='enter name' value={values.uName} onChange={handleChange} />
            </div>

            <div>
                {touched.email && errors.email && (
                    <p>Error: {errors.email}</p>
                    )} 
                    <Field name='email' type='text' placeholder='enter email' value={values.email} onChange={handleChange} />
            </div>

            <div>
                {touched.password && errors.password && (
                    <p>Error: {errors.password}</p>
                    )}
                    <Field name='password' type='text' placeholder='enter password' value={values.password} onChange={handleChange} />
            </div>

            <div>
                {touched.terms && errors.terms && (
                    <p>Error: {errors.terms}</p>
                    )}
                    <Field type='checkbox' id='terms' name='terms' checked={values.terms} onChange={handleChange} />
            </div>
    
                <button type="submit" >Submit</button>
              </Form>
              
              {form.map(form => (
                  <div>
                  <h3>{form.uName}</h3>
                  <h3>{form.email}</h3>
                  <h3>{form.password}</h3>
                  </div>
              ))}
              </div>
            )
          }}
        />
      );

}
const formikUserForm = withFormik({
    mapPropsToValues({uName, email, password, terms}){
        console.log()
        return {
          uName: uName || "",
          email: email || "",
          password: password ||  "",
          terms: terms
        };
    },
      validationSchema: yup.object().shape({
          uName: yup.string()
          .required()
          .min(2)
          .max(18),

          email: yup.string()
          .email()
          .required(),

          password: yup.string()
          .min(6)
          .required(),
          terms: yup.bool().required("Must accept our terms")
     }),
    handleSubmit:(values, { setStatus }) => {
        axios.post('https://reqres.in/api/users', values)
          .then(res => {
              console.log(res.data);
              setStatus(res.data)   
          })
          .catch(err => console.log(err.respons))

    }


})(UserForm);

export default formikUserForm;