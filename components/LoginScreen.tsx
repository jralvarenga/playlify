import styled from 'styled-components'
import { useRouter } from 'next/router'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(45deg ,#E93BCC, #3BE9E3);
  display: flex;
  overflow-y: hidden;
`
const LoginContainer = styled.div`
  width: 400px;
  height: 100vh;
  background-color: ${({ theme }: any) => theme.color.background.main};
  padding: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  @media (max-width: 600px) {
    margin-top: auto;
    height: 75%;
    border-top-left-radius: 20px;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 20px;
  }
`
const ButtonContainer = styled.div`
  width: 40%;
  margin: auto;
  margin-top: 60px;
  cursor: pointer;
  background: linear-gradient(45deg ,#E93BCC, #3BE9E3);
  padding: 15px;
  font-size: 16px;
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
`

const LoginScreen = () => {
  const router = useRouter()

  const logIn = async() => {
    router.push('/api/login')
  }

  return (
    <Container>
      <LoginContainer>
        <LogoContainer />
        <h1>New Playlists with one song</h1>
        <h4>Discover new songs and create new playlist with just one song</h4>
        <ButtonContainer onClick={logIn}>Sign in Spotify</ButtonContainer>
      </LoginContainer>
    </Container>
  )
}

const LogoBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 120px;
  @media (max-width: 600px) {
    justify-content: center;
    margin-bottom: 60px;
  }
`
const ImageContainer = styled.img`
  width: 60px;
  height: 60px;
  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
`
const Logotext = styled.span`
  color: #3BE9E3;
  font-size: 30px;
  font-weight: bold;
  margin-left: 15px;
  @media (max-width: 600px) {
    font-size: 25px;
  }
`

const LogoContainer = () => (
  <LogoBox>
    <ImageContainer src="/img/logo.png" alt="Discoverify logo" />
    <Logotext>Discoverify</Logotext>
  </LogoBox>
);

export default LoginScreen