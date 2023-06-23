import AlternativeAuth from "../components/molecules/alternative-auth";

import astronaut from '/public/jonas-verstuyft-flsFQ3UTuKw-unsplash.jpg'

export default function Home() {
  return (
      <div className="bg-cover" style={{ backgroundImage: `url(${astronaut.src})` }}>
        <div className="col-6 auth-widget">
          <AlternativeAuth />
        </div>
      </div>
  )
}