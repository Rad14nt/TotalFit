// components/AccountSetupStepper.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, User } from 'lucide-react'
import { useRouter } from "next/navigation"
import { registerUser } from "@/actions/register"

export function AccountSetupStepper({ onComplete }: { onComplete: () => void }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    goalType: '',
    goalWeight: '',
    initialWeight: '',
    activityLevel: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    setStep(prev => prev + 1)
  }

  const handlePrevious = () => {
    setStep(prev => prev - 1)
  }

  const handleFinish = async () => {
    const registrationData = {
      email: formData.username,
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      goalType: formData.goalType,
      sex: formData.gender,
      goalWeight: parseFloat(formData.goalWeight),
      initialWeight: parseFloat(formData.initialWeight),
      activityLevel: formData.activityLevel,
      age: parseInt(formData.age, 10)
    }

    try {
      const result = await registerUser(router, registrationData);
      if (result) {
        console.log("User registered successfully:", result);
        onComplete();
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };


  const renderStep = () => {
    switch(step) {
      case 1:
        return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                />
              </div>
            </div>
        )
      case 2:
        return (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                    name="gender"
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange('gender', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
        )
      case 3:
        return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goalType">Goal Type</Label>
                <Select
                    name="goalType"
                    value={formData.goalType}
                    onValueChange={(value) => handleSelectChange('goalType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">Lose Weight</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="gain">Gain Weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
                <Input
                    id="goalWeight"
                    name="goalWeight"
                    type="number"
                    value={formData.goalWeight}
                    onChange={handleInputChange}
                    placeholder="Enter your goal weight"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialWeight">Initial Weight (kg)</Label>
                <Input
                    id="initialWeight"
                    name="initialWeight"
                    type="number"
                    value={formData.initialWeight}
                    onChange={handleInputChange}
                    placeholder="Enter your initial weight"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="activityLevel">Activity Level</Label>
                <Select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onValueChange={(value) => handleSelectChange('activityLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="light">Lightly Active</SelectItem>
                    <SelectItem value="moderate">Moderately Active</SelectItem>
                    <SelectItem value="very">Very Active</SelectItem>
                    <SelectItem value="extra">Extra Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
        )
      default:
        return null
    }
  }

  return (
      <div className="w-[400px] h-[600px] mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col">
        <div className="mb-8">
          {/* Step Indicator */}
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= item ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                >
                  {item}
                </div>
            ))}
          </div>
          <div className="mt-2 h-2 bg-muted rounded-full">
            <div
                className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto h-[400px]">
          {renderStep()}
        </div>
        <div className="h-[60px] mt-4 flex justify-between items-center">
          {step > 1 && (
              <Button onClick={handlePrevious} variant="outline">
                Previous
              </Button>
          )}
          {step < 3 ? (
              <Button onClick={handleNext} className="ml-auto">
                Next
              </Button>
          ) : (
              <Button onClick={handleFinish} className="ml-auto">
                Finish
              </Button>
          )}
        </div>
      </div>
  )
}
