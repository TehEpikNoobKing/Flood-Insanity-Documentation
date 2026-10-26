
async function loadInclude(file, selector) {
    const target = document.querySelector(selector)
    if (!target) return

    try {
        const response = await fetch(file)

        if (!response.ok) {
            throw new Error(`Couldn't load ${file}: ${response.status}`)
        }

        target.innerHTML = await response.text()
    } catch (error) {
        console.error(error)
    }
}

function initScrollSpy() {
    const links = [...document.querySelectorAll(
        '.page-contents a[href^="#"]'
    )]

    const sections = links
        .map(link => {
            const id = link.getAttribute("href").slice(1)
            return document.getElementById(id)
        })
        .filter(Boolean)

    if (!sections.length) return

    function updateActiveSection() {
        // Choose the last section that has passed the header.
        let activeSection = sections[0]

        for (const section of sections) {
            if (section.getBoundingClientRect().top <= 110) {
                activeSection = section
            } else {
                break
            }
        }

        // At the very bottom, activate the final section.
        if (window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2) {
            activeSection = sections[sections.length - 1]
        }

        links.forEach(link => {
            const isActive =
                link.getAttribute("href") === `#${activeSection.id}`

            link.classList.toggle("active", isActive)

            if (isActive) {
                link.setAttribute("aria-current", "location")
            } else {
                link.removeAttribute("aria-current")
            }
        })
    }

    window.addEventListener("scroll", updateActiveSection, {
        passive: true
    })

    window.addEventListener("resize", updateActiveSection)

    updateActiveSection()
}


async function initPage() {
    await loadInclude("./assets/include/header.html", "#header-placeholder")
    await loadInclude("./assets/include/sidebar.html", "#sidebar-placeholder")
    await loadInclude("./assets/include/footer.html", "#footer-placeholder")
}

initPage()
initScrollSpy()