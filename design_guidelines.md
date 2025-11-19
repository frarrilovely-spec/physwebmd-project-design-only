# PsychWebMD Design Guidelines

## Design System

### Colors
- **Primary Teal:** #17B8A6
- **Dark Slate Text:** #1B1F2B
- **Soft Gray Background:** #F7F9FB
- **White:** #FFFFFF

### Typography
- **Font Family:** Clean sans-serif (Inter or system font stack)
- **Hierarchy:** Clear h1, h2, h3, body, small text styles
- **Hero H1:** Two-line structure with strong hierarchy

### Layout & Spacing
- **Max Container Width:** 1100-1200px, centered
- **Card Border Radius:** 16px
- **Shadows:** Very soft, subtle shadows
- **Section Spacing:** Generous vertical spacing between sections
- **Sticky Header:** Reduces height on scroll with subtle shadow

### Buttons
- **Primary:** Filled teal (#17B8A6) with white text; darker teal on hover
- **Secondary:** White background with teal border and teal text
- **Hero CTA Buttons:** Blurred background when placed over images

### Links
- **Default:** Teal text, understated
- **Hover:** Underline appears

## Component Specifications

### Header (Sticky Navigation)
- Left: "PsychWebMD" wordmark logo
- Right: Navigation links (How It Works, Providers, Conditions, Insurance) + "Book Appointment" primary button
- Behavior: Becomes sticky after scroll with reduced height and shadow

### Hero Section (Full-Width Gradient)
**Left Side:**
- Two-line H1: "Personalized Behavioral Healthcare" / "Anywhere. Anytime."
- Subtext about compassionate care
- Two buttons: "Book Appointment →" (primary) and "Learn More" (secondary)
- Trust badges below: HIPAA-compliant, Insurance accepted, 5,000+ patients

**Right Side:**
- Floating white "Start Your Journey" card with 3 large clickable options:
  1. New Patient - "First-time comprehensive evaluation"
  2. Existing Patient - "Follow-up or ongoing care"
  3. Intake Form - "Complete detailed assessment"
- Cards lift with subtle shadow on hover

### Key Benefits (3-Column Grid)
Icon + Title + Description for:
1. Quick Access - Same-week appointments
2. Online & In-Person - Flexible care
3. Expert Providers - Matched to needs

### How It Works (4-Step Process)
Numbered steps with icons:
1. Choose care path
2. Complete brief intake
3. Get matched with provider
4. Start treatment

### Providers Section
Grid of 3-4 provider cards with:
- Circular photo placeholder
- Name and credentials (e.g., "Dr. Sarah Nguyen, MD")
- Role & specialties
- "Accepting new patients" badge

### Conditions We Treat
Grid/scrollable pills for: Anxiety, Depression, ADHD, Bipolar, OCD, PTSD, Postpartum, Personality Disorders, Substance Use, Children/Adolescents, Couples/Families
- Clickable pills highlight and show description

### Testimonials
2-3 testimonial cards with:
- 5-star rating
- Short quote
- Attribution ("— PsychWebMD Patient")

### Insurance Section
Row of partner logos/text: BCBS, Aetna, Cigna, UnitedHealthcare, Optum, Medicare
- Subtext: "We'll verify your benefits before your appointment"

### Why PsychWebMD (Icon Grid/2-Column)
- Evidence-based treatment
- Licensed clinicians
- Telehealth + in-person
- Personalized care
- HIPAA-compliant platform
- Modern digital experience

### CTA Banner (Gradient)
Centered text: "Ready to begin your care? Same-week appointments may be available."
Primary button: "Book Appointment →"

### Footer (3-4 Columns)
Columns: Care, Patients, Company, Legal
Bottom disclaimer about crisis resources

## Appointment Modal System

### Modal Structure
- Semi-transparent dark overlay
- Centered white card (max-width 720px)
- Close icon (X) top-right
- Tabbed interface: New Patient / Existing Patient / Intake Form
- Stepper component showing "Step X of Y" with progress labels

### Multi-Step Form Design
- **Progress Stepper:** Text-based with step labels
- **Form Fields:** Clean, labeled inputs with validation
- **Radio/Checkbox Groups:** Large, clear touch targets
- **Buttons:** Primary "Continue" or "Next" buttons
- **Validation:** Inline error messages below fields
- **Crisis Alerts:** Red alert boxes for self-harm questions

### New Patient Flow (8 Steps)
1. Contact verification with OTP inputs
2. Patient selection (Myself/Someone else)
3. Personal info + address form
4. Reason checkboxes (multiple conditions)
5. Insurance information form
6. Mental health questions with conditional alerts
7. Emergency contact details
8. Schedule appointment (visit type + date/time)
9. Review and confirmation

### Existing Patient Flow
Streamlined scheduling with patient lookup and appointment selection

## Mobile Responsiveness
- Full-screen modal on mobile
- Stacked layouts for grids
- Touch-friendly button sizes
- Accessible form inputs

## Images
- **Hero Section:** Large background image with gradient overlay (right side has floating card)
- **Provider Cards:** Circular headshot photos
- **Insurance Section:** Partner logo images/placeholders