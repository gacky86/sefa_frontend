import Header from "components/layouts/Header";
import Footer from "components/layouts/Footer";

const CommonLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default CommonLayout
