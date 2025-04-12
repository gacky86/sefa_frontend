import Header from "components/layouts/Header";

const CommonLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        {children}
      </main>
    </>
  )
}

export default CommonLayout
