import  { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'


import { Spinner } from './components/Spinner'
import { Formulario } from './components/Formulario'
import { Resultado } from './components/Resultado'
import { Error } from './components/Error'

const Contenedor = styled.div`
max-width: 900px;
margin: 0 auto;
width: 90%;
@media ( min-width: 992px){
  display: grid;
  grid-template-columns: repeat( 2, 1fr);
  column-gap: 2rem
}
`

const Imagen = styled.img`
max-width: 400px;
width: 80%;
margin: 100px auto 0 auto;
display: block
`

const Heading = styled.h1`
font-family: 'lato', sans-serif;
color: #FFF;
text-align: center;
font-weight: 700;
margin-top: 80px;
margin-bottom: 50px;
font-size: 34px;
&::after{
  content: '';
  width: 100px;
  height: 6px;
  background-color: #66a2fe;
  display: block;
  margin: 10px auto 0 auto;
}
`

export const App = () => {

  const [monedas, setMonedas] = useState({})
  const [ resultado, setResultado] = useState({})
  const [ isLoading, setIsLoading] = useState(false)
  const [error, setError ] = useState(false)
  const [errorMsg, setErrorMsg ] = useState('')

  useEffect(()=>{
    if(Object.keys(monedas).length > 0){
      setError(false)
      setIsLoading(true)
      setResultado({})
      const cotizarCripto = async () => {
        const { moneda, criptomoneda } = monedas
        const API = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
       
        try {
          const res = await fetch(API)
          const result = await res.json()
          /* console.log(result) */
          setResultado(result.DISPLAY[criptomoneda][moneda])
          setIsLoading(false)
        } catch (error) {
          console.log(error)
          setError(true)
          setErrorMsg('NO se encontro Precio en ese par')
        }
          
        }
        
        cotizarCripto()

    }
  },[monedas])

  return (
    <Contenedor>
      <Imagen
        src={ ImagenCripto }
        alt='Imagen de criptos'
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          setMonedas = { setMonedas }
          setIsLoading={ setIsLoading }
        />
        {error && <Error>{errorMsg}</Error>}
        {isLoading&& <Spinner/>}
        {resultado.PRICE && (<Resultado resultado={ resultado }  />)}
      </div>

    </Contenedor>
  )

}
