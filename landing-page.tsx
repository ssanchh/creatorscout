"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Mail,
  Filter,
  Download,
  MessageSquare,
  List,
  Database,
  ShoppingBag,
  Users,
  User,
  Laptop,
  Briefcase,
  Smartphone,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

export default function LandingPage() {
  const [topEmail, setTopEmail] = useState("")
  const [bottomEmail, setBottomEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitLocation, setSubmitLocation] = useState<'top' | 'bottom' | null>(null)

  // Empty useEffect
  useEffect(() => {
    return () => {
      // Empty cleanup function
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent, location: 'top' | 'bottom') => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitLocation(location)
    
    const emailToSubmit = location === 'top' ? topEmail : bottomEmail
    
    try {
      console.log('Submitting email:', emailToSubmit, 'from:', location)
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToSubmit })
      })

      const data = await response.json()
      console.log('Server response:', data)
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist')
      }
      
      setSubmitStatus('success')
      if (location === 'top') {
        setTopEmail("")
      } else {
        setBottomEmail("")
      }
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setSubmitLocation(null)
      }, 3000)
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus('error')
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setSubmitLocation(null)
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0A] text-[#FAFAFA]">
      {/* Launch Banner */}
      <div className="bg-[#151515] border-b border-[#222222] py-2 text-center">
        <p className="text-sm font-medium">
          🚀 <span className="text-[#B4FF00]">Launching in April 2025</span> – Join now to get early access + free
          leads!
        </p>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-[#222222] bg-[#0A0A0A]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0A]/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="h-16 w-32 relative flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={120}
                height={120}
                className="object-contain brightness-[400%]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-[#E0E0E0] hover:text-[#FAFAFA] hover:bg-[#222222]">
              About
            </Button>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#E0E0E0] hover:text-[#FAFAFA] hover:bg-[#222222]"
                onClick={() => {
                  const element = document.getElementById("features")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Features
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#E0E0E0] hover:text-[#FAFAFA] hover:bg-[#222222]"
                onClick={() => {
                  const element = document.getElementById("how-it-works")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                }}
              >
                How It Works
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#E0E0E0] hover:text-[#FAFAFA] hover:bg-[#222222]"
                onClick={() => {
                  const element = document.getElementById("use-cases")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Use Cases
              </Button>
              <Button
                className="bg-[#B4FF00] text-black hover:bg-[#B4FF00]/90 hover:scale-105 transition-transform"
                size="sm"
                onClick={() => {
                  const element = document.getElementById("cta")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                }}
              >
                🚀 Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Simplified */}
      <section className="relative overflow-hidden py-20 bg-[#0A0A0A]">
        <div className="container relative z-10 mx-auto px-4 py-12 text-center md:py-24">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            Find the{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#B4FF00]">Perfect Creators</span>
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#B4FF00] blur-sm"></span>
              {/* Handwritten-style underline */}
              <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path
                  d="M0,5 C20,0 40,10 60,5 C80,0 100,5 100,5"
                  stroke="#B4FF00"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            in 30 Seconds.
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-[#E0E0E0]">
            Search by niche, export emails, and scale your brand — without scrolling endlessly on TikTok.
          </p>
          <div className="mx-auto max-w-md mb-8">
            <form onSubmit={(e) => handleSubmit(e, 'top')} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#222222] border-[#333333] text-[#FAFAFA] focus:border-[#B4FF00] focus:ring-[#B4FF00] h-12"
                value={topEmail}
                onChange={(e) => setTopEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                className={`text-black transition-all duration-200 h-12 px-6 text-base
                  ${isSubmitting ? 'bg-[#B4FF00]/70' : 'bg-[#B4FF00] hover:bg-[#B4FF00]/90 hover:scale-105'}`}
                disabled={isSubmitting}
              >
                {isSubmitting && submitLocation === 'top' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Joining...
                  </span>
                ) : '🚀 Join the Waitlist'}
              </Button>
            </form>
            {submitStatus === 'success' && (
              <p className="mt-2 text-sm text-[#B4FF00] flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Thanks for joining! We'll be in touch soon.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-2 text-sm text-red-500">
                Oops! Something went wrong. Please try again.
              </p>
            )}
            <p className="mt-2 text-sm text-[#E0E0E0]">Get 50 curated creators, free at launch</p>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNCNEZGMDAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0yNCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
      </section>

      {/* Problem vs Solution - Clean 2-Column Layout */}
      <section className="py-20 bg-[#111111] overflow-hidden" id="problem-solution">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Problem Card */}
            <div className="bg-[#FAFAFA] text-[#111] rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 relative inline-block">
                Problem
                {/* Handwritten-style red underline */}
                <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 C30,2 50,8 100,3" stroke="#FF5C5C" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </h3>
              <div className="space-y-4">
                <p>
                  Finding good influencers is slow, manual, and outdated. Most platforms are expensive or don't show
                  <strong> contact info</strong>.
                </p>
                <p>
                  <strong>Manual searching</strong> wastes hours of your time when you could be focusing on strategy and
                  closing deals.
                </p>
                <p>
                  <strong>Expensive platforms</strong> charge premium rates but still make you do the outreach work
                  yourself.
                </p>
                <p>
                  <strong>Outdated data</strong> leads to failed campaigns and wasted budget on creators who aren't a
                  good fit.
                </p>
              </div>
            </div>

            {/* Solution Card */}
            <div className="bg-[#FAFAFA] text-[#111] rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 relative inline-block">
                Solution
                {/* Handwritten-style green underline */}
                <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 C20,8 60,2 100,5" stroke="#B4FF00" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </h3>
              <div className="space-y-4">
                <p>
                  <strong>Search creators by niche</strong> in seconds, not hours. Filter by platform, engagement rate,
                  or follower count.
                </p>
                <p>
                  <strong>Get verified contact info</strong> instantly. Every creator profile includes a verified email
                  address.
                </p>
                <p>
                  <strong>Export ready-to-outreach</strong> creator lists as CSV files with all the data you need to
                  start your campaign.
                </p>
                <p>
                  Our database is constantly updated with new creators and performance metrics to ensure you always have
                  the most relevant options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" id="features">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">What You'll Get</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-[#151515] border-[#222222] hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(180,255,0,0.15)]">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-[#B4FF00]/10 p-3">
                  <div className="h-16 w-16 relative">
                    <Image
                      src="/images/logo.png"
                      alt="Search Icon"
                      width={64}
                      height={64}
                      className="object-contain brightness-[400%]"
                    />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold">Search Creators by Niche</h3>
                <p className="text-[#E0E0E0]">Find TikTok, IG & YouTube creators fast</p>
              </CardContent>
            </Card>
            <Card className="bg-[#151515] border-[#222222] hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(180,255,0,0.15)]">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-[#B4FF00]/10 p-3">
                  <Filter className="h-6 w-6 text-[#B4FF00]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Filter by Engagement or Platform</h3>
                <p className="text-[#E0E0E0]">Target exactly who you need</p>
              </CardContent>
            </Card>
            <Card className="bg-[#151515] border-[#222222] hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(180,255,0,0.15)]">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-[#B4FF00]/10 p-3">
                  <Download className="h-6 w-6 text-[#B4FF00]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Export Emails & Contact Info</h3>
                <p className="text-[#E0E0E0]">Download ready-to-outreach CSVs</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <Card className="bg-[#151515] border-[#222222] hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(180,255,0,0.15)]">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-[#B4FF00]/10 p-3">
                  <MessageSquare className="h-6 w-6 text-[#B4FF00]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Integrated Outreach</h3>
                <p className="text-[#E0E0E0]">Send personalized emails right from the dashboard</p>
              </CardContent>
            </Card>
            <Card className="bg-[#151515] border-[#222222] hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(180,255,0,0.15)]">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-[#B4FF00]/10 p-3">
                  <List className="h-6 w-6 text-[#B4FF00]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Curated Lists</h3>
                <p className="text-[#E0E0E0]">Pre-vetted creator packs by niche</p>
              </CardContent>
            </Card>
            <Card className="bg-[#151515] border-[#222222] hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(180,255,0,0.15)]">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-[#B4FF00]/10 p-3">
                  <Database className="h-6 w-6 text-[#B4FF00]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Growing Database</h3>
                <p className="text-[#E0E0E0]">New creators added weekly</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#111111]" id="how-it-works">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
          <div className="relative">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#151515] border-2 border-[#B4FF00] text-[#B4FF00]">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">Search</h3>
                <p className="text-[#E0E0E0]">Search by niche, platform, or followers</p>
                <div className="mt-4 text-[#B4FF00]">
                  <div className="h-20 w-20 relative">
                    <Image
                      src="/images/logo.png"
                      alt="Search Icon"
                      width={80}
                      height={80}
                      className="object-contain brightness-[400%]"
                    />
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 text-[#B4FF00] md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#151515] border-2 border-[#B4FF00] text-[#B4FF00]">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">Export</h3>
                <p className="text-[#E0E0E0]">Export creator profiles with email</p>
                <div className="mt-4 text-[#B4FF00]">
                  <Download className="h-8 w-8" />
                </div>
              </div>

              <div className="relative flex flex-col items-center text-center">
                <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 text-[#B4FF00] md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </div>
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#151515] border-2 border-[#B4FF00] text-[#B4FF00]">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">Reach Out</h3>
                <p className="text-[#E0E0E0]">Reach out and close deals faster</p>
                <div className="mt-4 text-[#B4FF00]">
                  <Mail className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Results Preview */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">This is what finding creators looks like.</h2>
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="overflow-hidden rounded-xl border border-[#222222] bg-[#151515] shadow-lg">
              <div className="border-b border-[#222222] bg-[#1A1A1A] p-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 h-6 w-full max-w-md rounded-md bg-[#222222]"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6 flex items-center gap-2">
                  <div className="flex-1 rounded-md bg-[#222222] p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 relative">
                        <Image
                          src="/images/logo.png"
                          alt="Search Icon"
                          width={40}
                          height={40}
                          className="object-contain brightness-[400%]"
                        />
                      </div>
                      <span className="text-sm text-[#E0E0E0]">Fitness influencers</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-[#B4FF00] text-black hover:bg-[#B4FF00]/90">
                    Search
                  </Button>
                </div>
                <div className="space-y-4">
                  {/* Fitness Influencer Examples */}
                  <div className="flex items-center gap-4 rounded-lg border border-[#222222] p-3 hover:bg-[#1A1A1A] transition-colors">
                    <div className="h-12 w-12 rounded-full bg-[#222222] overflow-hidden">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="Alex Fitness"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Alex Fitness</div>
                      <div className="text-sm text-[#B4FF00]">@alexfitpro</div>
                    </div>
                    <div className="text-sm text-center">
                      <div className="font-medium">245K</div>
                      <div className="text-xs text-[#E0E0E0]">Followers</div>
                    </div>
                    <div className="text-sm text-center">
                      <div className="font-medium text-[#B4FF00]">4.8%</div>
                      <div className="text-xs text-[#E0E0E0]">Engagement</div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#333333] text-[#E0E0E0] hover:bg-[#222222] hover:text-[#FAFAFA]"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 rounded-lg border border-[#222222] p-3 hover:bg-[#1A1A1A] transition-colors">
                    <div className="h-12 w-12 rounded-full bg-[#222222] overflow-hidden">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="FitWithJamie"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">FitWithJamie</div>
                      <div className="text-sm text-[#00AAFF]">@fitwithjamie</div>
                    </div>
                    <div className="text-sm text-center">
                      <div className="font-medium">78.2K</div>
                      <div className="text-xs text-[#E0E0E0]">Followers</div>
                    </div>
                    <div className="text-sm text-center">
                      <div className="font-medium text-[#B4FF00]">6.2%</div>
                      <div className="text-xs text-[#E0E0E0]">Engagement</div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#333333] text-[#E0E0E0] hover:bg-[#222222] hover:text-[#FAFAFA]"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 rounded-lg border border-[#222222] p-3 hover:bg-[#1A1A1A] transition-colors">
                    <div className="h-12 w-12 rounded-full bg-[#222222] overflow-hidden">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="Strong Sisters"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Strong Sisters</div>
                      <div className="text-sm text-[#FF5C5C]">@strongsisters</div>
                    </div>
                    <div className="text-sm text-center">
                      <div className="font-medium">124K</div>
                      <div className="text-xs text-[#E0E0E0]">Followers</div>
                    </div>
                    <div className="text-sm text-center">
                      <div className="font-medium text-[#B4FF00]">5.7%</div>
                      <div className="text-xs text-[#E0E0E0]">Engagement</div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#333333] text-[#E0E0E0] hover:bg-[#222222] hover:text-[#FAFAFA]"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-[#B4FF00]/10 p-2 mt-1">
                  <CheckCircle className="h-5 w-5 text-[#B4FF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Instantly find creators in any niche</h3>
                  <p className="text-[#E0E0E0]">
                    Search by keywords, platform, or audience size to find the perfect match.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-[#B4FF00]/10 p-2 mt-1">
                  <CheckCircle className="h-5 w-5 text-[#B4FF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">See contact info before paying</h3>
                  <p className="text-[#E0E0E0]">No more guessing or paying for useless leads. Get verified emails.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-[#B4FF00]/10 p-2 mt-1">
                  <CheckCircle className="h-5 w-5 text-[#B4FF00]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Save hours of manual search</h3>
                  <p className="text-[#E0E0E0]">
                    What used to take days now takes minutes. Focus on closing deals instead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#111111]">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">What Early Users Are Saying</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "David",
                role: "DTC Agency",
                quote: "We found 30 perfect creators in minutes instead of days.",
                avatar: "/images/person1.jpg",
              },
              {
                name: "Michael",
                role: "SaaS Founder",
                quote: "The email export feature alone saved us 10+ hours per week.",
                avatar: "/images/person2.jpg",
              },
              {
                name: "Jessica",
                role: "Marketing Lead",
                quote: "Finally, a tool that shows real contact info without the fluff.",
                avatar: "/images/person3.jpg",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="bg-[#151515] border-[#222222]">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 h-16 w-16 overflow-hidden rounded-full bg-[#222222]">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="mb-4 text-lg italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-[#B4FF00]">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Grid */}
      <section className="py-16">
        <div className="container">
          <h3 className="mb-10 text-center text-xl font-medium text-[#E0E0E0]">
            Trusted by builders, brands, and marketers
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {["DTC Labs", "IndieFounders", "SaaSLoop", "LaunchBuddy", "CreatorFlow"].map((logo) => (
              <div
                key={logo}
                className="flex h-12 items-center justify-center rounded-md bg-[#151515] px-6 opacity-60 hover:opacity-80 transition-opacity"
              >
                <span className="text-sm font-medium text-[#E0E0E0]">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-[#111111]" id="use-cases">
        <div className="container">
          <h2 className="mb-4 text-center text-3xl font-bold">Who This Platform Is Made For</h2>
          <p className="mb-12 text-center text-[#E0E0E0]">Built for doers, founders, and brands who move fast.</p>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-[#151515] border-[#222222] hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(180,255,0,0.15)]">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-[#B4FF00]/10 p-3">
                  <ShoppingBag className="h-6 w-6 text-[#B4FF00]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">For eCom Brands</h3>
                <p className="text-[#E0E0E0]">Find the perfect micro-creators for your next product launch</p>
              </CardContent>
            </Card>
            <Card className="bg-[#151515] border-[#222222] hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(180,255,0,0.15)]">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-[#00AAFF]/10 p-3">
                  <Users className="h-6 w-6 text-[#00AAFF]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">For UGC Agencies</h3>
                <p className="text-[#E0E0E0]">Skip the spreadsheets — get outreach-ready leads fast</p>
              </CardContent>
            </Card>
            <Card className="bg-[#151515] border-[#222222] hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(180,255,0,0.15)]">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-[#FF5C5C]/10 p-3">
                  <User className="h-6 w-6 text-[#FF5C5C]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">For Solo Creators</h3>
                <p className="text-[#E0E0E0]">Connect with aligned brands and grow your collabs</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <Card className="bg-[#151515] border-[#222222] hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(180,255,0,0.15)]">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-[#9945FF]/10 p-3">
                  <Laptop className="h-6 w-6 text-[#9945FF]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">For SaaS Founders</h3>
                <p className="text-[#E0E0E0]">Use micro-creators to scale your product with UGC</p>
              </CardContent>
            </Card>
            <Card className="bg-[#151515] border-[#222222] hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(180,255,0,0.15)]">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-[#00FFAA]/10 p-3">
                  <Smartphone className="h-6 w-6 text-[#00FFAA]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">For Mobile App Builders</h3>
                <p className="text-[#E0E0E0]">Find creators to promote your app in the niche</p>
              </CardContent>
            </Card>
            <Card className="bg-[#151515] border-[#222222] hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(180,255,0,0.15)]">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-[#FFA500]/10 p-3">
                  <Briefcase className="h-6 w-6 text-[#FFA500]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">For Marketing Agencies</h3>
                <p className="text-[#E0E0E0]">Build outreach lists in minutes for any campaign</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20" id="cta">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-xl bg-[#151515] border border-[#222222] p-8 text-center shadow-[0_0_30px_rgba(180,255,0,0.15)]">
            <h2 className="mb-4 text-3xl font-bold">Ready to Find Your Perfect Creators?</h2>
            <p className="mb-6 text-xl text-[#E0E0E0]">
              Join the waitlist and get early access + 50 free creator leads on launch.
            </p>
            <form onSubmit={(e) => handleSubmit(e, 'bottom')} className="mx-auto flex max-w-md gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#222222] border-[#333333] text-[#FAFAFA] focus:border-[#B4FF00] focus:ring-[#B4FF00]"
                value={bottomEmail}
                onChange={(e) => setBottomEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                className="bg-[#B4FF00] text-black hover:bg-[#B4FF00]/90 hover:scale-105 transition-transform h-12"
                disabled={isSubmitting}
              >
                {isSubmitting && submitLocation === 'bottom' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Joining...
                  </span>
                ) : '🚀 Join the Waitlist'}
              </Button>
            </form>
            <p className="mt-2 text-sm text-[#E0E0E0]">Get 50 curated creators, free at launch</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#111111]">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Still Have Questions?</h2>
          <div className="mx-auto max-w-2xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-[#222222]">
                <AccordionTrigger className="text-left text-lg font-medium py-4">
                  How many creators can I find per search?
                </AccordionTrigger>
                <AccordionContent className="text-[#E0E0E0] pb-4">
                  We show 50+ creators per query, filtered by relevance. You can further refine your search using our
                  advanced filters.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-[#222222]">
                <AccordionTrigger className="text-left text-lg font-medium py-4">
                  What platforms are supported?
                </AccordionTrigger>
                <AccordionContent className="text-[#E0E0E0] pb-4">
                  TikTok, Instagram, and YouTube. We're constantly expanding our platform coverage based on user
                  feedback.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-[#222222]">
                <AccordionTrigger className="text-left text-lg font-medium py-4">When does it launch?</AccordionTrigger>
                <AccordionContent className="text-[#E0E0E0] pb-4">
                  We're launching in April 2025 with early access to waitlist users. Join now to be among the first to
                  try it.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#222222] py-8 bg-[#141414]">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center">
              <div className="h-20 w-20 relative">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={80}
                  height={80}
                  className="object-contain brightness-[400%]"
                />
              </div>
            </div>
            <p className="text-sm text-[#E0E0E0]">Built in 2025</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-[#E0E0E0] hover:text-[#FAFAFA] hover:bg-[#222222]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Button>
              <div className="text-xs text-[#E0E0E0] flex items-center">DM us for collabs</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

