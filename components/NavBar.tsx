import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useAuth } from '../services/AuthProvider'

const NavBarContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    height: 70px;
  }
`
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  cursor: pointer;
  @media (max-width: 600px) {
    margin-left: 15px;
  }
`
const ImageLogo = styled.img`
  width: 50px;
  height: 50px;
  @media (max-width: 600px) {
    width: 45px;
    height: 45px;
  }
`
const Logotext = styled.span`
  color: #3BE9E3;
  font-size: 25px;
  font-weight: bold;
  margin-left: 15px;
  @media (max-width: 600px) {
    display: none;
  }
`
const UserProfileContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  margin-right: 25px;
  @media (max-width: 600px) {
    margin-right: 15px;
  }
`
const UserProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 15px;
  cursor: pointer;
  animation: enterpic 300ms ease-in;
  @media (max-width: 600px) {
    width: 45px;
    height: 45px;
  }
  @keyframes enterpic {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
const SignOutButton = styled.div`
  width: 120px;
  cursor: pointer;
  background: linear-gradient(45deg ,#E93BCC, #3BE9E3);
  padding: 5px;
  font-size: 15px;
  text-align: center;
  border-radius: 100px;
  transition: 300ms;
  font-weight: bold;
  :hover {
    background: linear-gradient(45deg ,#f14bd6, #5cf7f2);
  }
  :active {
    background: linear-gradient(45deg ,#d43fbc, #49ccc8);
  }
  @media (max-width: 600px) {
    width: 90px;
    font-size: 14px;
    font-weight: normal;
  }
`

const NavBar = ({ profilePic, uri }: any) => {
  const { logOut }: any = useAuth()
  const router = useRouter()

  const redirect = () => {
    router.replace(`${process.env.CLIENT_URI}`)
  }

  const goToProfile = () => {
    const uriNumber = uri.split(':')[2]
    window.open(`https://open.spotify.com/user/${uriNumber}`)
  }

  return (
    <NavBarContainer>
      <LogoBox onClick={redirect}>
        <ImageLogo src="/img/logo.png" alt="Discoverify logo" />
        <Logotext>Discoverify</Logotext>
      </LogoBox>
      <UserProfileContainer>
        <SignOutButton onClick={logOut}>Log out</SignOutButton>
        <UserProfilePic onClick={goToProfile} src={profilePic} alt="User Pic" />
      </UserProfileContainer>
    </NavBarContainer>
  )
}
export default NavBar