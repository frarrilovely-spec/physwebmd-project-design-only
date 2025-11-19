import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';
import Stepper from './Stepper';
import OTPInput from './OTPInput';

interface NewPatientFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

export default function NewPatientFlow({ onComplete, onClose }: NewPatientFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    contactMethod: 'email',
    contact: '',
    otp: '',
    otpSent: false,
    seekingFor: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    phone: '',
    gender: '',
    street: '',
    apt: '',
    city: '',
    state: '',
    zip: '',
    hearAbout: '',
    concerns: [] as string[],
    otherConcern: '',
    insuranceName: '',
    memberId: '',
    memberFirstName: '',
    memberLastName: '',
    memberDob: '',
    policyHolder: '',
    policyHolderOther: '',
    consentMentalHealth: false,
    hospitalizedPastYear: '',
    harmRisk: '',
    alcoholRelationship: '',
    useDrugs: '',
    drugFrequency: '',
    emergencyFirstName: '',
    emergencyMiddleName: '',
    emergencyLastName: '',
    emergencyRelationship: '',
    emergencyRelationshipOther: '',
    emergencyPhone: '',
    visitType: '',
    provider: '',
    appointmentDate: '',
    appointmentTime: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeReminders: false,
  });

  const stepLabels = [
    'Verify Contact',
    'Patient Selection',
    'Personal Info',
    'Concerns',
    'Insurance',
    'Mental Health',
    'Emergency Contact',
    'Schedule',
    'Review',
  ];

  const concernOptions = [
    'Anxiety / Panic Symptoms',
    'Obsessive-Compulsive Disorder (OCD)',
    'Bipolar Mood Disorder',
    'Post-Traumatic Stress Disorder (PTSD)',
    'Depressive Symptoms / Major Depression',
    'Attention-Deficit/Hyperactivity Disorder (ADHD)',
    'Postpartum Depression / Perinatal Mood Concerns',
    "I'm Not Sure – I would like an assessment",
    'Eating Disorder / Disordered Eating Concerns',
    'Personality Disorder or Personality-Related Difficulties',
    'Substance Use / Addiction Concerns',
    'Self-Harm Thoughts or Behaviors',
  ];

  const handleNext = () => {
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendOTP = () => {
    setFormData({ ...formData, otpSent: true });
  };

  const handleConcernToggle = (concern: string) => {
    const newConcerns = formData.concerns.includes(concern)
      ? formData.concerns.filter((c) => c !== concern)
      : [...formData.concerns, concern];
    setFormData({ ...formData, concerns: newConcerns });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Verify your contact</h2>
              <p className="text-muted-foreground" data-testid="text-step-subtitle">We'll send you a verification code</p>
            </div>

            <RadioGroup
              value={formData.contactMethod}
              onValueChange={(value) => setFormData({ ...formData, contactMethod: value, otpSent: false })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" data-testid="radio-email" />
                <Label htmlFor="email">Email address</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone" data-testid="radio-phone" />
                <Label htmlFor="phone">Mobile phone</Label>
              </div>
            </RadioGroup>

            <div>
              <Label htmlFor="contact">{formData.contactMethod === 'email' ? 'Email' : 'Phone'}</Label>
              <Input
                id="contact"
                type={formData.contactMethod === 'email' ? 'email' : 'tel'}
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder={formData.contactMethod === 'email' ? 'you@example.com' : '(555) 123-4567'}
                data-testid="input-contact"
              />
            </div>

            {!formData.otpSent ? (
              <Button onClick={handleSendOTP} disabled={!formData.contact} data-testid="button-send-code">
                Send Code
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label>Enter 6-digit code</Label>
                  <div className="mt-2">
                    <OTPInput value={formData.otp} onChange={(value) => setFormData({ ...formData, otp: value })} />
                  </div>
                </div>
                <button className="text-sm text-primary hover:underline" data-testid="link-resend-code">
                  Didn't receive a code? Resend
                </button>
                <Button onClick={handleNext} disabled={formData.otp.length !== 6} className="w-full" data-testid="button-continue">
                  Continue
                </Button>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Who are you seeking help for?</h2>
            </div>

            <div className="grid gap-4">
              <button
                onClick={() => setFormData({ ...formData, seekingFor: 'myself' })}
                className={`p-6 rounded-md border-2 text-left hover-elevate active-elevate-2 ${
                  formData.seekingFor === 'myself' ? 'border-primary bg-primary/5' : 'border-card-border'
                }`}
                data-testid="button-myself"
              >
                <div className="font-semibold text-lg">Myself</div>
                <div className="text-sm text-muted-foreground">I am seeking care for myself</div>
              </button>
              <button
                onClick={() => setFormData({ ...formData, seekingFor: 'someone-else' })}
                className={`p-6 rounded-md border-2 text-left hover-elevate active-elevate-2 ${
                  formData.seekingFor === 'someone-else' ? 'border-primary bg-primary/5' : 'border-card-border'
                }`}
                data-testid="button-someone-else"
              >
                <div className="font-semibold text-lg">Someone else</div>
                <div className="text-sm text-muted-foreground">I am seeking care for another person</div>
              </button>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} data-testid="button-back">
                Back
              </Button>
              <Button onClick={handleNext} disabled={!formData.seekingFor} className="flex-1" data-testid="button-continue">
                Continue
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Your Information</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  data-testid="input-first-name"
                />
              </div>
              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                  data-testid="input-middle-name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  data-testid="input-last-name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  data-testid="input-dob"
                />
              </div>
              <div>
                <Label htmlFor="phone">Cell Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  data-testid="input-phone"
                />
              </div>
            </div>

            <div>
              <Label>Gender *</Label>
              <RadioGroup value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" data-testid="radio-male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" data-testid="radio-female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="pt-4 border-t border-card-border">
              <h3 className="font-semibold mb-4">Primary Address</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    data-testid="input-street"
                  />
                </div>
                <div>
                  <Label htmlFor="apt">Apt / Suite</Label>
                  <Input
                    id="apt"
                    value={formData.apt}
                    onChange={(e) => setFormData({ ...formData, apt: e.target.value })}
                    data-testid="input-apt"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      data-testid="input-city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                      <SelectTrigger id="state" data-testid="select-state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code *</Label>
                    <Input
                      id="zip"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      data-testid="input-zip"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="hearAbout">How did you hear about us? *</Label>
              <Select value={formData.hearAbout} onValueChange={(value) => setFormData({ ...formData, hearAbout: value })}>
                <SelectTrigger id="hearAbout" data-testid="select-hear-about">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="friend">Friend/Family</SelectItem>
                  <SelectItem value="doctor">Doctor Referral</SelectItem>
                  <SelectItem value="insurance">Insurance Directory</SelectItem>
                  <SelectItem value="google">Google Search</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} data-testid="button-back">
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.firstName || !formData.lastName || !formData.dob || !formData.phone || !formData.gender || !formData.street || !formData.city || !formData.state || !formData.zip || !formData.hearAbout}
                className="flex-1"
                data-testid="button-continue"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Your concern or reason for consultation</h2>
              <p className="text-muted-foreground">Select all that apply</p>
            </div>

            <div className="space-y-2">
              {concernOptions.map((concern) => (
                <div key={concern} className="flex items-start space-x-3 p-3 rounded-md hover:bg-accent/50">
                  <Checkbox
                    id={concern}
                    checked={formData.concerns.includes(concern)}
                    onCheckedChange={() => handleConcernToggle(concern)}
                    data-testid={`checkbox-concern-${concernOptions.indexOf(concern)}`}
                  />
                  <Label htmlFor={concern} className="flex-1 cursor-pointer font-normal">
                    {concern}
                  </Label>
                </div>
              ))}
            </div>

            <div>
              <Label htmlFor="otherConcern">Any other concerns? (Optional)</Label>
              <Textarea
                id="otherConcern"
                value={formData.otherConcern}
                onChange={(e) => setFormData({ ...formData, otherConcern: e.target.value })}
                rows={3}
                data-testid="textarea-other-concern"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} data-testid="button-back">
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={formData.concerns.length === 0}
                className="flex-1"
                data-testid="button-continue"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Insurance Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="memberFirstName">Member First Name *</Label>
                <Input
                  id="memberFirstName"
                  value={formData.memberFirstName}
                  onChange={(e) => setFormData({ ...formData, memberFirstName: e.target.value })}
                  data-testid="input-member-first-name"
                />
              </div>
              <div>
                <Label htmlFor="memberLastName">Member Last Name *</Label>
                <Input
                  id="memberLastName"
                  value={formData.memberLastName}
                  onChange={(e) => setFormData({ ...formData, memberLastName: e.target.value })}
                  data-testid="input-member-last-name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="memberDob">Member Date of Birth *</Label>
              <Input
                id="memberDob"
                type="date"
                value={formData.memberDob}
                onChange={(e) => setFormData({ ...formData, memberDob: e.target.value })}
                data-testid="input-member-dob"
              />
            </div>

            <div>
              <Label htmlFor="insuranceName">Insurance Name *</Label>
              <Input
                id="insuranceName"
                value={formData.insuranceName}
                onChange={(e) => setFormData({ ...formData, insuranceName: e.target.value })}
                placeholder="e.g., Blue Cross Blue Shield"
                data-testid="input-insurance-name"
              />
            </div>

            <div>
              <Label htmlFor="memberId">Insurance Member ID *</Label>
              <Input
                id="memberId"
                value={formData.memberId}
                onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                data-testid="input-member-id"
              />
            </div>

            <div>
              <Label htmlFor="policyHolder">Policy Holder *</Label>
              <Select value={formData.policyHolder} onValueChange={(value) => setFormData({ ...formData, policyHolder: value })}>
                <SelectTrigger id="policyHolder" data-testid="select-policy-holder">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="me">Me</SelectItem>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="step-parent">Step Parent</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.policyHolder === 'other' && (
              <div>
                <Label htmlFor="policyHolderOther">Specify relationship</Label>
                <Input
                  id="policyHolderOther"
                  value={formData.policyHolderOther}
                  onChange={(e) => setFormData({ ...formData, policyHolderOther: e.target.value })}
                  data-testid="input-policy-holder-other"
                />
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} data-testid="button-back">
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.memberFirstName || !formData.memberLastName || !formData.memberDob || !formData.insuranceName || !formData.memberId || !formData.policyHolder}
                className="flex-1"
                data-testid="button-continue"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Mental Health Questions</h2>
              <p className="text-muted-foreground">This information helps us provide better care</p>
            </div>

            <div className="flex items-start space-x-3 p-4 rounded-md bg-accent/50">
              <Checkbox
                id="consentMentalHealth"
                checked={formData.consentMentalHealth}
                onCheckedChange={(checked) => setFormData({ ...formData, consentMentalHealth: checked as boolean })}
                data-testid="checkbox-consent"
              />
              <Label htmlFor="consentMentalHealth" className="cursor-pointer font-normal">
                I agree to provide this information in upcoming screens
              </Label>
            </div>

            {formData.consentMentalHealth && (
              <div className="space-y-6">
                <div>
                  <Label>Have you been admitted to a hospital or inpatient facility for mental health concerns within the past year?</Label>
                  <RadioGroup
                    value={formData.hospitalizedPastYear}
                    onValueChange={(value) => setFormData({ ...formData, hospitalizedPastYear: value })}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="hosp-yes" data-testid="radio-hospitalized-yes" />
                      <Label htmlFor="hosp-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="hosp-no" data-testid="radio-hospitalized-no" />
                      <Label htmlFor="hosp-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Do you currently feel at risk of harming yourself?</Label>
                  <RadioGroup
                    value={formData.harmRisk}
                    onValueChange={(value) => setFormData({ ...formData, harmRisk: value })}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="harm-yes" data-testid="radio-harm-yes" />
                      <Label htmlFor="harm-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="harm-no" data-testid="radio-harm-no" />
                      <Label htmlFor="harm-no">No</Label>
                    </div>
                  </RadioGroup>
                  {formData.harmRisk === 'yes' && (
                    <div className="mt-3 p-4 rounded-md bg-destructive/10 border border-destructive/20 flex gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                      <p className="text-sm text-destructive">
                        <strong>Crisis Resources:</strong> If you are in crisis, call 911 or go to the nearest emergency room.
                        This system is not for emergencies.
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="alcoholRelationship">Please share about your relationship with alcohol</Label>
                  <Select
                    value={formData.alcoholRelationship}
                    onValueChange={(value) => setFormData({ ...formData, alcoholRelationship: value })}
                  >
                    <SelectTrigger id="alcoholRelationship" className="mt-2" data-testid="select-alcohol">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthy">After drinking alcohol, I feel healthy</SelectItem>
                      <SelectItem value="unhealthy">After drinking alcohol, I feel unhealthy</SelectItem>
                      <SelectItem value="unsure">I am unsure</SelectItem>
                      <SelectItem value="none">I do not drink alcohol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Do you use drugs?</Label>
                  <RadioGroup
                    value={formData.useDrugs}
                    onValueChange={(value) => setFormData({ ...formData, useDrugs: value })}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="drugs-yes" data-testid="radio-drugs-yes" />
                      <Label htmlFor="drugs-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="drugs-no" data-testid="radio-drugs-no" />
                      <Label htmlFor="drugs-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.useDrugs === 'yes' && (
                  <div>
                    <Label htmlFor="drugFrequency">Frequency</Label>
                    <Select
                      value={formData.drugFrequency}
                      onValueChange={(value) => setFormData({ ...formData, drugFrequency: value })}
                    >
                      <SelectTrigger id="drugFrequency" className="mt-2" data-testid="select-drug-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Once a week</SelectItem>
                        <SelectItem value="monthly">Once a month</SelectItem>
                        <SelectItem value="occasionally">Occasionally</SelectItem>
                        <SelectItem value="past">I have used drugs in the past but not currently</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} data-testid="button-back">
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.consentMentalHealth || !formData.hospitalizedPastYear || !formData.harmRisk || !formData.alcoholRelationship || !formData.useDrugs}
                className="flex-1"
                data-testid="button-continue"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Emergency Contact</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="emergencyFirstName">First Name *</Label>
                <Input
                  id="emergencyFirstName"
                  value={formData.emergencyFirstName}
                  onChange={(e) => setFormData({ ...formData, emergencyFirstName: e.target.value })}
                  data-testid="input-emergency-first-name"
                />
              </div>
              <div>
                <Label htmlFor="emergencyMiddleName">Middle Name</Label>
                <Input
                  id="emergencyMiddleName"
                  value={formData.emergencyMiddleName}
                  onChange={(e) => setFormData({ ...formData, emergencyMiddleName: e.target.value })}
                  data-testid="input-emergency-middle-name"
                />
              </div>
              <div>
                <Label htmlFor="emergencyLastName">Last Name *</Label>
                <Input
                  id="emergencyLastName"
                  value={formData.emergencyLastName}
                  onChange={(e) => setFormData({ ...formData, emergencyLastName: e.target.value })}
                  data-testid="input-emergency-last-name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="emergencyRelationship">Relationship *</Label>
              <Select
                value={formData.emergencyRelationship}
                onValueChange={(value) => setFormData({ ...formData, emergencyRelationship: value })}
              >
                <SelectTrigger id="emergencyRelationship" data-testid="select-emergency-relationship">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="caregiver">Caregiver</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.emergencyRelationship === 'other' && (
              <div>
                <Label htmlFor="emergencyRelationshipOther">Specify relationship</Label>
                <Input
                  id="emergencyRelationshipOther"
                  value={formData.emergencyRelationshipOther}
                  onChange={(e) => setFormData({ ...formData, emergencyRelationshipOther: e.target.value })}
                  data-testid="input-emergency-relationship-other"
                />
              </div>
            )}

            <div>
              <Label htmlFor="emergencyPhone">Phone Number *</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                data-testid="input-emergency-phone"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} data-testid="button-back">
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.emergencyFirstName || !formData.emergencyLastName || !formData.emergencyRelationship || !formData.emergencyPhone}
                className="flex-1"
                data-testid="button-continue"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 8:
        const today = new Date();
        const nextDays = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          return date.toISOString().split('T')[0];
        });

        const timeSlots = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM'];

        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Schedule your appointment</h2>
            </div>

            <div>
              <Label>Visit Type *</Label>
              <RadioGroup
                value={formData.visitType}
                onValueChange={(value) => setFormData({ ...formData, visitType: value })}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="telehealth" id="telehealth" data-testid="radio-telehealth" />
                  <Label htmlFor="telehealth">Telehealth</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-person" id="in-person" data-testid="radio-in-person" />
                  <Label htmlFor="in-person">In-person</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="provider">Preferred Provider</Label>
              <Select value={formData.provider} onValueChange={(value) => setFormData({ ...formData, provider: value })}>
                <SelectTrigger id="provider" className="mt-2" data-testid="select-provider">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-available">First available</SelectItem>
                  <SelectItem value="dr-nguyen">Dr. Sarah Nguyen, MD</SelectItem>
                  <SelectItem value="dr-chen">Dr. Michael Chen, MD</SelectItem>
                  <SelectItem value="dr-rodriguez">Dr. Emily Rodriguez, PsyD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="appointmentDate">Preferred Date</Label>
              <Select
                value={formData.appointmentDate}
                onValueChange={(value) => setFormData({ ...formData, appointmentDate: value })}
              >
                <SelectTrigger id="appointmentDate" className="mt-2" data-testid="select-date">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  {nextDays.map((date) => (
                    <SelectItem key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Available Time Slots</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setFormData({ ...formData, appointmentTime: time })}
                    className={`p-3 rounded-md border-2 text-center hover-elevate active-elevate-2 ${
                      formData.appointmentTime === time ? 'border-primary bg-primary/5' : 'border-card-border'
                    }`}
                    data-testid={`button-time-${time.replace(/[:\s]/g, '-').toLowerCase()}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} data-testid="button-back">
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.visitType || !formData.provider || !formData.appointmentDate || !formData.appointmentTime}
                className="flex-1"
                data-testid="button-continue"
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Review & Confirm</h2>
              <p className="text-muted-foreground">Please review your information before submitting</p>
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Personal Information</h3>
                  <button onClick={() => setStep(3)} className="text-sm text-primary hover:underline" data-testid="link-edit-personal">
                    Edit
                  </button>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{formData.firstName} {formData.middleName} {formData.lastName}</p>
                  <p>{formData.dob}</p>
                  <p>{formData.phone}</p>
                  <p>{formData.street} {formData.apt}</p>
                  <p>{formData.city}, {formData.state} {formData.zip}</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Concerns</h3>
                  <button onClick={() => setStep(4)} className="text-sm text-primary hover:underline" data-testid="link-edit-concerns">
                    Edit
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <ul className="list-disc list-inside">
                    {formData.concerns.map((concern) => (
                      <li key={concern}>{concern}</li>
                    ))}
                  </ul>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Insurance</h3>
                  <button onClick={() => setStep(5)} className="text-sm text-primary hover:underline" data-testid="link-edit-insurance">
                    Edit
                  </button>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{formData.insuranceName}</p>
                  <p>Member ID: {formData.memberId}</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">Appointment</h3>
                  <button onClick={() => setStep(8)} className="text-sm text-primary hover:underline" data-testid="link-edit-appointment">
                    Edit
                  </button>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{formData.visitType === 'telehealth' ? 'Telehealth' : 'In-person'} Visit</p>
                  <p>{formData.appointmentDate && new Date(formData.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                  <p>{formData.appointmentTime}</p>
                  <p>Provider: {formData.provider === 'first-available' ? 'First available' : formData.provider}</p>
                </div>
              </Card>
            </div>

            <div className="space-y-3 pt-4 border-t border-card-border">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                  data-testid="checkbox-terms"
                />
                <Label htmlFor="agreeTerms" className="cursor-pointer font-normal text-sm">
                  I agree to the Terms & Conditions
                </Label>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreePrivacy: checked as boolean })}
                  data-testid="checkbox-privacy"
                />
                <Label htmlFor="agreePrivacy" className="cursor-pointer font-normal text-sm">
                  I acknowledge the Privacy Policy / HIPAA Notice
                </Label>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreeReminders"
                  checked={formData.agreeReminders}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeReminders: checked as boolean })}
                  data-testid="checkbox-reminders"
                />
                <Label htmlFor="agreeReminders" className="cursor-pointer font-normal text-sm">
                  I consent to receive appointment reminders via email/SMS
                </Label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} data-testid="button-back">
                Back
              </Button>
              <Button
                onClick={() => setStep(10)}
                disabled={!formData.agreeTerms || !formData.agreePrivacy}
                className="flex-1"
                data-testid="button-confirm"
              >
                Confirm Appointment
              </Button>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mx-auto">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-confirmation-title">Appointment request submitted!</h2>
              <p className="text-muted-foreground">Thank you, {formData.firstName}!</p>
            </div>

            <Card className="p-6 text-left">
              <h3 className="font-semibold mb-4">Appointment Details</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Date:</strong> {formData.appointmentDate && new Date(formData.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                <p><strong>Time:</strong> {formData.appointmentTime}</p>
                <p><strong>Type:</strong> {formData.visitType === 'telehealth' ? 'Telehealth' : 'In-person'}</p>
                <p><strong>Provider:</strong> {formData.provider}</p>
              </div>
            </Card>

            <p className="text-sm text-muted-foreground">
              We've sent a confirmation email and SMS with your visit details {formData.visitType === 'telehealth' && 'and a secure video link'}.
            </p>

            <Button onClick={onComplete} className="w-full" data-testid="button-back-home">
              Back to homepage
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {step < 10 && <Stepper currentStep={step} totalSteps={9} labels={stepLabels} />}
      {renderStep()}
    </div>
  );
}
