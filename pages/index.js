function Home({data}) {
  return (
    <>
      <h1> Minhas Metas</h1>
      <hr/>
      <p>{console.log(data.metas)}</p>
        {data.metas.map(meta => (
          <div key={meta._id}>
            <h2>{meta.name}</h2>
            <h2>{meta.description}</h2>
            <h2>{meta.status}</h2>
            <hr/>
          </div>
        ))}
    </> 
  )}
  
  export async function getServerSideProps() {
    const response = await fetch(`http://localhost:8080/metas`)
    const data = await response.json()
  //  console.log(data)
  
    return { props: {data} }
  }

export default Home;