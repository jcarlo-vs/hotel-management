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

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

function CreateCabinForm() {
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

      <FormRow2>
        <Label htmlFor='image'>Cabin photo</Label>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: 'This field is required',
          })}
        />
      </FormRow2>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isLoading}>Edit cabin</Button>
      </FormRow2>
    </Form>
  )
}

export default CreateCabinForm
