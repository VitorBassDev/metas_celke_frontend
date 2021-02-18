import React, {useState} from 'react';
import
 {
  Button, 
  Jumbotron,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
  } from 'reactstrap';

function Cadastrar() {
	
  const [meta, setMeta] = useState({
    name: '', 
    description: '',
    status: ''
  })

  const [response, setResponse] = useState({
    formSave: false,
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

    setResponse({formSave: true})

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
    <Jumbotron fluid className="form">
      <style>
        {`.form{
            background-color: #171941;
            color: #bf38ac;
            padding-top: 30px;
            padding-bottom: 150px;
            margin-bottom: 0rem ! important ;
          }`
        }
      </style>
      <Container>
        <h1>Cadastrar nova meta</h1>
        <hr/>

        {response.type === 'error'? <p>{response.message} </p>: ""}
        {response.type === 'success'? <p>{response.message} </p>: ""}

        <Form onSubmit={sendMeta}>

          <FormGroup>
            <Label for="name">Nome</Label>
            <Input 
              type="text" 
              name="name" 
              id="name"
              placeholder="Nome da Meta"
              onChange={onChangeInput}
            />
          </FormGroup>

          <FormGroup>
            <Label for="description">Descrição</Label>
            <Input 
              type="text" 
              name="description" 
              id="description"
              placeholder="Descrição Detalhada"
              onChange={onChangeInput}
            />
          </FormGroup>

          <FormGroup>
            <Label for="status">Status</Label>
              <Input type="select" name="status" id="status">
                <option disabled >  </option>
                <option>Pendente    </option>
                <option>Iniciado    </option>
                <option>Finalizado  </option>
                
              </Input>
          </FormGroup>
            {
            response.formSave ? 
              <Button 
                type="submit" disabled>
                Enviando . . .
              </Button> :
              
              <Button 
                type="submit">
                Cadastrar
              </Button>
              }
            
        </Form>
      </Container>	 
    </Jumbotron>
      <a href="/"> Voltar </a>
		</>
	)
}
	
export default Cadastrar;