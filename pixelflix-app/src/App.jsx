import './App.scss'

function App() {

  return (
    <section className='example'>
    <div className='example__header'>
      <img className='example__header-img' src='/logo.svg' />
      <h1 className='example__header-title'>Pixelflix Project</h1>
    </div>
    <div className='example__sub'>
      <h3 className='example__sub-heading'>Let's Use BEM Naming Convention for the Class Names</h3>
      <p className='example__sub-paragraph'>BEM will enable a more uniform and organized code structure, ensuring cohesion and better integration with our SCSS files.</p>
    </div>

    <iframe className='example__video' width="560" height="315" src="https://www.youtube.com/embed/xaXmoVZ3koo?si=6Xd4HNSepI7UZGSe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </section>
  )
}

export default App
