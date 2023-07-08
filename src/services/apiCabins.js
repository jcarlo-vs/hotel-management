import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }

  return data
}
//

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)
  console.log(data)
  if (error) {
    console.log(error)
    throw new Error('Cabin could not be deleted')
  }

  return data
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  )

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // https://cdkkhzqcqabybgpmgmch.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created')
  }

  // UPLOAD IMAGE

  // const avatarFile = event.target.files[0]
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id)
    throw new Error('Cabin image could not be uploaded nor created')
  }

  return data
}
