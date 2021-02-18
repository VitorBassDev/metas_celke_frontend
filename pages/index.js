import { Container } from "reactstrap";

function Home({data}) {
  return (
    <>
    <Container>
      <h1 className="mt-5 text-center text-primary"> Minhas Metas</h1>
      <hr/>
      <p>{console.log(data.metas)}</p>
        {data.metas.map(meta => (
          <div key={meta._id}>
            <h2>{meta._id}</h2>
            <h2>{meta.name}</h2>
            <h2>{meta.description}</h2>
            <h2>{meta.status}</h2>
            <hr/>
          </div>
        ))}
        </Container>
    </> 
  )}
  
  export async function getServerSideProps() {
    const response = await fetch(`http://localhost:8080/metas`)
    const data = await response.json()
  //  console.log(data)
  
    return { props: {data} }
  }

export default Home;