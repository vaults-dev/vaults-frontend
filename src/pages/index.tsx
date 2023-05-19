import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data: any) => {
    const test = await axios
      .post('https://vaults-backend-production.up.railway.app/login', data, {
        withCredentials: true,
      })
      .catch((error) => console.log(error))

    const res2 = await axios.get(
      'https://vaults-backend-production.up.railway.app/home',
      { withCredentials: true }
    )

    console.log(res2)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />

      <input {...register('password', { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}
