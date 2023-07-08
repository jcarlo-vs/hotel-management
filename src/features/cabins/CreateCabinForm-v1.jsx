import styled from 'styled-components'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { useForm } from 'react-hook-form'
import { createCabin } from '../../services/apiCabins'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import FormRow from '../../ui/FormRow'

function CreateCabinForm({ cabin }) {
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, getValues, formState } = useForm()
  const { errors } = formState
  console.log(errors)

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => createCabin(data),
    onSuccess: () => {
      toast.success('New Cabin successfully created')
      queryClient.invalidateQueries({ queryKey: ['cabins'] })
      reset()
    },
    onError: () => {
      toast.error(`Can't create new cabin`)
    },
  })

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] })
  }

  function onError(err) {
    console.log(err)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.namne?.message}>
        {
          <Input
            type='text'
            id='namne'
            disabled={isLoading}
            {...register('namne', {
              required: 'This field is required',
            })}
          />
        }
      </FormRow>

      <FormRow label='Maximum Capacity' error={errors?.maxCapacity?.message}>
        {
          <Input
            type='text'
            id='maxCapacity'
            {...register('maxCapacity', {
              required: 'This field is required',
              min: 1,
            })}
          />
        }
      </FormRow>

      <FormRow label='Regular Price' error={errors?.regularPrice?.message}>
        {
          <Input
            type='text'
            id='regularPrice'
            {...register('regularPrice', {
              min: 1,
              required: 'This field is required',
            })}
          />
        }
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        {
          <Input
            type='text'
            id='discount'
            {...register('discount', {
              required: 'This field is required',
              validate: (value) =>
                value < getValues().regularPrice ||
                'It must not higher than regular price',
            })}
          />
        }
      </FormRow>

      <FormRow label='Description' error={errors?.description?.message}>
        {
          <Textarea
            type='text'
            id='description'
            {...register('description', {
              required: 'This field is required',
            })}
          />
        }
      </FormRow>

      <FormRow label='image'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <div id='btn'>
          <Button variation='secondary' type='reset'>
            Cancel
          </Button>
          <Button disabled={isLoading}>Edit cabin</Button>
        </div>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
