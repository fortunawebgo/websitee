"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Instagram, MapPin, Menu, MessageSquare, Phone, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("Saya Tertarik untuk Order")
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)

  const heroImages = ["/hero-1.jpeg", "/hero-2.jpeg", "/hero-3.jpeg"]

  const menuImages = ["/menu-1.jpeg", "/menu-2.jpeg"]

  const testimonialImages = [
    "/testimonial-1.jpeg",
    "/testimonial-2.jpeg",
    "/testimonial-3.jpeg",
    "/testimonial-4.jpeg",
    "/testimonial-5.jpeg",
  ]

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false) // Close mobile menu after clicking
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsMenuOpen(false) // Close mobile menu after clicking
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleWhatsAppRedirect = () => {
    const encodedMessage = encodeURIComponent(`${message}`)
    const whatsappUrl = `https://wa.me/6287720710196?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  const openImagePreview = (imageSrc: string) => {
    setPreviewImage(imageSrc)
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"
  }

  const closeImagePreview = () => {
    setPreviewImage(null)
    // Restore scrolling
    document.body.style.overflow = "auto"
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo.png" alt="KANE ABIEZZ Logo" width={80} height={40} className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={scrollToTop} className="text-gray-800 hover:text-primary font-medium">
              Home
            </button>
            <button onClick={() => scrollToSection(menuRef)} className="text-gray-800 hover:text-primary font-medium">
              Menu
            </button>
            <button onClick={() => scrollToSection(aboutRef)} className="text-gray-800 hover:text-primary font-medium">
              About
            </button>
            <button
              onClick={() => scrollToSection(locationRef)}
              className="text-gray-800 hover:text-primary font-medium"
            >
              Lokasi
            </button>
            <Link
              href="https://www.instagram.com/kaneabiezzz"
              target="_blank"
              className="flex items-center gap-1 text-gray-800 hover:text-primary font-medium"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </Link>
            <Link href="https://wa.me/6287720710196" target="_blank">
              <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-12">
                <div className="flex flex-col gap-6 mt-6">
                  <button
                    onClick={scrollToTop}
                    className="flex items-center text-lg font-medium py-2 border-b border-gray-100"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection(menuRef)}
                    className="flex items-center text-lg font-medium py-2 border-b border-gray-100"
                  >
                    Menu
                  </button>
                  <button
                    onClick={() => scrollToSection(aboutRef)}
                    className="flex items-center text-lg font-medium py-2 border-b border-gray-100"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection(locationRef)}
                    className="flex items-center text-lg font-medium py-2 border-b border-gray-100"
                  >
                    Lokasi
                  </button>
                  <Link
                    href="https://www.instagram.com/kaneabiezzz"
                    target="_blank"
                    className="flex items-center gap-2 text-lg font-medium py-2 border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Instagram className="h-5 w-5" />
                    Instagram
                  </Link>
                  <Link href="https://wa.me/6287720710196" target="_blank" onClick={() => setIsMenuOpen(false)}>
                    <Button className="bg-green-500 hover:bg-green-600 text-white w-full flex items-center justify-center gap-2 mt-2">
                      <Phone className="h-4 w-4" />
                      Contact
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero Section with Image Slider */}
      <section className="pt-16 relative h-[500px] md:h-[600px]">
        <div className="relative w-full h-full overflow-hidden">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => openImagePreview(image)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`KANE ABIEZZ Food ${index + 1}`}
                fill
                className="object-cover cursor-pointer"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">KANE ABIEZZ</h1>
                  <p className="text-xl md:text-2xl">Catering Lezat untuk Semua Momen</p>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </section>

      {/* Menu Section */}
      <section ref={menuRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Menu Pilihan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuImages.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-64 md:h-80 cursor-pointer" onClick={() => openImagePreview(image)}>
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Menu Item ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-semibold mb-2">{index === 0 ? "Paket Spesial" : "Menu Favorit"}</h3>
                  <p className="text-gray-600">
                    {index === 0
                      ? "Nikmati paket spesial kami dengan berbagai pilihan menu lezat yang akan memanjakan lidah Anda."
                      : "Menu favorit pelanggan kami yang selalu menjadi pilihan utama di setiap acara."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Testimoni Pelanggan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialImages.map((image, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48 cursor-pointer" onClick={() => openImagePreview(image)}>
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Testimonial ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Pelanggan {index + 1}</h3>
                  <p className="text-gray-600">
                    "Makanan dari KANE ABIEZZ sangat lezat dan pelayanannya memuaskan. Saya sangat merekomendasikan
                    catering ini untuk acara Anda!"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary italic mb-2 text-lg">catering andalan gak bikin kantong kering</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 mb-4">
              KANE ABIEZZ adalah layanan catering yang didedikasikan untuk menyajikan makanan berkualitas dengan harga
              yang terjangkau. Kami memahami bahwa makanan lezat tidak harus mahal, dan itulah mengapa kami berkomitmen
              untuk menyediakan pilihan menu yang beragam namun tetap ramah di kantong.
            </p>
            <p className="text-gray-700 mb-4">
              Didirikan dengan semangat untuk berbagi cita rasa kuliner yang autentik, KANE ABIEZZ telah melayani
              berbagai acara dari pertemuan kecil hingga perayaan besar. Kami menggunakan bahan-bahan segar dan
              berkualitas untuk memastikan setiap hidangan kami memenuhi standar kelezatan yang tinggi.
            </p>
            <p className="text-gray-700">
              Dengan KANE ABIEZZ, Anda tidak perlu khawatir tentang anggaran yang membengkak. Kami menawarkan solusi
              catering yang ekonomis tanpa mengorbankan kualitas dan rasa. Percayakan kebutuhan catering Anda kepada
              kami, dan nikmati pengalaman kuliner yang memuaskan tanpa menguras kantong!
            </p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section ref={locationRef} className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Lokasi Kami</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="text-primary h-6 w-6 flex-shrink-0 mt-1" />
                <p className="text-gray-800">Kost Arzela Cilengkrang 1. RT 03 RW 02 Kel Cisurupan kec Cibiru Bandung</p>
              </div>
              <p className="text-gray-700 mb-4">
                KANE ABIEZZ strategis berlokasi di kawasan Cibiru, Bandung, yang mudah diakses dari berbagai area di
                kota. Kami beroperasi dari dapur yang bersih dan terorganisir untuk memastikan setiap hidangan disiapkan
                dengan standar kebersihan yang tinggi.
              </p>
              <p className="text-gray-700">
                Sebagai bisnis kuliner yang berkembang, kami selalu berusaha untuk menjangkau lebih banyak pelanggan di
                Bandung dan sekitarnya. Kami menyediakan layanan pengantaran untuk memudahkan Anda menikmati hidangan
                kami tanpa perlu datang ke lokasi. Jangan ragu untuk menghubungi kami untuk informasi lebih lanjut
                tentang area pengantaran dan biaya tambahan yang mungkin berlaku.
              </p>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-lg overflow-hidden shadow-md h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9984339600384!2d107.71675867462652!3d-6.8932169930097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68dd8c5b9b0d11%3A0x5f5160f6c9796e4b!2sCilengkrang%2C%20Kec.%20Cilengkrang%2C%20Kota%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1712242731889!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi KANE ABIEZZ"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Hubungi Kami</h2>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="grid gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <Input
                  id="name"
                  placeholder="Masukkan nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Pesan
                </label>
                <Textarea
                  id="message"
                  placeholder="Tulis pesan Anda"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button
                onClick={handleWhatsAppRedirect}
                className="bg-green-500 hover:bg-green-600 w-full flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Kirim Pesan via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <Image src="/logo.png" alt="KANE ABIEZZ Logo" width={100} height={50} className="h-12 w-auto" />
            </div>
            <div className="flex items-center gap-4">
              <Link href="https://www.instagram.com/kaneabiezzz" target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-0 border-0 hover:opacity-90"
                >
                  <div className="bg-white rounded-full p-1.5">
                    <Instagram className="h-5 w-5 text-gray-800" />
                  </div>
                </Button>
              </Link>
              <Link href="https://wa.me/6287720710196" target="_blank">
                <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  WhatsApp
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} KANE ABIEZZ. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeImagePreview}
        >
          <div className="relative max-w-4xl w-full h-auto max-h-[90vh]">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white border-0 hover:bg-black hover:bg-opacity-70"
              onClick={closeImagePreview}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="relative w-full h-full">
              <Image
                src={previewImage || "/placeholder.svg"}
                alt="Preview"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

