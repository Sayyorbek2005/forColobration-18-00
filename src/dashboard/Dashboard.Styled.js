import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #eef1f5;

`;

export const Sidebar = styled.div`
  width: 250px;
  background: #0d3761;
  color: white;
  padding: 30px 20px;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
`;

export const Profile = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const Avatar = styled.div`
  width: 90px;
  height: 90px;
  background: white;
  color: #0d3761;
  border-radius: 50%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

export const Name = styled.h3`
  margin-top: 15px;
`;

export const Email = styled.p`
  font-size: 13px;
  opacity: 0.7;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MenuItem = styled.button`
  border: none;
  background: transparent;
  color: white;
  padding: 14px;
  text-align: left;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;

  transition: all 0.35s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateX(8px);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const Main = styled.div`
  flex: 1;
  padding: 30px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 25px;
`;

export const Card = styled.div`
  background: ${({ active }) => (active ? "#0d3761" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#222")};

  padding: 25px;
  border-radius: 16px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

  transition: all 0.35s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 35px rgba(0, 0, 0, 0.15);
  }
`;

export const CardTitle = styled.p`
  font-size: 14px;
  opacity: 0.7;
`;

export const CardValue = styled.h2`
  margin-top: 10px;
`;

export const ChartBox = styled.div`
  background: white;
  margin-top: 25px;
  border-radius: 16px;
  min-height: 220px;
  padding: 20px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

  transition: 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
  Input {
    margin: 15px;
  }
`;

export const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
`;

export const ProgressCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 25px;
  margin-top: 25px;
  text-align: center;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

export const Button = styled.button`
  background: #ffb400;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 15px;
  font-weight: 600;

  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 25px rgba(255, 180, 0, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
`;
export const MenuWrapper = styled.div`
  position: relative;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  width: 220px;
  background: white;
  border-radius: 15px;
  overflow: hidden;

  box-shadow: 0 15px 35px rgba(0,0,0,0.15);

  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};

  transform: ${({ open }) =>
    open ? "translateY(0)" : "translateY(-15px)"};

  transition: all 0.35s ease;
  z-index: 100;
`;

export const DropdownItem = styled.button`
  width: 100%;
  border: none;
  background: white;
  padding: 18px;
  text-align: left;
  font-size: 16px;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    background: #0d3761;
    color: white;
    padding-left: 28px;
  }

  &:active {
    transform: scale(0.98);
  }
`;
export const FormCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  gap: 100px;

  transition: 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const Title = styled.h2`
  color: #0d3761;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  height: 50px;
  border: 2px solid #e7ecf2;
  border-radius: 12px;
  padding: 0 15px;
  font-size: 15px;

  transition: 0.3s;

  &:focus {
    border-color: #0d3761;
    outline: none;
    box-shadow: 0 0 10px rgba(13, 55, 97, 0.2);
  }
`;

export const Select = styled.select`
  height: 50px;
  border: 2px solid #e7ecf2;
  border-radius: 12px;
  padding: 0 15px;
  font-size: 15px;

  &:focus {
    border-color: #0d3761;
    outline: none;
  }
`;

export const SaveBtn = styled.button`
  height: 50px;
  border: none;
  border-radius: 12px;

  background: linear-gradient(
    135deg,
    #0d3761,
    #174b80
  );

  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(13, 55, 97, 0.3);
  }

  &:active {
    transform: scale(0.97);
  }
`;