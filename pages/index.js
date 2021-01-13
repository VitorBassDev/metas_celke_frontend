function Home({data}) {
  return (
    <>
      <h1> Minhas Metas</h1>
      <p>{console.log(data.metas)}</p>
    </> 
  )}
  
  export async function getServerSideProps() {
    const response = await fetch(`http://localhost:8080/metas`)
    const data = await response.json()
  //  console.log(data)
  
    return { props: {data} }
  }

export default Home;