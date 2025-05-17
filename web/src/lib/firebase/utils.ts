import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

import { storage } from "@/lib/firebase/storage"

export async function uploadImage(file: File) {
  const storageRef = ref(storage, `images/${file.name}`)
  const snapshot = await uploadBytes(storageRef, file)
  const url = await getDownloadURL(snapshot.ref)
  return url
}
