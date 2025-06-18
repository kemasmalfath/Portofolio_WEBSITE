// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 76, 117, 0.98)"
  } else {
    navbar.style.background = "rgba(15, 76, 117, 0.95)"
  }
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections for animation
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(section)
})

// Contact button functionality
document.querySelector(".contact-btn").addEventListener("click", () => {
  document.querySelector("#contact").scrollIntoView({
    behavior: "smooth",
  })
})

// Project view buttons
document.querySelectorAll(".view-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault()
    alert("Project demo akan segera tersedia!")
  })
})

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-content h1")
  const originalText = heroTitle.textContent
  //typeWriter(heroTitle, originalText, 100)
})

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Skills animation on hover
document.querySelectorAll(".skill-item").forEach((skill) => {
  skill.addEventListener("mouseenter", () => {
    skill.style.transform = "translateY(-10px) scale(1.05)"
  })

  skill.addEventListener("mouseleave", () => {
    skill.style.transform = "translateY(0) scale(1)"
  })
})

// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle")
const html = document.documentElement

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light"
html.classList.toggle("dark", currentTheme === "dark")

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark")
  const theme = html.classList.contains("dark") ? "dark" : "light"
  localStorage.setItem("theme", theme)
})

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu-button")
const mobileMenu = document.getElementById("mobile-menu")

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden")
})

// Close mobile menu when clicking on links
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden")
  })
})

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Typing Animation
const typedTextElement = document.getElementById("typed-text")
const textArray = ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Tech Innovator", "Code Craftsman"]

let textIndex = 0
let charIndex = 0
let isDeleting = false

function typeText() {
  const currentText = textArray[textIndex]

  if (isDeleting) {
    typedTextElement.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    typedTextElement.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000 // Pause at end
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % textArray.length
    typeSpeed = 500 // Pause before typing next word
  }

  setTimeout(typeText, typeSpeed)
}

// Start typing animation
typeText()

// Particles Animation
const canvas = document.getElementById("particles-canvas")
const ctx = canvas.getContext("2d")

let particles = []
let animationId

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.2,
  }
}

function initParticles() {
  particles = []
  for (let i = 0; i < 50; i++) {
    particles.push(createParticle())
  }
}

function updateParticles() {
  particles.forEach((particle) => {
    particle.x += particle.vx
    particle.y += particle.vy

    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
  })
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle) => {
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(100, 149, 237, ${particle.opacity})`
    ctx.fill()
  })

  // Draw connections
  particles.forEach((particle, i) => {
    particles.slice(i + 1).forEach((otherParticle) => {
      const dx = particle.x - otherParticle.x
      const dy = particle.y - otherParticle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(otherParticle.x, otherParticle.y)
        ctx.strokeStyle = `rgba(100, 149, 237, ${0.1 * (1 - distance / 100)})`
        ctx.stroke()
      }
    })
  })
}

function animateParticles() {
  updateParticles()
  drawParticles()
  animationId = requestAnimationFrame(animateParticles)
}

// Initialize particles
resizeCanvas()
initParticles()
animateParticles()

window.addEventListener("resize", () => {
  resizeCanvas()
  initParticles()
})

// Intersection Observer for Animations
const observerOptions2 = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in")

      // Animate skill bars
      if (entry.target.classList.contains("skill-item")) {
        const skillBar = entry.target.querySelector(".skill-bar")
        const width = skillBar.getAttribute("data-width")
        setTimeout(() => {
          skillBar.style.width = width
        }, 500)
      }
    }
  })
}, observerOptions2)

// Observe elements for animation
document
  .querySelectorAll(".animate-slide-up, .animate-slide-in-left, .animate-slide-in-right, .skill-item")
  .forEach((el) => {
    observer2.observe(el)
  })

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav")
  if (window.scrollY > 100) {
    navbar.classList.add("backdrop-blur-md")
  } else {
    navbar.classList.remove("backdrop-blur-md")
  }
})

// Contact Form Handling
const contactForm = document.getElementById("contact-form")
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.innerHTML

  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...'
  submitButton.disabled = true

  setTimeout(() => {
    submitButton.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!'
    submitButton.classList.remove("from-blue-500", "to-purple-600")
    submitButton.classList.add("from-green-500", "to-green-600")

    setTimeout(() => {
      submitButton.innerHTML = originalText
      submitButton.disabled = false
      submitButton.classList.remove("from-green-500", "to-green-600")
      submitButton.classList.add("from-blue-500", "to-purple-600")
      contactForm.reset()
    }, 2000)
  }, 1500)
})

// Project Cards Hover Effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Add scroll progress indicator
const scrollProgress = document.createElement("div")
scrollProgress.className =
  "fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 transform scale-x-0 origin-left transition-transform duration-300"
document.body.appendChild(scrollProgress)

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.body.offsetHeight - window.innerHeight
  const scrollPercent = scrollTop / docHeight
  scrollProgress.style.transform = `scaleX(${scrollPercent})`
})

// Add floating action button for scroll to top
const scrollToTopBtn = document.createElement("button")
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
scrollToTopBtn.className =
  "fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 opacity-0 pointer-events-none z-50"
document.body.appendChild(scrollToTopBtn)

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
})

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.remove("opacity-0", "pointer-events-none")
  } else {
    scrollToTopBtn.classList.add("opacity-0", "pointer-events-none")
  }
})

// Initialize AOS (Animate On Scroll) alternative
function initScrollAnimations() {
  const elements = document.querySelectorAll('[class*="animate-"]')

  elements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
  })

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease"
        }
      })
    },
    { threshold: 0.1 },
  )

  elements.forEach((el) => scrollObserver.observe(el))
}

// Initialize scroll animations
initScrollAnimations()

// Add cursor trail effect
let mouseX = 0
let mouseY = 0
let trail = []

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

function createTrailDot() {
  const dot = document.createElement("div")
  dot.className = "fixed w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-50 opacity-70"
  dot.style.left = mouseX + "px"
  dot.style.top = mouseY + "px"
  document.body.appendChild(dot)

  trail.push(dot)

  setTimeout(() => {
    dot.remove()
    trail = trail.filter((d) => d !== dot)
  }, 500)
}

// Create trail dots periodically
setInterval(createTrailDot, 50)

console.log("🚀 Portfolio website loaded successfully!")
console.log("💼 Built with HTML, Tailwind CSS, and JavaScript")
console.log("🎨 Features: Dark/Light theme, Animations, Particles, and more!")
