const alertbar = document.querySelector('.alertbar')
window.addEventListener('scroll', () => {
  if (pageYOffset > 200) {
    alertbar.style.display = 'block'
  } else {
    alertbar.style.display = 'none'
  }
})
