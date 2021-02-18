import React, {useState} from 'react';
import {Button} from 'reactstrap';

function Cadastrar() {
	
  const [meta, setMeta] = useState({
    name: '', 
    description: '',
    status: ''
  })

  const [response, setResponse] = useState({
    formsave: false,
    type: '',
    message: ''
  })

  /* PEGAR OS VALORES DA CONSTANTE META 
    - ...META para pegar todos os valores do formulário

   */
  const onChangeInput = e => setMeta({
    ...meta, [e.target.name]: e.target.value
  })

  /** 
   * FUNÇÃO sendMeta 
   * - Envia o formulário
   * - e.preventDefault - trava a atualizaçao no navegador
   * - conectar e enviar os dados para a api
   * - atribui as configurações 
   */
  const sendMeta = async e => {
    e.preventDefault();

    console.log(meta)

    try{
      const res = await fetch('http://localhost:8080/metas', {
        method: 'POST', 
        body: JSON.stringify(meta),
        headers: {'Content-Type': 'application/json'}
      })

      // TRATAR A VALIDAÇÃO ENVIO DO FORMULÁRIO
      const respostaEnv = await res.json()

        if (respostaEnv.error){
          setResponseS({
            formsave: false,
            type: 'error',
            message: respostaEnv.message
          })
        } else {
          setResponse({
            formsave: false,
            type: 'success',
            message: respostaEnv.message
          })
      }

    }catch(err){
      setResponse({
        formsave: false,
        type: 'error',
        message: "Meta não cadastrada, tente novamente mais tarde"
      })
    }
  }

  return (
		<>
			<h1>Cadastrar nova meta</h1>
			<hr/>

      {response.type === 'error'? <p>{response.message} </p>: ""}
      {response.type === 'success'? <p>{response.message} </p>: ""}

			<form onSubmit={sendMeta}>
				<label> Nome </label>

				<input 
					type="text"
					name="name"
          id="name" 
					placeholder="Digite o Nome da Meta"
          onChange={onChangeInput}
          /> <br/> <br/>

        <label> Descrição </label>  
        <input 
					type="text"
					name="description"
          id="description"
					placeholder="Digite a descrição" 
          onChange={onChangeInput}
          /> <br/> <br/>

        <label> Status </label>
        <input 
					type="text"
					name="status"
          id="status"
					placeholder="Digite o Status" 
          onChange={onChangeInput}
          /> <br/> <br/>

          <Button type="submit">
            Cadastrar
          </Button>
			</form>	 

      <a href="/"> Voltar </a>
		</>
	)
}
	
export default Cadastrar;