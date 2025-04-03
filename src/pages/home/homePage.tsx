import Header from './header';
import Content from './content'
import { useTheme } from '../../config/theme';

function HomePage() {
  const { isDarkMode } = useTheme();

  return (
    <>
      {/* header */}
      <nav className={`${isDarkMode ? "bg-gray-800" : "bg-cyan-800"} p-2 fixed top-0 w-full z-[100] h-[50px] flex`}>
        <Header></Header>
      </nav>

      {/* content */}
      <div className="h-screen flex">
        <Content></Content>
      </div>
    </>
  )
}

export default HomePage