import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// api
import api from '../services/api'

// map
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

// css
import '../styles/pages/orphanage-map.css'

// images
import mapMarkerImg from '../images/map-marker.svg'

// icons
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import mapIcon from '../utils/mapIcon'

// interface para criar o tipo orfanato
interface Orphanage {
  id: number
  latitude: number
  longitude: number
  name: string
}

export default function OrphanagesMap() {

  // estados | tipo / interface
  const [ orphanages, setOrphanages ] = useState<Orphanage[]>([])

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data)
    })
  }, [])

  return (
    <div id="page-map">
      
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>

          <h2>Escolha um orfanato no mapa</h2>

          <p>Muitas crianças estão esperando sua visita</p>
        </header>

        <footer>
          <strong>São Luís</strong>
          <span>Maranhão</span>
        </footer>
      </aside>

      <Map
        center={[ -2.5141447,-44.2952611 ]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />

        {
          orphanages.map(orphanage => {
            return (
              <Marker 
                key={orphanage.id}
                icon={mapIcon}
                position={[ orphanage.latitude, orphanage.longitude ]}
              >
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                  { orphanage.name }

                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#fff" />
                  </Link>
                </Popup>
              </Marker>
            )
          })
        }

      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>

    </div>
  )
}
