'use client'

import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Upload, X, FileAudio } from 'lucide-react'
import { MeetingFormData, PRICING_TIERS, AUSTRALIAN_STATES, MEETING_TYPES, BuildingSize } from '@/types'
import { validateFile, formatFileSize } from '@/lib/storage'

export default function UploadPortal() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<MeetingFormData>({
    defaultValues: {
      buildingSize: 'medium'
    }
  })

  const buildingSize = watch('buildingSize')
  const selectedPrice = PRICING_TIERS.find(tier => tier.size === buildingSize)?.price || 0

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setError(null)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const validation = validateFile(file)
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }
      setSelectedFile(file)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const validation = validateFile(file)
      if (!validation.valid) {
        setError(validation.error || 'Invalid file')
        return
      }
      setSelectedFile(file)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setError(null)
  }

  const onSubmit = async (data: MeetingFormData) => {
    if (!selectedFile) {
      setError('Please select a file to upload')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('buildingSize', data.buildingSize)
      formData.append('state', data.state)
      formData.append('meetingType', data.meetingType)
      formData.append('buildingName', data.buildingName)
      formData.append('meetingDate', data.meetingDate)
      formData.append('email', data.email)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setUploading(false)
    }
  }

  return (
    <section id="upload" className="py-32 bg-background">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-md font-bold text-primary mb-4">
            Upload Your Meeting Recording
          </h2>
          <p className="text-body-lg text-secondary">
            Fill in the details below and upload your recording to get started
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="bg-surface rounded-2xl p-8 border border-border">
            {/* Building Size Selector */}
            <div className="mb-8">
              <label className="block text-body-md font-medium text-primary mb-4">
                Building Size
              </label>
              <div className="grid grid-cols-3 gap-4">
                {PRICING_TIERS.map((tier) => (
                  <button
                    key={tier.size}
                    type="button"
                    onClick={() => setValue('buildingSize', tier.size as BuildingSize)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      buildingSize === tier.size
                        ? 'border-accent bg-accent bg-opacity-10'
                        : 'border-border hover:border-secondary'
                    }`}
                  >
                    <div className="text-heading-md font-bold text-primary mb-1">
                      {tier.label}
                    </div>
                    <div className="text-body-sm text-secondary mb-2">
                      {tier.units}
                    </div>
                    <div className="text-heading-lg font-bold text-accent">
                      ${tier.price}
                    </div>
                  </button>
                ))}
              </div>
              <input
                type="hidden"
                {...register('buildingSize', { required: true })}
                value={buildingSize}
              />
            </div>

            {/* State and Meeting Type */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="state" className="block text-body-md font-medium text-primary mb-2">
                  State
                </label>
                <select
                  id="state"
                  {...register('state', { required: 'State is required' })}
                  className="w-full h-12 px-4 bg-surface-elevated text-primary border border-border rounded-lg focus:border-accent focus:outline-none"
                >
                  <option value="">Select state</option>
                  {AUSTRALIAN_STATES.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.code} - {state.name}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-body-sm text-red-500 mt-1">{errors.state.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="meetingType" className="block text-body-md font-medium text-primary mb-2">
                  Meeting Type
                </label>
                <select
                  id="meetingType"
                  {...register('meetingType', { required: 'Meeting type is required' })}
                  className="w-full h-12 px-4 bg-surface-elevated text-primary border border-border rounded-lg focus:border-accent focus:outline-none"
                >
                  <option value="">Select type</option>
                  {MEETING_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.meetingType && (
                  <p className="text-body-sm text-red-500 mt-1">{errors.meetingType.message}</p>
                )}
              </div>
            </div>

            {/* Building Name and Meeting Date */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="buildingName" className="block text-body-md font-medium text-primary mb-2">
                  Building/Scheme Name
                </label>
                <input
                  id="buildingName"
                  type="text"
                  {...register('buildingName', { required: 'Building name is required' })}
                  placeholder="e.g., Parkview Apartments"
                  className="w-full h-12 px-4 bg-surface-elevated text-primary border border-border rounded-lg focus:border-accent focus:outline-none placeholder-secondary"
                />
                {errors.buildingName && (
                  <p className="text-body-sm text-red-500 mt-1">{errors.buildingName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="meetingDate" className="block text-body-md font-medium text-primary mb-2">
                  Meeting Date
                </label>
                <input
                  id="meetingDate"
                  type="date"
                  {...register('meetingDate', { required: 'Meeting date is required' })}
                  className="w-full h-12 px-4 bg-surface-elevated text-primary border border-border rounded-lg focus:border-accent focus:outline-none"
                />
                {errors.meetingDate && (
                  <p className="text-body-sm text-red-500 mt-1">{errors.meetingDate.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-body-md font-medium text-primary mb-2">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                placeholder="you@example.com"
                className="w-full h-12 px-4 bg-surface-elevated text-primary border border-border rounded-lg focus:border-accent focus:outline-none placeholder-secondary"
              />
              {errors.email && (
                <p className="text-body-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* File Upload */}
            <div className="mb-8">
              <label className="block text-body-md font-medium text-primary mb-2">
                Meeting Recording
              </label>
              
              {!selectedFile ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                    dragActive
                      ? 'border-accent bg-accent bg-opacity-5'
                      : 'border-border hover:border-secondary'
                  }`}
                >
                  <Upload className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <p className="text-body-lg text-primary mb-2">
                    Drag and drop your file here, or click to browse
                  </p>
                  <p className="text-body-sm text-secondary mb-4">
                    MP3, WAV, MP4, MOV up to 500MB
                  </p>
                  <label
                    htmlFor="file-upload"
                    className="inline-block px-6 py-3 bg-surface-elevated text-primary border border-border rounded-lg hover:border-primary transition-all cursor-pointer"
                  >
                    Choose File
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    accept="audio/mp3,audio/wav,video/mp4,video/quicktime,.mp3,.wav,.mp4,.mov"
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="border border-border rounded-xl p-6 flex items-center justify-between bg-surface-elevated">
                  <div className="flex items-center space-x-4">
                    <FileAudio className="w-10 h-10 text-accent" />
                    <div>
                      <p className="text-body-md font-medium text-primary">{selectedFile.name}</p>
                      <p className="text-body-sm text-secondary">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg">
                <p className="text-body-sm text-red-500">{error}</p>
              </div>
            )}

            {/* Price Summary */}
            <div className="mb-6 p-6 bg-accent bg-opacity-10 border border-accent rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-body-lg text-primary font-medium">Total</span>
                <span className="text-display-sm font-bold text-accent">${selectedPrice}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="w-full py-4 bg-accent text-white rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-body-lg font-medium"
            >
              {uploading ? (
                <span className="flex items-center justify-center">
                  <span className="spinner mr-2"></span>
                  Processing...
                </span>
              ) : (
                `Process Meeting & Pay $${selectedPrice}`
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
