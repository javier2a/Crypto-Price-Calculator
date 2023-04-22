import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useSelectMonedas } from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import { Error } from './Error'


const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    margin-top: 30px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`




export const Formulario = ({ setMonedas, setIsLoading }) => {
  
  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)


  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
  const [ criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos)

  useEffect(() => {
    setIsLoading(true)
    const consultarApi = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

      const resp = await fetch(url)
      const results = await resp.json()
      const arrayCripto = results.Data.map( ({ CoinInfo }) => {

      const objeto = {
       id: CoinInfo.Name,
       nombre: CoinInfo.FullName
      }
      return objeto
      })
     setCriptos(arrayCripto)
     setIsLoading(false)
    }
    consultarApi()
  
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    if([ moneda, criptomoneda ].includes('')){
      setError(true)

      return
    }
    setError(false)
    setMonedas({
      moneda,
      criptomoneda
    })
  }
  
  return (
    <>
      { error && <Error>Todos los campos son obligatorios</Error>}
      <form 
        onSubmit={ handleSubmit }
      >
          <SelectMonedas/>
          <SelectCriptomoneda/>

          <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
    
  )
}
