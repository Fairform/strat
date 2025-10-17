'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Upload, FileAudio, X, Check, Shield, Loader2 } from 'lucide-react'
import type { UploadFormData, BuildingSize } from '@/types'
import { validateFile, formatFileSize, getFileExtension, formatCurrency } from '@/lib/validation'

const PRICING = {
  small: 199,
  medium: 349,
  large: 499,
}

export default function UploadPortal() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UploadFormData>({
    defaultValues: {
      buildingSize: 'small',
      state: 'NSW',
      meetingType: 'AGM',
      buildingName: '',
      meetingDate: '',
      email: '',
      acceptedTerms: false,
    },
  })

  const buildingSize = watch('buildingSize') as BuildingSize
  const selectedPrice = PRICING[buildingSize]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    processFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    processFile(file)
  }

  const processFile = (file: File | null) => {
    const validation = validateFile(file)
    if (!validation.valid) {
      setFileError(validation.error || '')
      setSelectedFile(null)
    } else {
      setFileError('')
      setSelectedFile(file)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setFileError('')
  }

  const onSubmit = async (data: UploadFormData) => {
    if (!selectedFile) {
      setFileError('Please select a file to upload')
      return
    }

    setIsSubmitting(true)

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

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()

      // Redirect to payment
      if (result.paymentUrl) {
        window.location.href = result.paymentUrl
      } else {
        setIsSuccess(true)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setFileError('Failed to upload file. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section id="upload" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-success-600" />
            </div>
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Upload Successful!
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Check your email for payment confirmation. Your minutes will be delivered within 10 minutes.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="upload" className="py-16 md:py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
            Upload Your Meeting Recording
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Get legally compliant minutes in 10 minutes
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Building Size Selector */}
            <div className="card">
              <label className="label">Building Size (Pricing Tier)</label>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { value: 'small', label: '<20 units', price: 199 },
                  { value: 'medium', label: '20-100 units', price: 349 },
                  { value: 'large', label: '100+ units', price: 499 },
                ].map((tier) => (
                  <label
                    key={tier.value}
                    className={`relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      buildingSize === tier.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <input
                      type="radio"
                      value={tier.value}
                      {...register('buildingSize')}
                      className="sr-only"
                    />
                    <div className="text-sm font-medium text-neutral-700 mb-1">
                      {tier.label}
                    </div>
                    <div className="text-2xl font-display font-bold text-primary-600">
                      {formatCurrency(tier.price)}
                    </div>
                    {buildingSize === tier.value && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-5 h-5 text-primary-600" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* State */}
              <div>
                <label className="label">State/Territory</label>
                <select
                  {...register('state', { required: 'Please select a state' })}
                  className="input select"
                >
                  <option value="NSW">New South Wales</option>
                  <option value="VIC">Victoria</option>
                  <option value="QLD">Queensland</option>
                  <option value="SA">South Australia</option>
                  <option value="WA">Western Australia</option>
                  <option value="TAS">Tasmania</option>
                  <option value="ACT">Australian Capital Territory</option>
                  <option value="NT">Northern Territory</option>
                </select>
                {errors.state && (
                  <p className="error-message">{errors.state.message}</p>
                )}
              </div>

              {/* Meeting Type */}
              <div>
                <label className="label">Meeting Type</label>
                <select
                  {...register('meetingType', { required: 'Please select a meeting type' })}
                  className="input select"
                >
                  <option value="AGM">AGM (Annual General Meeting)</option>
                  <option value="EGM">EGM (Extraordinary General Meeting)</option>
                  <option value="Committee Meeting">Committee Meeting</option>
                  <option value="Special Meeting">Special Meeting</option>
                </select>
                {errors.meetingType && (
                  <p className="error-message">{errors.meetingType.message}</p>
                )}
              </div>

              {/* Building Name */}
              <div>
                <label className="label">Building/Scheme Name</label>
                <input
                  type="text"
                  {...register('buildingName', {
                    required: 'Building name is required',
                    minLength: { value: 2, message: 'Minimum 2 characters' },
                  })}
                  className="input"
                  placeholder="e.g., Harbour View Apartments"
                />
                {errors.buildingName && (
                  <p className="error-message">{errors.buildingName.message}</p>
                )}
              </div>

              {/* Meeting Date */}
              <div>
                <label className="label">Meeting Date</label>
                <input
                  type="date"
                  {...register('meetingDate', { required: 'Meeting date is required' })}
                  className="input"
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.meetingDate && (
                  <p className="error-message">{errors.meetingDate.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="label">Email Address (for delivery)</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
                className="input"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="label">Meeting Recording</label>
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  isDragging
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-neutral-300 hover:border-neutral-400'
                } ${fileError ? 'border-red-500' : ''}`}
              >
                {!selectedFile ? (
                  <>
                    <div className="flex justify-center mb-4">
                      <Upload className="w-12 h-12 text-neutral-400" />
                    </div>
                    <div className="text-neutral-700 mb-2">
                      <label htmlFor="file-upload" className="link cursor-pointer">
                        Click to upload
                      </label>{' '}
                      or drag and drop
                    </div>
                    <p className="text-sm text-neutral-500">
                      MP3, WAV, MP4, MOV up to 500MB (max 3 hours)
                    </p>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      accept="audio/*,video/*"
                      className="sr-only"
                    />
                  </>
                ) : (
                  <div className="flex items-center justify-between bg-primary-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <FileAudio className="w-8 h-8 text-primary-600" />
                      <div className="text-left">
                        <div className="font-medium text-neutral-900">
                          {selectedFile.name}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {formatFileSize(selectedFile.size)} • {getFileExtension(selectedFile.name)}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-neutral-600" />
                    </button>
                  </div>
                )}
              </div>
              {fileError && <p className="error-message">{fileError}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                {...register('acceptedTerms', {
                  required: 'You must accept the terms',
                })}
                className="checkbox mt-0.5"
              />
              <label className="text-sm text-neutral-600">
                I accept the{' '}
                <a href="#terms" className="link">
                  terms and conditions
                </a>{' '}
                and{' '}
                <a href="#privacy" className="link">
                  privacy policy
                </a>
              </label>
            </div>
            {errors.acceptedTerms && (
              <p className="error-message -mt-4">{errors.acceptedTerms.message}</p>
            )}

            {/* Price Summary & Submit */}
            <div className="card bg-neutral-50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-neutral-600 mb-1">Total Price</div>
                  <div className="text-3xl font-display font-bold text-neutral-900">
                    {formatCurrency(selectedPrice)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-neutral-600 mb-1">Delivery Time</div>
                  <div className="text-2xl font-display font-bold text-primary-600">
                    10 min
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-lg py-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    Process & Pay {formatCurrency(selectedPrice)}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Money-back Guarantee
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
