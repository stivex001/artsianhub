"use client"
import React from "react"
import { CameraIcon, NoImageIcon } from "../assets/icons/SvgIcons"
import Image from "next/image"
import { toast } from "sonner"

type ChangeProfileProps = {
  setSelectedFile: (value: File) => void
  selectedFile: File | null
  profileImageUrl?: string 
  art?: boolean
  className?: string
}

export const ChangeProfilepics = ({
  setSelectedFile,
  selectedFile,
  profileImageUrl,
  art,
  className,
}: ChangeProfileProps) => {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const maxSize = 3 * 1024 * 1024 // 3MB in bytes
      if (file.size > maxSize) {
        toast.error("File size cannot be more than 3MB")
        return
      }
      setSelectedFile(file)
    }
  }

  const renderImage = () => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile)
    }
    if (profileImageUrl) {
      return profileImageUrl
    }
    return null
  }

  const imageSrc = renderImage()

  return (
    <div
      className={`
        flex flex-col items-center gap-2 bg-[#F9F9FB] rounded-2xl w-[230px] p-6
        ${className}
      `}
    >
      <label className="text-sm font-medium text-gray-700 text-center">
        {art ? "Professional Photo" : "Profile Photo"}
      </label>

      <div className="relative">
        <div className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="Profile"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          ) : (
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <div className="mt-6">
                <NoImageIcon />
              </div>
            </div>
          )}
        </div>

        <label
          htmlFor="photo-upload"
          className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer"
        >
          <CameraIcon />
        </label>

        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>

      {art && (
        <p className="text-xs text-[#667185]">250x250 Min size / 3 MB Max</p>
      )}
    </div>
  )
}
