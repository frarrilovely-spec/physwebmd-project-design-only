import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Stepper from './Stepper';
import OTPInput from './OTPInput';

interface ExistingPatientFlowProps {
  onComplete: () => void;
  onClose: () => void;
  onSwitchToNewPatient?: () => void;
}

export default function ExistingPatientFlow({ onComplete, onClose, onSwitchToNewPatient }: ExistingPatientFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    lookupMethod: '',
    identifier: '',
    otp: '',
    otpSent: false,
    patientNotFound: false,
    visitType: '',
    visitMode: '',
    providerPreference: 'same',
    providerChoice: '',
    urgency: '',
    appointmentDate: '',
    appointmentTime: '',
    agreePolicy: false,
    agreeReminders: false,
  });

  const stepLabels = ['Lookup', 'Verify', 'Visit Details', 'Schedule', 'Review'];

  const handleNext = () => {
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendOTP = () => {
    if (formData.identifier === 'notfound@test.com') {
      setFormData({ ...formData, patientNotFound: true });
    } else {
      setFormData({ ...formData, otpSent: true, patientNotFound: false });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Welcome back</h2>
              <p className="text-muted-foreground" data-testid="text-step-subtitle">Let's find your account</p>
            </div>

            <RadioGroup
              value={formData.lookupMethod}
              onValueChange={(value) => setFormData({ ...formData, lookupMethod: value, identifier: '', otpSent: false, patientNotFound: false })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="lookup-email" data-testid="radio-email" />
                <Label htmlFor="lookup-email">Email address</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="lookup-phone" data-testid="radio-phone" />
                <Label htmlFor="lookup-phone">Mobile phone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mrn" id="lookup-mrn" data-testid="radio-mrn" />
                <Label htmlFor="lookup-mrn">Patient ID / MRN</Label>
              </div>
            </RadioGroup>

            {formData.lookupMethod && (
              <div>
                <Label htmlFor="identifier">
                  {formData.lookupMethod === 'email' && 'Email address'}
                  {formData.lookupMethod === 'phone' && 'Mobile phone'}
                  {formData.lookupMethod === 'mrn' && 'Patient ID / MRN'}
                </Label>
                <Input
                  id="identifier"
                  value={formData.identifier}
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value, otpSent: false, patientNotFound: false })}
                  placeholder={
                    formData.lookupMethod === 'email' ? 'you@example.com' :
                    formData.lookupMethod === 'phone' ? '(555) 123-4567' : 'MRN12345'
                  }
                  data-testid="input-identifier"
                />
              </div>
            )}

            {!formData.otpSent && !formData.patientNotFound && (
              <Button
                onClick={handleSendOTP}
                disabled={!formData.lookupMethod || !formData.identifier}
                data-testid="button-send-code"
              >
                Send Code
              </Button>
            )}

            {formData.otpSent && (
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

            {formData.patientNotFound && (
              <div className="space-y-4">
                <div className="p-4 rounded-md bg-accent/50 border border-card-border flex gap-3">
                  <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-1">Account not found</p>
                    <p className="text-sm text-muted-foreground">
                      We couldn't find an existing patient with this information.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setFormData({ ...formData, identifier: '', patientNotFound: false })}
                    className="flex-1"
                    data-testid="button-try-again"
                  >
                    Try again
                  </Button>
                  {onSwitchToNewPatient && (
                    <Button onClick={onSwitchToNewPatient} className="flex-1" data-testid="button-book-as-new">
                      Book as New Patient
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Visit details</h2>
            </div>

            <div>
              <Label htmlFor="visitType">Type of visit *</Label>
              <Select value={formData.visitType} onValueChange={(value) => setFormData({ ...formData, visitType: value })}>
                <SelectTrigger id="visitType" className="mt-2" data-testid="select-visit-type">
                  <SelectValue placeholder="Select visit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medication">Follow-up medication management</SelectItem>
                  <SelectItem value="therapy">Follow-up therapy</SelectItem>
                  <SelectItem value="new-concern">New concern</SelectItem>
                  <SelectItem value="paperwork">Paperwork/forms</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Visit mode *</Label>
              <RadioGroup
                value={formData.visitMode}
                onValueChange={(value) => setFormData({ ...formData, visitMode: value })}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="telehealth" id="mode-telehealth" data-testid="radio-telehealth" />
                  <Label htmlFor="mode-telehealth">Telehealth</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-person" id="mode-in-person" data-testid="radio-in-person" />
                  <Label htmlFor="mode-in-person">In-person</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Provider preference *</Label>
              <RadioGroup
                value={formData.providerPreference}
                onValueChange={(value) => setFormData({ ...formData, providerPreference: value })}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="same" id="same-provider" data-testid="radio-same-provider" />
                  <Label htmlFor="same-provider">Same provider as last visit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="first-available" id="first-available" data-testid="radio-first-available" />
                  <Label htmlFor="first-available">First available provider</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="choose" id="choose-provider" data-testid="radio-choose-provider" />
                  <Label htmlFor="choose-provider">Choose provider</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.providerPreference === 'choose' && (
              <div>
                <Label htmlFor="providerChoice">Select provider</Label>
                <Select value={formData.providerChoice} onValueChange={(value) => setFormData({ ...formData, providerChoice: value })}>
                  <SelectTrigger id="providerChoice" className="mt-2" data-testid="select-provider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-nguyen">Dr. Sarah Nguyen, MD</SelectItem>
                    <SelectItem value="dr-chen">Dr. Michael Chen, MD</SelectItem>
                    <SelectItem value="dr-rodriguez">Dr. Emily Rodriguez, PsyD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label>Urgency *</Label>
              <RadioGroup
                value={formData.urgency}
                onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="asap" id="asap" data-testid="radio-asap" />
                  <Label htmlFor="asap">As soon as possible</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-week" id="1-week" data-testid="radio-1-week" />
                  <Label htmlFor="1-week">Within 1 week</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2-4-weeks" id="2-4-weeks" data-testid="radio-2-4-weeks" />
                  <Label htmlFor="2-4-weeks">Within 2-4 weeks</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} data-testid="button-back">
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.visitType || !formData.visitMode || !formData.urgency}
                className="flex-1"
                data-testid="button-see-times"
              >
                See available times
              </Button>
            </div>
          </div>
        );

      case 3:
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
              <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Schedule appointment</h2>
            </div>

            <div className="p-4 rounded-md bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Best match for your preferences</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {nextDays[0] && new Date(nextDays[0]).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at 10:30 AM
                  </p>
                  <Button
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      setFormData({ ...formData, appointmentDate: nextDays[0], appointmentTime: '10:30 AM' });
                      handleNext();
                    }}
                    data-testid="button-select-best-match"
                  >
                    Select this time
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-card-border">
              <h3 className="font-semibold mb-4">Or choose another time</h3>

              <div className="space-y-4">
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
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} data-testid="button-back">
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.appointmentDate || !formData.appointmentTime}
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
              <h2 className="text-2xl font-bold mb-2" data-testid="text-step-title">Review & confirm</h2>
            </div>

            <Card className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-semibold">
                      {formData.appointmentDate && new Date(formData.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {formData.appointmentTime}
                    </p>
                  </div>
                  <button onClick={() => setStep(3)} className="text-sm text-primary hover:underline" data-testid="link-change-time">
                    Change
                  </button>
                </div>

                <div className="pt-3 border-t border-card-border">
                  <p className="text-sm text-muted-foreground">Visit Type</p>
                  <p className="font-semibold">{formData.visitType}</p>
                </div>

                <div className="pt-3 border-t border-card-border">
                  <p className="text-sm text-muted-foreground">Visit Mode</p>
                  <p className="font-semibold">{formData.visitMode === 'telehealth' ? 'Telehealth' : 'In-person'}</p>
                </div>

                <div className="pt-3 border-t border-card-border">
                  <p className="text-sm text-muted-foreground">Provider</p>
                  <p className="font-semibold">
                    {formData.providerPreference === 'same' ? 'Same as last visit' :
                     formData.providerPreference === 'first-available' ? 'First available' :
                     formData.providerChoice || 'Not selected'}
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-3 pt-4 border-t border-card-border">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreePolicy"
                  checked={formData.agreePolicy}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreePolicy: checked as boolean })}
                  data-testid="checkbox-policy"
                />
                <Label htmlFor="agreePolicy" className="cursor-pointer font-normal text-sm">
                  I agree to the cancellation and no-show policy
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
                onClick={() => setStep(5)}
                disabled={!formData.agreePolicy}
                className="flex-1"
                data-testid="button-confirm"
              >
                Confirm appointment
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mx-auto">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2" data-testid="text-confirmation-title">You're all set!</h2>
            </div>

            <Card className="p-6 text-left">
              <h3 className="font-semibold mb-4">Appointment Details</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Date:</strong> {formData.appointmentDate && new Date(formData.appointmentDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                <p><strong>Time:</strong> {formData.appointmentTime}</p>
                <p><strong>Type:</strong> {formData.visitMode === 'telehealth' ? 'Telehealth' : 'In-person'}</p>
              </div>
            </Card>

            <p className="text-sm text-muted-foreground">
              We've sent a confirmation email and SMS with your appointment details {formData.visitMode === 'telehealth' && 'and a secure video link'}.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={onComplete} variant="outline" className="flex-1" data-testid="button-back-home">
                Back to homepage
              </Button>
              <Button onClick={() => setStep(1)} className="flex-1" data-testid="button-book-another">
                Book another appointment
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {step < 5 && <Stepper currentStep={step} totalSteps={5} labels={stepLabels} />}
      {renderStep()}
    </div>
  );
}
