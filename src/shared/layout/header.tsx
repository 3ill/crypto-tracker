interface IHeader {
  children: React.ReactNode;
}

const Header: React.FC<IHeader> = ({ children }) => {
  return <header className="header motion-preset-blur-up">{children}</header>;
};

export default Header;
