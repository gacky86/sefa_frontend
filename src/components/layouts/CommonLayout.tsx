import Header from "components/layouts/Header";
import Footer from "components/layouts/Footer";

const CommonLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main className="pt-[50px]">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default CommonLayout
