
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

async function initPage() {
    await loadInclude("./assets/include/header.html", "#header-placeholder")
    await loadInclude("./assets/include/sidebar.html", "#sidebar-placeholder")
}

initPage()
