import React from 'react'
// Hooks
import { useForm } from 'react-hook-form'
// Components
import { Button, Grid, TextField, InputAdornment, Typography } from '@mui/material'
import { toast } from 'react-toastify'
// Icons
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import PhoneIcon from '@mui/icons-material/Phone'
import PersonIcon from '@mui/icons-material/Person'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

const semantic_constraints = (
  required: string, 
  min: number = 2, 
  max: number = 50
) => {
  const rules: any = {
    required: {value: true, message: required}, 
    maxLength: {value: max, message: `cannot be longer than ${max} characters.`}
  }

  if (min > 0) rules.minLength = {value: min, message: `cannot be less than ${min} characters.`}
  if (required === 'Phone is required.') rules.pattern = {value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, message: 'Invalid phone number'}

  return rules
}

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    console.log(data)
    toast.success('Registration completed!.')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h4' component='h1' gutterBottom style={{textAlign: 'center', color:'#010101'}}>
        Case Study 1
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}> 
          <TextField
            label="Name(s)"
            autoComplete="off"
            {...register('firstName', semantic_constraints('Name(s) is required.'))}
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ''}
            placeholder='Sonny'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}> 
          <TextField
            label="Surname(s)"
            autoComplete="off"
            placeholder='Arce'
            {...register('lastName', semantic_constraints('Surname(s) is required.'))}
            helperText={errors.lastName ? errors.lastName.message : ''}
            error={!!errors.lastName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}> 
          <TextField
            label="Email"
            type="email"
            placeholder='sonnymijael@gmail.com'
            {...register('email', semantic_constraints('Email is required.', 0))}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}> 
          <TextField
            label="Phone"
            type="tel"
            {...register('phone', semantic_constraints('Phone is required.', 0, 20))}
            error={!!errors.phone}
            placeholder='3141160772'
            helperText={errors.phone ? errors.phone.message : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}> 
          <TextField
            label="Password"
            type="password"
            placeholder='********'
            {...register('password', { 
              required: {value: true, message: 'Please enter your password'}, 
              minLength: {value: 8, message: 'cannot be less than 8 characters.'},
              maxLength: {value: 25, message: 'cannot be less than 25 characters.'}, 
              validate: {
                lowercase: value => /[a-z]/.test(value) || 'Must contain at least one lowercase letter.',
                uppercase: value => /[A-Z]/.test(value) || 'Must contain at least one capital letter.',
                number: value => /[0-9]/.test(value) || 'Must contain at least one number.',
                special: value => /[!@#$%^&*]/.test(value) || 'Must contain at least one special character (!@#$%^&*).',
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}> 
          <TextField
            label="Repeat Password"
            type="password"
            placeholder='********'
            {...register('confirmPassword', {
              required: "You must confirm your password",
              validate: value => value === watch('password') || "Passwords do not match"
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">Register</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default RegistrationForm