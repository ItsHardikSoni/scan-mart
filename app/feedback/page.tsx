"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { states } from '@/lib/state'
// We dynamically import `country-state-city` in effects so the dev environment
// doesn't fail typechecking before dependencies are installed. After you run
// `pnpm install` (or `npm install`), the dynamic import will load the library.

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<any>({
    name: '',
    gender: '',
    ageGroup: '',
    occupation: '',
    city: '',
    state: '',
    contact: '',
    email: '',
    visitFreq: '',
    waitTime: '',
    queuesFrustrate: '',
    wouldUse: '',
    usefulFeatures: [] as string[],
    comfortLevel: 3,
    trustPayment: '',
    preferredPayments: [] as string[],
    featureSuggestions: '',
    concerns: '',
    earlyAccess: '',
    earlyEmail: '',
  })

  // Per-field error messages (inline)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  // Use the local `states` dataset (name + districts)
  const [statesList, setStatesList] = useState<Array<any>>(states || [])
  const [citiesList, setCitiesList] = useState<Array<any>>([])

  // when state (name) changes, populate citiesList from local dataset
  useEffect(() => {
    if (!form.state) {
      setCitiesList([])
      return
    }
    const st = states.find((s: any) => s.name === form.state)
    if (st && Array.isArray(st.districts)) setCitiesList(st.districts)
    else setCitiesList([])
  }, [form.state])

  const fieldLabels: Record<string, string> = {
    name: 'Name',
    gender: 'Gender',
    ageGroup: 'Age Group',
    occupation: 'Occupation',
    city: 'City',
    state: 'State',
    contact: 'Contact number',
    email: 'Email',
    visitFreq: 'Visit frequency',
    waitTime: 'Wait time',
    queuesFrustrate: 'Queues frustrate',
    wouldUse: 'Would use app',
    usefulFeatures: 'Useful features',
    comfortLevel: 'Comfort level',
    trustPayment: 'Trust payment',
    preferredPayments: 'Preferred payments',
    featureSuggestions: 'Feature suggestions',
    concerns: 'Concerns',
    earlyAccess: 'Early access',
    earlyEmail: 'Early access email',
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const target = e.target as HTMLInputElement
    const { name, value, type } = target
    // ignore checkbox here
    if (type === 'checkbox') return

    // If state changes, reset city
    if (name === 'state') {
      setForm((s: any) => ({ ...s, state: value, city: '' }))
      setFieldErrors((p) => ({ ...p, state: '', city: '' }))
      return
    }

    setForm((s: any) => ({ ...s, [name]: value }))
    setFieldErrors((p) => ({ ...p, [name]: '' }))
  }

  function toggleCheckbox(field: string, value: string) {
    setForm((s: any) => {
      const arr = new Set(s[field])
      if (arr.has(value)) arr.delete(value)
      else arr.add(value)
      return { ...s, [field]: Array.from(arr) }
    })
    setFieldErrors((p) => ({ ...p, [field]: '' }))
  }

  function validateAll(): { valid: boolean; missing: string[] } {
    const missing: string[] = []

    // Text / single-value fields
    const textFields = ['name', 'gender', 'ageGroup', 'occupation', 'city', 'state', 'contact', 'email', 'visitFreq', 'waitTime', 'queuesFrustrate', 'wouldUse', 'comfortLevel', 'trustPayment', 'earlyAccess']
    for (const k of textFields) {
      if (!form[k] && form[k] !== 0) missing.push(k)
    }

    // Checkbox groups must have at least one selected
    if (!form.usefulFeatures || form.usefulFeatures.length === 0) missing.push('usefulFeatures')
    if (!form.preferredPayments || form.preferredPayments.length === 0) missing.push('preferredPayments')

    // Feature suggestions and concerns
    if (!form.featureSuggestions) missing.push('featureSuggestions')
    if (!form.concerns) missing.push('concerns')

    // earlyEmail required only if earlyAccess === 'Yes'
    if (form.earlyAccess === 'Yes' && !form.earlyEmail) missing.push('earlyEmail')

    return { valid: missing.length === 0, missing }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { valid, missing } = validateAll()
    if (!valid) {
      // Build per-field error messages
      const errorsMap: Record<string, string> = {}
      for (const k of missing) {
        if (k === 'usefulFeatures' || k === 'preferredPayments') {
          errorsMap[k] = 'Please select at least one option.'
        } else {
          errorsMap[k] = `${fieldLabels[k] || k} is required.`
        }
      }
      setFieldErrors(errorsMap)

      // focus the first missing field
      if (typeof window !== 'undefined' && missing.length > 0) {
        const sel = document.querySelector(`[name="${missing[0]}"]`) as HTMLElement | null
        if (sel && typeof sel.focus === 'function') sel.focus()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    // In a real app: POST to an API route here
    console.log('feedback submit', form)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container mx-auto my-24 px-4">
        <div className="prose mx-auto text-center">
          <h1>Thank You!</h1>
          <p>Your feedback helps us build a smarter and faster shopping experience.</p>
          <p className="mt-6">ScanMart — Scan. Shop. Go. – Skip the Queue</p>
          <div className="mt-6">
            <Link href="/">
              <Button>Back to home</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto my-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg border bg-white/50 p-6 shadow-sm">
          <h1 className="text-2xl font-bold">ScanMart – Smart Self-Checkout App Feedback</h1>
          <p className="mt-2 text-muted-foreground">
            We are building ScanMart – “Scan. Shop. Go. – Skip the Queue”. Your feedback will help us improve the app before launch. This form takes 2–3 minutes to complete.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Section 1: Basic Information (vertical) */}
            <section>
              <h2 className="text-lg font-semibold">Section 1: Basic Information</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium">1. Name <span className="text-red-500">*</span></label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder='Enter your full name' required className="mt-1 block w-full rounded-md border p-2" />
                  {fieldErrors['name'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['name']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">2. Gender <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex flex-col gap-2">
                    {['Male', 'Female', 'Other', 'Prefer not to say'].map((v) => (
                      <label key={v} className="inline-flex items-center gap-3">
                        <input type="radio" name="gender" value={v} checked={form.gender === v} onChange={handleChange} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                  {fieldErrors['gender'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['gender']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">3. Age Group <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex flex-col gap-2">
                    {['Under 18', '18–25', '26–35', '36–45', '45+'].map((v) => (
                      <label key={v} className="inline-flex items-center gap-3">
                        <input type="radio" name="ageGroup" value={v} checked={form.ageGroup === v} onChange={handleChange} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                  {fieldErrors['ageGroup'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['ageGroup']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">4. Occupation <span className="text-red-500">*</span></label>
                  <input name="occupation" value={form.occupation} onChange={handleChange} placeholder='Enter your occupation' required className="mt-1 block w-full rounded-md border p-2" />
                  {fieldErrors['occupation'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['occupation']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">5. State <span className="text-red-500">*</span></label>
                  <select name="state" value={form.state} onChange={handleChange} required className="mt-1 block w-full rounded-md border p-2">
                    <option value="">Select a state</option>
                    {statesList.map((st: any) => (
                      <option key={st.name} value={st.name}>{st.name}</option>
                    ))}
                  </select>
                  {fieldErrors['state'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['state']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">6. City <span className="text-red-500">*</span></label>
                  <select name="city" value={form.city} onChange={handleChange} required disabled={!form.state} className="mt-1 block w-full rounded-md border p-2">
                    <option value="">Select a city</option>
                    {citiesList.map((c: any) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {fieldErrors['city'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['city']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">7. Contact number <span className="text-red-500">*</span></label>
                  <input name="contact" value={form.contact} onChange={handleChange} required type="tel" placeholder="+91 98765 43210" className="mt-1 block w-full rounded-md border p-2" />
                  {fieldErrors['contact'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['contact']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">8. Email <span className="text-red-500">*</span></label>
                  <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="you@example.com" className="mt-1 block w-full rounded-md border p-2" />
                  {fieldErrors['email'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['email']}</p>}
                </div>
              </div>
            </section>

            {/* Section 2: Shopping Habits (vertical) */}
            <section>
              <h2 className="text-lg font-semibold">Section 2: Shopping Habits</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium">9. How often do you visit supermarkets or grocery stores? <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex flex-col gap-2">
                    {['Daily', '2–3 times per week', 'Once a week', 'Occasionally'].map((v) => (
                      <label key={v} className="inline-flex items-center gap-2">
                        <input type="radio" name="visitFreq" value={v} checked={form.visitFreq === v} onChange={handleChange} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                  {fieldErrors['visitFreq'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['visitFreq']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">10. On average, how long do you wait at the billing counter? <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex flex-col gap-2">
                    {['Less than 2 minutes', '3–5 minutes', '5–10 minutes', 'More than 10 minutes'].map((v) => (
                      <label key={v} className="inline-flex items-center gap-2">
                        <input type="radio" name="waitTime" value={v} checked={form.waitTime === v} onChange={handleChange} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                  {fieldErrors['waitTime'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['waitTime']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">11. Do long billing queues frustrate you while shopping? <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex flex-col gap-2">
                    {['Yes', 'Sometimes', 'No'].map((v) => (
                      <label key={v} className="inline-flex items-center gap-2">
                        <input type="radio" name="queuesFrustrate" value={v} checked={form.queuesFrustrate === v} onChange={handleChange} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                  {fieldErrors['queuesFrustrate'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['queuesFrustrate']}</p>}
                </div>
              </div>
            </section>

            {/* Section 3: App Idea Feedback (vertical) */}
            <section>
              <h2 className="text-lg font-semibold">Section 3: App Idea Feedback</h2>
              <p className="mt-2 text-sm text-muted-foreground">ScanMart Idea: Customers can scan product barcodes using their phone, add items to cart, pay online, and leave the store without standing in line.</p>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium">12. Would you use an app like ScanMart for faster checkout? <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex flex-col gap-2">
                    {['Yes definitely', 'Maybe', 'Not sure', 'No'].map((v) => (
                      <label key={v} className="inline-flex items-center gap-2">
                        <input type="radio" name="wouldUse" value={v} checked={form.wouldUse === v} onChange={handleChange} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                  {fieldErrors['wouldUse'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['wouldUse']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">13. Which feature do you find most useful? <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex flex-col gap-2">
                    {['Barcode scanning', 'Real-time cart total', 'Online payment', 'Skipping billing queues', 'Digital invoice'].map((v) => (
                      <label key={v} className="inline-flex items-center gap-2">
                        <input type="checkbox" name="usefulFeatures" checked={form.usefulFeatures.includes(v)} onChange={() => toggleCheckbox('usefulFeatures', v)} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                  {fieldErrors['usefulFeatures'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['usefulFeatures']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">14. How comfortable are you using your phone for scanning products while shopping? <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex items-center gap-4">
                    <input type="range" min={1} max={5} name="comfortLevel" value={form.comfortLevel} onChange={(e: any) => setForm((s: any) => ({ ...s, comfortLevel: Number(e.target.value) }))} />
                    <span className="text-sm">{form.comfortLevel} / 5</span>
                  </div>
                  {fieldErrors['comfortLevel'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['comfortLevel']}</p>}
                </div>
              </div>
            </section>

            {/* Section 4: Security & Trust (vertical) */}
            <section>
              <h2 className="text-lg font-semibold">Section 4: Security & Trust</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium">15. Would you trust mobile payment inside a supermarket using Razorpay or UPI? <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex flex-col gap-2">
                    {['Yes', 'Maybe', 'No'].map((v) => (
                      <label key={v} className="inline-flex items-center gap-2">
                        <input type="radio" name="trustPayment" value={v} checked={form.trustPayment === v} onChange={handleChange} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                  {fieldErrors['trustPayment'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['trustPayment']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">16. Which payment method do you prefer? <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex flex-col gap-2">
                    {['UPI', 'Credit / Debit Card', 'Wallet', 'Cash'].map((v) => (
                      <label key={v} className="inline-flex items-center gap-2">
                        <input type="checkbox" name="preferredPayments" checked={form.preferredPayments.includes(v)} onChange={() => toggleCheckbox('preferredPayments', v)} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                  {fieldErrors['preferredPayments'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['preferredPayments']}</p>}
                </div>
              </div>
            </section>

            {/* Section 5: Improvement Suggestions (vertical) */}
            <section>
              <h2 className="text-lg font-semibold">Section 5: Improvement Suggestions</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium">17. What feature would you like to see in ScanMart? <span className="text-red-500">*</span></label>
                  <textarea name="featureSuggestions" value={form.featureSuggestions} onChange={handleChange} required className="mt-1 block w-full rounded-md border p-2 h-24" />
                  {fieldErrors['featureSuggestions'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['featureSuggestions']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">18. What concerns do you have about this type of app? <span className="text-red-500">*</span></label>
                  <textarea name="concerns" value={form.concerns} onChange={handleChange} required className="mt-1 block w-full rounded-md border p-2 h-24" />
                  {fieldErrors['concerns'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['concerns']}</p>}
                  <p className="text-sm text-muted-foreground mt-2">Examples: security, incorrect scanning, payment issues, etc.</p>
                </div>
              </div>
            </section>

            {/* Section 6: Early Access (vertical) */}
            <section>
              <h2 className="text-lg font-semibold">Section 6: Early Access</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium">19. Would you like to try ScanMart when it launches? <span className="text-red-500">*</span></label>
                  <div className="mt-2 flex flex-col gap-2">
                    {['Yes', 'Maybe', 'No'].map((v) => (
                      <label key={v} className="inline-flex items-center gap-2">
                        <input type="radio" name="earlyAccess" value={v} checked={form.earlyAccess === v} onChange={handleChange} />
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                  {fieldErrors['earlyAccess'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['earlyAccess']}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium">If yes, enter your email for early access <span className="text-red-500">*</span></label>
                  <input name="earlyEmail" value={form.earlyEmail} onChange={handleChange} className="mt-1 block w-full rounded-md border p-2" type="email" placeholder="you@example.com" />
                  {fieldErrors['earlyEmail'] && <p className="text-sm text-red-600 mt-1">{fieldErrors['earlyEmail']}</p>}
                </div>
              </div>
            </section>

            <div className="flex items-center gap-4">
              <Button type="submit">Submit feedback</Button>
              <Button variant="secondary" asChild>
                <Link href="/">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}