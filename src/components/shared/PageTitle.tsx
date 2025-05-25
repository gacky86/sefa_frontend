type PageTitleProps = {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return <h1 className="text-h1 text-center mt-[30px] mb-[16px]">{title}</h1>
}

export default PageTitle
